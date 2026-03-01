'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuthStore, useDashboardStore } from '../auth/auth-modal'

export default function DashboardSidenav() {
  const { user, logout, openModal } = useAuthStore()
  const { activeSection, setActiveSection, logos } = useDashboardStore()

  useEffect(() => {
    // Set initial hash if none
    if (!window.location.hash) {
      window.location.hash = '#logos'
    }
  }, [])

  const handleNavClick = (section: 'logos' | 'orders' | 'account') => {
    setActiveSection(section)
    window.location.hash = `#${section}`
  }

  const handleLogout = async () => {
    await logout()
    window.location.href = '/'
  }

  // Demo user for display
  const displayUser = user || {
    email: 'yamamoto@example.com',
    createdAt: '2024-08-15'
  }

  const navItems = [
    { id: 'logos' as const, icon: '🖼️', label: '購入済みロゴ', count: logos.length },
    { id: 'orders' as const, icon: '📋', label: '注文履歴', count: null },
    { id: 'account' as const, icon: '⚙️', label: 'アカウント設定', count: null },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.nav
      className="db-sidenav"
      aria-label="マイページメニュー"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* User Info */}
      <motion.div
        className="dbn-user"
        variants={itemVariants}
      >
        <div className="dbn-avatar" aria-hidden="true">
          {displayUser.email[0].toUpperCase()}
        </div>
        <div className="dbn-user-info">
          <div className="dbn-email">{displayUser.email}</div>
          <div className="dbn-since">
            {displayUser.createdAt} から利用中
          </div>
        </div>
      </motion.div>

      {/* Navigation Links */}
      <motion.ul
        className="dbn-links"
        role="list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navItems.map((item) => (
          <motion.li key={item.id} variants={itemVariants}>
            <button
              className={`dbn-link ${activeSection === item.id ? 'dbn-link-active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              <span className="dbn-link-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
              {item.count !== null && (
                <span className="dbn-link-badge" id="logo-count">{item.count}</span>
              )}
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {/* Logout Button */}
      <motion.button
        className="dbn-logout"
        type="button"
        id="btn-logout"
        onClick={handleLogout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        ログアウト
      </motion.button>

      <style jsx>{`
        .db-sidenav {
          background: white;
          border: 1px solid #E0DDD6;
          border-radius: 1rem;
          overflow: hidden;
        }

        .dbn-user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          border-bottom: 1px solid #E0DDD6;
          background: #F2F0EB;
        }

        .dbn-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1A3A2A;
          color: white;
          font-family: 'Noto Serif JP', serif;
          font-size: 1.125rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dbn-email {
          font-size: 0.75rem;
          font-weight: 700;
          color: #1A1A1A;
          word-break: break-all;
        }

        .dbn-since {
          font-size: 0.6rem;
          color: #9A9A9A;
          margin-top: 2px;
        }

        .dbn-links {
          list-style: none;
          padding: 10px 0;
          margin: 0;
        }

        .dbn-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #5A5A5A;
          text-decoration: none;
          transition: all 0.15s;
          border: none;
          background: none;
          border-left: 3px solid transparent;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }

        .dbn-link:hover {
          background: rgba(26, 58, 42, 0.04);
          color: #1A3A2A;
        }

        .dbn-link-active {
          color: #1A3A2A;
          background: rgba(26, 58, 42, 0.05);
          border-left-color: #1A3A2A;
        }

        .dbn-link-icon {
          font-size: 1rem;
          flex-shrink: 0;
        }

        .dbn-link-badge {
          margin-left: auto;
          background: #1A3A2A;
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 9999px;
          min-width: 18px;
          text-align: center;
        }

        .dbn-logout {
          display: block;
          width: 100%;
          padding: 14px 20px;
          text-align: left;
          background: none;
          border: none;
          border-top: 1px solid #E0DDD6;
          font-family: inherit;
          font-size: 0.875rem;
          color: #9A9A9A;
          cursor: pointer;
          transition: all 0.15s;
        }

        .dbn-logout:hover {
          color: #C41E3A;
          background: rgba(196, 30, 58, 0.04);
        }

        @media (max-width: 768px) {
          .dbn-links {
            display: flex;
            padding: 8px 12px;
            gap: 4px;
            overflow-x: auto;
          }

          .dbn-link {
            padding: 9px 14px;
            border-left: none;
            border-bottom: 3px solid transparent;
            border-radius: 0.75rem;
            flex-shrink: 0;
          }

          .dbn-link-active {
            border-bottom-color: #1A3A2A;
          }
        }
      `}</style>
    </motion.nav>
  )
}
