# -*- coding: utf-8 -*-
"""FastAPI router pros 6 agentes L4 (Freddie/Polly/Grace/Michael/Thomas/Alfie).

Endpoints expostos:
  POST /run-agent/{name}    — roda 1 agente com input do body
  POST /run-pipeline        — encadeia os 6 sequencial (Freddie → ... → Alfie)
  GET  /agents              — lista agentes disponíveis + tamanho do prompt

Body padrão `/run-agent/{name}`:
  {
    "input": str | dict | list,          # obrigatório
    "extra_instruction": str | null,     # opcional, prepended ao user msg
    "parse_json": bool                   # opcional default false
  }

Resposta:
  {
    "agent": "freddie",
    "output": "...",     # raw text ou dict se parse_json=true
    "model": "gemini-2.5-flash"
  }

Body `/run-pipeline`:
  {
    "input": str | dict | list           # dados brutos da obra
  }

Resposta:
  { "freddie": "...", "polly": "...", "grace": "...", "michael": "...", "thomas": "...", "alfie": "..." }
"""
from __future__ import annotations

import logging
import os
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from agentes_prompts.runner import (
    AGENT_NAMES,
    GEMINI_MODEL_NAME,
    PROMPTS_DIR,
    load_prompt,
    run_agent,
    run_pipeline,
)

log = logging.getLogger(__name__)

router = APIRouter(tags=["agentes-l4"])


class RunAgentBody(BaseModel):
    input: Any
    extra_instruction: str | None = None
    parse_json: bool = False
    max_output_tokens: int | None = None


class RunPipelineBody(BaseModel):
    input: Any


@router.get("/agents")
def list_agents():
    """Lista agentes disponíveis + tamanho do prompt em bytes."""
    out = []
    for name in AGENT_NAMES:
        try:
            p = load_prompt(name)
            out.append({"name": name, "prompt_chars": len(p)})
        except Exception as e:
            out.append({"name": name, "error": str(e)})
    return {"agents": out, "model": GEMINI_MODEL_NAME}


@router.post("/run-agent/{name}")
def post_run_agent(name: str, body: RunAgentBody):
    if name not in AGENT_NAMES:
        raise HTTPException(
            status_code=400,
            detail=f"Agente inválido: {name}. Válidos: {list(AGENT_NAMES)}",
        )
    if body.input is None:
        raise HTTPException(status_code=400, detail="Campo 'input' obrigatório.")

    kwargs: dict = {"parse_json": body.parse_json}
    if body.extra_instruction:
        kwargs["extra_instruction"] = body.extra_instruction
    if body.max_output_tokens:
        kwargs["max_output_tokens"] = body.max_output_tokens

    try:
        output = run_agent(name, body.input, **kwargs)
    except Exception as e:
        log.exception(f"Falha agente {name}")
        raise HTTPException(status_code=500, detail=str(e))

    return {"agent": name, "output": output, "model": GEMINI_MODEL_NAME}


@router.post("/run-pipeline")
def post_run_pipeline(body: RunPipelineBody):
    if body.input is None:
        raise HTTPException(status_code=400, detail="Campo 'input' obrigatório.")
    try:
        result = run_pipeline(body.input)
    except Exception as e:
        log.exception("Falha pipeline")
        raise HTTPException(status_code=500, detail=str(e))
    return {"model": GEMINI_MODEL_NAME, **result}
