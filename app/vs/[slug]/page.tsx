import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { COMPETITOR_LIST, getCompetitorBySlug } from '@/lib/competitors'
import VSDetailContent from './VSDetailContent'

export function generateStaticParams() {
  return COMPETITOR_LIST.map((competitor) => ({
    slug: competitor.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const competitor = getCompetitorBySlug(slug)

  if (!competitor) {
    return { title: '競合比較 | LogoAI.jp' }
  }

  return {
    title: `LogoAI.jp vs ${competitor.name} | ${competitor.comparisonKeyword}【比較2025】`,
    description: `LogoAI.jpと${competitor.name}を徹底比較。${competitor.metaDesc}`,
    alternates: { canonical: `https://logoai.jp/vs/${competitor.slug}` },
  }
}

export default async function VSDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const competitor = getCompetitorBySlug(slug)

  if (!competitor) {
    notFound()
  }

  return <VSDetailContent competitor={competitor} />
}
