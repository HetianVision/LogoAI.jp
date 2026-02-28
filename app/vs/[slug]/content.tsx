'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CompetitorData, FeatureValue } from '@/lib/competitors'

interface VSDetailContentProps {
  competitor: CompetitorData
}

// Helper functions
function renderFeatureValue(value: FeatureValue) {
  switch (value.type) {
    case 'check':
      return <span className="vstv-check">✓</span>
    case 'cross':
      return <span className="vstv-cross">✗</span>
    case 'partial':
      return (
        <>
          <span className="vstv-partial">△</span>
          <span className="vstv-label">{value.label}</span>
        </>
      )
    case 'text':
      return <span className="vstv-text">{value.label}</span>
  }
}

// 固定データ
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

export default function VSDetailContent({ competitor }: VSDetailContentProps) {
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
      <section className="vs-hero">
        <div className="vs-hero-bg" aria-hidden="true">
          <div className="bg-grid" />
        </div>
        <div className="container">
          <nav className="breadcrumb" aria-label="パンくずリスト">
            <ol>
              <li><Link href="/">ホーム</Link></li>
              <li aria-current="page">LogoAI.jp vs {competitor.name}</li>
            </ol>
          </nav>
          <div className="vs-hero-content">
            <span className="section-eyebrow">サービス比較 2025年版</span>
            <h1>
              LogoAI.jp vs {competitor.name}
              <span className="h1-sub">どちらが日本の事業者に向いているか</span>
            </h1>
            <p className="vs-hero-desc">{competitor.heroSummary}</p>

            <div className="vs-banner">
              <div className="vs-side vs-side-logoai">
                <div className="vs-service-name">LogoAI.jp</div>
                <div className="vs-service-tag">日本語特化 × 著作権</div>
              </div>
              <div className="vs-label" aria-label="versus">VS</div>
              <div className="vs-side vs-side-competitor">
                <div className="vs-service-name">{competitor.name}</div>
                <div className="vs-service-tag">{competitor.tagline}</div>
              </div>
            </div>

            <div className="vs-quick-verdict">
              <motion.div
                className="vqv-logoai-wins"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="vqv-header vqv-header-logoai">LogoAI.jpが優れている点</div>
                <ul className="vqv-list">
                  {competitor.logoaiWins.map((win, index) => (
                    <li key={index}>
                      <span className="vqv-check">✓</span> {win}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="vqv-competitor-wins"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="vqv-header vqv-header-competitor">{competitor.name}が優れている点</div>
                <ul className="vqv-list">
                  {competitor.competitorWins.map((win, index) => (
                    <li key={index}>
                      <span className="vqv-check vqv-check-gray">→</span> {win}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="vs-hero-cta">
              <Link href="/create" className="btn-primary btn-primary-lg">LogoAI.jpを無料で試す →</Link>
              <a href="#comparison-table" className="btn-secondary">詳細比較を見る</a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="vs-table-section" id="comparison-table" style={{ background: 'var(--color-bg-section)' }}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-eyebrow">詳細比較</span>
            <h2>LogoAI.jp vs {competitor.name} 機能比較表</h2>
          </div>
          <motion.div
            className="vs-table-wrap animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <table className="vs-table">
              <thead>
                <tr>
                  <th className="vst-feature-col">機能・サービス</th>
                  <th className="vst-logoai-col">
                    <span className="vst-service-name">LogoAI.jp</span>
                    <span className="vst-service-note">日本語特化AIロゴ</span>
                  </th>
                  <th className="vst-competitor-col">
                    <span className="vst-service-name">{competitor.name}</span>
                    <span className="vst-service-note">{competitor.tagline}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitor.featureComparison.map((row, index) => (
                  <tr key={index}>
                    <td className="vst-feature">
                      {row.feature}
                      {row.note && (
                        <span className="vst-note" title={row.note}>?</span>
                      )}
                    </td>
                    <td className="vst-val vst-val-logoai">
                      {renderFeatureValue(row.logoai)}
                    </td>
                    <td className="vst-val vst-val-competitor">
                      {renderFeatureValue(row.competitor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="vs-table-note animate-on-scroll">
            ※ 本比較表は各サービスの公開情報をもとに2025年2月時点で作成しました。
            サービス内容は変更される場合があります。
            最新情報は各サービスの公式サイトでご確認ください。
          </p>
        </div>
      </section>

      {/* Which One */}
      <section className="vs-whichone-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-eyebrow">向いている方</span>
            <h2>どちらがあなたに向いているか</h2>
          </div>
          <div className="vs-whichone-grid animate-on-scroll">
            <motion.div
              className="vwo-card vwo-card-logoai"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="vwo-service">LogoAI.jpが向いている方</div>
              <ul className="vwo-list">
                {logoAiTargetUsers.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Link href="/create" className="vwo-cta">LogoAI.jpを無料で試す →</Link>
            </motion.div>
            <motion.div
              className="vwo-card vwo-card-competitor"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="vwo-service">{competitor.name}が向いている方</div>
              <ul className="vwo-list">
                {competitor.targetUser.competitorItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <a
                href={competitor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="vwo-cta vwo-cta-competitor"
              >
                {competitor.name}の公式サイトへ →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantage */}
      <section className="vs-advantage-section">
        <div className="container">
          <div className="vs-advantage-grid animate-on-scroll">
            <div className="advantage-text">
              <span className="section-eyebrow">LogoAI.jpの強み</span>
              <h2>{competitor.name}にはない、<br />日本特化の3つの強み</h2>
              <div className="advantage-points">
                {advantages.map((adv, index) => (
                  <motion.div
                    key={index}
                    className="adv-point"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="adv-num">{adv.num}</div>
                    <div className="adv-content">
                      <strong>{adv.title}</strong>
                      <p>{adv.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              className="advantage-visual"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="adv-numbers">
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`adv-num-card ${index === 1 ? 'adv-num-card-accent' : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="anc-num">
                      {item.num}
                      <span className="anc-unit">{item.unit}</span>
                    </div>
                    <div className="anc-label">{item.label}</div>
                    <div className="anc-compare">{item.compare}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="vs-faq-section" style={{ background: 'var(--color-bg-section)' }}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-eyebrow">よくある疑問</span>
            <h2>LogoAI.jpと{competitor.name}の違いに関する疑問</h2>
          </div>
          <div className="faq-accordion-list animate-on-scroll" style={{ maxWidth: '760px', margin: '0 auto' }}>
            {competitor.faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`faq-item ${openFAQ === index ? 'faq-item-open' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                  <span className="faq-q-icon">Q</span>
                  <span className="faq-q-text">{faq.question}</span>
                  <span className="faq-icon">{openFAQ === index ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="vs-verdict-section">
        <div className="container">
          <motion.div
            className="vs-verdict-card animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="vvc-header">
              <span className="section-eyebrow">結論</span>
              <h2>LogoAI.jp vs {competitor.name} まとめ</h2>
            </div>
            <p className="vvc-body">{competitor.verdict}</p>
            <div className="vvc-cta">
              <Link href="/create" className="btn-primary btn-primary-lg">LogoAI.jpを無料で試す →</Link>
              <p className="vvc-note">
                クレジットカード不要 · 最短10分 · 7日間全额返金保証
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
