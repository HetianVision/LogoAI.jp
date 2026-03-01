'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useDashboardStore, PurchasedLogo } from '../auth/auth-modal'

// Option labels mapping
const OPTION_LABELS: Record<string, string> = {
  'brand-guideline': 'ブランドガイドライン',
  'business-card': '名刺デザイン',
  'sns-icon-set': 'SNSアイコン',
  'trademark-check': '商標チェック',
  'favicon-set': 'ファビコン',
}

function PurchasedLogoCard({ logo }: { logo: PurchasedLogo }) {
  const [isDarkBg, setIsDarkBg] = useState(false)
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = async (format: string) => {
    setDownloading(format)
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDownloading(null)
    // In real implementation, this would trigger actual file download
    alert(`${format.toUpperCase()}のダウンロードを開始しました`)
  }

  const toggleBg = () => {
    setIsDarkBg(!isDarkBg)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className={`purchased-logo-card ${isDarkBg ? 'plc-bg-dark' : ''}`}
      variants={itemVariants}
      data-logo-id={logo.id}
    >
      {/* Preview */}
      <div className="plc-preview">
        <img
          src={logo.previewUrl}
          alt={`${logo.brandName}のロゴ`}
          width={300}
          height={200}
          loading="lazy"
        />
        <button
          className="plc-bg-toggle"
          type="button"
          aria-label="背景色を切り替える"
          aria-pressed={isDarkBg}
          onClick={toggleBg}
        >
          ◑
        </button>
      </div>

      {/* Card Info */}
      <div className="plc-body">
        <div className="plc-meta">
          <div className="plc-brand">{logo.brandName}</div>
          <div className="plc-industry">{logo.industryLabel}</div>
          <div className="plc-date">
            購入日：{new Date(logo.purchasedAt).toLocaleDateString('ja-JP')}
          </div>
        </div>
        <div className={`plc-plan-badge ${logo.plan === 'premium' ? 'plc-plan-premium' : ''}`}>
          {logo.plan === 'premium' ? 'プレミアム' : 'スタンダード'}
        </div>
      </div>

      {/* Downloads */}
      <div className="plc-downloads">
        <div className="pld-title">ダウンロード</div>
        <div className="pld-buttons">
          {[
            { format: 'svg', label: 'SVG', desc: 'ベクター・印刷用' },
            { format: 'png', label: 'PNG', desc: '高解像度・汎用' },
            { format: 'pdf', label: 'PDF', desc: '入稿・印刷用' },
            { format: 'certificate', label: '©️ 証明書', desc: '著作権帰属PDF' },
          ].map((btn) => (
            <motion.button
              key={btn.format}
              className={`pld-btn ${btn.format === 'certificate' ? 'pld-btn-certificate' : ''} ${downloading === btn.format ? 'downloading' : ''}`}
              type="button"
              data-format={btn.format}
              data-logo-id={logo.id}
              aria-label={`${btn.label}をダウンロード`}
              onClick={() => handleDownload(btn.format)}
              disabled={downloading !== null}
              whileTap={{ scale: 0.97 }}
            >
              <span className="pld-format">
                {downloading === btn.format ? '...' : btn.label}
              </span>
              <span className="pld-desc">{btn.desc}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Options */}
      {logo.options.length > 0 && (
        <div className="plc-options">
          {logo.options.map((opt) => (
            <span key={opt} className="plc-option-tag">
              {OPTION_LABELS[opt] || opt}
            </span>
          ))}
        </div>
      )}

      <style jsx>{`
        .purchased-logo-card {
          background: white;
          display: flex;
          flex-direction: column;
        }

        .plc-bg-dark .plc-preview {
          background: #1A1A1A;
        }

        .plc-preview {
          position: relative;
          aspect-ratio: 3/2;
          background: #F2F0EB;
          overflow: hidden;
        }

        .plc-preview img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 20px;
          box-sizing: border-box;
        }

        .plc-bg-toggle {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #E0DDD6;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        .plc-body {
          padding: 16px 20px 12px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid #E0DDD6;
        }

        .plc-brand {
          font-size: 1rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 3px;
        }

        .plc-industry {
          font-size: 0.75rem;
          color: #9A9A9A;
          margin-bottom: 3px;
        }

        .plc-date {
          font-size: 0.75rem;
          color: #9A9A9A;
        }

        .plc-plan-badge {
          flex-shrink: 0;
          font-size: 0.6rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
          background: #F2F0EB;
          color: #9A9A9A;
          border: 1px solid #E0DDD6;
          white-space: nowrap;
        }

        .plc-plan-premium {
          background: rgba(201, 150, 58, 0.1);
          color: #C9963A;
          border-color: rgba(201, 150, 58, 0.3);
        }

        .plc-downloads {
          padding: 14px 20px;
          border-bottom: 1px solid #E0DDD6;
        }

        .pld-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: #9A9A9A;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 10px;
        }

        .pld-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }

        .pld-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 10px 6px;
          background: #F2F0EB;
          border: 1.5px solid #E0DDD6;
          border-radius: 0.75rem;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
          text-align: center;
        }

        .pld-btn:hover:not(:disabled) {
          border-color: #1A3A2A;
          background: rgba(26, 58, 42, 0.04);
        }

        .pld-btn:active:not(:disabled) {
          transform: scale(0.97);
        }

        .pld-btn.downloading {
          opacity: 0.6;
          cursor: wait;
          pointer-events: none;
        }

        .pld-format {
          font-size: 0.75rem;
          font-weight: 700;
          color: #1A1A1A;
        }

        .pld-desc {
          font-size: 0.55rem;
          color: #9A9A9A;
          line-height: 1.3;
        }

        .pld-btn-certificate {
          border-color: rgba(201, 150, 58, 0.3);
          background: rgba(201, 150, 58, 0.04);
        }

        .pld-btn-certificate:hover:not(:disabled) {
          border-color: #C9963A;
          background: rgba(201, 150, 58, 0.08);
        }

        .pld-btn-certificate .pld-format {
          color: #C9963A;
        }

        .plc-options {
          padding: 12px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .plc-option-tag {
          font-size: 0.6rem;
          font-weight: 600;
          padding: 3px 10px;
          background: rgba(26, 58, 42, 0.05);
          color: #1A3A2A;
          border: 1px solid rgba(26, 58, 42, 0.12);
          border-radius: 9999px;
        }

        @media (max-width: 640px) {
          .pld-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </motion.div>
  )
}

export default function LogosSection() {
  const { logos, isLoading } = useDashboardStore()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  if (isLoading) {
    return (
      <section className="db-section" aria-labelledby="logos-title">
        <div className="dbs-header">
          <h1 id="logos-title" className="dbs-title">購入済みロゴ</h1>
          <a href="/create" className="btn-new-logo">
            + 新しいロゴを作る
          </a>
        </div>
        <div className="loading-state">
          読み込み中...
        </div>
        <style jsx>{`
          .loading-state {
            padding: 64px 28px;
            text-align: center;
            color: #9A9A9A;
          }
        `}</style>
      </section>
    )
  }

  return (
    <motion.section
      className="db-section"
      id="logos"
      aria-labelledby="logos-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="dbs-header">
        <h1 id="logos-title" className="dbs-title">購入済みロゴ</h1>
        <motion.a
          href="/create"
          className="btn-new-logo"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          + 新しいロゴを作る
        </motion.a>
      </div>

      {/* Empty State */}
      {logos.length === 0 && (
        <div className="db-empty" id="logos-empty">
          <motion.div
            className="dbe-icon"
            aria-hidden="true"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            🖼️
          </motion.div>
          <h2 className="dbe-title">まだロゴを購入していません</h2>
          <p className="dbe-desc">
            AIが最短10秒で8〜12案を生成します。<br />
            まずは無料で試してみましょう。
          </p>
          <motion.a
            href="/create"
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ロゴを作してみる →
          </motion.a>
        </div>
      )}

      {/* Logo Grid */}
      {logos.length > 0 && (
        <motion.div
          className="logo-card-grid"
          id="logo-card-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {logos.map((logo) => (
            <PurchasedLogoCard key={logo.id} logo={logo} />
          ))}
        </motion.div>
      )}

      <style jsx>{`
        .db-section {
          background: white;
          border: 1px solid #E0DDD6;
          border-radius: 1rem;
          overflow: hidden;
        }

        .dbs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid #E0DDD6;
        }

        .dbs-title {
          font-family: 'Noto Serif JP', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1A1A1A;
          margin: 0;
        }

        .btn-new-logo {
          display: flex;
          align-items: center;
          padding: 9px 18px;
          background: #1A3A2A;
          color: white;
          font-size: 0.875rem;
          font-weight: 700;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-new-logo:hover {
          background: #2D5A3D;
        }

        .db-empty {
          padding: 64px 28px;
          text-align: center;
        }

        .dbe-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .dbe-title {
          font-family: 'Noto Serif JP', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1A1A1A;
          margin: 0 0 10px;
        }

        .dbe-desc {
          font-size: 0.875rem;
          color: #5A5A5A;
          line-height: 1.6;
          margin: 0 0 24px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          background: #1A3A2A;
          color: white;
          font-size: 0.875rem;
          font-weight: 700;
          border-radius: 9999px;
          text-decoration: none;
        }

        .logo-card-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: #E0DDD6;
        }

        @media (max-width: 640px) {
          .logo-card-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.section>
  )
}
