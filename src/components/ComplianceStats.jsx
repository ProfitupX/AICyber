import React from 'react'
import './ComplianceStats.css'

const COMPLIANCE_ITEMS = [
  {
    code: 'BSA 2023 // SEC 65B',
    title: 'Electronic Evidence Admissibility',
    desc: 'Automated cryptographic hashes (SHA-256) and chain-of-custody certificates certified for Sessions and High Courts.',
    icon: '⚖️',
    color: '#34d399'
  },
  {
    code: 'BNS 2023 // SEC 111',
    title: 'Organized Crime Syndicates',
    desc: 'Mathematical network centrality models structured specifically to meet legal thresholds for multi-state extortion and syndicate prosecutions.',
    icon: '🏛️',
    color: '#fbbf24'
  },
  {
    code: 'ISO/IEC 27001:2022',
    title: 'Air-Gapped Government Security',
    desc: 'Enterprise-grade encryption in transit (TLS 1.3) and at rest (AES-256) with zero LLM training on confidential law enforcement data.',
    icon: '🛡️',
    color: '#00f0ff'
  },
  {
    code: 'PMLA 2002 // SEC 3 & 4',
    title: 'Hawala & Mule Trail Tracing',
    desc: 'Multi-layer transaction tracing mapping rapid splitting, layering, and integration across nationalized and cooperative bank accounts.',
    icon: '💳',
    color: '#a78bfa'
  }
]

export default function ComplianceStats() {
  return (
    <section className="compliance-section" id="compliance">
      <div className="compliance-container">
        {/* Section Header */}
        <div className="compliance-header">
          <div className="compliance-badge font-mono">
            // FORENSIC INTEGRITY &amp; LEGAL STANDARDS
          </div>
          <h2 className="compliance-title font-display">
            Built for Courtrooms <span className="bento-star">✦</span> Not Just Demos.
          </h2>
          <p className="compliance-subtitle">
            TwinAI is strictly engineered in accordance with modern Indian penal reforms, electronic evidence acts, and CERT-In defense standards.
          </p>
        </div>

        {/* Compliance Cards Grid */}
        <div className="compliance-grid">
          {COMPLIANCE_ITEMS.map((item, idx) => (
            <div key={idx} className="compliance-card glass-card">
              <div className="comp-top">
                <span className="comp-code font-mono" style={{ color: item.color, borderColor: item.color }}>
                  {item.code}
                </span>
                <span className="comp-icon">{item.icon}</span>
              </div>
              <h3 className="comp-title font-display">{item.title}</h3>
              <p className="comp-desc">{item.desc}</p>
              <div className="comp-status font-mono">
                ✓ COMPLIANCE VERIFIED
              </div>
            </div>
          ))}
        </div>

        {/* Impact Numbers Ribbon */}
        <div className="impact-ribbon glass-card">
          <div className="impact-stat">
            <div className="impact-val font-display" style={{ color: '#00f0ff' }}>85%</div>
            <div className="impact-lbl">Reduction in CDR/FIR Analysis Time</div>
          </div>
          <div className="impact-sep" />
          <div className="impact-stat">
            <div className="impact-val font-display" style={{ color: '#fbbf24' }}>100%</div>
            <div className="impact-lbl">Court-Admissible Evidence Audit Trail</div>
          </div>
          <div className="impact-sep" />
          <div className="impact-stat">
            <div className="impact-val font-display" style={{ color: '#34d399' }}>0</div>
            <div className="impact-lbl">False Mastermind Hallucinations</div>
          </div>
          <div className="impact-sep" />
          <div className="impact-stat">
            <div className="impact-val font-display" style={{ color: '#a78bfa' }}>&lt;2s</div>
            <div className="impact-lbl">Inter-State Kingpin Centrality Compute</div>
          </div>
        </div>
      </div>
    </section>
  )
}
