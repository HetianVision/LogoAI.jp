'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from './auth/auth-modal'

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const { user, openModal, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showBackground = scrolled || !transparent

  const handleLogout = async () => {
    await logout()
    setUserMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      showBackground
        ? 'bg-bg-base border-b border-border shadow-sm'
        : 'bg-transparent'
    }`}>
      <motion.div
      className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-accent font-heading font-bold text-lg">L</span>
          </div>
          <span className="font-heading font-bold text-xl text-primary">LogoAI.jp</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-text-secondary hover:text-primary font-medium text-sm transition-colors">ホーム</Link>
          <Link href="/features" className="text-text-secondary hover:text-primary font-medium text-sm transition-colors">機能</Link>
          <Link href="/pricing" className="text-text-secondary hover:text-primary font-medium text-sm transition-colors">料金</Link>
          <Link href="/works" className="text-text-secondary hover:text-primary font-medium text-sm transition-colors">事例</Link>
          <Link href="/faq" className="text-text-secondary hover:text-primary font-medium text-sm transition-colors">よくある質問</Link>
        </div>

        <div className="flex items-center gap-4" id="nav-auth">
          {user ? (
            // Logged in state
            <>
              <Link href="/create" className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md">
                新しいロゴを作る
              </Link>
              <div className="nav-user-menu" id="nav-user-menu" ref={menuRef}>
                <button
                  className="num-trigger"
                  type="button"
                  aria-expanded={userMenuOpen}
                  aria-controls="num-dropdown"
                  aria-label="マイメニュー"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="num-avatar" aria-hidden="true">
                    {user.email[0].toUpperCase()}
                  </div>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="num-dropdown"
                      id="num-dropdown"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="num-email">{user.email}</div>
                      <Link href="/dashboard" className="num-link" onClick={() => setUserMenuOpen(false)}>
                        <span aria-hidden="true">🖼️</span> マイページ
                      </Link>
                      <Link href="/dashboard#orders" className="num-link" onClick={() => setUserMenuOpen(false)}>
                        <span aria-hidden="true">📋</span> 注文履歴
                      </Link>
                      <Link href="/dashboard#account" className="num-link" onClick={() => setUserMenuOpen(false)}>
                        <span aria-hidden="true">⚙️</span> アカウント設定
                      </Link>
                      <button className="num-logout" type="button" id="btn-nav-logout" onClick={handleLogout}>
                        ログアウト
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            // Not logged in state
            <>
              <button
                className="hidden md:block text-text-secondary hover:text-primary font-medium text-sm transition-colors"
                onClick={() => openModal('login')}
              >
                ログイン
              </button>
              <Link href="/create" className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md">
                無料で試す
              </Link>
            </>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        .nav-user-menu {
          position: relative;
        }

        .num-trigger {
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px;
        }

        .num-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1A3A2A;
          color: white;
          font-family: 'Noto Serif JP', serif;
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.2s;
        }

        .num-trigger:hover .num-avatar {
          box-shadow: 0 0 0 3px rgba(26, 58, 42, 0.15);
        }

        .num-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border: 1px solid #E0DDD6;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          overflow: hidden;
          z-index: 200;
        }

        .num-email {
          padding: 12px 16px 8px;
          font-size: 0.75rem;
          color: #9A9A9A;
          font-weight: 600;
          border-bottom: 1px solid #E0DDD6;
          word-break: break-all;
        }

        .num-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #5A5A5A;
          text-decoration: none;
          transition: all 0.15s;
        }

        .num-link:hover {
          background: rgba(26, 58, 42, 0.04);
          color: #1A3A2A;
        }

        .num-logout {
          display: block;
          width: 100%;
          padding: 11px 16px;
          text-align: left;
          background: none;
          border: none;
          border-top: 1px solid #E0DDD6;
          font-family: inherit;
          font-size: 0.875rem;
          font-weight: 600;
          color: #9A9A9A;
          cursor: pointer;
          transition: all 0.15s;
        }

        .num-logout:hover {
          color: #C41E3A;
          background: rgba(196, 30, 58, 0.04);
        }
      `}</style>
    </nav>
  )
}
