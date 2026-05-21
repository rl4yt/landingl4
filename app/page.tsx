import Link from "next/link";

const AGENTS = [
  {
    n: "01",
    name: "FREDDIE",
    role: "Higienização",
    desc: "Valida soma extraída vs rodapé do Sienge. Bloqueia se diff > R$ 100. Primeira muralha contra dado sujo.",
  },
  {
    n: "02",
    name: "POLLY",
    role: "Auditoria financeira",
    desc: "EVM completo: CPI Sienge + CPI Físico, EAC, VAC. Benchmark setorial CBIC. Distingue estouro real de esquecimento orçamentário.",
  },
  {
    n: "03",
    name: "GRACE",
    role: "Cronograma",
    desc: "SPI obra real usando base contratual — não baseline .mpp replanejado. Dias atraso defensáveis em auditoria.",
  },
  {
    n: "04",
    name: "MICHAEL",
    role: "Suprimentos",
    desc: "Cruza NF SEFAZ × Sienge antes de flagar risco fiscal. Cobertura boletins/diretos. Detecta Contrato Mãe.",
  },
  {
    n: "05",
    name: "THOMAS",
    role: "Orquestrador + PVO",
    desc: "27 checks bloqueantes em 6 camadas. Loop iterativo até convergência. Camada cética antes de publicar.",
  },
  {
    n: "06",
    name: "ALFIE",
    role: "Sintetizador",
    desc: "Dossiê HTML editorial A4 + outline Canva. Só executa se PVO 27/27 ✓. Plano de Ação separado de Lições Aprendidas.",
  },
];

const KPI_DEMO = [
  { label: "CPI Sienge", value: "0,738", caption: "convergente · físico 0,742" },
  { label: "SPI obra real", value: "0,74", caption: "136 dias atraso" },
  { label: "EAC projetado", value: "R$ 13,7M", caption: "+R$ 3,59M vs BAC" },
  { label: "PVO bloqueante", value: "27/27", caption: "auditoria aprovada" },
];

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center pt-32">
      {/* HERO */}
      <section className="relative z-10 w-full max-w-screen-xl px-5 pb-32 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-700">
              6 agentes em produção
            </span>
          </div>

          <h1 className="animate-fade-up font-display text-5xl font-bold tracking-[-0.025em] text-neutral-900 opacity-0 [text-wrap:balance] md:text-7xl md:leading-[1.05]"
              style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}>
            Controladoria de obras{" "}
            <span className="text-neutral-400">defensável</span> em auditoria.
          </h1>

          <p className="mt-8 animate-fade-up text-lg text-neutral-500 opacity-0 [text-wrap:balance] md:text-xl"
             style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
            Pipeline de 6 agentes IA que processa Sienge, cronograma e NFs.
            Entrega CPI, SPI, EAC e dossiê executivo com PVO bloqueante.
          </p>

          <div className="mt-10 flex animate-fade-up items-center justify-center gap-3 opacity-0"
               style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
            <Link
              href="/auditoria"
              className="rounded-full border border-black bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              Iniciar auditoria →
            </Link>
            <Link
              href="#processo"
              className="rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-black hover:text-black"
            >
              Como funciona
            </Link>
          </div>
        </div>

        {/* KPI demo bar */}
        <div className="mx-auto mt-24 grid max-w-5xl animate-fade-up grid-cols-2 gap-0 border border-neutral-200 bg-white opacity-0 md:grid-cols-4"
             style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          {KPI_DEMO.map((k, i) => (
            <div key={k.label} className={`flex flex-col gap-2 p-8 ${i > 0 ? "border-l border-neutral-200" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""}`}>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                {k.label}
              </span>
              <span className="font-mono text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
                {k.value}
              </span>
              <span className="text-xs text-neutral-500">{k.caption}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="w-full border-y border-neutral-200 bg-neutral-50 py-12">
        <div className="mx-auto max-w-screen-xl px-5">
          <p className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
            Operacional em obras reais — auditoria validada em
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-20">
            <span className="font-mono text-sm font-medium tracking-wide text-neutral-700">
              LIV'JARDINS
            </span>
            <span className="font-mono text-sm font-medium tracking-wide text-neutral-700">
              PAVILHÃO EXATAS UESC
            </span>
            <span className="font-mono text-sm font-medium tracking-wide text-neutral-700">
              RESIDENCIAL DEMO
            </span>
            <span className="font-mono text-sm font-medium tracking-wide text-neutral-700">
              EDIFÍCIO NORTE
            </span>
          </div>
        </div>
      </section>

      {/* AGENTES */}
      <section id="agentes" className="w-full bg-white py-32">
        <div className="mx-auto max-w-screen-xl px-5">
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
              Os 6 agentes
            </p>
            <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-neutral-900 md:text-5xl">
              Cada agente tem um único trabalho.
            </h2>
            <p className="mt-4 text-lg text-neutral-500">
              Pipeline sequencial: Freddie → Polly + Grace + Michael → Thomas (PVO) → Alfie.
              Cada um valida e bloqueia o próximo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-0 border border-neutral-200 bg-white md:grid-cols-2 lg:grid-cols-3">
            {AGENTS.map((a, i) => (
              <div
                key={a.name}
                className={`group flex flex-col gap-4 p-8 transition-colors hover:bg-neutral-50 ${
                  i > 0 ? "border-t border-neutral-200 md:border-t-0 md:border-l" : ""
                } ${i >= 3 ? "lg:border-t lg:border-l" : ""}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-400">
                    {a.n}
                  </span>
                  <span className="font-mono text-sm font-semibold tracking-[0.16em] text-neutral-900">
                    {a.name}
                  </span>
                </div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
                  {a.role}
                </span>
                <p className="text-sm leading-relaxed text-neutral-600">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="w-full bg-neutral-50 py-32">
        <div className="mx-auto max-w-screen-xl px-5">
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
              Processo
            </p>
            <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-neutral-900 md:text-5xl">
              Do upload ao dossiê em 4 passos.
            </h2>
          </div>

          <ol className="space-y-0">
            {[
              {
                n: "01",
                title: "Upload",
                desc: "Sobe xlsx Sienge (orçamento + cronograma), boletins de medição e NFs. Sistema processa via Gemini.",
              },
              {
                n: "02",
                title: "Pipeline",
                desc: "Freddie valida. Polly + Grace + Michael auditam em paralelo. Thomas roda PVO 27 checks até convergir.",
              },
              {
                n: "03",
                title: "Dashboard",
                desc: "KPIs EVM, risco ativo/futuro, esquecimento orçamentário, plano de ação separado de lições aprendidas.",
              },
              {
                n: "04",
                title: "Dossiê",
                desc: "Alfie monta HTML editorial A4 imprimível + outline Canva. Selo PVO 27/27 ✓ no rodapé.",
              },
            ].map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-[64px_1fr] items-start gap-8 border-t border-neutral-200 py-10 first:border-t-0 md:grid-cols-[80px_240px_1fr]"
              >
                <span className="font-mono text-3xl font-medium tracking-tight text-neutral-300">
                  {step.n}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-neutral-900 md:text-2xl">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-neutral-600 md:max-w-2xl">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DOSSIÊ TEASER */}
      <section id="dossie" className="w-full bg-white py-32">
        <div className="mx-auto max-w-screen-xl px-5">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <div className="max-w-xl">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
                Dossiê executivo
              </p>
              <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-neutral-900 md:text-5xl">
                Auditoria{" "}
                <span className="italic text-neutral-400">defensável</span> em
                cada linha.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                Toda métrica rastreável até a NF. Plano de Ação nunca contém
                histórico. Lições Aprendidas calibram próximas obras. Cada
                tabela declara escopo no subtítulo.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-neutral-700">
                {[
                  "Dois CPIs reportados (Sienge + Físico) com fórmula explícita",
                  "Filtro temporal: estouro histórico ≠ risco atual",
                  "Caveat BDI/encargos quando Sienge não aplica markup",
                  "27 checks PVO bloqueantes — warnings exigem justificativa",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-[1px] w-4 shrink-0 bg-neutral-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-neutral-200 bg-neutral-50 p-10">
              <div className="mb-8 flex items-center justify-between border-b border-neutral-200 pb-4">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                  L4-DOSS-2026-0520
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  PVO 27/27 ✓
                </span>
              </div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
                Residencial Demo · Abril/2026
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-neutral-900">
                Estouro projetado:{" "}
                <span className="text-red-700">R$ 3,59M</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                Indireto realizado 92% acima de diretos por distorção temporal.
                Esquecimento orçamentário R$ 871k em ADM, Logística e
                Tratamentos Acústicos. 5 movimentos no Plano de Ação.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-0 border border-neutral-200 bg-white">
                <div className="border-r border-neutral-200 p-4">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    CPI
                  </span>
                  <p className="mt-2 font-mono text-xl font-medium text-red-700">0,738</p>
                </div>
                <div className="border-r border-neutral-200 p-4">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    SPI
                  </span>
                  <p className="mt-2 font-mono text-xl font-medium text-red-700">0,74</p>
                </div>
                <div className="p-4">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    EAC
                  </span>
                  <p className="mt-2 font-mono text-xl font-medium text-neutral-900">R$ 13,7M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-neutral-950 py-32 text-white">
        <div className="mx-auto max-w-screen-xl px-5 text-center">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] md:text-6xl">
            Sua próxima auditoria não precisa de 5 retroanálises.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
            Cada bug que vaza pra diretoria custa credibilidade. Pipeline L4
            bloqueia antes — 27 checks em 6 camadas, loop iterativo até
            convergência.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              href="/auditoria"
              className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
            >
              Iniciar auditoria →
            </Link>
            <Link
              href="/contato"
              className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-neutral-900"
            >
              Falar com time
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
