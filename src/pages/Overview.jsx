import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchSuspects, fetchCases, fetchGraphData, fetchAlerts, fetchActivityLogs, SUPABASE_PRODUCTION_SQL, SUPABASE_URL } from '../services/supabase.js'
import './Overview.css'

const StatCard = ({ icon, label, value, sub, color, trend }) => (
  <div className="stat-card card">
    <div className="stat-card-top">
      <span className="stat-icon">{icon}</span>
      <span className={`stat-trend ${trend > 0 ? 'up' : trend < 0 ? 'down' : 'flat'}`}>
        {trend > 0 ? `↑ ${trend}` : trend < 0 ? `↓ ${Math.abs(trend)}` : '—'}
      </span>
    </div>
    <div className="stat-value" style={{ color }}>{value}</div>
    <div className="stat-label">{label}</div>
    {sub && <div className="mono stat-sub">{sub}</div>}
  </div>
)

const riskColor = { CRITICAL: 'var(--red-l)', HIGH: 'var(--orange)', MEDIUM: 'var(--yellow-l)', LOW: 'var(--green-l)' }

const Overview = () => {
  const [suspectsList, setSuspectsList] = useState([])
  const [casesList, setCasesList] = useState([])
  const [alertsList, setAlertsList] = useState([])
  const [activityList, setActivityList] = useState([])
  const [graphStats, setGraphStats] = useState({ nodes: 0, edges: 0, source: 'supabase' })
  const [showSqlModal, setShowSqlModal] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)

  useEffect(() => {
    async function loadData() {
      const [sRes, cRes, gRes, aRes, actRes] = await Promise.all([
        fetchSuspects(),
        fetchCases(),
        fetchGraphData(),
        fetchAlerts(),
        fetchActivityLogs()
      ])
      if (sRes.data) setSuspectsList(sRes.data)
      if (cRes.data) setCasesList(cRes.data)
      if (aRes.data) setAlertsList(aRes.data)
      if (actRes.data) setActivityList(actRes.data)
      if (gRes.nodes) {
        setGraphStats({
          nodes: gRes.nodes.length,
          edges: gRes.edges?.length || 0,
          source: gRes.source || 'supabase'
        })
      }
    }
    loadData()
  }, [])

  const top5 = suspectsList.filter(s => s.type === 'PERSON').slice(0, 5)
  const activeCases = casesList.filter(c => c.status === 'ACTIVE')
  const criticalCount = suspectsList.filter(s => s.risk === 'CRITICAL').length

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 3000)
  }

  return (
    <div className="overview animate-fadein">
      {/* Production Integration Bar */}
      <div className="card" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(124,58,237,0.08), rgba(6,182,212,0.08))', border: '1px solid var(--purple-l)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>⚡</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-1)' }}>
              Production Backend Connected: Supabase PostgreSQL + Google Gemini Flash
            </div>
            <div className="mono" style={{ fontSize: '10px', color: 'var(--text-3)', marginTop: '2px' }}>
              Host: {SUPABASE_URL} · Dual-Agent: ACTIVE · DB Sync: {graphStats.source.toUpperCase()}
            </div>
          </div>
        </div>
        <button className="btn btn-outline btn-sm" onClick={() => setShowSqlModal(true)}>
          📋 Supabase SQL Setup Helper
        </button>
      </div>

      {/* KPI Row */}
      <div className="kpi-grid">
        <StatCard icon="👤" label="Total Suspects" value={suspectsList.length} sub={`${criticalCount} critical targets`} color="var(--purple-l)" trend={2} />
        <StatCard icon="📁" label="Active Cases" value={activeCases.length} sub={`${casesList.length} total dossiers`} color="var(--cyan-l)" trend={1} />
        <StatCard icon="🚨" label="Critical Alerts" value={criticalCount} sub="High priority threats" color="var(--red-l)" trend={0} />
        <StatCard icon="🎯" label="AI Confidence" value="94.7%" sub="Dual-Agent consensus" color="var(--green-l)" trend={1.2} />
        <StatCard icon="🕸" label="Graph Nodes" value={graphStats.nodes} sub={`${graphStats.edges} verified links`} color="var(--yellow-l)" trend={3} />
        <StatCard icon="👑" label="Kingpins ID'd" value="2" sub="Rajan Kumar & Prince" color="var(--orange)" trend={0} />
      </div>

      <div className="overview-body">
        {/* LEFT COLUMN */}
        <div className="ov-left">

          {/* Top Suspects */}
          <div className="card ov-section">
            <div className="ov-section-hdr">
              <h3 className="ov-section-title">Top Suspects by Risk</h3>
              <Link to="/dashboard/suspects" className="btn btn-ghost btn-sm">View All →</Link>
            </div>
            <div className="suspect-list">
              {top5.map((s, i) => (
                <div className="suspect-row" key={s.id}>
                  <div className="suspect-rank mono">#{i + 1}</div>
                  <div className="suspect-avatar" style={{ background: `${riskColor[s.risk]}22`, color: riskColor[s.risk] }}>
                    {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div className="suspect-info">
                    <div className="suspect-name">{s.name}</div>
                    <div className="mono suspect-meta">{s.role} · {s.location}</div>
                  </div>
                  <div className="suspect-score-wrap">
                    <div className="score-bar-track">
                      <div className="score-bar-fill" style={{ width: `${s.riskScore}%`, background: riskColor[s.risk] }} />
                    </div>
                    <span className="mono suspect-score" style={{ color: riskColor[s.risk] }}>{s.riskScore}</span>
                  </div>
                  <span className={`badge badge-${s.risk.toLowerCase()}`}>{s.risk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Cases */}
          <div className="card ov-section">
            <div className="ov-section-hdr">
              <h3 className="ov-section-title">Active Investigations</h3>
              <Link to="/dashboard/cases" className="btn btn-ghost btn-sm">View All →</Link>
            </div>
            <div className="case-list">
              {activeCases.map(c => (
                <div className="case-row" key={c.id}>
                  <div className="case-row-left">
                    <div className="case-row-id mono">{c.id}</div>
                    <div className="case-row-name">{c.title}</div>
                    <div className="case-row-meta mono">{(c.suspects || []).length} suspects · IO: {c.io}</div>
                  </div>
                  <div className="case-row-right">
                    <span className={`badge badge-${(c.priority || 'HIGH').toLowerCase()}`}>{c.priority}</span>
                    <div className="case-mini-progress">
                      <div className="case-mini-fill" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="mono case-mini-pct">{c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="ov-right">

          {/* Alerts feed */}
          <div className="card ov-section">
            <div className="ov-section-hdr">
              <h3 className="ov-section-title">
                Live Alerts
                <span className="pulse-dot pulse-red" style={{ marginLeft: 8 }} />
              </h3>
            </div>
            <div className="alerts-feed">
              {alertsList.length === 0 ? (
                <div style={{ padding: '16px', fontSize: '11px', color: 'var(--text-3)', textAlign: 'center' }}>
                  No active threat alerts in Supabase
                </div>
              ) : (
                alertsList.map(a => (
                  <div key={a.id} className={`af-item ${!a.read ? 'unread' : ''}`}>
                    <div className={`af-dot ${(a.type || 'CRITICAL').toLowerCase()}`} />
                    <div className="af-content">
                      <div className="af-title">{a.title}</div>
                      <div className="af-desc">{a.desc || a.description}</div>
                      <div className="mono af-time">{a.time} {a.case ? `· ${a.case}` : ''}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity feed */}
          <div className="card ov-section">
            <div className="ov-section-hdr">
              <h3 className="ov-section-title">Live Supabase Activity Log</h3>
            </div>
            <div className="activity-feed">
              {activityList.length === 0 ? (
                <div style={{ padding: '16px', fontSize: '11px', color: 'var(--text-3)', textAlign: 'center' }}>
                  No activity logged yet
                </div>
              ) : (
                activityList.map(item => (
                  <div key={item.id} className="af2-item">
                    <span className="af2-icon">{item.icon || '⚡'}</span>
                    <div className="af2-content">
                      <div className="af2-action">{item.action}</div>
                      <div className="af2-detail">{item.detail}</div>
                      <div className="mono af2-meta">{item.user || item.officer} · {item.time || 'Today'}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* TwinAI Dual Agent status */}
          <div className="card ov-section">
            <div className="ov-section-hdr">
              <h3 className="ov-section-title">TwinAI Dual-Agent Architecture</h3>
              <span className="badge badge-active">● LIVE</span>
            </div>
            <div className="ai-status-rows">
              {[
                { label: 'Agent 1: The Detective (Gemini Flash)', status: 'Active Ingestion & NLP Parsing', pct: 98, color: 'var(--purple-l)' },
                { label: 'Agent 2: Devil\'s Advocate (Gemini Flash)', status: 'Adversarial Cross-Audit & Zero-Hallucination', pct: 95, color: 'var(--yellow-l)' },
                { label: 'Consensus Engine & Graph Sync', status: 'Betweenness Centrality & Supabase Stream', pct: 92, color: 'var(--green-l)' },
              ].map(r => (
                <div key={r.label} className="ai-row">
                  <div className="ai-row-top">
                    <span className="ai-row-label">{r.label}</span>
                    <span className="mono ai-row-pct" style={{ color: r.color }}>{r.pct}%</span>
                  </div>
                  <div className="ai-row-status mono">{r.status}</div>
                  <div className="ai-progress-track">
                    <div className="ai-progress-fill" style={{ width: `${r.pct}%`, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Supabase SQL Helper Modal */}
      {showSqlModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card animate-fadein" style={{ width: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Supabase PostgreSQL Schema Setup</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-3)', margin: '2px 0 0 0' }}>
                  Execute this SQL in your Supabase Dashboard &gt; SQL Editor to create production tables.
                </p>
              </div>
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setShowSqlModal(false)}>✕</button>
            </div>

            <pre style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-card-2)', padding: '12px', borderRadius: '6px', fontSize: '11px', lineHeight: 1.4, fontFamily: 'monospace' }}>
              {SUPABASE_SQL_SCHEMA}
            </pre>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span className="mono" style={{ fontSize: '11px', color: copiedSql ? 'var(--green-l)' : 'var(--text-3)' }}>
                {copiedSql ? '✓ Copied SQL to Clipboard!' : 'Click to copy script'}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-primary btn-sm" onClick={handleCopySql}>
                  📋 {copiedSql ? 'Copied!' : 'Copy SQL Schema'}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowSqlModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Overview
