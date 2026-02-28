import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SCENE_LIST, getSceneBySlug, SceneData } from '@/lib/scene'
import { getIndustryBySlug, IndustryData } from '@/lib/industry'

// Generate static params for all 18 scenes
export async function generateStaticParams() {
  return SCENE_LIST.map((scene) => ({
    slug: scene.slug,
  }))
}

// Generate metadata for each scene page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const scene = getSceneBySlug(slug)

  if (!scene) {
    return {
      title: 'シーンが見つかりません | LogoAI.jp',
    }
  }

  return {
    title: `${scene.title}向けAIロゴ | ${scene.metaKeyword}【LogoAI.jp】`,
    description: scene.metaDescription,
    alternates: {
      canonical: `https://logoai.jp/for/${scene.slug}`,
    },
  }
}

// Scene Page Component
export default async function SceneSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scene = getSceneBySlug(slug)

  if (!scene) {
    notFound()
  }

  const relatedIndustries = scene.relatedIndustries
    .map(relSlug => getIndustryBySlug(relSlug))
    .filter((i): i is IndustryData => i !== undefined)

  const relatedScenes = scene.relatedScenes
    .map(relSlug => getSceneBySlug(relSlug))
    .filter((s): s is SceneData => s !== undefined)

  return (
    <main>
      <Navbar />

      {/* ============================================
          Section 1: Hero
      ============================================ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-bg-base">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li><Link href="/" className="hover:text-primary transition-colors">ホーム</Link></li>
              <li>/</li>
              <li><Link href="/for" className="hover:text-primary transition-colors">シーン一覧</Link></li>
              <li>/</li>
              <li className="text-text-primary font-medium">{scene.titleShort}向けロゴ</li>
            </ol>
          </nav>

          {/* Hero Content */}
          <div className="max-w-[660px] mx-auto text-center">
            <div className="text-6xl mb-4">{scene.heroEmoji}</div>
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              {scene.title}のためのロゴ作成
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-5">
              {scene.heroTitle}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {scene.heroDesc}
            </p>

            {/* Target Box */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-8 text-left max-w-[480px] mx-auto">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">こんな状況の方に</div>
              <ul className="space-y-2">
                {scene.situationPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-green-700 font-bold">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link
                href="/create"
                className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
              >
                今すぐ無料で始める →
              </Link>
              <Link
                href="#scene-steps"
                className="border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-4 rounded-full transition-all"
              >
                使い方を見る
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-5 text-xs text-text-muted font-medium">
              <span>✓ クレジットカード不要</span>
              <span>✓ 最短10分</span>
              <span>✓ 7日間全额返金保証</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Section 2: Benefits
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              なぜLogoAI.jpか
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {scene.title}がLogoAI.jpを選ぶ理由
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1000px] mx-auto">
            {scene.benefits.map((benefit, index) => (
              <div key={index} className="bg-white border border-border rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-heading text-base font-bold text-text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          Section 3: Steps
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-base" id="scene-steps">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              使い方
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {scene.title}がロゴを作る流れ
            </h2>
          </div>

          <div className="max-w-[900px] mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {scene.steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white border border-border rounded-2xl p-6 text-center h-full">
                    <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-number text-xl font-bold mx-auto mb-4">
                      {step.num}
                    </div>
                    <h3 className="font-heading text-base font-bold text-text-primary mb-2">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3">{step.desc}</p>
                    {step.timeLabel && (
                      <span className="inline-block text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                        約{step.timeLabel}
                      </span>
                    )}
                  </div>
                  {index < scene.steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-text-muted">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Section 4: Works Gallery
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              生成事例
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3">
              {scene.title}が作ったロゴ事例
            </h2>
            <p className="text-text-secondary">
              全て実際にLogoAI.jpで生成されたロゴです
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-white rounded-xl border border-border p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="font-heading text-xl md:text-2xl text-primary mb-2">
                  {scene.titleShort}
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
              href="/works"
              className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-3 rounded-full transition-all"
            >
              全ての事例を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          Section 5: Pricing
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              料金
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {scene.title}ロゴの料金
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
              </ul>
              <Link
                href="/create"
                className="block text-center py-3 rounded-full font-bold bg-primary hover:bg-primary-dark text-text-inverse transition-all"
              >
                無料で始める
              </Link>
            </div>

            {/* Professional Plan */}
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
                  商用利用OK
                </li>
              </ul>
              <Link
                href="/create"
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
              </ul>
              <Link
                href="/create"
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
          Section 6: FAQ
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              よくある疑問
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {scene.title}からよく聞かれること
            </h2>
          </div>

          <div className="space-y-4">
            {scene.faqs.map((faq, index) => (
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
          Section 7: Related
      ============================================ */}
      <section className="py-12 md:py-16 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Related Industries */}
            <div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-4">関連する業種</h3>
              <div className="flex flex-wrap gap-3">
                {relatedIndustries.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/industry/${ind.slug}`}
                    className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-all"
                  >
                    {ind.name}のロゴ →
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Scenes */}
            <div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-4">似た状況の方へ</h3>
              <div className="flex flex-wrap gap-3">
                {relatedScenes.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/for/${s.slug}`}
                    className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-all"
                  >
                    {s.title}向けロゴ →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Section 8: CTA
      ============================================ */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-inverse mb-4">
                {scene.title}の第一歩を、<br />
                今日のロゴから始める。
              </h2>
              <p className="text-text-inverse/80 mb-8 leading-relaxed">
                最短10分・無料から。著作権証明書付き。<br />
                7日間全额返金保証があるから安心して試せます。
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link
                  href="/create"
                  className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  無料でロゴを作る →
                </Link>
                <Link
                  href="/works"
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
