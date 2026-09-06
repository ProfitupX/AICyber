import React, { useState, useRef } from 'react'
import './SolutionFlowchart.css'

export default function SolutionFlowchart() {
  const [activeSlide, setActiveSlide] = useState('workflow') // 'workflow', 'architecture', 'consensus'
  const [activeStepTab, setActiveStepTab] = useState(0)
  const [themeMode, setThemeMode] = useState('light') // 'light' (PPT slide white) or 'dark' (Cyber dark)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const svgRef = useRef(null)

  const isDark = themeMode === 'dark'

  // Dynamic Theme Colors
  const c = {
    bg: isDark ? '#070b14' : '#ffffff',
    bgCard: isDark ? '#0e1626' : '#f8fafd',
    border: isDark ? '#1e293b' : '#d0dbe7',
    borderHighlight: isDark ? '#38bdf8' : '#0284c7',
    textMain: isDark ? '#f8fafc' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#475569',
    headerBg: isDark ? '#0a192f' : '#002b49',
    teal: isDark ? '#06b6d4' : '#00838f',
    tealDark: '#005b64',
    navy: isDark ? '#1e3a8a' : '#003366',
    green: '#10b981',
    greenBg: isDark ? '#064e3b' : '#ecfdf5',
    red: '#ef4444',
    redBg: isDark ? '#7f1d1d' : '#fef2f2',
    amber: '#f59e0b',
    purple: '#8b5cf6',
    arrowStroke: isDark ? '#38bdf8' : '#0284c7',
    arrowNo: '#ef4444',
    arrowYes: '#10b981',
    gridLine: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
  }

  // Step-by-step execution data matching technical framework
  const executionSteps = [
    {
      num: '01',
      title: 'Multi-Source Ingestion & Normalization',
      subtitle: 'Node.js Serverless Microservices',
      icon: '📥',
      badge: 'LAYER 1: DATA INGESTION',
      tech: 'Node.js · Netlify Serverless · Pdf-Parse · Fast-CSV',
      desc: 'Ingests structured and unstructured law enforcement data including FIR PDFs, Call Detail Record (CDR) CSVs, Bank Statement Excel files, and Telegram/WhatsApp OSINT dumps.',
      bullets: [
        'Automated file validation, deduplication, and encrypted buffer streaming',
        'Text cleansing, regex timestamp alignment, and OCR tokenization',
        'Multi-state case data normalized into uniform JSON payload'
      ]
    },
    {
      num: '02',
      title: 'Automated Entity Extraction (NER)',
      subtitle: 'Gemini 1.5 Flash (JSON Mode)',
      icon: '🧠',
      badge: 'LAYER 2: ENTITY EXTRACTION',
      tech: 'Gemini 1.5 Flash API (Temp 0.0) · SpaCy NLP Model',
      desc: 'Gemini 1.5 Flash configured with zero temperature (0.0) and strict JSON Schema output extracts domain-specific entities from unstructured Indian police/FIR jargon.',
      bullets: [
        'Entities: People, Aliases, Locations, Vehicles, Phone Numbers (IMEI/IMSI), Bank Mules',
        'Confidence scoring (0-100%) mapped to each candidate node',
        'Extracts explicit transaction chains and temporal cell tower overlaps'
      ]
    },
    {
      num: '03',
      title: 'TwinAI Consensus Protocol (Zero Hallucination)',
      subtitle: 'Dual-Agent Adversarial Debate',
      icon: '⚖️',
      badge: 'LAYER 3: CONSENSUS ENGINE',
      tech: 'TwinAI Framework · LangChain · Rule-based Auditor',
      desc: 'Extractor Agent (Detective) analyzes candidate relationships while Validation Agent (Ethics/Auditor) challenges unverified links and protects innocent third parties.',
      bullets: [
        'Agent 1 drafts candidate relationship nodes and weighted link hypotheses',
        'Agent 2 audits claims against strict bank ledgers and multi-source proof',
        'Only mutual consensus commits edges; discrepancies trigger Human Review flag'
      ]
    },
    {
      num: '04',
      title: 'Knowledge Graph & Centrality Analytics',
      subtitle: 'Neo4j & Supabase Graph Engine',
      icon: '🕸️',
      badge: 'LAYER 4: GRAPH DATABASE',
      tech: 'Neo4j Graph DB · Supabase PostgreSQL · Cypher Query Engine',
      desc: 'Persists verified criminal networks into Neo4j graph schemas. Automatically executes graph algorithms to uncover hidden syndicate hierarchies.',
      bullets: [
        'PageRank: Computes overall authority and structural network importance',
        'Betweenness Centrality: Pinpoints kingpins, brokers, and money laundering conduits',
        'Community Detection: Clusters distinct multi-state syndicates and sub-cells'
      ]
    },
    {
      num: '05',
      title: 'Voice-Driven Regional Interface & Dashboard',
      subtitle: 'Sarvam AI Speech Engine & React UI',
      icon: '🎙️',
      badge: 'LAYER 5: VOICE & DASHBOARD',
      tech: 'Sarvam AI (saaras:v2 / bulbul:v1) · Cytoscape.js · React.js',
      desc: 'Empowers field officers with regional voice queries (Tamil, Hindi, Telugu, Tanglish) and an interactive digital "Red Thread" investigation board.',
      bullets: [
        'Speech-to-Text via Sarvam AI saaras:v2 with Web Speech API zero-cost fallback',
        'Field officer audio briefings generated with Sarvam AI bulbul:v1 TTS',
        'Real-time Cytoscape.js topology map with 1-click legal evidence dossier export'
      ]
    }
  ]

  // Export as SVG file
  const handleDownloadSVG = () => {
    if (!svgRef.current) return
    const svgEl = svgRef.current
    const svgData = new XMLSerializer().serializeToString(svgEl)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `TwinAI_${activeSlide.toUpperCase()}_Diagram_${themeMode}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Export as High-Res 4K PNG for PowerPoint slides
  const handleDownloadPNG = () => {
    if (!svgRef.current) return
    setDownloading(true)
    const svgEl = svgRef.current
    const svgData = new XMLSerializer().serializeToString(svgEl)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const URLObj = window.URL || window.webkitURL || window
    const blobURL = URLObj.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      // 4K Ultra High-Resolution (3600 x 2100)
      const scale = 2.5
      const canvas = document.createElement('canvas')
      canvas.width = 1440 * scale
      canvas.height = 840 * scale
      const ctx = canvas.getContext('2d')
      
      ctx.fillStyle = c.bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URLObj.revokeObjectURL(blobURL)

      const pngUrl = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.href = pngUrl
      link.download = `TwinAI_${activeSlide.toUpperCase()}_4K_${themeMode}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setDownloading(false)
    }
    img.src = blobURL
  }

  // Copy PNG directly to clipboard for instant paste in PowerPoint
  const handleCopyToClipboard = async () => {
    if (!svgRef.current) return
    try {
      setDownloading(true)
      const svgEl = svgRef.current
      const svgData = new XMLSerializer().serializeToString(svgEl)
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
      const URLObj = window.URL || window.webkitURL || window
      const blobURL = URLObj.createObjectURL(svgBlob)

      const img = new Image()
      img.onload = async () => {
        const scale = 2.0
        const canvas = document.createElement('canvas')
        canvas.width = 1440 * scale
        canvas.height = 840 * scale
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = c.bg
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        URLObj.revokeObjectURL(blobURL)

        canvas.toBlob(async (blob) => {
          if (blob && navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
          } else {
            handleDownloadPNG()
          }
          setDownloading(false)
        }, 'image/png', 1.0)
      }
      img.src = blobURL
    } catch (err) {
      console.error('Clipboard copy failed:', err)
      handleDownloadPNG()
      setDownloading(false)
    }
  }

  return (
    <section className="flowchart-section" id="flowchart">
      <div className="flowchart-container">
        
        {/* Header Toolbar */}
        <div className="flowchart-toolbar">
          <div className="toolbar-left">
            <div className="badge-sih mono">SIH26189 // TECHNICAL ARCHITECTURE & WORKFLOW</div>
            <h2 className="toolbar-title">Technical Approach & Architecture Framework</h2>
            <p className="toolbar-subtitle">
              Interactive high-precision vector architecture diagrams. Select presentation slide views and export in 4K for PowerPoint / Google Slides.
            </p>
          </div>

          <div className="toolbar-actions">
            {/* Slide Selector */}
            <div className="slide-selector-group">
              <button 
                className={`slide-tab-btn ${activeSlide === 'workflow' ? 'active' : ''}`}
                onClick={() => setActiveSlide('workflow')}
              >
                📊 1. End-to-End Workflow
              </button>
              <button 
                className={`slide-tab-btn ${activeSlide === 'architecture' ? 'active' : ''}`}
                onClick={() => setActiveSlide('architecture')}
              >
                🏛️ 2. Core 5-Layer Stack
              </button>
              <button 
                className={`slide-tab-btn ${activeSlide === 'consensus' ? 'active' : ''}`}
                onClick={() => setActiveSlide('consensus')}
              >
                ⚖️ 3. TwinAI Protocol
              </button>
            </div>

            {/* Theme switcher */}
            <div className="theme-toggle-group">
              <button 
                className={`theme-btn ${themeMode === 'light' ? 'active' : ''}`}
                onClick={() => setThemeMode('light')}
                title="White theme (Ideal for PowerPoint Slides)"
              >
                ☀️ Slide White
              </button>
              <button 
                className={`theme-btn ${themeMode === 'dark' ? 'active' : ''}`}
                onClick={() => setThemeMode('dark')}
                title="Dark theme (Ideal for Keynote & Screens)"
              >
                🌙 Cyber Dark
              </button>
            </div>

            {/* Export buttons */}
            <button 
              className="btn btn-export-secondary" 
              onClick={handleDownloadSVG}
              title="Download vector SVG (Infinite resolution, editable in PPT)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              SVG
            </button>

            <button 
              className="btn btn-export-secondary" 
              onClick={handleCopyToClipboard}
              disabled={downloading}
              title="Copy 4K Image directly to Clipboard for instant Paste (Ctrl+V) in PowerPoint"
            >
              {copied ? '✓ Copied!' : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Copy for PPT
                </>
              )}
            </button>

            <button 
              className="btn btn-export-primary" 
              onClick={handleDownloadPNG}
              disabled={downloading}
              title="Download 4K Ultra-HD PNG image"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {downloading ? 'Rendering...' : 'Download 4K PNG'}
            </button>
          </div>
        </div>

        {/* ============================================================
            VECTOR SVG PRESENTATION CANVAS
            ============================================================ */}
        <div className={`flowchart-canvas-wrapper ${isDark ? 'dark-canvas' : 'light-canvas'}`}>
          <svg
            ref={svgRef}
            viewBox="0 0 1440 840"
            width="100%"
            height="auto"
            className="flowchart-svg"
            xmlns="http://www.w3.org/2000/svg"
            style={{ background: c.bg, fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            <defs>
              <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 1, 8 4, 0 7" fill={c.arrowStroke} />
              </marker>
              <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 1, 8 4, 0 7" fill={c.arrowYes} />
              </marker>
              <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 1, 8 4, 0 7" fill={c.arrowNo} />
              </marker>
              
              <filter id="card-shadow" x="-5%" y="-5%" width="115%" height="115%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity={isDark ? "0.4" : "0.07"} floodColor="#000000" />
              </filter>

              <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#002147" />
                <stop offset="50%" stopColor="#003366" />
                <stop offset="100%" stopColor="#001833" />
              </linearGradient>
              <linearGradient id="agentDetective" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id="agentValidator" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
              <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#004d7a" />
                <stop offset="100%" stopColor="#002845" />
              </linearGradient>

              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={c.gridLine} strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="1440" height="840" fill="url(#grid)" />

            {/* ============================================================
                SLIDE VIEW 1: END-TO-END OPERATIONAL WORKFLOW
                ============================================================ */}
            {activeSlide === 'workflow' && (
              <g id="slide-workflow">
                {/* TOP BANNER */}
                <rect x="24" y="16" width="1392" height="52" rx="8" fill="url(#headerGrad)" />
                <text x="720" y="48" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="800" letterSpacing="0.8">
                  PROPOSED SOLUTION: AI-POWERED CRIMINAL NETWORK ANALYSIS PLATFORM WITH TWINAI CONSENSUS
                </text>

                {/* CONNECTION FLOW PIPES */}
                <path d="M 84 205 L 122 205" fill="none" stroke={c.arrowStroke} strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                <path d="M 302 205 L 342 205" fill="none" stroke={c.arrowStroke} strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                <path d="M 526 205 L 566 205" fill="none" stroke={c.arrowStroke} strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                <path d="M 966 205 L 1000 205" fill="none" stroke={c.arrowStroke} strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                <path d="M 1060 162 L 1060 138 L 1152 138" fill="none" stroke={c.arrowNo} strokeWidth="3" markerEnd="url(#arrow-red)" strokeDasharray="5,4" />
                <path d="M 1240 168 L 1240 232" fill="none" stroke={c.arrowStroke} strokeWidth="2.5" markerEnd="url(#arrow-cyan)" strokeDasharray="4,4" />
                <path d="M 1060 248 L 1060 274 L 1142 274" fill="none" stroke={c.arrowYes} strokeWidth="3" markerEnd="url(#arrow-green)" />
                <path d="M 1240 326 L 1240 376 L 180 376 L 180 478" fill="none" stroke={c.arrowStroke} strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                <path d="M 235 522 L 318 522" fill="none" stroke={c.arrowYes} strokeWidth="3" markerEnd="url(#arrow-green)" />
                <path d="M 180 610 L 180 648 L 318 648" fill="none" stroke={c.arrowNo} strokeWidth="3" markerEnd="url(#arrow-red)" strokeDasharray="5,4" />
                <path d="M 542 522 L 610 522 L 610 565 L 632 565" fill="none" stroke={c.arrowStroke} strokeWidth="2.5" />
                <path d="M 542 648 L 610 648 L 610 565 L 632 565" fill="none" stroke={c.arrowStroke} strokeWidth="2.5" markerEnd="url(#arrow-cyan)" />
                <path d="M 768 565 L 804 565" fill="none" stroke={c.arrowStroke} strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                <path d="M 1030 565 L 1070 565" fill="none" stroke={c.arrowStroke} strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                <path d="M 1262 565 L 1298 565" fill="none" stroke={c.arrowStroke} strokeWidth="3" markerEnd="url(#arrow-cyan)" />

                {/* 1. START */}
                <g transform="translate(36, 175)">
                  <text x="24" y="-12" textAnchor="middle" fill={c.textMuted} fontSize="11" fontWeight="700" letterSpacing="1.2">START</text>
                  <circle cx="24" cy="30" r="26" fill={c.teal} filter="url(#card-shadow)" />
                  <circle cx="24" cy="30" r="22" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" />
                  <polygon points="19 19, 34 30, 19 41" fill="#ffffff" />
                </g>

                {/* 2. DATA INGESTION */}
                <g transform="translate(122, 90)" filter="url(#card-shadow)">
                  <rect width="180" height="232" rx="10" fill={c.bgCard} stroke={c.border} strokeWidth="1.5" />
                  <path d="M 0 10 Q 0 0 10 0 L 170 0 Q 180 0 180 10 L 180 42 L 0 42 Z" fill="#003366" />
                  <text x="90" y="20" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">MULTI-SOURCE</text>
                  <text x="90" y="34" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="700">DATA INGESTION</text>

                  <g transform="translate(14, 54)">
                    <rect width="70" height="72" rx="6" fill={isDark ? '#132036' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="35" y="32" textAnchor="middle" fontSize="22">📄</text>
                    <text x="35" y="52" textAnchor="middle" fill={c.textMain} fontSize="11" fontWeight="700">FIRs</text>
                    <text x="35" y="64" textAnchor="middle" fill={c.textMuted} fontSize="8">Police Reports</text>
                  </g>
                  <g transform="translate(96, 54)">
                    <rect width="70" height="72" rx="6" fill={isDark ? '#132036' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="35" y="32" textAnchor="middle" fontSize="22">📞</text>
                    <text x="35" y="52" textAnchor="middle" fill={c.textMain} fontSize="11" fontWeight="700">CDRs</text>
                    <text x="35" y="64" textAnchor="middle" fill={c.textMuted} fontSize="8">Call Records</text>
                  </g>
                  <g transform="translate(14, 138)">
                    <rect width="70" height="76" rx="6" fill={isDark ? '#132036' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="35" y="32" textAnchor="middle" fontSize="22">🏛️</text>
                    <text x="35" y="52" textAnchor="middle" fill={c.textMain} fontSize="10" fontWeight="700">BANK</text>
                    <text x="35" y="66" textAnchor="middle" fill={c.textMuted} fontSize="8">Transactions</text>
                  </g>
                  <g transform="translate(96, 138)">
                    <rect width="70" height="76" rx="6" fill={isDark ? '#132036' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="35" y="32" textAnchor="middle" fontSize="22">💬</text>
                    <text x="35" y="52" textAnchor="middle" fill={c.textMain} fontSize="10" fontWeight="700">SOCIAL</text>
                    <text x="35" y="66" textAnchor="middle" fill={c.textMuted} fontSize="8">OSINT Comms</text>
                  </g>
                </g>

                {/* 3. NER (Gemini 1.5 Flash) */}
                <g transform="translate(342, 102)" filter="url(#card-shadow)">
                  <rect width="184" height="206" rx="10" fill={c.bgCard} stroke={c.border} strokeWidth="1.5" />
                  <path d="M 0 10 Q 0 0 10 0 L 174 0 Q 184 0 184 10 L 184 46 L 0 46 Z" fill="#02457a" />
                  <text x="92" y="20" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">AUTOMATED NER</text>
                  <text x="92" y="36" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="700">GEMINI 1.5 FLASH (JSON)</text>

                  <g transform="translate(16, 62)">
                    <circle cx="6" cy="10" r="4" fill="#0284c7" />
                    <text x="18" y="14" fill={c.textMain} fontSize="11" fontWeight="700">• PEOPLE & ALIASES</text>
                    <circle cx="6" cy="38" r="4" fill="#0284c7" />
                    <text x="18" y="42" fill={c.textMain} fontSize="11" fontWeight="700">• LOCATIONS & TOWERS</text>
                    <circle cx="6" cy="66" r="4" fill="#0284c7" />
                    <text x="18" y="70" fill={c.textMain} fontSize="11" fontWeight="700">• VEHICLES / ANPR</text>
                    <circle cx="6" cy="94" r="4" fill="#0284c7" />
                    <text x="18" y="98" fill={c.textMain} fontSize="11" fontWeight="700">• PHONE NUMBERS (IMEI)</text>
                    <circle cx="6" cy="122" r="4" fill="#0284c7" />
                    <text x="18" y="126" fill={c.textMain} fontSize="11" fontWeight="700">• BANK ACCOUNTS / MULES</text>
                  </g>
                </g>

                {/* 4. TWINAI TALK */}
                <g transform="translate(566, 80)" filter="url(#card-shadow)">
                  <rect width="400" height="252" rx="12" fill={c.bgCard} stroke={c.borderHighlight} strokeWidth="2" />
                  <rect x="90" y="-12" width="220" height="26" rx="13" fill="#004d7a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="200" y="5" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800" letterSpacing="0.8">
                    TWINAI DUAL-AGENT CONSENSUS
                  </text>

                  {/* Detective */}
                  <g transform="translate(20, 36)">
                    <circle cx="34" cy="40" r="26" fill="url(#agentDetective)" />
                    <text x="34" y="46" textAnchor="middle" fontSize="24">🤖</text>
                    <text x="34" y="80" textAnchor="middle" fill={c.textMain} fontSize="10" fontWeight="800">EXTRACTOR</text>
                    <text x="34" y="93" textAnchor="middle" fill="#0284c7" fontSize="9" fontWeight="700">AGENT (DETECTIVE)</text>

                    <rect x="74" y="14" width="280" height="48" rx="8" fill={isDark ? '#1e293b' : '#e0f2fe'} stroke={isDark ? '#38bdf8' : '#7dd3fc'} strokeWidth="1.2" />
                    <text x="86" y="32" fill={c.textMain} fontSize="10" fontWeight="600">
                      "Drafted Link: Suspect Rajan K. linked to 3 FIRs
                    </text>
                    <text x="86" y="47" fill={c.textMain} fontSize="10" fontWeight="600">
                      and 47 calls to Burner PH001 in Mumbai."
                    </text>
                  </g>

                  {/* Advocate */}
                  <g transform="translate(20, 136)">
                    <rect x="74" y="10" width="280" height="52" rx="8" fill={isDark ? '#132e2c' : '#e6fffa'} stroke={isDark ? '#2dd4bf' : '#99f6e4'} strokeWidth="1.2" />
                    <text x="86" y="28" fill={c.textMain} fontSize="10" fontWeight="600">
                      "Cross-Auditing: Verify tower overlaps &amp; check
                    </text>
                    <text x="86" y="43" fill={c.textMain} fontSize="10" fontWeight="600">
                      if ₹1.2Cr transfer has authentic invoice TXN001."
                    </text>

                    <g transform="translate(320, 0)">
                      <circle cx="34" cy="36" r="26" fill="url(#agentValidator)" />
                      <text x="34" y="42" textAnchor="middle" fontSize="24">⚖️</text>
                      <text x="34" y="74" textAnchor="middle" fill={c.textMain} fontSize="10" fontWeight="800">VALIDATION</text>
                      <text x="34" y="87" textAnchor="middle" fill="#0d9488" fontSize="9" fontWeight="700">AGENT (ETHICS/AUDIT)</text>
                    </g>
                  </g>

                  <rect x="50" y="218" width="300" height="24" rx="12" fill={isDark ? '#083344' : '#ecfeff'} stroke="#06b6d4" strokeWidth="1" />
                  <text x="200" y="234" textAnchor="middle" fill={isDark ? '#67e8f9' : '#0e7490'} fontSize="10" fontWeight="700">
                    ⚡ Zero Hallucination Protocol · Mutual Consensus Gate
                  </text>
                </g>

                {/* 5. CONSENSUS DIAMOND */}
                <g transform="translate(1000, 160)">
                  <polygon points="60 0, 120 45, 60 90, 0 45" fill="url(#diamondGrad)" stroke="#38bdf8" strokeWidth="2" filter="url(#card-shadow)" />
                  <text x="60" y="42" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">CONSENSUS</text>
                  <text x="60" y="56" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="700">REACHED?</text>
                  
                  <rect x="46" y="-30" width="28" height="16" rx="4" fill="#ef4444" />
                  <text x="60" y="-18" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">NO</text>

                  <rect x="46" y="98" width="28" height="16" rx="4" fill="#10b981" />
                  <text x="60" y="110" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">YES</text>
                </g>

                {/* HUMAN REVIEW */}
                <g transform="translate(1156, 110)" filter="url(#card-shadow)">
                  <rect width="170" height="58" rx="8" fill="#7f1d1d" stroke="#f87171" strokeWidth="1.5" />
                  <text x="85" y="26" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">HUMAN REVIEW</text>
                  <text x="85" y="44" textAnchor="middle" fill="#fecaca" fontSize="9" fontWeight="600">IO Verification &amp; Override</text>
                </g>

                {/* BUILD KNOWLEDGE GRAPH */}
                <g transform="translate(1146, 230)" filter="url(#card-shadow)">
                  <rect width="194" height="96" rx="10" fill="#003b46" stroke="#00a86b" strokeWidth="2" />
                  <text x="97" y="24" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">BUILD DYNAMIC</text>
                  <text x="97" y="40" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="800">NEO4J GRAPH</text>

                  <g transform="translate(97, 66)">
                    <line x1="-30" y1="6" x2="0" y2="-12" stroke="#a7f3d0" strokeWidth="1.5" />
                    <line x1="0" y1="-12" x2="32" y2="2" stroke="#a7f3d0" strokeWidth="1.5" />
                    <line x1="-30" y1="6" x2="16" y2="16" stroke="#a7f3d0" strokeWidth="1.5" />
                    <line x1="16" y1="16" x2="32" y2="2" stroke="#a7f3d0" strokeWidth="1.5" />
                    <circle cx="0" cy="-12" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="-30" cy="6" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="32" cy="2" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="16" cy="16" r="5" fill="#ec4899" stroke="#ffffff" strokeWidth="1" />
                  </g>
                </g>

                {/* 6. IDENTIFY INFLUENCERS */}
                <g transform="translate(115, 515)">
                  <polygon points="65 0, 130 50, 65 100, 0 50" fill="url(#diamondGrad)" stroke="#38bdf8" strokeWidth="2" filter="url(#card-shadow)" />
                  <text x="65" y="46" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">IDENTIFY KEY</text>
                  <text x="65" y="60" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="700">INFLUENCERS?</text>

                  <rect x="135" y="10" width="28" height="16" rx="4" fill="#10b981" />
                  <text x="149" y="22" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">YES</text>

                  <rect x="51" y="106" width="28" height="16" rx="4" fill="#ef4444" />
                  <text x="65" y="118" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">NO</text>
                </g>

                {/* MASTERMIND PINPOINTING */}
                <g transform="translate(322, 482)" filter="url(#card-shadow)">
                  <rect width="220" height="76" rx="8" fill="#004d7a" stroke="#00b4d8" strokeWidth="1.8" />
                  <text x="110" y="32" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">MASTERMIND PINPOINTING</text>
                  <text x="110" y="52" textAnchor="middle" fill="#90e0ef" fontSize="10" fontWeight="700">PAGERANK &amp; BETWEENNESS</text>
                </g>

                {/* PATTERN DETECTION */}
                <g transform="translate(322, 608)" filter="url(#card-shadow)">
                  <rect width="220" height="76" rx="8" fill={isDark ? '#1e293b' : '#0f3460'} stroke={isDark ? '#475569' : '#16213e'} strokeWidth="1.5" />
                  <text x="110" y="32" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">COMMUNITY DETECTION</text>
                  <text x="110" y="47" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">&amp; SYNDICATE CLUSTERING</text>
                  <text x="110" y="62" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="600">(FLAGS SUSPICIOUS BEHAVIORS)</text>
                </g>

                {/* 7. SARVAM AI VOICE ASSISTANT */}
                <g transform="translate(642, 510)">
                  <circle cx="55" cy="55" r="48" fill={isDark ? '#083344' : '#e0f7fa'} stroke={c.teal} strokeWidth="2.5" filter="url(#card-shadow)" />
                  <circle cx="55" cy="55" r="38" fill="url(#agentDetective)" />
                  
                  <g transform="translate(42, 40)" fill="#ffffff">
                    <rect x="8" y="2" width="10" height="16" rx="5" />
                    <path d="M 4 12 C 4 19 22 19 22 12" fill="none" stroke="#ffffff" strokeWidth="2.2" />
                    <line x1="13" y1="20" x2="13" y2="25" stroke="#ffffff" strokeWidth="2.2" />
                    <line x1="9" y1="25" x2="17" y2="25" stroke="#ffffff" strokeWidth="2.2" />
                    <path d="M 1 9 C -2 12 -2 16 1 19" fill="none" stroke="#7dd3fc" strokeWidth="1.8" />
                    <path d="M 25 9 C 28 12 28 16 25 19" fill="none" stroke="#7dd3fc" strokeWidth="1.8" />
                  </g>

                  <text x="55" y="118" textAnchor="middle" fill={c.textMain} fontSize="11" fontWeight="800">SARVAM AI VOICE</text>
                  <text x="55" y="132" textAnchor="middle" fill={c.textMain} fontSize="10" fontWeight="700">COPILOT (saaras:v2)</text>
                  <text x="55" y="145" textAnchor="middle" fill={c.textMuted} fontSize="8" fontWeight="600">Tamil, Hindi, Marathi, Tanglish</text>
                </g>

                {/* 8. OFFICER DASHBOARD */}
                <g transform="translate(808, 480)" filter="url(#card-shadow)">
                  <rect width="216" height="142" rx="8" fill={isDark ? '#0f172a' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
                  <rect x="2" y="2" width="212" height="18" rx="6" fill="#0b1329" />
                  <circle cx="12" cy="11" r="3" fill="#ef4444" />
                  <circle cx="20" cy="11" r="3" fill="#f59e0b" />
                  <circle cx="28" cy="11" r="3" fill="#10b981" />
                  <text x="110" y="14" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">REACT / CYTOSCAPE.JS UI</text>

                  <g transform="translate(10, 28)">
                    <rect width="90" height="48" rx="4" fill={isDark ? '#1e293b' : '#334155'} />
                    <rect x="10" y="24" width="8" height="18" fill="#38bdf8" />
                    <rect x="24" y="14" width="8" height="28" fill="#10b981" />
                    <rect x="38" y="8" width="8" height="34" fill="#f59e0b" />
                    <rect x="52" y="18" width="8" height="24" fill="#ef4444" />
                    <rect x="66" y="12" width="8" height="30" fill="#a855f7" />
                  </g>

                  <g transform="translate(108, 28)">
                    <rect width="96" height="48" rx="4" fill={isDark ? '#1e293b' : '#334155'} />
                    <circle cx="48" cy="24" r="14" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="48" cy="24" r="5" fill="#10b981" />
                    <circle cx="32" cy="18" r="3" fill="#ef4444" />
                    <circle cx="62" cy="30" r="3" fill="#f59e0b" />
                    <line x1="48" y1="24" x2="32" y2="18" stroke="#ffffff" strokeWidth="1" />
                    <line x1="48" y1="24" x2="62" y2="30" stroke="#ffffff" strokeWidth="1" />
                  </g>

                  <g transform="translate(10, 84)">
                    <rect width="194" height="48" rx="4" fill={isDark ? '#132036' : '#273549'} />
                    <text x="14" y="18" fill="#7dd3fc" fontSize="9" fontWeight="700">12 SUSPECTS MAPPED</text>
                    <text x="14" y="32" fill="#a7f3d0" fontSize="8">3 RINGS ACTIVE</text>
                    <text x="14" y="44" fill="#fecaca" fontSize="8">1 MASTERMIND DETECTED</text>
                    <rect x="126" y="12" width="58" height="24" rx="4" fill="#0284c7" />
                    <text x="155" y="27" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">VIEW GRAPH</text>
                  </g>

                  <polygon points="98 142, 118 142, 114 154, 102 154" fill="#64748b" />
                  <rect x="88" y="154" width="40" height="4" rx="2" fill="#475569" />
                  <text x="108" y="174" textAnchor="middle" fill={c.textMain} fontSize="12" fontWeight="800">OFFICER DASHBOARD</text>
                </g>

                {/* 9. REPORTS */}
                <g transform="translate(1072, 532)" filter="url(#card-shadow)">
                  <rect width="186" height="66" rx="8" fill="#004e64" stroke="#25a18e" strokeWidth="1.8" />
                  <text x="93" y="26" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">ACTIONABLE INTELLIGENCE</text>
                  <text x="93" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">DOSSIERS &amp; EVIDENCE</text>
                  <text x="93" y="58" textAnchor="middle" fill="#7df9ff" fontSize="8" fontWeight="600">(Charge Sheets &amp; Warrant Briefs)</text>
                </g>

                {/* 10. END */}
                <g transform="translate(1298, 540)">
                  <rect width="124" height="50" rx="25" fill="#003554" stroke="#00a86b" strokeWidth="2.5" filter="url(#card-shadow)" />
                  <text x="62" y="24" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">END / ACTION</text>
                  <text x="62" y="38" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="700">APPREHENSION</text>
                </g>
              </g>
            )}

            {/* ============================================================
                SLIDE VIEW 2: 5-LAYER CORE TECHNICAL ARCHITECTURE STACK
                ============================================================ */}
            {activeSlide === 'architecture' && (
              <g id="slide-architecture">
                {/* TOP BANNER */}
                <rect x="24" y="16" width="1392" height="52" rx="8" fill="url(#headerGrad)" />
                <text x="720" y="48" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.8">
                  CORE SYSTEM ARCHITECTURE: 5-LAYER ENTERPRISE INTELLIGENCE PIPELINE
                </text>

                {/* 5 HORIZONTAL ARCHITECTURE TIERS */}
                
                {/* LAYER 1: DATA INGESTION LAYER */}
                <g transform="translate(60, 95)" filter="url(#card-shadow)">
                  <rect width="1320" height="100" rx="10" fill={isDark ? '#0e1b2e' : '#f0f7ff'} stroke="#0284c7" strokeWidth="2" />
                  <rect x="0" y="0" width="220" height="100" rx="10" fill="#003366" />
                  <text x="110" y="45" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">LAYER 1</text>
                  <text x="110" y="65" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">DATA INGESTION</text>

                  {/* Modules */}
                  <g transform="translate(240, 16)">
                    <rect width="240" height="68" rx="6" fill={isDark ? '#162842' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="120" y="28" textAnchor="middle" fill={c.textMain} fontSize="12" fontWeight="700">📄 FIR Documents</text>
                    <text x="120" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Unstructured Police Case PDFs</text>
                  </g>
                  <g transform="translate(500, 16)">
                    <rect width="240" height="68" rx="6" fill={isDark ? '#162842' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="120" y="28" textAnchor="middle" fill={c.textMain} fontSize="12" fontWeight="700">📞 CDR Logs</text>
                    <text x="120" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Tower Cells, IMEI, Call Frequency</text>
                  </g>
                  <g transform="translate(760, 16)">
                    <rect width="240" height="68" rx="6" fill={isDark ? '#162842' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="120" y="28" textAnchor="middle" fill={c.textMain} fontSize="12" fontWeight="700">🏛️ Bank Statements</text>
                    <text x="120" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Excel / CSV Transaction Ledgers</text>
                  </g>
                  <g transform="translate(1020, 16)">
                    <rect width="270" height="68" rx="6" fill={isDark ? '#162842' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="135" y="28" textAnchor="middle" fill={c.textMain} fontSize="12" fontWeight="700">⚡ Node.js Serverless Microservices</text>
                    <text x="135" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Netlify Functions Event-Driven Stream</text>
                  </g>
                </g>

                {/* Connecting Pipe 1->2 */}
                <path d="M 720 195 L 720 225" stroke={c.arrowStroke} strokeWidth="4" markerEnd="url(#arrow-cyan)" />

                {/* LAYER 2: ENTITY EXTRACTION (NER) */}
                <g transform="translate(60, 225)" filter="url(#card-shadow)">
                  <rect width="1320" height="100" rx="10" fill={isDark ? '#0f2438' : '#eef8ff'} stroke="#0284c7" strokeWidth="2" />
                  <rect x="0" y="0" width="220" height="100" rx="10" fill="#02457a" />
                  <text x="110" y="45" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">LAYER 2</text>
                  <text x="110" y="65" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="700">ENTITY EXTRACTION (NER)</text>

                  <g transform="translate(240, 16)">
                    <rect width="320" height="68" rx="6" fill={isDark ? '#163554' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="160" y="28" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="800">Gemini 1.5 Flash API (Temp 0.0)</text>
                    <text x="160" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Strict JSON Mode · Zero Deterministic Variance</text>
                  </g>
                  <g transform="translate(580, 16)">
                    <rect width="340" height="68" rx="6" fill={isDark ? '#163554' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="170" y="28" textAnchor="middle" fill={c.textMain} fontSize="12" fontWeight="700">Fine-Tuned SpaCy Legal NLP</text>
                    <text x="170" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Indian FIR / IPC Legal Jargon Tokenizer</text>
                  </g>
                  <g transform="translate(940, 16)">
                    <rect width="350" height="68" rx="6" fill={isDark ? '#163554' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="175" y="28" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="800">Structured Entity Payload Output</text>
                    <text x="175" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">People · Locations · Vehicles · Phone · Mules</text>
                  </g>
                </g>

                {/* Connecting Pipe 2->3 */}
                <path d="M 720 325 L 720 355" stroke={c.arrowStroke} strokeWidth="4" markerEnd="url(#arrow-cyan)" />

                {/* LAYER 3: TWINAI DUAL-AGENT CONSENSUS ENGINE */}
                <g transform="translate(60, 355)" filter="url(#card-shadow)">
                  <rect width="1320" height="110" rx="10" fill={isDark ? '#142a3a' : '#f0fdfa'} stroke="#0d9488" strokeWidth="2.5" />
                  <rect x="0" y="0" width="220" height="110" rx="10" fill="#004d7a" />
                  <text x="110" y="48" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">LAYER 3</text>
                  <text x="110" y="68" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="700">TWINAI CONSENSUS</text>

                  {/* Detective vs Advocate */}
                  <g transform="translate(240, 16)">
                    <rect width="320" height="78" rx="6" fill={isDark ? '#1e3848' : '#ffffff'} stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="160" y="28" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="800">🤖 Extractor Agent (Detective)</text>
                    <text x="160" y="48" textAnchor="middle" fill={c.textMain} fontSize="10">Proposes Candidate Nodes &amp; Edges</text>
                    <text x="160" y="64" textAnchor="middle" fill={c.textMuted} fontSize="9">Links call frequencies &amp; FIR co-accused</text>
                  </g>

                  <g transform="translate(580, 30)">
                    <rect width="140" height="50" rx="25" fill="#0f766e" />
                    <text x="70" y="24" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">DEBATE &amp; AUDIT</text>
                    <text x="70" y="38" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="700">⚡ Consensus Gate</text>
                  </g>

                  <g transform="translate(740, 16)">
                    <rect width="320" height="78" rx="6" fill={isDark ? '#1e3848' : '#ffffff'} stroke="#14b8a6" strokeWidth="1.5" />
                    <text x="160" y="28" textAnchor="middle" fill="#0d9488" fontSize="12" fontWeight="800">⚖️ Validation Agent (Ethics/Audit)</text>
                    <text x="160" y="48" textAnchor="middle" fill={c.textMain} fontSize="10">Cross-audits Evidence &amp; Financial Proof</text>
                    <text x="160" y="64" textAnchor="middle" fill={c.textMuted} fontSize="9">Protects innocent third parties &amp; families</text>
                  </g>

                  <g transform="translate(1080, 16)">
                    <rect width="210" height="78" rx="6" fill={isDark ? '#2e1c22' : '#fef2f2'} stroke="#ef4444" strokeWidth="1.5" />
                    <text x="105" y="28" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="800">Discrepancy Trigger</text>
                    <text x="105" y="48" textAnchor="middle" fill={c.textMain} fontSize="10">Human-In-The-Loop Review</text>
                    <text x="105" y="64" textAnchor="middle" fill={c.textMuted} fontSize="9">IO Audit &amp; Manual Override</text>
                  </g>
                </g>

                {/* Connecting Pipe 3->4 */}
                <path d="M 720 465 L 720 495" stroke={c.arrowStroke} strokeWidth="4" markerEnd="url(#arrow-cyan)" />

                {/* LAYER 4: GRAPH DATABASE & CENTRALITY ANALYTICS */}
                <g transform="translate(60, 495)" filter="url(#card-shadow)">
                  <rect width="1320" height="100" rx="10" fill={isDark ? '#0c262a' : '#ecfdf5'} stroke="#059669" strokeWidth="2" />
                  <rect x="0" y="0" width="220" height="100" rx="10" fill="#003b46" />
                  <text x="110" y="45" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">LAYER 4</text>
                  <text x="110" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="700">GRAPH DATABASE</text>

                  <g transform="translate(240, 16)">
                    <rect width="320" height="68" rx="6" fill={isDark ? '#143838' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="160" y="28" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="800">Neo4j Graph Database</text>
                    <text x="160" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Weighted Relationship Edges &amp; Cypher Engine</text>
                  </g>
                  <g transform="translate(580, 16)">
                    <rect width="340" height="68" rx="6" fill={isDark ? '#143838' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="170" y="28" textAnchor="middle" fill="#0ea5e9" fontSize="12" fontWeight="800">Supabase (PostgreSQL)</text>
                    <text x="170" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Encrypted Case Storage, Auth &amp; Audit Logs</text>
                  </g>
                  <g transform="translate(940, 16)">
                    <rect width="350" height="68" rx="6" fill={isDark ? '#143838' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="175" y="28" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="800">Centrality Algorithms</text>
                    <text x="175" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">PageRank · Betweenness · Community Louvain</text>
                  </g>
                </g>

                {/* Connecting Pipe 4->5 */}
                <path d="M 720 595 L 720 625" stroke={c.arrowStroke} strokeWidth="4" markerEnd="url(#arrow-cyan)" />

                {/* LAYER 5: MULTILINGUAL VOICE & DASHBOARD LAYER */}
                <g transform="translate(60, 625)" filter="url(#card-shadow)">
                  <rect width="1320" height="100" rx="10" fill={isDark ? '#182038' : '#f5f3ff'} stroke="#7c3aed" strokeWidth="2" />
                  <rect x="0" y="0" width="220" height="100" rx="10" fill="#2e1065" />
                  <text x="110" y="45" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">LAYER 5</text>
                  <text x="110" y="65" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">VOICE &amp; DASHBOARD</text>

                  <g transform="translate(240, 16)">
                    <rect width="320" height="68" rx="6" fill={isDark ? '#232048' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="160" y="28" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="800">Sarvam AI (saaras:v2 STT)</text>
                    <text x="160" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Tamil, Hindi, Marathi &amp; Tanglish Speech Input</text>
                  </g>
                  <g transform="translate(580, 16)">
                    <rect width="340" height="68" rx="6" fill={isDark ? '#232048' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="170" y="28" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="800">Sarvam AI (bulbul:v1 TTS)</text>
                    <text x="170" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Audio Intel Briefs + Web Speech Fallback</text>
                  </g>
                  <g transform="translate(940, 16)">
                    <rect width="350" height="68" rx="6" fill={isDark ? '#232048' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="175" y="28" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="800">React.js &amp; Cytoscape.js UI</text>
                    <text x="175" y="48" textAnchor="middle" fill={c.textMuted} fontSize="10">Digital Red Thread Board · 1-Click Dossier</text>
                  </g>
                </g>
              </g>
            )}

            {/* ============================================================
                SLIDE VIEW 3: TWINAI ZERO-HALLUCINATION CONSENSUS PROTOCOL
                ============================================================ */}
            {activeSlide === 'consensus' && (
              <g id="slide-consensus">
                {/* TOP BANNER */}
                <rect x="24" y="16" width="1392" height="52" rx="8" fill="url(#headerGrad)" />
                <text x="720" y="48" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.8">
                  TWINAI PROTOCOL: ZERO-HALLUCINATION ADVERSARIAL VERIFICATION PIPELINE
                </text>

                {/* Left Card: Detective */}
                <g transform="translate(80, 100)" filter="url(#card-shadow)">
                  <rect width="380" height="580" rx="12" fill={c.bgCard} stroke="#0284c7" strokeWidth="2" />
                  <path d="M 0 12 Q 0 0 12 0 L 368 0 Q 380 0 380 12 L 380 60 L 0 60 Z" fill="#02457a" />
                  <text x="190" y="32" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800">AGENT 1: THE DETECTIVE</text>
                  <text x="190" y="48" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="700">EXTRACTOR &amp; RELATIONSHIP HYPOTHESIZER</text>

                  <g transform="translate(30, 80)">
                    <circle cx="36" cy="36" r="30" fill="url(#agentDetective)" />
                    <text x="36" y="42" textAnchor="middle" fontSize="26">🔍</text>
                    <text x="80" y="32" fill={c.textMain} fontSize="13" fontWeight="800">Primary Responsibilities</text>
                    <text x="80" y="48" fill={c.textMuted} fontSize="11">Gemini 1.5 Flash JSON Processing</text>
                  </g>

                  <g transform="translate(24, 160)">
                    <rect width="332" height="70" rx="8" fill={isDark ? '#162842' : '#f0f9ff'} stroke={c.border} strokeWidth="1" />
                    <text x="16" y="24" fill="#0284c7" fontSize="11" fontWeight="800">1. Candidate Entity Extraction</text>
                    <text x="16" y="42" fill={c.textMain} fontSize="10">Parses raw FIRs, CDR call logs, Bank transactions,</text>
                    <text x="16" y="56" fill={c.textMuted} fontSize="9">and tokenizes structured crime entities.</text>
                  </g>

                  <g transform="translate(24, 245)">
                    <rect width="332" height="70" rx="8" fill={isDark ? '#162842' : '#f0f9ff'} stroke={c.border} strokeWidth="1" />
                    <text x="16" y="24" fill="#0284c7" fontSize="11" fontWeight="800">2. Hypothesizes Hidden Ties</text>
                    <text x="16" y="42" fill={c.textMain} fontSize="10">Connects suspect burner phones with shared cell</text>
                    <text x="16" y="56" fill={c.textMuted} fontSize="9">tower pings and suspicious bank fund transfers.</text>
                  </g>

                  <g transform="translate(24, 330)">
                    <rect width="332" height="70" rx="8" fill={isDark ? '#162842' : '#f0f9ff'} stroke={c.border} strokeWidth="1" />
                    <text x="16" y="24" fill="#0284c7" fontSize="11" fontWeight="800">3. Drafts Graph Triples</text>
                    <text x="16" y="42" fill={c.textMain} fontSize="10">Outputs format: [Suspect_A ➔ FINANCIAL_LINK ➔</text>
                    <text x="16" y="56" fill={c.textMuted} fontSize="9">Suspect_B, confidence: 94%, amount: ₹1.2Cr].</text>
                  </g>

                  <g transform="translate(24, 420)">
                    <rect width="332" height="120" rx="8" fill={isDark ? '#0c223a' : '#e0f2fe'} stroke="#38bdf8" strokeWidth="1" />
                    <text x="16" y="24" fill="#0369a1" fontSize="11" fontWeight="800">⚡ Draft Output Proposition</text>
                    <text x="16" y="44" fill={c.textMain} fontSize="10" fontFamily="monospace">"Flagged Rajan K. ↔ Burner PH001</text>
                    <text x="16" y="60" fill={c.textMain} fontSize="10" fontFamily="monospace">with 47 calls in 48h prior to</text>
                    <text x="16" y="76" fill={c.textMain} fontSize="10" fontFamily="monospace">FIR-2024-008 incident."</text>
                  </g>
                </g>

                {/* Center Protocol Pipeline */}
                <g transform="translate(500, 100)">
                  {/* Arrow Right */}
                  <path d="M -20 180 L 80 180" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                  <path d="M 360 360 L 460 360" stroke="#0d9488" strokeWidth="3" markerEnd="url(#arrow-cyan)" />

                  {/* Center Debate Matrix Card */}
                  <rect x="0" y="60" width="440" height="460" rx="12" fill={isDark ? '#0a1d2e' : '#f8fafc'} stroke="#38bdf8" strokeWidth="2" filter="url(#card-shadow)" />
                  <rect x="0" y="60" width="440" height="42" rx="10" fill="#003366" />
                  <text x="220" y="86" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">
                    ADVERSARIAL VERIFICATION PROTOCOL
                  </text>

                  <g transform="translate(20, 120)">
                    <text x="0" y="16" fill={c.textMain} fontSize="12" fontWeight="700">Audit Checkpoint Matrix</text>
                    
                    <g transform="translate(0, 30)">
                      <rect width="400" height="48" rx="6" fill={isDark ? '#142a42' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <circle cx="20" cy="24" r="10" fill="#10b981" />
                      <text x="20" y="28" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">✓</text>
                      <text x="40" y="22" fill={c.textMain} fontSize="11" fontWeight="700">1. Evidence Trail Audit</text>
                      <text x="40" y="36" fill={c.textMuted} fontSize="9">Is there authentic bank proof backing the claim?</text>
                    </g>

                    <g transform="translate(0, 88)">
                      <rect width="400" height="48" rx="6" fill={isDark ? '#142a42' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <circle cx="20" cy="24" r="10" fill="#10b981" />
                      <text x="20" y="28" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">✓</text>
                      <text x="40" y="22" fill={c.textMain} fontSize="11" fontWeight="700">2. Innocent Third-Party Shield</text>
                      <text x="40" y="36" fill={c.textMuted} fontSize="9">Ensures casual contacts &amp; family are NOT tagged.</text>
                    </g>

                    <g transform="translate(0, 146)">
                      <rect width="400" height="48" rx="6" fill={isDark ? '#142a42' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <circle cx="20" cy="24" r="10" fill="#10b981" />
                      <text x="20" y="28" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">✓</text>
                      <text x="40" y="22" fill={c.textMain} fontSize="11" fontWeight="700">3. Legal Admissibility Gate</text>
                      <text x="40" y="36" fill={c.textMuted} fontSize="9">Requires Indian Evidence Act compliance tags.</text>
                    </g>

                    <g transform="translate(0, 204)">
                      <rect width="400" height="64" rx="6" fill={isDark ? '#06382a' : '#ecfdf5'} stroke="#10b981" strokeWidth="1.5" />
                      <text x="20" y="26" fill="#10b981" fontSize="11" fontWeight="800">✅ MUTUAL CONSENSUS APPROVED</text>
                      <text x="20" y="44" fill={c.textMain} fontSize="10">Edge auto-committed to Neo4j Knowledge Graph</text>
                      <text x="20" y="56" fill={c.textMuted} fontSize="9">Confidence: 94.7% · Certified for Court Dossier</text>
                    </g>

                    <g transform="translate(0, 278)">
                      <rect width="400" height="64" rx="6" fill={isDark ? '#3d161a' : '#fef2f2'} stroke="#ef4444" strokeWidth="1.5" />
                      <text x="20" y="26" fill="#ef4444" fontSize="11" fontWeight="800">⚠️ DISCREPANCY / LOW CONFIDENCE</text>
                      <text x="20" y="44" fill={c.textMain} fontSize="10">Edge paused ➔ Escalated to Human Officer Audit</text>
                      <text x="20" y="56" fill={c.textMuted} fontSize="9">Zero automatic false convictions</text>
                    </g>
                  </g>
                </g>

                {/* Right Card: Devil's Advocate */}
                <g transform="translate(980, 100)" filter="url(#card-shadow)">
                  <rect width="380" height="580" rx="12" fill={c.bgCard} stroke="#0d9488" strokeWidth="2" />
                  <path d="M 0 12 Q 0 0 12 0 L 368 0 Q 380 0 380 12 L 380 60 L 0 60 Z" fill="#0f766e" />
                  <text x="190" y="32" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800">AGENT 2: DEVIL'S ADVOCATE</text>
                  <text x="190" y="48" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="700">ETHICS, VERACITY &amp; LEGAL AUDITOR</text>

                  <g transform="translate(30, 80)">
                    <circle cx="36" cy="36" r="30" fill="url(#agentValidator)" />
                    <text x="36" y="42" textAnchor="middle" fontSize="26">⚖️</text>
                    <text x="80" y="32" fill={c.textMain} fontSize="13" fontWeight="800">Audit Capabilities</text>
                    <text x="80" y="48" fill={c.textMuted} fontSize="11">Hallucination &amp; Loophole Checker</text>
                  </g>

                  <g transform="translate(24, 160)">
                    <rect width="332" height="70" rx="8" fill={isDark ? '#142e2c' : '#f0fdfa'} stroke={c.border} strokeWidth="1" />
                    <text x="16" y="24" fill="#0d9488" fontSize="11" fontWeight="800">1. Evidence Cross-Examination</text>
                    <text x="16" y="42" fill={c.textMain} fontSize="10">Tests Agent 1's claims: "Is there a physical or</text>
                    <text x="16" y="56" fill={c.textMuted} fontSize="9">financial footprint to prove this connection?"</text>
                  </g>

                  <g transform="translate(24, 245)">
                    <rect width="332" height="70" rx="8" fill={isDark ? '#142e2c' : '#f0fdfa'} stroke={c.border} strokeWidth="1" />
                    <text x="16" y="24" fill="#0d9488" fontSize="11" fontWeight="800">2. False Positive Filtering</text>
                    <text x="16" y="42" fill={c.textMain} fontSize="10">Audits accidental co-location pings (e.g. airport,</text>
                    <text x="16" y="56" fill={c.textMuted} fontSize="9">public transit, food delivery calls).</text>
                  </g>

                  <g transform="translate(24, 330)">
                    <rect width="332" height="70" rx="8" fill={isDark ? '#142e2c' : '#f0fdfa'} stroke={c.border} strokeWidth="1" />
                    <text x="16" y="24" fill="#0d9488" fontSize="11" fontWeight="800">3. Immutable Audit Logging</text>
                    <text x="16" y="42" fill={c.textMain} fontSize="10">Records the entire debate trajectory in Supabase</text>
                    <text x="16" y="56" fill={c.textMuted} fontSize="9">so every node is 100% explainable in court.</text>
                  </g>

                  <g transform="translate(24, 420)">
                    <rect width="332" height="120" rx="8" fill={isDark ? '#06382a' : '#e6fffa'} stroke="#2dd4bf" strokeWidth="1" />
                    <text x="16" y="24" fill="#0f766e" fontSize="11" fontWeight="800">⚡ Audit Cross-Check Output</text>
                    <text x="16" y="44" fill={c.textMain} fontSize="10" fontFamily="monospace">"Verified: 47 calls corroborated</text>
                    <text x="16" y="60" fill={c.textMain} fontSize="10" fontFamily="monospace">by ₹1.2Cr HDFC ledger TXN001</text>
                    <text x="16" y="76" fill={c.textMain} fontSize="10" fontFamily="monospace">&amp; 2 co-suspect FIR statements."</text>
                  </g>
                </g>
              </g>
            )}

            {/* ============================================================
                FOOTER CREDENTIALS (Present on all slides)
                ============================================================ */}
            <line x1="24" y1="770" x2="1416" y2="770" stroke={c.border} strokeWidth="1" />

            <g transform="translate(36, 782)">
              <circle cx="16" cy="18" r="16" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#f59e0b" strokeWidth="1.5" />
              <text x="16" y="23" textAnchor="middle" fontSize="15">🏛️</text>
              <text x="40" y="16" fill={c.textMain} fontSize="11" fontWeight="800" letterSpacing="0.5">
                MINISTRY OF HOME AFFAIRS (MHA)
              </text>
              <text x="40" y="30" fill={c.textMuted} fontSize="9" fontWeight="600">
                Government of India | SIH26189 Technical Architecture Framework
              </text>
            </g>

            <g transform="translate(620, 788)">
              <rect x="-10" y="-12" width="220" height="28" rx="14" fill={isDark ? '#132036' : '#f1f5f9'} stroke={c.border} strokeWidth="1" />
              <text x="100" y="6" textAnchor="middle" fill={c.textMain} fontSize="10" fontWeight="700">
                TwinAI Zero-Hallucination Protocol
              </text>
            </g>

            <g transform="translate(1260, 782)">
              <text x="90" y="16" textAnchor="end" fill="#dc2626" fontSize="16" fontWeight="900" letterSpacing="1">
                NCRB
              </text>
              <text x="90" y="30" textAnchor="end" fill={c.textMuted} fontSize="8" fontWeight="700">
                (NATIONAL CRIME RECORDS BUREAU)
              </text>
            </g>

          </svg>
        </div>

        {/* ============================================================
            STEP-BY-STEP TECHNICAL EXECUTION EXPLORER (Interactive Tabs)
            ============================================================ */}
        <div className="execution-section">
          <div className="section-header-row">
            <div>
              <div className="badge-sih mono">TECHNICAL EXECUTION PIPELINE</div>
              <h3 className="section-title">Step-by-Step Technical Implementation</h3>
            </div>
            <div className="mono execution-step-counter">
              STEP {executionSteps[activeStepTab].num} OF 05
            </div>
          </div>

          <div className="execution-tabs-nav">
            {executionSteps.map((step, idx) => (
              <button
                key={step.num}
                className={`exec-tab-btn ${activeStepTab === idx ? 'active' : ''}`}
                onClick={() => setActiveStepTab(idx)}
              >
                <span className="mono exec-num">{step.num}</span>
                <span className="exec-title">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Card */}
          <div className="exec-card">
            <div className="exec-card-header">
              <div className="exec-badge-wrap">
                <span className="badge-pill mono">{executionSteps[activeStepTab].badge}</span>
                <span className="badge-tech mono">{executionSteps[activeStepTab].tech}</span>
              </div>
              <div className="exec-icon-box">{executionSteps[activeStepTab].icon}</div>
            </div>

            <h4 className="exec-heading">{executionSteps[activeStepTab].title}</h4>
            <p className="exec-subheading mono">{executionSteps[activeStepTab].subtitle}</p>
            <p className="exec-desc">{executionSteps[activeStepTab].desc}</p>

            <div className="exec-bullet-list">
              <div className="mono exec-bullet-title">// SYSTEM SPECIFICATIONS &amp; LOGIC:</div>
              {executionSteps[activeStepTab].bullets.map((b, i) => (
                <div className="exec-bullet-item" key={i}>
                  <span className="bullet-check">✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="exec-card-footer">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setActiveStepTab(Math.max(0, activeStepTab - 1))}
                disabled={activeStepTab === 0}
              >
                ← Previous Step
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setActiveStepTab(Math.min(executionSteps.length - 1, activeStepTab + 1))}
                disabled={activeStepTab === executionSteps.length - 1}
              >
                Next Execution Step →
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            TECHNICAL STACK MATRIX (Exact Document Table)
            ============================================================ */}
        <div className="tech-matrix-section">
          <div className="section-header-row">
            <div>
              <div className="badge-sih mono">OFFICIAL TECH SPECS</div>
              <h3 className="section-title">Technical Stack &amp; Infrastructure Matrix</h3>
            </div>
          </div>

          <div className="tech-matrix-table-wrap">
            <table className="tech-matrix-table">
              <thead>
                <tr>
                  <th>LAYER</th>
                  <th>TECHNOLOGY SELECTED</th>
                  <th>KEY FUNCTION &amp; IMPLEMENTATION</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="layer-badge mono">Frontend UI</div>
                  </td>
                  <td>
                    <strong className="tech-title-text">React.js / Next.js, Cytoscape.js</strong>
                  </td>
                  <td>Interactive criminal graph topology visualization, dark/white theme design system</td>
                  <td><span className="status-badge status-live">● LIVE</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="layer-badge mono">Backend &amp; Compute</div>
                  </td>
                  <td>
                    <strong className="tech-title-text">Node.js, Netlify Serverless Functions</strong>
                  </td>
                  <td>Event-driven microservice processing, PDF &amp; CDR data parsing, API orchestration</td>
                  <td><span className="status-badge status-live">● READY</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="layer-badge mono">AI Brain / LLM</div>
                  </td>
                  <td>
                    <strong className="tech-title-text">Gemini 1.5 Flash API</strong>
                  </td>
                  <td>Zero-temperature (0.0) JSON entity extraction, TwinAI multi-agent consensus logic</td>
                  <td><span className="status-badge status-live">● CONFIGURED</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="layer-badge mono">Voice Processing</div>
                  </td>
                  <td>
                    <strong className="tech-title-text">Sarvam AI (saaras:v2 / bulbul:v1) + Web Speech API</strong>
                  </td>
                  <td>Regional Indian language speech-to-text (Tamil, Hindi, Marathi, Tanglish) and audio briefing TTS</td>
                  <td><span className="status-badge status-live">● INTEGRATED</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="layer-badge mono">Database Layer</div>
                  </td>
                  <td>
                    <strong className="tech-title-text">Supabase (PostgreSQL) / Neo4j Graph DB</strong>
                  </td>
                  <td>Encrypted case storage, indexed relationship mapping, PageRank &amp; Betweenness Centrality</td>
                  <td><span className="status-badge status-live">● READY</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  )
}
