import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import MarqueeBar from '../components/MarqueeBar.jsx'
import ProblemStatement from '../components/ProblemStatement.jsx'
import TargetUsers from '../components/TargetUsers.jsx'
import Architecture from '../components/Architecture.jsx'
import Features from '../components/Features.jsx'
import UserFlow from '../components/UserFlow.jsx'
import Validation from '../components/Validation.jsx'
import TechStack from '../components/TechStack.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'

export default function LandingPage() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <MarqueeBar />
      <ProblemStatement />
      <TargetUsers />
      <Architecture />
      <Features />
      <UserFlow />
      <Validation />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  )
}
