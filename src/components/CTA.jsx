import React, { useState } from 'react'
import './CTA.css'

const CTA = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSent(true)
    }
  }

  return (
    <section className="cta" id="contact">
      <div className="cta-inner">

        {/* Top: network status banner */}
        <div className="cta-status-bar">
          <div className="cta-status-items">
            {[
              { label: 'NODES_MAPPED', val: '247+', color: 'var(--accent-green)' },
              { label: 'LINKS_VERIFIED', val: '1,840', color: 'var(--accent-purple-light)' },
              { label: 'CONFIDENCE_AVG', val: '94.7%', color: 'var(--accent-yellow)' },
              { label: 'KINGPINS_IDENTified', val: '12', color: 'var(--accent-cyan)' },
            ].map(s => (
              <div className="cta-stat" key={s.label}>
                <span className="mono" style={{ fontSize: '10px', color: '#555' }}>{s.label}</span>
                <span className="mono" style={{ fontSize: '20px', fontWeight: 700, color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA */}
        <div className="cta-main">
          <div className="cta-left">
            <span className="tag tag-green">
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-green)', display:'inline-block', animation:'pulse-dot 2s infinite' }} />
              Enterprise Live Demo Ready
            </span>
            <h2 className="cta-title">
              Ready to Map<br />
              <span className="accent-purple">Criminal Networks?</span>
            </h2>
            <p className="cta-desc">
              Request an enterprise demo, explore API integration, or schedule a technical briefing.
              TwinAI is built for mission-critical intelligence — secure, auditable, and explainable.
            </p>

            <div className="cta-links">
              <a href="#" className="btn btn-primary">
                Request Demo ↗
              </a>
              <a href="#" className="btn btn-outline">
                View on GitHub
              </a>
            </div>
          </div>

          <div className="cta-right">
            <div className="cta-form-box">
              <div className="mono" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em', marginBottom: '20px' }}>
                // REQUEST ACCESS
              </div>
              {sent ? (
                <div className="cta-success">
                  <span className="accent-green" style={{ fontSize: '24px' }}>✓</span>
                  <p className="mono" style={{ fontSize: '13px', color: 'var(--accent-green)' }}>
                    ACCESS_REQUEST_RECEIVED
                  </p>
                  <p style={{ fontSize: '13px', color: '#666' }}>We'll reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="cta-form">
                  <div className="form-field">
                    <label className="mono" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>
                      DESIGNATION
                    </label>
                    <input type="text" placeholder="e.g. Investigating Officer" className="form-input" />
                  </div>
                  <div className="form-field">
                    <label className="mono" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>
                      DEPARTMENT
                    </label>
                    <input type="text" placeholder="e.g. CID, Kerala Police" className="form-input" />
                  </div>
                  <div className="form-field">
                    <label className="mono" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>
                      EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="officer@police.gov.in"
                      className="form-input"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Submit Request ↗
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CTA
