'use client'

import { usePathname } from 'next/navigation'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthModal from '@/components/auth/AuthModal'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isCreatePage = pathname === '/create' || pathname === '/create/result'

  return (
    <html lang="ja">
      <body className="antialiased">
        {!isCreatePage && <Navbar />}
        {children}
        {!isCreatePage && <Footer />}
        <AuthModal />
      </body>
    </html>
  )
}
