'use client'

import { useState, FormEvent, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from './auth-modal'

export default function AuthModal() {
  const {
    isOpen,
    mode,
    isLoading,
    error,
    successMessage,
    closeModal,
    setMode,
    login,
    register,
    resetPassword,
    clearMessages
  } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Reset form when modal closes or mode changes
  useEffect(() => {
    if (!isOpen) {
      setEmail('')
      setPassword('')
      clearMessages()
    }
  }, [isOpen, mode, clearMessages])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (mode === 'login') {
        await login(email, password)
      } else if (mode === 'register') {
        await register(email, password)
      } else if (mode === 'reset-password') {
        await resetPassword(email)
      }
    } catch {
      // Error is handled by the store
    }
  }

  const getTitle = () => {
    switch (mode) {
      case 'login':
        return 'ログインして購入を続ける'
      case 'register':
        return '新規登録'
      case 'reset-password':
        return 'パスワードをリセット'
    }
  }

  const getDescription = () => {
    switch (mode) {
      case 'login':
        return '著作権証明書の送付先メールアドレスの確認のため、ログインが必要です。'
      case 'register':
        return 'アカウントを作成して、ロゴを購入・管理しましょう。'
      case 'reset-password':
        return '登録したメールアドレスを入力してください。パスワードリセット手順を送信します。'
    }
  }

  const getSubmitText = () => {
    if (isLoading) return '処理中...'
    switch (mode) {
      case 'login':
        return 'ログイン'
      case 'register':
        return '新規登録'
      case 'reset-password':
        return 'リセットメールを送信'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          hidden={false}
        >
          <motion.div
            className="am-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          <motion.div
            className="am-content"
            initial={{ opacity: 0, scale: 0.95, y: '-48%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {/* Close button */}
            <button
              type="button"
              className="am-close"
              onClick={closeModal}
              aria-label="閉じる"
            >
              ✕
            </button>

            {/* Tabs */}
            <div className="am-tabs" role="tablist">
              <button
                type="button"
                className={`am-tab ${mode === 'login' ? 'am-tab-active' : ''}`}
                role="tab"
                aria-selected={mode === 'login'}
                aria-controls="am-login"
                id="tab-login"
                onClick={() => setMode('login')}
              >
                ログイン
              </button>
              <button
                type="button"
                className={`am-tab ${mode === 'register' ? 'am-tab-active' : ''}`}
                role="tab"
                aria-selected={mode === 'register'}
                aria-controls="am-register"
                id="tab-register"
                onClick={() => setMode('register')}
              >
                新規登録
              </button>
            </div>

            {/* Form Panel */}
            <div className="am-panel" role="tabpanel" aria-labelledby={`tab-${mode}`}>
              <h2 id="auth-modal-title" className="am-title">
                {getTitle()}
              </h2>
              <p className="am-desc">{getDescription()}</p>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="am-form-error"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Success Message */}
              {successMessage && (
                <motion.div
                  className="am-form-success"
                  role="status"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {successMessage}
                </motion.div>
              )}

              <form className="am-form" onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <div className="form-field">
                  <label htmlFor="auth-email" className="field-label">
                    メールアドレス
                    <span className="field-required">必須</span>
                  </label>
                  <input
                    type="email"
                    id="auth-email"
                    name="email"
                    className="field-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="例）yamamoto@example.com"
                  />
                </div>

                {/* Password Field (not shown for reset password) */}
                {mode !== 'reset-password' && (
                  <div className="form-field">
                    <label htmlFor="auth-password" className="field-label">
                      パスワード
                      <span className="field-required">必須</span>
                    </label>
                    <div className="password-wrap">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="auth-password"
                        name="password"
                        className="field-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="pw-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                      >
                        {showPassword ? '👁' : '👁‍🗨'}
                      </button>
                    </div>
                    {mode === 'login' && (
                      <button
                        type="button"
                        className="field-link"
                        onClick={() => setMode('reset-password')}
                        style={{ marginTop: '8px', display: 'inline-block' }}
                      >
                        パスワードをお忘れですか？
                      </button>
                    )}
                  </div>
                )}

                {/* Register: Back to login link */}
                {mode === 'reset-password' && (
                  <button
                    type="button"
                    className="field-link"
                    onClick={() => setMode('login')}
                    style={{ marginBottom: '16px', display: 'inline-block' }}
                  >
                    ← ログイン画面に戻る
                  </button>
                )}

                {/* Register: Terms note */}
                {mode === 'register' && (
                  <p className="am-terms-note">
                    登録することで、
                    <a href="/terms">利用規約</a>と
                    <a href="/privacy">プライバシーポリシー</a>に同意します。
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-auth-submit"
                  disabled={isLoading}
                >
                  {getSubmitText()}
                </button>
              </form>
            </div>
          </motion.div>

          <style jsx>{`
            .auth-modal {
              position: fixed;
              inset: 0;
              z-index: 500;
            }

            .auth-modal[hidden] {
              display: none;
            }

            .am-overlay {
              position: absolute;
              inset: 0;
              background: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(4px);
            }

            .am-content {
              position: absolute;
              background: white;
              border-radius: 1rem;
              width: min(92vw, 460px);
              max-height: 92vh;
              overflow-y: auto;
            }

            .am-close {
              position: absolute;
              top: 12px;
              right: 12px;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: #F2F0EB;
              border: 1px solid #E0DDD6;
              cursor: pointer;
              font-size: 0.875rem;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #5A5A5A;
              transition: all 0.2s;
              z-index: 10;
            }

            .am-close:hover {
              background: #E0DDD6;
            }

            .am-tabs {
              display: flex;
              border-bottom: 2px solid #E0DDD6;
            }

            .am-tab {
              flex: 1;
              padding: 16px;
              background: none;
              border: none;
              font-family: inherit;
              font-size: 0.875rem;
              font-weight: 600;
              color: #9A9A9A;
              cursor: pointer;
              border-bottom: 2px solid transparent;
              margin-bottom: -2px;
              transition: all 0.2s;
            }

            .am-tab-active {
              color: #1A3A2A;
              border-bottom-color: #1A3A2A;
            }

            .am-panel {
              padding: 28px 28px 24px;
            }

            .am-title {
              font-family: 'Noto Serif JP', Yu Mincho, serif;
              font-size: 1.25rem;
              font-weight: 700;
              color: #1A1A1A;
              margin: 0 0 8px;
            }

            .am-desc {
              font-size: 0.875rem;
              color: #5A5A5A;
              line-height: 1.6;
              margin: 0 0 24px;
            }

            .am-form {
              display: flex;
              flex-direction: column;
              gap: 20px;
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

            .field-input::placeholder {
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

            .field-link {
              font-size: 0.75rem;
              color: #1A3A2A;
              text-decoration: none;
              background: none;
              border: none;
              cursor: pointer;
              padding: 0;
            }

            .field-link:hover {
              text-decoration: underline;
            }

            .am-form-error {
              padding: 10px 14px;
              background: rgba(196, 30, 58, 0.06);
              border: 1px solid rgba(196, 30, 58, 0.2);
              border-radius: 0.75rem;
              font-size: 0.875rem;
              color: #C41E3A;
              font-weight: 600;
            }

            .am-form-success {
              padding: 10px 14px;
              background: rgba(45, 122, 79, 0.06);
              border: 1px solid rgba(45, 122, 79, 0.2);
              border-radius: 0.75rem;
              font-size: 0.875rem;
              color: #2D7A4F;
              font-weight: 600;
            }

            .am-terms-note {
              font-size: 0.75rem;
              color: #9A9A9A;
              line-height: 1.6;
              margin: 0;
            }

            .am-terms-note a {
              color: #1A3A2A;
            }

            .btn-auth-submit {
              width: 100%;
              padding: 15px;
              background: #1A3A2A;
              color: white;
              font-family: inherit;
              font-size: 1rem;
              font-weight: 700;
              border: none;
              border-radius: 9999px;
              cursor: pointer;
              transition: all 0.2s;
            }

            .btn-auth-submit:hover:not(:disabled) {
              background: #2D5A3D;
            }

            .btn-auth-submit:disabled {
              background: #E0DDD6;
              color: #9A9A9A;
              cursor: not-allowed;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
