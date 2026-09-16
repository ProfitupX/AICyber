import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchAlerts } from '../../services/supabase.js'
import { IconSearch, IconBell, IconClose } from '../common/Icons.jsx'
import './TopBar.css'

const pageTitles = {
  '/dashboard':          { title: 'Intelligence Overview', sub: 'National crime grid & active syndicate detection' },
  '/dashboard/graph':    { title: 'Network Topology', sub: 'Interactive digital red-thread knowledge graph' },
  '/dashboard/suspects': { title: 'Suspect Directory', sub: 'Central database & criminal registry' },
  '/dashboard/cases':    { title: 'Active Case Dossiers', sub: 'Investigation files & statutory charge sheets' },
  '/dashboard/upload':   { title: 'Evidence Vault', sub: 'FIR, CDR & bank statement ingestion studio' },
  '/dashboard/chat':     { title: 'AI Copilot', sub: 'Conversational intelligence & legal inquiry copilot' },
  '/dashboard/kingpins': { title: 'Kingpin Studio', sub: 'Centrality & syndicate mastermind analysis' },
}

const TopBar = () => {
  const loc = useLocation()
  const page = pageTitles[loc.pathname] || { title: 'Command Center', sub: 'National Intelligence Suite' }
  const [time, setTime] = useState('')
  const [showAlerts, setShowAlerts] = useState(false)
  const [alertsList, setAlertsList] = useState([])
  const [timeRange, setTimeRange] = useState('This Month')

  useEffect(() => {
    async function loadAlerts() {
      const res = await fetchAlerts()
      if (res.data) setAlertsList(res.data)
    }
    loadAlerts()
  }, [])

  const unread = alertsList.filter(a => !a.read).length

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div>
          <h1 className="topbar-title">{page.title}</h1>
          <p className="topbar-sub">{page.sub}</p>
        </div>
      </div>

      {/* Center / Right Controls (Panze & HereSafe Style) */}
      <div className="topbar-center">
        <div className="pill-toggle-group">
          {['Today', 'This Week', 'This Month', 'Reports'].map(r => (
            <button
              key={r}
              className={`pill-toggle-btn ${timeRange === r ? 'active' : ''}`}
              onClick={() => setTimeRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="topbar-right">
        {/* Search */}
        <div className="topbar-search">
          <span className="search-icon">
            <IconSearch size={14} color="var(--text-3)" />
          </span>
          <input className="search-input" placeholder="Search suspects, FIRs, UTRs..." />
          <span className="mono search-kbd">⌘K</span>
        </div>

        {/* Live Clock Pill */}
        <div className="topbar-time-pill mono">
          <span className="pulse-dot pulse-green" />
          <span>{time} IST</span>
        </div>

        {/* Alerts Bell */}
        <div className="alert-btn-wrap">
          <button
            className={`topbar-icon-btn ${showAlerts ? 'active' : ''}`}
            onClick={() => setShowAlerts(p => !p)}
            title="System Alerts"
          >
            <IconBell size={16} color="var(--text-2)" />
            {unread > 0 && <span className="alert-badge">{unread}</span>}
          </button>

          {showAlerts && (
            <div className="alerts-dropdown animate-slideup">
              <div className="alerts-header">
                <div>
                  <span className="alerts-heading">Live Threat Alerts</span>
                  <p className="alerts-sub mono">{unread} unread incidents</p>
                </div>
                <button className="alerts-clear-btn" onClick={() => setShowAlerts(false)}>
                  <IconClose size={12} />
                </button>
              </div>
              <div className="alerts-list">
                {alertsList.length === 0 ? (
                  <div style={{ padding: '16px', fontSize: '12px', color: 'var(--text-3)', textAlign: 'center' }}>
                    No active threat alerts
                  </div>
                ) : (
                  alertsList.slice(0, 5).map(a => (
                    <div key={a.id} className={`alert-item ${!a.read ? 'unread' : ''}`}>
                      <span className={`alert-dot ${(a.type || 'CRITICAL').toLowerCase()}`} />
                      <div className="alert-body">
                        <div className="alert-title">{a.title}</div>
                        <div className="alert-desc">{a.desc || a.description}</div>
                        <div className="mono alert-time">{a.time}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopBar

