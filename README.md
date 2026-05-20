# L4 Engenharia — Landing + Agentes IA

Pipeline de auditoria de obras via Claude API.

## Stack
- Next.js 15 (App Router) TypeScript
- `@anthropic-ai/sdk`
- Deploy Vercel

## Agentes

| # | Agente | Papel |
|---|---|---|
| 1 | **Freddie** | Higieniza dados brutos Sienge/Excel/WhatsApp → JSON validado contra rodapé |
| 2 | **Polly** | EVM (CPI/EAC/VAC) com dois CPIs (Sienge + Físico) + benchmark setorial |
| 3 | **Grace** | SPI obra real (base contratual, não `.mpp` replanejado) |
| 4 | **Michael** | Cruzamento NF SEFAZ × Sienge, cobertura boletins/diretos |
| 5 | **Thomas** | Orquestrador + PVO bloqueante (27+ checks em 6 camadas) |
| 6 | **Alfie** | Dossiê HTML + Canva (só com PVO ✓ aprovado) |

Pipeline:
```
Dados brutos → /freddie → /polly + /grace + /michael → /thomas (PVO) → /alfie
```

## Endpoints

| Método | Path | Body |
|---|---|---|
| POST | `/api/freddie` | `{ input: string \| object }` |
| POST | `/api/polly` | `{ input: string \| object }` |
| POST | `/api/grace` | `{ input: string \| object }` |
| POST | `/api/michael` | `{ input: string \| object }` |
| POST | `/api/thomas` | `{ input: string \| object }` |
| POST | `/api/alfie` | `{ input: string \| object }` |
| POST | `/api/pipeline` | `{ obra, dataBase, arquivos: [{ nome, conteudo }] }` |

Resposta padrão: `{ agent, output }` ou `{ freddie, polly, grace, michael, thomas, alfie }` no pipeline.

## Setup local

```bash
npm install
cp .env.example .env.local
# preencher ANTHROPIC_API_KEY
npm run dev
```

Acesse `http://localhost:3000`. Endpoints em `/api/*`.

## Deploy Vercel

1. Conecta o repo `rl4yt/landingl4` na Vercel
2. Adiciona env var `ANTHROPIC_API_KEY` no dashboard
3. Deploy automático a cada push em `main`

## Estrutura

```
landingl4/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       ├── freddie/route.ts
│       ├── polly/route.ts
│       ├── grace/route.ts
│       ├── michael/route.ts
│       ├── thomas/route.ts
│       ├── alfie/route.ts
│       └── pipeline/route.ts
├── lib/
│   ├── claude.ts          # cliente Anthropic + runAgent
│   ├── prompts.ts         # carrega agents/*.md com cache
│   └── pipeline.ts        # orquestra os 6 agentes
├── agents/                # system prompts (fonte da verdade)
│   ├── freddie.md
│   ├── polly.md
│   ├── grace.md
│   ├── michael.md
│   ├── thomas.md
│   └── alfie.md
├── next.config.mjs
├── tsconfig.json
├── package.json
└── .env.example
```

## Modelo

Default: `claude-sonnet-4-5`. Trocar em `lib/claude.ts` (ou via env `CLAUDE_MODEL`) se precisar Opus pra Thomas/Alfie.
