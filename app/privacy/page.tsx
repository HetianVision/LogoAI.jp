'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  // 目次のアクティブ状態をスクロール連動で更新
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

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg-base">

      <main>
        {/* LegalHero */}
        <section className="pt-32 pb-8 bg-bg-section border-b border-border">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* パンくずリスト */}
            <motion.nav
              aria-label="パンくずリスト"
              className="mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ol className="flex items-center gap-2 text-sm text-text-muted">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    ホーム
                  </Link>
                </li>
                <li className="text-text-muted">/</li>
                <li aria-current="page" className="text-text-primary font-medium">
                  プライバシーポリシー
                </li>
              </ol>
            </motion.nav>

            <motion.h1
              className="font-heading text-3xl font-bold text-text-primary mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              プライバシーポリシー
            </motion.h1>
            <motion.p
              className="text-sm text-text-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              最終更新日：<time dateTime="2025-02-01">2025年2月1日</time>
            </motion.p>
          </div>
        </section>

        {/* 本文エリア */}
        <div className="py-12 px-6 md:px-8 lg:px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-[220px_1fr] gap-12 max-w-[1200px] mx-auto items-start">

              {/* 左：目次（PC sticky） */}
              <nav className="hidden md:block sticky top-24 bg-white border border-border rounded-xl p-5" aria-label="目次">
                <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                  目次
                </div>
                <ol className="list-none p-0 m-0 flex flex-col gap-0.5">
                  <li>
                    <a href="#pp-collection" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第1条（個人情報の収集）
                    </a>
                  </li>
                  <li>
                    <a href="#pp-purpose" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第2条（利用目的）
                    </a>
                  </li>
                  <li>
                    <a href="#pp-third-party" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第3条（第三者提供）
                    </a>
                  </li>
                  <li>
                    <a href="#pp-outsourcing" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第4条（委託）
                    </a>
                  </li>
                  <li>
                    <a href="#pp-cookies" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第5条（Cookieの使用）
                    </a>
                  </li>
                  <li>
                    <a href="#pp-analytics" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第6条（アクセス解析）
                    </a>
                  </li>
                  <li>
                    <a href="#pp-security" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第7条（安全管理）
                    </a>
                  </li>
                  <li>
                    <a href="#pp-disclosure" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第8条（開示・訂正・削除）
                    </a>
                  </li>
                  <li>
                    <a href="#pp-change" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第9条（ポリシーの変更）
                    </a>
                  </li>
                  <li>
                    <a href="#pp-contact" className="block py-1.5 px-2.5 text-xs text-text-secondary no-underline rounded-md transition-all duration-150 hover:bg-primary/5 hover:text-primary">
                      第10条（お問い合わせ）
                    </a>
                  </li>
                </ol>
              </nav>

              {/* 右：本文 */}
              <article className="max-w-[720px]" id="legal-body">

                {/* 序文 */}
                <div className="bg-bg-section border-l-[3px] border-primary pl-5 pr-4 py-4 rounded-r-lg text-sm text-text-secondary leading-relaxed mb-9">
                  LogoAI.jp（以下「当サービス」）は、ユーザーの個人情報の保護を
                  重要な責務と考えています。本プライバシーポリシーは、当サービスにおける
                  個人情報の取り扱いについて説明します。
                </div>

                {/* 第1条 */}
                <section id="pp-collection" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第1条（収集する個人情報）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">当サービスは、以下の個人情報を収集することがあります。</p>
                  <ol className="pl-5 m-0 flex flex-col gap-2">
                    <li className="text-sm text-text-secondary leading-relaxed">氏名・会社名</li>
                    <li className="text-sm text-text-secondary leading-relaxed">メールアドレス</li>
                    <li className="text-sm text-text-secondary leading-relaxed">決済情報（クレジットカード情報はStripe社が管理し、当社は保持しません）</li>
                    <li className="text-sm text-text-secondary leading-relaxed">IPアドレス・ブラウザ情報・利用端末情報</li>
                    <li className="text-sm text-text-secondary leading-relaxed">サービス利用履歴（生成したロゴデータ、設定情報等）</li>
                  </ol>
                </section>

                {/* 第2条 */}
                <section id="pp-purpose" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第2条（利用目的）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">収集した個人情報は、以下の目的のために利用します。</p>
                  <ol className="pl-5 m-0 flex flex-col gap-2">
                    <li className="text-sm text-text-secondary leading-relaxed">本サービスの提供・運営</li>
                    <li className="text-sm text-text-secondary leading-relaxed">購入・決済処理および著作権帰属証明書の発行</li>
                    <li className="text-sm text-text-secondary leading-relaxed">ユーザーへのお問い合わせ対応</li>
                    <li className="text-sm text-text-secondary leading-relaxed">サービス改善のための統計データ分析</li>
                    <li className="text-sm text-text-secondary leading-relaxed">利用規約違反への対応</li>
                    <li className="text-sm text-text-secondary leading-relaxed">サービスに関する重要なお知らせの送付</li>
                  </ol>
                </section>

                {/* 第3条 */}
                <section id="pp-third-party" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第3条（第三者への提供）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。
                  </p>
                  <ol className="pl-5 m-0 flex flex-col gap-2">
                    <li className="text-sm text-text-secondary leading-relaxed">ユーザーの同意がある場合</li>
                    <li className="text-sm text-text-secondary leading-relaxed">法令に基づく場合</li>
                    <li className="text-sm text-text-secondary leading-relaxed">人の生命・身体・財産の保護のために必要な場合</li>
                    <li className="text-sm text-text-secondary leading-relaxed">公衆衛生の向上・児童の健全育成のために必要な場合</li>
                  </ol>
                </section>

                {/* 第4条 */}
                <section id="pp-outsourcing" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第4条（業務委託）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    当社は、利用目的の達成に必要な範囲内において、
                    個人情報の取り扱いを外部の事業者に委託することがあります。委託先には適切な監督を行います。
                  </p>
                  <div className="mt-4 p-3.5 bg-accent/5 border border-accent/20 rounded-lg text-sm text-text-secondary">
                    <strong>主な委託先・利用サービス：</strong>
                    Stripe, Inc.（決済処理）、
                    Vercel Inc.（ホスティング）、
                    Google LLC（アクセス解析）
                  </div>
                </section>

                {/* 第5条 */}
                <section id="pp-cookies" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第5条（Cookieの使用）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    当サービスは、サービス品質向上のためCookieを使用しています。
                    ブラウザの設定でCookieを無効にすることもできますが、
                    一部機能がご利用いただけなくなる場合があります。
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">使用するCookieの種類：</p>
                  <ol className="pl-5 m-0 flex flex-col gap-2">
                    <li className="text-sm text-text-secondary leading-relaxed">必須Cookie：ログイン状態の維持、セッション管理</li>
                    <li className="text-sm text-text-secondary leading-relaxed">機能Cookie：ユーザー設定の保存</li>
                    <li className="text-sm text-text-secondary leading-relaxed">分析Cookie：アクセス状況の分析（Google Analytics）</li>
                  </ol>
                </section>

                {/* 第6条 */}
                <section id="pp-analytics" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第6条（アクセス解析ツール）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    当サービスは、Googleが提供するアクセス解析ツール
                    「Google Analytics」を利用しています。Google Analyticsはトラフィックデータの
                    収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、
                    個人を特定するものではありません。
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Google Analyticsの利用規約については、
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:underline"
                    >
                      Googleの利用規約
                    </a>
                    をご確認ください。
                  </p>
                </section>

                {/* 第7条 */}
                <section id="pp-security" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第7条（個人情報の安全管理）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    当社は、個人情報の丢失、破壊、改ざん及び漏洩などのリスクに対して、
                    適切なセキュリティ対策を実施し、個人情報の安全管理に努めます。
                    決済情報はStripe社のセキュリティ基準（PCI DSS）に準拠した形で管理され、
                    当社のサーバーには保存されません。
                  </p>
                </section>

                {/* 第8条 */}
                <section id="pp-disclosure" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第8条（個人情報の開示・訂正・削除）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    ユーザーは当社に対して、個人情報の開示、訂正、削除を請求することができます。
                    請求はお問い合わせフォームより受け付けます。ご本人確認の上、
                    法令に従い対応いたします。
                  </p>
                </section>

                {/* 第9条 */}
                <section id="pp-change" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第9条（プライバシーポリシーの変更）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、
                    ユーザーへの通知なく変更することができるものとします。
                    変更後のプライバシーポリシーは、当サービスに掲載した時点より効力を生じます。
                  </p>
                </section>

                {/* 第10条 */}
                <section id="pp-contact" className="mb-9 pb-9 border-b border-border scroll-mt-24">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3.5">第10条（お問い合わせ窓口）</h2>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    個人情報の取り扱いに関するお問い合わせは、
                    <Link href="/contact" className="text-primary font-semibold hover:underline">
                      お問い合わせフォーム
                    </Link>
                    よりご連絡ください。
                  </p>
                </section>

                {/* 関連ページリンク */}
                <div className="flex gap-3 flex-wrap mt-10 pt-6 border-t border-border">
                  <Link href="/terms" className="text-sm font-semibold text-primary no-underline px-4 py-2.5 border-1.5 border-primary rounded-full transition-all duration-200 hover:bg-primary hover:text-white">
                    利用規約 →
                  </Link>
                  <Link href="/tokutei" className="text-sm font-semibold text-primary no-underline px-4 py-2.5 border-1.5 border-primary rounded-full transition-all duration-200 hover:bg-primary hover:text-white">
                    特定商取引法に基づく表示 →
                  </Link>
                </div>

              </article>
            </div>
          </div>
        </div>
      </main>


      <style jsx global>{`
        .toc-active {
          background: rgba(26, 58, 42, 0.08);
          color: #1A3A2A !important;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .grid-cols-\\[220px_1fr\\] {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
