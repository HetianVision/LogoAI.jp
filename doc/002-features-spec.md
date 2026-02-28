# 機能ページ開発規格書 `/features`

> **文档用途**：交付AI开发者直接实现。所有内容、交互、SEO、样式规范均在本文档完整定义。
> **依赖文档**：本文档继承 `homepage-spec.md` 中定义的全部设计系统（CSS变量、字体、按钮规范）。
> **页面类型**：功能详解页（Feature Deep Dive Page）

---

## 目录

1. [页面整体规范](#1-页面整体规范)
2. [页面区块详细规范](#2-页面区块详细规范)
3. [交互与动画规范](#3-交互与动画规范)
4. [SEO规范](#4-seo规范)
5. [结构化数据](#5-结构化数据)
6. [GEO优化规范](#6-geo优化规范)
7. [性能要求](#7-性能要求)
8. [组件文件结构](#8-组件文件结构)

---

## 1. 页面整体规范

### 1.1 页面基本信息

| 项目 | 内容 |
|---|---|
| 路由 | `/features` |
| 页面类型 | 功能详解页 |
| 主要目标 | 让已有兴趣的用户深入了解产品功能，推动升级到付费计划 |
| 次要目标 | 通过具体功能说明消除技术顾虑，建立专业可信形象 |
| 主要入口 | Navbar「機能」链接 / 首页价值卡片「詳しく見る」 |
| 主要出口 | 点击 CTA → `/create` 或 `/pricing` |

### 1.2 页面整体布局顺序

```
┌─────────────────────────────┐
│  Navbar（继承首页）          │
├─────────────────────────────┤
│  Section 1: Page Hero       │  ← 页面标题 + 功能导航锚点
├─────────────────────────────┤
│  Section 2: 功能概览横条     │  ← 6个功能快速跳转
├─────────────────────────────┤
│  Section 3: 日本語フォント   │  ← 功能1深度展示
├─────────────────────────────┤
│  Section 4: AI自動生成       │  ← 功能2深度展示
├─────────────────────────────┤
│  Section 5: 著作権・証明書   │  ← 功能3深度展示（最重要）
├─────────────────────────────┤
│  Section 6: 商標類似チェック │  ← 功能4深度展示
├─────────────────────────────┤
│  Section 7: ブランドガイドライン │ ← 功能5深度展示
├─────────────────────────────┤
│  Section 8: ファイル形式     │  ← 功能6深度展示
├─────────────────────────────┤
│  Section 9: 名刺レイアウト   │  ← 功能7深度展示
├─────────────────────────────┤
│  Section 10: 機能比較表      │  ← 与竞品功能横向对比
├─────────────────────────────┤
│  Section 11: CTA             │
├─────────────────────────────┤
│  Footer（继承首页）          │
└─────────────────────────────┘
```

---

## 2. 页面区块详细规范

---

### 2.1 Section 1：Page Hero（页面标题区）

#### 布局

```
┌─────────────────────────────────────────────┐
│  [面包屑导航]                                │
│                                             │
│  [eyebrow标签]                              │
│  [H1主标题]                                 │
│  [副标题说明]                               │
│  [两个CTA按钮]                              │
│                                             │
│  [背景：细线网格 + 右侧大光晕]              │
└─────────────────────────────────────────────┘
```

#### HTML结构

```html
<section class="page-hero features-hero">
  <!-- 背景装饰 -->
  <div class="page-hero-bg" aria-hidden="true">
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>
  </div>

  <div class="container">
    <!-- 面包屑 -->
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">機能一覧</li>
      </ol>
    </nav>

    <div class="page-hero-content">
      <span class="section-eyebrow">すべての機能</span>
      <h1>日本語ロゴのための、<br>すべてが揃っている</h1>
      <p class="page-hero-desc">
        フォント・著作権・商標・ブランドガイドライン・ファイル形式。
        ロゴ作成に必要なものを、ひとつのサービスで完結。
        海外ツールでは実現できない、日本市場特化の機能群をご覧ください。
      </p>
      <div class="page-hero-cta">
        <a href="/create" class="btn-primary btn-primary-lg">無料でロゴを作る</a>
        <a href="/pricing" class="btn-secondary">料金プランを見る</a>
      </div>
    </div>
  </div>
</section>
```

#### CSS

```css
.page-hero {
  padding: calc(64px + 80px) var(--container-px) 80px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.page-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(26,58,42,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26,58,42,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}

.bg-glow {
  position: absolute;
  right: -200px;
  top: 50%;
  transform: translateY(-50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(201,150,58,0.08) 0%, transparent 65%);
}

.page-hero-content {
  max-width: 720px;
  position: relative;
  z-index: 1;
}

.page-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 16px 0 24px;
}

.page-hero-desc {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 40px;
  max-width: 600px;
}

.page-hero-cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

/* 面包屑 */
.breadcrumb ol {
  display: flex;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
.breadcrumb ol li + li::before {
  content: '/';
  margin-right: 8px;
  opacity: 0.4;
}
.breadcrumb a {
  color: var(--color-text-muted);
  text-decoration: none;
}
.breadcrumb a:hover {
  color: var(--color-primary);
}
.breadcrumb [aria-current="page"] {
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .page-hero-content h1 { font-size: var(--text-4xl); }
}
```

---

### 2.2 Section 2：功能概览横条（Quick Nav）

#### 用途
让用户快速看到6个核心功能，点击后平滑滚动到对应区块。同时作为视觉锚点，传达功能的丰富度。

#### HTML结构

```html
<section class="features-nav" aria-label="機能一覧クイックナビゲーション">
  <div class="container">
    <div class="features-nav-grid">

      <a href="#japanese-fonts" class="feature-nav-item">
        <div class="feature-nav-icon">
          <!-- SVG: あ字 / 毛筆風 -->
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <text x="4" y="22" font-size="20" fill="currentColor" font-family="serif">あ</text>
          </svg>
        </div>
        <div class="feature-nav-text">
          <span class="feature-nav-title">日本語フォント</span>
          <span class="feature-nav-sub">100種類以上</span>
        </div>
        <svg class="feature-nav-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>

      <a href="#ai-generation" class="feature-nav-item">
        <div class="feature-nav-icon">
          <!-- SVG: AI/スパークル -->
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M14 4l2.5 7.5L24 14l-7.5 2.5L14 24l-2.5-7.5L4 14l7.5-2.5L14 4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="feature-nav-text">
          <span class="feature-nav-title">AI自動生成</span>
          <span class="feature-nav-sub">3案同時提案</span>
        </div>
        <svg class="feature-nav-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>

      <a href="#copyright" class="feature-nav-item">
        <div class="feature-nav-icon">
          <!-- SVG: 証書/印章 -->
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="5" y="4" width="18" height="22" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M9 10h10M9 14h10M9 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="feature-nav-text">
          <span class="feature-nav-title">著作権帰属</span>
          <span class="feature-nav-sub">証明書PDF発行</span>
        </div>
        <svg class="feature-nav-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>

      <a href="#trademark" class="feature-nav-item">
        <div class="feature-nav-icon">
          <!-- SVG: 盾牌 -->
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M14 4l9 4v7c0 5-4 8-9 10-5-2-9-5-9-10V8l9-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M10 14l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="feature-nav-text">
          <span class="feature-nav-title">商標類似チェック</span>
          <span class="feature-nav-sub">J-PlatPat連携</span>
        </div>
        <svg class="feature-nav-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>

      <a href="#brand-guideline" class="feature-nav-item">
        <div class="feature-nav-icon">
          <!-- SVG: ブック/ガイドライン -->
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M6 6h10a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M18 6h2a2 2 0 012 2v14a2 2 0 01-2 2h-2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 11h8M8 15h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="feature-nav-text">
          <span class="feature-nav-title">ブランドガイドライン</span>
          <span class="feature-nav-sub">PDF自動生成</span>
        </div>
        <svg class="feature-nav-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>

      <a href="#file-formats" class="feature-nav-item">
        <div class="feature-nav-icon">
          <!-- SVG: ダウンロード -->
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M14 4v14M9 13l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 20v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="feature-nav-text">
          <span class="feature-nav-title">全形式ダウンロード</span>
          <span class="feature-nav-sub">SVG・AI・EPS対応</span>
        </div>
        <svg class="feature-nav-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>

    </div>
  </div>
</section>
```

#### CSS

```css
.features-nav {
  background: var(--color-bg-section);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 0 var(--container-px);
  /* sticky: 滚动时吸附在navbar下方 */
  position: sticky;
  top: 64px;
  z-index: 90;
}

.features-nav-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  max-width: var(--container-max);
  margin: 0 auto;
}

.feature-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 12px;
  text-decoration: none;
  color: var(--color-text-secondary);
  border-right: 1px solid var(--color-border);
  transition: all 0.2s ease;
  position: relative;
}

.feature-nav-item:last-child {
  border-right: none;
}

.feature-nav-item::after {
  /* 激活指示器 */
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

.feature-nav-item:hover,
.feature-nav-item.is-active {
  background: rgba(201,150,58,0.04);
  color: var(--color-primary);
}

.feature-nav-item:hover::after,
.feature-nav-item.is-active::after {
  transform: scaleX(1);
}

.feature-nav-icon {
  width: 32px;
  height: 32px;
  background: rgba(201,150,58,0.1);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-accent);
}

.feature-nav-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.feature-nav-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.feature-nav-sub {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.feature-nav-arrow {
  margin-left: auto;
  flex-shrink: 0;
  color: var(--color-text-muted);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.feature-nav-item:hover .feature-nav-arrow {
  opacity: 1;
}

/* タブレット以下：横スクロール */
@media (max-width: 1024px) {
  .features-nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .features-nav-grid {
    grid-template-columns: repeat(6, 160px);
    width: max-content;
  }
}

@media (max-width: 768px) {
  .features-nav {
    position: static; /* 移動端不sticky */
  }
  .features-nav-grid {
    grid-template-columns: repeat(6, 140px);
  }
  .feature-nav-title { font-size: 0.7rem; }
}
```

#### JavaScript：滚动监听高亮当前区块

```javascript
// 监听各功能区块的滚动位置，高亮对应的nav item
const featureSections = document.querySelectorAll('[data-feature-section]')
const navItems = document.querySelectorAll('.feature-nav-item')

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 移除所有active
      navItems.forEach(item => item.classList.remove('is-active'))
      // 激活对应的nav item
      const id = entry.target.id
      const activeNav = document.querySelector(`.feature-nav-item[href="#${id}"]`)
      if (activeNav) activeNav.classList.add('is-active')
    }
  })
}, {
  rootMargin: '-20% 0px -70% 0px', // 元素中心进入视口时触发
  threshold: 0
})

featureSections.forEach(section => sectionObserver.observe(section))
```

---

### 2.3 Section 3：功能1 — 日本語フォントライブラリ

#### 布局（左文字 + 右交互展示，奇数区块左文右图）

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  左侧：文案 + 特点列表       右侧：字体分类交互展示   │
│  ─────────────────           ─────────────────────   │
│  [eyebrow]                   [字体分类Tab]           │
│  [H2标题]                    [字体卡片网格]           │
│  [说明段落]                  [字体实际渲染展示]       │
│  [功能点列表]                                         │
│  [所属プラン标签]                                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

#### HTML结构

```html
<section
  id="japanese-fonts"
  data-feature-section
  class="feature-detail-section"
>
  <div class="container">
    <div class="feature-detail-grid">

      <!-- 左侧文案 -->
      <div class="feature-detail-content animate-on-scroll">
        <span class="feature-number">01</span>
        <span class="section-eyebrow">日本語フォント</span>
        <h2>100種類以上の日本語フォント。<br>業種に合わせてAIが提案。</h2>
        <p class="feature-desc">
          海外のロゴツールが苦手とする日本語フォントに、徹底的に向き合いました。
          明朝体・ゴシック体・丸ゴシック・書道風まで、全て商用利用可能なフォントのみを厳選。
          業種を入力するだけで、AIがそのブランドに最適なフォントを自動推薦します。
        </p>

        <ul class="feature-points">
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>全フォントが商用利用可能</strong>
              <p>収録している全フォントは商用利用ライセンスを取得済み。安心してロゴに使用できます。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>業種別おすすめフォント自動提案</strong>
              <p>飲食店・美容・法律・IT……業種に応じて審美観に合った候補を絞り込んで提案。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>和文×欧文の最適ペアリング</strong>
              <p>ブランド名に英語が含まれる場合、和文フォントとのベストペアを自動選定します。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>字間・行間・サイズの細部調整</strong>
              <p>生成後に字間（トラッキング）・行間・ウェイトを自由にカスタマイズできます。</p>
            </div>
          </li>
        </ul>

        <!-- 所属プラン -->
        <div class="feature-plan-badge-group">
          <span class="plan-available-label">利用可能プラン：</span>
          <span class="plan-badge plan-free">無料（10種）</span>
          <span class="plan-badge plan-standard">スタンダード（100種以上）</span>
          <span class="plan-badge plan-premium">プレミアム（100種以上）</span>
        </div>
      </div>

      <!-- 右侧交互展示 -->
      <div class="feature-detail-visual animate-on-scroll" style="transition-delay: 0.15s">
        <div class="font-explorer">
          <!-- 字体类别Tab -->
          <div class="font-category-tabs" role="tablist" aria-label="フォントカテゴリ">
            <button class="font-tab active" role="tab" data-category="gothic"
                    aria-selected="true" aria-controls="font-panel-gothic">
              ゴシック体
            </button>
            <button class="font-tab" role="tab" data-category="mincho"
                    aria-selected="false" aria-controls="font-panel-mincho">
              明朝体
            </button>
            <button class="font-tab" role="tab" data-category="maru"
                    aria-selected="false" aria-controls="font-panel-maru">
              丸ゴシック
            </button>
            <button class="font-tab" role="tab" data-category="fude"
                    aria-selected="false" aria-controls="font-panel-fude">
              書道・手書き
            </button>
          </div>

          <!-- 字体展示面板 -->
          <!-- ゴシック体 -->
          <div id="font-panel-gothic" role="tabpanel" class="font-panel active">
            <div class="font-cards-grid">
              <div class="font-card">
                <div class="font-sample" style="font-family:'Noto Sans JP',sans-serif; font-weight:700">
                  田中製菓
                </div>
                <div class="font-info">
                  <span class="font-name">Hiragino角ゴシック W6</span>
                  <span class="font-impression">モダン・明瞭・企業感</span>
                </div>
                <div class="font-use-tag">IT・製造・企業</div>
              </div>
              <div class="font-card">
                <div class="font-sample" style="font-family:'Noto Sans JP',sans-serif; font-weight:400">
                  田中製菓
                </div>
                <div class="font-info">
                  <span class="font-name">游ゴシック Medium</span>
                  <span class="font-impression">洗練・清潔・中立</span>
                </div>
                <div class="font-use-tag">医療・公共・サービス</div>
              </div>
              <div class="font-card">
                <div class="font-sample" style="font-family:'Noto Sans JP',sans-serif; font-weight:900; letter-spacing:-0.02em">
                  田中製菓
                </div>
                <div class="font-info">
                  <span class="font-name">新ゴ Heavy</span>
                  <span class="font-impression">力強い・インパクト</span>
                </div>
                <div class="font-use-tag">スポーツ・エンタメ</div>
              </div>
              <div class="font-card">
                <div class="font-sample" style="font-family:'Noto Sans JP',sans-serif; font-weight:300; letter-spacing:0.08em">
                  田中製菓
                </div>
                <div class="font-info">
                  <span class="font-name">ヒラギノ角ゴ W1</span>
                  <span class="font-impression">繊細・高級・余白感</span>
                </div>
                <div class="font-use-tag">ラグジュアリー・美容</div>
              </div>
            </div>
          </div>

          <!-- 明朝体 -->
          <div id="font-panel-mincho" role="tabpanel" class="font-panel">
            <div class="font-cards-grid">
              <div class="font-card">
                <div class="font-sample" style="font-family:'Noto Serif JP',serif; font-weight:700">
                  田中製菓
                </div>
                <div class="font-info">
                  <span class="font-name">游明朝 Bold</span>
                  <span class="font-impression">知性・伝統・格調</span>
                </div>
                <div class="font-use-tag">出版・法律・老舗</div>
              </div>
              <div class="font-card">
                <div class="font-sample" style="font-family:'Noto Serif JP',serif; font-weight:400; letter-spacing:0.05em">
                  田中製菓
                </div>
                <div class="font-info">
                  <span class="font-name">筑紫明朝 Regular</span>
                  <span class="font-impression">上品・柔らか・文学的</span>
                </div>
                <div class="font-use-tag">和菓子・美容・宿</div>
              </div>
              <div class="font-card">
                <div class="font-sample" style="font-family:'Noto Serif JP',serif; font-weight:600; letter-spacing:0.1em">
                  田中製菓
                </div>
                <div class="font-info">
                  <span class="font-name">ヒラギノ明朝 W6</span>
                  <span class="font-impression">風格・信頼・日本的</span>
                </div>
                <div class="font-use-tag">行政・医療・教育</div>
              </div>
              <div class="font-card">
                <div class="font-sample" style="font-family:'Noto Serif JP',serif; font-weight:300; letter-spacing:0.15em">
                  田中製菓
                </div>
                <div class="font-info">
                  <span class="font-name">秀英明朝 Light</span>
                  <span class="font-impression">繊細・高雅・静謐</span>
                </div>
                <div class="font-use-tag">旅館・アート・ブランド</div>
              </div>
            </div>
          </div>

          <!-- 丸ゴシック（内容省略，结构与上相同） -->
          <div id="font-panel-maru" role="tabpanel" class="font-panel">
            <div class="font-cards-grid">
              <!-- 4张字体卡片，字体印象：親しみ・やさしい・暖かい -->
              <div class="font-card">
                <div class="font-sample" style="font-family:'Noto Sans JP',sans-serif; border-radius: 2px">
                  田中製菓
                </div>
                <div class="font-info">
                  <span class="font-name">A1ゴシック Regular</span>
                  <span class="font-impression">親しみ・かわいらしさ</span>
                </div>
                <div class="font-use-tag">保育・食品・福祉</div>
              </div>
              <!-- ...以此类推3张 -->
            </div>
          </div>

          <!-- 書道・手書き（内容省略） -->
          <div id="font-panel-fude" role="tabpanel" class="font-panel">
            <div class="font-cards-grid">
              <!-- 4张字体卡片，风格：和風・温もり・個性 -->
            </div>
          </div>

          <!-- 底部互动：输入自己的品牌名实时预览 -->
          <div class="font-live-preview">
            <div class="preview-input-wrap">
              <input
                type="text"
                id="font-preview-input"
                class="preview-input"
                placeholder="ブランド名を入力してプレビュー"
                maxlength="20"
                aria-label="フォントプレビュー用ブランド名入力"
              >
            </div>
            <p class="preview-hint">※ 上のフォントカードがリアルタイムで更新されます</p>
          </div>

        </div><!-- /font-explorer -->
      </div>

    </div>
  </div>
</section>
```

#### CSS

```css
/* 功能区块通用布局 */
.feature-detail-section {
  padding: var(--section-py) var(--container-px);
  scroll-margin-top: calc(64px + 57px); /* navbar + sticky nav高度 */
}

/* 奇数区块：左文右图 */
.feature-detail-section:nth-child(odd) .feature-detail-grid {
  grid-template-columns: 1fr 1fr;
}
/* 偶数区块：左图右文 */
.feature-detail-section:nth-child(even) .feature-detail-grid {
  grid-template-columns: 1fr 1fr;
  direction: rtl; /* 内容方向反转 */
}
.feature-detail-section:nth-child(even) .feature-detail-grid > * {
  direction: ltr;
}

.feature-detail-grid {
  display: grid;
  gap: 80px;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
}

/* 功能编号 */
.feature-number {
  font-family: var(--font-number);
  font-size: var(--text-5xl);
  font-weight: 300;
  color: rgba(201,150,58,0.15);
  line-height: 1;
  display: block;
  margin-bottom: -8px;
}

.feature-detail-content h2 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
  margin: 12px 0 20px;
  letter-spacing: -0.01em;
}

.feature-desc {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

/* 功能点列表 */
.feature-points {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-points li {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.feature-point-icon {
  width: 24px;
  height: 24px;
  background: rgba(45,122,79,0.1);
  color: var(--color-success);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-points strong {
  display: block;
  font-size: var(--text-base);
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.feature-points p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* プラン表示 */
.feature-plan-badge-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.plan-available-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.plan-badge {
  font-size: var(--text-xs);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-weight: 500;
}

.plan-free {
  background: rgba(154,154,154,0.1);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.plan-standard {
  background: rgba(26,58,42,0.08);
  color: var(--color-primary);
  border: 1px solid rgba(26,58,42,0.2);
}

.plan-premium {
  background: rgba(201,150,58,0.1);
  color: var(--color-accent);
  border: 1px solid rgba(201,150,58,0.3);
}

/* 字体探索器 */
.font-explorer {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 28px;
  box-shadow: var(--shadow-lg);
}

.font-category-tabs {
  display: flex;
  gap: 4px;
  background: var(--color-bg-section);
  padding: 4px;
  border-radius: var(--radius-lg);
  margin-bottom: 20px;
}

.font-tab {
  flex: 1;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: calc(var(--radius-lg) - 2px);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.font-tab.active {
  background: white;
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  font-weight: 700;
}

.font-panel {
  display: none;
}
.font-panel.active {
  display: block;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.font-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.font-card {
  background: var(--color-bg-base);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.font-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
}

.font-sample {
  font-size: 1.2rem;
  color: var(--color-text-primary);
  margin-bottom: 10px;
  line-height: 1.4;
  min-height: 36px;
  display: flex;
  align-items: center;
}

.font-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 8px;
}

.font-name {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.font-impression {
  font-size: 0.6rem;
  color: var(--color-text-muted);
}

.font-use-tag {
  font-size: 0.6rem;
  background: rgba(201,150,58,0.08);
  color: var(--color-accent);
  padding: 3px 8px;
  border-radius: var(--radius-full);
  display: inline-block;
  border: 1px solid rgba(201,150,58,0.2);
}

/* ライブプレビュー */
.font-live-preview {
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
}

.preview-input-wrap {
  position: relative;
}

.preview-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  background: var(--color-bg-base);
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.preview-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(201,150,58,0.1);
}

.preview-hint {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 8px;
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .feature-detail-grid {
    grid-template-columns: 1fr !important;
    direction: ltr !important;
    gap: 48px;
  }
}
```

#### JavaScript：字体Tab切换 + 实时预览

```javascript
// 字体Tab切换
document.querySelectorAll('.font-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category

    // 更新Tab状态
    document.querySelectorAll('.font-tab').forEach(t => {
      t.classList.remove('active')
      t.setAttribute('aria-selected', 'false')
    })
    tab.classList.add('active')
    tab.setAttribute('aria-selected', 'true')

    // 更新Panel显示
    document.querySelectorAll('.font-panel').forEach(panel => panel.classList.remove('active'))
    document.getElementById(`font-panel-${category}`).classList.add('active')
  })
})

// 实时字体预览
const previewInput = document.getElementById('font-preview-input')
previewInput.addEventListener('input', (e) => {
  const value = e.target.value.trim()
  if (!value) return
  // 更新所有font-sample的文字为用户输入
  document.querySelectorAll('.font-sample').forEach(sample => {
    sample.textContent = value
  })
})
```

---

### 2.4 Section 4：功能2 — AI自動デザイン生成

#### 布局（偶数区块：左图右文）

```
┌──────────────────────────────────────────────────────┐
│  左侧：AI生成流程动画演示     右侧：文案 + 功能点     │
│  ─────────────────────         ─────────────────────  │
│  [三阶段动画组件]              [eyebrow + H2]         │
│  ① 输入 → ② 生成中 → ③ 3案  [说明 + 功能点列表]    │
│                                [プラン标签]           │
└──────────────────────────────────────────────────────┘
```

#### HTML结构

```html
<section
  id="ai-generation"
  data-feature-section
  class="feature-detail-section"
  style="background: var(--color-bg-section)"
>
  <div class="container">
    <div class="feature-detail-grid">

      <!-- 左侧演示动画 -->
      <div class="feature-detail-visual animate-on-scroll">
        <div class="ai-gen-demo">

          <!-- 阶段1：输入界面 -->
          <div class="gen-stage" id="gen-stage-1">
            <div class="gen-stage-label">ステップ① 入力</div>
            <div class="gen-input-form">
              <div class="gen-form-row">
                <label>ブランド名</label>
                <div class="gen-input-value">
                  <span class="typing-text" data-text="Tanaka Design Studio">|</span>
                </div>
              </div>
              <div class="gen-form-row">
                <label>業種</label>
                <div class="gen-select-value">デザイン・クリエイティブ ✓</div>
              </div>
              <div class="gen-form-row">
                <label>イメージキーワード</label>
                <div class="gen-tags">
                  <span class="gen-tag active">プロフェッショナル</span>
                  <span class="gen-tag active">モダン</span>
                  <span class="gen-tag">クリエイティブ</span>
                </div>
              </div>
              <div class="gen-form-row">
                <label>カラー傾向</label>
                <div class="gen-colors">
                  <span class="color-dot" style="background:#1A3A2A" data-active="true"></span>
                  <span class="color-dot" style="background:#2C2C2C"></span>
                  <span class="color-dot" style="background:#C9963A" data-active="true"></span>
                </div>
              </div>
            </div>
            <button class="gen-submit-btn">ロゴを生成する →</button>
          </div>

          <!-- 阶段2：生成中 -->
          <div class="gen-stage" id="gen-stage-2" style="display:none">
            <div class="gen-stage-label">ステップ② AI生成中</div>
            <div class="gen-loading">
              <div class="gen-loading-visual">
                <!-- 旋转圆环动画 -->
                <div class="gen-spinner">
                  <svg viewBox="0 0 60 60" width="60" height="60">
                    <circle cx="30" cy="30" r="26" stroke="var(--color-border)" stroke-width="3" fill="none"/>
                    <circle
                      cx="30" cy="30" r="26"
                      stroke="var(--color-accent)"
                      stroke-width="3"
                      fill="none"
                      stroke-dasharray="163.36"
                      stroke-dashoffset="163.36"
                      class="spinner-progress"
                      transform="rotate(-90 30 30)"
                    />
                  </svg>
                  <span class="spinner-percent">0%</span>
                </div>
              </div>
              <div class="gen-loading-steps">
                <div class="gen-step completed">✓ フォント解析中...</div>
                <div class="gen-step active">⟳ デザイン構成を計算中...</div>
                <div class="gen-step">○ 配色を最適化中...</div>
                <div class="gen-step">○ 3案を生成中...</div>
              </div>
            </div>
          </div>

          <!-- 阶段3：结果 -->
          <div class="gen-stage" id="gen-stage-3" style="display:none">
            <div class="gen-stage-label">ステップ③ 3案を提案</div>
            <div class="gen-results">
              <div class="gen-result-card selected">
                <div class="result-logo-area">
                  <!-- 样本Logo SVG，设计风格：モダン角黑体 -->
                  <svg viewBox="0 0 200 80" width="180" height="72">
                    <text x="10" y="50" font-family="sans-serif" font-weight="700"
                          font-size="28" fill="#1A3A2A" letter-spacing="-1">
                      TANAKA
                    </text>
                    <text x="10" y="68" font-family="sans-serif" font-weight="300"
                          font-size="11" fill="#5A5A5A" letter-spacing="4">
                      DESIGN STUDIO
                    </text>
                  </svg>
                </div>
                <div class="result-meta">
                  <span class="result-font">新ゴ × Futura</span>
                  <span class="result-style-tag">モダン</span>
                </div>
                <div class="selected-badge">選択中</div>
              </div>

              <div class="gen-result-card">
                <div class="result-logo-area">
                  <svg viewBox="0 0 200 80" width="180" height="72">
                    <text x="10" y="52" font-family="serif" font-weight="600"
                          font-size="26" fill="#2C2C2C" letter-spacing="1">
                      Tanaka
                    </text>
                    <text x="10" y="68" font-family="serif" font-weight="300"
                          font-size="10" fill="#9A9A9A" letter-spacing="5">
                      Design Studio
                    </text>
                  </svg>
                </div>
                <div class="result-meta">
                  <span class="result-font">游明朝 × Garamond</span>
                  <span class="result-style-tag">エレガント</span>
                </div>
              </div>

              <div class="gen-result-card">
                <div class="result-logo-area">
                  <svg viewBox="0 0 200 80" width="180" height="72">
                    <rect x="8" y="18" width="4" height="44" fill="#C9963A" rx="2"/>
                    <text x="20" y="42" font-family="sans-serif" font-weight="700"
                          font-size="20" fill="#1A1A1A" letter-spacing="0">
                      TANAKA
                    </text>
                    <text x="20" y="58" font-family="sans-serif" font-weight="300"
                          font-size="9" fill="#5A5A5A" letter-spacing="3">
                      DESIGN STUDIO
                    </text>
                  </svg>
                </div>
                <div class="result-meta">
                  <span class="result-font">ヒラギノ角ゴ</span>
                  <span class="result-style-tag">プロフェッショナル</span>
                </div>
              </div>
            </div><!-- /gen-results -->
          </div>

          <!-- 底部播放控制 -->
          <div class="gen-demo-controls">
            <button class="gen-replay-btn" aria-label="デモを再生">
              ▶ デモを再生
            </button>
            <span class="gen-time-label">平均生成時間：約2分</span>
          </div>

        </div><!-- /ai-gen-demo -->
      </div>

      <!-- 右侧文案 -->
      <div class="feature-detail-content animate-on-scroll" style="transition-delay:0.15s">
        <span class="feature-number">02</span>
        <span class="section-eyebrow">AI自動生成</span>
        <h2>業種・キーワードから、<br>AIが複数案を即座に提案。</h2>
        <p class="feature-desc">
          ブランド名と業種を入力するだけで、AIが審美観・フォント・配色・レイアウトを総合的に判断し、
          複数のデザイン案を同時生成します。デザインの知識がなくても、
          プロのデザイナーが考えるような本格的なロゴが得られます。
        </p>

        <ul class="feature-points">
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>3案同時生成・並べて比較</strong>
              <p>スタイルの異なる3案を同時提案。並べて見比べてから最適な案を選択できます。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>イメージキーワードで方向性を指定</strong>
              <p>「プロフェッショナル」「温かみ」「スタイリッシュ」などのキーワードでデザインの方向性を指定できます。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>生成後のカスタマイズが自由</strong>
              <p>生成後にフォント・色・サイズ・字間を自由に調整可能。AIの提案を叩き台にして仕上げられます。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>気に入らなければ何度でも再生成</strong>
              <p>有料プランはロゴ生成が無制限。完全に気に入るまで何度でも試せます。</p>
            </div>
          </li>
        </ul>

        <div class="feature-plan-badge-group">
          <span class="plan-available-label">利用可能プラン：</span>
          <span class="plan-badge plan-free">無料（3案まで）</span>
          <span class="plan-badge plan-standard">スタンダード（無制限）</span>
          <span class="plan-badge plan-premium">プレミアム（無制限）</span>
        </div>
      </div>

    </div>
  </div>
</section>
```

#### CSS（AI生成演示组件专用）

```css
.ai-gen-demo {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 28px;
  box-shadow: var(--shadow-lg);
}

.gen-stage-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

/* 输入表单模拟 */
.gen-input-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.gen-form-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.gen-form-row label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  width: 100px;
  flex-shrink: 0;
  padding-top: 4px;
}

.gen-input-value,
.gen-select-value {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  background: var(--color-bg-base);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 6px 10px;
  flex: 1;
  font-weight: 500;
}

.gen-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.gen-tag {
  font-size: 0.65rem;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  cursor: pointer;
}

.gen-tag.active {
  background: rgba(26,58,42,0.06);
  border-color: var(--color-primary);
  color: var(--color-primary);
  font-weight: 600;
}

.gen-colors {
  display: flex;
  gap: 8px;
  align-items: center;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.color-dot[data-active="true"] {
  border-color: var(--color-accent);
  transform: scale(1.15);
}

.gen-submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}

.gen-submit-btn:hover {
  background: var(--color-primary-light);
}

/* 生成中状态 */
.gen-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px 0;
}

.gen-spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-progress {
  transition: stroke-dashoffset 0.1s linear;
}

.spinner-percent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-number);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent);
}

.gen-loading-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.gen-step {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding: 6px 0;
  border-bottom: 1px solid var(--color-border);
}

.gen-step.completed {
  color: var(--color-success);
}

.gen-step.active {
  color: var(--color-accent);
  font-weight: 600;
}

/* 结果展示 */
.gen-results {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gen-result-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.gen-result-card.selected {
  border-color: var(--color-accent);
  background: rgba(201,150,58,0.04);
}

.gen-result-card:hover:not(.selected) {
  border-color: var(--color-primary);
}

.result-logo-area {
  background: var(--color-bg-base);
  border-radius: var(--radius-md);
  padding: 8px;
  flex-shrink: 0;
}

.result-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.result-font {
  font-size: 0.65rem;
  color: var(--color-text-muted);
}

.result-style-tag {
  font-size: 0.65rem;
  background: var(--color-bg-section);
  color: var(--color-text-secondary);
  padding: 3px 8px;
  border-radius: var(--radius-full);
  display: inline-block;
  border: 1px solid var(--color-border);
}

.selected-badge {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.65rem;
  background: var(--color-accent);
  color: white;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-weight: 700;
}

/* 控制按钮 */
.gen-demo-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.gen-replay-btn {
  font-size: var(--text-xs);
  color: var(--color-primary);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 6px 16px;
  cursor: pointer;
  font-family: var(--font-body);
  font-weight: 500;
  transition: all 0.2s ease;
}

.gen-replay-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.gen-time-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
```

#### JavaScript：演示动画逻辑

```javascript
function runGenDemo() {
  const stage1 = document.getElementById('gen-stage-1')
  const stage2 = document.getElementById('gen-stage-2')
  const stage3 = document.getElementById('gen-stage-3')

  // Phase 1: 显示输入界面（带打字动画）
  stage1.style.display = 'block'
  stage2.style.display = 'none'
  stage3.style.display = 'none'

  // 打字动画
  const typingEl = document.querySelector('.typing-text')
  const text = typingEl.dataset.text
  let i = 0
  typingEl.textContent = ''
  const typeInterval = setInterval(() => {
    typingEl.textContent = text.slice(0, ++i) + '|'
    if (i >= text.length) clearInterval(typeInterval)
  }, 80)

  // Phase 2: 1.5秒后切换到生成中
  setTimeout(() => {
    stage1.style.display = 'none'
    stage2.style.display = 'block'

    // 进度条动画
    let progress = 0
    const progressCircle = document.querySelector('.spinner-progress')
    const percentEl = document.querySelector('.spinner-percent')
    const steps = document.querySelectorAll('.gen-step')
    const circumference = 163.36 // 2 * π * 26

    const progressInterval = setInterval(() => {
      progress += 2
      const offset = circumference - (circumference * progress / 100)
      progressCircle.style.strokeDashoffset = offset
      percentEl.textContent = progress + '%'

      // 步骤状态更新
      if (progress >= 25) { steps[0].className = 'gen-step completed'; steps[1].className = 'gen-step active' }
      if (progress >= 55) { steps[1].className = 'gen-step completed'; steps[2].className = 'gen-step active' }
      if (progress >= 80) { steps[2].className = 'gen-step completed'; steps[3].className = 'gen-step active' }
      if (progress >= 100) clearInterval(progressInterval)
    }, 30)

    // Phase 3: 3秒后显示结果
    setTimeout(() => {
      stage2.style.display = 'none'
      stage3.style.display = 'block'
      // 结果卡片错开进入
      document.querySelectorAll('.gen-result-card').forEach((card, i) => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(10px)'
        setTimeout(() => {
          card.style.transition = 'all 0.3s ease'
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
        }, i * 150)
      })
    }, 3000)
  }, 2200)
}

// 初始加载自动播放
document.addEventListener('DOMContentLoaded', runGenDemo)

// 点击重播按钮
document.querySelector('.gen-replay-btn').addEventListener('click', runGenDemo)
```

---

### 2.5 Section 5：功能3 — 著作権帰属・証明書（最重要功能区块）

#### 设计原则
这是产品最重要的差异化功能，区块设计要比其他功能更突出、更有份量感。使用深色背景区块。

#### HTML结构

```html
<section
  id="copyright"
  data-feature-section
  class="feature-detail-section feature-copyright-section"
>
  <div class="container">
    <div class="feature-detail-grid">

      <!-- 左侧文案 -->
      <div class="feature-detail-content animate-on-scroll">
        <span class="feature-number">03</span>
        <span class="section-eyebrow">著作権・証明書</span>
        <h2>有料プランのロゴは、<br>著作権が100%あなたのもの。</h2>
        <p class="feature-desc">
          日本の文化庁の見解では「AIが完全に自動生成したコンテンツには著作権が発生しない場合がある」とされています。
          当サービスでは、お客様がデザインの選択・指示・編集に参加するプロセスを設計し、
          ユーザーの「創作的寄与」を記録した<strong>著作権帰属証明書</strong>を発行します。
        </p>

        <!-- 権利の対比表 -->
        <div class="copyright-comparison">
          <div class="cc-row cc-header">
            <div class="cc-col-label"></div>
            <div class="cc-col-free">無料プラン</div>
            <div class="cc-col-paid">有料プラン</div>
          </div>
          <div class="cc-row">
            <div class="cc-col-label">著作権帰属先</div>
            <div class="cc-col-free cc-no">当社</div>
            <div class="cc-col-paid cc-yes">ユーザー（100%）</div>
          </div>
          <div class="cc-row">
            <div class="cc-col-label">商用利用</div>
            <div class="cc-col-free cc-no">✗ 不可</div>
            <div class="cc-col-paid cc-yes">✓ 全て可</div>
          </div>
          <div class="cc-row">
            <div class="cc-col-label">商標登録申請</div>
            <div class="cc-col-free cc-no">✗ 不可</div>
            <div class="cc-col-paid cc-yes">✓ 可能</div>
          </div>
          <div class="cc-row">
            <div class="cc-col-label">第三者への譲渡</div>
            <div class="cc-col-free cc-no">✗ 不可</div>
            <div class="cc-col-paid cc-yes">✓ 可能</div>
          </div>
          <div class="cc-row">
            <div class="cc-col-label">証明書PDF発行</div>
            <div class="cc-col-free cc-no">✗</div>
            <div class="cc-col-paid cc-yes">✓ 自動発行</div>
          </div>
          <div class="cc-row">
            <div class="cc-col-label">AI学習への再利用</div>
            <div class="cc-col-free cc-no">─</div>
            <div class="cc-col-paid cc-yes">✓ 一切なし</div>
          </div>
        </div>

        <!-- 権威リンク -->
        <div class="authority-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm.7 10.5h-1.4V7.3h1.4v4.2zm0-5.6H7.3V4.5h1.4v1.4z" fill="currentColor"/>
          </svg>
          <span>
            参考：<a href="https://www.bunka.go.jp/seisaku/chosakuken/pdf/93903601_01.pdf"
                    target="_blank" rel="noopener noreferrer">
              文化庁「AIと著作権に関する考え方について」（外部リンク）
            </a>
          </span>
        </div>

        <div class="feature-plan-badge-group" style="margin-top: 24px">
          <span class="plan-available-label">証明書発行：</span>
          <span class="plan-badge plan-standard">スタンダード ✓</span>
          <span class="plan-badge plan-premium">プレミアム ✓</span>
        </div>
      </div>

      <!-- 右侧：证书样本展示 -->
      <div class="feature-detail-visual animate-on-scroll" style="transition-delay:0.15s">
        <div class="certificate-preview">
          <div class="cert-header">
            <div class="cert-logo-area">
              <span class="cert-service-name">LogoAI.jp</span>
            </div>
            <div class="cert-badge-area">
              <div class="cert-seal">著作権<br>帰属<br>証明書</div>
            </div>
          </div>
          <div class="cert-body">
            <h3 class="cert-title">ロゴ著作権帰属証明書</h3>
            <div class="cert-rows">
              <div class="cert-row">
                <span class="cert-label">証明書番号</span>
                <span class="cert-value">LA-2025-00482917</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">発行日</span>
                <span class="cert-value">2025年2月26日</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">権利帰属者</span>
                <span class="cert-value">田中 誠（お客様名）</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">ロゴ識別ID</span>
                <span class="cert-value">LG-TDK-8f2a9c1e</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">利用可能範囲</span>
                <span class="cert-value">商用利用・商標登録申請・第三者譲渡 全て可</span>
              </div>
              <div class="cert-row">
                <span class="cert-label">生成プロセス記録</span>
                <span class="cert-value">ユーザーによる入力・選択・編集の全履歴を記録済み</span>
              </div>
            </div>
            <!-- ロゴサムネイル -->
            <div class="cert-logo-preview">
              <svg viewBox="0 0 180 60" width="160" height="54">
                <text x="8" y="38" font-family="serif" font-size="24"
                      font-weight="700" fill="#1A3A2A" letter-spacing="1">
                  田中製菓
                </text>
                <text x="8" y="52" font-family="sans-serif" font-size="8"
                      fill="#9A9A9A" letter-spacing="4">
                  TANAKA SEIKA
                </text>
              </svg>
            </div>
          </div>
          <div class="cert-footer">
            <div class="cert-signature-area">
              <div class="cert-sig-line"></div>
              <span class="cert-sig-label">LogoAI.jp 代表取締役</span>
            </div>
            <div class="cert-qr-area">
              <!-- QRコード模拟（ピクセル格状） -->
              <div class="qr-mock" aria-label="検証QRコード"></div>
              <span class="cert-qr-label">真正性を確認</span>
            </div>
          </div>
          <div class="cert-download-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v8M4 6l3 3 3-3M2 11v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            PDFをダウンロード（サンプル）
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

#### CSS

```css
.feature-copyright-section {
  background: var(--color-bg-section);
}

/* 権利比較表 */
.copyright-comparison {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin: 28px 0;
}

.cc-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  border-bottom: 1px solid var(--color-border);
}

.cc-row:last-child { border-bottom: none; }

.cc-header {
  background: var(--color-bg-section);
}

.cc-col-label,
.cc-col-free,
.cc-col-paid {
  padding: 12px 16px;
  font-size: var(--text-sm);
}

.cc-col-label {
  color: var(--color-text-secondary);
  font-weight: 500;
  border-right: 1px solid var(--color-border);
}

.cc-col-free {
  text-align: center;
  color: var(--color-text-muted);
  border-right: 1px solid var(--color-border);
}

.cc-col-paid {
  text-align: center;
  font-weight: 600;
}

.cc-header .cc-col-free,
.cc-header .cc-col-paid {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.cc-no { color: var(--color-text-muted); }
.cc-yes { color: var(--color-success); }

/* 权威来源链接 */
.authority-link {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  background: rgba(26,58,42,0.04);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  border: 1px solid rgba(26,58,42,0.1);
}

.authority-link svg {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 1px;
}

.authority-link a {
  color: var(--color-primary);
  text-decoration: underline;
}

/* 证书样式 */
.certificate-preview {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  position: relative;
}

/* 证书边框装饰线 */
.certificate-preview::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(201,150,58,0.2);
  border-radius: calc(var(--radius-xl) - 4px);
  pointer-events: none;
}

.cert-header {
  background: var(--color-primary);
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cert-service-name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
}

.cert-seal {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.55rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.cert-body {
  padding: 24px;
}

.cert-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 0.05em;
}

.cert-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 20px;
}

.cert-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  border-bottom: 1px solid var(--color-border);
}

.cert-row:last-child { border-bottom: none; }

.cert-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  padding: 10px 12px;
  background: var(--color-bg-section);
  border-right: 1px solid var(--color-border);
  display: flex;
  align-items: center;
}

.cert-value {
  font-size: 0.7rem;
  color: var(--color-text-primary);
  padding: 10px 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.cert-logo-preview {
  background: var(--color-bg-base);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  justify-content: center;
}

.cert-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.cert-signature-area {
  flex: 1;
}

.cert-sig-line {
  width: 120px;
  height: 1px;
  background: var(--color-text-primary);
  margin-bottom: 4px;
}

.cert-sig-label {
  font-size: 0.6rem;
  color: var(--color-text-muted);
}

.cert-qr-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.qr-mock {
  width: 48px;
  height: 48px;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(26,26,26,0.8) 3px,
      rgba(26,26,26,0.8) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 3px,
      rgba(26,26,26,0.8) 3px,
      rgba(26,26,26,0.8) 4px
    );
  background-color: white;
  border: 1px solid var(--color-border);
}

.cert-qr-label {
  font-size: 0.55rem;
  color: var(--color-text-muted);
}

.cert-download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--color-bg-section);
  padding: 12px 24px;
  border-top: 1px solid var(--color-border);
  font-size: var(--text-xs);
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.cert-download-btn:hover {
  background: rgba(26,58,42,0.06);
}
```

---

### 2.6 Section 6：功能4 — 商標類似チェック

> 与Section 3布局相同（奇数：左文右图），使用白色背景。
> 视觉展示组件：商标检索结果UI模拟。

#### HTML结构（视觉展示部分）

```html
<section
  id="trademark"
  data-feature-section
  class="feature-detail-section"
>
  <div class="container">
    <div class="feature-detail-grid">

      <div class="feature-detail-content animate-on-scroll">
        <span class="feature-number">04</span>
        <span class="section-eyebrow">商標類似チェック</span>
        <h2>生成したロゴが商標と<br>かぶっていないか、AIが事前確認。</h2>
        <p class="feature-desc">
          日本特許庁のデータベース（J-PlatPat）と連携し、生成されたロゴが
          既存の登録商標と類似していないかをAIが自動チェックします。
          類似リスクスコアを0〜100で表示し、リスクが高い場合は代替案も自動提案。
          安心して商標登録申請ができる状態でロゴを受け取れます。
        </p>

        <ul class="feature-points">
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>J-PlatPat連携の類似スコア表示</strong>
              <p>日本特許庁のデータベースと照合し、視覚的類似度・名称類似度を総合スコアで提示。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>類似商標が見つかった場合は代替案を提案</strong>
              <p>スコアが高リスク（70以上）の場合、自動的に類似リスクの低い代替デザインを提案します。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>区分別チェック対応</strong>
              <p>商標登録の区分（第25類・第41類など）を指定してチェックできます。</p>
            </div>
          </li>
        </ul>

        <!-- 重要免責注記 -->
        <div class="disclaimer-box">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm.7 10.5h-1.4V7.3h1.4v4.2zm0-5.6H7.3V4.5h1.4v1.4z" fill="currentColor"/>
          </svg>
          <p>
            本機能はAIによる参考情報の提供であり、法的な保証ではありません。
            商標登録の可否については、弁理士への相談を推奨します。
            <a href="https://www.j-platpat.inpit.go.jp/" target="_blank" rel="noopener noreferrer">
              特許庁 J-PlatPat →
            </a>
          </p>
        </div>

        <div class="feature-plan-badge-group" style="margin-top: 24px">
          <span class="plan-available-label">利用可能プラン：</span>
          <span class="plan-badge plan-premium">プレミアムのみ</span>
        </div>
      </div>

      <!-- 右侧视觉：商标检索结果UI -->
      <div class="feature-detail-visual animate-on-scroll" style="transition-delay:0.15s">
        <div class="trademark-checker-ui">
          <div class="tc-header">
            <span class="tc-title">商標類似チェック結果</span>
            <span class="tc-logo-id">ロゴID: LG-TDK-8f2a</span>
          </div>

          <!-- スコア表示 -->
          <div class="tc-score-section">
            <div class="tc-score-visual">
              <!-- 圆形进度仪表盘 -->
              <svg viewBox="0 0 120 120" width="120" height="120">
                <!-- 背景弧 -->
                <path d="M 15 90 A 55 55 0 1 1 105 90"
                      stroke="var(--color-border)" stroke-width="10"
                      fill="none" stroke-linecap="round"/>
                <!-- 分数弧（绿色，低风险） -->
                <path d="M 15 90 A 55 55 0 1 1 105 90"
                      stroke="var(--color-success)" stroke-width="10"
                      fill="none" stroke-linecap="round"
                      stroke-dasharray="260"
                      stroke-dashoffset="195"
                      class="score-arc"/>
                <!-- 分数文字 -->
                <text x="60" y="72" text-anchor="middle"
                      font-family="Cormorant Garamond, serif"
                      font-size="32" font-weight="600" fill="var(--color-success)">
                  25
                </text>
                <text x="60" y="86" text-anchor="middle"
                      font-family="Noto Sans JP, sans-serif"
                      font-size="9" fill="var(--color-text-muted)">
                  類似リスクスコア
                </text>
              </svg>

              <div class="tc-score-label">
                <span class="score-status low">● リスク低</span>
                <p class="score-desc">商標登録申請を<br>進められる可能性が高い</p>
              </div>
            </div>

            <!-- リスクゲージ -->
            <div class="tc-gauge">
              <div class="gauge-bar">
                <div class="gauge-fill" style="width:25%"></div>
                <div class="gauge-marker" style="left:25%"></div>
              </div>
              <div class="gauge-labels">
                <span>低リスク</span>
                <span>中リスク</span>
                <span>高リスク</span>
              </div>
            </div>
          </div>

          <!-- チェック詳細 -->
          <div class="tc-details">
            <div class="tc-detail-row">
              <span class="tc-detail-label">視覚的類似度</span>
              <div class="tc-mini-bar">
                <div class="tc-mini-fill" style="width:20%; background:var(--color-success)"></div>
              </div>
              <span class="tc-detail-score low">20/100</span>
            </div>
            <div class="tc-detail-row">
              <span class="tc-detail-label">名称類似度</span>
              <div class="tc-mini-bar">
                <div class="tc-mini-fill" style="width:30%; background:var(--color-warning)"></div>
              </div>
              <span class="tc-detail-score mid">30/100</span>
            </div>
            <div class="tc-detail-row">
              <span class="tc-detail-label">業種区分の衝突</span>
              <div class="tc-mini-bar">
                <div class="tc-mini-fill" style="width:10%; background:var(--color-success)"></div>
              </div>
              <span class="tc-detail-score low">10/100</span>
            </div>
          </div>

          <!-- 近似商標一覧 -->
          <div class="tc-similar-list">
            <div class="tc-similar-header">近い商標（参考）</div>
            <div class="tc-similar-item">
              <div class="tc-similar-logo">田中食品</div>
              <div class="tc-similar-meta">
                <span>登録番号：6012345</span>
                <span class="similarity-tag low-sim">類似度：低</span>
              </div>
            </div>
            <div class="tc-similar-item">
              <div class="tc-similar-logo">TANAKA</div>
              <div class="tc-similar-meta">
                <span>登録番号：5987654</span>
                <span class="similarity-tag mid-sim">類似度：中</span>
              </div>
            </div>
          </div>

          <div class="tc-footer">
            <span>チェック日時：2025年2月26日 14:32</span>
            <span>参照DB：J-PlatPat</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

#### CSS（商标检索UI专用）

```css
.trademark-checker-ui {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.tc-header {
  background: var(--color-primary);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tc-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: white;
}

.tc-logo-id {
  font-size: 0.65rem;
  color: rgba(250,250,247,0.5);
}

.tc-score-section {
  padding: 24px;
  display: flex;
  gap: 24px;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.tc-score-visual {
  display: flex;
  align-items: center;
  gap: 16px;
}

.score-arc {
  transition: stroke-dashoffset 1.5s ease;
}

.tc-score-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.score-status {
  font-size: var(--text-xs);
  font-weight: 700;
}

.score-status.low { color: var(--color-success); }
.score-status.mid { color: var(--color-warning); }
.score-status.high { color: var(--color-error); }

.score-desc {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
}

.tc-gauge {
  flex: 1;
}

.gauge-bar {
  position: relative;
  height: 8px;
  background: linear-gradient(90deg, var(--color-success) 0%, var(--color-warning) 50%, var(--color-error) 100%);
  border-radius: var(--radius-full);
  margin-bottom: 6px;
}

.gauge-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: white;
  border: 3px solid var(--color-text-primary);
  border-radius: 50%;
}

.gauge-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  color: var(--color-text-muted);
}

.tc-details {
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid var(--color-border);
}

.tc-detail-row {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  gap: 12px;
  align-items: center;
}

.tc-detail-label {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
}

.tc-mini-bar {
  height: 6px;
  background: var(--color-bg-section);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.tc-mini-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 1s ease;
}

.tc-detail-score {
  font-size: 0.7rem;
  font-weight: 700;
  text-align: right;
}

.tc-detail-score.low { color: var(--color-success); }
.tc-detail-score.mid { color: var(--color-warning); }
.tc-detail-score.high { color: var(--color-error); }

.tc-similar-list {
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
}

.tc-similar-header {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

.tc-similar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
}

.tc-similar-item:last-child { border-bottom: none; }

.tc-similar-logo {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.tc-similar-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 0.65rem;
  color: var(--color-text-muted);
}

.similarity-tag {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-weight: 600;
}

.similarity-tag.low-sim { background: rgba(45,122,79,0.1); color: var(--color-success); }
.similarity-tag.mid-sim { background: rgba(201,150,58,0.1); color: var(--color-warning); }

.tc-footer {
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  color: var(--color-text-muted);
  background: var(--color-bg-section);
}

.disclaimer-box {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: rgba(201,150,58,0.06);
  border: 1px solid rgba(201,150,58,0.2);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.disclaimer-box svg {
  color: var(--color-warning);
  flex-shrink: 0;
  margin-top: 1px;
}

.disclaimer-box p { margin: 0; }
.disclaimer-box a { color: var(--color-accent); }
```

---

### 2.7 Section 7：功能5 — ブランドガイドライン自動生成

> 布局：左图右文（偶数区块）
> 视觉：品牌规范手册PDF预览模拟

#### 核心内容

```html
<section id="brand-guideline" data-feature-section class="feature-detail-section" style="background:var(--color-bg-section)">
  <!-- 左侧：PDF模拟视觉 -->
  <div class="feature-detail-visual">
    <div class="guideline-pdf-preview">
      <!-- 模拟PDF页面 -->
      <div class="pdf-page">
        <div class="pdf-page-header">
          <span class="pdf-brand-name">田中製菓 ブランドガイドライン</span>
          <span class="pdf-version">Ver. 1.0</span>
        </div>
        <div class="pdf-logo-section">
          <!-- Logo展示 -->
          <div class="pdf-logo-main">
            <svg viewBox="0 0 160 60" width="140" height="52">
              <text x="8" y="38" font-family="serif" font-size="22" font-weight="700" fill="#1A3A2A">田中製菓</text>
              <text x="8" y="52" font-family="sans-serif" font-size="8" fill="#9A9A9A" letter-spacing="3">TANAKA SEIKA</text>
            </svg>
          </div>
          <!-- カラーパレット -->
          <div class="pdf-colors">
            <div class="pdf-color-item">
              <div class="pdf-color-swatch" style="background:#1A3A2A"></div>
              <div class="pdf-color-codes">
                <span>HEX #1A3A2A</span>
                <span>CMYK 78/33/68/74</span>
                <span>Pantone 350 C</span>
              </div>
            </div>
            <div class="pdf-color-item">
              <div class="pdf-color-swatch" style="background:#C9963A"></div>
              <div class="pdf-color-codes">
                <span>HEX #C9963A</span>
                <span>CMYK 0/25/71/21</span>
                <span>Pantone 124 C</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 使用ルール -->
        <div class="pdf-rules">
          <div class="pdf-rule-label">使用禁止例</div>
          <div class="pdf-prohibited">
            <div class="prohibited-item">
              <div class="prohibited-logo">
                <svg viewBox="0 0 80 30" width="70">
                  <text x="4" y="20" font-family="serif" font-size="11" fill="red" font-weight="700">田中製菓</text>
                </svg>
              </div>
              <span class="prohibited-label">✗ 赤色での使用</span>
            </div>
            <div class="prohibited-item">
              <div class="prohibited-logo" style="background:#333">
                <svg viewBox="0 0 80 30" width="70">
                  <text x="4" y="20" font-family="serif" font-size="11" fill="rgba(255,255,255,0.2)" font-weight="700">田中製菓</text>
                </svg>
              </div>
              <span class="prohibited-label">✗ 視認性のない背景</span>
            </div>
          </div>
          <div class="pdf-rule-label" style="margin-top:12px">最小使用サイズ</div>
          <div class="pdf-min-size">
            <span>印刷物：最小 20mm幅</span>
            <span>デジタル：最小 120px幅</span>
          </div>
        </div>
      </div><!-- /pdf-page -->
      <div class="pdf-shadow-pages" aria-hidden="true">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>

  <!-- 右侧文案 -->
  <div class="feature-detail-content animate-on-scroll">
    <span class="feature-number">05</span>
    <span class="section-eyebrow">ブランドガイドライン</span>
    <h2>ロゴ完成と同時に、<br>ブランドの使用規定書を自動生成。</h2>
    <p class="feature-desc">
      デザイン会社に依頼すれば10〜30万円はかかるブランドガイドライン（VI規定書）を、
      ロゴ生成と同時にAIが自動作成します。社外デザイナーへの指示書として、
      または社内での統一ルールとして即座に活用できます。
    </p>
    <ul class="feature-points">
      <li>
        <div class="feature-point-icon">✓</div>
        <div>
          <strong>カラーコードの完全収録</strong>
          <p>HEX・RGB・CMYK・Pantone近似値を全て自動計算。印刷物・デジタル両方に対応。</p>
        </div>
      </li>
      <li>
        <div class="feature-point-icon">✓</div>
        <div>
          <strong>使用禁止例の自動生成</strong>
          <p>色変更・変形・低視認性背景など、よくある誤用パターンを禁止例として自動生成します。</p>
        </div>
      </li>
      <li>
        <div class="feature-point-icon">✓</div>
        <div>
          <strong>最小使用サイズ規定</strong>
          <p>印刷物・デジタル別の最小サイズとクリアスペース（余白）規定を明記。</p>
        </div>
      </li>
      <li>
        <div class="feature-point-icon">✓</div>
        <div>
          <strong>フォント指定・代替フォント</strong>
          <p>使用フォント名称・ウェイト・代替フォントの指定を収録。</p>
        </div>
      </li>
    </ul>
    <div class="feature-plan-badge-group">
      <span class="plan-available-label">利用可能プラン：</span>
      <span class="plan-badge plan-premium">プレミアムのみ</span>
    </div>
  </div>
</section>
```

```css
/* PDF preview mockup */
.guideline-pdf-preview {
  position: relative;
  padding: 20px 20px 40px;
}

.pdf-page {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  position: relative;
  z-index: 2;
  box-shadow: var(--shadow-md);
}

/* 叠加的底层页面效果 */
.pdf-shadow-pages div {
  position: absolute;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.pdf-shadow-pages div:nth-child(1) {
  bottom: 24px;
  left: 28px;
  right: 12px;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
}

.pdf-shadow-pages div:nth-child(2) {
  bottom: 12px;
  left: 36px;
  right: 4px;
  height: 100%;
  z-index: 0;
  opacity: 0.4;
}

.pdf-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-primary);
  margin-bottom: 16px;
}

.pdf-brand-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
}

.pdf-version {
  font-size: 0.6rem;
  color: var(--color-text-muted);
}

.pdf-logo-section {
  margin-bottom: 16px;
}

.pdf-logo-main {
  background: var(--color-bg-base);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.pdf-colors {
  display: flex;
  gap: 12px;
}

.pdf-color-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pdf-color-swatch {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.08);
}

.pdf-color-codes {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.55rem;
  color: var(--color-text-secondary);
  font-family: monospace;
}

.pdf-rule-label {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.pdf-prohibited {
  display: flex;
  gap: 12px;
  margin-bottom: 0;
}

.prohibited-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.prohibited-logo {
  background: var(--color-bg-base);
  border-radius: var(--radius-sm);
  padding: 8px;
  border: 1px solid var(--color-border);
}

.prohibited-label {
  font-size: 0.55rem;
  color: var(--color-error);
}

.pdf-min-size {
  display: flex;
  gap: 16px;
  font-size: 0.65rem;
  color: var(--color-text-secondary);
}
```

---

### 2.8 Section 8：功能6 — ファイル形式

> 布局：左文右图（奇数区块）
> 视觉：格式图标展示 + 用途说明

#### 视觉组件

```html
<section id="file-formats" data-feature-section class="feature-detail-section">
  <div class="container">
    <div class="feature-detail-grid">

      <div class="feature-detail-content animate-on-scroll">
        <span class="feature-number">06</span>
        <span class="section-eyebrow">ファイル形式</span>
        <h2>全ての用途に対応する<br>形式でダウンロード可能。</h2>
        <p class="feature-desc">
          Webサイト・SNS・印刷物・看板・グッズ……用途は様々です。
          LogoAI.jpでは、あらゆる用途で使えるよう、主要な全ファイル形式に対応しています。
          印刷会社への入稿データとしてそのまま使用可能です。
        </p>
        <!-- 格式对比表 -->
        <div class="format-comparison-table">
          <div class="format-row header">
            <span>形式</span>
            <span>用途</span>
            <span>スタンダード</span>
            <span>プレミアム</span>
          </div>
          <div class="format-row">
            <span class="format-badge svg">SVG</span>
            <span>Web・拡大縮小・編集</span>
            <span class="ok">✓</span>
            <span class="ok">✓</span>
          </div>
          <div class="format-row">
            <span class="format-badge png">PNG</span>
            <span>Web・SNS（透過背景）</span>
            <span class="ok">✓ 300dpi</span>
            <span class="ok">✓ 300dpi</span>
          </div>
          <div class="format-row">
            <span class="format-badge pdf">PDF</span>
            <span>印刷用・入稿用</span>
            <span class="ok">✓ CMYK</span>
            <span class="ok">✓ CMYK</span>
          </div>
          <div class="format-row">
            <span class="format-badge ai">AI</span>
            <span>Illustrator編集用</span>
            <span class="no">—</span>
            <span class="ok">✓</span>
          </div>
          <div class="format-row">
            <span class="format-badge eps">EPS</span>
            <span>印刷所入稿・汎用</span>
            <span class="no">—</span>
            <span class="ok">✓</span>
          </div>
          <div class="format-row">
            <span class="format-badge jpg">JPG</span>
            <span>軽量・資料添付用</span>
            <span class="ok">✓</span>
            <span class="ok">✓</span>
          </div>
        </div>
        <div class="feature-plan-badge-group">
          <span class="plan-available-label">全形式対応：</span>
          <span class="plan-badge plan-premium">プレミアム</span>
        </div>
      </div>

      <!-- 右侧：格式展示 + Mockup -->
      <div class="feature-detail-visual animate-on-scroll" style="transition-delay:0.15s">
        <div class="file-format-visual">
          <!-- Mockup展示：同一Logo在不同场景中的使用 -->
          <div class="mockup-grid">
            <div class="mockup-item mockup-business-card">
              <div class="mockup-label">名刺</div>
              <div class="mockup-preview bc-preview">
                <div class="bc-logo">
                  <svg viewBox="0 0 120 40" width="100" height="34">
                    <text x="4" y="26" font-family="serif" font-size="16" font-weight="700" fill="#1A3A2A">田中製菓</text>
                    <text x="4" y="36" font-family="sans-serif" font-size="6" fill="#9A9A9A" letter-spacing="2">TANAKA SEIKA</text>
                  </svg>
                </div>
              </div>
            </div>
            <div class="mockup-item mockup-sns">
              <div class="mockup-label">SNSアイコン</div>
              <div class="mockup-preview sns-preview">
                <div class="sns-circle">
                  <svg viewBox="0 0 40 40" width="40" height="40">
                    <text x="6" y="26" font-family="serif" font-size="11" font-weight="700" fill="white">田</text>
                  </svg>
                </div>
              </div>
            </div>
            <div class="mockup-item mockup-signage">
              <div class="mockup-label">看板・店頭</div>
              <div class="mockup-preview signage-preview">
                <svg viewBox="0 0 140 50" width="130" height="46">
                  <text x="8" y="32" font-family="serif" font-size="20" font-weight="700" fill="white">田中製菓</text>
                  <text x="8" y="44" font-family="sans-serif" font-size="7" fill="rgba(255,255,255,0.6)" letter-spacing="3">TANAKA SEIKA</text>
                </svg>
              </div>
            </div>
            <div class="mockup-item mockup-tshirt">
              <div class="mockup-label">グッズ印刷</div>
              <div class="mockup-preview tshirt-preview">
                <svg viewBox="0 0 80 40" width="72" height="36">
                  <text x="4" y="24" font-family="serif" font-size="12" font-weight="700" fill="#1A3A2A">田中製菓</text>
                </svg>
              </div>
            </div>
          </div>
          <!-- 下载按钮模拟 -->
          <div class="format-download-preview">
            <div class="download-format-list">
              <div class="dl-format-item active">
                <span class="dl-format-badge svg">SVG</span>
                <span class="dl-format-size">4.2 KB</span>
                <span class="dl-download-icon">↓</span>
              </div>
              <div class="dl-format-item">
                <span class="dl-format-badge png">PNG</span>
                <span class="dl-format-size">186 KB</span>
                <span class="dl-download-icon">↓</span>
              </div>
              <div class="dl-format-item">
                <span class="dl-format-badge ai">AI</span>
                <span class="dl-format-size">24 KB</span>
                <span class="dl-download-icon">↓</span>
              </div>
              <div class="dl-format-item">
                <span class="dl-format-badge pdf">PDF</span>
                <span class="dl-format-size">82 KB</span>
                <span class="dl-download-icon">↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
/* 格式比较表 */
.format-comparison-table {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: 24px 0;
}

.format-row {
  display: grid;
  grid-template-columns: 70px 1fr 100px 100px;
  gap: 0;
  border-bottom: 1px solid var(--color-border);
}

.format-row:last-child { border-bottom: none; }

.format-row.header {
  background: var(--color-bg-section);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.format-row > * {
  padding: 10px 12px;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  border-right: 1px solid var(--color-border);
  display: flex;
  align-items: center;
}

.format-row > *:last-child { border-right: none; }

.format-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 22px;
  border-radius: var(--radius-sm);
  font-size: 0.65rem;
  font-weight: 700;
  font-family: monospace;
}

.format-badge.svg { background: rgba(26,58,42,0.1); color: var(--color-primary); }
.format-badge.png { background: rgba(45,90,200,0.1); color: #2d5ac8; }
.format-badge.pdf { background: rgba(192,57,43,0.1); color: var(--color-error); }
.format-badge.ai  { background: rgba(201,150,58,0.1); color: var(--color-accent); }
.format-badge.eps { background: rgba(100,50,150,0.1); color: #643296; }
.format-badge.jpg { background: rgba(26,26,26,0.06); color: var(--color-text-secondary); }

.format-row .ok { color: var(--color-success); font-weight: 600; }
.format-row .no { color: var(--color-text-muted); }

/* Mockup grid */
.file-format-visual {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.mockup-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  padding: 20px;
  gap: 16px;
  border-bottom: 1px solid var(--color-border);
}

.mockup-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mockup-label {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  font-weight: 600;
  letter-spacing: 0.05em;
}

.mockup-preview {
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

.bc-preview {
  background: white;
  border: 1px solid var(--color-border);
  min-height: 64px;
}

.sns-preview {
  background: var(--color-bg-section);
  min-height: 64px;
}

.sns-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.signage-preview {
  background: var(--color-primary);
  min-height: 64px;
  border-radius: var(--radius-md);
}

.tshirt-preview {
  background: var(--color-bg-section);
  border: 1px dashed var(--color-border);
  min-height: 64px;
}

/* 下载格式列表模拟 */
.format-download-preview {
  padding: 16px 20px;
}

.download-format-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dl-format-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
}

.dl-format-item.active {
  border-color: var(--color-accent);
  background: rgba(201,150,58,0.04);
}

.dl-format-item:hover:not(.active) {
  background: var(--color-bg-section);
}

.dl-format-badge {
  font-size: 0.6rem;
  font-weight: 700;
  font-family: monospace;
  width: 36px;
  text-align: center;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.dl-format-size {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  flex: 1;
}

.dl-download-icon {
  font-size: var(--text-sm);
  color: var(--color-primary);
  font-weight: 700;
}
```

---

### 2.9 Section 9：功能7 — 名刺レイアウト自動生成

> 布局：偶数（左图右文）
> 视觉：名刺表/裏面展示

#### 核心HTML（简化版）

```html
<section id="business-card" data-feature-section class="feature-detail-section" style="background:var(--color-bg-section)">
  <div class="container">
    <div class="feature-detail-grid">

      <!-- 左侧：名片展示 -->
      <div class="feature-detail-visual animate-on-scroll">
        <div class="business-card-showcase">
          <div class="bc-tabs">
            <button class="bc-tab active" data-side="front">表面</button>
            <button class="bc-tab" data-side="back">裏面</button>
          </div>

          <!-- 名刺表面 -->
          <div class="bc-preview-area" id="bc-front">
            <div class="bc-card front">
              <div class="bc-card-logo">
                <svg viewBox="0 0 120 40" width="100">
                  <text x="4" y="26" font-family="serif" font-size="16" font-weight="700" fill="#1A3A2A">田中製菓</text>
                  <text x="4" y="35" font-family="sans-serif" font-size="6" fill="#9A9A9A" letter-spacing="2">TANAKA SEIKA</text>
                </svg>
              </div>
              <div class="bc-card-info">
                <div class="bc-name">田中 誠</div>
                <div class="bc-title">代表取締役</div>
                <div class="bc-contacts">
                  <div>〒150-0001 東京都渋谷区神宮前1-1-1</div>
                  <div>TEL: 03-XXXX-XXXX</div>
                  <div>Email: tanaka@tanaka-seika.co.jp</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 名刺裏面 -->
          <div class="bc-preview-area" id="bc-back" style="display:none">
            <div class="bc-card back" style="background: var(--color-primary)">
              <div class="bc-card-logo-center">
                <svg viewBox="0 0 140 50" width="120">
                  <text x="8" y="32" font-family="serif" font-size="20" font-weight="700" fill="white">田中製菓</text>
                  <text x="8" y="44" font-family="sans-serif" font-size="8" fill="rgba(255,255,255,0.5)" letter-spacing="3">TANAKA SEIKA</text>
                </svg>
              </div>
            </div>
          </div>

          <!-- ダウンロードボタン -->
          <div class="bc-download-btns">
            <button class="bc-dl-btn">
              印刷用PDF（A4面付け）
            </button>
            <button class="bc-dl-btn secondary">
              個別データ（表・裏）
            </button>
          </div>
        </div>
      </div>

      <!-- 右侧文案 -->
      <div class="feature-detail-content animate-on-scroll" style="transition-delay:0.15s">
        <span class="feature-number">07</span>
        <span class="section-eyebrow">名刺レイアウト</span>
        <h2>ロゴ完成後、すぐに<br>名刺データも自動生成。</h2>
        <p class="feature-desc">
          ロゴが完成したら次に必要なのは名刺です。LogoAI.jpはロゴ完成後に、
          そのロゴを使った名刺の表面・裏面レイアウトを自動生成します。
          印刷会社への入稿データとしてそのまま使用可能な、
          印刷品質のPDFを出力します。
        </p>
        <ul class="feature-points">
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>表面・裏面セットで生成</strong>
              <p>表面（氏名・連絡先）と裏面（ロゴメイン・デザイン）をセットで自動生成。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>印刷入稿可能なPDF出力</strong>
              <p>CMYK・高解像度・トンボ付きのPDFを出力。国内主要印刷会社への入稿データとして利用可能。</p>
            </div>
          </li>
          <li>
            <div class="feature-point-icon">✓</div>
            <div>
              <strong>複数レイアウトから選択</strong>
              <p>3〜5種類のレイアウトパターンから選択可能。縦型・横型どちらにも対応。</p>
            </div>
          </li>
        </ul>
        <div class="feature-plan-badge-group">
          <span class="plan-available-label">利用可能プラン：</span>
          <span class="plan-badge plan-standard">スタンダード（1枚）</span>
          <span class="plan-badge plan-premium">プレミアム（5枚）</span>
        </div>
      </div>

    </div>
  </div>
</section>
```

```css
/* 名刺展示 */
.business-card-showcase {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 24px;
  box-shadow: var(--shadow-lg);
}

.bc-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.bc-tab {
  padding: 8px 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: transparent;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.bc-tab.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.bc-preview-area {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  perspective: 800px;
}

/* 名刺カード：実際のサイズ比（91×55mm → 比率換算） */
.bc-card {
  width: 320px;
  height: 193px;
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow-lg);
  transition: transform 0.4s ease;
}

.bc-card.front {
  background: white;
  border: 1px solid var(--color-border);
}

.bc-card.back {
  background: var(--color-primary);
  align-items: center;
  justify-content: center;
}

.bc-card:hover {
  transform: rotateY(-5deg) rotateX(3deg);
}

.bc-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.bc-title {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.bc-contacts {
  font-size: 0.6rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.bc-download-btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bc-dl-btn {
  width: 100%;
  padding: 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}

.bc-dl-btn.secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.bc-dl-btn:hover { background: var(--color-primary-light); }
.bc-dl-btn.secondary:hover { background: rgba(26,58,42,0.06); }
```

---

### 2.10 Section 10：機能比較表（vs 競合）

#### 布局：全幅横向对比表

```html
<section class="comparison-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">サービス比較</span>
      <h2>他のサービスと何が違うのか</h2>
      <p class="section-description">
        主要なロゴ作成サービスとの機能比較です。数字は2025年2月時点の情報です。
      </p>
    </div>

    <div class="comparison-table-wrap animate-on-scroll">
      <table class="comparison-table" role="table">
        <thead>
          <tr>
            <th scope="col" class="feature-col">機能・特徴</th>
            <th scope="col" class="our-col">
              <div class="our-header">
                <span class="our-badge">当サービス</span>
                <strong>LogoAI.jp</strong>
              </div>
            </th>
            <th scope="col">Canva</th>
            <th scope="col">Wix Logo Maker</th>
            <th scope="col">coconala</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="feature-col">日本語フォント数</td>
            <td class="our-col highlight">
              <strong class="compare-strong">100種以上</strong>
            </td>
            <td>約30種</td>
            <td>5種程度</td>
            <td>デザイナー依存</td>
          </tr>
          <tr>
            <td class="feature-col">AI自動生成</td>
            <td class="our-col highlight"><span class="cmp-yes">✓ 業種特化型</span></td>
            <td><span class="cmp-partial">△ テンプレート型</span></td>
            <td><span class="cmp-yes">✓</span></td>
            <td><span class="cmp-no">✗ 人力</span></td>
          </tr>
          <tr>
            <td class="feature-col">著作権完全帰属</td>
            <td class="our-col highlight"><span class="cmp-yes">✓ 有料プランで100%</span></td>
            <td><span class="cmp-partial">△ 規約により制限あり</span></td>
            <td><span class="cmp-partial">△ 要確認</span></td>
            <td><span class="cmp-yes">✓ デザイナーと要取決め</span></td>
          </tr>
          <tr>
            <td class="feature-col">商標類似チェック</td>
            <td class="our-col highlight"><span class="cmp-yes">✓ J-PlatPat連携</span></td>
            <td><span class="cmp-no">✗</span></td>
            <td><span class="cmp-no">✗</span></td>
            <td><span class="cmp-no">✗</span></td>
          </tr>
          <tr>
            <td class="feature-col">ブランドガイドライン</td>
            <td class="our-col highlight"><span class="cmp-yes">✓ PDF自動生成</span></td>
            <td><span class="cmp-partial">△ 有料プランのみ（限定的）</span></td>
            <td><span class="cmp-no">✗</span></td>
            <td><span class="cmp-partial">△ 追加費用</span></td>
          </tr>
          <tr>
            <td class="feature-col">SVG/AIデータ出力</td>
            <td class="our-col highlight"><span class="cmp-yes">✓ 全形式対応</span></td>
            <td><span class="cmp-partial">△ SVGのみ（有料）</span></td>
            <td><span class="cmp-partial">△ PNG/SVGのみ</span></td>
            <td><span class="cmp-yes">✓</span></td>
          </tr>
          <tr>
            <td class="feature-col">名刺レイアウト生成</td>
            <td class="our-col highlight"><span class="cmp-yes">✓ 自動生成</span></td>
            <td><span class="cmp-yes">✓ テンプレート</span></td>
            <td><span class="cmp-no">✗</span></td>
            <td><span class="cmp-partial">△ 別途依頼</span></td>
          </tr>
          <tr>
            <td class="feature-col">著作権証明書発行</td>
            <td class="our-col highlight"><span class="cmp-yes">✓</span></td>
            <td><span class="cmp-no">✗</span></td>
            <td><span class="cmp-no">✗</span></td>
            <td><span class="cmp-no">✗</span></td>
          </tr>
          <tr>
            <td class="feature-col">日本語サポート</td>
            <td class="our-col highlight"><span class="cmp-yes">✓ 完全日本語</span></td>
            <td><span class="cmp-partial">△ 一部対応</span></td>
            <td><span class="cmp-no">✗ 英語のみ</span></td>
            <td><span class="cmp-yes">✓</span></td>
          </tr>
          <tr>
            <td class="feature-col">返金保証</td>
            <td class="our-col highlight"><span class="cmp-yes">✓ 7日間全額</span></td>
            <td><span class="cmp-no">✗</span></td>
            <td><span class="cmp-no">✗</span></td>
            <td><span class="cmp-no">✗</span></td>
          </tr>
          <tr>
            <td class="feature-col">価格帯（1ロゴ）</td>
            <td class="our-col highlight"><strong>¥0〜¥9,800</strong></td>
            <td>無料〜月額制</td>
            <td>$20〜（USD）</td>
            <td>¥4,000〜¥30,000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 比較の注記 -->
    <p class="comparison-note">
      ※ 上記は2025年2月時点の情報です。各サービスの最新情報は公式サイトをご確認ください。
      △は条件付き対応、✗は非対応を示します。
    </p>
  </div>
</section>
```

```css
.comparison-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.comparison-table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  background: white;
}

.comparison-table th,
.comparison-table td {
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-sm);
  vertical-align: middle;
}

.comparison-table tr:last-child td { border-bottom: none; }

.comparison-table thead th {
  background: var(--color-bg-section);
  font-weight: 700;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  letter-spacing: 0.03em;
}

.feature-col {
  text-align: left !important;
  font-weight: 500;
  color: var(--color-text-secondary);
  font-size: var(--text-sm) !important;
  min-width: 160px;
}

.our-col {
  background: rgba(201,150,58,0.04);
  text-align: center;
  font-weight: 600;
  border-left: 2px solid var(--color-accent);
  border-right: 2px solid var(--color-accent);
}

.our-col.highlight { /* tbody内 */ }

.our-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.our-badge {
  background: var(--color-accent);
  color: white;
  font-size: 0.6rem;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-weight: 700;
}

.compare-strong {
  color: var(--color-primary);
  font-size: var(--text-sm);
}

.cmp-yes  { color: var(--color-success); font-weight: 600; }
.cmp-no   { color: var(--color-text-muted); }
.cmp-partial { color: var(--color-warning); }

.comparison-table td:not(.feature-col):not(.our-col) {
  text-align: center;
  color: var(--color-text-secondary);
}

.comparison-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 16px;
  text-align: center;
}
```

---

### 2.11 Section 11：CTA（最终行动号召）

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>全ての機能を、今すぐお試しください。</h2>
        <p>クレジットカード不要。30秒で登録完了。無料プランからスタートできます。</p>
        <div class="final-cta-buttons">
          <a href="/create" class="btn-primary btn-primary-lg">無料でロゴを作る →</a>
          <a href="/pricing" class="btn-secondary-inverse">料金プランを見る</a>
        </div>
        <div class="final-trust">
          <span>✓ 著作権完全帰属</span>
          <span>✓ 7日間返金保証</span>
          <span>✓ 日本語フォント100種以上</span>
          <span>✓ 商標類似チェック</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

> スタイルは首页 `final-cta-section` と共通。`homepage-spec.md` の CSS を参照。

---

## 3. 交互与动画规范

### 3.1 页面整体进场顺序

```
1. Page Hero → 立即显示（无延迟）
2. Features Quick Nav → 滚动时sticky固定
3. 各功能区块 → Intersection Observer触发，从下方淡入（translateY 24px → 0）
4. 左右交替布局 → 奇数区块左侧先进，右侧延迟0.15s；偶数区块反之
5. 比较表格 → 整体一次性进入
```

### 3.2 Quick Nav Sticky 行为

```javascript
// Sticky导航激活时检测
const featuresNav = document.querySelector('.features-nav')
const navbarHeight = 64 // Navbar高度

window.addEventListener('scroll', () => {
  // 当scroll超过page-hero底部时，sticky nav开始固定
  const heroBottom = document.querySelector('.features-hero').offsetTop +
                     document.querySelector('.features-hero').offsetHeight
  if (window.scrollY >= heroBottom - navbarHeight) {
    featuresNav.classList.add('is-sticky')
  } else {
    featuresNav.classList.remove('is-sticky')
  }
}, { passive: true })
```

### 3.3 字体实时预览

```javascript
// Section 3的字体实时预览功能
const previewInput = document.getElementById('font-preview-input')
const fontSamples = document.querySelectorAll('.font-sample')

previewInput.addEventListener('input', debounce((e) => {
  const value = e.target.value.trim() || '田中製菓' // 空时恢复默认
  fontSamples.forEach(sample => {
    sample.textContent = value
  })
}, 150))

function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}
```

### 3.4 名刺表裏の切り替え

```javascript
document.querySelectorAll('.bc-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const side = tab.dataset.side
    // Tab状態更新
    document.querySelectorAll('.bc-tab').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')
    // 面の切り替え（フリップアニメーション）
    const front = document.getElementById('bc-front')
    const back = document.getElementById('bc-back')
    if (side === 'front') {
      back.style.display = 'none'
      front.style.display = 'flex'
    } else {
      front.style.display = 'none'
      back.style.display = 'flex'
    }
  })
})
```

---

## 4. SEO規範

### 4.1 HTML head 設定

```html
<head>
  <!-- Primary SEO -->
  <title>機能一覧 | AIロゴ作成・日本語フォント100種・商標チェック・著作権帰属証明書【LogoAI.jp】</title>
  <meta name="description" content="LogoAI.jpの全機能を詳しく解説。日本語フォント100種以上・AI自動生成・著作権完全帰属・商標類似チェック・ブランドガイドラインPDF・全形式ダウンロード・名刺生成に対応。">

  <link rel="canonical" href="https://logoai.jp/features">

  <!-- OGP -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://logoai.jp/features">
  <meta property="og:title" content="機能一覧 | AIロゴ作成の全機能【LogoAI.jp】">
  <meta property="og:description" content="日本語フォント100種・著作権帰属・商標チェック・ブランドガイドライン・全形式ダウンロード・名刺生成。全て揃ったAIロゴ作成サービス。">
  <meta property="og:image" content="https://logoai.jp/og-features.png">

  <!-- Breadcrumb（JSON-LD） -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://logoai.jp/" },
      { "@type": "ListItem", "position": 2, "name": "機能一覧", "item": "https://logoai.jp/features" }
    ]
  }
  </script>
</head>
```

### 4.2 キーワード布局

| 位置 | 必须含有关键词 |
|---|---|
| H1 | 日本語ロゴ + AI + 機能群のいずれか |
| H2（機能1） | 日本語フォント + 100種 |
| H2（機能2） | AI自動生成 |
| H2（機能3） | 著作権 + 帰属 |
| H2（機能4） | 商標 + チェック |
| H2（機能5） | ブランドガイドライン + 自動生成 |
| H2（機能6） | SVG / AI / ファイル形式 |
| H2（比較） | 比較 / 違い |
| Alt文字 | 各機能のスクリーンショット説明 |

### 4.3 アンカーリンク（内部SEO）

各機能区块設置 `id` 属性，供内外部リンクから直接跳转：

| id | 機能 | 外部リンク例 |
|---|---|---|
| `#japanese-fonts` | 日本語フォント | `/blog/japanese-fonts` → anchor |
| `#ai-generation` | AI生成 | 首页How It Works → anchor |
| `#copyright` | 著作権 | `/copyright` → 链接至此 |
| `#trademark` | 商標 | `/trademark` → 链接至此 |
| `#brand-guideline` | ガイドライン | `/pricing` Premium欄 → anchor |
| `#file-formats` | ファイル形式 | FAQページ → anchor |

---

## 5. 结构化数据

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "LogoAI.jp 機能一覧",
  "description": "LogoAI.jpが提供するAIロゴ作成サービスの全機能",
  "numberOfItems": 7,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "日本語フォントライブラリ",
      "description": "100種類以上の商用利用可能な日本語フォントを搭載。明朝体・ゴシック体・丸ゴシック・書道風まで、業種に合ったフォントをAIが自動提案。"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "AI自動デザイン生成",
      "description": "業種・ブランド名・イメージキーワードから、AIが3案を同時自動生成。平均2分以内で完成。"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "著作権帰属証明書",
      "description": "有料プランで生成したロゴの著作権は100%ユーザーに帰属。著作権帰属証明書PDFを自動発行。"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "商標類似チェック",
      "description": "日本特許庁データベース（J-PlatPat）と連携し、商標類似リスクをスコアで表示。プレミアムプラン専用機能。"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "ブランドガイドライン自動生成",
      "description": "HEX/CMYK/Pantone色値・使用禁止例・最小サイズ規定を含むブランドガイドラインPDFを自動生成。"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "全形式ダウンロード",
      "description": "SVG・PNG（300dpi透過）・PDF（印刷用CMYK）・AI・EPSの全形式に対応。印刷会社への入稿データとして利用可能。"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "名刺レイアウト自動生成",
      "description": "ロゴ完成後に名刺の表面・裏面レイアウトを自動生成。印刷入稿可能なPDFを出力。"
    }
  ]
}
```

---

## 6. GEO优化规范

### 6.1 各機能区块の「定义段落」

各機能区块在 `.feature-desc` 段落之前，添加一个隐藏的机器可读定义段（`aria-hidden` 不能用，用 `class="geo-definition"` 做样式弱化即可）：

```html
<!-- 添加在每个feature-detail-content的H2之后，feature-desc之前 -->
<p class="geo-definition">
  LogoAI.jpの日本語フォント機能とは：100種類以上の商用利用可能な日本語フォント（明朝体・角ゴシック体・丸ゴシック体・書道風など）を搭載し、ユーザーが入力した業種とブランド名に基づいてAIが最適なフォントを自動推薦するサービスです。
</p>
```

```css
.geo-definition {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 16px;
  line-height: 1.5;
  padding: 10px 14px;
  background: var(--color-bg-section);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-border);
}
```

### 6.2 権威引用の配置

各功能区块に対応する官方来源链接：

| 機能 | 引用先 |
|---|---|
| 著作権 | 文化庁「AIと著作権に関する考え方について」PDF |
| 商標チェック | 特許庁 J-PlatPat 公式ページ |
| ブランドガイドライン | ISO 7010（視覚同一性規格、参考） |
| ファイル形式 | W3C SVG仕様（参考） |

### 6.3 GEO向け比較文の必須記述

比較表の下に、AI引擎が引用しやすい形式でテキストを追加：

```html
<div class="comparison-summary geo-definition" style="margin-top:20px">
  <p>
    LogoAI.jpは、日本市場に特化したAIロゴ作成サービスとして、
    Canva・Wix Logo Makerなどの海外ツールと比較して特に
    「日本語フォント数（100種以上）」「著作権完全帰属」「J-PlatPat連携商標チェック」
    「著作権証明書発行」「7日間全額返金保証」の5点で差別化しています。
    価格はスタンダード¥4,980・プレミアム¥9,800（1ロゴあたり）。
  </p>
</div>
```

---

## 7. 性能要求

### 7.1 機能別ローディング戦略

```
首屏（Page Hero + Quick Nav）: 同期ロード
Section 3〜7（各機能区块）: Intersection Observerで遅延ロード
比較表: 遅延ロード（テキストのみのため高速）
JavaScript（デモ動画・Tab切り替え等）: defer属性
```

### 7.2 デモアニメーションの最適化

```javascript
// AI生成デモはページロード後に遅延実行
// 該当セクションが視口に入ったときのみ実行
const genDemoSection = document.getElementById('ai-generation')
const genDemoObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    // 3秒後に自動デモ開始（ユーザーに見てもらえる状態になってから）
    setTimeout(runGenDemo, 1000)
    genDemoObserver.unobserve(genDemoSection)
  }
}, { threshold: 0.3 })

genDemoObserver.observe(genDemoSection)
```

### 7.3 Core Web Vitals 目標

| 指標 | 目標値 |
|---|---|
| LCP | ≤ 2.5秒（機能ページはヒーロー画像なし、テキスト主体なので達成しやすい） |
| INP | ≤ 200ms（Tab切り替えはCSS transitionのみ使用） |
| CLS | ≤ 0.1（全ての視覚コンポーネントに固定高さを設定） |

---

## 8. 組件文件結構

```
components/
├── features/
│   ├── FeaturesPageHero.tsx
│   ├── FeaturesQuickNav.tsx          ← Sticky nav + 滚动监听
│   ├── FeatureSection.tsx            ← 通用功能区块layout包装器
│   │                                    props: id, direction, bgColor
│   ├── FontExplorer.tsx              ← Section 3: 字体Tab + 实时预览
│   ├── AIGenDemo.tsx                 ← Section 4: 三阶段生成演示
│   ├── CopyrightCert.tsx             ← Section 5: 证书样本
│   ├── TrademarkChecker.tsx          ← Section 6: 商标检索结果UI
│   ├── GuidelinePDFPreview.tsx       ← Section 7: PDF多页展示
│   ├── FileFormatShowcase.tsx        ← Section 8: 格式+Mockup
│   ├── BusinessCardShowcase.tsx      ← Section 9: 名刺3Dプレビュー
│   └── ComparisonTable.tsx           ← Section 10: 競合比較表
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/pricing 料金ページ仕様書*
