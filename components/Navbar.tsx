'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showBackground = scrolled || !transparent

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      showBackground
        ? 'bg-bg-base border-b border-border shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
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

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-text-secondary hover:text-primary font-medium text-sm transition-colors">
            ログイン
          </Link>
          <Link href="/create" className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md">
            無料で始める
          </Link>
        </div>
      </div>
    </nav>
  )
}
