'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { COMPETITOR_LIST } from '@/lib/competitors'

const CATEGORY_LABELS: Record<string, string> = {
  'global-design': '世界的なデザインツール',
  'ai-logo': 'AI Logo作成サービス',
  'local-design': '地域特化サービス',
  'vector-tool': '本格デザインエディタ',
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export default function VsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              Comparison
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              競合サービスとの<br className="md:hidden" />
              徹底比較
            </h1>
            <p className="text-lg text-text-secondary max-w-[600px] mx-auto leading-relaxed">
              Canva、Adobe Express、Looka、Wix Logoなど<br />
              人気Logo作成ツールと徹底比較しています。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Competitor Comparison List */}
      <section className="py-12 md:py-16 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Category: AI Logo Services */}
          <motion.div
            className="mb-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                AI Logo作成サービス
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-text-muted">
                {COMPETITOR_LIST.filter(c => c.category === 'ai-logo').length}件
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMPETITOR_LIST.filter(c => c.category === 'ai-logo').map((competitor) => (
                <motion.div key={competitor.slug} variants={cardVariants}>
                  <Link
                    href={`/vs/${competitor.slug}`}
                    className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
                  >
                    <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                      {competitor.nameJa}
                    </div>
                    <div className="text-sm text-text-muted">
                      {competitor.tagline}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category: Global Design Tools */}
          <motion.div
            className="mb-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                世界的なデザインツール
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-text-muted">
                {COMPETITOR_LIST.filter(c => c.category === 'global-design').length}件
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMPETITOR_LIST.filter(c => c.category === 'global-design').map((competitor) => (
                <motion.div key={competitor.slug} variants={cardVariants}>
                  <Link
                    href={`/vs/${competitor.slug}`}
                    className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
                  >
                    <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                      {competitor.nameJa}
                    </div>
                    <div className="text-sm text-text-muted">
                      {competitor.tagline}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category: Local Design Services */}
          <motion.div
            className="mb-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                地域特化サービス
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-text-muted">
                {COMPETITOR_LIST.filter(c => c.category === 'local-design').length}件
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMPETITOR_LIST.filter(c => c.category === 'local-design').map((competitor) => (
                <motion.div key={competitor.slug} variants={cardVariants}>
                  <Link
                    href={`/vs/${competitor.slug}`}
                    className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
                  >
                    <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                      {competitor.nameJa}
                    </div>
                    <div className="text-sm text-text-muted">
                      {competitor.tagline}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category: Vector Tools */}
          <motion.div
            className="mb-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                本格デザインエディタ
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-text-muted">
                {COMPETITOR_LIST.filter(c => c.category === 'vector-tool').length}件
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMPETITOR_LIST.filter(c => c.category === 'vector-tool').map((competitor) => (
                <motion.div key={competitor.slug} variants={cardVariants}>
                  <Link
                    href={`/vs/${competitor.slug}`}
                    className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
                  >
                    <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                      {competitor.nameJa}
                    </div>
                    <div className="text-sm text-text-muted">
                      {competitor.tagline}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-bg-base">
        <motion.div
          className="max-w-[800px] mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            まずは無料で試してみる
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            他のサービスとの違いを実感するには、実際に試してみるのが一番。<br />
            5分間であなたのオリジナルLogoを作成できます。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/create"
              className="bg-accent hover:bg-accent-dark text-text-primary font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              無料でロゴを作る
            </Link>
            <Link
              href="/works"
              className="border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-8 py-4 rounded-full transition-all"
            >
              事例を見る
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
