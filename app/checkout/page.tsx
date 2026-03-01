'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './checkout.css'

// Types
interface WizardState {
  brandName: string
  industry: string
  logoUrl: string
  selectedLogos: string[]
}

interface Plan {
  id: string
  name: string
  price: number
  features: { text: string; included: boolean }[]
}

interface Option {
  id: string
  name: string
  price: number
  description: string
  includedInPremium?: boolean
}

const PLANS: Plan[] = [
  {
    id: 'standard',
    name: 'スタンダードプラン',
    price: 4980,
    features: [
      { text: 'SVG・PNG・PDF 高解像度ダウンロード', included: true },
      { text: '著作権帰属証明書（PDF）', included: true },
      { text: '商用利用フル解禁', included: true },
      { text: '再編集・再ダウンロード無制限', included: true },
      { text: 'ブランドガイドライン', included: false },
      { text: '商標類似チェックレポート', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'プレミアムプラン',
    price: 9800,
    features: [
      { text: 'SVG・PNG・PDF 高解像度ダウンロード', included: true },
      { text: '著作権帰属証明書（PDF）', included: true },
      { text: '商用利用フル解禁', included: true },
      { text: '再編集・再ダウンロード無制限', included: true },
      { text: 'ブランドガイドライン（PDF）', included: true },
      { text: 'J-PlatPat商標類似チェックレポート', included: true },
    ],
  },
]

const OPTIONS: Option[] = [
  {
    id: 'brand-guideline',
    name: 'ブランドガイドライン',
    price: 2980,
    description: 'カラーコード・フォント・ロゴ使用ルールをまとめたPDF。デザイナーや印刷会社への指示に使えます。',
  },
  {
    id: 'business-card',
    name: '名刺デザインデータ',
    price: 1980,
    description: 'ロゴを使った名刺デザイン（91×55mm）のIllustrator/PDF入稿データ。印刷会社にそのまま入稿できます。',
  },
  {
    id: 'sns-icon-set',
    name: 'SNSアイコンセット',
    price: 980,
    description: 'Instagram・X・LINE・Facebook・YouTube 各プラットフォーム推奨サイズに最適化したPNGセット（正方形・丸形）。',
  },
  {
    id: 'trademark-check',
    name: '商標類似チェックレポート',
    price: 3980,
    description: 'J-PlatPat連携による商標類似度スコアレポート（PDF）。商標登録申請前のリスク確認に。',
    includedInPremium: true,
  },
  {
    id: 'favicon-set',
    name: 'ファビコン・アプリアイコンセット',
    price: 580,
    description: 'Webサイト用ファビコン（16・32・64px）とiOSアプリアイコン（1024px）のPNGセット。',
  },
]

// Helper functions
const formatPrice = (price: number) => {
  return `¥${price.toLocaleString()}`
}

const formatPriceWithTax = (price: number) => {
  const taxIncluded = Math.floor(price * 1.1)
  return `¥${taxIncluded.toLocaleString()}`
}

// Animation variants
const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
}

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardState, setWizardState] = useState<WizardState | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  // Load wizard state from sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('logoai_wizard')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setWizardState(parsed)
          // Default to first selected logo if available
          if (parsed.selectedLogos && parsed.selectedLogos.length > 0) {
            // Use the first logo
          }
        } catch {
          // Use defaults
        }
      }
    }
  }, [])

  // Calculate totals
  const subtotal = selectedPlan.price + selectedOptions.reduce((sum, optId) => {
    const opt = OPTIONS.find(o => o.id === optId)
    return sum + (opt?.price || 0)
  }, 0)
  const tax = Math.floor(subtotal * 0.1)
  const total = subtotal + tax

  // Handle plan selection
  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan)
    // Auto-disable options included in premium
    if (plan.id === 'premium') {
      const premiumIncluded = OPTIONS.filter(o => o.includedInPremium).map(o => o.id)
      setSelectedOptions(prev => [...prev.filter(o => !premiumIncluded.includes(o)), ...premiumIncluded])
    }
  }

  // Handle option toggle
  const handleOptionToggle = (optionId: string) => {
    if (selectedPlan.id === 'premium') {
      const opt = OPTIONS.find(o => o.id === optionId)
      if (opt?.includedInPremium) return
    }
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  // Handle step navigation
  const handleNext = () => {
    if (currentStep === 1) {
      if (!isLoggedIn) {
        setIsAuthModalOpen(true)
      } else {
        setCurrentStep(3)
      }
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle auth
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate auth - in production this would call an API
    setIsLoggedIn(true)
    setUserEmail(authTab === 'login' ? 'user@example.com' : 'newuser@example.com')
    setIsAuthModalOpen(false)
    setCurrentStep(3)
  }

  // Handle final purchase
  const handlePurchase = () => {
    setCurrentStep(5)
  }

  // Get logo URL
  const logoUrl = wizardState?.logoUrl || '/placeholder-logo.png'
  const brandName = wizardState?.brandName || 'Sample Brand'
  const industry = wizardState?.industry || '飲食業'

  return (
    <div className="checkout-page">
      {/* Header */}
      <header className="checkout-header">
        <div className="coh-inner">
          <a href="/" className="coh-logo" aria-label="LogoAI.jp ホームへ">
            <span className="coh-logo-text">LogoAI.jp</span>
          </a>

          {/* Progress Bar */}
          <nav className="co-progress" aria-label="購入ステップ">
            <div className="cop-steps">
              {[1, 2, 3, 4].map((step, idx) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                  <motion.div
                    className={`cop-step ${currentStep >= step ? 'cops-active' : ''} ${currentStep > step ? 'cops-done' : ''}`}
                    initial={false}
                    animate={{
                      opacity: currentStep >= step ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="cops-circle">
                      {currentStep > step ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          ✓
                        </motion.span>
                      ) : (
                        step
                      )}
                    </div>
                    <span className="cops-label">
                      {step === 1 ? 'プラン選択' : step === 2 ? 'アカウント' : step === 3 ? 'お支払い' : '確認・完了'}
                    </span>
                  </motion.div>
                  {idx < 3 && (
                    <div className={`cop-connector ${currentStep > step ? 'copc-done' : ''}`} />
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Security Badge */}
          <div className="coh-secure" aria-label="セキュリティ">
            🔒 <span>SSL暗号化通信</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="checkout-main">
        <div className="checkout-layout">
          {/* Steps */}
          <div className="checkout-steps">
            <AnimatePresence mode="wait">
              {/* Step 1: Plan Selection */}
              {currentStep === 1 && (
                <motion.section
                  key="step1"
                  className="co-step"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                >
                  <div className="step-heading">
                    <span className="step-badge">STEP 1</span>
                    <h1>プランとオプションを選択してください</h1>
                    <p className="step-desc">購入するのはこのロゴ1点です。プランによって取得できるデータと権利が異なります。</p>
                  </div>

                  {/* Logo Preview */}
                  <div className="selected-logo-card">
                    <div className="slc-img">
                      <img src={logoUrl} alt="" />
                    </div>
                    <div className="slc-info">
                      <div className="slc-brand">{brandName}</div>
                      <div className="slc-industry">{industry}</div>
                      <a href="/create/result" className="slc-change">別のロゴを選ぶ →</a>
                    </div>
                  </div>

                  {/* Plan Selection */}
                  <div className="plan-select-group" role="radiogroup" aria-label="プラン選択">
                    {PLANS.map((plan, idx) => (
                      <motion.label
                        key={plan.id}
                        className={`plan-select-card ${plan.id === 'premium' ? 'plan-select-card-featured' : ''} ${selectedPlan.id === plan.id ? 'plan-selected' : ''}`}
                        custom={idx}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="plan"
                          value={plan.id}
                          className="plan-radio"
                          checked={selectedPlan.id === plan.id}
                          onChange={() => handlePlanSelect(plan)}
                        />
                        {plan.id === 'premium' && <div className="psc-badge">おすすめ</div>}
                        <div className="psc-inner">
                          <div className="psc-header">
                            <div className="psc-name">{plan.name}</div>
                            <div className="psc-price">
                              <span className="psc-price-num">{formatPrice(plan.price)}</span>
                              <span className="psc-price-unit">税込</span>
                            </div>
                          </div>
                          <ul className="psc-features">
                            {plan.features.map((feature, i) => (
                              <li key={i} className={`pscf-item ${feature.included ? 'pscf-yes' : 'pscf-no'}`}>
                                {feature.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.label>
                    ))}
                  </div>

                  {/* Options */}
                  <div className="options-section">
                    <h2 className="options-title">
                      オプションサービス
                      <span className="options-sub">必要なものだけ追加できます</span>
                    </h2>

                    <div className="options-list">
                      {OPTIONS.map((option, idx) => {
                        const isDisabled = selectedPlan.id === 'premium' && option.includedInPremium
                        const isChecked = selectedOptions.includes(option.id) || (isDisabled && option.includedInPremium)
                        return (
                          <motion.label
                            key={option.id}
                            className={`option-card ${isDisabled ? 'option-card-disabled' : ''}`}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={!isDisabled ? { scale: 1.01 } : undefined}
                            whileTap={!isDisabled ? { scale: 0.99 } : undefined}
                          >
                            <div className="oc-left">
                              <input
                                type="checkbox"
                                name="option"
                                value={option.id}
                                className="option-check"
                                checked={isChecked}
                                disabled={isDisabled}
                                onChange={() => handleOptionToggle(option.id)}
                              />
                              <div className="oc-info">
                                <div className="oc-name">{option.name}</div>
                                <div className="oc-desc">
                                  {option.description}
                                  {option.includedInPremium && (
                                    <span className="oc-tag">プレミアムに含まれます</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="oc-price">
                              <span className="oc-price-num">+{formatPrice(option.price)}</span>
                              <span className="oc-price-unit">税込</span>
                            </div>
                          </motion.label>
                        )
                      })}
                    </div>
                  </div>

                  <div className="step-actions">
                    <motion.button
                      type="button"
                      className="btn-step-next"
                      onClick={handleNext}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      次へ：アカウント確認
                      <span className="btn-arrow" aria-hidden="true">→</span>
                    </motion.button>
                  </div>
                </motion.section>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.section
                  key="step3"
                  className="co-step"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                >
                  <div className="step-heading">
                    <span className="step-badge">STEP 3</span>
                    <h2>お支払い方法を選択してください</h2>
                  </div>

                  {/* Logged in user */}
                  <div className="logged-in-bar">
                    <span className="lib-email" id="logged-in-email">{userEmail}</span>
                    <button type="button" className="lib-change" onClick={() => setIsAuthModalOpen(true)}>
                      アカウントを変更
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="payment-methods" role="radiogroup" aria-label="お支払い方法">
                    <label className="pm-card pm-card-active">
                      <div className="pmc-header">
                        <input type="radio" name="payment" value="card" className="pm-radio" defaultChecked />
                        <span className="pmc-label">クレジットカード</span>
                        <div className="pmc-brands" aria-label="対応カードブランド">
                          <span className="pmc-brand" title="Visa">VISA</span>
                          <span className="pmc-brand" title="Mastercard">MC</span>
                          <span className="pmc-brand" title="American Express">AMEX</span>
                          <span className="pmc-brand" title="JCB">JCB</span>
                        </div>
                      </div>

                      {/* Stripe Elements Placeholder */}
                      <div className="stripe-elements-wrap">
                        <div className="stripe-field">
                          <label className="stripe-label">カード番号</label>
                          <div className="stripe-element-placeholder">
                            <input type="text" placeholder="1234 5678 9012 3456" className="stripe-input" />
                          </div>
                        </div>
                        <div className="stripe-row">
                          <div className="stripe-field">
                            <label className="stripe-label">有効期限</label>
                            <div className="stripe-element-placeholder">
                              <input type="text" placeholder="MM / YY" className="stripe-input" />
                            </div>
                          </div>
                          <div className="stripe-field">
                            <label className="stripe-label">セキュリティコード</label>
                            <div className="stripe-element-placeholder">
                              <input type="text" placeholder="123" className="stripe-input" />
                            </div>
                          </div>
                        </div>
                        <div className="stripe-secure">
                          🔒 カード情報はStripeが安全に管理します。当社のサーバーには保存されません。
                        </div>
                      </div>
                    </label>

                    {/* Convenience Store - Coming Soon */}
                    <div className="pm-card pm-card-disabled" aria-disabled="true">
                      <div className="pmc-header">
                        <input type="radio" name="payment" value="konbini" className="pm-radio" disabled />
                        <span className="pmc-label">コンビニ払い</span>
                        <span className="pm-coming-soon">まもなく対応予定</span>
                      </div>
                      <div className="pmc-konbini-logos">
                        <span>セブン-イレブン</span>
                        <span>ローソン</span>
                        <span>ファミリーマート</span>
                      </div>
                    </div>
                  </div>

                  <div className="step-actions">
                    <motion.button
                      type="button"
                      className="btn-step-next"
                      onClick={handleNext}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      購入内容を確認する
                      <span className="btn-arrow" aria-hidden="true">→</span>
                    </motion.button>
                    <button type="button" className="btn-step-back" onClick={handleBack}>
                      ← 戻る
                    </button>
                  </div>
                </motion.section>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <motion.section
                  key="step4"
                  className="co-step"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                >
                  <div className="step-heading">
                    <span className="step-badge">STEP 4</span>
                    <h2>購入内容の最終確認</h2>
                    <p className="step-desc">以下の内容で購入を確定します。</p>
                  </div>

                  <div className="confirm-card">
                    <motion.div
                      className="confirm-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className="cr-label">購入ロゴ</span>
                      <div className="cr-logo-val">
                        <img src={logoUrl} alt="" id="confirm-logo-thumb" />
                        <span>{brandName}</span>
                      </div>
                      <button className="cr-edit" type="button" onClick={() => setCurrentStep(1)}>変更</button>
                    </motion.div>

                    <motion.div
                      className="confirm-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="cr-label">プラン</span>
                      <span className="cr-value">{selectedPlan.name}</span>
                      <button className="cr-edit" type="button" onClick={() => setCurrentStep(1)}>変更</button>
                    </motion.div>

                    <motion.div
                      className="confirm-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="cr-label">オプション</span>
                      <span className="cr-value">
                        {selectedOptions.length > 0
                          ? selectedOptions.map(id => OPTIONS.find(o => o.id === id)?.name).join('、 ')
                          : 'なし'}
                      </span>
                      <button className="cr-edit" type="button" onClick={() => setCurrentStep(1)}>変更</button>
                    </motion.div>

                    <motion.div
                      className="confirm-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="cr-label">アカウント</span>
                      <span className="cr-value">{userEmail}</span>
                      <button className="cr-edit" type="button" onClick={() => { setIsAuthModalOpen(true); setCurrentStep(2) }}>変更</button>
                    </motion.div>

                    <motion.div
                      className="confirm-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="cr-label">お支払い</span>
                      <span className="cr-value">クレジットカード</span>
                      <button className="cr-edit" type="button" onClick={() => setCurrentStep(3)}>変更</button>
                    </motion.div>

                    <motion.div
                      className="confirm-total-row"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="ctr-label">お支払い合計（税込）</span>
                      <span className="ctr-amount">{formatPrice(total)}</span>
                    </motion.div>
                  </div>

                  <div className="purchase-action">
                    <motion.button
                      type="button"
                      className="btn-final-purchase"
                      onClick={handlePurchase}
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(26,58,42,0.3)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="bfp-lock" aria-hidden="true">🔒</span>
                      {formatPrice(total)} を支払って購入を確定する
                    </motion.button>
                    <p className="purchase-guarantee">
                      7日間全额返金保証 ·
                      <a href="/guarantee" target="_blank" rel="noopener">详细信息</a>
                    </p>
                    <button type="button" className="btn-step-back" onClick={handleBack}>
                      ← 返回
                    </button>
                  </div>
                </motion.section>
              )}

              {/* Step 5: Completion */}
              {currentStep === 5 && (
                <motion.section
                  key="step5"
                  className="co-step co-step-complete"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                >
                  <div className="complete-inner">
                    <motion.div
                      className="complete-check"
                      variants={checkVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      ✓
                    </motion.div>

                    <h2>购买已完成！</h2>

                    <p className="complete-desc">
                      <strong id="complete-email">{userEmail}</strong> 已发送
                      版权归属证书和下载链接。
                    </p>

                    <div className="complete-summary">
                      <div className="complete-sum-row">
                        <span>购买Logo</span>
                        <span id="complete-brand-name">{brandName}</span>
                      </div>
                      <div className="complete-sum-row">
                        <span>套餐</span>
                        <span id="complete-plan-name">{selectedPlan.name}</span>
                      </div>
                      <div className="complete-sum-row complete-sum-total">
                        <span>支付金额</span>
                        <span id="complete-total">{formatPrice(total)}</span>
                      </div>
                    </div>

                    <div className="complete-actions">
                      <a href="/dashboard" className="btn-primary btn-primary-lg">
                        前往マイページ下载Logo →
                      </a>
                      <a href="/create" className="btn-secondary">
                        制作其他Logo
                      </a>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="checkout-summary" aria-label="注文内容">
            <div className="cos-card">
              <div className="cos-title">注文内容</div>

              {/* Logo Preview */}
              <div className="cos-logo-preview">
                <div className="cos-logo-img">
                  <img src={logoUrl} alt="" />
                </div>
                <div className="cos-logo-info">
                  <div className="cos-logo-name">{brandName}</div>
                  <div className="cos-logo-industry">{industry}</div>
                </div>
              </div>

              <div className="cos-divider" />

              {/* Selected Plan */}
              <div className="cos-plan">
                <div className="cos-plan-name">{selectedPlan.name}</div>
                <div className="cos-plan-price">{formatPrice(selectedPlan.price)}</div>
              </div>

              {/* Options */}
              <div className="cos-options">
                {selectedOptions.map(optId => {
                  const opt = OPTIONS.find(o => o.id === optId)
                  if (!opt) return null
                  return (
                    <div key={optId} className="cos-option-row">
                      <span>+ {opt.name}</span>
                      <span className="cos-option-price">{formatPrice(opt.price)}</span>
                    </div>
                  )
                })}
              </div>

              <div className="cos-divider" />

              {/* Total */}
              <div className="cos-total">
                <div className="cos-total-row">
                  <span>小計</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="cos-total-row">
                  <span>消費税（10%）</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="cos-total-row cos-total-final">
                  <span>合計（税込み）</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="cos-trust">
                <div className="cos-trust-item">
                  <span>🔒</span>
                  <span>SSL暗号化・Stripe決済</span>
                </div>
                <div className="cos-trust-item">
                  <span>↩️</span>
                  <span>7日間全额返金保証</span>
                </div>
                <div className="cos-trust-item">
                  <span>©️</span>
                  <span>著作権証明書付き</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            className="auth-modal"
            id="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="am-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
            />

            <motion.div
              className="am-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Tabs */}
              <div className="am-tabs" role="tablist">
                <button
                  className={`am-tab ${authTab === 'login' ? 'am-tab-active' : ''}`}
                  role="tab"
                  aria-selected={authTab === 'login'}
                  onClick={() => setAuthTab('login')}
                >
                  登录
                </button>
                <button
                  className={`am-tab ${authTab === 'register' ? 'am-tab-active' : ''}`}
                  role="tab"
                  aria-selected={authTab === 'register'}
                  onClick={() => setAuthTab('register')}
                >
                  注册
                </button>
              </div>

              {/* Login Panel */}
              {authTab === 'login' && (
                <div className="am-panel" role="tabpanel">
                  <h2 id="auth-modal-title" className="am-title">
                    登录以继续购买
                  </h2>
                  <p className="am-desc">
                    为确认版权证书发送地址的邮箱，需要登录。
                  </p>
                  <form className="am-form" id="login-form" onSubmit={handleAuth}>
                    <div className="form-field">
                      <label htmlFor="login-email" className="field-label">
                        邮箱地址
                        <span className="field-required">必填</span>
                      </label>
                      <input
                        type="email"
                        id="login-email"
                        name="email"
                        className="field-input"
                        required
                        placeholder="例）yamamoto@example.com"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="login-password" className="field-label">
                        密码
                        <span className="field-required">必填</span>
                      </label>
                      <div className="password-wrap">
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          id="login-password"
                          name="password"
                          className="field-input"
                          required
                          placeholder="请输入密码"
                        />
                        <button
                          type="button"
                          className="pw-toggle"
                          aria-label="显示/隐藏密码"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          👁
                        </button>
                      </div>
                      <div className="field-footer">
                        <a href="/forgot-password" className="field-link">
                          忘记密码
                        </a>
                      </div>
                    </div>
                    <button type="submit" className="btn-auth-submit">
                      登录并继续购买 →
                    </button>
                  </form>
                </div>
              )}

              {/* Register Panel */}
              {authTab === 'register' && (
                <div className="am-panel" role="tabpanel">
                  <h2 className="am-title">创建账户以完成购买</h2>
                  <p className="am-desc">
                    30秒完成注册。版权证书和Logo数据将发送到注册邮箱。
                  </p>
                  <form className="am-form" id="register-form" onSubmit={handleAuth}>
                    <div className="form-field">
                      <label htmlFor="reg-email" className="field-label">
                        邮箱地址
                        <span className="field-required">必填</span>
                      </label>
                      <input
                        type="email"
                        id="reg-email"
                        name="email"
                        className="field-input"
                        required
                        placeholder="例）yamamoto@example.com"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="reg-password" className="field-label">
                        密码
                        <span className="field-required">必填</span>
                      </label>
                      <div className="password-wrap">
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          id="reg-password"
                          name="password"
                          className="field-input"
                          required
                          minLength={8}
                          placeholder="8字符以上"
                        />
                        <button
                          type="button"
                          className="pw-toggle"
                          aria-label="显示/隐藏密码"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          👁
                        </button>
                      </div>
                      <span className="field-hint">
                        8字符以上，请包含英文字母和数字
                      </span>
                    </div>
                    <p className="am-terms-note">
                      注册即表示同意
                      <a href="/terms" target="_blank" rel="noopener">服务条款</a>和
                      <a href="/privacy" target="_blank" rel="noopener">隐私政策</a>
                    </p>
                    <button type="submit" className="btn-auth-submit">
                      注册并继续购买 →
                    </button>
                  </form>
                </div>
              )}

              {/* Close Button */}
              <button
                className="am-close"
                type="button"
                aria-label="关闭"
                onClick={() => setIsAuthModalOpen(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
