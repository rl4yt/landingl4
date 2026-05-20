import Anthropic from '@anthropic-ai/sdk'

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('[claude] ANTHROPIC_API_KEY ausente — chamadas falharão')
}

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export const MODEL = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5'

export interface RunAgentOpts {
  system: string
  userMessage: string
  maxTokens?: number
  model?: string
}

export async function runAgent(opts: RunAgentOpts): Promise<string> {
  const resp = await claude.messages.create({
    model: opts.model ?? MODEL,
    max_tokens: opts.maxTokens ?? 8192,
    system: opts.system,
    messages: [{ role: 'user', content: opts.userMessage }],
  })

  return resp.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
}
