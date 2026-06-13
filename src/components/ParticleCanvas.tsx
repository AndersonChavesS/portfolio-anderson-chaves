import { useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const animId = useRef<number>(0)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light'

    const PARTICLE_COUNT = 80
    const MAX_DIST = 130
    const REPEL_RADIUS = 100
    const REPEL_STRENGTH = 3.5

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function initParticles() {
      if (!canvas) return
      particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }))
    }

    function getColors() {
      const dark = document.documentElement.getAttribute('data-theme') !== 'light'
      return {
        particle: dark ? 'rgba(160, 120, 255,' : 'rgba(100, 60, 200,',
        line: dark ? 'rgba(140, 100, 255,' : 'rgba(100, 60, 200,',
        cursor: dark ? 'rgba(140, 100, 255, 0.18)' : 'rgba(100, 60, 200, 0.1)',
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mouse.current
      const colors = getColors()

      // Draw cursor glow
      if (mx > 0 && my > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, REPEL_RADIUS * 1.5)
        grad.addColorStop(0, colors.cursor)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mx, my, REPEL_RADIUS * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Update + draw particles
      for (const p of particles.current) {
        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
          p.vx += (dx / dist) * force * REPEL_STRENGTH * 0.08
          p.vy += (dy / dist) * force * REPEL_STRENGTH * 0.08
        }

        // Damping
        p.vx *= 0.97
        p.vy *= 0.97

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5 }

        p.x += p.vx
        p.y += p.vy

        // Bounce walls
        if (p.x < 0 || p.x > canvas.width)  { p.vx *= -1; p.x = Math.max(0, Math.min(canvas.width, p.x)) }
        if (p.y < 0 || p.y > canvas.height) { p.vy *= -1; p.y = Math.max(0, Math.min(canvas.height, p.y)) }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${colors.particle}${p.opacity})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i]
          const b = particles.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.4
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `${colors.line}${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animId.current = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()

    const onResize = () => { resize(); initParticles() }
    const onMouseMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 } }
    const onTouchMove = (e: TouchEvent) => {
      mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      cancelAnimationFrame(animId.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
