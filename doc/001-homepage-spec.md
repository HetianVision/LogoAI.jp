# 首页开发规格文档 `/`

> **文档用途**：交付AI开发者直接实现。所有内容、交互、SEO、样式规范均在本文档中完整定义，无需额外询问。
> **产品名称**：LogoAI.jp（占位符，开发时替换为真实产品名）
> **目标市场**：日本中小企业主、个体事业主、自由职业者
> **技术栈建议**：Next.js 14（App Router）+ Tailwind CSS + Framer Motion

---

## 目录

1. [页面整体规范](#1-页面整体规范)
2. [设计系统](#2-设计系统)
3. [页面区块详细规范](#3-页面区块详细规范)
4. [交互与动画规范](#4-交互与动画规范)
5. [SEO规范](#5-seo规范)
6. [结构化数据](#6-结构化数据)
7. [GEO优化规范](#7-geo优化规范)
8. [性能要求](#8-性能要求)
9. [响应式断点](#9-响应式断点)
10. [无障碍要求](#10-无障碍要求)

---

## 1. 页面整体规范

### 1.1 页面基本信息

| 项目 | 内容 |
|---|---|
| 路由 | `/`（首页） |
| 页面类型 | 营销落地页（Marketing Landing Page） |
| 主要目标 | 驱动用户点击「無料でロゴを作る」注册/开始使用 |
| 次要目标 | 建立信任感，消除著作权/商标顾虑 |
| 目标用户 | 日本个体经营者、小企业主、副业人群、自由职业者 |

### 1.2 页面整体布局顺序

```
┌─────────────────────────────┐
│  Navbar（固定顶部导航）       │
├─────────────────────────────┤
│  Section 1: Hero            │  ← 最关键转化区
├─────────────────────────────┤
│  Section 2: 信任带           │  ← 社会证明数字
├─────────────────────────────┤
│  Section 3: 核心价值 3列     │
├─────────────────────────────┤
│  Section 4: How It Works    │  ← 3步骤流程
├─────────────────────────────┤
│  Section 5: Logo案例展示     │  ← 行业分tab
├─────────────────────────────┤
│  Section 6: 价格预览         │
├─────────────────────────────┤
│  Section 7: 用户评价         │
├─────────────────────────────┤
│  Section 8: FAQ              │
├─────────────────────────────┤
│  Section 9: 底部CTA          │
├─────────────────────────────┤
│  Footer                     │
└─────────────────────────────┘
```

---

## 2. 设计系统

### 2.1 色彩规范

```css
:root {
  /* 主色 - 深墨绿（信赖感、日本感） */
  --color-primary: #1A3A2A;
  --color-primary-light: #2D5A3D;
  --color-primary-hover: #0F2518;

  /* 强调色 - 温暖金 */
  --color-accent: #C9963A;
  --color-accent-light: #E8B85A;
  --color-accent-hover: #A67A2E;

  /* 背景色 */
  --color-bg-base: #FAFAF7;       /* 主背景：米白 */
  --color-bg-section: #F2F0EB;    /* 交替区块背景：暖米色 */
  --color-bg-dark: #1A3A2A;       /* 深色区块（CTA等） */

  /* 文字色 */
  --color-text-primary: #1A1A1A;  /* 主文字：近黑 */
  --color-text-secondary: #5A5A5A;/* 副文字：中灰 */
  --color-text-muted: #9A9A9A;    /* 弱化文字：浅灰 */
  --color-text-inverse: #FAFAF7;  /* 深色背景上的文字 */

  /* 边框 */
  --color-border: #E0DDD6;
  --color-border-strong: #C5C2BB;

  /* 功能色 */
  --color-success: #2D7A4F;
  --color-warning: #C9963A;
  --color-error: #C0392B;
}
```

### 2.2 字体规范

```css
/* 
  日文字体优先级：
  - 标题：Noto Serif JP（明朝体，高级感）
  - 正文：Noto Sans JP（角黑体，易读）
  - 强调数字：Cormorant Garamond（欧文衬线，精致）
  
  加载方式：使用 Google Fonts，仅加载需要的字重
*/

/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Cormorant+Garamond:wght@300;400;600&display=swap');

:root {
  --font-heading: 'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho Pro', serif;
  --font-body: 'Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Meiryo', sans-serif;
  --font-number: 'Cormorant Garamond', 'Times New Roman', serif;
}
```

### 2.3 字号规范

```css
:root {
  /* 桌面端 */
  --text-xs: 0.75rem;    /* 12px - 标注、图例 */
  --text-sm: 0.875rem;   /* 14px - 辅助文字 */
  --text-base: 1rem;     /* 16px - 正文 */
  --text-lg: 1.125rem;   /* 18px - 大号正文 */
  --text-xl: 1.25rem;    /* 20px - 小标题 */
  --text-2xl: 1.5rem;    /* 24px - 卡片标题 */
  --text-3xl: 1.875rem;  /* 30px - 区块标题 */
  --text-4xl: 2.25rem;   /* 36px - 页面副标题 */
  --text-5xl: 3rem;      /* 48px - Hero副标题 */
  --text-6xl: 3.75rem;   /* 60px - Hero主标题 */
  --text-7xl: 4.5rem;    /* 72px - 超大展示文字 */

  /* 行高 */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;  /* 日文正文推荐 */
  --leading-loose: 2;
}
```

### 2.4 间距规范

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* 区块上下内边距 */
  --section-py: var(--space-24);       /* 桌面端区块padding */
  --section-py-mobile: var(--space-16); /* 移动端区块padding */

  /* 页面最大宽度 */
  --container-max: 1200px;
  --container-px: var(--space-6);
}
```

### 2.5 圆角与阴影

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 3px rgba(26,26,26,0.06), 0 1px 2px rgba(26,26,26,0.04);
  --shadow-md: 0 4px 16px rgba(26,26,26,0.08), 0 2px 6px rgba(26,26,26,0.05);
  --shadow-lg: 0 10px 40px rgba(26,26,26,0.12), 0 4px 12px rgba(26,26,26,0.06);
  --shadow-xl: 0 20px 60px rgba(26,26,26,0.16), 0 8px 24px rgba(26,26,26,0.08);
}
```

### 2.6 按钮规范

**主按钮（Primary CTA）**
```css
.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: var(--text-base);
  padding: 14px 32px;
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
}
.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
/* 大号CTA（Hero区专用） */
.btn-primary-lg {
  font-size: var(--text-lg);
  padding: 18px 48px;
}
```

**次要按钮（Secondary）**
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--text-base);
  padding: 13px 31px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}
/* 在深色背景上使用 */
.btn-secondary-inverse {
  color: var(--color-text-inverse);
  border-color: rgba(250,250,247,0.4);
}
.btn-secondary-inverse:hover {
  background: rgba(250,250,247,0.15);
  border-color: rgba(250,250,247,0.8);
}
```

---

## 3. 页面区块详细规范

---

### 3.1 Navbar（固定顶部导航）

#### 布局结构

```
┌──────────────────────────────────────────────────────┐
│ [Logo]    [ホーム] [機能] [料金] [事例] [よくある質問]  [ログイン] [無料で始める▶] │
└──────────────────────────────────────────────────────┘
```

#### 详细规范

**容器**
- 位置：`position: fixed; top: 0; left: 0; right: 0; z-index: 100`
- 高度：64px（桌面）/ 56px（移动端）
- 背景：初始状态半透明 `rgba(250,250,247,0.85)` + `backdrop-filter: blur(12px)`；滚动超过80px后切换为 `rgba(250,250,247,0.98)` + 底部边框 `1px solid var(--color-border)`
- 过渡：`transition: background 0.3s ease, box-shadow 0.3s ease`

**Logo区**
- 位置：左侧
- 内容：产品Logo图（SVG格式）+ 产品名文字
- 文字样式：`font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--color-primary)`

**导航链接**
- 位置：居中
- 链接列表（顺序）：
  1. `ホーム` → `/`
  2. `機能` → `/features`
  3. `料金` → `/pricing`
  4. `事例` → `/works`
  5. `よくある質問` → `/faq`
- 样式：`font-size: 0.9rem; font-weight: 500; color: var(--color-text-secondary); letter-spacing: 0.02em`
- Hover：`color: var(--color-primary); border-bottom: 2px solid var(--color-accent)`
- 过渡：`transition: all 0.15s ease`

**右侧操作区**
- `ログイン` 文字链接：`color: var(--color-text-secondary)`
- `無料で始める` 按钮：使用 `.btn-primary` 规范，尺寸稍小 `padding: 10px 24px; font-size: 0.9rem`

**移动端汉堡菜单**
- 触发：< 768px 时显示汉堡图标，隐藏导航链接
- 展开：全屏抽屉菜单，从右侧滑入，背景 `var(--color-bg-base)`
- 抽屉内链接：竖向排列，`font-size: 1.1rem; padding: 16px 0; border-bottom: 1px solid var(--color-border)`

---

### 3.2 Section 1：Hero区

#### 重要性
这是最重要的区块，承担80%的转化压力。用户在此决定是否继续浏览。

#### 布局结构（桌面端）

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  左侧60%内容区                右侧40%动态演示区      │
│  ──────────────               ─────────────────     │
│  [标签徽章]                   [Logo生成动画展示]     │
│                                                     │
│  [H1主标题]                   ┌───────────────────┐ │
│                               │  输入：田中製菓    │ │
│  [副标题说明]                 │  ↓ 生成中...      │ │
│                               │  [3个Logo方案]    │ │
│  [主CTA] [次级CTA]            └───────────────────┘ │
│                                                     │
│  [3个信任微标签]                                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 背景效果

- 背景色：`var(--color-bg-base)`
- 背景装饰：右上角有一个大的、低透明度（opacity: 0.06）的圆形渐变光晕，颜色 `var(--color-accent)`，半径约600px，制造氛围感
- 左下角有细线网格纹理（SVG背景图），opacity: 0.04

#### 左侧内容区

**标签徽章（Badge）**
```html
<div class="hero-badge">
  <span class="badge-dot"></span>
  <span>日本語フォント100種以上 搭載</span>
</div>
```
样式：
- 容器：`display: inline-flex; align-items: center; gap: 8px; background: rgba(201,150,58,0.1); border: 1px solid rgba(201,150,58,0.3); border-radius: var(--radius-full); padding: 6px 16px; margin-bottom: 24px`
- 点：`width: 8px; height: 8px; border-radius: 50%; background: var(--color-accent)` + 呼吸动画（pulse）
- 文字：`font-size: 0.8rem; font-weight: 500; color: var(--color-accent); letter-spacing: 0.05em`

**H1主标题**
```html
<h1>
  AIで、あなただけの<br>
  <em>ロゴ</em>を。<br>
  <span class="hero-title-sub">5分で完成、著作権もあなたのもの。</span>
</h1>
```
样式：
- H1整体：`font-family: var(--font-heading); line-height: 1.2; letter-spacing: -0.02em`
- 前两行：`font-size: var(--text-6xl); font-weight: 700; color: var(--color-text-primary)`
- `<em>` 强调字（ロゴ）：`color: var(--color-accent); font-style: normal; position: relative`，下方有手绘下划线SVG装饰
- `.hero-title-sub`（第三行）：`font-size: var(--text-2xl); font-weight: 400; color: var(--color-text-secondary); font-family: var(--font-body); letter-spacing: 0`

**副标题说明文字**
```html
<p class="hero-description">
  業種を選んで、ブランド名を入力するだけ。<br>
  100種類以上の日本語フォントから、プロ品質のロゴをAIが自動生成します。<br>
  <strong>商用利用OK・商標登録対応・全額返金保証付き。</strong>
</p>
```
样式：
- 段落：`font-size: var(--text-lg); line-height: var(--leading-relaxed); color: var(--color-text-secondary); margin: 24px 0 36px; max-width: 520px`
- `<strong>`：`color: var(--color-text-primary); font-weight: 700`

**CTA按钮组**
```html
<div class="hero-cta-group">
  <a href="/create" class="btn-primary btn-primary-lg">
    無料でロゴを作る
    <svg>→ 箭头图标</svg>
  </a>
  <a href="/pricing" class="btn-secondary">
    料金を見る
  </a>
</div>
```
样式：
- 容器：`display: flex; align-items: center; gap: 16px; flex-wrap: wrap`
- 主按钮右侧有箭头图标，大小16px

**3个信任微标签（Hero Trust Badges）**
```html
<div class="hero-trust">
  <div class="trust-item">
    <svg>✓图标</svg>
    <span>クレジットカード不要</span>
  </div>
  <div class="trust-item">
    <svg>✓图标</svg>
    <span>7日間返金保証</span>
  </div>
  <div class="trust-item">
    <svg>✓图标</svg>
    <span>著作権100%帰属</span>
  </div>
</div>
```
样式：
- 容器：`display: flex; gap: 24px; margin-top: 28px; flex-wrap: wrap`
- 每项：`display: flex; align-items: center; gap: 8px; font-size: var(--text-sm); color: var(--color-text-secondary)`
- 图标：`color: var(--color-success); width: 16px; height: 16px`

#### 右侧动态演示区

这是一个**模拟Logo生成流程的动画组件**，不是真实调用API，而是预设演示数据循环播放。

**演示组件结构**
```html
<div class="hero-demo">
  <!-- 输入阶段 -->
  <div class="demo-card demo-input">
    <div class="demo-label">ブランド名を入力</div>
    <div class="demo-input-field">
      <span class="demo-typing-text">田中製菓</span>
      <span class="cursor-blink">|</span>
    </div>
    <div class="demo-industry-tag">業種：食品・菓子</div>
  </div>

  <!-- 生成中过渡动画 -->
  <div class="demo-generating">
    <div class="generating-dots">
      <span></span><span></span><span></span>
    </div>
    <span>AIが生成中...</span>
  </div>

  <!-- 结果展示：3个Logo卡片 -->
  <div class="demo-results">
    <div class="demo-result-card active">
      <!-- Logo图片1：明朝体风格 -->
      <img src="/demo/logo-1-tanaka.svg" alt="田中製菓 ロゴ案1">
      <div class="demo-font-tag">游明朝 × ゴールド</div>
    </div>
    <div class="demo-result-card">
      <!-- Logo图片2：角黑体风格 -->
      <img src="/demo/logo-2-tanaka.svg" alt="田中製菓 ロゴ案2">
      <div class="demo-font-tag">ヒラギノ角ゴ × 深墨</div>
    </div>
    <div class="demo-result-card">
      <!-- Logo图片3：丸黑体风格 -->
      <img src="/demo/logo-3-tanaka.svg" alt="田中製菓 ロゴ案3">
      <div class="demo-font-tag">A1ゴシック × 和紙風</div>
    </div>
  </div>
</div>
```

**演示组件动画逻辑（JavaScript伪代码）**
```javascript
// 预设演示数据
const demoData = [
  { brand: '田中製菓', industry: '食品・菓子', logos: [logo1, logo2, logo3] },
  { brand: 'SAKURA法律事務所', industry: '士業・法律', logos: [logo4, logo5, logo6] },
  { brand: 'Yuki Beauty', industry: '美容サロン', logos: [logo7, logo8, logo9] },
]

// 循环流程
// 1. 打字动画（600ms）→ 显示输入内容
// 2. 停顿（800ms）
// 3. 切换到"生成中"状态（1200ms）
// 4. 逐个显示3个Logo卡片（每隔200ms stagger）
// 5. 停留4000ms
// 6. 淡出，切换下一组数据，循环
```

**演示组件样式**
```css
.hero-demo {
  position: relative;
  background: white;
  border-radius: var(--radius-2xl);
  padding: 32px;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-border);
  /* 浮动动画 */
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.demo-results {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.demo-result-card {
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  padding: 16px 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-bg-base);
}

.demo-result-card.active {
  border-color: var(--color-accent);
  background: rgba(201,150,58,0.05);
}

.demo-result-card img {
  width: 100%;
  height: 60px;
  object-fit: contain;
}

.demo-font-tag {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  margin-top: 8px;
  letter-spacing: 0.02em;
}
```

#### Hero区整体样式

```css
.hero-section {
  min-height: 100vh;
  padding: calc(64px + 80px) var(--container-px) 80px; /* 顶部留出navbar高度 */
  display: flex;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 0.75fr;
  gap: 80px;
  align-items: center;
  width: 100%;
}

/* 移动端 */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .hero-demo {
    max-width: 480px;
    margin: 0 auto;
  }
}
```

---

### 3.3 Section 2：信任带（Social Proof Bar）

#### 布局

一条横贯全宽的深色带，展示核心数字和媒体背书。

```
┌──────────────────────────────────────────────────────┐
│  [5,000社以上が利用]  │  [満足度★4.9]  │  [メディア掲載]  │
└──────────────────────────────────────────────────────┘
```

#### 详细规范

**容器**
```css
.trust-bar {
  background: var(--color-primary);
  padding: 20px var(--container-px);
  overflow: hidden;
}
.trust-bar-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  flex-wrap: wrap;
}
```

**数字项**
```html
<div class="trust-stat">
  <span class="trust-number">5,000<small>社以上</small></span>
  <span class="trust-label">ご利用実績</span>
</div>

<div class="trust-divider"></div>

<div class="trust-stat">
  <span class="trust-number">★ 4.9</span>
  <span class="trust-label">ユーザー満足度</span>
</div>

<div class="trust-divider"></div>

<div class="trust-stat">
  <span class="trust-number">2分</span>
  <span class="trust-label">平均ロゴ完成時間</span>
</div>

<div class="trust-divider"></div>

<div class="trust-media">
  <span class="trust-media-label">掲載メディア</span>
  <!-- 媒体Logo图片，灰白色处理 -->
  <div class="media-logos">
    <img src="/media/logo-1.svg" alt="メディア名1">
    <img src="/media/logo-2.svg" alt="メディア名2">
    <img src="/media/logo-3.svg" alt="メディア名3">
  </div>
</div>
```

**样式**
```css
.trust-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.trust-number {
  font-family: var(--font-number);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: -0.01em;
}
.trust-number small {
  font-size: 0.6em;
  font-family: var(--font-body);
}
.trust-label {
  font-size: var(--text-xs);
  color: rgba(250,250,247,0.6);
  letter-spacing: 0.05em;
}
.trust-divider {
  width: 1px;
  height: 32px;
  background: rgba(250,250,247,0.15);
}
.media-logos {
  display: flex;
  gap: 20px;
  align-items: center;
}
.media-logos img {
  height: 20px;
  filter: brightness(0) invert(1);
  opacity: 0.5;
}
.trust-media-label {
  font-size: var(--text-xs);
  color: rgba(250,250,247,0.5);
  letter-spacing: 0.05em;
  white-space: nowrap;
}
```

---

### 3.4 Section 3：核心价值区（Why Us）

#### 布局

```
[区块标题]
[3列价值卡片：日本語/著作権/商標]
```

#### 区块标题

```html
<div class="section-header">
  <span class="section-eyebrow">なぜ選ばれるのか</span>
  <h2>海外ツールとは違う、<br>日本のためのロゴAI</h2>
</div>
```

```css
.section-header {
  text-align: center;
  margin-bottom: 60px;
}
.section-eyebrow {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.section-header h2 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
  letter-spacing: -0.01em;
}
```

#### 3列卡片

```html
<div class="value-cards">

  <!-- 卡片1 -->
  <div class="value-card">
    <div class="value-icon">
      <!-- SVG图标：日文字体/あ字 -->
      <svg>...</svg>
    </div>
    <h3>100種類以上の日本語フォント</h3>
    <p>
      明朝体・ゴシック体・丸ゴシック・書道風まで、業種に合ったフォントをAIが自動提案。
      海外ツールでは実現できない、本格的な和文ロゴが作れます。
    </p>
    <ul class="value-list">
      <li>商用利用可能なフォントのみ厳選</li>
      <li>業種別おすすめフォント自動提案</li>
      <li>和文×欧文の最適ペアリング</li>
    </ul>
  </div>

  <!-- 卡片2（推荐高亮） -->
  <div class="value-card value-card-featured">
    <div class="value-card-badge">最重要</div>
    <div class="value-icon">
      <!-- SVG图标：证书/印章 -->
      <svg>...</svg>
    </div>
    <h3>著作権は100%あなたのもの</h3>
    <p>
      有料プランで生成したロゴの著作権は、完全にお客様に帰属します。
      商用利用、商標登録申請、全てお客様の権利として行使できます。
    </p>
    <ul class="value-list">
      <li>著作権帰属証明書PDF発行</li>
      <li>商標登録申請に利用可能</li>
      <li>第三者への譲渡・ライセンスも可能</li>
    </ul>
  </div>

  <!-- 卡片3 -->
  <div class="value-card">
    <div class="value-icon">
      <!-- SVG图标：盾牌/安全 -->
      <svg>...</svg>
    </div>
    <h3>商標リスクを事前チェック</h3>
    <p>
      生成されたロゴを特許庁データベースと照合し、類似商標の有無をスコアで表示。
      安心して商標登録できる状態でお届けします。
    </p>
    <ul class="value-list">
      <li>J-PlatPat連携の類似スコア表示</li>
      <li>類似商標が見つかった場合は別案を提案</li>
      <li>※AI判定のため法的保証ではありません</li>
    </ul>
  </div>

</div>
```

```css
.value-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.value-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 40px 32px;
  position: relative;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.value-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.value-card-featured {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.value-card-featured h3,
.value-card-featured p,
.value-card-featured li {
  color: var(--color-text-inverse);
}

.value-card-featured p {
  color: rgba(250,250,247,0.8);
}

.value-card-featured li {
  color: rgba(250,250,247,0.7);
}

.value-card-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-accent);
  color: var(--color-text-primary);
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 4px 16px;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.value-icon {
  width: 56px;
  height: 56px;
  background: rgba(201,150,58,0.1);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.value-card-featured .value-icon {
  background: rgba(250,250,247,0.1);
}

.value-icon svg {
  width: 28px;
  height: 28px;
  color: var(--color-accent);
}

.value-card h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 16px;
  line-height: 1.4;
}

.value-card p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.value-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.value-list li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  padding-left: 20px;
  position: relative;
  line-height: 1.5;
}

.value-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: 700;
}

.value-card-featured .value-list li::before {
  color: var(--color-accent);
}

/* 注意事项条目用不同样式 */
.value-list li:last-child[data-type="note"] {
  color: rgba(250,250,247,0.4);
  font-size: var(--text-xs);
}

@media (max-width: 1024px) {
  .value-cards {
    grid-template-columns: 1fr;
    max-width: 540px;
  }
}
```

---

### 3.5 Section 4：How It Works（生成流程）

#### 布局

```
[区块标题]
[横向3步骤，步骤间有箭头连线]
[底部CTA]
```

#### HTML结构

```html
<section class="how-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header">
      <span class="section-eyebrow">かんたん3ステップ</span>
      <h2>今日中に、本格ロゴが完成する</h2>
    </div>

    <div class="steps-container">
      
      <!-- Step 1 -->
      <div class="step-item">
        <div class="step-number">01</div>
        <div class="step-visual">
          <!-- 模拟UI截图：输入框界面 -->
          <div class="step-mockup step-mockup-input">
            <div class="mockup-label">ブランド名</div>
            <div class="mockup-input-field">田中製菓</div>
            <div class="mockup-label" style="margin-top:12px">業種</div>
            <div class="mockup-select">食品・菓子 ▼</div>
          </div>
        </div>
        <h3>業種・ブランド名を入力</h3>
        <p>会社名や屋号、業種を入力するだけ。難しい操作は一切不要。<strong>所要時間：約30秒</strong></p>
      </div>

      <!-- 箭头 -->
      <div class="step-arrow" aria-hidden="true">→</div>

      <!-- Step 2 -->
      <div class="step-item">
        <div class="step-number">02</div>
        <div class="step-visual">
          <div class="step-mockup step-mockup-generating">
            <div class="generating-animation">
              <!-- 旋转加载动画 + 进度条 -->
              <div class="progress-bar"><div class="progress-fill"></div></div>
              <div class="gen-text">デザインを生成中...</div>
            </div>
          </div>
        </div>
        <h3>AIがデザインを自動生成</h3>
        <p>業種・ブランド名・イメージから最適なロゴを複数案同時提案。<strong>平均2分以内</strong>で完了。</p>
      </div>

      <!-- 箭头 -->
      <div class="step-arrow" aria-hidden="true">→</div>

      <!-- Step 3 -->
      <div class="step-item">
        <div class="step-number">03</div>
        <div class="step-visual">
          <div class="step-mockup step-mockup-download">
            <!-- 模拟下载格式列表 -->
            <div class="format-list">
              <div class="format-item active">SVG</div>
              <div class="format-item">PNG</div>
              <div class="format-item">AI</div>
              <div class="format-item">PDF</div>
            </div>
            <div class="download-btn-mockup">ダウンロード ↓</div>
          </div>
        </div>
        <h3>カスタマイズ → ダウンロード</h3>
        <p>色・フォント・サイズを微調整後、SVG・AI・PNG形式で即ダウンロード。<strong>著作権証明書も同梱。</strong></p>
      </div>

    </div><!-- /steps-container -->

    <div class="how-cta">
      <a href="/create" class="btn-primary btn-primary-lg">無料でロゴを作ってみる</a>
      <p class="how-cta-note">クレジットカード不要・登録は30秒</p>
    </div>

  </div>
</section>
```

```css
.steps-container {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  margin-bottom: 60px;
}

.step-item {
  flex: 1;
  text-align: center;
  padding: 0 24px;
}

.step-arrow {
  font-size: 2rem;
  color: var(--color-accent);
  align-self: center;
  margin-top: -60px; /* 对齐到visual区域中心 */
  opacity: 0.5;
  flex-shrink: 0;
}

.step-number {
  font-family: var(--font-number);
  font-size: var(--text-5xl);
  font-weight: 300;
  color: rgba(201,150,58,0.2);
  line-height: 1;
  margin-bottom: 20px;
}

.step-visual {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.step-mockup {
  background: white;
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  width: 100%;
  max-width: 200px;
  font-size: 0.75rem;
}

.step-item h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 12px;
}

.step-item p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.step-item p strong {
  color: var(--color-primary);
}

.how-cta {
  text-align: center;
}

.how-cta-note {
  margin-top: 12px;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .steps-container {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
  .step-arrow {
    transform: rotate(90deg);
    margin-top: 0;
  }
}
```

---

### 3.6 Section 5：Logo案例展示区

#### 布局

```
[区块标题]
[行业切换Tab]
[Logo卡片网格（4列）]
[查看更多按钮]
```

#### Tab行业列表

```
美容サロン | 飲食店 | ITスタートアップ | 士業 | アパレル | 医療
（共6个tab，默认显示第1个）
```

#### HTML结构

```html
<section class="works-section">
  <div class="container">
    <div class="section-header">
      <span class="section-eyebrow">生成実例</span>
      <h2>業種別のロゴデザイン例</h2>
      <p class="section-description">全て当サービスのAIが実際に生成したロゴです。</p>
    </div>

    <!-- Tab切换 -->
    <div class="industry-tabs" role="tablist">
      <button class="tab-btn active" role="tab" data-industry="beauty">美容サロン</button>
      <button class="tab-btn" role="tab" data-industry="food">飲食店</button>
      <button class="tab-btn" role="tab" data-industry="it">IT・Web</button>
      <button class="tab-btn" role="tab" data-industry="legal">士業</button>
      <button class="tab-btn" role="tab" data-industry="apparel">アパレル</button>
      <button class="tab-btn" role="tab" data-industry="medical">医療</button>
    </div>

    <!-- Logo卡片网格 -->
    <div class="works-grid" id="works-grid">
      <!-- 每个卡片 -->
      <div class="work-card">
        <div class="work-logo-preview">
          <img src="/works/beauty-1.svg" alt="美容サロン向けロゴデザイン例1" loading="lazy">
        </div>
        <div class="work-meta">
          <span class="work-font">游明朝 × ゴールド配色</span>
          <span class="work-tag">エレガント</span>
        </div>
      </div>
      <!-- 重复8个卡片 -->
    </div>

    <div class="works-more">
      <a href="/works" class="btn-secondary">さらに多くの事例を見る</a>
    </div>
  </div>
</section>
```

```css
.industry-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 10px 24px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  background: transparent;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active,
.tab-btn:hover {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: var(--color-primary);
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}

.work-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.3s ease;
}

.work-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.work-logo-preview {
  background: var(--color-bg-base);
  padding: 32px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}

.work-logo-preview img {
  max-height: 80px;
  max-width: 100%;
  object-fit: contain;
}

.work-meta {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border);
}

.work-font {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.work-tag {
  font-size: 0.65rem;
  background: rgba(201,150,58,0.1);
  color: var(--color-accent);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-weight: 500;
}

.works-more {
  text-align: center;
}

@media (max-width: 1024px) {
  .works-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .works-grid { grid-template-columns: repeat(2, 1fr); }
}
```

**Tab切换JavaScript逻辑**
```javascript
// 点击Tab时：
// 1. 更新tab激活状态
// 2. works-grid添加淡出动画
// 3. 替换网格内容为对应行业数据
// 4. 淡入新内容

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // 更新active状态
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    
    // 获取行业数据并更新网格
    const industry = btn.dataset.industry
    updateWorksGrid(industry)
  })
})
```

---

### 3.7 Section 6：价格预览区

#### 布局

```
[区块标题]
[3列价格卡片，中间高亮]
[底部说明文字]
```

#### HTML结构

```html
<section class="pricing-preview-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header">
      <span class="section-eyebrow">料金プラン</span>
      <h2>シンプルで透明な料金体系</h2>
      <p class="section-description">隠れた費用はありません。著作権の範囲も明確に定めています。</p>
    </div>

    <div class="pricing-cards">

      <!-- 免费计划 -->
      <div class="pricing-card">
        <div class="plan-name">無料プラン</div>
        <div class="plan-price">
          <span class="price-amount">¥0</span>
        </div>
        <div class="plan-desc">まずお試しください</div>
        <ul class="plan-features">
          <li class="feature-ok">ロゴ生成 3案まで</li>
          <li class="feature-ok">PNG形式（透かし入り）</li>
          <li class="feature-ok">日本語フォント 10種</li>
          <li class="feature-no">商用利用</li>
          <li class="feature-no">著作権帰属</li>
          <li class="feature-no">SVG/AIダウンロード</li>
        </ul>
        <a href="/create" class="btn-secondary plan-btn">無料で始める</a>
      </div>

      <!-- 标准计划（推荐，高亮） -->
      <div class="pricing-card pricing-card-featured">
        <div class="plan-badge">人気No.1</div>
        <div class="plan-name">スタンダード</div>
        <div class="plan-price">
          <span class="price-amount">¥4,980</span>
          <span class="price-unit">/ 1ロゴ</span>
        </div>
        <div class="plan-desc">個人・中小企業に最適</div>
        <ul class="plan-features">
          <li class="feature-ok">ロゴ生成 無制限</li>
          <li class="feature-ok">全形式ダウンロード（SVG/PNG/PDF）</li>
          <li class="feature-ok">日本語フォント 100種以上</li>
          <li class="feature-ok">商用利用 OK</li>
          <li class="feature-ok"><strong>著作権 完全帰属・証明書PDF</strong></li>
          <li class="feature-ok">名刺レイアウト生成 1枚</li>
        </ul>
        <a href="/pricing" class="btn-primary plan-btn">このプランで始める</a>
        <p class="plan-guarantee">7日間全額返金保証付き</p>
      </div>

      <!-- 高级计划 -->
      <div class="pricing-card">
        <div class="plan-name">プレミアム</div>
        <div class="plan-price">
          <span class="price-amount">¥9,800</span>
          <span class="price-unit">/ 1ロゴ</span>
        </div>
        <div class="plan-desc">法人・ブランド確立に</div>
        <ul class="plan-features">
          <li class="feature-ok">スタンダードの全内容</li>
          <li class="feature-ok">全形式（+AI/EPS）</li>
          <li class="feature-ok"><strong>商標類似チェック機能</strong></li>
          <li class="feature-ok"><strong>ブランドガイドラインPDF生成</strong></li>
          <li class="feature-ok">名刺レイアウト 5枚</li>
          <li class="feature-ok">優先メールサポート</li>
        </ul>
        <a href="/pricing" class="btn-secondary plan-btn">このプランで始める</a>
      </div>

    </div><!-- /pricing-cards -->

    <!-- 底部说明 -->
    <div class="pricing-note">
      <svg>ℹ️图标</svg>
      <span>
        著作権について：有料プランで生成したロゴの著作権は100%お客様に帰属します。
        <a href="/copyright">詳しくはこちら →</a>
      </span>
    </div>

    <div class="pricing-cta-link">
      <a href="/pricing">全ての料金プラン詳細を見る →</a>
    </div>

  </div>
</section>
```

```css
.pricing-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: start;
  margin-bottom: 32px;
}

.pricing-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 36px 28px;
  position: relative;
}

.pricing-card-featured {
  background: var(--color-primary);
  border-color: var(--color-primary);
  transform: scale(1.04);
  box-shadow: var(--shadow-xl);
}

.plan-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-accent);
  color: var(--color-text-primary);
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 5px 20px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  letter-spacing: 0.05em;
}

.plan-name {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-secondary);
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.pricing-card-featured .plan-name {
  color: rgba(250,250,247,0.7);
}

.plan-price {
  margin-bottom: 8px;
}

.price-amount {
  font-family: var(--font-number);
  font-size: var(--text-4xl);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.pricing-card-featured .price-amount {
  color: var(--color-accent);
}

.price-unit {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.pricing-card-featured .price-unit {
  color: rgba(250,250,247,0.5);
}

.plan-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: 28px;
}

.pricing-card-featured .plan-desc {
  color: rgba(250,250,247,0.6);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-features li {
  font-size: var(--text-sm);
  padding-left: 24px;
  position: relative;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.pricing-card-featured .plan-features li {
  color: rgba(250,250,247,0.8);
}

.feature-ok::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: 700;
}

.pricing-card-featured .feature-ok::before {
  color: var(--color-accent);
}

.feature-no {
  opacity: 0.4;
}

.feature-no::before {
  content: '×';
  position: absolute;
  left: 0;
  color: var(--color-text-muted);
}

.plan-btn {
  width: 100%;
  text-align: center;
  display: block;
}

.plan-guarantee {
  text-align: center;
  font-size: var(--text-xs);
  color: rgba(250,250,247,0.5);
  margin-top: 12px;
}

.pricing-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: rgba(201,150,58,0.06);
  border: 1px solid rgba(201,150,58,0.2);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}

.pricing-note a {
  color: var(--color-accent);
  text-decoration: none;
}

.pricing-cta-link {
  text-align: center;
}
.pricing-cta-link a {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
}
.pricing-cta-link a:hover {
  color: var(--color-primary);
}

@media (max-width: 1024px) {
  .pricing-cards {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
  }
  .pricing-card-featured {
    transform: scale(1);
    order: -1; /* 移动端显示在最前 */
  }
}
```

---

### 3.8 Section 7：用户评价区

#### 布局

```
[区块标题]
[5列卡片横向滚动（桌面）/ 2列（移动端）]
```

#### 评价数据规范

每条评价必须包含：
- 评价者昵称（不需要真实姓名）
- 职业/业种
- 头像（圆形，可用彩色初始字母替代）
- 星级评分（全部★5）
- 评价正文（80-120字，必须提到具体功能）
- 使用的具体功能标签

```html
<section class="reviews-section">
  <div class="container">
    <div class="section-header">
      <span class="section-eyebrow">お客様の声</span>
      <h2>5,000社以上が選ぶ理由</h2>
    </div>

    <div class="reviews-grid">

      <div class="review-card">
        <div class="review-header">
          <div class="reviewer-avatar" style="background: #2D7A4F">田</div>
          <div class="reviewer-info">
            <div class="reviewer-name">田中さん</div>
            <div class="reviewer-role">美容サロン経営者・東京</div>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-body">
          海外のロゴツールを使っていたのですが、日本語フォントの選択肢が少なく困っていました。
          こちらは明朝体・ゴシック体など100種類以上から選べて、サロンの雰囲気にぴったりのロゴが作れました。
          著作権証明書が付いてくるのも安心です。
        </p>
        <div class="review-feature-tag">日本語フォント選択</div>
      </div>

      <div class="review-card">
        <div class="review-header">
          <div class="reviewer-avatar" style="background: #1F5C9A">鈴</div>
          <div class="reviewer-info">
            <div class="reviewer-name">鈴木さん</div>
            <div class="reviewer-role">税理士・大阪</div>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-body">
          事務所の開業に合わせてロゴを作りました。商標登録を考えていたので、
          類似商標チェック機能が特に助かりました。「登録しやすい」とスコアが出て、
          実際に商標申請も無事通りました。デザイン会社に頼む十分の一のコストで済みました。
        </p>
        <div class="review-feature-tag">商標類似チェック</div>
      </div>

      <div class="review-card">
        <div class="review-header">
          <div class="reviewer-avatar" style="background: #8B4513">山</div>
          <div class="reviewer-info">
            <div class="reviewer-name">山口さん</div>
            <div class="reviewer-role">飲食店オーナー・福岡</div>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-body">
          開業資金が限られているなか、プロっぽいロゴが欲しくて探していました。
          ロゴと同時に名刺レイアウトも生成してくれるのが便利で、
          印刷会社にそのまま入稿できるデータが揃っていました。5,000円でここまでできるとは思いませんでした。
        </p>
        <div class="review-feature-tag">名刺レイアウト生成</div>
      </div>

      <div class="review-card">
        <div class="review-header">
          <div class="reviewer-avatar" style="background: #6B21A8">中</div>
          <div class="reviewer-info">
            <div class="reviewer-name">中村さん</div>
            <div class="reviewer-role">Webデザイナー（副業）</div>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-body">
          クライアントへのロゴ提案に使っています。3案同時生成でき、
          AIが業種に合ったフォントを提案してくれるので、叩き台作りが格段に速くなりました。
          SVGデータが綺麗で、そのままIllustratorで編集できます。
        </p>
        <div class="review-feature-tag">SVGデータ品質</div>
      </div>

      <div class="review-card">
        <div class="review-header">
          <div class="reviewer-avatar" style="background: #C0392B">佐</div>
          <div class="reviewer-info">
            <div class="reviewer-name">佐藤さん</div>
            <div class="reviewer-role">ECショップ運営・名古屋</div>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-body">
          プレミアムプランでブランドガイドラインのPDFも作ってもらいました。
          カラーコードのHEX・CMYKまで入っていて、これがあれば社外デザイナーへの指示も楽です。
          デザイン会社に頼んだら20万円はかかるものが、このクオリティで手に入るとは驚きました。
        </p>
        <div class="review-feature-tag">ブランドガイドライン生成</div>
      </div>

    </div><!-- /reviews-grid -->

    <!-- 综合评分展示 -->
    <div class="reviews-summary">
      <div class="summary-score">
        <span class="score-number">4.9</span>
        <span class="score-stars">★★★★★</span>
        <span class="score-count">（500件以上の評価）</span>
      </div>
      <a href="/works#reviews" class="reviews-more-link">全ての口コミを見る →</a>
    </div>

  </div>
</section>
```

```css
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

/* 最后一个评价在移动端隐藏，桌面端第2行居中 */
.reviews-grid .review-card:nth-child(4),
.reviews-grid .review-card:nth-child(5) {
  /* 第4、5个在3列网格中的第2行 */
}

.review-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px;
  transition: box-shadow 0.3s ease;
}

.review-card:hover {
  box-shadow: var(--shadow-md);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.reviewer-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: var(--text-base);
  flex-shrink: 0;
}

.reviewer-name {
  font-weight: 700;
  font-size: var(--text-base);
  color: var(--color-text-primary);
}

.reviewer-role {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
}

.review-stars {
  margin-left: auto;
  color: var(--color-accent);
  font-size: var(--text-sm);
}

.review-body {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.review-feature-tag {
  display: inline-block;
  font-size: 0.7rem;
  background: var(--color-bg-section);
  color: var(--color-text-muted);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
}

.reviews-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.summary-score {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-number {
  font-family: var(--font-number);
  font-size: var(--text-4xl);
  font-weight: 600;
  color: var(--color-text-primary);
}

.score-stars {
  color: var(--color-accent);
  font-size: var(--text-xl);
}

.score-count {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.reviews-more-link {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
}

@media (max-width: 1024px) {
  .reviews-grid { grid-template-columns: repeat(2, 1fr); }
  .reviews-grid .review-card:nth-child(5) { display: none; }
}

@media (max-width: 640px) {
  .reviews-grid { grid-template-columns: 1fr; }
  .reviews-grid .review-card:nth-child(4),
  .reviews-grid .review-card:nth-child(5) { display: none; }
}
```

---

### 3.9 Section 8：FAQ区

#### 布局

```
[区块标题]
[2列Accordion FAQ，左右各一列]
[查看完整FAQ链接]
```

#### 5个首页FAQ问题

```html
<section class="faq-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header">
      <span class="section-eyebrow">よくある質問</span>
      <h2>ご不明な点はこちら</h2>
    </div>

    <div class="faq-grid">
      
      <!-- 左列 -->
      <div class="faq-column">

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>無料プランでも商用利用できますか？</span>
            <svg class="faq-icon">+アイコン</svg>
          </button>
          <div class="faq-answer">
            <p>
              無料プランでダウンロードしたロゴは<strong>商用利用できません</strong>。
              ウォーターマーク（透かし）が入った状態のPNGのみ提供されます。
              商用利用・商標登録をご希望の場合はスタンダードプラン（¥4,980）以上をご利用ください。
            </p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>著作権は誰のものになりますか？</span>
            <svg class="faq-icon">+アイコン</svg>
          </button>
          <div class="faq-answer">
            <p>
              <strong>有料プランで生成・ダウンロードしたロゴの著作権は、100%お客様に帰属します。</strong>
              当社は一切の権利を主張しません。著作権帰属証明書PDFも発行します。
              なお、無料プランで生成したロゴの著作権は当社に帰属します。
            </p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>商標登録はできますか？</span>
            <svg class="faq-icon">+アイコン</svg>
          </button>
          <div class="faq-answer">
            <p>
              有料プランで生成したロゴは商標登録申請に使用できます。
              ただし、類似する先行商標が存在する場合は登録が認められないことがあります。
              プレミアムプランの<strong>商標類似チェック機能</strong>で事前にリスクを確認することをお勧めします。
              なお、AIによる判定は法的保証ではありませんので、重要な判断は弁理士にご相談ください。
            </p>
          </div>
        </div>

      </div>

      <!-- 右列 -->
      <div class="faq-column">

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>生成されたロゴは他のユーザーと被りませんか？</span>
            <svg class="faq-icon">+アイコン</svg>
          </button>
          <div class="faq-answer">
            <p>
              お客様が入力したブランド名・業種・デザインイメージの組み合わせに基づいてAIが生成するため、
              <strong>全く同一のロゴが生成される可能性は極めて低い</strong>設計です。
              また有料プランでは生成日時・入力情報を記録した「生成唯一性証明書」も発行します。
            </p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>どんなファイル形式でダウンロードできますか？</span>
            <svg class="faq-icon">+アイコン</svg>
          </button>
          <div class="faq-answer">
            <p>
              プランによって異なります。スタンダードプランはSVG・PNG（透過・300dpi）・PDF（印刷用）、
              プレミアムプランはこれに加えてAdobe Illustrator形式（.ai）・EPS形式も含まれます。
              いずれも印刷会社への入稿データとしてご利用いただけます。
            </p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>入力したデータはAIの学習に使われますか？</span>
            <svg class="faq-icon">+アイコン</svg>
          </button>
          <div class="faq-answer">
            <p>
              <strong>お客様のブランド名・会社名・生成されたロゴデータは、AIモデルの学習には一切使用しません。</strong>
              また、第三者への販売・提供も行いません。
              詳細はプライバシーポリシーをご確認ください。
            </p>
          </div>
        </div>

      </div>

    </div><!-- /faq-grid -->

    <div class="faq-more">
      <a href="/faq" class="btn-secondary">全ての質問を見る（30問以上）</a>
    </div>
  </div>
</section>
```

```css
.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 48px;
  margin-bottom: 48px;
}

.faq-item {
  border-bottom: 1px solid var(--color-border);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  gap: 16px;
  transition: color 0.2s ease;
}

.faq-question:hover {
  color: var(--color-primary);
}

.faq-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-accent);
  transition: transform 0.3s ease;
}

.faq-question[aria-expanded="true"] .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  display: none;
  padding: 0 0 20px;
}

.faq-answer.open {
  display: block;
  animation: fadeInDown 0.2s ease;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.faq-answer p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.faq-answer strong {
  color: var(--color-text-primary);
}

.faq-more {
  text-align: center;
}

@media (max-width: 768px) {
  .faq-grid { grid-template-columns: 1fr; }
}
```

**FAQ JavaScript**
```javascript
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true'
    const answer = btn.nextElementSibling
    
    // 关闭所有其他
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false')
      b.nextElementSibling.classList.remove('open')
    })
    
    // 切换当前
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true')
      answer.classList.add('open')
    }
  })
})
```

---

### 3.10 Section 9：底部CTA区

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card">
      <!-- 背景装饰：右侧大圆形光晕 -->
      <div class="final-cta-decoration" aria-hidden="true"></div>
      
      <div class="final-cta-content">
        <h2>あなたのブランドにふさわしいロゴを、今日中に。</h2>
        <p>クレジットカード不要。登録30秒。まずは無料でお試しください。</p>
        <div class="final-cta-buttons">
          <a href="/create" class="btn-primary btn-primary-lg">
            無料でロゴを作る →
          </a>
          <a href="/works" class="btn-secondary-inverse">
            作成事例を見る
          </a>
        </div>
        <!-- 3个小信任标签 -->
        <div class="final-trust">
          <span>✓ 著作権完全帰属</span>
          <span>✓ 7日間返金保証</span>
          <span>✓ 日本語フォント100種以上</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.final-cta-section {
  padding: var(--section-py) var(--container-px);
}

.final-cta-card {
  background: var(--color-primary);
  border-radius: var(--radius-2xl);
  padding: 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  max-width: var(--container-max);
  margin: 0 auto;
}

.final-cta-decoration {
  position: absolute;
  right: -100px;
  top: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(201,150,58,0.15), transparent 70%);
  pointer-events: none;
}

.final-cta-content {
  position: relative;
  z-index: 1;
}

.final-cta-card h2 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-inverse);
  line-height: 1.3;
  margin-bottom: 16px;
}

.final-cta-card p {
  font-size: var(--text-lg);
  color: rgba(250,250,247,0.7);
  margin-bottom: 40px;
}

.final-cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.final-trust {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.final-trust span {
  font-size: var(--text-sm);
  color: rgba(250,250,247,0.5);
}

@media (max-width: 768px) {
  .final-cta-card {
    padding: 48px 24px;
  }
  .final-cta-card h2 {
    font-size: var(--text-3xl);
  }
}
```

---

### 3.11 Footer

```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      
      <!-- 左侧品牌区 -->
      <div class="footer-brand">
        <a href="/" class="footer-logo">LogoAI.jp</a>
        <p class="footer-tagline">
          日本語に特化したAIロゴ作成サービス。<br>
          個人事業主から中小企業まで5,000社以上に選ばれています。
        </p>
        <div class="footer-social">
          <a href="#" aria-label="Twitter/X">X</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="note">note</a>
        </div>
      </div>

      <!-- 右侧链接区 -->
      <div class="footer-links">
        <div class="footer-col">
          <h4>サービス</h4>
          <ul>
            <li><a href="/features">機能一覧</a></li>
            <li><a href="/pricing">料金プラン</a></li>
            <li><a href="/works">作成事例</a></li>
            <li><a href="/create">ロゴを作る</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>業種別</h4>
          <ul>
            <li><a href="/industry/beauty">美容サロン</a></li>
            <li><a href="/industry/restaurant">飲食店</a></li>
            <li><a href="/industry/it">IT・Web</a></li>
            <li><a href="/industry/legal">士業</a></li>
            <li><a href="/industry/medical">医療</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>サポート</h4>
          <ul>
            <li><a href="/faq">よくある質問</a></li>
            <li><a href="/copyright">著作権について</a></li>
            <li><a href="/trademark">商標について</a></li>
            <li><a href="/blog">ブログ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>会社情報</h4>
          <ul>
            <li><a href="/about">会社概要</a></li>
            <li><a href="/terms">利用規約</a></li>
            <li><a href="/privacy">プライバシーポリシー</a></li>
            <li><a href="/tokutei">特定商取引法</a></li>
            <li><a href="/contact">お問い合わせ</a></li>
          </ul>
        </div>
      </div>

    </div>

    <!-- GEO优化：纯文字产品说明段落 -->
    <div class="footer-geo-text">
      <p>
        LogoAI.jpは、日本市場に特化したAIロゴ作成サービスです。
        100種類以上の商用利用可能な日本語フォント、日本特許庁データベースとの商標類似チェック機能、
        著作権完全帰属証明書の発行を特徴とし、個人事業主・中小企業・フリーランスのブランディングをサポートします。
        スタンダードプランは¥4,980（1ロゴ）、プレミアムプランは¥9,800（商標チェック・ブランドガイドライン付）。
        全プラン7日間全額返金保証付き。
      </p>
    </div>

    <div class="footer-bottom">
      <p class="footer-copyright">© 2025 LogoAI.jp All rights reserved.</p>
      <div class="footer-badges">
        <!-- SSL/セキュリティバッジ -->
        <img src="/badges/ssl.svg" alt="SSL認証済み" height="24">
        <img src="/badges/payment-secure.svg" alt="セキュア決済" height="24">
      </div>
    </div>

  </div>
</footer>
```

```css
.site-footer {
  background: var(--color-text-primary);
  color: var(--color-text-inverse);
  padding: 64px var(--container-px) 32px;
}

.footer-top {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 80px;
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(250,250,247,0.1);
}

.footer-logo {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-inverse);
  text-decoration: none;
  display: block;
  margin-bottom: 16px;
}

.footer-tagline {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: rgba(250,250,247,0.5);
  margin-bottom: 24px;
}

.footer-social {
  display: flex;
  gap: 16px;
}

.footer-social a {
  font-size: var(--text-sm);
  color: rgba(250,250,247,0.4);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-social a:hover {
  color: var(--color-accent);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.footer-col h4 {
  font-size: var(--text-xs);
  font-weight: 700;
  color: rgba(250,250,247,0.4);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col a {
  font-size: var(--text-sm);
  color: rgba(250,250,247,0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: var(--color-text-inverse);
}

/* GEO文字区域 */
.footer-geo-text {
  padding: 24px 0;
  border-top: 1px solid rgba(250,250,247,0.1);
  border-bottom: 1px solid rgba(250,250,247,0.1);
  margin-bottom: 24px;
}

.footer-geo-text p {
  font-size: var(--text-xs);
  line-height: var(--leading-relaxed);
  color: rgba(250,250,247,0.3);
  max-width: 800px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-copyright {
  font-size: var(--text-xs);
  color: rgba(250,250,247,0.3);
}

.footer-badges {
  display: flex;
  gap: 12px;
  align-items: center;
  opacity: 0.4;
}

@media (max-width: 1024px) {
  .footer-top { grid-template-columns: 1fr; gap: 40px; }
  .footer-links { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .footer-links { grid-template-columns: repeat(2, 1fr); }
}
```

---

## 4. 交互与动画规范

### 4.1 页面加载动画（入场动画）

所有可见区块元素在进入视口时触发入场动画，使用 Intersection Observer API。

```javascript
// 通用进场动画初始化
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target) // 只执行一次
    }
  })
}, { threshold: 0.1 })

// 监听所有带 animate-on-scroll class 的元素
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el)
})
```

```css
/* 基础状态（不可见） */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* 激活状态（可见） */
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 错开延迟（用于卡片群组） */
.animate-stagger > *:nth-child(1) { transition-delay: 0s; }
.animate-stagger > *:nth-child(2) { transition-delay: 0.1s; }
.animate-stagger > *:nth-child(3) { transition-delay: 0.2s; }
.animate-stagger > *:nth-child(4) { transition-delay: 0.3s; }
.animate-stagger > *:nth-child(5) { transition-delay: 0.4s; }
```

**需要添加 `animate-on-scroll animate-stagger` 的容器：**
- `.value-cards`（3个价值卡片）
- `.steps-container`（3步骤）
- `.works-grid`（Logo案例网格）
- `.pricing-cards`（3个价格卡片）
- `.reviews-grid`（评价卡片）

### 4.2 Navbar滚动行为

```javascript
const navbar = document.querySelector('.navbar')
let lastScrollY = 0

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY
  
  // 超过80px添加实底背景
  if (scrollY > 80) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
  
  // 向下滚动超过200px时隐藏navbar（可选）
  if (scrollY > lastScrollY && scrollY > 200) {
    navbar.classList.add('hidden')
  } else {
    navbar.classList.remove('hidden')
  }
  
  lastScrollY = scrollY
}, { passive: true })
```

```css
.navbar.scrolled {
  background: rgba(250,250,247,0.98);
  box-shadow: 0 1px 0 var(--color-border);
}

.navbar.hidden {
  transform: translateY(-100%);
}
/* Navbar过渡 */
.navbar {
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
```

### 4.3 数字计数动画（信任带）

```javascript
// 当信任带进入视口时，数字从0动态计数到目标值
function animateCounter(el, target, duration = 1500) {
  let start = 0
  const step = target / (duration / 16)
  
  const timer = setInterval(() => {
    start += step
    if (start >= target) {
      el.textContent = target.toLocaleString('ja-JP')
      clearInterval(timer)
    } else {
      el.textContent = Math.floor(start).toLocaleString('ja-JP')
    }
  }, 16)
}
// 触发条件：trust-bar 进入视口
```

### 4.4 平滑滚动

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* 为fixed navbar留出空间 */
}
```

---

## 5. SEO规范

### 5.1 HTML head 完整配置

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary SEO -->
  <title>AIロゴ作成ツール | 日本語フォント100種・著作権帰属・商標対応【LogoAI.jp】</title>
  <meta name="description" content="AIで本格的なロゴを5分で作成。100種類以上の日本語フォント、商用利用OK、著作権完全帰属。特許庁データベースとの商標類似チェック機能付き。7日間全額返金保証。無料から試せます。">
  <meta name="keywords" content="AIロゴ作成,ロゴ作成無料,日本語ロゴ,商用利用ロゴ,著作権ロゴ,ロゴジェネレーター,ブランドロゴ作成,個人事業主ロゴ">
  
  <!-- Canonical -->
  <link rel="canonical" href="https://logoai.jp/">
  
  <!-- Hreflang（只有日文版时仅设置ja） -->
  <link rel="alternate" hreflang="ja" href="https://logoai.jp/">
  <link rel="alternate" hreflang="x-default" href="https://logoai.jp/">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://logoai.jp/">
  <meta property="og:title" content="AIロゴ作成ツール | 日本語フォント100種・著作権帰属【LogoAI.jp】">
  <meta property="og:description" content="AIで本格的なロゴを5分で作成。日本語フォント100種以上、著作権完全帰属、商標類似チェック付き。">
  <meta property="og:image" content="https://logoai.jp/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:site_name" content="LogoAI.jp">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@logoai_jp">
  <meta name="twitter:title" content="AIロゴ作成ツール | 日本語フォント100種・著作権帰属">
  <meta name="twitter:description" content="AIで本格的なロゴを5分で作成。日本語フォント100種以上、著作権完全帰属。">
  <meta name="twitter:image" content="https://logoai.jp/og-image.png">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  
  <!-- Fonts（仅加载需要的字重） -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@600;700&family=Noto+Sans+JP:wght@400;500;700&family=Cormorant+Garamond:wght@300;600&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@600;700&family=Noto+Sans+JP:wght@400;500;700&family=Cormorant+Garamond:wght@300;600&display=swap">
  
  <!-- Critical CSS inline（放置关键首屏样式） -->
  <style>
    /* 关键渲染路径CSS内联此处，防止FOUC */
    /* 包含：:root变量 / body基础样式 / navbar / hero基础布局 */
  </style>
  
</head>
```

### 5.2 页面内关键词布局规则

| 位置 | 必须包含的关键词 |
|---|---|
| H1 | AIロゴ + 著作権 |
| H2（第一个） | 日本語フォント 或 日本のためのロゴAI |
| H2（Section 4） | ロゴ作成 + ステップ/方法 |
| Alt文字 | [行业名]向けロゴデザイン例 |
| Footer说明段 | AIロゴ作成サービス + 個人事業主 + 中小企業 |
| URL | `/`（首页不含关键词，正确） |

### 5.3 内部链接规范

首页必须包含以下内部链接（确保全站链接覆盖）：

| 锚文本 | 目标页面 |
|---|---|
| 機能一覧 | /features |
| 料金プラン | /pricing |
| よくある質問 | /faq |
| 美容サロン向けロゴ | /industry/beauty |
| 飲食店向けロゴ | /industry/restaurant |
| IT・Web向けロゴ | /industry/it |
| 士業向けロゴ | /industry/legal |
| 著作権について | /copyright |
| 商標について | /trademark |
| 全ての事例を見る | /works |
| 全ての質問を見る | /faq |

---

## 6. 结构化数据

在 `<head>` 中以 JSON-LD 格式注入以下所有Schema。

### 6.1 Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LogoAI.jp",
  "url": "https://logoai.jp",
  "logo": "https://logoai.jp/logo.svg",
  "description": "日本語に特化したAIロゴ作成サービス。100種類以上の商用利用可能な日本語フォント、商標類似チェック、著作権完全帰属証明書発行。",
  "foundingLocation": {
    "@type": "Place",
    "addressCountry": "JP"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Japanese",
    "email": "support@logoai.jp"
  },
  "sameAs": [
    "https://twitter.com/logoai_jp",
    "https://www.instagram.com/logoai_jp",
    "https://note.com/logoai_jp"
  ]
}
```

### 6.2 SoftwareApplication Schema

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "LogoAI.jp",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "url": "https://logoai.jp",
  "description": "AIで日本語ロゴを自動生成するWebアプリケーション。100種類以上の日本語フォント対応、著作権帰属証明書発行、商標類似チェック機能付き。",
  "offers": [
    {
      "@type": "Offer",
      "name": "無料プラン",
      "price": "0",
      "priceCurrency": "JPY",
      "description": "PNG形式（透かし入り）、3案まで生成"
    },
    {
      "@type": "Offer",
      "name": "スタンダードプラン",
      "price": "4980",
      "priceCurrency": "JPY",
      "description": "SVG/PNG/PDF全形式、著作権完全帰属、商用利用OK"
    },
    {
      "@type": "Offer",
      "name": "プレミアムプラン",
      "price": "9800",
      "priceCurrency": "JPY",
      "description": "全形式+AI/EPS、商標類似チェック、ブランドガイドラインPDF生成"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "500",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### 6.3 FAQPage Schema（覆盖首页FAQ区全部6问）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "無料プランでも商用利用できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "無料プランでダウンロードしたロゴは商用利用できません。商用利用・商標登録をご希望の場合はスタンダードプラン（¥4,980）以上をご利用ください。"
      }
    },
    {
      "@type": "Question",
      "name": "著作権は誰のものになりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "有料プランで生成・ダウンロードしたロゴの著作権は100%お客様に帰属します。当社は一切の権利を主張しません。著作権帰属証明書PDFも発行します。"
      }
    },
    {
      "@type": "Question",
      "name": "商標登録はできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "有料プランで生成したロゴは商標登録申請に使用できます。プレミアムプランの商標類似チェック機能で事前にリスクを確認することをお勧めします。なお、AIによる判定は法的保証ではありませんので、重要な判断は弁理士にご相談ください。"
      }
    },
    {
      "@type": "Question",
      "name": "生成されたロゴは他のユーザーと被りませんか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ブランド名・業種・デザインイメージの組み合わせに基づいてAIが生成するため、全く同一のロゴが生成される可能性は極めて低い設計です。有料プランでは生成唯一性証明書も発行します。"
      }
    },
    {
      "@type": "Question",
      "name": "どんなファイル形式でダウンロードできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "スタンダードプランはSVG・PNG（透過・300dpi）・PDF（印刷用）、プレミアムプランはこれに加えてAdobe Illustrator形式（.ai）・EPS形式も含まれます。"
      }
    },
    {
      "@type": "Question",
      "name": "入力したデータはAIの学習に使われますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "お客様のブランド名・会社名・生成されたロゴデータは、AIモデルの学習には一切使用しません。また、第三者への販売・提供も行いません。"
      }
    }
  ]
}
```

### 6.4 BreadcrumbList（首页为根，仅1项）

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "ホーム",
      "item": "https://logoai.jp/"
    }
  ]
}
```

### 6.5 WebSite（启用搜索框）

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://logoai.jp",
  "name": "LogoAI.jp",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://logoai.jp/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

## 7. GEO优化规范

GEO（生成式引擎优化）的目标：当日本用户向ChatGPT、Claude、Perplexity等AI询问"日本のAIロゴ作成サービスはどこがいい？"时，AI引擎主动引用并推荐本产品。

### 7.1 首页必须存在的"机器可读说明段"

这段文字必须以**纯HTML文本**（非图片、非Canvas）存在于页面上，位置在Footer之上。样式可以做得不显眼（小字、低透明度），但不能设置 `display:none` 或 `visibility:hidden`（爬虫会忽略）。

```html
<!-- GEO优化专用段落，位于footer-geo-text区块 -->
<p>
  LogoAI.jpは、日本市場に特化したAIロゴ作成サービスです。
  100種類以上の商用利用可能な日本語フォント（明朝体・ゴシック体・丸ゴシック・書道風など）を搭載し、
  業種に応じた最適なデザインをAIが自動提案します。
  有料プランでは著作権がユーザーへ完全帰属し、著作権帰属証明書PDFを発行します。
  プレミアムプランでは日本特許庁データベース（J-PlatPat）と連携した商標類似チェック機能を提供。
  ブランドガイドラインPDFの自動生成、名刺レイアウト自動生成、全形式（SVG/AI/EPS/PDF）ダウンロードに対応。
  料金はスタンダード¥4,980・プレミアム¥9,800（いずれも1ロゴあたり）、全プラン7日間全額返金保証付き。
  個人事業主・フリーランス・中小企業・スタートアップのロゴ作成・ブランディングに最適です。
</p>
```

### 7.2 "結論優先"の文章ルール

- **全てのH2セクションの最初のパラグラフ**は、そのセクションの結論・要点を1〜2文で最初に述べる
- 背景説明・前置きは禁止
- AI引擎はページを「上から読む」ため、最初の文章が引用される確率が最も高い

### 7.3 権威ある外部リンク

以下のリンクをページ内の関連箇所（FAQ回答内、または著作権说明区域）に含める：

```html
<!-- 著作権FAQの回答内 -->
<a href="https://www.bunka.go.jp/seisaku/chosakuken/pdf/93903601_01.pdf" 
   rel="noopener noreferrer" target="_blank">
   文化庁「AIと著作権に関する考え方について」
</a>

<!-- 商標FAQの回答内 -->
<a href="https://www.j-platpat.inpit.go.jp/" 
   rel="noopener noreferrer" target="_blank">
   特許庁 J-PlatPat（商標検索）
</a>
```

### 7.4 GEO向けの構造化コンテンツルール

| ルール | 実装方法 |
|---|---|
| 定義形式で書く | 「〇〇とは〜です」という形式を使う |
| 数字は具体的に | 「多くの」ではなく「100種類以上」「¥4,980」 |
| 比較要素を含める | 「海外ツールとの違い」セクションを設ける |
| FAQ形式のQAを含める | FAQPage Schemaと合わせて実装 |
| 更新日を明示する | `<meta name="last-modified" content="2025-XX-XX">` |

---

## 8. 性能要求

### 8.1 Core Web Vitals 目標値

| 指標 | 目標値 | 測定ツール |
|---|---|---|
| LCP（最大コンテンツ描画） | ≤ 2.5秒 | PageSpeed Insights |
| INP（インタラクション応答） | ≤ 200ms | Chrome DevTools |
| CLS（累積レイアウトシフト） | ≤ 0.1 | Web Vitals拡張機能 |
| FCP（初回コンテンツ描画） | ≤ 1.8秒 | Lighthouse |
| TTFB（初回バイト受信） | ≤ 800ms | WebPageTest |

### 8.2 具体実装項目

**LCP最適化（Hero画像）**
```html
<!-- Hero部分の画像はpreloadで先読み -->
<link rel="preload" as="image" href="/hero/demo-preview.webp" fetchpriority="high">
<!-- Hero imageタグにはloading="eager" -->
<img src="/hero/demo-preview.webp" loading="eager" fetchpriority="high" 
     width="600" height="480" alt="AIロゴ生成デモ画面">
```

**CLS防止**
```css
/* 全ての画像にwidth/heightを明示（または aspect-ratio） */
img {
  width: 100%;
  height: auto;
}
/* フォントロード時のCLS防止 */
@font-face {
  font-display: swap; /* FOUTを許容してCLSを回避 */
}
/* Navbarの高さを予約 */
body {
  padding-top: 64px; /* Navbar height */
}
```

**JavaScriptの遅延読み込み**
```html
<!-- ファーストビュー不要なスクリプトはdefer -->
<script src="/js/demo-animation.js" defer></script>
<script src="/js/reviews-carousel.js" defer></script>
<!-- Analyticsは最後に -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
```

---

## 9. 响应式断点

```css
/* ブレークポイント定義 */
/* xs: < 480px   スマートフォン縦持ち */
/* sm: 480-640px  スマートフォン横持ち */
/* md: 640-768px  大きめスマートフォン */
/* lg: 768-1024px タブレット */
/* xl: 1024-1280px 小型デスクトップ */
/* 2xl: > 1280px  デスクトップ */

/* 各セクションの列変化 */
/* Hero: 2列(xl以上) → 1列(lg以下) */
/* 価値カード: 3列(xl以上) → 1列(lg以下) */
/* ステップ: 3列(md以上) → 縦並び(md以下) */
/* Worksグリッド: 4列 → 3列(lg) → 2列(sm) */
/* 料金カード: 3列 → 1列(lg以下) */
/* レビュー: 3列 → 2列(lg) → 1列(sm) */
/* FAQ: 2列 → 1列(md以下) */
/* Footer: 2段 → 1段(lg以下) */
```

**移動端特別注意事項：**
- Navbarはハンバーガーメニューに切り替える（< 768px）
- Hero CTAボタンは縦並び（< 640px）
- フォントサイズはH1を `clamp(2rem, 5vw, 3.75rem)` で流動的に
- タップターゲットは最小44×44px確保
- 横スクロールを発生させない（`overflow-x: hidden` を body に設定）

---

## 10. 无障碍要求

### 10.1 必須対応項目

```html
<!-- スキップナビゲーション（スクリーンリーダー向け） -->
<a href="#main-content" class="skip-link">メインコンテンツへスキップ</a>

<!-- メインコンテンツのランドマーク -->
<main id="main-content" role="main">

<!-- セクションにaria-labelを付与 -->
<section aria-label="ヒーローセクション">
<section aria-label="核心価値">
<section aria-label="ご利用方法">
```

### 10.2 インタラクティブ要素

```html
<!-- FAQ：aria-expanded必須 -->
<button class="faq-question" aria-expanded="false" aria-controls="faq-answer-1">
  質問テキスト
</button>
<div id="faq-answer-1" role="region" aria-labelledby="faq-q-1">

<!-- Tab切换：role必須 -->
<div role="tablist" aria-label="業種別ロゴ例">
  <button role="tab" aria-selected="true" aria-controls="tab-beauty" id="tab-btn-beauty">
    美容サロン
  </button>
  <div role="tabpanel" id="tab-beauty" aria-labelledby="tab-btn-beauty">

<!-- 全ての画像にalt -->
<img src="..." alt="美容サロン向けAI生成ロゴデザイン例（明朝体・ゴールド配色）">
```

### 10.3 カラーコントラスト要件

| 要素 | 背景 | 文字色 | コントラスト比 | 基準 |
|---|---|---|---|---|
| 本文 | #FAFAF7 | #1A1A1A | 18.8:1 | WCAG AA ✓ |
| 副テキスト | #FAFAF7 | #5A5A5A | 7.4:1 | WCAG AA ✓ |
| 主ボタン | #C9963A | #1A1A1A | 5.9:1 | WCAG AA ✓ |
| フッター本文 | #1A1A1A | rgba白60% | 5.1:1 | WCAG AA ✓ |

---

## 付録：ファイル構成（Next.js App Router想定）

```
app/
├── page.tsx                    # 首页（本文档对应）
├── layout.tsx                  # 全局Layout（Navbar + Footer）
├── globals.css                 # 本文档2章の CSS変数全て
components/
├── navbar/
│   └── Navbar.tsx
├── home/
│   ├── HeroSection.tsx         # 3.2
│   ├── HeroDemo.tsx            # Hero右侧动态演示组件
│   ├── TrustBar.tsx            # 3.3
│   ├── ValueCards.tsx          # 3.4
│   ├── HowItWorks.tsx          # 3.5
│   ├── WorksShowcase.tsx       # 3.6
│   ├── PricingPreview.tsx      # 3.7
│   ├── Reviews.tsx             # 3.8
│   └── HomeFAQ.tsx             # 3.9
├── ui/
│   ├── Button.tsx
│   ├── SectionHeader.tsx
│   └── AnimateOnScroll.tsx     # 通用进场动画包装器
├── footer/
│   └── Footer.tsx
public/
├── demo/                       # Hero演示用Logo SVG
├── works/                      # 案例展示Logo
├── media/                      # 媒体Logo
├── badges/                     # SSL等徽章
└── og-image.png                # OGP图像（1200×630px）
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/features 機能ページ仕様書*
