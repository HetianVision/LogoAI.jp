import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ロゴ生成結果 | LogoAI.jp',
  description: 'ご希望の条件に基づいたロゴが生成されました。好みのロゴを見つけて、AIロゴをダウンロードしましょう。',
}

export default function CreateResultLayout({ children }: { children: React.ReactNode }) {
  return children
}
