import React from 'react'
import './Footer.css'

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="brand" style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ fontSize:'20px', color:'var(--accent-purple-light)' }}>⬡</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'18px', fontWeight:700 }}>
              TWIN<span style={{ color:'var(--accent-purple-light)' }}>AI</span>
            </span>
          </div>
          <p style={{ fontSize:'13px', color:'#555', lineHeight:1.6, maxWidth:'280px', marginTop:'12px' }}>
            AI-Powered Criminal Intelligence &amp; Knowledge Graph Platform.<br />
            Next-Gen Law Enforcement Analytics.
          </p>
          <div className="footer-badges">
            <span className="tag tag-purple">Enterprise Ready</span>
            <span className="tag tag-green">ISO/IEC 27001 Compliant</span>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <div className="mono footer-col-title">Platform</div>
            {['Overview', 'Graph Engine', 'Kingpin Detection', 'Evidence Vault', 'AI Copilot'].map(l => (
              <a key={l} href="/dashboard" className="footer-link">{l}</a>
            ))}
          </div>
          <div className="footer-col">
            <div className="mono footer-col-title">Resources</div>
            {['Documentation', 'API Reference', 'Security Whitepaper', 'System Architecture', 'Compliance'].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
          <div className="footer-col">
            <div className="mono footer-col-title">Enterprise</div>
            {['Request Demo', 'Cloud & On-Prem', 'Security Audit', 'Support'].map(l => (
              <a key={l} href="#contact" className="footer-link">{l}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="mono" style={{ fontSize:'10px', color:'#444' }}>
          © 2026 TwinAI Technologies. All rights reserved.
        </span>
        <div className="footer-bottom-right">
          <span className="mono" style={{ fontSize:'10px', color:'var(--accent-green)' }}>
            ● CONNECTION_SECURE
          </span>
          <span className="mono" style={{ fontSize:'10px', color:'#444' }}>
            SCN:0001 | NODE:TWINAI_01
          </span>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
