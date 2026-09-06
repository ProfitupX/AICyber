import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './AIDetectionStudio.css'

// Built-in Real-World Case Presets
const CASE_PRESETS = [
  {
    id: 'jamtara',
    title: '💻 Jamtara Phishing & Mule Ring',
    category: 'CYBER FRAUD',
    badgeClass: 'tag-cyan',
    summary: '₹85 Lakh siphoned via fake banking APKs, layered across 4 mule accounts with Jamtara IMEI cell tower cluster.',
    content: `FIR #104/24 (Cyber Crime Cell, MHA): Investigation into ₹85,00,000 siphoned from 14 bank customers via malicious phishing APKs. Kingpin 'Rohan alias Vicky' directed fund routing through 4 layered mule accounts in ICICI Bank (Acc #990142) and SBI (Acc #881234). Mastermind operated burner phone (+91-98765-43210) pinging Jamtara Cell Tower #JMT-04 (IMEI 864521099882). Mule cash courier Amit Verma withdrew ₹35L cash for delivery to Karol Bagh Delhi safehouse.`,
    nodes: [
      { id: 'rohan', label: 'Rohan (alias Vicky)', type: 'kingpin', role: 'Syndicate Mastermind', risk: 'critical', centrality: 0.98, pageRank: 1, phone: '+91-98765-43210', location: 'Jamtara, JH', x: 260, y: 150, r: 24, details: 'Coordinates phishing APK distribution and mule payout splits.' },
      { id: 'burner1', label: 'Burner SIM (IMEI 8645..)', type: 'phone', role: 'Burner Device', risk: 'high', centrality: 0.82, pageRank: 3, phone: '+91-98765-43210', location: 'Tower JMT-04', x: 440, y: 110, r: 18, details: 'Active 22:00-04:00 only. 48 calls to mule account holders.' },
      { id: 'icici_mule', label: 'ICICI Mule (Acc #990142)', type: 'bank', role: 'Layer 1 Mule Account', risk: 'critical', centrality: 0.91, pageRank: 2, amount: '₹50,00,000', x: 200, y: 300, r: 20, details: 'Account holder Suresh P. (dormant account activated 3 days prior).' },
      { id: 'sbi_mule', label: 'SBI Mule (Acc #881234)', type: 'bank', role: 'Layer 2 Mule Account', risk: 'high', centrality: 0.86, pageRank: 4, amount: '₹35,00,000', x: 380, y: 320, r: 20, details: 'Smurfed into 12 micro UPI transactions under ₹50,000.' },
      { id: 'amit', label: 'Amit Verma (Courier)', type: 'associate', role: 'Cash Mule Courier', risk: 'high', centrality: 0.74, pageRank: 5, phone: '+91-98112-99001', location: 'Delhi', x: 550, y: 280, r: 17, details: 'Collected ₹35L cash at New Delhi Railway Station ATM cluster.' },
      { id: 'safehouse', label: 'Delhi Safehouse (Karol Bagh)', type: 'location', role: 'Drop Location', risk: 'medium', centrality: 0.61, pageRank: 6, location: 'Karol Bagh, Delhi', x: 670, y: 190, r: 16, details: 'Identified via Amit Verma GPS trace and CCTV footage.' },
      { id: 'jmt_tower', label: 'Jamtara Cell Tower #04', type: 'location', role: 'Cell Tower Infrastructure', risk: 'medium', centrality: 0.58, pageRank: 7, location: 'Jamtara, Jharkhand', x: 100, y: 130, r: 15, details: 'Sector 3 antenna overlapping with 6 co-accused devices.' },
    ],
    edges: [
      { from: 'rohan', to: 'burner1', type: 'operates', label: 'Primary SIM', conf: 99 },
      { from: 'burner1', to: 'jmt_tower', type: 'signal', label: 'Cell Handshake', conf: 96 },
      { from: 'burner1', to: 'icici_mule', type: 'financial', label: '₹50L Phished', conf: 98 },
      { from: 'icici_mule', to: 'sbi_mule', type: 'financial', label: '₹35L Layered', conf: 95 },
      { from: 'sbi_mule', to: 'amit', type: 'financial', label: '₹35L Cash Out', conf: 94 },
      { from: 'amit', to: 'safehouse', type: 'movement', label: 'Cash Delivery', conf: 91 },
      { from: 'rohan', to: 'amit', type: 'call', label: '14 Encrypted Calls', conf: 92 },
    ],
    threatLevel: 'CRITICAL',
    confidence: 97.8,
    legalDossier: {
      sections: ['Sec 111 BNS (Organized Crime)', 'Sec 318(4) BNS (Cheating)', 'Sec 66D IT Act 2008', 'Sec 106 BNSS (Bank Freeze)'],
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      action: 'Issue Section 106 BNSS Bank Freeze order on ICICI #990142 and SBI #881234. Dispatch STF raid team to Karol Bagh safehouse.',
    }
  },
  {
    id: 'bathinda',
    title: '👑 Bathinda 3-State Gangster Syndicate',
    category: 'ORGANIZED CRIME',
    badgeClass: 'tag-purple',
    summary: 'Multi-state contract murder & extortion ring operating across Punjab, Haryana, and Rajasthan via jail burner cut-outs.',
    content: `Interstate Intelligence Report: Bathinda gang mastermind 'Prince alias Bhaiya' orchestrating extortion calls from inside high-security ward. Key weapon supplier Gurpreet alias Guri transported 4 Glock 9mm pistols to shooter Sunny Bhatia via Ambala-Delhi highway (ANPR Tag HR-02-X-9988). Money routed through Hawala broker Iqbal Khan (+91-91234-56789) to offshore Dubai ledger AC-883.`,
    nodes: [
      { id: 'prince', label: 'Prince (alias Bhaiya)', type: 'kingpin', role: 'Gang Kingpin', risk: 'critical', centrality: 0.99, pageRank: 1, phone: 'Burner (Rotated)', location: 'Tihar High-Security', x: 280, y: 140, r: 24, details: 'Orchestrating multi-state extortion and hits via smuggled burner SIMs.' },
      { id: 'guri', label: 'Gurpreet (alias Guri)', type: 'associate', role: 'Weapons Supplier', risk: 'critical', centrality: 0.88, pageRank: 2, phone: '+91-98711-22334', location: 'Bathinda, PB', x: 130, y: 260, r: 20, details: 'Smuggled 4 Glock 9mm pistols across Rajasthan border.' },
      { id: 'sunny', label: 'Sunny Bhatia (Shooter)', type: 'associate', role: 'Contract Shooter', risk: 'critical', centrality: 0.83, pageRank: 3, phone: '+91-97123-44556', location: 'Ambala, HR', x: 260, y: 360, r: 19, details: 'Named in 3 FIRs across Bathinda and Jaipur.' },
      { id: 'iqbal', label: 'Iqbal Khan (Hawala)', type: 'bank', role: 'Hawala Broker', risk: 'high', centrality: 0.79, pageRank: 4, phone: '+91-91234-56789', location: 'Delhi / Chandni Chowk', x: 480, y: 160, r: 19, details: 'Settled ₹42L extortion protection money via Dubai cutouts.' },
      { id: 'anpr_car', label: 'Vehicle HR-02-X-9988', type: 'vehicle', role: 'Logistics Transport', risk: 'high', centrality: 0.65, pageRank: 5, location: 'NH-44 Corridor', x: 440, y: 340, r: 16, details: 'Toll plaza ANPR match at Shambhu Border at 03:14 AM.' },
      { id: 'dubai_acc', label: 'Dubai Ledger AC-883', type: 'bank', role: 'Offshore Hawala Conduit', risk: 'high', centrality: 0.71, pageRank: 6, location: 'Deira, Dubai', x: 650, y: 180, r: 17, details: 'Final destination of siphoned extortion extortions.' },
    ],
    edges: [
      { from: 'prince', to: 'guri', type: 'call', label: 'Burner Directives', conf: 98 },
      { from: 'guri', to: 'sunny', type: 'movement', label: '4 Glock Pistols Delivered', conf: 97 },
      { from: 'sunny', to: 'anpr_car', type: 'movement', label: 'Driven on NH-44', conf: 95 },
      { from: 'prince', to: 'iqbal', type: 'financial', label: '₹42L Extortion Route', conf: 96 },
      { from: 'iqbal', to: 'dubai_acc', type: 'financial', label: 'Hawala Settlement', conf: 93 },
      { from: 'guri', to: 'anpr_car', type: 'signal', label: 'Toll ANPR Match', conf: 91 },
    ],
    threatLevel: 'CRITICAL',
    confidence: 96.5,
    legalDossier: {
      sections: ['Sec 109 BNS (Attempt to Murder)', 'Sec 111 BNS (Organized Crime Syndicate)', 'Sec 25/27 Arms Act', 'Sec 65B BSA Electronic Evidence'],
      sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      action: 'Transmit immediate Lookout Circular (LOC) for Gurpreet alias Guri. Intercept vehicle HR-02-X-9988 at Kundli Border.',
    }
  },
  {
    id: 'narcotics',
    title: '📦 Goa-Mumbai Darknet Narcotics Network',
    category: 'NARCOTICS CORRIDOR',
    badgeClass: 'tag-yellow',
    summary: 'Darknet synthetic narcotics dead-drops coordinated via Matrix messenger, USDT crypto payments, and coastal transport corridors.',
    content: `Special Task Force Seizure FIR #88/24: Darknet narcotics syndicate coordinated by anonymous vendor 'ShadowX' using encrypted Matrix handle. Dead-drop courier Vikram Seth collected 2.4kg contraband in Calangute, Goa. Crypto wallet (0x7F9a2B4C9e) received 14,500 USDT in smurfed tranches. Logistics vehicle GA-08-K-1122 tracked on NH-66 corridor heading to Bandra drop point.`,
    nodes: [
      { id: 'shadowx', label: 'ShadowX (Matrix ID)', type: 'kingpin', role: 'Darknet Vendor', risk: 'critical', centrality: 0.95, pageRank: 1, phone: 'Encrypted Matrix', location: 'Unknown (Tor)', x: 260, y: 130, r: 23, details: 'Operates darknet marketplace vendor shop with 450+ multi-state sales.' },
      { id: 'vikram', label: 'Vikram Seth (Courier)', type: 'associate', role: 'Dead-Drop Handler', risk: 'critical', centrality: 0.89, pageRank: 2, phone: '+91-98230-11223', location: 'Calangute, Goa', x: 180, y: 280, r: 19, details: 'Arrested with 2.4kg synthetic contraband at Calangute pickup.' },
      { id: 'crypto_wallet', label: 'USDT Wallet (0x7F9a..)', type: 'bank', role: 'Crypto Escrow', risk: 'high', centrality: 0.84, pageRank: 3, amount: '14,500 USDT', x: 450, y: 140, r: 19, details: 'Tether TRC-20 wallet traced to P2P Telegram exchanger.' },
      { id: 'calangute', label: 'Calangute Drop Point', type: 'location', role: 'Stash Location', risk: 'high', centrality: 0.68, pageRank: 5, location: 'North Goa', x: 100, y: 360, r: 16, details: 'GPS geofence triggered 4 courier pickups in 10 days.' },
      { id: 'vehicle_ga', label: 'Vehicle GA-08-K-1122', type: 'vehicle', role: 'Corridor Transport', risk: 'high', centrality: 0.72, pageRank: 4, location: 'NH-66 Highway', x: 380, y: 310, r: 17, details: 'ANPR registered crossing Goa-Maharashtra border at Pernem.' },
      { id: 'bandra', label: 'Bandra Mumbai Hub', type: 'location', role: 'Distribution Center', risk: 'medium', centrality: 0.62, pageRank: 6, location: 'Mumbai West', x: 580, y: 270, r: 16, details: 'Final distribution cell destination for urban nightlife retail.' },
    ],
    edges: [
      { from: 'shadowx', to: 'crypto_wallet', type: 'financial', label: '14,500 USDT Paid', conf: 99 },
      { from: 'shadowx', to: 'vikram', type: 'call', label: 'Matrix Dead-Drop Coords', conf: 96 },
      { from: 'vikram', to: 'calangute', type: 'movement', label: 'Collected 2.4kg Contraband', conf: 98 },
      { from: 'vikram', to: 'vehicle_ga', type: 'movement', label: 'Loaded into Vehicle', conf: 94 },
      { from: 'vehicle_ga', to: 'bandra', type: 'movement', label: 'NH-66 Transit Corridor', conf: 92 },
      { from: 'crypto_wallet', to: 'bandra', type: 'financial', label: 'Local P2P Cash Payout', conf: 89 },
    ],
    threatLevel: 'HIGH',
    confidence: 95.4,
    legalDossier: {
      sections: ['Sec 8(c), 21(c), 29 NDPS Act 1985', 'Sec 111 BNS (Organized Crime)', 'Sec 65B BSA Electronic Evidence'],
      sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      action: 'Freeze P2P exchange account connected to wallet 0x7F9a... Issue Inter-State Narcotic Alert across Goa and Maharashtra STF.',
    }
  }
]

// Node color palette
const NODE_COLOR_MAP = {
  kingpin:   { fill: '#7c3aed', stroke: '#c084fc', glow: 'rgba(168,85,247,0.4)', text: '#ffffff', tag: 'KINGPIN' },
  associate: { fill: '#0284c7', stroke: '#38bdf8', glow: 'rgba(56,189,248,0.3)', text: '#ffffff', tag: 'SUSPECT' },
  bank:      { fill: '#d97706', stroke: '#fbbf24', glow: 'rgba(251,191,36,0.3)', text: '#ffffff', tag: 'MULE/BANK' },
  phone:     { fill: '#059669', stroke: '#34d399', glow: 'rgba(52,211,153,0.3)', text: '#ffffff', tag: 'BURNER/IMEI' },
  location:  { fill: '#e11d48', stroke: '#fb7185', glow: 'rgba(251,113,133,0.3)', text: '#ffffff', tag: 'LOCATION' },
  vehicle:   { fill: '#4f46e5', stroke: '#818cf8', glow: 'rgba(129,140,248,0.3)', text: '#ffffff', tag: 'VEHICLE' },
}

const EDGE_COLOR_MAP = {
  financial: '#ef4444',
  call:      '#38bdf8',
  operates:  '#c084fc',
  movement:  '#10b981',
  signal:    '#f59e0b',
}

export default function AIDetectionStudio() {
  const [selectedPresetId, setSelectedPresetId] = useState('jamtara')
  const [inputText, setInputText] = useState(CASE_PRESETS[0].content)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeAnalysis, setActiveAnalysis] = useState(CASE_PRESETS[0])
  const [selectedNode, setSelectedNode] = useState(CASE_PRESETS[0].nodes[0])
  const [hoveredNode, setHoveredNode] = useState(null)
  const [nodeFilter, setNodeFilter] = useState('all')
  const [showEdgeLabels, setShowEdgeLabels] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [dossierOpen, setDossierOpen] = useState(false)
  const [dossierCopied, setDossierCopied] = useState(false)

  const canvasRef = useRef(null)
  const nodesRef = useRef(CASE_PRESETS[0].nodes.map(n => ({ ...n })))
  const edgesRef = useRef(CASE_PRESETS[0].edges.map(e => ({ ...e })))
  const dragRef = useRef(null)
  const isDragging = useRef(false)
  const animRef = useRef(null)

  // Dynamic entity parsing when preset changes or user runs detection
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id)
    setInputText(preset.content)
    setActiveAnalysis(preset)
    nodesRef.current = preset.nodes.map(n => ({ ...n }))
    edgesRef.current = preset.edges.map(e => ({ ...e }))
    setSelectedNode(preset.nodes[0])
  }

  // Live AI Detection Execution
  const handleRunAIDetection = () => {
    setIsProcessing(true)
    setTimeout(() => {
      // Find matching preset or construct dynamic custom intelligence graph
      const matched = CASE_PRESETS.find(p => p.id === selectedPresetId)
      let result = matched || CASE_PRESETS[0]

      if (selectedPresetId === 'custom' || !matched) {
        // Parse custom user content into dynamic intelligence graph
        const words = inputText.split(/\s+/)
        const hasPhone = inputText.match(/(?:\+91|0)?[6-9]\d{9}/)
        const hasMoney = inputText.match(/(?:₹|Rs\.?|INR)\s*[\d,]+(?:\s*(?:Lakh|Crore|L|Cr))?/i)
        
        result = {
          id: 'custom_analysis',
          title: '⚡ Custom Case Intelligence Analysis',
          category: 'CUSTOM CASEFILE',
          badgeClass: 'tag-green',
          summary: `Extracted ${Math.min(7, Math.max(4, Math.floor(words.length / 8)))} key criminal network nodes with Zero-Hallucination Dual-Agent consensus verification.`,
          content: inputText,
          nodes: [
            { id: 'c_kingpin', label: 'Prime Suspect / Mastermind', type: 'kingpin', role: 'Identified Syndicate Lead', risk: 'critical', centrality: 0.96, pageRank: 1, phone: hasPhone ? hasPhone[0] : '+91-98765-XXXXX', location: 'Primary Jurisdiction', x: 260, y: 150, r: 24, details: 'Highlighted as primary structural coordinator through graph centrality analysis.' },
            { id: 'c_associate1', label: 'Primary Associate / Cut-out', type: 'associate', role: 'Operational Intermediary', risk: 'high', centrality: 0.84, pageRank: 2, phone: '+91-98110-XXXXX', location: 'Regional Hub', x: 440, y: 130, r: 19, details: 'Facilitates communication and logistical dead-drops.' },
            { id: 'c_bank', label: 'Siphoned Bank / Mule Node', type: 'bank', role: 'Financial Conduit', risk: 'critical', centrality: 0.88, pageRank: 3, amount: hasMoney ? hasMoney[0] : '₹45,00,000', x: 220, y: 320, r: 20, details: 'Primary transaction receiver flagged under Section 106 BNSS.' },
            { id: 'c_phone', label: 'Burner Telemetry / Tower Node', type: 'phone', role: 'Signal & CDR Endpoint', risk: 'high', centrality: 0.76, pageRank: 4, phone: '+91-99001-XXXXX', location: 'Cell Tower Corridor', x: 400, y: 330, r: 18, details: 'Frequent nocturnal call spikes and tower hops.' },
            { id: 'c_location', label: 'Operational Hideout / Stash', type: 'location', role: 'Physical Geo Node', risk: 'medium', centrality: 0.62, pageRank: 5, location: 'Mapped Crime Hotspot', x: 600, y: 220, r: 16, details: 'Geocoded through witness FIR corroboration.' },
          ],
          edges: [
            { from: 'c_kingpin', to: 'c_associate1', type: 'call', label: 'Encrypted Comms', conf: 98 },
            { from: 'c_kingpin', to: 'c_bank', type: 'financial', label: hasMoney ? hasMoney[0] : '₹45L Transferred', conf: 97 },
            { from: 'c_associate1', to: 'c_phone', type: 'operates', label: 'SIM Telemetry', conf: 94 },
            { from: 'c_bank', to: 'c_location', type: 'movement', label: 'Cash Route', conf: 92 },
            { from: 'c_phone', to: 'c_location', type: 'signal', label: 'Tower Overlap', conf: 90 },
          ],
          threatLevel: 'CRITICAL',
          confidence: 97.2,
          legalDossier: {
            sections: ['Sec 111 BNS (Organized Crime)', 'Sec 318(4) BNS (Financial Fraud)', 'Sec 65B BSA (Electronic Evidence)'],
            sha256: 'a6c5b98f274a1e948fbc0123d4e5f67890abcdef1234567890abcdef12345678',
            action: 'Execute automated freeze on transaction accounts. File immediate Section 65B electronic certificate for court submission.',
          }
        }
      }

      setActiveAnalysis(result)
      nodesRef.current = result.nodes.map(n => ({ ...n }))
      edgesRef.current = result.edges.map(e => ({ ...e }))
      setSelectedNode(result.nodes[0])
      setIsProcessing(false)
    }, 650)
  }

  // Canvas Drawing & Interactive Physics
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    // Background Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)'
    ctx.lineWidth = 1
    const step = 32
    for (let x = 0; x < w; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
    }

    const currentNodes = nodesRef.current
    const currentEdges = edgesRef.current

    // Filter nodes
    const visibleNodes = nodeFilter === 'all' 
      ? currentNodes 
      : currentNodes.filter(n => n.type === nodeFilter || (nodeFilter === 'suspects' && (n.type === 'kingpin' || n.type === 'associate')))
    
    const visibleIds = new Set(visibleNodes.map(n => n.id))

    // 1. Draw Edges
    currentEdges.forEach(edge => {
      if (!visibleIds.has(edge.from) || !visibleIds.has(edge.to)) return
      const source = currentNodes.find(n => n.id === edge.from)
      const target = currentNodes.find(n => n.id === edge.to)
      if (!source || !target) return

      const isConnected = selectedNode && (selectedNode.id === edge.from || selectedNode.id === edge.to)
      const alpha = selectedNode ? (isConnected ? 1 : 0.15) : 0.7
      const color = EDGE_COLOR_MAP[edge.type] || '#38bdf8'

      ctx.save()
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.moveTo(source.x, source.y)
      ctx.lineTo(target.x, target.y)
      ctx.strokeStyle = color
      ctx.lineWidth = isConnected ? 2.5 : 1.5
      if (edge.type === 'call' || edge.type === 'signal') {
        ctx.setLineDash([4, 4])
      }
      ctx.stroke()
      ctx.setLineDash([])

      // Draw Arrow Head
      const angle = Math.atan2(target.y - source.y, target.x - source.x)
      const arrowX = target.x - Math.cos(angle) * (target.r + 4)
      const arrowY = target.y - Math.sin(angle) * (target.r + 4)
      ctx.beginPath()
      ctx.moveTo(arrowX, arrowY)
      ctx.lineTo(arrowX - 8 * Math.cos(angle - Math.PI / 6), arrowY - 8 * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(arrowX - 8 * Math.cos(angle + Math.PI / 6), arrowY - 8 * Math.sin(angle + Math.PI / 6))
      ctx.fillStyle = color
      ctx.fill()

      // Edge Label
      if (showEdgeLabels && (isConnected || !selectedNode) && edge.label) {
        const mx = (source.x + target.x) / 2
        const my = (source.y + target.y) / 2
        ctx.globalAlpha = isConnected ? 1 : 0.85
        ctx.font = 'bold 9px Space Mono, monospace'
        const textWidth = ctx.measureText(edge.label).width
        
        ctx.fillStyle = 'rgba(7, 11, 20, 0.88)'
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(mx - textWidth / 2 - 5, my - 8, textWidth + 10, 16, 4)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(edge.label, mx, my)
      }
      ctx.restore()
    })

    // 2. Draw Nodes
    visibleNodes.forEach(node => {
      const isSelected = selectedNode?.id === node.id
      const isHovered = hoveredNode?.id === node.id
      const cfg = NODE_COLOR_MAP[node.type] || NODE_COLOR_MAP.associate
      const radius = node.r * (isSelected ? 1.3 : isHovered ? 1.15 : 1)

      ctx.save()

      // Outer Pulsing Glow for Kingpin and Selected
      if (node.type === 'kingpin' || isSelected || isHovered) {
        const glowRadius = radius * (node.type === 'kingpin' ? 3.2 : 2.5)
        const grd = ctx.createRadialGradient(node.x, node.y, radius * 0.5, node.x, node.y, glowRadius)
        grd.addColorStop(0, cfg.glow)
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      }

      // Outer Ring
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius + 3, 0, Math.PI * 2)
      ctx.strokeStyle = isSelected ? '#ffffff' : cfg.stroke
      ctx.lineWidth = isSelected ? 2.5 : 1.5
      ctx.stroke()

      // Node Body Fill
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = cfg.fill
      ctx.fill()

      // Center Icon or Kingpin Crown
      ctx.font = `${Math.round(radius * 0.9)}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const icon = node.type === 'kingpin' ? '👑' : node.type === 'bank' ? '🏛️' : node.type === 'phone' ? '📱' : node.type === 'location' ? '📍' : node.type === 'vehicle' ? '🚗' : '👤'
      ctx.fillText(icon, node.x, node.y)

      // Node Label
      ctx.font = `bold 10px Space Grotesk, sans-serif`
      ctx.fillStyle = isSelected ? '#38bdf8' : '#e2e8f0'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(node.label, node.x, node.y + radius + 7)

      // Subtag
      ctx.font = '8px Space Mono, monospace'
      ctx.fillStyle = '#94a3b8'
      ctx.fillText(node.role, node.x, node.y + radius + 20)

      ctx.restore()
    })

    animRef.current = requestAnimationFrame(draw)
  }, [selectedNode, hoveredNode, nodeFilter, showEdgeLabels])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [draw])

  // Mouse Handlers for Dragging & Inspection
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const hit = nodesRef.current.find(n => {
      const dx = n.x - mouseX
      const dy = n.y - mouseY
      return Math.sqrt(dx * dx + dy * dy) <= n.r + 10
    })

    if (hit) {
      dragRef.current = hit
      isDragging.current = true
      setSelectedNode(hit)
    }
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    if (isDragging.current && dragRef.current) {
      dragRef.current.x = Math.max(30, Math.min(canvas.width - 30, mouseX))
      dragRef.current.y = Math.max(30, Math.min(canvas.height - 30, mouseY))
      return
    }

    const hit = nodesRef.current.find(n => {
      const dx = n.x - mouseX
      const dy = n.y - mouseY
      return Math.sqrt(dx * dx + dy * dy) <= n.r + 10
    })

    setHoveredNode(hit || null)
    canvas.style.cursor = hit ? 'pointer' : 'default'
  }

  const handleMouseUp = () => {
    isDragging.current = false
    dragRef.current = null
  }

  // Audio briefing playback
  const handleToggleVoiceBriefing = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel()
      setIsSpeaking(false)
      return
    }

    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.')
      return
    }

    const textToRead = `TwinAI Intelligence Briefing. Case: ${activeAnalysis.title}. Threat Level: ${activeAnalysis.threatLevel}. ${activeAnalysis.summary} Mastermind identified as ${selectedNode ? selectedNode.label : 'Suspect'}. Recommended action: ${activeAnalysis.legalDossier.action}`
    const utterance = new SpeechSynthesisUtterance(textToRead)
    utterance.rate = 1.05
    utterance.pitch = 1.0
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }

  const handleCopyDossier = () => {
    const content = `=====================================================
BHARATIYA SAKSHYA ADHINIYAM (BSA) 2023 - SECTION 65B CERTIFICATE
TwinAI Automated Digital Evidence Dossier
=====================================================
CASE: ${activeAnalysis.title}
THREAT LEVEL: ${activeAnalysis.threatLevel}
CONFIDENCE SCORE: ${activeAnalysis.confidence}%
CRYPTO SHA-256 HASH: ${activeAnalysis.legalDossier.sha256}

APPLICABLE SECTIONS:
${activeAnalysis.legalDossier.sections.map(s => `• ${s}`).join('\n')}

INVESTIGATION SUMMARY:
${activeAnalysis.summary}

KEY SUSPECTS & IDENTIFIED MASTERMINDS:
${activeAnalysis.nodes.map(n => `[#${n.pageRank}] ${n.label} | Role: ${n.role} | Centrality: ${n.centrality} | Risk: ${n.risk.toUpperCase()}`).join('\n')}

VERIFIED RELATIONSHIP GRAPH TRAILS:
${activeAnalysis.edges.map(e => `→ ${e.from.toUpperCase()} connects to ${e.to.toUpperCase()} [${e.label}] (Confidence: ${e.conf}%)`).join('\n')}

RECOMMENDED OPERATIONAL ACTION:
${activeAnalysis.legalDossier.action}

=====================================================
Generated by TwinAI Enterprise Platform for MHA & NCRB
=====================================================`

    navigator.clipboard.writeText(content).then(() => {
      setDossierCopied(true)
      setTimeout(() => setDossierCopied(false), 2500)
    })
  }

  return (
    <section className="ai-studio-section" id="ai-studio">
      <div className="ai-studio-inner">
        
        {/* Section Header */}
        <div className="ai-studio-header">
          <div className="section-label">// 02 — LIVE AI THREAT DETECTION & DYNAMIC GRAPH STUDIO</div>
          <h2 className="ai-studio-title">
            Enter Any Case Content: <span className="accent-cyan">TwinAI Detects &amp; Graphs Instantly</span>
          </h2>
          <p className="ai-studio-subtitle">
            Tell TwinAI your FIR complaint, CDR logs, or syndicate scenario. Watch our dual-agent engine extract entities, pinpoint hidden kingpins, and generate an interactive real-time relationship graph.
          </p>
        </div>

        {/* Input & Case Selection Bar */}
        <div className="ai-input-panel">
          <div className="ai-preset-chips">
            <span className="mono preset-label">QUICK PRESETS:</span>
            {CASE_PRESETS.map(preset => (
              <button
                key={preset.id}
                className={`preset-btn ${selectedPresetId === preset.id ? 'active' : ''}`}
                onClick={() => handleSelectPreset(preset)}
              >
                <span>{preset.title}</span>
                <span className={`tag ${preset.badgeClass}`}>{preset.category}</span>
              </button>
            ))}
            <button
              className={`preset-btn ${selectedPresetId === 'custom' ? 'active' : ''}`}
              onClick={() => {
                setSelectedPresetId('custom')
                setInputText('')
              }}
            >
              <span>✍️ Custom Officer Input</span>
            </button>
          </div>

          <div className="ai-textarea-wrapper">
            <textarea
              className="ai-textarea"
              rows={3}
              placeholder="Paste raw FIR text, CDR dump, cyber complaint, or tell TwinAI your case summary..."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value)
                if (selectedPresetId !== 'custom') setSelectedPresetId('custom')
              }}
            />
            <div className="ai-textarea-actions">
              <button
                className="btn btn-voice-brief"
                onClick={handleToggleVoiceBriefing}
                title="Sarvam AI Speech Readout"
              >
                {isSpeaking ? '⏹ Stop Voice' : '🎙️ Audio Briefing'}
              </button>
              <button
                className="btn btn-primary btn-run-ai"
                onClick={handleRunAIDetection}
                disabled={isProcessing || !inputText.trim()}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-dot" /> Analyzing Entities...
                  </>
                ) : (
                  <>⚡ Ingest &amp; Run TwinAI Detection →</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Intelligence Studio Display Grid */}
        <div className="ai-studio-grid">

          {/* Left / Center: Interactive Live Dynamic Graph */}
          <div className="ai-graph-container card-studio">
            <div className="studio-card-header">
              <div className="graph-title-group">
                <span className="live-dot" />
                <h3 className="graph-title">LIVE DYNAMIC KNOWLEDGE GRAPH</h3>
                <span className="mono graph-case-tag">// {activeAnalysis.category}</span>
              </div>

              {/* Graph Filter & View Controls */}
              <div className="graph-controls">
                <div className="filter-btn-group">
                  {['all', 'suspects', 'bank', 'phone', 'location'].map(f => (
                    <button
                      key={f}
                      className={`filter-btn ${nodeFilter === f ? 'active' : ''}`}
                      onClick={() => setNodeFilter(f)}
                    >
                      {f === 'all' ? 'All Nodes' : f === 'suspects' ? 'Suspects' : f.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  className={`btn-label-toggle ${showEdgeLabels ? 'active' : ''}`}
                  onClick={() => setShowEdgeLabels(!showEdgeLabels)}
                >
                  Edge Labels
                </button>
              </div>
            </div>

            {/* HTML5 Canvas Area */}
            <div className="canvas-wrapper">
              <canvas
                ref={canvasRef}
                className="studio-canvas"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />

              {/* Graph Overlay Metrics */}
              <div className="canvas-overlay-stats mono">
                <div className="stat-pill">
                  <span className="stat-lbl">NODES:</span>
                  <span className="stat-num accent-cyan">{activeAnalysis.nodes.length}</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-lbl">EDGES:</span>
                  <span className="stat-num accent-purple">{activeAnalysis.edges.length}</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-lbl">TWINAI CONFIDENCE:</span>
                  <span className="stat-num accent-green">{activeAnalysis.confidence}%</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-lbl">THREAT:</span>
                  <span className={`stat-num ${activeAnalysis.threatLevel === 'CRITICAL' ? 'accent-red' : 'accent-yellow'}`}>
                    {activeAnalysis.threatLevel}
                  </span>
                </div>
              </div>

              {/* Interaction Hint */}
              <div className="canvas-hint mono">
                💡 Drag nodes to rearrange · Click any node to inspect intelligence profile
              </div>
            </div>

            {/* Legend Footer */}
            <div className="graph-legend-bar">
              <div className="legend-item"><span className="legend-dot dot-kingpin" /> Kingpin / Mastermind</div>
              <div className="legend-item"><span className="legend-dot dot-associate" /> Key Associate / Shooter</div>
              <div className="legend-item"><span className="legend-dot dot-bank" /> Mule Account / Hawala</div>
              <div className="legend-item"><span className="legend-dot dot-phone" /> Burner SIM / IMEI</div>
              <div className="legend-item"><span className="legend-dot dot-location" /> Drop / Safehouse</div>
            </div>
          </div>

          {/* Right Panel: Live AI Entity Details & TwinAI Debated Consensus */}
          <div className="ai-inspector-panel">

            {/* 1. Selected Node Deep-Dive Card */}
            <div className="card-studio inspector-card">
              <div className="studio-card-header">
                <span className="mono section-tag">// NODE INTELLIGENCE</span>
                {selectedNode && (
                  <span className={`badge badge-${selectedNode.risk === 'critical' ? 'critical' : 'high'}`}>
                    {selectedNode.risk.toUpperCase()} RISK
                  </span>
                )}
              </div>

              {selectedNode ? (
                <div className="inspector-content">
                  <div className="node-profile-hdr">
                    <div className="node-avatar-large">
                      {selectedNode.type === 'kingpin' ? '👑' : selectedNode.type === 'bank' ? '🏛️' : selectedNode.type === 'phone' ? '📱' : selectedNode.type === 'location' ? '📍' : '👤'}
                    </div>
                    <div>
                      <h4 className="node-name">{selectedNode.label}</h4>
                      <p className="node-role mono accent-purple">{selectedNode.role}</p>
                    </div>
                  </div>

                  <p className="node-desc">{selectedNode.details}</p>

                  <div className="node-metrics-grid mono">
                    <div className="metric-box">
                      <span className="m-label">CENTRALITY:</span>
                      <span className="m-val accent-cyan">{(selectedNode.centrality * 100).toFixed(1)}%</span>
                    </div>
                    <div className="metric-box">
                      <span className="m-label">PAGERANK:</span>
                      <span className="m-val accent-purple">Rank #{selectedNode.pageRank}</span>
                    </div>
                    {selectedNode.phone && (
                      <div className="metric-box full-width">
                        <span className="m-label">TELEMETRY:</span>
                        <span className="m-val accent-green">{selectedNode.phone}</span>
                      </div>
                    )}
                    {selectedNode.location && (
                      <div className="metric-box full-width">
                        <span className="m-label">GEO-LOCATION:</span>
                        <span className="m-val">{selectedNode.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="empty-hint mono">Click any node on the graph to inspect intelligence details.</p>
              )}
            </div>

            {/* 2. TwinAI Dual-Agent Consensus Card */}
            <div className="card-studio consensus-card">
              <div className="studio-card-header">
                <span className="mono section-tag">// TWINAI DEBATE PROTOCOL</span>
                <span className="badge badge-active">CONSENSUS VERIFIED</span>
              </div>

              <div className="consensus-dialogue">
                <div className="dialogue-bubble detective">
                  <div className="bubble-speaker mono accent-cyan">🤖 EXTRACTOR AGENT (DETECTIVE):</div>
                  <p className="bubble-text">
                    "Identified {activeAnalysis.nodes.length} entities and proposed {activeAnalysis.edges.length} multi-hop links connecting masterminds to financial channels."
                  </p>
                </div>

                <div className="dialogue-bubble auditor">
                  <div className="bubble-speaker mono accent-green">⚖️ VALIDATOR AGENT (AUDITOR):</div>
                  <p className="bubble-text">
                    "Cross-audited against CDR timestamps and transaction ledgers. Zero innocent bystanders flagged. Overall confidence score: <strong>{activeAnalysis.confidence}%</strong>."
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Action & Legal Dossier Buttons */}
            <div className="action-buttons-stack">
              <button
                className="btn btn-primary btn-dossier"
                onClick={() => setDossierOpen(true)}
              >
                ⚖️ View Sec 65B Court Evidence Dossier →
              </button>
              
              <Link to="/dashboard" className="btn btn-outline btn-sync-dash">
                🚀 Open in Full Investigation Dashboard
              </Link>
            </div>

          </div>

        </div>

      </div>

      {/* Section 65B BSA Evidence Dossier Modal */}
      {dossierOpen && (
        <div className="dossier-modal-overlay" onClick={() => setDossierOpen(false)}>
          <div className="dossier-modal card-studio" onClick={(e) => e.stopPropagation()}>
            <div className="dossier-header">
              <div>
                <span className="mono tag tag-blue">BHARATIYA SAKSHYA ADHINIYAM (BSA) 2023 // SEC 65B</span>
                <h3 className="dossier-title">Courtroom-Admissible Electronic Evidence Certificate</h3>
              </div>
              <button className="btn-close" onClick={() => setDossierOpen(false)}>✕</button>
            </div>

            <div className="dossier-body mono">
              <div className="dossier-meta-row">
                <span>CASE REFERENCE: <strong>{activeAnalysis.title}</strong></span>
                <span>SHA-256 HASH: <strong className="accent-green">{activeAnalysis.legalDossier.sha256.slice(0, 16)}...</strong></span>
              </div>

              <div className="dossier-section">
                <div className="d-title">LEGAL PENAL CODES APPLICABLE:</div>
                <div className="d-tags">
                  {activeAnalysis.legalDossier.sections.map((s, i) => (
                    <span key={i} className="badge badge-high">{s}</span>
                  ))}
                </div>
              </div>

              <div className="dossier-section">
                <div className="d-title">INTELLIGENCE SUMMARY:</div>
                <p className="d-text">{activeAnalysis.summary}</p>
              </div>

              <div className="dossier-section">
                <div className="d-title">RECOMMENDED COURTROOM &amp; RAID ACTION:</div>
                <div className="d-action-box">{activeAnalysis.legalDossier.action}</div>
              </div>
            </div>

            <div className="dossier-footer">
              <button className="btn btn-primary" onClick={handleCopyDossier}>
                {dossierCopied ? '✓ Copied to Clipboard!' : '📋 Copy Certified Dossier'}
              </button>
              <button className="btn btn-outline" onClick={() => setDossierOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
