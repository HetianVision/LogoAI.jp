'use client'

import { usePathname } from 'next/navigation'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isCreatePage = pathname === '/create'

  return (
    <html lang="ja">
      <body className="antialiased">
        {!isCreatePage && <Navbar />}
        {children}
        {!isCreatePage && <Footer />}
      </body>
    </html>
  )
}
