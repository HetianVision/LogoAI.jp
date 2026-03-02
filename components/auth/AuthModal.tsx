'use client'

import { useState, FormEvent, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from './auth-modal'

// Password strength calculator
function calculatePasswordStrength(password: string): { level: 'weak' | 'fair' | 'strong' | ''; label: string } {
  if (password.length === 0) return { level: '', label: '' }
  if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return { level: 'weak', label: '弱い' }
  }
  if (password.length < 12) {
    return { level: 'fair', label: '普通' }
  }
  return { level: 'strong', label: '強い' }
}

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
  const [passwordStrength, setPasswordStrength] = useState<{ level: 'weak' | 'fair' | 'strong' | ''; label: string }>({ level: '', label: '' })

  // Reset form when modal closes or mode changes
  useEffect(() => {
    if (!isOpen) {
      setEmail('')
      setPassword('')
      setPasswordStrength({ level: '', label: '' })
      clearMessages()
    }
  }, [isOpen, mode, clearMessages])

  // Password strength calculation
  useEffect(() => {
    if (mode === 'register') {
      setPasswordStrength(calculatePasswordStrength(password))
    }
  }, [password, mode])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const getTitle = () => {
    switch (mode) {
      case 'login':
        return 'おかえりなさい'
      case 'register':
        return 'アカウント作成'
      case 'reset-password':
        return 'パスワードをリセット'
    }
  }

  const getDescription = () => {
    switch (mode) {
      case 'login':
        return 'ログインして購入済みロゴを管理しましょう。'
      case 'register':
        return '30秒で登録完了。購入済みロゴと著作権証明書を管理できます。'
      case 'reset-password':
        return '登録したメールアドレスを入力してください。パスワード再設定用のリンクをお送りします。'
    }
  }

  const getSubmitText = () => {
    if (isLoading) return '処理中...'
    switch (mode) {
      case 'login':
        return 'ログイン'
      case 'register':
        return 'アカウントを作成する'
      case 'reset-password':
        return 'リセットメールを送信'
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="auth-modal">
        <div className="am-overlay" onClick={closeModal} />
        <div className="am-content">
            {/* Close button */}
            <button
              type="button"
              className="am-close"
              onClick={closeModal}
              aria-label="閉じる"
            >
              ✕
            </button>

            

            {/* Login Panel */}
            {mode === 'login' && (
                <motion.div
                  key="login-panel"
                  className="am-panel p-6 sm:p-8 px-6 sm:px-12"
                  role="tabpanel"
                  aria-labelledby="tab-login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
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

                  <form className="am-form" onSubmit={handleSubmit} noValidate>
                    {/* Email Field */}
                    <div className="form-field">
                      <label htmlFor="login-email" className="field-label">
                        メールアドレス
                        <span className="field-required" aria-label="必須">必須</span>
                      </label>
                      <input
                        type="email"
                        id="login-email"
                        name="email"
                        className="field-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="例）yamamoto@example.com"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="form-field">
                      <label htmlFor="login-password" className="field-label">
                        パスワード
                        <span className="field-required" aria-label="必須">必須</span>
                      </label>
                      <div className="password-wrap">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="login-password"
                          name="password"
                          className="field-input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          placeholder="パスワードを入力"
                        />
                        <button
                          type="button"
                          className="pw-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
                        >
                          {showPassword ? '👁' : '👁‍🗨'}
                        </button>
                      </div>
                      <div className="field-footer">
                        <button
                          type="button"
                          className="field-link-btn"
                          onClick={() => setMode('reset-password')}
                        >
                          パスワードをお忘れの方
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-auth-submit"
                      disabled={isLoading}
                    >
                      {getSubmitText()}
                    </button>
                  </form>

                  <div className="am-switch">
                    アカウントをお持ちでない方は
                    <button type="button" className="am-switch-btn" onClick={() => setMode('register')}>
                      新規登録
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Register Panel */}
              {mode === 'register' && (
                <motion.div
                  key="register-panel"
                  className="am-panel p-6 sm:p-8 px-6 sm:px-12"
                  role="tabpanel"
                  aria-labelledby="tab-register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="am-title">{getTitle()}</h2>
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

                  <form className="am-form" onSubmit={handleSubmit} noValidate>
                    {/* Email Field */}
                    <div className="form-field">
                      <label htmlFor="reg-email" className="field-label">
                        メールアドレス
                        <span className="field-required" aria-label="必須">必須</span>
                      </label>
                      <input
                        type="email"
                        id="reg-email"
                        name="email"
                        className="field-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="例）yamamoto@example.com"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="form-field">
                      <label htmlFor="reg-password" className="field-label">
                        パスワード
                        <span className="field-required" aria-label="必須">必須</span>
                      </label>
                      <div className="password-wrap">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="reg-password"
                          name="password"
                          className="field-input"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                          minLength={8}
                          autoComplete="new-password"
                          placeholder="8文字以上"
                          aria-describedby="reg-pw-hint"
                        />
                        <button
                          type="button"
                          className="pw-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
                        >
                          {showPassword ? '👁' : '👁‍🗨'}
                        </button>
                      </div>
                      <span id="reg-pw-hint" className="field-hint">
                        8文字以上、英字と数字を含めてください
                      </span>
                    </div>

                    {/* Password Strength Indicator */}
                    {mode === 'register' && (
                      <div className="pw-strength" aria-live="polite">
                        <div className="pws-bar">
                          <div className={`pws-fill ${passwordStrength.level}`} />
                        </div>
                        <span className="pws-label">{passwordStrength.label}</span>
                      </div>
                    )}

                    <p className="am-terms-note">
                      登録することで
                      <a href="/terms" target="_blank" rel="noopener">利用規約</a>
                      ・
                      <a href="/privacy" target="_blank" rel="noopener">プライバシーポリシー</a>
                      に同意したものとみなします。
                    </p>

                    <button
                      type="submit"
                      className="btn-auth-submit"
                      disabled={isLoading}
                    >
                      {getSubmitText()}
                    </button>
                  </form>

                  <div className="am-switch">
                    すでにアカウントをお持ちの方は
                    <button type="button" className="am-switch-btn" onClick={() => setMode('login')}>
                      ログイン
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Reset Password Panel */}
              {mode === 'reset-password' && (
                <motion.div
                  key="reset-panel"
                  className="am-panel p-6 sm:p-8 px-6 sm:px-12"
                  role="tabpanel"
                  aria-labelledby="tab-login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    className="am-back-btn"
                    onClick={() => setMode('login')}
                  >
                    ← ログインに戻る
                  </button>

                  <h2 className="am-title">{getTitle()}</h2>
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
                      ✓ {successMessage}
                      <br />届かない場合は迷惑メールフォルダもご確認ください。
                    </motion.div>
                  )}

                  <form className="am-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-field">
                      <label htmlFor="reset-email" className="field-label">
                        メールアドレス
                        <span className="field-required" aria-label="必須">必須</span>
                      </label>
                      <input
                        type="email"
                        id="reset-email"
                        name="email"
                        className="field-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="登録したメールアドレス"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-auth-submit"
                      disabled={isLoading}
                    >
                      {getSubmitText()}
                    </button>
                  </form>
                </motion.div>
              )}
          </div>

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
              position: fixed;
              inset: 0;
              z-index: 500;
              background: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(4px);
            }

            .am-content {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 501;
              background: white;
              border-radius: 1rem;
              width: min(92vw, 440px);
              max-height: 92vh;
              overflow-y: auto;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }

            @keyframes modalIn {
              from { opacity: 0; transform: translate(-50%, -47%); }
              to { opacity: 1; transform: translate(-50%, -50%); }
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
              transition: all 0.15s;
              z-index: 1;
            }

            .am-close:hover {
              background: #E0DDD6;
            }

            .am-tabs {
              display: flex;
            }

            .am-tab {
              flex: 1;
              padding: 16px;
              background: none;
              border: none;
              border-bottom: 2px solid transparent;
              margin-bottom: -2px;
              font-family: inherit;
              font-size: 0.875rem;
              font-weight: 600;
              color: #9A9A9A;
              cursor: pointer;
              transition: all 0.2s;
            }

            .am-tab:hover {
              color: #1A1A1A;
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
              margin: 0 0 6px;
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
              gap: 18px;
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
              border-color: #1A3A2A;
              box-shadow: 0 0 0 3px rgba(26, 58, 42, 0.1);
            }

            .field-input::placeholder {
              color: #9A9A9A;
            }

            .field-hint {
              font-size: 0.75rem;
              color: #9A9A9A;
              margin-top: 4px;
            }

            .field-footer {
              display: flex;
              justify-content: flex-end;
              margin-top: 4px;
            }

            .password-wrap {
              position: relative;
              width: 100%;
              box-sizing: border-box;
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
              opacity: 0.4;
              transition: opacity 0.2s;
              padding: 4px;
            }

            .pw-toggle:hover {
              opacity: 1;
            }

            /* Password Strength */
            .pw-strength {
              display: flex;
              align-items: center;
              gap: 10px;
            }

            .pws-bar {
              flex: 1;
              height: 4px;
              background: #E0DDD6;
              border-radius: 9999px;
              overflow: hidden;
            }

            .pws-fill {
              height: 100%;
              border-radius: 9999px;
              transition: width 0.3s ease, background 0.3s ease;
              width: 0%;
            }

            .pws-fill.weak {
              width: 33%;
              background: #C41E3A;
            }

            .pws-fill.fair {
              width: 66%;
              background: #C9963A;
            }

            .pws-fill.strong {
              width: 100%;
              background: #2D7A4F;
            }

            .pws-label {
              font-size: 0.75rem;
              font-weight: 600;
              color: #9A9A9A;
              white-space: nowrap;
              min-width: 40px;
            }

            /* Error & Success Messages */
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
              padding: 12px 14px;
              background: rgba(45, 122, 79, 0.06);
              border: 1px solid rgba(45, 122, 79, 0.2);
              border-radius: 0.75rem;
              font-size: 0.875rem;
              color: #2D7A4F;
              font-weight: 600;
              line-height: 1.6;
            }

            .am-terms-note {
              font-size: 0.75rem;
              color: #9A9A9A;
              line-height: 1.6;
              margin: 0;
            }

            .am-terms-note a {
              color: #1A3A2A;
              text-decoration: none;
            }

            .am-terms-note a:hover {
              text-decoration: underline;
            }

            /* Submit Button */
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
              position: relative;
            }

            .btn-auth-submit:hover:not(:disabled) {
              background: #2D5A3D;
            }

            .btn-auth-submit:disabled {
              background: #E0DDD6;
              color: #9A9A9A;
              cursor: not-allowed;
            }

            .btn-auth-submit.loading::after {
              content: '';
              position: absolute;
              right: 16px;
              top: 50%;
              transform: translateY(-50%);
              width: 16px;
              height: 16px;
              border: 2px solid rgba(255, 255, 255, 0.4);
              border-top-color: white;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
            }

            @keyframes spin {
              to { transform: translateY(-50%) rotate(360deg); }
            }

            /* Tab Switch */
            .am-switch {
              margin-top: 16px;
              text-align: center;
              font-size: 0.875rem;
              color: #9A9A9A;
            }

            .am-switch-btn {
              background: none;
              border: none;
              font-family: inherit;
              font-size: 0.875rem;
              font-weight: 700;
              color: #1A3A2A;
              cursor: pointer;
              padding: 0;
              text-decoration: underline;
            }

            /* Back Button */
            .am-back-btn {
              background: none;
              border: none;
              font-family: inherit;
              font-size: 0.875rem;
              font-weight: 600;
              color: #9A9A9A;
              cursor: pointer;
              padding: 0;
              margin-bottom: 20px;
              display: block;
              transition: color 0.15s;
            }

            .am-back-btn:hover {
              color: #1A3A2A;
            }

            /* Password Link Button */
            .field-link-btn {
              background: none;
              border: none;
              font-family: inherit;
              font-size: 0.75rem;
              color: #1A3A2A;
              cursor: pointer;
              padding: 0;
              text-decoration: none;
            }

            .field-link-btn:hover {
              text-decoration: underline;
            }
          `}</style>
        </div>
      </>
  )
}
