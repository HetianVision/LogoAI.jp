# お問い合わせページ開発規格書 `/contact`

> **文档用途**：交付AI开发者直接实装。
> **依赖文档**：`homepage-spec.md`（设计系统）
> **ページ類型**：お問い合わせフォーム
> **重要用途**：返金申請・著作権証明書再発行・技術サポート・その他問い合わせ

---

## 1. ページ仕様

| 項目 | 内容 |
|---|---|
| 路由 | `/contact` |
| Canonical | `https://logoai.jp/contact` |
| robots | `index, follow` |

### メタデータ

```html
<title>お問い合わせ | LogoAI.jp</title>
<meta name="description" content="LogoAI.jpへのお問い合わせはこちら。返金申請・技術サポート・その他ご質問を承ります。">
```

---

## 2. ページ構造

```html
<div class="contact-page">
  <header class="navbar">...</header>
  <main>

    <!-- ヒーロー -->
    <section class="contact-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="パンくずリスト">
          <ol>
            <li><a href="/">ホーム</a></li>
            <li aria-current="page">お問い合わせ</li>
          </ol>
        </nav>
        <h1>お問い合わせ</h1>
        <p class="contact-hero-desc">
          ご質問・ご要望・返金申請など、お気軽にお問い合わせください。<br>
          通常、<strong>1〜2営業日以内</strong>にメールにてご回答します。
        </p>
      </div>
    </section>

    <div class="contact-layout">
      <div class="container">
        <div class="contact-grid">

          <!-- 左：よくある問い合わせへのショートカット -->
          <div class="contact-shortcuts">
            <h2 class="cs-title">よくあるお問い合わせ</h2>
            <p class="cs-desc">
              以下の場合は、対応ページで解決できることがあります。
            </p>
            <div class="cs-links">
              <a href="/faq" class="cs-link">
                <span class="csl-icon" aria-hidden="true">❓</span>
                <div class="csl-content">
                  <span class="csl-title">よくある質問（FAQ）</span>
                  <span class="csl-desc">使い方・著作権・料金など</span>
                </div>
                <span class="csl-arrow" aria-hidden="true">›</span>
              </a>
              <a href="/guarantee" class="cs-link">
                <span class="csl-icon" aria-hidden="true">🔄</span>
                <div class="csl-content">
                  <span class="csl-title">返金保証・返金申請について</span>
                  <span class="csl-desc">7日間全額返金の手順</span>
                </div>
                <span class="csl-arrow" aria-hidden="true">›</span>
              </a>
              <a href="/copyright" class="cs-link">
                <span class="csl-icon" aria-hidden="true">©️</span>
                <div class="csl-content">
                  <span class="csl-title">著作権・証明書について</span>
                  <span class="csl-desc">著作権の帰属・証明書の使い方</span>
                </div>
                <span class="csl-arrow" aria-hidden="true">›</span>
              </a>
              <a href="/trademark" class="cs-link">
                <span class="csl-icon" aria-hidden="true">®️</span>
                <div class="csl-content">
                  <span class="csl-title">商標登録について</span>
                  <span class="csl-desc">ロゴの商標登録申請手順</span>
                </div>
                <span class="csl-arrow" aria-hidden="true">›</span>
              </a>
            </div>

            <!-- 対応時間 -->
            <div class="cs-hours">
              <div class="csh-title">サポート対応時間</div>
              <div class="csh-time">平日 10:00〜18:00（土日祝休）</div>
              <div class="csh-note">
                土日祝日にいただいたお問い合わせは、
                翌営業日以降に対応いたします。
              </div>
            </div>
          </div>

          <!-- 右：お問い合わせフォーム -->
          <div class="contact-form-wrap">
            <h2 class="cf-title">お問い合わせフォーム</h2>

            <!-- 送信前フォーム -->
            <form class="contact-form" id="contact-form" novalidate>

              <!-- お問い合わせ種別 -->
              <div class="form-field">
                <label for="contact-type" class="field-label">
                  お問い合わせ種別
                  <span class="field-required" aria-label="必須">必須</span>
                </label>
                <select id="contact-type" name="contactType"
                        class="field-select" required
                        aria-describedby="contact-type-hint">
                  <option value="" disabled selected>選択してください</option>
                  <option value="refund">返金申請</option>
                  <option value="certificate">著作権証明書の再発行</option>
                  <option value="download">ダウンロード・技術的な問題</option>
                  <option value="billing">請求・決済に関するご質問</option>
                  <option value="copyright">著作権・商標に関するご質問</option>
                  <option value="other">その他</option>
                </select>
                <span id="contact-type-hint" class="field-hint">
                  返金申請の場合は「返金申請」を選択してください
                </span>
              </div>

              <!-- 注文番号（返金申請時に表示） -->
              <div class="form-field" id="order-id-field" hidden>
                <label for="order-id" class="field-label">
                  注文番号
                  <span class="field-optional">任意</span>
                </label>
                <input type="text" id="order-id" name="orderId"
                       class="field-input field-input-mono"
                       placeholder="例）order_XXXXXXXXXXXXXXXX"
                       autocomplete="off"
                       aria-describedby="order-id-hint">
                <span id="order-id-hint" class="field-hint">
                  購入完了メールに記載されています
                </span>
              </div>

              <!-- メールアドレス -->
              <div class="form-field">
                <label for="contact-email" class="field-label">
                  メールアドレス
                  <span class="field-required" aria-label="必須">必須</span>
                </label>
                <input type="email" id="contact-email" name="email"
                       class="field-input"
                       placeholder="例）yamamoto@example.com"
                       required
                       autocomplete="email"
                       aria-describedby="contact-email-hint">
                <span id="contact-email-hint" class="field-hint">
                  ご回答をお送りするメールアドレスです
                </span>
              </div>

              <!-- お名前 -->
              <div class="form-field">
                <label for="contact-name" class="field-label">
                  お名前
                  <span class="field-required" aria-label="必須">必須</span>
                </label>
                <input type="text" id="contact-name" name="name"
                       class="field-input"
                       placeholder="例）山本 太郎"
                       required
                       autocomplete="name"
                       maxlength="50">
              </div>

              <!-- お問い合わせ内容 -->
              <div class="form-field">
                <label for="contact-message" class="field-label">
                  お問い合わせ内容
                  <span class="field-required" aria-label="必須">必須</span>
                </label>
                <textarea id="contact-message" name="message"
                          class="field-textarea"
                          placeholder="ご質問・ご要望の内容をできるだけ詳しくご記入ください"
                          required
                          rows="6"
                          maxlength="2000"
                          aria-describedby="message-count"></textarea>
                <div class="field-footer">
                  <span class="field-hint"></span>
                  <span id="message-count" class="field-count"
                        aria-live="polite">0 / 2000</span>
                </div>
              </div>

              <!-- 返金申請時の注意 -->
              <div class="contact-refund-notice" id="refund-notice" hidden>
                <div class="crn-icon" aria-hidden="true">📋</div>
                <div class="crn-content">
                  <div class="crn-title">返金申請について</div>
                  <ul class="crn-list">
                    <li>購入日から7日以内のお申し込みが対象です</li>
                    <li>返金後はロゴデータの使用・著作権の行使ができなくなります</li>
                    <li>ダウンロード済みデータは削除してください</li>
                    <li>返金処理は3〜5営業日以内に完了します</li>
                  </ul>
                </div>
              </div>

              <!-- バリデーションエラー -->
              <div class="form-error" id="contact-error" role="alert" hidden>
                <span>⚠️ 入力内容をご確認ください</span>
              </div>

              <!-- 送信ボタン -->
              <div class="contact-submit">
                <button type="submit" class="btn-contact-submit" id="btn-contact-submit">
                  送信する →
                </button>
                <p class="contact-privacy-note">
                  送信することで
                  <a href="/privacy" target="_blank" rel="noopener">プライバシーポリシー</a>
                  に同意したものとみなします
                </p>
              </div>

            </form>

            <!-- 送信完了メッセージ（送信後に表示） -->
            <div class="contact-success" id="contact-success" hidden
                 role="status" aria-live="polite">
              <div class="cs-check" aria-hidden="true">✓</div>
              <h3>お問い合わせを受け付けました</h3>
              <p>
                <strong id="success-email"></strong> 宛に確認メールをお送りしました。<br>
                通常1〜2営業日以内にご回答いたします。
              </p>
              <div class="cs-actions">
                <a href="/" class="btn-secondary">ホームへ戻る</a>
                <a href="/faq" class="btn-secondary">FAQを見る</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </main>
  <footer class="footer">...</footer>
</div>
```

---

## 3. CSS

```css
/* ヒーロー */
.contact-hero {
  padding: calc(64px + 40px) var(--container-px) 36px;
  background: var(--color-bg-section);
  border-bottom: 1px solid var(--color-border);
}

.contact-hero h1 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 8px 0 12px;
}

.contact-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* レイアウト */
.contact-layout { padding: 48px var(--container-px) 80px; }

.contact-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 48px;
  max-width: var(--container-max);
  margin: 0 auto;
  align-items: start;
}

/* ショートカット */
.contact-shortcuts { position: sticky; top: 88px; }

.cs-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 8px;
}

.cs-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0 0 20px;
}

.cs-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
}

.cs-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all 0.2s;
}

.cs-link:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateX(2px);
}

.csl-icon { font-size: 20px; flex-shrink: 0; }

.csl-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.csl-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.csl-desc {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.csl-arrow {
  font-size: var(--text-xl);
  color: var(--color-text-muted);
}

/* 対応時間 */
.cs-hours {
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 16px 20px;
}

.csh-title {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
}

.csh-time {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.csh-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* フォームエリア */
.cf-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 24px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 580px;
}

/* select */
.field-select {
  width: 100%;
  padding: 14px 16px;
  font-size: var(--text-base);
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field-select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(26,58,42,0.1);
}

/* textarea */
.field-textarea {
  width: 100%;
  padding: 14px 16px;
  font-size: var(--text-base);
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  outline: none;
  resize: vertical;
  min-height: 140px;
  line-height: var(--leading-relaxed);
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.field-textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(26,58,42,0.1);
}

/* 返金申請注意 */
.contact-refund-notice {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: rgba(201,150,58,0.06);
  border: 1px solid rgba(201,150,58,0.25);
  border-radius: var(--radius-xl);
  animation: stepFadeIn 0.25s ease;
}

.crn-icon { font-size: 24px; flex-shrink: 0; }

.crn-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.crn-list {
  padding-left: 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.crn-list li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

/* 送信ボタン */
.contact-submit {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-contact-submit {
  padding: 16px 40px;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
}

.btn-contact-submit:hover {
  background: var(--color-primary-hover);
}

.btn-contact-submit:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.contact-privacy-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0;
}

.contact-privacy-note a {
  color: var(--color-primary);
}

/* 送信完了 */
.contact-success {
  text-align: center;
  padding: 48px 32px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-2xl);
  max-width: 480px;
}

.cs-check {
  width: 64px;
  height: 64px;
  background: var(--color-success);
  color: white;
  border-radius: 50%;
  font-size: var(--text-2xl);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.contact-success h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 12px;
}

.contact-success p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 24px;
}

.cs-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* レスポンシブ */
@media (max-width: 1024px) {
  .contact-grid { grid-template-columns: 1fr; }
  .contact-shortcuts { position: static; }
}

@media (max-width: 640px) {
  .btn-contact-submit { width: 100%; justify-content: center; }
}
```

---

## 4. JavaScript（フォームインタラクション）

```typescript
// contact-form.ts

// 種別変更で返金注意・注文番号フィールドを表示/非表示
const typeSelect = document.getElementById('contact-type') as HTMLSelectElement
const orderField = document.getElementById('order-id-field') as HTMLElement
const refundNotice = document.getElementById('refund-notice') as HTMLElement

typeSelect.addEventListener('change', () => {
  const isRefund = typeSelect.value === 'refund'
  orderField.hidden = !isRefund
  refundNotice.hidden = !isRefund
})

// テキストエリア文字カウント
const textarea = document.getElementById('contact-message') as HTMLTextAreaElement
const countEl  = document.getElementById('message-count')!

textarea.addEventListener('input', () => {
  const len = textarea.value.length
  countEl.textContent = `${len} / 2000`
  if (len >= 1800) countEl.style.color = '#C41E3A'
  else countEl.style.color = ''
})

// フォーム送信
const form     = document.getElementById('contact-form') as HTMLFormElement
const errorEl  = document.getElementById('contact-error') as HTMLElement
const submitBtn = document.getElementById('btn-contact-submit') as HTMLButtonElement
const successEl = document.getElementById('contact-success') as HTMLElement

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  // バリデーション
  if (!form.checkValidity()) {
    errorEl.hidden = false
    form.querySelector<HTMLElement>(':invalid')?.focus()
    return
  }
  errorEl.hidden = true

  // 送信中状態
  submitBtn.disabled = true
  submitBtn.textContent = '送信中...'

  try {
    const data = new FormData(form)
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(data)),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) throw new Error('送信失敗')

    // 成功表示
    const email = (document.getElementById('contact-email') as HTMLInputElement).value
    document.getElementById('success-email')!.textContent = email
    form.hidden = true
    successEl.hidden = false
    successEl.focus()

  } catch {
    errorEl.hidden = false
    errorEl.querySelector('span')!.textContent =
      '⚠️ 送信に失敗しました。しばらく経ってから再度お試しください。'
    submitBtn.disabled = false
    submitBtn.textContent = '送信する →'
  }
})
```

---

## 5. APIエンドポイント仕様

```
POST /api/contact

Request Body:
{
  contactType: string     // 'refund' | 'certificate' | 'download' | 'billing' | 'copyright' | 'other'
  orderId?: string        // 任意
  email: string           // 必須
  name: string            // 必須
  message: string         // 必須
}

Response:
200 OK  → 送信成功
400     → バリデーションエラー
500     → サーバーエラー

処理内容：
- メール送信（support@logoai.jp 宛）
- 確認メール自動返信（ユーザー宛）
- contactType === 'refund' の場合は返金処理チームへの通知フラグを立てる
```

---

## 6. SEO構造化データ

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "お問い合わせ | LogoAI.jp",
  "url": "https://logoai.jp/contact",
  "description": "LogoAI.jpへのお問い合わせ",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": "Japanese",
    "email": "support@logoai.jp"
  }
}
```

---

## 7. コンポーネント構成

```
app/contact/page.tsx
app/api/contact/route.ts     ← APIエンドポイント

components/contact/
├── ContactHero.tsx
├── ContactShortcuts.tsx     ← よくあるお問い合わせへのリンク
└── ContactForm.tsx          ← フォーム + 送信完了
```

