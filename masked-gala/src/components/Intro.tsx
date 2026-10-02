import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Mask from './Mask'
import GoldDust from './GoldDust'
import { invite } from '../data/invite'

/**
 * Abertura cinematográfica. Linha do tempo (s):
 * 0 escuro → 0.4 luz dourada → 1.2 máscara se desenha → 3.6 título → 4.9 frase → 5.8 botão.
 * Ao entrar, o conteúdo some e as cortinas de veludo se abrem revelando o Hero.
 */
export default function Intro({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  const reduce = useReducedMotion()
  const k = reduce ? 0.01 : 1
  const [opening, setOpening] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const enter = () => { setOpening(true); onOpen() }
  const ease = [0.65, 0, 0.35, 1] as const

  const panel = (side: 'l' | 'r') => (
    <motion.div
      className={`velvet absolute top-0 h-full w-1/2 ${side === 'l' ? 'left-0' : 'right-0'}`}
      style={{ boxShadow: side === 'l' ? '24px 0 60px #000' : '-24px 0 60px #000' }}
      animate={opening ? { x: side === 'l' ? '-102%' : '102%' } : { x: 0 }}
      transition={{ duration: 2.2 * k, ease, delay: 0.5 * k }}
      onAnimationComplete={() => opening && side === 'l' && onDone()}
    />
  )

  const words = ['MASKED', 'GALA']

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Abertura do convite">
      {panel('l')}
      {panel('r')}
      <div className="pointer-events-none absolute inset-0 bg-noir/70" />

      <motion.div
        className="absolute inset-0 grid place-items-center overflow-hidden px-6"
        animate={opening ? { opacity: 0, scale: 1.06, filter: 'blur(8px)' } : {}}
        transition={{ duration: 0.9 * k, ease: 'easeIn' }}
      >
        <motion.div
          aria-hidden className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(201,162,77,.20), rgba(90,20,36,.22) 40%, transparent 70%)' }}
          initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: 1, scale: 0.55 }}
          transition={{ delay: 0.4 * k, duration: 5 * k, ease: 'easeOut' }}
        />
        <GoldDust density={0.8} />

        <div className="relative flex flex-col items-center text-center">
          <Mask className="w-[68vw] max-w-[380px]" delay={1.2 * k} draw={2.4 * k} animate={!reduce} />

          <motion.span
            className="mt-10 text-[11px] tracking-[0.6em] text-gold-light/80"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 * k, duration: 1.4 * k }}
          >THE</motion.span>

          <h1 className="mt-3 font-display font-light leading-[0.95] text-gold-metal text-[clamp(2.8rem,13vw,6.5rem)] tracking-[0.18em]" aria-label={invite.eventName}>
            {words.map((word, wi) => (
              <span key={word} className="block" aria-hidden>
                {word.split('').map((ch, i) => (
                  <motion.span
                    key={i} className="inline-block"
                    initial={{ opacity: 0, filter: 'blur(14px)', y: 12 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ delay: (3.6 + wi * 0.5 + i * 0.09) * k, duration: 1.2 * k, ease: 'easeOut' }}
                  >{ch}</motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 font-display text-xl italic font-light text-cream/80 md:text-2xl"
            initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 4.9 * k, duration: 1.6 * k }}
          >{invite.tagline}</motion.p>

          <motion.button
            onClick={enter}
            className="group relative mt-12 overflow-hidden border border-gold/60 px-10 py-3.5 text-[11px] tracking-[0.5em] text-gold-light transition-colors duration-700 hover:border-gold-light hover:text-noir focus-visible:text-noir"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.8 * k, duration: 1.4 * k }}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-aged via-gold-light to-gold transition-transform duration-700 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0" aria-hidden />
            <span className="relative">ENTRAR</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
