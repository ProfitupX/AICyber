import React from 'react'
import './MarqueeBar.css'

const items = [
  'FIR ANALYSIS', 'CALL DETAIL RECORDS', 'BANK TRANSACTIONS', 'ENTITY EXTRACTION',
  'GRAPH ANALYTICS', 'KINGPIN DETECTION', 'NLP PROCESSING', 'CONFIDENCE SCORING',
  'NETWORK MAPPING', 'PATTERN RECOGNITION', 'AI CONSENSUS ENGINE', 'REAL-TIME INSIGHTS',
]

const MarqueeBar = () => {
  return (
    <div className="marquee-bar">
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarqueeBar
