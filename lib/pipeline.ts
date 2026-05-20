import { runAgent } from './claude'
import { loadPrompt } from './prompts'

export interface PipelineInput {
  obra: string
  dataBase: string
  arquivos: { nome: string; conteudo: string }[]
}

export interface PipelineResult {
  freddie: string
  polly: string
  grace: string
  michael: string
  thomas: string
  alfie: string
}

export async function runPipeline(input: PipelineInput): Promise<PipelineResult> {
  const inputBlob = JSON.stringify(input, null, 2)

  // Etapa 1 — Freddie (higienização sequencial, pré-requisito de todos)
  const freddie = await runAgent({
    system: loadPrompt('freddie'),
    userMessage: `Higienize os arquivos abaixo. Retorne JSON conforme schema canônico.\n\n${inputBlob}`,
  })

  // Etapa 2 — Polly + Grace + Michael em paralelo (todos consomem Freddie)
  const [polly, grace, michael] = await Promise.all([
    runAgent({
      system: loadPrompt('polly'),
      userMessage: `Freddie JSON validado:\n\n${freddie}\n\nExecute auditoria financeira EVM completa e retorne JSON canônico.`,
    }),
    runAgent({
      system: loadPrompt('grace'),
      userMessage: `Freddie JSON validado:\n\n${freddie}\n\nExecute auditoria de cronograma e retorne JSON canônico.`,
    }),
    runAgent({
      system: loadPrompt('michael'),
      userMessage: `Freddie JSON validado:\n\n${freddie}\n\nExecute auditoria de suprimentos + NFs e retorne JSON canônico.`,
    }),
  ])

  // Etapa 3 — Thomas (orquestrador + PVO bloqueante)
  const thomas = await runAgent({
    system: loadPrompt('thomas'),
    userMessage: [
      'JSONs upstream:',
      '',
      '=== FREDDIE ===',
      freddie,
      '',
      '=== POLLY ===',
      polly,
      '',
      '=== GRACE ===',
      grace,
      '',
      '=== MICHAEL ===',
      michael,
      '',
      'Execute PVO completo. Se passed=true, devolva JSON consolidado para Alfie. Se passed=false, devolva pendência detalhada.',
    ].join('\n'),
    maxTokens: 12288,
  })

  // Etapa 4 — Alfie (só executa se Thomas aprovou)
  const alfie = await runAgent({
    system: loadPrompt('alfie'),
    userMessage: `Thomas JSON consolidado:\n\n${thomas}\n\nMonte dossiê HTML editorial + outline da apresentação Canva. Bloqueie se PVO não passou.`,
    maxTokens: 16384,
  })

  return { freddie, polly, grace, michael, thomas, alfie }
}
