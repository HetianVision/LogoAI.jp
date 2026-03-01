'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// 类型定义
interface WizardState {
  brandName: string
  impression: string[]
  usage: string[]
  industry: string
  industryLabel: string
  avoid?: string
}

// 印象标签映射
const IMP_LABELS: Record<string, string> = {
  trustworthy: '信頼感',
  friendly: '親しみやすい',
  luxury: '高級感',
  japanese: '和風',
  simple: 'シンプル',
  cute: '可愛い',
  powerful: '力強い',
  modern: 'モダン',
  natural: 'ナチュラル',
  stylish: 'スタイリッシュ',
  pop: 'ポップ',
  cool: 'クール',
}

// 用途标签映射
const USAGE_LABELS: Record<string, string> = {
  card: '名刺',
  signage: '看板',
  sns: 'SNS',
  package: 'パッケージ',
  web: 'Webサイト',
}

// 避免的印象
const AVOID_LABELS: Record<string, string> = {
  cheap: '安っぽい',
  childish: '子供っぽい',
  old: '古くさい',
  heavy: '重たい',
  flashy: '派手すぎる',
}

// Mock Logo 数据
const mockLogos = [
  { id: 1, colors: ['#1A3A2A', '#C9963A', '#FFFFFF'], tags: ['信頼感', 'シンプル'], previewUrl: '/logos/mock-1.svg' },
  { id: 2, colors: ['#2D5A3D', '#E8B85A', '#F2F0EB'], tags: ['親しみやすい', 'モダン'], previewUrl: '/logos/mock-2.svg' },
  { id: 3, colors: ['#0F2518', '#A67A2E', '#FAFAF7'], tags: ['高級感', '力強い'], previewUrl: '/logos/mock-3.svg' },
  { id: 4, colors: ['#1A3A2A', '#C9963A', '#E0DDD6'], tags: ['和風', 'シンプル'], previewUrl: '/logos/mock-4.svg' },
  { id: 5, colors: ['#2D5A3D', '#C9963A', '#FFFFFF'], tags: ['可愛い', 'ポップ'], previewUrl: '/logos/mock-5.svg' },
  { id: 6, colors: ['#0F2518', '#E8B85A', '#F2F0EB'], tags: ['ナチュラル', ' stylish'], previewUrl: '/logos/mock-6.svg' },
  { id: 7, colors: ['#1A3A2A', '#A67A2E', '#FAFAF7'], tags: ['信頼感', '高級感'], previewUrl: '/logos/mock-7.svg' },
  { id: 8, colors: ['#2D5A3D', '#C9963A', '#E0DDD6'], tags: ['モダン', 'クール'], previewUrl: '/logos/mock-8.svg' },
  { id: 9, colors: ['#0F2518', '#E8B85A', '#FFFFFF'], tags: ['シンプル', '力強い'], previewUrl: '/logos/mock-9.svg' },
  { id: 10, colors: ['#1A3A2A', '#C9963A', '#F2F0EB'], tags: ['親しみやすい', '和風'], previewUrl: '/logos/mock-10.svg' },
]

// 预览上下文文本
const PREVIEW_CONTEXT: Record<string, string> = {
  standard: 'ロゴデータをそのまま表示しています',
  card: '名刺サイズ（91×55mm）での表示イメージです',
  signage: '店舗看板での表示方法です。実際の印刷サイズは異なります',
  sns: 'Instagram・X のプロフィール画像サイズ（正方形・丸形）での表示いです',
  package: '商品パッケージ・袋への印刷イメージです',
  web: 'Webサイトのヘッダーへの配置ことです',
}

export default function CreateResultPage() {
  const [state, setState] = useState<WizardState | null>(null)
  const [previewType, setPreviewType] = useState('standard')
  const [regenLeft, setRegenLeft] = useState(3)
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedImpressions, setSelectedImpressions] = useState<string[]>([])
  const [avoidImpression, setAvoidImpression] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [modalLogo, setModalLogo] = useState<typeof mockLogos[0] | null>(null)
  const [modalBg, setModalBg] = useState('white')

  // 从 sessionStorage 加载状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('logoai_wizard')
      if (saved) {
        const parsed = JSON.parse(saved)
        setState(parsed)
        setSelectedImpressions(parsed.impression || [])
      } else {
        // Mock 默认数据
        setState({
          brandName: 'テストカフェ',
          impression: ['friendly', 'simple'],
          usage: ['card', 'sns'],
          industry: 'cafe',
          industryLabel: 'カフェ・喫茶店',
        })
        setSelectedImpressions(['friendly', 'simple'])
      }

      const savedRegen = sessionStorage.getItem('logoai_regen_left')
      if (savedRegen) {
        setRegenLeft(parseInt(savedRegen))
      }
    }
  }, [])

  // 切换预览类型
  const handlePreviewChange = (type: string) => {
    setPreviewType(type)
  }

  // 切换收藏
  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  // 印象选择（最多2个）
  const handleImpressionToggle = (value: string) => {
    setSelectedImpressions(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value)
      }
      if (prev.length >= 2) {
        return [prev[1], value]
      }
      return [...prev, value]
    })
  }

  // 打开模态框
  const openModal = (logo: typeof mockLogos[0]) => {
    setModalLogo(logo)
    setModalBg('white')
  }

  // 关闭模态框
  const closeModal = () => {
    setModalLogo(null)
  }

  // 打开/关闭Drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  // 模拟再生成
  const handleRegenerate = () => {
    if (regenLeft > 0) {
      const newCount = regenLeft - 1
      setRegenLeft(newCount)
      sessionStorage.setItem('logoai_regen_left', String(newCount))
      // 这里应该触发重新生成逻辑
      alert('再生成しました（Mock）')
    }
  }

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="result-page min-h-screen bg-[#FAFAF7]">
      {/* 顶部安心条 */}
      <div className="trust-bar bg-[#F2F0EB] border-b border-[#E0DDD6] py-2 px-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-4 flex-wrap text-xs font-semibold text-[#5A5A5A]">
          <span className="flex items-center gap-1">
            <span className="text-[#2D5A3D]">✔</span>
            商用利用可能
          </span>
          <span className="text-[#E0DDD6]">|</span>
          <span className="flex items-center gap-1">
            <span className="text-[#2D5A3D]">✔</span>
            著作権はお客様に帰属
          </span>
          <span className="text-[#E0DDD6]">|</span>
          <span className="flex items-center gap-1">
            <span className="text-[#2D5A3D]">✔</span>
            追加費用なし
          </span>
          <span className="text-[#E0DDD6]">|</span>
          <span className="flex items-center gap-1">
            <span className="text-[#2D5A3D]">✔</span>
            印刷・SNS対応済み
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E0DDD6] px-4 h-[60px]">
        <div className="max-w-[1200px] mx-auto h-full flex items-center gap-6">
          <Link href="/" className="font-serif font-bold text-base text-[#1A3A2A]">
            LogoAI.jp
          </Link>

          <div className="flex-1 flex items-center gap-2 text-sm text-[#5A5A5A]">
            <span>✨</span>
            <span>「<strong>{state.brandName}</strong>」のロゴが生成されました</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#9A9A9A] whitespace-nowrap">
              残り再生成 <strong className="text-[#C9963A]">{regenLeft}</strong> 回
            </span>
            <Link
              href="/pricing"
              className="px-4 py-2 bg-[#C9963A] text-[#1A1A1A] text-xs font-bold rounded-full hover:bg-[#b8862e] hover:text-white transition-all whitespace-nowrap"
            >
              アップグレード
            </Link>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-[1200px] mx-auto px-4 py-6">
        {/* 条件摘要区 */}
        <div className="mb-4 pb-4 border-b border-[#E0DDD6]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-[#1A1A1A] mb-3">
                ご希望条件に基づきロゴを生成しました
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[rgba(26,58,42,0.2)] rounded-full text-xs">
                  <span className="font-bold text-[#9A9A9A]">印象</span>
                  <span>{selectedImpressions.map(i => IMP_LABELS[i] || i).join(' × ')}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[rgba(201,150,58,0.3)] rounded-full text-xs">
                  <span className="font-bold text-[#9A9A9A]">用途</span>
                  <span>{state.usage.map(u => USAGE_LABELS[u] || u).join('・')}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[#E0DDD6] rounded-full text-xs">
                  <span className="font-bold text-[#9A9A9A]">業種</span>
                  <span>{state.industryLabel}</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => window.innerWidth >= 1024 ? document.querySelector('.result-aside')?.scrollIntoView({ behavior: 'smooth' }) : setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E0DDD6] rounded-full text-sm font-semibold text-[#5A5A5A] hover:border-[#1A3A2A] hover:text-[#1A3A2A] transition-all"
            >
              🔁 条件を変更する
            </button>
          </div>
        </div>

        {/* 结果布局：PC左右，SP单列 */}
        <div className="result-layout grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-7">
          {/* 左侧内容区 */}
          <div className="result-content">
            {/* 用途预览标签 */}
            <div className="preview-tabs flex gap-1.5 pb-4 border-b border-[#E0DDD6] mb-6 flex-wrap" role="tablist">
              <button
                onClick={() => handlePreviewChange('standard')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  previewType === 'standard'
                    ? 'bg-[#1A3A2A] border border-[#1A3A2A] text-white'
                    : 'bg-white border border-[#E0DDD6] text-[#5A5A5A] hover:border-[#1A3A2A] hover:text-[#1A3A2A]'
                }`}
              >
                <span>🖼️</span> 通常
              </button>
              {state.usage.includes('card') && (
                <button
                  onClick={() => handlePreviewChange('card')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    previewType === 'card'
                      ? 'bg-[#1A3A2A] border border-[#1A3A2A] text-white'
                      : 'bg-white border border-[#E0DDD6] text-[#5A5A5A] hover:border-[#1A3A2A] hover:text-[#1A3A2A]'
                  }`}
                >
                  <span>💳</span> 名刺
                </button>
              )}
              {state.usage.includes('signage') && (
                <button
                  onClick={() => handlePreviewChange('signage')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    previewType === 'signage'
                      ? 'bg-[#1A3A2A] border border-[#1A3A2A] text-white'
                      : 'bg-white border border-[#E0DDD6] text-[#5A5A5A] hover:border-[#1A3A2A] hover:text-[#1A3A2A]'
                  }`}
                >
                  <span>🪧</span> 看板
                </button>
              )}
              {state.usage.includes('sns') && (
                <button
                  onClick={() => handlePreviewChange('sns')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    previewType === 'sns'
                      ? 'bg-[#1A3A2A] border border-[#1A3A2A] text-white'
                      : 'bg-white border border-[#E0DDD6] text-[#5A5A5A] hover:border-[#1A3A2A] hover:text-[#1A3A2A]'
                  }`}
                >
                  <span>📱</span> SNSアイコン
                </button>
              )}
              {state.usage.includes('package') && (
                <button
                  onClick={() => handlePreviewChange('package')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    previewType === 'package'
                      ? 'bg-[#1A3A2A] border border-[#1A3A2A] text-white'
                      : 'bg-white border border-[#E0DDD6] text-[#5A5A5A] hover:border-[#1A3A2A] hover:text-[#1A3A2A]'
                  }`}
                >
                  <span>📦</span> パッケージ
                </button>
              )}
              {state.usage.includes('web') && (
                <button
                  onClick={() => handlePreviewChange('web')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    previewType === 'web'
                      ? 'bg-[#1A3A2A] border border-[#1A3A2A] text-white'
                      : 'bg-white border border-[#E0DDD6] text-[#5A5A5A] hover:border-[#1A3A2A] hover:text-[#1A3A2A]'
                  }`}
                >
                  <span>🌐</span> Webサイト
                </button>
              )}
            </div>

            {/* 预览上下文说明 */}
            <div className="text-xs text-[#9A9A9A] mb-5 min-h-[18px]">
              {PREVIEW_CONTEXT[previewType]}
            </div>

            {/* Logo Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              {mockLogos.map((logo, index) => (
                <motion.div
                  key={logo.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="logo-card bg-white border border-[#E0DDD6] rounded-2xl overflow-hidden transition-all duration-200 hover:border-[#1A3A2A] hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01] cursor-pointer"
                >
                  {/* 预览区 */}
                  <div className="lc-preview relative bg-[#F2F0EB] aspect-[4/3] overflow-hidden">
                    {/* 标准预览 */}
                    <div className={`absolute inset-0 flex items-center justify-center p-5 transition-opacity duration-300 ${previewType === 'standard' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <div className="w-full h-full bg-white flex items-center justify-center">
                        <div className="text-2xl font-bold text-[#1A3A2A]">{state.brandName}</div>
                      </div>
                    </div>

                    {/* 名刺预览 */}
                    {previewType === 'card' && (
                      <div className="absolute inset-0 flex items-center justify-center p-5 bg-[#e8e8e0]">
                        <div className="bg-white w-[200px] h-[115px] rounded shadow-lg p-4 flex flex-col justify-between">
                          <div className="text-lg font-bold text-[#1A3A2A]">{state.brandName}</div>
                          <div className="text-[0.45rem] text-[#9A9A9A]">代表取締役　山田 太郎</div>
                          <div className="text-[0.45rem] text-[#9A9A9A]">TEL: 03-XXXX-XXXX</div>
                        </div>
                      </div>
                    )}

                    {/* 看板预览 */}
                    {previewType === 'signage' && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #87CEEB 60%, #8B7355 60%)' }}>
                        <div className="flex flex-col items-center">
                          <div className="bg-white w-[180px] h-[50px] rounded-t flex items-center justify-center shadow">
                            <span className="text-lg font-bold text-[#1A3A2A]">{state.brandName}</span>
                          </div>
                          <div className="w-[60px] h-[40px] bg-[#c8a882] rounded-b border-2 border-[#8B7355] border-t-0"></div>
                        </div>
                      </div>
                    )}

                    {/* SNS预览 */}
                    {previewType === 'sns' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#F2F0EB] p-5">
                        <div className="flex gap-5">
                          <div className="w-[60px] h-[60px] rounded-xl overflow-hidden bg-white shadow flex items-center justify-center">
                            <span className="text-xs font-bold text-[#1A3A2A]">{state.brandName.slice(0, 2)}</span>
                          </div>
                          <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-white shadow flex items-center justify-center">
                            <span className="text-xs font-bold text-[#1A3A2A]">{state.brandName.slice(0, 2)}</span>
                          </div>
                        </div>
                        <div className="flex gap-5 text-[0.45rem] text-[#9A9A9A]">
                          <span>Instagram</span>
                          <span>X（Twitter）</span>
                        </div>
                      </div>
                    )}

                    {/* パッケージ预览 */}
                    {previewType === 'package' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#f0ede8]">
                        <div className="relative">
                          <div className="w-[80px] h-[100px] bg-white border border-[#d0c8be] rounded-b-lg rounded-t-sm shadow-lg flex items-center justify-center">
                            <span className="text-xs font-bold text-[#1A3A2A]">{state.brandName}</span>
                          </div>
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 border-2 border-[#a09080] border-b-none rounded-t"></div>
                        </div>
                      </div>
                    )}

                    {/* Web预览 */}
                    {previewType === 'web' && (
                      <div className="absolute inset-0 bg-white border border-[#E0DDD6] rounded m-3 shadow-lg overflow-hidden">
                        <div className="h-5 bg-[#f0f0f0] border-b border-[#E0DDD6] flex items-center px-2 gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#E0DDD6]"></div>
                          <div className="w-2 h-2 rounded-full bg-[#E0DDD6]"></div>
                          <div className="w-2 h-2 rounded-full bg-[#E0DDD6]"></div>
                        </div>
                        <div className="h-8 border-b border-[#E0DDD6] flex items-center px-3 gap-3">
                          <span className="text-xs font-bold text-[#1A3A2A]">{state.brandName}</span>
                          <div className="flex gap-2 ml-auto">
                            <div className="w-6 h-1.5 bg-[#E0DDD6] rounded"></div>
                            <div className="w-6 h-1.5 bg-[#E0DDD6] rounded"></div>
                          </div>
                        </div>
                        <div className="h-20 bg-gradient-to-br from-[#F2F0EB] to-[#e0ddd8]"></div>
                      </div>
                    )}
                  </div>

                  {/* 卡片底部 */}
                  <div className="p-3 border-t border-[#E0DDD6] flex items-center justify-between gap-2">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      {/* 印象标签 */}
                      <div className="flex gap-1 flex-wrap">
                        {logo.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-[#F2F0EB] border border-[#E0DDD6] rounded-full text-[0.6rem] font-semibold text-[#5A5A5A]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* 颜色点 */}
                      <div className="flex gap-0.5">
                        {logo.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-full border border-black/10"
                            style={{ background: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                    {/* 按钮 */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(logo.id) }}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm transition-all ${
                          favorites.includes(logo.id)
                            ? 'bg-[#C41E3A] border-[#C41E3A] text-white'
                            : 'border-[#E0DDD6] text-[#9A9A9A] hover:border-[#C41E3A] hover:text-[#C41E3A]'
                        }`}
                      >
                        {favorites.includes(logo.id) ? '♥' : '♡'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); openModal(logo) }}
                        className="px-3 py-1.5 bg-[#1A3A2A] text-white rounded-full text-[0.65rem] font-bold hover:bg-[#2D5A3D] transition-all"
                      >
                        詳細を見る →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* 底部再生成引导区 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="regen-guide mt-8 p-7 bg-[#F2F0EB] border border-[#E0DDD6] rounded-2xl text-center"
            >
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-1.5">
                気に入ったロゴが見つかりませんか？
              </h3>
              <p className="text-sm text-[#5A5A5A] mb-5">
                条件を変えて再生成できます。印象・業種・用途を調整してみましょう。
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => window.innerWidth >= 1024 ? document.querySelector('.result-aside')?.scrollIntoView({ behavior: 'smooth' }) : setIsDrawerOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#1A3A2A] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[#2D5A3D] hover:-translate-y-0.5 transition-all"
                >
                  🔄 条件を変更して再生成
                </button>
                <button
                  onClick={() => window.innerWidth >= 1024 ? document.querySelector('.ap-impression-section')?.scrollIntoView({ behavior: 'smooth' }) : setIsDrawerOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#5A5A5A] border border-[#E0DDD6] rounded-full text-sm font-bold hover:border-[#1A3A2A] hover:text-[#1A3A2A] transition-all"
                >
                  🎨 印象を変えて試す
                </button>
              </div>
            </motion.div>
          </div>

          {/* 右侧调整面板（PC） */}
          <aside className="result-aside hidden lg:block sticky top-[88px]">
            <div className="bg-white border border-[#E0DDD6] rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-[#E0DDD6] bg-[#F2F0EB] flex items-center justify-between">
                <h2 className="font-serif text-base font-bold text-[#1A1A1A]">調整して再生成</h2>
                <span className="text-xs text-[#9A9A9A]">
                  無料残り <strong className="text-[#C9963A]">{regenLeft}</strong> 回
                </span>
              </div>

              {/* 当前设置 */}
              <div className="p-3 border-b border-[#E0DDD6]">
                <span className="text-[0.65rem] font-bold text-[#9A9A9A] uppercase tracking-wider block mb-1.5">現在の設定</span>
                <div className="flex flex-wrap gap-1">
                  {selectedImpressions.map(imp => (
                    <span key={imp} className="px-2 py-0.5 bg-[rgba(26,58,42,0.08)] text-[#1A3A2A] rounded-full text-[0.65rem] font-semibold">
                      {IMP_LABELS[imp] || imp}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 bg-[rgba(26,58,42,0.08)] text-[#1A3A2A] rounded-full text-[0.65rem] font-semibold">
                    {state.industryLabel}
                  </span>
                </div>
              </div>

              {/* 印象选择 */}
              <div className="p-3.5 border-b border-[#E0DDD6] ap-impression-section">
                <div className="text-xs font-bold text-[#1A1A1A] mb-2.5 flex items-center gap-1.5">
                  印象を変える <span className="font-normal text-[#9A9A9A]">最大2つ</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {Object.entries(IMP_LABELS).slice(0, 12).map(([key, label]) => (
                    <label key={key} className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedImpressions.includes(key)}
                        onChange={() => handleImpressionToggle(key)}
                      />
                      <div className={`px-1 py-1.5 border border-[#E0DDD6] rounded-lg text-[0.6rem] font-semibold text-center transition-all ${
                        selectedImpressions.includes(key)
                          ? 'border-[#1A3A2A] bg-[rgba(26,58,42,0.08)] text-[#1A3A2A]'
                          : 'text-[#5A5A5A] hover:border-[#1A3A2A]'
                      }`}>
                        {label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 避けたい印象 */}
              <div className="p-3.5 border-b border-[#E0DDD6]">
                <div className="text-xs font-bold text-[#1A1A1A] mb-2.5 flex items-center gap-1.5">
                  避けたい印象 <span className="font-normal text-[#9A9A9A]">1つまで</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="avoid"
                      className="sr-only"
                      checked={avoidImpression === ''}
                      onChange={() => setAvoidImpression('')}
                    />
                    <div className={`px-2.5 py-1.5 border border-[#E0DDD6] rounded-full text-[0.6rem] font-semibold transition-all ${
                      avoidImpression === ''
                        ? 'border-[#C41E3A] bg-[rgba(196,30,58,0.06)] text-[#C41E3A]'
                        : 'text-[#5A5A5A]'
                    }`}>
                      なし
                    </div>
                  </label>
                  {Object.entries(AVOID_LABELS).map(([key, label]) => (
                    <label key={key} className="cursor-pointer">
                      <input
                        type="radio"
                        name="avoid"
                        className="sr-only"
                        checked={avoidImpression === key}
                        onChange={() => setAvoidImpression(key)}
                      />
                      <div className={`px-2.5 py-1.5 border border-[#E0DDD6] rounded-full text-[0.6rem] font-semibold transition-all ${
                        avoidImpression === key
                          ? 'border-[#C41E3A] bg-[rgba(196,30,58,0.06)] text-[#C41E3A]'
                          : 'text-[#5A5A5A]'
                      }`}>
                        {label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 業種変更 */}
              <div className="p-3.5 border-b border-[#E0DDD6]">
                <div className="text-xs font-bold text-[#1A1A1A] mb-2.5">業種を変える</div>
                <button className="w-full px-3.5 py-2.5 bg-[#F2F0EB] border border-[#E0DDD6] rounded-lg text-sm font-semibold text-[#1A1A1A] flex justify-between items-center hover:border-[#1A3A2A] transition-all">
                  <span>{state.industryLabel}</span>
                  <span>›</span>
                </button>
              </div>

              {/* 再生成按钮 */}
              <div className="p-5 pt-4">
                <button
                  onClick={handleRegenerate}
                  disabled={regenLeft === 0}
                  className={`w-full py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    regenLeft > 0
                      ? 'bg-[#1A3A2A] text-white hover:bg-[#2D5A3D]'
                      : 'bg-[#E0DDD6] text-[#9A9A9A] cursor-not-allowed'
                  }`}
                >
                  <span>🔄</span>
                  再生成する
                </button>

                {regenLeft === 0 && (
                  <div className="mt-3 p-3 bg-[rgba(196,30,58,0.04)] border border-[rgba(196,30,58,0.15)] rounded-lg text-xs text-center text-[#5A5A5A]">
                    <p>無料の再生成回数（3回）を使い切りました。</p>
                    <Link href="/pricing" className="block mt-2 text-[#1A3A2A] font-bold">
                      プレミアムで無制限再生成 →
                    </Link>
                  </div>
                )}
              </div>

              {/* 購入CTA */}
              <div className="p-5 pt-0">
                <div className="text-center text-xs text-[#9A9A9A] mb-2.5 relative">
                  <span className="bg-white px-2 relative z-10">または</span>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-[#E0DDD6] -z-0"></div>
                </div>
                <Link
                  href="/checkout"
                  className="flex items-center justify-between px-4 py-3 bg-[#C9963A] text-[#1A1A1A] rounded-full text-sm font-bold hover:bg-[#b8862e] hover:text-white transition-all"
                >
                  このロゴを購入する
                  <span className="text-xs opacity-80">¥4,980〜</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* SP底部调整栏 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E0DDD6] px-4 py-3 flex gap-2.5 items-center shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <button
          onClick={toggleDrawer}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#F2F0EB] border border-[#E0DDD6] rounded-full text-sm font-semibold"
        >
          <span>🔄</span>
          調整して再生成（残り {regenLeft} 回）
          <span className="ml-auto">↑</span>
        </button>
        <Link
          href="/checkout"
          className="px-5 py-3 bg-[#1A3A2A] text-white rounded-full text-sm font-bold whitespace-nowrap"
        >
          購入 ¥4,980～
        </Link>
      </div>

      {/* SP Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={toggleDrawer}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 lg:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="w-10 h-1 bg-[#E0DDD6] rounded mx-auto mt-3"></div>
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-base font-bold">調整して再生成</h2>
                  <span className="text-xs text-[#9A9A9A]">残り {regenLeft} 回</span>
                </div>

                {/* 印象 */}
                <div className="mb-4">
                  <div className="text-xs font-bold mb-2">印象を変える（最大2つ）</div>
                  <div className="grid grid-cols-3 gap-1">
                    {Object.entries(IMP_LABELS).slice(0, 12).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => handleImpressionToggle(key)}
                        className={`px-2 py-2 border rounded-lg text-xs font-semibold transition-all ${
                          selectedImpressions.includes(key)
                            ? 'border-[#1A3A2A] bg-[rgba(26,58,42,0.08)] text-[#1A3A2A]'
                            : 'border-[#E0DDD6] text-[#5A5A5A]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 避けたい印象 */}
                <div className="mb-4">
                  <div className="text-xs font-bold mb-2">避けたい印象</div>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => setAvoidImpression('')}
                      className={`px-3 py-1.5 border rounded-full text-xs font-semibold ${
                        avoidImpression === '' ? 'border-[#C41E3A] bg-[rgba(196,30,58,0.06)] text-[#C41E3A]' : 'border-[#E0DDD6] text-[#5A5A5A]'
                      }`}
                    >
                      なし
                    </button>
                    {Object.entries(AVOID_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setAvoidImpression(key)}
                        className={`px-3 py-1.5 border rounded-full text-xs font-semibold ${
                          avoidImpression === key ? 'border-[#C41E3A] bg-[rgba(196,30,58,0.06)] text-[#C41E3A]' : 'border-[#E0DDD6] text-[#5A5A5A]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 業種 */}
                <div className="mb-4">
                  <div className="text-xs font-bold mb-2">業種</div>
                  <button className="w-full px-4 py-3 bg-[#F2F0EB] border border-[#E0DDD6] rounded-lg text-sm font-semibold flex justify-between">
                    <span>{state.industryLabel}</span>
                    <span>›</span>
                  </button>
                </div>

                {/* 再生成按钮 */}
                <button
                  onClick={() => { handleRegenerate(); toggleDrawer(); }}
                  disabled={regenLeft === 0}
                  className={`w-full py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 ${
                    regenLeft > 0 ? 'bg-[#1A3A2A] text-white' : 'bg-[#E0DDD6] text-[#9A9A9A]'
                  }`}
                >
                  <span>🔄</span> 再生成する
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logo Modal */}
      <AnimatePresence>
        {modalLogo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100]"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, y: '-48%', x: '-50%' }}
              animate={{ opacity: 1, y: '-50%', x: '-50%' }}
              exit={{ opacity: 0, y: '-48%', x: '-50%' }}
              transition={{ duration: 0.25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl z-[101] w-[min(90vw,760px)] max-h-[90vh] overflow-hidden flex flex-col"
            >
              <button
                onClick={closeModal}
                className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/6 border-none text-lg cursor-pointer z-10 flex items-center justify-center"
              >
                ✕
              </button>

              {/* 预览区 */}
              <div className="flex-1 relative bg-white min-h-[400px] flex items-center justify-center p-10">
                {/* 背景切换 */}
                <div className="absolute top-3.5 left-3.5 flex gap-1">
                  {[
                    { key: 'white', label: '白', bg: 'white' },
                    { key: 'dark', label: '黒', bg: '#1A1A1A' },
                    { key: 'gray', label: 'グレー', bg: '#888888' }
                  ].map(item => (
                    <button
                      key={item.key}
                      onClick={() => setModalBg(item.key)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                        modalBg === item.key
                          ? 'bg-[#1A3A2A] border-[#1A3A2A] text-white'
                          : 'bg-white border-[#E0DDD6] text-[#5A5A5A]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div
                  className="w-full h-full flex items-center justify-center p-5"
                  style={{ background: modalBg === 'white' ? 'white' : modalBg === 'dark' ? '#1A1A1A' : '#888888' }}
                >
                  <div className="text-3xl font-bold" style={{ color: modalBg === 'white' ? '#1A3A2A' : 'white' }}>
                    {state.brandName}
                  </div>
                </div>
              </div>

              {/* 底部信息 */}
              <div className="p-5 border-t border-[#E0DDD6] flex items-center justify-between gap-5">
                <div>
                  <div className="text-sm font-semibold text-[#5A5A5A] mb-1.5">フォント: Noto Serif JP</div>
                  <div className="flex gap-1.5">
                    {modalLogo.colors.map((color, i) => (
                      <div key={i} className="w-4 h-4 rounded-full border border-black/10" style={{ background: color }} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFavorite(modalLogo.id)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl transition-all ${
                      favorites.includes(modalLogo.id)
                        ? 'bg-[#C41E3A] border-[#C41E3A] text-white'
                        : 'border-[#E0DDD6] hover:border-[#C41E3A]'
                    }`}
                  >
                    {favorites.includes(modalLogo.id) ? '♥' : '♡'}
                  </button>
                  <Link
                    href="/checkout"
                    onClick={closeModal}
                    className="px-6 py-3 bg-[#1A3A2A] text-white rounded-full text-sm font-bold whitespace-nowrap hover:bg-[#2D5A3D] transition-all"
                  >
                    このロゴを購入する → ¥4,980～
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 页面底部留白（SP调整栏） */}
      <div className="h-20 lg:hidden"></div>
    </div>
  )
}
