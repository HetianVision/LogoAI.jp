import { CompetitorData } from './types'
import { canva } from './canva'
import { adobeExpress } from './adobe-express'
import { looka } from './looka'
import { wixLogo } from './wix-logo'
import { tailorBrands } from './tailor-brands'
import { lookaJp } from './looka-jp'
import { illustrator } from './illustrator'
import { designevo } from './designevo'

export const COMPETITOR_LIST: CompetitorData[] = [
  canva,
  adobeExpress,
  looka,
  wixLogo,
  tailorBrands,
  lookaJp,
  illustrator,
  designevo,
]

export function getCompetitorBySlug(slug: string): CompetitorData | undefined {
  return COMPETITOR_LIST.find(c => c.slug === slug)
}

export type { CompetitorData, FeatureValue, FeatureRow, TargetUser, FAQItem } from './types'
