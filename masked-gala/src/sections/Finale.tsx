import Reveal from '../components/Reveal'
import Mask from '../components/Mask'
import GoldDust from '../components/GoldDust'
import { invite } from '../data/invite'

export default function Finale() {
  return (
    <footer className="relative overflow-hidden bg-noir px-6 py-32 text-center md:py-44">
      <GoldDust density={0.6} />
      <div className="relative flex flex-col items-center">
        <Reveal><Mask animate={false} className="w-40 opacity-90 md:w-52" /></Reveal>
        <Reveal delay={0.3}><p className="mt-10 font-display text-6xl font-light text-gold-metal md:text-8xl">{invite.closing[0]}</p></Reveal>
        <Reveal delay={0.6}><p className="mt-4 font-display text-xl italic text-cream/75 md:text-2xl">{invite.closing[1]}</p></Reveal>
        <Reveal delay={0.9}><p className="mt-12 text-[11px] tracking-[0.6em] text-gold/70">{invite.host}</p></Reveal>
      </div>
    </footer>
  )
}
