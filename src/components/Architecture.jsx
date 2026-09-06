import React, { useState } from 'react'
import './Architecture.css'

const Architecture = () => {
  const [activeAgent, setActiveAgent] = useState(null)

  const agents = [
    {
      id: 'detective',
      tag: 'AGENT_01',
      name: 'The Detective',
      subtitle: 'Data Parser & Entity Extractor',
      color: '#7c3aed',
      accent: 'var(--accent-purple-light)',
      icon: '🔍',
      desc: 'Parses unstructured data via NLP, extracts entities (Names, Phones, Locations, Transactions), and proposes potential connections between them.',
      tasks: ['NLP Entity Extraction', 'Relationship Proposal', 'Pattern Detection', 'CDR Analysis', 'Financial Linking'],
    },
    {
      id: 'advocate',
      tag: 'AGENT_02',
      name: "Devil's Advocate",
      subtitle: 'Cross-Verifier & Logic Auditor',
      color: '#e8ff00',
      accent: 'var(--accent-yellow)',
      icon: '⚖️',
      desc: "Cross-verifies Agent 1's claims looking for logical loopholes — e.g., 'Is there financial proof to back up this call record?'",
      tasks: ['Claim Verification', 'Loophole Detection', 'Evidence Validation', 'False Positive Filtering', 'Audit Logging'],
    },
  ]

  return (
    <section className="architecture" id="architecture">
      <div className="arch-inner">

        {/* Header */}
        <div className="arch-header">
          <div className="section-label">// 03 — TwinAI Architecture</div>
          <h2 className="arch-title">
            Two AIs That <span className="accent-purple">Debate</span> Before<br />They Decide
          </h2>
          <p className="arch-subtitle">
            Unlike single-model AI that blindly generates results, our TwinAI architecture 
            employs adversarial consensus — ensuring every connection is debate-verified.
          </p>
        </div>

        {/* Main architecture diagram */}
        <div className="arch-diagram">

          {/* Agent 1 */}
          <div
            className={`agent-card ${activeAgent === 'detective' ? 'active' : ''}`}
            onMouseEnter={() => setActiveAgent('detective')}
            onMouseLeave={() => setActiveAgent(null)}
          >
            <div className="agent-header">
              <span className="tag tag-purple">{agents[0].tag}</span>
              <span className="agent-status-dot" style={{ background: 'var(--accent-purple-light)' }} />
            </div>
            <div className="agent-icon">{agents[0].icon}</div>
            <h3 className="agent-name">{agents[0].name}</h3>
            <p className="agent-subtitle mono">{agents[0].subtitle}</p>
            <p className="agent-desc">{agents[0].desc}</p>
            <ul className="agent-tasks">
              {agents[0].tasks.map(t => (
                <li key={t}>
                  <span className="task-bullet" style={{ background: 'var(--accent-purple-light)' }} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="agent-glow purple-glow" />
          </div>

          {/* Center consensus */}
          <div className="consensus-center">
            <div className="consensus-arrows">
              <div className="arrow-label mono" style={{ color: '#555', fontSize: '10px' }}>PROPOSES</div>
              <div className="debate-line">
                <div className="debate-arrow right" />
                <div className="debate-pulse" />
                <div className="debate-arrow left" />
              </div>
              <div className="arrow-label mono" style={{ color: '#555', fontSize: '10px' }}>CHALLENGES</div>
            </div>

            <div className="consensus-box">
              <div className="consensus-icon">⚡</div>
              <div className="mono" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>CONSENSUS ENGINE</div>
              <div className="consensus-score">
                <div className="mono" style={{ fontSize: '11px', color: '#888' }}>CONFIDENCE SCORE</div>
                <div className="score-bar-wrap">
                  <div className="score-bar">
                    <div className="score-fill" />
                  </div>
                  <span className="mono accent-green" style={{ fontSize: '16px', fontWeight: 700 }}>94.7%</span>
                </div>
              </div>
              <div className="consensus-output">
                <span className="mono" style={{ fontSize: '10px', color: 'var(--accent-green)' }}>
                  → RELATIONSHIP VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Agent 2 */}
          <div
            className={`agent-card agent-card--yellow ${activeAgent === 'advocate' ? 'active' : ''}`}
            onMouseEnter={() => setActiveAgent('advocate')}
            onMouseLeave={() => setActiveAgent(null)}
          >
            <div className="agent-header">
              <span className="tag tag-yellow">{agents[1].tag}</span>
              <span className="agent-status-dot" style={{ background: 'var(--accent-yellow)' }} />
            </div>
            <div className="agent-icon">{agents[1].icon}</div>
            <h3 className="agent-name">{agents[1].name}</h3>
            <p className="agent-subtitle mono">{agents[1].subtitle}</p>
            <p className="agent-desc">{agents[1].desc}</p>
            <ul className="agent-tasks">
              {agents[1].tasks.map(t => (
                <li key={t}>
                  <span className="task-bullet" style={{ background: 'var(--accent-yellow)' }} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="agent-glow yellow-glow" />
          </div>
        </div>

        {/* Output row */}
        <div className="arch-output-row">
          <div className="mono" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em', marginBottom: '20px' }}>
            → VERIFIED OUTPUT GOES TO
          </div>
          <div className="arch-outputs">
            {[
              { label: 'Graph DB', desc: 'Neo4j node + relationship stored with confidence score', icon: '🕸', color: 'var(--accent-purple-light)' },
              { label: 'Dashboard', desc: 'Visual network map updated in real-time for investigators', icon: '📊', color: 'var(--accent-cyan)' },
              { label: 'Kingpin Alert', desc: 'Centrality algorithm highlights most influential suspect', icon: '👑', color: 'var(--accent-yellow)' },
              { label: 'Audit Log', desc: 'Full trace of debate — every decision explainable', icon: '📋', color: 'var(--accent-green)' },
            ].map(o => (
              <div className="arch-output-card" key={o.label}>
                <span className="arch-output-icon">{o.icon}</span>
                <h4 style={{ color: o.color, fontSize: '14px', fontWeight: 600 }}>{o.label}</h4>
                <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.5 }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Architecture
