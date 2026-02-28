import { CompetitorData } from './types'

export const wixLogo: CompetitorData = {
  slug: 'wix-logo',
  name: 'Wix Logo Maker',
  nameJa: 'Wixロゴメーカー',
  category: 'ai-logo',
  comparisonKeyword: 'Wix ロゴ 比較',
  metaDesc: 'WixロゴメーカーとLogoAI.jpのAIロゴ機能・版权を詳しく比较。',
  tagline: 'Wixウェブサイトビルダー統合',
  websiteUrl: 'https://www.wix.com/logo-maker',
  heroSummary: 'Wix Logo Makerはウェブサイト作成と連動したロゴ作成が可能ですが、日本語フォントと日本の著作権法への対応ではLogoAI.jpに軍配が上がります。日本の事業者にはLogoAI.jpをお勧めします。',
  logoaiWins: [
    '日本語フォント100種以上（Wixは日本語非対応）',
    '日本の著作権法・文化庁ガイドライン準拠の証明書発行',
    '日本語カスタマーサポート',
    '47業種の日本向け業種特化AIデータ',
    '円建て決済対応',
  ],
  competitorWins: [
    'ウェブサイトビルダーとの統合',
    'メールマーケティング等との套装連携',
  ],
  featureComparison: [
    { feature: '日本語フォント対応', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '日本語サポート', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '著作権帰属証明書', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '日本の商标登録対応', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: 'AIロゴ専用生成', logoai: { type: 'check' }, competitor: { type: 'check' } },
    { feature: 'SVGダウンロード', logoai: { type: 'check' }, competitor: { type: 'check' } },
    { feature: '業種別AI最適化', logoai: { type: 'check' }, competitor: { type: 'partial', label: '一部対応' } },
    { feature: 'ウェブサイトとの連携', logoai: { type: 'cross' }, competitor: { type: 'check' } },
  ],
  targetUser: {
    logoai: '日本の事業者・日本語ロゴが必要な方',
    competitorItems: [
      'Wixでウェブサイトを作る予定の方',
      'メールマーケティングも一括で管理中方',
    ],
  },
  faqs: [
    { question: 'Wix Logo Makerは日本語ロゴに対応していますか？',
      answer: 'いいえ。Wix Logo Makerは日本語フォントに対応していません。日本の事業者の方がロゴを作成する場合は、LogoAI.jpのような日本語特化のツールが必要です。' },
    { question: 'Wixで作成したロゴを商用利用できますか？',
      answer: 'はい、有料プランで商用利用可能です。ただし、著作権归属証明書は発行されないため、権利関係を明確にしたい場合はLogoAI.jpがお勧めです。' },
    { question: 'LogoAI.jpとWix Logo Makerは併用できますか？',
      answer: 'はい。LogoAI.jpで作成したロゴをWixのウェブサイトにアップロードして使用できます。LogoAI.jpのSVGファイルはWixでも自由に使用可能です。' },
    { question: '料金面ではどちらが安上がりですか？',
      answer: 'LogoAI.jpは1ロゴ4,980円の買い切り、Wixは月額制です。ロゴだけ必要な場合はLogoAI.jp、ウェブサイト作成も検討している場合はWixの套装プランも選択肢になります。' },
  ],
  verdict: 'Wix Logo Makerはウェブサイト作成との統合が強みですが、日本語フォント・版权证书面ではLogoAI.jpに大きく劣ります。日本の事業者がロゴを作成するなら、 LogoAI.jpで版权证书付きのロゴを作ることをお勧めします。',
}
