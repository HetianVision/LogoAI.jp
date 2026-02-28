import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { INDUSTRY_LIST, getIndustryBySlug, IndustryData } from '@/lib/industry'

// Generate static params for all 47 industries
export async function generateStaticParams() {
  return INDUSTRY_LIST.map((industry) => ({
    slug: industry.slug,
  }))
}

// Generate metadata for each industry page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)

  if (!industry) {
    return {
      title: '業種が見つかりません | LogoAI.jp',
    }
  }

  return {
    title: `${industry.name}のロゴ作成 | AI生成・著作権証明書付き【LogoAI.jp】`,
    description: `${industry.name}向けAIロゴ作成。日本語フォント100種以上、${industry.sampleCount}件以上の事例、著作権完全帰属。最短10分・7日間全额返金保証。`,
    alternates: {
      canonical: `https://logoai.jp/industry/${industry.slug}`,
    },
  }
}

// Industry Page Component
export default async function IndustrySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)

  if (!industry) {
    notFound()
  }

  const relatedIndustries = industry.relatedIndustries
    .map(relSlug => getIndustryBySlug(relSlug))
    .filter((i): i is IndustryData => i !== undefined)

  return (
    <main>
      <Navbar />

      {/* ============================================
          Section 1: Hero
      ============================================ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-bg-base">
        {/* Background decoration */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li><Link href="/" className="hover:text-primary transition-colors">ホーム</Link></li>
              <li>/</li>
              <li><Link href="/industry" className="hover:text-primary transition-colors">業種一覧</Link></li>
              <li>/</li>
              <li className="text-text-primary font-medium">{industry.name}のロゴ</li>
            </ol>
          </nav>

          {/* Hero Content */}
          <div className="max-w-[660px] mx-auto text-center">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              {industry.name} × AIロゴ
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-5">
              {industry.name}向け、<br />
              AIロゴ作成サービス。
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {industry.heroDesc}
            </p>

            {/* Key Points */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-8 text-left max-w-[480px] mx-auto">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <span className="text-green-700 font-bold">✓</span>
                  {industry.name}向けフォント・カラー自動最適化
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <span className="text-green-700 font-bold">✓</span>
                  {industry.sampleCount}件以上の{industry.name}ロゴ事例
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <span className="text-green-700 font-bold">✓</span>
                  著作権証明書付き・商標登録申請可能
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link
                href={`/create?industry=${industry.slug}`}
                className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
              >
                {industry.name}のロゴを作る
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#works-examples"
                className="border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-4 rounded-full transition-all"
              >
                事例を見る
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-5 text-xs text-text-muted font-medium">
              <span>✓ 無料で3案生成</span>
              <span>✓ 最短10分</span>
              <span>✓ 7日間全额返金保証</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Section 2: Pain Points
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              こんな課題はありませんか
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {industry.name}のロゴで<br className="md:hidden" />
              よくある悩み
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {industry.painPoints.map((pain, index) => (
              <div key={index} className="bg-white border border-border rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">{pain.icon}</div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-3">{pain.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{pain.desc}</p>
                <div className="pt-4 border-t border-border">
                  <div className="text-xl text-accent mb-1">↓</div>
                  <div className="text-xs font-bold text-primary">LogoAI.jpで解決</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          Section 3: Font & Color Recommendations
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              デザイン提案
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {industry.name}に最適な<br className="md:hidden" />
              フォントとカラー
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-[1000px] mx-auto">
            {/* Font Recommendations */}
            <div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-5">推奨フォント</h3>
              <div className="space-y-4">
                {industry.fontRecommendations.map((font, index) => (
                  <div key={index} className="bg-white border border-border rounded-xl p-5 flex items-center gap-4">
                    <div
                      className="text-2xl font-bold text-text-primary min-w-[80px] flex-shrink-0"
                      style={{ fontFamily: font.style.includes('sans') ? 'system-ui' : font.style }}
                    >
                      {font.preview}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-text-primary mb-1">{font.name}</div>
                      <div className="text-xs text-text-muted leading-relaxed">{font.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Recommendations */}
            <div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-5">推奨カラーパレット</h3>
              <div className="space-y-4">
                {industry.colorPalettes.map((palette, index) => (
                  <div key={index} className="bg-white border border-border rounded-xl p-4 flex items-center gap-4">
                    <div className="flex gap-1 flex-shrink-0">
                      {palette.colors.map((color, cIndex) => (
                        <div
                          key={cIndex}
                          className="w-8 h-8 rounded-lg border border-black/5"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-text-primary mb-0.5">{palette.name}</div>
                      <div className="text-xs text-text-muted">{palette.mood}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Section 4: Works Gallery
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-section" id="works-examples">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              生成事例
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3">
              {industry.name}のロゴ事例
            </h2>
            <p className="text-text-secondary">
              全て実際にLogoAI.jpで生成されたロゴです
            </p>
          </div>

          {/* Works Grid - Placeholder for demo */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {[...Array(Math.min(12, industry.sampleCount))].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-white rounded-xl border border-border p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="font-heading text-xl md:text-2xl text-primary mb-2">
                  {industry.nameEn}
                </div>
                <div className="text-xs text-text-muted mb-3">Sample {index + 1}</div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-text-primary text-xs px-3 py-1 rounded-full">
                  このスタイルで作る
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`/works?industry=${industry.slug}`}
              className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-3 rounded-full transition-all"
            >
              {industry.name}の全事例を見る（{industry.sampleCount}件+）
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          Section 5: Industry Features
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              {industry.name}特化機能
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {industry.name}向けに特化した機能
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industry.features.map((feature, index) => (
              <div key={index} className="bg-white border border-border rounded-xl p-6">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-heading text-base font-bold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          Section 6: Pricing
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              料金
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {industry.name}ロゴの料金
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl font-bold text-text-primary mb-2">無料</h3>
                <div className="mb-2">
                  <span className="font-number text-4xl font-semibold text-primary">¥0</span>
                </div>
                <p className="text-text-secondary text-sm">ロゴ作成を試したい方向け</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  3回までLogo生成
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  低解像度ダウンロード
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basicフォントのみ
                </li>
              </ul>
              <Link
                href={`/create?industry=${industry.slug}`}
                className="block text-center py-3 rounded-full font-bold bg-primary hover:bg-primary-dark text-text-inverse transition-all"
              >
                無料で始める
              </Link>
            </div>

            {/* Professional Plan - Highlighted */}
            <div className="bg-white rounded-2xl p-8 ring-2 ring-accent shadow-xl relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-text-primary text-xs font-bold px-4 py-1 rounded-full">
                おすすめ
              </div>
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl font-bold text-text-primary mb-2">プロフェッショナル</h3>
                <div className="mb-2">
                  <span className="font-number text-4xl font-semibold text-primary">¥2,980</span>
                  <span className="text-text-muted text-sm">/月</span>
                </div>
                <p className="text-text-secondary text-sm">ビジネス利用される方</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  無制限Logo生成
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  高解像度・SVG出力
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  日本語フォント100種
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ブランド套案出力
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  商用利用OK
                </li>
              </ul>
              <Link
                href={`/create?industry=${industry.slug}`}
                className="block text-center py-3 rounded-full font-bold bg-accent hover:bg-accent-dark text-text-primary transition-all"
              >
                無料で始める
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl font-bold text-text-primary mb-2">ビジネス</h3>
                <div className="mb-2">
                  <span className="font-number text-4xl font-semibold text-primary">¥9,800</span>
                  <span className="text-text-muted text-sm">/月</span>
                </div>
                <p className="text-text-secondary text-sm">法人・チーム利用</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  プロフェッショナル全機能
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  チームメンバー5名
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  優先サポート
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  APIアクセス
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  カスタムフォント追加
                </li>
              </ul>
              <Link
                href={`/create?industry=${industry.slug}`}
                className="block text-center py-3 rounded-full font-bold bg-primary hover:bg-primary-dark text-text-inverse transition-all"
              >
                無料で始める
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-text-muted mt-8">
            全プラン7日間全额返金保証付き。
            <Link href="/pricing" className="text-primary hover:underline ml-1">
              詳細な料金・機能比較はこちら
            </Link>
          </p>
        </div>
      </section>

      {/* ============================================
          Section 7: FAQ
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              よくある疑問
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {industry.name}のロゴに関する疑問
            </h2>
          </div>

          <div className="space-y-4">
            {industry.faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl border border-border group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-text-primary flex justify-between items-center list-none">
                  {faq.question}
                  <svg className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          Section 8: Related Industries
      ============================================ */}
      <section className="py-12 md:py-16 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary text-center mb-8">
            関連する業種のロゴ事例
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {relatedIndustries.map((rel) => (
              <Link
                key={rel.slug}
                href={`/industry/${rel.slug}`}
                className="flex flex-col gap-1 px-6 py-4 bg-white border border-border rounded-xl hover:border-accent hover:shadow-md transition-all"
              >
                <span className="font-heading font-bold text-text-primary">{rel.name}</span>
                <span className="text-xs text-text-muted">{rel.sampleCount}件の事例 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          Section 9: CTA
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-inverse mb-4">
                {industry.name}のロゴを、<br />
                今日から作り始める。
              </h2>
              <p className="text-text-inverse/80 mb-8 leading-relaxed">
                最短10分・無料から。デザインの知識は不要です。<br />
                著作権証明書付き・7日間全额返金保証。
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link
                  href={`/create?industry=${industry.slug}`}
                  className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {industry.name}のロゴを作る
                </Link>
                <Link
                  href={`/works?industry=${industry.slug}`}
                  className="bg-white/10 hover:bg-white/20 text-text-inverse font-medium px-6 py-4 rounded-full transition-all border border-white/30"
                >
                  事例を見る
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-5 text-xs text-text-inverse/70 font-medium">
                <span>✓ 著作権完全帰属</span>
                <span>✓ 最短10分</span>
                <span>✓ 7日間全额返金保証</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
