import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'LogoAI.jp | AIでロゴを自動生成 - 5分でプロ品質',
  description: '業種を選んで、ブランド名を入力するだけ。100種類以上の日本語フォントから、AIがプロ品質のロゴを自動生成。商用利用OK・著作権帰属。',
  keywords: 'AI ロゴ 生成, ロゴ作成,  免费 로고 제작, ロゴAI, デザイナー 不要',
  openGraph: {
    title: 'LogoAI.jp | AIでロゴを自動生成',
    description: '5分でプロ品質。業種を選んで、ブランド名を入力するだけ。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'LogoAI.jp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
