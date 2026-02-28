'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { FAQ_DATA, type FAQCategory } from '@/lib/faq-data'

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('copyright')
  const [searchQuery, setSearchQuery] = useState('')
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const popularSearches = ['著作権', '返金', 'SVG', '商标登记', '商用利用']

  const FAQ_CATEGORIES = [
    { id: 'copyright' as FAQCategory, label: '著作権・権利', icon: '📋', count: 6 },
    { id: 'payment' as FAQCategory, label: '料金・支払い', icon: '💰', count: 6 },
    { id: 'files' as FAQCategory, label: 'ファイル・仕様', icon: '📁', count: 5 },
    { id: 'quality' as FAQCategory, label: 'ロゴ生成・品質', icon: '✨', count: 5 },
    { id: 'trademark' as FAQCategory, label: '商标登记', icon: '⚖️', count: 5 },
    { id: 'account' as FAQCategory, label: 'アカウント・データ', icon: '👤', count: 5 },
  ]

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return null
    const query = searchQuery.toLowerCase()
    return FAQ_DATA.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.keywords.some((kw) => kw.toLowerCase().includes(query))
    )
  }, [searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSearchQuery('')
    setActiveCategory(categoryId as FAQCategory)
    const element = sectionRefs.current[categoryId]
    if (element) {
      const offset = 140
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('faq-category-nav')
      if (!nav) return
      const navBottom = nav.getBoundingClientRect().bottom
      if (navBottom <= 64) nav.classList.add('shadow-md')
      else nav.classList.remove('shadow-md')
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const faqSchemaData = FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  }))

  return (
    <main>

      {/* Hero + 検索 */}
      <section className="relative pt-28 pb-12 px-6 bg-bg-base overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <nav className="mb-8" aria-label="パンくずリスト">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link href="/" className="text-text-muted hover:text-primary transition-colors">ホーム</Link></li>
              <li className="text-text-muted">/</li>
              <li aria-current="page" className="text-text-primary font-medium">よくある質問</li>
            </ol>
          </nav>
          <div className="max-w-[680px] mx-auto text-center">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">よくある質問</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mt-4 mb-5">ご利用前のご疑問に、<br />全てお答えします。</h1>
            <p className="text-text-secondary text-base leading-relaxed mb-9">30問以上の質問と回答を掲載しています。キーワードで検索するか、カテゴリから探してください。</p>

            <div className="relative max-w-[560px] mx-auto mb-6">
              <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) handleSearch(searchQuery.trim()) }} role="search">
                <div className="flex items-center gap-3 bg-white border-2 border-border rounded-2xl p-3.5 md:p-4 shadow-md focus-within:border-accent focus-within:shadow-[0_0_0_4px_rgba(201,150,58,0.1)] transition-all">
                  <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="9" cy="9" r="6" strokeWidth="1.5" /><path d="M13.5 13.5L17 17" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="例：著作権、SVG、返金、商標登録..." className="flex-1 border-none outline-none font-body text-base text-text-primary bg-transparent placeholder:text-text-muted" aria-label="よくある質問を検索" />
                  <kbd className="text-[10px] text-text-muted bg-bg-section border border-border rounded px-1.5 py-0.5 font-mono flex-shrink-0" aria-hidden="true">⌘K</kbd>
                </div>
              </form>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2">
              <span className="text-xs text-text-muted">よく検索される：</span>
              {popularSearches.map((tag) => (
                <button key={tag} onClick={() => { setSearchQuery(tag); handleSearch(tag) }} className="text-xs px-3 py-1.5 bg-white border border-border rounded-full text-text-secondary hover:border-primary hover:text-primary transition-colors">{tag}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* カテゴリナビゲーション */}
      <div id="faq-category-nav">
        <div className="sticky top-16 z-40 bg-[rgba(250,250,247,0.95)] backdrop-blur-xl border-b border-border">
          <div className="max-w-[1200px] mx-auto px-6">
            <nav className="flex gap-1 py-3 overflow-x-auto scrollbar-hide" aria-label="FAQカテゴリ">
              {FAQ_CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => handleCategoryChange(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-primary text-white' : 'bg-white text-text-secondary border border-border hover:border-primary hover:text-primary'}`}>
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-xs ${activeCategory === cat.id ? 'text-white/70' : 'text-text-muted'}`}>{cat.count}問</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* FAQコンテンツ */}
      <section className="py-12 md:py-16 bg-bg-base">
        <div className="max-w-[900px] mx-auto px-6">
          {filteredData ? (
            <div>
              <div className="mb-6">
                <h2 className="font-heading text-xl font-bold text-text-primary">「{searchQuery}」の検索結果</h2>
                <p className="text-sm text-text-muted mt-1">{filteredData.length}件の結果</p>
              </div>
              {filteredData.length > 0 ? (
                <div className="space-y-4">
                  {filteredData.map((item) => {
                    const category = FAQ_CATEGORIES.find((c) => c.id === item.category)
                    return (
                      <div key={item.id} className="border border-border rounded-xl bg-white overflow-hidden">
                        <button onClick={() => { const el = document.getElementById(`ans-${item.id}`); if (el) el.classList.toggle('hidden') }} className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-section/50 transition-colors" aria-expanded="false">
                          <span className="font-medium text-text-primary pr-4">{item.question}</span>
                          <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all ${document.getElementById(`ans-${item.id}`)?.classList.contains('hidden') === false ? 'bg-primary text-white rotate-180' : 'bg-bg-section text-text-muted'}`}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </span>
                        </button>
                        <div id={`ans-${item.id}`} className="hidden px-5 pb-5">
                          <div className="text-text-secondary leading-relaxed space-y-3">
                            {item.answer.split('。').filter(s => s.trim()).map((sentence, i) => (<p key={i}>{sentence}。</p>))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-16"><p className="text-text-secondary mb-4">に一致する検索結果がありません</p><p className="text-sm text-text-muted">別のキーワードで検索してみてください</p></div>
              )}
            </div>
          ) : (
            <div className="space-y-16">
              {FAQ_CATEGORIES.map((category) => (
                <div key={category.id} ref={(el) => { sectionRefs.current[category.id] = el }}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="font-heading text-2xl font-bold text-text-primary">{category.label}</h2>
                    <span className="text-sm text-text-muted">{category.count}問</span>
                  </div>
                  <div className="space-y-4">
                    {FAQ_DATA.filter((item) => item.category === category.id).map((item) => (
                      <div key={item.id} className="border border-border rounded-xl bg-white overflow-hidden">
                        <button onClick={() => { const el = document.getElementById(`ans-${item.id}`); if (el) el.classList.toggle('hidden') }} className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-section/50 transition-colors">
                          <span className="font-medium text-text-primary pr-4">{item.question}</span>
                          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-bg-section text-text-muted">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </span>
                        </button>
                        <div id={`ans-${item.id}`} className="hidden px-5 pb-5">
                          <div className="text-text-secondary leading-relaxed space-y-3">
                            {item.answer.split('。').filter(s => s.trim()).map((sentence, i) => (<p key={i}>{sentence}。</p>))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* サポートCTA */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">まだ解決しない場合</h2>
          <p className="text-text-secondary mb-8">上記以外のご疑問点がございましたら、お気軽に問い合わせください。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">お問い合わせフォーム</Link>
            <Link href="/create" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">ロゴを生成してみる</Link>
          </div>
        </div>
      </section>

      {/* 関連ページリンク */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold text-text-primary text-center mb-10">関連ページ</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { href: '/how-it-works', label: 'How It Works', description: 'ロゴ生成の流れ' },
              { href: '/works', label: 'Logo Gallery', description: '生成事例' },
              { href: '/pricing', label: 'Pricing', description: '料金プラン' },
              { href: '/features', label: 'Features', description: '機能・サービス' },
              { href: '/privacy', label: 'Privacy Policy', description: 'プライバシーポリシー' },
              { href: '/terms', label: 'Terms', description: '利用規約' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="flex flex-col p-5 bg-white border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all">
                <span className="font-heading text-base font-bold text-text-primary mb-1">{link.label}</span>
                <span className="text-xs text-text-muted">{link.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqSchemaData }) }} />
    </main>
  )
}
