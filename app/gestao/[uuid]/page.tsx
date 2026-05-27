'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const SUPA_URL = 'https://aibemaisphshawlcozyf.supabase.co'
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYmVtYWlzcGhzaGF3bGNvenlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NTQxOTksImV4cCI6MjA5MjUzMDE5OX0.yWFQpJsSpQXDQ5NXlVmyWnU1xfjmBC9uDnv8nFEnQ5s'

const TABS = [
  { id: 'visao',       label: 'Visão Geral',  gTab: 'overview'   },
  { id: 'programacao', label: 'Programação',  gTab: 'tarefas'    },
  { id: 'compras',     label: 'Compras',      gTab: 'compras'    },
  { id: 'diario',      label: 'Diário',       gTab: 'diario'     },
  { id: 'rfi',         label: 'RFI',          gTab: 'rfis'       },
  { id: 'orcamento',   label: 'Orçamento',    gTab: 'financeiro' },
  { id: 'contratos',   label: 'Contratos',    gTab: 'contratos'  },
  { id: 'documentos',  label: 'Documentos',   gTab: null         },
  { id: 'auditoria',   label: 'Auditoria',    gTab: null         },
]

export default function GestaoObra() {
  const params = useParams()
  const uuid = params?.uuid as string
  const [activeTab, setActiveTab] = useState('visao')
  const [obraNome, setObraNome] = useState('')
  const [obraMeta, setObraMeta] = useState('')

  useEffect(() => {
    if (!uuid) return
    fetch(`${SUPA_URL}/rest/v1/l4_projetos?id=eq.${uuid}&select=nome_projeto,codigo_interno,cidade,uf`, {
      headers: {
        apikey: SUPA_KEY,
        Authorization: `Bearer ${SUPA_KEY}`,
      },
    })
      .then(r => r.json())
      .then(rows => {
        if (rows?.[0]) {
          const o = rows[0]
          setObraNome(o.nome_projeto || 'Obra')
          setObraMeta(`${o.codigo_interno || '—'} · ${o.cidade || ''} ${o.uf ? '/ ' + o.uf : ''}`)
        }
      })
      .catch(() => {})
  }, [uuid])

  const activeTabDef = TABS.find(t => t.id === activeTab)!
  const graphifyUrl = activeTabDef.gTab
    ? `https://graphify-app.vercel.app/?project=${uuid}&name=${encodeURIComponent(obraNome)}&tab=${activeTabDef.gTab}&embedded=1`
    : null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#1a1a1a', color: '#ffffff',
      fontFamily: "'Inter', 'DM Sans', sans-serif",
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center',
        padding: '0 32px',
        height: 56,
        borderBottom: '1px solid #2a2a2a',
        flexShrink: 0,
        gap: 0,
      }}>
        {/* Logo */}
        <a href="/app#obras" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20, fontWeight: 300,
          color: '#ffffff', textDecoration: 'none',
          letterSpacing: '-0.02em', marginRight: 32, flexShrink: 0,
        }}>
          L4.
        </a>

        {/* Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 0, overflow: 'auto' }}>
          {TABS.map((t, i) => {
            const isActive = activeTab === t.id
            const isSep = i === 6 // separator before Documentos
            return (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center' }}>
                {isSep && <span style={{ width: 1, height: 16, background: '#333', margin: '0 8px', flexShrink: 0 }} />}
                <button
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    background: isActive ? '#2d2d2d' : 'transparent',
                    border: 'none',
                    color: isActive ? '#ffffff' : '#888888',
                    padding: '6px 14px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#cccccc' }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#888888' }}
                >
                  {t.label}
                </button>
              </div>
            )
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0, marginLeft: 24 }}>
          <a href="/app#obras" style={{ fontSize: 11, color: '#666', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Obras
          </a>
          <span style={{ color: '#333' }}>|</span>
          <button style={{ background: 'transparent', border: '1px solid #333', color: '#aaa', borderRadius: 999, padding: '5px 14px', fontSize: 11, cursor: 'pointer', letterSpacing: '0.08em' }}>
            Cadastro
          </button>
        </div>
      </nav>

      {/* ── HEADER OBRA ── */}
      <div style={{
        padding: '32px 32px 24px',
        borderBottom: '1px solid #252525',
        flexShrink: 0,
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 52, fontWeight: 300,
          margin: 0, letterSpacing: '-0.02em',
          color: '#ffffff',
        }}>
          {obraNome || '—'}
        </h1>
        <div style={{
          marginTop: 8, fontSize: 12, color: '#666',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
        }}>
          {obraMeta}
        </div>
      </div>

      {/* ── CONTEÚDO DA ABA ── */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {graphifyUrl ? (
          <iframe
            key={activeTab}
            src={graphifyUrl}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allow="geolocation"
          />
        ) : activeTab === 'documentos' ? (
          <div style={{ padding: 32, color: '#aaa' }}>
            <p style={{ fontSize: 13 }}>Redirecionando para documentos...</p>
          </div>
        ) : (
          /* Auditoria — placeholder */
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '100%', flexDirection: 'column', gap: 12,
          }}>
            <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              EM CONSTRUÇÃO · BACKEND
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: '#ffffff', fontWeight: 300 }}>
              Auditoria
            </div>
            <div style={{ fontSize: 13, color: '#666', textAlign: 'center', maxWidth: 400 }}>
              Solicitação e acompanhamento de auditoria L4 em breve.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
