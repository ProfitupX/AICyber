import React, { useState, useRef, useEffect } from 'react'
import { askCopilot } from '../services/gemini.js'
import { fetchSuspects, fetchCases } from '../services/supabase.js'
import './Chat.css'

const SUGGESTED = [
  'Who is the primary kingpin identified across active syndicates?',
  'Analyze financial links and hawala conduits for Priya Mehta',
  'Show all suspects with active links in Mumbai & Pune',
  'What are the statutory charges under BNS 2023 for Operation Sahakar?',
  'List high-frequency burner phone communication patterns',
  'Draft an intelligence briefing summary for the Superintendent of Police',
]

const INITIAL_GREETING = [
  {
    id: 1,
    role: 'system',
    text: '🛡️ **TwinAI Live Copilot Online**. Connected to Supabase PostgreSQL & Google Gemini Flash. Ready to assist with cross-jurisdiction entity extraction, CDR timeline analysis, and statutory framing under Bharatiya Nyaya Sanhita (BNS) & BSA 2023.',
    time: 'System Live'
  }
]

function formatMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/### (.*?)\n/g, '<h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin:8px 0 4px 0;">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(124,58,237,0.1);padding:2px 4px;border-radius:4px;color:var(--purple-l);font-family:monospace;font-size:11px;">$1</code>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
    .replace(/•/g, '&bull;')
}

export default function Chat() {
  const [messages, setMessages] = useState(INITIAL_GREETING)
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const [suspects, setSuspects] = useState([])
  const [cases, setCases]       = useState([])
  const [selectedCase, setSelectedCase] = useState('ALL')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    async function loadContext() {
      const sRes = await fetchSuspects()
      const cRes = await fetchCases()
      setSuspects(sRes.data || [])
      setCases(cRes.data || [])
    }
    loadContext()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async (text) => {
    if (!text.trim() || typing) return
    const queryText = text.trim()
    const userMsg = { id: Date.now(), role: 'user', text: queryText, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
    
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    try {
      const activeCasesContext = selectedCase === 'ALL' 
        ? cases 
        : cases.filter(c => c.id === selectedCase || c.title.toLowerCase().includes(selectedCase.toLowerCase()))

      const reply = await askCopilot({
        query: queryText,
        history: messages,
        suspects,
        cases: activeCasesContext
      })

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          caseContext: selectedCase
        }
      ])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          text: `⚠️ Error fetching response: ${err.message}. Please verify Gemini API connectivity.`,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setTyping(false)
    }
  }

  const handleSpeak = (text) => {
    if (!('speechSynthesis' in window)) return
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }
    const cleanText = text.replace(/[*#`_]/g, '')
    const utter = new SpeechSynthesisUtterance(cleanText)
    utter.rate = 1.05
    utter.onend = () => setIsSpeaking(false)
    utter.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utter)
    setIsSpeaking(true)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied response to clipboard for Case Diary / GD Entry!')
  }

  return (
    <div className="chat-layout animate-fadein">
      {/* Left: Chat Console */}
      <div className="chat-main card">
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="brand-icon" style={{ width: '32px', height: '32px', fontSize: '16px' }}>⬡</div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>TwinAI Live Officer Copilot</h3>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--text-3)', marginTop: '2px' }}>
                Engine: Google Gemini Flash · Live Context: {suspects.length} Suspects, {cases.length} Cases
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <select 
              value={selectedCase} 
              onChange={e => setSelectedCase(e.target.value)}
              className="select"
              style={{ fontSize: '11px', padding: '4px 8px', height: '30px' }}
            >
              <option value="ALL">All Active Cases</option>
              {cases.map(c => (
                <option key={c.id} value={c.id}>{c.title} ({c.priority})</option>
              ))}
            </select>
            <span className="pulse-dot pulse-green" />
            <span className="mono" style={{ fontSize: '10px', color: 'var(--green-l)', fontWeight: 700 }}>COPILOT ONLINE</span>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(m => (
            <div key={m.id} className={`chat-msg chat-msg--${m.role}`}>
              <div className="chat-msg-avatar">
                {m.role === 'user' ? 'IO' : m.role === 'ai' ? '⬡' : '//'}
              </div>
              <div className="chat-msg-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="mono" style={{ fontSize: '10px', color: 'var(--text-3)', fontWeight: 600 }}>
                    {m.role === 'user' ? 'INVESTIGATING OFFICER' : 'TWINAI INTELLIGENCE ENGINE'}
                  </span>
                  {m.time && <span className="mono" style={{ fontSize: '9px', color: 'var(--text-3)' }}>{m.time}</span>}
                </div>

                {m.role === 'ai' || m.role === 'system' ? (
                  <div className="chat-msg-text" dangerouslySetInnerHTML={{ __html: formatMarkdown(m.text) }} />
                ) : (
                  <div className="chat-msg-text">{m.text}</div>
                )}

                {m.role === 'ai' && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '6px' }}>
                    <button 
                      onClick={() => handleCopy(m.text)} 
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: '10px', padding: '2px 6px', height: '22px' }}
                    >
                      📋 Copy for GD Entry
                    </button>
                    <button 
                      onClick={() => handleSpeak(m.text)} 
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: '10px', padding: '2px 6px', height: '22px' }}
                    >
                      {isSpeaking ? '🔇 Stop Audio' : '🔊 Audio Briefing'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="chat-msg chat-msg--ai">
              <div className="chat-msg-avatar">⬡</div>
              <div className="chat-msg-content">
                <div className="typing-indicator">
                  <span /><span /><span />
                  <span className="mono" style={{ fontSize: '11px', color: 'var(--purple-l)', marginLeft: '6px', fontWeight: 600 }}>
                    TwinAI Dual-Agent synthesizing live response...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="chat-input-area">
          <div className="chat-suggestions">
            {SUGGESTED.slice(0, 3).map(s => (
              <button key={s} className="btn btn-ghost btn-sm" onClick={() => send(s)} disabled={typing}>
                {s}
              </button>
            ))}
          </div>
          <div className="chat-input-row">
            <input
              className="input chat-input"
              placeholder="Ask TwinAI Copilot... (e.g., 'Who is the financial backer for Raja Bhai in Pune?')"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
              disabled={typing}
            />
            <button className="btn btn-primary" onClick={() => send(input)} disabled={typing || !input.trim()}>
              Send Query ↗
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Context & Shortcuts */}
      <div className="chat-sidebar">
        <div className="card">
          <h3 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-1)' }}>
            🎯 Tactical Prompt Templates
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {SUGGESTED.map(s => (
              <button key={s} className="sq-chip" onClick={() => send(s)} disabled={typing}>
                {s} →
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-1)' }}>
            ⚖️ Statutory Standards Active
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '6px 8px', background: 'var(--bg-card-2)', borderRadius: '6px', borderLeft: '3px solid var(--purple-l)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700 }}>Sec 111 BNS, 2023</div>
              <div style={{ fontSize: '10px', color: 'var(--text-3)' }}>Organized Crime & Syndicate Interdiction</div>
            </div>
            <div style={{ padding: '6px 8px', background: 'var(--bg-card-2)', borderRadius: '6px', borderLeft: '3px solid var(--green-l)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700 }}>Sec 61-63 BSA, 2023</div>
              <div style={{ fontSize: '10px', color: 'var(--text-3)' }}>Electronic Evidence & Graph Admissibility</div>
            </div>
            <div style={{ padding: '6px 8px', background: 'var(--bg-card-2)', borderRadius: '6px', borderLeft: '3px solid var(--cyan-l)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700 }}>PMLA Sec 3 & 4</div>
              <div style={{ fontSize: '10px', color: 'var(--text-3)' }}>Hawala Layering & Asset Freezing</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '10px' }}>⚡ Live Node Intelligence</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: 'var(--text-2)' }}>Active Suspects:</span>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--purple-l)' }}>{suspects.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: 'var(--text-2)' }}>Registered Cases:</span>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--cyan-l)' }}>{cases.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: 'var(--text-2)' }}>AI Engine:</span>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--green-l)' }}>Gemini Flash</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
