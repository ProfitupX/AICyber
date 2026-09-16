import React from 'react'
import { IconZap, IconScale, IconCrown } from './common/Icons.jsx'
import './StatementBanner.css'

export default function StatementBanner() {
  return (
    <section className="statement-section">
      <div className="statement-container">
        <div className="statement-pill font-mono">
          // THE NATIONAL LAW ENFORCEMENT STANDARD
        </div>
        <h2 className="statement-text font-display">
          WE TURN RAW TELECOM &amp; FINANCIAL CHAOS INTO UNASSAILABLE EVIDENCE —{' '}
          <span className="statement-highlight">FOR INVESTIGATING OFFICERS,</span>{' '}
          SPECIAL OPERATIONS CELLS, AND COMMAND CHIEFS.
        </h2>
        <div className="statement-badges-row">
          <div className="stat-pill">
            <span className="stat-icon"><IconZap size={14} color="var(--yellow-l, #f59e0b)" /></span>
            <span>&lt;2.4s Deep Graph Extraction</span>
          </div>
          <div className="stat-pill">
            <span className="stat-icon"><IconScale size={14} color="var(--cyan-l, #06b6d4)" /></span>
            <span>BSA 2023 Sec 65B Certified Dossiers</span>
          </div>
          <div className="stat-pill">
            <span className="stat-icon"><IconCrown size={14} color="var(--purple-l, #a855f7)" /></span>
            <span>Mathematical Betweenness Centrality</span>
          </div>
        </div>
      </div>
    </section>
  )
}
