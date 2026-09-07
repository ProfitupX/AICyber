import React, { useState } from 'react'
import './HowItWorks.css'

const STEPS_DATA = [
  {
    num: '1',
    title: 'Connect your evidence',
    shortDesc: 'Securely ingest unstructured FIRs, multi-lakh CDR dumps, mule bank statements, and seized forensic data.',
    details: 'Supports scanned PDFs, multi-state FIRs, telecom CSV dumps, and UPI/Hawala logs with zero manual data entry required.',
    previewTitle: 'Ingestion Pipeline & Automated OCR',
    previewBadge: 'STAGE 01: RAW INGESTION',
    previewBadgeColor: '#f59e0b',
    previewContent: {
      type: 'ingest',
      items: [
        { name: 'FIR_2024_089_Bathinda.pdf', size: '2.4 MB', status: 'PARSED', count: '18 Entities Found' },
        { name: 'CDR_Dump_Target_Tower_Dump.csv', size: '14.8 MB', status: 'INGESTED', count: '34,200 Call Logs' },
        { name: 'Hawala_Mule_Accounts_HDFC.xlsx', size: '1.1 MB', status: 'MAPPED', count: '₹85.4 Cr Layered' }
      ]
    }
  },
  {
    num: '2',
    title: 'Detect cross-case patterns',
    shortDesc: 'Agent 1 (The Detective) runs NLP entity resolution across multi-jurisdictional police databases.',
    details: 'Instantly matches aliases, co-presence GPS towers, burner SIM patterns, and front-company director linkages.',
    previewTitle: 'Detective Agent NLP Entity Extraction',
    previewBadge: 'STAGE 02: ADVERSARIAL NLP',
    previewBadgeColor: '#a78bfa',
    previewContent: {
      type: 'detect',
      entities: [
        { type: 'TARGET', name: 'Indrani Mukerjea @ Boss', role: 'APEX ORCHESTRATOR', risk: 'CRITICAL (98%)' },
        { type: 'EXECUTOR', name: 'Shyamvar Rai', role: 'DRIVER / LOGISTICS', risk: 'HIGH (88%)' },
        { type: 'ACCOMPLICE', name: 'Sanjeev Khanna', role: 'CO-CONSPIRATOR', risk: 'HIGH (84%)' },
        { type: 'VICTIM', name: 'Sheena Bora', role: 'TERMINAL LEAF NODE', risk: 'NONE (0.05 Centrality)' }
      ]
    }
  },
  {
    num: '3',
    title: 'Audit & Graph Centrality',
    shortDesc: 'Agent 2 (The Advocate) mathematically computes Betweenness Centrality, isolating true kingpins.',
    details: 'Adversarial consensus debunks false leads, prevents hallucinations, and mathematically proves who bridges all criminal actions.',
    previewTitle: 'Betweenness Centrality & Kingpin Isolation',
    previewBadge: 'STAGE 03: GRAPH MATHEMATICS',
    previewBadgeColor: '#00f0ff',
    previewContent: {
      type: 'centrality',
      kingpin: {
        name: 'Indrani Mukerjea',
        betweenness: '0.98 Peak',
        degree: '42 Linked Nodes',
        verdict: 'CONFIRMED APEX MASTERMIND'
      },
      audit: 'Consensus Score: 98% (Certified Zero Hallucination)'
    }
  },
  {
    num: '4',
    title: 'Take court-ready action',
    shortDesc: 'Export tamper-evident Bharatiya Sakshya Adhiniyam Sec 65B dossiers with cryptographic SHA-256 signatures.',
    details: 'One-click generation of BNS 2023 compliant charge-sheet appendices, network graphs, and call timelines for magistrates.',
    previewTitle: 'BSA 2023 Sec 65B Electronic Dossier',
    previewBadge: 'STAGE 04: LEGAL ACTION',
    previewBadgeColor: '#34d399',
    previewContent: {
      type: 'court',
      dossierId: 'DOSSIER-2024-BNS-65B-991',
      hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      admissibility: 'CERTIFIED FOR COURT PRESENTATION'
    }
  }
]

export default function HowItWorks() {
  const [activeIdx, setActiveIdx] = useState(0)
  const currentStep = STEPS_DATA[activeIdx]

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="ambient-glow-cyan how-glow" />

      <div className="how-container">
        {/* Left Column: Headers, Stepper & Explainable Card */}
        <div className="how-left-col">
          <div className="how-header-wrap">
            <h2 className="how-heading font-display">
              How TwinAI works <span className="how-star">✦</span>
            </h2>
            <p className="how-subheading">
              From raw evidence to court-ready indictment in minutes.
            </p>
          </div>

          {/* 4-Step Vertical Stepper (Direct FocusLab UI) */}
          <div className="stepper-vertical-list">
            {STEPS_DATA.map((step, idx) => {
              const isActive = activeIdx === idx
              return (
                <div 
                  key={step.num}
                  className={`stepper-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                >
                  <div className={`step-number-box font-display ${isActive ? 'active-box' : ''}`}>
                    {step.num}
                  </div>
                  <div className="step-text-wrap">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.shortDesc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Explainable AI Card (FocusLab Style) */}
          <div className="explainable-card glass-card">
            <div className="explainable-icon-row">
              <span className="explainable-sparkle">✦</span>
              <span className="explainable-tag font-mono">LEGAL EXPLAINABILITY</span>
            </div>
            <ul className="explainable-list">
              <li>✦ Dual-Agent Adversarial Consensus</li>
              <li>✦ Zero Black-Box Hallucinations</li>
              <li>✦ Mathematical Betweenness Centrality</li>
              <li>✦ SHA-256 Chain of Custody</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Dynamic Interactive Preview Stage */}
        <div className="how-right-col">
          <div className="preview-stage-card glass-card">
            {/* Top Stage Bar */}
            <div className="stage-top-bar">
              <div className="stage-badge font-mono" style={{ color: currentStep.previewBadgeColor, borderColor: currentStep.previewBadgeColor }}>
                {currentStep.previewBadge}
              </div>
              <div className="stage-title-text font-tech">
                {currentStep.previewTitle}
              </div>
            </div>

            {/* Stage Body */}
            <div className="stage-body">
              {currentStep.previewContent.type === 'ingest' && (
                <div className="stage-ingest-view animate-fadein">
                  <div className="ingest-instruction font-mono">
                    // AUTOMATED INGESTION &amp; OCR NORMALIZATION
                  </div>
                  <div className="ingest-files-list">
                    {currentStep.previewContent.items.map((item, i) => (
                      <div key={i} className="ingest-file-item">
                        <div className="file-left">
                          <span className="file-icon">📄</span>
                          <div>
                            <div className="file-name">{item.name}</div>
                            <div className="file-size font-mono">{item.size}</div>
                          </div>
                        </div>
                        <div className="file-right">
                          <span className="file-count font-mono">{item.count}</span>
                          <span className="badge badge-green">{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="stage-footer-note font-mono">
                    ⚡ Zero manual entry — Direct multi-table entity ingestion
                  </div>
                </div>
              )}

              {currentStep.previewContent.type === 'detect' && (
                <div className="stage-detect-view animate-fadein">
                  <div className="ingest-instruction font-mono">
                    // AGENT 1 (THE DETECTIVE) NLP RESOLUTION
                  </div>
                  <div className="entities-list">
                    {currentStep.previewContent.entities.map((ent, i) => (
                      <div key={i} className="entity-row">
                        <span className={`badge ${ent.type === 'TARGET' ? 'badge-critical' : ent.type === 'VICTIM' ? 'badge-low' : 'badge-high'}`}>
                          {ent.type}
                        </span>
                        <span className="entity-name">{ent.name}</span>
                        <span className="entity-role font-mono">{ent.role}</span>
                        <span className="entity-risk font-mono">{ent.risk}</span>
                      </div>
                    ))}
                  </div>
                  <div className="stage-footer-note font-mono">
                    🧠 18 Entities identified &amp; cross-referenced against CDR logs
                  </div>
                </div>
              )}

              {currentStep.previewContent.type === 'centrality' && (
                <div className="stage-centrality-view animate-fadein">
                  <div className="ingest-instruction font-mono">
                    // AGENT 2 (THE ADVOCATE) GRAPH MATHEMATICS
                  </div>
                  <div className="kingpin-podium-card">
                    <div className="podium-header">
                      <span className="podium-crown">👑</span>
                      <div>
                        <div className="podium-title">ISOLATED APEX MASTERMIND</div>
                        <div className="podium-name font-display">{currentStep.previewContent.kingpin.name}</div>
                      </div>
                    </div>
                    <div className="podium-metrics-grid">
                      <div className="podium-metric">
                        <div className="p-val font-mono" style={{ color: '#00f0ff' }}>{currentStep.previewContent.kingpin.betweenness}</div>
                        <div className="p-lbl">Betweenness Score</div>
                      </div>
                      <div className="podium-metric">
                        <div className="p-val font-mono" style={{ color: '#fbbf24' }}>{currentStep.previewContent.kingpin.degree}</div>
                        <div className="p-lbl">Orchestrated Links</div>
                      </div>
                    </div>
                    <div className="podium-verdict font-mono">
                      ✓ {currentStep.previewContent.kingpin.verdict}
                    </div>
                  </div>
                  <div className="stage-footer-note font-mono">
                    ⚖️ {currentStep.previewContent.audit}
                  </div>
                </div>
              )}

              {currentStep.previewContent.type === 'court' && (
                <div className="stage-court-view animate-fadein">
                  <div className="ingest-instruction font-mono">
                    // COURT-ADMISSIBLE EVIDENCE PACK
                  </div>
                  <div className="court-dossier-card">
                    <div className="dossier-top">
                      <span className="dossier-badge font-mono">BSA SEC 65B CERTIFICATE</span>
                      <span className="dossier-id font-mono">{currentStep.previewContent.dossierId}</span>
                    </div>
                    <div className="dossier-hash-wrap">
                      <div className="hash-label font-mono">CRYPTOGRAPHIC CHECKSUM (SHA-256):</div>
                      <div className="hash-text font-mono">{currentStep.previewContent.hash}</div>
                    </div>
                    <div className="dossier-stamp font-mono">
                      ✓ {currentStep.previewContent.admissibility}
                    </div>
                  </div>
                  <div className="stage-footer-note font-mono">
                    🛡️ Tamper-evident cryptographic ledger for High Court submissions
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Stepper Indicator */}
            <div className="stage-bottom-stepper">
              <div className="step-subdesc-wrap">
                <div className="step-active-title font-display">
                  {currentStep.num}. {currentStep.title}
                </div>
                <p className="step-detailed-desc">
                  {currentStep.details}
                </p>
              </div>
              <div className="step-controls">
                <button 
                  className="btn-pill-glass btn-sm"
                  disabled={activeIdx === 0}
                  onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
                >
                  ← Prev
                </button>
                <button 
                  className="btn-pill-white btn-sm"
                  disabled={activeIdx === STEPS_DATA.length - 1}
                  onClick={() => setActiveIdx(Math.min(STEPS_DATA.length - 1, activeIdx + 1))}
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
