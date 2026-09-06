import React from 'react'
import './Validation.css'

export default function Validation() {
  return (
    <section id="research" className="validation-section">
      <div className="val-inner">
        
        <div className="val-header">
          <h2 className="val-title">FEASIBILITY <span>&</span> RESEARCH</h2>
          <p className="val-subtitle mono">// EMPIRICAL RESEARCH & FIELD BENCHMARKS</p>
        </div>

        {/* 1. Real-World Validation / Bathinda Syndicate */}
        <div className="val-case-study card-brutal">
          <div className="case-hdr">
            <div className="case-badge mono">IMPACT & BENEFITS</div>
            <h3 className="case-title">Real-World Validation: Bathinda Syndicate</h3>
            <a href="https://timesofindia.indiatimes.com/india/india-international-breaking-news-today-december-27/liveblog/126194292.cms" target="_blank" rel="noreferrer" className="case-link mono">
              [Source: Times of India, 2025] ↗
            </a>
          </div>
          
          <div className="case-grid">
            <div className="case-box problem-box">
              <div className="cb-icon">⚠️</div>
              <h4 className="cb-title">The Problem</h4>
              <p className="cb-desc">3 separate murders, 12 suspects, spread across 6 states.</p>
            </div>
            
            <div className="case-box gap-box">
              <div className="cb-icon">⏳</div>
              <h4 className="cb-title">The Gap</h4>
              <p className="cb-desc">Manual tracking by agencies took weeks to connect the dots across jurisdictions.</p>
            </div>

            <div className="case-box solution-box">
              <div className="cb-icon">🕸️</div>
              <h4 className="cb-title">Our Solution</h4>
              <p className="cb-desc"><strong>Neo4j</strong> instantly maps multi-state overlapping suspects (like Prince alias Bhaiya) into a single visual network.</p>
            </div>
          </div>
        </div>

        <div className="val-split">
          {/* 2. Feasibility and Viability */}
          <div className="val-feasibility card-brutal">
            <div className="case-badge mono" style={{ background: 'var(--accent-purple)', color: '#fff' }}>FEASIBILITY & VIABILITY</div>
            <h3 className="sub-section-title">Core Technical Approach</h3>
            
            <div className="tech-list">
              <div className="tech-item">
                <div className="tech-name mono">TWIN AI (LLM DEBATE)</div>
                <div className="tech-desc">Academic research applied for zero-hallucination data verification before adding to the graph.</div>
              </div>
              <div className="tech-item">
                <div className="tech-name mono">NEO4J GRAPH ALGORITHMS</div>
                <div className="tech-desc">Centrality Scoring used to auto-detect hidden kingpins and critical communication nodes.</div>
              </div>
              <div className="tech-item">
                <div className="tech-name mono">CUSTOM SPACY NLP</div>
                <div className="tech-desc">Fine-tuned specifically for extracting entities from unstructured Indian legal and FIR jargon.</div>
              </div>
            </div>
          </div>

          {/* 3. Research & IEEE References */}
          <div className="val-research card-brutal">
            <div className="case-badge mono" style={{ background: 'var(--accent-cyan)', color: '#000' }}>RESEARCH & REFERENCES</div>
            <h3 className="sub-section-title">IEEE Core Citations</h3>
            
            <div className="ieee-list">
              <div className="ieee-item">
                <div className="ieee-tag tag-yellow">IEEE Access (2020)</div>
                <h4 className="ieee-title">Deep Reinforcement Learning for Evolving Criminal Networks</h4>
                <p className="ieee-desc mono">→ Supports TwinAI logic & multi-agent debate frameworks for dynamic data.</p>
              </div>
              
              <div className="ieee-item">
                <div className="ieee-tag tag-yellow">IEEE ASONAM (2018)</div>
                <h4 className="ieee-title">Link Prediction in Criminal Networks</h4>
                <p className="ieee-desc mono">→ Provides academic backing for our Graph Algorithms and Centrality scoring models.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
