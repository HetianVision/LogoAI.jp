import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'シーン別ロゴ作成 | あなたの状況に合わせて最適なロゴ【LogoAI.jp】',
  description: '開業・起業、フリーランス、ECショップなど18のシーン別ロゴ作成ガイド。あなた状況に合わせて最適なロゴを作成しましょう。',
  alternates: {
    canonical: 'https://logoai.jp/for',
  },
}

export default function ForLayout({ children }: { children: React.ReactNode }) {
  return children
}
