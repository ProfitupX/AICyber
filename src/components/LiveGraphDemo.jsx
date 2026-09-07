import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './LiveGraphDemo.css'

const DEMO_NODES = [
  { id: 'N1', name: 'Indrani Mukerjea', alias: 'Apex Target', role: 'KINGPIN', risk: 'CRITICAL', score: 98, x: 50, y: 45, r: 24, color: '#f59e0b' },
  { id: 'N2', name: 'Shyamvar Rai', alias: 'Driver / Transport', role: 'EXECUTOR', risk: 'HIGH', score: 88, x: 28, y: 65, r: 16, color: '#ef4444' },
  { id: 'N3', name: 'Sanjeev Khanna', alias: 'Ex-Husband', role: 'CO-CONSPIRATOR', risk: 'HIGH', score: 84, x: 72, y: 65, r: 16, color: '#ef4444' },
  { id: 'N4', name: 'Peter Mukerjea', alias: 'Media Exec', role: 'FINANCIER', risk: 'HIGH', score: 82, x: 50, y: 18, r: 16, color: '#8b5cf6' },
  { id: 'N5', name: 'Sheena Bora', alias: 'Victim (Leaf Node)', role: 'VICTIM', risk: 'NONE', score: 5, x: 22, y: 30, r: 14, color: '#10b981' },
  { id: 'N6', name: 'Hawala Mule Acc #981', alias: 'Layered Bank', role: 'FINANCIAL', risk: 'CRITICAL', score: 95, x: 78, y: 25, r: 15, color: '#00f0ff' },
]

const DEMO_EDGES = [
  { from: 'N1', to: 'N2', label: '15 Encrypted Calls', type: 'call' },
  { from: 'N1', to: 'N3', label: 'Flight & Hotel Logistics', type: 'travel' },
  { from: 'N1', to: 'N4', label: 'Marital & Trust Conduit', type: 'financial' },
  { from: 'N1', to: 'N5', label: 'Targeted Disappearance', type: 'victim' },
  { from: 'N4', to: 'N6', label: '₹85L Wire Transfer', type: 'financial' },
  { from: 'N2', to: 'N3', label: 'Co-Presence at Worli', type: 'location' }
]

export default function LiveGraphDemo() {
  const [selectedNode, setSelectedNode] = useState(DEMO_NODES[0])
  const [filter, setFilter] = useState('ALL')

  const filteredNodes = DEMO_NODES.filter(n => {
    if (filter === 'KINGPINS') return n.role === 'KINGPIN'
    if (filter === 'FINANCIAL') return n.role === 'FINANCIAL' || n.role === 'FINANCIER'
    if (filter === 'VICTIMS') return n.role === 'VICTIM'
    return true
  })

  return (
    <section className="live-graph-section" id="live-graph">
      <div className="live-graph-container">
        {/* Section Header */}
        <div className="live-graph-header">
          <div className="live-graph-badge font-mono">
            // INTERACTIVE GRAPH ENGINE
          </div>
          <h2 className="live-graph-title font-display">
            Live Syndicate Topology <span className="bento-star">✦</span> Simulator
          </h2>
          <p className="live-graph-subtitle">
            Click any node below to inspect real-time Betweenness Centrality, cross-jurisdiction linkages, and evidence audit trails.
          </p>
        </div>

        {/* Interactive Console Shell */}
        <div className="graph-console-card glass-card">
          {/* Top Console Controls */}
          <div className="console-top-bar">
            <div className="console-left">
              <span className="console-dot dot-red" />
              <span className="console-dot dot-yellow" />
              <span className="console-dot dot-green" />
              <span className="console-title font-mono">TWINAI_GDS_EXPLORER // CASE-2012-MUM-089</span>
            </div>
            <div className="console-filters">
              {['ALL', 'KINGPINS', 'FINANCIAL', 'VICTIMS'].map(f => (
                <button
                  key={f}
                  className={`filter-pill font-mono ${filter === f ? 'active-filter' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Graph Stage & Inspector Grid */}
          <div className="console-content-grid">
            {/* SVG Interactive Canvas */}
            <div className="svg-canvas-wrap">
              <svg className="network-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Edges */}
                {DEMO_EDGES.map((edge, i) => {
                  const source = DEMO_NODES.find(n => n.id === edge.from)
                  const target = DEMO_NODES.find(n => n.id === edge.to)
                  if (!source || !target) return null
                  const isHighlighted = selectedNode.id === source.id || selectedNode.id === target.id
                  return (
                    <line
                      key={i}
                      x1={`${source.x}%`}
                      y1={`${source.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke={isHighlighted ? '#00f0ff' : 'rgba(255,255,255,0.12)'}
                      strokeWidth={isHighlighted ? '0.8' : '0.4'}
                      strokeDasharray={edge.type === 'call' ? '1,1' : 'none'}
                    />
                  )
                })}

                {/* Nodes */}
                {filteredNodes.map(node => {
                  const isSelected = selectedNode.id === node.id
                  return (
                    <g 
                      key={node.id} 
                      className="svg-node-group" 
                      onClick={() => setSelectedNode(node)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Pulse Circle for Kingpin */}
                      {node.role === 'KINGPIN' && (
                        <circle
                          cx={`${node.x}%`}
                          cy={`${node.y}%`}
                          r="6"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="0.4"
                          opacity="0.6"
                          className="animate-pulse-glow"
                        />
                      )}
                      <circle
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r={isSelected ? '4.5' : '3.5'}
                        fill={node.color}
                        stroke={isSelected ? '#ffffff' : 'rgba(0,0,0,0.6)'}
                        strokeWidth={isSelected ? '0.8' : '0.4'}
                      />
                      <text
                        x={`${node.x}%`}
                        y={`${node.y + 6}%`}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="2.6"
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                        fontWeight="600"
                      >
                        {node.name.split(' ')[0]}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Inspector Panel */}
            <div className="node-inspector-panel">
              <div className="inspector-header">
                <span className="badge badge-cyan font-mono">{selectedNode.role}</span>
                <span className="inspector-risk font-mono" style={{ color: selectedNode.score > 80 ? '#f87171' : '#34d399' }}>
                  RISK: {selectedNode.score}%
                </span>
              </div>
              <h3 className="inspector-name font-display">{selectedNode.name}</h3>
              <div className="inspector-alias font-mono">Alias: {selectedNode.alias}</div>

              <div className="inspector-stats-grid">
                <div className="i-stat">
                  <div className="i-val font-mono" style={{ color: '#fbbf24' }}>
                    {selectedNode.role === 'KINGPIN' ? '0.98 Peak' : selectedNode.role === 'VICTIM' ? '0.05 Leaf' : '0.64 Mid'}
                  </div>
                  <div className="i-lbl">Betweenness Score</div>
                </div>
                <div className="i-stat">
                  <div className="i-val font-mono" style={{ color: '#00f0ff' }}>
                    {selectedNode.role === 'KINGPIN' ? '18 Nodes' : '4 Nodes'}
                  </div>
                  <div className="i-lbl">Co-Presence Links</div>
                </div>
              </div>

              <div className="inspector-rationale font-mono">
                // TWINAI CONSENSUS REASONING:<br />
                {selectedNode.role === 'KINGPIN' 
                  ? 'Apex mastermind orchestrating driver movements, travel tickets, and burner communications.'
                  : selectedNode.role === 'VICTIM'
                  ? 'Terminal leaf node. Incorrectly labeled as suspect by standard keyword algorithms.'
                  : 'Key logistical conduit connecting local execution with apex orchestrator.'}
              </div>

              <Link to="/dashboard/graph" className="btn-pill-white btn-sm inspector-open-btn">
                Explore Full 50K Node Graph →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
