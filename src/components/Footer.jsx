import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-brand-logo">
              <div className="brand-icon-wrap">
                <span className="brand-dot-amber" />
                <span className="brand-dot-cyan" />
              </div>
              <span className="brand-name font-display">TwinAI</span>
            </div>
            <p className="footer-brand-desc">
              National AI-Powered Criminal Network &amp; Syndicate Analysis System. Engineered for Law Enforcement, Intelligence Wings, and Cyber Defense Command.
            </p>
            <div className="footer-badge-item font-mono">
              ⚖️ BNS 2023 &amp; BSA Sec 65B Compliant
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <div className="footer-col-title font-mono">PLATFORM</div>
            <ul className="footer-links">
              <li><Link to="/dashboard">Investigation Console</Link></li>
              <li><Link to="/dashboard/graph">Network Graph 3D</Link></li>
              <li><Link to="/dashboard/suspects">Kingpin Registry</Link></li>
              <li><Link to="/dashboard/cases">Active Case Files</Link></li>
              <li><Link to="/dashboard/upload">Evidence Ingestion</Link></li>
              <li><Link to="/dashboard/chat">Copilot AI Assistant</Link></li>
            </ul>
          </div>

          {/* Architecture */}
          <div className="footer-col">
            <div className="footer-col-title font-mono">INTELLIGENCE</div>
            <ul className="footer-links">
              <li><a href="#how-it-works">4-Stage Pipeline</a></li>
              <li><a href="#architecture">Dual-Agent Engine</a></li>
              <li><a href="#architecture">Betweenness Centrality</a></li>
              <li><a href="#compliance">Sec 65B Evidence Vault</a></li>
              <li><a href="#live-graph">Live Simulator</a></li>
            </ul>
          </div>

          {/* Security */}
          <div className="footer-col">
            <div className="footer-col-title font-mono">DEFENSE STANDARDS</div>
            <ul className="footer-links">
              <li><span className="footer-muted">CERT-In Air-Gapped Ready</span></li>
              <li><span className="footer-muted">AES-256 &amp; TLS 1.3 Encryption</span></li>
              <li><span className="footer-muted">Zero LLM Training on Data</span></li>
              <li><span className="footer-muted">Postgres &amp; Supabase RLS</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy font-mono">
            © {new Date().getFullYear()} TwinAI National Crime Intelligence System. All rights reserved.
          </div>
          <div className="footer-status-pill font-mono">
            <span className="pulse-dot pulse-green" />
            <span>ALL DEFENSE ENGINES OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
