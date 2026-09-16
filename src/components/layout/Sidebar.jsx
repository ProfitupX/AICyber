import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  IconOverview, 
  IconNetwork, 
  IconUsers, 
  IconFolder, 
  IconUpload, 
  IconChat, 
  IconCrown, 
  IconShieldCheck,
  IconArrowRight
} from '../common/Icons.jsx'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard',          Icon: IconOverview,  label: 'Overview',        badge: null },
  { to: '/dashboard/graph',     Icon: IconNetwork,   label: 'Network Graph',   badge: null },
  { to: '/dashboard/suspects',  Icon: IconUsers,     label: 'Suspect Directory',badge: '10' },
  { to: '/dashboard/cases',     Icon: IconFolder,    label: 'Active Cases',    badge: '3' },
  { to: '/dashboard/upload',    Icon: IconUpload,    label: 'Evidence Vault',  badge: null },
  { to: '/dashboard/chat',      Icon: IconChat,      label: 'AI Copilot',      badge: 'LIVE' },
  { to: '/dashboard/kingpins',  Icon: IconCrown,     label: 'Kingpin Studio',   badge: 'ALERT' },
]

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-icon-wrap">
          <IconShieldCheck size={20} color="var(--purple-l)" />
        </div>
        <div>
          <div className="brand-name">TWIN<span>AI</span></div>
          <div className="brand-tag mono">CRIME INTELLIGENCE</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label mono">MAIN MENU</div>
        {navItems.map(item => {
          const ItemIcon = item.Icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-link-icon">
                <ItemIcon size={16} />
              </span>
              <span className="sidebar-link-label">{item.label}</span>
              {item.badge && (
                <span className={`sidebar-badge ${item.badge === 'LIVE' ? 'badge-live' : item.badge === 'ALERT' ? 'badge-alert' : ''}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Active Case / Pro Module (Salleist / Panze Style) */}
      <div className="sidebar-pro-wrap">
        <div className="sidebar-pro-card">
          <div className="pro-card-header">
            <span className="pro-badge mono">ACTIVE OPERATION</span>
            <span className="pulse-dot pulse-green" />
          </div>
          <div className="pro-card-title">Operation Sahakar</div>
          <p className="pro-card-desc">Multi-state cyber syndicate & hawala mule network</p>
          <div className="pro-progress-bar">
            <div className="pro-progress-fill" style={{ width: '68%' }} />
          </div>
          <div className="pro-card-footer">
            <span className="mono pro-pct">68% resolved</span>
            <NavLink to="/dashboard/cases" className="pro-action-btn">
              Dossier <IconArrowRight size={12} />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Footer / User Profile */}
      <div className="sidebar-footer">
        <NavLink to="/" className="sidebar-back-btn">
          <span>←</span> Back to Public Site
        </NavLink>
        <div className="user-chip">
          <div className="user-avatar-wrap">
            <div className="user-avatar">SI</div>
            <span className="user-status-dot" />
          </div>
          <div className="user-details">
            <div className="user-name">SI Ramesh Kumar</div>
            <div className="user-role">Investigating Officer</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

