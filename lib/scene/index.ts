// Scene data imports
import { startup } from './startup'
import { freelancer } from './freelancer'
import { sideJob } from './side-job'
import { solopreneur } from './solopreneur'
import { secondJob } from './second-job'
import { ecShop } from './ec-shop'
import { minneCreator } from './minne-creator'
import { youtube } from './youtube'
import { blogger } from './blogger'
import { professional } from './professional'
import { consultant } from './consultant'
import { rebrand } from './rebrand'
import { logoRenewal } from './logo-renewal'
import { eventOrganizer } from './event-organizer'
import { npo } from './npo'
import { schoolClub } from './school-club'
import { designerClient } from './designer-client'
import { webCreator } from './web-creator'

// Type definitions
export interface Persona {
  label: string
  needs: string[]
}

export interface Benefit {
  icon: string
  title: string
  desc: string
}

export interface SceneStep {
  num: string
  title: string
  desc: string
  timeLabel?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface SceneData {
  slug: string
  title: string
  titleShort: string
  metaKeyword: string
  metaDescription: string
  heroTitle: string
  heroDesc: string
  heroEmoji: string
  situationPoints: string[]
  benefits: Benefit[]
  steps: SceneStep[]
  faqs: FAQItem[]
  relatedIndustries: string[]
  relatedScenes: string[]
  keywords: string[]
}

// Scene list - 18 scenes
export const SCENE_LIST: SceneData[] = [
  // 開業・起業系
  startup,
  freelancer,
  sideJob,
  solopreneur,
  secondJob,
  // EC・ネットビジネス系
  ecShop,
  minneCreator,
  youtube,
  blogger,
  // 士業・専門家系
  professional,
  consultant,
  // リブランディング系
  rebrand,
  logoRenewal,
  // イベント・プロジェクト系
  eventOrganizer,
  npo,
  schoolClub,
  // デザイナー・制作者向け
  designerClient,
  webCreator,
]

// Helper function to find scene by slug
export function getSceneBySlug(slug: string): SceneData | undefined {
  return SCENE_LIST.find(s => s.slug === slug)
}

// Scene categories for grouping
export interface SceneCategory {
  name: string
  nameJa: string
  slugs: string[]
}

export const SCENE_CATEGORIES: SceneCategory[] = [
  {
    name: 'Startup',
    nameJa: '開業・起業系',
    slugs: ['startup', 'freelancer', 'side-job', 'solopreneur', 'second-job'],
  },
  {
    name: 'EC',
    nameJa: 'EC・ネットビジネス系',
    slugs: ['ec-shop', 'minne-creator', 'youtube', 'blogger'],
  },
  {
    name: 'Professional',
    nameJa: '士業・専門家系',
    slugs: ['professional', 'consultant'],
  },
  {
    name: 'Rebranding',
    nameJa: 'リブランディング系',
    slugs: ['rebrand', 'logo-renewal'],
  },
  {
    name: 'Event',
    nameJa: 'イベント・プロジェクト系',
    slugs: ['event-organizer', 'npo', 'school-club'],
  },
  {
    name: 'Creator',
    nameJa: 'デザイナー・制作者向け',
    slugs: ['designer-client', 'web-creator'],
  },
]
