import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { invite } from '../data/invite'

const calc = () => {
  const ms = Math.max(0, new Date(invite.dateISO).getTime() - Date.now())
  const s = Math.floor(ms / 1000)
  return [['DIAS', Math.floor(s / 86400)], ['HORAS', Math.floor(s / 3600) % 24], ['MINUTOS', Math.floor(s / 60) % 60], ['SEGUNDOS', s % 60]] as const
}

export default function Countdown() {
  const [t, setT] = useState(calc)
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id) }, [])
  return (
    <section className="relative bg-noir px-6 py-28 md:py-40" aria-label="Contagem regressiva">
      <Reveal className="mx-auto grid max-w-4xl grid-cols-2 gap-px bg-gold/20 md:grid-cols-4">
        {t.map(([label, v]) => (
          <div key={label} className="flex flex-col items-center gap-3 bg-noir px-4 py-10">
            <div className="relative h-[1em] overflow-hidden font-display text-[clamp(3rem,10vw,5.5rem)] font-light leading-none tabular-nums text-gold-metal">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={v} className="block" initial={{ y: '60%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-60%', opacity: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                  {String(v).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-[10px] tracking-[0.5em] text-cream/60">{label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
