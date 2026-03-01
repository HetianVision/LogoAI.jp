'use client'

import { ReactNode } from 'react'

export default function LogoDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="logo-detail-layout">
      {children}
    </div>
  )
}
