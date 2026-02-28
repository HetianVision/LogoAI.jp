# 比较页模板规格书 `/vs/[competitor]`

> **文档用途**：交付AI开发者直接实现。一套模板，覆盖所有竞品对比页面。
> **路由规则**：`/vs/[slug]`，例如 `/vs/canva`、`/vs/wix-logo`
> **页面类型**：コンペティター比較SEOランディングページ
> **战略定位**：「CanvaとLogoAI.jp どっちが良い」「AIロゴ 比較」等の
>               検討期ユーザーを獲得し、LogoAI.jpの優位性（日本語特化・著作権）を示して転換する。
> **重要方針**：競合他社を侮辱・誹謗しない。客観的な機能比較で優位性を示す。

---

## 1. 路由与数据结构

### 1.1 静态路径生成

```typescript
// app/vs/[slug]/page.tsx

export async function generateStaticParams() {
  return COMPETITOR_LIST.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const competitor = COMPETITOR_LIST.find(c => c.slug === params.slug)
  if (!competitor) notFound()
  return {
    title: `LogoAI.jp vs ${competitor.name} | ${competitor.comparisonKeyword}【比較2025】`,
    description: `LogoAI.jpと${competitor.name}を徹底比較。${competitor.metaDesc}`,
    canonical: `https://logoai.jp/vs/${competitor.slug}`,
  }
}
```

### 1.2 CompetitorData 型定義

```typescript
interface CompetitorData {
  slug: string
  name: string                        // "Canva"
  nameJa: string                      // "キャンバ"
  category: 'global-design' | 'ai-logo' | 'local-design' | 'vector-tool'
  comparisonKeyword: string           // "Canva ロゴ 比較"
  metaDesc: string                    // 120字メタ説明
  tagline: string                     // 競合サービスの一言説明
  websiteUrl: string                  // 公式サイトURL（nofollow rel付き）
  heroSummary: string                 // 「一言でいうと」比較サマリー
  logoaiWins: string[]                // LogoAI.jpが優れている点（3〜4点）
  competitorWins: string[]            // 競合が優れている点（正直に記載・1〜2点）
  featureComparison: FeatureRow[]     // 機能比較テーブル行
  targetUser: TargetUser             // どちらが誰向けか
  faqs: FAQItem[]                     // 比較に関するFAQ 4問
  verdict: string                     // 最終結論テキスト
}

interface FeatureRow {
  feature: string           // 機能名
  logoai: FeatureValue      // LogoAI.jpの評価
  competitor: FeatureValue  // 競合の評価
  note?: string             // 補足説明
}

type FeatureValue =
  | { type: 'check' }                    // ✓ あり
  | { type: 'cross' }                    // ✗ なし
  | { type: 'partial'; label: string }   // △ 部分的
  | { type: 'text'; label: string }      // テキスト表示

interface TargetUser {
  logoai: string    // "日本語ロゴと著作権を重視する事業者"
  competitor: string // "デザイン全般を幅広くこなしたい方"
}
```

### 1.3 競合一覧（全スラッグ）

```typescript
export const COMPETITOR_LIST: CompetitorData[] = [
  // === グローバルデザインツール ===
  { slug: 'canva',        name: 'Canva',        nameJa: 'キャンバ',        category: 'global-design' },
  { slug: 'adobe-express', name: 'Adobe Express', nameJa: 'アドビエクスプレス', category: 'global-design' },
  // === AIロゴ特化ツール ===
  { slug: 'looka',        name: 'Looka',        nameJa: 'ルーカ',          category: 'ai-logo' },
  { slug: 'wix-logo',     name: 'Wix Logo Maker', nameJa: 'Wixロゴメーカー', category: 'ai-logo' },
  { slug: 'tailor-brands', name: 'Tailor Brands', nameJa: 'テイラーブランズ', category: 'ai-logo' },
  { slug: 'looka-jp',     name: '代替AIロゴツール全般', nameJa: 'AIロゴツール全般', category: 'ai-logo' },
  // === ベクターツール ===
  { slug: 'illustrator',  name: 'Adobe Illustrator', nameJa: 'イラストレーター', category: 'vector-tool' },
  // === 日本ローカル ===
  { slug: 'designevo',    name: 'DesignEvo',    nameJa: 'デザインエボ',    category: 'global-design' },
]
```

---

## 2. ページ構成（HTMLテンプレート）

### 2.1 Section 1：Page Hero（比較サマリー）

```html
<section class="vs-hero">
  <div class="vs-hero-bg" aria-hidden="true"><div class="bg-grid"></div></div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">LogoAI.jp vs {{ competitor.name }}</li>
      </ol>
    </nav>
    <div class="vs-hero-content">
      <span class="section-eyebrow">サービス比較 2025年版</span>
      <h1>LogoAI.jp vs {{ competitor.name }}<br>
        <span class="h1-sub">どちらが日本の事業者に向いているか</span>
      </h1>
      <p class="vs-hero-desc">{{ competitor.heroSummary }}</p>

      <!-- vs バナー -->
      <div class="vs-banner">
        <div class="vs-side vs-side-logoai">
          <div class="vs-service-name">LogoAI.jp</div>
          <div class="vs-service-tag">日本語特化 × 著作権</div>
        </div>
        <div class="vs-label" aria-label="versus">VS</div>
        <div class="vs-side vs-side-competitor">
          <div class="vs-service-name">{{ competitor.name }}</div>
          <div class="vs-service-tag">{{ competitor.tagline }}</div>
        </div>
      </div>

      <!-- クイック結論 -->
      <div class="vs-quick-verdict">
        <div class="vqv-logoai-wins">
          <div class="vqv-header vqv-header-logoai">LogoAI.jpが優れている点</div>
          <ul class="vqv-list">
            {% for win in competitor.logoaiWins %}
            <li><span class="vqv-check">✓</span> {{ win }}</li>
            {% endfor %}
          </ul>
        </div>
        <div class="vqv-competitor-wins">
          <div class="vqv-header vqv-header-competitor">{{ competitor.name }}が優れている点</div>
          <ul class="vqv-list">
            {% for win in competitor.competitorWins %}
            <li><span class="vqv-check vqv-check-gray">→</span> {{ win }}</li>
            {% endfor %}
          </ul>
        </div>
      </div>

      <div class="vs-hero-cta">
        <a href="/create" class="btn-primary btn-primary-lg">LogoAI.jpを無料で試す →</a>
        <a href="#comparison-table" class="btn-secondary">詳細比較を見る</a>
      </div>
    </div>
  </div>
</section>
```

```css
.vs-hero {
  padding: calc(64px + 60px) var(--container-px) 64px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.vs-hero-content {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.vs-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  margin: 12px 0 20px;
}

.h1-sub {
  font-size: var(--text-2xl);
  font-weight: 500;
  color: var(--color-text-secondary);
  display: block;
  margin-top: 8px;
}

.vs-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 32px;
}

/* vs バナー */
.vs-banner {
  display: flex;
  align-items: center;
  gap: 0;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

.vs-side {
  flex: 1;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.vs-side-logoai { background: rgba(26,58,42,0.03); }
.vs-side-competitor { background: var(--color-bg-section); }

.vs-service-name {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.vs-side-logoai .vs-service-name { color: var(--color-primary); }

.vs-service-tag {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 500;
}

.vs-label {
  padding: 0 20px;
  font-family: var(--font-number);
  font-size: var(--text-xl);
  font-weight: 900;
  color: var(--color-text-muted);
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  background: white;
  height: 100%;
  display: flex;
  align-items: center;
}

/* クイック結論 */
.vs-quick-verdict {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
  text-align: left;
}

.vqv-logoai-wins, .vqv-competitor-wins {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.vqv-header {
  padding: 12px 16px;
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.vqv-header-logoai { background: rgba(45,122,79,0.08); color: var(--color-success); }
.vqv-header-competitor { background: var(--color-bg-section); color: var(--color-text-muted); }

.vqv-list {
  list-style: none;
  padding: 12px 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
}

.vqv-list li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.vqv-check { color: var(--color-success); font-weight: 700; flex-shrink: 0; }
.vqv-check-gray { color: var(--color-text-muted); flex-shrink: 0; }

.vs-hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
```

### 2.2 Section 2：詳細機能比較テーブル

```html
<section class="vs-table-section" id="comparison-table" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">詳細比較</span>
      <h2>LogoAI.jp vs {{ competitor.name }} 機能比較表</h2>
    </div>

    <div class="vs-table-wrap animate-on-scroll">
      <table class="vs-table">
        <!-- ヘッダー -->
        <thead>
          <tr>
            <th class="vst-feature-col">機能・サービス</th>
            <th class="vst-logoai-col">
              <span class="vst-service-name">LogoAI.jp</span>
              <span class="vst-service-note">日本語特化AIロゴ</span>
            </th>
            <th class="vst-competitor-col">
              <span class="vst-service-name">{{ competitor.name }}</span>
              <span class="vst-service-note">{{ competitor.tagline }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {% for row in competitor.featureComparison %}
          <tr>
            <td class="vst-feature">{{ row.feature }}
              {% if row.note %}
              <span class="vst-note" title="{{ row.note }}">?</span>
              {% endif %}
            </td>
            <td class="vst-val vst-val-logoai">
              {% if row.logoai.type == 'check' %}
              <span class="vstv-check">✓</span>
              {% elif row.logoai.type == 'cross' %}
              <span class="vstv-cross">✗</span>
              {% elif row.logoai.type == 'partial' %}
              <span class="vstv-partial">△</span>
              <span class="vstv-label">{{ row.logoai.label }}</span>
              {% else %}
              <span class="vstv-text">{{ row.logoai.label }}</span>
              {% endif %}
            </td>
            <td class="vst-val vst-val-competitor">
              {% if row.competitor.type == 'check' %}
              <span class="vstv-check">✓</span>
              {% elif row.competitor.type == 'cross' %}
              <span class="vstv-cross">✗</span>
              {% elif row.competitor.type == 'partial' %}
              <span class="vstv-partial">△</span>
              <span class="vstv-label">{{ row.competitor.label }}</span>
              {% else %}
              <span class="vstv-text">{{ row.competitor.label }}</span>
              {% endif %}
            </td>
          </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>

    <!-- テーブル下注釈 -->
    <p class="vs-table-note animate-on-scroll">
      ※ 本比較表は各サービスの公開情報をもとに2025年2月時点で作成しました。
      サービス内容は変更される場合があります。
      最新情報は各サービスの公式サイトでご確認ください。
    </p>
  </div>
</section>
```

```css
.vs-table-section { padding: var(--section-py) var(--container-px); }

.vs-table-wrap {
  max-width: 860px;
  margin: 0 auto 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.vs-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.vs-table thead tr {
  border-bottom: 2px solid var(--color-border);
}

.vst-feature-col {
  width: 40%;
  padding: 16px 24px;
  text-align: left;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-muted);
  background: var(--color-bg-section);
}

.vst-logoai-col, .vst-competitor-col {
  width: 30%;
  padding: 16px 24px;
  text-align: center;
}

.vst-logoai-col {
  background: rgba(26,58,42,0.04);
  border-left: 2px solid var(--color-primary);
}

.vst-service-name {
  display: block;
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: 2px;
}

.vst-logoai-col .vst-service-name { color: var(--color-primary); }

.vst-service-note {
  display: block;
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-muted);
}

.vs-table tbody tr { border-bottom: 1px solid var(--color-border); }
.vs-table tbody tr:last-child { border-bottom: none; }

.vst-feature {
  padding: 14px 24px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.vst-note {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.6rem;
  cursor: help;
  margin-left: 4px;
  vertical-align: middle;
}

.vst-val {
  padding: 14px 20px;
  text-align: center;
  font-size: var(--text-sm);
}

.vst-val-logoai { background: rgba(26,58,42,0.02); border-left: 2px solid var(--color-primary); }

.vstv-check { color: var(--color-success); font-weight: 700; font-size: var(--text-lg); }
.vstv-cross { color: #C41E3A; font-weight: 700; font-size: var(--text-lg); }
.vstv-partial { color: var(--color-accent); font-weight: 700; }
.vstv-label { display: block; font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px; }
.vstv-text { font-size: var(--text-sm); color: var(--color-text-primary); font-weight: 500; }

.vs-table-note {
  max-width: 860px;
  margin: 0 auto;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .vst-feature-col, .vst-logoai-col, .vst-competitor-col { padding: 12px; }
  .vst-feature, .vst-val { padding: 12px; font-size: var(--text-xs); }
}
```

### 2.3 Section 3：「どちらがあなたに向いているか」

```html
<section class="vs-whichone-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">向いている方</span>
      <h2>どちらがあなたに向いているか</h2>
    </div>

    <div class="vs-whichone-grid animate-on-scroll">

      <div class="vwo-card vwo-card-logoai">
        <div class="vwo-service">LogoAI.jpが向いている方</div>
        <ul class="vwo-list">
          <li>日本語フォントにこだわりたい方</li>
          <li>著作権帰属証明書が必要な方</li>
          <li>商標登録申請を視野に入れている方</li>
          <li>日本の飲食店・美容室・士業等の方</li>
          <li>ロゴ専用ツールで最高品質を求める方</li>
        </ul>
        <a href="/create" class="vwo-cta">LogoAI.jpを無料で試す →</a>
      </div>

      <div class="vwo-card vwo-card-competitor">
        <div class="vwo-service">{{ competitor.name }}が向いている方</div>
        <ul class="vwo-list">
          {% for item in competitor.targetUser.competitorItems %}
          <li>{{ item }}</li>
          {% endfor %}
        </ul>
        <a href="{{ competitor.websiteUrl }}" target="_blank" rel="noopener noreferrer nofollow"
           class="vwo-cta vwo-cta-competitor">
          {{ competitor.name }}の公式サイトへ →
        </a>
      </div>

    </div>
  </div>
</section>
```

```css
.vs-whichone-section { padding: var(--section-py) var(--container-px); background: var(--color-bg-section); }

.vs-whichone-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 840px;
  margin: 0 auto;
}

.vwo-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  background: white;
}

.vwo-card-logoai { border-color: var(--color-primary); }

.vwo-service {
  padding: 16px 24px;
  font-size: var(--text-sm);
  font-weight: 700;
}

.vwo-card-logoai .vwo-service { background: var(--color-primary); color: white; }
.vwo-card-competitor .vwo-service { background: var(--color-bg-section); color: var(--color-text-secondary); }

.vwo-list {
  list-style: none;
  padding: 20px 24px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.vwo-list li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  padding-left: 20px;
  position: relative;
}

.vwo-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-text-muted);
}

.vwo-card-logoai .vwo-list li::before { color: var(--color-primary); content: '✓'; }

.vwo-cta {
  display: block;
  margin: 0 20px 20px;
  padding: 12px;
  background: var(--color-primary);
  color: white;
  text-align: center;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}

.vwo-cta:hover { background: var(--color-primary-hover); }

.vwo-cta-competitor {
  background: white;
  color: var(--color-text-secondary);
  border: 1.5px solid var(--color-border);
}

.vwo-cta-competitor:hover { background: var(--color-bg-section); }

@media (max-width: 640px) { .vs-whichone-grid { grid-template-columns: 1fr; } }
```

### 2.4 Section 4：LogoAI.jpの日本語特化優位性（詳細説明）

```html
<section class="vs-advantage-section">
  <div class="container">
    <div class="vs-advantage-grid animate-on-scroll">

      <div class="advantage-text">
        <span class="section-eyebrow">LogoAI.jpの強み</span>
        <h2>{{ competitor.name }}にはない、<br>日本特化の3つの強み</h2>
        <div class="advantage-points">
          <div class="adv-point">
            <div class="adv-num">01</div>
            <div class="adv-content">
              <strong>日本語フォント100種以上の専門選択</strong>
              <p>{{ competitor.name }}の日本語フォント対応は限定的です。LogoAI.jpは游明朝・ヒラギノ・BIZ UDゴシック等100種以上の商用利用可能な日本語フォントを搭載し、業種・ブランドイメージに最適なフォントをAIが自動選択します。</p>
            </div>
          </div>
          <div class="adv-point">
            <div class="adv-num">02</div>
            <div class="adv-content">
              <strong>著作権帰属証明書の自動発行</strong>
              <p>AIロゴの著作権は日本の法令上デリケートな問題です。LogoAI.jpは文化庁ガイドラインに基づいた著作権帰属証明書を有料プランで自動発行します。{{ competitor.name }}ではこのような証明書を提供していません。</p>
            </div>
          </div>
          <div class="adv-point">
            <div class="adv-num">03</div>
            <div class="adv-content">
              <strong>日本の商標登録申請への対応</strong>
              <p>LogoAI.jpのロゴは特許庁への商標登録申請に利用できます。プレミアムプランではJ-PlatPat連携の商標類似チェックも提供。{{ competitor.name }}は国際的なサービスであり、日本の商標制度への特化対応はありません。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 数字による比較（視覚的） -->
      <div class="advantage-visual animate-on-scroll" style="--anim-delay: 0.15s">
        <div class="adv-numbers">
          <div class="adv-num-card">
            <div class="anc-num">100<span class="anc-unit">種+</span></div>
            <div class="anc-label">LogoAI.jpの日本語フォント数</div>
            <div class="anc-compare">vs {{ competitor.name }}: 約10〜20種</div>
          </div>
          <div class="adv-num-card adv-num-card-accent">
            <div class="anc-num">100<span class="anc-unit">%</span></div>
            <div class="anc-label">有料プランの著作権帰属率</div>
            <div class="anc-compare">{{ competitor.name }}: 規約上曖昧な場合あり</div>
          </div>
          <div class="adv-num-card">
            <div class="anc-num">47</div>
            <div class="anc-label">日本向け業種特化数</div>
            <div class="anc-compare">{{ competitor.name }}: 業種特化なし</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

```css
.vs-advantage-section { padding: var(--section-py) var(--container-px); }

.vs-advantage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
  max-width: var(--container-max);
  margin: 0 auto;
}

.advantage-text h2 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.35;
  margin: 12px 0 28px;
}

.advantage-points { display: flex; flex-direction: column; gap: 24px; }

.adv-point { display: flex; gap: 16px; align-items: flex-start; }

.adv-num {
  font-family: var(--font-number);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-accent);
  flex-shrink: 0;
  width: 24px;
  margin-top: 2px;
}

.adv-content strong { display: block; font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px; }
.adv-content p { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6; margin: 0; }

/* 数字カード */
.adv-numbers { display: flex; flex-direction: column; gap: 16px; }

.adv-num-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 20px 24px;
}

.adv-num-card-accent { border-color: var(--color-accent); background: rgba(201,150,58,0.03); }

.anc-num {
  font-family: var(--font-number);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 8px;
}

.adv-num-card-accent .anc-num { color: var(--color-accent); }

.anc-unit { font-size: 1rem; }

.anc-label { font-size: var(--text-sm); font-weight: 700; color: var(--color-text-primary); margin-bottom: 4px; }
.anc-compare { font-size: var(--text-xs); color: var(--color-text-muted); }

@media (max-width: 1024px) { .vs-advantage-grid { grid-template-columns: 1fr; gap: 40px; } }
```

### 2.5 Section 5：比較FAQ（4問）

```html
<section class="vs-faq-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">よくある疑問</span>
      <h2>LogoAI.jpと{{ competitor.name }}の違いに関する疑問</h2>
    </div>
    <div class="faq-accordion-list animate-on-scroll" style="max-width: 760px; margin: 0 auto">
      <!-- 4問 accordion（competitor.faqs から） -->
    </div>
  </div>
</section>
```

### 2.6 Section 6：最終結論

```html
<section class="vs-verdict-section">
  <div class="container">
    <div class="vs-verdict-card animate-on-scroll">
      <div class="vvc-header">
        <span class="section-eyebrow">結論</span>
        <h2>LogoAI.jp vs {{ competitor.name }} まとめ</h2>
      </div>
      <p class="vvc-body">{{ competitor.verdict }}</p>
      <div class="vvc-cta">
        <a href="/create" class="btn-primary btn-primary-lg">LogoAI.jpを無料で試す →</a>
        <p class="vvc-note">
          クレジットカード不要 · 最短10分 · 7日間全額返金保証
        </p>
      </div>
    </div>
  </div>
</section>
```

```css
.vs-verdict-section { padding: var(--section-py) var(--container-px); }

.vs-verdict-card {
  max-width: 760px;
  margin: 0 auto;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 48px;
  text-align: center;
  box-shadow: var(--shadow-md);
}

.vvc-header h2 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 8px 0 20px;
}

.vvc-body {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 32px;
  text-align: left;
}

.vvc-cta { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.vvc-note { font-size: var(--text-xs); color: var(--color-text-muted); }
```

---

## 3. 具体競合データ例（上位3件）

### 3.1 Canva（`canva`）

```typescript
{
  slug: 'canva',
  name: 'Canva',
  nameJa: 'キャンバ',
  category: 'global-design',
  tagline: 'デザイン全般対応ツール',
  comparisonKeyword: 'Canva ロゴ 比較',
  websiteUrl: 'https://www.canva.com',
  heroSummary: 'Canvaは汎用デザインツールとして優れていますが、日本語フォントの選択肢と著作権の明確さでは、日本特化のLogoAI.jpに分があります。日本の事業者がビジネスロゴを作る目的なら、LogoAI.jpがより適しています。',
  logoaiWins: [
    '日本語フォント100種以上（Canvaは日本語フォント約20種）',
    '著作権帰属証明書を自動発行（Canvaでは発行なし）',
    '文化庁ガイドライン準拠の著作権整理（Canvaは規約が複雑）',
    '日本の商標登録申請に対応（Canvaは非対応）',
    '業種別AIロゴ最適化（Canvaは業種特化なし）',
  ],
  competitorWins: [
    'バナー・プレゼン・SNS投稿など広範なデザイン機能',
    '無料プランでも多くのデザイン機能を利用可能',
  ],
  featureComparison: [
    { feature: '日本語フォント数', logoai: { type: 'text', label: '100種以上' }, competitor: { type: 'text', label: '約20種' } },
    { feature: 'ロゴ特化AI生成', logoai: { type: 'check' }, competitor: { type: 'partial', label: 'ロゴマーカー機能あり' } },
    { feature: '著作権帰属証明書', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '商標登録申請対応', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: 'J-PlatPat商標類似チェック', logoai: { type: 'partial', label: 'プレミアムのみ' }, competitor: { type: 'cross' } },
    { feature: 'SVGダウンロード', logoai: { type: 'check' }, competitor: { type: 'partial', label: '有料プランのみ' } },
    { feature: '業種別AI最適化（47業種）', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '7日間全額返金保証', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '無料プランでの商用利用', logoai: { type: 'cross' }, competitor: { type: 'partial', label: '一部可能（条件あり）' } },
    { feature: 'バナー・プレゼン等の汎用デザイン', logoai: { type: 'cross' }, competitor: { type: 'check' } },
    { feature: '日本語サポート', logoai: { type: 'check' }, competitor: { type: 'check' } },
    { feature: '最低価格（ロゴ1点）', logoai: { type: 'text', label: '¥4,980（スタンダード）' }, competitor: { type: 'text', label: '¥1,500/月〜（Canva Pro）' } },
  ],
  targetUser: {
    logoai: '日本の事業者・士業・飲食店等、日本語フォントと著作権証明書が必要な方',
    competitorItems: [
      'バナー・SNS投稿・プレゼン等ロゴ以外のデザインもこなしたい方',
      '月額サブスクリプションでデザインツール全体を利用したい方',
      'ロゴの著作権・商標登録を特に考えていない方',
    ],
  },
  faqs: [
    { question: 'CanvaのロゴとLogoAI.jpのロゴはどちらが著作権的に安全ですか？',
      answer: 'LogoAI.jpの有料プランの方が明確です。Canvaの利用規約では、Canvaが提供する素材を使用したデザインの著作権はユーザーに帰属しますが、素材自体の使用条件はCanvaのライセンス規約に従います。LogoAI.jpの有料プランでは著作権帰属証明書を発行し、権利関係を明確にしています。' },
    { question: 'Canvaで作ったロゴを商標登録できますか？',
      answer: 'Canvaで作成したロゴの商標登録申請は技術的には可能ですが、Canvaの利用規約の解釈によっては素材部分の権利が曖昧になる場合があります。LogoAI.jpの有料プランでは著作権帰属証明書を提供し、商標登録申請への使用を明確にサポートしています。' },
    { question: 'Canvaの日本語フォントは少ないのですか？',
      answer: 'Canvaは世界向けの汎用ツールであり、日本語フォントの選択肢はおよそ20種程度です。LogoAI.jpは日本語ロゴに特化しており、100種以上の商用利用可能な日本語フォントを搭載しています。' },
    { question: 'LogoAI.jpとCanvaを併用することはできますか？',
      answer: 'はい。LogoAI.jpでロゴを作成し、その後Canvaで名刺・バナー・SNS投稿に組み込むという使い方が最も効率的です。LogoAI.jpのSVGファイルはCanvaにインポートできます。' },
  ],
  verdict: 'Canvaは汎用デザインツールとして優秀ですが、ロゴ専用ツールではありません。日本の事業者が著作権の明確なビジネスロゴを作る目的であれば、日本語フォント100種以上・著作権帰属証明書・商標登録対応を備えたLogoAI.jpが適しています。Canvaとの最適な使い分けは「LogoAI.jpでロゴを作り、Canvaで各種デザイン物に組み込む」という方法です。',
}
```

### 3.2 Looka（`looka`）

```typescript
{
  slug: 'looka',
  name: 'Looka',
  nameJa: 'ルーカ',
  category: 'ai-logo',
  tagline: '海外AIロゴ作成ツール',
  comparisonKeyword: 'Looka ロゴ 比較',
  websiteUrl: 'https://looka.com',
  heroSummary: 'LookaはAIロゴ作成の先駆けとして優れたサービスですが、日本語フォント・日本の著作権法対応・日本語サポートの面でLogoAI.jpが大きく上回ります。日本の事業者には国産のLogoAI.jpをお勧めします。',
  logoaiWins: [
    '日本語フォント100種以上（Lookaは日本語フォント非対応）',
    '日本の著作権法・文化庁ガイドライン準拠の証明書発行',
    '日本語完全対応・日本語カスタマーサポート',
    '日本の商標登録・J-PlatPat連携（プレミアム）',
    '47業種の日本向け業種特化AIデータ',
    '料金の円建て決済・日本のクレジットカード対応',
  ],
  competitorWins: [
    '英語ブランドロゴの生成品質が高い',
    'ブランドキットの総合的な機能（名刺・ウェブサイト等）',
  ],
  featureComparison: [
    { feature: '日本語フォント対応', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '日本語カスタマーサポート', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '日本の著作権法準拠', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '著作権帰属証明書（日本語）', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: 'J-PlatPat商標類似チェック', logoai: { type: 'partial', label: 'プレミアムのみ' }, competitor: { type: 'cross' } },
    { feature: 'AIロゴ専用生成', logoai: { type: 'check' }, competitor: { type: 'check' } },
    { feature: '日本向け業種特化（47業種）', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '7日間全額返金保証', logoai: { type: 'check' }, competitor: { type: 'partial', label: '7日間（英語のみ）' } },
    { feature: '円建て決済', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: 'SVGダウンロード', logoai: { type: 'check' }, competitor: { type: 'check' } },
    { feature: '英語ブランドロゴ生成', logoai: { type: 'check' }, competitor: { type: 'check' } },
  ],
  targetUser: {
    logoai: '日本の事業者・日本語屋号のロゴ作成・著作権証明書が必要な方',
    competitorItems: [
      '英語ブランドのロゴを作成したい方',
      '海外展開を主として考えている方',
    ],
  },
  faqs: [
    { question: 'LookaとLogoAI.jpの最大の違いは何ですか？',
      answer: '最大の違いは日本語対応です。Lookaはカナダ発の英語ツールであり、日本語フォントには非対応です。LogoAI.jpは日本語フォント100種以上を搭載し、日本の著作権法・商標制度に準拠した証明書を発行します。' },
    { question: 'LookaのロゴはCanvaのようにSVGでダウンロードできますか？',
      answer: 'Lookaは有料プランでSVGのダウンロードに対応しています。LogoAI.jpのスタンダードプランでも同様にSVGのダウンロードが可能です。' },
    { question: 'LookaのロゴをそのままLogoAI.jpで再作成できますか？',
      answer: 'はい。LogoAI.jpでブランド名・業種・希望スタイルを入力し直すことで、Lookaで気に入っていたデザインの方向性を参考に新たなロゴを生成することができます。' },
    { question: 'LookaとLogoAI.jpは料金体系が違いますか？',
      answer: 'Lookaは基本的にサブスクリプション型（月額・年額）、LogoAI.jpは1ロゴ単位の買い切り型です。頻繁にロゴを作る場合はLooka、1ブランド向けに確実なロゴが欲しい場合はLogoAI.jpが向いています。' },
  ],
  verdict: 'Lookaは優れたAIロゴツールですが、日本語フォントへの非対応が日本の事業者にとって致命的な弱点です。屋号・店名・事務所名のロゴを日本語で作る場合、LogoAI.jpを強くお勧めします。英語ブランドロゴのみが必要な場合はLookaも選択肢になりますが、日本向けの著作権証明書・商標サポートが必要であればLogoAI.jpの一択です。',
}
```

### 3.3 Adobe Illustrator（`illustrator`）

```typescript
{
  slug: 'illustrator',
  name: 'Adobe Illustrator',
  nameJa: 'イラストレーター',
  category: 'vector-tool',
  tagline: 'プロ向けベクターデザインツール',
  comparisonKeyword: 'Illustrator ロゴ 自作 比較',
  websiteUrl: 'https://www.adobe.com/jp/products/illustrator.html',
  heroSummary: 'Adobe Illustratorはプロのデザイナーが使う最高品質のツールですが、デザイン知識・習熟時間・月額コストが高く、一般の事業者には不向きです。最短10分でロゴが完成するLogoAI.jpとは比較の対象自体が異なります。',
  logoaiWins: [
    'デザイン知識ゼロでも最短10分でロゴ完成',
    '月額3,280円の継続コスト不要（1ロゴ4,980円の買い切り）',
    'AI自動生成でフォント選択・カラー調和を自動化',
    '著作権帰属証明書を自動発行',
    '商標登録申請に必要なデータを一括提供',
  ],
  competitorWins: [
    'プロデザイナーによる完全カスタムデザインが可能',
    'ロゴ以外の全てのビジュアルデザインに対応',
    '細部の微調整・複雑なグラフィック作成が可能',
  ],
  featureComparison: [
    { feature: '必要なデザインスキル', logoai: { type: 'text', label: '不要' }, competitor: { type: 'text', label: '専門スキル必須' } },
    { feature: 'ロゴ完成までの時間', logoai: { type: 'text', label: '最短10分' }, competitor: { type: 'text', label: '数時間〜数日' } },
    { feature: 'AI自動生成', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: '月額コスト', logoai: { type: 'text', label: '不要（買い切り）' }, competitor: { type: 'text', label: '¥3,280/月〜' } },
    { feature: '著作権帰属証明書', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: 'カスタムデザインの自由度', logoai: { type: 'partial', label: '限定的' }, competitor: { type: 'check' } },
    { feature: 'ロゴ以外のデザイン作業', logoai: { type: 'cross' }, competitor: { type: 'check' } },
    { feature: '日本語フォント100種', logoai: { type: 'check' }, competitor: { type: 'check' } },
    { feature: '7日間全額返金保証', logoai: { type: 'check' }, competitor: { type: 'cross' } },
    { feature: 'SVG出力', logoai: { type: 'check' }, competitor: { type: 'check' } },
  ],
  targetUser: {
    logoai: 'デザイン知識なしで短時間・低コストでロゴを完成させたい事業者',
    competitorItems: [
      'グラフィックデザインの専門家・デザイン事務所',
      'ロゴ以外にも印刷物・ブランドデザイン全体を制作したい方',
      '完全カスタムの独自デザインを追求したい方',
    ],
  },
  faqs: [
    { question: 'IllustratorとLogoAI.jpの最大の違いは何ですか？',
      answer: 'Illustratorはプロデザイナーのためのツールでデザインスキルが必須です。LogoAI.jpはAIが自動生成するためデザイン知識ゼロでも最短10分でプロ品質のロゴが完成します。また、LogoAI.jpは著作権帰属証明書を発行しますが、Illustratorではデザイナーがロゴを作成しても証明書は発行されません。' },
    { question: 'デザイナーにIllustratorで作ってもらうのとどちらが良いですか？',
      answer: '予算と時間で選択します。デザイン会社に依頼すると30万円以上・数週間かかるのが一般的です。LogoAI.jpなら4,980円・最短10分で著作権証明書付きのロゴが完成します。開業初期のコスト削減にはLogoAI.jpが効果的です。' },
    { question: 'LogoAI.jpで作ったロゴをIllustratorで後から編集できますか？',
      answer: 'はい。LogoAI.jpのSVGファイルはIllustratorで開いて編集できます。基本ロゴをLogoAI.jpで作成し、細部をIllustratorで微調整するという方法も可能です。' },
    { question: 'Illustratorで自作したロゴの著作権はどうなりますか？',
      answer: 'ご自身でIllustratorを使ってゼロから作成したロゴの著作権は作成者に帰属します。ただし証明書は発行されないため、将来的に権利を証明する必要がある場合は記録を保管しておくことを推奨します。' },
  ],
  verdict: 'Adobe Illustratorはプロデザイナーのためのツールであり、デザイン知識のない事業者が開業用ロゴを作るためのツールではありません。最短10分・4,980円で著作権証明書付きのプロ品質ロゴを得たいならLogoAI.jpが最適です。Illustratorはロゴ作成後に名刺・チラシ等の各種デザイン物を自作する方向けのツールとして併用することをお勧めします。',
}
```

---

## 4. SEO完全規範

### 4.1 メタデータテンプレート

```
Title:       LogoAI.jp vs {competitor.name} | {competitor.comparisonKeyword}【比較2025年版】
Description: LogoAI.jpと{competitor.name}を詳細比較。{competitor.metaDesc}
Canonical:   https://logoai.jp/vs/{slug}
OG Image:    https://logoai.jp/og/vs/{slug}.png（比較バナー画像）
```

### 4.2 キーワード布局

| 位置 | キーワード例（Canvaの場合） |
|---|---|
| H1 | 「LogoAI.jp vs Canva」 |
| H2（比較表） | 「LogoAI.jp vs Canva 機能比較表」 |
| H2（向いている方） | 「どちらがあなたに向いているか」 |
| H2（強み） | 「Canvaにはない日本特化の3つの強み」 |
| FAQ Q | 「CanvaのロゴとLogoAI.jpのロゴ 著作権」等 |

### 4.3 内部リンク戦略

```
/vs/canva → /copyright（著作権の詳細）
/vs/canva → /pricing（料金比較）
/vs/looka → /trademark（商標登録対応）
各/vsページ → /works（事例ギャラリー）
各/vsページ → /create（コンバージョン）
```

---

## 5. 構造化データ

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

## 6. 编辑方针（重要）

比较页的写作原则：

1. **事実に基づく比較のみ**：各競合のスペックは公式サイト・利用規約から確認した事実のみ記載
2. **誹謗中傷禁止**：「〇〇は使えない」等の感情的な表現は一切使わない
3. **競合の強みも正直に記載**：競合が優れている点も2点程度正直に記載することで信頼性を高める
4. **競合URLはnofollow**：`rel="noopener noreferrer nofollow"` を必ず付与
5. **「2025年版」を明記**：タイトル・本文に調査年月を記載し、古い情報でないことを示す
6. **比較対象が変わったら更新**：競合サービスの仕様変更を半年ごとに確認・更新

---

## 7. コンポーネント構成

```
app/vs/[slug]/page.tsx

components/vs/
├── VSHero.tsx               # vsバナー + クイック結論
├── VSComparisonTable.tsx    # 詳細機能比較テーブル
├── VSWhichOne.tsx           # どちらが向いているか
├── VSAdvantage.tsx          # LogoAI.jpの日本特化強み
├── VSFAQ.tsx                # 比較FAQ 4問
├── VSVerdict.tsx            # 最終結論 + CTA

lib/
└── competitor-data.ts       # COMPETITOR_LIST（全競合データ）
```

---

*文档版本：v1.0 | 最終更新：2025年2月*
