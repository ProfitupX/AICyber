import React from 'react'
import { Link } from 'react-router-dom'
import heroBustImg from '../assets/hero_cyber_bust.jpg'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Ambient Lighting Flares */}
      <div className="ambient-glow-amber hero-flare-left" />
      <div className="ambient-glow-cyan hero-flare-right" />

      {/* Giant Kinetic Typography Layer */}
      <div className="hero-bg-text-layer font-display" aria-hidden="true">
        <div className="bg-text-line-1">- THE FUTURE -</div>
        <div className="bg-text-line-2">OF INTELLIGENCE</div>
      </div>

      <div className="hero-container">
        {/* Top Tag Pill */}
        <div className="hero-top-badge">
          <span className="badge-dot-live" />
          <span className="font-mono hero-top-badge-text">
            TWINAI NATIONAL CRIME INTELLIGENCE PLATFORM ✦ BNS 2023 & SEC 65B
          </span>
        </div>

        {/* Main Central Stage */}
        <div className="hero-stage">
          {/* Left Floating Metric Card */}
          <div className="hero-floating-card card-left glass-card animate-float">
            <div className="stat-num font-display">99.4%</div>
            <div className="stat-label">Court Audit Accuracy</div>
            <div className="stat-sub font-mono">✦ Zero Hallucination Guarantee</div>
          </div>

          {/* Center 3D Cyber AI Bust */}
          <div className="hero-visual-wrapper">
            <div className="hero-visual-halo" />
            <img 
              src={heroBustImg} 
              alt="TwinAI Cybernetic AI Investigator" 
              className="hero-bust-img"
            />
            {/* Visual Overlays & Sensor Highlights */}
            <div className="sensor-tag sensor-detective font-mono">
              <span className="dot-amber" /> DETECTIVE AGENT
            </div>
            <div className="sensor-tag sensor-advocate font-mono">
              <span className="dot-cyan" /> ADVOCATE AGENT
            </div>
          </div>

          {/* Right Floating Metric Card */}
          <div className="hero-floating-card card-right glass-card animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="stat-num font-display">50K+</div>
            <div className="stat-label">Graph Nodes Traversed</div>
            <div className="stat-sub font-mono">✦ &lt;1.2s Betweenness Compute</div>
          </div>
        </div>

        {/* Hero Copy & Actions */}
        <div className="hero-copy-wrap">
          <h1 className="hero-title font-display">
            See the reason. <span className="title-star">✦</span> Take action.
          </h1>
          <p className="hero-desc">
            TwinAI ingests unorganized FIRs, CDRs &amp; Hawala logs — using adversarial{' '}
            <span className="highlight-amber">Detective</span> vs <span className="highlight-cyan">Advocate</span>{' '}
            Dual-Agent AI to uncover hidden syndicates and isolate kingpins with mathematical proof.
          </p>

          <div className="hero-actions-row">
            <Link to="/dashboard" className="btn-pill-white btn-lg hero-btn-main">
              Launch Investigation Console
              <span className="btn-arrow">→</span>
            </Link>
            <a href="#how-it-works" className="btn-pill-glass btn-lg hero-btn-sub">
              See How It Works
            </a>
          </div>

          <div className="hero-trust-note font-mono">
            ⚖️ Certified for Court Dossiers under Bharatiya Sakshya Adhiniyam (BSA) Sec 65B
          </div>
        </div>

        {/* Trust & Agency Partners Banner */}
        <div className="hero-partners-wrap">
          <div className="partners-label font-mono">
            ENGINEERED FOR NATIONAL LAW ENFORCEMENT &amp; CYBER COMMAND
          </div>
          <div className="partners-row">
            <div className="partner-item"><span className="partner-dot" /> CBI Special Crimes</div>
            <div className="partner-item"><span className="partner-dot" /> CERT-In Cyber Cells</div>
            <div className="partner-item"><span className="partner-dot" /> State STF Wings</div>
            <div className="partner-item"><span className="partner-dot" /> Financial Intelligence Unit</div>
            <div className="partner-item"><span className="partner-dot" /> Interpol Red Notice Interface</div>
          </div>
        </div>
      </div>
    </section>
  )
}
