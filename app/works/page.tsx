'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import BottomCTA from '@/components/BottomCTA'
import { WORKS_DATA, type Industry, type LogoStyle } from '@/lib/works-data'

export default function WorksPage() {
  const [filter, setFilter] = useState<{ industry: Industry | 'all'; style: LogoStyle | 'all' }>({
    industry: 'all',
    style: 'all',
  })
  const [displayCount, setDisplayCount] = useState(36)
  const loaderRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const INDUSTRY_OPTIONS = [
    { value: 'all', label: 'すべて' },
    { value: 'restaurant', label: '飲食店' },
    { value: 'beauty', label: '美容・ Salon' },
    { value: 'it', label: 'IT・Web' },
    { value: 'retail', label: '小売・EC' },
    { value: 'medical', label: '医療・健康' },
    { value: 'legal', label: '士業・法律' },
    { value: 'education', label: '教育・学習' },
    { value: 'construction', label: '建設・不動産' },
    { value: 'finance', label: '金融・保険' },
    { value: 'creative', label: 'クリエイティブ' },
    { value: 'event', label: 'イベント・婚礼' },
    { value: 'other', label: 'その他' },
  ]

  const STYLE_OPTIONS = [
    { value: 'all', label: 'すべて' },
    { value: 'modern', label: 'モダン' },
    { value: 'elegant', label: 'エラーガント' },
    { value: 'warm', label: '温もり' },
    { value: 'professional', label: 'プロフェッショナル' },
    { value: 'playful', label: 'ポップ・楽しい' },
  ]

  const filtered = useMemo(() => {
    return WORKS_DATA.filter((item) => {
      const industryMatch = filter.industry === 'all' || item.industry === filter.industry
      const styleMatch = filter.style === 'all' || item.style === filter.style
      return industryMatch && styleMatch
    })
  }, [filter])

  const displayed = useMemo(
    () => filtered.slice(0, displayCount),
    [filtered, displayCount]
  )

  const hasMore = displayed.length < filtered.length

  const handleIndustryChange = (value: Industry | 'all') => {
    setFilter((f) => ({ ...f, industry: value }))
    setDisplayCount(36)
  }

  const handleStyleChange = (value: LogoStyle | 'all') => {
    setFilter((f) => ({ ...f, style: value }))
    setDisplayCount(36)
  }

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 12, filtered.length))
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    const option = { root: null, rootMargin: '200px', threshold: 0 }
    const observer = new IntersectionObserver((entries) => {
      const [target] = entries
      if (target.isIntersecting && hasMore && !isLoading) {
        handleLoadMore()
      }
    }, option)

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [hasMore, isLoading])

  const fontTypeLabels: Record<string, string> = {
    gothic: '角ゴシック体',
    mincho: '明朝体',
    'maru-gothic': '丸ゴシック体',
    calligraphy: '書体',
  }

  return (
    <main>

      {/* Section 1: Hero */}
      <section className="relative pt-28 pb-12 px-6 bg-bg-base overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden">
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <nav className="mb-8" aria-label="パンくずリスト">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link href="/" className="text-text-muted hover:text-primary transition-colors">ホーム</Link></li>
              <li className="text-text-muted">/</li>
              <li aria-current="page" className="text-text-primary font-medium">生成事例</li>
            </ol>
          </nav>

          <div className="max-w-[680px] mx-auto text-center">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">生成事例</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mt-4 mb-5">
              AIが生成した<br />日本語ロゴ、全て実例です。
            </h1>
            <p className="text-text-secondary text-base leading-relaxed mb-12">
              実際のユーザーが当サービスで生成したロゴをご紹介します。
              業種・スタイル・フォントで絞り込んで、理想のイメージを見つけてください。
            </p>

            <div className="flex items-center justify-center gap-0 bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm flex-wrap">
              <div className="flex flex-col items-center gap-1.5 px-4 md:px-9">
                <span className="font-number text-3xl md:text-4xl font-semibold text-text-primary">
                  12,000<span className="text-accent text-base font-medium">+</span>
                </span>
                <span className="text-xs text-text-muted font-medium tracking-[0.03em]">生成ロゴ数</span>
              </div>
              <div className="w-px h-10 md:h-12 bg-border hidden md:block" aria-hidden="true" />
              <div className="flex flex-col items-center gap-1.5 px-4 md:px-9">
                <span className="font-number text-3xl md:text-4xl font-semibold text-text-primary">47</span>
                <span className="text-xs text-text-muted font-medium tracking-[0.03em]">対応業種</span>
              </div>
              <div className="w-px h-10 md:h-12 bg-border hidden md:block" aria-hidden="true" />
              <div className="flex flex-col items-center gap-1.5 px-4 md:px-9">
                <span className="font-number text-3xl md:text-4xl font-semibold text-text-primary">
                  4.9<span className="text-accent text-sm font-medium">/ 5</span>
                </span>
                <span className="text-xs text-text-muted font-medium tracking-[0.03em]">ユーザー満足度</span>
              </div>
              <div className="w-px h-10 md:h-12 bg-border hidden md:block" aria-hidden="true" />
              <div className="flex flex-col items-center gap-1.5 px-4 md:px-9">
                <span className="font-number text-3xl md:text-4xl font-semibold text-text-primary">
                  98<span className="text-accent text-sm font-medium">%</span>
                </span>
                <span className="text-xs text-text-muted font-medium tracking-[0.03em]">返金申請なし率</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Filter Bar */}
      <div className="sticky top-16 z-50 bg-[rgba(250,250,247,0.95)] backdrop-blur-xl border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-5 py-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span className="text-xs font-bold text-text-muted uppercase tracking-[0.08em] whitespace-nowrap">業種</span>
              <div className="flex gap-1.5 flex-nowrap">
                {INDUSTRY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleIndustryChange(option.value as Industry | 'all')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      filter.industry === option.value
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-text-secondary border-border hover:border-primary hover:text-primary border'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-px h-7 bg-border flex-shrink-0 hidden md:block" aria-hidden="true" />
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span className="text-xs font-bold text-text-muted uppercase tracking-[0.08em] whitespace-nowrap">スタイル</span>
              <div className="flex gap-1.5 flex-nowrap">
                {STYLE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStyleChange(option.value as LogoStyle | 'all')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      filter.style === option.value
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-text-secondary border-border hover:border-primary hover:text-primary border'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-auto flex-shrink-0 text-sm text-text-muted whitespace-nowrap pr-2">
              <span className="font-bold text-text-primary">{filtered.length}</span>件を表示中
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Gallery */}
      <section className="py-8 md:py-12 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
            {displayed.map((item) => (
              <article
                key={item.id}
                className="break-inside-avoid mb-5 rounded-xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                data-industry={item.industry}
                data-style={item.style}
              >
                <div className="relative overflow-hidden bg-bg-section">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-400 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,58,42,0.95)] via-[rgba(26,58,42,0.6)] to-[rgba(26,58,42,0.2)] opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div className="w-full translate-y-2 hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-1.5 mb-2">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[rgba(201,150,58,0.9)] text-white tracking-[0.04em]">
                          {item.industryLabel}
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[rgba(250,250,247,0.15)] text-white border border-[rgba(250,250,247,0.3)] tracking-[0.04em]">
                          {item.styleLabel}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-white mb-2">{item.brandName}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-[rgba(250,250,247,0.7)]">
                          {fontTypeLabels[item.fontType]} × {item.colors[0]}
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[rgba(201,150,58,0.8)] text-white">
                          {item.planLabel}
                        </span>
                      </div>
                      <Link
                        href={item.createPageUrl}
                        className="block w-full py-2.5 px-4 bg-accent hover:bg-accent-hover text-text-primary text-center rounded-full text-xs font-bold transition-colors"
                      >
                        このスタイルで作る
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border-t border-border">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-text-muted font-medium uppercase tracking-[0.06em]">
                      {item.industryLabel}
                    </span>
                    <span className="font-heading text-sm font-bold text-text-primary">
                      {item.brandName}
                    </span>
                  </div>
                  <div className="flex gap-1" aria-label="使用カラー">
                    {item.colors.slice(0, 3).map((color, index) => (
                      <span
                        key={index}
                        className="w-3.5 h-3.5 rounded-full border border-black/[0.08]"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div ref={loaderRef} className={`flex justify-center py-12 ${isLoading ? 'block' : 'hidden'}`}>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>

          {!hasMore && displayed.length > 0 && (
            <div className="text-center py-12">
              <p className="text-base text-text-muted mb-5">
                全 <strong className="text-text-primary">{filtered.length}</strong> 件を表示しました
              </p>
              <Link href="/create" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-primary font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
                あなたのロゴを作る →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Review Band */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 grid md:grid-cols-[1fr_auto_1fr_auto] gap-8 md:gap-10 items-center">
            <div className="text-center md:text-left">
              <div className="text-accent text-xl mb-3">★★★★★</div>
              <p className="font-heading text-xl font-bold text-text-primary mb-2">
                「想像以上の 퀄리티で驚きました」
              </p>
              <p className="text-sm text-text-muted">— 飲食店オーナー、大阪</p>
            </div>
            <div className="hidden md:block w-px h-20 bg-border" aria-hidden="true" />
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-2">
                <span className="font-number text-2xl md:text-3xl font-semibold text-primary">98%</span>
                <span className="text-sm text-text-secondary">のユーザーがロゴに満足</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-number text-2xl md:text-3xl font-semibold text-primary">500+</span>
                <span className="text-sm text-text-secondary">件の5つ星レビュー</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-number text-2xl md:text-3xl font-semibold text-primary">2分</span>
                <span className="text-sm text-text-secondary">平均生成時間</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Link href="/create" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-primary font-bold px-8 py-3 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
                今すぐ試す →
              </Link>
              <p className="text-xs text-text-muted">無料から・返金保証あり</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Industry CTA Grid */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase block mb-3">業種別に見る</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">あなたの業種のロゴを確認する</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { slug: '/industry/restaurant', icon: '🍜', label: '飲食店', count: '320件' },
              { slug: '/industry/beauty', icon: '💇', label: '美容・ Salon', count: '280件' },
              { slug: '/industry/it', icon: '💻', label: 'IT・Web', count: '210件' },
              { slug: '/industry/retail', icon: '🛍️', label: '小売・EC', count: '190件' },
              { slug: '/industry/medical', icon: '🏥', label: '医療・健康', count: '150件' },
              { slug: '/industry/legal', icon: '⚖️', label: '士業・法律', count: '120件' },
            ].map((item) => (
              <Link key={item.slug} href={item.slug} className="flex flex-col items-center gap-2 p-6 bg-white border border-border rounded-xl text-center hover:border-primary hover:shadow-sm transition-all hover:-translate-y-0.5">
                <span className="text-2xl md:text-3xl">{item.icon}</span>
                <span className="font-heading text-sm font-bold text-text-primary">{item.label}</span>
                <span className="text-xs text-text-muted">{item.count}の事例</span>
              </Link>
            ))}
            <Link href="/works" className="flex flex-col items-center justify-center gap-2 p-6 bg-bg-section border border-dashed border-border rounded-xl text-center hover:border-primary hover:bg-white transition-all hover:-translate-y-0.5">
              <span className="text-2xl md:text-3xl font-bold text-primary">＋</span>
              <span className="font-heading text-sm font-bold text-text-primary">全業種を見る</span>
              <span className="text-xs text-text-muted">47業種対応</span>
            </Link>
          </div>
        </div>
      </section>

      {/* GEO优化文本 */}
      <div className="max-w-[1200px] mx-auto px-6 pb-6">
        <p className="text-sm text-text-muted leading-relaxed">
          LogoAI.jpのロゴ生成事例ページでは、飲食店・美容沙龙・IT企業・士業・小売業など47業種にわたる12,000件以上のAIロゴ生成事例を掲載しています。全事例で日本語フォント100種以上から業種に最適なフォントを選択し、有料プランでは著作権がユーザーへ完全帰属します。業種・スタイル・カラーでフィルタリングして理想のロゴデザインを探せます。
        </p>
      </div>

      <BottomCTA title="あなたのロゴも、今日から。" description="まず無料で3案生成して、気に入ったものを購入するだけ。クレジットカード不要・7日間全额返金保証付き。" />

      {/* 结构化数据 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://logoai.jp/' }, { '@type': 'ListItem', position: 2, name: '生成事例', item: 'https://logoai.jp/works' }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'AIロゴ生成事例', description: 'LogoAI.jpで生成された業種別ロゴデザイン事例', numberOfItems: Math.min(12, filtered.length), itemListElement: filtered.slice(0, 12).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: `${item.industryLabel}ロゴ「${item.brandName}」`, image: `https://logoai.jp${item.imageUrl}`, description: `${item.industryLabel}向け。${item.fontType}、${item.colors[0]}の${item.styleLabel}デザイン。${item.planLabel}で生成。` })) }) }} />
    </main>
  )
}
