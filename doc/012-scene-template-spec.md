# 场景落地页模板规格书 `/for/[シーン]`

> **文档用途**：交付AI开发者直接实现。一套模板，覆盖所有场景页面。
> **路由规则**：`/for/[slug]`，例如 `/for/startup`、`/for/freelancer`
> **页面类型**：シーン特化SEOランディングページ
> **与行业页区别**：行业页按「業種（飲食店・ITなど）」区分，
>                   场景页按「利用シーン・状況・属性」区分，
>                   例如「开业したい人」「副業でEC始める人」「フリーランサー」等。
>                   検索意図が「業種」ではなく「状況・用途」の场合に対応。

---

## 1. 路由与数据结构

### 1.1 静态路径生成

```typescript
// app/for/[slug]/page.tsx

export async function generateStaticParams() {
  return SCENE_LIST.map((scene) => ({ slug: scene.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const scene = SCENE_LIST.find(s => s.slug === params.slug)
  if (!scene) notFound()
  return {
    title: `${scene.title}向けAIロゴ | ${scene.metaKeyword}【LogoAI.jp】`,
    description: scene.metaDescription,
    canonical: `https://logoai.jp/for/${scene.slug}`,
  }
}
```

### 1.2 SceneData 型定義

```typescript
interface SceneData {
  slug: string
  title: string              // e.g. "開業・起業する方"
  titleShort: string         // e.g. "開業・起業"（パンくず用）
  metaKeyword: string        // e.g. "開業 ロゴ 作成 安い"
  metaDescription: string    // 120字以内
  heroTitle: string          // H1
  heroDesc: string           // ヒーロー説明文
  heroEmoji: string          // 大きなアイコン絵文字
  targetPersona: Persona     // ターゲット像
  situationPoints: string[]  // 「こんな状況の方に」3〜4点
  benefits: Benefit[]        // このシーンでのLogoAI.jpのメリット4点
  steps: SceneStep[]         // このシーンに特化したフロー説明（3〜4ステップ）
  faqs: FAQItem[]            // シーン特化FAQ 4問
  relatedIndustries: string[]  // 関連業種スラッグ（業種ページへのリンク）
  relatedScenes: string[]      // 関連シーンスラッグ
  keywords: string[]           // 主要SEOキーワード5個
  testimonialContext: string   // レビュー引用の文脈テキスト
}

interface Persona {
  label: string      // "開業を控えた飲食店オーナー"
  needs: string[]    // このペルソナの具体的なニーズ3点
}

interface Benefit {
  icon: string
  title: string
  desc: string
}

interface SceneStep {
  num: string
  title: string
  desc: string
  timeLabel?: string
}
```

### 1.3 シーン一覧（全スラッグ）

```typescript
export const SCENE_LIST: SceneData[] = [
  // === 開業・起業系 ===
  { slug: 'startup',        title: '開業・起業する方',        metaKeyword: '開業 ロゴ 作成' },
  { slug: 'freelancer',     title: 'フリーランサー',          metaKeyword: 'フリーランス ロゴ 作成' },
  { slug: 'side-job',       title: '副業・複業を始める方',    metaKeyword: '副業 ロゴ 作成' },
  { slug: 'solopreneur',    title: '一人起業・個人事業主',    metaKeyword: '個人事業主 ロゴ 作成' },
  { slug: 'second-job',     title: '転職・独立する方',        metaKeyword: '独立 ロゴ 作成' },
  // === EC・ネットビジネス系 ===
  { slug: 'ec-shop',        title: 'ECショップを開く方',      metaKeyword: 'EC ロゴ 作成' },
  { slug: 'minne-creator',  title: 'ハンドメイド作家',        metaKeyword: 'ハンドメイド ロゴ 作成' },
  { slug: 'youtube',        title: 'YouTuber・VTuber',        metaKeyword: 'YouTuber ロゴ 作成' },
  { slug: 'blogger',        title: 'ブロガー・メディア運営',  metaKeyword: 'ブログ ロゴ 作成' },
  // === 士業・専門家系 ===
  { slug: 'professional',   title: '士業・専門家が独立',      metaKeyword: '士業 独立 ロゴ' },
  { slug: 'consultant',     title: 'コンサルタント・コーチ',  metaKeyword: 'コンサルタント ロゴ 作成' },
  // === リブランディング系 ===
  { slug: 'rebrand',        title: 'リブランディングしたい',  metaKeyword: 'リブランディング ロゴ 変更' },
  { slug: 'logo-renewal',   title: 'ロゴをリニューアルしたい', metaKeyword: 'ロゴ リニューアル AI' },
  // === イベント・プロジェクト系 ===
  { slug: 'event-organizer', title: 'イベント主催者',         metaKeyword: 'イベント ロゴ 作成' },
  { slug: 'npo',             title: 'NPO・非営利団体',        metaKeyword: 'NPO ロゴ 作成' },
  { slug: 'school-club',     title: 'サークル・クラブ',       metaKeyword: 'サークル ロゴ 作成' },
  // === デザイナー・制作者向け ===
  { slug: 'designer-client', title: 'デザイナーがクライアントに', metaKeyword: 'デザイナー クライアント ロゴ' },
  { slug: 'web-creator',     title: 'Web制作者',              metaKeyword: 'Web制作 ロゴ 作成' },
]
```

---

## 2. ページ構成（HTMLテンプレート）

### 2.1 Section 1：Page Hero

```html
<section class="scene-hero" data-scene="{{ scene.slug }}">
  <div class="scene-hero-bg" aria-hidden="true"><div class="bg-grid"></div></div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">{{ scene.titleShort }}向けロゴ</li>
      </ol>
    </nav>
    <div class="scene-hero-content">
      <div class="scene-hero-emoji" aria-hidden="true">{{ scene.heroEmoji }}</div>
      <span class="section-eyebrow">{{ scene.title }}のためのロゴ作成</span>
      <h1>{{ scene.heroTitle }}</h1>
      <p class="scene-hero-desc">{{ scene.heroDesc }}</p>

      <!-- こんな方に -->
      <div class="scene-target-box">
        <div class="stb-label">こんな状況の方に</div>
        <ul class="stb-list">
          {% for point in scene.situationPoints %}
          <li class="stb-item">
            <span class="stb-check">✓</span> {{ point }}
          </li>
          {% endfor %}
        </ul>
      </div>

      <div class="scene-hero-ctas">
        <a href="/create" class="btn-primary btn-primary-lg">今すぐ無料で始める →</a>
        <a href="#scene-steps" class="btn-secondary">使い方を見る</a>
      </div>
      <div class="scene-trust">
        <span>✓ クレジットカード不要</span>
        <span>✓ 最短10分</span>
        <span>✓ 7日間全額返金保証</span>
      </div>
    </div>
  </div>
</section>
```

```css
.scene-hero {
  padding: calc(64px + 60px) var(--container-px) 64px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.scene-hero-content {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.scene-hero-emoji {
  font-size: 64px;
  line-height: 1;
  margin-bottom: 16px;
}

.scene-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 12px 0 20px;
}

.scene-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 28px;
}

.scene-target-box {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 20px 24px;
  text-align: left;
  max-width: 480px;
  margin: 0 auto 28px;
}

.stb-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 12px;
}

.stb-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }

.stb-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.stb-check { color: var(--color-success); font-weight: 700; flex-shrink: 0; }

.scene-hero-ctas {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.scene-trust {
  display: flex;
  gap: 20px;
  justify-content: center;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 500;
  flex-wrap: wrap;
}
```

### 2.2 Section 2：このシーンでのメリット

```html
<section class="scene-benefits-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">なぜLogoAI.jpか</span>
      <h2>{{ scene.title }}がLogoAI.jpを選ぶ理由</h2>
    </div>
    <div class="benefits-grid animate-on-scroll">
      {% for benefit in scene.benefits %}
      <div class="benefit-card">
        <div class="bfc-icon">{{ benefit.icon }}</div>
        <h3>{{ benefit.title }}</h3>
        <p>{{ benefit.desc }}</p>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
```

```css
.scene-benefits-section { padding: var(--section-py) var(--container-px); }

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.benefit-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bfc-icon { font-size: 28px; }
.benefit-card h3 { font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); margin: 0; }
.benefit-card p { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6; margin: 0; }

@media (max-width: 1024px) { .benefits-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .benefits-grid { grid-template-columns: 1fr; } }
```

### 2.3 Section 3：このシーン向けステップ

```html
<section class="scene-steps-section" id="scene-steps">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">使い方</span>
      <h2>{{ scene.title }}がロゴを作る流れ</h2>
    </div>
    <div class="scene-steps-grid animate-on-scroll">
      {% for step in scene.steps %}
      <div class="scene-step-card">
        <div class="ssc-num">{{ step.num }}</div>
        <div class="ssc-content">
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
          {% if step.timeLabel %}
          <span class="ssc-time">約{{ step.timeLabel }}</span>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
```

```css
.scene-steps-section { padding: var(--section-py) var(--container-px); background: var(--color-bg-section); }

.scene-steps-grid {
  display: flex;
  gap: 0;
  max-width: var(--container-max);
  margin: 0 auto;
  position: relative;
}

/* コネクターライン */
.scene-steps-grid::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  height: 2px;
  background: var(--color-border);
  background-image: repeating-linear-gradient(
    to right, var(--color-accent) 0, var(--color-accent) 6px,
    transparent 6px, transparent 14px
  );
  z-index: 0;
}

.scene-step-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 0 16px;
  position: relative;
  z-index: 1;
}

.ssc-num {
  width: 56px;
  height: 56px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-number);
  font-size: var(--text-xl);
  font-weight: 700;
  box-shadow: 0 0 0 6px var(--color-bg-section);
  flex-shrink: 0;
}

.scene-step-card:last-child .ssc-num {
  background: var(--color-accent);
  color: var(--color-text-primary);
}

.ssc-content h3 {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 6px;
}

.ssc-content p { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6; margin: 0 0 6px; }

.ssc-time {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-accent);
  background: rgba(201,150,58,0.08);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

@media (max-width: 768px) {
  .scene-steps-grid { flex-direction: column; gap: 16px; }
  .scene-steps-grid::before { display: none; }
  .scene-step-card { flex-direction: row; text-align: left; }
}
```

### 2.4 Section 4：事例ギャラリー（シーン別絞り込み）

```html
<section class="scene-works-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">生成事例</span>
      <h2>{{ scene.title }}が作ったロゴ事例</h2>
    </div>
    <!-- Masonryグリッド（/works コンポーネント流用、シーン別フィルター済み）-->
    <div class="works-masonry animate-on-scroll">
      <!-- WorksCard × 9件 -->
    </div>
    <div class="scene-works-more">
      <a href="/works" class="btn-secondary">全ての事例を見る →</a>
    </div>
  </div>
</section>
```

### 2.5 Section 5：料金（コンパクト版）

```html
<!-- /industry ページと同構造（pricing-spec.md の PlanCard 流用） -->
```

### 2.6 Section 6：シーン特化FAQ

```html
<section class="scene-faq-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">よくある疑問</span>
      <h2>{{ scene.title }}からよく聞かれること</h2>
    </div>
    <div class="faq-accordion-list animate-on-scroll" style="max-width: 760px; margin: 0 auto">
      <!-- 4問 accordion -->
    </div>
  </div>
</section>
```

### 2.7 Section 7：関連業種・シーン

```html
<section class="scene-related-section">
  <div class="container">
    <div class="scene-related-grid animate-on-scroll">
      <!-- 関連業種へのリンク -->
      <div class="srl-col">
        <h3>関連する業種</h3>
        <div class="srl-links">
          {% for slug in scene.relatedIndustries %}
          {% set ind = INDUSTRY_LIST.find(slug) %}
          <a href="/industry/{{ ind.slug }}" class="srl-link">{{ ind.name }}のロゴ →</a>
          {% endfor %}
        </div>
      </div>
      <!-- 関連シーンへのリンク -->
      <div class="srl-col">
        <h3>似た状況の方へ</h3>
        <div class="srl-links">
          {% for slug in scene.relatedScenes %}
          {% set sc = SCENE_LIST.find(slug) %}
          <a href="/for/{{ sc.slug }}" class="srl-link">{{ sc.title }}向けロゴ →</a>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.scene-related-section { padding: 48px var(--container-px); }

.scene-related-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 760px;
  margin: 0 auto;
}

.srl-col h3 {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-secondary);
  margin: 0 0 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: var(--text-xs);
}

.srl-links { display: flex; flex-direction: column; gap: 8px; }

.srl-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  padding: 10px 16px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.2s;
}

.srl-link:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}
```

### 2.8 Section 8：CTA

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>{{ scene.title }}の第一歩を、<br>今日のロゴから始める。</h2>
        <p>最短10分・無料から。著作権証明書付き。<br>7日間全額返金保証があるから安心して試せます。</p>
        <div class="final-cta-buttons">
          <a href="/create" class="btn-primary btn-primary-lg">無料でロゴを作る →</a>
          <a href="/works" class="btn-secondary-inverse">事例を見る</a>
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

## 3. 具体シーンデータ例（上位5シーン）

### 3.1 開業・起業する方（`startup`）

```typescript
{
  slug: 'startup',
  title: '開業・起業する方',
  titleShort: '開業・起業',
  heroEmoji: '🚀',
  heroTitle: '開業・起業の第一歩に、ロゴを。',
  heroDesc: '開業前後は出費が重なります。だからこそ、ロゴはコストを抑えながら品質を妥協したくない。LogoAI.jpなら最短10分・最安4,980円で、著作権証明書付きのプロ品質ロゴが完成します。',
  situationPoints: [
    '開業届を出す前にロゴを用意しておきたい',
    '看板・名刺・ウェブサイトに使えるロゴが急ぎで必要',
    'デザイン会社に頼む予算はないが品質は妥協したくない',
    '著作権が明確なロゴで商標登録も視野に入れたい',
  ],
  benefits: [
    { icon: '⚡', title: '最短10分で完成', desc: '明日の開業届提出に間に合う。入力から3案生成まで約4分。カスタマイズ込みで10分。' },
    { icon: '💰', title: '開業コストを最小化', desc: 'スタンダードプラン4,980円。デザイン会社の1/60以下のコストでプロ品質を実現。' },
    { icon: '📋', title: '著作権証明書が即発行', desc: '購入と同時に著作権帰属証明書が発行。将来の商標登録申請にも使える。' },
    { icon: '🔁', title: '7日間全額返金保証', desc: '開業前の不安を軽減。気に入らなければ7日以内に全額返金します。' },
  ],
  steps: [
    { num: '01', title: '業種と屋号を入力', desc: '開業する業種・屋号・イメージキーワードを入力するだけ。所要時間2分。', timeLabel: '2分' },
    { num: '02', title: 'AI が3案を生成', desc: 'あなたの開業業種に最適化されたフォント・カラーで3案を同時生成。', timeLabel: '2分' },
    { num: '03', title: '気に入った案をカスタマイズ', desc: 'フォント・色・字間を微調整。看板サイズから名刺まで全て確認できる。', timeLabel: '5分' },
    { num: '04', title: 'ダウンロード・著作権証明書取得', desc: 'SVG・PNG・PDF全形式をダウンロード。著作権帰属証明書も同時発行。', timeLabel: '1分' },
  ],
  faqs: [
    { question: '開業届提出前でも購入できますか？', answer: 'はい。法人登記・開業届の提出前でも購入いただけます。個人名義でご購入後、開業後に事業での使用が可能です。' },
    { question: '屋号が変わった場合はどうなりますか？', answer: 'マイページからテキストを変更して再生成できます。追加料金は不要（有料プラン）。ロゴのデザイン自体は維持したまま文字だけ変更できます。' },
    { question: '看板・のれん・チラシに使えますか？', answer: '有料プランであれば全ての商用利用が可能です。看板・のれん・チラシ・ウェブサイト・名刺など制限なくご利用いただけます。' },
    { question: '開業資金が少ないのですが、無料プランで看板に使えますか？', answer: '無料プランは著作権が当社に帰属するため、商用利用（看板・名刺等）には使用できません。商用利用には有料プラン（4,980円〜）が必要です。7日間全額返金保証があるのでご安心ください。' },
  ],
  relatedIndustries: ['restaurant', 'beauty-salon', 'it-startup', 'lawyer'],
  relatedScenes: ['solopreneur', 'freelancer', 'second-job'],
  keywords: ['開業 ロゴ 作成', '起業 ロゴ AI', '開業 ロゴ 安い', '独立開業 ロゴ 著作権', '開業届 ロゴ'],
}
```

### 3.2 フリーランサー（`freelancer`）

```typescript
{
  slug: 'freelancer',
  title: 'フリーランサー',
  titleShort: 'フリーランス',
  heroEmoji: '💻',
  heroTitle: 'フリーランスの「顔」となる、ロゴを。',
  heroDesc: 'クライアントへの提案書・ポートフォリオ・名刺にロゴがあるだけで、信頼感が段違い。LogoAI.jpなら業種・スキルに合ったプロ品質のロゴを最短10分で作れます。',
  situationPoints: [
    'クライアントへの見積書・請求書にロゴを入れたい',
    'ポートフォリオサイトやLinkedInのブランドを統一したい',
    '屋号やビジネスネームのロゴを作りたい',
    'セルフブランディングを本格的に始めたい',
  ],
  benefits: [
    { icon: '🎯', title: 'セルフブランディングを強化', desc: 'ロゴ一つで「個人」から「ブランド」へ。クライアントからの信頼感が向上します。' },
    { icon: '📄', title: '請求書・契約書に即使える', desc: 'フリーランスの必需品、請求書・見積書・提案書のヘッダーに使えるPNGを提供。' },
    { icon: '🔒', title: '著作権完全帰属で安心', desc: 'フリーランスの資産としてロゴの著作権が自分に帰属。商標登録も可能。' },
    { icon: '✏️', title: '案件ごとに再編集可能', desc: '活動分野が広がったらいつでもロゴを更新できます（有料プラン・追加料金不要）。' },
  ],
  steps: [
    { num: '01', title: '屋号・スキル・スタイルを入力', desc: '活動分野（デザイン・エンジニア・ライター等）とイメージキーワードを入力。', timeLabel: '2分' },
    { num: '02', title: 'AI が最適な3案を提案', desc: 'フリーランスとして使いやすいシンプル・プロフェッショナルなデザインを提案。', timeLabel: '2分' },
    { num: '03', title: '名刺・メール署名でテスト確認', desc: 'プレビューで名刺・メール署名サイズでの見え方を確認してから決定。', timeLabel: '5分' },
    { num: '04', title: '全形式ダウンロード', desc: '背景透過PNG・SVG・PDF。名刺印刷・デジタル利用に完全対応。', timeLabel: '1分' },
  ],
  faqs: [
    { question: 'フリーランスの屋号（例：田中デザイン）のロゴを作れますか？', answer: 'はい。屋号・ビジネスネーム・ペンネームのロゴも作成できます。日本語・英語・英数字混在のどの形式でも対応しています。' },
    { question: 'クラウドソーシングのプロフィールに使えますか？', answer: 'はい。クラウドワークス・ランサーズ等のプロフィール画像・ポートフォリオへの使用が可能です。有料プランでは商用利用が全て許可されます。' },
    { question: '複数の屋号・ブランドを持つ場合、別々にロゴを作れますか？', answer: 'はい。アカウントに紐づいた複数のロゴを管理できます。各ロゴは個別に著作権証明書が発行されます。' },
    { question: 'フリーランスから法人化した場合、ロゴの著作権はどうなりますか？', answer: '個人として購入した著作権は法人への譲渡が可能です。証明書に記載された権利帰属者情報の変更手続きは別途お問い合わせください。' },
  ],
  relatedIndustries: ['web-design', 'photography', 'design-agency', 'consulting'],
  relatedScenes: ['startup', 'solopreneur', 'designer-client'],
  keywords: ['フリーランス ロゴ 作成', 'フリーランサー ロゴ AI', '屋号 ロゴ 作成', 'フリーランス セルフブランディング', '個人 ロゴ 著作権'],
}
```

### 3.3 ECショップを開く方（`ec-shop`）

```typescript
{
  slug: 'ec-shop',
  title: 'ECショップを開く方',
  titleShort: 'ECショップ',
  heroEmoji: '🛒',
  heroTitle: 'ECショップのブランドを、ロゴから作る。',
  heroDesc: 'メルカリShops・BASE・Shopify・Amazon等のショップロゴが必要ですか？AIで最短10分・低コストで、ショップのブランドイメージに合ったロゴを著作権付きで作成できます。',
  situationPoints: [
    'BASEやメルカリShopsでショップを開きたい',
    '商品パッケージ・同梱カードにロゴを入れたい',
    'Instagramでショップのブランドを統一したい',
    'ショップ名の商標登録も考えている',
  ],
  benefits: [
    { icon: '🛍️', title: 'ショップ開設当日に使える', desc: 'BASEやメルカリShopsの開設手続き中にロゴが完成。同日オープンが可能。' },
    { icon: '📦', title: '同梱カード・パッケージに使える', desc: '有料プランでは商品への印刷・同梱物への使用が全て許可。' },
    { icon: '📱', title: 'SNSアイコン最適化', desc: 'Instagram・Twitter・LINEのプロフィール画像サイズで最適化されたデータを提供。' },
    { icon: '⭐', title: 'ショップの信頼感アップ', desc: 'ロゴがあるショップは購入者からの信頼度が高い。リピート率向上につながる。' },
  ],
  steps: [
    { num: '01', title: 'ショップ名・商材・イメージを入力', desc: '扱う商品カテゴリ（アパレル・ハンドメイド・食品等）とショップイメージを入力。', timeLabel: '2分' },
    { num: '02', title: 'AI が3案を生成', desc: 'ECショップに最適なフォント・カラーでロゴを3案提案。', timeLabel: '2分' },
    { num: '03', title: 'ショップ画面でテスト', desc: 'プレビューでショップヘッダー・商品写真の横での見え方を確認。', timeLabel: '5分' },
    { num: '04', title: '全プラットフォーム対応データを取得', desc: 'BASE・メルカリShops・Shopify各プラットフォームの推奨サイズに対応したデータを出力。', timeLabel: '1分' },
  ],
  faqs: [
    { question: 'BASEのショップロゴとして使えますか？', answer: 'はい。有料プランであればBASE・メルカリShops・Shopify・Amazon・楽天等、全てのECプラットフォームでの商用利用が可能です。' },
    { question: '商品の同梱カードや梱包資材に印刷できますか？', answer: 'はい。有料プランではOPP袋・ギフトボックス・同梱カード・ショッパーバッグ等への印刷が可能です。' },
    { question: 'ショップ名で商標登録する場合、ロゴも一緒に申請できますか？', answer: 'はい。ロゴデザインと文字（標準文字商標）の両方で商標登録申請が可能です。当サービスの著作権帰属証明書を添付できます。' },
    { question: 'ショップをリニューアルしてロゴを変えたい場合は？', answer: 'マイページからいつでも編集・再生成が可能です（有料プラン・追加料金不要）。変更後のロゴに対して新たな著作権証明書が発行されます。' },
  ],
  relatedIndustries: ['ec-retail', 'fashion', 'food-ec', 'handmade'],
  relatedScenes: ['minne-creator', 'side-job', 'startup'],
  keywords: ['EC ロゴ 作成', 'ネットショップ ロゴ AI', 'BASE ロゴ 作成', 'メルカリ ショップ ロゴ', 'ECショップ ロゴ 著作権'],
}
```

### 3.4 ハンドメイド作家（`minne-creator`）

```typescript
{
  slug: 'minne-creator',
  title: 'ハンドメイド作家',
  titleShort: 'ハンドメイド',
  heroEmoji: '🎨',
  heroTitle: 'ハンドメイド作家の世界観を、ロゴで表現する。',
  heroDesc: 'minne・Creema・iichi等で活動するハンドメイド作家さんへ。世界観・手仕事の温かみを伝えるロゴを、AIで最短10分・低コストで作成できます。',
  situationPoints: [
    'minne・Creemaのプロフィールをブランドとして整えたい',
    '作品に同梱するサンキューカードにロゴを入れたい',
    'Instagram・Pinterestで世界観を統一したい',
    '将来はブランドとして本格展開したい',
  ],
  benefits: [
    { icon: '🌸', title: '手仕事の温かみを表現するフォント', desc: 'ハンドレタリング調・筆文字系フォントで、ハンドメイドの温もりを表現。' },
    { icon: '🎀', title: 'サンキューカード用高解像度PNG', desc: '同梱カードに印刷できる高解像度データを提供。有料プランで商用利用OK。' },
    { icon: '✨', title: '作家活動名（ペンネーム）対応', desc: '日本語・英語・ひらがな・カタカナどの表記でも対応します。' },
    { icon: '🔒', title: '著作権でブランドを守る', desc: '作家ブランドのロゴの著作権が完全帰属。minne等での不正使用に対抗できる。' },
  ],
  steps: [
    { num: '01', title: '作家名・作品カテゴリ・世界観を入力', desc: 'アクセサリー・布小物・陶芸等のカテゴリと「ナチュラル」「北欧風」等のイメージを入力。', timeLabel: '2分' },
    { num: '02', title: 'AI が世界観に合う3案を提案', desc: '手仕事の温もりを表現するフォント・カラーで3案を生成。', timeLabel: '2分' },
    { num: '03', title: '同梱カードサイズでプレビュー確認', desc: '名刺・ポストカードサイズでの印刷イメージを確認してから決定。', timeLabel: '5分' },
    { num: '04', title: 'サンキューカード用データを取得', desc: 'カード印刷会社への入稿に対応した高解像度PDF・PNG（有料プラン）。', timeLabel: '1分' },
  ],
  faqs: [
    { question: 'minneのショップロゴとして使えますか？', answer: 'はい。有料プランであればminne・Creema・iichi・ハンドメイドESHOP等での商用利用が可能です。' },
    { question: 'ひらがな・カタカナの作家名でもロゴを作れますか？', answer: 'はい。ひらがな・カタカナ・漢字・英語、どの表記でも対応しています。混在も可能です。' },
    { question: '作品写真と一緒にSNSに投稿するウォーターマーク（透かし）に使えますか？', answer: 'はい。有料プランであれば透過PNGをウォーターマークとして作品写真に合成して使用できます。' },
    { question: 'ハンドメイド販売から本格的なブランドに展開する場合、商標登録はできますか？', answer: 'はい。有料プランで生成したロゴは商標登録申請に利用できます。プレミアムプランでは商標類似チェックも可能です。' },
  ],
  relatedIndustries: ['handmade', 'ec-retail', 'fashion'],
  relatedScenes: ['ec-shop', 'side-job', 'blogger'],
  keywords: ['ハンドメイド ロゴ 作成', 'minne ロゴ AI', 'Creema ロゴ 作成', '作家名 ロゴ', 'ハンドメイド 作家 ブランド'],
}
```

### 3.5 リブランディングしたい（`rebrand`）

```typescript
{
  slug: 'rebrand',
  title: 'リブランディングしたい',
  titleShort: 'リブランディング',
  heroEmoji: '🔄',
  heroTitle: '今のロゴに限界を感じたら、AIでリブランド。',
  heroDesc: '「今のロゴが古い」「事業の方向性が変わった」「ターゲットが変わった」。そんなリブランディングのニーズに、AIなら最短10分・低コストで対応できます。',
  situationPoints: [
    '現在のロゴが古くなってブランドイメージと合わなくなってきた',
    '事業拡大・方向転換に伴いブランドを刷新したい',
    'ターゲット顧客が変わりデザインを合わせたい',
    'SNS映え・デジタル時代に合わせてロゴを更新したい',
  ],
  benefits: [
    { icon: '🔄', title: '低リスクでリブランドを試せる', desc: '数百万円かかるリブランディングを、まずAIで方向性を試すことから始められる。' },
    { icon: '📊', title: '複数案を比較して選べる', desc: '3案同時生成で新旧ブランドの方向性を比較。社内・クライアントへの提案に使える。' },
    { icon: '🎯', title: '既存イメージを継承しつつ刷新', desc: '現在のブランドカラーや方向性をヒントとして入力し、継承しつつ進化させる。' },
    { icon: '⚡', title: '即座に全形式対応データを更新', desc: 'ウェブサイト・名刺・SNS全てのロゴを一括更新できるデータ形式で提供。' },
  ],
  steps: [
    { num: '01', title: '現在のロゴの課題と新方向性を入力', desc: '「今はどんなイメージか」「どう変えたいか」をキーワードで入力。現在のブランドカラーも参考として入力可。', timeLabel: '3分' },
    { num: '02', title: 'AI が新方向性の3案を生成', desc: '入力した新方向性に基づいてデザインを生成。複数の方向性を試すことも可能。', timeLabel: '2分' },
    { num: '03', title: '既存媒体でのシミュレーション', desc: '現在使用中のウェブサイト・名刺でのロゴ差し替えイメージをプレビューで確認。', timeLabel: '5分' },
    { num: '04', title: '採用ロゴをダウンロード・移行開始', desc: '全形式データをダウンロードして順次移行。著作権証明書も新ロゴで発行。', timeLabel: '1分' },
  ],
  faqs: [
    { question: '今まで使っていたロゴの著作権はどうなりますか？', answer: '既存ロゴの著作権については別途ご確認ください。当サービスで新たに生成したロゴの著作権は有料プランでユーザーへ帰属します。' },
    { question: '取引先に変更前のロゴが浸透しているが、新ロゴへの移行期間中は両方使えますか？', answer: 'はい。有料プランで購入したロゴは商用利用が無制限です。移行期間中は旧ロゴと新ロゴを並行使用しても問題ありません（旧ロゴの権利はご自身でご確認ください）。' },
    { question: '現在の会社ロゴのカラーを引き継いだリブランドはできますか？', answer: 'はい。カスタマイズ画面でHEXカラーコードを指定できるため、現在のブランドカラーを維持しつつデザインを刷新できます。' },
    { question: 'リブランド前後で商標が変わる場合は？', answer: 'ロゴが大きく変わる場合、新ロゴで改めて商標登録申請が必要になります。当サービスの著作権帰属証明書と商標類似チェック（プレミアム）をご活用ください。' },
  ],
  relatedIndustries: ['it-startup', 'ec-retail', 'restaurant'],
  relatedScenes: ['logo-renewal', 'startup', 'consultant'],
  keywords: ['リブランディング ロゴ AI', 'ロゴ リニューアル 安い', '会社ロゴ 変更 作成', 'ブランドリニューアル ロゴ', 'リブランド ロゴ 著作権'],
}
```

---

## 4. SEO完全規範

### 4.1 メタデータテンプレート

```
Title:       {scene.title}向けAIロゴ | {scene.metaKeyword}【LogoAI.jp】
Description: {scene.metaDescription} ※120字以内で各シーンのメリットを凝縮
Canonical:   https://logoai.jp/for/{scene.slug}
OG Image:    https://logoai.jp/og/for/{scene.slug}.png
```

### 4.2 H1〜H2キーワード配置ルール

| 見出し | テンプレート |
|---|---|
| H1 | `scene.heroTitle`（シーン特化・感情訴求型） |
| H2（メリット） | `{scene.title}がLogoAI.jpを選ぶ理由` |
| H2（ステップ） | `{scene.title}がロゴを作る流れ` |
| H2（事例） | `{scene.title}が作ったロゴ事例` |
| H2（FAQ） | `{scene.title}からよく聞かれること` |
| H2（CTA） | `{scene.title}の第一歩を、今日のロゴから始める。` |

---

## 5. 構造化データ

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://logoai.jp/" },
    { "@type": "ListItem", "position": 2, "name": "{scene.title}向けロゴ",
      "item": "https://logoai.jp/for/{slug}" }
  ]
}
```

### FAQPage（4問）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "{faq.question}",
      "acceptedAnswer": { "@type": "Answer", "text": "{faq.answer}" } }
  ]
}
```

---

## 6. コンポーネント構成

```
app/for/[slug]/page.tsx

components/scene/
├── SceneHero.tsx
├── SceneBenefits.tsx
├── SceneSteps.tsx
├── SceneWorksGallery.tsx       # /worksコンポーネント流用
├── ScenePricing.tsx            # /pricing PlanCard流用
├── SceneFAQ.tsx
├── SceneRelated.tsx            # 関連業種・シーンリンク
└── SceneCTA.tsx

lib/
└── scene-data.ts               # SCENE_LIST（全シーンデータ）
```

---

*文档版本：v1.0 | 最終更新：2025年2月*
