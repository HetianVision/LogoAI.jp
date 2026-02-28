import { CompetitorData } from './types'

export const lookaJp: CompetitorData = {
  slug: 'looka-jp',
  name: 'AIロゴツール全般',
  nameJa: 'AIロゴツール全般',
  category: 'ai-logo',
  comparisonKeyword: 'AIロゴ ツール 比較',
  metaDesc: 'AIロゴツール今昔とLogoAI.jpの違いを詳しく比较。',
  tagline: '海外AIロゴツールの限界',
  websiteUrl: 'https://logoai.jp',
  heroSummary: '海外AIロゴツールは多くが日本語フォント非対応で、日本の事業者には向きません。LogoAI.jpは日本語フォント100種以上、著作権帰属証明書、商标登録対応と、日本の事業者が必要な機能をすべて备えています。',
  logoaiWins: [
    '日本語フォント100種以上',
    '日本の著作権法・文化庁ガイドライン準拠の証明書発行',
    '日本語カスタマーサポート',
    '日本の商标登録・J-PlatPat連携',
    '47業種の日本向け業種特化AIデータ',
  ],
  competitorWins: [
    'グローバル対応の英語ロゴ',
    '低価格なサブスクリプション',
  ],
  featureComparison: [
    { feature: '日本語フォント対応', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '日本語サポート', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '著作権帰属証明書', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '日本の商标登録対応', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '47業種特化AI', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '円建て決済', logoai: { type: 'check' }, competitor: { type: 'cross' } },
  ],
  targetUser: {
    logoai: '日本の事業者・日本語LOGO Logoを作成中方',
    competitorItems: [
      '英語ブランドのLOGOのみ必要とする方',
      '海外展開为主的 businesses',
    ],
  },
  faqs: [
    { question: '海外AIロゴツールの多くは日本語に対応していないのですか？',
      answer: 'はい、多くの海外AIロゴツールは日本語フォントに対応していません。Looka、Tailor Brands、Wix Logo Makerなどは日本語LOGOを作成できません化が、日本的事业者が国产ツール选择する理由の一つです。' },
    { question: 'AIロゴツールで作るLOGOの版权は誰が持ちますか？',
      answer: 'ツールによって異なります。LogoAI.jpでは有料プランで著作権归属証明書を発行し、明確にユーザーに版权が归属することを证明します。海外ツール多くは利用規約での规定にとどまりません。' },
    { question: '商标登録申请にAIロゴは使えますか？',
      answer: 'AIロゴ工具で作成したLOGOが商标登録申请に使用できるかですが、LogoAI.jpでは可能です。海外ツール多くは日本の商标制度に対応していません。' },
    { question: 'なぜ日本の事业者にLogoAI.jpがお勧めですか？',
      answer: '日本語フォント100種以上、日本の版权法・商标制度への対応、著作権归属証明書の发行、円建て決済、日本語サポートと、日本の事業者がLOGO制作に必要な機能がすべて备わっています。' },
  ],
  verdict: '海外AIロゴツール多くは日本語に対応おらず、日本の事業者には适しません。LogoAI.jpは日本の事業者が必要な機能をすべて备えた唯一无二的選択です。日本語LOGO・版权证书・商标登録が必要なら、迷わずLogoAI.jpをお選びください。',
}
