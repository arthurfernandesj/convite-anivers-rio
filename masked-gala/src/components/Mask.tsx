import { motion } from 'framer-motion'

const OUTLINE = 'M20 92 C60 38 140 38 200 68 C260 38 340 38 380 92 C372 152 300 178 255 140 C232 122 216 112 200 112 C184 112 168 122 145 140 C100 178 28 152 20 92 Z'
const EYE_L = 'M66 96 C88 78 132 80 152 106 C132 128 88 128 66 96 Z'
const EYE_R = 'M334 96 C312 78 268 80 248 106 C268 128 312 128 334 96 Z'
const ORN = 'M200 68 C200 48 190 34 200 18 C210 34 200 48 200 68 M104 62 C120 54 136 54 152 60 M296 62 C280 54 264 54 248 60'

type Props = { delay?: number; draw?: number; className?: string; animate?: boolean }

/** Máscara veneziana em SVG: o traço dourado se desenha, depois o preenchimento surge. */
export default function Mask({ delay = 0, draw = 2.4, className, animate = true }: Props) {
  const line = (d: string, extra = 0) => (
    <motion.path
      d={d} fill="none" stroke="url(#g)" strokeWidth={1.4} strokeLinecap="round"
      initial={animate ? { pathLength: 0, opacity: 0 } : false}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay: delay + extra, duration: draw, ease: [0.4, 0, 0.2, 1] }}
    />
  )
  return (
    <svg viewBox="0 0 400 200" role="img" aria-label="Máscara veneziana dourada" className={className}>
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8f7133" /><stop offset=".4" stopColor="#ecd28f" />
          <stop offset=".6" stopColor="#c9a24d" /><stop offset="1" stopColor="#8f7133" />
        </linearGradient>
        <linearGradient id="f" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9a24d" stopOpacity=".28" /><stop offset="1" stopColor="#5a1424" stopOpacity=".5" />
        </linearGradient>
      </defs>
      <motion.path d={OUTLINE} fill="url(#f)" initial={animate ? { opacity: 0 } : false} animate={{ opacity: 1 }}
        transition={{ delay: delay + draw * 0.8, duration: 1.6 }} />
      {line(OUTLINE)}
      {line(EYE_L, 0.3)}
      {line(EYE_R, 0.3)}
      {line(ORN, 0.6)}
      <motion.path d={EYE_L + EYE_R} fill="#050304" initial={animate ? { opacity: 0 } : false} animate={{ opacity: 1 }}
        transition={{ delay: delay + draw, duration: 1 }} />
    </svg>
  )
}
