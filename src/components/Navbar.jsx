import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar-container">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          <div className="brand-icon-wrap">
            <span className="brand-dot-amber" />
            <span className="brand-dot-cyan" />
          </div>
          <span className="brand-name font-display">TwinAI</span>
          <span className="brand-tag font-mono">v2.4</span>
        </Link>

        {/* Center Nav Links */}
        <div className="nav-links-desktop">
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#architecture" className="nav-link">Dual Engine</a>
          <a href="#live-graph" className="nav-link">Network Graph</a>
          <a href="#compliance" className="nav-link">Compliance</a>
        </div>

        {/* Action Controls */}
        <div className="nav-actions">
          <Link to="/dashboard/chat" className="nav-link-subtle font-mono">
            Copilot AI
          </Link>
          <Link to="/dashboard" className="btn btn-pill-white btn-sm nav-cta-btn">
            Launch Console
            <span className="cta-arrow">→</span>
          </Link>
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`bar ${mobileOpen ? 'open' : ''}`} />
            <span className={`bar ${mobileOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer animate-fadein">
          <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#architecture" onClick={() => setMobileOpen(false)}>Dual Engine</a>
          <a href="#live-graph" onClick={() => setMobileOpen(false)}>Network Graph</a>
          <a href="#compliance" onClick={() => setMobileOpen(false)}>Compliance</a>
          <div className="mobile-drawer-btns">
            <Link to="/dashboard" className="btn btn-pill-white" onClick={() => setMobileOpen(false)}>
              Launch Console →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
