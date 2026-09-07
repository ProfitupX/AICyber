import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import StatementBanner from '../components/StatementBanner.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import ArchitectureBento from '../components/ArchitectureBento.jsx'
import LiveGraphDemo from '../components/LiveGraphDemo.jsx'
import ComplianceStats from '../components/ComplianceStats.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-page-root">
      <Navbar />
      <Hero />
      <StatementBanner />
      <HowItWorks />
      <ArchitectureBento />
      <LiveGraphDemo />
      <ComplianceStats />
      <CTA />
      <Footer />
    </div>
  )
}
