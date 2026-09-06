import React from 'react'
import './TechStack.css'

const stack = [
  {
    layer: 'Frontend UI',
    items: [
      { name: 'React.js / Next.js', desc: 'Enterprise investigation dashboard UI', icon: '⚛' },
      { name: 'Cytoscape.js', desc: 'Interactive graph topology & digital red thread board', icon: '🕸' },
      { name: 'Vite 8', desc: 'High-performance optimized build pipeline', icon: '⚡' },
    ],
    color: 'var(--accent-cyan, #06b6d4)',
    status: 'BUILT',
  },
  {
    layer: 'Backend & Compute',
    items: [
      { name: 'Node.js', desc: 'Event-driven asynchronous microservices', icon: '🟢' },
      { name: 'Netlify Serverless', desc: 'Serverless functions for PDF & CDR ingestion', icon: '⚡' },
      { name: 'Fast-CSV & PDF Parser', desc: 'Multi-state data cleansing & tokenization', icon: '📄' },
    ],
    color: 'var(--accent-yellow, #eab308)',
    status: 'READY',
  },
  {
    layer: 'AI Brain / LLM',
    items: [
      { name: 'Gemini 1.5 Flash API', desc: 'Zero-temp (0.0) JSON entity extraction', icon: '🧠' },
      { name: 'TwinAI Consensus Protocol', desc: 'Dual-agent adversarial verification engine', icon: '⚖' },
      { name: 'Custom SpaCy NLP', desc: 'Fine-tuned Indian FIR & IPC legal terminology', icon: '🔍' },
    ],
    color: 'var(--accent-green, #22c55e)',
    status: 'CONFIGURED',
  },
  {
    layer: 'Voice Processing',
    items: [
      { name: 'Sarvam AI (saaras:v2)', desc: 'Speech-to-Text for Tamil, Hindi, Marathi, Tanglish', icon: '🎙️' },
      { name: 'Sarvam AI (bulbul:v1)', desc: 'Natural regional audio briefing generator', icon: '🔊' },
      { name: 'Web Speech API', desc: 'Client-side zero-cost browser fallback', icon: '🌐' },
    ],
    color: 'var(--accent-purple-light, #a855f7)',
    status: 'INTEGRATED',
  },
  {
    layer: 'Database & Graph',
    items: [
      { name: 'Neo4j Graph DB', desc: 'Centrality scoring, PageRank & syndicate clusters', icon: '🕸' },
      { name: 'Supabase (PostgreSQL)', desc: 'Encrypted case dossiers, auth & audit logging', icon: '💾' },
      { name: 'Cypher Query Engine', desc: 'Multi-hop relationship traversal in <2ms', icon: '⚡' },
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
