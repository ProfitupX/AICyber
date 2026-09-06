import React, { useEffect, useRef, useState } from 'react'
import './Hero.css'

const Hero = () => {
  const canvasRef = useRef(null)
  const [nodeCount, setNodeCount] = useState(0)

  // Animated network graph on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight

    const nodes = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() > 0.9 ? 10 : Math.random() > 0.7 ? 6 : 4,
      color: Math.random() > 0.7 ? '#7c3aed' : Math.random() > 0.5 ? '#39ff14' : '#444444',
      label: Math.random() > 0.8 ? ['KINGPIN', 'SUSPECT', 'ASSOCIATE', 'FINANCIER'][Math.floor(Math.random()*4)] : null
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 180) {
            const alpha = (1 - dist/180) * 0.3
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        // Glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4)
        const glowColor = n.color === '#7c3aed' ? 'rgba(124,58,237,0.3)' : n.color === '#39ff14' ? 'rgba(57,255,20,0.3)' : 'rgba(120,120,120,0.2)'
        grd.addColorStop(0, glowColor)
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Node
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        ctx.fill()

        // Label
        if (n.label) {
          ctx.font = '9px Space Mono, monospace'
          ctx.fillStyle = n.color
          ctx.fillText(n.label, n.x + n.r + 6, n.y + 3)
        }

        // Update position
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    const resizeObserver = new ResizeObserver(() => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    })
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
    }
  }, [])

  // Counter animation
  useEffect(() => {
    let count = 0
    const target = 247
    const step = () => {
      count += 7
      if (count >= target) count = target
      setNodeCount(count)
      if (count < target) requestAnimationFrame(step)
    }
    const timer = setTimeout(step, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero" id="home">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Grid overlay */}
      <div className="hero-grid-overlay" />

      {/* Scan line */}
      <div className="scan-line" />

      <div className="hero-content">
        {/* Top badge */}
        <div className="hero-badge-row">
          <span className="tag tag-purple">Enterprise Edition</span>
          <span className="hero-badge-sep">·</span>
          <span className="tag tag-green">
            <span className="badge-dot" />
            System Online
          </span>
          <span className="hero-badge-sep">·</span>
          <span className="mono" style={{ fontSize:'11px', color:'#555' }}>National Intelligence Suite</span>
        </div>

        {/* Main headline */}
        <div className="hero-headline-wrap">
          <div className="hero-label section-label">AI-Powered Intelligence Platform</div>
          <h1 className="hero-headline">
            <span className="line-1">UNCOVER</span>
            <span className="line-2">CRIMINAL</span>
            <span className="line-3">
              NETWORKS<span className="cursor-blink">_</span>
            </span>
          </h1>
          <p className="hero-subline">
            TwinAI ingests raw FIRs, CDRs &amp; bank records — then two AI agents 
            <span className="accent-purple"> debate, verify</span>, and map hidden criminal 
            connections on an interactive graph.
          </p>
        </div>

        {/* CTA Row */}
        <div className="hero-cta-row">
          <a href="#system" className="btn btn-primary">
            Explore System <span className="btn-arrow">→</span>
          </a>
          <a href="#architecture" className="btn btn-outline">
            View Architecture
          </a>
        </div>

        {/* Stats row */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-val mono accent-green">{nodeCount}+</span>
            <span className="hero-stat-label">Active Nodes Mapped</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="hero-stat-val mono accent-purple">97.3%</span>
            <span className="hero-stat-label">Detection Accuracy</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="hero-stat-val mono accent-yellow">2 AI</span>
            <span className="hero-stat-label">Twin Agents Debating</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="hero-stat-val mono" style={{ color:'var(--accent-cyan)' }}>&lt;2s</span>
            <span className="hero-stat-label">Insight Generation</span>
          </div>
        </div>
      </div>

      {/* Right panel - System status */}
      <div className="hero-status-panel">
        <div className="status-panel-header">
          <span className="mono" style={{ fontSize:'10px', color:'#555', letterSpacing:'0.1em' }}>// SYSTEM STATUS</span>
          <span className="status-dot" style={{ background:'var(--accent-green)', animation:'pulse-dot 1.5s infinite' }} />
        </div>
        <div className="status-rows">
          {[
            { label: 'TWIN_AGENT_1', val: 'ACTIVE', color: 'var(--accent-green)' },
            { label: 'TWIN_AGENT_2', val: 'ACTIVE', color: 'var(--accent-green)' },
            { label: 'GRAPH_DB', val: 'CONNECTED', color: 'var(--accent-cyan)' },
            { label: 'NLP_ENGINE', val: 'READY', color: 'var(--accent-purple-light)' },
            { label: 'CONFIDENCE', val: '94.7%', color: 'var(--accent-yellow)' },
          ].map(row => (
            <div className="status-row" key={row.label}>
              <span className="mono" style={{ fontSize:'10px', color:'#555' }}>{row.label}</span>
              <span className="mono" style={{ fontSize:'10px', color: row.color, fontWeight:700 }}>{row.val}</span>
            </div>
          ))}
        </div>
        <div className="progress-bar-wrap">
          <div className="mono" style={{ fontSize:'10px', color:'#555', marginBottom:'6px' }}>PROCESSING_QUEUE</div>
          <div className="progress-track">
            <div className="progress-fill" />
          </div>
          <div className="mono" style={{ fontSize:'10px', color:'var(--accent-purple-light)', marginTop:'4px' }}>72% — ANALYZING RECORDS</div>
        </div>
        <div className="status-panel-footer mono">
          ALL SYSTEMS OPERATIONAL ●
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span className="mono" style={{ fontSize:'10px', color:'#444', letterSpacing:'0.1em' }}>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

export default Hero
