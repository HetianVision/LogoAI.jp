import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '業種別ロゴ作成 | 47業界のロゴ事例が見つかる',
  description: '飲食、美容、IT、士業、医療、教育など、47業界のロゴ事例が見つかる。業種別に最適化されたAIロゴ作成サービス。',
}

export default function IndustryLayout({ children }: { children: React.ReactNode }) {
  return children
}
