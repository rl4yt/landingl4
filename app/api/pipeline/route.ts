import { NextRequest, NextResponse } from 'next/server'
import { runPipeline, PipelineInput } from '@/lib/pipeline'

export const runtime = 'nodejs'
export const maxDuration = 800

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PipelineInput
    if (!body?.obra || !body?.dataBase || !Array.isArray(body?.arquivos)) {
      return NextResponse.json(
        { error: 'body deve conter { obra, dataBase, arquivos: [{ nome, conteudo }] }' },
        { status: 400 },
      )
    }
    const result = await runPipeline(body)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
