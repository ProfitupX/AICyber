import React, { useState } from 'react'
import './Features.css'

const features = [
  {
    num: '/01',
    icon: '📤',
    title: 'Smart Data Ingestion',
    tag: 'DATA LAYER',
    tagClass: 'tag-purple',
    desc: 'Upload FIR PDFs, Bank Statements (CSV), and Call Detail Records. AI automatically cleans, parses, and structures raw unorganized data.',
    details: ['PDF text extraction via OCR', 'CSV/Excel automatic parsing', 'Data deduplication & cleaning', 'Multi-format support', 'Batch upload processing'],
    visual: 'upload',
  },
  {
    num: '/02',
    icon: '🕸',
    title: 'Visual Network Graph',
    tag: 'VISUALIZATION',
    tagClass: 'tag-cyan',
    desc: 'An interactive node-and-edge UI powered by Graph Analytics. Drag, drop, zoom, click on nodes (suspects) to see exactly why they are connected.',
    details: ['Drag & drop node positioning', 'Click-to-inspect connections', 'Real-time graph updates', 'Filter by entity type', 'Export as PNG / PDF'],
    visual: 'graph',
  },
  {
    num: '/03',
    icon: '👑',
    title: 'Kingpin Identification',
    tag: 'ANALYTICS',
    tagClass: 'tag-yellow',
    desc: 'Graph Centrality algorithms (Betweenness, PageRank) automatically highlight the most influential person in a criminal network.',
    details: ['Betweenness centrality', 'PageRank scoring', 'Influence radius mapping', 'Gang hierarchy detection', 'Real-time re-ranking'],
    visual: 'kingpin',
  },
  {
    num: '/04',
    icon: '💬',
    title: 'Conversational Querying',
    tag: 'AI CHAT',
    tagClass: 'tag-green',
    desc: 'Officers can query in natural language: "Show me everyone connected to John in the last 30 days." AI translates to graph queries.',
    details: ['Natural language → Cypher query', 'Context-aware follow-ups', 'Date range filtering', 'Relationship type filtering', 'Evidence chain export'],
    visual: 'chat',
  },
]

const FeatureVisual = ({ type }) => {
  if (type === 'upload') return (
    <div className="fv-upload">
      {['FIR_REPORT_2024.pdf', 'CDR_SUSPECTS.csv', 'BANK_STMT_OCT.xlsx'].map((f, i) => (
        <div className="fv-file" key={f} style={{ animationDelay: `${i * 0.2}s` }}>
          <span className="fv-file-icon">{i === 0 ? '📄' : i === 1 ? '📊' : '📑'}</span>
          <span className="mono" style={{ fontSize: '11px', color: '#888' }}>{f}</span>
          <span className="fv-badge mono" style={{ fontSize: '9px', color: 'var(--accent-green)' }}>PARSED ✓</span>
        </div>
      ))}
    </div>
  )

  if (type === 'graph') return (
    <div className="fv-graph">
      <svg viewBox="0 0 200 140" className="fv-svg">
        <defs>
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Edges */}
        <line x1="100" y1="70" x2="50" y2="30" stroke="rgba(124,58,237,0.4)" strokeWidth="1"/>
        <line x1="100" y1="70" x2="160" y2="35" stroke="rgba(124,58,237,0.3)" strokeWidth="1"/>
        <line x1="100" y1="70" x2="40" y2="110" stroke="rgba(57,255,20,0.3)" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="100" y1="70" x2="165" y2="105" stroke="rgba(124,58,237,0.3)" strokeWidth="1"/>
        <line x1="50" y1="30" x2="160" y2="35" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        {/* Kingpin node */}
        <circle cx="100" cy="70" r="18" fill="url(#glow1)"/>
        <circle cx="100" cy="70" r="10" fill="#7c3aed"/>
        <text x="100" y="52" textAnchor="middle" fill="#a855f7" fontSize="7" fontFamily="monospace">KINGPIN</text>
        {/* Other nodes */}
        {[[50,30,'#39ff14'],[160,35,'#888'],[40,110,'#888'],[165,105,'#888']].map(([x,y,c],i) => (
          <circle key={i} cx={x} cy={y} r="6" fill={c} fillOpacity="0.8"/>
        ))}
      </svg>
    </div>
  )

  if (type === 'kingpin') return (
    <div className="fv-kingpin">
      {[
        { name: 'RAJAN K.', score: 94, color: 'var(--accent-yellow)', rank: '#1 KINGPIN' },
        { name: 'PRIYA M.', score: 71, color: 'var(--accent-purple-light)', rank: '#2 ASSOCIATE' },
        { name: 'ARJUN S.', score: 58, color: '#666', rank: '#3 FINANCIER' },
      ].map((p, i) => (
        <div className="fv-rank-row" key={p.name}>
          <span className="mono" style={{ fontSize: '10px', color: p.color, width: '20px' }}>#{i+1}</span>
          <span style={{ fontSize: '13px', flex: 1 }}>{p.name}</span>
          <div className="fv-rank-bar-wrap">
            <div className="fv-rank-bar">
              <div className="fv-rank-fill" style={{ width: `${p.score}%`, background: p.color }} />
            </div>
          </div>
          <span className="mono" style={{ fontSize: '10px', color: p.color }}>{p.score}</span>
        </div>
      ))}
    </div>
  )

  if (type === 'chat') return (
    <div className="fv-chat">
      <div className="fv-msg user">
        <span className="fv-msg-label mono">IO</span>
        <span className="fv-msg-text">Show everyone connected to Rajan in last 30 days</span>
      </div>
      <div className="fv-msg ai">
        <span className="fv-msg-label mono accent-purple">AI</span>
        <span className="fv-msg-text accent-green">Found 7 connections: 3 direct, 4 indirect via financial links.</span>
      </div>
      <div className="fv-msg user">
        <span className="fv-msg-label mono">IO</span>
        <span className="fv-msg-text">Show the financial proof</span>
      </div>
      <div className="fv-msg ai typing">
        <span className="fv-msg-label mono accent-purple">AI</span>
        <span className="typing-dots"><span/><span/><span/></span>
      </div>
    </div>
  )

  return null
}

const Features = () => {
  const [active, setActive] = useState(0)
  const f = features[active]

  return (
    <section className="features" id="features">
      <div className="features-inner">

        {/* Header */}
        <div className="features-header">
          <div className="section-label">// 04 — Key Features</div>
          <h2 className="features-title">
            Built for <span className="accent-purple">Investigators</span>,<br />
            Powered by <span className="accent-green">AI</span>
          </h2>
        </div>

        <div className="features-body">
          {/* Feature list */}
          <div className="features-list">
            {features.map((feat, i) => (
              <div
                key={feat.num}
                className={`feat-item ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="feat-item-left">
                  <span className="feat-num mono">{feat.num}</span>
                  <span className="feat-icon">{feat.icon}</span>
                </div>
                <div className="feat-item-right">
                  <div className="feat-item-top">
                    <h3 className="feat-item-title">{feat.title}</h3>
                    <span className={`tag ${feat.tagClass}`}>{feat.tag}</span>
                  </div>
                  <p className="feat-item-desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature detail panel */}
          <div className="features-detail">
            <div className="features-visual">
              <FeatureVisual type={f.visual} />
            </div>
            <div className="features-checklist">
              <div className="mono" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em', marginBottom: '12px' }}>
                CAPABILITIES
              </div>
              {f.details.map(d => (
                <div className="check-item" key={d}>
                  <span className="check-mark accent-green">✓</span>
                  <span style={{ fontSize: '13px', color: '#888' }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
