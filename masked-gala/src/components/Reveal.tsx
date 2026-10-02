import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Revela o conteúdo ao entrar na viewport: fade + desfoque, lento. */
export default function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className}
      initial={reduce ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay, duration: 1.4, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}
