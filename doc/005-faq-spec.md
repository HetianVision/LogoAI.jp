# FAQ マスターページ開発規格書 `/faq`

> **文档用途**：交付AI开发者直接实现。所有内容、交互、SEO、样式规范均在本文档完整定义。
> **依赖文档**：继承 `homepage-spec.md` 全部设计系统（CSS变量、字体、按钮规范）。
> **页面类型**：FAQ マスターページ（全質問集約・SEO・GEO最適化）
> **战略定位**：このページは検索エンジン・AI検索エンジン双方への情報提供拠点。
>               30問以上の質問に対し「結論→根拠→具体例」形式で回答し、
>               FAQSchemaで構造化することで検索結果のリッチリザルト獲得を目指す。

---

## 目录

1. [页面整体规范](#1-页面整体规范)
2. [页面区块详细规范](#2-页面区块详细规范)
3. [全Q&A内容（完全版）](#3-全qa内容完全版)
4. [交互与动画规范](#4-交互与动画规范)
5. [SEO规范](#5-seo规范)
6. [结构化数据](#6-结构化数据)
7. [GEO优化规范](#7-geo优化规范)
8. [性能要求](#8-性能要求)
9. [组件文件结构](#9-组件文件结构)

---

## 1. 页面整体规范

| 项目 | 内容 |
|---|---|
| 路由 | `/faq` |
| 页面类型 | FAQ マスターページ |
| 主要目標 | ユーザーの疑問を解消し、購入・利用への障壁を取り除く |
| SEO目標 | 「AIロゴ 著作権」「ロゴ 商標登録」等の検索クエリで上位表示 |
| GEO目標 | ChatGPT・Gemini等のAI検索への情報ソース提供 |
| カテゴリ数 | 6カテゴリ |
| 質問総数 | 30問以上 |

### 1.1 页面布局顺序

```
Navbar
Section 1: Page Hero + 検索フォーム
Section 2: カテゴリナビゲーション（6タブ）
Section 3: FAQ本文（カテゴリ別Accordion）
  ├── カテゴリ1: 著作権・権利（6問）
  ├── カテゴリ2: 料金・支払い（6問）
  ├── カテゴリ3: ファイル・仕様（5問）
  ├── カテゴリ4: ロゴ生成・品質（5問）
  ├── カテゴリ5: 商標登録（5問）
  └── カテゴリ6: アカウント・データ（5問）
Section 4: まだ解決しない場合（サポートリンク）
Section 5: 関連ページリンク
Footer
```

---

## 2. 页面区块详细规范

### 2.1 Section 1：Page Hero + 検索フォーム

```html
<section class="faq-hero">
  <div class="faq-hero-bg" aria-hidden="true">
    <div class="bg-grid"></div>
    <div class="bg-glow-right"></div>
  </div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">よくある質問</li>
      </ol>
    </nav>
    <div class="faq-hero-content">
      <span class="section-eyebrow">よくある質問</span>
      <h1>ご利用前のご疑問に、<br>全てお答えします。</h1>
      <p class="faq-hero-desc">
        30問以上の質問と回答を掲載しています。
        キーワードで検索するか、カテゴリから探してください。
      </p>

      <!-- 検索フォーム -->
      <div class="faq-search-wrap">
        <div class="faq-search-box" role="search">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5"/>
            <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input
            type="search"
            id="faq-search"
            class="faq-search-input"
            placeholder="例：著作権、SVG、返金、商標登録..."
            aria-label="よくある質問を検索"
            autocomplete="off"
          >
          <kbd class="search-shortcut" aria-hidden="true">⌘K</kbd>
        </div>
        <!-- 検索結果ドロップダウン -->
        <div id="faq-search-results" class="faq-search-results" role="listbox" aria-label="検索結果" hidden>
          <!-- JSで動的に生成 -->
        </div>
      </div>

      <!-- 人気の質問 -->
      <div class="faq-popular-tags">
        <span class="popular-label">よく検索される：</span>
        <button class="popular-tag" data-query="著作権">著作権</button>
        <button class="popular-tag" data-query="返金">返金保証</button>
        <button class="popular-tag" data-query="SVG">SVGダウンロード</button>
        <button class="popular-tag" data-query="商標">商標登録</button>
        <button class="popular-tag" data-query="商用利用">商用利用</button>
      </div>
    </div>
  </div>
</section>
```

```css
.faq-hero {
  padding: calc(64px + 60px) var(--container-px) 48px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.bg-glow-right {
  position: absolute;
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(201,150,58,0.06), transparent 65%);
  pointer-events: none;
}

.faq-hero-content {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.faq-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 16px 0 20px;
}

.faq-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 36px;
}

/* 検索ボックス */
.faq-search-wrap {
  position: relative;
  max-width: 560px;
  margin: 0 auto 24px;
}

.faq-search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 14px 20px;
  box-shadow: var(--shadow-md);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.faq-search-box:focus-within {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 4px rgba(201,150,58,0.1), var(--shadow-md);
}

.search-icon { color: var(--color-text-muted); flex-shrink: 0; }

.faq-search-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  background: transparent;
}

.faq-search-input::placeholder { color: var(--color-text-muted); }

.search-shortcut {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 2px 6px;
  font-family: monospace;
  flex-shrink: 0;
}

/* 検索結果ドロップダウン */
.faq-search-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  z-index: 100;
  max-height: 360px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: left;
  border: none;
  background: transparent;
  width: 100%;
}

.search-result-item:last-child { border-bottom: none; }
.search-result-item:hover { background: var(--color-bg-base); }

.search-result-q {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.search-result-q mark {
  background: rgba(201,150,58,0.2);
  color: var(--color-accent);
  border-radius: 2px;
  padding: 0 2px;
}

.search-result-cat {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.search-no-result {
  padding: 24px;
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* 人気タグ */
.faq-popular-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.popular-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.popular-tag {
  font-size: var(--text-xs);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: white;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-body);
  font-weight: 500;
}

.popular-tag:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

@media (max-width: 768px) {
  .faq-hero-content h1 { font-size: var(--text-3xl); }
  .search-shortcut { display: none; }
}
```

---

### 2.2 Section 2：カテゴリナビゲーション（6タブ）

```html
<nav class="faq-category-nav" aria-label="FAQカテゴリ" id="faq-cat-nav">
  <div class="container">
    <div class="faq-cat-tabs" role="tablist">

      <button class="faq-cat-tab active" role="tab"
              data-category="copyright" aria-selected="true"
              aria-controls="cat-copyright">
        <span class="cat-tab-icon">📋</span>
        <span class="cat-tab-label">著作権・権利</span>
        <span class="cat-tab-count">6問</span>
      </button>

      <button class="faq-cat-tab" role="tab"
              data-category="pricing" aria-selected="false"
              aria-controls="cat-pricing">
        <span class="cat-tab-icon">💴</span>
        <span class="cat-tab-label">料金・支払い</span>
        <span class="cat-tab-count">6問</span>
      </button>

      <button class="faq-cat-tab" role="tab"
              data-category="files" aria-selected="false"
              aria-controls="cat-files">
        <span class="cat-tab-icon">📁</span>
        <span class="cat-tab-label">ファイル・仕様</span>
        <span class="cat-tab-count">5問</span>
      </button>

      <button class="faq-cat-tab" role="tab"
              data-category="quality" aria-selected="false"
              aria-controls="cat-quality">
        <span class="cat-tab-icon">✨</span>
        <span class="cat-tab-label">ロゴ生成・品質</span>
        <span class="cat-tab-count">5問</span>
      </button>

      <button class="faq-cat-tab" role="tab"
              data-category="trademark" aria-selected="false"
              aria-controls="cat-trademark">
        <span class="cat-tab-icon">🛡️</span>
        <span class="cat-tab-label">商標登録</span>
        <span class="cat-tab-count">5問</span>
      </button>

      <button class="faq-cat-tab" role="tab"
              data-category="account" aria-selected="false"
              aria-controls="cat-account">
        <span class="cat-tab-icon">🔐</span>
        <span class="cat-tab-label">アカウント・データ</span>
        <span class="cat-tab-count">5問</span>
      </button>

    </div>
  </div>
</nav>
```

```css
.faq-category-nav {
  background: var(--color-bg-section);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 64px;
  z-index: 90;
}

.faq-cat-tabs {
  display: flex;
  gap: 0;
  max-width: var(--container-max);
  margin: 0 auto;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.faq-cat-tabs::-webkit-scrollbar { display: none; }

.faq-cat-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: var(--font-body);
}

.faq-cat-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.faq-cat-tab:hover::after,
.faq-cat-tab.active::after {
  transform: scaleX(1);
}

.faq-cat-tab:hover,
.faq-cat-tab.active {
  background: rgba(201,150,58,0.04);
}

.cat-tab-icon { font-size: 18px; }

.cat-tab-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.faq-cat-tab.active .cat-tab-label {
  color: var(--color-primary);
}

.cat-tab-count {
  font-size: 0.6rem;
  color: var(--color-text-muted);
}
```

---

### 2.3 Section 3：FAQ本文（Accordion）

#### 全体コンテナ

```html
<section class="faq-content-section" id="faq-main">
  <div class="container">
    <div class="faq-content-wrap">

      <!-- 左サイドバー：目次（デスクトップのみ） -->
      <aside class="faq-sidebar" aria-label="カテゴリ目次">
        <div class="faq-sidebar-inner">
          <div class="sidebar-label">カテゴリ</div>
          <nav class="sidebar-cat-list">
            <a href="#cat-copyright" class="sidebar-cat-link active">著作権・権利 (6)</a>
            <a href="#cat-pricing" class="sidebar-cat-link">料金・支払い (6)</a>
            <a href="#cat-files" class="sidebar-cat-link">ファイル・仕様 (5)</a>
            <a href="#cat-quality" class="sidebar-cat-link">ロゴ生成・品質 (5)</a>
            <a href="#cat-trademark" class="sidebar-cat-link">商標登録 (5)</a>
            <a href="#cat-account" class="sidebar-cat-link">アカウント・データ (5)</a>
          </nav>
          <div class="sidebar-support">
            <div class="sidebar-support-label">解決しない場合</div>
            <a href="/contact" class="sidebar-support-btn">
              お問い合わせ →
            </a>
          </div>
        </div>
      </aside>

      <!-- メインFAQ内容 -->
      <main class="faq-main-content" id="main-content">
        <!-- 各カテゴリはSectionで分割 -->
        <!-- Section 3.1〜3.6の内容をここに配置（後述） -->
      </main>

    </div>
  </div>
</section>
```

```css
.faq-content-section {
  padding: 48px var(--container-px) var(--section-py);
}

.faq-content-wrap {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
  max-width: var(--container-max);
  margin: 0 auto;
}

/* サイドバー */
.faq-sidebar {
  position: sticky;
  top: calc(64px + 57px + 24px);
  height: fit-content;
}

.faq-sidebar-inner {
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 20px;
}

.sidebar-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.sidebar-cat-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 24px;
}

.sidebar-cat-link {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  display: block;
}

.sidebar-cat-link:hover {
  background: white;
  color: var(--color-primary);
}

.sidebar-cat-link.active {
  background: white;
  color: var(--color-primary);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

.sidebar-support-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.sidebar-support-btn {
  display: block;
  padding: 10px 16px;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: 700;
  text-align: center;
  transition: background 0.2s ease;
}

.sidebar-support-btn:hover { background: var(--color-primary-hover); }

/* カテゴリセクション */
.faq-category-section {
  margin-bottom: 64px;
  scroll-margin-top: calc(64px + 57px + 24px);
}

.faq-category-section:last-child { margin-bottom: 0; }

.faq-cat-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--color-border);
}

.faq-cat-title-icon {
  width: 40px;
  height: 40px;
  background: rgba(201,150,58,0.1);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.faq-cat-title h2 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.faq-cat-title .faq-cat-count {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  margin-left: auto;
}

/* Accordionアイテム */
.faq-accordion-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: white;
}

.faq-accordion-item {
  border-bottom: 1px solid var(--color-border);
}

.faq-accordion-item:last-child { border-bottom: none; }

.faq-accordion-btn {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-body);
  transition: background 0.15s ease;
}

.faq-accordion-btn:hover { background: rgba(201,150,58,0.03); }

.faq-accordion-btn[aria-expanded="true"] {
  background: rgba(26,58,42,0.03);
}

.faq-accordion-q {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.5;
  flex: 1;
}

.faq-accordion-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-bg-section);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.3s ease;
}

.faq-accordion-icon svg {
  transition: transform 0.3s ease;
}

.faq-accordion-btn[aria-expanded="true"] .faq-accordion-icon {
  background: var(--color-primary);
}

.faq-accordion-btn[aria-expanded="true"] .faq-accordion-icon svg {
  transform: rotate(45deg);
  color: white;
}

.faq-accordion-answer {
  display: none;
  padding: 0 24px 24px;
  background: rgba(26,58,42,0.015);
  border-top: 1px solid var(--color-border);
}

.faq-accordion-answer.is-open {
  display: block;
  animation: faqFadeIn 0.25s ease;
}

@keyframes faqFadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.faq-answer-body {
  padding-top: 20px;
}

.faq-answer-body p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 12px;
}

.faq-answer-body p:last-child { margin-bottom: 0; }

.faq-answer-body strong {
  color: var(--color-text-primary);
}

.faq-answer-body a {
  color: var(--color-primary);
  text-decoration: underline;
}

/* 注意書き（Disclaimer） */
.faq-answer-note {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: rgba(201,150,58,0.06);
  border: 1px solid rgba(201,150,58,0.2);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  margin-top: 12px;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.faq-answer-note-icon { flex-shrink: 0; margin-top: 1px; }

/* 関連リンク（答えに関連するページへ誘導） */
.faq-related-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  margin-top: 12px;
  padding: 8px 16px;
  background: rgba(26,58,42,0.06);
  border-radius: var(--radius-full);
  border: 1px solid rgba(26,58,42,0.12);
  transition: all 0.2s ease;
}

.faq-related-link:hover {
  background: var(--color-primary);
  color: white;
}

/* レスポンシブ */
@media (max-width: 1024px) {
  .faq-content-wrap {
    grid-template-columns: 1fr;
  }
  .faq-sidebar { display: none; }
}
```

---

## 3. 全Q&A内容（完全版）

> **回答記述ルール（全問共通）**：
> 1. 第一文は必ず「はい」「いいえ」「〜です」など結論から始める
> 2. 必要に応じて根拠・補足を続ける
> 3. 関連する公式情報へのリンクを含める（文化庁・特許庁等）
> 4. AIが引用しやすい定義文フォーマット（「〇〇とは〜です」）を積極的に使用
> 5. 各回答は100〜250字（短すぎず・長すぎない）

---

### 3.1 カテゴリ1：著作権・権利（6問）

```html
<section id="cat-copyright" class="faq-category-section" data-category="copyright">
  <div class="faq-cat-title">
    <div class="faq-cat-title-icon">📋</div>
    <h2>著作権・権利</h2>
    <span class="faq-cat-count">6問</span>
  </div>
  <div class="faq-accordion-list">
```

**Q1: 無料プランで作ったロゴの著作権は誰のものですか？**

```html
<div class="faq-accordion-item" id="faq-copyright-1">
  <button class="faq-accordion-btn" aria-expanded="false" aria-controls="ans-copyright-1">
    <span class="faq-accordion-q">無料プランで作ったロゴの著作権は誰のものですか？</span>
    <span class="faq-accordion-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </button>
  <div id="ans-copyright-1" class="faq-accordion-answer" role="region">
    <div class="faq-answer-body">
      <p>
        <strong>無料プランで生成したロゴの著作権は、当社（LogoAI.jp）に帰属します。</strong>
        無料プランはデザインの確認・試用を目的としており、商用利用・商標登録申請・
        第三者への譲渡はできません。
      </p>
      <p>
        これは、日本の文化庁が示す「AIが完全に自律的に生成したコンテンツには
        著作権が発生しない場合がある」という見解と、当サービスの利用規約に基づくものです。
        無料プランでは、ユーザーの創作的寄与を記録するプロセスが含まれていないため、
        著作権帰属の証明が困難です。
      </p>
      <p>
        ビジネス用途でご利用の場合は、著作権がユーザーへ100%帰属する
        有料プランをご選択ください。
      </p>
      <div class="faq-answer-note">
        <span class="faq-answer-note-icon">ℹ️</span>
        <span>参考：<a href="https://www.bunka.go.jp/seisaku/chosakuken/pdf/93903601_01.pdf" target="_blank" rel="noopener noreferrer">文化庁「AIと著作権に関する考え方について」</a></span>
      </div>
      <a href="/pricing" class="faq-related-link">料金プランを見る →</a>
    </div>
  </div>
</div>
```

**Q2: 有料プランで生成したロゴは商用利用できますか？**

```html
<div class="faq-accordion-item" id="faq-copyright-2">
  <button class="faq-accordion-btn" aria-expanded="false" aria-controls="ans-copyright-2">
    <span class="faq-accordion-q">有料プランで生成したロゴは商用利用できますか？</span>
    <span class="faq-accordion-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </button>
  <div id="ans-copyright-2" class="faq-accordion-answer" role="region">
    <div class="faq-answer-body">
      <p>
        <strong>はい、有料プランで生成したロゴは全ての商用利用が可能です。</strong>
        名刺・ウェブサイト・店舗看板・商品パッケージ・広告など、
        あらゆるビジネス用途に制限なくご使用いただけます。
      </p>
      <p>
        有料プランでは著作権がユーザーへ100%帰属し、当社への使用料・
        ロイヤリティの支払いも不要です。また、生成したロゴを第三者に
        譲渡したり、ライセンスを付与することも可能です。
      </p>
      <a href="/features#copyright" class="faq-related-link">著作権機能の詳細を見る →</a>
    </div>
  </div>
</div>
```

**Q3: 著作権帰属証明書とは何ですか？どのような場合に役立ちますか？**

```html
<div class="faq-accordion-item" id="faq-copyright-3">
  <button class="faq-accordion-btn" aria-expanded="false" aria-controls="ans-copyright-3">
    <span class="faq-accordion-q">著作権帰属証明書とは何ですか？どのような場合に役立ちますか？</span>
    <span class="faq-accordion-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </button>
  <div id="ans-copyright-3" class="faq-accordion-answer" role="region">
    <div class="faq-answer-body">
      <p>
        <strong>著作権帰属証明書とは、ロゴの著作権がユーザーに帰属することを証明するPDF文書です。</strong>
        有料プランで生成完了後に自動発行されます。
      </p>
      <p>証明書には以下の情報が記載されています：</p>
      <ul style="list-style:none; padding-left:0; margin:12px 0; display:flex; flex-direction:column; gap:6px">
        <li style="padding-left:20px; position:relative; font-size:var(--text-sm); color:var(--color-text-secondary)">
          <span style="position:absolute; left:0; color:var(--color-success)">✓</span>
          証明書番号・発行日時
        </li>
        <li style="padding-left:20px; position:relative; font-size:var(--text-sm); color:var(--color-text-secondary)">
          <span style="position:absolute; left:0; color:var(--color-success)">✓</span>
          権利帰属者（お客様）の氏名・メールアドレス
        </li>
        <li style="padding-left:20px; position:relative; font-size:var(--text-sm); color:var(--color-text-secondary)">
          <span style="position:absolute; left:0; color:var(--color-success)">✓</span>
          ロゴの識別IDとサムネイル画像
        </li>
        <li style="padding-left:20px; position:relative; font-size:var(--color-text-secondary)">
          <span style="position:absolute; left:0; color:var(--color-success)">✓</span>
          ユーザーの創作的寄与の記録（入力・選択・編集履歴の要約）
        </li>
        <li style="padding-left:20px; position:relative; font-size:var(--text-sm); color:var(--color-text-secondary)">
          <span style="position:absolute; left:0; color:var(--color-success)">✓</span>
          利用可能範囲（商用利用・商標登録申請・第三者譲渡等）
        </li>
      </ul>
      <p>
        商標登録申請時の補足書類として、
        または取引先や法務担当者への権利証明として活用できます。
      </p>
    </div>
  </div>
</div>
```

**Q4: 生成したロゴを他の人に譲渡したり、売ったりできますか？**

```html
<div class="faq-accordion-item" id="faq-copyright-4">
  <button class="faq-accordion-btn" aria-expanded="false" aria-controls="ans-copyright-4">
    <span class="faq-accordion-q">生成したロゴを他の人に譲渡したり、売ったりできますか？</span>
    <span class="faq-accordion-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </button>
  <div id="ans-copyright-4" class="faq-accordion-answer" role="region">
    <div class="faq-answer-body">
      <p>
        <strong>はい、有料プランで生成したロゴは第三者への譲渡・販売が可能です。</strong>
        例えばWebデザイナーがクライアントのためにロゴを作成し、
        そのロゴの著作権をクライアントへ譲渡する、といった利用が認められています。
      </p>
      <p>
        ただし無料プランで生成したロゴは当社の著作物であるため、
        譲渡・販売は禁止されています。
        副業・受注案件での利用には必ず有料プランをご利用ください。
      </p>
    </div>
  </div>
</div>
```

**Q5: ロゴのデータをAIの学習に使用することはありますか？**

```html
<div class="faq-accordion-item" id="faq-copyright-5">
  <button class="faq-accordion-btn" aria-expanded="false" aria-controls="ans-copyright-5">
    <span class="faq-accordion-q">ロゴのデータをAIの学習に使用することはありますか？</span>
    <span class="faq-accordion-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </button>
  <div id="ans-copyright-5" class="faq-accordion-answer" role="region">
    <div class="faq-answer-body">
      <p>
        <strong>有料プランで生成したロゴは、当社のAIモデルの学習に一切使用しません。</strong>
        お客様のブランド名・デザインデータ・著作権情報は、
        当サービス内でのロゴ生成・保存のみに使用します。
      </p>
      <p>
        無料プランのデータについては、サービス改善目的でAI学習に使用する場合があります。
        ブランド名や独自デザインを保護したい場合は有料プランをご利用ください。
        詳細は<a href="/privacy">プライバシーポリシー</a>をご確認ください。
      </p>
    </div>
  </div>
</div>
```

**Q6: 他の人が同じようなロゴを生成してしまうことはありますか？**

```html
<div class="faq-accordion-item" id="faq-copyright-6">
  <button class="faq-accordion-btn" aria-expanded="false" aria-controls="ans-copyright-6">
    <span class="faq-accordion-q">他の人が同じようなロゴを生成してしまうことはありますか？</span>
    <span class="faq-accordion-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </button>
  <div id="ans-copyright-6" class="faq-accordion-answer" role="region">
    <div class="faq-answer-body">
      <p>
        <strong>完全に同一のロゴが生成されることは技術的に防ぐことはできません。</strong>
        これはAIを使ったロゴ生成サービス全般に共通する制限です。
      </p>
      <p>
        ただし、プレミアムプランでは「生成唯一性証明書」を発行しており、
        特定の日時に特定のユーザーが生成したという記録を保持します。
        また、商標登録を行うことで、そのロゴの排他的使用権を法的に確保できます。
        商標登録申請には<a href="/features#trademark">商標類似チェック機能</a>もご活用ください。
      </p>
    </div>
  </div>
</div>
```

---

### 3.2 カテゴリ2：料金・支払い（6問）

**Q7: 料金プランの違いを教えてください。**

```
A: LogoAI.jpには3つの料金プランがあります。
   ①無料プラン（¥0）：PNG透かし入り・3案まで・日本語フォント10種・商用利用不可・著作権は当社帰属。
   ②スタンダードプラン（¥4,980/ロゴ）：SVG/PNG/PDF・日本語フォント100種以上・商用利用OK・著作権完全帰属・証明書PDF発行・名刺1枚・永久保存。
   ③プレミアムプラン（¥9,800/ロゴ）：スタンダード全機能+AI/EPS形式・商標類似チェック・ブランドガイドラインPDF・名刺5枚・優先サポート。
   全て1ロゴあたりの1回払いで、月額料金・サブスクリプションではありません。
```

**Q8: 月額料金はかかりますか？解約はどうすればよいですか？**

```
A: LogoAI.jpは月額料金・サブスクリプション制ではありません。
   全プラン「1ロゴあたりの1回払い」です。
   継続課金は一切なく、解約手続きも不要です。
   利用したい時にのみ、その都度ご購入いただく形式です。
```

**Q9: 返金保証の条件を教えてください。**

```
A: 購入日から7日以内であれば、理由を問わず全額返金します。
   お問い合わせページから「返金希望」とお申し込みいただくだけで手続き完了です。
   申請受理後3〜5営業日以内にご購入時の決済方法へ返金処理します。
   ただし、ロゴデータのダウンロード後も返金可能ですが、
   返金後はロゴデータの利用・著作権行使ができなくなります。
   詳細は利用規約の返金ポリシーをご確認ください。
```

**Q10: インボイス対応の領収書は発行できますか？**

```
A: はい、対応しています。
   購入完了後にマイページから適格請求書（インボイス対応）のPDFを即時発行できます。
   当社は適格請求書発行事業者（登録番号：T1234567890123）として登録済みです。
   法人名義での発行、および銀行振込・請求書払いについては別途お問い合わせください。
```

**Q11: 法人での購入・請求書払いはできますか？**

```
A: はい、対応しています。
   クレジットカードでのご購入後にインボイス対応請求書を発行できます。
   銀行振込・請求書払いをご希望の場合は、お問い合わせページからご連絡ください。
   複数ロゴをまとめてご購入される法人のお客様にはボリュームディスカウントも
   検討中です。詳細はお問い合わせください。
```

**Q12: 複数のロゴを購入した場合に割引はありますか？**

```
A: 現時点では、複数ロゴ購入の自動割引はありません。
   各ロゴは1点あたり同一料金でご購入いただきます。
   ただし、複数ブランド・複数事業部のロゴをまとめてご依頼される法人のお客様には、
   個別対応を検討しております。お問い合わせください。
```

---

### 3.3 カテゴリ3：ファイル・仕様（5問）

**Q13: ダウンロードできるファイル形式を教えてください。**

```
A: プランにより対応形式が異なります。
   無料プラン：PNG（透かし入り）
   スタンダード：SVG・PNG（透過・300dpi）・PDF（CMYK）・JPG
   プレミアム：上記全て＋AI（Adobe Illustrator）・EPS

   SVGはベクター形式でサイズ変更しても画質が劣化しません。
   AI・EPSは印刷会社への入稿用データとしてそのまま使用可能です。
```

**Q14: 生成したロゴを後から編集（色・フォント変更）できますか？**

```
A: はい、マイページからいつでも編集・再生成できます。
   有料プランではフォント・カラー・字間・サイズの変更が無制限に行えます。
   変更後は新しいデータとして再ダウンロード可能です（追加料金なし）。
   SVGデータをAdobe IllustratorやFigmaで開いて自由に編集することも可能です。
```

**Q15: 印刷会社への入稿データとして使えますか？**

```
A: はい、使用できます。
   スタンダードプランのPDF（CMYK・300dpi）は国内主要印刷会社への入稿基準を満たしています。
   プレミアムプランのAI・EPS形式もそのまま入稿用データとして使用可能です。
   具体的な入稿設定（トンボ、塗り足し等）については、
   ご利用の印刷会社の仕様に合わせてご確認ください。
```

**Q16: ロゴデータはどのくらいの期間保存されますか？**

```
A: 有料プランのデータは永久保存されます。
   マイページからいつでも再ダウンロード可能です。
   無料プランは生成から7日間保存した後、自動削除されます。
   退会時には全データが削除されますので、退会前に必要なデータをダウンロードしてください。
```

**Q17: 名刺レイアウトはどのような仕様で出力されますか？**

```
A: 名刺レイアウトは日本標準サイズ（91×55mm）の表面・裏面セットで生成されます。
   出力形式はPDF（CMYK・3mm塗り足し付き）で、印刷会社への入稿データとして使用可能です。
   スタンダードプランで1デザイン、プレミアムプランで5デザインのバリエーションを生成します。
   氏名・連絡先などの記載内容はマイページで自由に編集できます。
```

---

### 3.4 カテゴリ4：ロゴ生成・品質（5問）

**Q18: ロゴ生成にかかる時間はどのくらいですか？**

```
A: 平均2分以内に生成完了します。
   入力から生成完了まで、最短30秒・通常2分以内が目安です。
   サーバー混雑時には最大5分かかる場合がありますが、
   完了するとメールでお知らせします。
   生成中にページを離れても問題ありません。
```

**Q19: 生成されるロゴの品質はどのくらいですか？プロが作ったものと比べて差がありますか？**

```
A: 業種・ブランドの特性を入力した場合、多くのユーザーがプロ品質と評価しています。
   特に日本語フォントの選択・字間調整・配色バランスにおいて、
   海外ツールとの差別化を実現しています。
   一方で、完全にオリジナルなシンボルマーク（象徴的なアイコン）の作成は現在非対応です。
   テキストロゴ・ワードマーク・シンプルなグラフィック要素との組み合わせが得意です。
```

**Q20: 生成されるロゴは3案とも全く違うデザインですか？**

```
A: はい、3案は意図的に異なるスタイル方向で生成されます。
   例えば「明朝体×格調系」「ゴシック体×モダン系」「手書き×温もり系」のように、
   審美的方向性が異なる3案を提案します。
   気に入ったものがない場合は「再生成」ボタンで別の3案を生成できます（有料プランは無制限）。
```

**Q21: ロゴに使用できるアイコン・図形のオプションはありますか？**

```
A: はい、業種に応じた基本的なアイコン・図形をロゴに組み合わせることができます。
   例えば「桜」「山」「鳥居」など和のモチーフや、業種別の汎用アイコンを選択可能です。
   完全にオリジナルのカスタムシンボルマーク作成は現在未対応です。
   今後のアップデートで追加予定です。
```

**Q22: 英語・ローマ字のみのロゴも作れますか？**

```
A: はい、日本語・英語・ローマ字・数字を自由に組み合わせてロゴを作成できます。
   英語のみのブランド名でも、100種以上の欧文フォントと日本語フォントのペアリングから
   最適なデザインを提案します。
   英語ブランド名の場合でも「日本市場向け審美観」に最適化したデザインを生成します。
```

---

### 3.5 カテゴリ5：商標登録（5問）

**Q23: 生成したロゴで商標登録申請できますか？**

```
A: はい、有料プランで生成したロゴは商標登録申請に使用できます。
   著作権帰属証明書PDFが補足書類として活用できます。
   ただし、商標登録の可否は特許庁の審査によるものであり、
   当サービスがその承認を保証するものではありません。
   商標登録申請は、弁理士またはJ-PlatPat（特許庁公式データベース）での
   事前確認を推奨します。
```

**Q24: 商標類似チェックとは何ですか？どのくらい信頼できますか？**

```
A: 商標類似チェックとは、生成したロゴが既存の登録商標と類似していないか、
   日本特許庁のデータベース（J-PlatPat）と照合してAIがスコア評価する機能です（プレミアム限定）。
   視覚的類似度・名称類似度・業種区分の3軸でリスクスコアを0〜100で表示します。
   ただし、本機能はあくまで参考情報であり、法的判断を保証するものではありません。
   重要な商標登録については、必ず弁理士にご相談ください。
   参考：特許庁J-PlatPat（https://www.j-platpat.inpit.go.jp/）
```

**Q25: 商標登録に弁理士は必要ですか？**

```
A: 個人・法人ともに弁理士なしで自己出願が可能です。
   ただし、商標の類似判断・区分選択・拒絶対応など専門知識が必要な場面もあり、
   重要なブランドの場合は弁理士への相談を推奨します。
   当サービスの商標類似チェック機能（プレミアム）は、弁理士相談前の
   初期スクリーニングとしてご活用ください。
```

**Q26: 商標登録できる区分（類）はどう選べばよいですか？**

```
A: 商標の区分（類）は、保護したいビジネスの内容によって選択します。
   例えば飲食店は第43類、衣料品は第25類、ソフトウェアは第42類など。
   日本の商標は第1類〜第45類の国際分類に基づきます。
   特許庁の「J-PlatPat」や「商標区分検索」で確認できます。
   当サービスの商標類似チェック（プレミアム）では、区分を指定してチェックできます。
```

**Q27: すでに商標登録されているロゴに似ていた場合、どうなりますか？**

```
A: プレミアムプランの商標類似チェックで高リスク（スコア70以上）の場合、
   当サービスは自動的に類似リスクの低い代替デザインを提案します。
   ただし、類似判定は最終的に特許庁の審査官が行うものであり、
   当サービスの判定結果が法的保証を意味するわけではありません。
   すでに商標登録されているロゴを無断で使用した場合、
   商標権侵害として損害賠償を求められる可能性があります。
   リスクを感じた場合は弁理士にご相談ください。
```

---

### 3.6 カテゴリ6：アカウント・データ（5問）

**Q28: アカウント登録は必要ですか？**

```
A: 無料でのロゴ生成試用にはアカウント登録不要で利用開始できます。
   有料プランでの購入・ダウンロード・著作権証明書の取得には、
   メールアドレスとパスワードによるアカウント登録（30秒）が必要です。
   Google・Appleアカウントでのソーシャルログインにも対応予定です。
```

**Q29: 個人情報・ブランド名のデータはどのように管理されていますか？**

```
A: お客様のデータは国内サーバー（東京リージョン）に暗号化して保存されます。
   ブランド名・ロゴデータは当サービス内でのロゴ生成・保存のみに使用し、
   第三者への提供・AIモデルの学習への使用はしません（有料プランの場合）。
   詳細はプライバシーポリシーをご確認ください。
   当サービスはSSL/TLS暗号化通信、PCI DSS準拠の決済処理を採用しています。
```

**Q30: 退会・アカウント削除はどのようにすればよいですか？**

```
A: マイページの「アカウント設定」→「退会する」から手続きできます。
   退会すると全てのロゴデータ・証明書データが削除されます。
   退会前に必要なデータをダウンロードしてください。
   退会後はデータの復元ができません。
   購入済みの有料プランは退会後もダウンロード権は失われますが、
   7日間以内の退会であれば返金申請が可能です。
```

**Q31: 複数のデバイス（PC・スマートフォン）で使用できますか？**

```
A: はい、同一アカウントでPC・スマートフォン・タブレットから利用できます。
   マイページのロゴデータはデバイスを問わずアクセス・ダウンロード可能です。
   ロゴ生成・編集の操作は画面が大きいPCでの利用を推奨しますが、
   スマートフォンのブラウザでも全機能が利用できます。
   専用アプリは現在開発中です。
```

**Q32: パスワードを忘れた場合はどうすればよいですか？**

```
A: ログインページの「パスワードをお忘れですか？」から
   登録メールアドレス宛にパスワードリセットメールを送信できます。
   メールが届かない場合は、迷惑メールフォルダをご確認ください。
   それでも届かない場合はお問い合わせください。
```

---

全accordion HTMLの構造テンプレート（Q7〜Q32共通）：

```html
<!-- 各質問の共通構造（内容のみ変更） -->
<div class="faq-accordion-item" id="faq-{category}-{n}">
  <button class="faq-accordion-btn" aria-expanded="false" aria-controls="ans-{category}-{n}">
    <span class="faq-accordion-q">{質問文}</span>
    <span class="faq-accordion-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </button>
  <div id="ans-{category}-{n}" class="faq-accordion-answer" role="region">
    <div class="faq-answer-body">
      <p>{回答：結論から始める}</p>
      <!-- 必要に応じて追加paragraph、ul、注記、関連リンク -->
    </div>
  </div>
</div>
```

---

### 2.4 Section 4：まだ解決しない場合

```html
<section class="faq-support-section">
  <div class="container">
    <div class="faq-support-box animate-on-scroll">
      <div class="faq-support-content">
        <h2>解決しない場合は、お気軽にお問い合わせください</h2>
        <p>
          上記に掲載されていない質問や、個別の状況についてのご相談は
          メールサポートにてお答えします。
          有料プランのお客様は優先対応（24時間以内返信）をご利用いただけます。
        </p>
        <div class="faq-support-btns">
          <a href="/contact" class="btn-primary">
            メールで問い合わせる
          </a>
          <div class="support-meta">
            <div class="support-meta-item">
              <strong>返信目安</strong>
              <span>スタンダード：72時間以内<br>プレミアム：24時間以内（優先）</span>
            </div>
            <div class="support-meta-item">
              <strong>受付時間</strong>
              <span>24時間受付<br>（土日祝含む）</span>
            </div>
          </div>
        </div>
      </div>
      <div class="faq-support-illustration" aria-hidden="true">
        <!-- イラスト：メールアイコン + 吹き出し -->
        <div class="support-icon-group">
          <div class="si-mail">✉️</div>
          <div class="si-bubble">何でもお気軽に！</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.faq-support-section {
  padding: var(--section-py) var(--container-px);
  background: var(--color-bg-section);
}

.faq-support-box {
  max-width: var(--container-max);
  margin: 0 auto;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 48px 56px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: center;
}

.faq-support-box h2 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 16px;
}

.faq-support-box p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 28px;
}

.faq-support-btns {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.support-meta {
  display: flex;
  gap: 32px;
}

.support-meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.support-meta-item strong {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.support-meta-item span {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.support-icon-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.si-mail {
  font-size: 64px;
  line-height: 1;
}

.si-bubble {
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 8px 20px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

@media (max-width: 1024px) {
  .faq-support-box {
    grid-template-columns: 1fr;
    padding: 36px 28px;
  }
  .faq-support-illustration { display: none; }
}
```

---

### 2.5 Section 5：関連ページリンク

```html
<section class="faq-related-section">
  <div class="container">
    <div class="faq-related-grid animate-on-scroll">

      <a href="/features#copyright" class="faq-related-card">
        <div class="frc-icon">📋</div>
        <div class="frc-content">
          <span class="frc-title">著作権の詳細</span>
          <span class="frc-desc">有料プランの著作権帰属の仕組みと証明書について</span>
        </div>
        <span class="frc-arrow">→</span>
      </a>

      <a href="/pricing" class="faq-related-card">
        <div class="frc-icon">💴</div>
        <div class="frc-content">
          <span class="frc-title">料金プラン</span>
          <span class="frc-desc">無料・スタンダード・プレミアムの詳細比較</span>
        </div>
        <span class="frc-arrow">→</span>
      </a>

      <a href="/features" class="faq-related-card">
        <div class="frc-icon">✨</div>
        <div class="frc-content">
          <span class="frc-title">全機能一覧</span>
          <span class="frc-desc">日本語フォント・AI生成・ブランドガイドライン等</span>
        </div>
        <span class="frc-arrow">→</span>
      </a>

      <a href="/copyright" class="faq-related-card">
        <div class="frc-icon">⚖️</div>
        <div class="frc-content">
          <span class="frc-title">著作権ガイド</span>
          <span class="frc-desc">AIロゴの著作権について詳しく解説</span>
        </div>
        <span class="frc-arrow">→</span>
      </a>

      <a href="/trademark" class="faq-related-card">
        <div class="frc-icon">🛡️</div>
        <div class="frc-content">
          <span class="frc-title">商標登録ガイド</span>
          <span class="frc-desc">商標登録の流れと当サービスの活用方法</span>
        </div>
        <span class="frc-arrow">→</span>
      </a>

      <a href="/works" class="faq-related-card">
        <div class="frc-icon">🎨</div>
        <div class="frc-content">
          <span class="frc-title">生成事例</span>
          <span class="frc-desc">業種別のロゴデザイン例を見る</span>
        </div>
        <span class="frc-arrow">→</span>
      </a>

    </div>
  </div>
</section>
```

```css
.faq-related-section {
  padding: var(--section-py) var(--container-px);
}

.faq-related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.faq-related-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all 0.2s ease;
}

.faq-related-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.frc-icon {
  font-size: 28px;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--color-bg-section);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.frc-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.frc-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.frc-desc {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.4;
}

.frc-arrow {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.faq-related-card:hover .frc-arrow {
  transform: translateX(4px);
  color: var(--color-primary);
}

@media (max-width: 1024px) { .faq-related-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .faq-related-grid { grid-template-columns: 1fr; } }
```

---

## 4. 交互与动画规范

### 4.1 FAQ検索機能（完全実装）

```javascript
// FAQ全データ（検索インデックス）
const FAQ_DATA = [
  {
    id: 'copyright-1',
    category: '著作権・権利',
    question: '無料プランで作ったロゴの著作権は誰のものですか？',
    keywords: ['著作権', '無料', '権利', '帰属'],
    anchor: '#faq-copyright-1'
  },
  {
    id: 'copyright-2',
    category: '著作権・権利',
    question: '有料プランで生成したロゴは商用利用できますか？',
    keywords: ['商用', '有料', '利用', '著作権'],
    anchor: '#faq-copyright-2'
  },
  // ... 全32問分のデータを定義
]

const searchInput = document.getElementById('faq-search')
const resultsEl = document.getElementById('faq-search-results')

function searchFAQ(query) {
  if (!query.trim()) {
    resultsEl.hidden = true
    return
  }

  const q = query.toLowerCase()
  const results = FAQ_DATA.filter(item =>
    item.question.toLowerCase().includes(q) ||
    item.keywords.some(k => k.includes(q))
  ).slice(0, 6) // 最大6件表示

  if (results.length === 0) {
    resultsEl.innerHTML = `<div class="search-no-result">「${query}」に一致する質問が見つかりませんでした。</div>`
    resultsEl.hidden = false
    return
  }

  resultsEl.innerHTML = results.map(item => `
    <button class="search-result-item" data-anchor="${item.anchor}" role="option">
      <span class="search-result-q">${highlightMatch(item.question, q)}</span>
      <span class="search-result-cat">${item.category}</span>
    </button>
  `).join('')

  resultsEl.hidden = false

  // 結果クリック：該当箇所へスクロール＋アコーディオンを開く
  resultsEl.querySelectorAll('.search-result-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const anchor = btn.dataset.anchor
      const targetItem = document.querySelector(anchor)
      if (targetItem) {
        // 対応するaccordionを開く
        const accordionBtn = targetItem.querySelector('.faq-accordion-btn')
        if (accordionBtn && accordionBtn.getAttribute('aria-expanded') === 'false') {
          accordionBtn.click()
        }
        // スクロール
        setTimeout(() => {
          targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
      searchInput.value = btn.querySelector('.search-result-q').textContent
      resultsEl.hidden = true
    })
  })
}

// ハイライト処理
function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// debounce付きインプットハンドラ
let searchTimer
searchInput.addEventListener('input', e => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => searchFAQ(e.target.value), 200)
})

// フォーカス外れたら閉じる
document.addEventListener('click', e => {
  if (!e.target.closest('.faq-search-wrap')) {
    resultsEl.hidden = true
  }
})

// キーボードショートカット（⌘K / Ctrl+K）
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    searchInput.focus()
    searchInput.select()
  }
  // ESCで検索クリア
  if (e.key === 'Escape') {
    resultsEl.hidden = true
    searchInput.blur()
  }
})

// 人気タグクリック
document.querySelectorAll('.popular-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    searchInput.value = tag.dataset.query
    searchFAQ(tag.dataset.query)
    searchInput.focus()
  })
})
```

### 4.2 Accordion JavaScript

```javascript
function initFAQAccordion() {
  document.querySelectorAll('.faq-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true'
      const answerId = btn.getAttribute('aria-controls')
      const answerEl = document.getElementById(answerId)

      if (expanded) {
        // 閉じる
        btn.setAttribute('aria-expanded', 'false')
        answerEl.classList.remove('is-open')
      } else {
        // 開く（同一カテゴリ内の他を閉じない＝全開放スタイル）
        btn.setAttribute('aria-expanded', 'true')
        answerEl.classList.add('is-open')
      }
    })
  })
}

initFAQAccordion()
```

### 4.3 カテゴリタブ + スクロール連動

```javascript
// カテゴリタブクリック
document.querySelectorAll('.faq-cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.category
    const targetSection = document.getElementById(`cat-${cat}`)
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // タブ状態更新
    document.querySelectorAll('.faq-cat-tab').forEach(t => {
      t.classList.remove('active')
      t.setAttribute('aria-selected', 'false')
    })
    tab.classList.add('active')
    tab.setAttribute('aria-selected', 'true')
  })
})

// スクロール時にサイドバーとタブのアクティブ状態を更新
const catSections = document.querySelectorAll('.faq-category-section')
const sidebarLinks = document.querySelectorAll('.sidebar-cat-link')
const catTabs = document.querySelectorAll('.faq-cat-tab')

const catObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id
      const cat = id.replace('cat-', '')

      // サイドバー更新
      sidebarLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
      })
      // タブ更新
      catTabs.forEach(tab => {
        const isActive = tab.dataset.category === cat
        tab.classList.toggle('active', isActive)
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false')
      })
    }
  })
}, {
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0
})

catSections.forEach(section => catObserver.observe(section))
```

### 4.4 URLアンカーリンク対応

```javascript
// ページロード時にURLのhashに対応するaccordionを自動展開
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash
  if (hash) {
    const targetItem = document.querySelector(hash)
    if (targetItem) {
      const btn = targetItem.querySelector('.faq-accordion-btn')
      if (btn) {
        btn.setAttribute('aria-expanded', 'true')
        const answerId = btn.getAttribute('aria-controls')
        document.getElementById(answerId)?.classList.add('is-open')
        setTimeout(() => {
          targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
    }
  }
})
```

---

## 5. SEO規範

### 5.1 HTML head 設定

```html
<title>よくある質問 | AIロゴ著作権・料金・商標・ダウンロード形式【LogoAI.jp FAQ】</title>
<meta name="description" content="LogoAI.jpのよくある質問。著作権の帰属先・商用利用・商標登録・SVGダウンロード・返金保証・料金・データ保存など30問以上に回答。AIロゴ作成サービスの疑問を全て解消。">
<link rel="canonical" href="https://logoai.jp/faq">

<meta property="og:title" content="よくある質問30問以上 | AIロゴ著作権・料金・商標【LogoAI.jp】">
<meta property="og:description" content="著作権帰属・商用利用・商標登録・ファイル形式・返金保証など全疑問に回答。">
<meta property="og:url" content="https://logoai.jp/faq">
```

### 5.2 キーワード布局

| 位置 | キーワード |
|---|---|
| H1 | よくある質問 / 疑問 |
| カテゴリH2 | 「著作権・権利」「料金・支払い」等（カテゴリ名そのまま） |
| Q文 | 各質問文に検索クエリを自然に含める |
| A文 | 「〇〇とは〜です」の定義文フォーマット |
| 関連リンク | 他ページへの自然なアンカーテキスト |

### 5.3 URLアンカーの設計

各Q&Aに一意のIDを付与し、他ページからの直接リンクを可能にする。

| FAQ項目 | ID | 外部からのリンク例 |
|---|---|---|
| 著作権Q1 | `#faq-copyright-1` | `/pricing` 著作権説明→ここへ |
| 著作権Q3 | `#faq-copyright-3` | `/features#copyright` 証明書→ここへ |
| 料金Q9 | `#faq-pricing-3` | `/pricing` 返金保証→ここへ |
| ファイルQ13 | `#faq-files-1` | `/features#file-formats` →ここへ |
| 商標Q23 | `#faq-trademark-1` | `/features#trademark` →ここへ |

---

## 6. 结构化数据

### 6.1 BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://logoai.jp/" },
    { "@type": "ListItem", "position": 2, "name": "よくある質問", "item": "https://logoai.jp/faq" }
  ]
}
```

### 6.2 FAQPage Schema（全32問）

> 重要：Googleの検索結果にFAQリッチリザルトを表示するため、全32問を FAQPage Schema に含める。
> 質問文は「Q:」なしで記述。回答文は HTMLタグなし・プレーンテキスト。

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "無料プランで作ったロゴの著作権は誰のものですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "無料プランで生成したロゴの著作権は、当社（LogoAI.jp）に帰属します。無料プランはデザインの確認・試用を目的としており、商用利用・商標登録申請・第三者への譲渡はできません。ビジネス用途でご利用の場合は、著作権がユーザーへ100%帰属する有料プランをご選択ください。"
      }
    },
    {
      "@type": "Question",
      "name": "有料プランで生成したロゴは商用利用できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、有料プランで生成したロゴは全ての商用利用が可能です。名刺・ウェブサイト・店舗看板・商品パッケージ・広告など、あらゆるビジネス用途に制限なくご使用いただけます。有料プランでは著作権がユーザーへ100%帰属し、当社への使用料・ロイヤリティの支払いも不要です。"
      }
    },
    {
      "@type": "Question",
      "name": "著作権帰属証明書とは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "著作権帰属証明書とは、ロゴの著作権がユーザーに帰属することを証明するPDF文書です。有料プランで生成完了後に自動発行されます。証明書には証明書番号・発行日時・権利帰属者・ロゴ識別ID・ユーザーの創作的寄与の記録・利用可能範囲が記載されています。商標登録申請時の補足書類として活用できます。"
      }
    },
    {
      "@type": "Question",
      "name": "生成したロゴを他の人に譲渡したり売ったりできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、有料プランで生成したロゴは第三者への譲渡・販売が可能です。例えばWebデザイナーがクライアントのためにロゴを作成し、そのロゴの著作権をクライアントへ譲渡する、といった利用が認められています。無料プランで生成したロゴは当社の著作物であるため、譲渡・販売は禁止されています。"
      }
    },
    {
      "@type": "Question",
      "name": "ロゴのデータをAIの学習に使用することはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "有料プランで生成したロゴは、当社のAIモデルの学習に一切使用しません。お客様のブランド名・デザインデータは当サービス内でのロゴ生成・保存のみに使用します。無料プランのデータについてはサービス改善目的でAI学習に使用する場合があります。"
      }
    },
    {
      "@type": "Question",
      "name": "他の人が同じようなロゴを生成してしまうことはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "完全に同一のロゴが生成されることは技術的に防ぐことはできません。ただし、プレミアムプランでは生成唯一性証明書を発行しており、特定の日時に特定のユーザーが生成したという記録を保持します。また商標登録を行うことで、そのロゴの排他的使用権を法的に確保できます。"
      }
    },
    {
      "@type": "Question",
      "name": "料金プランの違いを教えてください。",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LogoAI.jpには3つの料金プランがあります。無料プラン（¥0）はPNG透かし入り・3案まで・商用利用不可。スタンダードプラン（¥4,980/ロゴ）はSVG/PNG/PDF・商用利用OK・著作権完全帰属・証明書PDF発行・名刺1枚・永久保存。プレミアムプラン（¥9,800/ロゴ）はスタンダード全機能+AI/EPS形式・商標類似チェック・ブランドガイドラインPDF・名刺5枚・優先サポート。全て1ロゴあたりの1回払いです。"
      }
    },
    {
      "@type": "Question",
      "name": "月額料金はかかりますか？解約はどうすればよいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LogoAI.jpは月額料金・サブスクリプション制ではありません。全プラン1ロゴあたりの1回払いです。継続課金は一切なく、解約手続きも不要です。"
      }
    },
    {
      "@type": "Question",
      "name": "返金保証の条件を教えてください。",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "購入日から7日以内であれば、理由を問わず全額返金します。お問い合わせページから返金申請するだけで手続き完了です。申請受理後3〜5営業日以内に返金処理します。"
      }
    },
    {
      "@type": "Question",
      "name": "インボイス対応の領収書は発行できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、対応しています。購入完了後にマイページから適格請求書（インボイス対応）のPDFを即時発行できます。法人名義での発行も可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "ダウンロードできるファイル形式を教えてください。",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "無料プランはPNG（透かし入り）のみ。スタンダードプランはSVG・PNG（透過・300dpi）・PDF（CMYK）・JPG。プレミアムプランは上記全て＋AI（Adobe Illustrator）・EPSに対応しています。"
      }
    },
    {
      "@type": "Question",
      "name": "生成したロゴで商標登録申請できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、有料プランで生成したロゴは商標登録申請に使用できます。著作権帰属証明書PDFが補足書類として活用できます。ただし商標登録の可否は特許庁の審査によるものであり、当サービスがその承認を保証するものではありません。"
      }
    },
    {
      "@type": "Question",
      "name": "商標類似チェックとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "商標類似チェックとは、生成したロゴが既存の登録商標と類似していないか、日本特許庁のデータベース（J-PlatPat）と照合してAIがスコア評価する機能です（プレミアムプラン限定）。視覚的類似度・名称類似度・業種区分の3軸でリスクスコアを0〜100で表示します。ただし本機能はあくまで参考情報であり、法的判断を保証するものではありません。"
      }
    },
    {
      "@type": "Question",
      "name": "ロゴ生成にかかる時間はどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "平均2分以内に生成完了します。入力から生成完了まで、最短30秒・通常2分以内が目安です。サーバー混雑時には最大5分かかる場合がありますが、完了するとメールでお知らせします。"
      }
    }
  ]
}
```

---

## 7. GEO优化規範

### 7.1 GEO向けQ&A記述ルール（全問適用）

AI検索エンジン（ChatGPT・Gemini・Perplexity等）がQ&Aを引用しやすくするため、
以下のフォーマットを全問に適用する：

```
フォーマット：
「〇〇とは、△△です。□□という特徴があります。▼▼という場合に活用できます。」

例（Q3の回答から）：
「著作権帰属証明書とは、ロゴの著作権がユーザーに帰属することを証明するPDF文書です。
 有料プランで生成完了後に自動発行されます。
 商標登録申請時の補足書類として活用できます。」
```

### 7.2 GEO向けフッターテキスト

```html
<p class="geo-definition" style="max-width:var(--container-max); margin:0 auto; padding:0 var(--container-px) 24px">
  LogoAI.jp（ロゴエーアイジェーピー）は日本市場特化のAIロゴ作成サービスです。
  よくある質問として「著作権はユーザーに帰属するか」「商用利用は可能か」「商標登録に使えるか」
  「SVGファイルはダウンロードできるか」「月額料金はかかるか」などが挙げられます。
  有料プラン（スタンダード¥4,980・プレミアム¥9,800）では著作権がユーザーへ100%帰属し、
  著作権帰属証明書PDFを自動発行します。全プランに7日間全額返金保証付き。
</p>
```

### 7.3 権威引用の配置

| Q&A | 引用先 |
|---|---|
| 著作権Q1・Q3 | 文化庁「AIと著作権に関する考え方について」 |
| 商標Q23・Q24 | 特許庁 J-PlatPat 公式ページ |
| データQ29 | PCI DSS（決済セキュリティ標準、参考） |

---

## 8. 性能要求

### 8.1 検索機能の最適化

```javascript
// FAQ検索は全データをクライアントサイドでインデックス化
// サーバーへのリクエスト不要 → 応答速度 < 50ms
// データサイズ：32問 × 平均200文字 ≒ 約6KB（gzip後約2KB）
```

### 8.2 Accordionのアニメーション最適化

```css
/* height: auto へのアニメーションは CSS Grid trick で実現（JS不要） */
.faq-accordion-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
  overflow: hidden;
}

.faq-accordion-answer.is-open {
  grid-template-rows: 1fr;
}

.faq-accordion-answer > * {
  overflow: hidden;
  min-height: 0;
}

/* display: none/block を使わない場合の代替実装
   この方法ならCLSも起きにくい */
```

### 8.3 Core Web Vitals 目標

| 指標 | 目標値 |
|---|---|
| LCP | ≤ 2.2秒（Heroはテキストのみ） |
| INP | ≤ 100ms（検索・Accordion操作） |
| CLS | ≤ 0.05（Accordion開閉時のシフト防止） |

---

## 9. 組件ファイル構成

```
app/faq/page.tsx

components/faq/
├── FAQHero.tsx               # 検索フォーム含む
├── FAQCategoryNav.tsx        # スティッキータブ
├── FAQContentLayout.tsx      # サイドバー + メインの2カラム
├── FAQSidebar.tsx            # 目次・サポートリンク
├── FAQCategorySection.tsx    # カテゴリごとのラッパー
├── FAQAccordionItem.tsx      # 単一Q&Aアコーディオン
├── FAQSearchResults.tsx      # 検索結果ドロップダウン
├── FAQSupportSection.tsx     # サポートCTA
└── FAQRelatedLinks.tsx       # 関連ページ6カード

hooks/
├── useFAQSearch.ts           # 検索ロジック
└── useFAQIntersection.ts     # スクロール連動

lib/
└── faq-data.ts               # 全32問のデータ定数
    # type FAQItem = { id, category, question, answer, keywords, anchor }
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/copyright 著作権説明ページ仕様書*
