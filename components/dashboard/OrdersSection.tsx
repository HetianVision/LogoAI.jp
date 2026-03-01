'use client'

import { motion } from 'framer-motion'
import { useDashboardStore, Order } from '../auth/auth-modal'

// Option labels mapping
const OPTION_LABELS: Record<string, string> = {
  'brand-guideline': 'ブランドガイドライン',
  'business-card': '名刺デザイン',
  'sns-icon-set': 'SNSアイコン',
  'trademark-check': '商標チェック',
  'favicon-set': 'ファビコン',
}

function OrderRow({ order }: { order: Order }) {
  const handleDownloadReceipt = async () => {
    // Simulate receipt download
    await new Promise(resolve => setTimeout(resolve, 500))
    alert(`領収書（${order.id}）のダウンロードを開始しました`)
  }

  return (
    <motion.tr
      className="order-row"
      data-order-id={order.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <td className="or-date">
        <div>{new Date(order.createdAt).toLocaleDateString('ja-JP')}</div>
        <div className="or-order-id">{order.id}</div>
      </td>
      <td className="or-logo">
        <div className="or-logo-wrap">
          <img src={order.logoThumbUrl} alt="" width={48} height={32} />
          <span>{order.brandName}</span>
        </div>
      </td>
      <td className="or-plan">
        <span className={`or-plan-badge ${order.plan === 'premium' ? 'or-plan-premium' : ''}`}>
          {order.plan === 'premium' ? 'プレミアム' : 'スタンダード'}
        </span>
      </td>
      <td className="or-options">
        {order.options.length > 0
          ? order.options.map(o => OPTION_LABELS[o] || o).join('・')
          : 'なし'}
      </td>
      <td className="or-amount">
        ¥{order.total.toLocaleString()}
      </td>
      <td className="or-receipt">
        <motion.button
          className="or-receipt-btn"
          type="button"
          data-order-id={order.id}
          aria-label="領収書をダウンロード"
          onClick={handleDownloadReceipt}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          領収書
        </motion.button>
      </td>
    </motion.tr>
  )
}

export default function OrdersSection() {
  const { orders, isLoading } = useDashboardStore()

  if (isLoading) {
    return (
      <section className="db-section" aria-labelledby="orders-title">
        <div className="dbs-header">
          <h2 id="orders-title" className="dbs-title">注文履歴</h2>
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
      id="orders"
      aria-labelledby="orders-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="dbs-header">
        <h2 id="orders-title" className="dbs-title">注文履歴</h2>
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="db-empty" id="orders-empty">
          <motion.div
            className="dbe-icon"
            aria-hidden="true"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            📋
          </motion.div>
          <h3 className="dbe-title">注文履歴がありません</h3>
          <p className="dbe-desc">購入が完了すると、ここに表示されます。</p>
        </div>
      )}

      {/* Orders Table */}
      {orders.length > 0 && (
        <div className="orders-table-wrap">
          <table className="orders-table" aria-label="注文履歴">
            <thead>
              <tr>
                <th scope="col">注文日</th>
                <th scope="col">ロゴ</th>
                <th scope="col">プラン</th>
                <th scope="col">オプション</th>
                <th scope="col">金額</th>
                <th scope="col">領収書</th>
              </tr>
            </thead>
            <tbody id="orders-tbody">
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
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
          margin: 0;
        }

        .orders-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table th {
          padding: 12px 20px;
          text-align: left;
          font-size: 0.75rem;
          font-weight: 700;
          color: #9A9A9A;
          background: #F2F0EB;
          border-bottom: 1px solid #E0DDD6;
          white-space: nowrap;
        }

        .order-row td {
          padding: 16px 20px;
          border-bottom: 1px solid #E0DDD6;
          vertical-align: middle;
        }

        .order-row:last-child td {
          border-bottom: none;
        }

        .order-row:hover td {
          background: rgba(26, 58, 42, 0.02);
        }

        .or-date div:first-child {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1A1A1A;
        }

        .or-order-id {
          font-size: 0.6rem;
          color: #9A9A9A;
          font-family: monospace;
          margin-top: 2px;
        }

        .or-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .or-logo-wrap img {
          border: 1px solid #E0DDD6;
          border-radius: 0.5rem;
          object-fit: contain;
          padding: 3px;
          background: white;
        }

        .or-logo-wrap span {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1A1A1A;
        }

        .or-plan-badge {
          font-size: 0.6rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
          background: #F2F0EB;
          color: #9A9A9A;
          border: 1px solid #E0DDD6;
          white-space: nowrap;
        }

        .or-plan-premium {
          background: rgba(201, 150, 58, 0.1);
          color: #C9963A;
          border-color: rgba(201, 150, 58, 0.3);
        }

        .or-options {
          font-size: 0.75rem;
          color: #9A9A9A;
          max-width: 200px;
        }

        .or-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.875rem;
          font-weight: 700;
          color: #1A1A1A;
          white-space: nowrap;
        }

        .or-receipt-btn {
          padding: 6px 14px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #1A3A2A;
          background: none;
          border: 1px solid #1A3A2A;
          border-radius: 9999px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .or-receipt-btn:hover {
          background: #1A3A2A;
          color: white;
        }
      `}</style>
    </motion.section>
  )
}
