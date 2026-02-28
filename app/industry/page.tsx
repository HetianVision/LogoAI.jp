'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { INDUSTRY_LIST, INDUSTRY_CATEGORIES, getIndustryBySlug } from '@/lib/industry'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

export default function IndustryPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block"
            >
              Industry Collection
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            >
              業種別に探す<br className="md:hidden" />
              ロゴ事例
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg text-text-secondary max-w-[600px] mx-auto leading-relaxed"
            >
              飲食、美容、IT、士業、医療、教育など<br />
              47業界のロゴ事例をご用意しています。
            </motion.p>
          </div>
        </div>
      </section>

      {/* Industry Categories */}
      <section className="py-12 md:py-16 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          {INDUSTRY_CATEGORIES.map((category, categoryIndex) => {
            const industries = INDUSTRY_LIST.filter(i => category.slugs.includes(i.slug))
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-12 last:mb-0"
              >
                {/* Category Title */}
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                    {category.name}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-text-muted">
                    {industries.length}件
                  </span>
                </div>

                {/* Industry Grid */}
                <motion.div
                  variants={staggerChildren}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {industries.map((industry) => (
                    <motion.div key={industry.slug} variants={cardVariants}>
                      <Link
                        href={`/industry/${industry.slug}`}
                        className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all block"
                      >
                        <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                          {industry.name}
                        </div>
                        <div className="text-sm text-text-muted">
                          {industry.sampleCount}+件の事例
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            自分に合った業種は見つかりましたか？
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-text-secondary mb-8 leading-relaxed"
          >
            幡の数豊富な業種の中からも自分に合うデザインが見つかるはず。<br />
            該当する業種がない場合は、AIがあなたに最適なロゴを作成できます。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
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
          </motion.div>
        </div>
      </section>
    </main>
  )
}
