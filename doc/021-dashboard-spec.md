# マイページ開発規格書 `/dashboard`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：`homepage-spec.md`（设计系统）、`checkout-spec.md`（AuthModal组件）
> **页面类型**：ログイン必須・ユーザー管理画面
> **核心设计原则**：
>   1. 未ログイン時は AuthModal を表示、ログイン完了後そのまま dashboard を表示
>   2. 購入済みロゴを一覧表示、ダウンロードはワンクリックで完了
>   3. シンプルで迷わない構造、機能を詰め込みすぎない

---

## 1. ページ全体仕様

| 項目 | 内容 |
|---|---|
| 路由 | `/dashboard` |
| robots | `noindex, nofollow` |
| 認証 | 未ログイン時 → AuthModal 表示（checkout-spec の AuthModal を流用） |
| レイアウト | 通常Navbar + フッター（決済集中モードではない） |

### 1.1 ページ全体構造

```html
<div class="dashboard-page">
  <header class="navbar">...</header>

  <main class="dashboard-main">
    <div class="dashboard-layout">

      <!-- 左：サイドナビ -->
      <nav class="db-sidenav" aria-label="マイページメニュー">

      <!-- 右：コンテンツエリア -->
      <div class="db-content">
        <!-- セクションを条件レンダリング -->
        <!-- #logos / #orders / #account -->
      </div>

    </div>
  </main>

  <footer class="footer">...</footer>

  <!-- 未ログイン時に表示 -->
  <div id="auth-modal">... （checkout-spec の AuthModal 流用）
</div>
```

---

## 2. サイドナビ

```html
<nav class="db-sidenav" aria-label="マイページメニュー">

  <!-- ユーザー情報 -->
  <div class="dbn-user">
    <div class="dbn-avatar" aria-hidden="true">
      {{ user.email[0].toUpperCase() }}
    </div>
    <div class="dbn-user-info">
      <div class="dbn-email">{{ user.email }}</div>
      <div class="dbn-since">
        {{ user.createdAt }} から利用中
      </div>
    </div>
  </div>

  <!-- ナビリンク -->
  <ul class="dbn-links" role="list">
    <li>
      <a href="#logos" class="dbn-link dbn-link-active"
         aria-current="page">
        <span class="dbn-link-icon" aria-hidden="true">🖼️</span>
        購入済みロゴ
        <span class="dbn-link-badge" id="logo-count">0</span>
      </a>
    </li>
    <li>
      <a href="#orders" class="dbn-link">
        <span class="dbn-link-icon" aria-hidden="true">📋</span>
        注文履歴
      </a>
    </li>
    <li>
      <a href="#account" class="dbn-link">
        <span class="dbn-link-icon" aria-hidden="true">⚙️</span>
        アカウント設定
      </a>
    </li>
  </ul>

  <!-- ログアウト -->
  <button class="dbn-logout" type="button" id="btn-logout">
    ログアウト
  </button>

</nav>
```

```css
.dashboard-main {
  padding: calc(64px + 32px) var(--container-px) 80px;
  min-height: 100vh;
  background: var(--color-bg-section);
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 28px;
  max-width: var(--container-max);
  margin: 0 auto;
  align-items: start;
}

/* サイドナビ */
.db-sidenav {
  position: sticky;
  top: calc(64px + 20px);
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
}

.dbn-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-section);
}

.dbn-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dbn-email {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-primary);
  word-break: break-all;
}

.dbn-since {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.dbn-links {
  list-style: none;
  padding: 10px 0;
  margin: 0;
}

.dbn-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.15s;
  border-left: 3px solid transparent;
}

.dbn-link:hover {
  background: rgba(26,58,42,0.04);
  color: var(--color-primary);
}

.dbn-link-active {
  color: var(--color-primary);
  background: rgba(26,58,42,0.05);
  border-left-color: var(--color-primary);
}

.dbn-link-icon { font-size: var(--text-base); flex-shrink: 0; }

.dbn-link-badge {
  margin-left: auto;
  background: var(--color-primary);
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: var(--radius-full);
  min-width: 18px;
  text-align: center;
}

.dbn-logout {
  display: block;
  width: 100%;
  padding: 14px 20px;
  text-align: left;
  background: none;
  border: none;
  border-top: 1px solid var(--color-border);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.dbn-logout:hover { color: #C41E3A; background: rgba(196,30,58,0.04); }

@media (max-width: 768px) {
  .dashboard-layout { grid-template-columns: 1fr; }
  .db-sidenav { position: static; }
  .dbn-links { display: flex; padding: 8px 12px; gap: 4px; }
  .dbn-link { padding: 9px 14px; border-left: none; border-bottom: 3px solid transparent; border-radius: var(--radius-lg); }
  .dbn-link-active { border-bottom-color: var(--color-primary); }
}
```

---

## 3. セクション①：購入済みロゴ一覧 `#logos`

```html
<section class="db-section" id="logos"
         aria-labelledby="logos-title">

  <div class="dbs-header">
    <h1 id="logos-title" class="dbs-title">購入済みロゴ</h1>
    <a href="/create" class="btn-new-logo">
      + 新しいロゴを作る
    </a>
  </div>

  <!-- ロゴが0件の場合 -->
  <div class="db-empty" id="logos-empty" hidden>
    <div class="dbe-icon" aria-hidden="true">🖼️</div>
    <h2 class="dbe-title">まだロゴを購入していません</h2>
    <p class="dbe-desc">
      AIが最短10秒で8〜12案を生成します。<br>
      まずは無料で試してみましょう。
    </p>
    <a href="/create" class="btn-primary">ロゴを作ってみる →</a>
  </div>

  <!-- ロゴカードグリッド -->
  <div class="logo-card-grid" id="logo-card-grid">

    <!-- 各購入済みロゴ（ループ） -->
    <div class="purchased-logo-card" data-logo-id="{{ logo.id }}">

      <!-- プレビュー -->
      <div class="plc-preview">
        <img src="{{ logo.previewUrl }}"
             alt="{{ logo.brandName }}のロゴ"
             width="300" height="200"
             loading="lazy">
        <!-- 背景切替 -->
        <button class="plc-bg-toggle" type="button"
                aria-label="背景色を切り替える"
                aria-pressed="false">◑</button>
      </div>

      <!-- カード情報 -->
      <div class="plc-body">
        <div class="plc-meta">
          <div class="plc-brand">{{ logo.brandName }}</div>
          <div class="plc-industry">{{ logo.industryLabel }}</div>
          <div class="plc-date">
            購入日：{{ logo.purchasedAt | formatDate }}
          </div>
        </div>

        <!-- 購入プランバッジ -->
        <div class="plc-plan-badge
          {{ logo.plan === 'premium' ? 'plc-plan-premium' : '' }}">
          {{ logo.plan === 'premium' ? 'プレミアム' : 'スタンダード' }}
        </div>
      </div>

      <!-- ダウンロードエリア -->
      <div class="plc-downloads">
        <div class="pld-title">ダウンロード</div>
        <div class="pld-buttons">

          <button class="pld-btn" type="button"
                  data-format="svg" data-logo-id="{{ logo.id }}"
                  aria-label="SVGをダウンロード">
            <span class="pld-format">SVG</span>
            <span class="pld-desc">ベクター・印刷用</span>
          </button>

          <button class="pld-btn" type="button"
                  data-format="png" data-logo-id="{{ logo.id }}"
                  aria-label="PNGをダウンロード">
            <span class="pld-format">PNG</span>
            <span class="pld-desc">高解像度・汎用</span>
          </button>

          <button class="pld-btn" type="button"
                  data-format="pdf" data-logo-id="{{ logo.id }}"
                  aria-label="PDFをダウンロード">
            <span class="pld-format">PDF</span>
            <span class="pld-desc">入稿・印刷用</span>
          </button>

          <button class="pld-btn pld-btn-certificate" type="button"
                  data-format="certificate" data-logo-id="{{ logo.id }}"
                  aria-label="著作権帰属証明書をダウンロード">
            <span class="pld-format">©️ 証明書</span>
            <span class="pld-desc">著作権帰属PDF</span>
          </button>

        </div>
      </div>

      <!-- オプション購入済み一覧 -->
      <div class="plc-options" id="plc-options-{{ logo.id }}">
        <!-- 購入オプションがある場合のみ表示 -->
        <!-- 動的生成 -->
      </div>

    </div>
    <!-- /purchased-logo-card -->

  </div>
  <!-- /logo-card-grid -->

</section>
```

```css
/* セクション共通 */
.db-section {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
}

.dbs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  border-bottom: 1px solid var(--color-border);
}

.dbs-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.btn-new-logo {
  display: flex;
  align-items: center;
  padding: 9px 18px;
  background: var(--color-primary);
  color: white;
  font-size: var(--text-sm);
  font-weight: 700;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all 0.2s;
}

.btn-new-logo:hover { background: var(--color-primary-hover); }

/* 空状態 */
.db-empty {
  padding: 64px 28px;
  text-align: center;
}

.dbe-icon { font-size: 3rem; margin-bottom: 16px; }

.dbe-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 10px;
}

.dbe-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 24px;
}

/* ロゴカードグリッド */
.logo-card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--color-border);
}

/* 購入済みロゴカード */
.purchased-logo-card {
  background: white;
  display: flex;
  flex-direction: column;
}

/* プレビュー */
.plc-preview {
  position: relative;
  aspect-ratio: 3/2;
  background: var(--color-bg-section);
  overflow: hidden;
}

.plc-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  box-sizing: border-box;
  transition: opacity 0.3s;
}

.plc-bg-dark .plc-preview { background: #1A1A1A; }

.plc-bg-toggle {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: 1px solid var(--color-border);
  font-size: var(--text-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

/* カード情報 */
.plc-body {
  padding: 16px 20px 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--color-border);
}

.plc-brand {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 3px;
}

.plc-industry {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 3px;
}

.plc-date {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.plc-plan-badge {
  flex-shrink: 0;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  background: var(--color-bg-section);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  white-space: nowrap;
}

.plc-plan-premium {
  background: rgba(201,150,58,0.1);
  color: var(--color-accent);
  border-color: rgba(201,150,58,0.3);
}

/* ダウンロードエリア */
.plc-downloads {
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
}

.pld-title {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
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
  background: var(--color-bg-section);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.2s;
  text-align: center;
}

.pld-btn:hover {
  border-color: var(--color-primary);
  background: rgba(26,58,42,0.04);
}

.pld-btn:active { transform: scale(0.97); }

/* ダウンロード中状態 */
.pld-btn.downloading {
  opacity: 0.6;
  cursor: wait;
  pointer-events: none;
}

.pld-format {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-primary);
}

.pld-desc {
  font-size: 0.55rem;
  color: var(--color-text-muted);
  line-height: 1.3;
}

.pld-btn-certificate {
  border-color: rgba(201,150,58,0.3);
  background: rgba(201,150,58,0.04);
}

.pld-btn-certificate:hover {
  border-color: var(--color-accent);
  background: rgba(201,150,58,0.08);
}

.pld-btn-certificate .pld-format { color: var(--color-accent); }

/* オプション一覧 */
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
  background: rgba(26,58,42,0.05);
  color: var(--color-primary);
  border: 1px solid rgba(26,58,42,0.12);
  border-radius: var(--radius-full);
}

@media (max-width: 640px) {
  .logo-card-grid { grid-template-columns: 1fr; }
  .pld-buttons { grid-template-columns: repeat(2, 1fr); }
}
```

---

## 4. セクション②：注文履歴 `#orders`

```html
<section class="db-section" id="orders"
         aria-labelledby="orders-title" hidden>

  <div class="dbs-header">
    <h2 id="orders-title" class="dbs-title">注文履歴</h2>
  </div>

  <!-- 注文0件 -->
  <div class="db-empty" id="orders-empty" hidden>
    <div class="dbe-icon" aria-hidden="true">📋</div>
    <h3 class="dbe-title">注文履歴がありません</h3>
    <p class="dbe-desc">購入が完了すると、ここに表示されます。</p>
  </div>

  <!-- 注文テーブル -->
  <div class="orders-table-wrap">
    <table class="orders-table" aria-label="注文履歴">
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
        <!-- 各注文（ループ） -->
        <tr class="order-row" data-order-id="{{ order.id }}">
          <td class="or-date">
            <div>{{ order.createdAt | formatDate }}</div>
            <div class="or-order-id">{{ order.id }}</div>
          </td>
          <td class="or-logo">
            <div class="or-logo-wrap">
              <img src="{{ order.logoThumbUrl }}" alt=""
                   width="48" height="32">
              <span>{{ order.brandName }}</span>
            </div>
          </td>
          <td class="or-plan">
            <span class="or-plan-badge
              {{ order.plan === 'premium' ? 'or-plan-premium' : '' }}">
              {{ order.plan === 'premium' ? 'プレミアム' : 'スタンダード' }}
            </span>
          </td>
          <td class="or-options">
            {{ order.options.length > 0
              ? order.options.map(o => OPTION_LABELS[o]).join('・')
              : 'なし' }}
          </td>
          <td class="or-amount">
            ¥{{ order.total.toLocaleString() }}
          </td>
          <td class="or-receipt">
            <button class="or-receipt-btn" type="button"
                    data-order-id="{{ order.id }}"
                    aria-label="領収書をダウンロード">
              領収書
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</section>
```

```css
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
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  background: var(--color-bg-section);
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.order-row td {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}

.order-row:last-child td { border-bottom: none; }

.order-row:hover td { background: rgba(26,58,42,0.02); }

.or-date div:first-child {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.or-order-id {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  font-family: monospace;
  margin-top: 2px;
}

.or-logo-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.or-logo-wrap img {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  object-fit: contain;
  padding: 3px;
  background: white;
}

.or-logo-wrap span {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.or-plan-badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  background: var(--color-bg-section);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  white-space: nowrap;
}

.or-plan-premium {
  background: rgba(201,150,58,0.1);
  color: var(--color-accent);
  border-color: rgba(201,150,58,0.3);
}

.or-options {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  max-width: 200px;
}

.or-amount {
  font-family: var(--font-number);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  white-space: nowrap;
}

.or-receipt-btn {
  padding: 6px 14px;
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary);
  background: none;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.2s;
  white-space: nowrap;
}

.or-receipt-btn:hover {
  background: var(--color-primary);
  color: white;
}
```

---

## 5. セクション③：アカウント設定 `#account`

```html
<section class="db-section" id="account"
         aria-labelledby="account-title" hidden>

  <div class="dbs-header">
    <h2 id="account-title" class="dbs-title">アカウント設定</h2>
  </div>

  <div class="account-sections">

    <!-- メールアドレス変更 -->
    <div class="account-block">
      <h3 class="ab-title">メールアドレス</h3>
      <form class="ab-form" id="email-form" novalidate>
        <div class="form-field">
          <label for="new-email" class="field-label">
            新しいメールアドレス
          </label>
          <input type="email" id="new-email" name="email"
                 class="field-input"
                 value="{{ user.email }}"
                 autocomplete="email">
        </div>
        <div class="ab-form-error" id="email-error"
             role="alert" hidden></div>
        <div class="ab-form-success" id="email-success"
             role="status" hidden>
          ✓ 確認メールを送信しました。メールのリンクをクリックして変更を完了してください。
        </div>
        <button type="submit" class="btn-ab-save"
                id="btn-save-email">
          変更メールを送信
        </button>
      </form>
    </div>

    <div class="account-divider" aria-hidden="true"></div>

    <!-- パスワード変更 -->
    <div class="account-block">
      <h3 class="ab-title">パスワード変更</h3>
      <form class="ab-form" id="password-form" novalidate>
        <div class="form-field">
          <label for="current-password" class="field-label">
            現在のパスワード
            <span class="field-required">必須</span>
          </label>
          <div class="password-wrap">
            <input type="password" id="current-password"
                   name="currentPassword"
                   class="field-input" required
                   autocomplete="current-password">
            <button type="button" class="pw-toggle"
                    aria-label="表示切替">👁</button>
          </div>
        </div>
        <div class="form-field">
          <label for="new-password" class="field-label">
            新しいパスワード
            <span class="field-required">必須</span>
          </label>
          <div class="password-wrap">
            <input type="password" id="new-password"
                   name="newPassword"
                   class="field-input" required
                   minlength="8"
                   autocomplete="new-password"
                   aria-describedby="new-pw-hint">
            <button type="button" class="pw-toggle"
                    aria-label="表示切替">👁</button>
          </div>
          <span id="new-pw-hint" class="field-hint">
            8文字以上、英字と数字を含めてください
          </span>
        </div>
        <div class="ab-form-error" id="password-error"
             role="alert" hidden></div>
        <div class="ab-form-success" id="password-success"
             role="status" hidden>
          ✓ パスワードを変更しました
        </div>
        <button type="submit" class="btn-ab-save"
                id="btn-save-password">
          パスワードを変更する
        </button>
      </form>
    </div>

    <div class="account-divider" aria-hidden="true"></div>

    <!-- アカウント削除 -->
    <div class="account-block account-block-danger">
      <h3 class="ab-title ab-title-danger">アカウント削除</h3>
      <p class="ab-danger-desc">
        アカウントを削除すると、購入済みロゴデータ・著作権証明書へのアクセスが失われます。
        この操作は取り消せません。
      </p>
      <button type="button" class="btn-ab-danger"
              id="btn-delete-account">
        アカウントを削除する
      </button>
    </div>

  </div>
</section>
```

```css
.account-sections { padding: 8px 0; }

.account-block { padding: 28px 28px; }

.ab-title {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 18px;
}

.ab-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 440px;
}

.ab-form-error {
  padding: 10px 14px;
  background: rgba(196,30,58,0.06);
  border: 1px solid rgba(196,30,58,0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: #C41E3A;
}

.ab-form-success {
  padding: 10px 14px;
  background: rgba(45,122,79,0.06);
  border: 1px solid rgba(45,122,79,0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: var(--color-success);
  font-weight: 600;
}

.btn-ab-save {
  padding: 12px 24px;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-start;
}

.btn-ab-save:hover { background: var(--color-primary-hover); }

.btn-ab-save:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.account-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0 28px;
}

/* 危険ゾーン */
.account-block-danger { background: rgba(196,30,58,0.02); }

.ab-title-danger { color: #C41E3A; }

.ab-danger-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 16px;
  max-width: 480px;
}

.btn-ab-danger {
  padding: 10px 20px;
  background: none;
  color: #C41E3A;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  border: 1.5px solid #C41E3A;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-ab-danger:hover {
  background: #C41E3A;
  color: white;
}
```

---

## 6. アカウント削除確認モーダル

```html
<div class="delete-modal" id="delete-modal"
     role="dialog" aria-modal="true"
     aria-labelledby="delete-modal-title" hidden>
  <div class="dm-overlay" id="dm-overlay"></div>
  <div class="dm-content">
    <h2 id="delete-modal-title" class="dm-title">
      アカウントを削除しますか？
    </h2>
    <p class="dm-desc">
      以下のデータが完全に削除されます。この操作は取り消せません。
    </p>
    <ul class="dm-list">
      <li>購入済みロゴデータ（SVG・PNG・PDF）</li>
      <li>著作権帰属証明書</li>
      <li>注文履歴</li>
      <li>アカウント情報</li>
    </ul>
    <p class="dm-confirm-label">
      確認のため「削除する」と入力してください
    </p>
    <input type="text" id="delete-confirm-input"
           class="field-input"
           placeholder="削除する"
           autocomplete="off">
    <div class="dm-actions">
      <button type="button" class="btn-dm-cancel" id="btn-dm-cancel">
        キャンセル
      </button>
      <button type="button" class="btn-dm-delete" id="btn-dm-delete"
              disabled>
        完全に削除する
      </button>
    </div>
  </div>
</div>
```

```css
.delete-modal {
  position: fixed;
  inset: 0;
  z-index: 500;
}

.delete-modal[hidden] { display: none; }

.dm-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
}

.dm-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: var(--radius-2xl);
  width: min(92vw, 460px);
  padding: 32px;
  animation: modalIn 0.25s ease;
}

.dm-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: #C41E3A;
  margin: 0 0 12px;
}

.dm-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
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
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.dm-confirm-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-secondary);
  margin: 0 0 8px;
}

.dm-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-dm-cancel {
  flex: 1;
  padding: 12px;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.btn-dm-delete {
  flex: 1;
  padding: 12px;
  background: #C41E3A;
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-dm-delete:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}
```

---

## 7. JavaScript（状態管理・インタラクション）

```typescript
// dashboard.ts

// --- 未ログイン時の処理 ---
async function initDashboard() {
  const user = await getCurrentUser()  // 認証状態を確認
  if (!user) {
    // checkout-spec の AuthModal を流用して表示
    showAuthModal({
      onSuccess: () => {
        location.reload()
      }
    })
    return
  }

  // ユーザー情報を描画
  renderUserInfo(user)

  // データを取得
  const [logos, orders] = await Promise.all([
    fetchPurchasedLogos(),
    fetchOrders(),
  ])

  renderLogos(logos)
  renderOrders(orders)

  // URLハッシュに応じてセクション切替
  handleHashNavigation()
}

// --- サイドナビ切替 ---
function handleHashNavigation() {
  const hash = location.hash || '#logos'
  showSection(hash.replace('#', ''))

  document.querySelectorAll('.dbn-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = (link as HTMLAnchorElement).getAttribute('href')!
      showSection(href.replace('#', ''))
      document.querySelectorAll('.dbn-link').forEach(l => {
        l.classList.toggle('dbn-link-active', l === link)
        l.setAttribute('aria-current', l === link ? 'page' : 'false')
      })
    })
  })
}

function showSection(sectionId: string) {
  document.querySelectorAll('.db-section').forEach(s => {
    s.hidden = s.id !== sectionId
  })
}

// --- ロゴ一覧描画 ---
function renderLogos(logos: PurchasedLogo[]) {
  const countEl = document.getElementById('logo-count')!
  countEl.textContent = String(logos.length)

  if (logos.length === 0) {
    document.getElementById('logos-empty')!.hidden = false
    document.getElementById('logo-card-grid')!.hidden = true
    return
  }

  const OPTION_LABELS: Record<string, string> = {
    'brand-guideline': 'ブランドガイドライン',
    'business-card': '名刺デザイン',
    'sns-icon-set': 'SNSアイコン',
    'trademark-check': '商標チェック',
    'favicon-set': 'ファビコン',
  }

  const grid = document.getElementById('logo-card-grid')!
  grid.innerHTML = logos.map(logo => `
    <div class="purchased-logo-card" data-logo-id="${logo.id}">
      <div class="plc-preview">
        <img src="${logo.previewUrl}" alt="${logo.brandName}のロゴ"
             width="300" height="200" loading="lazy">
        <button class="plc-bg-toggle" type="button"
                aria-label="背景色を切り替える"
                aria-pressed="false">◑</button>
      </div>
      <div class="plc-body">
        <div class="plc-meta">
          <div class="plc-brand">${logo.brandName}</div>
          <div class="plc-industry">${logo.industryLabel}</div>
          <div class="plc-date">購入日：${formatDate(logo.purchasedAt)}</div>
        </div>
        <div class="plc-plan-badge ${logo.plan === 'premium' ? 'plc-plan-premium' : ''}">
          ${logo.plan === 'premium' ? 'プレミアム' : 'スタンダード'}
        </div>
      </div>
      <div class="plc-downloads">
        <div class="pld-title">ダウンロード</div>
        <div class="pld-buttons">
          <button class="pld-btn" type="button" data-format="svg" data-logo-id="${logo.id}">
            <span class="pld-format">SVG</span>
            <span class="pld-desc">ベクター・印刷用</span>
          </button>
          <button class="pld-btn" type="button" data-format="png" data-logo-id="${logo.id}">
            <span class="pld-format">PNG</span>
            <span class="pld-desc">高解像度・汎用</span>
          </button>
          <button class="pld-btn" type="button" data-format="pdf" data-logo-id="${logo.id}">
            <span class="pld-format">PDF</span>
            <span class="pld-desc">入稿・印刷用</span>
          </button>
          <button class="pld-btn pld-btn-certificate" type="button"
                  data-format="certificate" data-logo-id="${logo.id}">
            <span class="pld-format">©️ 証明書</span>
            <span class="pld-desc">著作権帰属PDF</span>
          </button>
        </div>
      </div>
      ${logo.options.length > 0 ? `
        <div class="plc-options">
          ${logo.options.map(opt => `
            <span class="plc-option-tag">${OPTION_LABELS[opt] || opt}</span>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `).join('')

  // ダウンロードボタンのイベント
  setupDownloadButtons()
  setupBgToggles()
}

// --- ダウンロード処理 ---
function setupDownloadButtons() {
  document.querySelectorAll<HTMLButtonElement>('.pld-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const format = btn.dataset.format!
      const logoId = btn.dataset.logoId!

      btn.classList.add('downloading')
      const originalText = btn.querySelector('.pld-format')!.textContent
      btn.querySelector('.pld-format')!.textContent = '...'

      try {
        const res = await fetch(`/api/download/${logoId}/${format}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${getAuthToken()}` },
        })

        if (!res.ok) throw new Error('ダウンロード失敗')

        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${logoId}-logo.${format === 'certificate' ? 'pdf' : format}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

      } catch {
        alert('ダウンロードに失敗しました。しばらく経ってから再度お試しください。')
      } finally {
        btn.classList.remove('downloading')
        btn.querySelector('.pld-format')!.textContent = originalText
      }
    })
  })
}

// --- 背景切替 ---
function setupBgToggles() {
  document.querySelectorAll<HTMLButtonElement>('.plc-bg-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.purchased-logo-card')!
      const isDark = btn.getAttribute('aria-pressed') === 'true'
      btn.setAttribute('aria-pressed', isDark ? 'false' : 'true')
      card.classList.toggle('plc-bg-dark', !isDark)
    })
  })
}

// --- ログアウト ---
document.getElementById('btn-logout')?.addEventListener('click', async () => {
  await signOut()
  window.location.href = '/'
})

// --- アカウント削除モーダル ---
document.getElementById('btn-delete-account')?.addEventListener('click', () => {
  document.getElementById('delete-modal')!.hidden = false
  document.getElementById('delete-confirm-input')!.focus()
})

document.getElementById('delete-confirm-input')?.addEventListener('input', (e) => {
  const val = (e.target as HTMLInputElement).value
  const btn = document.getElementById('btn-dm-delete') as HTMLButtonElement
  btn.disabled = val !== '削除する'
})

document.getElementById('btn-dm-delete')?.addEventListener('click', async () => {
  try {
    await fetch('/api/account/delete', { method: 'DELETE' })
    await signOut()
    window.location.href = '/?deleted=1'
  } catch {
    alert('削除に失敗しました。しばらく経ってから再度お試しください。')
  }
})

document.getElementById('btn-dm-cancel')?.addEventListener('click', () => {
  document.getElementById('delete-modal')!.hidden = true
})

document.getElementById('dm-overlay')?.addEventListener('click', () => {
  document.getElementById('delete-modal')!.hidden = true
})

// --- 初期化 ---
initDashboard()
```

---

## 8. APIエンドポイント仕様

```
GET  /api/dashboard/logos
Response: PurchasedLogo[]
  { id, brandName, industryLabel, plan, options, previewUrl,
    purchasedAt, downloadUrls: { svg, png, pdf, certificate } }

GET  /api/dashboard/orders
Response: Order[]
  { id, brandName, logoThumbUrl, plan, options, total, createdAt }

GET  /api/download/:logoId/:format
  format: 'svg' | 'png' | 'pdf' | 'certificate'
Response: Binary file（Content-Disposition: attachment）
認証:  Bearer token 必須・自分の購入物のみアクセス可

GET  /api/orders/:orderId/receipt
Response: PDF（領収書）

POST /api/account/email
Request:  { email: string }
Response: { success: true }
処理: 確認メールを新アドレスに送信、リンククリックで変更完了

POST /api/account/password
Request:  { currentPassword, newPassword }
Response: { success: true } | { error: 'incorrect_password' }

DELETE /api/account/delete
Response: { success: true }
処理: 全データ削除・Stripe顧客データ削除・セッション無効化
```

---

## 9. アクセシビリティ要件

| 要件 | 実装 |
|---|---|
| サイドナビ | `aria-current="page"` で現在セクションを明示 |
| セクション切替 | `hidden` 属性で非表示、スクリーンリーダーに非表示を伝達 |
| ダウンロードボタン | `aria-label` で形式と用途を説明 |
| 削除モーダル | フォーカストラップ・`aria-modal="true"` |
| エラー/成功メッセージ | `role="alert"` / `role="status"` |

---

## 10. レスポンシブ断点

| 断点 | 変更内容 |
|---|---|
| 768px以下 | サイドナビ→横スクロールタブ、コンテンツ全幅 |
| 640px以下 | ロゴグリッド2列→1列、DLボタン4列→2列 |

---

## 11. コンポーネント構成

```
app/dashboard/page.tsx

components/dashboard/
├── DashboardSidenav.tsx      ← サイドナビ + ユーザー情報
├── LogosSection.tsx          ← 購入済みロゴ一覧
├── PurchasedLogoCard.tsx     ← 各ロゴカード
├── OrdersSection.tsx         ← 注文履歴テーブル
├── AccountSection.tsx        ← アカウント設定フォーム
├── DeleteAccountModal.tsx    ← 削除確認モーダル
└── dashboard.ts              ← 状態管理・API通信

app/api/dashboard/
├── logos/route.ts
└── orders/route.ts

app/api/download/
└── [logoId]/[format]/route.ts

app/api/account/
├── email/route.ts
├── password/route.ts
└── delete/route.ts
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次規格：/blog ブログ一覧・記事テンプレート*
