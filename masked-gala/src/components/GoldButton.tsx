import type { ReactNode } from 'react'

/** Botão/link dourado com varredura de metal no hover e no foco. */
export default function GoldButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="group relative inline-block overflow-hidden border border-gold/60 px-10 py-3.5 text-[11px] tracking-[0.5em] text-gold-light transition-colors duration-700 hover:border-gold-light hover:text-noir focus-visible:text-noir">
      <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-aged via-gold-light to-gold transition-transform duration-700 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0" />
      <span className="relative">{children}</span>
    </a>
  )
}
