import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { INDUSTRY_LIST, getIndustryBySlug, IndustryData } from '@/lib/industry'
import IndustryDetailContent from './IndustryDetailContent'

// Generate static params for all 47 industries
export async function generateStaticParams() {
  return INDUSTRY_LIST.map((industry) => ({
    slug: industry.slug,
  }))
}

// Generate metadata for each industry page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)

  if (!industry) {
    return {
      title: '業種が見つかりません | LogoAI.jp',
    }
  }

  return {
    title: `${industry.name}のロゴ作成 | AI生成・著作権証明書付き【LogoAI.jp】`,
    description: `${industry.name}向けAIロゴ作成。日本語フォント100種以上、${industry.sampleCount}件以上の事例、著作権完全帰属。最短10分・7日間全额返金保証。`,
    alternates: {
      canonical: `https://logoai.jp/industry/${industry.slug}`,
    },
  }
}

// Industry Page Component (Server Component for SEO)
export default async function IndustrySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)

  if (!industry) {
    notFound()
  }

  const relatedIndustries = industry.relatedIndustries
    .map(relSlug => getIndustryBySlug(relSlug))
    .filter((i): i is IndustryData => i !== undefined)

  return <IndustryDetailContent industry={industry} relatedIndustries={relatedIndustries} />
}
