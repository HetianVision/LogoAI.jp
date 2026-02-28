'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CompetitorData, FeatureValue } from '@/lib/competitors'

function renderFeatureValue(value: FeatureValue) {
  switch (value.type) {
    case 'check':
      return <span className="text-accent font-bold">✓</span>
    case 'cross':
      return <span className="text-text-muted">✗</span>
    case 'partial':
      return (
        <>
          <span className="text-yellow-600">△</span>
          <span className="text-sm text-text-muted ml-1">{value.label}</span>
        </>
      )
    case 'text':
      return <span className="text-sm">{value.label}</span>
  }
}

const logoAiTargetUsers = [
  '日本語フォントにこだわりたい方',
  '著作権帰属証明書が必要な方',
  '商标登録申請を視野に入れている方',
  '日本の飲食店・美容院・士業等の方',
  'ロゴ専用ツールで最高品質を求める方',
]

const advantages = [
  {
    num: '01',
    title: '日本語フォント100種以上の専門選択',
    description: 'LogoAI.jpは游明朝・ヒラギノ・BIZ UDゴシック等100種以上の商用利用可能な日本語フォントを搭載し、業種・ブランドイメージに最適なフォントをAIが自動選択します。',
  },
  {
    num: '02',
    title: '著作権帰属証明書の自動発行',
    description: 'AIロゴの著作権は日本の法令上デリケートな問題です。LogoAI.jpは文化庁ガイドラインに基づいた著作権帰属証明書を有料プランで自動発行します。',
  },
  {
    num: '03',
    title: '日本の商标登録申請への対応',
    description: 'LogoAI.jpのロゴは特許庁への商标登録申請に利用可能です。プレミアムプランではJ-PlatPat連携の商标類似チェックも提供します。',
  },
]

export default function VSDetailContent({ competitor }: { competitor: CompetitorData }) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const comparisonData = [
    { num: '100', unit: '種+', label: 'LogoAI.jpの日本語フォント数', compare: `${competitor.name}: 約10〜20種` },
    { num: '100', unit: '%', label: '有料プランの著作権帰属率', compare: `${competitor.name}: 規約上曖昧な場合あり` },
    { num: '47', unit: '', label: '日本向け業種特化数', compare: `${competitor.name}: 業種特化なし` },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li><Link href="/" className="hover:text-accent">ホーム</Link></li>
              <li>/</li>
              <li className="text-text-primary">LogoAI.jp vs {competitor.name}</li>
            </ol>
          </nav>

          <div className="text-center">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              サービス比較 2025年版
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
              LogoAI.jp vs {competitor.name}
            </h1>
            <p className="text-lg text-text-secondary max-w-[600px] mx-auto mb-8">
              どちらが日本の事業者に向いているか
            </p>
            <p className="text-text-secondary mb-12">
              {competitor.heroSummary}
            </p>

            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
              <div className="bg-primary text-white px-6 py-4 rounded-xl">
                <div className="font-heading text-xl font-bold mb-1">LogoAI.jp</div>
                <div className="text-sm opacity-80">日本語特化 × 著作権</div>
              </div>
              <div className="text-3xl font-bold text-text-muted">VS</div>
              <div className="border-2 border-primary text-primary px-6 py-4 rounded-xl">
                <div className="font-heading text-xl font-bold mb-1">{competitor.name}</div>
                <div className="text-sm">{competitor.tagline}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto mb-12">
              <motion.div
                className="bg-green-50 border border-green-200 rounded-xl p-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-heading text-lg font-bold text-primary mb-4">LogoAI.jpが優れている点</h3>
                <ul className="space-y-2">
                  {competitor.logoaiWins.map((win, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent font-bold">✓</span>
                      <span className="text-text-secondary">{win}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-heading text-lg font-bold text-text-primary mb-4">{competitor.name}が優れている点</h3>
                <ul className="space-y-2">
                  {competitor.competitorWins.map((win, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-text-muted">→</span>
                      <span className="text-text-secondary">{win}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="bg-accent hover:bg-accent-dark text-text-primary font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                LogoAI.jpを無料で試す →
              </Link>
              <a
                href="#comparison-table"
                className="border border-primary text-primary hover:bg-primary hover:text-white font-medium px-8 py-4 rounded-full transition-all"
              >
                詳細比較を見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison-table" className="py-12 md:py-16 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              詳細比較
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              LogoAI.jp vs {competitor.name} 機能比較表
            </h2>
          </div>

          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-heading font-bold text-text-primary w-1/3">機能・サービス</th>
                  <th className="text-center py-4 px-4 font-heading font-bold text-primary w-1/3">
                    <div>LogoAI.jp</div>
                    <div className="text-sm font-normal text-text-muted">日本語特化AIロゴ</div>
                  </th>
                  <th className="text-center py-4 px-4 font-heading font-bold text-text-primary w-1/3">
                    <div>{competitor.name}</div>
                    <div className="text-sm font-normal text-text-muted">{competitor.tagline}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitor.featureComparison.map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-bg-base transition-colors">
                    <td className="py-4 px-4 text-text-primary">
                      {row.feature}
                      {row.note && (
                        <span className="ml-2 text-xs text-text-muted cursor-help" title={row.note}>?</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-primary">
                      {renderFeatureValue(row.logoai)}
                    </td>
                    <td className="py-4 px-4 text-center text-text-secondary">
                      {renderFeatureValue(row.competitor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p className="text-sm text-text-muted text-center mt-6">
            ※ 本比較表は各サービスの公開情報をもとに2025年2月時点で作成しました。
            サービス内容は変更される場合があります。
          </p>
        </div>
      </section>

      {/* Which One */}
      <section className="py-12 md:py-16 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              向いている方
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              どちらがあなたに向いているか
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white rounded-xl border-2 border-primary p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-4">LogoAI.jpが向いている方</h3>
              <ul className="space-y-3 mb-6">
                {logoAiTargetUsers.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/create" className="block text-center bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors">
                LogoAI.jpを無料で試す →
              </Link>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl border border-border p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">{competitor.name}が向いている方</h3>
              <ul className="space-y-3 mb-6">
                {competitor.targetUser.competitorItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-text-muted">•</span>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={competitor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block text-center border border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                {competitor.name}の公式サイトへ →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantage */}
      <section className="py-12 md:py-16 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
                LogoAI.jpの強み
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-8">
                {competitor.name}にはない、<br />日本特化の3つの強み
              </h2>

              <div className="space-y-6">
                {advantages.map((adv, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-accent shrink-0">{adv.num}</div>
                    <div>
                      <strong className="block text-text-primary mb-1">{adv.title}</strong>
                      <p className="text-text-secondary text-sm">{adv.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="grid gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {comparisonData.map((item, index) => (
                <motion.div
                  key={index}
                  className={`bg-white rounded-xl p-6 border ${index === 1 ? 'border-accent' : 'border-border'}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-4xl font-bold text-primary mb-1">
                    {item.num}<span className="text-lg">{item.unit}</span>
                  </div>
                  <div className="text-text-primary font-medium mb-1">{item.label}</div>
                  <div className="text-sm text-text-muted">{item.compare}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-bg-section">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              よくある疑問
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              LogoAI.jpと{competitor.name}の違いに関する疑問
            </h2>
          </div>

          <div className="space-y-4">
            {competitor.faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-border overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">Q</span>
                    <span className="font-medium text-text-primary">{faq.question}</span>
                  </div>
                  <span className="text-2xl text-text-muted shrink-0">{openFAQ === index ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pl-16 text-text-secondary">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            className="bg-white rounded-2xl border-2 border-accent p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              結論
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6">
              LogoAI.jp vs {competitor.name} まとめ
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              {competitor.verdict}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/create"
                className="bg-accent hover:bg-accent-dark text-text-primary font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto"
              >
                LogoAI.jpを無料で試す →
              </Link>
            </div>
            <p className="text-sm text-text-muted mt-4">
              クレジットカード不要 · 最短10分 · 7日間全额返金保証
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
