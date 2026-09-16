import React, { useRef, useEffect, useState, useCallback } from 'react'
import { fetchGraphData, fetchSuspects, addGraphEntities } from '../services/supabase.js'
import { 
  IconRefresh, 
  IconSearch, 
  IconClose, 
  IconCrown, 
  IconZap, 
  IconChat, 
  IconUser, 
  IconFolder, 
  IconShieldCheck,
  IconRadio,
  IconActivity,
  IconArrowRight
} from '../components/common/Icons.jsx'
import './NetworkGraph.css'

// REAL CRIME INVESTIGATION DATASETS
const CASE_DATASETS = {
  bathinda: {
    name: 'Operation Bathinda Syndicate (Inter-State Extortion & Killings)',
    nodes: [
      { id: 'S001', label: 'Prince @ Bhaiya', name: 'Prince', alias: 'Bhaiya', type: 'person', risk: 'critical', risk_score: 96, phone: '+91-98111-22334', location: 'Delhi / Bathinda', role: 'KINGPIN', x: 420, y: 260, r: 24, gang: 'Bathinda Syndicate' },
      { id: 'S002', label: 'Vikram @ Vicky', name: 'Vikram Singh', alias: 'Vicky', type: 'person', risk: 'high', risk_score: 88, phone: '+91-98765-11223', location: 'Bathinda, PB', role: 'ENFORCER', x: 260, y: 180, r: 16, gang: 'Bathinda Syndicate' },
      { id: 'S003', label: 'Jaspreet @ Jassa', name: 'Jaspreet Singh', alias: 'Jassa', type: 'person', risk: 'high', risk_score: 82, phone: '+91-98711-44556', location: 'Jaipur, RJ', role: 'SHOOTER', x: 580, y: 160, r: 15, gang: 'Bathinda Syndicate' },
      { id: 'S008', label: 'Simranjit S.', name: 'Simranjit Singh', alias: 'Simran', type: 'person', risk: 'high', risk_score: 74, phone: '+91-98222-33441', location: 'Jaipur, RJ', role: 'MULE_COORDINATOR', x: 220, y: 340, r: 14, gang: 'Bathinda Syndicate' },
      { id: 'ORG001', label: 'Bhaiya Logistics Pvt Ltd', name: 'Bhaiya Logistics', alias: 'BLPL', type: 'organization', risk: 'high', risk_score: 85, phone: null, location: 'New Delhi', role: 'FRONT_COMPANY', x: 480, y: 110, r: 18, gang: 'Bathinda Syndicate' },
      { id: 'S004', label: 'Kavitha Reddy', name: 'Kavitha Reddy', alias: 'KR', type: 'person', risk: 'critical', risk_score: 91, phone: '+91-99443-55667', location: 'Bengaluru, KA', role: 'HAWALA_OPERATOR', x: 540, y: 380, r: 19, gang: 'Southern Network' },
      { id: 'S005', label: 'Farooq Bhai', name: 'Mohammed Farooq', alias: 'Farooq Bhai', type: 'person', risk: 'high', risk_score: 78, phone: '+91-76543-21098', location: 'Hyderabad, TS', role: 'LOGISTICS', x: 660, y: 300, r: 15, gang: 'Southern Network' },
      { id: 'S006', label: 'Rajan Kumar', name: 'Rajan Kumar', alias: 'Raja Bhai', type: 'person', risk: 'critical', risk_score: 94, phone: '+91-99887-12345', location: 'Mumbai, MH', role: 'KINGPIN', x: 320, y: 450, r: 22, gang: 'Western Syndicate' },
      { id: 'S007', label: 'Priya Mehta', name: 'Priya Mehta', alias: 'P.M.', type: 'person', risk: 'high', risk_score: 84, phone: '+91-98765-43210', location: 'Pune, MH', role: 'FINANCIER', x: 180, y: 470, r: 16, gang: 'Western Syndicate' },
      { id: 'ORG002', label: 'Shell Corp Alpha Ltd', name: 'Shell Corp Alpha', alias: 'SCA', type: 'organization', risk: 'high', risk_score: 82, phone: null, location: 'Mumbai, MH', role: 'FRONT_COMPANY', x: 320, y: 130, r: 17, gang: 'Western Syndicate' },
      { id: 'PH001', label: 'Burner SIM +91-98111', name: 'Burner SIM 01', type: 'phone', risk: 'high', risk_score: 80, phone: '+91-98111-22334', location: 'Delhi Tower 4', role: 'COMMUNICATION', x: 520, y: 230, r: 13 },
      { id: 'TXN001', label: '₹35L Hawala Ledger', name: 'Hawala Transfer', type: 'transaction', risk: 'critical', risk_score: 95, location: 'HDFC #9882103', role: 'FINANCIAL', x: 340, y: 280, r: 14 },
    ],
    edges: [
      { from: 'S001', to: 'S002', type: 'call', weight: 0.92, label: '34 Encrypted Calls', confidence: 96 },
      { from: 'S001', to: 'S003', type: 'call', weight: 0.88, label: '18 Calls', confidence: 92 },
      { from: 'S001', to: 'ORG001', type: 'ownership', weight: 0.98, label: 'Director 80%', confidence: 99 },
      { from: 'S001', to: 'PH001', type: 'call', weight: 0.95, label: 'Tower Triangulation', confidence: 95 },
      { from: 'S002', to: 'TXN001', type: 'financial', weight: 0.94, label: '₹35L Hawala Outflow', confidence: 96 },
      { from: 'TXN001', to: 'S008', type: 'financial', weight: 0.90, label: 'Mule Credit HDFC', confidence: 94 },
      { from: 'S008', to: 'S003', type: 'associate', weight: 0.78, label: 'Safehouse Log', confidence: 85 },
      { from: 'S001', to: 'S004', type: 'financial', weight: 0.85, label: '₹85Cr Conduit Route', confidence: 91 },
      { from: 'S004', to: 'S005', type: 'call', weight: 0.82, label: '19 Intercepts', confidence: 89 },
      { from: 'S006', to: 'S007', type: 'financial', weight: 0.95, label: '₹2.3Cr Transfer', confidence: 97 },
      { from: 'S006', to: 'ORG002', type: 'ownership', weight: 0.92, label: 'Director', confidence: 94 },
      { from: 'S007', to: 'ORG002', type: 'financial', weight: 0.88, label: '₹80L Shell Routing', confidence: 90 },
    ]
  },
  sheena: {
    name: 'Sheena Bora CDR Triangulation Case (Mumbai Crime Branch)',
    nodes: [
      { id: 'SB01', label: 'Indrani Mukerjea', name: 'Indrani Mukerjea', alias: 'Primary Suspect', type: 'person', risk: 'critical', risk_score: 98, phone: '+91-98200-44551', location: 'Worli, Mumbai', role: 'KINGPIN', x: 420, y: 240, r: 24, gang: 'Prime Accused' },
      { id: 'SB02', label: 'Shyamvar Rai (Driver)', name: 'Shyamvar Rai', alias: 'Driver', type: 'person', risk: 'high', risk_score: 86, phone: '+91-98199-77112', location: 'Bandra, Mumbai', role: 'ENFORCER', x: 260, y: 220, r: 17, gang: 'Accomplice' },
      { id: 'SB03', label: 'Sanjeev Khanna', name: 'Sanjeev Khanna', alias: 'Ex-Husband', type: 'person', risk: 'critical', risk_score: 92, phone: '+91-98300-33221', location: 'Kolkata / Mumbai', role: 'CONSPIRATOR', x: 580, y: 190, r: 20, gang: 'Accomplice' },
      { id: 'SB04', label: 'Sheena Bora (Victim)', name: 'Sheena Bora', alias: 'Deceased', type: 'person', risk: 'medium', risk_score: 45, phone: '+91-98201-99887', location: 'Bandra Linking Rd', role: 'VICTIM', x: 400, y: 380, r: 16, gang: 'Victim' },
      { id: 'LOC01', label: 'Pen Forest Gagode Khurd', name: 'Crime Location', type: 'location', risk: 'critical', risk_score: 99, location: 'Raigad District', role: 'EVIDENCE_SITE', x: 240, y: 380, r: 18 },
      { id: 'CDR01', label: '15 Intercepted Calls', name: 'CDR Triangulation', type: 'phone', risk: 'high', risk_score: 94, location: 'Tower Cell #882', role: 'CDR_LINK', x: 330, y: 120, r: 15 },
    ],
    edges: [
      { from: 'SB01', to: 'SB02', type: 'call', weight: 0.98, label: '15 Calls on Apr 23-24', confidence: 99 },
      { from: 'SB01', to: 'SB03', type: 'call', weight: 0.95, label: 'Kolkata Flight Intercept', confidence: 97 },
      { from: 'SB01', to: 'SB04', type: 'associate', weight: 0.99, label: 'Co-presence Bandra', confidence: 99 },
      { from: 'SB02', to: 'LOC01', type: 'location', weight: 0.96, label: 'Opel Corsa GPS Log', confidence: 98 },
      { from: 'SB01', to: 'CDR01', type: 'call', weight: 0.94, label: 'Spoofed SMS Tower', confidence: 96 },
      { from: 'SB03', to: 'LOC01', type: 'location', weight: 0.92, label: 'Hotel Hilltop CDR', confidence: 95 },
    ]
  }
}

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
  const [activeCaseKey, setActiveCaseKey] = useState('bathinda')
  const [selectedNode, setSelectedNode] = useState(null)
  const [hoveredNode, setHoveredNode]   = useState(null)
  const [filter, setFilter]             = useState('all')
  const [showEdgeLabels, setShowEdgeLabels] = useState(true)
  const [liveTelemetry, setLiveTelemetry] = useState(true)
  const [edges, setEdges]               = useState(CASE_DATASETS.bathinda.edges)
  const [allSuspects, setAllSuspects]   = useState([])
  const [dataSource, setDataSource]     = useState('Neural Ledger')
  const [nodeCount, setNodeCount]       = useState(CASE_DATASETS.bathinda.nodes.length)
  
  const nodesRef     = useRef(CASE_DATASETS.bathinda.nodes.map(n => ({ ...n })))
  const animRef      = useRef(null)
  const dragRef      = useRef(null)
  const transformRef = useRef({ x: 0, y: 0, scale: 1 })
  const isPanning    = useRef(false)
  const lastPan      = useRef({ x: 0, y: 0 })
  const particleOffset = useRef(0)

  // Switch dataset
  const switchCase = (key) => {
    setActiveCaseKey(key)
    const ds = CASE_DATASETS[key] || CASE_DATASETS.bathinda
    nodesRef.current = ds.nodes.map(n => ({ ...n }))
    setEdges(ds.edges)
    setNodeCount(ds.nodes.length)
    setSelectedNode(null)
    transformRef.current = { x: 0, y: 0, scale: 1 }
  }

  // Load live data from database
  const refreshGraph = useCallback(async () => {
    try {
      const graphRes = await fetchGraphData()
      const suspRes = await fetchSuspects()
      
      if (graphRes.nodes && graphRes.nodes.length > 0 && activeCaseKey === 'bathinda') {
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
        setDataSource('Neural Ledger')
      }
      if (suspRes.data && suspRes.data.length > 0) {
        setAllSuspects(suspRes.data)
      }
    } catch (e) {
      console.warn('Graph fetch note:', e)
    }
  }, [activeCaseKey])

  useEffect(() => {
    refreshGraph()
  }, [refreshGraph])

  const getFilteredNodes = useCallback(() => {
    const list = nodesRef.current || []
    return filter === 'all' ? list : list.filter(n => (n.type || '').toLowerCase() === filter.toLowerCase())
  }, [filter])

  // Canvas drawing loop with real-time particle animation
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

    // Advance live telemetry particles
    if (liveTelemetry) {
      particleOffset.current = (particleOffset.current + 0.008) % 1
    }

    // Draw edges
    edges.forEach((e, edgeIdx) => {
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

      // Real-time flowing data packet particle
      if (liveTelemetry && alpha > 0.3) {
        const t = (particleOffset.current + (edgeIdx * 0.2)) % 1
        const px = fromNode.x + (toNode.x - fromNode.x) * t
        const py = fromNode.y + (toNode.y - fromNode.y) * t
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = e.type === 'financial' ? '#ef4444' : '#38bdf8'
        ctx.fill()
      }

      // Edge label
      if (showEdgeLabels && (isHighlighted || !selectedNode) && e.label) {
        const mx = (fromNode.x + toNode.x) / 2
        const my = (fromNode.y + toNode.y) / 2
        ctx.globalAlpha = isHighlighted ? 1 : 0.85
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(mx - 40, my - 9, 80, 18)
        ctx.strokeStyle = 'rgba(0,0,0,0.08)'
        ctx.strokeRect(mx - 40, my - 9, 80, 18)
        ctx.font = '600 9px var(--font-mono, monospace)'
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

      // Inner icon glyph
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 10px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const typeInit = nType === 'person' ? (n.role === 'KINGPIN' ? '★' : 'P') : nType === 'organization' ? 'O' : nType === 'phone' ? 'T' : 'D'
      ctx.fillText(typeInit, n.x, n.y)

      // Node label
      ctx.font = `${isSelected ? 'bold 11px' : '600 10px'} var(--font-ui, sans-serif)`
      ctx.fillStyle = '#0f172a'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(n.label || n.name || n.id, n.x, n.y + n.r + 10)

      // Role tag if kingpin
      if (n.role === 'KINGPIN' || (n.risk || '').toLowerCase() === 'critical') {
        ctx.font = 'bold 8px var(--font-mono, monospace)'
        ctx.fillStyle = '#dc2626'
        ctx.fillText('APEX TARGET', n.x, n.y - n.r - 12)
      }
    })

    ctx.restore()
  }, [getFilteredNodes, edges, selectedNode, hoveredNode, showEdgeLabels, liveTelemetry])

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

  const handleSyncGraph = async () => {
    const ds = CASE_DATASETS[activeCaseKey] || CASE_DATASETS.bathinda
    await addGraphEntities(ds.nodes, ds.edges)
    await refreshGraph()
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
      
      {/* Case Dataset Selector Bar */}
      <div className="card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)' }}>INVESTIGATION DOSSIER:</span>
          <div className="pill-toggle-group">
            <button
              className={`pill-toggle-btn ${activeCaseKey === 'bathinda' ? 'active' : ''}`}
              onClick={() => switchCase('bathinda')}
            >
              Operation Bathinda (3-State)
            </button>
            <button
              className={`pill-toggle-btn ${activeCaseKey === 'sheena' ? 'active' : ''}`}
              onClick={() => switchCase('sheena')}
            >
              Sheena Bora CDR Triangulation
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className={`btn btn-sm ${liveTelemetry ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setLiveTelemetry(p => !p)}
          >
            <span className={`pulse-dot ${liveTelemetry ? 'pulse-green' : 'pulse-amber'}`} />
            {liveTelemetry ? 'Live Stream Active' : 'Telemetry Paused'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleSyncGraph} title="Sync database ledger">
            <IconRefresh size={13} /> Sync Ledger
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="ng-toolbar card">
        <div className="ng-toolbar-left">
          <span className="mono" style={{ fontSize: '10px', color: 'var(--text-3)', letterSpacing: '0.1em' }}>FILTER ENTITIES</span>
          {['all','person','organization','phone','location','transaction'].map(f => (
            <button
              key={f}
              className={`btn btn-ghost btn-sm ${filter === f ? 'active-filter' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All Entities' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="ng-toolbar-right">
          <button className={`btn btn-ghost btn-sm ${showEdgeLabels ? 'active-filter' : ''}`} onClick={() => setShowEdgeLabels(p => !p)}>
            Relational Tags
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => { transformRef.current = { x: 0, y: 0, scale: 1 } }}>
            Reset Center
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
        <div className="ng-canvas-wrap card" style={{ background: '#ffffff', minHeight: '520px' }}>
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
              Click node to inspect dossier · Drag to reposition · Scroll to zoom · Double-click to clear
            </div>
          )}
          <div className="ng-stats mono">
            <span>{nodeCount} Nodes</span>
            <span>·</span>
            <span>{edges.length} Relational Links</span>
            <span>·</span>
            <span>Sync: {dataSource}</span>
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
                  <div className="mono" style={{ fontSize: '11px', color: 'var(--purple-d)', marginTop: '2px' }}>
                    alias "{selectedNode.alias}"
                  </div>
                )}
              </div>
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setSelectedNode(null)}>
                <IconClose size={12} />
              </button>
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
                { label: 'SYNDICATE',   val: selectedSuspect?.gang || selectedNode.gang || 'Active Ring' },
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
                <div className="mono" style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  VERIFIED RELATIONAL LINKS ({connectedEdges.length})
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
                <IconChat size={13} /> Query Copilot
              </a>
              <a href="/dashboard/suspects" className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                <IconUser size={13} /> Suspect File
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

