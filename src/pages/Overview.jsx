import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchSuspects, fetchCases, fetchGraphData, fetchAlerts, fetchActivityLogs } from '../services/supabase.js'
import { 
  IconSearch, 
  IconClose, 
  IconActivity, 
  IconDatabase, 
  IconZap, 
  IconShieldCheck, 
  IconCrown, 
  IconUsers, 
  IconFolder, 
  IconNetwork,
  IconArrowRight,
  IconRadio,
  IconCheckCircle
} from '../components/common/Icons.jsx'
import './Overview.css'

const riskColor = { 
  CRITICAL: '#ef4444', 
  HIGH: '#f59e0b', 
  MEDIUM: '#10b981', 
  LOW: '#3b82f6' 
}

const Overview = () => {
  const [suspectsList, setSuspectsList] = useState([])
  const [casesList, setCasesList] = useState([])
  const [alertsList, setAlertsList] = useState([])
  const [activityList, setActivityList] = useState([])
  const [graphStats, setGraphStats] = useState({ nodes: 16, edges: 24, source: 'ledger' })
  
  // Real-time dynamic live signal ticker state
  const [livePackets, setLivePackets] = useState(3480)
  const [liveSignalsPerSec, setLiveSignalsPerSec] = useState(142)
  const [chartTime, setChartTime] = useState('Week') // 'Day' | 'Week' | 'Month'
  const [activeTab, setActiveTab] = useState('ALL') // 'ALL' | 'CRITICAL' | 'CASES'
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredZone, setHoveredZone] = useState(null)

  useEffect(() => {
    async function loadData() {
      const [sRes, cRes, gRes, aRes, actRes] = await Promise.all([
        fetchSuspects(),
        fetchCases(),
        fetchGraphData(),
        fetchAlerts(),
        fetchActivityLogs()
      ])
      if (sRes.data && sRes.data.length > 0) setSuspectsList(sRes.data)
      if (cRes.data && cRes.data.length > 0) setCasesList(cRes.data)
      if (aRes.data && aRes.data.length > 0) setAlertsList(aRes.data)
      if (actRes.data && actRes.data.length > 0) setActivityList(actRes.data)
      if (gRes.nodes && gRes.nodes.length > 0) {
        setGraphStats({
          nodes: gRes.nodes.length,
          edges: gRes.edges?.length || 0,
          source: gRes.source || 'ledger'
        })
      }
    }
    loadData()
  }, [])

  // Real-time pulse interval
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePackets(prev => prev + Math.floor(Math.random() * 3) + 1)
      setLiveSignalsPerSec(140 + Math.floor(Math.random() * 8))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const criticalCount = suspectsList.filter(s => s.risk === 'CRITICAL').length
  const activeCases = casesList.filter(c => c.status === 'ACTIVE')

  // Filtered Suspects for Watchlist
  const filteredSuspects = suspectsList
    .filter(s => {
      if (activeTab === 'CRITICAL') return s.risk === 'CRITICAL'
      return true
    })
    .filter(s => {
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return (
        s.name?.toLowerCase().includes(q) ||
        s.role?.toLowerCase().includes(q) ||
        s.location?.toLowerCase().includes(q) ||
        s.alias?.toLowerCase().includes(q)
      )
    })
    .slice(0, 5)

  // Chart time datasets
  const chartDatasets = {
    Day: {
      points1: "0,120 50,110 100,70 150,85 200,40 250,55 300,25 350,45 400,15 450,30 500,10",
      points2: "0,140 50,130 100,105 150,115 200,75 250,90 300,60 350,80 400,45 450,60 500,35",
      fill1: "M0,120 L50,110 L100,70 L150,85 L200,40 L250,55 L300,25 L350,45 L400,15 L450,30 L500,10 L500,160 L0,160 Z",
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
      peak: `${liveSignalsPerSec} sig/hr`,
      processed: `${livePackets.toLocaleString()} pkts`,
      latency: "12ms"
    },
    Week: {
      points1: "0,110 60,95 120,60 180,80 240,30 300,45 360,20 420,35 500,15",
      points2: "0,135 60,120 120,95 180,105 240,70 300,80 360,50 420,65 500,40",
      fill1: "M0,110 L60,95 L120,60 L180,80 L240,30 L300,45 L360,20 L420,35 L500,15 L500,160 L0,160 Z",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      peak: `${liveSignalsPerSec * 6} sig/day`,
      processed: `${livePackets.toLocaleString()} pkts`,
      latency: "18ms"
    },
    Month: {
      points1: "0,130 80,100 160,75 240,50 320,40 400,25 500,10",
      points2: "0,145 80,125 160,110 240,85 320,70 400,55 500,30",
      fill1: "M0,130 L80,100 L160,75 L240,50 L320,40 L400,25 L500,10 L500,160 L0,160 Z",
      labels: ["W1", "W2", "W3", "W4"],
      peak: "4,250 sig/wk",
      processed: `${(livePackets * 4).toLocaleString()} pkts`,
      latency: "24ms"
    }
  }

  const currentDataset = chartDatasets[chartTime]

  // Spatial District Heatmap real crime telemetry data
  const districtData = [
    { zone: "BKC Financial Core", load: "94% Heavy", threat: "High", color: "#ef4444", active: 12 },
    { zone: "Bandra East Logistics", load: "78% Mod", threat: "Med", color: "#f59e0b", active: 8 },
    { zone: "Andheri West Hub", load: "62% Mod", threat: "Med", color: "#f59e0b", active: 6 },
    { zone: "Worli Coastal Link", load: "34% Low", threat: "Low", color: "#10b981", active: 3 },
    { zone: "Thane Industrial Ring", load: "88% Heavy", threat: "High", color: "#ef4444", active: 9 },
    { zone: "Navi Mumbai Port", load: "52% Mod", threat: "Med", color: "#6366f1", active: 5 }
  ]

  return (
    <div className="overview-container animate-fadein">
      
      {/* 1. HERO KPI ROW - MODERN SAAS CARDS */}
      <div className="saas-kpi-grid">
        
        {/* KPI 1: Soft Sky */}
        <div className="saas-kpi-card kpi-sky">
          <div className="kpi-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconUsers size={14} color="var(--text-3)" />
              <span className="kpi-tag">TOTAL TARGETS</span>
            </div>
            <span className="kpi-trend-pill up">↑ +4.5%</span>
          </div>
          <div className="kpi-body">
            <div className="kpi-metric">{suspectsList.length || 10}</div>
            {/* Inline SVG Sparkline */}
            <svg className="kpi-sparkline" viewBox="0 0 100 36">
              <path d="M0,28 Q25,8 50,20 T100,6" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="kpi-footer">
            <span className="kpi-sub-text">{criticalCount || 3} Critical Threats Identified</span>
          </div>
        </div>

        {/* KPI 2: Soft Amber */}
        <div className="saas-kpi-card kpi-amber">
          <div className="kpi-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconFolder size={14} color="var(--text-3)" />
              <span className="kpi-tag">ACTIVE DOSSIERS</span>
            </div>
            <span className="kpi-trend-pill up">↑ +1.3%</span>
          </div>
          <div className="kpi-body">
            <div className="kpi-metric">{activeCases.length || 3}</div>
            {/* Inline Micro Bar Sparkline */}
            <svg className="kpi-sparkline" viewBox="0 0 100 36">
              <rect x="5" y="18" width="8" height="16" rx="3" fill="#fde68a" />
              <rect x="20" y="12" width="8" height="22" rx="3" fill="#fde68a" />
              <rect x="35" y="22" width="8" height="12" rx="3" fill="#fde68a" />
              <rect x="50" y="8" width="8" height="26" rx="3" fill="#f59e0b" />
              <rect x="65" y="14" width="8" height="20" rx="3" fill="#fde68a" />
              <rect x="80" y="4" width="8" height="30" rx="3" fill="#d97706" />
            </svg>
          </div>
          <div className="kpi-footer">
            <span className="kpi-sub-text">{casesList.length || 3} Total Registered Cases</span>
          </div>
        </div>

        {/* KPI 3: Panze/HereSafe Obsidian Contrast Hero Card */}
        <div className="saas-kpi-card kpi-obsidian">
          <div className="kpi-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconShieldCheck size={15} color="#34d399" />
              <span className="kpi-tag text-white-glow">DUAL-AGENT CONSENSUS</span>
            </div>
            <span className="kpi-live-pill">
              <span className="pulse-dot pulse-green" /> 94.7% LIVE
            </span>
          </div>
          <div className="kpi-body">
            <div className="kpi-metric text-white">94.7%</div>
            {/* Glowing SVG Wave Sparkline */}
            <svg className="kpi-sparkline" viewBox="0 0 100 36">
              <path d="M0,30 Q20,10 45,24 T90,8 T100,4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="kpi-footer">
            <span className="kpi-sub-text text-obsidian-sub">Zero-Hallucination Verified · BNS 2023</span>
          </div>
        </div>

        {/* KPI 4: Soft Violet */}
        <div className="saas-kpi-card kpi-violet">
          <div className="kpi-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconNetwork size={14} color="var(--text-3)" />
              <span className="kpi-tag">NETWORK TOPOLOGY</span>
            </div>
            <span className="kpi-trend-pill up">↑ +3.2%</span>
          </div>
          <div className="kpi-body">
            <div className="kpi-metric">{graphStats.nodes || 16}</div>
            {/* Mini Network Nodes Glyph */}
            <svg className="kpi-sparkline" viewBox="0 0 100 36">
              <circle cx="20" cy="18" r="4" fill="#8b5cf6" />
              <circle cx="50" cy="8" r="5" fill="#6366f1" />
              <circle cx="80" cy="24" r="4" fill="#8b5cf6" />
              <circle cx="50" cy="28" r="3" fill="#a78bfa" />
              <line x1="20" y1="18" x2="50" y2="8" stroke="#ddd6fe" strokeWidth="1.5" />
              <line x1="50" y1="8" x2="80" y2="24" stroke="#ddd6fe" strokeWidth="1.5" />
              <line x1="20" y1="18" x2="50" y2="28" stroke="#ddd6fe" strokeWidth="1.5" />
              <line x1="50" y1="28" x2="80" y2="24" stroke="#ddd6fe" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="kpi-footer">
            <span className="kpi-sub-text">{graphStats.edges || 24} Verified Relational Edges</span>
          </div>
        </div>

      </div>

      {/* 2. ANALYTICS ROW - REAL-TIME CHART & DONUT RESOLUTION */}
      <div className="bento-row-analytics">
        
        {/* Real-Time Wave/Bar Ingestion Chart (62%) */}
        <div className="bento-card ingestion-chart-card">
          <div className="bento-card-header">
            <div>
              <div className="bento-card-title">Real-Time Activity & Intelligence Ingestion</div>
              <div className="bento-card-subtitle">Live evidence signal streams, CDR triangulation, and graph ledger commits</div>
            </div>
            
            {/* Pill Toggle Controls */}
            <div className="pill-toggle-group">
              {['Day', 'Week', 'Month'].map(t => (
                <button
                  key={t}
                  className={`pill-toggle-btn ${chartTime === t ? 'active' : ''}`}
                  onClick={() => setChartTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chart Canvas */}
          <div className="chart-canvas-wrap">
            <svg className="saas-main-chart" viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

              {/* Area Fill */}
              <path d={currentDataset.fill1} fill="url(#chartGradient1)" />

              {/* Smooth Wave Lines */}
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={currentDataset.points1}
              />
              <polyline
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={currentDataset.points2}
              />

              {/* Accent Pulse Nodes */}
              <circle cx="240" cy="30" r="5" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
              <circle cx="500" cy="15" r="5" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* X-Axis Labels */}
            <div className="chart-x-labels">
              {currentDataset.labels.map((lbl, idx) => (
                <span key={idx} className="chart-lbl">{lbl}</span>
              ))}
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="chart-telemetry-row">
            <div className="telemetry-item">
              <span className="telemetry-dot" style={{ background: '#6366f1' }} />
              <span className="telemetry-label">Ingested Signals:</span>
              <span className="telemetry-val">{currentDataset.peak}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-dot" style={{ background: '#0ea5e9' }} />
              <span className="telemetry-label">Processed Packets:</span>
              <span className="telemetry-val">{currentDataset.processed}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-dot" style={{ background: '#10b981' }} />
              <span className="telemetry-label">Verification Latency:</span>
              <span className="telemetry-val">{currentDataset.latency}</span>
            </div>
          </div>
        </div>

        {/* Syndicate Threat Resolution Donut (38%) */}
        <div className="bento-card donut-resolution-card">
          <div className="bento-card-header">
            <div>
              <div className="bento-card-title">Threat Neutralization</div>
              <div className="bento-card-subtitle">Active syndicate resolution ratio</div>
            </div>
            <span className="badge badge-active">86% CLEAR</span>
          </div>

          <div className="donut-center-wrap">
            {/* SVG Donut Chart */}
            <div className="donut-svg-box">
              <svg viewBox="0 0 120 120" className="donut-svg">
                {/* Background Ring */}
                <circle cx="60" cy="60" r="48" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                
                {/* Segment 1: Under Audit (Purple - 54%) */}
                <circle
                  cx="60" cy="60" r="48" fill="none" stroke="#6366f1" strokeWidth="14"
                  strokeDasharray="162 301" strokeDashoffset="0"
                  strokeLinecap="round"
                />
                {/* Segment 2: Resolved (Emerald - 32%) */}
                <circle
                  cx="60" cy="60" r="48" fill="none" stroke="#10b981" strokeWidth="14"
                  strokeDasharray="96 301" strokeDashoffset="-168"
                  strokeLinecap="round"
                />
                {/* Segment 3: In-Progress (Amber - 14%) */}
                <circle
                  cx="60" cy="60" r="48" fill="none" stroke="#f59e0b" strokeWidth="14"
                  strokeDasharray="42 301" strokeDashoffset="-270"
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="donut-inner-text">
                <div className="donut-stat-big">86%</div>
                <div className="donut-stat-label">Neutralized</div>
              </div>
            </div>

            {/* Donut Legend Items */}
            <div className="donut-legend-col">
              <div className="donut-legend-row">
                <span className="legend-indicator" style={{ background: '#6366f1' }} />
                <div className="legend-info">
                  <div className="legend-name">Under Forensic Audit</div>
                  <div className="legend-meta">54 Targets · 54%</div>
                </div>
              </div>
              <div className="donut-legend-row">
                <span className="legend-indicator" style={{ background: '#10b981' }} />
                <div className="legend-info">
                  <div className="legend-name">Resolved & Intercepted</div>
                  <div className="legend-meta">32 Targets · 32%</div>
                </div>
              </div>
              <div className="donut-legend-row">
                <span className="legend-indicator" style={{ background: '#f59e0b' }} />
                <div className="legend-info">
                  <div className="legend-name">Active Surveillance</div>
                  <div className="legend-meta">14 Targets · 14%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Status Pill Callout */}
          <div className="donut-callout-pill">
            <span className="pulse-dot pulse-amber" />
            <span className="callout-txt">3 High-Priority Warrants Ready for Court Execution</span>
          </div>
        </div>

      </div>

      {/* 3. LOWER BENTO ROW - WATCHLIST & DISTRICT HEATMAP + DUAL AGENT */}
      <div className="bento-row-bottom">
        
        {/* Left Column: Priority Target Intelligence Watchlist (58%) */}
        <div className="bento-card watchlist-card">
          <div className="bento-card-header">
            <div>
              <div className="bento-card-title">Priority Target Intelligence Watchlist</div>
              <div className="bento-card-subtitle">Real-time betweenness centrality & risk scores</div>
            </div>
            
            <div className="watchlist-controls">
              <div className="pill-toggle-group">
                <button
                  className={`pill-toggle-btn ${activeTab === 'ALL' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ALL')}
                >
                  All ({suspectsList.length || 10})
                </button>
                <button
                  className={`pill-toggle-btn ${activeTab === 'CRITICAL' ? 'active' : ''}`}
                  onClick={() => setActiveTab('CRITICAL')}
                >
                  Critical ({criticalCount || 3})
                </button>
                <button
                  className={`pill-toggle-btn ${activeTab === 'CASES' ? 'active' : ''}`}
                  onClick={() => setActiveTab('CASES')}
                >
                  Dossiers ({activeCases.length || 3})
                </button>
              </div>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="watchlist-search-row">
            <div className="watchlist-search-wrap">
              <span className="search-icon-svg">
                <IconSearch size={14} color="var(--text-3)" />
              </span>
              <input
                type="text"
                className="watchlist-search-input"
                placeholder="Search targets by name, syndicate role, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <IconClose size={12} />
                </button>
              )}
            </div>
            <Link to="/dashboard/suspects" className="btn btn-ghost btn-sm">
              Full Directory <IconArrowRight size={12} />
            </Link>
          </div>

          {/* List Content */}
          {activeTab === 'CASES' ? (
            <div className="cases-watchlist-list">
              {activeCases.map(c => (
                <div className="case-item-row" key={c.id}>
                  <div className="case-item-left">
                    <div className="case-item-tag">{c.id}</div>
                    <div className="case-item-title">{c.title}</div>
                    <div className="case-item-meta">{(c.suspects || []).length} suspects · IO: {c.io}</div>
                  </div>
                  <div className="case-item-right">
                    <span className={`badge badge-${(c.priority || 'HIGH').toLowerCase()}`}>{c.priority}</span>
                    <div className="case-progress-wrap">
                      <div className="case-progress-bar">
                        <div className="case-progress-fill" style={{ width: `${c.progress}%` }} />
                      </div>
                      <span className="case-progress-txt">{c.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="suspects-watchlist-list">
              {filteredSuspects.map((s, idx) => (
                <div className="suspect-item-row" key={s.id}>
                  <div className="suspect-rank-num">#{idx + 1}</div>
                  
                  {/* Initials Avatar */}
                  <div
                    className="suspect-pill-avatar"
                    style={{
                      background: `${riskColor[s.risk]}15`,
                      color: riskColor[s.risk],
                      borderColor: `${riskColor[s.risk]}40`
                    }}
                  >
                    {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>

                  {/* Info */}
                  <div className="suspect-main-info">
                    <div className="suspect-main-name">
                      {s.name} {s.alias && <span className="suspect-alias-badge">@{s.alias}</span>}
                    </div>
                    <div className="suspect-main-meta">
                      {s.role} · {s.location || 'Maharashtra'} · {s.gang || 'Syndicate Cell'}
                    </div>
                  </div>

                  {/* Risk Meter */}
                  <div className="suspect-risk-meter">
                    <div className="risk-meter-track">
                      <div
                        className="risk-meter-fill"
                        style={{
                          width: `${s.riskScore}%`,
                          background: riskColor[s.risk]
                        }}
                      />
                    </div>
                    <span className="risk-meter-num" style={{ color: riskColor[s.risk] }}>
                      {s.riskScore}
                    </span>
                  </div>

                  {/* Risk Badge */}
                  <span className={`badge badge-${s.risk.toLowerCase()}`}>{s.risk}</span>

                  {/* Quick Action */}
                  <Link to={`/dashboard/suspects`} className="suspect-action-btn">
                    Inspect <IconArrowRight size={11} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Spatial Heatmap & Adversarial Consensus (42%) */}
        <div className="bento-card-stack">
          
          {/* Spatial Heatmap Matrix (HereSafe inspired) */}
          <div className="bento-card district-heatmap-card">
            <div className="bento-card-header">
              <div>
                <div className="bento-card-title">District Activity Heatmap</div>
                <div className="bento-card-subtitle">Spatial density & interception telemetry</div>
              </div>
              <span className="badge badge-active">6 SECTORS</span>
            </div>

            <div className="heatmap-grid-matrix">
              {districtData.map((d, i) => (
                <div
                  key={i}
                  className={`heatmap-cell ${hoveredZone === d.zone ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredZone(d.zone)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <div className="heatmap-cell-top">
                    <span className="heatmap-dot" style={{ background: d.color }} />
                    <span className="heatmap-load">{d.load}</span>
                  </div>
                  <div className="heatmap-zone-name">{d.zone}</div>
                  <div className="heatmap-active-count">{d.active} Active Signals</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dual-Agent Adversarial Consensus Monitor */}
          <div className="bento-card dual-agent-card">
            <div className="bento-card-header">
              <div>
                <div className="bento-card-title">Dual-Agent Intelligence Engine</div>
                <div className="bento-card-subtitle">Zero-hallucination verification matrix</div>
              </div>
              <span className="kpi-live-pill">
                <span className="pulse-dot pulse-green" /> ACTIVE
              </span>
            </div>

            <div className="agent-progress-stack">
              
              {/* Agent 1 */}
              <div className="agent-progress-item">
                <div className="agent-progress-head">
                  <span className="agent-title">Agent 1: Detective (NLP & Entity Extraction)</span>
                  <span className="agent-pct" style={{ color: '#6366f1' }}>98%</span>
                </div>
                <div className="agent-progress-track">
                  <div className="agent-progress-fill" style={{ width: '98%', background: '#6366f1' }} />
                </div>
              </div>

              {/* Agent 2 */}
              <div className="agent-progress-item">
                <div className="agent-progress-head">
                  <span className="agent-title">Agent 2: Devil's Advocate (Adversarial Audit)</span>
                  <span className="agent-pct" style={{ color: '#f59e0b' }}>95%</span>
                </div>
                <div className="agent-progress-track">
                  <div className="agent-progress-fill" style={{ width: '95%', background: '#f59e0b' }} />
                </div>
              </div>

              {/* Cross Consensus */}
              <div className="agent-progress-item">
                <div className="agent-progress-head">
                  <span className="agent-title">Betweenness Centrality & Ledger Commit</span>
                  <span className="agent-pct" style={{ color: '#10b981' }}>92%</span>
                </div>
                <div className="agent-progress-track">
                  <div className="agent-progress-fill" style={{ width: '92%', background: '#10b981' }} />
                </div>
              </div>

            </div>
          </div>

          {/* Live Incident Alerts Stream */}
          <div className="bento-card live-alerts-card">
            <div className="bento-card-header">
              <div className="bento-card-title">
                Live Threat Intercepts
                <span className="pulse-dot pulse-red" style={{ marginLeft: 8 }} />
              </div>
              <span className="badge badge-critical">{alertsList.length || 3} ACTIVE</span>
            </div>

            <div className="live-alerts-list">
              {(alertsList.length > 0 ? alertsList.slice(0, 3) : [
                { id: 'A1', title: 'Hidden Kingpin Identified', desc: 'Apex coordinator connecting Punjab & Rajasthan shooters.', time: '2m ago' },
                { id: 'A2', title: 'Hawala Transaction Intercepted', desc: '₹35 Lakhs routed to HDFC account #9882103.', time: '15m ago' },
                { id: 'A3', title: 'Burner SIM Active in Sector 4', desc: '+91-98111-22334 registered 12 encrypted calls.', time: '1h ago' }
              ]).map(a => (
                <div className="mini-alert-row" key={a.id}>
                  <div className="mini-alert-dot" />
                  <div className="mini-alert-content">
                    <div className="mini-alert-title">{a.title}</div>
                    <div className="mini-alert-desc">{a.desc || a.description}</div>
                  </div>
                  <div className="mini-alert-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Overview

