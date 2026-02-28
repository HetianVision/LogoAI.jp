'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SceneData } from '@/lib/scene'
import { IndustryData } from '@/lib/industry'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

// Section 1: Hero
function HeroSection({ scene }: { scene: SceneData }) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-bg-base">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
          aria-label="パンくずリスト"
        >
          <ol className="flex items-center gap-2 text-sm text-text-muted">
            <li><Link href="/" className="hover:text-primary transition-colors">ホーム</Link></li>
            <li>/</li>
            <li><Link href="/for" className="hover:text-primary transition-colors">シーン一覧</Link></li>
            <li>/</li>
            <li className="text-text-primary font-medium">{scene.titleShort}向けロゴ</li>
          </ol>
        </motion.nav>

        {/* Hero Content */}
        <div className="max-w-[660px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-4"
          >
            {scene.heroEmoji}
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block"
          >
            {scene.title}のためのロゴ作成
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-5"
          >
            {scene.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-secondary leading-relaxed mb-8"
          >
            {scene.heroDesc}
          </motion.p>

          {/* Target Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white border border-border rounded-2xl p-6 mb-8 text-left max-w-[480px] mx-auto"
          >
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">こんな状況の方に</div>
            <ul className="space-y-2">
              {scene.situationPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-green-700 font-bold">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            <Link
              href="/create"
              className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
            >
              今すぐ無料で始める →
            </Link>
            <Link
              href="#scene-steps"
              className="border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-4 rounded-full transition-all"
            >
              使い方を見る
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-5 text-xs text-text-muted font-medium"
          >
            <span>✓ クレジットカード不要</span>
            <span>✓ 最短10分</span>
            <span>✓ 7日間全额返金保証</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 2: Benefits
function BenefitsSection({ scene }: { scene: SceneData }) {
  return (
    <section className="py-16 md:py-20 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
            なぜLogoAI.jpか
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            {scene.title}がLogoAI.jpを選ぶ理由
          </h2>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1000px] mx-auto"
        >
          {scene.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white border border-border rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="font-heading text-base font-bold text-text-primary mb-2">{benefit.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Section 3: Steps
function StepsSection({ scene }: { scene: SceneData }) {
  return (
    <section className="py-16 md:py-20 bg-bg-base" id="scene-steps">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
            使い方
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            {scene.title}がロゴを作る流れ
          </h2>
        </motion.div>

        <div className="max-w-[900px] mx-auto">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {scene.steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                <div className="bg-white border border-border rounded-2xl p-6 text-center h-full">
                  <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-number text-xl font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-heading text-base font-bold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{step.desc}</p>
                  {step.timeLabel && (
                    <span className="inline-block text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                      約{step.timeLabel}
                    </span>
                  )}
                </div>
                {index < scene.steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-text-muted">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 4: Works Gallery
function WorksGallerySection({ scene }: { scene: SceneData }) {
  return (
    <section className="py-16 md:py-20 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
            生成事例
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3">
            {scene.title}が作ったロゴ事例
          </h2>
          <p className="text-text-secondary">
            全て実際にLogoAI.jpで生成されたロゴです
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10"
        >
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="aspect-square bg-white rounded-xl border border-border p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="font-heading text-xl md:text-2xl text-primary mb-2">
                {scene.titleShort}
              </div>
              <div className="text-xs text-text-muted mb-3">Sample {index + 1}</div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-text-primary text-xs px-3 py-1 rounded-full">
                このスタイルで作る
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/works"
            className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-3 rounded-full transition-all"
          >
            全ての事例を見る →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Section 5: Pricing
function PricingSection({ scene }: { scene: SceneData }) {
  return (
    <section className="py-16 md:py-20 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
            料金
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            {scene.title}ロゴの料金
          </h2>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto"
        >
          {/* Free Plan */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 border border-border">
            <div className="text-center mb-6">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">無料</h3>
              <div className="mb-2">
                <span className="font-number text-4xl font-semibold text-primary">¥0</span>
              </div>
              <p className="text-text-secondary text-sm">ロゴ作成を試したい方向け</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                3回までLogo生成
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                低解像度ダウンロード
              </li>
            </ul>
            <Link
              href="/create"
              className="block text-center py-3 rounded-full font-bold bg-primary hover:bg-primary-dark text-text-inverse transition-all"
            >
              無料で始める
            </Link>
          </motion.div>

          {/* Professional Plan */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 ring-2 ring-accent shadow-xl relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-text-primary text-xs font-bold px-4 py-1 rounded-full">
              おすすめ
            </div>
            <div className="text-center mb-6">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">プロフェッショナル</h3>
              <div className="mb-2">
                <span className="font-number text-4xl font-semibold text-primary">¥2,980</span>
                <span className="text-text-muted text-sm">/月</span>
              </div>
              <p className="text-text-secondary text-sm">ビジネス利用される方</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                無制限Logo生成
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                高解像度・SVG出力
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                商用利用OK
              </li>
            </ul>
            <Link
              href="/create"
              className="block text-center py-3 rounded-full font-bold bg-accent hover:bg-accent-dark text-text-primary transition-all"
            >
              無料で始める
            </Link>
          </motion.div>

          {/* Business Plan */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 border border-border">
            <div className="text-center mb-6">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">ビジネス</h3>
              <div className="mb-2">
                <span className="font-number text-4xl font-semibold text-primary">¥9,800</span>
                <span className="text-text-muted text-sm">/月</span>
              </div>
              <p className="text-text-secondary text-sm">法人・チーム利用</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                プロフェッショナル全機能
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                チームメンバー5名
              </li>
            </ul>
            <Link
              href="/create"
              className="block text-center py-3 rounded-full font-bold bg-primary hover:bg-primary-dark text-text-inverse transition-all"
            >
              無料で始める
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-text-muted mt-8"
        >
          全プラン7日間全额返金保証付き。
          <Link href="/pricing" className="text-primary hover:underline ml-1">
            詳細な料金・機能比較はこちら
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

// Section 6: FAQ
function FAQSection({ scene }: { scene: SceneData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20 bg-bg-base">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
            よくある疑問
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            {scene.title}からよく聞かれること
          </h2>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {scene.faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 cursor-pointer font-medium text-text-primary flex justify-between items-center text-left"
              >
                <span>{faq.question}</span>
                <svg className={`w-5 h-5 text-text-muted transition-transform flex-shrink-0 ml-2 ${openIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-text-secondary leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Section 7: Related
function RelatedSection({
  relatedIndustries,
  relatedScenes
}: {
  relatedIndustries: IndustryData[]
  relatedScenes: SceneData[]
}) {
  return (
    <section className="py-12 md:py-16 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Related Industries */}
          <div>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-4">関連する業種</h3>
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {relatedIndustries.map((ind) => (
                <motion.div key={ind.slug} variants={fadeInUp}>
                  <Link
                    href={`/industry/${ind.slug}`}
                    className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-all"
                  >
                    {ind.name}のロゴ →
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Related Scenes */}
          <div>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-4">似た状況の方へ</h3>
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {relatedScenes.map((s) => (
                <motion.div key={s.slug} variants={fadeInUp}>
                  <Link
                    href={`/for/${s.slug}`}
                    className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-all"
                  >
                    {s.title}向けロゴ →
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Section 8: CTA
function CTASection({ scene }: { scene: SceneData }) {
  return (
    <section className="py-16 md:py-20 bg-bg-base">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-3xl md:text-4xl font-bold text-text-inverse mb-4"
            >
              {scene.title}の第一歩を、<br />
              今日のロゴから始める。
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-inverse/80 mb-8 leading-relaxed"
            >
              最短10分・無料から。著作権証明書付き。<br />
              7日間全额返金保証があるから安心して試せます。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <Link
                href="/create"
                className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                無料でロゴを作る →
              </Link>
              <Link
                href="/works"
                className="bg-white/10 hover:bg-white/20 text-text-inverse font-medium px-6 py-4 rounded-full transition-all border border-white/30"
              >
                事例を見る
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-5 text-xs text-text-inverse/70 font-medium"
            >
              <span>✓ 著作権完全帰属</span>
              <span>✓ 最短10分</span>
              <span>✓ 7日間全额返金保証</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Content Component (Client Component with Animations)
export default function SceneDetailContent({
  scene,
  relatedIndustries,
  relatedScenes
}: {
  scene: SceneData
  relatedIndustries: IndustryData[]
  relatedScenes: SceneData[]
}) {
  return (
    <main>
      <HeroSection scene={scene} />
      <BenefitsSection scene={scene} />
      <StepsSection scene={scene} />
      <WorksGallerySection scene={scene} />
      <PricingSection scene={scene} />
      <FAQSection scene={scene} />
      <RelatedSection relatedIndustries={relatedIndustries} relatedScenes={relatedScenes} />
      <CTASection scene={scene} />
    </main>
  )
}
