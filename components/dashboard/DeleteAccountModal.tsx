'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setConfirmText('')
    }
  }, [isOpen])

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // In real implementation, this would call the delete API
      alert('アカウントを削除しました')
      window.location.href = '/?deleted=1'
    } catch {
      alert('削除に失敗しました')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleOverlayClick = () => {
    if (!isDeleting) {
      onClose()
    }
  }

  const isDisabled = confirmText !== '削除する'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="delete-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          hidden={false}
        >
          <motion.div
            className="dm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          />

          <motion.div
            className="dm-content"
            initial={{ opacity: 0, scale: 0.95, y: '-48%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <h2 id="delete-modal-title" className="dm-title">
              アカウントを削除しますか？
            </h2>
            <p className="dm-desc">
              以下のデータが完全に削除されます。この操作は取り消せません。
            </p>
            <ul className="dm-list">
              <li>購入済みロゴデータ（SVG・PNG・PDF）</li>
              <li>著作権帰属証明書</li>
              <li>注文履歴</li>
              <li>アカウント情報</li>
            </ul>
            <p className="dm-confirm-label">
              確認のため「削除する」と入力してください
            </p>
            <input
              type="text"
              id="delete-confirm-input"
              className="field-input"
              placeholder="削除する"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoComplete="off"
              disabled={isDeleting}
            />
            <div className="dm-actions">
              <motion.button
                type="button"
                className="btn-dm-cancel"
                id="btn-dm-cancel"
                onClick={onClose}
                disabled={isDeleting}
                whileHover={!isDeleting ? { scale: 1.02 } : {}}
                whileTap={!isDeleting ? { scale: 0.98 } : {}}
              >
                キャンセル
              </motion.button>
              <motion.button
                type="button"
                className="btn-dm-delete"
                id="btn-dm-delete"
                onClick={handleDelete}
                disabled={isDisabled || isDeleting}
                whileHover={!isDisabled && !isDeleting ? { scale: 1.02 } : {}}
                whileTap={!isDisabled && !isDeleting ? { scale: 0.98 } : {}}
              >
                {isDeleting ? '削除中...' : '完全に削除する'}
              </motion.button>
            </div>
          </motion.div>

          <style jsx>{`
            .delete-modal {
              position: fixed;
              inset: 0;
              z-index: 500;
            }

            .delete-modal[hidden] {
              display: none;
            }

            .dm-overlay {
              position: absolute;
              inset: 0;
              background: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(4px);
            }

            .dm-content {
              position: absolute;
              background: white;
              border-radius: 1rem;
              width: min(92vw, 460px);
              padding: 32px;
            }

            .dm-title {
              font-family: 'Noto Serif JP', serif;
              font-size: 1.25rem;
              font-weight: 700;
              color: #C41E3A;
              margin: 0 0 12px;
            }

            .dm-desc {
              font-size: 0.875rem;
              color: #5A5A5A;
              margin: 0 0 16px;
            }

            .dm-list {
              padding-left: 18px;
              margin: 0 0 20px;
              display: flex;
              flex-direction: column;
              gap: 6px;
            }

            .dm-list li {
              font-size: 0.875rem;
              color: #5A5A5A;
            }

            .dm-confirm-label {
              font-size: 0.75rem;
              font-weight: 700;
              color: #5A5A5A;
              margin: 0 0 8px;
            }

            .field-input {
              width: 100%;
              padding: 12px 16px;
              font-size: 1rem;
              border: 1.5px solid #E0DDD6;
              border-radius: 0.75rem;
              background: white;
              color: #1A1A1A;
              font-family: inherit;
              transition: all 0.2s;
              box-sizing: border-box;
            }

            .field-input:focus {
              outline: none;
              border-color: #C41E3A;
              box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
            }

            .field-input:disabled {
              background: #F2F0EB;
              cursor: not-allowed;
            }

            .dm-actions {
              display: flex;
              gap: 10px;
              margin-top: 20px;
            }

            .btn-dm-cancel {
              flex: 1;
              padding: 12px;
              background: #F2F0EB;
              border: 1px solid #E0DDD6;
              border-radius: 9999px;
              font-family: inherit;
              font-size: 0.875rem;
              font-weight: 600;
              color: #5A5A5A;
              cursor: pointer;
              transition: all 0.2s;
            }

            .btn-dm-cancel:hover:not(:disabled) {
              background: #E0DDD6;
            }

            .btn-dm-cancel:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }

            .btn-dm-delete {
              flex: 1;
              padding: 12px;
              background: #C41E3A;
              border: none;
              border-radius: 9999px;
              font-family: inherit;
              font-size: 0.875rem;
              font-weight: 700;
              color: white;
              cursor: pointer;
              transition: all 0.2s;
            }

            .btn-dm-delete:disabled {
              background: #E0DDD6;
              color: #9A9A9A;
              cursor: not-allowed;
            }

            .btn-dm-delete:hover:not(:disabled) {
              background: #A01830;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
