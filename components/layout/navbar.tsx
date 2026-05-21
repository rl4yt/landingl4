"use client";

import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";

export default function NavBar() {
  const scrolled = useScroll(50);

  return (
    <div
      className={`fixed top-0 flex w-full justify-center ${
        scrolled
          ? "border-b border-neutral-200 bg-white/70 backdrop-blur-xl"
          : "bg-transparent"
      } z-30 transition-all`}
    >
      <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="32" cy="32" r="26" stroke="#0A0A0A" strokeWidth="2" />
            <circle cx="32" cy="32" r="14" stroke="#0A0A0A" strokeWidth="2" />
            <path d="M32 6 A26 26 0 0 1 58 32 L32 32 Z" fill="#0A0A0A" />
            <circle cx="32" cy="32" r="2.5" fill="#0A0A0A" />
          </svg>
          <span className="font-mono text-sm font-semibold tracking-[0.32em] text-neutral-900">
            L4
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#agentes"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Agentes
          </Link>
          <Link
            href="#processo"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Processo
          </Link>
          <Link
            href="#dossie"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Dossiê
          </Link>
        </nav>

        <Link
          href="/auditoria"
          className="rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-colors hover:bg-white hover:text-black"
        >
          Iniciar auditoria
        </Link>
      </div>
    </div>
  );
}
