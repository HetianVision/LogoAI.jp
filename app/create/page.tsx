'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// 行业数据
const industries = [
  {
    category: 'food',
    icon: '🍜',
    name: '飲食・カフェ',
    subs: [
      { slug: 'cafe', name: 'カフェ・喫茶店', confirm: 'カフェ・喫茶店向けのフォントと配色で生成します' },
      { slug: 'restaurant', name: '飲食店・レストラン', confirm: '飲食店・レストラン向けのフォントと配色で生成します' },
      { slug: 'ramen', name: 'ラーメン店', confirm: 'ラーメン店向けのフォントと配色で生成します' },
      { slug: 'izakaya', name: '居酒屋・バー', confirm: '居酒屋・バー向けのフォントと配色で生成します' },
      { slug: 'sushi', name: '寿司・和食', confirm: '寿司・和食向けのフォントと配色で生成します' },
      { slug: 'bakery', name: 'パン・ベーカリー', confirm: 'パン・ベーカリー向けのフォントと配色で生成します' },
      { slug: 'sweets', name: 'スイーツ・菓子', confirm: 'スイーツ・菓子向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'beauty',
    icon: '✂️',
    name: '美容・健康',
    subs: [
      { slug: 'beauty-salon', name: '美容室・ヘアサロン', confirm: '美容室・ヘアサイクル向けのフォントと配色で生成します' },
      { slug: 'nail-salon', name: 'ネイルサロン', confirm: 'ネイルサイクル向けのフォントと配色で生成します' },
      { slug: 'esthetic', name: 'エステ・スパ', confirm: 'エステ・スパ向けのフォントと配色で生成します' },
      { slug: 'yoga', name: 'ヨガ・フィットネス', confirm: 'ヨガ・フィットネス向けのフォントと配色で生成します' },
      { slug: 'barber', name: '理容室・バーバー', confirm: '理容室・バーバー向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'it',
    icon: '💻',
    name: 'IT・デジタル',
    subs: [
      { slug: 'it-startup', name: 'IT・スタートアップ', confirm: 'IT・スタートアップ向けのフォントと配色で生成します' },
      { slug: 'web-design', name: 'Web制作・デザイン', confirm: 'Web制作・デザイン向けのフォントと配色で生成します' },
      { slug: 'app-dev', name: 'アプリ開発', confirm: 'アプリ開発向けのフォントと配色で生成します' },
      { slug: 'saas', name: 'SaaS・クラウド', confirm: 'SaaS・クラウド向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'legal',
    icon: '⚖️',
    name: '士業・専門職',
    subs: [
      { slug: 'lawyer', name: '弁護士・法律事務所', confirm: '弁護士・法律事務所向けのフォントと配色で生成します' },
      { slug: 'accountant', name: '税理士・会計士', confirm: '税理士・会計士向けのフォントと配色で生成します' },
      { slug: 'judicial-scrivener', name: '司法書士', confirm: '司法書士向けのフォントと配色で生成します' },
      { slug: 'labor-consult', name: '社労士', confirm: '社労士向けのフォントと配色で生成します' },
      { slug: 'patent-attorney', name: '弁理士', confirm: '弁理士向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'medical',
    icon: '🏥',
    name: '医療・クリニック',
    subs: [
      { slug: 'clinic', name: 'クリニック・医院', confirm: 'クリニック・医院向けのフォントと配色で生成します' },
      { slug: 'dental', name: '歯科・デンタル', confirm: '歯科・デンタル向けのフォントと配色で生成します' },
      { slug: 'pharmacy', name: '薬局・調剤', confirm: '薬局・凋剤向けのフォントと配色で生成します' },
      { slug: 'counseling', name: '心理・カウンセリング', confirm: '心理・カウンセリング向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'education',
    icon: '📚',
    name: '教育・スクール',
    subs: [
      { slug: 'education', name: '学習塾・教育', confirm: '学習塾・教育向けのフォントと配色で生成します' },
      { slug: 'language', name: '語学スクール', confirm: '語学スクール向けのフォントと配色で生成します' },
      { slug: 'music', name: '音楽教室', confirm: '音楽教室向けのフォントと配色で生成します' },
      { slug: 'kids', name: '子ども向け・保育', confirm: '子ども向け・保育向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'realestate',
    icon: '🏠',
    name: '不動産・建設',
    subs: [
      { slug: 'real-estate', name: '不動産', confirm: '不動産向けのフォントと配色で生成します' },
      { slug: 'construction', name: '建設・工務店', confirm: '建設・工務店向けのフォントと配色で生成します' },
      { slug: 'interior', name: 'インテリア・内装', confirm: 'インテリア・内装向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'ec',
    icon: '🛍️',
    name: '小売・EC',
    subs: [
      { slug: 'ec-retail', name: 'EC・ネットショップ', confirm: 'EC・ネットショップ向けのフォントと配色で生成します' },
      { slug: 'fashion', name: 'ファッション・アパレル', confirm: 'ファッション・アパレル向けのフォントと配色で生成します' },
      { slug: 'food-ec', name: '食品EC・通販', confirm: '食品EC・通信向けのフォントと配色で生成します' },
      { slug: 'handmade', name: 'ハンドメイド・作家', confirm: 'ハンドメイド・作家向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'finance',
    icon: '💰',
    name: '金融・保険',
    subs: [
      { slug: 'finance', name: 'ファイナンシャル・投資', confirm: 'ファイナンシャル・投資向けのフォントと配色で生成します' },
      { slug: 'insurance', name: '保険・代理店', confirm: '保険・代理店向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'creative',
    icon: '📷',
    name: 'クリエイティブ',
    subs: [
      { slug: 'photography', name: 'フォトグラファー・写真', confirm: 'フォトグラファー向けのフォントと配色で生成します' },
      { slug: 'design-agency', name: 'デザイン・クリエイティブ', confirm: 'デザイン・クリエイティブ向けのフォントと配色で生成します' },
      { slug: 'video', name: '映像・動画制作', confirm: '映像・動画制作向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'event',
    icon: '💒',
    name: 'ブライダル・イベント',
    subs: [
      { slug: 'wedding', name: 'ブライダル・結婚式', confirm: 'ブライダル・結婚式向けのフォントと配色で生成します' },
      { slug: 'event', name: 'イベント・企画', confirm: 'イベント・企画向けのフォントと配色で生成します' },
    ]
  },
  {
    category: 'other',
    icon: '🔧',
    name: 'その他',
    subs: [
      { slug: 'cleaning', name: 'クリーニング・清掃', confirm: 'クリーニング・清掃向けのフォントと配色で生成します' },
      { slug: 'pet', name: 'ペット・動物', confirm: 'ペット・動物向けのフォントと配色で生成します' },
    ]
  },
]

// 印象选项
const impressions = [
  { value: 'trustworthy', icon: '🏛️', label: '信頼感' },
  { value: 'friendly', icon: '😊', label: '親しみやすい' },
  { value: 'luxury', icon: '💎', label: '高級感' },
  { value: 'japanese', icon: '⛩️', label: '和風' },
  { value: 'simple', icon: '◼️', label: 'シンプル' },
  { value: 'cute', icon: '🌸', label: '可愛い' },
  { value: 'powerful', icon: '💪', label: '力強い' },
  { value: 'modern', icon: '🔷', label: 'モダン' },
  { value: 'natural', icon: '🌿', label: 'ナチュラル' },
  { value: 'stylish', icon: '✨', label: 'スタイリッシュ' },
  { value: 'pop', icon: '🎨', label: 'ポップ' },
  { value: 'cool', icon: '🧊', label: 'クール' },
]

// 避けたい印象
const avoidOptions = [
  { value: 'cheap', label: '安っぽく見える' },
  { value: 'childish', label: '子供っぽい' },
  { value: 'old', label: '古くさい' },
  { value: 'heavy', label: '重たい' },
  { value: 'flashy', label: '派手すぎる' },
]

interface FormData {
  brandName: string
  brandYomi: string
  brandEn: string
  industry: string
  industryName: string
  usage: string
  usageName: string
  impressions: string[]
  avoid: string
}

const initialFormData: FormData = {
  brandName: '',
  brandYomi: '',
  brandEn: '',
  industry: '',
  industryName: '',
  usage: '',
  usageName: '',
  impressions: [],
  avoid: '',
}

function CreatePageContent() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [avoidOpen, setAvoidOpen] = useState(false)
  const [brandNameCount, setBrandNameCount] = useState(0)

  // 从URL获取行业预填充
  useEffect(() => {
    const industry = searchParams.get('industry')
    if (industry) {
      // 查找行业名称
      for (const cat of industries) {
        const sub = cat.subs.find(s => s.slug === industry)
        if (sub) {
          setFormData(prev => ({
            ...prev,
            industry: industry,
            industryName: cat.name,
            usage: industry,
            usageName: sub.name
          }))
          setStep(2)
          break
        }
      }
    }
  }, [searchParams])

  // 保存到sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('createStep', step.toString())
      sessionStorage.setItem('createFormData', JSON.stringify(formData))
    }
  }, [step, formData])

  // 从sessionStorage恢复
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStep = sessionStorage.getItem('createStep')
      const savedData = sessionStorage.getItem('createFormData')
      if (savedStep && savedData) {
        setStep(parseInt(savedStep))
        setFormData(JSON.parse(savedData))
      }
    }
  }, [])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (field === 'brandName') {
      setBrandNameCount(value.length)
    }
  }

  const handleIndustrySelect = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const handleUsageSelect = (industrySlug: string, industryName: string, usageName: string) => {
    setFormData(prev => ({
      ...prev,
      industry: industrySlug,
      industryName,
      usage: industrySlug,
      usageName
    }))
  }

  const handleImpressionToggle = (value: string) => {
    setFormData(prev => {
      const current = prev.impressions
      if (current.includes(value)) {
        return { ...prev, impressions: current.filter(i => i !== value) }
      } else if (current.length < 2) {
        return { ...prev, impressions: [...current, value] }
      }
      return prev
    })
  }

  const handleAvoidSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      avoid: prev.avoid === value ? '' : value
    }))
  }

  const canProceedStep1 = formData.brandName.trim().length > 0
  const canProceedStep2 = formData.industry !== '' && formData.usage !== ''
  const canProceedStep3 = formData.impressions.length > 0

  const getImpressionLabels = () => {
    return formData.impressions.map(v => {
      const imp = impressions.find(i => i.value === v)
      return imp ? imp.label : v
    }).join('、')
  }

  const getAvoidLabel = () => {
    if (!formData.avoid) return '（未選択）'
    const opt = avoidOptions.find(o => o.value === formData.avoid)
    return opt ? opt.label : '（未選択）'
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="max-w-6xl mx-auto h-16 px-4 flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-heading text-lg font-bold text-primary">LogoAI.jp</span>
          </Link>

          {/* Progress Bar */}
          <nav className="flex-1" aria-label="生成ステップ">
            <div className="flex items-center justify-center gap-0 relative">
              {/* Step 1 */}
              <div className={`flex flex-col items-center gap-1 relative z-10 ${step >= 1 ? 'pns-active' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-number text-xl font-bold leading-tight transition-all duration-300
                  ${step > 1 ? 'bg-green-600 border-green-600 text-white' : step >= 1 ? 'bg-primary border-primary text-white shadow-[0_0_0_4px_rgba(26,58,42,0.12)]' : 'bg-bg-section border border-border text-text-muted'}`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <span className="text-[0.65rem] font-semibold whitespace-nowrap hidden sm:block
                  ${step > 1 ? 'text-green-600' : step >= 1 ? 'text-primary' : 'text-text-muted'}">
                  ブランド情報
                </span>
              </div>

              {/* Connector 1 */}
              <div className={`w-16 sm:w-20 h-0.5 flex-shrink-0 mb-4 transition-colors duration-300 ${step > 1 ? 'bg-green-600' : 'bg-border'}`} />

              {/* Step 2 */}
              <div className={`flex flex-col items-center gap-1 relative z-10 ${step >= 2 ? 'pns-active' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-number text-xl font-bold leading-tight transition-all duration-300
                  ${step > 2 ? 'bg-green-600 border-green-600 text-white' : step >= 2 ? 'bg-primary border-primary text-white shadow-[0_0_0_4px_rgba(26,58,42,0.12)]' : 'bg-bg-section border border-border text-text-muted'}`}>
                  {step > 2 ? '✓' : '2'}
                </div>
                <span className="text-[0.65rem] font-semibold whitespace-nowrap hidden sm:block
                  ${step > 2 ? 'text-green-600' : step >= 2 ? 'text-primary' : 'text-text-muted'}">
                  業種・用途
                </span>
              </div>

              {/* Connector 2 */}
              <div className={`w-16 sm:w-20 h-0.5 flex-shrink-0 mb-4 transition-colors duration-300 ${step > 2 ? 'bg-green-600' : 'bg-border'}`} />

              {/* Step 3 */}
              <div className={`flex flex-col items-center gap-1 relative z-10 ${step >= 3 ? 'pns-active' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-number text-xl font-bold leading-tight transition-all duration-300
                  ${step > 3 ? 'bg-green-600 border-green-600 text-white' : step >= 3 ? 'bg-primary border-primary text-white shadow-[0_0_0_4px_rgba(26,58,42,0.12)]' : 'bg-bg-section border border-border text-text-muted'}`}>
                  {step > 3 ? '✓' : '3'}
                </div>
                <span className="text-[0.65rem] font-semibold whitespace-nowrap hidden sm:block
                  ${step > 3 ? 'text-green-600' : step >= 3 ? 'text-primary' : 'text-text-muted'}">
                  印象選択
                </span>
              </div>

              {/* Connector 3 */}
              <div className={`w-16 sm:w-20 h-0.5 flex-shrink-0 mb-4 transition-colors duration-300 ${step > 3 ? 'bg-green-600' : 'bg-border'}`} />

              {/* Step 4 */}
              <div className={`flex flex-col items-center gap-1 relative z-10 ${step >= 4 ? 'pns-active' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-number text-xl font-bold leading-tight transition-all duration-300
                  ${step >= 4 ? 'bg-primary border-primary text-white shadow-[0_0_0_4px_rgba(26,58,42,0.12)]' : 'bg-bg-section border border-border text-text-muted'}`}>
                  4
                </div>
                <span className="text-[0.65rem] font-semibold whitespace-nowrap hidden sm:block
                  ${step >= 4 ? 'text-primary' : 'text-text-muted'}">
                  確認
                </span>
              </div>
            </div>

          </nav>

          {/* Help Link */}
          <div className="flex-shrink-0 hidden md:block">
            <Link href="/faq" className="text-sm text-text-muted hover:text-primary transition-colors">
              ❓ ヘルプ
            </Link>
          </div> 

        </div> 

        {/* Progress Fill Bar - Full Width */}
        <div className="h-0.5 bg-border">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((step - 1) / 3) * 100}%`,
              background: 'linear-gradient(to right, #1A3A2A, #C9963A)'
            }}
          />
        </div>
      </header>


      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          {/* Step Content */}
          <div className="step-container">
            <AnimatePresence mode="wait">
              {/* Step 1: Brand Info */}
              {step === 1 && (
                <section
                  key="step1"
                  className="max-w-[560px]"
                >
                  <motion.div 
                    className="mb-9"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block text-[0.65rem] font-bold tracking-[0.1em] text-accent bg-[rgba(201,150,58,0.1)] border border-[rgba(201,150,58,0.2)] px-2.5 py-1 rounded-full mb-2.5">
                      STEP 1
                    </span>
                    <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-[1.35] mb-2">
                      ロゴに表示する情報を入力してください
                    </h1>
                    <p className="text-sm text-text-secondary">
                      入力した情報をもとにAIがフォントと配色を最適化します
                    </p>
                  </motion.div>

                  <form className="flex flex-col gap-8" onSubmit={(e) => { e.preventDefault(); if (canProceedStep1) setStep(2) }}>
                    {/* Brand Name */}
                    <motion.div 
                      className="flex flex-col gap-2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <label htmlFor="brand-name" className="flex items-center gap-2 text-sm font-bold text-text-primary">
                        ブランド名
                        <span className="text-[0.8rem] font-bold text-white bg-red-700 px-2 py-0.5 rounded-full">必須</span>
                      </label>
                      <input
                        type="text"
                        id="brand-name"
                        value={formData.brandName}
                        onChange={(e) => handleInputChange('brandName', e.target.value)}
                        className="w-full px-4 py-3.5 text-base font-body text-text-primary bg-white border-1.5 border-border rounded-lg outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,58,42,0.1)] transition-all"
                        placeholder="例）山本珈琲、田中律师事务所"
                        maxLength={30}
                        required
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-text-muted">
                          ロゴに大きく表示されるメインテキストです
                        </span>
                        <span className="text-xs text-text-muted font-mono">
                          {brandNameCount} / 30
                        </span>
                      </div>
                    </motion.div>

                    {/* Furigana */}
                    <motion.div 
                      className="flex flex-col gap-2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <label htmlFor="brand-yomi" className="flex items-center gap-2 text-sm font-bold text-text-primary">
                        ふりがな
                        <span className="text-[0.8rem] font-medium text-text-muted bg-bg-section border border-border px-2 py-0.5 rounded-full">任意</span>
                      </label>
                      <input
                        type="text"
                        id="brand-yomi"
                        value={formData.brandYomi}
                        onChange={(e) => handleInputChange('brandYomi', e.target.value)}
                        className="w-full px-4 py-3.5 text-base font-body text-text-primary bg-white border-1.5 border-border rounded-lg outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,58,42,0.1)] transition-all"
                        placeholder="例）やまもとこーひー"
                        maxLength={50}
                      />
                      <span className="text-xs text-primary font-semibold">
                        💡 入力するとフォント提案の精度が上がります
                      </span>
                    </motion.div>

                    {/* English */}
                    <motion.div 
                      className="flex flex-col gap-2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label htmlFor="brand-en" className="flex items-center gap-2 text-sm font-bold text-text-primary">
                        英語・ローマ字表記
                        <span className="text-[0.8rem] font-medium text-text-muted bg-bg-section border border-border px-2 py-0.5 rounded-full">任意</span>
                      </label>
                      <input
                        type="text"
                        id="brand-en"
                        value={formData.brandEn}
                        onChange={(e) => handleInputChange('brandEn', e.target.value)}
                        className="w-full px-4 py-3.5 text-base font-mono text-text-primary bg-white border-1.5 border-border rounded-lg outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,58,42,0.1)] transition-all"
                        placeholder="例）YAMAMOTO COFFEE"
                        maxLength={40}
                        style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}
                      />
                      <span className="text-xs text-text-muted">
                        サブテキストとしてロゴに追加できます
                      </span>
                    </motion.div>

                    {/* Error Message - only show after submit attempt */}
                    {false && (
                      <div className="p-3 bg-[rgba(196,30,58,0.06)] border border-[rgba(196,30,58,0.2)] rounded-lg text-sm text-red-700 font-semibold">
                        ⚠️ ブランド名を入力してください
                      </div>
                    )}

                    {/* Next Button */}
                    <motion.div 
                      className="flex gap-3 items-center pt-2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <button
                        type="submit"
                        disabled={!canProceedStep1}
                        className={`flex items-center gap-2.5 px-8 py-4 rounded-full font-body text-base font-bold transition-all duration-200
                          ${canProceedStep1
                            ? 'bg-primary text-white hover:bg-primary-light hover:translate-x-0.5 cursor-pointer'
                            : 'bg-border text-text-muted cursor-not-allowed'}`}
                      >
                        次へ：業種と用途を選ぶ
                        <span className="text-lg">→</span>
                      </button>
                    </motion.div>
                  </form>
                </section>
              )}

              {/* Step 2: Industry Selection */}
              {step === 2 && (
                <section
                  key="step2"
                  className="max-w-[680px]"
                >
                  <motion.div 
                  className="mb-9"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block text-[0.65rem] font-bold tracking-[0.1em] text-accent bg-[rgba(201,150,58,0.1)] border border-[rgba(201,150,58,0.2)] px-2.5 py-1 rounded-full mb-2.5">
                      STEP 2
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-[1.35] mb-2">
                      あなたの業種を選んでください
                    </h2>
                    <p className="text-sm text-text-secondary">
                      業種によってフォント・配色・レイアウトが最適化されます
                    </p>
                  </motion.div>

                  {/* Industry Grid */}
                  <div className="flex flex-col gap-2" role="radiogroup" aria-label="業種カテゴリ選択">
                    {industries.map((ind) => (
                      <motion.div 
                      key={ind.category} 
                      className="border border-border rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, delay: 0.05 * industries.indexOf(ind) }}
                      >
                        <button
                          type="button"
                          onClick={() => handleIndustrySelect(ind.category)}
                          className="w-full flex items-center gap-3 p-4 bg-bg-section hover:bg-[rgba(26,58,42,0.04)] transition-colors text-left"
                          aria-expanded={expandedCategory === ind.category}
                          aria-controls={`${ind.category}-sub`}
                        >
                          <span className="text-xl" aria-hidden="true">{ind.icon}</span>
                          <span className="flex-1 font-semibold text-text-primary">{ind.name}</span>
                          <span className={`text-text-muted text-lg transition-transform ${expandedCategory === ind.category ? 'rotate-90' : ''}`}>›</span>
                        </button>

                        {expandedCategory === ind.category && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0}}
                            transition={{ duration: 0.2}}
                            className="bg-white"
                          >
                            <div className="p-3 flex flex-wrap gap-2" id={`${ind.category}-sub`}>
                              {ind.subs.map((sub) => (
                                <button
                                  key={sub.slug}
                                  type="button"
                                  onClick={() => handleUsageSelect(sub.slug, ind.name, sub.name)}
                                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                                    ${formData.usage === sub.slug
                                      ? 'bg-primary text-white'
                                      : 'bg-bg-section text-text-secondary hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary'}`}
                                >
                                  {sub.name}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <motion.div 
                    className="flex gap-3 items-center mt-8"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors font-body"
                    >
                      ← 戻る
                    </button>
                    <button
                      type="button"
                      onClick={() => canProceedStep2 && setStep(3)}
                      disabled={!canProceedStep2}
                      className={`flex items-center gap-2.5 px-8 py-4 rounded-full font-body text-base font-bold transition-all duration-200
                        ${canProceedStep2
                          ? 'bg-primary text-white hover:bg-primary-light hover:translate-x-0.5 cursor-pointer'
                          : 'bg-border text-text-muted cursor-not-allowed'}`}
                    >
                      次へ：印象を選ぶ
                      <span className="text-lg">→</span>
                    </button>
                  </motion.div>
                </section>
              )}

              {/* Step 3: Impression Selection */}
              {step === 3 && (
                <section
                  key="step3"
                  className="max-w-[640px]"
                >
                  <motion.div 
                    className="mb-9"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block text-[0.65rem] font-bold tracking-[0.1em] text-accent bg-[rgba(201,150,58,0.1)] border border-[rgba(201,150,58,0.2)] px-2.5 py-1 rounded-full mb-2.5">
                      STEP 3
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-[1.35] mb-2">
                      ロゴの印象を選んでください
                    </h2>
                    <p className="text-sm text-text-secondary">
                      最大2つまで選択できます。選びすぎると方向性がぼやけます。
                      <strong className="text-primary">直感で選んでください。</strong>
                    </p>
                  </motion.div>

                  {/* Impression Grid */}
                  <div
                    className={`grid grid-cols-3 sm:grid-cols-4 gap-2.5 mb-3 ${formData.impressions.length >= 2 ? 'max-reached' : ''}`}
                    role="group"
                    aria-label="印象選択（最大2つ）"
                  >
                    {impressions.map((imp) => (
                      <motion.label
                        key={imp.value}
                        className={`cursor-pointer ${formData.impressions.length >= 2 && !formData.impressions.includes(imp.value) ? 'opacity-40 cursor-not-allowed' : ''}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, delay: 0.05 * impressions.indexOf(imp) }}
                      >
                        <input
                          type="checkbox"
                          name="impression"
                          value={imp.value}
                          checked={formData.impressions.includes(imp.value)}
                          onChange={() => handleImpressionToggle(imp.value)}
                          disabled={formData.impressions.length >= 2 && !formData.impressions.includes(imp.value)}
                          className="sr-only"
                          aria-label={imp.label}
                        />
                        <span className={`flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all
                          ${formData.impressions.includes(imp.value)
                            ? 'border-primary bg-[rgba(26,58,42,0.06)] shadow-[0_0_0_3px_rgba(26,58,42,0.1)]'
                            : 'border border-border bg-white hover:border-primary/50'}`}
                        >
                          <span className="text-2xl" aria-hidden="true">{imp.icon}</span>
                          <span className={`text-xs font-semibold ${formData.impressions.includes(imp.value) ? 'text-primary' : 'text-text-secondary'}`}>
                            {imp.label}
                          </span>
                        </span>
                      </motion.label>
                    ))}
                  </div>

                  {/* Selection Count */}
                  <motion.div 
                    className="text-right text-xs text-text-muted font-semibold mb-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    {formData.impressions.length} / 2 選択中
                  </motion.div>

                  {/* Avoid Section */}
                  <motion.div 
                    className="border border-border rounded-xl overflow-hidden mb-7"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    <button
                      type="button"
                      onClick={() => setAvoidOpen(!avoidOpen)}
                      className="w-full flex items-center gap-2 p-3.5 bg-bg-section text-sm font-semibold text-text-secondary hover:bg-[rgba(26,58,42,0.04)] transition-colors"
                      aria-expanded={avoidOpen}
                      aria-controls="avoid-options"
                    >
                      <span className={`text-lg transition-transform ${avoidOpen ? 'rotate-90' : ''}`}>›</span>
                      <span>避けたい印象はありますか？</span>
                      <span className="ml-auto text-xs font-normal text-text-muted">任意・1つまで</span>
                    </button>

                    {avoidOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="p-3.5 bg-white"
                      >
                        <div className="flex flex-wrap gap-2" role="group" aria-label="避けたい印象">
                          {avoidOptions.map((opt) => (
                            <label key={opt.value} className="cursor-pointer">
                              <input
                                type="radio"
                                name="avoid"
                                value={opt.value}
                                checked={formData.avoid === opt.value}
                                onChange={() => handleAvoidSelect(opt.value)}
                                className="sr-only"
                              />
                              <span className={`block px-4 py-2 rounded-full text-sm font-medium transition-all
                                ${formData.avoid === opt.value
                                  ? 'border-red-700 bg-[rgba(196,30,58,0.06)] text-red-700 font-bold'
                                  : 'border border-border text-text-secondary hover:border-primary/50'}`}
                              >
                                {opt.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Actions */}
                  <motion.div 
                    className="flex gap-3 items-center"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors font-body"
                    >
                      ← 戻る
                    </button>
                    <button
                      type="button"
                      onClick={() => canProceedStep3 && setStep(4)}
                      disabled={!canProceedStep3}
                      className={`flex items-center gap-2.5 px-8 py-4 rounded-full font-body text-base font-bold transition-all duration-200
                        ${canProceedStep3
                          ? 'bg-primary text-white hover:bg-primary-light hover:translate-x-0.5 cursor-pointer'
                          : 'bg-border text-text-muted cursor-not-allowed'}`}
                    >
                      入力内容を確認する
                      <span className="text-lg">→</span>
                    </button>
                  </motion.div>
                </section>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <section key="step4">
                  <motion.div 
                    className="mb-9"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block text-[0.65rem] font-bold tracking-[0.1em] text-accent bg-[rgba(201,150,58,0.1)] border border-[rgba(201,150,58,0.2)] px-2.5 py-1 rounded-full mb-2.5">
                      STEP 4
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-[1.35] mb-2">
                      生成内容の確認
                    </h2>
                    <p className="text-sm text-text-secondary">
                      以下の内容でロゴを生成します。修正がある場合は戻って変更できます。
                    </p>
                  </motion.div>

                  {/* Confirmation Card */}
                  <motion.div 
                    className="bg-white border border-border rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-center p-4 border-b border-border">
                      <span className="text-sm font-bold text-text-primary w-24">ブランド名</span>
                      <span className="flex-1 text-text-primary">{formData.brandName || '—'}</span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-primary hover:underline"
                      >
                        修正
                      </button>
                    </div>
                    <div className="flex items-center p-4 border-b border-border">
                      <span className="text-sm font-bold text-text-primary w-24">ふりがな</span>
                      <span className="flex-1 text-text-secondary">{formData.brandYomi || '（未入力）'}</span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-primary hover:underline"
                      >
                        修正
                      </button>
                    </div>
                    <div className="flex items-center p-4 border-b border-border">
                      <span className="text-sm font-bold text-text-primary w-24">英語表記</span>
                      <span className="flex-1 text-text-secondary">{formData.brandEn || '（未入力）'}</span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-primary hover:underline"
                      >
                        修正
                      </button>
                    </div>
                    <div className="flex items-center p-4 border-b border-border">
                      <span className="text-sm font-bold text-text-primary w-24">業種</span>
                      <span className="flex-1 text-text-primary">{formData.industryName || '—'}</span>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-sm text-primary hover:underline"
                      >
                        修正
                      </button>
                    </div>
                    <div className="flex items-center p-4 border-b border-border">
                      <span className="text-sm font-bold text-text-primary w-24">使用用途</span>
                      <span className="flex-1 text-text-primary">{formData.usageName || '—'}</span>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-sm text-primary hover:underline"
                      >
                        修正
                      </button>
                    </div>
                    <div className="flex items-center p-4 border-b border-border">
                      <span className="text-sm font-bold text-text-primary w-24">ロゴの印象</span>
                      <span className="flex-1 text-text-primary">{getImpressionLabels() || '—'}</span>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-sm text-primary hover:underline"
                      >
                        修正
                      </button>
                    </div>
                    <div className="flex items-center p-4">
                      <span className="text-sm font-bold text-text-primary w-24">避けたい印象</span>
                      <span className="flex-1 text-text-secondary">{getAvoidLabel()}</span>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-sm text-primary hover:underline"
                      >
                        修正
                      </button>
                    </div>
                  </motion.div>

                  {/* Generate Button */}
                  <motion.div 
                    className="flex gap-3 items-center mt-8"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors font-body"
                    >
                      ← 戻る
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-body text-base font-bold hover:bg-primary-light transition-all hover:translate-x-0.5"
                    >
                      <span aria-hidden="true">✨</span>
                      ロゴを生成する
                      <span className="text-sm font-normal opacity-80">（8〜12案）</span>
                    </button>
                  </motion.div>

                  <motion.p 
                    className="text-sm text-text-muted mt-4" 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    生成には約8秒かかります。生成されたロゴは無料でご確認いただけます。
                  </motion.p>
                </section>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - PC Only */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <motion.div 
              className="bg-white border border-border rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-sm font-bold text-text-primary mb-4 pb-3 border-b border-border">
                完成後に受け取れるもの
              </div>
              <ul className="flex flex-col gap-2.5 mb-4">
                <li className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>8〜12案のロゴデザイン</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>SVG・PNG・PDF形式</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>著作権帰属証明書</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>7日間全額返金保証</span>
                </li>
              </ul>
              <div className="text-xs text-text-muted pt-3 border-t border-border">
                🔒 入力情報は安全に保護されます
              </div>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default function CreatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="text-primary">読み込み中...</div>
      </div>
    }>
      <CreatePageContent />
    </Suspense>
  )
}
