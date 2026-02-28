# 案例展示页开发规格书 `/works`

> **文档用途**：交付AI开发者直接实现。所有内容、交互、SEO、样式规范均在本文档完整定义。
> **依赖文档**：继承 `homepage-spec.md` 全部设计系统。
> **页面类型**：ギャラリー + 社会証明ページ（Gallery & Social Proof）
> **战略定位**：「実際にどんなロゴが作れるのか」という購入前の最大の疑問を解消するページ。
>               業種別フィルター + 高品質ビジュアルで「自分のロゴもこれくらい作れる」を実感させる。

---

## 目录

1. [页面整体规范](#1-页面整体规范)
2. [页面区块详细规范](#2-页面区块详细规范)
3. [ギャラリーデータ構造](#3-ギャラリーデータ構造)
4. [交互与动画规范](#4-交互与动画规范)
5. [SEO规范](#5-seo规范)
6. [结构化数据](#6-结构化数据)
7. [GEO优化](#7-geo优化)
8. [性能要求](#8-性能要求)
9. [组件文件结构](#9-组件文件结构)

---

## 1. 页面整体规范

| 项目 | 内容 |
|---|---|
| 路由 | `/works` |
| ページタイプ | ギャラリー・社会証明ページ |
| 主要目標 | 「こんなロゴが作れる」を視覚的に証明し購入意欲を高める |
| 次要目標 | 業種別ランディングページへの誘導ハブ |
| 表示件数 | 初期36件、無限スクロールで追加ロード |
| フィルター | 業種別（12カテゴリ）+ プラン別 + スタイル別 |

### 1.1 页面布局顺序

```
Navbar
Section 1: Page Hero           ← 数字で実績アピール
Section 2: フィルターバー      ← Sticky、業種/プラン/スタイル
Section 3: ギャラリーグリッド  ← Masonry 3列、hover詳細表示
Section 4: もっと見る / 無限スクロール
Section 5: ユーザーレビュー帯  ← 数字付き実績バー
Section 6: CTA                 ← 「あなたのロゴを作る」
Footer
```

---

## 2. 页面区块详细规范

### 2.1 Section 1：Page Hero

```html
<section class="works-hero">
  <div class="works-hero-bg" aria-hidden="true">
    <div class="bg-grid"></div>
  </div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">生成事例</li>
      </ol>
    </nav>
    <div class="works-hero-content">
      <span class="section-eyebrow">生成事例</span>
      <h1>AIが生成した<br>日本語ロゴ、全て実例です。</h1>
      <p class="works-hero-desc">
        実際のユーザーが当サービスで生成したロゴをご紹介します。
        業種・スタイル・フォントで絞り込んで、理想のイメージを見つけてください。
      </p>

      <!-- 実績数字バー -->
      <div class="works-stats">
        <div class="works-stat-item">
          <span class="works-stat-num">12,000<span class="stat-plus">+</span></span>
          <span class="works-stat-label">生成ロゴ数</span>
        </div>
        <div class="works-stat-divider" aria-hidden="true"></div>
        <div class="works-stat-item">
          <span class="works-stat-num">47</span>
          <span class="works-stat-label">対応業種</span>
        </div>
        <div class="works-stat-divider" aria-hidden="true"></div>
        <div class="works-stat-item">
          <span class="works-stat-num">4.9<span class="stat-unit">/ 5</span></span>
          <span class="works-stat-label">ユーザー満足度</span>
        </div>
        <div class="works-stat-divider" aria-hidden="true"></div>
        <div class="works-stat-item">
          <span class="works-stat-num">98<span class="stat-unit">%</span></span>
          <span class="works-stat-label">返金申請なし率</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.works-hero {
  padding: calc(64px + 60px) var(--container-px) 48px;
  position: relative;
  background: var(--color-bg-base);
  overflow: hidden;
}

.works-hero-content {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.works-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 16px 0 20px;
}

.works-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 48px;
}

/* 実績数字バー */
.works-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 24px 40px;
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
  gap: 0;
}

.works-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0 36px;
}

.works-stat-divider {
  width: 1px;
  height: 48px;
  background: var(--color-border);
  flex-shrink: 0;
}

.works-stat-num {
  font-family: var(--font-number);
  font-size: 2.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-plus, .stat-unit {
  font-size: 1rem;
  color: var(--color-accent);
  font-weight: 500;
}

.works-stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 500;
  letter-spacing: 0.03em;
}

@media (max-width: 768px) {
  .works-hero-content h1 { font-size: var(--text-3xl); }
  .works-stats { gap: 16px; padding: 20px 24px; }
  .works-stat-item { padding: 0 16px; }
  .works-stat-divider { display: none; }
}
```

---

### 2.2 Section 2：フィルターバー（Sticky）

```html
<div class="works-filter-bar" id="works-filter-bar" role="toolbar" aria-label="ロゴ絞り込みフィルター">
  <div class="container">
    <div class="filter-bar-inner">

      <!-- 業種フィルター -->
      <div class="filter-group" id="filter-industry">
        <span class="filter-group-label">業種</span>
        <div class="filter-chips" role="group" aria-label="業種で絞り込む">
          <button class="filter-chip active" data-filter="industry" data-value="all">すべて</button>
          <button class="filter-chip" data-filter="industry" data-value="restaurant">飲食店</button>
          <button class="filter-chip" data-filter="industry" data-value="beauty">美容・サロン</button>
          <button class="filter-chip" data-filter="industry" data-value="it">IT・Web</button>
          <button class="filter-chip" data-filter="industry" data-value="retail">小売・EC</button>
          <button class="filter-chip" data-filter="industry" data-value="medical">医療・健康</button>
          <button class="filter-chip" data-filter="industry" data-value="legal">士業・法律</button>
          <button class="filter-chip" data-filter="industry" data-value="education">教育・学習</button>
          <button class="filter-chip" data-filter="industry" data-value="construction">建設・不動産</button>
          <button class="filter-chip" data-filter="industry" data-value="finance">金融・保険</button>
          <button class="filter-chip" data-filter="industry" data-value="creative">クリエイティブ</button>
          <button class="filter-chip" data-filter="industry" data-value="event">イベント・婚礼</button>
          <button class="filter-chip" data-filter="industry" data-value="other">その他</button>
        </div>
      </div>

      <!-- 区切り -->
      <div class="filter-divider" aria-hidden="true"></div>

      <!-- スタイルフィルター -->
      <div class="filter-group" id="filter-style">
        <span class="filter-group-label">スタイル</span>
        <div class="filter-chips" role="group" aria-label="スタイルで絞り込む">
          <button class="filter-chip active" data-filter="style" data-value="all">すべて</button>
          <button class="filter-chip" data-filter="style" data-value="modern">モダン</button>
          <button class="filter-chip" data-filter="style" data-value="elegant">エレガント</button>
          <button class="filter-chip" data-filter="style" data-value="warm">温もり</button>
          <button class="filter-chip" data-filter="style" data-value="professional">プロフェッショナル</button>
          <button class="filter-chip" data-filter="style" data-value="playful">ポップ・楽しい</button>
        </div>
      </div>

      <!-- 件数表示 -->
      <div class="filter-count" aria-live="polite">
        <span id="result-count">36</span>件を表示中
      </div>
    </div>
  </div>
</div>
```

```css
.works-filter-bar {
  background: rgba(250,250,247,0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 64px;
  z-index: 90;
  padding: 0;
}

.filter-bar-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  max-width: var(--container-max);
  margin: 0 auto;
}

.filter-bar-inner::-webkit-scrollbar { display: none; }

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.filter-group-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.filter-chips {
  display: flex;
  gap: 6px;
  flex-wrap: nowrap;
}

.filter-chip {
  padding: 7px 16px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  background: white;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.filter-chip:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-chip.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.filter-divider {
  width: 1px;
  height: 28px;
  background: var(--color-border);
  flex-shrink: 0;
}

.filter-count {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  white-space: nowrap;
  margin-left: auto;
  flex-shrink: 0;
  padding-right: 8px;
}

#result-count {
  font-weight: 700;
  color: var(--color-text-primary);
}
```

---

### 2.3 Section 3：ギャラリーグリッド（Masonry 3列）

#### 設計方針
- デスクトップ：3列Masonryグリッド（CSS Columns実装）
- タブレット：2列
- モバイル：1列
- 各カードにhover時の詳細情報オーバーレイ
- 画像はWebP形式、lazy load

```html
<section class="works-gallery-section" id="gallery">
  <div class="container">
    <!-- フィルター適用中の表示 -->
    <div class="gallery-active-filters" id="active-filters" hidden>
      <span class="active-filters-label">絞り込み中：</span>
      <!-- JSで動的に生成 -->
    </div>

    <!-- Masonryグリッド -->
    <div class="works-masonry" id="works-grid" role="list" aria-label="ロゴ生成事例">
      <!-- 各カードはJSでレンダリング or サーバーサイドで生成 -->
      <!-- 以下はカード1枚のHTMLテンプレート -->
    </div>

    <!-- ローディングインジケーター -->
    <div class="gallery-loading" id="gallery-loading" hidden aria-label="読み込み中">
      <div class="loading-dots">
        <span></span><span></span><span></span>
      </div>
    </div>

    <!-- 全件表示済み -->
    <div class="gallery-end" id="gallery-end" hidden>
      <p>全 <strong id="total-count">120</strong> 件を表示しました</p>
      <a href="/create" class="btn-primary">あなたのロゴを作る →</a>
    </div>
  </div>
</section>
```

#### ロゴカード HTML テンプレート

```html
<!-- data属性でフィルタリング対応 -->
<article
  class="works-card"
  role="listitem"
  data-industry="restaurant"
  data-style="modern"
  data-plan="standard"
  data-font-type="gothic"
>
  <!-- ロゴ画像エリア -->
  <div class="wc-image-wrap">
    <img
      src="/images/works/restaurant-001.webp"
      alt="飲食店「麺屋 煌」のロゴ。ゴシック体、赤と黒のカラーリング"
      width="400"
      height="300"
      loading="lazy"
      decoding="async"
      class="wc-image"
    >

    <!-- ホバーオーバーレイ -->
    <div class="wc-overlay" aria-hidden="true">
      <div class="wc-overlay-content">
        <div class="wc-tags">
          <span class="wc-tag wc-tag-industry">飲食店</span>
          <span class="wc-tag wc-tag-style">モダン</span>
        </div>
        <h3 class="wc-overlay-title">麺屋 煌</h3>
        <div class="wc-overlay-meta">
          <span class="wc-font-info">角ゴシック体 × 朱赤</span>
          <span class="wc-plan-badge">スタンダード</span>
        </div>
        <a href="/create?industry=restaurant&style=modern" class="wc-cta-btn">
          このスタイルで作る
        </a>
      </div>
    </div>
  </div>

  <!-- カード下部メタ情報 -->
  <div class="wc-meta">
    <div class="wc-meta-left">
      <span class="wc-industry-label">飲食店</span>
      <span class="wc-name">麺屋 煌</span>
    </div>
    <div class="wc-color-dots" aria-label="使用カラー">
      <span class="color-dot" style="background:#C41E3A" title="朱赤"></span>
      <span class="color-dot" style="background:#1A1A1A" title="黒"></span>
      <span class="color-dot" style="background:#F5F0E8" title="ベージュ"></span>
    </div>
  </div>
</article>
```

#### CSS（カード + Masonry + Overlay）

```css
/* ─────────────────────────────────
   Masonryグリッド（CSS columns）
───────────────────────────────── */
.works-masonry {
  columns: 3;
  column-gap: 20px;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 32px 0 48px;
}

.works-card {
  break-inside: avoid;
  margin-bottom: 20px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: white;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  display: block;
}

.works-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

/* ─────────────────────────────────
   画像エリア
───────────────────────────────── */
.wc-image-wrap {
  position: relative;
  overflow: hidden;
  background: var(--color-bg-section);
  /* アスペクト比はカードごとに変化（Masonry効果）*/
}

.wc-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s ease;
}

.works-card:hover .wc-image {
  transform: scale(1.03);
}

/* ─────────────────────────────────
   ホバーオーバーレイ
───────────────────────────────── */
.wc-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(26,58,42,0.95) 0%,
    rgba(26,58,42,0.6) 50%,
    rgba(26,58,42,0.2) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.works-card:hover .wc-overlay { opacity: 1; }

.wc-overlay-content {
  width: 100%;
  transform: translateY(8px);
  transition: transform 0.3s ease;
}

.works-card:hover .wc-overlay-content { transform: translateY(0); }

.wc-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.wc-tag {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  letter-spacing: 0.04em;
}

.wc-tag-industry {
  background: rgba(201,150,58,0.9);
  color: white;
}

.wc-tag-style {
  background: rgba(250,250,247,0.15);
  color: white;
  border: 1px solid rgba(250,250,247,0.3);
}

.wc-overlay-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
  margin: 0 0 8px;
}

.wc-overlay-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.wc-font-info {
  font-size: var(--text-xs);
  color: rgba(250,250,247,0.7);
}

.wc-plan-badge {
  font-size: 0.6rem;
  background: rgba(201,150,58,0.8);
  color: white;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-weight: 700;
}

.wc-cta-btn {
  display: block;
  width: 100%;
  padding: 10px 16px;
  background: var(--color-accent);
  color: var(--color-text-primary);
  text-align: center;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s ease;
  font-family: var(--font-body);
}

.wc-cta-btn:hover { background: var(--color-accent-hover); }

/* ─────────────────────────────────
   カード下部メタ
───────────────────────────────── */
.wc-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
}

.wc-meta-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wc-industry-label {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.wc-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-heading);
}

.wc-color-dots {
  display: flex;
  gap: 4px;
}

.color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,0.08);
  display: block;
}

/* ─────────────────────────────────
   フィルター後の非表示アニメーション
───────────────────────────────── */
.works-card[hidden] { display: none; }

.works-card.filter-enter {
  animation: cardEnter 0.35s ease forwards;
}

@keyframes cardEnter {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ─────────────────────────────────
   ローディング・終了表示
───────────────────────────────── */
.gallery-loading {
  display: flex;
  justify-content: center;
  padding: 48px;
}

.loading-dots {
  display: flex;
  gap: 8px;
}

.loading-dots span {
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: dotBounce 1.2s ease infinite;
}

.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotBounce {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50% { transform: translateY(-10px); opacity: 1; }
}

.gallery-end {
  text-align: center;
  padding: 48px 0;
}

.gallery-end p {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

/* ─────────────────────────────────
   アクティブフィルター表示
───────────────────────────────── */
.gallery-active-filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.active-filters-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.active-filter-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-xs);
  background: rgba(26,58,42,0.08);
  color: var(--color-primary);
  padding: 5px 12px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(26,58,42,0.15);
  font-weight: 600;
}

.active-filter-remove {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  font-size: 14px;
  line-height: 1;
  padding: 0;
}

/* ─────────────────────────────────
   レスポンシブ
───────────────────────────────── */
@media (max-width: 1024px) { .works-masonry { columns: 2; } }
@media (max-width: 640px)  { .works-masonry { columns: 1; } }
```

---

### 2.4 Section 4：ユーザーレビュー帯

```html
<section class="works-review-band" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="review-band-inner animate-on-scroll">
      <div class="review-band-left">
        <div class="review-stars">★★★★★</div>
        <p class="review-band-headline">「想像以上のクオリティで驚きました」</p>
        <p class="review-band-author">— 飲食店オーナー、大阪</p>
      </div>
      <div class="review-band-divider" aria-hidden="true"></div>
      <div class="review-band-stats">
        <div class="rbs-item">
          <span class="rbs-num">98%</span>
          <span class="rbs-label">のユーザーがロゴに満足</span>
        </div>
        <div class="rbs-item">
          <span class="rbs-num">500+</span>
          <span class="rbs-label">件の5つ星レビュー</span>
        </div>
        <div class="rbs-item">
          <span class="rbs-num">2分</span>
          <span class="rbs-label">平均生成時間</span>
        </div>
      </div>
      <div class="review-band-cta">
        <a href="/create" class="btn-primary">今すぐ試す →</a>
        <p class="review-cta-note">無料から・返金保証あり</p>
      </div>
    </div>
  </div>
</section>
```

```css
.works-review-band { padding: var(--section-py) var(--container-px); }

.review-band-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto;
  gap: 40px;
  align-items: center;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 40px 48px;
}

.review-stars { color: var(--color-accent); font-size: var(--text-xl); margin-bottom: 12px; }

.review-band-headline {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.review-band-author {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.review-band-divider {
  width: 1px;
  height: 80px;
  background: var(--color-border);
}

.review-band-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rbs-item { display: flex; align-items: baseline; gap: 8px; }

.rbs-num {
  font-family: var(--font-number);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--color-primary);
}

.rbs-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.review-band-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.review-cta-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .review-band-inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 32px;
  }
  .review-band-divider { display: none; }
  .review-band-stats { align-items: center; }
}
```

---

### 2.5 Section 5：業種別CTAグリッド

```html
<section class="industry-cta-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">業種別に見る</span>
      <h2>あなたの業種のロゴを確認する</h2>
    </div>
    <div class="industry-cta-grid animate-on-scroll">
      <a href="/industry/restaurant" class="industry-cta-card">
        <span class="icc-icon">🍜</span>
        <span class="icc-label">飲食店</span>
        <span class="icc-count">320件の事例</span>
      </a>
      <a href="/industry/beauty" class="industry-cta-card">
        <span class="icc-icon">💇</span>
        <span class="icc-label">美容・サロン</span>
        <span class="icc-count">280件の事例</span>
      </a>
      <a href="/industry/it" class="industry-cta-card">
        <span class="icc-icon">💻</span>
        <span class="icc-label">IT・Web</span>
        <span class="icc-count">210件の事例</span>
      </a>
      <a href="/industry/retail" class="industry-cta-card">
        <span class="icc-icon">🛍️</span>
        <span class="icc-label">小売・EC</span>
        <span class="icc-count">190件の事例</span>
      </a>
      <a href="/industry/medical" class="industry-cta-card">
        <span class="icc-icon">🏥</span>
        <span class="icc-label">医療・健康</span>
        <span class="icc-count">150件の事例</span>
      </a>
      <a href="/industry/legal" class="industry-cta-card">
        <span class="icc-icon">⚖️</span>
        <span class="icc-label">士業・法律</span>
        <span class="icc-count">120件の事例</span>
      </a>
      <a href="/works" class="industry-cta-card industry-cta-more">
        <span class="icc-icon">＋</span>
        <span class="icc-label">全業種を見る</span>
        <span class="icc-count">47業種対応</span>
      </a>
    </div>
  </div>
</section>
```

```css
.industry-cta-section { padding: var(--section-py) var(--container-px); background: var(--color-bg-section); }

.industry-cta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.industry-cta-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 16px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all 0.2s ease;
  text-align: center;
}

.industry-cta-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.icc-icon { font-size: 28px; }

.icc-label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.icc-count {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.industry-cta-more {
  background: var(--color-bg-section);
  border-style: dashed;
}

.industry-cta-more .icc-icon {
  font-size: 24px;
  color: var(--color-primary);
  font-weight: 700;
}

@media (max-width: 1024px) { .industry-cta-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .industry-cta-grid { grid-template-columns: repeat(2, 1fr); } }
```

---

### 2.6 Section 6：底部CTA

> `homepage-spec.md` の `final-cta-section` スタイルを流用。

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>あなたのロゴも、今日から。</h2>
        <p>まず無料で3案生成して、気に入ったものを購入するだけ。<br>
           クレジットカード不要・7日間全額返金保証付き。</p>
        <div class="final-cta-buttons">
          <a href="/create" class="btn-primary btn-primary-lg">無料でロゴを作る →</a>
          <a href="/pricing" class="btn-secondary-inverse">料金プランを見る</a>
        </div>
        <div class="final-trust">
          <span>✓ 著作権完全帰属</span>
          <span>✓ 7日間全額返金保証</span>
          <span>✓ 日本語フォント100種以上</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 3. ギャラリーデータ構造

### 3.1 TypeScript型定義

```typescript
// lib/works-data.ts

export type Industry =
  | 'restaurant' | 'beauty' | 'it' | 'retail'
  | 'medical' | 'legal' | 'education' | 'construction'
  | 'finance' | 'creative' | 'event' | 'other'

export type LogoStyle =
  | 'modern' | 'elegant' | 'warm' | 'professional' | 'playful'

export type Plan = 'free' | 'standard' | 'premium'

export type FontType = 'gothic' | 'mincho' | 'maru-gothic' | 'calligraphy'

export interface WorksItem {
  id: string
  brandName: string
  industry: Industry
  industryLabel: string
  style: LogoStyle
  styleLabel: string
  plan: Plan
  planLabel: string
  fontType: FontType
  colors: string[]          // HEX配列（最大3色）
  imageUrl: string          // WebP形式
  imageAlt: string          // SEOアクセシビリティ用
  width: number
  height: number
  createPageUrl: string     // 「このスタイルで作る」リンク先
}

// サンプルデータ（実際は120件以上）
export const WORKS_DATA: WorksItem[] = [
  {
    id: 'rest-001',
    brandName: '麺屋 煌',
    industry: 'restaurant',
    industryLabel: '飲食店',
    style: 'modern',
    styleLabel: 'モダン',
    plan: 'standard',
    planLabel: 'スタンダード',
    fontType: 'gothic',
    colors: ['#C41E3A', '#1A1A1A', '#F5F0E8'],
    imageUrl: '/images/works/rest-001.webp',
    imageAlt: '飲食店「麺屋 煌」のロゴ。角ゴシック体、朱赤と黒のモダンなデザイン',
    width: 800,
    height: 600,
    createPageUrl: '/create?industry=restaurant&style=modern'
  },
  {
    id: 'beauty-001',
    brandName: 'Lumière',
    industry: 'beauty',
    industryLabel: '美容・サロン',
    style: 'elegant',
    styleLabel: 'エレガント',
    plan: 'premium',
    planLabel: 'プレミアム',
    fontType: 'mincho',
    colors: ['#D4AF37', '#2C2C2C', '#FAF7F0'],
    imageUrl: '/images/works/beauty-001.webp',
    imageAlt: '美容サロン「Lumière」のロゴ。明朝体、ゴールドと黒のエレガントなデザイン',
    width: 800,
    height: 500,
    createPageUrl: '/create?industry=beauty&style=elegant'
  },
  // ... 以下、業種ごとに10件以上のサンプルを用意
]
```

### 3.2 フィルタリングロジック

```typescript
// hooks/useWorksFilter.ts

import { useState, useMemo, useCallback } from 'react'
import { WorksData, WorksItem, Industry, LogoStyle } from '@/lib/works-data'

interface FilterState {
  industry: Industry | 'all'
  style: LogoStyle | 'all'
}

export function useWorksFilter(data: WorksItem[]) {
  const [filter, setFilter] = useState<FilterState>({
    industry: 'all',
    style: 'all'
  })
  const [displayCount, setDisplayCount] = useState(36)

  const filtered = useMemo(() => {
    return data.filter(item => {
      const industryMatch = filter.industry === 'all' || item.industry === filter.industry
      const styleMatch = filter.style === 'all' || item.style === filter.style
      return industryMatch && styleMatch
    })
  }, [data, filter])

  const displayed = useMemo(
    () => filtered.slice(0, displayCount),
    [filtered, displayCount]
  )

  const loadMore = useCallback(() => {
    setDisplayCount(prev => Math.min(prev + 12, filtered.length))
  }, [filtered.length])

  const setIndustry = useCallback((v: Industry | 'all') => {
    setFilter(f => ({ ...f, industry: v }))
    setDisplayCount(36)
  }, [])

  const setStyle = useCallback((v: LogoStyle | 'all') => {
    setFilter(f => ({ ...f, style: v }))
    setDisplayCount(36)
  }, [])

  return {
    filter,
    filtered,
    displayed,
    hasMore: displayed.length < filtered.length,
    totalCount: filtered.length,
    loadMore,
    setIndustry,
    setStyle
  }
}
```

---

## 4. 交互与动画规范

### 4.1 フィルタリングアニメーション

```javascript
function applyFilter(industryValue, styleValue) {
  const cards = document.querySelectorAll('.works-card')
  let visibleCount = 0

  cards.forEach((card, index) => {
    const industryMatch = industryValue === 'all' || card.dataset.industry === industryValue
    const styleMatch = styleValue === 'all' || card.dataset.style === styleValue
    const shouldShow = industryMatch && styleMatch

    if (shouldShow) {
      card.hidden = false
      card.classList.remove('filter-enter')
      // staggered animation
      setTimeout(() => {
        card.classList.add('filter-enter')
      }, Math.min(visibleCount * 30, 300))
      visibleCount++
    } else {
      card.hidden = true
    }
  })

  // 件数更新
  document.getElementById('result-count').textContent = visibleCount
}
```

### 4.2 無限スクロール（Intersection Observer）

```javascript
const loadingEl = document.getElementById('gallery-loading')
const endEl = document.getElementById('gallery-end')
let page = 1
let isLoading = false
const ITEMS_PER_PAGE = 12

const sentinel = document.createElement('div')
sentinel.id = 'scroll-sentinel'
document.getElementById('works-grid').after(sentinel)

const scrollObserver = new IntersectionObserver(async (entries) => {
  if (entries[0].isIntersecting && !isLoading) {
    isLoading = true
    loadingEl.hidden = false

    // APIからデータ取得（実装例）
    const newItems = await fetchWorksData({ page: ++page, limit: ITEMS_PER_PAGE })

    if (newItems.length === 0) {
      // 全件表示完了
      scrollObserver.disconnect()
      loadingEl.hidden = true
      endEl.hidden = false
    } else {
      // カードを追加
      newItems.forEach(item => {
        const card = createWorksCard(item)
        document.getElementById('works-grid').appendChild(card)
      })
      loadingEl.hidden = true
      isLoading = false
    }
  }
}, { rootMargin: '200px' })

scrollObserver.observe(sentinel)
```

### 4.3 スクロール・アニメーション

```javascript
// .animate-on-scroll は homepage-spec.md のロジックを流用
// カードはCSS columns (Masonry) でレンダリング済みのため
// Intersection Observerによるフェードインはギャラリーセクション全体に適用
```

---

## 5. SEO規範

### 5.1 HTML head 設定

```html
<title>ロゴ生成事例・デザインギャラリー | 業種別AIロゴ12,000件以上【LogoAI.jp】</title>
<meta name="description" content="LogoAI.jpで実際に生成されたロゴ事例を業種・スタイル別に12,000件以上掲載。飲食店・美容・IT・士業など47業種対応。日本語フォント100種以上のAIロゴ作成サービス。">
<link rel="canonical" href="https://logoai.jp/works">

<meta property="og:title" content="ロゴ生成事例12,000件以上 | AIロゴ業種別ギャラリー【LogoAI.jp】">
<meta property="og:description" content="実際に生成されたロゴを業種・スタイルで絞り込んで確認。飲食店・美容・ITなど47業種対応。">
<meta property="og:image" content="https://logoai.jp/og-works.png">
<meta property="og:url" content="https://logoai.jp/works">
```

### 5.2 キーワード布局

| 位置 | キーワード |
|---|---|
| H1 | AIロゴ + 事例 / 実例 |
| セクション見出し | 業種名（飲食店・美容・ITなど） |
| 画像alt | 業種 + ブランド名 + フォント種 + カラー |
| 業種CTAカード | 「飲食店ロゴ事例」「美容サロンロゴ」等 |

### 5.3 画像ALTテキスト規則

```
形式：「{業種}「{ブランド名}」のロゴ。{フォント}、{カラー}の{スタイル}なデザイン」
例：「飲食店「麺屋 煌」のロゴ。角ゴシック体、朱赤と黒のモダンなデザイン」
例：「美容サロン「Lumière」のロゴ。明朝体、ゴールドと黒のエレガントなデザイン」
```

---

## 6. 结构化数据

### 6.1 BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://logoai.jp/" },
    { "@type": "ListItem", "position": 2, "name": "生成事例", "item": "https://logoai.jp/works" }
  ]
}
```

### 6.2 ItemList（ギャラリー代表12件）

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "AIロゴ生成事例",
  "description": "LogoAI.jpで生成された業種別ロゴデザイン事例",
  "numberOfItems": 12,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "飲食店ロゴ「麺屋 煌」",
      "image": "https://logoai.jp/images/works/rest-001.webp",
      "description": "飲食店向け。角ゴシック体、朱赤と黒のモダンデザイン。スタンダードプランで生成。"
    }
    // ...以下11件
  ]
}
```

---

## 7. GEO优化

### 7.1 GEO向けテキスト（ページ末尾）

```html
<p class="geo-definition" style="max-width:var(--container-max); margin:0 auto; padding:0 var(--container-px) 24px">
  LogoAI.jpのロゴ生成事例ページでは、飲食店・美容サロン・IT企業・士業・小売業など
  47業種にわたる12,000件以上のAIロゴ生成事例を掲載しています。
  全事例で日本語フォント100種以上から業種に最適なフォントを選択し、
  有料プランでは著作権がユーザーへ完全帰属します。
  業種・スタイル・カラーでフィルタリングして理想のロゴデザインを探せます。
</p>
```

---

## 8. 性能要求

| 指標 | 目標値 | 対策 |
|---|---|---|
| LCP | ≤ 2.5秒 | 上部6枚のみEager load、残りLazy load |
| INP | ≤ 200ms | フィルタリングはCSS display切替のみ（DOM削除なし） |
| CLS | ≤ 0.1 | 各画像に width/height 属性必須、aspect-ratioをCSSで固定 |
| 初期ロード画像数 | 36枚 | WebP、最大800px幅 |

```html
<!-- 最初の6枚はeager（LCP対策） -->
<img loading="eager" ...>
<!-- 7枚目以降はlazy -->
<img loading="lazy" ...>
```

---

## 9. 组件文件结构

```
app/works/page.tsx

components/works/
├── WorksHero.tsx
├── WorksFilterBar.tsx        # Sticky フィルターバー
├── WorksGallery.tsx          # Masonry グリッド
│   └── WorksCard.tsx         # 個別カード + hover overlay
├── WorksReviewBand.tsx       # レビュー帯
├── IndustryCTAGrid.tsx       # 業種別CTAグリッド
└── GalleryLoadingState.tsx   # ローディング / 終了表示

hooks/
├── useWorksFilter.ts         # フィルター状態管理
└── useInfiniteScroll.ts      # 無限スクロール

lib/
└── works-data.ts             # 全ギャラリーデータ（120件以上）
    # type WorksItem, WORKS_DATA定数
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/how-it-works 生成フローページ仕様書*
