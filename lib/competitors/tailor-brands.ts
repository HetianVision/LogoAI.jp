import { CompetitorData } from './types'

export const tailorBrands: CompetitorData = {
  slug: 'tailor-brands',
  name: 'Tailor Brands',
  nameJa: 'テイラーブランズ',
  category: 'ai-logo',
  comparisonKeyword: 'Tailor Brands ロゴ 比較',
  metaDesc: 'Tailor BrandsとLogoAI.jpのAIロゴ機能・版权を詳しく比较。',
  tagline: 'AIパワードブランドデザイン',
  websiteUrl: 'https://www.tailorbrands.com',
  heroSummary: 'Tailor BrandsはAIを活用したブランドデザイン支援サービスですが、日本語対応と日本の著作権法への準拠ではLogoAI.jpが優れています。日本の事業者にはLogoAI.jpをお勧めします。',
  logoaiWins: [
    '日本語フォント100種以上（Tailor Brandsは非対応）',
    '日本の著作権法・文化庁ガイドライン準拠の証明書発行',
    '日本語カスタマーサポート',
    '47業種の日本向け業種特化AIデータ',
    '円建て決済対応',
  ],
  competitorWins: [
    'ブランドKitの総合的なサービス',
    'SNS投稿等の辅助ツール',
  ],
  featureComparison: [
    { feature: '日本語フォント対応', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '日本語サポート', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '著作権帰属証明書', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '日本の商标登録対応', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: 'AIロゴ専用生成', logoai: { type: 'check' }, competitor: { type: 'check' } },
    { feature: 'SVGダウンロード', logoai: { type: 'check' }, competitor: { type: 'check' } },
    { feature: 'ブランドKit一式', logoai: { type: 'cross' }, competitor: { type: 'check' } },
  ],
  targetUser: {
    logoai: '日本の事業者・日本語ロゴが必要な方',
    competitorItems: [
      '英語ブランドのロゴを作成中方',
      'ブランドKit（名刺・SNS等）を一括で作りたい方',
    ],
  },
  faqs: [
    { question: 'Tailor Brandsは日本語ロゴを作れますか？',
      answer: 'いいえ。Tailor Brandsは現在日本語フォントに対応していません。日本の事業者の方がロゴを作成する場合は、LogoAI.jpのような日本語特化のツールが必要です。' },
    { question: 'Tailor Brandsで作成したロゴの版权は誰に帰属しますか？',
      answer: 'Tailor Brandsの利用規約では、有料プランで作成したロゴの著作権はユーザーに帰属しますが、公式な著作権归属証明書は発行されません。LogoAI.jpでは文化庁ガイドラインに基づいた証明書を発行します。' },
    { question: 'LogoAI.jpとTailor Brandsはどちらが高いですか？',
      answer: 'Tailor Brandsは月額サブスクリプション型、LogoAI.jpは買い切り型です。長期的に多くのロゴを作る場合はTailor Brands、日本向けの確定的なロゴ1つ欲しい場合はLogoAI.jpがコストパフォーマンスに優れています。' },
    { question: '両方を併用することは可能ですか？',
      answer: 'はい。LogoAI.jpで日本語ロゴを作成し、Tailor Brandsで英語ブランドのロゴを作成するという使い分けが可能です。SVG形式でのエクスポートに対応しているため，互相导入利用可能です。' },
  ],
  verdict: 'Tailor BrandsはグローバルなAIロゴツールですが、日本語非対応が致命的です。日本の事業者が日本語ロゴ・版权证书付きのロゴを必要とするなら、LogoAI.jp一選択肢です。英語ブランドのみ必要という場合は别です。',
}
