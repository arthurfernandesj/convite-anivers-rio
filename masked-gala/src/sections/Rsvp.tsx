import Reveal from '../components/Reveal'
import GoldButton from '../components/GoldButton'
import { invite } from '../data/invite'

export default function Rsvp() {
  return (
    <section className="bg-gradient-to-b from-noir to-wine/50 px-6 py-28 text-center md:py-40">
      <Reveal>
        <h2 className="mx-auto max-w-xl font-display text-3xl font-light italic leading-snug text-cream md:text-5xl">{invite.rsvp.text}</h2>
        <div className="mt-12"><GoldButton href={invite.rsvp.url}>CONFIRMAR PRESENÇA</GoldButton></div>
      </Reveal>
    </section>
  )
}
