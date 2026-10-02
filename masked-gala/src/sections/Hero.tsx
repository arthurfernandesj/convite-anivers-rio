import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Mask from '../components/Mask'
import GoldDust from '../components/GoldDust'
import { invite } from '../data/invite'

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center gap-2 px-4 py-3">
    <dt className="text-[10px] tracking-[0.5em] text-gold/80">{label}</dt>
    <dd className="font-display text-xl tracking-[0.12em] text-cream md:text-2xl">{value}</dd>
  </div>
)

/** `active` vira true quando as cortinas começam a abrir: a revelação do Hero é orquestrada a partir daí. */
export default function Hero({ active }: { active: boolean }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18 }), sy = useSpring(my, { stiffness: 40, damping: 18 })
  const maskX = useTransform(sx, v => v * -18), maskY = useTransform(sy, v => v * -12)
  const spot = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(circle at ${50 + (x as number) * 14}% ${38 + (y as number) * 10}%, rgba(201,162,77,.16), transparent 42%)`)

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return
    mx.set((e.clientX / window.innerWidth - 0.5) * 2)
    my.set((e.clientY / window.innerHeight - 0.5) * 2)
  }
  const s = reduce ? 0.01 : 1
  const show = (delay: number, from: object, to: object, duration = 1.6) => ({
    initial: from, animate: active ? to : from, transition: { delay: (1.2 + delay) * s, duration: duration * s, ease: 'easeOut' as const },
  })

  return (
    <section onPointerMove={onMove} className="grain relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-noir px-6 py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,#3a0d19_0%,#14050a_45%,#050304_75%)]" />
      <motion.div aria-hidden className="absolute inset-0" style={{ background: spot }} />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#000_100%)]" />
      <GoldDust />

      <motion.div aria-hidden className="pointer-events-none absolute inset-3 border border-gold/30 md:inset-8"
        {...show(0.6, { opacity: 0 }, { opacity: 1 }, 2)}>
        {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map(p => (
          <span key={p} className={`absolute ${p} h-2 w-2 rotate-45 bg-gold ${p.includes('left') ? '-translate-x-1/2' : 'translate-x-1/2'} ${p.includes('top') ? '-translate-y-1/2' : 'translate-y-1/2'}`} />
        ))}
      </motion.div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div style={{ x: maskX, y: maskY }} className="w-[46vw] max-w-[210px]">
          <Mask animate={false} className="w-full drop-shadow-[0_0_30px_rgba(201,162,77,.25)]" />
        </motion.div>

        <motion.p className="mt-10 font-display text-xl italic text-cream/80 md:text-2xl"
          {...show(0.3, { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)' })}>
          {invite.lead}
        </motion.p>

        <motion.h2 className="mt-5 font-display font-light leading-[1.05] text-gold-metal text-[clamp(2.2rem,9vw,5.6rem)] tracking-[0.1em]"
          {...show(0.8, { opacity: 0, filter: 'blur(14px)', scale: 1.05 }, { opacity: 1, filter: 'blur(0px)', scale: 1 }, 2)}>
          {invite.host}
        </motion.h2>

        <motion.div aria-hidden className="my-8 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent md:w-64"
          {...show(1.6, { scaleX: 0 }, { scaleX: 1 })} />

        <motion.p className="max-w-md font-display text-lg leading-relaxed text-cream/75 md:text-xl"
          {...show(1.9, { opacity: 0 }, { opacity: 1 })}>
          {invite.subtitle}
        </motion.p>

        <motion.dl className="mt-12 grid w-full max-w-2xl grid-cols-1 divide-y divide-gold/20 md:grid-cols-3 md:divide-x md:divide-y-0"
          {...show(2.5, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 1.4)}>
          <Info label="DATA" value={invite.dateLabel} />
          <Info label="HORÁRIO" value={invite.timeLabel} />
          <Info label="LOCAL" value={invite.venue} />
        </motion.dl>
      </div>

      <motion.div aria-hidden className="absolute bottom-8 z-10 text-gold/70"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1, y: [0, 8, 0] } : { opacity: 0 }}
        transition={{ opacity: { delay: 4.6 * s, duration: 1 }, y: { delay: 4.6 * s, duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}>
        <ChevronDown strokeWidth={1} size={28} />
      </motion.div>
    </section>
  )
}
