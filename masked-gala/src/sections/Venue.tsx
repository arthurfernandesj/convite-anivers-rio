import Reveal from '../components/Reveal'
import GoldButton from '../components/GoldButton'
import { invite } from '../data/invite'

export default function Venue() {
  return (
    <section className="bg-noir px-6 py-28 md:py-40">
      <Reveal className="mx-auto max-w-3xl border border-gold/25 p-10 text-center md:p-16">
        <p className="text-[11px] tracking-[0.6em] text-gold/80">LOCAL</p>
        <h2 className="mt-6 font-display text-4xl font-light tracking-[0.1em] text-cream md:text-6xl">{invite.venue}</h2>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-cream/60">{invite.address}</p>
        <p className="mt-6 font-display text-xl tracking-[0.12em] text-gold-light">{invite.dateLabel} · {invite.timeLabel}</p>
        <div className="mt-10"><GoldButton href={invite.mapsUrl}>COMO CHEGAR</GoldButton></div>
      </Reveal>
    </section>
  )
}
