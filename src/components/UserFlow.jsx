import React, { useState } from 'react'
import './UserFlow.css'

const steps = [
  {
    num: '01',
    icon: '📤',
    title: 'Upload',
    subtitle: 'Data Ingestion',
    desc: 'Officer uploads a batch of FIR PDFs and an Excel sheet of Call Records directly to the platform.',
    details: ['Drag & drop interface', 'Multiple file formats', 'Encrypted upload', 'Progress tracking'],
    color: 'var(--accent-purple-light)',
  },
  {
    num: '02',
    icon: '⚙',
    title: 'Processing',
    subtitle: 'TwinAI Analysis',
    desc: 'System shows a real-time loading state while TwinAI agents extract and debate the data to verify connections.',
    details: ['NLP entity extraction', 'Agent 1 proposes links', 'Agent 2 challenges claims', 'Confidence scoring'],
    color: 'var(--accent-yellow)',
  },
  {
    num: '03',
    icon: '📊',
    title: 'Review',
    subtitle: 'Intelligence Summary',
    desc: 'System presents: "Found 15 suspects, 3 major financial links, 1 potential mastermind." Ready for visual analysis.',
    details: ['Entity summary report', 'Risk assessment', 'Kingpin highlighted', 'Exportable insights'],
    color: 'var(--accent-cyan)',
  },
  {
    num: '04',
    icon: '🕸',
    title: 'Visualize',
    subtitle: 'Graph Map',
    desc: 'Officer clicks "Open Graph Map". The screen shows the full digital criminal network — interactive and explorable.',
    details: ['Interactive node graph', 'Filter by date/type', 'Cluster detection', 'Timeline view'],
    color: 'var(--accent-green)',
  },
  {
    num: '05',
    icon: '⚡',
    title: 'Action',
    subtitle: 'Evidence Deep-Dive',
    desc: 'Officer clicks on a connection line to see exact proof: "Transferred Rs.50,000 on Oct 12 via HDFC → SBI."',
    details: ['Source-linked evidence', 'Transaction traces', 'Chat query interface', 'Case report export'],
    color: 'var(--accent-orange)',
  },
]

const accent_orange = 'var(--accent-orange)'

const UserFlow = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="userflow" id="flow">
      <div className="userflow-inner">

        <div className="userflow-header">
          <div className="section-label">// 05 — User Flow</div>
          <h2 className="userflow-title">
            From Raw Data to <span className="accent-green">Actionable Intel</span><br />
            in Five Steps
          </h2>
          <p className="userflow-subtitle">
            A streamlined investigation workflow designed for speed and precision.
          </p>
        </div>

        {/* Horizontal timeline */}
        <div className="flow-timeline">
          {steps.map((s, i) => (
            <React.Fragment key={s.num}>
              <div
                className={`flow-step ${activeStep === i ? 'active' : ''} ${activeStep > i ? 'done' : ''}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="flow-step-num mono" style={{ color: activeStep === i ? s.color : undefined }}>{s.num}</div>
                <div className="flow-step-circle" style={{ borderColor: activeStep >= i ? s.color : undefined, background: activeStep > i ? s.color : activeStep === i ? `${s.color}22` : undefined }}>
                  {activeStep > i ? '✓' : s.icon}
                </div>
                <div className="flow-step-label">{s.title}</div>
              </div>
              {i < steps.length - 1 && (
                <div className={`flow-connector ${activeStep > i ? 'done' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step detail */}
        <div className="flow-detail">
          <div className="flow-detail-left">
            <div className="flow-detail-num mono" style={{ color: steps[activeStep].color }}>
              STEP_{steps[activeStep].num}
            </div>
            <h3 className="flow-detail-title">{steps[activeStep].title}</h3>
            <p className="flow-detail-subtitle mono" style={{ color: steps[activeStep].color }}>
              {steps[activeStep].subtitle}
            </p>
            <p className="flow-detail-desc">{steps[activeStep].desc}</p>
          </div>
          <div className="flow-detail-right">
            <div className="mono" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em', marginBottom: '16px' }}>
              WHAT HAPPENS
            </div>
            {steps[activeStep].details.map((d, i) => (
              <div className="flow-detail-item" key={d}>
                <span className="flow-detail-item-num mono" style={{ color: steps[activeStep].color }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontSize: '14px', color: '#aaa' }}>{d}</span>
              </div>
            ))}
            <div className="flow-nav">
              <button
                className="flow-nav-btn"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
              >
                ← Prev
              </button>
              <button
                className="flow-nav-btn flow-nav-btn--next"
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                style={{ borderColor: steps[activeStep].color, color: steps[activeStep].color }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default UserFlow
