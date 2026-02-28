'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
function HeroSection({ industry }: { industry: IndustryData }) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-bg-base">
      {/* Background decoration */}
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
            <li><Link href="/industry" className="hover:text-primary transition-colors">業種一覧</Link></li>
            <li>/</li>
            <li className="text-text-primary font-medium">{industry.name}のロゴ</li>
          </ol>
        </motion.nav>

        {/* Hero Content */}
        <div className="max-w-[660px] mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block"
          >
            {industry.name} x AIロゴ
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-5"
          >
            {industry.name}向け、<br />
            AIロゴ作成サービス。
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-secondary leading-relaxed mb-8"
          >
            {industry.heroDesc}
          </motion.p>

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white border border-border rounded-2xl p-6 mb-8 text-left max-w-[480px] mx-auto"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="text-green-700 font-bold">✓</span>
                {industry.name}向けフォント・カラー自動最適化
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="text-green-700 font-bold">✓</span>
                {industry.sampleCount}件以上の{industry.name}ロゴ事例
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="text-green-700 font-bold">✓</span>
                著作権証明書付き・商標登録申請可能
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            <Link
              href={`/create?industry=${industry.slug}`}
              className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
            >
              {industry.name}のロゴを作る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#works-examples"
              className="border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-4 rounded-full transition-all"
            >
              事例を見る
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-5 text-xs text-text-muted font-medium"
          >
            <span>✓ 無料で3案生成</span>
            <span>✓ 最短10分</span>
            <span>✓ 7日間全额返金保証</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 2: Pain Points
function PainPointsSection({ industry }: { industry: IndustryData }) {
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
            こんな課題はありませんか
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            {industry.name}のロゴで<br className="md:hidden" />
            よくある悩み
          </h2>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto"
        >
          {industry.painPoints.map((pain, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white border border-border rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-4">{pain.icon}</div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-3">{pain.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{pain.desc}</p>
              <div className="pt-4 border-t border-border">
                <div className="text-xl text-accent mb-1">↓</div>
                <div className="text-xs font-bold text-primary">LogoAI.jpで解決</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Section 3: Font & Color Recommendations
function FontColorSection({ industry }: { industry: IndustryData }) {
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
            デザイン提案
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            {industry.name}に最適な<br className="md:hidden" />
            フォントとカラー
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-[1000px] mx-auto">
          {/* Font Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl font-bold text-text-primary mb-5">推奨フォント</h3>
            <div className="space-y-4">
              {industry.fontRecommendations.map((font, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  className="bg-white border border-border rounded-xl p-5 flex items-center gap-4"
                >
                  <div
                    className="text-2xl font-bold text-text-primary min-w-[80px] flex-shrink-0"
                    style={{ fontFamily: font.style.includes('sans') ? 'system-ui' : font.style }}
                  >
                    {font.preview}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-text-primary mb-1">{font.name}</div>
                    <div className="text-xs text-text-muted leading-relaxed">{font.reason}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Color Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl font-bold text-text-primary mb-5">推奨カラーパレット</h3>
            <div className="space-y-4">
              {industry.colorPalettes.map((palette, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  className="bg-white border border-border rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="flex gap-1 flex-shrink-0">
                    {palette.colors.map((color, cIndex) => (
                      <div
                        key={cIndex}
                        className="w-8 h-8 rounded-lg border border-black/5"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-text-primary mb-0.5">{palette.name}</div>
                    <div className="text-xs text-text-muted">{palette.mood}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 4: Works Gallery
function WorksGallerySection({ industry }: { industry: IndustryData }) {
  return (
    <section className="py-16 md:py-20 bg-bg-section" id="works-examples">
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
            {industry.name}のロゴ事例
          </h2>
          <p className="text-text-secondary">
            全て実際にLogoAI.jpで生成されたロゴです
          </p>
        </motion.div>

        {/* Works Grid - Placeholder for demo */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10"
        >
          {[...Array(Math.min(12, industry.sampleCount))].map((_, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="aspect-square bg-white rounded-xl border border-border p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="font-heading text-xl md:text-2xl text-primary mb-2">
                {industry.nameEn}
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
            href={`/works?industry=${industry.slug}`}
            className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-3 rounded-full transition-all"
          >
            {industry.name}の全事例を見る（{industry.sampleCount}件+）
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Section 5: Industry Features
function IndustryFeaturesSection({ industry }: { industry: IndustryData }) {
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
            {industry.name}特化機能
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            {industry.name}向けに特化した機能
          </h2>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {industry.features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white border border-border rounded-xl p-6"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-heading text-base font-bold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Section 6: Pricing
function PricingSection({ industry }: { industry: IndustryData }) {
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
            料金
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            {industry.name}ロゴの料金
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
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Basicフォントのみ
              </li>
            </ul>
            <Link
              href={`/create?industry=${industry.slug}`}
              className="block text-center py-3 rounded-full font-bold bg-primary hover:bg-primary-dark text-text-inverse transition-all"
            >
              無料で始める
            </Link>
          </motion.div>

          {/* Professional Plan - Highlighted */}
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
                日本語フォント100種
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                ブランド套案出力
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                商用利用OK
              </li>
            </ul>
            <Link
              href={`/create?industry=${industry.slug}`}
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
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                優先サポート
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                APIアクセス
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                カスタムフォント追加
              </li>
            </ul>
            <Link
              href={`/create?industry=${industry.slug}`}
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

// Section 7: FAQ
function FAQSection({ industry }: { industry: IndustryData }) {
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
            {industry.name}のロゴに関する疑問
          </h2>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {industry.faqs.map((faq, index) => (
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8l5 5 5-5" />
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

// Section 8: Related Industries
function RelatedIndustriesSection({ relatedIndustries }: { relatedIndustries: IndustryData[] }) {
  return (
    <section className="py-12 md:py-16 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-2xl md:text-3xl font-bold text-text-primary text-center mb-8"
        >
          関連する業種のロゴ事例
        </motion.h2>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {relatedIndustries.map((rel) => (
            <motion.div key={rel.slug} variants={fadeInUp}>
              <Link
                href={`/industry/${rel.slug}`}
                className="flex flex-col gap-1 px-6 py-4 bg-white border border-border rounded-xl hover:border-accent hover:shadow-md transition-all"
              >
                <span className="font-heading font-bold text-text-primary">{rel.name}</span>
                <span className="text-xs text-text-muted">{rel.sampleCount}件の事例 →</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Section 9: CTA
function CTASection({ industry }: { industry: IndustryData }) {
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
          {/* Decorative elements */}
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
              {industry.name}のロゴを、<br />
              今日から作り始める。
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-inverse/80 mb-8 leading-relaxed"
            >
              最短10分・無料から。デザインの知識は不要です。<br />
              著作権証明書付き・7日間全额返金保証。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <Link
                href={`/create?industry=${industry.slug}`}
                className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {industry.name}のロゴを作る
              </Link>
              <Link
                href={`/works?industry=${industry.slug}`}
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
export default function IndustryDetailContent({
  industry,
  relatedIndustries
}: {
  industry: IndustryData
  relatedIndustries: IndustryData[]
}) {
  return (
    <main>
      <HeroSection industry={industry} />
      <PainPointsSection industry={industry} />
      <FontColorSection industry={industry} />
      <WorksGallerySection industry={industry} />
      <IndustryFeaturesSection industry={industry} />
      <PricingSection industry={industry} />
      <FAQSection industry={industry} />
      <RelatedIndustriesSection relatedIndustries={relatedIndustries} />
      <CTASection industry={industry} />
    </main>
  )
}
