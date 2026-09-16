import React from 'react'
import { IconCpu, IconNetwork, IconZap, IconActivity, IconFileText, IconScale, IconSearch, IconMic, IconVolume2, IconDatabase } from './common/Icons.jsx'
import './TechStack.css'

const stack = [
  {
    layer: 'Frontend UI',
    items: [
      { name: 'TwinAI Command Console UI', desc: 'Enterprise investigation dashboard UI', icon: <IconCpu size={18} color="var(--accent-cyan, #06b6d4)" /> },
      { name: 'Cytoscape.js Graph Engine', desc: 'Interactive graph topology & digital red thread board', icon: <IconNetwork size={18} color="var(--accent-cyan, #06b6d4)" /> },
      { name: 'Realtime Pipeline Engine', desc: 'High-performance optimized build pipeline', icon: <IconZap size={18} color="var(--accent-cyan, #06b6d4)" /> },
    ],
    color: 'var(--accent-cyan, #06b6d4)',
    status: 'BUILT',
  },
  {
    layer: 'Backend & Compute',
    items: [
      { name: 'Asynchronous Microservices', desc: 'Event-driven high-throughput processing', icon: <IconActivity size={18} color="var(--accent-yellow, #eab308)" /> },
      { name: 'Serverless Compute Nodes', desc: 'Secure functions for PDF & CDR ingestion', icon: <IconZap size={18} color="var(--accent-yellow, #eab308)" /> },
      { name: 'Fast-CSV & PDF Parser', desc: 'Multi-state data cleansing & tokenization', icon: <IconFileText size={18} color="var(--accent-yellow, #eab308)" /> },
    ],
    color: 'var(--accent-yellow, #eab308)',
    status: 'READY',
  },
  {
    layer: 'AI Brain & Dual Agents',
    items: [
      { name: 'TwinAI Cognitive NLP Core', desc: 'Zero-temp (0.0) JSON entity extraction', icon: <IconCpu size={18} color="var(--accent-green, #22c55e)" /> },
      { name: 'TwinAI Consensus Protocol', desc: 'Dual-agent adversarial verification engine', icon: <IconScale size={18} color="var(--accent-green, #22c55e)" /> },
      { name: 'Criminal Entity Resolution NLP', desc: 'Fine-tuned Indian FIR & statutory legal terminology', icon: <IconSearch size={18} color="var(--accent-green, #22c55e)" /> },
    ],
    color: 'var(--accent-green, #22c55e)',
    status: 'CONFIGURED',
  },
  {
    layer: 'Voice Processing',
    items: [
      { name: 'Indic Speech-to-Text Engine', desc: 'Speech-to-Text for Tamil, Hindi, Marathi, Tanglish', icon: <IconMic size={18} color="var(--accent-purple-light, #a855f7)" /> },
      { name: 'Regional Audio Briefing Generator', desc: 'Natural regional audio briefing generator', icon: <IconVolume2 size={18} color="var(--accent-purple-light, #a855f7)" /> },
      { name: 'Client-Side Audio Engine', desc: 'Client-side zero-cost browser fallback', icon: <IconActivity size={18} color="var(--accent-purple-light, #a855f7)" /> },
    ],
    color: 'var(--accent-purple-light, #a855f7)',
    status: 'INTEGRATED',
  },
  {
    layer: 'Database & Graph',
    items: [
      { name: 'High-Throughput Graph Engine', desc: 'Centrality scoring, PageRank & syndicate clusters', icon: <IconNetwork size={18} color="var(--accent-cyan, #0ea5e9)" /> },
      { name: 'TwinAI Secure Relational Ledger', desc: 'Encrypted case dossiers, auth & audit logging', icon: <IconDatabase size={18} color="var(--accent-cyan, #0ea5e9)" /> },
      { name: 'Cypher Query Engine', desc: 'Multi-hop relationship traversal in <2ms', icon: <IconZap size={18} color="var(--accent-cyan, #0ea5e9)" /> },
    ],
    color: 'var(--accent-cyan, #0ea5e9)',
    status: 'READY',
  },
]

const TechStack = () => (
  <section className="techstack" id="tech">
    <div className="tech-inner">
      <div className="tech-header">
        <div className="section-label">// 06 — Technology Stack</div>
        <h2 className="tech-title">
          Enterprise-Grade <span className="accent-purple">Stack</span><br />
          Built to <span className="accent-green">Scale</span>
        </h2>
        <p className="tech-subtitle">
          Every layer chosen for reliability, zero-hallucination precision, and high-security compliance for law enforcement agencies.
        </p>
      </div>

      <div className="tech-grid">
        {stack.map(s => (
          <div className="tech-layer" key={s.layer}>
            <div className="tech-layer-header">
              <div className="tech-layer-title" style={{ color: s.color }}>{s.layer}</div>
              <span className="tech-layer-status mono" style={{ color: 'var(--accent-green, #22c55e)' }}>
                ● {s.status}
              </span>
            </div>
            <div className="tech-items">
              {s.items.map(item => (
                <div className="tech-item" key={item.name}>
                  <span className="tech-item-icon">{item.icon}</span>
                  <div>
                    <div className="tech-item-name">{item.name}</div>
                    <div className="tech-item-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture note */}
      <div className="tech-note">
        <span className="mono" style={{ fontSize: '10px', color: '#888', letterSpacing: '0.1em' }}>
          // ARCHITECTURE & ENTERPRISE COMPLIANCE
        </span>
        <p style={{ fontSize: '14px', color: '#aaa', lineHeight: 1.6 }}>
          Designed for high-security enterprise and law enforcement deployments. High-throughput pipeline optimized for multi-source criminal network investigations, CDR analysis, and financial intelligence.
        </p>
      </div>
    </div>
  </section>
)

export default TechStack
