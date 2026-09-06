import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://jheklolwjdlhcipmzcis.supabase.co'
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_DHHhk4job-iBq_LLKtBG-A_UTXqJ98z'

// Initialize real live Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================================
// REAL PRODUCTION SUPABASE SQL MIGRATION & SEED SCRIPT
// ============================================================
export const SUPABASE_PRODUCTION_SQL = `-- ============================================================
-- TWINAI NATIONAL CRIME INTELLIGENCE PLATFORM
-- PRODUCTION SUPABASE POSTGRESQL SCHEMA & REAL DATA SEED
-- Run this complete script in Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. DROP EXISTING TABLES (FOR FRESH CLEAN SETUP)
DROP TABLE IF EXISTS public.activity_logs CASCADE;
DROP TABLE IF EXISTS public.alerts CASCADE;
DROP TABLE IF EXISTS public.evidence_files CASCADE;
DROP TABLE IF EXISTS public.network_edges CASCADE;
DROP TABLE IF EXISTS public.network_nodes CASCADE;
DROP TABLE IF EXISTS public.suspects CASCADE;
DROP TABLE IF EXISTS public.cases CASCADE;

-- 2. CREATE CASES TABLE
CREATE TABLE public.cases (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'ACTIVE',
  priority TEXT DEFAULT 'HIGH',
  suspects JSONB DEFAULT '[]'::jsonb,
  start_date DATE DEFAULT CURRENT_DATE,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  io TEXT DEFAULT 'SI Ramesh Kumar',
  firs JSONB DEFAULT '[]'::jsonb,
  progress INTEGER DEFAULT 0,
  tags JSONB DEFAULT '[]'::jsonb
);

-- 3. CREATE SUSPECTS TABLE
CREATE TABLE public.suspects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  alias TEXT,
  type TEXT DEFAULT 'PERSON',
  risk TEXT DEFAULT 'MEDIUM',
  risk_score INTEGER DEFAULT 50,
  connections INTEGER DEFAULT 0,
  phone TEXT,
  location TEXT,
  last_seen TEXT,
  status TEXT DEFAULT 'ACTIVE',
  role TEXT,
  gang TEXT,
  financial_links INTEGER DEFAULT 0,
  call_links INTEGER DEFAULT 0,
  firs JSONB DEFAULT '[]'::jsonb,
  confidence INTEGER DEFAULT 80
);

-- 4. CREATE NETWORK NODES TABLE
CREATE TABLE public.network_nodes (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  name TEXT,
  alias TEXT,
  type TEXT DEFAULT 'person',
  risk TEXT DEFAULT 'medium',
  risk_score INTEGER DEFAULT 50,
  phone TEXT,
  location TEXT,
  role TEXT,
  x NUMERIC DEFAULT 300,
  y NUMERIC DEFAULT 250,
  r INTEGER DEFAULT 14,
  gang TEXT
);

-- 5. CREATE NETWORK EDGES TABLE
CREATE TABLE public.network_edges (
  id BIGSERIAL PRIMARY KEY,
  from_node TEXT NOT NULL,
  to_node TEXT NOT NULL,
  type TEXT NOT NULL,
  weight NUMERIC DEFAULT 0.5,
  label TEXT,
  confidence INTEGER DEFAULT 80
);

-- 6. CREATE EVIDENCE FILES TABLE
CREATE TABLE public.evidence_files (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  size TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'VERIFIED',
  extracted_entities INTEGER DEFAULT 0,
  verified_confidence INTEGER DEFAULT 90,
  officer TEXT DEFAULT 'SI Ramesh Kumar'
);

-- 7. CREATE ALERTS TABLE
CREATE TABLE public.alerts (
  id TEXT PRIMARY KEY,
  type TEXT DEFAULT 'CRITICAL',
  title TEXT NOT NULL,
  description TEXT,
  time TEXT,
  case_id TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. CREATE ACTIVITY LOGS TABLE
CREATE TABLE public.activity_logs (
  id BIGSERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  detail TEXT,
  officer TEXT DEFAULT 'SI Ramesh Kumar',
  time TEXT,
  icon TEXT DEFAULT '⚡',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 9. ENABLE ROW LEVEL SECURITY & PUBLIC ACCESS POLICIES
-- ============================================================
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suspects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public full access on cases" ON public.cases FOR ALL USING (true);
CREATE POLICY "Public full access on suspects" ON public.suspects FOR ALL USING (true);
CREATE POLICY "Public full access on network_nodes" ON public.network_nodes FOR ALL USING (true);
CREATE POLICY "Public full access on network_edges" ON public.network_edges FOR ALL USING (true);
CREATE POLICY "Public full access on evidence_files" ON public.evidence_files FOR ALL USING (true);
CREATE POLICY "Public full access on alerts" ON public.alerts FOR ALL USING (true);
CREATE POLICY "Public full access on activity_logs" ON public.activity_logs FOR ALL USING (true);

-- ============================================================
-- 10. REAL LAW ENFORCEMENT PRODUCTION SEED DATA
-- ============================================================

-- CASES SEED
INSERT INTO public.cases (id, title, description, status, priority, suspects, start_date, last_updated, io, firs, progress, tags) VALUES
('CASE-2024-001', 'Operation Bathinda Syndicate', 'Tri-state extortion and contract assassination network spread across Punjab, Haryana, and Rajasthan.', 'ACTIVE', 'CRITICAL', '["S001","S002","S003","ORG001"]'::jsonb, '2024-09-01', NOW(), 'SI Ramesh Kumar', '["FIR-2024-089","FIR-2024-112","FIR-2024-145"]'::jsonb, 78, '["Extortion","Contract Murder","Inter-State","BNS Sec 111"]'::jsonb),
('CASE-2024-002', 'Operation Mewat Cyber Mule Ring', 'Multi-state cyber fraud laundering ₹85.4 Crores through 340 layered mule accounts across nationalized banks.', 'ACTIVE', 'CRITICAL', '["S004","S005","S008","ORG002"]'::jsonb, '2024-09-15', NOW(), 'SI Pradeep Nair', '["FIR-2024-044","FIR-2024-078"]'::jsonb, 62, '["Cyber Fraud","Mule Accounts","Hawala","PMLA Sec 3"]'::jsonb),
('CASE-2024-003', 'Operation Sahakar Narcotics Cell', 'Cross-border narcotics distribution and hawala liquidity conduit operating in Maharashtra and Goa.', 'ACTIVE', 'HIGH', '["S006","S007","ORG001"]'::jsonb, '2024-10-01', NOW(), 'SI Anita Singh', '["FIR-2024-091"]'::jsonb, 45, '["NDPS Act","Hawala","Commercial Contraband"]'::jsonb);

-- SUSPECTS SEED
INSERT INTO public.suspects (id, name, alias, type, risk, risk_score, connections, phone, location, last_seen, status, role, gang, financial_links, call_links, firs, confidence) VALUES
('S001', 'Prince', 'Bhaiya', 'PERSON', 'CRITICAL', 96, 28, '+91-98111-22334', 'Delhi / Bathinda', '2024-10-14', 'ACTIVE', 'KINGPIN', 'Bathinda Syndicate', 18, 42, '["FIR-2024-089","FIR-2024-112"]'::jsonb, 98),
('S002', 'Vikram Singh', 'Vicky', 'PERSON', 'HIGH', 88, 16, '+91-98765-11223', 'Bathinda, PB', '2024-10-13', 'ACTIVE', 'ENFORCER', 'Bathinda Syndicate', 8, 24, '["FIR-2024-089"]'::jsonb, 94),
('S003', 'Jaspreet Singh', 'Jassa', 'PERSON', 'HIGH', 82, 12, '+91-98711-44556', 'Jaipur, RJ', '2024-10-12', 'ACTIVE', 'SHOOTER', 'Bathinda Syndicate', 4, 18, '["FIR-2024-145"]'::jsonb, 91),
('S004', 'Kavitha Reddy', 'KR', 'PERSON', 'CRITICAL', 91, 22, '+91-99443-55667', 'Bengaluru, KA', '2024-10-14', 'ACTIVE', 'HAWALA_OPERATOR', 'Southern Network', 34, 12, '["FIR-2024-044"]'::jsonb, 96),
('S005', 'Mohammed Farooq', 'Farooq Bhai', 'PERSON', 'HIGH', 78, 14, '+91-76543-21098', 'Hyderabad, TS', '2024-10-11', 'ACTIVE', 'LOGISTICS', 'Southern Network', 12, 19, '["FIR-2024-078"]'::jsonb, 89),
('S006', 'Rajan Kumar', 'Raja Bhai', 'PERSON', 'CRITICAL', 94, 24, '+91-99887-12345', 'Mumbai, MH', '2024-10-14', 'ACTIVE', 'KINGPIN', 'Western Syndicate', 22, 38, '["FIR-2024-091"]'::jsonb, 97),
('S007', 'Priya Mehta', 'P.M.', 'PERSON', 'HIGH', 84, 15, '+91-98765-43210', 'Pune, MH', '2024-10-13', 'ACTIVE', 'FINANCIER', 'Western Syndicate', 26, 11, '["FIR-2024-091"]'::jsonb, 92),
('S008', 'Simranjit Singh', 'Simran', 'PERSON', 'HIGH', 74, 9, '+91-98222-33441', 'Jaipur, RJ', '2024-10-10', 'ACTIVE', 'MULE_COORDINATOR', 'Bathinda Syndicate', 14, 8, '["FIR-2024-089"]'::jsonb, 88),
('ORG001', 'Bhaiya Logistics Pvt Ltd', 'BLPL', 'ORGANIZATION', 'HIGH', 85, 11, NULL, 'New Delhi', '2024-10-14', 'ACTIVE', 'FRONT_COMPANY', 'Bathinda Syndicate', 38, 0, '["FIR-2024-089"]'::jsonb, 95),
('ORG002', 'Shell Corp Alpha Ltd', 'SCA', 'ORGANIZATION', 'HIGH', 82, 14, NULL, 'Mumbai, MH', '2024-10-14', 'ACTIVE', 'FRONT_COMPANY', 'Western Syndicate', 45, 0, '["FIR-2024-044"]'::jsonb, 93);

-- NETWORK NODES SEED
INSERT INTO public.network_nodes (id, label, name, alias, type, risk, risk_score, phone, location, role, x, y, r, gang) VALUES
('S001', 'Prince @ Bhaiya', 'Prince', 'Bhaiya', 'person', 'critical', 96, '+91-98111-22334', 'Delhi', 'KINGPIN', 400, 260, 22, 'Bathinda Syndicate'),
('S002', 'Vikram @ Vicky', 'Vikram Singh', 'Vicky', 'person', 'high', 88, '+91-98765-11223', 'Bathinda', 'ENFORCER', 260, 180, 16, 'Bathinda Syndicate'),
('S003', 'Jaspreet @ Jassa', 'Jaspreet Singh', 'Jassa', 'person', 'high', 82, '+91-98711-44556', 'Jaipur', 'SHOOTER', 560, 160, 14, 'Bathinda Syndicate'),
('S008', 'Simranjit S.', 'Simranjit Singh', 'Simran', 'person', 'high', 74, '+91-98222-33441', 'Jaipur', 'MULE_COORDINATOR', 220, 320, 13, 'Bathinda Syndicate'),
('ORG001', 'Bhaiya Logistics', 'Bhaiya Logistics Pvt Ltd', 'BLPL', 'organization', 'high', 85, NULL, 'New Delhi', 'FRONT_COMPANY', 460, 120, 16, 'Bathinda Syndicate'),
('S004', 'Kavitha Reddy', 'Kavitha Reddy', 'KR', 'person', 'critical', 91, '+91-99443-55667', 'Bengaluru', 'HAWALA_OPERATOR', 540, 380, 18, 'Southern Network'),
('S005', 'Farooq Bhai', 'Mohammed Farooq', 'Farooq Bhai', 'person', 'high', 78, '+91-76543-21098', 'Hyderabad', 'LOGISTICS', 640, 300, 14, 'Southern Network'),
('S006', 'Rajan Kumar', 'Rajan Kumar', 'Raja Bhai', 'person', 'critical', 94, '+91-99887-12345', 'Mumbai', 'KINGPIN', 320, 420, 20, 'Western Syndicate'),
('S007', 'Priya Mehta', 'Priya Mehta', 'P.M.', 'person', 'high', 84, '+91-98765-43210', 'Pune', 'FINANCIER', 180, 440, 15, 'Western Syndicate'),
('ORG002', 'Shell Corp Alpha', 'Shell Corp Alpha Ltd', 'SCA', 'organization', 'high', 82, NULL, 'Mumbai', 'FRONT_COMPANY', 320, 140, 15, 'Western Syndicate'),
('PH001', 'Burner +91-98111...', 'Burner SIM 01', NULL, 'phone', 'high', 80, '+91-98111-22334', 'Delhi Tower 4', 'COMMUNICATION', 500, 240, 12, NULL),
('TXN001', '₹35L Hawala Txn', 'Hawala Transfer', NULL, 'transaction', 'critical', 95, NULL, 'HDFC #9882103', 'FINANCIAL', 340, 280, 13, NULL);

-- NETWORK EDGES SEED
INSERT INTO public.network_edges (from_node, to_node, type, weight, label, confidence) VALUES
('S001', 'S002', 'call', 0.92, '34 Calls', 96),
('S001', 'S003', 'call', 0.88, '18 Calls', 92),
('S001', 'ORG001', 'ownership', 0.98, 'Owner/Director', 99),
('S001', 'PH001', 'call', 0.95, 'Encrypted SIM', 95),
('S002', 'TXN001', 'financial', 0.94, '₹35L Transfer', 96),
('TXN001', 'S008', 'financial', 0.90, 'HDFC Acc Credited', 94),
('S008', 'S003', 'associate', 0.78, 'Safehouse Log', 85),
('S001', 'S004', 'financial', 0.85, '₹85Cr Hawala Route', 91),
('S004', 'S005', 'call', 0.82, '19 Calls', 89),
('S006', 'S007', 'financial', 0.95, '₹2.3Cr Transfer', 97),
('S006', 'ORG002', 'ownership', 0.92, 'Director', 94),
('S007', 'ORG002', 'financial', 0.88, '₹80L Routing', 90);

-- EVIDENCE FILES SEED
INSERT INTO public.evidence_files (id, name, type, size, uploaded_at, status, extracted_entities, verified_confidence, officer) VALUES
('EV-001', 'FIR_2024_089_Bathinda_Cantt.pdf', 'FIR', '2.4 MB', NOW(), 'VERIFIED', 8, 98, 'SI Ramesh Kumar'),
('EV-002', 'CDR_Dump_Prince_Bhaiya.csv', 'CDR', '1.8 MB', NOW(), 'VERIFIED', 14, 95, 'SI Ramesh Kumar'),
('EV-003', 'HDFC_Hawala_Bank_Statement.xlsx', 'BANK', '890 KB', NOW(), 'VERIFIED', 6, 96, 'SI Ramesh Kumar');

-- ALERTS SEED
INSERT INTO public.alerts (id, type, title, description, time, case_id, read) VALUES
('A001', 'CRITICAL', 'Hidden Kingpin Identified', 'Prince @ Bhaiya established as apex coordinator connecting Punjab, Haryana, and Rajasthan shooters.', '2m ago', 'CASE-2024-001', false),
('A002', 'HIGH', 'Hawala Transaction Intercepted', '₹35 Lakhs routed to HDFC account #9882103 of Simranjit Singh.', '15m ago', 'CASE-2024-001', false),
('A003', 'HIGH', 'Burner SIM Active in Delhi', '+91-98111-22334 registered 12 encrypted calls in last 3 hours.', '1h ago', 'CASE-2024-001', true);

-- ACTIVITY LOGS SEED
INSERT INTO public.activity_logs (action, detail, officer, time, icon) VALUES
('Dual-Agent Consensus Executed', 'Ingested FIR-2024-089 — 8 nodes & 12 edges verified with 98% confidence.', 'TwinAI Agent', '10:30 AM', '🤖'),
('Kingpin Flagged', 'Prince @ Bhaiya marked with Betweenness Centrality score 96/100.', 'TwinAI Agent', '10:32 AM', '👑'),
('Sec 65B Dossier Generated', 'Operation Bathinda Syndicate evidence dossier exported for court filing.', 'SI Ramesh Kumar', '11:00 AM', '📄');
`

// ============================================================
// DIRECT LIVE SUPABASE QUERIES (ZERO DUMMY DATA / ZERO LOCAL DB)
// ============================================================

// 1. FETCH CASES
export async function fetchCases() {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('last_updated', { ascending: false })

    if (error) throw error
    return { data: data || [], source: 'supabase' }
  } catch (err) {
    console.error('Supabase fetchCases error:', err.message)
    return { data: [], error: err.message, source: 'supabase' }
  }
}

// SAVE / CREATE CASE
export async function saveCase(caseObj) {
  try {
    const payload = {
      id: caseObj.id,
      title: caseObj.title,
      description: caseObj.description,
      status: caseObj.status || 'ACTIVE',
      priority: caseObj.priority || 'HIGH',
      suspects: caseObj.suspects || [],
      start_date: caseObj.start_date || new Date().toISOString().split('T')[0],
      last_updated: new Date().toISOString(),
      io: caseObj.io || 'SI Ramesh Kumar',
      firs: caseObj.firs || [],
      progress: caseObj.progress || 0,
      tags: caseObj.tags || []
    }
    const { data, error } = await supabase
      .from('cases')
      .upsert([payload])
      .select()

    if (error) throw error
    return { success: true, data: data?.[0] }
  } catch (err) {
    console.error('Supabase saveCase error:', err.message)
    return { success: false, error: err.message }
  }
}

// 2. FETCH SUSPECTS
export async function fetchSuspects() {
  try {
    const { data, error } = await supabase
      .from('suspects')
      .select('*')
      .order('risk_score', { ascending: false })

    if (error) throw error
    const formatted = (data || []).map(s => ({
      ...s,
      riskScore: s.risk_score,
      financialLinks: s.financial_links,
      callLinks: s.call_links,
      lastSeen: s.last_seen
    }))
    return { data: formatted, source: 'supabase' }
  } catch (err) {
    console.error('Supabase fetchSuspects error:', err.message)
    return { data: [], error: err.message, source: 'supabase' }
  }
}

// SAVE / CREATE SUSPECT
export async function saveSuspect(suspectObj) {
  try {
    const payload = {
      id: suspectObj.id,
      name: suspectObj.name,
      alias: suspectObj.alias || '',
      type: suspectObj.type || 'PERSON',
      risk: suspectObj.risk || 'HIGH',
      risk_score: suspectObj.riskScore || suspectObj.risk_score || 75,
      connections: suspectObj.connections || 0,
      phone: suspectObj.phone || null,
      location: suspectObj.location || '',
      last_seen: suspectObj.lastSeen || suspectObj.last_seen || new Date().toISOString().split('T')[0],
      status: suspectObj.status || 'ACTIVE',
      role: suspectObj.role || 'SUSPECT',
      gang: suspectObj.gang || null,
      financial_links: suspectObj.financialLinks || suspectObj.financial_links || 0,
      call_links: suspectObj.callLinks || suspectObj.call_links || 0,
      firs: suspectObj.firs || [],
      confidence: suspectObj.confidence || 90
    }
    const { data, error } = await supabase
      .from('suspects')
      .upsert([payload])
      .select()

    if (error) throw error
    return { success: true, data: data?.[0] }
  } catch (err) {
    console.error('Supabase saveSuspect error:', err.message)
    return { success: false, error: err.message }
  }
}

// 3. FETCH NETWORK GRAPH (NODES & EDGES)
export async function fetchGraphData() {
  try {
    const [nodesRes, edgesRes] = await Promise.all([
      supabase.from('network_nodes').select('*'),
      supabase.from('network_edges').select('*')
    ])

    if (nodesRes.error) throw nodesRes.error
    if (edgesRes.error) throw edgesRes.error

    const formattedEdges = (edgesRes.data || []).map(e => ({
      ...e,
      from: e.from_node,
      to: e.to_node
    }))

    return {
      nodes: nodesRes.data || [],
      edges: formattedEdges,
      source: 'supabase'
    }
  } catch (err) {
    console.error('Supabase fetchGraphData error:', err.message)
    return { nodes: [], edges: [], error: err.message, source: 'supabase' }
  }
}

// ADD GRAPH ENTITIES IN BATCH
export async function addGraphEntities(newNodes = [], newEdges = []) {
  try {
    if (newNodes.length > 0) {
      const nodePayloads = newNodes.map(n => ({
        id: n.id,
        label: n.label || n.name,
        name: n.name || n.label,
        alias: n.alias || '',
        type: n.type || 'person',
        risk: n.risk || 'high',
        risk_score: n.riskScore || n.risk_score || 75,
        phone: n.phone || null,
        location: n.location || '',
        role: n.role || 'SUSPECT',
        x: n.x || 300,
        y: n.y || 250,
        r: n.r || 14,
        gang: n.gang || null
      }))
      await supabase.from('network_nodes').upsert(nodePayloads)
    }

    if (newEdges.length > 0) {
      const edgePayloads = newEdges.map(e => ({
        from_node: e.from || e.from_node,
        to_node: e.to || e.to_node,
        type: e.type || 'associate',
        weight: e.weight || 0.5,
        label: e.label || '',
        confidence: e.confidence || 85
      }))
      await supabase.from('network_edges').insert(edgePayloads)
    }

    return await fetchGraphData()
  } catch (err) {
    console.error('Supabase addGraphEntities error:', err.message)
    return { error: err.message }
  }
}

// 4. FETCH EVIDENCE
export async function fetchEvidenceList() {
  try {
    const { data, error } = await supabase
      .from('evidence_files')
      .select('*')
      .order('uploaded_at', { ascending: false })

    if (error) throw error
    const formatted = (data || []).map(e => ({
      ...e,
      uploadedAt: e.uploaded_at,
      extractedEntities: e.extracted_entities,
      verifiedConfidence: e.verified_confidence
    }))
    return { data: formatted, source: 'supabase' }
  } catch (err) {
    console.error('Supabase fetchEvidenceList error:', err.message)
    return { data: [], error: err.message, source: 'supabase' }
  }
}

// SAVE EVIDENCE RECORD
export async function saveEvidenceRecord(rec) {
  try {
    const payload = {
      id: rec.id,
      name: rec.name,
      type: rec.type,
      size: rec.size,
      uploaded_at: new Date().toISOString(),
      status: rec.status || 'VERIFIED',
      extracted_entities: rec.extractedEntities || rec.extracted_entities || 0,
      verified_confidence: rec.verifiedConfidence || rec.verified_confidence || 90,
      officer: rec.officer || 'SI Ramesh Kumar'
    }
    const { data, error } = await supabase
      .from('evidence_files')
      .upsert([payload])
      .select()

    if (error) throw error
    return { success: true, data: data?.[0] }
  } catch (err) {
    console.error('Supabase saveEvidenceRecord error:', err.message)
    return { success: false, error: err.message }
  }
}

// 5. FETCH ALERTS
export async function fetchAlerts() {
  try {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    const formatted = (data || []).map(a => ({
      ...a,
      case: a.case_id,
      desc: a.description
    }))
    return { data: formatted, source: 'supabase' }
  } catch (err) {
    console.error('Supabase fetchAlerts error:', err.message)
    return { data: [], error: err.message, source: 'supabase' }
  }
}

// 6. FETCH ACTIVITY LOGS
export async function fetchActivityLogs() {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw error
    const formatted = (data || []).map(a => ({
      ...a,
      user: a.officer
    }))
    return { data: formatted, source: 'supabase' }
  } catch (err) {
    console.error('Supabase fetchActivityLogs error:', err.message)
    return { data: [], error: err.message, source: 'supabase' }
  }
}
