import React from 'react'
import { Link } from 'react-router-dom'
import './CTA.css'

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-ambient-glow" />

      <div className="cta-card-wrap glass-card">
        <div className="cta-pill font-mono">
          // ENTERPRISE INTELLIGENCE DEPLOYMENT
        </div>
        <h2 className="cta-title font-display">
          Ready to deploy <span className="cta-highlight">National-Grade Intelligence?</span>
        </h2>
        <p className="cta-desc">
          Connect live evidence, run the adversarial dual-agent consensus engine, and generate court-admissible dossiers in seconds.
        </p>

        <div className="cta-btn-row">
          <Link to="/dashboard" className="btn-pill-white btn-lg cta-main-btn">
            Launch Investigation Console
            <span className="btn-arrow">→</span>
          </Link>
          <Link to="/dashboard/chat" className="btn-pill-glass btn-lg">
            Open Copilot AI Assistant
          </Link>
        </div>

        <div className="cta-meta-row font-mono">
          <span>✓ Supabase Live Sync</span>
          <span>·</span>
          <span>✓ Gemini Flash-Lite Optimizations</span>
          <span>·</span>
          <span>✓ BSA Sec 65B Certified</span>
        </div>
      </div>
    </section>
  )
}
