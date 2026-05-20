export default function Home() {
  const endpoints: { method: string; path: string; desc: string }[] = [
    { method: 'POST', path: '/api/freddie', desc: 'Higienização de dados brutos → JSON validado' },
    { method: 'POST', path: '/api/polly', desc: 'EVM (CPI/EAC/VAC) com dois CPIs' },
    { method: 'POST', path: '/api/grace', desc: 'SPI obra real (base contratual)' },
    { method: 'POST', path: '/api/michael', desc: 'Cruzamento NF SEFAZ × Sienge' },
    { method: 'POST', path: '/api/thomas', desc: 'Orquestrador + PVO bloqueante' },
    { method: 'POST', path: '/api/alfie', desc: 'Dossiê HTML + Canva (só com PVO ✓)' },
    { method: 'POST', path: '/api/pipeline', desc: 'Pipeline completo end-to-end' },
  ]

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px', color: '#1c1917' }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>L4 Engenharia</h1>
      <p style={{ color: '#57534e', marginTop: 0 }}>
        Pipeline de auditoria de obras com 6 agentes IA via Claude API.
      </p>

      <p style={{ fontFamily: 'monospace', background: '#f5f5f4', padding: '12px 16px', borderRadius: 8, fontSize: 14 }}>
        Dados brutos → Freddie → Polly + Grace + Michael → Thomas (PVO) → Alfie
      </p>

      <h2 style={{ marginTop: 40, fontSize: 20 }}>Endpoints</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #e7e5e4' }}>
            <th style={{ padding: '8px 0' }}>Método</th>
            <th>Path</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((e) => (
            <tr key={e.path} style={{ borderBottom: '1px solid #f5f5f4' }}>
              <td style={{ padding: '8px 0', fontFamily: 'monospace', color: '#16a34a' }}>{e.method}</td>
              <td style={{ fontFamily: 'monospace' }}>{e.path}</td>
              <td style={{ color: '#57534e' }}>{e.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: 40, fontSize: 13, color: '#a8a29e' }}>
        Body: <code>{'{ input: string | object }'}</code> para endpoints individuais. Resposta: <code>{'{ agent, output }'}</code>.
      </p>
    </main>
  )
}
