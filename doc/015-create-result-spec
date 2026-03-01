# ロゴ生成結果ページ開発規格書 `/create/result`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：`homepage-spec.md`（设计系统）、`create-spec.md`（状态管理・WizardState）
> **页面类型**：生成結果表示・コンバージョン
> **核心设计原则**：
>   1. 日本ユーザーは「安全性」を先に確認してから「デザイン」を見る → 顶部安心条を最優先
>   2. 「ランダム生成ではなく条件に基づいた生成」を明示 → 条件摘要区で信頼感を演出
>   3. 列表页の役割は「1つ気に入ったものをクリックさせること」のみ → シンプルに徹する
>   4. 付費墙は「品質層」方式 — 無料でも全案確認可・高品質データのみ有料
>   5. Mockup・価格・複雑な修正機能は列表页に置かない

---

## 1. ページ全体仕様

| 項目 | 内容 |
|---|---|
| 路由 | `/create/result` |
| 状態取得 | `sessionStorage` の `logoai_wizard` から WizardState を読み込む |
| レイアウト | Navbar非表示・フッター非表示（生成フロー集中モード継続） |
| グリッド構成（PC） | 左：結果エリア（flex:1）/ 右：調整パネル（300px固定） |
| グリッド構成（SP） | 結果エリア全幅・調整パネルは底部ドロワー |

### 1.1 ページ全体構造

```html
<div class="result-page">
  <header class="result-header">          ← ロゴ + 簡易ステータス
  <!-- ① 顶部安心条（新增） -->
  <div class="trust-bar">                 ← 商用可・著作権・追加費用なし
  <main class="result-main">
    <!-- ② 条件摘要区（新增） -->
    <div class="condition-summary">       ← 印象・用途・業種 + 条件変更ボタン
    <div class="result-layout">
      <div class="result-content">        ← 左：メイン結果エリア
        <!-- 用途プレビュータブ -->
        <!-- ロゴグリッド（8〜12案） -->
        <!-- ③ 底部再生成引导区（新增・旧バナーを置き換え） -->
      </div>
      <aside class="result-aside">        ← 右：調整パネル（PC固定）
        <!-- 調整して再生成パネル -->
      </aside>
    </div>
  </main>
  <!-- SP用：調整パネルドロワー -->
  <div class="adjust-drawer">
</div>
```

---

## 2. ヘッダー

```html
<header class="result-header">
  <div class="rh-inner">
    <a href="/" class="rh-logo" aria-label="LogoAI.jp ホームへ">
      <span class="rh-logo-text">LogoAI.jp</span>
    </a>

    <div class="rh-status">
      <span class="rhs-icon" aria-hidden="true">✨</span>
      <span class="rhs-text">
        「<strong id="rh-brand-name"></strong>」のロゴが生成されました
      </span>
    </div>

    <div class="rh-actions">
      <!-- 無料ユーザー向け -->
      <div class="rha-free" id="rha-free">
        <span class="rha-free-count">
          残り再生成 <strong id="regen-count">3</strong> 回
        </span>
        <a href="/pricing" class="btn-upgrade-sm">
          アップグレード
        </a>
      </div>
    </div>
  </div>
</header>
```

```css
.result-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid var(--color-border);
  padding: 0 var(--container-px);
  height: 60px;
}

.rh-inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
}

.rh-logo-text {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-primary);
}

.rh-status {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.rhs-icon { font-size: var(--text-lg); }

.rha-free {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.rha-free-count {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.btn-upgrade-sm {
  padding: 8px 16px;
  background: var(--color-accent);
  color: var(--color-text-primary);
  font-size: var(--text-xs);
  font-weight: 700;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-upgrade-sm:hover { background: #b8862e; color: white; }

@media (max-width: 640px) {
  .rh-status { display: none; }
}
```

---

## 3. 顶部安心条（新增）

ページ最上部に固定表示。日本ユーザーがデザインを見る前に「安全か」を確認する心理に対応する。

```html
<div class="trust-bar" role="note" aria-label="サービス品質保証">
  <div class="tb-inner">
    <span class="tb-item">
      <span class="tb-check" aria-hidden="true">✔</span>
      商用利用可能
    </span>
    <span class="tb-divider" aria-hidden="true">|</span>
    <span class="tb-item">
      <span class="tb-check" aria-hidden="true">✔</span>
      著作権はお客様に帰属
    </span>
    <span class="tb-divider" aria-hidden="true">|</span>
    <span class="tb-item">
      <span class="tb-check" aria-hidden="true">✔</span>
      追加費用なし
    </span>
    <span class="tb-divider" aria-hidden="true">|</span>
    <span class="tb-item">
      <span class="tb-check" aria-hidden="true">✔</span>
      印刷・SNS対応済み
    </span>
  </div>
</div>
```

```css
.trust-bar {
  background: var(--color-bg-section);
  border-bottom: 1px solid var(--color-border);
  padding: 8px var(--container-px);
}

.tb-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.tb-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.tb-check {
  color: var(--color-success);
  font-size: var(--text-sm);
}

.tb-divider {
  color: var(--color-border);
  font-size: var(--text-sm);
}

@media (max-width: 640px) {
  .tb-divider { display: none; }
  .tb-inner { gap: 10px; justify-content: flex-start; }
}
```

---

## 4. 条件摘要区（新増）

グリッドの直上に配置。ユーザーに「これはあなたの条件に基づいた生成結果です」と伝える最重要エリア。

```html
<div class="condition-summary" aria-label="生成条件">
  <div class="cs-inner">
    <div class="cs-left">
      <div class="cs-title">ご希望条件に基づきロゴを生成しました</div>
      <div class="cs-tags" id="cs-tags">
        <!-- 動的生成 -->
        <!-- 印象 -->
        <span class="cs-tag cs-tag-impression">
          <span class="cs-tag-label">印象</span>
          <span id="cs-impression"></span>
        </span>
        <!-- 用途 -->
        <span class="cs-tag cs-tag-usage">
          <span class="cs-tag-label">用途</span>
          <span id="cs-usage"></span>
        </span>
        <!-- 業種 -->
        <span class="cs-tag cs-tag-industry">
          <span class="cs-tag-label">業種</span>
          <span id="cs-industry"></span>
        </span>
      </div>
    </div>
    <button class="cs-change-btn" type="button" id="btn-change-conditions">
      🔁 条件を変更する
    </button>
  </div>
</div>
```

```css
.condition-summary {
  padding: 16px 0 20px;
  margin-bottom: 4px;
}

.cs-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.cs-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 10px;
}

.cs-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cs-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--color-text-primary);
}

.cs-tag-label {
  font-weight: 700;
  color: var(--color-text-muted);
}

.cs-tag-impression { border-color: rgba(26,58,42,0.2); background: rgba(26,58,42,0.03); }
.cs-tag-usage      { border-color: rgba(201,150,58,0.3); background: rgba(201,150,58,0.04); }
.cs-tag-industry   { border-color: var(--color-border); }

.cs-change-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.cs-change-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 640px) {
  .cs-change-btn { width: 100%; justify-content: center; }
}
```

### 4.1 条件摘要区の動的レンダリング

```typescript
function renderConditionSummary(state: WizardState) {
  const IMP_LABELS: Record<string, string> = {
    trustworthy: '信頼感', friendly: '親しみやすい', luxury: '高級感',
    japanese: '和風', simple: 'シンプル', cute: '可愛い',
    powerful: '力強い', modern: 'モダン', natural: 'ナチュラル',
    stylish: 'スタイリッシュ', pop: 'ポップ', cool: 'クール',
  }
  const USAGE_LABELS: Record<string, string> = {
    card: '名刺', signage: '看板', sns: 'SNS',
    package: 'パッケージ', web: 'Webサイト',
  }

  document.getElementById('cs-impression')!.textContent =
    state.impression.map(i => IMP_LABELS[i] || i).join(' × ')

  document.getElementById('cs-usage')!.textContent =
    state.usage.map(u => USAGE_LABELS[u] || u).join('・')

  document.getElementById('cs-industry')!.textContent =
    state.industryLabel
}

// 「条件を変更する」ボタン → 右サイドパネルにスクロール（PCの場合）
// SP の場合は調整ドロワーを開く
document.getElementById('btn-change-conditions')?.addEventListener('click', () => {
  if (window.innerWidth >= 1024) {
    document.querySelector('.result-aside')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    document.getElementById('sp-adjust-drawer')!.hidden = false
  }
})
```

---

ユーザーがStep 2で選択した用途のみタブとして表示。未選択の場合は「通常」タブのみ。

```html
<div class="preview-tabs" role="tablist" aria-label="用途別プレビュー">

  <!-- 常時表示 -->
  <button class="ptab ptab-active" role="tab"
          aria-selected="true" aria-controls="preview-standard"
          data-preview="standard">
    <span class="ptab-icon" aria-hidden="true">🖼️</span>
    通常
  </button>

  <!-- 用途に応じて動的生成 -->
  <!-- usage: 'card' の場合 -->
  <button class="ptab" role="tab"
          aria-selected="false" aria-controls="preview-card"
          data-preview="card">
    <span class="ptab-icon" aria-hidden="true">💳</span>
    名刺
  </button>

  <!-- usage: 'signage' の場合 -->
  <button class="ptab" role="tab"
          aria-selected="false" aria-controls="preview-signage"
          data-preview="signage">
    <span class="ptab-icon" aria-hidden="true">🪧</span>
    看板
  </button>

  <!-- usage: 'sns' の場合 -->
  <button class="ptab" role="tab"
          aria-selected="false" aria-controls="preview-sns"
          data-preview="sns">
    <span class="ptab-icon" aria-hidden="true">📱</span>
    SNSアイコン
  </button>

  <!-- usage: 'package' の場合 -->
  <button class="ptab" role="tab"
          aria-selected="false" aria-controls="preview-package"
          data-preview="package">
    <span class="ptab-icon" aria-hidden="true">📦</span>
    パッケージ
  </button>

  <!-- usage: 'web' の場合 -->
  <button class="ptab" role="tab"
          aria-selected="false" aria-controls="preview-web"
          data-preview="web">
    <span class="ptab-icon" aria-hidden="true">🌐</span>
    Webサイト
  </button>

</div>

<!-- プレビューコンテキスト説明 -->
<div class="preview-context" id="preview-context" aria-live="polite">
  <!-- タブ切替で動的更新 -->
</div>
```

```css
.preview-tabs {
  display: flex;
  gap: 6px;
  padding: 0 0 16px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.ptab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.ptab:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.ptab-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.ptab-icon { font-size: var(--text-base); }

.preview-context {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 20px;
  min-height: 18px;
  transition: opacity 0.2s;
}
```

### 3.1 プレビューコンテキストテキスト仕様

| タブ | コンテキストテキスト |
|---|---|
| 通常 | ロゴデータをそのまま表示しています |
| 名刺 | 名刺サイズ（91×55mm）での表示イメージです |
| 看板 | 店舗看板での表示イメージです。実際の印刷サイズは異なります |
| SNSアイコン | Instagram・X のプロフィール画像サイズ（正方形・丸形）での表示イメージです |
| パッケージ | 商品パッケージ・袋への印刷イメージです |
| Webサイト | Webサイトのヘッダーへの配置イメージです |

---

## 5. 用途プレビュータブ

---

## 6. ロゴグリッド（8〜12案）

```html
<div class="logo-grid" id="logo-grid"
     data-preview="standard"
     role="list"
     aria-label="生成されたロゴ案">

  <!-- 各ロゴカード（8〜12枚をループ） -->
  <div class="logo-card" role="listitem" data-logo-id="{{ logo.id }}">

    <!-- プレビューエリア -->
    <div class="lc-preview" data-preview-area>

      <!-- 通常プレビュー -->
      <div class="lcp-standard lcp-active">
        <div class="lcp-bg lcp-bg-white">
          <img src="{{ logo.previewUrl }}"
               alt="{{ brandName }}のロゴ案{{ index }}：{{ logo.styleDesc }}"
               width="400" height="300"
               loading="{{ index <= 4 ? 'eager' : 'lazy' }}"
               decoding="async">
        </div>
        <!-- 白黒切替 -->
        <div class="lcp-bg lcp-bg-dark" aria-hidden="true">
          <img src="{{ logo.previewDarkUrl }}" alt="" width="400" height="300">
        </div>
      </div>

      <!-- 名刺プレビュー（usage: card 選択時） -->
      <div class="lcp-card" aria-hidden="true">
        <div class="lcp-card-mockup">
          <div class="lcm-card-surface">
            <img src="{{ logo.previewUrl }}" alt="" class="lcm-logo">
            <div class="lcm-card-info">
              <span class="lcm-brand">{{ brandName }}</span>
              <span class="lcm-dummy-text">代表取締役　山田 太郎</span>
              <span class="lcm-dummy-text">TEL: 03-XXXX-XXXX</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 看板プレビュー（usage: signage 選択時） -->
      <div class="lcp-signage" aria-hidden="true">
        <div class="lcp-signage-mockup">
          <div class="lcm-storefront">
            <div class="lcm-signage-board">
              <img src="{{ logo.previewUrl }}" alt="" class="lcm-logo-wide">
            </div>
            <div class="lcm-store-door"></div>
          </div>
        </div>
      </div>

      <!-- SNSアイコンプレビュー（usage: sns 選択時） -->
      <div class="lcp-sns" aria-hidden="true">
        <div class="lcp-sns-mockup">
          <!-- 正方形 -->
          <div class="lcm-sns-square">
            <img src="{{ logo.previewSquareUrl }}" alt="">
          </div>
          <!-- 丸形 -->
          <div class="lcm-sns-circle">
            <img src="{{ logo.previewSquareUrl }}" alt="">
          </div>
          <div class="lcm-sns-labels">
            <span>Instagram</span>
            <span>X（Twitter）</span>
          </div>
        </div>
      </div>

      <!-- パッケージプレビュー（usage: package 選択時） -->
      <div class="lcp-package" aria-hidden="true">
        <div class="lcp-package-mockup">
          <div class="lcm-bag">
            <img src="{{ logo.previewUrl }}" alt="" class="lcm-bag-logo">
          </div>
        </div>
      </div>

      <!-- Webサイトプレビュー（usage: web 選択時） -->
      <div class="lcp-web" aria-hidden="true">
        <div class="lcp-web-mockup">
          <div class="lcm-browser-bar">
            <div class="lcm-browser-dots" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div class="lcm-browser-content">
            <div class="lcm-nav">
              <img src="{{ logo.previewUrl }}" alt="" class="lcm-nav-logo">
              <div class="lcm-nav-links" aria-hidden="true">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div class="lcm-hero-dummy" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <!-- 白黒切替ボタン -->
      <button class="lc-bg-toggle" type="button"
              aria-label="背景色を切り替える"
              aria-pressed="false">
        ◑
      </button>

    </div>

    <!-- カード下部 -->
    <div class="lc-footer">

      <!-- 印象タグ + カラー -->
      <div class="lc-style">
        <!-- 印象タグ（最大2つ） -->
        <div class="lc-impression-tags" aria-label="印象">
          {% for tag in logo.impressionTags %}
          <span class="lc-imp-tag">{{ tag }}</span>
          {% endfor %}
        </div>
        <!-- カラードット -->
        <div class="lc-colors" aria-label="使用カラー">
          {% for color in logo.colors %}
          <span class="lc-color-dot"
                style="background: {{ color }}"
                title="{{ color }}"
                aria-label="{{ color }}"></span>
          {% endfor %}
        </div>
      </div>

      <!-- アクションボタン：収藏 + 詳細のみ（列表页はシンプルに） -->
      <div class="lc-actions">

        <!-- お気に入り -->
        <button class="lca-fav" type="button"
                aria-label="お気に入りに追加" aria-pressed="false">
          ♡
        </button>

        <!-- 詳細を見る（= 拡大モーダルを開く） -->
        <button class="lca-detail" type="button"
                aria-label="詳細を見る">
          詳細を見る →
        </button>

      </div>
    </div>

  </div>
  <!-- /logo-card -->

</div>
<!-- /logo-grid -->
```

```css
/* ロゴグリッド */
.logo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* ロゴカード */
.logo-card {
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;
}

.logo-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px) scale(1.01); /* 轻微放大，高级感 */
}

/* プレビューエリア */
.lc-preview {
  position: relative;
  background: var(--color-bg-section);
  aspect-ratio: 4/3;
  overflow: hidden;
}

/* 各プレビュータイプ（通常以外はデフォルト非表示） */
.lcp-standard,
.lcp-card,
.lcp-signage,
.lcp-sns,
.lcp-package,
.lcp-web {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.lcp-active {
  opacity: 1;
  pointer-events: auto;
}

/* 通常プレビュー */
.lcp-bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  inset: 0;
  transition: opacity 0.3s ease;
}

.lcp-bg-white { background: white; opacity: 1; }
.lcp-bg-dark  { background: #1A1A1A; opacity: 0; }

.lcp-bg img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 白黒切替ボタン */
.lc-bg-toggle {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: 1px solid var(--color-border);
  font-size: var(--text-base);
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.2s;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lc-bg-toggle[aria-pressed="true"] ~ .lcp-standard .lcp-bg-white { opacity: 0; }
.lc-bg-toggle[aria-pressed="true"] ~ .lcp-standard .lcp-bg-dark  { opacity: 1; }

/* 名刺モックアップ */
.lcp-card-mockup {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8e8e0;
}

.lcm-card-surface {
  background: white;
  width: 200px;
  height: 115px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.lcm-logo { max-height: 36px; max-width: 120px; object-fit: contain; }

.lcm-card-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lcm-brand {
  font-size: 0.55rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.lcm-dummy-text {
  font-size: 0.45rem;
  color: var(--color-text-muted);
}

/* 看板モックアップ */
.lcp-signage-mockup {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #87CEEB 0%, #87CEEB 60%, #8B7355 60%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.lcm-storefront {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 180px;
}

.lcm-signage-board {
  background: white;
  width: 100%;
  height: 60px;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.2);
  box-sizing: border-box;
}

.lcm-logo-wide { max-height: 40px; max-width: 140px; object-fit: contain; }

.lcm-store-door {
  width: 60px;
  height: 50px;
  background: #c8a882;
  border-radius: 0 0 2px 2px;
  border: 2px solid #8B7355;
  border-top: none;
}

/* SNSアイコンモックアップ */
.lcp-sns-mockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  background: var(--color-bg-section);
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
}

.lcm-sns-row {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.lcm-sns-square {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lcm-sns-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lcm-sns-square img,
.lcm-sns-circle img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
  box-sizing: border-box;
}

.lcm-sns-labels {
  display: flex;
  gap: 20px;
  font-size: 0.55rem;
  color: var(--color-text-muted);
  width: 144px;
  justify-content: space-around;
}

/* パッケージモックアップ */
.lcp-package-mockup {
  width: 100%;
  height: 100%;
  background: #f0ede8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lcm-bag {
  width: 100px;
  height: 120px;
  background: white;
  border: 1.5px solid #d0c8be;
  border-radius: 4px 4px 8px 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 12px rgba(0,0,0,0.1);
}

.lcm-bag::before {
  content: '';
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 16px;
  border: 2px solid #a09080;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.lcm-bag-logo { max-width: 70px; max-height: 50px; object-fit: contain; }

/* Webサイトモックアップ */
.lcp-web-mockup {
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  margin: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.lcm-browser-bar {
  height: 24px;
  background: #f0f0f0;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 8px;
}

.lcm-browser-dots {
  display: flex;
  gap: 4px;
}

.lcm-browser-dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-border);
}

.lcm-browser-content { padding: 0; }

.lcm-nav {
  height: 36px;
  background: white;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 16px;
}

.lcm-nav-logo { max-height: 22px; max-width: 80px; object-fit: contain; }

.lcm-nav-links {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.lcm-nav-links span {
  width: 28px;
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
}

.lcm-hero-dummy {
  height: 80px;
  background: linear-gradient(135deg, var(--color-bg-section) 0%, #e0ddd8 100%);
}

/* カード下部 */
.lc-footer {
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-top: 1px solid var(--color-border);
}

.lc-style {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

/* 印象タグ（新增） */
.lc-impression-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.lc-imp-tag {
  font-size: 0.6rem;
  font-weight: 600;
  padding: 2px 8px;
  background: var(--color-bg-section);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
}

.lc-colors { display: flex; gap: 3px; flex-shrink: 0; }

.lc-color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.08);
  display: block;
}

/* アクションボタン */
.lc-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.lca-fav {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: none;
  border: 1px solid var(--color-border);
  cursor: pointer;
  font-size: var(--text-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: var(--color-text-muted);
}

.lca-fav:hover { border-color: #C41E3A; color: #C41E3A; }
.lca-fav[aria-pressed="true"] { background: #C41E3A; border-color: #C41E3A; color: white; }

/* 詳細を見るボタン（旧:無料DLボタンを置き換え） */
.lca-detail {
  padding: 7px 14px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.2s;
  white-space: nowrap;
}

.lca-detail:hover {
  background: var(--color-primary-hover);
}

/* グリッドレスポンシブ */
@media (max-width: 1200px) { .logo-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .logo-grid { grid-template-columns: 1fr; } }
```

---

## 7. 底部再生成引导区（新增）

グリッド下部に配置。「気に入ったロゴが見つからなかった」ユーザーへの受け皿。日本ユーザーは「もう一度試す」の選択肢があると安心する。価格はここには載せない。

```html
<!-- ロゴグリッドの直下に配置 -->
<div class="regen-guide" role="region" aria-label="再生成の案内">
  <div class="rg-inner">
    <div class="rg-text">
      <div class="rg-title">気に入ったロゴが見つかりませんか？</div>
      <div class="rg-desc">
        条件を変えて再生成できます。印象・業種・用途を調整してみましょう。
      </div>
    </div>
    <div class="rg-actions">
      <button class="rg-btn rg-btn-primary" type="button"
              id="btn-regen-guide">
        🔄 条件を変更して再生成
      </button>
      <button class="rg-btn rg-btn-secondary" type="button"
              id="btn-change-impression">
        🎨 印象を変えて試す
      </button>
    </div>
  </div>
</div>
```

```css
.regen-guide {
  margin-top: 32px;
  padding: 28px 32px;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  text-align: center;
}

.rg-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.rg-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.rg-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.rg-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.rg-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.rg-btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(26,58,42,0.2);
}

.rg-btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

.rg-btn-secondary {
  background: white;
  color: var(--color-text-secondary);
  border: 1.5px solid var(--color-border);
}

.rg-btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 640px) {
  .regen-guide { padding: 20px 16px; }
  .rg-btn { width: 100%; justify-content: center; }
}
```

### 7.1 ボタン動作

```typescript
// 「条件を変更して再生成」→ 調整パネルを開いて再生成ボタンにフォーカス
document.getElementById('btn-regen-guide')?.addEventListener('click', () => {
  if (window.innerWidth >= 1024) {
    document.querySelector('.result-aside')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      document.getElementById('btn-regen')?.focus()
    }, 400)
  } else {
    document.getElementById('sp-adjust-drawer')!.hidden = false
  }
})

// 「印象を変えて試す」→ 調整パネルの印象セクションにフォーカス
document.getElementById('btn-change-impression')?.addEventListener('click', () => {
  if (window.innerWidth >= 1024) {
    document.querySelector('.ap-impression-section')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    document.getElementById('sp-adjust-drawer')!.hidden = false
    setTimeout(() => {
      document.querySelector('.ap-impression-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }
})
```

---

## 8. 調整して再生成パネル（PC右サイドバー）

```html
<aside class="result-aside" aria-label="調整して再生成">
  <div class="adjust-panel">

    <div class="ap-header">
      <h2 class="ap-title">調整して再生成</h2>
      <div class="ap-regen-count" aria-live="polite">
        無料残り <strong id="ap-regen-left">3</strong> 回
      </div>
    </div>

    <!-- 現在の設定サマリー -->
    <div class="ap-current">
      <span class="ap-current-label">現在の設定</span>
      <div class="ap-current-tags" id="ap-current-tags">
        <!-- 動的生成 -->
      </div>
    </div>

    <!-- 調整セクション1：印象 -->
    <div class="ap-section">
      <div class="aps-label">印象を変える
        <span class="aps-sub">最大2つ</span>
      </div>
      <div class="ap-imp-grid">
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="trustworthy" class="ap-imp-input">
          <span class="apic-inner">信頼感</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="friendly" class="ap-imp-input">
          <span class="apic-inner">親しみやすい</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="luxury" class="ap-imp-input">
          <span class="apic-inner">高級感</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="japanese" class="ap-imp-input">
          <span class="apic-inner">和風</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="simple" class="ap-imp-input">
          <span class="apic-inner">シンプル</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="cute" class="ap-imp-input">
          <span class="apic-inner">可愛い</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="powerful" class="ap-imp-input">
          <span class="apic-inner">力強い</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="modern" class="ap-imp-input">
          <span class="apic-inner">モダン</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="natural" class="ap-imp-input">
          <span class="apic-inner">ナチュラル</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="stylish" class="ap-imp-input">
          <span class="apic-inner">スタイリッシュ</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="pop" class="ap-imp-input">
          <span class="apic-inner">ポップ</span>
        </label>
        <label class="ap-imp-card">
          <input type="checkbox" name="ap-impression" value="cool" class="ap-imp-input">
          <span class="apic-inner">クール</span>
        </label>
      </div>
    </div>

    <!-- 調整セクション2：避けたい印象 -->
    <div class="ap-section">
      <div class="aps-label">避けたい印象
        <span class="aps-sub">1つまで</span>
      </div>
      <div class="ap-avoid-chips">
        <label class="ap-avoid-chip">
          <input type="radio" name="ap-avoid" value="" class="ap-avoid-input" checked>
          <span>なし</span>
        </label>
        <label class="ap-avoid-chip">
          <input type="radio" name="ap-avoid" value="cheap" class="ap-avoid-input">
          <span>安っぽい</span>
        </label>
        <label class="ap-avoid-chip">
          <input type="radio" name="ap-avoid" value="childish" class="ap-avoid-input">
          <span>子供っぽい</span>
        </label>
        <label class="ap-avoid-chip">
          <input type="radio" name="ap-avoid" value="old" class="ap-avoid-input">
          <span>古くさい</span>
        </label>
        <label class="ap-avoid-chip">
          <input type="radio" name="ap-avoid" value="heavy" class="ap-avoid-input">
          <span>重たい</span>
        </label>
        <label class="ap-avoid-chip">
          <input type="radio" name="ap-avoid" value="flashy" class="ap-avoid-input">
          <span>派手すぎる</span>
        </label>
      </div>
    </div>

    <!-- 調整セクション3：業種変更 -->
    <div class="ap-section">
      <div class="aps-label">業種を変える</div>
      <button class="ap-industry-btn" type="button"
              id="ap-industry-btn"
              aria-haspopup="listbox">
        <span id="ap-industry-label">カフェ・喫茶店</span>
        <span aria-hidden="true">›</span>
      </button>
      <!-- 業種変更モーダルは別途 -->
    </div>

    <!-- 再生成ボタン -->
    <button class="btn-regen" type="button" id="btn-regen"
            aria-disabled="false">
      <span class="btn-regen-icon" aria-hidden="true">🔄</span>
      再生成する
    </button>

    <!-- 無料回数上限時の表示 -->
    <div class="ap-limit-notice" id="ap-limit-notice" hidden>
      <p>無料の再生成回数（3回）を使い切りました。</p>
      <a href="/pricing" class="btn-upgrade-panel">
        プレミアムで無制限再生成 →
      </a>
    </div>

    <!-- 購入CTA -->
    <div class="ap-purchase-cta">
      <div class="apc-divider">または</div>
      <a href="/checkout" class="btn-purchase-panel" id="btn-purchase-panel">
        このロゴを購入する
        <span class="bpp-price">¥4,980〜</span>
      </a>
    </div>

  </div>
</aside>
```

```css
/* レイアウト */
.result-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 28px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 28px var(--container-px);
  align-items: start;
}

.result-aside {
  position: sticky;
  top: 88px;
}

/* 調整パネル */
.adjust-panel {
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
}

.ap-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-bg-section);
}

.ap-title {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.ap-regen-count {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.ap-regen-count strong { color: var(--color-accent); }

/* 現在設定 */
.ap-current {
  padding: 12px 20px;
  border-bottom: 1px solid var(--color-border);
}

.ap-current-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 6px;
}

.ap-current-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.ap-current-tag {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 3px 8px;
  background: rgba(26,58,42,0.08);
  color: var(--color-primary);
  border-radius: var(--radius-full);
}

/* 調整セクション */
.ap-section {
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
}

.aps-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.aps-sub {
  font-weight: 400;
  color: var(--color-text-muted);
}

/* 印象グリッド（パネル内） */
.ap-imp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.ap-imp-card { display: block; cursor: pointer; }

.ap-imp-input {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
}

.apic-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 4px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-align: center;
  transition: all 0.15s;
  cursor: pointer;
}

.ap-imp-input:checked + .apic-inner {
  border-color: var(--color-primary);
  background: rgba(26,58,42,0.08);
  color: var(--color-primary);
}

/* 避けたい印象チップ */
.ap-avoid-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.ap-avoid-chip { display: block; cursor: pointer; }

.ap-avoid-input {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
}

.ap-avoid-chip span {
  display: block;
  padding: 6px 10px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: all 0.15s;
}

.ap-avoid-input:checked + span {
  border-color: #C41E3A;
  background: rgba(196,30,58,0.06);
  color: #C41E3A;
}

/* 業種変更ボタン */
.ap-industry-btn {
  width: 100%;
  padding: 10px 14px;
  background: var(--color-bg-section);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.ap-industry-btn:hover {
  border-color: var(--color-primary);
}

/* 再生成ボタン */
.btn-regen {
  width: calc(100% - 40px);
  margin: 16px 20px 0;
  padding: 14px;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-regen:hover { background: var(--color-primary-hover); }

.btn-regen[aria-disabled="true"] {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.btn-regen-icon { font-size: var(--text-base); }

/* 上限通知 */
.ap-limit-notice {
  margin: 12px 20px;
  padding: 12px;
  background: rgba(196,30,58,0.04);
  border: 1px solid rgba(196,30,58,0.15);
  border-radius: var(--radius-lg);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  text-align: center;
}

.btn-upgrade-panel {
  display: block;
  margin-top: 8px;
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

/* 購入CTA */
.ap-purchase-cta { padding: 12px 20px 20px; }

.apc-divider {
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 10px;
  position: relative;
}

.apc-divider::before,
.apc-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: var(--color-border);
}

.apc-divider::before { left: 0; }
.apc-divider::after  { right: 0; }

.btn-purchase-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--color-accent);
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  font-weight: 700;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all 0.2s;
}

.btn-purchase-panel:hover { background: #b8862e; color: white; }

.bpp-price {
  font-size: var(--text-xs);
  opacity: 0.8;
}

/* SP：サイドバー非表示 → ドロワー表示 */
@media (max-width: 1024px) {
  .result-layout { grid-template-columns: 1fr; }
  .result-aside { display: none; }
}
```

---

## 9. SP用：調整パネルドロワー

```html
<!-- SP専用：画面下部に固定表示 -->
<div class="sp-adjust-bar" id="sp-adjust-bar">
  <button class="sp-adjust-trigger" type="button"
          id="sp-adjust-trigger"
          aria-expanded="false"
          aria-controls="sp-adjust-drawer">
    <span class="sat-icon" aria-hidden="true">🔄</span>
    調整して再生成（残り <strong id="sp-regen-count">3</strong> 回）
    <span class="sat-arrow" aria-hidden="true">↑</span>
  </button>
  <a href="/checkout" class="sp-purchase-btn">
    購入 ¥4,980〜
  </a>
</div>

<!-- ドロワー本体（スライドアップ） -->
<div class="sp-adjust-drawer" id="sp-adjust-drawer"
     role="dialog" aria-modal="true" aria-label="調整パネル" hidden>
  <div class="sp-drawer-overlay" id="sp-drawer-overlay"></div>
  <div class="sp-drawer-content">
    <div class="sp-drawer-handle" aria-hidden="true"></div>
    <div class="sp-drawer-inner">
      <!-- PCパネルと同内容をここに複製 -->
      <!-- adjust-panel と同一構造 -->
    </div>
  </div>
</div>
```

```css
/* SP固定バー */
.sp-adjust-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: white;
  border-top: 1px solid var(--color-border);
  padding: 12px var(--container-px);
  display: flex;
  gap: 10px;
  align-items: center;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.08);
}

.sp-adjust-trigger {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--color-bg-section);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  cursor: pointer;
}

.sat-arrow { margin-left: auto; transition: transform 0.2s; }
.sp-adjust-trigger[aria-expanded="true"] .sat-arrow { transform: rotate(180deg); }

.sp-purchase-btn {
  padding: 12px 20px;
  background: var(--color-primary);
  color: white;
  font-size: var(--text-sm);
  font-weight: 700;
  border-radius: var(--radius-full);
  text-decoration: none;
  white-space: nowrap;
}

/* ドロワー */
.sp-adjust-drawer { display: none; }

.sp-adjust-drawer[aria-hidden="false"] {
  display: block;
  position: fixed;
  inset: 0;
  z-index: 300;
}

.sp-drawer-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
}

.sp-drawer-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  max-height: 80vh;
  overflow-y: auto;
  animation: drawerUp 0.3s ease;
}

@keyframes drawerUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

.sp-drawer-handle {
  width: 40px;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  margin: 12px auto 0;
}

.sp-drawer-inner { padding: 20px; }

@media (max-width: 1024px) {
  .sp-adjust-bar { display: flex; }
  /* ページ下部にSPバー分の余白 */
  .result-content { padding-bottom: 80px; }
}
```

---

## 10. 拡大プレビューモーダル

```html
<div class="logo-modal" id="logo-modal"
     role="dialog" aria-modal="true"
     aria-label="ロゴ拡大プレビュー" hidden>

  <div class="lm-overlay" id="lm-overlay"></div>

  <div class="lm-content">
    <button class="lm-close" type="button"
            aria-label="閉じる" id="lm-close">✕</button>

    <!-- メインプレビュー -->
    <div class="lm-preview">
      <div class="lm-bg-switcher" aria-hidden="true">
        <button class="lmbs-btn lmbs-active" data-bg="white">白</button>
        <button class="lmbs-btn" data-bg="dark">黒</button>
        <button class="lmbs-btn" data-bg="gray">グレー</button>
      </div>
      <div class="lm-img-wrap" id="lm-img-wrap">
        <img src="" alt="" id="lm-img" class="lm-img">
      </div>
    </div>

    <!-- 下部情報 -->
    <div class="lm-footer">
      <div class="lm-info">
        <div class="lm-font" id="lm-font"></div>
        <div class="lm-colors" id="lm-colors"></div>
      </div>
      <div class="lm-actions">
        <button class="lm-fav" type="button" aria-label="お気に入り">♡</button>
        <a href="/checkout" class="lm-purchase">
          このロゴを購入する → ¥4,980〜
        </a>
      </div>
    </div>
  </div>
</div>
```

```css
.logo-modal {
  position: fixed;
  inset: 0;
  z-index: 500;
}

.logo-modal[hidden] { display: none; }

.lm-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(4px);
}

.lm-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: var(--radius-2xl);
  width: min(90vw, 760px);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: modalIn 0.25s ease;
}

@keyframes modalIn {
  from { opacity: 0; transform: translate(-50%, -48%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}

.lm-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0,0,0,0.06);
  border: none;
  font-size: var(--text-lg);
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lm-preview {
  flex: 1;
  position: relative;
  background: white;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.lm-bg-switcher {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  gap: 4px;
}

.lmbs-btn {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: white;
  font-size: var(--text-xs);
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-body);
}

.lmbs-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.lm-img { max-width: 100%; max-height: 340px; object-fit: contain; }

.lm-footer {
  padding: 20px 28px;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.lm-font {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.lm-colors { display: flex; gap: 6px; }

.lm-actions { display: flex; align-items: center; gap: 12px; }

.lm-fav {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid var(--color-border);
  background: none;
  font-size: var(--text-xl);
  cursor: pointer;
  transition: all 0.2s;
}

.lm-purchase {
  padding: 12px 24px;
  background: var(--color-primary);
  color: white;
  font-size: var(--text-sm);
  font-weight: 700;
  border-radius: var(--radius-full);
  text-decoration: none;
  white-space: nowrap;
}
```

---

## 11. JavaScript（結果ページ状態管理）

```typescript
// result-page.ts

// --- 初期化 ---
const state = loadWizardState()   // create-wizard.ts の関数を流用
if (!state || !state.brandName) {
  window.location.href = '/create'  // 状態なし → 生成ページへ
}

// ブランド名をヘッダーに表示
document.getElementById('rh-brand-name')!.textContent = state.brandName

// 再生成残り回数（sessionStorageで管理）
let regenLeft = parseInt(sessionStorage.getItem('logoai_regen_left') || '3')
updateRegenCount(regenLeft)

// 調整パネルに現在の印象を反映
function initAdjustPanel() {
  // 現在の印象を選択状態にする
  state.impression.forEach(val => {
    const cb = document.querySelector<HTMLInputElement>(
      `.ap-imp-input[value="${val}"]`
    )
    if (cb) cb.checked = true
  })

  // 避けたい印象
  if (state.avoid) {
    const rb = document.querySelector<HTMLInputElement>(
      `.ap-avoid-input[value="${state.avoid}"]`
    )
    if (rb) rb.checked = true
  }

  // 業種ラベル
  document.getElementById('ap-industry-label')!.textContent = state.industryLabel

  // 現在設定タグを生成
  renderCurrentTags()
}

function renderCurrentTags() {
  const IMP_LABELS: Record<string, string> = {
    trustworthy: '信頼感', friendly: '親しみやすい', luxury: '高級感',
    japanese: '和風', simple: 'シンプル', cute: '可愛い',
    powerful: '力強い', modern: 'モダン', natural: 'ナチュラル',
    stylish: 'スタイリッシュ', pop: 'ポップ', cool: 'クール',
  }
  const container = document.getElementById('ap-current-tags')!
  container.innerHTML = ''
  ;[...state.impression, state.industryLabel].filter(Boolean).forEach(label => {
    const tag = document.createElement('span')
    tag.className = 'ap-current-tag'
    tag.textContent = IMP_LABELS[label] || label
    container.appendChild(tag)
  })
}

// --- 用途プレビュータブ ---
function initPreviewTabs() {
  // ユーザーが選択した用途のみタブを表示
  const allTabs = document.querySelectorAll<HTMLElement>('.ptab')
  allTabs.forEach(tab => {
    const preview = tab.dataset.preview
    if (preview === 'standard') return  // 常時表示
    if (!state.usage.includes(preview!)) {
      tab.style.display = 'none'
    }
  })

  // タブクリック
  document.querySelectorAll('.ptab').forEach(tab => {
    tab.addEventListener('click', () => {
      const preview = (tab as HTMLElement).dataset.preview!
      switchPreview(preview)
    })
  })
}

function switchPreview(previewType: string) {
  // タブのactive切替
  document.querySelectorAll('.ptab').forEach(t => {
    t.classList.toggle('ptab-active', (t as HTMLElement).dataset.preview === previewType)
    t.setAttribute('aria-selected', (t as HTMLElement).dataset.preview === previewType ? 'true' : 'false')
  })

  // 各カードのプレビュー切替
  document.querySelectorAll('.logo-card').forEach(card => {
    card.querySelectorAll('[class^="lcp-"]').forEach(p => {
      p.classList.remove('lcp-active')
    })
    const target = card.querySelector(`.lcp-${previewType}`)
    if (target) target.classList.add('lcp-active')
  })

  // コンテキストテキスト更新
  const CONTEXT_TEXT: Record<string, string> = {
    standard: 'ロゴデータをそのまま表示しています',
    card:     '名刺サイズ（91×55mm）での表示イメージです',
    signage:  '店舗看板での表示イメージです。実際の印刷サイズは異なります',
    sns:      'Instagram・X のプロフィール画像サイズでの表示イメージです',
    package:  '商品パッケージ・袋への印刷イメージです',
    web:      'Webサイトのヘッダーへの配置イメージです',
  }
  document.getElementById('preview-context')!.textContent = CONTEXT_TEXT[previewType] || ''
}

// --- 再生成 ---
document.getElementById('btn-regen')?.addEventListener('click', () => {
  if (regenLeft <= 0) return

  // 調整パネルの選択値を取得
  const newImpressions = Array.from(
    document.querySelectorAll<HTMLInputElement>('.ap-imp-input:checked')
  ).map(cb => cb.value).slice(0, 2)

  const newAvoid = (
    document.querySelector<HTMLInputElement>('.ap-avoid-input:checked')?.value || ''
  )

  // stateを更新
  state.impression = newImpressions
  state.avoid = newAvoid
  saveWizardState(state)

  // 回数を減らす
  regenLeft--
  sessionStorage.setItem('logoai_regen_left', String(regenLeft))
  updateRegenCount(regenLeft)

  // 生成中画面を表示してAPIコール
  showRegenLoading()
})

function updateRegenCount(count: number) {
  document.getElementById('regen-count')!.textContent = String(count)
  document.getElementById('ap-regen-left')!.textContent = String(count)
  document.getElementById('sp-regen-count')!.textContent = String(count)

  if (count <= 0) {
    const btn = document.getElementById('btn-regen') as HTMLButtonElement
    btn.setAttribute('aria-disabled', 'true')
    document.getElementById('ap-limit-notice')!.hidden = false
  }
}

// --- 拡大モーダル ---
document.querySelectorAll('.lca-expand').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = (e.currentTarget as HTMLElement).closest('.logo-card')!
    const img = card.querySelector<HTMLImageElement>('.lcp-bg-white img')!
    const font = card.querySelector('.lc-style-tag')!.textContent || ''

    const modal = document.getElementById('logo-modal')!
    modal.hidden = false
    ;(document.getElementById('lm-img') as HTMLImageElement).src = img.src
    document.getElementById('lm-font')!.textContent = font

    // フォーカストラップ
    modal.querySelector<HTMLButtonElement>('.lm-close')!.focus()
  })
})

document.getElementById('lm-close')?.addEventListener('click', () => {
  document.getElementById('logo-modal')!.hidden = true
})

document.getElementById('lm-overlay')?.addEventListener('click', () => {
  document.getElementById('logo-modal')!.hidden = true
})

// Escキーで閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('logo-modal')!.hidden = true
    document.getElementById('sp-adjust-drawer')!.hidden = true
  }
})
```

---

## 12. 無料DLボタンの動作仕様

```
無料ダウンロード（lca-download-free）クリック時：

1. ダウンロード確認モーダルを表示
   ┌──────────────────────────────┐
   │ 無料ダウンロードについて       │
   │                               │
   │ ・解像度：600px × 600px        │
   │ ・形式：PNG                    │
   │ ・著作権：LogoAI.jp に帰属     │
   │ ・商用利用：不可               │
   │                               │
   │ 商用利用・高解像度・著作権証明書 │
   │ が必要な場合は有料プランをご利用 │
   │ ください。                     │
   │                               │
   │ [キャンセル] [無料DLを続ける]  │
   └──────────────────────────────┘

2. 「無料DLを続ける」クリック → PNG ダウンロード開始
3. ダウンロード完了後に「有料プランのご案内」トースト表示
```

---

## 13. SEO・メタデータ

```html
<title>ロゴが生成されました | LogoAI.jp</title>
<meta name="robots" content="noindex, nofollow">
<!-- 結果ページはインデックス不要 -->
```

---

## 14. アクセシビリティ要件

| 要件 | 実装 |
|---|---|
| ロゴカードのALT | `{brandName}のロゴ案{index}：{styleDesc}` |
| モーダルのフォーカストラップ | 開閉時にフォーカスを管理 |
| ドロワーのaria-modal | `role="dialog" aria-modal="true"` |
| プレビュータブ | `role="tablist"` + `aria-selected` |
| 再生成残り回数 | `aria-live="polite"` でリアルタイム読み上げ |
| 白黒切替 | `aria-pressed` で状態を通知 |

---

## 15. レスポンシブ断点

| 断点 | 変更内容 |
|---|---|
| 1280px以下 | ロゴグリッド3列→2列 |
| 1024px以下 | サイドパネル非表示、SP固定バー表示 |
| 768px以下 | 無料制限バナーを縦並び |
| 640px以下 | ロゴグリッド1列、モーダル全幅 |

---

## 16. コンポーネント構成

```
app/create/result/page.tsx

components/create/result/
├── ResultHeader.tsx          ← ロゴ + 生成完了ステータス
├── TrustBar.tsx              ← 顶部安心条（新增）
├── ConditionSummary.tsx      ← 条件摘要区（新增）
├── PreviewTabs.tsx           ← 用途別プレビュータブ
├── LogoGrid.tsx              ← 8〜12案グリッド
├── LogoCard.tsx              ← 個別カード（印象タグ・詳細ボタン含む）
├── RegenGuide.tsx            ← 底部再生成引导区（新增・旧FreeLimitBanner差替）
├── AdjustPanel.tsx           ← 右サイドバー調整パネル（PC）
├── SpAdjustDrawer.tsx        ← 底部ドロワー（SP）
├── LogoModal.tsx             ← 拡大プレビューモーダル（= 詳細を見る）
├── FreeDownloadModal.tsx     ← 無料DL確認モーダル
└── result-page.ts            ← 状態管理・インタラクション

lib/
└── wizard-state.ts           ← WizardState 型・session管理（create共通）
```

---

*文档版本：v2.0 | 最終更新：2025年3月（日本ユーザー心理に基づきUI大幅更新）| 次規格：/checkout 決済フロー*
