# 行业落地页模板规格书 `/industry/[業種]`

> **文档用途**：交付AI开发者直接实现。一套模板，47个行业页面全部复用。
> **路由规则**：`/industry/[slug]`，例如 `/industry/restaurant`、`/industry/beauty`
> **页面类型**：SEO行業特化ランディングページ
> **战略定位**：「[業種] ロゴ 作成」「[業種] ロゴ AI」等の检索流量を獲得し、
>               業種別に最適化された訴求で転換率を最大化する。

---

## 1. 路由与数据结构

### 1.1 静态路径生成（Next.js generateStaticParams）

```typescript
// app/industry/[slug]/page.tsx

export async function generateStaticParams() {
  return INDUSTRY_LIST.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const industry = INDUSTRY_LIST.find(i => i.slug === params.slug)
  if (!industry) notFound()
  return {
    title: `${industry.name}のロゴ作成 | AI生成・著作権証明書付き【LogoAI.jp】`,
    description: `${industry.name}向けAIロゴ作成。日本語フォント100種以上、${industry.sampleCount}件以上の事例、著作権完全帰属。最短10分・7日間全額返金保証。`,
    canonical: `https://logoai.jp/industry/${industry.slug}`,
  }
}
```

### 1.2 IndustryData 型定義

```typescript
interface IndustryData {
  slug: string                    // URL用スラッグ（英字）
  name: string                    // 日本語業種名 e.g. "飲食店"
  nameEn: string                  // 英語 e.g. "Restaurant"
  tagline: string                 // ヒーロー見出し補助
  heroTitle: string               // H1テキスト（テンプレート変数あり）
  heroDesc: string                // ヒーロー説明文（150字以内）
  painPoints: PainPoint[]         // 課題3つ
  features: IndustryFeature[]     // 業種特化機能4つ
  fontRecommendations: FontRec[]  // 推奨フォント3種
  colorPalettes: ColorPalette[]   // 推奨カラー4パレット
  worksItems: string[]            // /works から絞り込まれたロゴID（最大12個）
  faqs: FAQItem[]                 // 業種特化FAQ 4問
  sampleCount: number             // 事例数
  relatedIndustries: string[]     // 関連業種スラッグ 3個
  keywords: string[]              // SEO検索クエリ（主要5個）
  schemaType: string              // Schema.org業種分類
}

interface PainPoint {
  icon: string    // emoji
  title: string
  desc: string
}

interface FontRec {
  name: string
  style: string     // "游明朝" 等フォント名
  reason: string    // このフォントを選ぶ理由
  preview: string   // プレビュー表示用サンプルテキスト
}

interface ColorPalette {
  name: string      // "和モダン" 等パレット名
  colors: string[]  // HEX × 3
  mood: string      // "伝統と信頼感"
}
```

### 1.3 47業種データ一覧（全スラッグ）

```typescript
export const INDUSTRY_LIST: IndustryData[] = [
  // === 飲食 ===
  { slug: 'restaurant',    name: '飲食店・レストラン', nameEn: 'Restaurant' },
  { slug: 'cafe',          name: 'カフェ・喫茶店',     nameEn: 'Cafe' },
  { slug: 'izakaya',       name: '居酒屋・バー',        nameEn: 'Izakaya' },
  { slug: 'ramen',         name: 'ラーメン店',          nameEn: 'Ramen' },
  { slug: 'sushi',         name: '寿司・和食',          nameEn: 'Sushi' },
  { slug: 'bakery',        name: 'パン・ベーカリー',    nameEn: 'Bakery' },
  { slug: 'sweets',        name: 'スイーツ・菓子',      nameEn: 'Sweets' },
  // === 美容・ウェルネス ===
  { slug: 'beauty-salon',  name: '美容室・ヘアサロン',  nameEn: 'Hair Salon' },
  { slug: 'nail-salon',    name: 'ネイルサロン',        nameEn: 'Nail Salon' },
  { slug: 'esthetic',      name: 'エステ・スパ',        nameEn: 'Esthetic' },
  { slug: 'yoga',          name: 'ヨガ・フィットネス',  nameEn: 'Yoga' },
  { slug: 'barber',        name: '理容室・バーバー',    nameEn: 'Barber' },
  // === IT・デジタル ===
  { slug: 'it-startup',    name: 'IT・スタートアップ',  nameEn: 'IT Startup' },
  { slug: 'web-design',    name: 'Web制作・デザイン',   nameEn: 'Web Design' },
  { slug: 'app-dev',       name: 'アプリ開発',          nameEn: 'App Dev' },
  { slug: 'saas',          name: 'SaaS・クラウド',      nameEn: 'SaaS' },
  // === 士業・専門職 ===
  { slug: 'lawyer',        name: '弁護士・法律事務所',  nameEn: 'Law Firm' },
  { slug: 'accountant',    name: '税理士・会計士',      nameEn: 'Accountant' },
  { slug: 'judicial-scrivener', name: '司法書士',       nameEn: 'Judicial Scrivener' },
  { slug: 'labor-consult', name: '社労士',              nameEn: 'Labor Consultant' },
  { slug: 'patent-attorney', name: '弁理士',            nameEn: 'Patent Attorney' },
  // === 医療・健康 ===
  { slug: 'clinic',        name: 'クリニック・医院',    nameEn: 'Clinic' },
  { slug: 'dental',        name: '歯科・デンタル',      nameEn: 'Dental' },
  { slug: 'pharmacy',      name: '薬局・調剤',          nameEn: 'Pharmacy' },
  { slug: 'counseling',    name: '心理・カウンセリング', nameEn: 'Counseling' },
  // === 教育 ===
  { slug: 'education',     name: '学習塾・教育',        nameEn: 'Education' },
  { slug: 'language',      name: '語学スクール',        nameEn: 'Language School' },
  { slug: 'music',         name: '音楽教室',            nameEn: 'Music School' },
  { slug: 'kids',          name: '子ども向け・保育',    nameEn: 'Kids' },
  // === 不動産・建設 ===
  { slug: 'real-estate',   name: '不動産',              nameEn: 'Real Estate' },
  { slug: 'construction',  name: '建設・工務店',        nameEn: 'Construction' },
  { slug: 'interior',      name: 'インテリア・内装',    nameEn: 'Interior' },
  // === 小売・EC ===
  { slug: 'ec-retail',     name: 'EC・ネットショップ',  nameEn: 'EC Retail' },
  { slug: 'fashion',       name: 'ファッション・アパレル', nameEn: 'Fashion' },
  { slug: 'food-ec',       name: '食品EC・通販',        nameEn: 'Food EC' },
  { slug: 'handmade',      name: 'ハンドメイド・作家',  nameEn: 'Handmade' },
  // === 金融・保険 ===
  { slug: 'finance',       name: 'ファイナンシャル・投資', nameEn: 'Finance' },
  { slug: 'insurance',     name: '保険・代理店',        nameEn: 'Insurance' },
  // === クリエイティブ ===
  { slug: 'photography',   name: 'フォトグラファー・写真', nameEn: 'Photography' },
  { slug: 'design-agency', name: 'デザイン・クリエイティブ', nameEn: 'Design Agency' },
  { slug: 'video',         name: '映像・動画制作',      nameEn: 'Video' },
  // === イベント・ブライダル ===
  { slug: 'wedding',       name: 'ブライダル・結婚式',  nameEn: 'Wedding' },
  { slug: 'event',         name: 'イベント・企画',      nameEn: 'Event' },
  // === その他 ===
  { slug: 'cleaning',      name: 'クリーニング・清掃',  nameEn: 'Cleaning' },
  { slug: 'pet',           name: 'ペット・動物',        nameEn: 'Pet' },
  { slug: 'travel',        name: '旅行・観光',          nameEn: 'Travel' },
  { slug: 'consulting',    name: 'コンサルティング',    nameEn: 'Consulting' },
]
```

---

## 2. ページ構成（HTMLテンプレート）

### 2.1 Section 1：Page Hero

```html
<!-- hero-bg クラスに industry.slug を data属性で渡し、
     各業種のアクセントカラーをCSS変数でオーバーライド可能にする -->
<section class="industry-hero" data-industry="{{ industry.slug }}">
  <div class="industry-hero-bg" aria-hidden="true">
    <div class="bg-grid"></div>
  </div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li><a href="/works">生成事例</a></li>
        <li aria-current="page">{{ industry.name }}のロゴ</li>
      </ol>
    </nav>

    <div class="industry-hero-content">
      <span class="section-eyebrow">{{ industry.name }} × AIロゴ</span>
      <h1>{{ industry.name }}向け、<br>AIロゴ作成サービス。</h1>
      <p class="industry-hero-desc">{{ industry.heroDesc }}</p>

      <!-- 業種特化アピール3点 -->
      <div class="industry-hero-points">
        <div class="ihp-item">
          <span class="ihp-icon">✓</span>
          {{ industry.name }}向けフォント・カラー自動最適化
        </div>
        <div class="ihp-item">
          <span class="ihp-icon">✓</span>
          {{ industry.sampleCount }}件以上の{{ industry.name }}ロゴ事例
        </div>
        <div class="ihp-item">
          <span class="ihp-icon">✓</span>
          著作権証明書付き・商標登録申請可能
        </div>
      </div>

      <!-- CTA群 -->
      <div class="industry-hero-ctas">
        <!-- /create にindustryパラメータを渡してフォームをプリフィル -->
        <a href="/create?industry={{ industry.slug }}" class="btn-primary btn-primary-lg">
          {{ industry.name }}のロゴを作る →
        </a>
        <a href="#works-examples" class="btn-secondary">事例を見る</a>
      </div>

      <!-- 信頼バッジ -->
      <div class="industry-trust-badges">
        <span>✓ 無料で3案生成</span>
        <span>✓ 最短10分</span>
        <span>✓ 7日間全額返金保証</span>
      </div>
    </div>
  </div>
</section>
```

```css
.industry-hero {
  padding: calc(64px + 60px) var(--container-px) 64px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.industry-hero-content {
  max-width: 660px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.industry-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 16px 0 20px;
}

.industry-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 28px;
}

.industry-hero-points {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  max-width: 460px;
  margin: 0 auto 28px;
  padding: 20px 24px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.ihp-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.ihp-icon { color: var(--color-success); font-weight: 700; }

.industry-hero-ctas {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.industry-trust-badges {
  display: flex;
  gap: 20px;
  justify-content: center;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 500;
  flex-wrap: wrap;
}
```

### 2.2 Section 2：業種特有の課題（Pain Points）

```html
<section class="industry-pain-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">こんな課題はありませんか</span>
      <h2>{{ industry.name }}のロゴで<br>よくある悩み</h2>
    </div>
    <div class="pain-grid animate-on-scroll">
      <!-- industry.painPoints から3つをループ -->
      {% for pain in industry.painPoints %}
      <div class="pain-card">
        <div class="pc-icon">{{ pain.icon }}</div>
        <h3>{{ pain.title }}</h3>
        <p>{{ pain.desc }}</p>
        <!-- 解決矢印 -->
        <div class="pc-solution">
          <span class="pc-arrow">↓</span>
          <span class="pc-solve-text">LogoAI.jpで解決</span>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
```

```css
.industry-pain-section { padding: var(--section-py) var(--container-px); }

.pain-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.pain-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

.pc-icon { font-size: 36px; }

.pain-card h3 {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.pain-card p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
  flex: 1;
}

.pc-solution {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.pc-arrow { font-size: var(--text-xl); color: var(--color-accent); }
.pc-solve-text { font-size: var(--text-xs); font-weight: 700; color: var(--color-primary); }

@media (max-width: 768px) { .pain-grid { grid-template-columns: 1fr; max-width: 400px; } }
```

### 2.3 Section 3：推奨フォント・カラー

```html
<section class="industry-design-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">デザイン提案</span>
      <h2>{{ industry.name }}に最適な<br>フォントとカラー</h2>
    </div>

    <div class="design-recommend-grid animate-on-scroll">

      <!-- フォント推奨（左） -->
      <div class="font-recommend">
        <h3>推奨フォント</h3>
        <div class="font-list">
          {% for font in industry.fontRecommendations %}
          <div class="font-card">
            <div class="fc-preview" style="font-family: '{{ font.style }}'">
              {{ font.preview }}
            </div>
            <div class="fc-info">
              <div class="fc-name">{{ font.name }}</div>
              <div class="fc-reason">{{ font.reason }}</div>
            </div>
          </div>
          {% endfor %}
        </div>
      </div>

      <!-- カラーパレット推奨（右） -->
      <div class="color-recommend">
        <h3>推奨カラーパレット</h3>
        <div class="palette-list">
          {% for palette in industry.colorPalettes %}
          <div class="palette-card">
            <div class="palette-swatches">
              {% for color in palette.colors %}
              <div class="palette-swatch" style="background: {{ color }}"
                   title="{{ color }}" aria-label="{{ color }}"></div>
              {% endfor %}
            </div>
            <div class="palette-info">
              <div class="palette-name">{{ palette.name }}</div>
              <div class="palette-mood">{{ palette.mood }}</div>
            </div>
          </div>
          {% endfor %}
        </div>
      </div>

    </div>
  </div>
</section>
```

```css
.industry-design-section { padding: var(--section-py) var(--container-px); background: var(--color-bg-section); }

.design-recommend-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.font-recommend h3, .color-recommend h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 20px;
}

.font-list { display: flex; flex-direction: column; gap: 12px; }

.font-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: center;
}

.fc-preview {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  min-width: 80px;
  flex-shrink: 0;
  letter-spacing: 0.05em;
}

.fc-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.fc-reason { font-size: var(--text-xs); color: var(--color-text-muted); line-height: 1.5; }

.palette-list { display: flex; flex-direction: column; gap: 12px; }

.palette-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.palette-swatches {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.palette-swatch {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(0,0,0,0.08);
}

.palette-name { font-size: var(--text-sm); font-weight: 700; color: var(--color-text-primary); margin-bottom: 2px; }
.palette-mood { font-size: var(--text-xs); color: var(--color-text-muted); }

@media (max-width: 768px) { .design-recommend-grid { grid-template-columns: 1fr; } }
```

### 2.4 Section 4：事例ギャラリー（Works）

```html
<section class="industry-works-section" id="works-examples">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">生成事例</span>
      <h2>{{ industry.name }}のロゴ事例</h2>
      <p class="section-subtext">全て実際にLogoAI.jpで生成されたロゴです</p>
    </div>

    <!-- Masonryグリッド（/works と同構造、最大12件） -->
    <div class="works-masonry works-masonry-sm animate-on-scroll">
      {% for item in industry.worksItems %}
      <div class="works-card">
        <div class="works-card-image">
          <img src="{{ item.imageUrl }}" alt="{{ item.imageAlt }}"
               width="{{ item.width }}" height="{{ item.height }}"
               loading="lazy" decoding="async">
          <div class="works-card-overlay">
            <a href="/create?industry={{ industry.slug }}&style={{ item.style }}"
               class="overlay-cta">このスタイルで作る</a>
          </div>
        </div>
        <div class="works-card-footer">
          <span class="wcf-brand">{{ item.brandName }}</span>
          <div class="wcf-colors">
            {% for color in item.colors %}
            <span class="wcf-color-dot" style="background: {{ color }}" title="{{ color }}"></span>
            {% endfor %}
          </div>
        </div>
      </div>
      {% endfor %}
    </div>

    <div class="industry-works-more">
      <a href="/works?industry={{ industry.slug }}" class="btn-secondary">
        {{ industry.name }}の全事例を見る（{{ industry.sampleCount }}件+）→
      </a>
    </div>
  </div>
</section>
```

### 2.5 Section 5：業種特化機能

```html
<section class="industry-features-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">{{ industry.name }}特化機能</span>
      <h2>{{ industry.name }}向けに特化した機能</h2>
    </div>
    <div class="industry-feat-grid animate-on-scroll">
      {% for feat in industry.features %}
      <div class="industry-feat-card">
        <div class="ifc-icon">{{ feat.icon }}</div>
        <h3>{{ feat.title }}</h3>
        <p>{{ feat.desc }}</p>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
```

```css
.industry-features-section { padding: var(--section-py) var(--container-px); }

.industry-feat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.industry-feat-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ifc-icon { font-size: 28px; }
.industry-feat-card h3 { font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); margin: 0; }
.industry-feat-card p { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6; margin: 0; }

@media (max-width: 1024px) { .industry-feat-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .industry-feat-grid { grid-template-columns: 1fr; } }
```

### 2.6 Section 6：料金（シンプル）

```html
<section class="industry-pricing-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">料金</span>
      <h2>{{ industry.name }}ロゴの料金</h2>
    </div>
    <!-- /pricing ページの3プランカードを流用（コンパクト版） -->
    <!-- 「一番人気」バッジはスタンダードに付ける -->
    <div class="industry-pricing-cards animate-on-scroll">
      <!-- 無料・スタンダード・プレミアムの3カードをコンパクト表示 -->
      <!-- pricing-spec.md の PlanCard コンポーネント流用 -->
    </div>
    <p class="industry-pricing-note">
      全プラン7日間全額返金保証付き。
      <a href="/pricing">詳細な料金・機能比較はこちら →</a>
    </p>
  </div>
</section>
```

### 2.7 Section 7：業種特化FAQ

```html
<section class="industry-faq-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">よくある疑問</span>
      <h2>{{ industry.name }}のロゴに関する疑問</h2>
    </div>
    <div class="faq-accordion-list animate-on-scroll" style="max-width: 760px; margin: 0 auto">
      {% for faq in industry.faqs %}
      <div class="faq-accordion-item">
        <button class="faq-accordion-trigger" aria-expanded="false">
          {{ faq.question }}
        </button>
        <div class="faq-accordion-content" hidden>
          {{ faq.answer }}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
```

### 2.8 Section 8：関連業種リンク

```html
<section class="related-industries-section">
  <div class="container">
    <h2 class="ri-title animate-on-scroll">関連する業種のロゴ事例</h2>
    <div class="ri-grid animate-on-scroll">
      {% for relSlug in industry.relatedIndustries %}
      {% set rel = INDUSTRY_LIST.find(relSlug) %}
      <a href="/industry/{{ rel.slug }}" class="ri-card">
        <span class="ri-name">{{ rel.name }}</span>
        <span class="ri-count">{{ rel.sampleCount }}件の事例 →</span>
      </a>
      {% endfor %}
    </div>
  </div>
</section>
```

```css
.related-industries-section { padding: 48px var(--container-px); }

.ri-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: 28px;
}

.ri-grid {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: var(--container-max);
  margin: 0 auto;
}

.ri-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 24px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all 0.2s ease;
}

.ri-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.ri-name { font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); }
.ri-count { font-size: var(--text-xs); color: var(--color-text-muted); }
```

### 2.9 Section 9：CTA

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>{{ industry.name }}のロゴを、<br>今日から作り始める。</h2>
        <p>最短10分・無料から。デザインの知識は不要です。<br>
           著作権証明書付き・7日間全額返金保証。</p>
        <div class="final-cta-buttons">
          <a href="/create?industry={{ industry.slug }}" class="btn-primary btn-primary-lg">
            {{ industry.name }}のロゴを作る →
          </a>
          <a href="/works?industry={{ industry.slug }}" class="btn-secondary-inverse">
            事例を見る
          </a>
        </div>
        <div class="final-trust">
          <span>✓ 著作権完全帰属</span>
          <span>✓ 最短10分</span>
          <span>✓ 7日間全額返金保証</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 3. SEO完全規範

### 3.1 メタデータ（業種別テンプレート）

```
Title:       {industry.name}のロゴ作成 | AI生成・著作権証明書付き【LogoAI.jp】
Description: {industry.name}向けAIロゴ作成。日本語フォント100種以上、
             {industry.sampleCount}件以上の事例から最適デザインを提案。
             著作権完全帰属・商標登録申請可能。最短10分・7日間全額返金保証。
Canonical:   https://logoai.jp/industry/{industry.slug}
OG Image:    https://logoai.jp/og/industry/{industry.slug}.png
             （各業種代表ロゴ3点をグリッド表示した1200×630px画像）
```

### 3.2 H1〜H4キーワード配置ルール

| 見出し | テンプレート | 例（飲食店） |
|---|---|---|
| H1 | `{name}向け、AIロゴ作成サービス。` | 飲食店向け、AIロゴ作成サービス。 |
| H2（課題） | `{name}のロゴでよくある悩み` | 飲食店のロゴでよくある悩み |
| H2（デザイン） | `{name}に最適なフォントとカラー` | 飲食店に最適なフォントとカラー |
| H2（事例） | `{name}のロゴ事例` | 飲食店のロゴ事例 |
| H2（機能） | `{name}向けに特化した機能` | 飲食店向けに特化した機能 |
| H2（FAQ） | `{name}のロゴに関する疑問` | 飲食店のロゴに関する疑問 |
| H2（CTA） | `{name}のロゴを、今日から作り始める。` | 飲食店のロゴを、今日から作り始める。 |

### 3.3 画像ALTテキストルール

```
形式: {industry.name}ロゴ「{brandName}」。{fontName}、{colorDesc}の{style}なデザイン。
例:   飲食店ロゴ「麺屋 煌」。角ゴシック体、朱赤と黒のモダンなデザイン。
```

---

## 4. 構造化データ（JSON-LD）

### 4.1 BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム",   "item": "https://logoai.jp/" },
    { "@type": "ListItem", "position": 2, "name": "生成事例", "item": "https://logoai.jp/works" },
    { "@type": "ListItem", "position": 3, "name": "{industry.name}のロゴ",
      "item": "https://logoai.jp/industry/{slug}" }
  ]
}
```

### 4.2 FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{faq.question}",
      "acceptedAnswer": { "@type": "Answer", "text": "{faq.answer}" }
    }
    // 4問分をループ
  ]
}
```

### 4.3 ItemList（事例ギャラリー）

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "{industry.name}AIロゴ事例",
  "numberOfItems": 12,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "{brandName}のロゴ",
      "image": "{imageUrl}", "description": "{imageAlt}" }
    // 12件分
  ]
}
```

---

## 5. 具体業種データ例（上位5業種）

### 5.1 飲食店（`restaurant`）

```typescript
{
  slug: 'restaurant',
  name: '飲食店・レストラン',
  nameEn: 'Restaurant',
  sampleCount: 320,
  heroDesc: '飲食店・レストランのブランドに最適なAIロゴを最短10分で生成。看板・メニュー・SNSに即使える高品質デザインを著作権証明書付きで提供します。',
  painPoints: [
    { icon: '💸', title: 'デザイン費が高すぎる', desc: '開業前後は出費が重なりデザイン会社に30万円は払えない。でもチラシや看板にはちゃんとしたロゴが必要。' },
    { icon: '🔤', title: '日本語フォントが少ない', desc: '海外ツールでは和食・居酒屋の雰囲気に合う日本語フォントがほとんど選べない。' },
    { icon: '⚖️', title: '著作権が不安', desc: '「商用利用OK」と書いてあるが、本当に看板や名刺に使えるのか不安。' },
  ],
  fontRecommendations: [
    { name: '游明朝', style: 'Yu Mincho', reason: '和食・高級感・伝統的な飲食店に最適。筆の温もりを感じるセリフ体。', preview: '麺処' },
    { name: '源ノ角ゴシック', style: 'Noto Sans JP', reason: 'カジュアルなカフェ・ファミレスに適したモダンゴシック体。視認性抜群。', preview: '食堂' },
    { name: '丸ゴシック', style: 'rounded', reason: '子供連れ・ファミリー向け飲食店に温かみを与える丸みのある書体。', preview: 'カフェ' },
  ],
  colorPalettes: [
    { name: '和モダン', colors: ['#C41E3A', '#1A1A1A', '#F5F0E8'], mood: '力強さと伝統感' },
    { name: '温もり木調', colors: ['#8B4513', '#D2691E', '#FFF8F0'], mood: '親しみやすさ' },
    { name: '高級和食', colors: ['#1A3A2A', '#C9963A', '#FAF7F0'], mood: '上質・信頼感' },
    { name: 'カジュアル', colors: ['#FF6B35', '#2C2C2C', '#FFF5EC'], mood: 'エネルギー・活力' },
  ],
  features: [
    { icon: '🍜', title: '飲食業界フォント優先表示', desc: '和食・洋食・カフェ等の業態に合うフォントをAIが優先提案します。' },
    { icon: '🎨', title: '食欲を刺激するカラー自動提案', desc: '赤・橙・茶など食欲を促進するカラーパレットを優先的に提案します。' },
    { icon: '🖼️', title: '看板・メニュー用高解像度出力', desc: 'A1サイズの看板印刷にも対応する高解像度PDFを出力できます。' },
    { icon: '🔤', title: '英語サブテキスト自動生成', desc: '店名の英語表記（ローマ字・英訳）をAIが自動提案します。' },
  ],
  faqs: [
    { question: '飲食店の看板に使えますか？', answer: '有料プランであれば看板・のれん・メニュー・チラシ・SNSなど全ての商用利用が可能です。著作権はオーナー様へ100%帰属します。' },
    { question: '食品衛生法の表示に使うロゴとして問題ありませんか？', answer: '食品表示や飲食店の許可申請でのロゴ使用について、当サービスのロゴデータ自体に制限はありません。ただし表示義務等の法令遵守は事業者様ご自身でご確認ください。' },
    { question: '複数店舗展開の場合、1つのロゴを全店で使えますか？', answer: 'はい。有料プランで購入したロゴは制限なく複数店舗でご利用いただけます。フランチャイズ展開の場合も同様です。' },
    { question: 'テイクアウト用パッケージに印刷できますか？', answer: 'はい。包装紙・袋・カップ等への印刷も商用利用の範囲に含まれます。印刷会社への入稿用のCMYKデータはプレミアムプランで提供しています。' },
  ],
  keywords: ['飲食店 ロゴ 作成', '飲食店 ロゴ AI', 'レストラン ロゴ 著作権', '飲食店 ロゴ 安い', '飲食店 開業 ロゴ'],
  relatedIndustries: ['cafe', 'ramen', 'bakery'],
  schemaType: 'FoodEstablishment',
}
```

### 5.2 美容室・ヘアサロン（`beauty-salon`）

```typescript
{
  slug: 'beauty-salon',
  name: '美容室・ヘアサロン',
  nameEn: 'Hair Salon',
  sampleCount: 280,
  heroDesc: '美容室・ヘアサロン開業のロゴはAIで最短10分。エレガント・ナチュラル・モダンなど豊富なスタイルから選択し、著作権証明書付きでダウンロード。',
  painPoints: [
    { icon: '✂️', title: '開業コストを抑えたい', desc: '物件取得・内装・設備で資金が尽き、ロゴデザインに予算を割けない美容師さんが多い。' },
    { icon: '🌸', title: '女性らしい繊細さが出せない', desc: '汎用ツールでは美容室らしいエレガントさや繊細な線質が再現しにくい。' },
    { icon: '📱', title: 'SNS映えするデザインが欲しい', desc: 'Instagramでサロンをアピールするために映えるロゴが必要だが、何が良いか分からない。' },
  ],
  fontRecommendations: [
    { name: '游明朝（細め）', style: 'Yu Mincho', reason: '高級サロンに合う繊細で上品な明朝体。細めのウェイトが女性らしさを演出。', preview: 'salon' },
    { name: 'ヒラギノ角ゴ', style: 'Hiragino Kaku', reason: 'モダンでスッキリ。都市型のスタイリッシュなサロンに最適。', preview: 'HAIR' },
    { name: '筑紫Aオールド明朝', style: 'serif', reason: 'レトロモダンなサロンに人気。インスタ映えする個性的な書体。', preview: '美容室' },
  ],
  colorPalettes: [
    { name: 'ミニマルシック', colors: ['#2C2C2C', '#F5F5F0', '#C9963A'], mood: 'モダン・洗練' },
    { name: 'ナチュラル', colors: ['#8B7355', '#E8DDD0', '#FAFAF7'], mood: '温もり・自然体' },
    { name: 'フェミニン', colors: ['#D4A5A5', '#2C2C2C', '#FFF5F5'], mood: '可愛らしさ・優しさ' },
    { name: 'ラグジュアリー', colors: ['#1A1A2E', '#C9963A', '#FAFAF7'], mood: '高級感・信頼' },
  ],
  features: [
    { icon: '💄', title: 'サロン向けフォント特化', desc: '「エレガント」「ナチュラル」タグのフォントを優先的に提案。' },
    { icon: '📐', title: 'ロゴマーク＋テキスト自動配置', desc: 'ハサミ・葉・花などサロン系モチーフとテキストの最適配置を提案。' },
    { icon: '📸', title: 'Instagram正方形プレビュー', desc: 'SNSアイコンとして使う際の見え方をリアルタイムプレビュー。' },
    { icon: '🖨️', title: 'ショップカード向けデザイン最適化', desc: '名刺・ポイントカードサイズでの視認性を確認できる。' },
  ],
  faqs: [
    { question: '美容室の屋号と同じロゴで商標登録できますか？', answer: '有料プランで生成したロゴは商標登録申請に利用できます。ただし登録可否は特許庁の審査によります。プレミアムプランのJ-PlatPat商標類似チェックをご活用ください。' },
    { question: 'Instagramのプロフィール画像に使えますか？', answer: 'はい、全プランでSNSプロフィール画像への使用が可能です。ただし無料プランは非商用・個人用途に限ります。ビジネスアカウントの場合は有料プランをご利用ください。' },
    { question: 'ロゴの横型・縦型など複数バリエーションを作れますか？', answer: 'はい。カスタマイズ画面でテキストとアイコンの配置（横並び・縦並び）を変更できます。複数パターンをダウンロードすることも可能です（有料プラン）。' },
    { question: 'スタッフが変わった場合など、ロゴを後で変更できますか？', answer: 'はい。マイページからいつでも編集・再生成ができます。変更後は改めてダウンロードしてください。著作権証明書は最新版で再発行されます。' },
  ],
  keywords: ['美容室 ロゴ 作成', 'ヘアサロン ロゴ AI', '美容室 開業 ロゴ 安い', 'サロン ロゴ 著作権', '美容師 独立 ロゴ'],
  relatedIndustries: ['nail-salon', 'esthetic', 'barber'],
  schemaType: 'BeautySalon',
}
```

### 5.3 IT・スタートアップ（`it-startup`）

```typescript
{
  slug: 'it-startup',
  name: 'IT・スタートアップ',
  nameEn: 'IT Startup',
  sampleCount: 240,
  heroDesc: 'IT企業・スタートアップ向けのモダンなAIロゴを最短10分で生成。グローバルでも通用するシンプル・テック感あるデザインを著作権証明書付きで。',
  painPoints: [
    { icon: '🌍', title: 'グローバルに通用するデザインが欲しい', desc: '日本語と英語を両立させた、海外展開でも使えるロゴの作り方が分からない。' },
    { icon: '🚀', title: '資金調達前にブランドを整えたい', desc: 'ピッチ資料にロゴを入れたいが、まだデザイン会社に頼む予算がない。' },
    { icon: '⚡', title: 'スピードが必要', desc: '明日のプレゼンまでに会社ロゴが必要。数週間かかるデザイン会社には頼めない。' },
  ],
  fontRecommendations: [
    { name: 'Noto Sans JP', style: 'Noto Sans JP', reason: '日英両対応・可読性最高のサンセリフ体。グローバルスタートアップのスタンダード。', preview: 'Tech' },
    { name: 'BIZ UDゴシック', style: 'BIZ UDGothic', reason: '視認性重視のユニバーサルデザイン書体。プレゼン・資料での使用に最適。', preview: 'AI' },
    { name: 'レイニーハート', style: 'sans-serif', reason: '個性的なスタートアップロゴに。ユニークさで差別化したい場合に有効。', preview: 'App' },
  ],
  colorPalettes: [
    { name: 'テックブルー', colors: ['#0066CC', '#1A1A2E', '#F0F4FF'], mood: '信頼・テクノロジー感' },
    { name: 'ダークモード', colors: ['#0D0D0D', '#00FF88', '#1A1A2E'], mood: 'エッジ・革新性' },
    { name: 'ミニマルグリーン', colors: ['#1A3A2A', '#C9963A', '#FAFAF7'], mood: '誠実・成長' },
    { name: 'グラデーション', colors: ['#7C3AED', '#2563EB', '#F0F4FF'], mood: 'クリエイティブ・未来感' },
  ],
  features: [
    { icon: '🔠', title: '英字ロゴ・欧文フォント対応', desc: '英語社名・アルファベットロゴに最適化された欧文フォントを多数搭載。' },
    { icon: '📐', title: 'ファビコン・アプリアイコン最適化', desc: '32px・64px等の小サイズでも視認できるデザインを自動最適化。' },
    { icon: '🎨', title: 'ブランドカラーHEX指定', desc: '既存のブランドカラーがある場合はHEXコードを直接入力して生成可能。' },
    { icon: '📄', title: 'ピッチ資料用透過PNG', desc: '背景透過PNG（アルファチャンネル）でスライドへの貼り付けが簡単。' },
  ],
  faqs: [
    { question: 'VC・投資家向けのピッチ資料に使えますか？', answer: 'はい。有料プランで生成したロゴは全ての商用・業務利用が可能です。投資家へのプレゼン資料・ピッチデッキへの使用も制限なく行えます。' },
    { question: 'グローバル展開を視野に入れた英語ロゴを作れますか？', answer: 'はい。英字のブランド名でも対応しています。欧文フォントと日本語フォントを組み合わせた日英混在ロゴも生成可能です。' },
    { question: 'Figma・Notion等のツールに貼り付けて使えますか？', answer: 'はい。SVGファイルはFigmaに直接読み込み可能です。背景透過PNGをNotion等に貼り付けることもできます。' },
    { question: '法人登記後に会社名が変わった場合は？', answer: 'マイページからテキストを変更して再生成できます。料金の追加は不要です（有料プランの場合）。' },
  ],
  keywords: ['IT企業 ロゴ 作成', 'スタートアップ ロゴ AI', 'テック系 ロゴ 安い', 'IT ロゴ 著作権', 'スタートアップ 会社 ロゴ'],
  relatedIndustries: ['web-design', 'saas', 'app-dev'],
  schemaType: 'Organization',
}
```

### 5.4 弁護士・法律事務所（`lawyer`）

```typescript
{
  slug: 'lawyer',
  name: '弁護士・法律事務所',
  nameEn: 'Law Firm',
  sampleCount: 120,
  heroDesc: '弁護士・法律事務所の信頼を伝えるAIロゴ。重厚感・誠実さを表現した日本語フォントと落ち着いたカラーで、クライアントからの信頼を高めるロゴを作成します。',
  painPoints: [
    { icon: '🔒', title: '信頼感・権威性が伝わるデザインが難しい', desc: '弁護士事務所のロゴは「安っぽく見えてはいけない」。でも重厚感あるデザインは高額。' },
    { icon: '⚖️', title: '著作権トラブルが心配', desc: '法律の専門家だからこそ、ロゴの著作権が曖昧なまま使うことへの抵抗感が強い。' },
    { icon: '🏛️', title: 'ホームページと名刺で統一感を出したい', desc: '独立開業時にWebサイトと名刺を一から整備する必要があり、一貫したロゴが急務。' },
  ],
  fontRecommendations: [
    { name: '游明朝', style: 'Yu Mincho', reason: '日本の伝統的な明朝体。法律・士業事務所の権威・信頼感を象徴する書体。', preview: '法律' },
    { name: 'ヒラギノ明朝', style: 'Hiragino Mincho', reason: 'Macユーザーに馴染み深い高品質明朝体。洗練された印象を与える。', preview: '事務所' },
    { name: 'BIZ UDP明朝', style: 'BIZ UDPMincho', reason: 'ユニバーサルデザイン準拠の明朝体。ウェブ・印刷双方で読みやすい。', preview: '弁護士' },
  ],
  colorPalettes: [
    { name: '伝統の重厚感', colors: ['#1A1A2E', '#8B7355', '#F5F0E8'], mood: '権威・信頼' },
    { name: '現代的な信頼', colors: ['#1A3A2A', '#C9963A', '#FAFAF7'], mood: '誠実・専門性' },
    { name: 'プロフェッショナル', colors: ['#2C3E50', '#95A5A6', '#FAFAF7'], mood: '冷静・客観性' },
    { name: '和の格式', colors: ['#2D1B00', '#C41E3A', '#F5F0E8'], mood: '格式・伝統' },
  ],
  features: [
    { icon: '⚖️', title: '士業向けフォント最優先', desc: '明朝体・重厚なゴシック体など士業に相応しい書体を優先表示。' },
    { icon: '📋', title: '著作権証明書で権利が明確', desc: '法律の専門家として著作権が明確に帰属する証明書付きロゴを提供。' },
    { icon: '🔏', title: '商標登録申請サポート（プレミアム）', desc: '事務所ロゴの商標登録申請用のデータ・証明書を完備。' },
    { icon: '🌐', title: 'ホームページ用SVG出力', desc: '弁護士ドットコム等への掲載に対応したSVGファイルを出力。' },
  ],
  faqs: [
    { question: '弁護士法上、弁護士がAIで作ったロゴを名刺に使うことは問題ありませんか？', answer: 'ロゴの制作方法についての制限は弁護士法には定められていません。ただし弁護士業務に関する広告規制（弁護士法第72条等）は広告内容に関するものであり、ロゴ自体の制作方法は規制対象外です。' },
    { question: '法律事務所名が日本語でも英語表記ロゴを作れますか？', answer: 'はい。日本語事務所名の読みに基づいたローマ字表記・英語略称のロゴも生成できます。' },
    { question: '代表弁護士が変わった場合、ロゴを更新できますか？', answer: 'ロゴ自体は事務所のブランドとして引き続き使用できます。マイページからいつでも編集可能です。' },
    { question: '複数の弁護士が所属する事務所でも1つのロゴで対応できますか？', answer: 'はい。法律事務所全体のロゴとして複数弁護士が使用することに制限はありません。' },
  ],
  keywords: ['弁護士 ロゴ 作成', '法律事務所 ロゴ AI', '士業 ロゴ 著作権', '弁護士 開業 ロゴ', '法律事務所 ロゴ 安い'],
  relatedIndustries: ['accountant', 'judicial-scrivener', 'labor-consult'],
  schemaType: 'LegalService',
}
```

### 5.5 クリニック・医院（`clinic`）

```typescript
{
  slug: 'clinic',
  name: 'クリニック・医院',
  nameEn: 'Clinic',
  sampleCount: 150,
  heroDesc: 'クリニック・医院の開業ロゴをAIで最短10分。患者様に安心感と信頼感を与えるデザインを、医療法の広告規制を理解した上で提供します。',
  painPoints: [
    { icon: '🏥', title: '患者に安心感を与えるデザインが難しい', desc: '医療機関のロゴは「清潔感」「信頼感」が必須。でも何が正解か分からない。' },
    { icon: '📋', title: '医療法の広告規制が心配', desc: '医療機関のロゴ・広告に関する規制があると聞いた。問題ないデザインを使いたい。' },
    { icon: '⏰', title: '開院準備で時間がない', desc: '内覧会・開院告知のチラシにロゴが必要なのに、デザイン会社との打ち合わせに時間を割けない。' },
  ],
  fontRecommendations: [
    { name: 'ヒラギノ角ゴ', style: 'Hiragino Kaku', reason: '清潔感・信頼感・読みやすさを兼ね備えた医療機関の定番フォント。', preview: '内科' },
    { name: 'Noto Sans JP', style: 'Noto Sans JP', reason: 'デジタル表示に最適化された見やすいゴシック体。若い医師のクリニックに人気。', preview: '歯科' },
    { name: '游ゴシック', style: 'Yu Gothic', reason: '落ち着いた印象のゴシック体。中高年患者が多い内科・整形外科に適している。', preview: '医院' },
  ],
  colorPalettes: [
    { name: '清潔・安心', colors: ['#0066CC', '#FFFFFF', '#F0F4FF'], mood: '安心・清潔感' },
    { name: '温かい医療', colors: ['#1A3A2A', '#C9963A', '#F5FFF7'], mood: '温もり・誠実' },
    { name: 'ナチュラル', colors: ['#5B8C5A', '#FFFFFF', '#F0FFF0'], mood: '自然・癒し' },
    { name: 'プロフェッショナル', colors: ['#2C3E50', '#3498DB', '#FAFAF7'], mood: '専門性・信頼' },
  ],
  features: [
    { icon: '🏥', title: '医療系カラー自動最適化', desc: '清潔感・信頼感を与える医療系カラーを優先的に提案します。' },
    { icon: '⚕️', title: '医療マーク非使用（法令準拠）', desc: 'ヘビと杖（アスクレピオスの杖）等の医療マークは無断使用に制限があるため使用しません。' },
    { icon: '📋', title: '院内掲示・院外看板対応サイズ', desc: 'A2以上の院内掲示板・屋外看板にも対応する高解像度データを出力。' },
    { icon: '💻', title: '医療系WEB用最適化', desc: '医師検索サイト・クリニックホームページに最適なSVG・PNGを出力。' },
  ],
  faqs: [
    { question: 'クリニックのロゴに医療法上の制限はありますか？', answer: 'ロゴデザイン自体に医療法の直接的な制限はありませんが、広告として使用する場合は医療法第6条の5（医業等の広告規制）の対象となります。ロゴに含めるテキスト（例：「日本一」等の誇大表現）については医療広告ガイドラインをご確認ください。' },
    { question: '院内掲示物（待合室ポスター等）に使えますか？', answer: 'はい。有料プランであれば院内掲示・院外看板・チラシ・ホームページ等の全用途で使用できます。' },
    { question: 'クリニックの診療科目をロゴに含めることはできますか？', answer: 'はい。カスタマイズ画面でサブテキスト（「内科・小児科」等）を追加できます。フォント・サイズも調整可能です。' },
    { question: '院長交代・医院名変更の場合は？', answer: 'マイページから文字を変更して再生成できます。追加料金は不要です（有料プランの場合）。' },
  ],
  keywords: ['クリニック ロゴ 作成', '医院 ロゴ AI', '開業医 ロゴ 安い', '病院 ロゴ 著作権', 'クリニック 開業 ロゴ'],
  relatedIndustries: ['dental', 'pharmacy', 'counseling'],
  schemaType: 'MedicalClinic',
}
```

---

## 6. GEO最適化テキスト（業種別テンプレート）

```html
<p class="geo-definition">
  LogoAI.jpの{industry.name}向けロゴ作成サービスでは、
  {industry.name}に最適な日本語フォント{fontCount}種・カラーパレット{paletteCount}種から
  AIが自動選択し、最短10分でプロ品質のロゴを生成します。
  {industry.sampleCount}件以上の{industry.name}ロゴ事例を参照して生成AIが業種最適化。
  有料プランでは著作権がユーザーへ100%帰属し、著作権帰属証明書PDFが自動発行されます。
  商標登録申請・看板・名刺・Webサイト・SNS等での商用利用が全て可能。7日間全額返金保証付き。
</p>
```

---

## 7. 内部リンク戦略

```
/industry/restaurant → /industry/cafe, /industry/ramen, /industry/bakery
/industry/beauty-salon → /industry/nail-salon, /industry/esthetic
/industry/it-startup → /industry/web-design, /industry/saas
各ページから → /works（事例全体）, /pricing（料金）, /copyright（著作権）, /trademark（商標）
```

---

## 8. コンポーネント構成

```
app/industry/[slug]/page.tsx

components/industry/
├── IndustryHero.tsx
├── IndustryPainPoints.tsx
├── IndustryDesignRecommend.tsx    # フォント + カラー
├── IndustryWorksGallery.tsx       # Masonry（/works再利用）
├── IndustryFeatures.tsx
├── IndustryPricing.tsx            # /pricing の PlanCard 流用
├── IndustryFAQ.tsx
├── RelatedIndustries.tsx
└── IndustryCTA.tsx

lib/
└── industry-data.ts               # INDUSTRY_LIST（47業種全データ）
```

---

*文档版本：v1.0 | 最終更新：2025年2月*
