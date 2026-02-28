// Industry data imports
import { restaurant } from './restaurant'
import { cafe } from './cafe'
import { izakaya } from './izakaya'
import { ramen } from './ramen'
import { sushi } from './sushi'
import { bakery } from './bakery'
import { sweets } from './sweets'
import { beautySalon } from './beauty-salon'
import { nailSalon } from './nail-salon'
import { esthetic } from './esthetic'
import { yoga } from './yoga'
import { barber } from './barber'
import { itStartup } from './it-startup'
import { webDesign } from './web-design'
import { appDev } from './app-dev'
import { saas } from './saas'
import { lawyer } from './lawyer'
import { accountant } from './accountant'
import { judicialScrivener } from './judicial-scrivener'
import { laborConsult } from './labor-consult'
import { patentAttorney } from './patent-attorney'
import { clinic } from './clinic'
import { dental } from './dental'
import { pharmacy } from './pharmacy'
import { counseling } from './counseling'
import { education } from './education'
import { language } from './language'
import { music } from './music'
import { kids } from './kids'
import { realEstate } from './real-estate'
import { construction } from './construction'
import { interior } from './interior'
import { ecRetail } from './ec-retail'
import { fashion } from './fashion'
import { foodEc } from './food-ec'
import { handmade } from './handmade'
import { finance } from './finance'
import { insurance } from './insurance'
import { photography } from './photography'
import { designAgency } from './design-agency'
import { video } from './video'
import { wedding } from './wedding'
import { event } from './event'
import { cleaning } from './cleaning'
import { pet } from './pet'
import { travel } from './travel'
import { consulting } from './consulting'

// Type definitions
export interface PainPoint {
  icon: string
  title: string
  desc: string
}

export interface FontRec {
  name: string
  style: string
  reason: string
  preview: string
}

export interface ColorPalette {
  name: string
  colors: string[]
  mood: string
}

export interface IndustryFeature {
  icon: string
  title: string
  desc: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface IndustryData {
  slug: string
  name: string
  nameEn: string
  sampleCount: number
  heroDesc: string
  painPoints: PainPoint[]
  fontRecommendations: FontRec[]
  colorPalettes: ColorPalette[]
  features: IndustryFeature[]
  faqs: FAQItem[]
  keywords: string[]
  relatedIndustries: string[]
  schemaType: string
}

// Industry list - 47 industries
export const INDUSTRY_LIST: IndustryData[] = [
  // 飲食
  restaurant,
  cafe,
  izakaya,
  ramen,
  sushi,
  bakery,
  sweets,
  // 美容・ウェルネス
  beautySalon,
  nailSalon,
  esthetic,
  yoga,
  barber,
  // IT・デジタル
  itStartup,
  webDesign,
  appDev,
  saas,
  // 士業・専門職
  lawyer,
  accountant,
  judicialScrivener,
  laborConsult,
  patentAttorney,
  // 医療・健康
  clinic,
  dental,
  pharmacy,
  counseling,
  // 教育
  education,
  language,
  music,
  kids,
  // 不動産・建設
  realEstate,
  construction,
  interior,
  // 小売・EC
  ecRetail,
  fashion,
  foodEc,
  handmade,
  // 金融・保険
  finance,
  insurance,
  // クリエイティブ
  photography,
  designAgency,
  video,
  // イベント・ブライダル
  wedding,
  event,
  // その他
  cleaning,
  pet,
  travel,
  consulting,
]

// Helper function to find industry by slug
export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return INDUSTRY_LIST.find(i => i.slug === slug)
}

// Industry categories for grouping
export interface IndustryCategory {
  name: string
  slugs: string[]
}

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  {
    name: '飲食',
    slugs: ['restaurant', 'cafe', 'izakaya', 'ramen', 'sushi', 'bakery', 'sweets'],
  },
  {
    name: '美容・ウェルネス',
    slugs: ['beauty-salon', 'nail-salon', 'esthetic', 'yoga', 'barber'],
  },
  {
    name: 'IT・デジタル',
    slugs: ['it-startup', 'web-design', 'app-dev', 'saas'],
  },
  {
    name: '士業・専門職',
    slugs: ['lawyer', 'accountant', 'judicial-scrivener', 'labor-consult', 'patent-attorney'],
  },
  {
    name: '医療・健康',
    slugs: ['clinic', 'dental', 'pharmacy', 'counseling'],
  },
  {
    name: '教育',
    slugs: ['education', 'language', 'music', 'kids'],
  },
  {
    name: '不動産・建設',
    slugs: ['real-estate', 'construction', 'interior'],
  },
  {
    name: '小売・EC',
    slugs: ['ec-retail', 'fashion', 'food-ec', 'handmade'],
  },
  {
    name: '金融・保険',
    slugs: ['finance', 'insurance'],
  },
  {
    name: 'クリエイティブ',
    slugs: ['photography', 'design-agency', 'video'],
  },
  {
    name: 'イベント・ブライダル',
    slugs: ['wedding', 'event'],
  },
  {
    name: 'その他',
    slugs: ['cleaning', 'pet', 'travel', 'consulting'],
  },
]
