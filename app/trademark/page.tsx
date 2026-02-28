'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TrademarkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: '商標登録されると、他の人は同じロゴを使えなくなりますか？',
      answer: '登録した区分の商品・サービス領域内では他者の使用を禁止できます。全区分への保護ではなく、指定区分のみです。',
    },
    {
      question: '海外での商標登録も対応していますか？',
      answer: '当サービスは日本国内の商標登録申請のサポートが対象です。海外商標は弁理士・国際出願（マドリッドプロトコル）をご利用ください。',
    },
    {
      question: '商標類似チェックで低リスクでも、審査で拒絶されることはありますか？',
      answer: 'あります。特許庁の審査は当サービスのチェックより詳細であり、当サービスの結果は参考情報です。拒絶理由には類似性以外の要因もあります。',
    },
    {
      question: 'ロゴではなく文字（ブランド名）だけでも商標登録できますか？',
      answer: 'はい、文字商標（標準文字商標）として登録可能です。当サービスのロゴ生成とは別に、文字のみでも申請できます。',
    },
    {
      question: '商標登録後にロゴを変更した場合、再申請が必要ですか？',
      answer: '登録した商標と実際に使用するロゴが大きく異なる場合、新たに出願が必要になることがあります。ロゴ変更時は弁理士にご確認ください。',
    },
  ]

  return (
    <main>
      <Navbar />

      {/* SEO */}
      <title>AIロゴで商標登録 | J-PlatPat連携商標類似チェック機能【LogoAI.jp プレミアム】</title>
      <meta name="description" content="LogoAI.jpで生成したAIロゴで商標登録申請が可能。有料プランで著作権がユーザー帰属、著作権証明書も発行。プレミアムプランではJ-PlatPat連携で商標類似チェックも可能。" />
      <link rel="canonical" href="https://logoai.jp/trademark" />

      {/* Section 1: Page Hero */}
      <section className="relative pt-28 pb-16 px-6 bg-bg-base overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="パンくずリスト">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link href="/" className="text-text-muted hover:text-primary transition-colors">ホーム</Link></li>
              <li className="text-text-muted">/</li>
              <li aria-current="page" className="text-text-primary font-medium">商標登録について</li>
            </ol>
          </nav>

          <div className="max-w-[680px] mx-auto text-center">
            <span className="text-primary font-medium text-sm tracking-[0.1em] uppercase">商標登録について</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mt-4 mb-5">
              AIで作ったロゴでも、<br className="md:hidden" />商標登録できます。
            </h1>
            <p className="text-text-secondary text-base leading-relaxed mb-8">
              有料プランで生成したロゴは著作権がユーザーへ帰属し、
              商標登録申請に利用できます。
              プレミアムプランでは、J-PlatPatとのAI連携による
              商標類似チェック機能も搭載しています。
            </p>

            {/* 3つのポイント */}
            <div className="flex flex-col gap-2.5 text-left max-w-[480px] mx-auto mb-8 p-6 bg-white border border-border rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 text-sm text-text-secondary font-medium">
                <span className="text-green-700 font-bold w-5 text-center">✓</span>
                <span>有料プランのロゴは商標登録申請に利用可能</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary font-medium">
                <span className="text-green-700 font-bold w-5 text-center">✓</span>
                <span>著作権帰属証明書が補足書類として使える</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary font-medium">
                <span className="text-accent font-bold w-5 text-center">★</span>
                <span>プレミアム限定：J-PlatPat連携の商標類似チェック</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pricing#premium" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold text-base px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-md">
                プレミアムプランを見る →
              </Link>
              <Link href="/create" className="inline-flex items-center gap-2 bg-white border-2 border-border hover:border-primary text-text-primary font-bold text-base px-8 py-4 rounded-full transition-all hover:bg-primary/5">
                まず無料で試す
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 商標登録の基礎知識 */}
      <section className="py-16 md:py-24 px-6 bg-bg-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">基礎知識</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-4">商標登録とは何か、なぜ必要か</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
            {/* Card 1 */}
            <div className="bg-white border border-border rounded-2xl p-7 flex flex-col gap-4">
              <div className="text-3xl">🛡️</div>
              <h3 className="font-heading text-xl font-bold text-text-primary">商標登録とは</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                商標とは、自分の商品・サービスを他者のものと区別するために使用する
                マーク（ロゴ・文字・図形など）のことです。
                商標登録とは、そのマークを特許庁に登録し、
                <strong className="text-text-primary">独占的使用権（商標権）</strong>を取得することです。
              </p>
              <div className="flex flex-col gap-1.5 p-3.5 bg-green-50 border-l-2 border-green-700 rounded-lg">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">商標権を取得すると</span>
                <span className="text-xs text-text-secondary leading-relaxed">登録した商标を他者が無断使用した場合、使用停止・損害賠償を請求できます</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-border rounded-2xl p-7 flex flex-col gap-4">
              <div className="text-3xl">⚠️</div>
              <h3 className="font-heading text-xl font-bold text-text-primary">登録しないリスク</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                商標登録をしないでロゴを使用している場合、
                第三者が同じ・似たロゴで商標登録してしまうと、
                <strong className="text-text-primary">逆に使用禁止を求められる</strong>ことがあります。
                特に「先願主義」（先に出願した方が有利）の日本では、
                早期の商標登録が重要です。
              </p>
              <div className="flex flex-col gap-1.5 p-3.5 bg-amber-50 border-l-2 border-accent rounded-lg">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">実際にあるケース</span>
                <span className="text-xs text-text-secondary leading-relaxed">長年使っていたロゴと同じ商標を第三者が登録し、使用停止を余儀なくされた</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-border rounded-2xl p-7 flex flex-col gap-4">
              <div className="text-3xl">📋</div>
              <h3 className="font-heading text-xl font-bold text-text-primary">申請から登録まで</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                商標登録の出願は特許庁（またはJ-PlatPat経由）に行います。
                審査期間は通常<strong className="text-text-primary">6〜12ヶ月</strong>程度。
                登録料込みの費用は区分1つあたり
                <strong className="text-text-primary">約5〜10万円</strong>（弁理士費用含む）が目安です。
                自己出願の場合は区分1つあたり約3,400〜8,600円（特許庁印紙代のみ）。
              </p>
              <a href="https://www.j-platpat.inpit.go.jp/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline">
                特許庁 J-PlatPat →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: LogoAI.jpで商標登録できる理由 */}
      <section className="py-16 md:py-24 px-6 bg-bg-base">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* 左：説明 */}
            <div>
              <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">なぜ使えるか</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-tight mt-3 mb-7">
                LogoAI.jpのロゴが商標登録申請に使える3つの理由
              </h2>

              <div className="flex flex-col gap-6 mb-6">
                {/* Reason 1 */}
                <div className="flex gap-4">
                  <span className="font-number text-sm font-bold text-accent min-w-[24px] mt-0.5">01</span>
                  <div>
                    <strong className="block text-base font-bold text-text-primary mb-1.5">著作権がユーザーへ完全帰属する</strong>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      商標登録申請には、そのロゴの権利者であることが前提です。
                      有料プランでは著作権がユーザーへ100%帰属するため、
                      正当な権利者として申請できます。
                    </p>
                  </div>
                </div>

                {/* Reason 2 */}
                <div className="flex gap-4">
                  <span className="font-number text-sm font-bold text-accent min-w-[24px] mt-0.5">02</span>
                  <div>
                    <strong className="block text-base font-bold text-text-primary mb-1.5">著作権帰属証明書が補足書類として使える</strong>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      申請時に「このロゴの権利が自分にある」ことを示す
                      補足書類として、著作権帰属証明書PDFを添付できます。
                      特に弁理士経由での申請時に有効です。
                    </p>
                  </div>
                </div>

                {/* Reason 3 */}
                <div className="flex gap-4">
                  <span className="font-number text-sm font-bold text-accent min-w-[24px] mt-0.5">03</span>
                  <div>
                    <strong className="block text-base font-bold text-text-primary mb-1.5">SVG・PDF形式で特許庁の要件を満たす</strong>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      商標登録申請にはロゴデータの提出が必要です。
                      有料プランではSVG・PDF・高解像度PNGでダウンロードでき、
                      特許庁の願書添付図面の要件を満たします。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border-l-2 border-accent rounded-lg text-xs text-text-muted leading-relaxed">
                ※ 商標登録の可否は特許庁の審査によるものです。
                当サービスは登録を保証するものではありません。
                重要なブランドの場合は弁理士へのご相談を推奨します。
              </div>
            </div>

            {/* 右：申請チェックリスト */}
            <div>
              <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-md">
                <div className="bg-primary text-white text-sm font-bold px-6 py-4.5">
                  商標登録申請に必要なもの
                </div>
                <div className="py-2">
                  <div className="flex items-center gap-3 px-6 py-3.5 border-b border-border">
                    <span className="text-green-700 font-bold w-5 text-center">✓</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-text-primary font-medium">ロゴデータ（JPG/PNG）</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-green-50 text-green-700 rounded-full w-fit">LogoAI.jpで提供</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3.5 border-b border-border">
                    <span className="text-green-700 font-bold w-5 text-center">✓</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-text-primary font-medium">申請者情報（氏名・住所）</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-bg-section text-text-muted rounded-full w-fit">申請者が用意</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3.5 border-b border-border">
                    <span className="text-green-700 font-bold w-5 text-center">✓</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-text-primary font-medium">商標の区分選択（第1〜45類）</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-bg-section text-text-muted rounded-full w-fit">申請者が選択</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3.5 border-b border-border">
                    <span className="text-green-700 font-bold w-5 text-center">✓</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-text-primary font-medium">権利帰属の証明（任意）</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-green-50 text-green-700 rounded-full w-fit">著作権証明書でカバー</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3.5 border-b border-border">
                    <span className="text-green-700 font-bold w-5 text-center">✓</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-text-primary font-medium">類似商標の事前確認（推奨）</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-amber-50 text-accent rounded-full w-fit">プレミアムで対応</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3.5">
                    <span className="text-text-muted w-5 text-center">◦</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-text-primary font-medium">印紙代（3,400円〜/区分）</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-bg-section text-text-muted rounded-full w-fit">特許庁への支払い</span>
                    </div>
                  </div>
                </div>
                <a href="/pricing#premium" className="block mx-5 my-4 py-3.5 bg-primary text-white text-center text-sm font-bold rounded-full hover:bg-primary-light transition-colors">
                  著作権証明書 + 商標チェックを含むプレミアムへ →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 商標類似チェック機能 */}
      <section className="py-16 md:py-24 px-6 bg-bg-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">★ プレミアム限定機能</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-4">J-PlatPat連携 商標類似チェック</h2>
            <p className="text-text-secondary text-base max-w-[600px] mx-auto">
              生成したロゴが既存の登録商標と類似していないかを、
              特許庁のデータベース（J-PlatPat）とAIが照合してスコア評価します。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* 左：UIモックアップ */}
            <div>
              <div className="bg-white border border-border rounded-xl overflow-hidden shadow-xl">
                {/* Browser Bar */}
                <div className="bg-bg-section border-b border-border px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  </div>
                  <div className="flex-1 bg-white border border-border rounded-md px-3 py-1 text-xs text-text-muted text-center">
                    logoai.jp/dashboard/trademark-check
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  {/* Logo Row */}
                  <div className="flex gap-4 items-center p-4 bg-bg-section rounded-lg">
                    <div className="w-[100px] h-[60px] bg-white border border-border rounded-lg flex items-center justify-center">
                      <span style={{ fontFamily: 'serif', fontSize: '18px', fontWeight: 700, color: '#1A3A2A' }}>田中製菓</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-text-secondary mb-1.5">商標区分：第30類（菓子・パン）</div>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                        J-PlatPat照合中...
                      </div>
                    </div>
                  </div>

                  {/* Score Section */}
                  <div className="p-4 border border-border rounded-lg">
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2.5">総合リスクスコア</div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="flex-1 h-2.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full w-[22%] bg-green-700 rounded-full"></div>
                      </div>
                      <span className="font-number text-xl font-bold text-green-700">22 / 100</span>
                    </div>
                    <div className="text-xs font-bold px-3 py-1.5 bg-green-50 text-green-700 rounded-full w-fit">
                      ✓ 低リスク — 類似商标が見当たりません
                    </div>
                  </div>

                  {/* 3軸評価 */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-text-secondary min-w-[80px]">視覚的類似度</span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                          <div className="h-full w-[18%] bg-primary rounded-full"></div>
                        </div>
                        <span className="text-xs font-bold text-text-primary min-w-[20px] text-right">18</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-text-secondary min-w-[80px]">名称類似度</span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                          <div className="h-full w-[30%] bg-primary rounded-full"></div>
                        </div>
                        <span className="text-xs font-bold text-text-primary min-w-[20px] text-right">30</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-text-secondary min-w-[80px]">業種区分リスク</span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                          <div className="h-full w-[15%] bg-primary rounded-full"></div>
                        </div>
                        <span className="text-xs font-bold text-text-primary min-w-[20px] text-right">15</span>
                      </div>
                    </div>
                  </div>

                  {/* 推奨アクション */}
                  <div className="p-3.5 bg-green-50/50 border border-green-200/50 rounded-lg">
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5">推奨アクション</div>
                    <div className="text-xs text-text-secondary leading-relaxed mb-2.5">
                      類似リスクが低いため、商標登録申請を進めることができます。
                      念のため弁理士へのご確認をお勧めします。
                    </div>
                    <a href="https://www.j-platpat.inpit.go.jp/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary underline">
                      J-PlatPatで詳細確認 →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 右：機能説明 */}
            <div>
              <div className="flex flex-col gap-6">
                {/* Feature 1 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">🔍</div>
                  <div>
                    <strong className="block text-base font-bold text-text-primary mb-1.5">J-PlatPat連携照合</strong>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      日本特許庁の公式商標データベース「J-PlatPat」に収録された
                      登録済み・出願中の商標と照合します。
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">📊</div>
                  <div>
                    <strong className="block text-base font-bold text-text-primary mb-1.5">3軸スコア評価</strong>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      視覚的類似度・名称類似度・業種区分リスクの3軸で
                      0〜100のリスクスコアを算出。高リスク時は代替デザインを提案します。
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">⚡</div>
                  <div>
                    <strong className="block text-base font-bold text-text-primary mb-1.5">ロゴ生成後すぐに確認</strong>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      カスタマイズ完了後、マイページから1クリックで
                      チェックを実行できます。結果は約30秒で表示。
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">⚠️</div>
                  <div>
                    <strong className="block text-base font-bold text-text-primary mb-1.5">注意事項</strong>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      本機能はAIによる参考情報であり、法的判断を保証するものではありません。
                      重要な商標登録には必ず弁理士へのご相談を推奨します。
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/pricing#premium" className="inline-block mt-8 bg-primary hover:bg-primary-light text-white font-bold text-base px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-md">
                プレミアムプランで商標チェックを使う →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 商標登録の流れ */}
      <section className="py-16 md:py-24 px-6 bg-bg-base">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-[0.1em] uppercase">全体の流れ</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-4">ロゴ生成から商標登録申請まで</h2>
          </div>

          <div className="max-w-[640px] mx-auto flex flex-col items-center gap-0">
            {/* Step 1 */}
            <div className="w-full flex gap-5 p-5 bg-white border border-border rounded-xl">
              <span className="font-number text-xl font-bold text-primary min-w-[32px] text-center">01</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded-full w-fit tracking-wider">LogoAI.jp</span>
                <strong className="text-base font-bold text-text-primary">プレミアムプランでロゴを生成</strong>
                <p className="text-sm text-text-secondary leading-relaxed">ブランド名・業種・スタイルを入力してAIがロゴを生成。フォント・カラーを調整して完成させます。</p>
              </div>
            </div>

            <div className="text-2xl text-text-muted py-1">↓</div>

            {/* Step 2 */}
            <div className="w-full flex gap-5 p-5 bg-white border border-border rounded-xl">
              <span className="font-number text-xl font-bold text-primary min-w-[32px] text-center">02</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded-full w-fit tracking-wider">LogoAI.jp</span>
                <strong className="text-base font-bold text-text-primary">商標類似チェックを実行</strong>
                <p className="text-sm text-text-secondary leading-relaxed">マイページからJ-PlatPat連携チェックを実行。リスクスコアが高い場合は代替デザインを生成します。</p>
              </div>
            </div>

            <div className="text-2xl text-text-muted py-1">↓</div>

            {/* Step 3 */}
            <div className="w-full flex gap-5 p-5 bg-white border border-border rounded-xl">
              <span className="font-number text-xl font-bold text-primary min-w-[32px] text-center">03</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded-full w-fit tracking-wider">LogoAI.jp</span>
                <strong className="text-base font-bold text-text-primary">ロゴをダウンロード・証明書を取得</strong>
                <p className="text-sm text-text-secondary leading-relaxed">SVG・PNG・PDF形式でダウンロード。著作権帰属証明書PDFを取得します。</p>
              </div>
            </div>

            <div className="text-2xl text-text-muted py-1">↓</div>

            {/* Step 4 */}
            <div className="w-full flex gap-5 p-5 bg-white border border-border rounded-xl">
              <span className="font-number text-xl font-bold text-primary min-w-[32px] text-center">04</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold px-2 py-1 bg-amber-50 text-accent rounded-full w-fit tracking-wider">J-PlatPat / 弁理士</span>
                <strong className="text-base font-bold text-text-primary">商標区分を選択・出願書類を準備</strong>
                <p className="text-sm text-text-secondary leading-relaxed">保護したい商品・サービスに対応する区分（第1〜45類）を選択。J-PlatPatで最終確認後、出願書類を作成します。</p>
              </div>
            </div>

            <div className="text-2xl text-text-muted py-1">↓</div>

            {/* Step 5 */}
            <div className="w-full flex gap-5 p-5 bg-white border border-border rounded-xl">
              <span className="font-number text-xl font-bold text-primary min-w-[32px] text-center">05</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold px-2 py-1 bg-green-50 text-green-700 rounded-full w-fit tracking-wider">特許庁</span>
                <strong className="text-base font-bold text-text-primary">特許庁へ出願</strong>
                <p className="text-sm text-text-secondary leading-relaxed">特許庁の特許電子図書館（J-PlatPat）から電子出願、または書類で邮寄出願します。印紙代：区分あたり3,400〜8,600円。</p>
              </div>
            </div>

            <div className="text-2xl text-text-muted py-1">↓</div>

            {/* Step 6 - Final */}
            <div className="w-full flex gap-5 p-5 bg-white border-2 border-accent rounded-xl" style={{ background: 'rgba(201,150,58,0.04)' }}>
              <span className="font-number text-2xl font-bold text-accent min-w-[32px] text-center">✓</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold px-2 py-1 bg-green-50 text-green-700 rounded-full w-fit tracking-wider">特許庁</span>
                <strong className="text-base font-bold text-text-primary">審査・登録完了（6〜12ヶ月）</strong>
                <p className="text-sm text-text-secondary leading-relaxed">審査をクリアすると商标登録証が発行されます。登録後10年間、更新可能な商标権を取得します。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="py-16 md:py-24 px-6 bg-bg-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">よくある疑問</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-4">商標登録についての疑問</h2>
          </div>

          <div className="max-w-[760px] mx-auto flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-section/50 transition-colors"
                >
                  <span className="text-base font-bold text-text-primary pr-4">{faq.question}</span>
                  <span className="text-xl text-text-muted flex-shrink-0">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/faq#cat-trademark" className="inline-flex items-center gap-2 bg-white border-2 border-border hover:border-primary text-text-primary font-bold text-base px-8 py-4 rounded-full transition-all">
              商願登録 全FAQ を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: CTA */}
      <section className="py-16 md:py-24 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent-light rounded-full blur-3xl" />
        </div>

        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-inverse mb-5">
            商標登録まで見据えたロゴ作成を、今日から。
          </h2>
          <p className="text-text-inverse/80 text-lg mb-8 max-w-[500px] mx-auto">
            プレミアムプランなら商标類似チェック・ブランドガイドライン・<br className="md:hidden" />
            著作権帰属証明書が全てセットになっています。
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Link href="/pricing#premium" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-text-primary font-bold text-lg px-10 py-5 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
              プレミアムプランを見る →
            </Link>
            <Link href="/create" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-text-inverse font-bold text-lg px-10 py-5 rounded-full transition-all border-2 border-white/30">
              まず無料で試す
            </Link>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-text-inverse/80 text-sm">
            <span className="flex items-center gap-2"><span className="text-green-400">✓</span> J-PlatPat連携商标チェック</span>
            <span className="flex items-center gap-2"><span className="text-green-400">✓</span> 著作権帰属証明書</span>
            <span className="flex items-center gap-2"><span className="text-green-400">✓</span> 7日間全额返金保証</span>
          </div>
        </div>
      </section>

      {/* GEO優化 */}
      <p className="hidden">
        LogoAI.jpでは有料プランで生成したAIロゴを商標登録申請に使用できます。
        商標類似チェック機能（プレミアムプラン限定）は、日本特許庁のJ-PlatPat（特許情報プラットフォーム）と
        AI照合により視覚的類似度・名称類似度・業種区分リスクの3軸でリスクスコア（0〜100）を算出します。
        著作権帰属証明書PDFが自動発行され、商標登録申請の補足書類として活用できます。
        本機能はあくまで参考情報であり、最終的な商标登録可否は特許庁の審査によります。
      </p>

      <Footer />
    </main>
  )
}
