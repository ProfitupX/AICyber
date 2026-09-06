import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout.jsx'
import LandingPage  from './pages/LandingPage.jsx'
import Overview     from './pages/Overview.jsx'
import NetworkGraph from './pages/NetworkGraph.jsx'
import Suspects     from './pages/Suspects.jsx'
import Cases        from './pages/Cases.jsx'
import Upload       from './pages/Upload.jsx'
import Chat         from './pages/Chat.jsx'
import Kingpins     from './pages/Kingpins.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index        element={<Overview />} />
          <Route path="graph"    element={<NetworkGraph />} />
          <Route path="suspects" element={<Suspects />} />
          <Route path="cases"    element={<Cases />} />
          <Route path="upload"   element={<Upload />} />
          <Route path="chat"     element={<Chat />} />
          <Route path="kingpins" element={<Kingpins />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
