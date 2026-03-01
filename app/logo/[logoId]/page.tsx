'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// 类型定义
interface WizardState {
  brandName: string
  impression: string[]
  usage: string[]
  industry: string
  industryLabel: string
  avoid?: string
}

interface LogoData {
  id: number
  colors: string[]
  tags: string[]
  previewUrl: string
  brandName: string
  impression: string[]
  usage: string[]
}

// Mock Logo 数据
const mockLogos: LogoData[] = [
  { id: 1, colors: ['#1A3A2A', '#C9963A', '#FFFFFF'], tags: ['信頼感', 'シンプル'], previewUrl: '/logos/mock-1.svg', brandName: 'テストカフェ', impression: ['trustworthy', 'simple'], usage: ['card', 'sns'] },
  { id: 2, colors: ['#2D5A3D', '#E8B85A', '#F2F0EB'], tags: ['親しみやすい', 'モダン'], previewUrl: '/logos/mock-2.svg', brandName: 'テストカフェ', impression: ['friendly', 'modern'], usage: ['card', 'sns'] },
  { id: 3, colors: ['#0F2518', '#A67A2E', '#FAFAF7'], tags: ['高級感', '力強い'], previewUrl: '/logos/mock-3.svg', brandName: 'テストカフェ', impression: ['luxury', 'powerful'], usage: ['card', 'sns'] },
  { id: 4, colors: ['#1A3A2A', '#C9963A', '#E0DDD6'], tags: ['和風', 'シンプル'], previewUrl: '/logos/mock-4.svg', brandName: 'テストカフェ', impression: ['japanese', 'simple'], usage: ['card', 'sns'] },
  { id: 5, colors: ['#2D5A3D', '#C9963A', '#FFFFFF'], tags: ['可愛い', 'ポップ'], previewUrl: '/logos/mock-5.svg', brandName: 'テストカフェ', impression: ['cute', 'pop'], usage: ['card', 'sns'] },
]

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

// 背景选项
const BG_OPTIONS = [
  { id: 'white', label: '白背景', bg: '#FFFFFF', border: '#E0DDD6' },
  { id: 'color', label: 'カラー', bg: 'linear-gradient(135deg, #F2F0EB 0%, #E8E4DB 100%)', border: '#C5C2BB' },
  { id: 'mono', label: '単色', bg: '#1A1A1A', border: '#333333' },
  { id: 'inverse', label: '反白', bg: '#1A3A2A', border: '#0F2518' },
]

// Mockup类型
const MOCKUP_TYPES = [
  { id: 'card', label: '名刺', icon: '📇' },
  { id: 'signage', label: '店舗看板', icon: '🏪' },
  { id: 'sns', label: 'Instagram', icon: '📸' },
  { id: 'web', label: 'Webサイト', icon: '🌐' },
  { id: 'package', label: 'パッケージ', icon: '📦' },
]

export default function LogoDetailPage() {
  const params = useParams()
  const logoId = Number(params.logoId)

  const [logo, setLogo] = useState<LogoData | null>(null)
  const [state, setState] = useState<WizardState | null>(null)
  const [bgType, setBgType] = useState('white')
  const [activeMockup, setActiveMockup] = useState('card')

  // 从 sessionStorage 加载状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('logoai_wizard')
      if (saved) {
        const parsed = JSON.parse(saved)
        setState(parsed)
      } else {
        setState({
          brandName: 'テストカフェ',
          impression: ['friendly', 'simple'],
          usage: ['card', 'sns'],
          industry: 'cafe',
          industryLabel: 'カフェ・喫茶店',
        })
      }

      // 从mock数据中查找logo
      const found = mockLogos.find(l => l.id === logoId)
      if (found) {
        setLogo(found)
      } else {
        // 默认使用第一个logo
        setLogo(mockLogos[0])
      }
    }
  }, [logoId])

  if (!logo || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">読み込み中...</div>
      </div>
    )
  }

  const currentBg = BG_OPTIONS.find(b => b.id === bgType) || BG_OPTIONS[0]

  return (
    <div className="logo-detail-page min-h-screen bg-[#FAFAF7]">
      {/* ① 顶部安心条（固定） */}
      <div className="trust-bar fixed top-0 left-0 right-0 z-50 bg-[#F2F0EB] border-b border-[#E0DDD6] py-2 px-4">
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

      {/* ② 生成完了ヘッダー */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-20 pb-6 px-4"
      >
        <div className="max-w-[1200px] mx-auto">
          {/* 返回按钮 */}
          <Link
            href="/create/result"
            className="inline-flex items-center gap-2 text-sm text-[#5A5A5A] hover:text-[#1A3A2A] transition-colors mb-4"
          >
            ← 他のロゴを見る
          </Link>

          {/* 标题 */}
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
            ロゴが生成されました
          </h1>

          {/* 条件信息 */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-lg font-bold text-[#1A3A2A]">{state.brandName}</span>
            <span className="text-[#E0DDD6]">|</span>
            <div className="flex flex-wrap gap-1.5">
              {logo.impression.map(imp => (
                <span key={imp} className="px-2 py-0.5 bg-[rgba(26,58,42,0.08)] text-[#1A3A2A] rounded-full text-xs font-semibold">
                  {IMP_LABELS[imp] || imp}
                </span>
              ))}
            </div>
            <span className="text-[#E0DDD6]">|</span>
            <div className="flex flex-wrap gap-1.5">
              {logo.usage.map(usage => (
                <span key={usage} className="px-2 py-0.5 bg-[rgba(201,150,58,0.1)] text-[#C9963A] rounded-full text-xs font-semibold">
                  {USAGE_LABELS[usage] || usage}
                </span>
              ))}
            </div>
          </div>

          {/* 购买按钮（固定头部区域） */}
          <div className="flex items-center gap-3">
            <Link
              href="/checkout"
              className="px-6 py-3 bg-[#C9963A] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[#E8B85A] hover:-translate-y-0.5 transition-all"
            >
              ¥4,980 で購入 →
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="max-w-[1200px] mx-auto px-4 pb-20">
        {/* ③ Logo主展示区 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="ld-showcase mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* 左侧：大图展示 */}
            <div className="space-y-4">
              <div
                className="relative aspect-square rounded-2xl overflow-hidden border border-[#E0DDD6] shadow-lg flex items-center justify-center"
                style={{ background: currentBg.bg }}
              >
                <div className="w-3/4 h-3/4 flex items-center justify-center">
                  {/* 这里应该是logo图片 */}
                  <div className="text-center">
                    <div className="text-6xl font-serif font-bold mb-2" style={{ color: logo.colors[0] }}>
                      {state.brandName.slice(0, 2)}
                    </div>
                    <div className="text-sm" style={{ color: logo.colors[1] }}>LOGO</div>
                  </div>
                </div>
              </div>

              {/* 背景切换按钮 */}
              <div className="flex items-center justify-center gap-2">
                {BG_OPTIONS.map(bg => (
                  <button
                    key={bg.id}
                    onClick={() => setBgType(bg.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      bgType === bg.id
                        ? 'bg-[#1A3A2A] text-white'
                        : 'bg-white border border-[#E0DDD6] text-[#5A5A5A] hover:border-[#1A3A2A]'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧：小尺寸验证 */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">サイズ別プレビュー</h3>

              {/* SNS图标 */}
              <div className="bg-white border border-[#E0DDD6] rounded-xl p-4">
                <span className="text-[0.65rem] font-bold text-[#9A9A9A] uppercase tracking-wider">SNSプロフィール</span>
                <div className="mt-3 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-[#E0DDD6] flex items-center justify-center overflow-hidden" style={{ background: '#F2F0EB' }}>
                    <span className="text-xl font-bold" style={{ color: logo.colors[0] }}>{state.brandName.slice(0,1)}</span>
                  </div>
                  <div className="w-16 h-16 rounded-full border-2 border-[#E0DDD6] flex items-center justify-center overflow-hidden" style={{ background: '#1A3A2A' }}>
                    <span className="text-xl font-bold text-white">{state.brandName.slice(0,1)}</span>
                  </div>
                </div>
                <p className="mt-2 text-[0.65rem] text-[#9A9A9A]">Instagram・X プロフィール画像</p>
              </div>

              {/* 24px验证 */}
              <div className="bg-white border border-[#E0DDD6] rounded-xl p-4">
                <span className="text-[0.65rem] font-bold text-[#9A9A9A] uppercase tracking-wider">最小サイズ (24px)</span>
                <div className="mt-3 flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-bold" style={{ color: logo.colors[0] }}>{state.brandName.slice(0,2)}</span>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center" style={{ background: logo.colors[0] }}>
                    <span className="text-sm font-bold text-white">{state.brandName.slice(0,2)}</span>
                  </div>
                </div>
                <p className="mt-2 text-[0.65rem] text-[#9A9A9A]">小さいサイズでも視認性を確認</p>
              </div>

              {/* 名片尺寸 */}
              <div className="bg-white border border-[#E0DDD6] rounded-xl p-4">
                <span className="text-[0.65rem] font-bold text-[#9A9A9A] uppercase tracking-wider">名刺サイズ</span>
                <div className="mt-3 aspect-[1.58/1] bg-white border border-[#E0DDD6] rounded flex items-center justify-center p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold" style={{ color: logo.colors[0] }}>{state.brandName}</span>
                  </div>
                </div>
                <p className="mt-2 text-[0.65rem] text-[#9A9A9A]">名刺（91×55mm）での表示</p>
              </div>

              {/* favicon */}
              <div className="bg-white border border-[#E0DDD6] rounded-xl p-4">
                <span className="text-[0.65rem] font-bold text-[#9A9A9A] uppercase tracking-wider">Favicon</span>
                <div className="mt-3 flex items-center gap-4">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: logo.colors[0] }}>
                    <span className="text-[8px] font-bold text-white">{state.brandName.slice(0,1)}</span>
                  </div>
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: logo.colors[1] }}>
                    <span className="text-[8px] font-bold" style={{ color: logo.colors[0] }}>{state.brandName.slice(0,1)}</span>
                  </div>
                </div>
                <p className="mt-2 text-[0.65rem] text-[#9A9A9A]">ブラウザタブ・ブックマーク</p>
              </div>

              {/* 颜色信息 */}
              <div className="bg-white border border-[#E0DDD6] rounded-xl p-4">
                <span className="text-[0.65rem] font-bold text-[#9A9A9A] uppercase tracking-wider">使用カラー</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {logo.colors.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full border border-[#E0DDD6] shadow-sm"
                        style={{ background: color }}
                      />
                      <span className="text-xs font-mono text-[#5A5A5A]">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ④ 使用场景Mockup区 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="ld-mockups mb-12"
        >
          <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6">使用イメージ</h2>

          {/* Mockup类型切换 */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {MOCKUP_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveMockup(type.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeMockup === type.id
                    ? 'bg-[#1A3A2A] text-white'
                    : 'bg-white border border-[#E0DDD6] text-[#5A5A5A] hover:border-[#1A3A2A]'
                }`}
              >
                <span>{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>

          {/* Mockup展示 */}
          <div className="bg-white border border-[#E0DDD6] rounded-2xl p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMockup}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="aspect-video bg-[#F2F0EB] rounded-xl flex items-center justify-center"
              >
                {activeMockup === 'card' && (
                  <div className="bg-white shadow-xl p-8 w-80 aspect-[1.58/1] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2" style={{ color: logo.colors[0] }}>{state.brandName}</div>
                      <div className="text-xs text-[#5A5A5A]">東京都渋谷区...</div>
                    </div>
                  </div>
                )}
                {activeMockup === 'signage' && (
                  <div className="bg-white shadow-xl p-8 w-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2" style={{ color: logo.colors[0] }}>{state.brandName}</div>
                      <div className="text-sm text-[#5A5A5A]">OPEN 9:00 - 20:00</div>
                    </div>
                  </div>
                )}
                {activeMockup === 'sns' && (
                  <div className="flex gap-8 items-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: logo.colors[0] }}>
                        <span className="text-3xl font-bold text-white">{state.brandName.slice(0,1)}</span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: logo.colors[0] }}>{state.brandName}</div>
                      <div className="text-xs text-[#9A9A9A]">@logo_brand</div>
                    </div>
                  </div>
                )}
                {activeMockup === 'web' && (
                  <div className="bg-white shadow-xl w-full max-w-lg">
                    <div className="bg-[#1A3A2A] p-4">
                      <div className="w-20 h-6 bg-white/20 rounded"></div>
                    </div>
                    <div className="p-8 text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: logo.colors[0] }}>{state.brandName}</div>
                      <div className="text-sm text-[#5A5A5A]">ウェブサイトへようこそ</div>
                    </div>
                  </div>
                )}
                {activeMockup === 'package' && (
                  <div className="bg-white shadow-xl p-8 w-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2" style={{ color: logo.colors[0] }}>{state.brandName}</div>
                      <div className="w-16 h-16 mx-auto bg-[#F2F0EB] rounded flex items-center justify-center">
                        <span style={{ color: logo.colors[1] }}>商品</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* ⑤ 操作・調整区 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="ld-controls mb-12"
        >
          <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6">ロゴを調整する</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white border border-[#E0DDD6] rounded-xl p-4 text-center hover:border-[#1A3A2A] hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🎨</div>
              <div className="font-bold text-[#1A1A1A] text-sm">印象変更</div>
              <div className="text-xs text-[#9A9A9A] mt-1">印象を変える</div>
            </button>

            <button className="bg-white border border-[#E0DDD6] rounded-xl p-4 text-center hover:border-[#1A3A2A] hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🖌️</div>
              <div className="font-bold text-[#1A1A1A] text-sm">カラー変更</div>
              <div className="text-xs text-[#9A9A9A] mt-1">色进行调整</div>
            </button>

            <button className="bg-white border border-[#E0DDD6] rounded-xl p-4 text-center hover:border-[#1A3A2A] hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔤</div>
              <div className="font-bold text-[#1A1A1A] text-sm">フォント変更</div>
              <div className="text-xs text-[#9A9A9A] mt-1">字体を変える</div>
            </button>

            <button className="bg-white border border-[#E0DDD6] rounded-xl p-4 text-center hover:border-[#1A3A2A] hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔄</div>
              <div className="font-bold text-[#1A1A1A] text-sm">再生成</div>
              <div className="text-xs text-[#9A9A9A] mt-1">他のパターンを生成</div>
            </button>
          </div>
        </motion.section>

        {/* ⑥ ダウンロード/付費区 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="ld-purchase mb-12"
        >
          <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6">ダウンロード・購入</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 免费预览 */}
            <div className="bg-white border border-[#E0DDD6] rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">👁️</div>
              <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">無料プレビュー</h3>
              <p className="text-sm text-[#5A5A5A] mb-4">低解像度PNG</p>
              <div className="text-2xl font-bold text-[#1A1A1A] mb-4">¥0</div>
              <button className="w-full py-3 border border-[#E0DDD6] text-[#5A5A5A] rounded-full font-bold hover:border-[#1A3A2A] hover:text-[#1A3A2A] transition-all">
                ダウンロード
              </button>
              <p className="text-[0.65rem] text-[#9A9A9A] mt-3">粗い解像度でのみ無料</p>
            </div>

            {/* スタンダードプラン */}
            <div className="bg-white border-2 border-[#C9963A] rounded-2xl p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9963A] text-white text-xs font-bold rounded-full">
                おすすめ
              </div>
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">スタンダードプラン</h3>
              <p className="text-sm text-[#5A5A5A] mb-4">高解像度PNG・SVG</p>
              <div className="text-3xl font-bold text-[#C9963A] mb-4">¥4,980</div>
              <Link
                href="/checkout"
                className="block w-full py-3 bg-[#C9963A] text-white rounded-full font-bold hover:bg-[#E8B85A] transition-all"
              >
                購入手続き →
              </Link>
              <ul className="text-[0.65rem] text-[#5A5A5A] mt-4 space-y-1">
                <li>✓ 商用利用OK</li>
                <li>✓ 著作権转让</li>
                <li>✓ 各種サイズ出力</li>
              </ul>
            </div>

            {/* プレミアムプラン */}
            <div className="bg-white border border-[#E0DDD6] rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">プレミアムプラン</h3>
              <p className="text-sm text-[#5A5A5A] mb-4">全データ+\alpha</p>
              <div className="text-3xl font-bold text-[#1A3A2A] mb-4">¥9,800</div>
              <Link
                href="/checkout"
                className="block w-full py-3 bg-[#1A3A2A] text-white rounded-full font-bold hover:bg-[#2D5A3D] transition-all"
              >
                購入手続き →
              </Link>
              <ul className="text-[0.65rem] text-[#5A5A5A] mt-4 space-y-1">
                <li>✓ スタンダード含む</li>
                <li>✓ AI編集機能</li>
                <li>✓ 優先サポート</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ⑦ 底部再生成引导区 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="ld-regen"
        >
          <div className="regen-guide p-7 bg-[#F2F0EB] border border-[#E0DDD6] rounded-2xl text-center">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-1.5">
              気に入ったロゴが見つかりませんか？
            </h3>
            <p className="text-sm text-[#5A5A5A] mb-5">
              条件を変えて再生成できます。印象・業種・用途を調整してみましょう。
            </p>
            <Link
              href="/create/result"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A3A2A] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[#2D5A3D] hover:-translate-y-0.5 transition-all"
            >
              🔄 他のロゴを見る
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
