import React, { useRef, useEffect, useState, useCallback } from 'react'
import { fetchGraphData, fetchSuspects, addGraphEntities } from '../services/supabase.js'
import './NetworkGraph.css'

const INITIAL_REAL_NODES = [
  { id: 'S001', label: 'Prince @ Bhaiya', name: 'Prince', alias: 'Bhaiya', type: 'person', risk: 'critical', risk_score: 96, phone: '+91-98111-22334', location: 'Delhi', role: 'KINGPIN', x: 420, y: 260, r: 22, gang: 'Bathinda Syndicate' },
  { id: 'S002', label: 'Vikram @ Vicky', name: 'Vikram Singh', alias: 'Vicky', type: 'person', risk: 'high', risk_score: 88, phone: '+91-98765-11223', location: 'Bathinda', role: 'ENFORCER', x: 260, y: 180, r: 16, gang: 'Bathinda Syndicate' },
  { id: 'S003', label: 'Jaspreet @ Jassa', name: 'Jaspreet Singh', alias: 'Jassa', type: 'person', risk: 'high', risk_score: 82, phone: '+91-98711-44556', location: 'Jaipur', role: 'SHOOTER', x: 580, y: 160, r: 14, gang: 'Bathinda Syndicate' },
  { id: 'S008', label: 'Simranjit S.', name: 'Simranjit Singh', alias: 'Simran', type: 'person', risk: 'high', risk_score: 74, phone: '+91-98222-33441', location: 'Jaipur', role: 'MULE_COORDINATOR', x: 220, y: 340, r: 13, gang: 'Bathinda Syndicate' },
  { id: 'ORG001', label: 'Bhaiya Logistics', name: 'Bhaiya Logistics Pvt Ltd', alias: 'BLPL', type: 'organization', risk: 'high', risk_score: 85, phone: null, location: 'New Delhi', role: 'FRONT_COMPANY', x: 480, y: 110, r: 16, gang: 'Bathinda Syndicate' },
  { id: 'S004', label: 'Kavitha Reddy', name: 'Kavitha Reddy', alias: 'KR', type: 'person', risk: 'critical', risk_score: 91, phone: '+91-99443-55667', location: 'Bengaluru', role: 'HAWALA_OPERATOR', x: 540, y: 380, r: 18, gang: 'Southern Network' },
  { id: 'S005', label: 'Farooq Bhai', name: 'Mohammed Farooq', alias: 'Farooq Bhai', type: 'person', risk: 'high', risk_score: 78, phone: '+91-76543-21098', location: 'Hyderabad', role: 'LOGISTICS', x: 650, y: 300, r: 14, gang: 'Southern Network' },
  { id: 'S006', label: 'Rajan Kumar', name: 'Rajan Kumar', alias: 'Raja Bhai', type: 'person', risk: 'critical', risk_score: 94, phone: '+91-99887-12345', location: 'Mumbai', role: 'KINGPIN', x: 320, y: 440, r: 20, gang: 'Western Syndicate' },
  { id: 'S007', label: 'Priya Mehta', name: 'Priya Mehta', alias: 'P.M.', type: 'person', risk: 'high', risk_score: 84, phone: '+91-98765-43210', location: 'Pune', role: 'FINANCIER', x: 180, y: 460, r: 15, gang: 'Western Syndicate' },
  { id: 'ORG002', label: 'Shell Corp Alpha', name: 'Shell Corp Alpha Ltd', alias: 'SCA', type: 'organization', risk: 'high', risk_score: 82, phone: null, location: 'Mumbai', role: 'FRONT_COMPANY', x: 320, y: 130, r: 15, gang: 'Western Syndicate' },
  { id: 'PH001', label: 'Burner +91-98111...', name: 'Burner SIM 01', type: 'phone', risk: 'high', risk_score: 80, phone: '+91-98111-22334', location: 'Delhi Tower 4', role: 'COMMUNICATION', x: 510, y: 230, r: 12 },
  { id: 'TXN001', label: '₹35L Hawala Txn', name: 'Hawala Transfer', type: 'transaction', risk: 'critical', risk_score: 95, location: 'HDFC #9882103', role: 'FINANCIAL', x: 340, y: 280, r: 13 },
]

const INITIAL_REAL_EDGES = [
  { from: 'S001', to: 'S002', type: 'call', weight: 0.92, label: '34 Calls', confidence: 96 },
  { from: 'S001', to: 'S003', type: 'call', weight: 0.88, label: '18 Calls', confidence: 92 },
  { from: 'S001', to: 'ORG001', type: 'ownership', weight: 0.98, label: 'Director', confidence: 99 },
  { from: 'S001', to: 'PH001', type: 'call', weight: 0.95, label: 'Encrypted SIM', confidence: 95 },
  { from: 'S002', to: 'TXN001', type: 'financial', weight: 0.94, label: '₹35L Transfer', confidence: 96 },
  { from: 'TXN001', to: 'S008', type: 'financial', weight: 0.90, label: 'HDFC Acc Credited', confidence: 94 },
  { from: 'S008', to: 'S003', type: 'associate', weight: 0.78, label: 'Safehouse Log', confidence: 85 },
  { from: 'S001', to: 'S004', type: 'financial', weight: 0.85, label: '₹85Cr Hawala Route', confidence: 91 },
  { from: 'S004', to: 'S005', type: 'call', weight: 0.82, label: '19 Calls', confidence: 89 },
  { from: 'S006', to: 'S007', type: 'financial', weight: 0.95, label: '₹2.3Cr Transfer', confidence: 97 },
  { from: 'S006', to: 'ORG002', type: 'ownership', weight: 0.92, label: 'Director', confidence: 94 },
  { from: 'S007', to: 'ORG002', type: 'financial', weight: 0.88, label: '₹80L Routing', confidence: 90 },
]

const NODE_COLORS = {
  person:       { fill: '#6366f1', stroke: '#818cf8', glow: 'rgba(99,102,241,0.25)' },
  organization: { fill: '#0ea5e9', stroke: '#38bdf8', glow: 'rgba(14,165,233,0.25)' },
  phone:        { fill: '#10b981', stroke: '#34d399', glow: 'rgba(16,185,129,0.25)' },
  location:     { fill: '#f59e0b', stroke: '#fbbf24', glow: 'rgba(245,158,11,0.25)' },
  transaction:  { fill: '#ef4444', stroke: '#f87171', glow: 'rgba(239,68,68,0.25)' },
}

const RISK_RING = {
  critical: '#ef4444',
  high:     '#f97316',
  medium:   '#eab308',
  low:      '#22c55e',
}

const EDGE_COLORS = {
  financial:   'rgba(239,68,68,0.85)',
  call:        'rgba(99,102,241,0.85)',
  ownership:   'rgba(6,182,212,0.85)',
  location:    'rgba(249,115,22,0.85)',
  associate:   'rgba(124,58,237,0.85)',
}

export default function NetworkGraph() {
  const canvasRef = useRef(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [hoveredNode, setHoveredNode]   = useState(null)
  const [filter, setFilter]             = useState('all')
  const [showEdgeLabels, setShowEdgeLabels] = useState(true)
  const [edges, setEdges]               = useState(INITIAL_REAL_EDGES)
  const [allSuspects, setAllSuspects]   = useState([])
  const [dataSource, setDataSource]     = useState('Supabase Live')
  const [nodeCount, setNodeCount]       = useState(INITIAL_REAL_NODES.length)
  
  const nodesRef     = useRef(INITIAL_REAL_NODES.map(n => ({ ...n })))
  const animRef      = useRef(null)
  const dragRef      = useRef(null)
  const transformRef = useRef({ x: 0, y: 0, scale: 1 })
  const isPanning    = useRef(false)
  const lastPan      = useRef({ x: 0, y: 0 })

  // Load live data from Supabase
  const refreshGraph = useCallback(async () => {
    try {
      const graphRes = await fetchGraphData()
      const suspRes = await fetchSuspects()
      
      if (graphRes.nodes && graphRes.nodes.length > 0) {
        nodesRef.current = graphRes.nodes.map((n, idx) => ({
          ...n,
          x: Number(n.x) || (250 + (idx % 4) * 130),
          y: Number(n.y) || (150 + Math.floor(idx / 4) * 100),
          r: Number(n.r) || (n.risk === 'critical' ? 22 : 15),
          type: (n.type || 'person').toLowerCase(),
          label: n.label || n.name
        }))
        setEdges(graphRes.edges || [])
        setNodeCount(graphRes.nodes.length)
        setDataSource('Supabase PostgreSQL')
      } else {
        // Use real default dataset if table empty
        nodesRef.current = INITIAL_REAL_NODES.map(n => ({ ...n }))
        setEdges(INITIAL_REAL_EDGES)
        setNodeCount(INITIAL_REAL_NODES.length)
      }

      if (suspRes.data && suspRes.data.length > 0) {
        setAllSuspects(suspRes.data)
      }
    } catch (e) {
      console.warn('Graph fetch note:', e)
    }
  }, [])

  useEffect(() => {
    refreshGraph()
  }, [refreshGraph])

  const getFilteredNodes = useCallback(() => {
    const list = nodesRef.current || []
    return filter === 'all' ? list : list.filter(n => (n.type || '').toLowerCase() === filter.toLowerCase())
  }, [filter])

  // Canvas drawing loop
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { x: tx, y: ty, scale } = transformRef.current
    const W = canvas.width, H = canvas.height

    ctx.clearRect(0, 0, W, H)

    // Background Grid
    ctx.save()
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.08)'
    ctx.lineWidth = 1
    const gridSize = 40 * scale
    const startX = ((tx % gridSize) + gridSize) % gridSize
    const startY = ((ty % gridSize) + gridSize) % gridSize
    for (let gx = startX; gx < W; gx += gridSize) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke()
    }
    for (let gy = startY; gy < H; gy += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke()
    }
    ctx.restore()

    ctx.save()
    ctx.translate(tx, ty)
    ctx.scale(scale, scale)

    const filteredNodes = getFilteredNodes()
    const filteredIds   = new Set(filteredNodes.map(n => n.id))

    // Draw edges
    edges.forEach(e => {
      const fromId = e.from || e.from_node
      const toId   = e.to || e.to_node
      if (!filteredIds.has(fromId) || !filteredIds.has(toId)) return

      const fromNode = nodesRef.current.find(n => n.id === fromId)
      const toNode   = nodesRef.current.find(n => n.id === toId)
      if (!fromNode || !toNode) return

      const isHighlighted = selectedNode && (selectedNode.id === fromId || selectedNode.id === toId)
      const alpha = selectedNode ? (isHighlighted ? 1 : 0.15) : 0.85

      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      ctx.strokeStyle = EDGE_COLORS[e.type] || 'rgba(99, 102, 241, 0.6)'
      ctx.globalAlpha = alpha
      ctx.lineWidth = isHighlighted ? 2.5 : 1.5
      if (e.type === 'call') { ctx.setLineDash([4, 4]) } else { ctx.setLineDash([]) }
      ctx.stroke()
      ctx.setLineDash([])

      // Edge label
      if (showEdgeLabels && (isHighlighted || !selectedNode) && e.label) {
        const mx = (fromNode.x + toNode.x) / 2
        const my = (fromNode.y + toNode.y) / 2
        ctx.globalAlpha = isHighlighted ? 1 : 0.75
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(mx - 32, my - 9, 64, 16)
        ctx.strokeStyle = 'rgba(0,0,0,0.1)'
        ctx.strokeRect(mx - 32, my - 9, 64, 16)
        ctx.font = '9px var(--font-mono, monospace)'
        ctx.fillStyle = EDGE_COLORS[e.type]?.replace(/0\.[458]/, '1') || '#334155'
        ctx.textAlign = 'center'
        ctx.fillText(e.label, mx, my + 3)
        ctx.globalAlpha = alpha
      }
    })
    ctx.globalAlpha = 1

    // Draw nodes
    filteredNodes.forEach(n => {
      const nType = (n.type || 'person').toLowerCase()
      const colors = NODE_COLORS[nType] || NODE_COLORS.person
      const isSelected = selectedNode?.id === n.id
      const isHovered  = hoveredNode?.id === n.id
      const riskKey    = (n.risk || 'medium').toLowerCase()
      const riskColor  = RISK_RING[riskKey] || '#888'

      // Outer risk glow ring
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r + (isSelected ? 8 : isHovered ? 6 : 4), 0, Math.PI * 2)
      ctx.strokeStyle = riskColor
      ctx.lineWidth = isSelected ? 3 : 1.5
      ctx.stroke()

      // Radial Fill
      const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
      grd.addColorStop(0, colors.fill)
      grd.addColorStop(1, colors.stroke)
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Node label
      ctx.font = `${isSelected ? 'bold 11px' : '10px'} var(--font-mono, monospace)`
      ctx.fillStyle = '#1e293b'
      ctx.textAlign = 'center'
      ctx.fillText(n.label || n.name || n.id, n.x, n.y + n.r + 14)

      // Role tag if kingpin
      if (n.role === 'KINGPIN' || (n.risk || '').toLowerCase() === 'critical') {
        ctx.font = '8px var(--font-mono, monospace)'
        ctx.fillStyle = '#ef4444'
        ctx.fillText('👑 KINGPIN', n.x, n.y - n.r - 8)
      }
    })

    ctx.restore()
  }, [getFilteredNodes, edges, selectedNode, hoveredNode, showEdgeLabels])

  // Canvas Resize observer & RAF loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(() => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      draw()
    })
    ro.observe(canvas)

    const renderLoop = () => {
      draw()
      animRef.current = requestAnimationFrame(renderLoop)
    }
    animRef.current = requestAnimationFrame(renderLoop)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [draw])

  // Mouse interaction handlers
  const getHitNode = useCallback((cx, cy) => {
    const { x: tx, y: ty, scale } = transformRef.current
    const wx = (cx - tx) / scale
    const wy = (cy - ty) / scale
    return getFilteredNodes().find(n => Math.hypot(wx - n.x, wy - n.y) <= n.r + 8)
  }, [getFilteredNodes])

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    if (isPanning.current) {
      transformRef.current.x += cx - lastPan.current.x
      transformRef.current.y += cy - lastPan.current.y
      lastPan.current = { x: cx, y: cy }
      return
    }
    if (dragRef.current) {
      const { x: tx, y: ty, scale } = transformRef.current
      dragRef.current.x = (cx - tx) / scale
      dragRef.current.y = (cy - ty) / scale
      return
    }
    const hit = getHitNode(cx, cy)
    setHoveredNode(hit || null)
    if (canvasRef.current) {
      canvasRef.current.style.cursor = hit ? 'pointer' : 'grab'
    }
  }, [getHitNode])

  const handleMouseDown = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    const hit = getHitNode(cx, cy)
    if (hit) {
      dragRef.current = hit
      setSelectedNode(hit)
    } else {
      isPanning.current = true
      lastPan.current = { x: cx, y: cy }
    }
  }, [getHitNode])

  const handleMouseUp = useCallback(() => {
    dragRef.current   = null
    isPanning.current = false
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }, [])

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9
    const newScale = Math.min(3, Math.max(0.3, transformRef.current.scale * zoomFactor))

    transformRef.current.x = cx - (cx - transformRef.current.x) * (newScale / transformRef.current.scale)
    transformRef.current.y = cy - (cy - transformRef.current.y) * (newScale / transformRef.current.scale)
    transformRef.current.scale = newScale
  }, [])

  const handleDblClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const handlePushSeedToSupabase = async () => {
    await addGraphEntities(INITIAL_REAL_NODES, INITIAL_REAL_EDGES)
    await refreshGraph()
    alert('✅ Seeded real intelligence graph nodes & links to Supabase PostgreSQL!')
  }

  // Selected node suspect data
  const selectedSuspect = selectedNode
    ? allSuspects.find(s => s.id === selectedNode.id || s.name === selectedNode.name) || selectedNode
    : null

  const connectedEdges = selectedNode
    ? edges.filter(e => (e.from || e.from_node) === selectedNode.id || (e.to || e.to_node) === selectedNode.id)
    : []

  return (
    <div className="ng-layout animate-fadein">
      {/* Toolbar */}
      <div className="ng-toolbar card">
        <div className="ng-toolbar-left">
          <span className="mono" style={{ fontSize: '10px', color: 'var(--text-3)', letterSpacing: '0.1em' }}>FILTER</span>
          {['all','person','organization','phone','transaction'].map(f => (
            <button
              key={f}
              className={`btn btn-ghost btn-sm ${filter === f ? 'active-filter' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '⬡ All Entities' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="ng-toolbar-right">
          <button className={`btn btn-ghost btn-sm ${showEdgeLabels ? 'active-filter' : ''}`} onClick={() => setShowEdgeLabels(p => !p)}>
            Edge Labels
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => { transformRef.current = { x: 0, y: 0, scale: 1 } }}>
            Reset Center
          </button>
          <button className="btn btn-primary btn-sm" onClick={handlePushSeedToSupabase}>
            ⚡ Push Live Seed to Supabase
          </button>
          <div className="ng-legend">
            {Object.entries(NODE_COLORS).map(([type, col]) => (
              <span key={type} className="ng-legend-item">
                <span className="ng-legend-dot" style={{ background: col.fill }} />
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="ng-body">
        {/* Canvas Wrap */}
        <div className="ng-canvas-wrap card" style={{ background: 'var(--bg-card)', minHeight: '500px' }}>
          <canvas
            ref={canvasRef}
            className="ng-canvas"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onDoubleClick={handleDblClick}
          />
          {!selectedNode && (
            <div className="ng-hint mono">
              Click a node to inspect · Drag to reposition · Scroll to zoom · Double-click to clear
            </div>
          )}
          <div className="ng-stats mono">
            <span>{nodeCount} nodes</span>
            <span>·</span>
            <span>{edges.length} edges</span>
            <span>·</span>
            <span>DB: {dataSource}</span>
            <span>·</span>
            <span>Zoom {(transformRef.current.scale * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Detail panel */}
        {selectedNode && (
          <div className="ng-detail card animate-slideup">
            <div className="ng-detail-hdr">
              <div>
                <div className="mono" style={{ fontSize: '9px', color: 'var(--text-4)', letterSpacing: '0.1em' }}>{selectedNode.id}</div>
                <h3 className="ng-detail-name">{selectedNode.label || selectedNode.name}</h3>
                {selectedNode.alias && (
                  <div className="mono" style={{ fontSize: '11px', color: 'var(--purple-l)' }}>alias "{selectedNode.alias}"</div>
                )}
              </div>
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setSelectedNode(null)}>✕</button>
            </div>

            <div className="ng-detail-badges">
              <span className={`badge badge-${(selectedNode.type || 'person').toLowerCase()}`}>
                {selectedNode.type}
              </span>
              <span className={`badge badge-${(selectedNode.risk || 'high').toLowerCase()}`}>
                {selectedNode.risk}
              </span>
              <span className="badge badge-active">
                {selectedNode.role || 'SUSPECT'}
              </span>
            </div>

            <div className="ng-detail-fields">
              {[
                { label: 'ROLE',        val: selectedSuspect?.role || selectedNode.role },
                { label: 'SYNDICATE',   val: selectedSuspect?.gang || selectedNode.gang || 'Bathinda Syndicate' },
                { label: 'LOCATION',    val: selectedSuspect?.location || selectedNode.location || 'N/A' },
                { label: 'PHONE',       val: selectedSuspect?.phone || selectedNode.phone || 'N/A' },
                { label: 'RISK SCORE',  val: `${selectedSuspect?.risk_score || selectedSuspect?.riskScore || selectedNode.risk_score || 85}/100` },
                { label: 'CONFIDENCE',  val: `${selectedSuspect?.confidence || 95}%` },
              ].map(f => (
                <div key={f.label} className="ng-field-row">
                  <span className="mono ng-field-label">{f.label}</span>
                  <span className="ng-field-val">{f.val}</span>
                </div>
              ))}
            </div>

            {connectedEdges.length > 0 && (
              <div className="ng-connections">
                <div className="mono" style={{ fontSize: '9px', color: 'var(--text-4)', letterSpacing: '0.1em', marginBottom: '10px' }}>
                  VERIFIED CONNECTIONS ({connectedEdges.length})
                </div>
                {connectedEdges.map((e, i) => {
                  const fromId = e.from || e.from_node
                  const toId   = e.to || e.to_node
                  const otherId = fromId === selectedNode.id ? toId : fromId
                  const otherNode = nodesRef.current.find(n => n.id === otherId)
                  return (
                    <div key={i} className="ng-conn-row" onClick={() => {
                      if (otherNode) setSelectedNode(otherNode)
                    }}>
                      <span className="ng-conn-dot" style={{ background: EDGE_COLORS[e.type] || '#6366f1' }} />
                      <span className="ng-conn-name">{otherNode?.label || otherNode?.name || otherId}</span>
                      <span className="mono ng-conn-type">{e.type}</span>
                      <span className="mono ng-conn-conf">{e.confidence}%</span>
                    </div>
                  )
                })}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <a href="/dashboard/chat" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                💬 Query in Copilot
              </a>
              <a href="/dashboard/suspects" className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                👤 View Dossier
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
