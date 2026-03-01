'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BottomCTA from '@/components/BottomCTA'

// Page Hero Section
function PageHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-bg-base">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(26,58,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,58,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute -right-[200px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[rgba(201,150,58,0.08)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
          aria-label="パンくずリスト"
        >
          <ol className="flex gap-2 text-sm text-text-muted list-none p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">ホーム</Link></li>
            <li><span className="mx-2 opacity-40">/</span></li>
            <li className="text-text-secondary" aria-current="page">機能一覧</li>
          </ol>
        </motion.nav>

        <div className="max-w-[720px]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-accent font-medium text-sm tracking-[0.1em] uppercase"
          >
            すべての機能
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl font-bold text-text-primary leading-tight mt-4 mb-6"
          >
            日本語ロゴのための、<br />すべてが揃っている
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-secondary leading-relaxed mb-10 max-w-[600px]"
          >
            フォント・著作権・商標・ブランドガイドライン・ファイル形式。
            ロゴ作成に必要なものを、ひとつのサービスで完結。
            海外ツールでは実現できない、日本市場特化の機能群をお楽しみください。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/create" className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
              無料でロゴを作る
            </Link>
            <Link href="/pricing" className="border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-4 rounded-full transition-all">
              料金プランを見る
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Features Navigation
function FeaturesNav() {
  const features = [
    { id: 'japanese-fonts', icon: 'あ', title: '日本語フォント', sub: '100種類以上' },
    { id: 'ai-generation', icon: '✦', title: 'AI自動生成', sub: '3案同時提案' },
    { id: 'copyright', icon: '✓', title: '著作権帰属', sub: '証明書PDF発行' },
    { id: 'trademark', icon: '盾', title: '商標類似チェック', sub: 'J-PlatPat連携' },
    { id: 'brand-guideline', icon: '冊', title: 'ブランドガイドライン', sub: 'PDF自動生成' },
    { id: 'file-formats', icon: '↓', title: '全形式ダウンロード', sub: 'SVG・AI・EPS対応' },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="sticky top-16 z-40 bg-bg-section border-b border-border"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex">
          {features.map((feature, index) => (
            <motion.a
              key={feature.id}
              href={`#${feature.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-2.5 px-4 py-4 text-text-secondary hover:text-primary border-r border-border transition-all relative group flex-1 justify-center ${index === features.length - 1 ? 'border-r-0' : ''}`}
            >
              <div className="w-7 h-7 bg-primary/10 rounded-md flex items-center justify-center text-primary text-sm font-bold">
                {feature.icon}
              </div>
              <div className="whitespace-nowrap">
                <div className="text-sm font-medium">{feature.title}</div>
                <div className="text-xs text-text-muted">{feature.sub}</div>
              </div>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// Section 3: 日本語フォント
function JapaneseFonts() {
  const fonts = [
    { name: '游明朝体', sample: '田中製菓' },
    { name: 'ヒラギノ角ゴ', sample: '株式会社' },
    { name: 'A1ゴシック', sample: 'デザイン' },
    { name: '筑紫A丸ゴ', sample: 'cafe' },
    { name: '大明寺楷書', sample: '和法律' },
    { name: '辰宇落語', sample: '落語亭' },
  ]

  return (
    <section id="japanese-fonts" className="py-20 md:py-28 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              className="text-accent font-medium text-sm tracking-[0.1em] uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >日本語フォント</motion.span>
            <motion.h2
              className="font-heading text-4xl font-bold text-text-primary mt-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              日本、ビジネスに<br />最適化されたフォント
            </motion.h2>
            <motion.p
              className="text-text-secondary leading-relaxed mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              100種類以上の日本語フォントを搭載。明朝体・ゴシック体・丸ゴシック・手書き風など、
              業種やブランドイメージに合わせた選択が可能です。海外ツールでは味わえない、
              日本のビジネスシーンに最適化されたフォント陣容をお届けします。
            </motion.p>
            <ul className="space-y-3 mb-8">
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                游明朝体・ヒラギノ角ゴ・A1ゴシックなど充実
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                商用利用OKのライセンス済みフォント
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                フォント太さや文字間も調整可能
              </motion.li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {fonts.map((font, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl border border-border hover:shadow-md transition-shadow"
              >
                <div className="text-2xl text-primary mb-2" style={{ fontFamily: 'Noto Serif JP' }}>{font.sample}</div>
                <div className="text-xs text-text-muted">{font.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Section 4: AI自動生成
function AIGeneration() {
  return (
    <section id="ai-generation" className="py-20 md:py-28 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-text-muted">入力</div>
                  <div className="font-heading text-lg text-primary">田中製菓</div>
                </div>
              </div>
              <div className="h-px bg-border my-4" />
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-bg-section rounded-lg flex items-center justify-center">
                    <span className="font-heading text-lg text-primary/60">案{i}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.span
              className="text-accent font-medium text-sm tracking-[0.1em] uppercase"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              AI自動生成
            </motion.span>
            <motion.h2
              className="font-heading text-4xl font-bold text-text-primary mt-4 mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              業種・スタイルから、<br />自動でデザイン提案
            </motion.h2>
            <motion.p
              className="text-text-secondary leading-relaxed mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              業種（飲食・IT・美容・士業など）を選択すると、AIがビジネスにあったスタイルを提案。
              「モダン」「クラシック」「可愛らしい」「プロフェッショナル」など多彩なデザインから、罪名を選ぶだけで適切なLogo为您生成。
            </motion.p>
            <ul className="space-y-3 mb-8">
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                業種選択でビジネスにあったスタイルを提案
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                1回の生成で3案同時提案
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                約2分でプロ品質のLogoが完成
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// Section 5: 著作権帰属
function Copyright() {
  return (
    <section id="copyright" className="py-20 md:py-28 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              className="text-accent font-medium text-sm tracking-[0.1em] uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >著作権帰属</motion.span>
            <motion.h2
              className="font-heading text-4xl font-bold text-text-primary mt-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              著作権は<br />お客様に100%帰属
            </motion.h2>
            <motion.p
              className="text-text-secondary leading-relaxed mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              生成されたLogoの著作権はお客様に完全帰属。商用利用・広告・商品パッケージ・WEB掲載など、
              自由的に使用できます。万一のために、著作権帰属証明書PDFを発行。
            </motion.p>
            <ul className="space-y-3 mb-8">
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                著作権帰属証明書PDFを発行
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                商用利用OK、广告・商品・サービス 何でもOK
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                商標登録申請のサポート也可能
              </motion.li>
            </ul>
          </div>
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-border"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-text-primary">著作権帰属証明書</div>
                <div className="text-sm text-text-muted">Certificate of Copyright</div>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-muted">ブランド名</span>
                <span className="font-medium text-text-primary">田中製菓</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-muted">生成日</span>
                <span className="font-medium text-text-primary">2026年2月26日</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-muted">著作権者</span>
                <span className="font-medium text-text-primary">田中 健太 様</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-text-muted">証明書ID</span>
                <span className="font-medium text-text-primary">LGA-20260226-001</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <button className="w-full py-3 bg-primary text-text-inverse rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDFをダウンロード
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 6: 商標類似チェック
function Trademark() {
  return (
    <section id="trademark" className="py-20 md:py-28 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="font-bold text-text-primary">類似商標チェック</div>
              </div>
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-lg font-bold text-text-primary mb-2">問題は検出されませんでした</div>
                <div className="text-sm text-text-muted">J-PlatPatデータベースと照合済み</div>
              </div>
              <div className="text-xs text-text-muted text-center">
                ※ This is a demonstration result.
              </div>
            </motion.div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.span
              className="text-accent font-medium text-sm tracking-[0.1em] uppercase"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >商標類似チェック</motion.span>
            <motion.h2
              className="font-heading text-4xl font-bold text-text-primary mt-4 mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              商標登録前に、<br />類似を自動チェック
            </motion.h2>
            <motion.p
              className="text-text-secondary leading-relaxed mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              生成したLogoが既存の登録商標と類似していないか、J-PlatPat（特許情報プラットフォーム）と照合して自動チェック。
              商標登録申請前のリスク確認で、リスクを排除できます。
            </motion.p>
            <ul className="space-y-3 mb-8">
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                J-PlatPat特許情報プラットフォーム連携
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                商標登録申請前のリスク確認
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                問題が検出されると別の案を提案
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// Section 7: ブランドガイドライン
function BrandGuideline() {
  return (
    <section id="brand-guideline" className="py-20 md:py-28 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              className="text-accent font-medium text-sm tracking-[0.1em] uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >ブランドガイドライン</motion.span>
            <motion.h2
              className="font-heading text-4xl font-bold text-text-primary mt-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Logoだけでなく、<br />ブランドルールも自動作成
            </motion.h2>
            <motion.p
              className="text-text-secondary leading-relaxed mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Logoの使用規則、カラーコード、フォント仕様などをブランドガイドラインとしてPDFにまとめます。
              初めてブランドを作成の方でも、一貫性のあるブランドイメージを簡単に維持できます。
            </motion.p>
            <ul className="space-y-3 mb-8">
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Logo使用規則（間隔・最小サイズ等）
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                配色コード（CMYK・RGB・HEX）
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                推奨フォントと使用方法
              </motion.li>
            </ul>
          </div>
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="font-bold text-text-primary">ブランドガイドライン</div>
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">PDF</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-bg-section rounded-lg">
                <div className="text-xs text-text-muted mb-2">ブランドカラー</div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-[#1A3A2A] rounded-lg"></div>
                  <div className="w-12 h-12 bg-[#C9963A] rounded-lg"></div>
                  <div className="w-12 h-12 bg-[#FAFAF7] border border-border rounded-lg"></div>
                </div>
              </div>
              <div className="p-4 bg-bg-section rounded-lg">
                <div className="text-xs text-text-muted mb-2">フォント</div>
                <div className="font-heading text-xl text-primary">游明朝体</div>
              </div>
              <div className="p-4 bg-bg-section rounded-lg">
                <div className="text-xs text-text-muted mb-2">Logo使用規則</div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 border-2 border-primary rounded flex items-center justify-center">
                    <span className="font-heading text-xs text-primary">Logo</span>
                  </div>
                  <div className="text-xs text-text-muted">
                    上下左右の<br />スペーシング
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Section 8: ファイル形式
function FileFormats() {
  const formats = [
    { name: 'SVG', desc: 'ベクター形式', icon: '●', color: 'bg-orange-100' },
    { name: 'AI', desc: 'Adobe Illustrator', icon: '●', color: 'bg-orange-100' },
    { name: 'EPS', desc: 'ベクター出力', icon: '●', color: 'bg-orange-100' },
    { name: 'PNG', desc: '高解像度画像', icon: '●', color: 'bg-blue-100' },
    { name: 'JPG', desc: '写真用画像', icon: '●', color: 'bg-blue-100' },
    { name: 'PDF', desc: '印刷用', icon: '●', color: 'bg-red-100' },
  ]

  return (
    <section id="file-formats" className="py-20 md:py-28 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">ファイル形式</span>
          <h2 className="font-heading text-4xl font-bold text-text-primary mt-4 mb-6">
            すべての形式で<br />ダウンロード可能
          </h2>
          <p className="text-text-secondary max-w-[600px] mx-auto">
            WEB用・印刷用・加工用など、用途に合わせたファイル形式を選択できます。
            SVG・AI・EPS形式は自由に拡大縮小でき、インク印刷劣化しません。
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {formats.map((format, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl border border-border text-center hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${format.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                <span className="font-bold text-primary">{format.name.charAt(0)}</span>
              </div>
              <div className="font-bold text-text-primary mb-1">{format.name}</div>
              <div className="text-xs text-text-muted">{format.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Section 9: 名刺レイアウト
function BusinessCard() {
  return (
    <section className="py-20 md:py-28 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[1.7/1] bg-primary rounded-lg p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-accent/20"></div>
                <div className="text-[#FAFAF7] font-heading text-2xl">田中製菓</div>
                <div className="text-[#C9963A] text-xs">Tanaka Seika</div>
                <div className="text-[#FAFAF7]/80 text-[10px]">
                  <div>田中 健太</div>
                  <div>東京都渋谷区...</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <div className="w-8 h-8 bg-primary rounded"></div>
                <div className="w-8 h-8 bg-accent rounded"></div>
              </div>
            </motion.div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.span
              className="text-accent font-medium text-sm tracking-[0.1em] uppercase"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >名刺レイアウト</motion.span>
            <motion.h2
              className="font-heading text-4xl font-bold text-text-primary mt-4 mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Logoだけでない、<br />名刺も自動作成
            </motion.h2>
            <motion.p
              className="text-text-secondary leading-relaxed mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Logoに合わせて、名刺・封筒・レターキットも自動生成。
              封筒やレターキットも一緒に作れるので、ブランド作成を一括で完了できます。
            </motion.p>
            <ul className="space-y-3 mb-8">
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                名刺・封筒・レターキット
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Logoと同一スタイルで統一
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-text-secondary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                PDF・PNGで出力可能
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// Section 10: 機能比較表
function ComparisonTable() {
  const features = [
    { name: '日本語フォント数', ours: '100種以上', canva: '約30種', wix: '5種程度', coconala: 'デザイナー依存' },
    { name: 'AI自動生成', ours: '✓ 業種特化型', canva: '△ テンプレート型', wix: '✓', coconala: '✗ 人力' },
    { name: '著作権完全帰属', ours: '✓', canva: '✗', wix: '△ 条件付き', coconala: '✓' },
    { name: '商用利用OK', ours: '✓', canva: '✓', wix: '✓', coconala: '✓' },
    { name: '著作権帰属証明書', ours: '✓', canva: '✗', wix: '✗', coconala: '✓' },
    { name: 'ブランドガイドライン', ours: '✓', canva: '✗', wix: '一部', coconala: '✓' },
    { name: '名刺・封筒出力', ours: '✓', canva: '△', wix: '✗', coconala: '✓' },
    { name: '日本語サポート', ours: '✓', canva: '△', wix: '✗', coconala: '✓' },
    { name: '7日間返金保証', ours: '✓', canva: '✗', wix: '✗', coconala: '✗' },
  ]

  return (
    <section className="py-20 md:py-28 bg-bg-section">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">サービス比較</span>
          <h2 className="font-heading text-4xl font-bold text-text-primary mt-4 mb-6">
            他のサービスと何が違うのか
          </h2>
          <p className="text-text-secondary">主要なロゴ作成サービスとの機能比較です。数字は2025年2月時点の情報です。</p>
        </motion.div>

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <table className="w-full bg-white rounded-2xl border border-border overflow-hidden">
            <thead>
              <tr className="bg-bg-section">
                <th className="text-left p-4 font-medium text-text-secondary">機能・特徴</th>
                <th className="p-4 font-bold text-primary">当サービス<br/><span className="text-xs font-normal">LogoAI.jp</span></th>
                <th className="p-4 font-medium text-text-muted">Canva</th>
                <th className="p-4 font-medium text-text-muted">Wix Logo Maker</th>
                <th className="p-4 font-medium text-text-muted">coconala</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-bg-base'}>
                  <td className="p-4 text-text-secondary">{row.name}</td>
                  <td className="p-4 text-center font-bold text-primary">{row.ours}</td>
                  <td className="p-4 text-center text-text-muted">{row.canva}</td>
                  <td className="p-4 text-center text-text-muted">{row.wix}</td>
                  <td className="p-4 text-center text-text-muted">{row.coconala}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section

// メインページ
export default function FeaturesPage() {
  return (
    <main>
      <PageHero />
      <FeaturesNav />
      <JapaneseFonts />
      <AIGeneration />
      <Copyright />
      <Trademark />
      <BrandGuideline />
      <FileFormats />
      <BusinessCard />
      <ComparisonTable />
      <BottomCTA
        title="すべての機能が、<br />無料でお試しいただけます"
        description="クレジットカード不要。3つのLogoが無料プランで生成できます。"
      />
    </main>
  )
}
