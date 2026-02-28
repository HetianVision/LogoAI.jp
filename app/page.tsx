'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BottomCTA from '@/components/BottomCTA'

// Hero 组件
function Hero() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [demoStage, setDemoStage] = useState(0)

  const demoData = [
    { brand: '田中製菓', industry: '食品・菓子', color: 'ゴールド' },
    { brand: 'SAKURA法律', industry: '士業・法律', color: '深墨' },
    { brand: 'Yuki Beauty', industry: '美容サロン', color: 'ペールピンク' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStage(prev => {
        if (prev < 3) return prev + 1
        return 0
      })
      if (demoStage === 3) {
        setCurrentDemo(prev => (prev + 1) % demoData.length)
      }
    }, 2500)
    return () => clearInterval(timer)
  }, [demoStage])

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* 左侧内容 */}
          <div className="lg:col-span-3">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent font-medium text-xs tracking-wider">日本語フォント100種以上 搭載</span>
            </div>

            {/* 主标题 */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              AIで、あなただけの<br />
              <em className="text-accent italic not-underline relative">
                ロゴ
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 8" fill="none">
                  <path d="M2 6C30 2 70 2 98 6" stroke="#C9963A" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </em>
              を。
            </h1>
            <p className="font-heading text-2xl md:text-3xl text-text-secondary mb-6">
              5分で完成、著作権もあなたのもの。
            </p>

            {/* 副标题说明 */}
            <p className="text-lg text-text-secondary leading-relaxed max-w-[520px] mb-8">
              業種を選んで、ブランド名を入力するだけ。<br />
              100種類以上の日本語フォントから、プロ品質のロゴをAIが自動生成します。<br />
              <strong className="text-text-primary font-bold">商用利用OK・商標登録対応・全额返金保証付き。</strong>
            </p>

            {/* CTA按钮 */}
            <div className="flex flex-wrap gap-4 mb-7">
              <Link href="/create" className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2">
                無料でロゴを作る
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/pricing" className="border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-4 rounded-full transition-all">
                料金を見る
              </Link>
            </div>

            {/* 信任标签 */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                クレジットカード不要
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                7日間返金保証
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                著作権100%帰属
              </div>
            </div>
          </div>

          {/* 右侧演示区 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-border animate-float">
              {/* 输入阶段 */}
              <div className={`transition-all duration-500 ${demoStage >= 1 ? 'opacity-100' : 'opacity-100'}`}>
                <div className="text-xs text-text-muted mb-2">ブランド名を入力</div>
                <div className="bg-bg-section rounded-lg px-4 py-3 flex items-center gap-2 mb-3">
                  <span className="font-heading text-xl text-primary">
                    {demoData[currentDemo].brand}
                  </span>
                  <span className="animate-blink text-primary">|</span>
                </div>
                <div className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                  業種：{demoData[currentDemo].industry}
                </div>
              </div>

              {/* 生成中 */}
              <div className={`my-4 transition-all duration-500 ${demoStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-center gap-2 py-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-text-secondary">AIが生成中...</span>
                </div>
              </div>

              {/* 结果展示 */}
              <div className={`grid grid-cols-3 gap-3 mt-4 transition-all duration-500 ${demoStage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="aspect-square bg-bg-section rounded-lg flex flex-col items-center justify-center p-2">
                  <div className="font-heading text-sm text-primary mb-1">{demoData[currentDemo].brand}</div>
                  <div className="text-[10px] text-text-muted">{demoData[currentDemo].color}</div>
                </div>
                <div className="aspect-square bg-bg-section rounded-lg flex flex-col items-center justify-center p-2">
                  <div className="font-heading text-sm text-primary mb-1">{demoData[currentDemo].brand}</div>
                  <div className="text-[10px] text-text-muted">ヒラギノ角ゴ</div>
                </div>
                <div className="aspect-square bg-bg-section rounded-lg flex flex-col items-center justify-center p-2">
                  <div className="font-heading text-sm text-primary mb-1">{demoData[currentDemo].brand}</div>
                  <div className="text-[10px] text-text-muted">A1ゴシック</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Trust Bar 组件
function TrustBar() {
  return (
    <section className="bg-primary py-5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap justify-center items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-1">
          <span className="font-number text-2xl font-semibold text-accent">5,000<small className="text-xs font-body">社以上</small></span>
          <span className="text-xs text-text-inverse/60 tracking-wider">ご利用実績</span>
        </div>

        <div className="hidden md:block w-px h-8 bg-text-inverse/15" />

        <div className="flex flex-col items-center gap-1">
          <span className="font-number text-2xl font-semibold text-accent">★ 4.9</span>
          <span className="text-xs text-text-inverse/60 tracking-wider">ユーザー満足度</span>
        </div>

        <div className="hidden md:block w-px h-8 bg-text-inverse/15" />

        <div className="flex flex-col items-center gap-1">
          <span className="font-number text-2xl font-semibold text-accent">2分</span>
          <span className="text-xs text-text-inverse/60 tracking-wider">平均ロゴ完成時間</span>
        </div>

        <div className="hidden md:block w-px h-8 bg-text-inverse/15" />

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-text-inverse/50 tracking-wider">掲載メディア</span>
          <div className="flex gap-5 items-center">
            <div className="h-5 text-text-inverse/40 font-bold text-xs tracking-wider">TECH</div>
            <div className="h-5 text-text-inverse/40 font-bold text-xs tracking-wider"> Forbes</div>
            <div className="h-5 text-text-inverse/40 font-bold text-xs tracking-wider">NIKKEI</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features 组件
function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      title: '日本語フォント100種以上',
      description: '游明朝体、ヒラギノ角ゴ、A1ゴシックなど、日本のビジネスシーンに最適化されたフォントを搭載。',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: '著作権100%帰属',
      description: '生成されたロゴの著作権はお客様に完全帰属。商用利用・商標登録どちらでも問題ありません。',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'ブランド套案も自動生成',
      description: 'ロゴだけでなく、名刺、封筒、SNSアイコンまで。ブランディングに必要な一式を出力します。',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">なぜ選ばれるのか</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
            海外ツールとは異なり、<br className="md:hidden" />
            日本のためのロゴAI
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-5">
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// HowItWorks 组件
function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: '業種とブランド名を入力',
      description: ' inúmerate行业的种类和公司/品牌名称。仅需30秒即可完成输入。',
    },
    {
      number: '02',
      title: 'スタイルを選択',
      description: '「モダン」「伝統」「かわいい」など、多様なスタイルから選択。',
    },
    {
      number: '03',
      title: 'AIがロゴを生成',
      description: '約2分間で、AIが複数のLogo案を生成。',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">How It Works</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
            3つのステップで<br className="md:hidden" />
            ロゴが完成
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-xl border border-border h-full">
                <span className="font-number text-6xl font-semibold text-accent/20 absolute top-4 right-6">{step.number}</span>
                <h3 className="font-heading text-xl font-bold text-text-primary mb-3 relative z-10">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed relative z-10">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/create" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-text-primary font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
            無料でロゴを作る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Logo展示区
function LogoShowcase() {
  const [activeTab, setActiveTab] = useState(0)

  const categories = ['すべて', '食品・サービス', 'IT・テクノロジー', '美容・健康', '士業・法律']
  const logos = [
    { name: '田中製菓', industry: '食品・サービス', font: '游明朝体' },
    { name: 'SAKURA法律', industry: '士業・法律', font: 'ヒラギノ角ゴ' },
    { name: 'Yuki Beauty', industry: '美容・健康', font: 'A1ゴシック' },
    { name: 'TechWave', industry: 'IT・テクノロジー', font: 'Noto Sans' },
    { name: 'ンブル CAFE', industry: '食品・サービス', font: '筑紫A丸ゴシック' },
    { name: '上山会計', industry: '士業・法律', font: '大明寺楷書' },
  ]

  return (
    <section className="py-16 md:py-24 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">Logo Gallery</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
            実際に生成された<br className="md:hidden" />
            ロゴ事例
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === index
                  ? 'bg-primary text-text-inverse'
                  : 'bg-bg-section text-text-secondary hover:bg-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {logos.map((logo, index) => (
            <div key={index} className="aspect-square bg-white rounded-xl border border-border p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow group">
              <div className="font-heading text-2xl md:text-3xl text-primary mb-2">{logo.name}</div>
              <div className="text-xs text-text-muted">{logo.industry}</div>
              <div className="text-[10px] text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{logo.font}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/works" className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
            もっと見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Pricing 组件
function Pricing() {
  const plans = [
    {
      name: '無料',
      price: '¥0',
      period: '',
      description: 'ロゴ作成を試したい方向け',
      features: ['3回までLogo生成', '低解像度ダウンロード', ' Basicフォントのみ'],
      highlight: false,
    },
    {
      name: 'プロフェッショナル',
      price: '¥2,980',
      period: '/月',
      description: 'ビジネス利用される方',
      features: ['無制限Logo生成', '高解像度・SVG出力', '日本語フォント100種', 'ブランド套案出力', '商用利用OK'],
      highlight: true,
    },
    {
      name: 'ビジネス',
      price: '¥9,800',
      period: '/月',
      description: '法人・チーム利用',
      features: ['プロフェッショナル全機能', 'チームメンバー5名', '優先サポート', 'APIアクセス', 'カスタムフォント追加'],
      highlight: false,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">Pricing</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
            シンプルな料金体系
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 ${
                plan.highlight
                  ? 'ring-2 ring-accent shadow-xl scale-105 relative'
                  : 'border border-border'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-text-primary text-xs font-bold px-4 py-1 rounded-full">
                  おすすめ
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="font-number text-4xl font-semibold text-primary">{plan.price}</span>
                  <span className="text-text-muted text-sm">{plan.period}</span>
                </div>
                <p className="text-text-secondary text-sm">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/create"
                className={`block text-center py-3 rounded-full font-bold transition-all ${
                  plan.highlight
                    ? 'bg-accent hover:bg-accent-dark text-text-primary'
                    : 'bg-primary hover:bg-primary-dark text-text-inverse'
                }`}
              >
                無料で始める
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials 组件
function Testimonials() {
  const reviews = [
    {
      name: '田中 健太',
      company: '田中製菓 代表',
      text: '初めてロゴを作りましたが、想像以上の出来栄え。日本語フォントの種類も豊富で、助かりました。',
      rating: 5,
    },
    {
      name: '佐藤 美咲',
      company: 'Yuki Beauty 代表',
      text: '可愛らしいロゴが欲しくてお願いしました。店の雰囲氣に合ったロゴを、AIが素早く生成してくれました。',
      rating: 5,
    },
    {
      name: '鈴木 一郎',
      company: 'SAKURA法律 代表',
      text: '信頼感のあるロゴが必要でした。深い绿色のロゴ，让我非常满意。',
      rating: 5,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">Reviews</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
            ご利用者様の声
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-secondary mb-4 leading-relaxed">「{review.text}」</p>
              <div className="border-t border-border pt-4">
                <div className="font-bold text-text-primary">{review.name}</div>
                <div className="text-sm text-text-muted">{review.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ 组件
function FAQ() {
  const faqs = [
    {
      q: '生成されたロゴは商用利用できますか？',
      a: 'はい、商用利用OK。著作権はお客様に100%帰属いたしますので、広告、HP、商品パッケージなど自由な用途でご利用いただけます。',
    },
    {
      q: 'クレジットカードなしで始められますか？',
      a: 'はい、無料プランではクレジットカード不要。ロゴ生成を3回お試しいただけます。',
    },
    {
      q: '商標登録できますか？',
      a: '生成されたロゴはオリジナル作品であるため、商標登録申請が可能です。ただし、既存の著名なロゴとの類似にはブログに表示ください。',
    },
    {
      q: '退款保証はありますか？',
      a: 'はい、7日間の全额返金保証。如果您对结果不满意，可以获得全额退款。',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-bg-section">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">FAQ</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
            よくある質問
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white rounded-xl border border-border group">
              <summary className="px-6 py-4 cursor-pointer font-medium text-text-primary flex justify-between items-center">
                {faq.q}
                <svg className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-text-secondary leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// Bottom CTA 组件

// 主页面组件
export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <LogoShowcase />
      <Pricing />
      <Testimonials />
      <FAQ />
      <BottomCTA
        title="5分で、あなただけの<br />ロゴができあがる"
        description="デザインや技術がなくても大丈夫。ブランド名を入力するだけで、AIがプロフェッショナルなLogoを生成。"
      />
    </main>
  )
}
