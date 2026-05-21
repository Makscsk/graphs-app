import React, { useEffect, useRef } from 'react'
import styles from './AnimatedBackground.module.scss'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const mouse = useRef({ x: null, y: null })
  const animationId = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const PARTICLE_COUNT = 80
    const CONNECTION_DIST = 150
    const MOUSE_RADIUS = 200
    const COLORS = {
      primary: '#8B5CF6',
      warning: '#e7b332',
      light: '#EDE9FE',
      white: '#FFFFFF',
    }

    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.6
        this.vy = (Math.random() - 0.5) * 0.6
        this.size = Math.random() * 3 + 1.5
        this.color = Math.random() > 0.6 ? COLORS.primary : COLORS.warning
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1

        if (mouse.current.x && mouse.current.y) {
          const dx = this.x - mouse.current.x
          const dy = this.y - mouse.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const angle = Math.atan2(dy, dx)
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
            this.x += Math.cos(angle) * force * 1.5
            this.y += Math.sin(angle) * force * 1.5
          }
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles.current = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.current.push(new Particle())
      }
    }

    const drawLines = () => {
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x
          const dy = particles.current[i].y - particles.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < CONNECTION_DIST) {
            const opacity = (1 - distance / CONNECTION_DIST) * 0.25
            ctx.beginPath()
            ctx.moveTo(particles.current[i].x, particles.current[i].y)
            ctx.lineTo(particles.current[j].x, particles.current[j].y)
            ctx.strokeStyle = `rgba(139, 91, 246, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#fef3f2')
      gradient.addColorStop(1, '#f3e8ff')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      particles.current.forEach((p) => {
        p.update()
        p.draw()
      })

      drawLines()

      animationId.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.current.x = null
      mouse.current.y = null
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    resize()
    initParticles()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationId.current) cancelAnimationFrame(animationId.current)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

export default AnimatedBackground
