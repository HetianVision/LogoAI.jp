'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function TermsPage() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.legal-section')
    const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc-list a')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tocLinks.forEach(link => {
              link.classList.toggle(
                'toc-active',
                link.getAttribute('href') === `#${entry.target.id}`
              )
            })
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main>

      {/* Hero */}
      <section className="pt-32 pb-8 px-6 bg-bg-section border-b border-border">
        <div className="max-w-[1200px] mx-auto">
          <nav className="mb-6" aria-label="パンくずリスト">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link href="/" className="text-text-muted hover:text-primary transition-colors">ホーム</Link></li>
              <li className="text-text-muted">/</li>
              <li aria-current="page" className="text-text-primary font-medium">利用規約</li>
            </ol>
          </nav>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3">利用規約</h1>
          <p className="text-sm text-text-muted">
            最終更新日：<time dateTime="2025-02-01">2025年2月1日</time>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-6 md:px-8 lg:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-[220px_1fr] gap-12 max-w-[1200px] mx-auto items-start">

            {/* Left: TOC */}
            <nav className="hidden md:block sticky top-24 bg-white border border-border rounded-xl p-5" aria-label="目次">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">目次</div>
              <ol className="list-none p-0 m-0 flex flex-col gap-0.5">
                <li>
                  <a
                    href="#terms-intro"
                    className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                  >
                    第1条（適用）
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-definitions"
                    className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                  >
                    第2条（定義）
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-registration"
                    className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                  >
                    第3条（利用登録）
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-prohibited"
                    className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                  >
                    第4条（禁止事項）
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-suspension"
                    className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                  >
                    第5条（利用停止）
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-copyright"
                    className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                  >
                    第6条（著作権・知的財産権）
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-disclaimer"
                    className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                  >
                    第7条（免責事項）
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-change"
                    className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                  >
                    第8条（規約の変更）
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-governing"
                    className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                  >
                    第9条（準拠法・管轄）
                  </a>
                </li>
              </ol>
            </nav>

            {/* Right: Content */}
            <article className="max-w-[720px]" id="legal-body">

              {/* Preamble */}
              <div className="bg-bg-section border-l-3 border-primary p-4 rounded-r-lg text-sm text-text-secondary leading-relaxed mb-9">
                本利用規約（以下「本規約」）は、LogoAI.jp（以下「当サービス」）の
                利用条件を定めるものです。ユーザーの皆さまには、本規約に同意いただいた
                上でご利用いただきます。
              </div>

              {/* Section 1 */}
              <section id="terms-intro" className="legal-section mb-9 pb-9 border-b border-border scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第1条（適用）</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  本規約は、本サービスの提供条件及び当社とユーザーの間の権利義務関係を
                  定めることを目的とし、ユーザーと当社との間の本サービスの利用に関わる
                  一切の関係に適用されます。
                </p>
              </section>

              {/* Section 2 */}
              <section id="terms-definitions" className="legal-section mb-9 pb-9 border-b border-border scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第2条（定義）</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  本規約において使用する用語の定義は次のとおりです。
                </p>
                <ol className="list-decimal pl-5 m-0 flex flex-col gap-2">
                  <li className="text-sm text-text-secondary leading-relaxed">「本サービス」とは、当社が提供するAIロゴ生成サービス「LogoAI.jp」ををいいます。</li>
                  <li className="text-sm text-text-secondary leading-relaxed">「ユーザー」とは、本サービスを利用する全ての方をいいます。</li>
                  <li className="text-sm text-text-secondary leading-relaxed">「有料プラン」とは、本サービスの有料機能を利用するためのプランをいいます。</li>
                  <li className="text-sm text-text-secondary leading-relaxed">「生成ロゴ」とは、本サービスを通じて生成されたロゴデータををいいます。</li>
                  <li className="text-sm text-text-secondary leading-relaxed">「著作権帰属証明書」とは、当社が発行する、生成ロゴの著作権帰属を証明する文書ををいいます。</li>
                </ol>
              </section>

              {/* Section 3 */}
              <section id="terms-registration" className="legal-section mb-9 pb-9 border-b border-border scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第3条（利用登録）</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを
                  承認することによって、利用登録が完了するものとします。当社は、以下の
                  場合に利用登録の申請を承認しないことがあります。
                </p>
                <ol className="list-decimal pl-5 m-0 flex flex-col gap-2">
                  <li className="text-sm text-text-secondary leading-relaxed">虚偽の事項を届け出た場合</li>
                  <li className="text-sm text-text-secondary leading-relaxed">本規約に違反したことがある者からの申請である場合</li>
                  <li className="text-sm text-text-secondary leading-relaxed">その他、当社が利用登録を相当でないと判断した場合</li>
                </ol>
              </section>

              {/* Section 4 */}
              <section id="terms-prohibited" className="legal-section mb-9 pb-9 border-b border-border scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第4条（禁止事項）</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
                </p>
                <ol className="list-decimal pl-5 m-0 flex flex-col gap-2">
                  <li className="text-sm text-text-secondary leading-relaxed">法令または公序良俗に違反する行為</li>
                  <li className="text-sm text-text-secondary leading-relaxed">犯罪行為に関連する行為</li>
                  <li className="text-sm text-text-secondary leading-relaxed">当社、本サービスの他のユーザー、またはその他第三者の知的財産権、<br />肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
                  <li className="text-sm text-text-secondary leading-relaxed">無料プランで生成した生成ロゴを商用利用する行為</li>
                  <li className="text-sm text-text-secondary leading-relaxed">本サービスの運営を妨害するおそれのある行為</li>
                  <li className="text-sm text-text-secondary leading-relaxed">不正アクセスをし、またはこれを試みる行為</li>
                  <li className="text-sm text-text-secondary leading-relaxed">当社のネットワークまたはシステム等に過度な負荷をかける行為</li>
                  <li className="text-sm text-text-secondary leading-relaxed">逆アセンブル、逆コンパイル等のリバースエンジニアリングを行う行為</li>
                  <li className="text-sm text-text-secondary leading-relaxed">その他、当社が不適切と判断する行為</li>
                </ol>
              </section>

              {/* Section 5 */}
              <section id="terms-suspension" className="legal-section mb-9 pb-9 border-b border-border scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第5条（利用停止等）</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  当社は、ユーザーが以下のいずれかの事由に該当する場合には、
                  事前に通知または催告することなく、当該ユーザーの利用を停止し、
                  またはユーザーとしての登録を抹消することができるものとします。
                </p>
                <ol className="list-decimal pl-5 m-0 flex flex-col gap-2">
                  <li className="text-sm text-text-secondary leading-relaxed">本規約のいずれかの条項に違反した場合</li>
                  <li className="text-sm text-text-secondary leading-relaxed">登録事項に虚偽の事実があることが判明した場合</li>
                  <li className="text-sm text-text-secondary leading-relaxed">料金等の支払債務の不履行があった場合</li>
                  <li className="text-sm text-text-secondary leading-relaxed">その他、当社が本サービスの利用を適当でないと判断した場合</li>
                </ol>
              </section>

              {/* Section 6 */}
              <section id="terms-copyright" className="legal-section mb-9 pb-9 border-b border-border scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第6条（著作権・知的財産権）</h2>
                <ol className="list-decimal pl-5 m-0 flex flex-col gap-2 mb-4">
                  <li className="text-sm text-text-secondary leading-relaxed">
                    無料プランで生成した生成ロゴの著作権は、弊社に帰属します。
                    無料プランの生成ロゴは、個人的・非商用目的の範囲でのみ使用できます。
                  </li>
                  <li className="text-sm text-text-secondary leading-relaxed">
                    有料プランで生成した生成ロゴの著作権は、ユーザーに帰属します。
                    当社は当該生成ロゴに関するいかなる著作権も主張しません。
                  </li>
                  <li className="text-sm text-text-secondary leading-relaxed">
                    本サービスのシステム・UIデザイン・ロゴ・その他コンテンツに関する
                    著作権その他の知的財産権は、当または弊社が権利使用の許諾を受けた
                    者に帰属します。
                  </li>
                  <li className="text-sm text-text-secondary leading-relaxed">
                    著作権帰属証明書は、有料プランでの購入完了時に発行されます。
                    証明書に記載された権利帰属は、購入時点での法令・文化庁ガイドラインに
                    基づくものです。
                  </li>
                </ol>

                <div className="mt-4 p-3.5 bg-[rgba(201,150,58,0.06)] border border-[rgba(201,150,58,0.2)] rounded-lg text-sm text-text-secondary">
                  <strong className="text-text-primary">著作権に関する詳細は</strong>
                  <Link href="/copyright" className="text-primary font-semibold ml-1">著作権ページ</Link>をご参照ください。
                </div>
              </section>

              {/* Section 7 */}
              <section id="terms-disclaimer" className="legal-section mb-9 pb-9 border-b border-border scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第7条（免責事項）</h2>
                <ol className="list-decimal pl-5 m-0 flex flex-col gap-2">
                  <li className="text-sm text-text-secondary leading-relaxed">
                    当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、
                    正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに
                     関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを
                    明示的にも黙示的にも保証していません。
                  </li>
                  <li className="text-sm text-text-secondary leading-relaxed">
                    生成ロゴが第三者の著作権・商標権等を侵害しないことは当社は
                    保証しません。商標登録申請等を行う場合は、専門家（弁理士等）に
                    ご相談ください。
                  </li>
                  <li className="text-sm text-text-secondary leading-relaxed">
                    当社は、本サービスに起因してユーザーに生じたあらゆる損害について、
                    当社の故意又は重大な過失による場合を除き、一切の責任を負いません。
                  </li>
                </ol>
              </section>

              {/* Section 8 */}
              <section id="terms-change" className="legal-section mb-9 pb-9 border-b border-border scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第8条（利用規約の変更）</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  当社は必要と判断した場合には、ユーザーに通知することなく本規約を
                  変更することができるとします。変更後の利用規約は、当社のウェブサイトに
                  掲載した時点で効力を生じるものとします。
                </p>
              </section>

              {/* Section 9 */}
              <section id="terms-governing" className="legal-section mb-9 pb-9 border-b-0 scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第9条（準拠法・管轄裁判所）</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  本規約の解釈にあたっては、日本法を準拠法とします。
                  本サービスに関して紛争が生じた場合には当社の本店所在地を
                  管轄する裁判所を専属的合意管轄とします。
                </p>
              </section>

              {/* Related Links */}
              <div className="flex gap-3 flex-wrap mt-10 pt-6 border-t border-border">
                <Link href="/privacy" className="text-sm font-semibold text-primary no-underline px-4 py-2.5 border border-primary rounded-full transition-all hover:bg-primary hover:text-white">
                  プライバシーポリシー →
                </Link>
                <Link href="/tokutei" className="text-sm font-semibold text-primary no-underline px-4 py-2.5 border border-primary rounded-full transition-all hover:bg-primary hover:text-white">
                  特定商取引法に基づく表示 →
                </Link>
              </div>

            </article>
          </div>
        </div>
      </div>

    </main>
  )
}
