import Link from 'next/link'
import { Metadata } from 'next'
import { COMPETITOR_LIST } from '@/lib/competitors'

export const metadata: Metadata = {
  title: 'LogoAI.jp vs 競合比較 | 他社サービスとの違い徹底比較',
  description: 'Canva、Adobe Express、Looka、Wix Logo、Tailor Brandsなど人気Logo作成ツールとの比較結果。LogoAI.jp 日本No.1AI Logo生成サービスのメリットをチェック。',
}

const CATEGORY_LABELS: Record<string, string> = {
  'global-design': '世界的なデザインツール',
  'ai-logo': 'AI Logo作成サービス',
  'local-design': '地域特化サービス',
  'vector-tool': '本格デザインエディタ',
}

export default function VsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              Comparison
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              競合サービスとの<br className="md:hidden" />
              徹底比較
            </h1>
            <p className="text-lg text-text-secondary max-w-[600px] mx-auto leading-relaxed">
              Canva、Adobe Express、Looka、Wix Logoなど<br />
              人気Logo作成ツールと徹底比較しています。
            </p>
          </div>
        </div>
      </section>

      {/* Competitor Comparison List */}
      <section className="py-12 md:py-16 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Category: AI Logo Services */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                AI Logo作成サービス
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-text-muted">
                {COMPETITOR_LIST.filter(c => c.category === 'ai-logo').length}件
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMPETITOR_LIST.filter(c => c.category === 'ai-logo').map((competitor) => (
                <Link
                  key={competitor.slug}
                  href={`/vs/${competitor.slug}`}
                  className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
                >
                  <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                    {competitor.nameJa}
                  </div>
                  <div className="text-sm text-text-muted">
                    {competitor.tagline}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Category: Global Design Tools */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                世界的なデザインツール
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-text-muted">
                {COMPETITOR_LIST.filter(c => c.category === 'global-design').length}件
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMPETITOR_LIST.filter(c => c.category === 'global-design').map((competitor) => (
                <Link
                  key={competitor.slug}
                  href={`/vs/${competitor.slug}`}
                  className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
                >
                  <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                    {competitor.nameJa}
                  </div>
                  <div className="text-sm text-text-muted">
                    {competitor.tagline}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Category: Local Design Services */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                地域特化サービス
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-text-muted">
                {COMPETITOR_LIST.filter(c => c.category === 'local-design').length}件
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMPETITOR_LIST.filter(c => c.category === 'local-design').map((competitor) => (
                <Link
                  key={competitor.slug}
                  href={`/vs/${competitor.slug}`}
                  className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
                >
                  <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                    {competitor.nameJa}
                  </div>
                  <div className="text-sm text-text-muted">
                    {competitor.tagline}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Category: Vector Tools */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                本格デザインエディタ
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-text-muted">
                {COMPETITOR_LIST.filter(c => c.category === 'vector-tool').length}件
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMPETITOR_LIST.filter(c => c.category === 'vector-tool').map((competitor) => (
                <Link
                  key={competitor.slug}
                  href={`/vs/${competitor.slug}`}
                  className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
                >
                  <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                    {competitor.nameJa}
                  </div>
                  <div className="text-sm text-text-muted">
                    {competitor.tagline}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            まずは無料で試してみる
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            他のサービスとの違いを実感するには、実際に試してみるのが一番。<br />
            5分間であなたのオリジナルLogoを作成できます。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/create"
              className="bg-accent hover:bg-accent-dark text-text-primary font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              無料でロゴを作る
            </Link>
            <Link
              href="/works"
              className="border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-8 py-4 rounded-full transition-all"
            >
              事例を見る
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
