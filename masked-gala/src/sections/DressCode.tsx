import Reveal from '../components/Reveal'
import { invite } from '../data/invite'

export default function DressCode() {
  return (
    <section className="grain relative overflow-hidden bg-noir px-6 py-32 text-center md:py-48">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(90,20,36,.45),transparent_65%)]" />
      <div className="relative">
        <Reveal><p className="text-[11px] tracking-[0.6em] text-gold/80">DRESS CODE</p></Reveal>
        {invite.dressCode.map((line, i) => (
          <Reveal key={line} delay={0.3 + i * 0.35}>
            <p className={`font-display font-light leading-[1.05] tracking-[0.12em] text-[clamp(2.6rem,11vw,7.5rem)] ${i === 0 ? 'text-gold-metal mt-8' : 'mt-2 text-transparent [-webkit-text-stroke:1px_#c9a24d]'}`}>{line}</p>
          </Reveal>
        ))}
        <Reveal delay={1.1}><p className="mx-auto mt-10 max-w-sm font-display text-lg italic text-cream/70">{invite.dressNote}</p></Reveal>
      </div>
    </section>
  )
}
