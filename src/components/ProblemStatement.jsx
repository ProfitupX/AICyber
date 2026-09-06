import React from 'react'
import './ProblemStatement.css'

const ProblemStatement = () => {
  const challenges = [
    { icon: '📂', title: 'Fragmented Data', desc: 'FIRs, CDRs, bank records scattered across isolated systems — no unified view.' },
    { icon: '🔗', title: 'Hidden Connections', desc: 'Manual analysis fails to surface complex multi-hop criminal relationships.' },
    { icon: '⏱', title: 'Speed vs Accuracy', desc: 'Time-sensitive investigations require instant insights without sacrificing precision.' },
    { icon: '📊', title: 'Unstructured Sources', desc: 'Raw PDFs, Excel sheets, and text reports need intelligent parsing before use.' },
  ]

  return (
    <section className="problem" id="system">
      <div className="problem-inner">

        {/* Left: Problem statement */}
        <div className="problem-left">
          <div className="section-label">// Problem Statement</div>
          <h2 className="problem-title">
            The Data Exists.<br />
            <span style={{ color: 'var(--accent-purple-light)' }}>The Connections Are Hidden.</span>
          </h2>
          <p className="problem-desc">
            Modern criminal networks operate through complex webs of associates, intermediaries,
            and financial channels. Law enforcement agencies collect massive volumes of data —
            yet connecting the dots manually is <strong>slow, error-prone, and incomplete</strong>.
          </p>

          <div className="problem-quote">
            <div className="problem-quote-bar" />
            <div>
              <p className="mono" style={{ fontSize: '13px', color: '#888', lineHeight: 1.7 }}>
                "Like a police investigation board with photos and red thread —
                but <span style={{ color: 'var(--accent-green)' }}>automated, real-time, and AI-verified.</span>"
              </p>
              <p className="mono" style={{ fontSize: '10px', color: '#555', marginTop: '8px' }}>
                — Digital Sakshya & Intelligence Analytics Standard
              </p>
            </div>
          </div>

          <div className="problem-stats-row">
            <div className="problem-mini-stat">
              <span className="mono accent-red" style={{ fontSize: '32px', fontWeight: 700 }}>3x</span>
              <span style={{ fontSize: '12px', color: '#666' }}>Slower Manual Analysis</span>
            </div>
            <div className="problem-mini-stat">
              <span className="mono accent-yellow" style={{ fontSize: '32px', fontWeight: 700 }}>40%</span>
              <span style={{ fontSize: '12px', color: '#666' }}>Connections Missed</span>
            </div>
            <div className="problem-mini-stat">
              <span className="mono" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-cyan)' }}>∞</span>
              <span style={{ fontSize: '12px', color: '#666' }}>Data Silos</span>
            </div>
          </div>
        </div>

        {/* Right: Challenges grid */}
        <div className="problem-right">
          <div className="challenges-grid">
            {challenges.map((c, i) => (
              <div className="challenge-card" key={i}>
                <div className="challenge-num mono">/0{i + 1}</div>
                <div className="challenge-icon">{c.icon}</div>
                <h3 className="challenge-title">{c.title}</h3>
                <p className="challenge-desc">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Data sources */}
          <div className="data-sources">
            <div className="mono" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em', marginBottom: '12px' }}>
              DATA SOURCES INGESTED
            </div>
            <div className="data-source-tags">
              {['FIR PDFs', 'Call Records', 'Bank Statements', 'Surveillance', 'Social Media Intel', 'Criminal History DB'].map(s => (
                <span key={s} className="data-source-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProblemStatement
