import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表示 | LogoAI.jp',
  description: 'LogoAI.jpの特定商取引法に基づく表示です。',
}

export default function TokuteiLayout({ children }: { children: React.ReactNode }) {
  return children
}
