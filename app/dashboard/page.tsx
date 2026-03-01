'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DashboardSidenav from '@/components/dashboard/DashboardSidenav'
import LogosSection from '@/components/dashboard/LogosSection'
import OrdersSection from '@/components/dashboard/OrdersSection'
import AccountSection from '@/components/dashboard/AccountSection'
import AuthModal from '@/components/auth/AuthModal'
import { useAuthStore, useDashboardStore } from '@/components/auth/auth-modal'

export default function DashboardPage() {
  const { user, openModal } = useAuthStore()
  const { activeSection, fetchLogos, fetchOrders } = useDashboardStore()

  // Check auth and fetch data on mount
  useEffect(() => {
    if (!user) {
      // Show auth modal for demo purposes - in production, redirect to login
      openModal('login')
    } else {
      // Fetch data
      fetchLogos()
      fetchOrders()
    }
  }, [user, openModal, fetchLogos, fetchOrders])

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'logos' || hash === 'orders' || hash === 'account') {
        useDashboardStore.getState().setActiveSection(hash as 'logos' | 'orders' | 'account')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case 'logos':
        return <LogosSection />
      case 'orders':
        return <OrdersSection />
      case 'account':
        return <AccountSection />
      default:
        return <LogosSection />
    }
  }

  return (
    <div className="dashboard-page">
      <header className="navbar">
        <Navbar />
      </header>

      <main className="dashboard-main">
        <motion.div
          className="dashboard-layout"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Left: Side Navigation */}
          <aside className="db-sidenav-area">
            <DashboardSidenav />
          </aside>

          {/* Right: Content Area */}
          <div className="db-content">
            {renderSection()}
          </div>
        </motion.div>
      </main>

      <footer className="footer">
        <Footer />
      </footer>

      {/* Auth Modal for login */}
      <AuthModal />

      <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .dashboard-main {
          padding: calc(64px + 32px) 24px 80px;
          min-height: 100vh;
          background: #F2F0EB;
          flex: 1;
        }

        .dashboard-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: start;
        }

        .db-sidenav-area {
          position: sticky;
          top: calc(64px + 20px);
        }

        .db-content {
          min-width: 0;
        }

        .footer {
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .dashboard-layout {
            grid-template-columns: 1fr;
          }

          .db-sidenav-area {
            position: static;
          }
        }
      `}</style>
    </div>
  )
}
