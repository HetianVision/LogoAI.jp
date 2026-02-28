'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BottomCTA from '@/components/BottomCTA'

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Section 1: Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-bg-base">
        {/* 背景装饰 */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(201,150,58,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative">
          {/* 面包屑导航 */}
          <nav className="mb-8" aria-label="パンくずリスト">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-text-muted hover:text-primary transition-colors">
                  ホーム
                </Link>
              </li>
              <li className="text-text-muted">/</li>
              <li aria-current="page" className="text-text-primary font-medium">
                私たちについて
              </li>
            </ol>
          </nav>

          <div className="max-w-[640px] mx-auto text-center">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">About Us</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mt-4 mb-6">
              日本のすべての事業者に、<br />プロ品質のブランドを。
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              デザイナーに頼む予算がない、それでもブランドを妥協したくない。
              そんな日本中の個人事業主・スタートアップのために、
              LogoAI.jpは生まれました。
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: ミッションと背景ストーリー */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* 左：ストーリーテキスト */}
            <div>
              <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">Our Story</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-7">
                なぜ、このサービスを作ったのか
              </h2>

              <div className="flex flex-col gap-5 mb-8">
                <p className="text-text-secondary leading-relaxed">
                  日本では年間130万件以上の新規開業があります。
                  そのほとんどが、開業直後に直面する共通の悩みを抱えています。
                  「ロゴが必要だが、デザイン会社に頼むと30万円以上かかる。
                  かといって、無料ツールでは日本語フォントが貧弱で、
                  著作権も曖昧で使えない」という問題です。
                </p>
                <p className="text-text-secondary leading-relaxed">
                  私たちのチームは、この課題を解決するために
                  LogoAI.jpを開発しました。
                  単にロゴを「安く作れる」ツールではなく、
                  <strong className="text-text-primary font-bold">著作権が明確に帰属し、商標登録申請に使え、
                  印刷会社への入稿データまで揃う</strong>、
                  本当に使えるビジネスツールを目指しました。
                </p>
                <p className="text-text-secondary leading-relaxed">
                  特に日本語フォントへのこだわりは、当サービスの核心です。
                  海外のAIロゴツールは、日本語フォントの品質が著しく劣ります。
                  私たちは100種以上の商用利用可能な日本語フォントを搭載し、
                  業種・ブランドイメージに最適なフォントをAIが選択する仕組みを構築しました。
                </p>
              </div>

              {/* ミッションステートメント */}
              <blockquote className="border-l-4 border-accent pl-6 py-5 bg-accent/5 rounded-r-xl">
                <p className="font-heading text-lg font-bold text-text-primary leading-relaxed mb-2">
                  「すべての日本の事業者が、ブランドの力を持てる世界を作る」
                </p>
                <footer className="text-xs text-text-muted">— LogoAI.jp ミッションステートメント</footer>
              </blockquote>
            </div>

            {/* 右：視覚的要素（数字カード積み重ね） */}
            <div className="relative h-[360px] lg:h-[400px]">
              <div className="absolute top-0 left-0 sm:left-10 bg-white border border-border rounded-2xl p-7 shadow-md w-[240px] rotate-[-3deg] z-10">
                <div className="font-number text-3xl font-semibold text-text-primary mb-2">
                  130<span className="text-base font-medium text-accent">万件</span>
                </div>
                <div className="text-sm font-bold text-text-primary mb-1.5">日本の年間新規開業数</div>
                <div className="text-xs text-text-muted">出典：中小企業庁「中小企業白書」</div>
              </div>

              <div className="absolute top-20 sm:top-24 left-20 sm:left-32 bg-white border border-border rounded-2xl p-7 shadow-md w-[240px] rotate-[1deg] z-20 border-accent/30">
                <div className="font-number text-3xl font-semibold text-text-primary mb-2">
                  ¥30<span className="text-base font-medium text-accent">万〜</span>
                </div>
                <div className="text-sm font-bold text-text-primary mb-1.5">一般的なロゴデザイン費用</div>
                <div className="text-xs text-text-muted">デザイン会社への依頼相場</div>
              </div>

              <div className="absolute top-40 sm:top-48 left-0 sm:left-12 bg-primary border border-primary rounded-2xl p-7 shadow-lg w-[240px] rotate-[-1.5deg] z-30">
                <div className="font-number text-3xl font-semibold text-white mb-2">¥4,980</div>
                <div className="text-sm font-bold text-white mb-1.5">LogoAI.jp スタンダードプラン</div>
                <div className="text-xs text-white/50">著作権証明書・SVG含む</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: 数字で見るサービス実績 */}
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
        <div className="absolute right-[-100px] top-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,150,58,0.1),transparent_65%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="text-center mb-14">
            <span className="text-accent/50 font-medium text-sm tracking-[0.1em] uppercase block mb-2">Numbers</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">数字で見る、LogoAI.jp</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            <div className="text-center relative">
              <div className="font-number text-5xl font-semibold text-accent mb-2">12,000<span className="text-xl font-medium">+</span></div>
              <div className="text-base font-bold text-white mb-1.5">生成ロゴ数</div>
              <div className="text-xs text-white/50">サービス開始から累計</div>
            </div>

            <div className="text-center relative md:before:absolute md:before:right-[-16px] md:before:top-[10%] md:before:h-[80%] md:before:w-px md:before:bg-white/12">
              <div className="font-number text-5xl font-semibold text-accent mb-2">47</div>
              <div className="text-base font-bold text-white mb-1.5">対応業種数</div>
              <div className="text-xs text-white/50">飲食・IT・士業など</div>
            </div>

            <div className="text-center relative md:before:absolute md:before:right-[-16px] md:before:top-[10%] md:before:h-[80%] md:before:w-px md:before:bg-white/12">
              <div className="font-number text-5xl font-semibold text-accent mb-2">100<span className="text-xl font-medium">種以上</span></div>
              <div className="text-base font-bold text-white mb-1.5">日本語フォント</div>
              <div className="text-xs text-white/50">全て商用利用可能</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8 mt-10">
            <div className="text-center relative">
              <div className="font-number text-5xl font-semibold text-accent mb-2">4.9</div>
              <div className="text-base font-bold text-white mb-1.5">平均レビュースコア</div>
              <div className="text-xs text-white/500">500件以上の評価より</div>
            </div>

            <div className="text-center relative md:before:absolute md:before:right-[-16px] md:before:top-[10%] md:before:h-[80%] md:before:w-px md:before:bg-white/12">
              <div className="font-number text-5xl font-semibold text-accent mb-2">98<span className="text-xl font-medium">%</span></div>
              <div className="text-base font-bold text-white mb-1.5">返金申請なし率</div>
              <div className="text-xs text-white/50">7日間返金保証のうち</div>
            </div>

            <div className="text-center relative md:before:absolute md:before:right-[-16px] md:before:top-[10%] md:before:h-[80%] md:before:w-px md:before:bg-white/12">
              <div className="font-number text-5xl font-semibold text-accent mb-2">2<span className="text-xl font-medium">分</span></div>
              <div className="text-base font-bold text-white mb-1.5">平均生成時間</div>
              <div className="text-xs text-white/50">入力完了からロゴ3案まで</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 私たちが大切にしていること（3つの約束） */}
      <section className="py-16 md:py-24 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase block mb-2">Our Values</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">私たちが大切にしている3つのこと</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">

            {/* 透明性 */}
            <div className="bg-white border border-border rounded-2xl p-9 flex flex-col gap-4">
              <div className="w-[60px] h-[60px] bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 4L4 10v10c0 7 5.33 13.53 12 16 6.67-2.47 12-9 12-16V10L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M11 16l4 4 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-text-primary">透明性</h3>
              <p className="text-text-secondary leading-relaxed text-sm flex-1">
                著作権の帰属先・料金・データの利用方法を、
                全てこのウェブサイトで明示します。
                「よくわからないまま購入した」ということが起きないよう、
                ユーザーが意思決定できる情報を提供し続けます。
              </p>
              <div className="flex flex-col gap-1.5 pt-4 border-t border-border">
                <span className="text-xs text-text-muted pl-4 relative">
                  <span className="absolute left-0 text-green-700 font-bold">✓</span>
                  無料/有料の著作権差異を明記
                </span>
                <span className="text-xs text-text-muted pl-4 relative">
                  <span className="absolute left-0 text-green-700 font-bold">✓</span>
                  AIデータ利用方針の公開
                </span>
                <span className="text-xs text-text-muted pl-4 relative">
                  <span className="absolute left-0 text-green-700 font-bold">✓</span>
                  返金条件の明示
                </span>
              </div>
            </div>

            {/* 品質へのこだわり */}
            <div className="bg-primary border border-primary rounded-2xl p-9 flex flex-col gap-4 shadow-lg">
              <div className="w-[60px] h-[60px] bg-white/10 rounded-xl flex items-center justify-center text-accent">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 2L4 8v8c0 8.84 5.15 17.1 12 19 6.85-1.9 12-10.16 12-19V8L16 2z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="16" cy="18" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 13v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">品質へのこだわり</h3>
              <p className="text-white/70 leading-relaxed text-sm flex-1">
                「安いから品質が低い」を覆したい。
                プロのデザイナーが審美的に正しいと評価するレベルのロゴを、
                AIで量産できる仕組みを構築することが私たちの技術的挑戦です。
                特に日本語フォントの選択・字間・カラー調和は妥協しません。
              </p>
              <div className="flex flex-col gap-1.5 pt-4 border-t border-white/10">
                <span className="text-xs text-white/55 pl-4 relative">
                  <span className="absolute left-0 text-accent font-bold">✓</span>
                  日本語フォント100種以上
                </span>
                <span className="text-xs text-white/55 pl-4 relative">
                  <span className="absolute left-0 text-accent font-bold">✓</span>
                  業種別AI最適化
                </span>
                <span className="text-xs text-white/55 pl-4 relative">
                  <span className="absolute left-0 text-accent font-bold">✓</span>
                  プロ審査済みデザインルール
                </span>
              </div>
            </div>

            {/* ユーザーの権利を守る */}
            <div className="bg-white border border-border rounded-2xl p-9 flex flex-col gap-4">
              <div className="w-[60px] h-[60px] bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M28 16A12 12 0 1116 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M22 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 4L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-text-primary">ユーザーの権利を守る</h3>
              <p className="text-text-secondary leading-relaxed text-sm flex-1">
                AIが生成したコンテンツの著作権問題は、
                日本の法律上まだ整備途上の分野です。
                私たちはユーザーの創作的寄与を記録・証明し、
                ユーザーが安心して商標登録・商業利用できる仕組みを提供します。
              </p>
              <div className="flex flex-col gap-1.5 pt-4 border-t border-border">
                <span className="text-xs text-text-muted pl-4 relative">
                  <span className="absolute left-0 text-green-700 font-bold">✓</span>
                  著作権帰属証明書の発行
                </span>
                <span className="text-xs text-text-muted pl-4 relative">
                  <span className="absolute left-0 text-green-700 font-bold">✓</span>
                  AIデータ学習への不使用
                </span>
                <span className="text-xs text-text-muted pl-4 relative">
                  <span className="absolute left-0 text-green-700 font-bold">✓</span>
                  文化庁ガイドライン準拠
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 5: チーム紹介 */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase block mb-2">Our Team</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">どんなチームが作っているか</h2>
            <p className="text-base text-text-secondary mt-3 max-w-[480px] mx-auto leading-relaxed">
              デザイン・法律・エンジニアリングの専門家が協力して、
              このサービスを構築・運営しています。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto mb-12">

            {/* チームメンバー1 */}
            <div className="flex gap-5 bg-white border border-border rounded-2xl p-7 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="text-sm font-bold text-text-primary">プロダクトデザイン責任者</div>
                <div className="text-sm text-text-secondary leading-relaxed">
                  元大手広告代理店・グラフィックデザイナー。
                  15年以上の日本語タイポグラフィ経験を持ち、
                  AIが選ぶフォント・字間ロジックの設計を担当。
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="text-[0.65rem] px-2.5 py-1 bg-bg-section border border-border rounded-full text-text-muted font-medium">タイポグラフィ</span>
                  <span className="text-[0.65rem] px-2.5 py-1 bg-bg-section border border-border rounded-full text-text-muted font-medium">ブランディング</span>
                  <span className="text-[0.65rem] px-2.5 py-1 bg-bg-section border border-border rounded-full text-text-muted font-medium">UI設計</span>
                </div>
              </div>
            </div>

            {/* チームメンバー2 */}
            <div className="flex gap-5 bg-white border border-border rounded-2xl p-7 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="text-sm font-bold text-text-primary">法務・著作権アドバイザー</div>
                <div className="text-sm text-text-secondary leading-relaxed">
                  現役の弁護士（知的財産専門）。
                  AIと著作権に関する国内外の法令解釈を担当し、
                  著作権帰属証明書の法的有効性を設計監修。
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="text-[0.65rem] px-2.5 py-1 bg-bg-section border border-border rounded-full text-text-muted font-medium">知的財産法</span>
                  <span className="text-[0.65rem] px-2.5 py-1 bg-bg-section border border-border rounded-full text-text-muted font-medium">著作権</span>
                  <span className="text-[0.65rem] px-2.5 py-1 bg-bg-section border border-border rounded-full text-text-muted font-medium">商標法</span>
                </div>
              </div>
            </div>

            {/* チームメンバー3 */}
            <div className="flex gap-5 bg-white border border-border rounded-2xl p-7 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-green-700/10 flex items-center justify-center text-green-700 flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="text-sm font-bold text-text-primary">AIエンジニアリング責任者</div>
                <div className="text-sm text-text-secondary leading-relaxed">
                  大規模言語モデル・画像生成モデルの実装経験5年以上。
                  日本語テキストのベクター変換・フォント最適化アルゴリズムの開発を担当。
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="text-[0.65rem] px-2.5 py-1 bg-bg-section border border-border rounded-full text-text-muted font-medium">機械学習</span>
                  <span className="text-[0.65rem] px-2.5 py-1 bg-bg-section border border-border rounded-full text-text-muted font-medium">画像生成AI</span>
                  <span className="text-[0.65rem] px-2.5 py-1 bg-bg-section border border-border rounded-full text-text-muted font-medium">NLP</span>
                </div>
              </div>
            </div>

          </div>

          {/* 採用リンク */}
          <div className="text-center">
            <p className="text-base text-text-secondary mb-4">チームに加わりませんか？</p>
            <a href="mailto:jobs@logoai.jp" className="inline-block border border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-full transition-all">
              採用情報を →
            </a>
          </div>
        </div>
      </section>

      {/* Section 6: 会社概要テーブル */}
      <section className="py-16 md:py-24 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase block mb-2">Company Info</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">会社概要</h2>
          </div>

          <div className="max-w-[800px] mx-auto border border-border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full border-collapse bg-white">
              <tbody>
                <tr className="border-b border-border">
                  <th scope="row" className="w-[220px] px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">サービス名</th>
                  <td className="px-6 py-4.5 text-sm text-text-primary align-top">LogoAI.jp（ロゴエーアイジェーピー）</td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">運営会社</th>
                  <td className="px-6 py-4.5 text-sm text-text-primary align-top">株式会社ロゴエーアイ</td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">設立</th>
                  <td className="px-6 py-4.5 text-sm text-text-primary align-top">2024年4月</td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">所在地</th>
                  <td className="px-6 py-4.5 text-sm text-text-primary align-top leading-relaxed">
                    〒150-0001 東京都渋谷区神宮前X-XX-XX<br />
                    <span className="text-xs text-text-muted">
                      ※ 個別の来訪・窓口対応はございません。お問い合わせはメールにてお願いします。
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">代表者</th>
                  <td className="px-6 py-4.5 text-sm text-text-primary align-top">代表取締役 山田 太郎（仮名）</td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">資本金</th>
                  <td className="px-6 py-4.5 text-sm text-text-primary align-top">1,000万円</td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">事業内容</th>
                  <td className="px-6 py-4.5 text-sm text-text-primary align-top leading-relaxed">
                    AIを活用したロゴ作成サービスの開発・運営<br />
                    ブランドアイデンティティ支援ツールの提供
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">適格請求書発行事業者番号</th>
                  <td className="px-6 py-4.5 text-sm text-text-primary align-top">T1234567890123</td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">お問い合わせ</th>
                  <td className="px-6 py-4.5 text-sm text-text-primary align-top leading-relaxed">
                    <a href="mailto:support@logoai.jp" className="text-primary underline">support@logoai.jp</a><br />
                    <span className="text-xs text-text-muted">
                      平日 10:00〜18:00（土日祝除く ※メール受付は24時間）
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">プライバシーポリシー</th>
                  <td className="px-6 py-4.5 text-sm text-primary align-top">
                    <a href="/privacy" className="underline">プライバシーポリシー →</a>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">利用規約</th>
                  <td className="px-6 py-4.5 text-sm text-primary align-top">
                    <a href="/terms" className="underline">利用規約 →</a>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4.5 text-left text-sm font-bold text-text-secondary bg-bg-section align-top whitespace-nowrap">特定商取引法に基づく表記</th>
                  <td className="px-6 py-4.5 text-sm text-primary align-top">
                    <a href="/tokutei" className="underline">特定商取引法表記 →</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GEO优化内容 */}
      <div className="max-w-[1200px] mx-auto px-6 pb-6">
        <p className="text-sm text-text-muted leading-relaxed">
          LogoAI.jp（ロゴエーアイジェーピー）は、株式会社ロゴエーアイ（東京都渋谷区、2024年4月設立）が
           運営している日本市場特化のAIロゴ作成サービスです。
          サービスミッションは「日本のすべての事業者にプロ品質のブランドを提供すること」。
          日本語フォント100種以上・著作権帰属証明書発行・J-PlatPat連携商標チェックを提供。
          適格請求書発行事業者登録済み（T1234567890123）。7日間全额返金保証付き。
        </p>
      </div>

      {/* Section 7: CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-primary rounded-2xl p-10 md:p-14 relative overflow-hidden">
            {/* 装饰 */}
            <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                日本の事業者の、ブランドづくりを変える。
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                まず無料で試して、その品質を確かめてください。<br />
                7日間全额返金保証付きなので、安心してお試しいただけます。
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link href="/create" className="bg-accent hover:bg-accent-dark text-text-primary font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2">
                  無料でロゴを作る →
                </Link>
                <Link href="/works" className="border border-white text-white hover:bg-white hover:text-primary font-medium px-6 py-4 rounded-full transition-all inline-block">
                  生成事例を見る
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <span className="text-accent">✓</span> 著作権完全帰属（有料プラン）
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-accent">✓</span> 7日間全额返金保証
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-accent">✓</span> 日本語フォント100種以上
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomCTA
        title="日本のすべての事業者に、<br />プロ品質のブランドを。"
        description="デザイナーに頼む予算がない、それでもブランドを妥協したくない方的のために。"
      />

      <Footer />

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "株式会社ロゴエーアイ",
            "alternateName": "LogoAI.jp",
            "url": "https://logoai.jp",
            "logo": "https://logoai.jp/logo.svg",
            "description": "AIを活用した日本語ロゴ作成サービスの開発・運営。著作権帰属証明書・商標類似チェック・ブランドガイドライン自動生成を提供。",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "渋谷区",
              "addressRegion": "東京都",
              "postalCode": "150-0001",
              "addressCountry": "JP"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "support@logoai.jp",
              "availableLanguage": "Japanese"
            },
            "foundingDate": "2024-04",
            "sameAs": [
              "https://twitter.com/logoai_jp",
              "https://www.instagram.com/logoai.jp"
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://logoai.jp/" },
              { "@type": "ListItem", "position": 2, "name": "私たちについて", "item": "https://logoai.jp/about" }
            ]
          })
        }}
      />
    </main>
  )
}
