import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; ph: number }

/** Partículas douradas em canvas: leve, sem dependências. */
export default function GoldDust({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const c = ref.current!, ctx = c.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, ps: P[] = []
    const make = (): P => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.3,
      vy: -(Math.random() * 0.18 + 0.04), vx: (Math.random() - 0.5) * 0.08,
      a: Math.random() * 0.6 + 0.15, ph: Math.random() * 6.28,
    })
    const resize = () => {
      w = c.clientWidth; h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round((w < 640 ? 28 : 60) * density)
      ps = Array.from({ length: n }, make)
    }
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        if (!reduce) { p.x += p.vx; p.y += p.vy; if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w } }
        const tw = 0.5 + 0.5 * Math.sin(t / 1400 + p.ph)
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28)
        ctx.fillStyle = `rgba(236,210,143,${p.a * tw})`
        ctx.shadowColor = 'rgba(201,162,77,.8)'; ctx.shadowBlur = 6
        ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    resize(); raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [reduce, density])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}
