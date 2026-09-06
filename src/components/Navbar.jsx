import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toTimeString().slice(0, 8))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const navLinks = [
    { label: 'Platform', href: '#system' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Capabilities', href: '#features' },
    { label: 'Workflow', href: '#flow' },
    { label: 'Tech Stack', href: '#tech' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="navbar-left">
          <div className="brand">
            <span className="brand-icon">⬡</span>
            <span className="brand-name">TWIN<span className="brand-accent">AI</span></span>
          </div>
          <div className="nav-sep" />
          <span className="navbar-status">
            <span className="status-dot" />
            <span className="mono" style={{ fontSize: '11px', color: '#888' }}>SYS.LIVE</span>
          </span>
        </div>

        {/* CENTER */}
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.label}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div className="navbar-right">
          <div className="nav-time mono">{time} IST</div>
          <Link to="/dashboard" className="btn btn-primary btn-sm">
            Launch Dashboard →
          </Link>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
              <span className="mono" style={{ color: '#555', fontSize: '11px' }}>/ </span>
              {l.label}
            </a>
          ))}
          <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '16px', textAlign: 'center', justifyContent: 'center' }}>
            Launch Dashboard →
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
