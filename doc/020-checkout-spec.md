# 決済ページ開発規格書 `/checkout`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：`homepage-spec.md`（设计系统）、`create-spec.md`（WizardState）、`pricing-spec.md`（プラン定義）
> **页面类型**：購入・決済フロー（単一ページ・多ステップWizard）
> **核心设计原则**：
>   1. 登録/ログインは弾窗で完結、フローを中断しない
>   2. 購入確認画面（日本の確認文化）を必ず挟む
>   3. コンビニ払いは「まもなく対応予定」として表示のみ
>   4. Stripe Elements でカード情報を安全に処理

---

## 1. ページ全体仕様

| 項目 | 内容 |
|---|---|
| 路由 | `/checkout` |
| robots | `noindex, nofollow` |
| レイアウト | Navbar非表示・フッター非表示（決済集中モード） |
| セッション | `sessionStorage` の `logoai_wizard` からロゴデータを取得 |
| 認証 | 未ログイン時はStep 2でモーダル表示・完了後Step 3へ自動進行 |

### 1.1 ページ全体構造

```html
<div class="checkout-page">
  <header class="checkout-header">
  <main class="checkout-main">
    <div class="checkout-layout">
      <div class="checkout-steps">     ← 左：ステップメイン
      <div class="checkout-summary">   ← 右：注文サマリー（sticky）
    </div>
  </main>

  <!-- モーダル群 -->
  <div id="auth-modal">     ← ログイン/新規登録
  <div id="stripe-modal">   ← Stripeカード入力（オプション）
</div>
```

---

## 2. ヘッダー

```html
<header class="checkout-header">
  <div class="coh-inner">
    <a href="/" class="coh-logo" aria-label="LogoAI.jp ホームへ">
      <span class="coh-logo-text">LogoAI.jp</span>
    </a>

    <!-- 進捗バー -->
    <nav class="co-progress" aria-label="購入ステップ">
      <div class="cop-steps">
        <div class="cop-step {{ step >= 1 ? 'cops-active' : '' }} {{ step > 1 ? 'cops-done' : '' }}">
          <div class="cops-circle">
            {% if step > 1 %}<span aria-hidden="true">✓</span>
            {% else %}<span aria-hidden="true">1</span>{% endif %}
          </div>
          <span class="cops-label">プラン選択</span>
        </div>
        <div class="cop-connector {{ step > 1 ? 'copc-done' : '' }}" aria-hidden="true"></div>
        <div class="cop-step {{ step >= 2 ? 'cops-active' : '' }} {{ step > 2 ? 'cops-done' : '' }}">
          <div class="cops-circle">
            {% if step > 2 %}<span aria-hidden="true">✓</span>
            {% else %}<span aria-hidden="true">2</span>{% endif %}
          </div>
          <span class="cops-label">アカウント</span>
        </div>
        <div class="cop-connector {{ step > 2 ? 'copc-done' : '' }}" aria-hidden="true"></div>
        <div class="cop-step {{ step >= 3 ? 'cops-active' : '' }} {{ step > 3 ? 'cops-done' : '' }}">
          <div class="cops-circle">
            {% if step > 3 %}<span aria-hidden="true">✓</span>
            {% else %}<span aria-hidden="true">3</span>{% endif %}
          </div>
          <span class="cops-label">お支払い</span>
        </div>
        <div class="cop-connector {{ step > 3 ? 'copc-done' : '' }}" aria-hidden="true"></div>
        <div class="cop-step {{ step >= 4 ? 'cops-active' : '' }}">
          <div class="cops-circle"><span aria-hidden="true">4</span></div>
          <span class="cops-label">確認・完了</span>
        </div>
      </div>
    </nav>

    <!-- セキュリティバッジ -->
    <div class="coh-secure" aria-label="セキュリティ">
      🔒 <span>SSL暗号化通信</span>
    </div>
  </div>
</header>
```

```css
.checkout-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid var(--color-border);
  height: 64px;
  padding: 0 var(--container-px);
}

.coh-inner {
  max-width: 1080px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
}

.coh-logo-text {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-primary);
}

.co-progress { flex: 1; }

.cop-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.cop-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.cops-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-bg-section);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}

.cops-active .cops-circle {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  box-shadow: 0 0 0 3px rgba(26,58,42,0.12);
}

.cops-done .cops-circle {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.cops-label {
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.cops-active .cops-label { color: var(--color-primary); }
.cops-done .cops-label { color: var(--color-success); }

.cop-connector {
  width: 60px;
  height: 2px;
  background: var(--color-border);
  flex-shrink: 0;
  margin-bottom: 16px;
  transition: background 0.3s;
}

.copc-done { background: var(--color-success); }

.coh-secure {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 600;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .cop-connector { width: 24px; }
  .cops-label { display: none; }
  .coh-secure span { display: none; }
}
```

---

## 3. レイアウト

```css
.checkout-main {
  padding: 36px var(--container-px) 80px;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  max-width: 1080px;
  margin: 0 auto;
  align-items: start;
}

@media (max-width: 1024px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
  /* サマリーをステップの上に移動 */
  .checkout-summary { order: -1; }
}
```

---

## 4. 右側：注文サマリー（全ステップ共通・sticky）

```html
<div class="checkout-summary" aria-label="注文内容">
  <div class="cos-card">
    <div class="cos-title">注文内容</div>

    <!-- 生成ロゴプレビュー -->
    <div class="cos-logo-preview">
      <div class="cos-logo-img">
        <img src="" alt="" id="summary-logo-img"
             width="120" height="80">
      </div>
      <div class="cos-logo-info">
        <div class="cos-logo-name" id="summary-brand-name"></div>
        <div class="cos-logo-industry" id="summary-industry"></div>
      </div>
    </div>

    <div class="cos-divider" aria-hidden="true"></div>

    <!-- 選択プラン -->
    <div class="cos-plan" id="summary-plan">
      <div class="cos-plan-name" id="summary-plan-name">—</div>
      <div class="cos-plan-price" id="summary-plan-price">—</div>
    </div>

    <!-- オプションサービス -->
    <div class="cos-options" id="summary-options">
      <!-- 動的生成 -->
    </div>

    <div class="cos-divider" aria-hidden="true"></div>

    <!-- 合計 -->
    <div class="cos-total">
      <div class="cos-total-row">
        <span>小計</span>
        <span id="summary-subtotal">—</span>
      </div>
      <div class="cos-total-row">
        <span>消費税（10%）</span>
        <span id="summary-tax">—</span>
      </div>
      <div class="cos-total-row cos-total-final">
        <span>合計（税込）</span>
        <span id="summary-total">—</span>
      </div>
    </div>

    <!-- 信頼バッジ -->
    <div class="cos-trust">
      <div class="cos-trust-item">
        <span>🔒</span>
        <span>SSL暗号化・Stripe決済</span>
      </div>
      <div class="cos-trust-item">
        <span>↩️</span>
        <span>7日間全額返金保証</span>
      </div>
      <div class="cos-trust-item">
        <span>©️</span>
        <span>著作権証明書付き</span>
      </div>
    </div>
  </div>
</div>
```

```css
.checkout-summary { position: sticky; top: 88px; }

.cos-card {
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
}

.cos-title {
  padding: 16px 20px;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  background: var(--color-bg-section);
  border-bottom: 1px solid var(--color-border);
}

.cos-logo-preview {
  padding: 16px 20px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.cos-logo-img {
  width: 80px;
  height: 56px;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.cos-logo-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  padding: 6px;
}

.cos-logo-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.cos-logo-industry {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.cos-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0 20px;
}

.cos-plan {
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cos-plan-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.cos-plan-price {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary);
}

.cos-options {
  padding: 0 20px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cos-option-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.cos-option-price { font-weight: 600; }

.cos-total {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cos-total-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.cos-total-final {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  padding-top: 8px;
  border-top: 1px solid var(--color-border);
  margin-top: 4px;
}

.cos-trust {
  padding: 14px 20px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--color-bg-section);
}

.cos-trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
```

---

## 5. Step 1：プラン選択 + オプションサービス

```html
<section class="co-step" id="co-step-1" aria-labelledby="step1-title">
  <div class="step-heading">
    <span class="step-badge">STEP 1</span>
    <h1 id="step1-title">プランとオプションを選択してください</h1>
    <p class="step-desc">購入するのはこのロゴ1点です。プランによって取得できるデータと権利が異なります。</p>
  </div>

  <!-- ロゴ確認 -->
  <div class="selected-logo-card">
    <div class="slc-img">
      <img src="" alt="" id="step1-logo-img" width="200" height="140">
    </div>
    <div class="slc-info">
      <div class="slc-brand" id="step1-brand-name"></div>
      <div class="slc-industry" id="step1-industry"></div>
      <a href="/create/result" class="slc-change">別のロゴを選ぶ →</a>
    </div>
  </div>

  <!-- プラン選択 -->
  <div class="plan-select-group" role="radiogroup" aria-label="プラン選択">

    <!-- スタンダードプラン -->
    <label class="plan-select-card" id="plan-standard-card">
      <input type="radio" name="plan" value="standard"
             class="plan-radio" checked
             aria-describedby="plan-standard-desc">
      <div class="psc-inner">
        <div class="psc-header">
          <div class="psc-name">スタンダードプラン</div>
          <div class="psc-price">
            <span class="psc-price-num">¥4,980</span>
            <span class="psc-price-unit">税込</span>
          </div>
        </div>
        <ul class="psc-features" id="plan-standard-desc">
          <li class="pscf-item pscf-yes">SVG・PNG・PDF 高解像度ダウンロード</li>
          <li class="pscf-item pscf-yes">著作権帰属証明書（PDF）</li>
          <li class="pscf-item pscf-yes">商用利用フル解禁</li>
          <li class="pscf-item pscf-yes">再編集・再ダウンロード無制限</li>
          <li class="pscf-item pscf-no">ブランドガイドライン</li>
          <li class="pscf-item pscf-no">商標類似チェックレポート</li>
        </ul>
      </div>
    </label>

    <!-- プレミアムプラン -->
    <label class="plan-select-card plan-select-card-featured" id="plan-premium-card">
      <div class="psc-badge">おすすめ</div>
      <input type="radio" name="plan" value="premium"
             class="plan-radio"
             aria-describedby="plan-premium-desc">
      <div class="psc-inner">
        <div class="psc-header">
          <div class="psc-name">プレミアムプラン</div>
          <div class="psc-price">
            <span class="psc-price-num">¥9,800</span>
            <span class="psc-price-unit">税込</span>
          </div>
        </div>
        <ul class="psc-features" id="plan-premium-desc">
          <li class="pscf-item pscf-yes">SVG・PNG・PDF 高解像度ダウンロード</li>
          <li class="pscf-item pscf-yes">著作権帰属証明書（PDF）</li>
          <li class="pscf-item pscf-yes">商用利用フル解禁</li>
          <li class="pscf-item pscf-yes">再編集・再ダウンロード無制限</li>
          <li class="pscf-item pscf-yes">ブランドガイドライン（PDF）</li>
          <li class="pscf-item pscf-yes">J-PlatPat商標類似チェックレポート</li>
        </ul>
      </div>
    </label>

  </div>

  <!-- オプションサービス -->
  <div class="options-section">
    <h2 class="options-title">オプションサービス
      <span class="options-sub">必要なものだけ追加できます</span>
    </h2>

    <div class="options-list">

      <label class="option-card">
        <div class="oc-left">
          <input type="checkbox" name="option" value="brand-guideline"
                 class="option-check" data-price="2980"
                 aria-describedby="opt-brand-desc">
          <div class="oc-info">
            <div class="oc-name">ブランドガイドライン</div>
            <div class="oc-desc" id="opt-brand-desc">
              カラーコード・フォント・ロゴ使用ルールをまとめたPDF。
              デザイナーや印刷会社への指示に使えます。
            </div>
          </div>
        </div>
        <div class="oc-price">
          <span class="oc-price-num">+¥2,980</span>
          <span class="oc-price-unit">税込</span>
        </div>
      </label>

      <label class="option-card">
        <div class="oc-left">
          <input type="checkbox" name="option" value="business-card"
                 class="option-check" data-price="1980"
                 aria-describedby="opt-card-desc">
          <div class="oc-info">
            <div class="oc-name">名刺デザインデータ</div>
            <div class="oc-desc" id="opt-card-desc">
              ロゴを使った名刺デザイン（91×55mm）のIllustrator/PDF入稿データ。
              印刷会社にそのまま入稿できます。
            </div>
          </div>
        </div>
        <div class="oc-price">
          <span class="oc-price-num">+¥1,980</span>
          <span class="oc-price-unit">税込</span>
        </div>
      </label>

      <label class="option-card">
        <div class="oc-left">
          <input type="checkbox" name="option" value="sns-icon-set"
                 class="option-check" data-price="980"
                 aria-describedby="opt-sns-desc">
          <div class="oc-info">
            <div class="oc-name">SNSアイコンセット</div>
            <div class="oc-desc" id="opt-sns-desc">
              Instagram・X・LINE・Facebook・YouTube 各プラットフォーム
              推奨サイズに最適化したPNGセット（正方形・丸形）。
            </div>
          </div>
        </div>
        <div class="oc-price">
          <span class="oc-price-num">+¥980</span>
          <span class="oc-price-unit">税込</span>
        </div>
      </label>

      <label class="option-card">
        <div class="oc-left">
          <input type="checkbox" name="option" value="trademark-check"
                 class="option-check" data-price="3980"
                 aria-describedby="opt-trademark-desc">
          <div class="oc-info">
            <div class="oc-name">商標類似チェックレポート</div>
            <div class="oc-desc" id="opt-trademark-desc">
              J-PlatPat連携による商標類似度スコアレポート（PDF）。
              商標登録申請前のリスク確認に。
              <span class="oc-tag">プレミアムに含まれます</span>
            </div>
          </div>
        </div>
        <div class="oc-price">
          <span class="oc-price-num">+¥3,980</span>
          <span class="oc-price-unit">税込</span>
        </div>
      </label>

      <label class="option-card">
        <div class="oc-left">
          <input type="checkbox" name="option" value="favicon-set"
                 class="option-check" data-price="580"
                 aria-describedby="opt-favicon-desc">
          <div class="oc-info">
            <div class="oc-name">ファビコン・アプリアイコンセット</div>
            <div class="oc-desc" id="opt-favicon-desc">
              Webサイト用ファビコン（16・32・64px）と
              iOSアプリアイコン（1024px）のPNGセット。
            </div>
          </div>
        </div>
        <div class="oc-price">
          <span class="oc-price-num">+¥580</span>
          <span class="oc-price-unit">税込</span>
        </div>
      </label>

    </div>
  </div>

  <div class="step-actions">
    <button type="button" class="btn-step-next" id="step1-next">
      次へ：アカウント確認
      <span class="btn-arrow" aria-hidden="true">→</span>
    </button>
  </div>

</section>
```

```css
/* ロゴ確認カード */
.selected-logo-card {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  margin-bottom: 28px;
}

.slc-img {
  width: 140px;
  height: 96px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.slc-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  padding: 10px;
}

.slc-brand {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.slc-industry {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: 10px;
}

.slc-change {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

/* プラン選択 */
.plan-select-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 36px;
}

.plan-select-card {
  position: relative;
  display: block;
  cursor: pointer;
}

.plan-radio {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
}

.psc-inner {
  border: 2px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 20px;
  background: white;
  transition: all 0.2s ease;
  height: 100%;
  box-sizing: border-box;
}

.plan-radio:checked + .psc-inner,
.plan-select-card:has(.plan-radio:checked) .psc-inner {
  border-color: var(--color-primary);
  background: rgba(26,58,42,0.03);
  box-shadow: 0 0 0 3px rgba(26,58,42,0.1);
}

.plan-select-card-featured .psc-inner {
  border-color: var(--color-accent);
}

.plan-select-card-featured:has(.plan-radio:checked) .psc-inner {
  border-color: var(--color-primary);
}

.psc-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-accent);
  color: var(--color-text-primary);
  font-size: 0.6rem;
  font-weight: 700;
  padding: 3px 12px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  z-index: 1;
}

.psc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.psc-name {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
}

.psc-price { text-align: right; }

.psc-price-num {
  display: block;
  font-family: var(--font-number);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.psc-price-unit {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.psc-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.pscf-item {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  padding-left: 18px;
  position: relative;
  line-height: 1.4;
}

.pscf-item::before {
  position: absolute;
  left: 0;
  font-weight: 700;
}

.pscf-yes::before { content: '✓'; color: var(--color-success); }
.pscf-no::before  { content: '✗'; color: var(--color-border); }
.pscf-no { opacity: 0.5; }

/* オプションサービス */
.options-section { margin-bottom: 32px; }

.options-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 16px;
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.options-sub {
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-text-muted);
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all 0.2s;
}

.option-card:hover { border-color: var(--color-primary); }

.option-card:has(.option-check:checked) {
  border-color: var(--color-primary);
  background: rgba(26,58,42,0.03);
}

/* プレミアムで含まれるオプションは自動チェック・無効化 */
.option-card.option-included-in-premium {
  opacity: 0.6;
  cursor: default;
}

.oc-left {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex: 1;
}

.option-check {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border);
  border-radius: 4px;
  margin-top: 2px;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: var(--color-primary);
}

.oc-info { flex: 1; }

.oc-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.oc-desc {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.oc-tag {
  display: inline-block;
  margin-top: 4px;
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(201,150,58,0.1);
  border: 1px solid rgba(201,150,58,0.3);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.oc-price {
  text-align: right;
  flex-shrink: 0;
}

.oc-price-num {
  display: block;
  font-family: var(--font-number);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-primary);
}

.oc-price-unit {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

@media (max-width: 640px) {
  .plan-select-group { grid-template-columns: 1fr; }
}
```

---

## 6. Step 2：アカウント確認（認証モーダル）

Step 1の「次へ」をクリックしたとき、未ログインなら認証モーダルを表示。ログイン済みならStep 3へスキップ。

### 6.1 認証モーダルHTML

```html
<div class="auth-modal" id="auth-modal"
     role="dialog" aria-modal="true"
     aria-labelledby="auth-modal-title" hidden>

  <div class="am-overlay" id="am-overlay"></div>

  <div class="am-content">

    <!-- タブ切替 -->
    <div class="am-tabs" role="tablist">
      <button class="am-tab am-tab-active" role="tab"
              aria-selected="true" aria-controls="am-login"
              id="tab-login">
        ログイン
      </button>
      <button class="am-tab" role="tab"
              aria-selected="false" aria-controls="am-register"
              id="tab-register">
        新規登録
      </button>
    </div>

    <!-- ログインフォーム -->
    <div class="am-panel" id="am-login" role="tabpanel"
         aria-labelledby="tab-login">
      <h2 id="auth-modal-title" class="am-title">
        ログインして購入を続ける
      </h2>
      <p class="am-desc">
        著作権証明書の送付先メールアドレスの確認のため、
        ログインが必要です。
      </p>
      <form class="am-form" id="login-form" novalidate>
        <div class="form-field">
          <label for="login-email" class="field-label">
            メールアドレス
            <span class="field-required">必須</span>
          </label>
          <input type="email" id="login-email" name="email"
                 class="field-input" required
                 autocomplete="email"
                 placeholder="例）yamamoto@example.com">
        </div>
        <div class="form-field">
          <label for="login-password" class="field-label">
            パスワード
            <span class="field-required">必須</span>
          </label>
          <div class="password-wrap">
            <input type="password" id="login-password" name="password"
                   class="field-input" required
                   autocomplete="current-password"
                   placeholder="パスワードを入力">
            <button type="button" class="pw-toggle"
                    aria-label="パスワードを表示/非表示">👁</button>
          </div>
          <div class="field-footer">
            <a href="/forgot-password" class="field-link"
               target="_blank" rel="noopener">
              パスワードを忘れた方
            </a>
          </div>
        </div>
        <div class="am-form-error" id="login-error" role="alert" hidden>
          <span>⚠️ メールアドレスまたはパスワードが正しくありません</span>
        </div>
        <button type="submit" class="btn-auth-submit" id="btn-login">
          ログインして購入へ進む →
        </button>
      </form>
    </div>

    <!-- 新規登録フォーム -->
    <div class="am-panel" id="am-register" role="tabpanel"
         aria-labelledby="tab-register" hidden>
      <h2 class="am-title">アカウントを作成して購入</h2>
      <p class="am-desc">
        30秒で登録完了。著作権証明書・ロゴデータは
        登録メールアドレスに送付されます。
      </p>
      <form class="am-form" id="register-form" novalidate>
        <div class="form-field">
          <label for="reg-email" class="field-label">
            メールアドレス
            <span class="field-required">必須</span>
          </label>
          <input type="email" id="reg-email" name="email"
                 class="field-input" required
                 autocomplete="email"
                 placeholder="例）yamamoto@example.com">
        </div>
        <div class="form-field">
          <label for="reg-password" class="field-label">
            パスワード
            <span class="field-required">必須</span>
          </label>
          <div class="password-wrap">
            <input type="password" id="reg-password" name="password"
                   class="field-input" required
                   autocomplete="new-password"
                   placeholder="8文字以上"
                   minlength="8"
                   aria-describedby="reg-password-hint">
            <button type="button" class="pw-toggle"
                    aria-label="パスワードを表示/非表示">👁</button>
          </div>
          <span id="reg-password-hint" class="field-hint">
            8文字以上、英字と数字を含めてください
          </span>
        </div>
        <div class="am-form-error" id="register-error" role="alert" hidden>
          <span>⚠️ 登録に失敗しました。入力内容をご確認ください</span>
        </div>
        <p class="am-terms-note">
          登録することで
          <a href="/terms" target="_blank" rel="noopener">利用規約</a>・
          <a href="/privacy" target="_blank" rel="noopener">プライバシーポリシー</a>
          に同意したものとみなします
        </p>
        <button type="submit" class="btn-auth-submit" id="btn-register">
          登録して購入へ進む →
        </button>
      </form>
    </div>

    <!-- 閉じるボタン -->
    <button class="am-close" type="button"
            aria-label="閉じる" id="am-close">✕</button>
  </div>
</div>
```

```css
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

.am-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: var(--radius-2xl);
  width: min(92vw, 460px);
  max-height: 92vh;
  overflow-y: auto;
  animation: modalIn 0.25s ease;
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
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}

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
  margin: 0 0 8px;
}

.am-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 24px;
}

.am-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* パスワードフィールド */
.password-wrap {
  position: relative;
}

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
  opacity: 0.5;
  transition: opacity 0.2s;
}

.pw-toggle:hover { opacity: 1; }

.field-link {
  font-size: var(--text-xs);
  color: var(--color-primary);
  text-decoration: none;
}

.am-form-error {
  padding: 10px 14px;
  background: rgba(196,30,58,0.06);
  border: 1px solid rgba(196,30,58,0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: #C41E3A;
  font-weight: 600;
}

.am-terms-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}

.am-terms-note a { color: var(--color-primary); }

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
}

.btn-auth-submit:hover { background: var(--color-primary-hover); }
.btn-auth-submit:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

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
}
```

---

## 7. Step 3：お支払い方法選択

認証完了後に表示。

```html
<section class="co-step" id="co-step-3" aria-labelledby="step3-title" hidden>
  <div class="step-heading">
    <span class="step-badge">STEP 3</span>
    <h2 id="step3-title">お支払い方法を選択してください</h2>
  </div>

  <!-- ログイン中ユーザー表示 -->
  <div class="logged-in-bar">
    <span class="lib-email" id="logged-in-email"></span>
    <button type="button" class="lib-change" id="btn-change-account">
      アカウントを変更
    </button>
  </div>

  <!-- 支払い方法選択 -->
  <div class="payment-methods" role="radiogroup"
       aria-label="お支払い方法">

    <!-- クレジットカード -->
    <label class="pm-card pm-card-active">
      <div class="pmc-header">
        <input type="radio" name="payment" value="card"
               class="pm-radio" checked>
        <span class="pmc-label">クレジットカード</span>
        <div class="pmc-brands" aria-label="対応カードブランド">
          <span class="pmc-brand" title="Visa">VISA</span>
          <span class="pmc-brand" title="Mastercard">MC</span>
          <span class="pmc-brand" title="American Express">AMEX</span>
          <span class="pmc-brand" title="JCB">JCB</span>
        </div>
      </div>

      <!-- Stripe Elements マウント先 -->
      <div class="stripe-elements-wrap" id="stripe-elements-wrap">
        <div class="stripe-field">
          <label class="stripe-label">カード番号</label>
          <div id="stripe-card-number" class="stripe-element"></div>
        </div>
        <div class="stripe-row">
          <div class="stripe-field">
            <label class="stripe-label">有効期限</label>
            <div id="stripe-card-expiry" class="stripe-element"></div>
          </div>
          <div class="stripe-field">
            <label class="stripe-label">セキュリティコード</label>
            <div id="stripe-card-cvc" class="stripe-element"></div>
          </div>
        </div>
        <div class="stripe-error" id="stripe-error" role="alert" hidden></div>
        <div class="stripe-secure">
          🔒 カード情報はStripeが安全に管理します。当社のサーバーには保存されません。
        </div>
      </div>
    </label>

    <!-- コンビニ払い（近日対応） -->
    <div class="pm-card pm-card-disabled"
         aria-disabled="true">
      <div class="pmc-header">
        <input type="radio" name="payment" value="konbini"
               class="pm-radio" disabled>
        <span class="pmc-label">コンビニ払い</span>
        <span class="pm-coming-soon">まもなく対応予定</span>
      </div>
      <div class="pmc-konbini-logos" aria-label="対応コンビニ（近日）">
        <span>セブン-イレブン</span>
        <span>ローソン</span>
        <span>ファミリーマート</span>
      </div>
    </div>

  </div>

  <div class="step-actions">
    <button type="button" class="btn-step-next" id="step3-next">
      購入内容を確認する
      <span class="btn-arrow" aria-hidden="true">→</span>
    </button>
    <button type="button" class="btn-step-back" id="step3-back">
      ← 戻る
    </button>
  </div>
</section>
```

```css
/* ログイン中バー */
.logged-in-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(45,122,79,0.06);
  border: 1px solid rgba(45,122,79,0.15);
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
}

.lib-email {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-success);
}

.lib-change {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  text-decoration: underline;
}

/* 支払い方法 */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.pm-card {
  border: 2px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  transition: border-color 0.2s;
}

.pm-card-active { border-color: var(--color-primary); }

.pm-card-disabled {
  opacity: 0.55;
  cursor: default;
}

.pmc-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--color-bg-section);
  border-bottom: 1px solid var(--color-border);
}

.pm-radio { accent-color: var(--color-primary); flex-shrink: 0; }

.pmc-label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  flex: 1;
}

.pmc-brands {
  display: flex;
  gap: 6px;
}

.pmc-brand {
  font-size: 0.55rem;
  font-weight: 700;
  padding: 3px 6px;
  background: var(--color-border);
  color: var(--color-text-muted);
  border-radius: 3px;
}

.pm-coming-soon {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(201,150,58,0.1);
  border: 1px solid rgba(201,150,58,0.3);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

/* Stripe Elements */
.stripe-elements-wrap {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stripe-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.stripe-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-secondary);
}

.stripe-element {
  padding: 14px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: white;
  transition: border-color 0.2s;
}

.stripe-element.StripeElement--focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(26,58,42,0.1);
}

.stripe-element.StripeElement--invalid {
  border-color: #C41E3A;
}

.stripe-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stripe-error {
  padding: 10px 14px;
  background: rgba(196,30,58,0.06);
  border: 1px solid rgba(196,30,58,0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: #C41E3A;
}

.stripe-secure {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.pmc-konbini-logos {
  padding: 14px 20px;
  display: flex;
  gap: 12px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

@media (max-width: 480px) {
  .stripe-row { grid-template-columns: 1fr; }
}
```

---

## 8. Step 4：購入確認画面

日本の確認文化に対応。全ての購入内容を一覧表示してから最終購入ボタン。

```html
<section class="co-step" id="co-step-4" aria-labelledby="step4-title" hidden>
  <div class="step-heading">
    <span class="step-badge">STEP 4</span>
    <h2 id="step4-title">購入内容の最終確認</h2>
    <p class="step-desc">以下の内容で購入を確定します。</p>
  </div>

  <div class="confirm-card">

    <!-- ロゴ -->
    <div class="confirm-row">
      <span class="cr-label">購入ロゴ</span>
      <div class="cr-logo-val">
        <img src="" alt="" id="confirm-logo-thumb"
             width="60" height="40">
        <span id="confirm-logo-brand"></span>
      </div>
      <button class="cr-edit" type="button" data-goto="1">変更</button>
    </div>

    <!-- プラン -->
    <div class="confirm-row">
      <span class="cr-label">プラン</span>
      <span class="cr-value" id="confirm-plan-name"></span>
      <button class="cr-edit" type="button" data-goto="1">変更</button>
    </div>

    <!-- オプション -->
    <div class="confirm-row" id="confirm-options-row">
      <span class="cr-label">オプション</span>
      <span class="cr-value" id="confirm-options-text">なし</span>
      <button class="cr-edit" type="button" data-goto="1">変更</button>
    </div>

    <!-- アカウント -->
    <div class="confirm-row">
      <span class="cr-label">アカウント</span>
      <span class="cr-value" id="confirm-email"></span>
      <button class="cr-edit" type="button" data-goto="2">変更</button>
    </div>

    <!-- 支払い方法 -->
    <div class="confirm-row">
      <span class="cr-label">お支払い</span>
      <span class="cr-value" id="confirm-payment-method"></span>
      <button class="cr-edit" type="button" data-goto="3">変更</button>
    </div>

    <!-- 合計金額（強調） -->
    <div class="confirm-total-row">
      <span class="ctr-label">お支払い合計（税込）</span>
      <span class="ctr-amount" id="confirm-total-amount"></span>
    </div>

  </div>

  <!-- 購入ボタン -->
  <div class="purchase-action">
    <button type="button" class="btn-final-purchase" id="btn-final-purchase">
      <span class="bfp-lock" aria-hidden="true">🔒</span>
      ¥<span id="btn-price"></span> を支払って購入を確定する
    </button>
    <p class="purchase-guarantee">
      7日間全額返金保証 ·
      <a href="/guarantee" target="_blank" rel="noopener">詳細はこちら</a>
    </p>
    <button type="button" class="btn-step-back" id="step4-back">
      ← 戻る
    </button>
  </div>

  <!-- 処理中オーバーレイ -->
  <div class="processing-overlay" id="processing-overlay" hidden
       aria-live="polite" aria-label="決済処理中">
    <div class="po-inner">
      <div class="po-spinner" aria-hidden="true"></div>
      <div class="po-text">決済処理中です。しばらくお待ちください...</div>
      <div class="po-note">このページを閉じないでください</div>
    </div>
  </div>
</section>
```

```css
/* 確認テーブル（create-spec の confirm-card と同構造） */
.confirm-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  margin-bottom: 28px;
}

.confirm-row {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
}

.confirm-row:last-child { border-bottom: none; }

.cr-label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.cr-logo-val {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cr-logo-val img {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  object-fit: contain;
  padding: 4px;
  background: white;
}

.cr-value {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

.cr-edit {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-primary);
  background: none;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-full);
  padding: 4px 12px;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.2s;
  white-space: nowrap;
}

.cr-edit:hover { background: var(--color-primary); color: white; }

/* 合計行（強調） */
.confirm-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: rgba(26,58,42,0.03);
  border-top: 2px solid var(--color-primary);
}

.ctr-label {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
}

.ctr-amount {
  font-family: var(--font-number);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-primary);
}

/* 購入ボタン */
.purchase-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.btn-final-purchase {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 40px;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 700;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(26,58,42,0.25);
}

.btn-final-purchase:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26,58,42,0.3);
}

.btn-final-purchase:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  transform: none;
  box-shadow: none;
  cursor: not-allowed;
}

.bfp-lock { font-size: var(--text-xl); }

.purchase-guarantee {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0;
}

.purchase-guarantee a { color: var(--color-primary); }

/* 処理中オーバーレイ */
.processing-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.processing-overlay[hidden] { display: none; }

.po-inner { text-align: center; }

.po-spinner {
  width: 56px;
  height: 56px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: genSpin 1s linear infinite;
  margin: 0 auto 20px;
}

.po-text {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.po-note {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
```

---

## 9. Step 5：購入完了

```html
<section class="co-step co-step-complete" id="co-step-complete"
         aria-labelledby="complete-title" hidden>

  <div class="complete-inner">
    <div class="complete-check" aria-hidden="true">✓</div>

    <h2 id="complete-title">購入が完了しました！</h2>

    <p class="complete-desc">
      <strong id="complete-email"></strong> に
      著作権帰属証明書・ダウンロードリンクをお送りしました。
    </p>

    <!-- 完了サマリー -->
    <div class="complete-summary">
      <div class="complete-sum-row">
        <span>購入ロゴ</span>
        <span id="complete-brand-name"></span>
      </div>
      <div class="complete-sum-row">
        <span>プラン</span>
        <span id="complete-plan-name"></span>
      </div>
      <div class="complete-sum-row complete-sum-total">
        <span>お支払い金額</span>
        <span id="complete-total"></span>
      </div>
    </div>

    <!-- 次のアクション -->
    <div class="complete-actions">
      <a href="/dashboard" class="btn-primary btn-primary-lg">
        マイページでロゴをダウンロード →
      </a>
      <a href="/create" class="btn-secondary">
        別のロゴを作る
      </a>
    </div>

    <!-- 追加メッセージ -->
    <div class="complete-note">
      <p>
        📧 メールが届かない場合は迷惑メールフォルダをご確認ください。<br>
        それでも届かない場合は<a href="/contact">お問い合わせ</a>ください。
      </p>
    </div>

  </div>
</section>
```

```css
.co-step-complete { text-align: center; }

.complete-inner {
  max-width: 520px;
  margin: 0 auto;
  padding: 48px 0;
}

.complete-check {
  width: 80px;
  height: 80px;
  background: var(--color-success);
  color: white;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: completeIn 0.4s ease;
}

@keyframes completeIn {
  from { transform: scale(0.5); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.complete-inner h2 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 12px;
}

.complete-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 28px;
}

.complete-summary {
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 20px;
  margin-bottom: 28px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.complete-sum-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.complete-sum-total {
  font-weight: 700;
  color: var(--color-text-primary);
  padding-top: 10px;
  border-top: 1px solid var(--color-border);
  margin-top: 4px;
}

.complete-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-bottom: 24px;
}

.complete-note {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.complete-note a { color: var(--color-primary); }
```

---

## 10. JavaScript（状態管理・Stripe統合）

```typescript
// checkout.ts

interface CheckoutState {
  logoId: string
  logoImgUrl: string
  brandName: string
  industryLabel: string
  plan: 'standard' | 'premium'
  options: string[]           // ['brand-guideline', 'sns-icon-set']
  email: string
  paymentMethod: 'card'
  subtotal: number
  tax: number
  total: number
}

// --- 価格定義 ---
const PLAN_PRICES = {
  standard: 4980,
  premium: 9800,
}

const OPTION_PRICES: Record<string, number> = {
  'brand-guideline': 2980,
  'business-card': 1980,
  'sns-icon-set': 980,
  'trademark-check': 3980,
  'favicon-set': 580,
}

const OPTION_LABELS: Record<string, string> = {
  'brand-guideline': 'ブランドガイドライン',
  'business-card': '名刺デザインデータ',
  'sns-icon-set': 'SNSアイコンセット',
  'trademark-check': '商標類似チェックレポート',
  'favicon-set': 'ファビコン・アプリアイコンセット',
}

// --- 合計金額計算 ---
function calcTotal(plan: string, options: string[]): {
  subtotal: number; tax: number; total: number
} {
  const planPrice  = PLAN_PRICES[plan as keyof typeof PLAN_PRICES] || 0
  const optTotal   = options.reduce((sum, opt) => sum + (OPTION_PRICES[opt] || 0), 0)
  const subtotal   = planPrice + optTotal
  const tax        = Math.floor(subtotal * 0.1)
  // 税込み価格として表示するため tax は表示用のみ
  return { subtotal, tax: 0, total: subtotal }
  // ※ 価格はすべて税込みとして扱う場合は tax=0 でOK
}

// --- 注文サマリー更新 ---
function updateSummary(state: CheckoutState) {
  const { subtotal, tax, total } = calcTotal(state.plan, state.options)
  state.subtotal = subtotal
  state.tax = tax
  state.total = total

  document.getElementById('summary-plan-name')!.textContent =
    state.plan === 'standard' ? 'スタンダードプラン' : 'プレミアムプラン'
  document.getElementById('summary-plan-price')!.textContent =
    `¥${PLAN_PRICES[state.plan].toLocaleString()}`

  const optionsEl = document.getElementById('summary-options')!
  optionsEl.innerHTML = ''
  state.options.forEach(opt => {
    const row = document.createElement('div')
    row.className = 'cos-option-row'
    row.innerHTML = `
      <span>${OPTION_LABELS[opt]}</span>
      <span class="cos-option-price">+¥${OPTION_PRICES[opt].toLocaleString()}</span>
    `
    optionsEl.appendChild(row)
  })

  document.getElementById('summary-subtotal')!.textContent = `¥${subtotal.toLocaleString()}`
  document.getElementById('summary-tax')!.textContent = `含む`
  document.getElementById('summary-total')!.textContent = `¥${total.toLocaleString()}`
}

// --- プレミアムプランの場合、商標チェックオプションを自動チェック・無効化 ---
function handlePremiumOptions() {
  document.querySelectorAll<HTMLInputElement>('.plan-radio').forEach(radio => {
    radio.addEventListener('change', () => {
      const trademarkCheck = document.querySelector<HTMLInputElement>(
        '.option-check[value="trademark-check"]'
      )
      const trademarkCard = trademarkCheck?.closest('.option-card')
      if (radio.value === 'premium' && radio.checked) {
        if (trademarkCheck) {
          trademarkCheck.checked = true
          trademarkCheck.disabled = true
          trademarkCard?.classList.add('option-included-in-premium')
        }
      } else {
        if (trademarkCheck) {
          trademarkCheck.disabled = false
          trademarkCard?.classList.remove('option-included-in-premium')
        }
      }
    })
  })
}

// --- Stripe Elements 初期化 ---
async function initStripe() {
  const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  const elements = stripe.elements({
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#1A3A2A',
        colorBackground: '#ffffff',
        borderRadius: '8px',
      },
    },
  })

  const cardNumber = elements.create('cardNumber', { placeholder: '1234 5678 9012 3456' })
  const cardExpiry = elements.create('cardExpiry')
  const cardCvc    = elements.create('cardCvc')

  cardNumber.mount('#stripe-card-number')
  cardExpiry.mount('#stripe-card-expiry')
  cardCvc.mount('#stripe-card-cvc')

  cardNumber.on('change', (event) => {
    const errorEl = document.getElementById('stripe-error')!
    if (event.error) {
      errorEl.textContent = event.error.message
      errorEl.hidden = false
    } else {
      errorEl.hidden = true
    }
  })

  return { stripe, elements, cardNumber }
}

// --- 最終購入処理 ---
async function handlePurchase(state: CheckoutState, stripe: any, cardNumber: any) {
  const overlay = document.getElementById('processing-overlay')!
  overlay.hidden = false

  try {
    // 1. PaymentIntent を作成（サーバーサイド）
    const intentRes = await fetch('/api/checkout/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        logoId: state.logoId,
        plan: state.plan,
        options: state.options,
        amount: state.total,
      }),
    })
    const { clientSecret } = await intentRes.json()

    // 2. Stripe で決済確認
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardNumber },
    })

    if (error) {
      overlay.hidden = true
      const errorEl = document.getElementById('stripe-error')!
      errorEl.textContent = error.message || '決済に失敗しました'
      errorEl.hidden = false
      return
    }

    // 3. 購入完了処理（サーバーサイド）
    await fetch('/api/checkout/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
    })

    // 4. 完了画面表示
    overlay.hidden = true
    showCompleteStep(state)

  } catch (err) {
    overlay.hidden = true
    alert('エラーが発生しました。しばらく経ってから再度お試しください。')
  }
}

// --- 購入完了画面描画 ---
function showCompleteStep(state: CheckoutState) {
  document.querySelectorAll('.co-step').forEach(s => s.setAttribute('hidden', ''))
  const completeStep = document.getElementById('co-step-complete')!
  completeStep.removeAttribute('hidden')

  document.getElementById('complete-email')!.textContent = state.email
  document.getElementById('complete-brand-name')!.textContent = state.brandName
  document.getElementById('complete-plan-name')!.textContent =
    state.plan === 'standard' ? 'スタンダードプラン' : 'プレミアムプラン'
  document.getElementById('complete-total')!.textContent =
    `¥${state.total.toLocaleString()}（税込）`

  // sessionStorage をクリア
  sessionStorage.removeItem('logoai_wizard')
  sessionStorage.removeItem('logoai_regen_left')

  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

---

## 11. APIエンドポイント仕様

```
POST /api/checkout/create-payment-intent
Request:  { logoId, plan, options, amount }
Response: { clientSecret: string }
処理:     Stripe PaymentIntent を作成して clientSecret を返す

POST /api/checkout/complete
Request:  { paymentIntentId: string }
Response: { success: true, orderId: string }
処理:
  1. PaymentIntent の status を Stripe で確認
  2. 購入レコードをDBに保存
  3. 著作権帰属証明書PDFを生成
  4. 高解像度SVG/PDF/PNGのダウンロードURLを生成
  5. 購入完了メール（証明書添付）をユーザーに送信
  6. オプション購入分のデータを生成・メール添付
```

---

## 12. SEO・メタデータ

```html
<title>ご購入手続き | LogoAI.jp</title>
<meta name="robots" content="noindex, nofollow">
```

---

## 13. アクセシビリティ要件

| 要件 | 実装 |
|---|---|
| モーダルフォーカストラップ | 認証モーダル開閉時にフォーカス管理 |
| 処理中オーバーレイ | `aria-live="polite"` で読み上げ |
| エラーメッセージ | `role="alert"` で即時読み上げ |
| プラン選択 | `role="radiogroup"` + `aria-describedby` |
| コンビニ払い | `aria-disabled="true"` + disabled属性 |

---

## 14. レスポンシブ断点

| 断点 | 変更内容 |
|---|---|
| 1024px以下 | 2カラム→1カラム、サマリーをステップ上部に移動 |
| 768px以下 | プラン選択2列→1列 |
| 480px以下 | Stripe行→縦積み、確認テーブルの列幅調整 |

---

## 15. コンポーネント構成

```
app/checkout/page.tsx

components/checkout/
├── CheckoutHeader.tsx         ← 4ステップ進捗バー
├── CheckoutSummary.tsx        ← 右：注文サマリー（sticky）
├── Step1PlanOptions.tsx       ← プラン選択 + オプション
├── Step3Payment.tsx           ← Stripe Elements + コンビニ
├── Step4Confirm.tsx           ← 購入確認画面
├── Step5Complete.tsx          ← 購入完了
├── AuthModal.tsx              ← ログイン/新規登録モーダル
└── checkout.ts                ← 状態管理・Stripe統合

app/api/checkout/
├── create-payment-intent/route.ts
└── complete/route.ts
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次規格：/dashboard マイページ*
