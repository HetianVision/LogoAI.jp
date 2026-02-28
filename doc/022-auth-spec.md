# 認証システム開発規格書 `AuthModal`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：`homepage-spec.md`（设计系统）
> **页面类型**：認証モーダル・全サイト共通コンポーネント
> **核心设计原则**：
>   1. 登録・ログインは全てモーダルで完結、ページ遷移しない
>   2. どのページから呼び出されても、完了後は元のページ・操作に戻る
>   3. Navbar の認証状態表示と連動する

---

## 1. AuthModal が呼び出される場面

| 場面 | トリガー | 成功後の動作 |
|---|---|---|
| Navbar「ログイン」ボタン | クリック | モーダルを閉じる・Navbarを更新 |
| `/dashboard` 未ログイン訪問 | ページロード時 | `location.reload()` でダッシュボードを表示 |
| `/checkout` Step1「次へ」 | 未ログイン状態でクリック | Step3（お支払い）へ進む |
| ロゴ生成結果のダウンロード | 未ログイン状態でクリック | ダウンロード処理を再開 |

---

## 2. Navbar 認証状態表示

### 2.1 未ログイン状態

```html
<div class="nav-auth" id="nav-auth">
  <a href="/create" class="btn-nav-cta">
    無料で試す
  </a>
  <button class="btn-nav-login" type="button"
          id="btn-nav-login"
          aria-label="ログイン">
    ログイン
  </button>
</div>
```

### 2.2 ログイン済み状態

```html
<div class="nav-auth nav-auth-loggedin" id="nav-auth">
  <a href="/create" class="btn-nav-cta">
    新しいロゴを作る
  </a>
  <!-- ユーザーメニュー -->
  <div class="nav-user-menu" id="nav-user-menu">
    <button class="num-trigger" type="button"
            aria-expanded="false"
            aria-controls="num-dropdown"
            aria-label="マイメニュー">
      <div class="num-avatar" aria-hidden="true">
        {{ user.email[0].toUpperCase() }}
      </div>
    </button>
    <div class="num-dropdown" id="num-dropdown" hidden>
      <div class="num-email">{{ user.email }}</div>
      <a href="/dashboard" class="num-link">
        <span aria-hidden="true">🖼️</span> マイページ
      </a>
      <a href="/dashboard#orders" class="num-link">
        <span aria-hidden="true">📋</span> 注文履歴
      </a>
      <a href="/dashboard#account" class="num-link">
        <span aria-hidden="true">⚙️</span> アカウント設定
      </a>
      <button class="num-logout" type="button" id="btn-nav-logout">
        ログアウト
      </button>
    </div>
  </div>
</div>
```

```css
/* 未ログイン */
.btn-nav-login {
  padding: 8px 18px;
  background: none;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-nav-login:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* ユーザーメニュー */
.nav-user-menu { position: relative; }

.num-trigger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
}

.num-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s;
}

.num-trigger:hover .num-avatar {
  box-shadow: 0 0 0 3px rgba(26,58,42,0.15);
}

/* ドロップダウン */
.num-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  overflow: hidden;
  z-index: 200;
  animation: dropdownIn 0.15s ease;
}

@keyframes dropdownIn {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.num-email {
  padding: 12px 16px 8px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
  word-break: break-all;
}

.num-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.15s;
}

.num-link:hover {
  background: rgba(26,58,42,0.04);
  color: var(--color-primary);
}

.num-logout {
  display: block;
  width: 100%;
  padding: 11px 16px;
  text-align: left;
  background: none;
  border: none;
  border-top: 1px solid var(--color-border);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.num-logout:hover {
  color: #C41E3A;
  background: rgba(196,30,58,0.04);
}
```

---

## 3. AuthModal コンポーネント

### 3.1 HTML

```html
<div class="auth-modal" id="auth-modal"
     role="dialog"
     aria-modal="true"
     aria-labelledby="auth-modal-title"
     hidden>

  <div class="am-overlay" id="am-overlay"></div>

  <div class="am-content">

    <!-- 閉じるボタン -->
    <button class="am-close" type="button"
            id="am-close"
            aria-label="閉じる">✕</button>

    <!-- タブ -->
    <div class="am-tabs" role="tablist"
         aria-label="ログイン・新規登録">
      <button class="am-tab am-tab-active"
              role="tab"
              id="tab-login"
              aria-selected="true"
              aria-controls="am-panel-login">
        ログイン
      </button>
      <button class="am-tab"
              role="tab"
              id="tab-register"
              aria-selected="false"
              aria-controls="am-panel-register">
        新規登録
      </button>
    </div>

    <!-- ログインパネル -->
    <div class="am-panel" id="am-panel-login"
         role="tabpanel"
         aria-labelledby="tab-login">

      <h2 id="auth-modal-title" class="am-title">
        おかえりなさい
      </h2>
      <p class="am-desc">
        ログインして購入済みロゴを管理しましょう。
      </p>

      <form class="am-form" id="login-form" novalidate>

        <div class="form-field">
          <label for="login-email" class="field-label">
            メールアドレス
            <span class="field-required" aria-label="必須">必須</span>
          </label>
          <input type="email" id="login-email" name="email"
                 class="field-input"
                 placeholder="例）yamamoto@example.com"
                 required
                 autocomplete="email">
        </div>

        <div class="form-field">
          <label for="login-password" class="field-label">
            パスワード
            <span class="field-required" aria-label="必須">必須</span>
          </label>
          <div class="password-wrap">
            <input type="password" id="login-password" name="password"
                   class="field-input"
                   placeholder="パスワードを入力"
                   required
                   autocomplete="current-password">
            <button type="button" class="pw-toggle"
                    aria-label="パスワードを表示/非表示">👁</button>
          </div>
          <div class="field-footer">
            <button type="button" class="field-link-btn"
                    id="btn-forgot-password">
              パスワードをお忘れの方
            </button>
          </div>
        </div>

        <div class="am-form-error" id="login-error"
             role="alert" hidden>
        </div>

        <button type="submit" class="btn-auth-submit"
                id="btn-login">
          ログイン
        </button>

      </form>

      <div class="am-switch">
        アカウントをお持ちでない方は
        <button type="button" class="am-switch-btn"
                id="btn-to-register">
          新規登録
        </button>
      </div>

    </div>

    <!-- 新規登録パネル -->
    <div class="am-panel" id="am-panel-register"
         role="tabpanel"
         aria-labelledby="tab-register"
         hidden>

      <h2 class="am-title">アカウント作成</h2>
      <p class="am-desc">
        30秒で登録完了。購入済みロゴと著作権証明書を管理できます。
      </p>

      <form class="am-form" id="register-form" novalidate>

        <div class="form-field">
          <label for="reg-email" class="field-label">
            メールアドレス
            <span class="field-required" aria-label="必須">必須</span>
          </label>
          <input type="email" id="reg-email" name="email"
                 class="field-input"
                 placeholder="例）yamamoto@example.com"
                 required
                 autocomplete="email">
        </div>

        <div class="form-field">
          <label for="reg-password" class="field-label">
            パスワード
            <span class="field-required" aria-label="必須">必須</span>
          </label>
          <div class="password-wrap">
            <input type="password" id="reg-password" name="password"
                   class="field-input"
                   placeholder="8文字以上"
                   required
                   minlength="8"
                   autocomplete="new-password"
                   aria-describedby="reg-pw-hint">
            <button type="button" class="pw-toggle"
                    aria-label="パスワードを表示/非表示">👁</button>
          </div>
          <span id="reg-pw-hint" class="field-hint">
            8文字以上、英字と数字を含めてください
          </span>
        </div>

        <!-- パスワード強度インジケーター -->
        <div class="pw-strength" id="pw-strength" aria-live="polite">
          <div class="pws-bar">
            <div class="pws-fill" id="pws-fill"></div>
          </div>
          <span class="pws-label" id="pws-label"></span>
        </div>

        <div class="am-form-error" id="register-error"
             role="alert" hidden>
        </div>

        <p class="am-terms-note">
          登録することで
          <a href="/terms" target="_blank" rel="noopener">利用規約</a>・
          <a href="/privacy" target="_blank" rel="noopener">プライバシーポリシー</a>
          に同意したものとみなします。
        </p>

        <button type="submit" class="btn-auth-submit"
                id="btn-register">
          アカウントを作成する
        </button>

      </form>

      <div class="am-switch">
        すでにアカウントをお持ちの方は
        <button type="button" class="am-switch-btn"
                id="btn-to-login">
          ログイン
        </button>
      </div>

    </div>

    <!-- パスワードリセットパネル -->
    <div class="am-panel" id="am-panel-reset"
         role="tabpanel"
         hidden>

      <button type="button" class="am-back-btn"
              id="btn-back-to-login">
        ← ログインに戻る
      </button>

      <h2 class="am-title">パスワードをリセット</h2>
      <p class="am-desc">
        登録したメールアドレスを入力してください。
        パスワード再設定用のリンクをお送りします。
      </p>

      <form class="am-form" id="reset-form" novalidate>

        <div class="form-field">
          <label for="reset-email" class="field-label">
            メールアドレス
            <span class="field-required" aria-label="必須">必須</span>
          </label>
          <input type="email" id="reset-email" name="email"
                 class="field-input"
                 placeholder="登録したメールアドレス"
                 required
                 autocomplete="email">
        </div>

        <div class="am-form-error" id="reset-error"
             role="alert" hidden>
        </div>

        <!-- 送信完了メッセージ -->
        <div class="am-form-success" id="reset-success"
             role="status" hidden>
          ✓ メールを送信しました。受信トレイをご確認ください。
          <br>届かない場合は迷惑メールフォルダもご確認ください。
        </div>

        <button type="submit" class="btn-auth-submit"
                id="btn-reset">
          リセットメールを送信
        </button>

      </form>

    </div>

  </div>
</div>
```

### 3.2 CSS

```css
/* オーバーレイ */
.auth-modal {
  position: fixed;
  inset: 0;
  z-index: 500;
}

.auth-modal[hidden] { display: none; }

.am-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
}

/* モーダル本体 */
.am-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: var(--radius-2xl);
  width: min(92vw, 440px);
  max-height: 92vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  animation: modalIn 0.25s ease;
}

@keyframes modalIn {
  from { opacity: 0; transform: translate(-50%, -47%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}

/* 閉じるボタン */
.am-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  cursor: pointer;
  font-size: var(--text-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.15s;
}

.am-close:hover {
  background: var(--color-border);
}

/* タブ */
.am-tabs {
  display: flex;
  border-bottom: 2px solid var(--color-border);
}

.am-tab {
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.am-tab:hover { color: var(--color-text-primary); }

.am-tab-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

/* パネル */
.am-panel { padding: 28px 28px 24px; }

.am-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 6px;
}

.am-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 24px;
}

/* フォーム */
.am-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* パスワード */
.password-wrap { position: relative; }
.password-wrap .field-input { padding-right: 44px; }

.pw-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--text-base);
  opacity: 0.4;
  transition: opacity 0.2s;
  padding: 4px;
}

.pw-toggle:hover { opacity: 1; }

/* パスワード強度 */
.pw-strength {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pws-bar {
  flex: 1;
  height: 4px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.pws-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.3s ease, background 0.3s ease;
  width: 0%;
}

.pws-fill.weak   { width: 33%; background: #C41E3A; }
.pws-fill.fair   { width: 66%; background: var(--color-accent); }
.pws-fill.strong { width: 100%; background: var(--color-success); }

.pws-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  white-space: nowrap;
  min-width: 40px;
}

/* エラー・成功メッセージ */
.am-form-error {
  padding: 10px 14px;
  background: rgba(196,30,58,0.06);
  border: 1px solid rgba(196,30,58,0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: #C41E3A;
  font-weight: 600;
}

.am-form-success {
  padding: 12px 14px;
  background: rgba(45,122,79,0.06);
  border: 1px solid rgba(45,122,79,0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: var(--color-success);
  font-weight: 600;
  line-height: 1.6;
}

/* 利用規約 */
.am-terms-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}

.am-terms-note a {
  color: var(--color-primary);
  text-decoration: none;
}

/* 送信ボタン */
.btn-auth-submit {
  width: 100%;
  padding: 15px;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.btn-auth-submit:hover { background: var(--color-primary-hover); }

.btn-auth-submit:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

/* ローディングスピナー（送信中） */
.btn-auth-submit.loading::after {
  content: '';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: genSpin 0.8s linear infinite;
}

/* タブ切替テキスト */
.am-switch {
  margin-top: 16px;
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.am-switch-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary);
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

/* パスワードリセット */
.am-back-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  display: block;
  transition: color 0.15s;
}

.am-back-btn:hover { color: var(--color-primary); }

/* パスワードフィールドのリンクボタン */
.field-link-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-primary);
  cursor: pointer;
  padding: 0;
  text-decoration: none;
}

.field-link-btn:hover { text-decoration: underline; }
```

---

## 4. JavaScript（AuthModal 統合管理）

```typescript
// auth-modal.ts
// 全ページ共通で読み込む

interface AuthModalOptions {
  defaultTab?: 'login' | 'register'
  onSuccess?: (user: User) => void
  onClose?: () => void
}

let currentOptions: AuthModalOptions = {}

// --- モーダル表示 ---
export function showAuthModal(options: AuthModalOptions = {}) {
  currentOptions = options
  const modal = document.getElementById('auth-modal')!
  modal.hidden = false

  // タブ初期化
  switchTab(options.defaultTab || 'login')

  // フォーカス管理
  setTimeout(() => {
    const firstInput = modal.querySelector<HTMLInputElement>('input:not([hidden])')
    firstInput?.focus()
  }, 100)

  // スクロール無効化
  document.body.style.overflow = 'hidden'
}

// --- モーダル非表示 ---
export function hideAuthModal() {
  const modal = document.getElementById('auth-modal')!
  modal.hidden = true
  document.body.style.overflow = ''
  clearForms()
  currentOptions.onClose?.()
}

// --- タブ切替 ---
function switchTab(tab: 'login' | 'register') {
  const loginPanel    = document.getElementById('am-panel-login')!
  const registerPanel = document.getElementById('am-panel-register')!
  const resetPanel    = document.getElementById('am-panel-reset')!
  const loginTab      = document.getElementById('tab-login')!
  const registerTab   = document.getElementById('tab-register')!

  // パネル表示切替
  loginPanel.hidden    = tab !== 'login'
  registerPanel.hidden = tab !== 'register'
  resetPanel.hidden    = true

  // タブ状態
  loginTab.classList.toggle('am-tab-active', tab === 'login')
  loginTab.setAttribute('aria-selected', tab === 'login' ? 'true' : 'false')
  registerTab.classList.toggle('am-tab-active', tab === 'register')
  registerTab.setAttribute('aria-selected', tab === 'register' ? 'true' : 'false')
}

// --- ログイン処理 ---
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const form     = e.target as HTMLFormElement
  const errorEl  = document.getElementById('login-error')!
  const submitBtn = document.getElementById('btn-login') as HTMLButtonElement

  if (!form.checkValidity()) {
    errorEl.textContent = '入力内容をご確認ください'
    errorEl.hidden = false
    return
  }

  errorEl.hidden = true
  submitBtn.disabled = true
  submitBtn.classList.add('loading')

  try {
    const email    = (document.getElementById('login-email') as HTMLInputElement).value
    const password = (document.getElementById('login-password') as HTMLInputElement).value

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const err = await res.json()
      errorEl.textContent = err.message || 'メールアドレスまたはパスワードが正しくありません'
      errorEl.hidden = false
      return
    }

    const user = await res.json()
    hideAuthModal()
    updateNavbarAuth(user)
    currentOptions.onSuccess?.(user)

  } finally {
    submitBtn.disabled = false
    submitBtn.classList.remove('loading')
  }
})

// --- 新規登録処理 ---
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const form     = e.target as HTMLFormElement
  const errorEl  = document.getElementById('register-error')!
  const submitBtn = document.getElementById('btn-register') as HTMLButtonElement

  if (!form.checkValidity()) {
    errorEl.textContent = '入力内容をご確認ください'
    errorEl.hidden = false
    return
  }

  errorEl.hidden = true
  submitBtn.disabled = true
  submitBtn.classList.add('loading')

  try {
    const email    = (document.getElementById('reg-email') as HTMLInputElement).value
    const password = (document.getElementById('reg-password') as HTMLInputElement).value

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const err = await res.json()
      errorEl.textContent = err.message || '登録に失敗しました。このメールアドレスはすでに登録済みの可能性があります。'
      errorEl.hidden = false
      return
    }

    const user = await res.json()
    hideAuthModal()
    updateNavbarAuth(user)
    currentOptions.onSuccess?.(user)

  } finally {
    submitBtn.disabled = false
    submitBtn.classList.remove('loading')
  }
})

// --- パスワードリセット ---
document.getElementById('reset-form')?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const errorEl   = document.getElementById('reset-error')!
  const successEl = document.getElementById('reset-success')!
  const submitBtn = document.getElementById('btn-reset') as HTMLButtonElement
  const email     = (document.getElementById('reset-email') as HTMLInputElement).value

  errorEl.hidden = true
  submitBtn.disabled = true
  submitBtn.classList.add('loading')

  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      errorEl.textContent = 'メールの送信に失敗しました。しばらく経ってから再度お試しください。'
      errorEl.hidden = false
      return
    }

    successEl.hidden = false
    submitBtn.textContent = '送信済み'

  } finally {
    submitBtn.disabled = false
    submitBtn.classList.remove('loading')
  }
})

// --- パスワード強度チェック ---
document.getElementById('reg-password')?.addEventListener('input', (e) => {
  const val   = (e.target as HTMLInputElement).value
  const fill  = document.getElementById('pws-fill')!
  const label = document.getElementById('pws-label')!

  fill.className = 'pws-fill'

  if (val.length === 0) {
    label.textContent = ''
  } else if (val.length < 8 || !/[a-zA-Z]/.test(val) || !/[0-9]/.test(val)) {
    fill.classList.add('weak')
    label.textContent = '弱い'
  } else if (val.length < 12) {
    fill.classList.add('fair')
    label.textContent = '普通'
  } else {
    fill.classList.add('strong')
    label.textContent = '強い'
  }
})

// --- パスワード表示切替 ---
document.querySelectorAll('.pw-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap  = btn.closest('.password-wrap')!
    const input = wrap.querySelector<HTMLInputElement>('input')!
    const isHidden = input.type === 'password'
    input.type = isHidden ? 'text' : 'password'
    btn.setAttribute('aria-label',
      isHidden ? 'パスワードを非表示' : 'パスワードを表示/非表示')
  })
})

// --- タブ切替イベント ---
document.getElementById('tab-login')?.addEventListener('click', () => switchTab('login'))
document.getElementById('tab-register')?.addEventListener('click', () => switchTab('register'))
document.getElementById('btn-to-register')?.addEventListener('click', () => switchTab('register'))
document.getElementById('btn-to-login')?.addEventListener('click', () => switchTab('login'))

// --- パスワードリセット切替 ---
document.getElementById('btn-forgot-password')?.addEventListener('click', () => {
  document.getElementById('am-panel-login')!.hidden = true
  document.getElementById('am-panel-reset')!.hidden = false
})

document.getElementById('btn-back-to-login')?.addEventListener('click', () => {
  document.getElementById('am-panel-reset')!.hidden = true
  document.getElementById('am-panel-login')!.hidden = false
})

// --- オーバーレイ・閉じるボタン ---
document.getElementById('am-overlay')?.addEventListener('click', hideAuthModal)
document.getElementById('am-close')?.addEventListener('click', hideAuthModal)

// Escキー
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('auth-modal')!
    if (!modal.hidden) hideAuthModal()
  }
})

// --- Navbarログインボタン ---
document.getElementById('btn-nav-login')?.addEventListener('click', () => {
  showAuthModal({
    defaultTab: 'login',
    onSuccess: (user) => {
      updateNavbarAuth(user)
    },
  })
})

// --- Navbarユーザーメニュードロップダウン ---
document.getElementById('nav-user-menu')?.addEventListener('click', (e) => {
  const trigger = (e.target as HTMLElement).closest('.num-trigger')
  if (!trigger) return

  const dropdown = document.getElementById('num-dropdown')!
  const isOpen   = !dropdown.hidden
  dropdown.hidden = isOpen
  trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true')
})

// ドロップダウン外クリックで閉じる
document.addEventListener('click', (e) => {
  const menu = document.getElementById('nav-user-menu')
  if (menu && !menu.contains(e.target as Node)) {
    const dropdown = document.getElementById('num-dropdown')!
    dropdown.hidden = true
    menu.querySelector('.num-trigger')?.setAttribute('aria-expanded', 'false')
  }
})

// --- ログアウト ---
document.getElementById('btn-nav-logout')?.addEventListener('click', async () => {
  await fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/'
})

// --- Navbar認証状態更新 ---
function updateNavbarAuth(user: User) {
  // サーバーサイドレンダリングの場合は location.reload() で対応
  // CSRの場合は動的にNavbarのHTML差し替え
  const navAuth = document.getElementById('nav-auth')!
  navAuth.classList.add('nav-auth-loggedin')
  navAuth.innerHTML = `
    <a href="/create" class="btn-nav-cta">新しいロゴを作る</a>
    <div class="nav-user-menu" id="nav-user-menu">
      <button class="num-trigger" type="button"
              aria-expanded="false"
              aria-controls="num-dropdown"
              aria-label="マイメニュー">
        <div class="num-avatar" aria-hidden="true">
          ${user.email[0].toUpperCase()}
        </div>
      </button>
      <div class="num-dropdown" id="num-dropdown" hidden>
        <div class="num-email">${user.email}</div>
        <a href="/dashboard" class="num-link">🖼️ マイページ</a>
        <a href="/dashboard#orders" class="num-link">📋  注文履歴</a>
        <a href="/dashboard#account" class="num-link">⚙️ アカウント設定</a>
        <button class="num-logout" type="button" id="btn-nav-logout">
          ログアウト
        </button>
      </div>
    </div>
  `
  // 再イベント登録
  setupNavUserMenu()
}

// --- フォームクリア ---
function clearForms() {
  document.querySelectorAll<HTMLFormElement>('.am-form').forEach(f => f.reset())
  document.querySelectorAll('.am-form-error, .am-form-success').forEach(el => {
    (el as HTMLElement).hidden = true
  })
  document.getElementById('pws-fill')!.className = 'pws-fill'
  document.getElementById('pws-label')!.textContent = ''
}
```

---

## 5. APIエンドポイント仕様

```
POST /api/auth/login
Request:  { email: string, password: string }
Response: { id, email, createdAt } | 401 { message: string }
処理:     セッション or JWT を発行

POST /api/auth/register
Request:  { email: string, password: string }
Response: { id, email, createdAt } | 400 { message: string }
処理:     パスワードハッシュ化・DBに保存・セッション発行

POST /api/auth/logout
Response: { success: true }
処理:     セッション無効化

POST /api/auth/forgot-password
Request:  { email: string }
Response: { success: true }   ← メールが存在しない場合も同じレスポンス（セキュリティ）
処理:     リセットトークン生成・メール送信

POST /api/auth/reset-password
Request:  { token: string, newPassword: string }
Response: { success: true } | 400 { message: 'token_expired' }
処理:     トークン検証・パスワード更新

GET /api/auth/me
Response: { id, email, createdAt } | 401
処理:     現在のログイン状態を返す（ページロード時に呼び出す）
```

---

## 6. パスワードリセット完了ページ `/reset-password`

メール内リンクからアクセス。モーダルではなく専用ページ。

```
URL: /reset-password?token=XXXX

表示内容：
- 新しいパスワード入力フォーム
- パスワード強度インジケーター
- 送信後 → ログイン済み状態で /dashboard へリダイレクト

トークン期限切れの場合：
- エラーメッセージ表示
- 「再度リセットメールを送る」ボタン
```

---

## 7. フォーカストラップ仕様

```typescript
// モーダル内のフォーカストラップ
function trapFocus(modal: HTMLElement) {
  const focusable = modal.querySelectorAll<HTMLElement>(
    'button, input, a[href], select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const first = focusable[0]
  const last  = focusable[focusable.length - 1]

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  })
}
```

---

## 8. アクセシビリティ要件

| 要件 | 実装 |
|---|---|
| モーダル | `role="dialog"` + `aria-modal="true"` + `aria-labelledby` |
| タブ | `role="tablist"` + `role="tab"` + `aria-selected` + `aria-controls` |
| フォーカストラップ | モーダル内でTabキーが循環する |
| Escキー | モーダルを閉じる |
| パスワード強度 | `aria-live="polite"` でリアルタイム読み上げ |
| エラー | `role="alert"` で即時読み上げ |
| ドロップダウン | `aria-expanded` で開閉状態を通知 |

---

## 9. コンポーネント構成

```
components/auth/
├── AuthModal.tsx            ← モーダル本体（全ページで使用）
├── NavbarAuth.tsx           ← Navbar内の認証状態表示
└── auth-modal.ts            ← 状態管理・API通信・イベント

app/reset-password/page.tsx  ← パスワードリセット完了ページ

app/api/auth/
├── login/route.ts
├── register/route.ts
├── logout/route.ts
├── forgot-password/route.ts
├── reset-password/route.ts
└── me/route.ts
```

---

## 10. 各ページでの呼び出し方

```typescript
// Navbarログインボタン
showAuthModal({ defaultTab: 'login' })

// /dashboard 未ログイン訪問時
showAuthModal({
  defaultTab: 'login',
  onSuccess: () => location.reload()
})

// /checkout Step1「次へ」クリック時（未ログイン）
showAuthModal({
  defaultTab: 'register',   // 新規ユーザーが多いため
  onSuccess: (user) => {
    setLoggedInUser(user)
    goToStep(3)             // お支払いステップへ
  }
})
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次規格：/blog ブログ一覧・記事テンプレート*
