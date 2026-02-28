import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SCENE_LIST, getSceneBySlug, SceneData } from '@/lib/scene'
import { getIndustryBySlug, IndustryData } from '@/lib/industry'
import SceneDetailContent from './SceneDetailContent'

// Generate static params for all 18 scenes
export async function generateStaticParams() {
  return SCENE_LIST.map((scene) => ({
    slug: scene.slug,
  }))
}

// Generate metadata for each scene page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const scene = getSceneBySlug(slug)

  if (!scene) {
    return {
      title: 'シーンが見つかりません | LogoAI.jp',
    }
  }

  return {
    title: `${scene.title}向けAIロゴ | ${scene.metaKeyword}【LogoAI.jp】`,
    description: scene.metaDescription,
    alternates: {
      canonical: `https://logoai.jp/for/${scene.slug}`,
    },
  }
}

// Scene Page Component (Server Component for SEO)
export default async function SceneSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scene = getSceneBySlug(slug)

  if (!scene) {
    notFound()
  }

  const relatedIndustries = scene.relatedIndustries
    .map(relSlug => getIndustryBySlug(relSlug))
    .filter((i): i is IndustryData => i !== undefined)

  const relatedScenes = scene.relatedScenes
    .map(relSlug => getSceneBySlug(relSlug))
    .filter((s): s is SceneData => s !== undefined)

  return <SceneDetailContent scene={scene} relatedIndustries={relatedIndustries} relatedScenes={relatedScenes} />
}
