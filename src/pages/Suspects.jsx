import React, { useState, useMemo, useEffect } from 'react'
import { fetchSuspects, saveSuspect } from '../services/supabase.js'
import { callGemini } from '../services/gemini.js'
import './Suspects.css'

const RISK_COLOR = { CRITICAL: 'var(--red-l)', HIGH: 'var(--orange)', MEDIUM: 'var(--yellow-l)', LOW: 'var(--green-l)' }

export default function Suspects() {
  const [suspectsList, setSuspectsList] = useState([])
  const [search, setSearch]   = useState('')
  const [riskFilter, setRiskFilter] = useState('ALL')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortBy, setSortBy]   = useState('riskScore')
  const [sortDir, setSortDir] = useState('desc')
  const [selectedId, setSelectedId] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [aiAuditLoading, setAiAuditLoading] = useState(false)
  const [aiAuditReport, setAiAuditReport] = useState(null)

  // New suspect form state
  const [newSuspect, setNewSuspect] = useState({
    name: '',
    alias: '',
    type: 'PERSON',
    risk: 'HIGH',
    riskScore: 75,
    phone: '',
    location: '',
    role: 'SUSPECT',
    status: 'ACTIVE'
  })

  useEffect(() => {
    async function loadData() {
      const res = await fetchSuspects()
      if (res.data) setSuspectsList(res.data)
    }
    loadData()
  }, [])

  const filtered = useMemo(() => {
    let list = [...suspectsList]
    if (search) list = list.filter(s =>
      (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.alias || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.location || '').toLowerCase().includes(search.toLowerCase())
    )
    if (riskFilter !== 'ALL')   list = list.filter(s => s.risk === riskFilter)
    if (typeFilter !== 'ALL')   list = list.filter(s => s.type === typeFilter)
    if (statusFilter !== 'ALL') list = list.filter(s => s.status === statusFilter)
    list.sort((a, b) => {
      const va = a[sortBy], vb = b[sortBy]
      if (typeof va === 'number') return sortDir === 'desc' ? vb - va : va - vb
      return sortDir === 'desc' ? String(vb || '').localeCompare(String(va || '')) : String(va || '').localeCompare(String(vb || ''))
    })
    return list
  }, [suspectsList, search, riskFilter, typeFilter, statusFilter, sortBy, sortDir])

  const selected = suspectsList.find(s => s.id === selectedId)

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortBy(col); setSortDir('desc') }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    if (!newSuspect.name) return
    const created = {
      ...newSuspect,
      id: `S_${Date.now()}`,
      connections: 1,
      financialLinks: 1,
      callLinks: 1,
      lastSeen: new Date().toISOString().split('T')[0],
      firs: [],
      confidence: 90
    }
    await saveSuspect(created)
    setSuspectsList(prev => [created, ...prev])
    setShowAddModal(false)
    setNewSuspect({
      name: '', alias: '', type: 'PERSON', risk: 'HIGH', riskScore: 75, phone: '', location: '', role: 'SUSPECT', status: 'ACTIVE'
    })
  }

  const runAiAudit = async (suspect) => {
    setAiAuditLoading(true)
    setAiAuditReport(null)
    const prompt = `Conduct an emergency law enforcement risk assessment on suspect:
Name: ${suspect.name} (Alias: ${suspect.alias || 'None'})
Role: ${suspect.role}
Current Risk Score: ${suspect.riskScore}/100
Location: ${suspect.location || 'Unknown'}
Phone: ${suspect.phone || 'N/A'}
Provide:
1. Threat Level & Modus Operandi
2. Applicable BNS 2023 / NDPS / PMLA Statutory Provisions
3. Interception & Surveillance Action Plan`

    const res = await callGemini({ prompt, temperature: 0.2 })
    setAiAuditLoading(false)
    if (res.success) {
      setAiAuditReport(res.text)
    } else {
      setAiAuditReport('Error running AI audit: ' + res.error)
    }
  }

  const SortTh = ({ col, label }) => (
    <th className={`th-sort ${sortBy === col ? 'active' : ''}`} onClick={() => toggleSort(col)}>
      {label} {sortBy === col ? (sortDir === 'desc' ? '↓' : '↑') : '↕'}
    </th>
  )

  return (
    <div className="suspects-layout animate-fadein">
      {/* Controls */}
      <div className="suspects-controls card">
        <div className="controls-left">
          <div className="search-wrap">
            <span className="search-icon2">🔍</span>
            <input
              className="input"
              placeholder="Search name, alias, location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
          {[
            { label: 'Risk', value: riskFilter, set: setRiskFilter, opts: ['ALL','CRITICAL','HIGH','MEDIUM','LOW'] },
            { label: 'Type', value: typeFilter, set: setTypeFilter, opts: ['ALL','PERSON','ORGANIZATION','PHONE'] },
            { label: 'Status', value: statusFilter, set: setStatusFilter, opts: ['ALL','ACTIVE','ARRESTED','WATCH','CLEARED'] },
          ].map(f => (
            <select key={f.label} className="input filter-select" value={f.value} onChange={e => f.set(e.target.value)} style={{ width: 'auto' }}>
              {f.opts.map(o => <option key={o} value={o}>{o === 'ALL' ? `All ${f.label}s` : o}</option>)}
            </select>
          ))}
        </div>
        <div className="controls-right">
          <span className="mono" style={{ fontSize: '11px', color: 'var(--text-3)' }}>{filtered.length} entities</span>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>+ Add Entity</button>
        </div>
      </div>

      <div className="suspects-body">
        {/* Table */}
        <div className="suspects-table-wrap card">
          <div className="table-scroll">
            <table className="suspects-table">
              <thead>
                <tr>
                  <SortTh col="name"        label="Name" />
                  <SortTh col="type"        label="Type" />
                  <SortTh col="risk"        label="Risk" />
                  <SortTh col="riskScore"   label="Score" />
                  <SortTh col="connections" label="Links" />
                  <SortTh col="status"      label="Status" />
                  <SortTh col="lastSeen"    label="Last Seen" />
                  <th>Confidence</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr
                    key={s.id}
                    className={selectedId === s.id ? 'selected' : ''}
                    onClick={() => { setSelectedId(s.id); setAiAuditReport(null); }}
                  >
                    <td>
                      <div className="suspect-name-cell">
                        <div className="suspect-avatar-sm" style={{ background: `var(--${s.type.toLowerCase() === 'person' ? 'purple-l' : s.type.toLowerCase() === 'organization' ? 'cyan-l' : 'green-l'})` }}>
                          {s.type === 'PERSON' ? '👤' : s.type === 'ORGANIZATION' ? '🏢' : '📱'}
                        </div>
                        <div>
                          <div className="s-name">{s.name}</div>
                          {s.alias && <div className="mono s-alias">"{s.alias}"</div>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${s.type.toLowerCase()}`}>{s.type}</span>
                    </td>
                    <td>
                      <span className="risk-indicator" style={{ color: RISK_COLOR[s.risk] || '#888' }}>
                        ● {s.risk}
                      </span>
                    </td>
                    <td>
                      <div className="score-bar-wrap">
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{
                              width: `${s.riskScore}%`,
                              background: RISK_COLOR[s.risk] || 'var(--purple-l)',
                            }}
                          />
                        </div>
                        <span className="mono score-num">{s.riskScore}</span>
                      </div>
                    </td>
                    <td>
                      <span className="mono" style={{ fontSize: '12px' }}>{s.connections || 0}</span>
                    </td>
                    <td>
                      <span className={`badge badge-${(s.status || 'ACTIVE').toLowerCase()}`}>{s.status || 'ACTIVE'}</span>
                    </td>
                    <td>
                      <span className="mono" style={{ fontSize: '11px', color: 'var(--text-3)' }}>{s.lastSeen || '2024-10-14'}</span>
                    </td>
                    <td>
                      <span className="mono" style={{ fontSize: '11px', color: (s.confidence || 90) >= 80 ? 'var(--green-l)' : 'var(--yellow-l)' }}>
                        {s.confidence || 90}%
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedId(s.id)
                          runAiAudit(s)
                        }}
                        style={{ fontSize: '10px', padding: '2px 6px' }}
                      >
                        🧠 AI Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected suspect drawer */}
        {selected && (
          <div className="suspect-drawer card animate-slideup">
            <div className="drawer-header">
              <div>
                <span className="mono" style={{ fontSize: '9px', color: 'var(--text-4)' }}>{selected.id}</span>
                <h3 className="drawer-title">{selected.name}</h3>
                {selected.alias && <div className="mono" style={{ fontSize: '11px', color: 'var(--purple-l)' }}>alias "{selected.alias}"</div>}
              </div>
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setSelectedId(null)}>✕</button>
            </div>

            <div style={{ display: 'flex', gap: '6px', margin: '12px 0' }}>
              <span className={`badge badge-${selected.type.toLowerCase()}`}>{selected.type}</span>
              <span className={`badge badge-${selected.risk.toLowerCase()}`}>{selected.risk}</span>
              <span className={`badge badge-${(selected.status || 'ACTIVE').toLowerCase()}`}>{selected.status || 'ACTIVE'}</span>
            </div>

            <div className="drawer-fields">
              {[
                { label: 'ROLE',           val: selected.role },
                { label: 'GANG / CELL',    val: selected.gang || 'Independent' },
                { label: 'LOCATION',       val: selected.location || 'N/A' },
                { label: 'PHONE',          val: selected.phone || 'N/A' },
                { label: 'RISK SCORE',     val: `${selected.riskScore}/100` },
                { label: 'CONFIDENCE',     val: `${selected.confidence || 90}%` },
                { label: 'FINANCIAL LINKS',val: selected.financialLinks || 0 },
                { label: 'CALL LINKS',     val: selected.callLinks || 0 },
              ].map(f => (
                <div key={f.label} className="drawer-field-row">
                  <span className="mono drawer-field-label">{f.label}</span>
                  <span className="drawer-field-val">{f.val}</span>
                </div>
              ))}
            </div>

            {/* AI Audit Box */}
            <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="mono" style={{ fontSize: '11px', fontWeight: 700 }}>AI STATUTORY RISK AUDIT</span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => runAiAudit(selected)}
                  disabled={aiAuditLoading}
                  style={{ fontSize: '10px', padding: '2px 8px' }}
                >
                  {aiAuditLoading ? 'Analyzing...' : 'Run Gemini Audit ↗'}
                </button>
              </div>

              {aiAuditLoading && (
                <div style={{ padding: '12px', textAlign: 'center', fontSize: '11px', color: 'var(--purple-l)' }}>
                  Gemini Flash auditing suspect profile & BNS legal framework...
                </div>
              )}

              {aiAuditReport && (
                <div style={{ background: 'var(--bg-card-2)', padding: '10px', borderRadius: '6px', fontSize: '11px', maxHeight: '200px', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                  {aiAuditReport}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <a href="/dashboard/graph" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                Open on Graph →
              </a>
              <a href="/dashboard/chat" className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                Query in Copilot
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Add Entity Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card animate-fadein" style={{ width: '420px', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Add New Intelligence Entity</h3>
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>FULL NAME</label>
                <input
                  className="input"
                  required
                  placeholder="e.g. Jaspreet Singh"
                  value={newSuspect.name}
                  onChange={e => setNewSuspect({ ...newSuspect, name: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>ALIAS</label>
                  <input
                    className="input"
                    placeholder="e.g. Jassa"
                    value={newSuspect.alias}
                    onChange={e => setNewSuspect({ ...newSuspect, alias: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>TYPE</label>
                  <select
                    className="input select"
                    value={newSuspect.type}
                    onChange={e => setNewSuspect({ ...newSuspect, type: e.target.value })}
                  >
                    <option value="PERSON">PERSON</option>
                    <option value="ORGANIZATION">ORGANIZATION</option>
                    <option value="PHONE">PHONE</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>RISK LEVEL</label>
                  <select
                    className="input select"
                    value={newSuspect.risk}
                    onChange={e => setNewSuspect({ ...newSuspect, risk: e.target.value })}
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>RISK SCORE (1-100)</label>
                  <input
                    className="input"
                    type="number"
                    min="1"
                    max="100"
                    value={newSuspect.riskScore}
                    onChange={e => setNewSuspect({ ...newSuspect, riskScore: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>PHONE</label>
                  <input
                    className="input"
                    placeholder="+91-98765-43210"
                    value={newSuspect.phone}
                    onChange={e => setNewSuspect({ ...newSuspect, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--text-3)' }}>LOCATION</label>
                  <input
                    className="input"
                    placeholder="e.g. Bathinda, PB"
                    value={newSuspect.location}
                    onChange={e => setNewSuspect({ ...newSuspect, location: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', justifyContent: 'center' }}>
                Save to Supabase Database 💾
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
