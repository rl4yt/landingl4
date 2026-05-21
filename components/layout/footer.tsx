import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="32" cy="32" r="26" stroke="#0A0A0A" strokeWidth="2" />
              <circle cx="32" cy="32" r="14" stroke="#0A0A0A" strokeWidth="2" />
              <path d="M32 6 A26 26 0 0 1 58 32 L32 32 Z" fill="#0A0A0A" />
              <circle cx="32" cy="32" r="2.5" fill="#0A0A0A" />
            </svg>
            <span className="font-mono text-xs font-semibold tracking-[0.32em] text-neutral-900">
              L4 ENGENHARIA
            </span>
          </div>
          <p className="max-w-sm text-sm text-neutral-500">
            Controladoria de obras com 6 agentes IA. Auditoria EVM defensável
            para construtoras de alto padrão.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Produto
            </p>
            <Link href="#agentes" className="text-sm text-neutral-700 hover:text-neutral-900">
              Agentes
            </Link>
            <Link href="#processo" className="text-sm text-neutral-700 hover:text-neutral-900">
              Processo
            </Link>
            <Link href="#dossie" className="text-sm text-neutral-700 hover:text-neutral-900">
              Dossiê
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Empresa
            </p>
            <Link href="/sobre" className="text-sm text-neutral-700 hover:text-neutral-900">
              Sobre
            </Link>
            <Link href="/contato" className="text-sm text-neutral-700 hover:text-neutral-900">
              Contato
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Legal
            </p>
            <Link href="/privacidade" className="text-sm text-neutral-700 hover:text-neutral-900">
              Privacidade
            </Link>
            <Link href="/termos" className="text-sm text-neutral-700 hover:text-neutral-900">
              Termos
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-100 py-4">
        <p className="text-center font-mono text-[10px] tracking-[0.16em] text-neutral-400">
          © {new Date().getFullYear()} L4 ENGENHARIA · CONFIDENCIAL
        </p>
      </div>
    </footer>
  );
}
