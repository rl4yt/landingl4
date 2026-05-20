import { NextRequest, NextResponse } from 'next/server'
import { runAgent } from '@/lib/claude'
import { loadPrompt } from '@/lib/prompts'

export const runtime = 'nodejs'
export const maxDuration = 300

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const input = body?.input
    if (input === undefined || input === null) {
      return NextResponse.json({ error: 'input obrigatório no body' }, { status: 400 })
    }
    const output = await runAgent({
      system: loadPrompt('grace'),
      userMessage: typeof input === 'string' ? input : JSON.stringify(input, null, 2),
      maxTokens: 8192,
    })
    return NextResponse.json({ agent: 'grace', output })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
