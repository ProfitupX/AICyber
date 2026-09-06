import React, { useState, useEffect } from 'react'
import { fetchCases, saveCase, fetchSuspects } from '../services/supabase.js'
import './Cases.css'

const PRIORITY_COLOR = { CRITICAL: 'var(--red-l)', HIGH: 'var(--orange)', MEDIUM: 'var(--yellow-l)', LOW: 'var(--green-l)' }

export default function Cases() {
  const [casesList, setCasesList] = useState([])
  const [suspectsList, setSuspectsList] = useState([])
  const [selected, setSelected] = useState(null)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [showNewModal, setShowNewModal] = useState(false)

  const [newCase, setNewCase] = useState({
    title: '',
    description: '',
    priority: 'HIGH',
    status: 'ACTIVE',
    io: 'SI Ramesh Kumar',
    tags: 'Financial Fraud, Hawala',
    progress: 25
  })

  useEffect(() => {
    async function loadData() {
      const cRes = await fetchCases()
      const sRes = await fetchSuspects()
      if (cRes.data) setCasesList(cRes.data)
      if (sRes.data) setSuspectsList(sRes.data)
    }
    loadData()
  }, [])

  const filtered = statusFilter === 'ALL' ? casesList : casesList.filter(c => c.status === statusFilter)
  const cs = casesList.find(c => c.id === selected)

  const handleCreateCase = async (e) => {
    e.preventDefault()
    if (!newCase.title) return

    const created = {
      id: `CASE-2024-${String(casesList.length + 1).padStart(3, '0')}`,
      title: newCase.title,
      description: newCase.description,
      priority: newCase.priority,
      status: newCase.status,
      io: newCase.io,
      suspects: [],
      startDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      firs: [`FIR-2024-${String(casesList.length + 1).padStart(3, '0')}`],
      progress: Number(newCase.progress),
      tags: newCase.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    await saveCase(created)
    setCasesList(prev => [created, ...prev])
    setShowNewModal(false)
    setNewCase({
      title: '', description: '', priority: 'HIGH', status: 'ACTIVE', io: 'SI Ramesh Kumar', tags: 'Financial Fraud, Hawala', progress: 25
    })
  }

  const exportCaseDossier = (caseItem) => {
    const text = `=====================================================
CRIMINAL INVESTIGATION DOSSIER — SECTION 65B BSA CERTIFIED
=====================================================
Case ID: ${caseItem.id}
Case Title: ${caseItem.title}
Status: ${caseItem.status} | Priority: ${caseItem.priority}
Investigating Officer: ${caseItem.io}
Date Created: ${caseItem.startDate} | Progress: ${caseItem.progress}%

SUMMARY:
${caseItem.description}

TAGS & CRIME SECTIONS:
${(caseItem.tags || []).join(', ')}

LINKED FIRs:
${(caseItem.firs || []).join(', ')}

CONFIDENTIAL // LAW ENFORCEMENT EYES ONLY
Generated via TwinAI National Crime Intelligence System
=====================================================`
    
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${caseItem.id}_Dossier.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="cases-layout animate-fadein">
      {/* Controls */}
      <div className="cases-controls card">
        <div className="controls-left">
          {['ALL','ACTIVE','PENDING','CLOSED'].map(s => (
            <button
              key={s}
              className={`btn btn-ghost btn-sm ${statusFilter === s ? 'active-filter' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="controls-right">
          <span className="mono" style={{ fontSize: '11px', color: 'var(--text-3)' }}>{filtered.length} active case files</span>
          <button className="btn btn-primary btn-sm" onClick={() => setShowNewModal(true)}>+ New Case File</button>
        </div>
      </div>

      <div className="cases-body">
        {/* Cases grid */}
        <div className="cases-grid">
          {filtered.map(c => {
            const linkedSuspects = suspectsList.filter(s => (c.suspects || []).includes(s.id))
            return (
              <div
                key={c.id}
                className={`case-card card ${selected === c.id ? 'selected' : ''}`}
                onClick={() => setSelected(c.id === selected ? null : c.id)}
              >
                <div className="cc-header">
                  <span className="mono cc-id">{c.id}</span>
                  <div className="cc-badges">
                    <span className={`badge badge-${(c.priority || 'HIGH').toLowerCase()}`}>{c.priority}</span>
                    <span className={`badge badge-${(c.status || 'ACTIVE').toLowerCase()}`}>{c.status}</span>
                  </div>
                </div>

                <h3 className="cc-title">{c.title}</h3>
                <p className="cc-desc">{c.description}</p>

                <div className="cc-tags">
                  {(c.tags || []).map(t => (
                    <span key={t} className="cc-tag mono">{t}</span>
                  ))}
                </div>

                <div className="cc-progress-section">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>Investigation Progress</span>
                    <span className="mono" style={{ fontSize: '11px', color: PRIORITY_COLOR[c.priority] || 'var(--purple-l)' }}>{c.progress}%</span>
                  </div>
                  <div className="cc-progress-track">
                    <div className="cc-progress-fill" style={{ width: `${c.progress}%`, background: PRIORITY_COLOR[c.priority] || 'var(--purple-l)' }} />
                  </div>
                </div>

                <div className="cc-meta-row">
                  <div className="cc-suspects">
                    {linkedSuspects.slice(0, 3).map((s, i) => (
                      <div
                        key={s.id}
                        className="cc-avatar"
                        title={s.name}
                        style={{ background: 'rgba(124,58,237,0.1)', color: 'var(--purple-l)', marginLeft: i > 0 ? '-8px' : 0 }}
                      >
                        {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                    ))}
                    {linkedSuspects.length === 0 && (
                      <span className="mono" style={{ fontSize: '10px', color: 'var(--text-4)' }}>0 Linked</span>
                    )}
                  </div>
                  <div className="mono cc-meta-info">
                    <span>IO: {(c.io || 'IO').replace('SI ','')}</span>
                    <span style={{ color: 'var(--text-4)' }}>·</span>
                    <span>{(c.firs || []).length} FIRs</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Case Detail Drawer */}
        {cs && (
          <div className="case-detail card animate-slideup">
            <div className="cd-header">
              <div>
                <span className="mono" style={{ fontSize: '9px', color: 'var(--text-4)' }}>{cs.id}</span>
                <h2 className="cd-title">{cs.title}</h2>
              </div>
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setSelected(null)}>✕</button>
            </div>

            <p className="cd-desc">{cs.description}</p>

            <div className="cd-field-grid">
              {[
                { label: 'STATUS',       val: cs.status },
                { label: 'PRIORITY',     val: cs.priority },
                { label: 'PROGRESS',     val: `${cs.progress}%` },
                { label: 'ASSIGNED IO',  val: cs.io },
                { label: 'STARTED',      val: cs.startDate },
                { label: 'LAST UPDATED', val: cs.lastUpdated },
              ].map(f => (
                <div key={f.label} className="cd-field">
                  <span className="mono cd-field-label">{f.label}</span>
                  <span className="cd-field-val">{f.val}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <button className="btn btn-primary btn-sm" onClick={() => exportCaseDossier(cs)} style={{ flex: 1, justifyContent: 'center' }}>
                📄 Export 65B Dossier
              </button>
              <a href="/dashboard/chat" className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                💬 Copilot Briefing
              </a>
            </div>
          </div>
        )}
      </div>

      {/* New Case Modal */}
      {showNewModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card animate-fadein" style={{ width: '440px', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Register New Case File</h3>
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setShowNewModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateCase} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>CASE TITLE</label>
                <input
                  className="input"
                  required
                  placeholder="e.g. Operation Golden Falcon"
                  value={newCase.title}
                  onChange={e => setNewCase({ ...newCase, title: e.target.value })}
                />
              </div>
              <div>
                <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>SUMMARY / SYNDICATE SCOPE</label>
                <textarea
                  className="input"
                  rows="3"
                  placeholder="Describe the criminal syndicate modus operandi, jurisdictions, and contraband..."
                  value={newCase.description}
                  onChange={e => setNewCase({ ...newCase, description: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>PRIORITY</label>
                  <select
                    className="input select"
                    value={newCase.priority}
                    onChange={e => setNewCase({ ...newCase, priority: e.target.value })}
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>ASSIGNED IO</label>
                  <input
                    className="input"
                    value={newCase.io}
                    onChange={e => setNewCase({ ...newCase, io: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>TAGS (COMMA SEPARATED)</label>
                <input
                  className="input"
                  placeholder="Hawala, Cyber Fraud, Mewat, Extortion"
                  value={newCase.tags}
                  onChange={e => setNewCase({ ...newCase, tags: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', justifyContent: 'center' }}>
                Create Case in Supabase 💾
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
