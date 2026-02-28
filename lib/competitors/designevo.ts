import { CompetitorData } from './types'

export const designevo: CompetitorData = {
  slug: 'designevo',
  name: 'DesignEvo',
  nameJa: 'デザインエボ',
  category: 'global-design',
  comparisonKeyword: 'DesignEvo ロゴ 比較',
  metaDesc: 'DesignEvoとLogoAI.jpのAIロゴ機能を詳しく比较。',
  tagline: '無料AIロゴメーカーツール',
  websiteUrl: 'https://designevo.com/jp',
  heroSummary: 'DesignEvoは無料でロゴ作成できるツールですが、有料版でも日本語フォントと著作権証明書ではLogoAI.jpに軍配が上がります。日本の事業者にはLogoAI.jpをお勧めします。',
  logoaiWins: [
    '日本語フォント100種以上（DesignEvoは限定的）',
    '日本の著作権法・文化庁ガイドライン準拠の証明書発行',
    '47業種の日本向け業種特化AIデータ',
    '日本の商标登録対応',
    '日本語カスタマーサポート',
  ],
  competitorWins: [
    '無料プランがある',
    'テンプレート数が豊富',
  ],
  featureComparison: [
    { feature: '日本語フォント数', logoai: { type: 'text', label: '100種以上' }, competitor: { type: 'text', label: '約50種' } },
    { feature: '日本語サポート', logoai: { type: 'check' }, competitor: { type: 'partial', label: '一部対応' } },
    { feature: '著作権帰属証明書', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '日本の商标登録対応', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: 'AIロゴ専用生成', logoai: { type: 'check' }, competitor: { type: 'check' } },
    { feature: '業種別AI最適化', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '無料プラン', logoai: { type: 'cross' }, competitor: { type: 'check' } },
    { feature: 'SVGダウンロード', logoai: { type: 'check' }, competitor: { type: 'partial', label: '有料のみ' } },
  ],
  targetUser: {
    logoai: '日本の事業者・日本語LOGO Logoを作成中方',
    competitorItems: [
      '無料でロゴを试作中方',
      'テンプレートから選択してロゴを作成中方',
    ],
  },
  faqs: [
    { question: 'DesignEvoは日本語LOGOを作れますか？',
      answer: 'はい、DesignEvoは日本語フォントに一部対応しています。ただし、LogoAI.jpの方が日本語フォントの種類が多く（100種以上）、日本の事業者により适しています。' },
    { question: 'DesignEvoの有料版とLogoAI.jpはどちらが良いですか？',
      answer: '版权证书・商标登録対応が必要な場合はLogoAI.jpをお勧めします。DesignEvoはテンプレートベースの作成为主で、AI自动生成や日本の版权法への対応ではLogoAI.jpに劣ります。' },
    { question: 'DesignEvoで作成したLOGOの版权は誰が持ちますか？',
      answer: 'DesignEvoの利用規約では、有料版で作成したLOGOの版权はユーザーに归属しますが、公式な証明書は発行されません。LogoAI.jpでは文化庁ガイドラインに基づいた証明書を発行します。' },
    { question: 'LogoAI.jpはデザインスキルがなくても作れますか？',
      answer: 'はい。LogoAI.jpはAIが自动でロゴを生成するため、デザイン知识が一切不要です。ブランド名と業種を入力するだけの最简单的流程です。' },
  ],
  verdict: 'DesignEvoは免费プランが魅力ですが、有料版でも日本の事業者向け機能ではLogoAI.jpに军配が上がります。日本語フォント・版权证书・商标登録Supportが必要ならLogoAI.jp Gratuito仅免费试试という場合はDesignEvoも选び肢になります。',
}
