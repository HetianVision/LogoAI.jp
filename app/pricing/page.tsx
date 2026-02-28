'use client'

import { useState } from 'react'
import Link from 'next/link'
import BottomCTA from '@/components/BottomCTA'

// Section 1: Page Hero
function PageHero() {
  return (
    <section className="relative pt-28 pb-12 overflow-hidden bg-bg-base">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(26,58,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,58,42,1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <nav className="mb-8" aria-label="パンくずリスト">
          <ol className="flex gap-2 text-sm text-text-muted list-none p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">ホーム</Link></li>
            <li><span className="mx-2 opacity-40">/</span></li>
            <li className="text-text-secondary" aria-current="page">料金プラン</li>
          </ol>
        </nav>

        <div className="max-w-[880px] mx-auto text-center">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">料金プラン</span>
          <h1 className="font-heading text-4xl font-bold text-text-primary leading-tight mt-4 mb-5">
            シンプルで透明な料金体系。<br />隠れた費用は一切ありません。
          </h1>
          <p className="text-text-secondary leading-relaxed mb-10">
            著作権の範囲・使用可能な機能・返金条件を全てこのページに明記しています。
            不明な点はページ下部のよくある質問でご確認。
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold text-lg">★</div>
              <div>
                <div className="font-bold text-text-primary text-sm">著作権100%帰属</div>
                <div className="text-xs text-text-muted">有料プランのロゴは完全にあなたのもの</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold text-lg">✓</div>
              <div>
                <div className="font-bold text-text-primary text-sm">7日間全额返金保証</div>
                <div className="text-xs text-text-muted">メール1通で返金申請完了</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold text-lg">🔒</div>
              <div>
                <div className="font-bold text-text-primary text-sm">データは学習に使用しない</div>
                <div className="text-xs text-text-muted">ブランド名・ロゴデータの外部提供なし</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Section 2: Toggle
function PricingToggle() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-8 bg-bg-base text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="inline-flex items-center gap-4 bg-white rounded-full p-1.5 border border-border shadow-sm">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isYearly ? 'bg-primary text-text-inverse' : 'text-text-secondary hover:text-primary'}`}
          >
            1回払い
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isYearly ? 'bg-primary text-text-inverse' : 'text-text-secondary hover:text-primary'}`}
          >
            月額換算 <span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded-full font-bold ml-1">参考</span>
          </button>
        </div>
      </div>
    </section>
  )
}

// Section 3: Pricing Cards
function PricingCards() {
  const [isYearly, setIsYearly] = useState(false)

  interface Feature {
    text: string
    ok: boolean
    tag?: string
  }

  const plans: Array<{
    name: string
    price: string
    period: string
    description: string
    originalPrice?: string
    badge?: string
    features: Feature[]
    highlight: boolean
    cta: string
  }> = [
    {
      name: '無料',
      price: '¥0',
      period: '（試用版）',
      description: 'ロゴデザインを試したい方向け',
      features: [
        { text: 'Logo生成 3回まで', ok: true },
        { text: '低解像度ダウンロード', ok: true },
        { text: 'SNS用画像のみ', ok: true },
        { text: '商用利用', ok: false },
        { text: '著作権帰属証明書', ok: false },
        { text: 'ブランド套案', ok: false },
      ],
      highlight: false,
      cta: '無料で試してみる',
    },
    {
      name: 'スタンダード',
      price: isYearly ? '¥3,980' : '¥4,980',
      period: isYearly ? '/月（年額）' : '/回',
      description: 'プロ品質ロゴを1点作成',
      originalPrice: isYearly ? '¥59,760' : '¥4,980',
      badge: '人気No.1',
      features: [
        { text: 'Logo 1点作成', ok: true },
        { text: 'SVG・PNG・PDF出力', ok: true },
        { text: '日本語フォント 100種以上', ok: true },
        { text: '商用利用 OK', ok: true },
        { text: '著作権帰属証明書 PDF', ok: true },
        { text: 'ブランド套案（名刺・SNS）', ok: true },
      ],
      highlight: true,
      cta: 'このプランで始める',
    },
    {
      name: 'プレミアム',
      price: isYearly ? '¥7,800' : '¥9,800',
      period: isYearly ? '/月（年額）' : '/回',
      description: '法人・複数ブランド向け',
      features: [
        { text: 'Logo 3点作成', ok: true },
        { text: 'SVG・PNG・PDF・AI出力', ok: true },
        { text: '日本語フォント 全て＋カスタム', ok: true },
        { text: '商用利用 OK', ok: true },
        { text: '著作権帰属証明書 PDF', ok: true },
        { text: 'ブランド套案 豪華版', ok: true, tag: 'NEW' },
        { text: 'チームメンバー 5名', ok: true },
        { text: '優先サポート', ok: true },
      ],
      highlight: false,
      cta: 'このプランで始める',
    },
  ]

  return (
    <section className="py-16 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-5 max-w-[1000px] mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-7 relative transition-all ${
                plan.highlight
                  ? 'ring-2 ring-accent shadow-xl -mt-2 pt-9'
                  : 'border border-border'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-text-primary text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <div className="text-center mb-5">
                <h3 className="font-heading text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <div className="mb-1">
                  <span className="font-number text-[44px] font-semibold text-primary leading-none">{plan.price}</span>
                  <span className="text-text-muted text-sm">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-xs text-text-muted line-through">{plan.originalPrice}</span>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">20%OFF</span>
                  </div>
                )}
                <p className="text-text-secondary text-sm mt-2">{plan.description}</p>
              </div>

              <div className="h-px bg-border my-5" />

              <ul className="space-y-2.5 mb-7">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className={`flex items-start gap-2.5 text-sm ${feature.ok ? 'text-text-secondary' : 'text-text-muted opacity-50'}`}>
                    <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold ${feature.ok ? (plan.highlight ? 'bg-accent/20 text-accent' : 'bg-green-100 text-green-700') : 'bg-black/5 text-text-muted'}`}>
                      {feature.ok ? '✓' : '✗'}
                    </span>
                    <span className="leading-snug">{feature.text}</span>
                    {feature.tag && (
                      <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded-full font-bold ml-auto">{feature.tag}</span>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                href="/create"
                className={`block text-center py-3.5 rounded-full font-bold transition-all ${
                  plan.highlight
                    ? 'bg-accent hover:bg-accent-dark text-text-primary'
                    : 'bg-primary hover:bg-primary-dark text-text-inverse'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Section 4: Copyright Info
function CopyrightInfo() {
  return (
    <section className="py-16 md:py-24 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center gap-4 px-9 py-7 bg-primary">
            <div className="w-13 h-13 bg-white/10 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">📋</div>
            <h2 className="font-heading text-2xl font-bold text-white">著作権について、正直elezしてください</h2>
          </div>

          <div className="p-9">
            <p className="text-text-secondary leading-relaxed mb-7 pb-7 border-b border-border">
              日本の文化庁は「AIが完全に自律的に生成したコンテンツには、著作権が発生しない場合がある」という見解を示しています。
              このためAIツールで作成したロゴの著作権は、サービスによって扱いが異なります。
            </p>

            <div className="grid md:grid-cols-[1fr,1fr] gap-6 mb-6">
              <div className="bg-bg-section rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs bg-bg-base text-text-muted px-2.5 py-1 rounded-full font-bold border border-border">無料プラン</span>
                  <h3 className="font-bold text-text-primary">著作権：当社に帰属</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-text-muted pl-5 relative">
                    <span className="absolute left-0">✗</span>
                    商用利用不可
                  </li>
                  <li className="flex items-center gap-2 text-sm text-text-muted pl-5 relative">
                    <span className="absolute left-0">✗</span>
                    商標登録申請不可
                  </li>
                  <li className="flex items-center gap-2 text-sm text-text-muted pl-5 relative">
                    <span className="absolute left-0">✗</span>
                    SNSプロフィール以外の使用不可
                  </li>
                </ul>
                <p className="text-xs text-text-muted">無料プランはロゴのデザインイメージを確認するための試用目的です。</p>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs bg-primary text-white px-2.5 py-1 rounded-full font-bold">有料プラン</span>
                  <h3 className="font-bold text-text-primary">著作権：お客様に100%帰属</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-text-secondary pl-5 relative">
                    <span className="absolute left-0 text-green-700 font-bold">✓</span>
                    商用利用（全用途）
                  </li>
                  <li className="flex items-center gap-2 text-sm text-text-secondary pl-5 relative">
                    <span className="absolute left-0 text-green-700 font-bold">✓</span>
                    商標登録申請
                  </li>
                  <li className="flex items-center gap-2 text-sm text-text-secondary pl-5 relative">
                    <span className="absolute left-0 text-green-700 font-bold">✓</span>
                    第三者への譲渡・ライセンス
                  </li>
                  <li className="flex items-center gap-2 text-sm text-text-secondary pl-5 relative">
                    <span className="absolute left-0 text-green-700 font-bold">✓</span>
                    著作権帰属証明書PDF発行
                  </li>
                </ul>
                <p className="text-xs text-text-muted leading-relaxed">
                  ユーザーがデザインの選択・指示・編集に参加するプロセスを設計し、
                  「ユーザーの創作的寄与」の記録を証明書に明記しています。
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-text-muted p-3.5 bg-bg-section rounded-lg flex-wrap">
              <span>20%</span>
              <a href="https://www.bunka.go.jp/seisaku/chosakuken/pdf/93903601_01.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">文化庁「AIと著作権に関する考え方について」</a>
              <span>・</span>
              <Link href="/copyright" className="text-primary underline">当サービスの著作権詳細ページ →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Section 5: Refund Guarantee
function RefundGuarantee() {
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </div>
        <h2 className="font-heading text-3xl font-bold text-text-inverse mb-4">
          7日間全额返金保証
        </h2>
        <p className="text-text-inverse/80 mb-6 max-w-[500px] mx-auto">
          生成されたロゴがご要望に沿わない場合、
          お支払いいただいた料金を全额返金いたします。
          返金申請はメール1通で完了いたします。
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-text-inverse/60">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            理由を問わない返金
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            申請後3営業日以内返金
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            面倒な手続き一切なし
          </div>
        </div>
      </div>
    </section>
  )
}

// Section 6: Feature Comparison
function FeatureComparison() {
  const features = [
    { name: 'Logo生成', free: '3回', standard: '1点', premium: '3点' },
    { name: 'ダウンロード形式', free: 'PNGのみ', standard: 'SVG・PNG・PDF', premium: 'SVG・PNG・PDF・AI' },
    { name: '日本語フォント', free: '5種', standard: '100種以上', premium: '全て＋カスタム' },
    { name: '商用利用', free: '✗', standard: '✓', premium: '✓' },
    { name: '著作権帰属証明書', free: '✗', standard: '✓', premium: '✓' },
    { name: 'ブランド套案', free: '✗', standard: '✓', premium: '✓（豪華版）' },
    { name: 'チームメンバー', free: '1名', standard: '1名', premium: '5名' },
    { name: '優先サポート', free: '✗', standard: '✗', premium: '✓' },
  ]

  return (
    <section className="py-16 bg-bg-base">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-3">すべての機能を比較</h2>
          <p className="text-text-secondary">各プランの詳細な機能比較</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl border border-border overflow-hidden">
            <thead>
              <tr className="bg-bg-section">
                <th className="text-left p-4 font-medium text-text-secondary">機能</th>
                <th className="p-4 font-bold text-text-primary">無料</th>
                <th className="p-4 font-bold text-primary">スタンダード</th>
                <th className="p-4 font-bold text-text-primary">プレミアム</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-bg-base'}>
                  <td className="p-4 text-text-secondary">{row.name}</td>
                  <td className="p-4 text-center text-text-muted">{row.free}</td>
                  <td className="p-4 text-center font-bold text-primary">{row.standard}</td>
                  <td className="p-4 text-center text-text-primary">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// Section 7: Payment Methods
function PaymentMethods() {
  return (
    <section className="py-16 bg-bg-section">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">お支払い方法</h2>
        <p className="text-text-secondary mb-6">
          クレジットカード(VISA/MasterCard/Amex)、PayPay対応。
          セキュリティはPCI DSS準拠で安全に決済いただけます。
        </p>
        <div className="flex justify-center gap-4">
          <div className="px-4 py-2 bg-white rounded-lg border border-border text-sm text-text-muted">VISA</div>
          <div className="px-4 py-2 bg-white rounded-lg border border-border text-sm text-text-muted">MasterCard</div>
          <div className="px-4 py-2 bg-white rounded-lg border border-border text-sm text-text-muted">Amex</div>
          <div className="px-4 py-2 bg-white rounded-lg border border-border text-sm text-text-muted">PayPay</div>
        </div>
      </div>
    </section>
  )
}

// Section 8: FAQ
function FAQ() {
  const faqs = [
    {
      q: '支払い後すぐにロゴをダウンロードできますか？',
      a: 'はい、支払い完了直後にダウンロードいただけます。SVG・PNG・PDF等の形式で即座にダウンロード可能です。著作権証明書PDFも同時に発行されます。',
    },
    {
      q: '領収書・インボイス（適格請求書）はもらえますか？',
      a: 'はい、対応しています。支払い完了後にマイページからインボイス対応の適格請求書（PDF）を即時発行できます。法人名義の発行も可能。',
    },
    {
      q: '1回払いで購入したロゴを後から修正できますか？',
      a: 'はい、有料プランでダウンロード後もマイページからロゴの編集・再ダウンロードが無制限で行えます。データは永久保存されます。',
    },
    {
      q: 'プランのアップグレード・ダウングレードはできますか？',
      a: '各プランは1ロゴあたりの1回払いのため、プラン変更という概念がありません。次のロゴを作成する際に、別のプランを選択するだけです。',
    },
    {
      q: '複数のロゴを作りたい場合の料金は？',
      a: '数はロゴ1点あたりの一回払いです。2点目以降も同じ料金が適用されます。複数ブランドのロゴをまとめて作成される法人向けにはボリュームディスカウントを検討中です。',
    },
    {
      q: '無料プランで作ったロゴを後で有料版に変換できますか？',
      a: 'はい、できます。無料プランで気に入ったデザインを見つけたら、マイページから「有料プランで取得する」ボタンをクリックするだけで購入できます。',
    },
  ]

  return (
    <section className="py-16 bg-bg-base">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">よくある質問</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary mt-4 mb-3">購入前のご疑問にお答えします</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-0 mb-10">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white rounded-xl border border-border group">
              <summary className="px-6 py-4 cursor-pointer font-medium text-text-primary flex justify-between items-center">
                <span>{faq.q}</span>
                <svg className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8l5 5 5-5" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-text-secondary leading-relaxed">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="text-center">
          <Link href="/faq" className="inline-block border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-3 rounded-full transition-all">
            その他のよくある質問はこちら →
          </Link>
        </div>
      </div>
    </section>
  )
}

// Section 9: User Reviews
function UserReviews() {
  const reviews = [
    {
      text: '「デザイン会社に頼もうとしたら30万と言われ断念。こちらで試したら¥4,980でプロ品質のロゴが作れました。著作権証明書も付いてくるので商標申請にも使えました。」',
      name: '田中さん',
      role: 'ITスタートアップ代表・東京',
      avatar: '田',
      bg: '#2D7A4F',
      plan: 'スタンダード購入',
    },
    {
      text: '「他のAIツールは著作権が曖昧で怖かった。このサービスは無料・有料の権利の違いが明確で、証明書も発行してもらえるので安心して商標申請できました。」',
      name: '鈴木さん',
      role: '行政書士・大阪',
      avatar: '鈴',
      bg: '#1F5C9A',
      plan: 'プレミアム購入',
    },
    {
      text: '「最初は半信半疑で無料から試したら想像以上に良いデザインが出てきました。気に入ったものが見つかったのでスタンダードに変換。操作も簡単で5分もかかりませんでした。」',
      name: '山上さん',
      role: '個人事業主・名古屋',
      avatar: '山',
      bg: '#8B4513',
      plan: 'スタンダード購入',
    },
  ]

  return (
    <section className="py-16 bg-bg-section">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">購入者の声</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary mt-4 mb-3">実際に使った方のリアルな感想</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-text-secondary mb-4 leading-relaxed">「{review.text}」</p>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: review.bg }}>
                  {review.avatar}
                </div>
                <div>
                  <div className="font-bold text-text-primary">{review.name}</div>
                  <div className="text-sm text-text-muted">{review.role}</div>
                </div>
                <div className="ml-auto text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-bold">
                  {review.plan}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Main Page
export default function PricingPage() {
  return (
    <main>
      <PageHero />
      <PricingToggle />
      <PricingCards />
      <CopyrightInfo />
      <RefundGuarantee />
      <FeatureComparison />
      <PaymentMethods />
      <FAQ />
      <UserReviews />
      <BottomCTA
        title="まずは無料で試してみてください。"
        description="気に入ったロゴが見つかれば、その時点で有料プランへの移行ができます。クレジットカード不要・登録は30秒・7日間全额返金保証付き。"
      />
    </main>
  )
}
