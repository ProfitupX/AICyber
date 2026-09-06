import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'
import './DashboardLayout.css'

const DashboardLayout = () => (
  <div className="dashboard-theme dash-layout">
    <Sidebar />
    <div className="dash-main">
      <TopBar />
      <main className="dash-content">
        <Outlet />
      </main>
    </div>
  </div>
)

export default DashboardLayout
