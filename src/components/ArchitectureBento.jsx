import React from 'react'
import chipImg from '../assets/quantum_cyber_chip.jpg'
import './ArchitectureBento.css'

export default function ArchitectureBento() {
  return (
    <section className="bento-section" id="architecture">
      <div className="ambient-glow-amber bento-glow-left" />
      <div className="ambient-glow-cyan bento-glow-right" />

      <div className="bento-container">
        {/* Section Header */}
        <div className="bento-header">
          <div className="bento-badge font-mono">
            // TWINAI NEURAL ARCHITECTURE
          </div>
          <h2 className="bento-title font-display">
            Dual-Core Engine <span className="bento-star">✦</span> Zero Hallucinations.
          </h2>
          <p className="bento-subtitle">
            Built on adversarial debate between two specialized AI models and mathematically bounded graph data science.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Card 1: Large Featured 3D Quantum Chip Card */}
          <div className="bento-card bento-card-large glass-card">
            <div className="chip-card-content">
              <div className="chip-tag font-mono">
                ✦ QUANTUM NEURAL ACCELERATOR
              </div>
              <h3 className="chip-headline font-display">
                AI × INTELLIGENCE:<br />
                <span className="chip-headline-sub">ONE FUTURE, ONE FORCE</span>
              </h3>
              <p className="chip-desc">
                High-throughput neural processing engine designed to synthesize complex telecom tower dumps, encrypted transaction trees, and multi-state FIR records into coherent criminal syndicate topologies in under 2 seconds.
              </p>
              <div className="chip-specs-row">
                <div className="chip-spec font-mono">
                  <span className="spec-val">50,000+</span>
                  <span className="spec-lbl">Nodes / Second</span>
                </div>
                <div className="chip-spec font-mono">
                  <span className="spec-val">99.4%</span>
                  <span className="spec-lbl">Audit Consensus</span>
                </div>
                <div className="chip-spec font-mono">
                  <span className="spec-val">0.05 vs 0.98</span>
                  <span className="spec-lbl">Victim vs Kingpin Metric</span>
                </div>
              </div>
            </div>
            <div className="chip-card-media">
              <img 
                src={chipImg} 
                alt="TwinAI Quantum Neural Processor" 
                className="chip-render-img"
              />
            </div>
          </div>

          {/* Card 2: Dual-Agent Adversarial Debate */}
          <div className="bento-card bento-card-medium glass-card">
            <div className="bento-card-top">
              <span className="bento-mini-tag font-mono" style={{ color: '#fbbf24', borderColor: 'rgba(245,158,11,0.3)' }}>
                AGENT DEBATE
              </span>
              <span className="bento-icon">⚖️</span>
            </div>
            <h4 className="bento-card-title font-display">
              Detective vs. Advocate Consensus
            </h4>
            <p className="bento-card-desc">
              Agent 1 proposes hypotheses and extracts entities; Agent 2 rigorously audits each link against hard facts to eliminate false positives and courtroom doubt.
            </p>
            <div className="agent-debate-visual">
              <div className="agent-bubble bubble-det">
                <span className="b-tag font-mono">DETECTIVE</span>
                <span className="b-text">Flagged Indrani Mukerjea &amp; Shyamvar Rai co-presence.</span>
              </div>
              <div className="agent-bubble bubble-adv">
                <span className="b-tag font-mono">ADVOCATE</span>
                <span className="b-text">Verified against CDR Tower #402. Consensus: 98%.</span>
              </div>
            </div>
          </div>

          {/* Card 3: Betweenness Centrality */}
          <div className="bento-card bento-card-medium glass-card">
            <div className="bento-card-top">
              <span className="bento-mini-tag font-mono" style={{ color: '#00f0ff', borderColor: 'rgba(0,240,255,0.3)' }}>
                GRAPH MATHEMATICS
              </span>
              <span className="bento-icon">👑</span>
            </div>
            <h4 className="bento-card-title font-display">
              Betweenness Centrality Matrix
            </h4>
            <p className="bento-card-desc">
              Standard AI confuses victims with perpetrators. TwinAI calculates shortest communication paths, proving the mastermind is the central traffic bridge.
            </p>
            <div className="math-formula-box font-mono">
              <div className="formula-line">C_B(v) = Σ (σ_st(v) / σ_st)</div>
              <div className="formula-status">✓ Mastermind: 0.98 Peak | Victim: 0.05 Leaf</div>
            </div>
          </div>

          {/* Card 4: BSA Sec 65B Electronic Dossier */}
          <div className="bento-card bento-card-small glass-card">
            <div className="bento-card-top">
              <span className="bento-mini-tag font-mono" style={{ color: '#34d399', borderColor: 'rgba(16,185,129,0.3)' }}>
                LEGAL PROVENANCE
              </span>
              <span className="bento-icon">🛡️</span>
            </div>
            <h4 className="bento-card-title font-display">
              Sec 65B Forensic Integrity
            </h4>
            <p className="bento-card-desc">
              Every graph node and timeline event is timestamped and cryptographically hashed with SHA-256 for instant admissibility in Sessions &amp; High Courts.
            </p>
            <div className="hash-pill font-mono">
              SHA256: 7f83b1...26d9069 [LOCKED]
            </div>
          </div>

          {/* Card 5: Real-Time Multi-Case Ingestion */}
          <div className="bento-card bento-card-small glass-card">
            <div className="bento-card-top">
              <span className="bento-mini-tag font-mono" style={{ color: '#a78bfa', borderColor: 'rgba(139,92,246,0.3)' }}>
                INTER-STATE SYNDICATES
              </span>
              <span className="bento-icon">⚡</span>
            </div>
            <h4 className="bento-card-title font-display">
              Cross-FIR Syndicate Unification
            </h4>
            <p className="bento-card-desc">
              Automatically stitches isolated FIRs across Delhi, Punjab, and Maharashtra to reveal national-level crime cartels operating under shell fronts.
            </p>
            <div className="syndicate-pill font-mono">
              3 States · 14 FIRs · 1 Unified Cartel
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
