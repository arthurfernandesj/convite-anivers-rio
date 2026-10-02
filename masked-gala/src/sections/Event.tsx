import Reveal from '../components/Reveal'
import { invite } from '../data/invite'

export default function Event() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-noir via-wine/40 to-noir px-6 py-28 md:py-44">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-light italic text-cream md:text-6xl">{invite.about.title}</h2>
        <div aria-hidden className="mx-auto my-8 h-px w-24 bg-gold/70" />
        <p className="font-display text-xl leading-relaxed text-cream/75 md:text-2xl">{invite.about.text}</p>
      </Reveal>
    </section>
  )
}
