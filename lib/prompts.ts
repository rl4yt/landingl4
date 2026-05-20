import { readFileSync } from 'fs'
import { join } from 'path'

export type AgentName = 'freddie' | 'polly' | 'grace' | 'michael' | 'thomas' | 'alfie'

const AGENTS_DIR = join(process.cwd(), 'agents')
const cache = new Map<AgentName, string>()

export function loadPrompt(name: AgentName): string {
  const cached = cache.get(name)
  if (cached) return cached
  const content = readFileSync(join(AGENTS_DIR, `${name}.md`), 'utf-8')
  cache.set(name, content)
  return content
}
