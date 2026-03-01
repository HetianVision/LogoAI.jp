import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LogoAI.jp | AIでロゴを自動生成 - 5分でプロ品質',
  description: '業種を選んで、ブランド名を入力するだけ。100種類以上の日本語フォントから、AIがプロ品質のロゴを自動生成。商用利用OK・著作権帰属。',
}

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return children
}
