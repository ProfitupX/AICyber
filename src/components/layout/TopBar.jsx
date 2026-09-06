import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchAlerts } from '../../services/supabase.js'
import './TopBar.css'

const pageTitles = {
  '/dashboard':          { title: 'Command Center', sub: 'National Crime Overview & Intelligence Feed' },
  '/dashboard/graph':    { title: 'Network Topology', sub: 'Interactive Digital Red-Thread Graph DB' },
  '/dashboard/suspects': { title: 'Suspect Directory', sub: 'Central Database & Criminal Registry' },
  '/dashboard/cases':    { title: 'Active Case Files', sub: 'Investigation Dossiers & BNS Linkages' },
  '/dashboard/upload':   { title: 'Evidence Vault', sub: 'FIR, CDR & Bank Ingestion Studio' },
  '/dashboard/chat':     { title: 'AI Copilot', sub: 'Conversational Intelligence & Statutory Search' },
  '/dashboard/kingpins': { title: 'Kingpin Studio', sub: 'Centrality & Syndicate Mastermind Detection' },
}

const TopBar = () => {
  const loc = useLocation()
  const page = pageTitles[loc.pathname] || { title: 'Command Center', sub: 'National Intelligence Suite' }
  const [time, setTime] = useState('')
  const [showAlerts, setShowAlerts] = useState(false)
  const [alertsList, setAlertsList] = useState([])

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
          <p className="topbar-sub mono">{page.sub}</p>
        </div>
      </div>

      <div className="topbar-right">
        {/* Time */}
        <div className="topbar-time mono">
          <span className="pulse-dot pulse-green" />
          {time} IST
        </div>

        {/* Search */}
        <div className="topbar-search">
          <span className="search-icon">🔍</span>
          <input className="input search-input" placeholder="Search suspects, cases..." />
          <span className="mono search-kbd">⌘K</span>
        </div>

        {/* Alerts bell */}
        <div className="alert-btn-wrap">
          <button className="topbar-icon-btn" onClick={() => setShowAlerts(p => !p)}>
            <span>🔔</span>
            {unread > 0 && <span className="alert-badge">{unread}</span>}
          </button>

          {showAlerts && (
            <div className="alerts-dropdown animate-slideup">
              <div className="alerts-header">
                <span className="mono" style={{ fontSize: '10px', color: 'var(--text-3)', letterSpacing: '0.1em' }}>ALERTS</span>
                <span className="mono" style={{ fontSize: '10px', color: 'var(--purple-l)' }}>{unread} unread</span>
              </div>
              <div className="alerts-list">
                {alertsList.length === 0 ? (
                  <div style={{ padding: '12px', fontSize: '11px', color: 'var(--text-3)', textAlign: 'center' }}>
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

        {/* Settings */}
        <button className="topbar-icon-btn">⚙</button>
      </div>
    </header>
  )
}

export default TopBar
