'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SCENE_LIST, SCENE_CATEGORIES, getSceneBySlug } from '@/lib/scene'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
}

// Scene category icons
const categoryIcons: Record<string, string> = {
  'Startup': '🚀',
  'EC': '🛒',
  'Professional': '⚖️',
  'Rebranding': '🔄',
  'Event': '🎪',
  'Creator': '💡',
}

// Scene icons
const sceneIcons: Record<string, string> = {
  'startup': '🚀',
  'freelancer': '💻',
  'side-job': '🌟',
  'solopreneur': '🏢',
  'second-job': '🎯',
  'ec-shop': '🛒',
  'minne-creator': '🎨',
  'youtube': '📺',
  'blogger': '✍️',
  'professional': '⚖️',
  'consultant': '🎓',
  'rebrand': '🔄',
  'logo-renewal': '✨',
  'event-organizer': '🎪',
  'npo': '🕊️',
  'school-club': '🏃',
  'designer-client': '💡',
  'web-creator': '💻',
}

export default function ForPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-bg-base">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="max-w-[660px] mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block"
            >
              シーン別ロゴ作成
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-5"
            >
              あなたの状況は<br />
              どちらですか？
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-text-secondary leading-relaxed mb-8"
            >
              開業・フリーランス・ECショップなど、18のシーン別に<br />
              最適なロゴ作成方法をナビゲートします
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/create"
                className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                今すぐロゴを作る →
              </Link>
              <Link
                href="/works"
                className="border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-4 rounded-full transition-all"
              >
                事例を見る
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scene Categories */}
      {SCENE_CATEGORIES.map((category) => (
        <section key={category.name} className="py-16 md:py-20 bg-bg-base">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <span className="text-4xl mb-4 block">{categoryIcons[category.name]}</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
                {category.nameJa}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {category.slugs.map((slug) => {
                const scene = getSceneBySlug(slug)
                if (!scene) return null

                return (
                  <motion.div
                    key={slug}
                    variants={cardVariants}
                  >
                    <Link
                      href={`/for/${slug}`}
                      className="group bg-white border border-border rounded-2xl p-6 hover:border-accent hover:shadow-lg transition-all block h-full"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{sceneIcons[slug] || '📌'}</span>
                        <div>
                          <h3 className="font-heading text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                            {scene.title}
                          </h3>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {scene.metaDescription.slice(0, 60)}...
                          </p>
                          <div className="mt-3 text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            詳細を見る →
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                あなたに最適なロゴを<br />
                今日から作り始める
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-text-inverse/80 mb-8 leading-relaxed"
              >
                最短10分・無料から。デザインの知識は不要です。<br />
                著作権証明書付き・7日間全额返金保証
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link
                  href="/create"
                  className="bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  無料でロゴを作る
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-5 text-xs text-text-inverse/70 font-medium mt-8"
              >
                <span>✓ 著作権完全帰属</span>
                <span>✓ 最短10分</span>
                <span>✓ 7日間全额返金保証</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
