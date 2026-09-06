import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard',          icon: '⬡',  label: 'Overview',        badge: null },
  { to: '/dashboard/graph',     icon: '🕸',  label: 'Network Graph',   badge: null },
  { to: '/dashboard/suspects',  icon: '👤',  label: 'Suspect Directory',badge: '10' },
  { to: '/dashboard/cases',     icon: '📁',  label: 'Active Cases',    badge: '3' },
  { to: '/dashboard/upload',    icon: '📤',  label: 'Evidence Vault',  badge: null },
  { to: '/dashboard/chat',      icon: '💬',  label: 'AI Copilot',      badge: 'LIVE' },
  { to: '/dashboard/kingpins',  icon: '👑',  label: 'Kingpin Detection',badge: 'ALERT' },
]

const Sidebar = () => {
  const loc = useLocation()

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">⬡</div>
        <div>
          <div className="brand-name">TWIN<span>AI</span></div>
          <div className="brand-sub mono">v2.4 · Enterprise Suite</div>
        </div>
      </div>

      {/* System health */}
      <div className="sidebar-health">
        <div className="health-row">
          <span className="pulse-dot pulse-green" />
          <span className="mono health-label">AI Agents</span>
          <span className="mono health-val green">ONLINE</span>
        </div>
        <div className="health-row">
          <span className="pulse-dot pulse-green" />
          <span className="mono health-label">Graph DB</span>
          <span className="mono health-val green">CONNECTED</span>
        </div>
        <div className="health-row">
          <span className="pulse-dot pulse-yellow" />
          <span className="mono health-label">Backend AI</span>
          <span className="mono health-val yellow">PENDING</span>
        </div>
      </div>

      <div className="sidebar-divider" />

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label mono">NAVIGATION</div>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span className="sidebar-link-label">{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-divider" />

      {/* Case indicator */}
      <div className="sidebar-active-case">
        <div className="mono case-label">ACTIVE CASE</div>
        <div className="case-name">Operation Sahakar</div>
        <div className="case-progress-bar">
          <div className="case-progress-fill" style={{ width: '68%' }} />
        </div>
        <div className="mono case-pct">68% complete</div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <NavLink to="/" className="sidebar-link" style={{ marginBottom: '12px', justifyContent: 'center', border: '1px solid var(--border)' }}>
          ← Back to Website
        </NavLink>
        <div className="user-chip">
          <div className="user-avatar">SI</div>
          <div>
            <div className="user-name">SI Ramesh Kumar</div>
            <div className="mono user-role">Investigating Officer</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
