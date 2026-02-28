import Link from 'next/link'
import { Metadata } from 'next'
import { INDUSTRY_LIST, INDUSTRY_CATEGORIES, getIndustryBySlug } from '@/lib/industry'

export const metadata: Metadata = {
  title: '業種別ロゴ作成 | 47業界のロゴ事例が見つかる',
  description: '飲食、美容、IT、士業、医療、教育など、47業界のロゴ事例が見つかる。業種別に最適化されたAIロゴ作成サービス。',
}

export default function IndustryPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase mb-4 block">
              Industry Collection
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              業種別に探す<br className="md:hidden" />
              ロゴ事例
            </h1>
            <p className="text-lg text-text-secondary max-w-[600px] mx-auto leading-relaxed">
              飲食、美容、IT、士業、医療、教育など<br />
              47業界のロゴ事例をご用意しています。
            </p>
          </div>
        </div>
      </section>

      {/* Industry Categories */}
      <section className="py-12 md:py-16 bg-bg-section">
        <div className="max-w-[1200px] mx-auto px-6">
          {INDUSTRY_CATEGORIES.map((category) => {
            const industries = INDUSTRY_LIST.filter(i => category.slugs.includes(i.slug))
            return (
              <div key={category.name} className="mb-12 last:mb-0">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {industries.map((industry) => (
                    <Link
                      key={industry.slug}
                      href={`/industry/${industry.slug}`}
                      className="group bg-white rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all"
                    >
                      <div className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                        {industry.name}
                      </div>
                      <div className="text-sm text-text-muted">
                        {industry.sampleCount}+件の事例
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            自分に合った業種は見つかりましたか？
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            幡の数豊富な業種の中からも自分に合うデザインが見つかるはず。<br />
            該当する業種がない場合は、AIがあなたに最適なロゴを作成できます。
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
        </div>
      </section>
    </main>
  )
}
