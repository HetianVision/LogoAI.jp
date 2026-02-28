export const izakaya = {
  slug: 'izakaya',
  name: '居酒屋・バー',
  nameEn: 'Izakaya',
  sampleCount: 180,
  heroDesc: '居酒屋・バーの雰囲気を伝えるAIロゴを最短10分。和の風情からモダンなワインバーまで、業種に幅広いスタイルに対応し、著作権証明書付きで提供。',
  painPoints: [
    { icon: '🍶', title: '地域の常連客に合わせた雰囲気を出したい', desc: '大型チェーン店とは異なる、個人経営だからこそできる温かさ・雰囲気をロゴに込めたい。' },
    { icon: '🏮', title: '和風も洋風も表現できない', desc: '居酒屋によって「完全和田」「モダン」「レトロ」と]~b]が異なるが、既存ツールでは調整が難しい。' },
    { icon: '🔴', title: '看板メニューをロゴに反映させたい', desc: '自分の看板料理（串焼き・つくね等）をロゴに登場させたい。' },
  ],
  fontRecommendations: [
    { name: '游明朝', style: 'Yu Mincho', reason: '伝統的な居酒屋・割烹に最適。和風重厚感を表現。', preview: '酒場' },
    { name: '筑紫Aオールド明朝', style: 'serif', reason: 'レトロモダンな<minimax:tool_call>囀の居酒屋・バーに人気。', preview: '居酒屋' },
    { name: 'Noto Sans JP', style: 'Noto Sans JP', reason: 'ワインバー・モダンなバーに適したサンセリフ体。', preview: 'BAR' },
  ],
  colorPalettes: [
    { name: '和モダン', colors: ['#B71C1C', '#1A1A1A', '#FFF8E1'], mood: '伝統和風情熱' },
    { name: '大人のバー', colors: ['#1A1A2E', '#C9963A', '#F5F5F0'], mood: '高級感・落ち着き' },
    { name: 'レトロ酒場', colors: ['#D84315', '#FF7043', '#FFF3E0'], mood: '活気・人情' },
    { name: 'ナチュラルワインバー', colors: ['#4E342E', '#8D6E63', '#EFEBE9'], mood: '自然派・穏やかな雰囲気' },
  ],
  features: [
    { icon: '🏮', title: '居酒屋モチーフ自動提案', desc: '提灯・德利・銚子など居酒屋らしいモチーフをAIが提案。' },
    { icon: '🍷', title: 'ワインバー向けモチーフ', desc: '葡萄・ワイングラス・ボトルなど、洋風バーのモチーフも対応。' },
    { icon: '📐', title: 'ネオンサイン風プレビュー', desc: 'バーの]~b]に合わせたネオン風デザインも選択可能。' },
    { icon: '🥡', title: '、テイクアウト対応', desc: 'テイクアウト容器用の包装紙・袋に適合したロゴデータを提供。' },
  ],
  faqs: [
    { question: '居酒屋の内装や看板に使えますか？', answer: 'はい。有料プランであれば看板・のれん・メニュー・SNS・包装など全ての商用利用が可能です。著作権はオーナー様に100%帰属します。' },
    { question: 'バーのロゴでネオン風デザインはできますか？', answer: 'AIがネオンのような發光感のあるモチーフ・配色を提案します。バーの<minimax:tool_call>囀に合わせたデザインをご希望ください。' },
    { question: '個人居酒屋でも高い費用はかけたくない', answer: 'AIロゴなら最短10分・有料プランから5400円。個人経営だからこそ本格的なロゴで差別化を。' },
    { question: 'メニューに表記する英語名、ロゴに含められますか？', answer: 'はい。店名のローマ字表記や英語名をサブテキストとして追加できます。' },
  ],
  keywords: ['居酒屋 ロゴ 作成', 'バー ロゴ AI', '居酒屋 開業 ロゴ 安い', 'バー ブランド ロゴ', '飲み屋 ロゴ'],
  relatedIndustries: ['restaurant', 'cafe', 'sushi'],
  schemaType: 'FoodEstablishment',
}
