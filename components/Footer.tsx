import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-dark py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-accent font-heading font-bold text-lg">L</span>
              </div>
              <span className="font-heading font-bold text-xl text-text-inverse">LogoAI.jp</span>
            </div>
            <p className="text-text-inverse/60 text-sm">
              AIで、日本のビジネスに<br />最適なロゴを。
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-inverse mb-4">サービス</h4>
            <ul className="space-y-2 text-sm text-text-inverse/60">
              <li><Link href="/" className="hover:text-accent transition-colors">ホーム</Link></li>
              <li><Link href="/features" className="hover:text-accent transition-colors">機能</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition-colors">料金</Link></li>
              <li><Link href="/works" className="hover:text-accent transition-colors">事例</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">会社概要</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-inverse mb-4">サポート</h4>
            <ul className="space-y-2 text-sm text-text-inverse/60">
              <li><Link href="/faq" className="hover:text-accent transition-colors">よくある質問</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">お問い合わせ</Link></li>
              <li><Link href="/how-it-works" className="hover:text-accent transition-colors">使い方ガイド</Link></li>
              <li><Link href="/industry" className="hover:text-accent transition-colors">業種から探す</Link></li>
              <li><Link href="/for" className="hover:text-accent transition-colors">用途から探す</Link></li>
              <li><Link href="/vs" className="hover:text-accent transition-colors">比較</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-inverse mb-4">法的情報</h4>
            <ul className="space-y-2 text-sm text-text-inverse/60">
              <li><Link href="/terms" className="hover:text-accent transition-colors">利用規約</Link></li>
              <li><Link href="/privacy" className="hover:text-accent transition-colors">プライバシーポリシー</Link></li>
              <li><Link href="/tokutei" className="hover:text-accent transition-colors">特定商取引法</Link></li>
              <li><Link href="/guarantee" className="hover:text-accent transition-colors">返金保証</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-text-inverse/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-inverse/40 text-sm">
            © 2026 LogoAI.jp All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-text-inverse/40 hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-text-inverse/40 hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
