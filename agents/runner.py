# -*- coding: utf-8 -*-
"""
runner.py — Executor dos 6 agentes L4 via Gemini com system prompt.

Carrega .md do diretório PROMPTS_DIR, chama Gemini com:
- system_instruction = conteúdo do .md
- user message = input_data (JSON string)

Retorna texto raw (geralmente JSON) ou dict parseado.

Uso:
    from agentes_prompts.runner import run_agent
    out = run_agent("freddie", {"obra": "X", "arquivos": [...]})

Modelo default: gemini-2.0-flash-exp (GEMINI_MODEL env var).
"""
from __future__ import annotations

import json
import logging
import os
import re
from pathlib import Path
from typing import Any

import google.generativeai as genai

log = logging.getLogger(__name__)

PROMPTS_DIR = Path(__file__).parent
GEMINI_KEY = os.getenv("GEMINI_KEY", "")
GEMINI_MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.0-flash-exp")
GEMINI_TIMEOUT_SECONDS = int(os.getenv("GEMINI_TIMEOUT_SECONDS", "180"))

AGENT_NAMES = ("freddie", "polly", "grace", "michael", "thomas", "alfie")

if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)

_prompt_cache: dict[str, str] = {}


def load_prompt(name: str) -> str:
    """Carrega .md do agente (cacheado em memória)."""
    if name not in AGENT_NAMES:
        raise ValueError(f"Agente inválido: {name}. Válidos: {AGENT_NAMES}")
    if name in _prompt_cache:
        return _prompt_cache[name]
    path = PROMPTS_DIR / f"{name}.md"
    if not path.exists():
        raise FileNotFoundError(f"Prompt não encontrado: {path}")
    content = path.read_text(encoding="utf-8")
    _prompt_cache[name] = content
    return content


def _strip_markdown_fences(text: str) -> str:
    """Remove cercas ```json ... ``` se Gemini envolver output em markdown."""
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    return text.strip()


def run_agent(
    name: str,
    input_data: Any,
    *,
    parse_json: bool = False,
    extra_instruction: str | None = None,
    max_output_tokens: int = 8192,
) -> str | dict:
    """Roda agente via Gemini.

    Args:
        name: 'freddie' | 'polly' | 'grace' | 'michael' | 'thomas' | 'alfie'
        input_data: dict/list/str — vira mensagem do usuário (serializado em JSON se não-string)
        parse_json: se True, tenta json.loads no output (remove ```fences```)
        extra_instruction: instrução extra prepended ao user message (ex: "responda apenas JSON")
        max_output_tokens: limite de tokens do output Gemini

    Returns:
        str (raw text) ou dict (se parse_json=True)
    """
    if not GEMINI_KEY:
        raise RuntimeError("GEMINI_KEY não configurada no env.")

    system_prompt = load_prompt(name)

    if isinstance(input_data, (dict, list)):
        user_msg = json.dumps(input_data, ensure_ascii=False, indent=2)
    else:
        user_msg = str(input_data)

    if extra_instruction:
        user_msg = f"{extra_instruction}\n\n{user_msg}"

    model = genai.GenerativeModel(
        GEMINI_MODEL_NAME,
        system_instruction=system_prompt,
    )

    response = model.generate_content(
        user_msg,
        generation_config={
            "max_output_tokens": max_output_tokens,
            "temperature": 0.2,
        },
        request_options={"timeout": GEMINI_TIMEOUT_SECONDS},
    )

    raw = response.text or ""

    if parse_json:
        cleaned = _strip_markdown_fences(raw)
        try:
            return json.loads(cleaned)
        except json.JSONDecodeError as e:
            raise ValueError(
                f"Agente {name} retornou texto não-JSON: {e}\n--- raw ---\n{raw[:500]}"
            )

    return raw


def run_pipeline(input_data: Any) -> dict[str, str]:
    """Encadeia Freddie → Polly+Grace+Michael (sequencial) → Thomas → Alfie.

    Args:
        input_data: dados brutos da obra (xlsx parseado, JSON, etc)

    Returns:
        {"freddie": str, "polly": str, "grace": str, "michael": str, "thomas": str, "alfie": str}

    Nota: chamadas SEQUENCIAIS (Python sem async). Total ~3-8min dependendo Gemini latency.
    """
    log.info("[pipeline] Freddie iniciando")
    freddie_out = run_agent(
        "freddie",
        input_data,
        extra_instruction="Higienize os arquivos abaixo. Retorne JSON conforme schema canônico.",
    )

    log.info("[pipeline] Polly iniciando")
    polly_out = run_agent(
        "polly",
        f"Freddie JSON validado:\n\n{freddie_out}\n\nExecute auditoria financeira EVM completa.",
    )

    log.info("[pipeline] Grace iniciando")
    grace_out = run_agent(
        "grace",
        f"Freddie JSON validado:\n\n{freddie_out}\n\nExecute auditoria de cronograma.",
    )

    log.info("[pipeline] Michael iniciando")
    michael_out = run_agent(
        "michael",
        f"Freddie JSON validado:\n\n{freddie_out}\n\nExecute auditoria de suprimentos + NFs.",
    )

    log.info("[pipeline] Thomas iniciando")
    thomas_in = (
        "JSONs upstream:\n\n"
        f"=== FREDDIE ===\n{freddie_out}\n\n"
        f"=== POLLY ===\n{polly_out}\n\n"
        f"=== GRACE ===\n{grace_out}\n\n"
        f"=== MICHAEL ===\n{michael_out}\n\n"
        "Execute PVO completo. Se passed=true, devolva JSON consolidado para Alfie."
    )
    thomas_out = run_agent("thomas", thomas_in, max_output_tokens=12288)

    log.info("[pipeline] Alfie iniciando")
    alfie_out = run_agent(
        "alfie",
        f"Thomas JSON consolidado:\n\n{thomas_out}\n\nMonte dossiê HTML + outline Canva.",
        max_output_tokens=16384,
    )

    log.info("[pipeline] completo")
    return {
        "freddie": freddie_out,
        "polly": polly_out,
        "grace": grace_out,
        "michael": michael_out,
        "thomas": thomas_out,
        "alfie": alfie_out,
    }
