# ロゴ生成ページ開発規格書 `/create`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：继承 `homepage-spec.md` 全部设计系统。
> **页面类型**：ロゴ生成フロー（単一ページ・多ステップWizard）
> **核心设计原则**：日本ユーザーの「失敗したくない」心理に応える確認感・安心感の設計。
>                   各ステップで「ちゃんと伝わった」という即時フィードバックを提供する。

---

## 1. ページ全体仕様

| 項目 | 内容 |
|---|---|
| 路由 | `/create` |
| クエリパラメータ | `?industry=cafe`（業種ページからの流入時にStep 2をプリフィル） |
| レイアウト | Navbar非表示（フロー集中モード）、フッター非表示 |
| 进度保存 | `sessionStorage` にステップ状態を保存（ブラウザバックで戻れる） |

### 1.1 ページ全体構造

```
<div class="create-page">
  <header class="create-header">        ← ロゴ + 進捗バー + 右側浮動カード
  <main class="create-main">
    <div class="step-container">
      <!-- Step 1〜6 を条件レンダリング -->
    </div>
  </main>
</div>
```

---

## 2. ヘッダー：ロゴ + 進捗バー

```html
<header class="create-header">
  <div class="ch-inner">
    <!-- ロゴ（クリックでホームへ） -->
    <a href="/" class="ch-logo" aria-label="LogoAI.jp ホームへ戻る">
      <span class="ch-logo-text">LogoAI.jp</span>
    </a>

    <!-- 進捗バー -->
    <nav class="progress-nav" aria-label="生成ステップ">
      <div class="progress-track" role="progressbar"
           aria-valuenow="{{ currentStep }}" aria-valuemin="1" aria-valuemax="4">

        <div class="pn-steps">
          <div class="pn-step {{ step >= 1 ? 'pns-active' : '' }} {{ step > 1 ? 'pns-done' : '' }}"
               aria-label="ステップ1: ブランド情報">
            <div class="pns-circle">
              {% if step > 1 %}<span class="pns-check" aria-hidden="true">✓</span>
              {% else %}<span class="pns-num" aria-hidden="true">1</span>{% endif %}
            </div>
            <span class="pns-label">ブランド情報</span>
          </div>

          <div class="pn-connector {{ step > 1 ? 'pnc-done' : '' }}" aria-hidden="true"></div>

          <div class="pn-step {{ step >= 2 ? 'pns-active' : '' }} {{ step > 2 ? 'pns-done' : '' }}"
               aria-label="ステップ2: 業種・用途">
            <div class="pns-circle">
              {% if step > 2 %}<span class="pns-check" aria-hidden="true">✓</span>
              {% else %}<span class="pns-num" aria-hidden="true">2</span>{% endif %}
            </div>
            <span class="pns-label">業種・用途</span>
          </div>

          <div class="pn-connector {{ step > 2 ? 'pnc-done' : '' }}" aria-hidden="true"></div>

          <div class="pn-step {{ step >= 3 ? 'pns-active' : '' }} {{ step > 3 ? 'pns-done' : '' }}"
               aria-label="ステップ3: 印象選択">
            <div class="pns-circle">
              {% if step > 3 %}<span class="pns-check" aria-hidden="true">✓</span>
              {% else %}<span class="pns-num" aria-hidden="true">3</span>{% endif %}
            </div>
            <span class="pns-label">印象選択</span>
          </div>

          <div class="pn-connector {{ step > 3 ? 'pnc-done' : '' }}" aria-hidden="true"></div>

          <div class="pn-step {{ step >= 4 ? 'pns-active' : '' }}"
               aria-label="ステップ4: 生成">
            <div class="pns-circle">
              <span class="pns-num" aria-hidden="true">4</span>
            </div>
            <span class="pns-label">生成</span>
          </div>
        </div>

        <!-- 下部のフィルバー -->
        <div class="progress-fill-bar" aria-hidden="true">
          <div class="pfb-fill" style="width: {{ (currentStep - 1) / 3 * 100 }}%"></div>
        </div>

      </div>
    </nav>

    <!-- 右側：サポートリンク -->
    <div class="ch-support">
      <a href="/faq" target="_blank" rel="noopener" class="ch-support-link">
        ❓ ヘルプ
      </a>
    </div>
  </div>
</header>
```

```css
.create-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid var(--color-border);
  padding: 0 var(--container-px);
  height: 64px;
}

.ch-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
}

.ch-logo {
  text-decoration: none;
  flex-shrink: 0;
}

.ch-logo-text {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-primary);
}

/* 進捗ナビ */
.progress-nav { flex: 1; }

.pn-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  position: relative;
}

.pn-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 1;
}

.pns-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-bg-section);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-number);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}

.pns-active .pns-circle {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  box-shadow: 0 0 0 4px rgba(26,58,42,0.12);
}

.pns-done .pns-circle {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.pns-check { font-size: var(--text-sm); font-weight: 700; }

.pns-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.pns-active .pns-label { color: var(--color-primary); }
.pns-done .pns-label { color: var(--color-success); }

/* コネクター */
.pn-connector {
  width: 80px;
  height: 2px;
  background: var(--color-border);
  flex-shrink: 0;
  margin-bottom: 18px;
  transition: background 0.3s ease;
}

.pnc-done { background: var(--color-success); }

/* 下部フィルバー */
.progress-fill-bar {
  height: 3px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  margin-top: 8px;
  overflow: hidden;
}

.pfb-fill {
  height: 100%;
  background: linear-gradient(to right, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

.ch-support {
  flex-shrink: 0;
  margin-left: auto;
}

.ch-support-link {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
}

@media (max-width: 768px) {
  .pn-connector { width: 32px; }
  .pns-label { display: none; }
  .ch-support { display: none; }
}
```

---

## 3. 右側浮動カード（PC専用）

```html
<!-- PC画面の右側に常時表示（sticky） -->
<aside class="create-aside" aria-label="完成後に受け取れるもの">
  <div class="aside-card">
    <div class="ac-title">完成後に受け取れるもの</div>
    <ul class="ac-list">
      <li class="ac-item">
        <span class="ac-check">✓</span>
        <span>8〜12案のロゴデザイン</span>
      </li>
      <li class="ac-item">
        <span class="ac-check">✓</span>
        <span>SVG・PNG・PDF形式</span>
      </li>
      <li class="ac-item">
        <span class="ac-check">✓</span>
        <span>著作権帰属証明書</span>
      </li>
      <li class="ac-item">
        <span class="ac-check">✓</span>
        <span>7日間全額返金保証</span>
      </li>
    </ul>
    <div class="ac-trust">
      <span>🔒 入力情報は安全に保護されます</span>
    </div>
  </div>
</aside>
```

```css
.create-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 40px;
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px var(--container-px);
  align-items: start;
}

.create-aside {
  position: sticky;
  top: 88px; /* header高さ + 余白 */
}

.aside-card {
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 24px;
}

.ac-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.ac-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ac-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.ac-check {
  color: var(--color-success);
  font-weight: 700;
  flex-shrink: 0;
}

.ac-trust {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 1024px) {
  .create-layout { grid-template-columns: 1fr; }
  .create-aside { display: none; }
}
```

---

## 4. Step 1：ブランド情報入力

```html
<section class="step-panel" id="step-1" aria-labelledby="step1-title">
  <div class="step-panel-inner">

    <div class="step-heading">
      <span class="step-badge">STEP 1</span>
      <h1 id="step1-title">ロゴに表示する情報を入力してください</h1>
      <p class="step-desc">入力した情報をもとにAIがフォントと配色を最適化します</p>
    </div>

    <form class="step-form" novalidate>

      <!-- ① ブランド名（必須） -->
      <div class="form-field">
        <label for="brand-name" class="field-label">
          ブランド名
          <span class="field-required" aria-label="必須">必須</span>
        </label>
        <input
          type="text"
          id="brand-name"
          name="brandName"
          class="field-input"
          placeholder="例）山本珈琲、田中法律事務所"
          maxlength="30"
          required
          autocomplete="organization"
          aria-describedby="brand-name-hint brand-name-count"
        >
        <div class="field-footer">
          <span id="brand-name-hint" class="field-hint">
            ロゴに大きく表示されるメインテキストです
          </span>
          <span id="brand-name-count" class="field-count" aria-live="polite">
            0 / 30
          </span>
        </div>
      </div>

      <!-- ② ふりがな（任意） -->
      <div class="form-field">
        <label for="brand-yomi" class="field-label">
          ふりがな
          <span class="field-optional">任意</span>
        </label>
        <input
          type="text"
          id="brand-yomi"
          name="brandYomi"
          class="field-input"
          placeholder="例）やまもとこーひー"
          maxlength="50"
          autocomplete="off"
          aria-describedby="brand-yomi-hint"
        >
        <div class="field-footer">
          <span id="brand-yomi-hint" class="field-hint field-hint-accent">
            💡 入力するとフォント提案の精度が上がります
          </span>
        </div>
      </div>

      <!-- ③ 英語・ローマ字表記（任意） -->
      <div class="form-field">
        <label for="brand-en" class="field-label">
          英語・ローマ字表記
          <span class="field-optional">任意</span>
        </label>
        <input
          type="text"
          id="brand-en"
          name="brandEn"
          class="field-input field-input-mono"
          placeholder="例）YAMAMOTO COFFEE"
          maxlength="40"
          autocomplete="off"
          aria-describedby="brand-en-hint"
        >
        <div class="field-footer">
          <span id="brand-en-hint" class="field-hint">
            サブテキストとしてロゴに追加できます
          </span>
        </div>
      </div>

      <!-- フォームバリデーションエラー -->
      <div class="form-error" id="step1-error" role="alert" hidden>
        <span>⚠️ ブランド名を入力してください</span>
      </div>

      <!-- 次へボタン -->
      <div class="step-actions">
        <button type="submit" class="btn-step-next" id="step1-next">
          次へ：業種と用途を選ぶ
          <span class="btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>

    </form>
  </div>
</section>
```

```css
/* ステップパネル共通 */
.step-panel {
  animation: stepFadeIn 0.3s ease;
}

@keyframes stepFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.step-panel-inner {
  max-width: 560px;
}

.step-heading { margin-bottom: 36px; }

.step-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  background: rgba(201,150,58,0.1);
  border: 1px solid rgba(201,150,58,0.2);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  margin-bottom: 10px;
}

.step-heading h1 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.35;
  margin: 0 0 8px;
}

.step-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* フォームフィールド */
.step-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.field-required {
  font-size: 0.6rem;
  font-weight: 700;
  color: white;
  background: #C41E3A;
  padding: 2px 6px;
  border-radius: var(--radius-full);
}

.field-optional {
  font-size: 0.6rem;
  font-weight: 500;
  color: var(--color-text-muted);
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  padding: 2px 6px;
  border-radius: var(--radius-full);
}

.field-input {
  width: 100%;
  padding: 14px 16px;
  font-size: var(--text-base);
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

.field-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(26,58,42,0.1);
}

.field-input::placeholder { color: var(--color-text-muted); }

.field-input.field-error {
  border-color: #C41E3A;
  box-shadow: 0 0 0 3px rgba(196,30,58,0.1);
}

.field-input-mono { font-family: monospace; letter-spacing: 0.05em; }

.field-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-hint {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.field-hint-accent {
  color: var(--color-primary);
  font-weight: 600;
}

.field-count {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: monospace;
  flex-shrink: 0;
}

/* バリデーションエラー */
.form-error {
  padding: 12px 16px;
  background: rgba(196,30,58,0.06);
  border: 1px solid rgba(196,30,58,0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: #C41E3A;
  font-weight: 600;
}

/* ステップアクション */
.step-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  padding-top: 8px;
}

.btn-step-next {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-step-next:hover {
  background: var(--color-primary-hover);
  transform: translateX(2px);
}

.btn-step-next:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
  transform: none;
}

.btn-arrow { font-size: var(--text-lg); }

.btn-step-back {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-family: var(--font-body);
}

.btn-step-back:hover { color: var(--color-text-primary); }
```

---

## 5. Step 2：業種選択（2階層）

```html
<section class="step-panel" id="step-2" aria-labelledby="step2-title">
  <div class="step-panel-inner" style="max-width: 680px">

    <div class="step-heading">
      <span class="step-badge">STEP 2</span>
      <h2 id="step2-title">あなたの業種を選んでください</h2>
      <p class="step-desc">業種によってフォント・配色・レイアウトが最適化されます</p>
    </div>

    <!-- 第1階層：12大カテゴリ -->
    <div class="industry-grid" role="radiogroup" aria-label="業種カテゴリ選択">

      <!-- 各カテゴリカード -->
      <div class="ind-category" data-category="food">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="food-sub"
                role="radio" aria-checked="false">
          <span class="ind-cat-icon" aria-hidden="true">🍜</span>
          <span class="ind-cat-name">飲食・カフェ</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <!-- 第2階層：サブカテゴリ -->
        <div class="ind-sub-list" id="food-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="cafe"
                  data-confirm="カフェ・喫茶店向けのフォントと配色で生成します">
            カフェ・喫茶店
          </button>
          <button class="ind-sub-btn" type="button" data-slug="restaurant"
                  data-confirm="飲食店・レストラン向けのフォントと配色で生成します">
            飲食店・レストラン
          </button>
          <button class="ind-sub-btn" type="button" data-slug="ramen"
                  data-confirm="ラーメン店向けのフォントと配色で生成します">
            ラーメン店
          </button>
          <button class="ind-sub-btn" type="button" data-slug="izakaya"
                  data-confirm="居酒屋・バー向けのフォントと配色で生成します">
            居酒屋・バー
          </button>
          <button class="ind-sub-btn" type="button" data-slug="sushi"
                  data-confirm="寿司・和食向けのフォントと配色で生成します">
            寿司・和食
          </button>
          <button class="ind-sub-btn" type="button" data-slug="bakery"
                  data-confirm="パン・ベーカリー向けのフォントと配色で生成します">
            パン・ベーカリー
          </button>
          <button class="ind-sub-btn" type="button" data-slug="sweets"
                  data-confirm="スイーツ・菓子向けのフォントと配色で生成します">
            スイーツ・菓子
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="beauty">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="beauty-sub">
          <span class="ind-cat-icon" aria-hidden="true">✂️</span>
          <span class="ind-cat-name">美容・健康</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="beauty-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="beauty-salon"
                  data-confirm="美容室・ヘアサロン向けのフォントと配色で生成します">
            美容室・ヘアサロン
          </button>
          <button class="ind-sub-btn" type="button" data-slug="nail-salon"
                  data-confirm="ネイルサロン向けのフォントと配色で生成します">
            ネイルサロン
          </button>
          <button class="ind-sub-btn" type="button" data-slug="esthetic"
                  data-confirm="エステ・スパ向けのフォントと配色で生成します">
            エステ・スパ
          </button>
          <button class="ind-sub-btn" type="button" data-slug="yoga"
                  data-confirm="ヨガ・フィットネス向けのフォントと配色で生成します">
            ヨガ・フィットネス
          </button>
          <button class="ind-sub-btn" type="button" data-slug="barber"
                  data-confirm="理容室・バーバー向けのフォントと配色で生成します">
            理容室・バーバー
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="it">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="it-sub">
          <span class="ind-cat-icon" aria-hidden="true">💻</span>
          <span class="ind-cat-name">IT・デジタル</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="it-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="it-startup"
                  data-confirm="IT・スタートアップ向けのフォントと配色で生成します">
            IT・スタートアップ
          </button>
          <button class="ind-sub-btn" type="button" data-slug="web-design"
                  data-confirm="Web制作・デザイン向けのフォントと配色で生成します">
            Web制作・デザイン
          </button>
          <button class="ind-sub-btn" type="button" data-slug="app-dev"
                  data-confirm="アプリ開発向けのフォントと配色で生成します">
            アプリ開発
          </button>
          <button class="ind-sub-btn" type="button" data-slug="saas"
                  data-confirm="SaaS・クラウド向けのフォントと配色で生成します">
            SaaS・クラウド
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="legal">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="legal-sub">
          <span class="ind-cat-icon" aria-hidden="true">⚖️</span>
          <span class="ind-cat-name">士業・専門職</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="legal-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="lawyer"
                  data-confirm="弁護士・法律事務所向けのフォントと配色で生成します">
            弁護士・法律事務所
          </button>
          <button class="ind-sub-btn" type="button" data-slug="accountant"
                  data-confirm="税理士・会計士向けのフォントと配色で生成します">
            税理士・会計士
          </button>
          <button class="ind-sub-btn" type="button" data-slug="judicial-scrivener"
                  data-confirm="司法書士向けのフォントと配色で生成します">
            司法書士
          </button>
          <button class="ind-sub-btn" type="button" data-slug="labor-consult"
                  data-confirm="社労士向けのフォントと配色で生成します">
            社労士
          </button>
          <button class="ind-sub-btn" type="button" data-slug="patent-attorney"
                  data-confirm="弁理士向けのフォントと配色で生成します">
            弁理士
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="medical">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="medical-sub">
          <span class="ind-cat-icon" aria-hidden="true">🏥</span>
          <span class="ind-cat-name">医療・クリニック</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="medical-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="clinic"
                  data-confirm="クリニック・医院向けのフォントと配色で生成します">
            クリニック・医院
          </button>
          <button class="ind-sub-btn" type="button" data-slug="dental"
                  data-confirm="歯科・デンタル向けのフォントと配色で生成します">
            歯科・デンタル
          </button>
          <button class="ind-sub-btn" type="button" data-slug="pharmacy"
                  data-confirm="薬局・調剤向けのフォントと配色で生成します">
            薬局・調剤
          </button>
          <button class="ind-sub-btn" type="button" data-slug="counseling"
                  data-confirm="心理・カウンセリング向けのフォントと配色で生成します">
            心理・カウンセリング
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="education">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="education-sub">
          <span class="ind-cat-icon" aria-hidden="true">📚</span>
          <span class="ind-cat-name">教育・スクール</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="education-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="education"
                  data-confirm="学習塾・教育向けのフォントと配色で生成します">
            学習塾・教育
          </button>
          <button class="ind-sub-btn" type="button" data-slug="language"
                  data-confirm="語学スクール向けのフォントと配色で生成します">
            語学スクール
          </button>
          <button class="ind-sub-btn" type="button" data-slug="music"
                  data-confirm="音楽教室向けのフォントと配色で生成します">
            音楽教室
          </button>
          <button class="ind-sub-btn" type="button" data-slug="kids"
                  data-confirm="子ども向け・保育向けのフォントと配色で生成します">
            子ども向け・保育
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="realestate">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="realestate-sub">
          <span class="ind-cat-icon" aria-hidden="true">🏠</span>
          <span class="ind-cat-name">不動産・建設</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="realestate-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="real-estate"
                  data-confirm="不動産向けのフォントと配色で生成します">
            不動産
          </button>
          <button class="ind-sub-btn" type="button" data-slug="construction"
                  data-confirm="建設・工務店向けのフォントと配色で生成します">
            建設・工務店
          </button>
          <button class="ind-sub-btn" type="button" data-slug="interior"
                  data-confirm="インテリア・内装向けのフォントと配色で生成します">
            インテリア・内装
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="ec">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="ec-sub">
          <span class="ind-cat-icon" aria-hidden="true">🛍️</span>
          <span class="ind-cat-name">小売・EC</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="ec-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="ec-retail"
                  data-confirm="EC・ネットショップ向けのフォントと配色で生成します">
            EC・ネットショップ
          </button>
          <button class="ind-sub-btn" type="button" data-slug="fashion"
                  data-confirm="ファッション・アパレル向けのフォントと配色で生成します">
            ファッション・アパレル
          </button>
          <button class="ind-sub-btn" type="button" data-slug="food-ec"
                  data-confirm="食品EC・通販向けのフォントと配色で生成します">
            食品EC・通販
          </button>
          <button class="ind-sub-btn" type="button" data-slug="handmade"
                  data-confirm="ハンドメイド・作家向けのフォントと配色で生成します">
            ハンドメイド・作家
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="finance">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="finance-sub">
          <span class="ind-cat-icon" aria-hidden="true">💰</span>
          <span class="ind-cat-name">金融・保険</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="finance-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="finance"
                  data-confirm="ファイナンシャル・投資向けのフォントと配色で生成します">
            ファイナンシャル・投資
          </button>
          <button class="ind-sub-btn" type="button" data-slug="insurance"
                  data-confirm="保険・代理店向けのフォントと配色で生成します">
            保険・代理店
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="creative">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="creative-sub">
          <span class="ind-cat-icon" aria-hidden="true">📷</span>
          <span class="ind-cat-name">クリエイティブ</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="creative-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="photography"
                  data-confirm="フォトグラファー向けのフォントと配色で生成します">
            フォトグラファー・写真
          </button>
          <button class="ind-sub-btn" type="button" data-slug="design-agency"
                  data-confirm="デザイン・クリエイティブ向けのフォントと配色で生成します">
            デザイン・クリエイティブ
          </button>
          <button class="ind-sub-btn" type="button" data-slug="video"
                  data-confirm="映像・動画制作向けのフォントと配色で生成します">
            映像・動画制作
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="event">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="event-sub">
          <span class="ind-cat-icon" aria-hidden="true">💒</span>
          <span class="ind-cat-name">ブライダル・イベント</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="event-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="wedding"
                  data-confirm="ブライダル・結婚式向けのフォントと配色で生成します">
            ブライダル・結婚式
          </button>
          <button class="ind-sub-btn" type="button" data-slug="event"
                  data-confirm="イベント・企画向けのフォントと配色で生成します">
            イベント・企画
          </button>
        </div>
      </div>

      <div class="ind-category" data-category="other">
        <button class="ind-cat-btn" type="button"
                aria-expanded="false" aria-controls="other-sub">
          <span class="ind-cat-icon" aria-hidden="true">🔧</span>
          <span class="ind-cat-name">その他</span>
          <span class="ind-cat-arrow" aria-hidden="true">›</span>
        </button>
        <div class="ind-sub-list" id="other-sub" hidden>
          <button class="ind-sub-btn" type="button" data-slug="cleaning"
                  data-confirm="クリーニング・清掃向けのフォントと配色で生成します">
            クリーニング・清掃
          </button>
          <button class="ind-sub-btn" type="button" data-slug="pet"
                  data-confirm="ペット・動物向けのフォントと配色で生成します">
            ペット・動物
          </button>
          <button class="ind-sub-btn" type="button" data-slug="travel"
                  data-confirm="旅行・観光向けのフォントと配色で生成します">
            旅行・観光
          </button>
          <button class="ind-sub-btn" type="button" data-slug="consulting"
                  data-confirm="コンサルティング向けのフォントと配色で生成します">
            コンサルティング
          </button>
        </div>
      </div>

    </div>

    <!-- 選択後の確認テキスト（選択前は非表示） -->
    <div class="industry-confirm" id="industry-confirm" hidden
         aria-live="polite" role="status">
      <span class="ic-check" aria-hidden="true">✓</span>
      <span class="ic-text" id="industry-confirm-text"></span>
    </div>

    <!-- 用途選択（業種選択後に展開） -->
    <div class="usage-section" id="usage-section" hidden>
      <div class="usage-divider" aria-hidden="true"></div>
      <h3 class="usage-title">主な使用用途を選んでください
        <span class="usage-sub">（複数選択可）</span>
      </h3>

      <div class="usage-grid" role="group" aria-label="使用用途選択">
        <label class="usage-card">
          <input type="checkbox" name="usage" value="signage" class="usage-input">
          <span class="uc-inner">
            <span class="uc-icon" aria-hidden="true">🪧</span>
            <span class="uc-label">看板・のれん</span>
          </span>
        </label>
        <label class="usage-card">
          <input type="checkbox" name="usage" value="card" class="usage-input">
          <span class="uc-inner">
            <span class="uc-icon" aria-hidden="true">💳</span>
            <span class="uc-label">名刺・ショップカード</span>
          </span>
        </label>
        <label class="usage-card">
          <input type="checkbox" name="usage" value="sns" class="usage-input">
          <span class="uc-inner">
            <span class="uc-icon" aria-hidden="true">📱</span>
            <span class="uc-label">SNSアイコン</span>
          </span>
        </label>
        <label class="usage-card">
          <input type="checkbox" name="usage" value="web" class="usage-input">
          <span class="uc-inner">
            <span class="uc-icon" aria-hidden="true">🌐</span>
            <span class="uc-label">Webサイト・EC</span>
          </span>
        </label>
        <label class="usage-card">
          <input type="checkbox" name="usage" value="package" class="usage-input">
          <span class="uc-inner">
            <span class="uc-icon" aria-hidden="true">📦</span>
            <span class="uc-label">パッケージ・袋</span>
          </span>
        </label>
        <label class="usage-card">
          <input type="checkbox" name="usage" value="print" class="usage-input">
          <span class="uc-inner">
            <span class="uc-icon" aria-hidden="true">📄</span>
            <span class="uc-label">チラシ・印刷物</span>
          </span>
        </label>
      </div>

      <!-- 用途選択後の即時フィードバック -->
      <div class="usage-feedback" id="usage-feedback" hidden
           aria-live="polite" role="status">
        <span class="uf-icon" aria-hidden="true">💡</span>
        <span class="uf-text" id="usage-feedback-text"></span>
      </div>

      <div class="step-actions">
        <button type="button" class="btn-step-next" id="step2-next" disabled>
          次へ：印象を選ぶ
          <span class="btn-arrow" aria-hidden="true">→</span>
        </button>
        <button type="button" class="btn-step-back" id="step2-back">
          ← 戻る
        </button>
      </div>
    </div>

  </div>
</section>
```

```css
/* 業種グリッド */
.industry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.ind-cat-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  text-align: left;
  transition: all 0.2s ease;
}

.ind-cat-btn:hover {
  border-color: var(--color-primary);
  background: rgba(26,58,42,0.03);
}

.ind-cat-btn[aria-expanded="true"] {
  border-color: var(--color-primary);
  background: rgba(26,58,42,0.05);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  border-bottom-color: transparent;
}

.ind-cat-icon { font-size: 20px; flex-shrink: 0; }
.ind-cat-name { flex: 1; }
.ind-cat-arrow {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  transition: transform 0.2s ease;
}

.ind-cat-btn[aria-expanded="true"] .ind-cat-arrow { transform: rotate(90deg); }

/* サブカテゴリリスト */
.ind-category { position: relative; }

.ind-sub-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1.5px solid var(--color-primary);
  border-top: none;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  z-index: 10;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.ind-sub-btn {
  display: block;
  width: 100%;
  padding: 11px 16px;
  text-align: left;
  background: white;
  border: none;
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.ind-sub-btn:last-child { border-bottom: none; }

.ind-sub-btn:hover {
  background: rgba(26,58,42,0.05);
  color: var(--color-primary);
  padding-left: 20px;
}

.ind-sub-btn.selected {
  background: rgba(26,58,42,0.08);
  color: var(--color-primary);
  font-weight: 700;
}

/* 業種確認テキスト */
.industry-confirm {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(45,122,79,0.06);
  border: 1px solid rgba(45,122,79,0.2);
  border-radius: var(--radius-lg);
  margin-bottom: 28px;
  animation: stepFadeIn 0.25s ease;
}

.ic-check { color: var(--color-success); font-weight: 700; font-size: var(--text-lg); }
.ic-text { font-size: var(--text-sm); color: var(--color-primary); font-weight: 600; }

/* 用途セクション */
.usage-divider {
  height: 1px;
  background: var(--color-border);
  margin: 24px 0;
}

.usage-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 16px;
}

.usage-sub {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.usage-card { display: block; cursor: pointer; }

.usage-input {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
}

.uc-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 12px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all 0.2s ease;
}

.usage-input:checked + .uc-inner {
  border-color: var(--color-primary);
  background: rgba(26,58,42,0.05);
  box-shadow: 0 0 0 3px rgba(26,58,42,0.1);
}

.usage-card:hover .uc-inner { border-color: var(--color-primary); }

.uc-icon { font-size: 24px; }
.uc-label { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-secondary); }

.usage-input:checked + .uc-inner .uc-label { color: var(--color-primary); }

/* 用途フィードバック */
.usage-feedback {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(201,150,58,0.06);
  border: 1px solid rgba(201,150,58,0.2);
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
  animation: stepFadeIn 0.25s ease;
}

.uf-icon { font-size: var(--text-lg); flex-shrink: 0; }
.uf-text { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6; }

@media (max-width: 768px) {
  .industry-grid { grid-template-columns: repeat(2, 1fr); }
  .usage-grid { grid-template-columns: repeat(2, 1fr); }
  .ind-sub-list { position: static; border-top: 1px solid rgba(26,58,42,0.1); border-radius: 0 0 var(--radius-xl) var(--radius-xl); }
}
```

---

## 6. Step 3：印象選択

```html
<section class="step-panel" id="step-3" aria-labelledby="step3-title">
  <div class="step-panel-inner" style="max-width: 640px">

    <div class="step-heading">
      <span class="step-badge">STEP 3</span>
      <h2 id="step3-title">ロゴの印象を選んでください</h2>
      <p class="step-desc">
        最大2つまで選択できます。選びすぎると方向性がぼやけます。
        <strong>直感で選んでください。</strong>
      </p>
    </div>

    <!-- 印象カード（最大2つ選択） -->
    <div class="impression-grid" role="group" aria-label="印象選択（最大2つ）"
         id="impression-grid">

      <label class="imp-card">
        <input type="checkbox" name="impression" value="trustworthy" class="imp-input"
               aria-label="信頼感">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">🏛️</span>
          <span class="imp-label">信頼感</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="friendly" class="imp-input"
               aria-label="親しみやすい">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">😊</span>
          <span class="imp-label">親しみやすい</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="luxury" class="imp-input"
               aria-label="高級感">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">💎</span>
          <span class="imp-label">高級感</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="japanese" class="imp-input"
               aria-label="和風">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">⛩️</span>
          <span class="imp-label">和風</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="simple" class="imp-input"
               aria-label="シンプル">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">◼️</span>
          <span class="imp-label">シンプル</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="cute" class="imp-input"
               aria-label="可愛い">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">🌸</span>
          <span class="imp-label">可愛い</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="powerful" class="imp-input"
               aria-label="力強い">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">💪</span>
          <span class="imp-label">力強い</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="modern" class="imp-input"
               aria-label="モダン">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">🔷</span>
          <span class="imp-label">モダン</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="natural" class="imp-input"
               aria-label="ナチュラル">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">🌿</span>
          <span class="imp-label">ナチュラル</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="stylish" class="imp-input"
               aria-label="スタイリッシュ">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">✨</span>
          <span class="imp-label">スタイリッシュ</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="pop" class="imp-input"
               aria-label="ポップ">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">🎨</span>
          <span class="imp-label">ポップ</span>
        </span>
      </label>

      <label class="imp-card">
        <input type="checkbox" name="impression" value="cool" class="imp-input"
               aria-label="クール">
        <span class="imp-inner">
          <span class="imp-icon" aria-hidden="true">🧊</span>
          <span class="imp-label">クール</span>
        </span>
      </label>

    </div>

    <!-- 選択カウント -->
    <div class="imp-count" aria-live="polite" role="status">
      <span id="imp-count-text">0 / 2 選択中</span>
    </div>

    <!-- 避けたい印象（任意・1つまで） -->
    <div class="avoid-section">
      <div class="avoid-header" id="avoid-toggle-btn"
           role="button" tabindex="0" aria-expanded="false"
           aria-controls="avoid-options">
        <span class="avoid-toggle-icon" aria-hidden="true">›</span>
        <span>避けたい印象はありますか？</span>
        <span class="avoid-optional">任意・1つまで</span>
      </div>
      <div class="avoid-options" id="avoid-options" hidden>
        <div class="avoid-chips" role="group" aria-label="避けたい印象">
          <label class="avoid-chip">
            <input type="radio" name="avoid" value="cheap" class="avoid-input">
            <span>安っぽく見える</span>
          </label>
          <label class="avoid-chip">
            <input type="radio" name="avoid" value="childish" class="avoid-input">
            <span>子供っぽい</span>
          </label>
          <label class="avoid-chip">
            <input type="radio" name="avoid" value="old" class="avoid-input">
            <span>古くさい</span>
          </label>
          <label class="avoid-chip">
            <input type="radio" name="avoid" value="heavy" class="avoid-input">
            <span>重たい</span>
          </label>
          <label class="avoid-chip">
            <input type="radio" name="avoid" value="flashy" class="avoid-input">
            <span>派手すぎる</span>
          </label>
        </div>
      </div>
    </div>

    <div class="step-actions">
      <button type="button" class="btn-step-next" id="step3-next" disabled>
        入力内容を確認する
        <span class="btn-arrow" aria-hidden="true">→</span>
      </button>
      <button type="button" class="btn-step-back" id="step3-back">
        ← 戻る
      </button>
    </div>

  </div>
</section>
```

```css
/* 印象グリッド */
.impression-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}

.imp-card { display: block; cursor: pointer; }

.imp-input {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
}

.imp-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 10px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all 0.2s ease;
  user-select: none;
}

.imp-input:checked + .imp-inner {
  border-color: var(--color-primary);
  background: rgba(26,58,42,0.06);
  box-shadow: 0 0 0 3px rgba(26,58,42,0.1);
}

/* 2つ選択後、未選択カードを淡色に */
.impression-grid.max-reached .imp-card:not(.selected) .imp-inner {
  opacity: 0.4;
  cursor: not-allowed;
}

.imp-icon { font-size: 24px; }
.imp-label { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-secondary); }
.imp-input:checked + .imp-inner .imp-label { color: var(--color-primary); }

/* 選択カウント */
.imp-count {
  text-align: right;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 20px;
  font-weight: 600;
}

/* 避けたい印象 */
.avoid-section {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 28px;
}

.avoid-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 600;
  background: var(--color-bg-section);
  user-select: none;
  transition: background 0.2s;
}

.avoid-header:hover { background: rgba(26,58,42,0.04); }

.avoid-toggle-icon {
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  transition: transform 0.2s ease;
}

.avoid-header[aria-expanded="true"] .avoid-toggle-icon { transform: rotate(90deg); }

.avoid-optional {
  margin-left: auto;
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--color-text-muted);
}

.avoid-options { padding: 14px 16px; background: white; }

.avoid-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.avoid-chip { display: block; cursor: pointer; }

.avoid-input {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
}

.avoid-chip span {
  display: block;
  padding: 8px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: all 0.2s;
}

.avoid-input:checked + span {
  border-color: #C41E3A;
  background: rgba(196,30,58,0.06);
  color: #C41E3A;
  font-weight: 700;
}

@media (max-width: 640px) {
  .impression-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 7. Step 4：確認画面

```html
<section class="step-panel" id="step-4" aria-labelledby="step4-title">
  <div class="step-panel-inner">

    <div class="step-heading">
      <span class="step-badge">STEP 4</span>
      <h2 id="step4-title">生成内容の確認</h2>
      <p class="step-desc">以下の内容でロゴを生成します。修正がある場合は戻って変更できます。</p>
    </div>

    <!-- 確認カード -->
    <div class="confirm-card">
      <div class="confirm-row">
        <span class="cr-label">ブランド名</span>
        <span class="cr-value" id="confirm-brand-name">—</span>
        <button class="cr-edit" type="button" data-goto="1" aria-label="ブランド名を修正">修正</button>
      </div>
      <div class="confirm-row">
        <span class="cr-label">ふりがな</span>
        <span class="cr-value" id="confirm-brand-yomi">（未入力）</span>
        <button class="cr-edit" type="button" data-goto="1" aria-label="ふりがなを修正">修正</button>
      </div>
      <div class="confirm-row">
        <span class="cr-label">英語表記</span>
        <span class="cr-value" id="confirm-brand-en">（未入力）</span>
        <button class="cr-edit" type="button" data-goto="1" aria-label="英語表記を修正">修正</button>
      </div>
      <div class="confirm-row">
        <span class="cr-label">業種</span>
        <span class="cr-value" id="confirm-industry">—</span>
        <button class="cr-edit" type="button" data-goto="2" aria-label="業種を修正">修正</button>
      </div>
      <div class="confirm-row">
        <span class="cr-label">使用用途</span>
        <span class="cr-value" id="confirm-usage">—</span>
        <button class="cr-edit" type="button" data-goto="2" aria-label="使用用途を修正">修正</button>
      </div>
      <div class="confirm-row">
        <span class="cr-label">ロゴの印象</span>
        <span class="cr-value" id="confirm-impression">—</span>
        <button class="cr-edit" type="button" data-goto="3" aria-label="ロゴの印象を修正">修正</button>
      </div>
      <div class="confirm-row" id="confirm-avoid-row">
        <span class="cr-label">避けたい印象</span>
        <span class="cr-value" id="confirm-avoid">（未選択）</span>
        <button class="cr-edit" type="button" data-goto="3" aria-label="避けたい印象を修正">修正</button>
      </div>
    </div>

    <!-- 生成ボタン -->
    <div class="step-actions" style="margin-top: 32px">
      <button type="button" class="btn-generate" id="btn-generate">
        <span class="bg-icon" aria-hidden="true">✨</span>
        ロゴを生成する
        <span class="bg-count">（8〜12案）</span>
      </button>
      <button type="button" class="btn-step-back" id="step4-back">
        ← 戻る
      </button>
    </div>

    <!-- 生成後の注意 -->
    <p class="confirm-note">
      生成には約8秒かかります。
      生成されたロゴは無料でご確認いただけます。
    </p>

  </div>
</section>
```

```css
/* 確認カード */
.confirm-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  margin-bottom: 8px;
}

.confirm-row {
  display: grid;
  grid-template-columns: 120px 1fr auto;
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

.cr-value {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  font-weight: 500;
  word-break: break-all;
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
  flex-shrink: 0;
}

.cr-edit:hover {
  background: var(--color-primary);
  color: white;
}

/* 生成ボタン */
.btn-generate {
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

.btn-generate:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26,58,42,0.3);
}

.bg-icon { font-size: var(--text-2xl); }

.bg-count {
  font-size: var(--text-sm);
  font-weight: 500;
  opacity: 0.7;
}

.confirm-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: center;
  margin-top: 12px;
}

@media (max-width: 640px) {
  .confirm-row { grid-template-columns: 90px 1fr auto; padding: 14px 16px; }
}
```

---

## 8. Step 5（生成中）：ローディング画面

```html
<section class="step-panel generating-panel" id="step-generating"
         aria-labelledby="generating-title" aria-live="polite">
  <div class="step-panel-inner" style="max-width: 480px; text-align: center">

    <!-- スピナー -->
    <div class="gen-spinner-wrap" aria-hidden="true">
      <div class="gen-spinner"></div>
      <div class="gen-spinner-ring"></div>
    </div>

    <h2 id="generating-title" class="gen-title">
      AIがロゴを生成しています...
    </h2>

    <!-- ブランド名表示 -->
    <div class="gen-brand-preview" aria-hidden="true">
      「<span id="gen-brand-name-display"></span>」のロゴを作成中
    </div>

    <!-- 進捗ステップ -->
    <div class="gen-steps" role="log" aria-label="生成進捗">
      <div class="gen-step gen-step-done" id="gstep-1">
        <span class="gs-icon gs-done" aria-hidden="true">✓</span>
        <span class="gs-text">業種「<span class="gen-industry-label"></span>」のデータを分析</span>
      </div>
      <div class="gen-step gen-step-done" id="gstep-2">
        <span class="gs-icon gs-done" aria-hidden="true">✓</span>
        <span class="gs-text">印象に合う日本語フォントを選定中</span>
      </div>
      <div class="gen-step gen-step-active" id="gstep-3">
        <span class="gs-icon gs-active" aria-hidden="true">▸</span>
        <span class="gs-text">
          <span id="usage-layout-text">使用用途に合わせたレイアウトを構築中</span>...
        </span>
      </div>
      <div class="gen-step gen-step-pending" id="gstep-4">
        <span class="gs-icon gs-pending" aria-hidden="true">◦</span>
        <span class="gs-text">8〜12案のデザインを仕上げています</span>
      </div>
    </div>

    <!-- プログレスバー -->
    <div class="gen-progress-wrap" aria-hidden="true">
      <div class="gen-progress-bar">
        <div class="gen-progress-fill" id="gen-progress-fill"></div>
      </div>
      <div class="gen-progress-label">
        <span id="gen-progress-pct">0%</span>
        <span class="gen-progress-time">平均生成時間：約8秒</span>
      </div>
    </div>

  </div>
</section>
```

```css
.generating-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

/* スピナー */
.gen-spinner-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 28px;
}

.gen-spinner {
  width: 80px;
  height: 80px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: genSpin 1s linear infinite;
}

.gen-spinner-ring {
  position: absolute;
  inset: 8px;
  border: 2px solid transparent;
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: genSpin 1.5s linear infinite reverse;
}

@keyframes genSpin {
  to { transform: rotate(360deg); }
}

.gen-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 8px;
}

.gen-brand-preview {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

/* 進捗ステップ */
.gen-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
  margin-bottom: 28px;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
}

.gen-step {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gs-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: 700;
  flex-shrink: 0;
}

.gs-done { background: var(--color-success); color: white; }
.gs-active { background: var(--color-accent); color: var(--color-text-primary); animation: pulseDot 1.5s ease infinite; }
.gs-pending { background: var(--color-border); color: var(--color-text-muted); }

@keyframes pulseDot {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.gs-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.gen-step-done .gs-text { color: var(--color-text-secondary); }
.gen-step-active .gs-text { color: var(--color-text-primary); font-weight: 600; }
.gen-step-pending .gs-text { color: var(--color-text-muted); }

/* プログレスバー */
.gen-progress-wrap { width: 100%; max-width: 360px; margin: 0 auto; }

.gen-progress-bar {
  height: 8px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 8px;
}

.gen-progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
  width: 0%;
}

.gen-progress-label {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* 生成中はサイドカードを非表示 */
.generating-panel ~ .create-aside { display: none; }
```

---

## 9. JavaScript（状態管理・インタラクション）

```typescript
// create-wizard.ts
// 全ステップの状態管理とインタラクション

interface WizardState {
  currentStep: number           // 1〜5
  brandName: string
  brandYomi: string
  brandEn: string
  industrySlug: string         // e.g. 'cafe'
  industryLabel: string        // e.g. 'カフェ・喫茶店'
  industryCategoryId: string   // e.g. 'food'
  usage: string[]              // ['signage', 'card']
  impression: string[]         // ['natural', 'friendly']（最大2つ）
  avoid: string                // 'old' | '' 
}

// --- 初期化 ---
const state: WizardState = loadFromSession() || {
  currentStep: 1,
  brandName: '', brandYomi: '', brandEn: '',
  industrySlug: '', industryLabel: '', industryCategoryId: '',
  usage: [], impression: [], avoid: '',
}

// URLパラメータからプリフィル
const urlParams = new URLSearchParams(window.location.search)
const preIndustry = urlParams.get('industry')
if (preIndustry) {
  const matched = INDUSTRY_LIST.find(i => i.slug === preIndustry)
  if (matched) {
    state.industrySlug = matched.slug
    state.industryLabel = matched.name
  }
}

// --- ステップ遷移 ---
function goToStep(step: number) {
  state.currentStep = step
  saveToSession(state)
  renderStep(step)
  updateProgressBar(step)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- 用途選択後のフィードバックテキスト ---
const USAGE_FEEDBACK: Record<string, string> = {
  signage: '看板用途が選択されました。横長レイアウトを優先・高コントラスト配色で生成します。',
  card:    '名刺用途が選択されました。91×55mmサイズのプレビューも自動生成します。',
  sns:     'SNSアイコン用途が選択されました。正方形・丸形プレビューを自動生成します。',
  package: 'パッケージ用途が選択されました。印刷向けの高解像度データを準備します。',
  web:     'Web用途が選択されました。SVGとファビコン用データを最適化します。',
  print:   '印刷物用途が選択されました。CMYKに変換しやすいカラー設定で生成します。',
}

function buildUsageFeedback(selected: string[]): string {
  if (selected.length === 0) return ''
  const labels = selected.map(v => USAGE_FEEDBACK[v]).filter(Boolean)
  return labels.join('<br>')
}

// --- 印象の最大2選択制御 ---
function setupImpressionLimit() {
  const checkboxes = document.querySelectorAll<HTMLInputElement>('.imp-input')
  const grid = document.getElementById('impression-grid')!
  const countText = document.getElementById('imp-count-text')!

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = Array.from(checkboxes).filter(c => c.checked)
      if (checked.length > 2) {
        cb.checked = false
        return
      }
      state.impression = checked.map(c => c.value)
      countText.textContent = `${checked.length} / 2 選択中`
      grid.classList.toggle('max-reached', checked.length >= 2)
      // 次へボタンの活性化
      const nextBtn = document.getElementById('step3-next') as HTMLButtonElement
      nextBtn.disabled = checked.length === 0
    })
  })
}

// --- 確認画面の描画 ---
function renderConfirmScreen() {
  const USAGE_LABELS: Record<string, string> = {
    signage: '看板・のれん', card: '名刺・ショップカード',
    sns: 'SNSアイコン', web: 'Webサイト・EC',
    package: 'パッケージ・袋', print: 'チラシ・印刷物',
  }
  const IMP_LABELS: Record<string, string> = {
    trustworthy: '信頼感', friendly: '親しみやすい', luxury: '高級感',
    japanese: '和風', simple: 'シンプル', cute: '可愛い',
    powerful: '力強い', modern: 'モダン', natural: 'ナチュラル',
    stylish: 'スタイリッシュ', pop: 'ポップ', cool: 'クール',
  }
  const AVOID_LABELS: Record<string, string> = {
    cheap: '安っぽく見える', childish: '子供っぽい',
    old: '古くさい', heavy: '重たい', flashy: '派手すぎる',
  }

  document.getElementById('confirm-brand-name')!.textContent = state.brandName || '—'
  document.getElementById('confirm-brand-yomi')!.textContent = state.brandYomi || '（未入力）'
  document.getElementById('confirm-brand-en')!.textContent = state.brandEn || '（未入力）'
  document.getElementById('confirm-industry')!.textContent = state.industryLabel || '—'
  document.getElementById('confirm-usage')!.textContent =
    state.usage.map(v => USAGE_LABELS[v]).join('・') || '（未選択）'
  document.getElementById('confirm-impression')!.textContent =
    state.impression.map(v => IMP_LABELS[v]).join('・') || '—'
  document.getElementById('confirm-avoid')!.textContent =
    state.avoid ? AVOID_LABELS[state.avoid] : '（未選択）'
}

// --- 生成中アニメーション ---
function startGenerating() {
  goToStep(5)

  // ブランド名表示
  const display = document.getElementById('gen-brand-name-display')!
  display.textContent = state.brandName
  document.querySelectorAll('.gen-industry-label').forEach(el => {
    el.textContent = state.industryLabel
  })

  // 用途に応じたメッセージ
  const usageMsg = state.usage.includes('signage')
    ? '看板・名刺用レイアウトを構築中'
    : state.usage.includes('sns')
      ? 'SNSアイコン向け正方形レイアウトを構築中'
      : '使用用途に合わせたレイアウトを構築中'
  document.getElementById('usage-layout-text')!.textContent = usageMsg

  // プログレスアニメーション（8秒）
  const fill = document.getElementById('gen-progress-fill')!
  const pct = document.getElementById('gen-progress-pct')!
  let progress = 0
  const steps = [
    { at: 1000, progress: 30, stepId: 'gstep-2', activateNext: 'gstep-3' },
    { at: 3000, progress: 60, stepId: 'gstep-3', activateNext: 'gstep-4' },
    { at: 6000, progress: 85, stepId: 'gstep-4', activateNext: null },
    { at: 8000, progress: 100, stepId: null, activateNext: null },
  ]

  steps.forEach(({ at, progress: p, stepId, activateNext }) => {
    setTimeout(() => {
      fill.style.width = `${p}%`
      pct.textContent = `${p}%`
      if (stepId) {
        const el = document.getElementById(stepId)!
        el.className = 'gen-step gen-step-done'
        el.querySelector('.gs-icon')!.className = 'gs-icon gs-done'
        el.querySelector('.gs-icon')!.textContent = '✓'
      }
      if (activateNext) {
        const next = document.getElementById(activateNext)!
        next.className = 'gen-step gen-step-active'
        next.querySelector('.gs-icon')!.className = 'gs-icon gs-active'
        next.querySelector('.gs-icon')!.textContent = '▸'
      }
      if (p === 100) {
        // 生成完了 → 結果ページへ遷移
        setTimeout(() => {
          window.location.href = '/create/result'
        }, 500)
      }
    }, at)
  })
}

// --- sessionStorage 保存/読み込み ---
function saveToSession(s: WizardState) {
  sessionStorage.setItem('logoai_wizard', JSON.stringify(s))
}

function loadFromSession(): WizardState | null {
  const raw = sessionStorage.getItem('logoai_wizard')
  return raw ? JSON.parse(raw) : null
}
```

---

## 10. 用途別フィードバックテキスト仕様

| 選択用途 | フィードバックテキスト |
|---|---|
| 看板のみ | 横長レイアウトを優先・高コントラスト配色で生成します |
| 看板 + 名刺 | 横長・縦長両対応のレイアウトで生成します。名刺サイズ（91×55mm）プレビューも自動生成します |
| SNSアイコン | 正方形・丸形プレビューを自動生成します |
| パッケージ | 印刷向け高解像度データ（300dpi以上）を準備します |
| Web | SVGとファビコン用（32px・64px）データを最適化します |
| 複数選択（3つ以上） | 選択された全用途に対応するレイアウトバリエーションで生成します |

---

## 11. バリデーションルール

| フィールド | 必須 | 最大文字数 | バリデーション |
|---|---|---|---|
| ブランド名 | ✓ | 30文字 | 空白のみ不可、絵文字可 |
| ふりがな | 任意 | 50文字 | ひらがな・カタカナのみ推奨（警告のみ） |
| 英語表記 | 任意 | 40文字 | 半角英数字・記号推奨（警告のみ） |
| 業種 | ✓ | — | サブカテゴリまで選択必須 |
| 使用用途 | 任意 | — | 未選択でも次へ進める（スキップ可） |
| 印象 | ✓ | 2つまで | 最低1つ選択必須 |
| 避けたい印象 | 任意 | 1つまで | ラジオボタン（複数選択不可） |

---

## 12. アクセシビリティ要件

- 全ステップで `aria-live="polite"` による即時フィードバック
- 進捗バーに `role="progressbar"` + `aria-valuenow`
- キーボードナビゲーション：Tab順序が自然に流れること
- 業種選択はドロップダウンを `aria-expanded` で管理
- エラーメッセージは `role="alert"` で即時読み上げ
- フォーカス管理：ステップ遷移時に新しいステップのH2にフォーカス移動

---

## 13. レスポンシブ断点

| 断点 | 変更内容 |
|---|---|
| 1024px以下 | サイドカード非表示、シングルカラムレイアウト |
| 768px以下 | 業種グリッド3列→2列、進捗バーラベル非表示 |
| 640px以下 | 印象グリッド4列→3列、確認カード列幅調整 |
| 480px以下 | 用途グリッド3列→2列、生成ボタンフルワイド |

---

## 14. コンポーネント構成

```
app/create/page.tsx              ← Wizardルート
app/create/result/page.tsx       ← 結果ページ（別規格書）

components/create/
├── CreateHeader.tsx             ← ロゴ + 進捗バー
├── CreateAside.tsx              ← 右側浮動カード（PC）
├── Step1BrandInfo.tsx           ← ブランド情報入力
├── Step2IndustryUsage.tsx       ← 業種2階層 + 用途
├── Step3Impression.tsx          ← 印象 + 避けたい印象
├── Step4Confirm.tsx             ← 確認画面
├── StepGenerating.tsx           ← 生成中ローディング
└── create-wizard.ts             ← 状態管理・TS

lib/
├── industry-data.ts             ← INDUSTRY_LIST（47業種）
└── wizard-state.ts              ← WizardState型 + session管理
```

---

## 15. SEO・メタデータ

```html
<title>AIロゴを無料で作成する | LogoAI.jp</title>
<meta name="description"
      content="業種・印象・用途を入力するだけ。AIが最短10分で8〜12案のプロ品質ロゴを生成します。著作権証明書付き・7日間全額返金保証。">
<meta name="robots" content="noindex, nofollow">
<!-- 生成フローページはインデックス不要 -->
<link rel="canonical" href="https://logoai.jp/create">
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次規格：/create/result 結果ページ*
