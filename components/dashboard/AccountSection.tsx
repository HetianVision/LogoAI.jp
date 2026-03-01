'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../auth/auth-modal'
import DeleteAccountModal from './DeleteAccountModal'

export default function AccountSection() {
  const { user } = useAuthStore()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Email form state
  const [email, setEmail] = useState(user?.email || 'yamamoto@example.com')
  const [emailError, setEmailError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setEmailSuccess(false)
    setEmailLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!email) {
        setEmailError('メールアドレスを入力してください')
        return
      }

      setEmailSuccess(true)
    } catch {
      setEmailError('変更に失敗しました')
    } finally {
      setEmailLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess(false)
    setPasswordLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!currentPassword) {
        setPasswordError('現在のパスワードを入力してください')
        return
      }

      if (!newPassword) {
        setPasswordError('新しいパスワードを入力してください')
        return
      }

      if (newPassword.length < 8) {
        setPasswordError('新しいパスワードは8文字以上必要です')
        return
      }

      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
    } catch {
      setPasswordError('変更に失敗しました')
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <motion.section
      className="db-section"
      id="account"
      aria-labelledby="account-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="dbs-header">
        <h2 id="account-title" className="dbs-title">アカウント設定</h2>
      </div>

      <div className="account-sections">
        {/* Email Change */}
        <motion.div
          className="account-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="ab-title">メールアドレス</h3>
          <form className="ab-form" id="email-form" onSubmit={handleEmailSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="new-email" className="field-label">
                新しいメールアドレス
              </label>
              <input
                type="email"
                id="new-email"
                name="email"
                className="field-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            {emailError && (
              <div className="ab-form-error" role="alert">{emailError}</div>
            )}
            {emailSuccess && (
              <div className="ab-form-success" role="status">
                ✓ 確認メールを送信しました。メールのリンクをクリックして変更を完了してください。
              </div>
            )}
            <motion.button
              type="submit"
              className="btn-ab-save"
              id="btn-save-email"
              disabled={emailLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {emailLoading ? '送信中...' : '変更メールを送信'}
            </motion.button>
          </form>
        </motion.div>

        <div className="account-divider" aria-hidden="true" />

        {/* Password Change */}
        <motion.div
          className="account-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="ab-title">パスワード変更</h3>
          <form className="ab-form" id="password-form" onSubmit={handlePasswordSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="current-password" className="field-label">
                現在のパスワード
                <span className="field-required">必須</span>
              </label>
              <div className="password-wrap">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="current-password"
                  name="currentPassword"
                  className="field-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="pw-toggle"
                  aria-label={showCurrentPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? '👁' : '👁‍🗨'}
                </button>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="new-password" className="field-label">
                新しいパスワード
                <span className="field-required">必須</span>
              </label>
              <div className="password-wrap">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="new-password"
                  name="newPassword"
                  className="field-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  aria-describedby="new-pw-hint"
                />
                <button
                  type="button"
                  className="pw-toggle"
                  aria-label={showNewPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? '👁' : '👁‍🗨'}
                </button>
              </div>
              <span id="new-pw-hint" className="field-hint">
                8文字以上、英字と数字を含めてください
              </span>
            </div>
            {passwordError && (
              <div className="ab-form-error" role="alert">{passwordError}</div>
            )}
            {passwordSuccess && (
              <div className="ab-form-success" role="status">
                ✓ パスワードを変更しました
              </div>
            )}
            <motion.button
              type="submit"
              className="btn-ab-save"
              id="btn-save-password"
              disabled={passwordLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {passwordLoading ? '変更中...' : 'パスワードを変更する'}
            </motion.button>
          </form>
        </motion.div>

        <div className="account-divider" aria-hidden="true" />

        {/* Delete Account */}
        <motion.div
          className="account-block account-block-danger"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="ab-title ab-title-danger">アカウント削除</h3>
          <p className="ab-danger-desc">
            アカウントを削除すると、購入済みロゴデータ・著作権証明書へのアクセスが失われます。
            この操作は取り消せません。
          </p>
          <motion.button
            type="button"
            className="btn-ab-danger"
            id="btn-delete-account"
            onClick={() => setShowDeleteModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            アカウントを削除する
          </motion.button>
        </motion.div>
      </div>

      {/* Delete Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />

      <style jsx>{`
        .account-sections {
          padding: 8px 0;
        }

        .account-block {
          padding: 28px 28px;
        }

        .ab-title {
          font-family: 'Noto Serif JP', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #1A1A1A;
          margin: 0 0 18px;
        }

        .ab-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 440px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1A1A1A;
        }

        .field-required {
          color: #C41E3A;
          font-size: 0.75rem;
          margin-left: 6px;
        }

        .field-input {
          padding: 12px 16px;
          font-size: 1rem;
          border: 1.5px solid #E0DDD6;
          border-radius: 0.75rem;
          background: white;
          color: #1A1A1A;
          font-family: inherit;
          transition: all 0.2s;
        }

        .field-input:focus {
          outline: none;
          border-color: #1A3A2A;
          box-shadow: 0 0 0 3px rgba(26, 58, 42, 0.1);
        }

        .field-hint {
          font-size: 0.75rem;
          color: #9A9A9A;
        }

        .password-wrap {
          position: relative;
        }

        .password-wrap .field-input {
          padding-right: 44px;
        }

        .pw-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .pw-toggle:hover {
          opacity: 1;
        }

        .ab-form-error {
          padding: 10px 14px;
          background: rgba(196, 30, 58, 0.06);
          border: 1px solid rgba(196, 30, 58, 0.2);
          border-radius: 0.75rem;
          font-size: 0.875rem;
          color: #C41E3A;
        }

        .ab-form-success {
          padding: 10px 14px;
          background: rgba(45, 122, 79, 0.06);
          border: 1px solid rgba(45, 122, 79, 0.2);
          border-radius: 0.75rem;
          font-size: 0.875rem;
          color: #2D7A4F;
          font-weight: 600;
        }

        .btn-ab-save {
          padding: 12px 24px;
          background: #1A3A2A;
          color: white;
          font-family: inherit;
          font-size: 0.875rem;
          font-weight: 700;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s;
          align-self: flex-start;
        }

        .btn-ab-save:hover:not(:disabled) {
          background: #2D5A3D;
        }

        .btn-ab-save:disabled {
          background: #E0DDD6;
          color: #9A9A9A;
          cursor: not-allowed;
        }

        .account-divider {
          height: 1px;
          background: #E0DDD6;
          margin: 0 28px;
        }

        .account-block-danger {
          background: rgba(196, 30, 58, 0.02);
        }

        .ab-title-danger {
          color: #C41E3A;
        }

        .ab-danger-desc {
          font-size: 0.875rem;
          color: #5A5A5A;
          line-height: 1.6;
          margin: 0 0 16px;
          max-width: 480px;
        }

        .btn-ab-danger {
          padding: 10px 20px;
          background: none;
          color: #C41E3A;
          font-family: inherit;
          font-size: 0.875rem;
          font-weight: 700;
          border: 1.5px solid #C41E3A;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-ab-danger:hover {
          background: #C41E3A;
          color: white;
        }
      `}</style>
    </motion.section>
  )
}
