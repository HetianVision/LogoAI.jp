export type FeatureValue =
  | { type: 'check' }
  | { type: 'cross' }
  | { type: 'partial'; label: string }
  | { type: 'text'; label: string }

export interface FeatureRow {
  feature: string
  logoai: FeatureValue
  competitor: FeatureValue
  note?: string
}

export interface TargetUser {
  logoai: string
  competitorItems: string[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface CompetitorData {
  slug: string
  name: string
  nameJa: string
  category: 'global-design' | 'ai-logo' | 'local-design' | 'vector-tool'
  comparisonKeyword: string
  metaDesc: string
  tagline: string
  websiteUrl: string
  heroSummary: string
  logoaiWins: string[]
  competitorWins: string[]
  featureComparison: FeatureRow[]
  targetUser: TargetUser
  faqs: FAQItem[]
  verdict: string
}
