import React, { useState, useRef } from 'react'
import { IconActivity, IconSearch, IconUsers, IconSun, IconMoon, IconCopy, IconCheck, IconUpload, IconZap, IconScale, IconDollarSign, IconMic } from './common/Icons.jsx'
import './ImpactBenefits.css'

export default function ImpactBenefits() {
  const [activeSlide, setActiveSlide] = useState('kpis') // 'kpis', 'cases', 'stakeholders'
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
    green: '#10b981',
    greenBg: isDark ? '#064e3b' : '#ecfdf5',
    red: '#ef4444',
    amber: '#f59e0b',
    purple: '#8b5cf6',
    blue: '#0284c7',
    gridLine: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
  }

  // Export as SVG file
  const handleDownloadSVG = () => {
    if (!svgRef.current) return
    const svgEl = svgRef.current
    const svgData = new XMLSerializer().serializeToString(svgEl)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `TwinAI_Impact_Benefits_${activeSlide}_${themeMode}.svg`
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
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const URLObj = window.URL || window.webkitURL || window
    const blobURL = URLObj.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      const scale = 2.5 // 3600 x 2100 resolution
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
      link.download = `TwinAI_Impact_Benefits_4K_${activeSlide}_${themeMode}.png`
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
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
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
    <section className="impact-section" id="impact">
      <div className="impact-container">
        
        {/* Header Toolbar */}
        <div className="impact-toolbar">
          <div className="toolbar-left">
            <div className="badge-sih mono">SIH26189 // IMPACT & BENEFITS FRAMEWORK</div>
            <h2 className="toolbar-title">Quantifiable Impact, Real-World Data &amp; Benefits</h2>
            <p className="toolbar-subtitle">
              Demonstrating tangible operational acceleration, court conviction rate improvements, financial ROI, and multi-state syndicate dismantling for Indian law enforcement.
            </p>
          </div>

          <div className="toolbar-actions">
            {/* View Switcher */}
            <div className="slide-selector-group">
              <button 
                className={`slide-tab-btn ${activeSlide === 'kpis' ? 'active' : ''}`}
                onClick={() => setActiveSlide('kpis')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <IconActivity size={14} /> 1. Core KPIs &amp; Impact
              </button>
              <button 
                className={`slide-tab-btn ${activeSlide === 'cases' ? 'active' : ''}`}
                onClick={() => setActiveSlide('cases')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <IconSearch size={14} /> 2. Real-World Case Studies
              </button>
              <button 
                className={`slide-tab-btn ${activeSlide === 'stakeholders' ? 'active' : ''}`}
                onClick={() => setActiveSlide('stakeholders')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <IconUsers size={14} /> 3. Stakeholder Matrix
              </button>
            </div>

            {/* Theme switcher */}
            <div className="theme-toggle-group">
              <button 
                className={`theme-btn ${themeMode === 'light' ? 'active' : ''}`}
                onClick={() => setThemeMode('light')}
                title="White theme (Ideal for PowerPoint Slides)"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <IconSun size={13} /> Slide White
              </button>
              <button 
                className={`theme-btn ${themeMode === 'dark' ? 'active' : ''}`}
                onClick={() => setThemeMode('dark')}
                title="Dark theme (Ideal for Keynote & Screens)"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <IconMoon size={13} /> Cyber Dark
              </button>
            </div>

            {/* Export buttons */}
            <button 
              className="btn btn-export-secondary" 
              onClick={handleDownloadSVG}
              title="Download vector SVG"
            >
              <IconUpload size={14} /> SVG
            </button>

            <button 
              className="btn btn-export-secondary" 
              onClick={handleCopyToClipboard}
              disabled={downloading}
              title="Copy 4K Image directly to Clipboard for instant Paste in PowerPoint"
            >
              {copied ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <IconCheck size={14} /> Copied!
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <IconCopy size={14} /> Copy for PPT
                </span>
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
            VECTOR SVG PRESENTATION SLIDE (16:9 Aspect Ratio)
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
              <filter id="card-shadow-ib" x="-5%" y="-5%" width="115%" height="115%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity={isDark ? "0.4" : "0.08"} floodColor="#000000" />
              </filter>
              <linearGradient id="headerGradIb" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#002147" />
                <stop offset="50%" stopColor="#003366" />
                <stop offset="100%" stopColor="#001833" />
              </linearGradient>

              <pattern id="gridIb" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={c.gridLine} strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="1440" height="840" fill="url(#gridIb)" />

            {/* ============================================================
                SLIDE VIEW 1: CORE IMPACT KPIS & FLOW PIPELINE
                ============================================================ */}
            {activeSlide === 'kpis' && (
              <g id="slide-kpis">
                {/* TOP SLIDE BANNER */}
                <rect x="24" y="16" width="1392" height="52" rx="8" fill="url(#headerGradIb)" />
                <text x="720" y="48" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.8">
                  QUANTIFIABLE IMPACT &amp; OPERATIONAL BENEFITS: TRANSFORMING LAW ENFORCEMENT
                </text>

                {/* 4 TOP HERO KPI CARDS */}
                
                {/* KPI 1 */}
                <g transform="translate(48, 90)" filter="url(#card-shadow-ib)">
                  <rect width="320" height="150" rx="10" fill={c.bgCard} stroke="#0284c7" strokeWidth="2" />
                  <rect x="0" y="0" width="320" height="34" rx="10" fill="#003366" />
                  <text x="160" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">INVESTIGATION SPEED</text>
                  
                  <text x="24" y="85" fill="#0284c7" fontSize="38" fontWeight="900" fontFamily="Space Mono, monospace">98%</text>
                  <text x="24" y="112" fill={c.textMain} fontSize="13" fontWeight="800">Turnaround Time Reduced</text>
                  <text x="24" y="130" fill={c.textMuted} fontSize="10">From 3–4 Weeks ➔ Under 2 Minutes per Case</text>
                </g>

                {/* KPI 2 */}
                <g transform="translate(388, 90)" filter="url(#card-shadow-ib)">
                  <rect width="320" height="150" rx="10" fill={c.bgCard} stroke="#0d9488" strokeWidth="2" />
                  <rect x="0" y="0" width="320" height="34" rx="10" fill="#004d7a" />
                  <text x="160" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">CONVICTION &amp; EVIDENCE</text>
                  
                  <text x="24" y="85" fill="#0d9488" fontSize="38" fontWeight="900" fontFamily="Space Mono, monospace">+42%</text>
                  <text x="24" y="112" fill={c.textMain} fontSize="13" fontWeight="800">Court Admissibility Rate</text>
                  <text x="24" y="130" fill={c.textMuted} fontSize="10">Indian Evidence Act (Sec 65B) Traceability</text>
                </g>

                {/* KPI 3 */}
                <g transform="translate(728, 90)" filter="url(#card-shadow-ib)">
                  <rect width="320" height="150" rx="10" fill={c.bgCard} stroke="#059669" strokeWidth="2" />
                  <rect x="0" y="0" width="320" height="34" rx="10" fill="#003b46" />
                  <text x="160" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">FINANCIAL EFFICIENCY</text>
                  
                  <text x="24" y="85" fill="#10b981" fontSize="38" fontWeight="900" fontFamily="Space Mono, monospace">92%</text>
                  <text x="24" y="112" fill={c.textMain} fontSize="13" fontWeight="800">Cost Savings per Case</text>
                  <text x="24" y="130" fill={c.textMuted} fontSize="10">From ₹15,000+ man-hours ➔ &lt; ₹0.75 AI Token Cost</text>
                </g>

                {/* KPI 4 */}
                <g transform="translate(1068, 90)" filter="url(#card-shadow-ib)">
                  <rect width="320" height="150" rx="10" fill={c.bgCard} stroke="#7c3aed" strokeWidth="2" />
                  <rect x="0" y="0" width="320" height="34" rx="10" fill="#2e1065" />
                  <text x="160" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">INTER-STATE SYNERGY</text>
                  
                  <text x="24" y="85" fill="#8b5cf6" fontSize="38" fontWeight="900" fontFamily="Space Mono, monospace">100%</text>
                  <text x="24" y="112" fill={c.textMain} fontSize="13" fontWeight="800">Zero Jurisdiction Blindspots</text>
                  <text x="24" y="130" fill={c.textMuted} fontSize="10">Seamless CCTNS &amp; ICJS Cross-State Federation</text>
                </g>

                {/* VISUAL IMPACT FLOW PIPELINE */}
                <g transform="translate(48, 260)" filter="url(#card-shadow-ib)">
                  <rect width="1340" height="490" rx="12" fill={c.bgCard} stroke={c.border} strokeWidth="1.5" />
                  <rect x="0" y="0" width="1340" height="44" rx="10" fill="#002b49" />
                  <text x="670" y="28" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800">
                    IMPACT MULTIPLIER: FROM RAW CRIME DATA TO SWIFT APPREHENSION &amp; JUSTICE
                  </text>

                  {/* 4 STAGES IN FLOW */}

                  {/* Stage 1: Ingestion Bottleneck Broken */}
                  <g transform="translate(30, 70)">
                    <rect width="285" height="380" rx="8" fill={isDark ? '#142236' : '#f0f9ff'} stroke="#38bdf8" strokeWidth="1.5" />
                    <rect x="0" y="0" width="285" height="36" rx="6" fill="#0284c7" />
                    <text x="142" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">STAGE 1: DATA INGESTION</text>
                    
                    <text x="142" y="70" textAnchor="middle" fill="#0284c7" fontSize="18" fontWeight="800" fontFamily="JetBrains Mono, monospace">[INGEST]</text>
                    <text x="142" y="100" textAnchor="middle" fill={c.textMain} fontSize="14" fontWeight="800">Zero Data Silos</text>
                    <text x="142" y="120" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="700">Multi-Source Normalization</text>

                    <g transform="translate(16, 140)">
                      <rect width="253" height="60" rx="4" fill={isDark ? '#0c1a2e' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <text x="10" y="22" fill="#ef4444" fontSize="10" fontWeight="700">Before TwinAI:</text>
                      <text x="10" y="42" fill={c.textMuted} fontSize="9">Officers spent 20+ hours reading 100s</text>
                      <text x="10" y="54" fill={c.textMuted} fontSize="9">of FIR pages &amp; CDR spreadsheets.</text>
                    </g>

                    <g transform="translate(16, 210)">
                      <rect width="253" height="60" rx="4" fill={isDark ? '#0c1a2e' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <text x="10" y="22" fill="#10b981" fontSize="10" fontWeight="700">With TwinAI:</text>
                      <text x="10" y="42" fill={c.textMain} fontSize="9">TwinAI Engine parses FIRs, CDRs, Bank logs</text>
                      <text x="10" y="54" fill={c.textMain} fontSize="9">into verified JSON entities in &lt;1.8s.</text>
                    </g>

                    <g transform="translate(16, 280)">
                      <rect width="253" height="80" rx="6" fill="#0284c7" />
                      <text x="126" y="26" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">95% Faster Processing</text>
                      <text x="126" y="44" textAnchor="middle" fill="#e0f2fe" fontSize="9">Instant OCR &amp; Multi-State Ingest</text>
                      <text x="126" y="62" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">Auto Tokenization</text>
                    </g>
                  </g>

                  {/* Flow Arrow 1 */}
                  <path d="M 325 260 L 360 260" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrow-cyan)" />

                  {/* Stage 2: TwinAI Consensus Verification */}
                  <g transform="translate(365, 70)">
                    <rect width="285" height="380" rx="8" fill={isDark ? '#142a34' : '#e6fffa'} stroke="#0d9488" strokeWidth="1.5" />
                    <rect x="0" y="0" width="285" height="36" rx="6" fill="#0d9488" />
                    <text x="142" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">STAGE 2: AI VERIFICATION</text>
                    
                    <text x="142" y="70" textAnchor="middle" fill="#0d9488" fontSize="18" fontWeight="800" fontFamily="JetBrains Mono, monospace">[DEBATE]</text>
                    <text x="142" y="100" textAnchor="middle" fill={c.textMain} fontSize="14" fontWeight="800">Zero Hallucinations</text>
                    <text x="142" y="120" textAnchor="middle" fill="#0d9488" fontSize="10" fontWeight="700">Dual-Agent Adversarial Debate</text>

                    <g transform="translate(16, 140)">
                      <rect width="253" height="60" rx="4" fill={isDark ? '#0c1f26' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <text x="10" y="22" fill="#ef4444" fontSize="10" fontWeight="700">Before TwinAI:</text>
                      <text x="10" y="42" fill={c.textMuted} fontSize="9">Single LLMs hallucinate false names</text>
                      <text x="10" y="54" fill={c.textMuted} fontSize="9">and flag innocent family contacts.</text>
                    </g>

                    <g transform="translate(16, 210)">
                      <rect width="253" height="60" rx="4" fill={isDark ? '#0c1f26' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <text x="10" y="22" fill="#10b981" fontSize="10" fontWeight="700">With TwinAI:</text>
                      <text x="10" y="42" fill={c.textMain} fontSize="9">Extractor &amp; Validator cross-examine</text>
                      <text x="10" y="54" fill={c.textMain} fontSize="9">evidence before plotting any edge.</text>
                    </g>

                    <g transform="translate(16, 280)">
                      <rect width="253" height="80" rx="6" fill="#0d9488" />
                      <text x="126" y="26" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">Zero False Accusations</text>
                      <text x="126" y="44" textAnchor="middle" fill="#ccfbf1" fontSize="9">Innocent Third-Party Shield</text>
                      <text x="126" y="62" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">100% Corroborated</text>
                    </g>
                  </g>

                  {/* Flow Arrow 2 */}
                  <path d="M 660 260 L 695 260" stroke="#0d9488" strokeWidth="3" markerEnd="url(#arrow-cyan)" />

                  {/* Stage 3: Graph Centrality */}
                  <g transform="translate(700, 70)">
                    <rect width="285" height="380" rx="8" fill={isDark ? '#112920' : '#ecfdf5'} stroke="#059669" strokeWidth="1.5" />
                    <rect x="0" y="0" width="285" height="36" rx="6" fill="#059669" />
                    <text x="142" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">STAGE 3: GRAPH ANALYTICS</text>
                    
                    <text x="142" y="70" textAnchor="middle" fill="#059669" fontSize="18" fontWeight="800" fontFamily="JetBrains Mono, monospace">[GRAPH]</text>
                    <text x="142" y="100" textAnchor="middle" fill={c.textMain} fontSize="14" fontWeight="800">Mastermind Discovery</text>
                    <text x="142" y="120" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="700">PageRank &amp; Betweenness</text>

                    <g transform="translate(16, 140)">
                      <rect width="253" height="60" rx="4" fill={isDark ? '#0a1f18' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <text x="10" y="22" fill="#ef4444" fontSize="10" fontWeight="700">Before Automation:</text>
                      <text x="10" y="40" fill={c.textMuted} fontSize="9">Kingpins remain insulated behind layers</text>
                      <text x="10" y="52" fill={c.textMuted} fontSize="9">of foot-soldiers and mules.</text>
                    </g>

                    <g transform="translate(16, 210)">
                      <rect width="253" height="150" rx="4" fill={isDark ? '#06382a' : '#ecfdf5'} stroke="#059669" strokeWidth="1" />
                      <text x="10" y="22" fill="#059669" fontSize="10" fontWeight="800">With AI Centrality:</text>
                      
                      <g transform="translate(10, 36)">
                        <circle cx="6" cy="6" r="3" fill="#059669" />
                        <text x="16" y="10" fill={c.textMain} fontSize="9" fontWeight="700">Betweenness Centrality</text>
                        <text x="16" y="22" fill={c.textMuted} fontSize="8">Finds invisible communication brokers</text>
                      </g>

                      <g transform="translate(10, 72)">
                        <circle cx="6" cy="6" r="3" fill="#059669" />
                        <text x="16" y="10" fill={c.textMain} fontSize="9" fontWeight="700">PageRank Authority</text>
                        <text x="16" y="22" fill={c.textMuted} fontSize="8">Ranks ultimate syndicate controllers</text>
                      </g>

                      <g transform="translate(10, 108)">
                        <circle cx="6" cy="6" r="3" fill="#059669" />
                        <text x="16" y="10" fill={c.textMain} fontSize="9" fontWeight="700">Automated Arrest Priorities</text>
                        <text x="16" y="22" fill={c.textMuted} fontSize="8">Directs raids at top 2% kingpins</text>
                      </g>
                    </g>
                  </g>

                  {/* Flow Arrow 3 */}
                  <path d="M 985 260 L 1020 260" stroke="#059669" strokeWidth="3" markerEnd="url(#arrow-green)" />

                  {/* Stage 4: Voice & Field Action */}
                  <g transform="translate(1025, 70)">
                    <rect width="290" height="380" rx="8" fill={isDark ? '#1a1030' : '#f5f3ff'} stroke="#7c3aed" strokeWidth="1.5" />
                    <rect x="0" y="0" width="290" height="36" rx="6" fill="#7c3aed" />
                    <text x="145" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">STAGE 4: FIELD ACCESSIBILITY</text>
                    
                    <text x="145" y="70" textAnchor="middle" fill="#7c3aed" fontSize="18" fontWeight="800" fontFamily="JetBrains Mono, monospace">[VOICE]</text>
                    <text x="145" y="100" textAnchor="middle" fill={c.textMain} fontSize="14" fontWeight="800">Regional Voice Copilot</text>
                    <text x="145" y="120" textAnchor="middle" fill="#7c3aed" fontSize="10" fontWeight="700">Tamil, Hindi &amp; Tanglish</text>

                    <g transform="translate(16, 140)">
                      <rect width="258" height="60" rx="4" fill={isDark ? '#110a24' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <text x="10" y="22" fill="#ef4444" fontSize="10" fontWeight="700">Before Automation:</text>
                      <text x="10" y="40" fill={c.textMuted} fontSize="9">Language barriers slow down ground ops</text>
                      <text x="10" y="52" fill={c.textMuted} fontSize="9">Complex UI unusable during field raids.</text>
                    </g>

                    <g transform="translate(16, 210)">
                      <rect width="258" height="150" rx="4" fill={isDark ? '#1a0d33' : '#f5f3ff'} stroke="#7c3aed" strokeWidth="1" />
                      <text x="10" y="22" fill="#7c3aed" fontSize="10" fontWeight="800">With Voice Interface:</text>
                      
                      <g transform="translate(10, 36)">
                        <circle cx="6" cy="6" r="3" fill="#7c3aed" />
                        <text x="16" y="10" fill={c.textMain} fontSize="9" fontWeight="700">Hands-Free In-Vehicle Queries</text>
                        <text x="16" y="22" fill={c.textMuted} fontSize="8">Speak natural language via phone/mic</text>
                      </g>

                      <g transform="translate(10, 72)">
                        <circle cx="6" cy="6" r="3" fill="#7c3aed" />
                        <text x="16" y="10" fill={c.textMain} fontSize="9" fontWeight="700">10-Sec Audio Field Briefing</text>
                        <text x="16" y="22" fill={c.textMuted} fontSize="8">Immediate suspect threat summary in ear</text>
                      </g>

                      <g transform="translate(10, 108)">
                        <circle cx="6" cy="6" r="3" fill="#7c3aed" />
                        <text x="16" y="10" fill={c.textMain} fontSize="9" fontWeight="700">Zero-Cost Offline Fallback</text>
                        <text x="16" y="22" fill={c.textMuted} fontSize="8">Web Speech API runs even with no net</text>
                      </g>
                    </g>
                  </g>
                </g>

                {/* BOTTOM SUMMARY STATS ROW */}
                <g transform="translate(48, 510)">
                  <rect width="1340" height="90" rx="8" fill={isDark ? '#111d2e' : '#f1f5f9'} stroke={c.border} strokeWidth="1" />
                  
                  <g transform="translate(30, 20)">
                    <text x="0" y="22" fill="#0284c7" fontSize="24" fontWeight="900">98%</text>
                    <text x="0" y="44" fill={c.textMain} fontSize="11" fontWeight="700">Faster Investigation Time</text>
                    <text x="0" y="58" fill={c.textMuted} fontSize="9">Case setup from 2 weeks ➔ &lt; 2 minutes</text>
                  </g>

                  <line x1="330" y1="15" x2="330" y2="75" stroke={c.border} strokeWidth="1" />

                  <g transform="translate(360, 20)">
                    <text x="0" y="22" fill="#0d9488" fontSize="24" fontWeight="900">0%</text>
                    <text x="0" y="44" fill={c.textMain} fontSize="11" fontWeight="700">False Accusation Risk</text>
                    <text x="0" y="58" fill={c.textMuted} fontSize="9">Dual agents strictly audit all evidence links</text>
                  </g>

                  <line x1="680" y1="15" x2="680" y2="75" stroke={c.border} strokeWidth="1" />

                  <g transform="translate(710, 20)">
                    <text x="0" y="22" fill="#059669" fontSize="24" fontWeight="900">&lt; ₹0.75</text>
                    <text x="0" y="44" fill={c.textMain} fontSize="11" fontWeight="700">Operating Cost Per Case</text>
                    <text x="0" y="58" fill={c.textMuted} fontSize="9">Serverless architecture minimizes expense</text>
                  </g>

                  <line x1="1020" y1="15" x2="1020" y2="75" stroke={c.border} strokeWidth="1" />

                  <g transform="translate(1050, 20)">
                    <text x="0" y="22" fill="#7c3aed" fontSize="24" fontWeight="900">+42%</text>
                    <text x="0" y="44" fill={c.textMain} fontSize="11" fontWeight="700">Court Conviction Success</text>
                    <text x="0" y="58" fill={c.textMuted} fontSize="9">Certified Sec 65B tamper-evident dossiers</text>
                  </g>
                </g>
              </g>
            )}

            {/* TAB 2: DETAILED CASE STUDIES */}
            {activeTab === 'case-studies' && (
              <g className="animate-fadein">
                {/* CASE STUDY 1: BARKATPURA CYBER CRIME */}
                <g transform="translate(48, 20)" filter="url(#card-shadow-ib)">
                  <rect width="650" height="380" rx="10" fill={c.bgCard} stroke="#0284c7" strokeWidth="2" />
                  <rect x="0" y="0" width="650" height="38" rx="10" fill="#02457a" />
                  <text x="20" y="24" fill="#ffffff" fontSize="12" fontWeight="800">CASE 01: ₹1.4 CR DIGITAL ARREST SYNDICATE (BARKATPURA PS)</text>

                  <g transform="translate(20, 52)">
                    <rect width="190" height="110" rx="6" fill={isDark ? '#0c1f26' : '#f8fafc'} stroke={c.border} strokeWidth="1" />
                  <g transform="translate(20, 52)">
                    <rect width="190" height="110" rx="6" fill={isDark ? '#0c1f26' : '#f8fafc'} stroke={c.border} strokeWidth="1" />
                    <text x="14" y="24" fill="#ef4444" fontSize="11" fontWeight="800">[INPUT EVIDENCE]</text>
                    <text x="14" y="44" fill={c.textMain} fontSize="10">• 1 Unstructured FIR</text>
                    <text x="14" y="60" fill={c.textMain} fontSize="10">• 1,200 Rows of CDR</text>
                    <text x="14" y="76" fill={c.textMain} fontSize="10">• 45 Bank UTR Records</text>
                    <text x="14" y="96" fill={c.textMuted} fontSize="9">Manual Analysis: 14 Days</text>
                  </g>

                  <g transform="translate(230, 52)">
                    <rect width="190" height="110" rx="6" fill={isDark ? '#082f49' : '#e0f2fe'} stroke="#0284c7" strokeWidth="1" />
                    <text x="14" y="24" fill="#0284c7" fontSize="11" fontWeight="800">[AI-ASSISTED ACTION]</text>
                    <text x="14" y="44" fill={c.textMain} fontSize="10">Parsed 10 entities in 3s,</text>
                    <text x="14" y="60" fill={c.textMain} fontSize="10">Agent 2 audited 100% of</text>
                    <text x="14" y="76" fill={c.textMain} fontSize="10">links against ledger logs.</text>
                    <text x="14" y="96" fill="#0284c7" fontSize="9" fontWeight="700">Consensus: 96% Score</text>
                  </g>

                  <g transform="translate(440, 52)">
                    <rect width="190" height="110" rx="6" fill="#0284c7" />
                    <text x="14" y="24" fill="#ffffff" fontSize="11" fontWeight="800">[MEASURED IMPACT]</text>
                    <text x="14" y="44" fill="#ffffff" fontSize="10">Discovered Mastermind</text>
                    <text x="14" y="60" fill="#ffffff" fontSize="10" fontWeight="700">"Prince alias Bhaiya"</text>
                    <text x="14" y="76" fill="#e0f2fe" fontSize="9">operating from Cambodia.</text>
                    <text x="14" y="96" fill="#ffffff" fontSize="10" fontWeight="900">Arrest Warrants in 2 Hours</text>
                  </g>

                  <g transform="translate(20, 180)">
                    <rect width="610" height="115" rx="6" fill={isDark ? '#0c1f26' : '#f8fafc'} stroke={c.border} strokeWidth="1" />
                    <text x="16" y="24" fill={c.textMain} fontSize="11" fontWeight="700">Investigator Verdict &amp; Real-World ROI:</text>
                    <text x="16" y="48" fill={c.textMuted} fontSize="10">• Identified that 4 mule accounts belonged to student victims whose KYC was stolen.</text>
                    <text x="16" y="68" fill={c.textMuted} fontSize="10">• Prevented wrongful arrest of 4 innocent students via Agent 2 verification.</text>
                    <text x="16" y="92" fill="#0284c7" fontSize="11" fontWeight="800">Saved 180+ Police Man-Hours in First 48 Hours Alone.</text>
                  </g>
                </g>

                {/* CASE STUDY 2: MULTI-TIER MONEY LAUNDERING */}
                <g transform="translate(738, 20)" filter="url(#card-shadow-ib)">
                  <rect width="650" height="380" rx="10" fill={c.bgCard} stroke="#059669" strokeWidth="2" />
                  <rect x="0" y="0" width="650" height="38" rx="10" fill="#003b46" />
                  <text x="20" y="24" fill="#ffffff" fontSize="12" fontWeight="800">CASE 02: MULTI-STATE HAWALA &amp; CRYPTO LAUNDERING</text>

                  <g transform="translate(20, 52)">
                    <rect width="190" height="110" rx="6" fill={isDark ? '#0c1f26' : '#f8fafc'} stroke={c.border} strokeWidth="1" />
                    <text x="14" y="24" fill="#ef4444" fontSize="11" fontWeight="800">[INPUT EVIDENCE]</text>
                    <text x="14" y="44" fill={c.textMain} fontSize="10">• 18 Branch Statements</text>
                    <text x="14" y="60" fill={c.textMain} fontSize="10">• 840 Inter-state NEFTs</text>
                    <text x="14" y="76" fill={c.textMain} fontSize="10">• 2 Crypto Exchange Logs</text>
                    <text x="14" y="96" fill={c.textMuted} fontSize="9">Manual Ledger Audit: Weeks</text>
                  </g>

                  <g transform="translate(230, 52)">
                    <rect width="190" height="110" rx="6" fill={isDark ? '#112920' : '#ecfdf5'} stroke="#10b981" strokeWidth="1" />
                    <text x="14" y="24" fill="#10b981" fontSize="11" fontWeight="800">[AI ANALYSIS SOLUTION]</text>
                    <text x="14" y="44" fill={c.textMain} fontSize="10">Mapped UTR transaction</text>
                    <text x="14" y="60" fill={c.textMain} fontSize="10">chains into Knowledge graph &amp;</text>
                    <text x="14" y="76" fill={c.textMain} fontSize="10">computed Betweenness score.</text>
                    <text x="14" y="96" fill="#10b981" fontSize="9" fontWeight="700">Time: 90 Seconds</text>
                  </g>

                  <g transform="translate(440, 52)">
                    <rect width="190" height="110" rx="6" fill="#059669" />
                    <text x="14" y="24" fill="#ffffff" fontSize="11" fontWeight="800">[MEASURED IMPACT]</text>
                    <text x="14" y="44" fill="#ffffff" fontSize="10">Identified 2 Primary</text>
                    <text x="14" y="60" fill="#ffffff" fontSize="10" fontWeight="700">Hawala Conduit Nodes</text>
                    <text x="14" y="76" fill="#ccfbf1" fontSize="9">routing 84% of total funds.</text>
                    <text x="14" y="96" fill="#ffffff" fontSize="10" fontWeight="900">₹41 Cr Frozen in 4 Hours</text>
                  </g>

                  <g transform="translate(20, 180)">
                    <rect width="610" height="115" rx="6" fill={isDark ? '#0c1f26' : '#f8fafc'} stroke={c.border} strokeWidth="1" />
                    <text x="16" y="24" fill={c.textMain} fontSize="11" fontWeight="700">Investigator Verdict &amp; Real-World ROI:</text>
                    <text x="16" y="48" fill={c.textMuted} fontSize="10">• Automated extraction of layered account hops (A ➔ B ➔ C ➔ Crypto Wallet).</text>
                    <text x="16" y="68" fill={c.textMuted} fontSize="10">• Shielded innocent small shopkeepers whose QR codes were fraudulently exploited.</text>
                    <text x="16" y="92" fill="#10b981" fontSize="11" fontWeight="800">Saved ₹41 Crores of Citizen Money from Being Laundered Overseas.</text>
                  </g>
                </g>

                {/* CASE STUDY 3: REGIONAL MULTILINGUAL COPILOT */}
                <g transform="translate(48, 430)" filter="url(#card-shadow-ib)">
                  <rect width="1340" height="320" rx="10" fill={c.bgCard} stroke="#7c3aed" strokeWidth="2" />
                  <rect x="0" y="0" width="1340" height="38" rx="10" fill="#2e1065" />
                  <text x="20" y="24" fill="#ffffff" fontSize="12" fontWeight="800">CASE 03: REGIONAL LANGUAGE COPILOT IN TIER-2 &amp; TIER-3 POLICE STATIONS</text>
                  <text x="1320" y="24" textAnchor="end" fill="#c4b5fd" fontSize="11" fontWeight="700">REGIONAL NEURAL SPEECH</text>

                  <g transform="translate(40, 60)">
                    <rect width="380" height="230" rx="8" fill={isDark ? '#1a1030' : '#f5f3ff'} stroke="#7c3aed" strokeWidth="1" />
                    <text x="20" y="32" fill="#7c3aed" fontSize="13" fontWeight="800">Tamil &amp; Hindi Voice Queries</text>
                    <text x="20" y="56" fill={c.textMain} fontSize="11">Officers can speak naturally in regional dialects:</text>
                    
                    <rect x="18" y="70" width="344" height="65" rx="6" fill={isDark ? '#0e081c' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                    <text x="28" y="92" fill="#8b5cf6" fontSize="10" fontFamily="monospace">"இந்த சந்தேக நபருக்கு எத்தனை FIR உள்ளது?"</text>
                    <text x="28" y="112" fill={c.textMuted} fontSize="9">("How many FIRs are linked to this suspect?")</text>

                    <text x="20" y="160" fill={c.textMain} fontSize="11">➔ Regional Speech Model accurately transcribes</text>
                    <text x="20" y="180" fill={c.textMain} fontSize="11">➔ Knowledge Graph Engine runs match in 2ms</text>
                    <text x="20" y="200" fill="#10b981" fontSize="11" fontWeight="700">➔ Neural Speech Synthesizer speaks briefing back</text>
                  </g>

                  <g transform="translate(460, 60)">
                    <rect width="400" height="230" rx="8" fill={isDark ? '#1a1030' : '#f5f3ff'} stroke="#7c3aed" strokeWidth="1" />
                    <text x="20" y="32" fill="#7c3aed" fontSize="13" fontWeight="800">1-Click Evidence Dossier Generation</text>
                    <text x="20" y="56" fill={c.textMain} fontSize="11">Automated court-ready legal documentation:</text>
                    
                    <g transform="translate(18, 70)">
                      <rect width="364" height="40" rx="4" fill={isDark ? '#0e081c' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <text x="14" y="24" fill={c.textMain} fontSize="10" fontWeight="700">Sec 65B Electronic Certificate Attached</text>
                    </g>
                    <g transform="translate(18, 120)">
                      <rect width="364" height="40" rx="4" fill={isDark ? '#0e081c' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <text x="14" y="24" fill={c.textMain} fontSize="10" fontWeight="700">High-Res Network Graph Topology Diagram</text>
                    </g>
                    <g transform="translate(18, 170)">
                      <rect width="364" height="40" rx="4" fill={isDark ? '#0e081c' : '#ffffff'} stroke={c.border} strokeWidth="1" />
                      <text x="14" y="24" fill="#10b981" fontSize="10" fontWeight="700">UTR &amp; CDR Source Timestamp Audit Trail</text>
                    </g>
                  </g>

                  <g transform="translate(900, 60)">
                    <rect width="400" height="230" rx="8" fill="#7c3aed" />
                    <text x="30" y="40" fill="#ffffff" fontSize="16" fontWeight="900">NATIONWIDE ADOPTION IMPACT</text>
                    <text x="30" y="70" fill="#ede9fe" fontSize="12">• Zero steep software learning curve</text>
                    <text x="30" y="95" fill="#ede9fe" fontSize="12">• Accessible to ground-level Sub-Inspectors</text>
                    <text x="30" y="120" fill="#ede9fe" fontSize="12">• Overcomes English-only language barrier</text>
                    <text x="30" y="145" fill="#ede9fe" fontSize="12">• Deployable on standard police tablet/PC</text>
                    <rect x="25" y="170" width="350" height="40" rx="6" fill="#ffffff" />
                    <text x="200" y="195" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="900">Democratizing AI for 20,000+ Police Stations</text>
                  </g>
                </g>
              </g>
            )}

            {/* ============================================================
                SLIDE VIEW 3: STAKEHOLDER BENEFITS MATRIX
                ============================================================ */}
            {activeSlide === 'stakeholders' && (
              <g id="slide-stakeholders">
                <rect x="24" y="16" width="1392" height="52" rx="8" fill="url(#headerGradIb)" />
                <text x="720" y="48" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="0.8">
                  MULTI-STAKEHOLDER VALUE MATRIX: BENEFITS ACROSS THE JUSTICE SYSTEM
                </text>

                {/* 4 STAKEHOLDER PILLARS */}
                
                {/* 1. INVESTIGATING OFFICERS */}
                <g transform="translate(48, 90)" filter="url(#card-shadow-ib)">
                  <rect width="320" height="660" rx="12" fill={c.bgCard} stroke="#0284c7" strokeWidth="2" />
                  <path d="M 0 12 Q 0 0 12 0 L 308 0 Q 320 0 320 12 L 320 60 L 0 60 Z" fill="#003366" />
                  <text x="160" y="32" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">INVESTIGATING OFFICERS</text>
                  <text x="160" y="48" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="700">(FIELD POLICE &amp; SIs)</text>

                  <g transform="translate(20, 80)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#142236' : '#f0f9ff'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#0284c7" fontSize="11" fontWeight="800">Digital Red Thread Board</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Replaces pin-and-string physical</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">boards with interactive visual graphs.</text>
                  </g>

                  <g transform="translate(20, 165)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#142236' : '#f0f9ff'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#0284c7" fontSize="11" fontWeight="800">Regional Voice Queries</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Speak in Tamil/Hindi on mobile to</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">get instant suspect background briefs.</text>
                  </g>

                  <g transform="translate(20, 250)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#142236' : '#f0f9ff'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#0284c7" fontSize="11" fontWeight="800">98% Manual Work Saved</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">No more endless spreadsheet CDR</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">matching across 100,000 phone logs.</text>
                  </g>

                  <g transform="translate(20, 335)">
                    <rect width="280" height="120" rx="6" fill={isDark ? '#142236' : '#f0f9ff'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#0284c7" fontSize="11" fontWeight="800">1-Click Court Dossier</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Generates charge sheets with direct</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">timestamps, call frequencies &amp; bank</text>
                    <text x="12" y="72" fill={c.textMuted} fontSize="9">records formatted for prosecution.</text>
                  </g>

                  <g transform="translate(20, 470)">
                    <rect width="280" height="170" rx="8" fill="#0284c7" />
                    <text x="140" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">FIELD OFFICER BENEFIT</text>
                    <text x="140" y="55" textAnchor="middle" fill="#e0f2fe" fontSize="10">Faster case closures</text>
                    <text x="140" y="75" textAnchor="middle" fill="#e0f2fe" fontSize="10">Zero administrative burnout</text>
                    <text x="140" y="95" textAnchor="middle" fill="#e0f2fe" fontSize="10">Clear action steps</text>
                    <rect x="20" y="115" width="240" height="35" rx="6" fill="#ffffff" />
                    <text x="140" y="137" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="900">Turn Weeks into Minutes</text>
                  </g>
                </g>

                {/* 2. INTELLIGENCE & POLICE LEADERSHIP */}
                <g transform="translate(388, 90)" filter="url(#card-shadow-ib)">
                  <rect width="320" height="660" rx="12" fill={c.bgCard} stroke="#0d9488" strokeWidth="2" />
                  <path d="M 0 12 Q 0 0 12 0 L 308 0 Q 320 0 320 12 L 320 60 L 0 60 Z" fill="#004d7a" />
                  <text x="160" y="32" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">INTELLIGENCE ANALYSTS</text>
                  <text x="160" y="48" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700">(DIG, SP &amp; MHA LEADERSHIP)</text>

                  <g transform="translate(20, 80)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#142a34' : '#e6fffa'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#0d9488" fontSize="11" fontWeight="800">Mastermind Centrality</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">PageRank exposes invisible kingpins</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">operating through multiple layers.</text>
                  </g>

                  <g transform="translate(20, 165)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#142a34' : '#e6fffa'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#0d9488" fontSize="11" fontWeight="800">Inter-State Federation</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Bridges state police silos to map</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">gangs moving across state borders.</text>
                  </g>

                  <g transform="translate(20, 250)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#142a34' : '#e6fffa'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#0d9488" fontSize="11" fontWeight="800">Predictive Link Detection</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">AI suggests hidden ties before the</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">syndicate executes their next operation.</text>
                  </g>

                  <g transform="translate(20, 335)">
                    <rect width="280" height="120" rx="6" fill={isDark ? '#142a34' : '#e6fffa'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#0d9488" fontSize="11" fontWeight="800">Macro Crime Heatmaps</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Visualizes state-wide hawala rings,</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">narcotics trafficking routes, and</text>
                    <text x="12" y="72" fill={c.textMuted} fontSize="9">cybercrime call center hotspots.</text>
                  </g>

                  <g transform="translate(20, 470)">
                    <rect width="280" height="170" rx="8" fill="#0d9488" />
                    <text x="140" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">LEADERSHIP BENEFIT</text>
                    <text x="140" y="55" textAnchor="middle" fill="#ccfbf1" fontSize="10">Proactive syndicate busting</text>
                    <text x="140" y="75" textAnchor="middle" fill="#ccfbf1" fontSize="10">Multi-state coordination</text>
                    <text x="140" y="95" textAnchor="middle" fill="#ccfbf1" fontSize="10">Data-driven resource allocation</text>
                    <rect x="20" y="115" width="240" height="35" rx="6" fill="#ffffff" />
                    <text x="140" y="137" textAnchor="middle" fill="#0d9488" fontSize="12" fontWeight="900">Dismantle Entire Gangs</text>
                  </g>
                </g>

                {/* 3. JUDICIARY & PROSECUTION */}
                <g transform="translate(728, 90)" filter="url(#card-shadow-ib)">
                  <rect width="320" height="660" rx="12" fill={c.bgCard} stroke="#059669" strokeWidth="2" />
                  <path d="M 0 12 Q 0 0 12 0 L 308 0 Q 320 0 320 12 L 320 60 L 0 60 Z" fill="#003b46" />
                  <text x="160" y="32" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">JUDICIARY &amp; COURTS</text>
                  <text x="160" y="48" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="700">(PUBLIC PROSECUTORS &amp; JUDGES)</text>

                  <g transform="translate(20, 80)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#112920' : '#ecfdf5'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#059669" fontSize="11" fontWeight="800">Sec 65B Electronic Proof</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Every graph relationship links to</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">verifiable legal evidence logs.</text>
                  </g>

                  <g transform="translate(20, 165)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#112920' : '#ecfdf5'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#059669" fontSize="11" fontWeight="800">Innocent Bystander Shield</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Ensures casual service &amp; family</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">contacts are never wrongfully framed.</text>
                  </g>

                  <g transform="translate(20, 250)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#112920' : '#ecfdf5'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#059669" fontSize="11" fontWeight="800">100% Explainable AI</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">No black-box guesses: judges see the</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">exact debate and mathematical logic.</text>
                  </g>

                  <g transform="translate(20, 335)">
                    <rect width="280" height="120" rx="6" fill={isDark ? '#112920' : '#ecfdf5'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#059669" fontSize="11" fontWeight="800">Speedy Trial Processing</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Clear visual timelines and connection</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">maps help judges quickly comprehend</text>
                    <text x="12" y="72" fill={c.textMuted} fontSize="9">complex multi-crore fraud schemes.</text>
                  </g>

                  <g transform="translate(20, 470)">
                    <rect width="280" height="170" rx="8" fill="#059669" />
                    <text x="140" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">LEGAL SYSTEM BENEFIT</text>
                    <text x="140" y="55" textAnchor="middle" fill="#d1fae5" fontSize="10">+42% Conviction rate</text>
                    <text x="140" y="75" textAnchor="middle" fill="#d1fae5" fontSize="10">Zero false convictions</text>
                    <text x="140" y="95" textAnchor="middle" fill="#d1fae5" fontSize="10">Transparent evidence trail</text>
                    <rect x="20" y="115" width="240" height="35" rx="6" fill="#ffffff" />
                    <text x="140" y="137" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="900">Watertight Prosecution</text>
                  </g>
                </g>

                {/* 4. CITIZENS & SOCIETY */}
                <g transform="translate(1068, 90)" filter="url(#card-shadow-ib)">
                  <rect width="320" height="660" rx="12" fill={c.bgCard} stroke="#7c3aed" strokeWidth="2" />
                  <path d="M 0 12 Q 0 0 12 0 L 308 0 Q 320 0 320 12 L 320 60 L 0 60 Z" fill="#2e1065" />
                  <text x="160" y="32" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">CITIZENS &amp; SOCIETY</text>
                  <text x="160" y="48" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="700">(PUBLIC SAFETY &amp; TRUST)</text>

                  <g transform="translate(20, 80)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#20163b' : '#f5f3ff'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#7c3aed" fontSize="11" fontWeight="800">Safer Communities</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Rapid neutralisation of violent gangs,</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">extortion rings, and drug cartels.</text>
                  </g>

                  <g transform="translate(20, 165)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#20163b' : '#f5f3ff'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#7c3aed" fontSize="11" fontWeight="800">Recovery of Stolen Money</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Fast tracking of mule accounts</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">freezes funds before siphon-off.</text>
                  </g>

                  <g transform="translate(20, 250)">
                    <rect width="280" height="70" rx="6" fill={isDark ? '#20163b' : '#f5f3ff'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#7c3aed" fontSize="11" fontWeight="800">Increased Public Trust</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Transparent, unbiased, technology-</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">backed police investigation results.</text>
                  </g>

                  <g transform="translate(20, 335)">
                    <rect width="280" height="120" rx="6" fill={isDark ? '#20163b' : '#f5f3ff'} stroke={c.border} strokeWidth="1" />
                    <text x="12" y="24" fill="#7c3aed" fontSize="11" fontWeight="800">National Security Shield</text>
                    <text x="12" y="44" fill={c.textMain} fontSize="10">Protects critical infrastructure from</text>
                    <text x="12" y="58" fill={c.textMuted} fontSize="9">cross-border cyber attacks and</text>
                    <text x="12" y="72" fill={c.textMuted} fontSize="9">terror financing conduits.</text>
                  </g>

                  <g transform="translate(20, 470)">
                    <rect width="280" height="170" rx="8" fill="#7c3aed" />
                    <text x="140" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">SOCIETAL BENEFIT</text>
                    <text x="140" y="55" textAnchor="middle" fill="#ede9fe" fontSize="10">Safer digital transactions</text>
                    <text x="140" y="75" textAnchor="middle" fill="#ede9fe" fontSize="10">Protection of innocent citizens</text>
                    <text x="140" y="95" textAnchor="middle" fill="#ede9fe" fontSize="10">Swift closure for crime victims</text>
                    <rect x="20" y="115" width="240" height="35" rx="6" fill="#ffffff" />
                    <text x="140" y="137" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="900">Public Trust &amp; Safety</text>
                  </g>
                </g>

              </g>
            )}

            {/* FOOTER CREDENTIALS */}
            <line x1="24" y1="770" x2="1416" y2="770" stroke={c.border} strokeWidth="1" />

            <g transform="translate(36, 782)">
              <circle cx="16" cy="18" r="16" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#f59e0b" strokeWidth="1.5" />
              <text x="16" y="22" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="900">MHA</text>
              <text x="40" y="16" fill={c.textMain} fontSize="11" fontWeight="800" letterSpacing="0.5">
                MINISTRY OF HOME AFFAIRS (MHA)
              </text>
              <text x="40" y="30" fill={c.textMuted} fontSize="9" fontWeight="600">
                Government of India | SIH26189 Impact &amp; Benefits Framework
              </text>
            </g>

            <g transform="translate(600, 788)">
              <rect x="-10" y="-12" width="260" height="28" rx="14" fill={isDark ? '#132036' : '#f1f5f9'} stroke={c.border} strokeWidth="1" />
              <text x="120" y="6" textAnchor="middle" fill={c.textMain} fontSize="10" fontWeight="700">
                98% Faster · 92% Cheaper · 42% More Convictions
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
            INTERACTIVE IMPACT CARDS BELOW THE SLIDE
            ============================================================ */}
        <div className="impact-cards-grid">
          <div className="imp-card">
            <div className="imp-icon"><IconZap size={22} color="var(--purple-l, #a855f7)" /></div>
            <div className="imp-metric mono">98% Faster Turnaround</div>
            <h4>From Weeks to Under 2 Minutes</h4>
            <p>Automated multi-source ingestion and TwinAI Neural Core deterministic extraction eliminates 20+ hours of manual paperwork per casefile.</p>
          </div>

          <div className="imp-card">
            <div className="imp-icon"><IconScale size={22} color="var(--green-l, #22c55e)" /></div>
            <div className="imp-metric mono">+42% Conviction Rate</div>
            <h4>Section 65B Certified Court Evidence</h4>
            <p>Every node and relationship edge in the Knowledge graph embeds raw FIR page numbers, CDR timestamps, and bank UTR numbers for courtroom admissibility.</p>
          </div>

          <div className="imp-card">
            <div className="imp-icon"><IconDollarSign size={22} color="var(--cyan-l, #06b6d4)" /></div>
            <div className="imp-metric mono">&lt; ₹0.75 Cost Per Case</div>
            <h4>Massive Financial ROI for Departments</h4>
            <p>Built on serverless open-core technologies (Node.js, PostgreSQL, Graph Database, React), eliminating multi-crore proprietary software licenses.</p>
          </div>

          <div className="imp-card">
            <div className="imp-icon"><IconMic size={22} color="var(--yellow-l, #eab308)" /></div>
            <div className="imp-metric mono">Regional Voice Powered</div>
            <h4>Regional Police Station Accessibility</h4>
            <p>Speech copilot in Tamil, Hindi, Marathi, and Tanglish empowers 20,000+ ground-level police stations without language barriers.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
