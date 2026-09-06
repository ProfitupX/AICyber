import React from 'react'
import './TargetUsers.css'

const users = [
  {
    role: 'Investigating Officers',
    tag: 'IO',
    icon: '🔎',
    color: 'var(--accent-purple-light)',
    desc: 'Need quick summaries and visual connection maps of suspects to accelerate case resolution.',
    needs: ['Quick suspect summaries', 'Visual relationship maps', 'Evidence chain export', 'Chat-based querying'],
  },
  {
    role: 'Intelligence Analysts',
    tag: 'IA',
    icon: '🧠',
    color: 'var(--accent-cyan)',
    desc: 'Need deep-dive tools to upload raw data and query hidden patterns across large datasets.',
    needs: ['Bulk data ingestion', 'Pattern query builder', 'Cross-dataset analysis', 'Custom graph filters'],
  },
  {
    role: 'Higher Officials',
    tag: 'HO',
    icon: '👔',
    color: 'var(--accent-yellow)',
    desc: 'Need high-level dashboards to monitor active criminal syndicates and measure investigative progress.',
    needs: ['Executive dashboard', 'Syndicate overview', 'Case status tracking', 'Resource allocation view'],
  },
]

const TargetUsers = () => (
  <section className="target-users" id="about">
    <div className="tu-inner">
      <div className="tu-header">
        <div className="section-label">// 02 — Target Users</div>
        <h2 className="tu-title">
          Designed for Every <span className="accent-purple">Level</span> of Law Enforcement
        </h2>
      </div>

      <div className="tu-grid">
        {users.map((u, i) => (
          <div className="tu-card" key={u.role}>
            <div className="tu-card-top">
              <div className="tu-icon">{u.icon}</div>
              <div className="tu-badge mono" style={{ color: u.color, borderColor: u.color }}>
                {u.tag}
              </div>
            </div>
            <h3 className="tu-role" style={{ color: u.color }}>{u.role}</h3>
            <p className="tu-desc">{u.desc}</p>
            <div className="tu-needs">
              {u.needs.map(n => (
                <div className="tu-need" key={n}>
                  <span style={{ color: u.color, fontSize: '12px' }}>→</span>
                  <span style={{ fontSize: '13px', color: '#888' }}>{n}</span>
                </div>
              ))}
            </div>
            <div className="tu-card-bar" style={{ background: u.color }} />
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default TargetUsers
