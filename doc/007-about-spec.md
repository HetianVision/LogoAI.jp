# 会社情報ページ開発規格書 `/about`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：继承 `homepage-spec.md` 全部设计系统。
> **页面类型**：ブランド信頼構築ページ（Brand Trust Page）
> **战略定位**：日本ユーザーは「誰が作ったサービスか」を重視する。
>               運営者の顔・ミッション・数字・安全性を明示することで購入前の最終的な信頼を獲得する。

---

## 1. 页面整体规范

| 项目 | 内容 |
|---|---|
| 路由 | `/about` |
| 主要目標 | サービスへの信頼感を確立し、購入への最後の一押しをする |
| 伝えるべき3点 | ①なぜ作ったか（ミッション）②どんな会社か（数字・実績）③安全か（データ・法令遵守） |

### 1.1 页面布局顺序

```
Navbar
Section 1: Page Hero（ミッション一行）
Section 2: ミッションと背景ストーリー
Section 3: 数字で見るサービス実績
Section 4: 私たちが大切にしていること（3つの約束）
Section 5: チーム紹介（シンプル・匿名ベース）
Section 6: 会社概要テーブル
Section 7: CTA
Footer
```

---

## 2. Section 1：Page Hero

```html
<section class="about-hero">
  <div class="about-hero-bg" aria-hidden="true">
    <div class="bg-grid"></div>
    <div class="bg-radial-glow"></div>
  </div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">私たちについて</li>
      </ol>
    </nav>
    <div class="about-hero-content">
      <span class="section-eyebrow">About Us</span>
      <h1>日本のすべての事業者に、<br>プロ品質のブランドを。</h1>
      <p class="about-hero-desc">
        デザイナーに頼む予算がない、でもブランドを妥協したくない。
        そんな日本中の個人事業主・スタートアップのために、
        LogoAI.jpは生まれました。
      </p>
    </div>
  </div>
</section>
```

```css
.about-hero {
  padding: calc(64px + 80px) var(--container-px) 80px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.bg-radial-glow {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(201,150,58,0.06), transparent 60%);
  pointer-events: none;
}

.about-hero-content {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.about-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 16px 0 24px;
}

.about-hero-desc {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

@media (max-width: 768px) {
  .about-hero-content h1 { font-size: var(--text-3xl); }
  .about-hero-desc { font-size: var(--text-base); }
}
```

---

## 3. Section 2：ミッションと背景ストーリー

```html
<section class="about-story-section">
  <div class="container">
    <div class="about-story-grid">

      <!-- 左：ストーリーテキスト -->
      <div class="story-text animate-on-scroll">
        <span class="section-eyebrow">Our Story</span>
        <h2>なぜ、このサービスを作ったのか</h2>

        <div class="story-body">
          <p>
            日本では年間130万件以上の新規開業があります。
            そのほとんどが、開業直後に直面する共通の悩みを抱えています。
            「ロゴが必要だが、デザイン会社に頼むと30万円以上かかる。
            かといって、無料ツールでは日本語フォントが貧弱で、
            著作権も曖昧で使えない」という問題です。
          </p>
          <p>
            私たちのチームは、この課題を解決するために
            LogoAI.jpを開発しました。
            単にロゴを「安く作れる」ツールではなく、
            <strong>著作権が明確に帰属し、商標登録申請に使え、
            印刷会社への入稿データまで揃う</strong>、
            本当に使えるビジネスツールを目指しました。
          </p>
          <p>
            特に日本語フォントへのこだわりは、当サービスの核心です。
            海外のAIロゴツールは、日本語フォントの品質が著しく劣ります。
            私たちは100種以上の商用利用可能な日本語フォントを搭載し、
            業種・ブランドイメージに最適なフォントをAIが選択する仕組みを構築しました。
          </p>
        </div>

        <!-- ミッションステートメント -->
        <blockquote class="mission-statement">
          <p>「すべての日本の事業者が、ブランドの力を持てる世界を作る」</p>
          <footer>— LogoAI.jp ミッションステートメント</footer>
        </blockquote>
      </div>

      <!-- 右：視覚的要素（数字カード積み重ね） -->
      <div class="story-visual animate-on-scroll" style="--anim-delay: 0.15s">
        <div class="story-cards-stack">

          <div class="story-card story-card-1">
            <div class="sc-num">130<span class="sc-unit">万件</span></div>
            <div class="sc-label">日本の年間新規開業数</div>
            <div class="sc-source">出典：中小企業庁「中小企業白書」</div>
          </div>

          <div class="story-card story-card-2">
            <div class="sc-num">¥30<span class="sc-unit">万〜</span></div>
            <div class="sc-label">一般的なロゴデザイン費用</div>
            <div class="sc-source">デザイン会社への依頼相場</div>
          </div>

          <div class="story-card story-card-3">
            <div class="sc-num">¥4,980</div>
            <div class="sc-label">LogoAI.jp スタンダードプラン</div>
            <div class="sc-source">著作権証明書・SVG含む</div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
```

```css
.about-story-section {
  padding: var(--section-py) var(--container-px);
}

.about-story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
}

/* ストーリーテキスト */
.story-text h2 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
  margin: 12px 0 28px;
}

.story-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.story-body p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.story-body strong { color: var(--color-text-primary); }

/* ミッションステートメント */
.mission-statement {
  border-left: 4px solid var(--color-accent);
  padding: 20px 24px;
  background: rgba(201,150,58,0.04);
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  margin: 0;
}

.mission-statement p {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.5;
  margin: 0 0 8px;
}

.mission-statement footer {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* 数字カード */
.story-cards-stack {
  position: relative;
  height: 360px;
}

.story-card {
  position: absolute;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 28px 32px;
  box-shadow: var(--shadow-md);
  width: 240px;
}

.story-card-1 {
  top: 0;
  left: 0;
  transform: rotate(-3deg);
  z-index: 1;
}

.story-card-2 {
  top: 80px;
  left: 60px;
  transform: rotate(1deg);
  z-index: 2;
  border-color: rgba(201,150,58,0.3);
}

.story-card-3 {
  top: 160px;
  left: 20px;
  transform: rotate(-1.5deg);
  z-index: 3;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.story-card-3 .sc-num,
.story-card-3 .sc-label { color: white; }
.story-card-3 .sc-source { color: rgba(250,250,247,0.5); }

.sc-num {
  font-family: var(--font-number);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1;
  margin-bottom: 8px;
}

.sc-unit {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-accent);
}

.sc-label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.sc-source {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .about-story-grid { grid-template-columns: 1fr; gap: 48px; }
  .story-cards-stack { height: 280px; }
  .story-card { width: 220px; }
}
```

---

## 4. Section 3：数字で見るサービス実績

```html
<section class="about-numbers-section" style="background: var(--color-primary)">
  <div class="container">
    <div class="about-numbers-inner animate-on-scroll">
      <div class="an-header">
        <span class="section-eyebrow" style="color: rgba(250,250,247,0.5)">Numbers</span>
        <h2 style="color: white">数字で見る、LogoAI.jp</h2>
      </div>
      <div class="an-grid">

        <div class="an-item">
          <div class="an-num">12,000<span class="an-plus">+</span></div>
          <div class="an-label">生成ロゴ数</div>
          <div class="an-sub">サービス開始から累計</div>
        </div>

        <div class="an-item">
          <div class="an-num">47</div>
          <div class="an-label">対応業種数</div>
          <div class="an-sub">飲食・IT・士業など</div>
        </div>

        <div class="an-item">
          <div class="an-num">100<span class="an-plus">種以上</span></div>
          <div class="an-label">日本語フォント</div>
          <div class="an-sub">全て商用利用可能</div>
        </div>

        <div class="an-item">
          <div class="an-num">4.9</div>
          <div class="an-label">平均レビュースコア</div>
          <div class="an-sub">500件以上の評価より</div>
        </div>

        <div class="an-item">
          <div class="an-num">98<span class="an-plus">%</span></div>
          <div class="an-label">返金申請なし率</div>
          <div class="an-sub">7日間返金保証のうち</div>
        </div>

        <div class="an-item">
          <div class="an-num">2<span class="an-plus">分</span></div>
          <div class="an-label">平均生成時間</div>
          <div class="an-sub">入力完了からロゴ3案まで</div>
        </div>

      </div>
    </div>
  </div>
</section>
```

```css
.about-numbers-section {
  padding: var(--section-py) var(--container-px);
  position: relative;
  overflow: hidden;
}

.about-numbers-section::before {
  content: '';
  position: absolute;
  right: -100px;
  top: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(201,150,58,0.1), transparent 65%);
  pointer-events: none;
}

.about-numbers-inner {
  max-width: var(--container-max);
  margin: 0 auto;
}

.an-header {
  text-align: center;
  margin-bottom: 56px;
}

.an-header h2 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  line-height: 1.3;
  margin-top: 8px;
}

.an-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 60px;
}

.an-item {
  text-align: center;
  position: relative;
}

/* 区切り線（右端以外） */
.an-item:not(:nth-child(3n))::after {
  content: '';
  position: absolute;
  right: -30px;
  top: 10%;
  height: 80%;
  width: 1px;
  background: rgba(250,250,247,0.12);
}

.an-num {
  font-family: var(--font-number);
  font-size: 3rem;
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

.an-plus {
  font-size: 1.25rem;
  font-weight: 500;
}

.an-label {
  font-size: var(--text-base);
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
}

.an-sub {
  font-size: var(--text-xs);
  color: rgba(250,250,247,0.5);
}

@media (max-width: 768px) {
  .an-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .an-item::after { display: none; }
}
```

---

## 5. Section 4：私たちが大切にしていること（3つの約束）

```html
<section class="about-values-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">Our Values</span>
      <h2>私たちが大切にしている3つのこと</h2>
    </div>

    <div class="about-values-grid animate-on-scroll">

      <div class="value-card">
        <div class="vc-icon-wrap">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 4L4 10v10c0 7 5.33 13.53 12 16 6.67-2.47 12-9 12-16V10L16 4z"
                  stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M11 16l4 4 7-8" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>透明性</h3>
        <p>
          著作権の帰属先・料金・データの利用方法を、
          全てこのウェブサイトで明示します。
          「よくわからないまま購入した」ということが起きないよう、
          ユーザーが意思決定できる情報を提供し続けます。
        </p>
        <div class="vc-examples">
          <span class="vc-example">無料/有料の著作権差異を明記</span>
          <span class="vc-example">AIデータ利用方針の公開</span>
          <span class="vc-example">返金条件の明示</span>
        </div>
      </div>

      <div class="value-card value-card-featured">
        <div class="vc-icon-wrap">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 2L4 8v8c0 8.84 5.15 17.1 12 19 6.85-1.9 12-10.16 12-19V8L16 2z"
                  stroke="currentColor" stroke-width="1.5"/>
            <circle cx="16" cy="18" r="5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M16 13v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>品質へのこだわり</h3>
        <p>
          「安いから品質が低い」を覆したい。
          プロのデザイナーが審美的に正しいと評価するレベルのロゴを、
          AIで量産できる仕組みを構築することが私たちの技術的挑戦です。
          特に日本語フォントの選択・字間・カラー調和は妥協しません。
        </p>
        <div class="vc-examples">
          <span class="vc-example">日本語フォント100種以上</span>
          <span class="vc-example">業種別AI最適化</span>
          <span class="vc-example">プロ審査済みデザインルール</span>
        </div>
      </div>

      <div class="value-card">
        <div class="vc-icon-wrap">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M28 16A12 12 0 1116 4" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round"/>
            <path d="M22 4h6v6" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28 4L16 16" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round"/>
          </svg>
        </div>
        <h3>ユーザーの権利を守る</h3>
        <p>
          AIが生成したコンテンツの著作権問題は、
          日本の法律上まだ整備途中の分野です。
          私たちはユーザーの創作的寄与を記録・証明し、
          ユーザーが安心して商標登録・商業利用できる仕組みを提供します。
        </p>
        <div class="vc-examples">
          <span class="vc-example">著作権帰属証明書の発行</span>
          <span class="vc-example">AIデータ学習への不使用</span>
          <span class="vc-example">文化庁ガイドライン準拠</span>
        </div>
      </div>

    </div>
  </div>
</section>
```

```css
.about-values-section {
  padding: var(--section-py) var(--container-px);
  background: var(--color-bg-section);
}

.about-values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.value-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.value-card-featured {
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.vc-icon-wrap {
  width: 60px;
  height: 60px;
  background: rgba(201,150,58,0.1);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
}

.value-card-featured .vc-icon-wrap {
  background: rgba(250,250,247,0.1);
  color: var(--color-accent);
}

.value-card h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.value-card-featured h3 { color: white; }

.value-card p {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
  flex: 1;
}

.value-card-featured p { color: rgba(250,250,247,0.7); }

.vc-examples {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.value-card-featured .vc-examples { border-top-color: rgba(250,250,247,0.1); }

.vc-example {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding-left: 16px;
  position: relative;
}

.vc-example::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: 700;
}

.value-card-featured .vc-example { color: rgba(250,250,247,0.55); }
.value-card-featured .vc-example::before { color: var(--color-accent); }

@media (max-width: 1024px) {
  .about-values-grid { grid-template-columns: 1fr; max-width: 560px; }
}
```

---

## 6. Section 5：チーム紹介

> **注意**：個人情報・顔写真は掲載しない。職能・役割・バックグラウンドのみ記載。
> 匿名ベースで「どんな専門性を持つ人たちが作っているか」を伝える。

```html
<section class="about-team-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">Our Team</span>
      <h2>どんなチームが作っているか</h2>
      <p class="section-subtext">
        デザイン・法律・エンジニアリングの専門家が協力して、
        このサービスを構築・運営しています。
      </p>
    </div>

    <div class="team-grid animate-on-scroll">

      <div class="team-card">
        <div class="tc-avatar tc-avatar-1" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="12" r="6" stroke="currentColor" stroke-width="1.5"/>
            <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="tc-content">
          <div class="tc-role">プロダクトデザイン責任者</div>
          <div class="tc-bg">
            元大手広告代理店・グラフィックデザイナー。
            15年以上の日本語タイポグラフィ経験を持ち、
            AIが選ぶフォント・字間ロジックの設計を担当。
          </div>
          <div class="tc-tags">
            <span class="tc-tag">タイポグラフィ</span>
            <span class="tc-tag">ブランディング</span>
            <span class="tc-tag">UI設計</span>
          </div>
        </div>
      </div>

      <div class="team-card">
        <div class="tc-avatar tc-avatar-2" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="12" r="6" stroke="currentColor" stroke-width="1.5"/>
            <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="tc-content">
          <div class="tc-role">法務・著作権アドバイザー</div>
          <div class="tc-bg">
            現役の弁護士（知的財産専門）。
            AIと著作権に関する国内外の法令解釈を担当し、
            著作権帰属証明書の法的有効性を設計監修。
          </div>
          <div class="tc-tags">
            <span class="tc-tag">知的財産法</span>
            <span class="tc-tag">著作権</span>
            <span class="tc-tag">商標法</span>
          </div>
        </div>
      </div>

      <div class="team-card">
        <div class="tc-avatar tc-avatar-3" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="12" r="6" stroke="currentColor" stroke-width="1.5"/>
            <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="tc-content">
          <div class="tc-role">AIエンジニアリング責任者</div>
          <div class="tc-bg">
            大規模言語モデル・画像生成モデルの実装経験5年以上。
            日本語テキストのベクター変換・フォント最適化アルゴリズムの開発を担当。
          </div>
          <div class="tc-tags">
            <span class="tc-tag">機械学習</span>
            <span class="tc-tag">画像生成AI</span>
            <span class="tc-tag">NLP</span>
          </div>
        </div>
      </div>

    </div>

    <!-- 採用リンク -->
    <div class="team-hiring animate-on-scroll">
      <p>チームに加わりませんか？</p>
      <a href="mailto:jobs@logoai.jp" class="btn-secondary">採用情報を問い合わせる →</a>
    </div>

  </div>
</section>
```

```css
.about-team-section {
  padding: var(--section-py) var(--container-px);
}

.section-subtext {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  max-width: 480px;
  margin: 12px auto 0;
  text-align: center;
  line-height: var(--leading-relaxed);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: var(--container-max);
  margin: 0 auto 48px;
}

.team-card {
  display: flex;
  gap: 20px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 28px;
  transition: box-shadow 0.3s ease;
}

.team-card:hover { box-shadow: var(--shadow-md); }

/* アバター（匿名・アイコン） */
.tc-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tc-avatar-1 { background: rgba(201,150,58,0.1); color: var(--color-accent); }
.tc-avatar-2 { background: rgba(26,58,42,0.1); color: var(--color-primary); }
.tc-avatar-3 { background: rgba(45,122,79,0.1); color: var(--color-success); }

.tc-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tc-role {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.tc-bg {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.tc-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tc-tag {
  font-size: 0.65rem;
  padding: 3px 10px;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  font-weight: 500;
}

.team-hiring {
  text-align: center;
}

.team-hiring p {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

@media (max-width: 1024px) {
  .team-grid { grid-template-columns: 1fr; max-width: 560px; }
  .team-card { flex-direction: column; }
}
```

---

## 7. Section 6：会社概要テーブル

```html
<section class="about-company-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">Company Info</span>
      <h2>会社概要</h2>
    </div>

    <div class="company-table-wrap animate-on-scroll">
      <table class="company-table">
        <tbody>
          <tr>
            <th scope="row">サービス名</th>
            <td>LogoAI.jp（ロゴエーアイジェーピー）</td>
          </tr>
          <tr>
            <th scope="row">運営会社</th>
            <td>株式会社ロゴエーアイ</td>
          </tr>
          <tr>
            <th scope="row">設立</th>
            <td>2024年4月</td>
          </tr>
          <tr>
            <th scope="row">所在地</th>
            <td>〒150-0001 東京都渋谷区神宮前X-XX-XX<br>
                <span style="font-size: var(--text-xs); color: var(--color-text-muted)">
                  ※ 個別の来訪・窓口対応はございません。お問い合わせはメールにてお願いします。
                </span>
            </td>
          </tr>
          <tr>
            <th scope="row">代表者</th>
            <td>代表取締役 山田 太郎（仮名）</td>
          </tr>
          <tr>
            <th scope="row">資本金</th>
            <td>1,000万円</td>
          </tr>
          <tr>
            <th scope="row">事業内容</th>
            <td>AIを活用したロゴ作成サービスの開発・運営<br>
                ブランドアイデンティティ支援ツールの提供</td>
          </tr>
          <tr>
            <th scope="row">適格請求書発行事業者番号</th>
            <td>T1234567890123</td>
          </tr>
          <tr>
            <th scope="row">お問い合わせ</th>
            <td>
              <a href="mailto:support@logoai.jp">support@logoai.jp</a><br>
              <span style="font-size: var(--text-xs); color: var(--color-text-muted)">
                平日 10:00〜18:00（土日祝除く）※メール受付は24時間
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">プライバシーポリシー</th>
            <td><a href="/privacy">プライバシーポリシーはこちら →</a></td>
          </tr>
          <tr>
            <th scope="row">利用規約</th>
            <td><a href="/terms">利用規約はこちら →</a></td>
          </tr>
          <tr>
            <th scope="row">特定商取引法に基づく表記</th>
            <td><a href="/tokutei">特定商取引法表記はこちら →</a></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</section>
```

```css
.about-company-section { padding: var(--section-py) var(--container-px); }

.company-table-wrap {
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.company-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.company-table tr {
  border-bottom: 1px solid var(--color-border);
}

.company-table tr:last-child { border-bottom: none; }

.company-table th {
  width: 220px;
  padding: 18px 24px;
  text-align: left;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
  background: var(--color-bg-section);
  vertical-align: top;
  white-space: nowrap;
}

.company-table td {
  padding: 18px 24px;
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  line-height: 1.7;
  vertical-align: top;
}

.company-table a {
  color: var(--color-primary);
  text-decoration: underline;
}

@media (max-width: 640px) {
  .company-table th { width: 100px; white-space: normal; padding: 14px 16px; }
  .company-table td { padding: 14px 16px; }
}
```

---

## 8. Section 7：CTA

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>日本の事業者の、ブランドづくりを変える。</h2>
        <p>まず無料で試して、その品質を確かめてください。<br>
           7日間全額返金保証付きなので、安心してお試しいただけます。</p>
        <div class="final-cta-buttons">
          <a href="/create" class="btn-primary btn-primary-lg">無料でロゴを作る →</a>
          <a href="/works" class="btn-secondary-inverse">生成事例を見る</a>
        </div>
        <div class="final-trust">
          <span>✓ 著作権完全帰属（有料プラン）</span>
          <span>✓ 7日間全額返金保証</span>
          <span>✓ 日本語フォント100種以上</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 9. SEO規範

```html
<title>私たちについて | LogoAI.jpの会社情報・ミッション・チーム</title>
<meta name="description" content="LogoAI.jpの運営会社情報・創業ストーリー・チーム・ミッションを紹介。日本の事業者のブランドづくりを支援するAIロゴ作成サービス。適格請求書発行事業者登録済み。">
<link rel="canonical" href="https://logoai.jp/about">
```

### キーワード布局

| 位置 | キーワード |
|---|---|
| H1 | 日本の事業者 + ブランド |
| ミッションH2 | なぜ作ったか / 創業ストーリー |
| 数字セクション | 生成ロゴ数・日本語フォント・満足度 |
| 会社概要テーブル | 適格請求書発行事業者・東京・株式会社 |

---

## 10. 结构化数据

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "株式会社ロゴエーアイ",
  "alternateName": "LogoAI.jp",
  "url": "https://logoai.jp",
  "logo": "https://logoai.jp/logo.svg",
  "description": "AIを活用した日本語ロゴ作成サービスの開発・運営。著作権帰属証明書・商標類似チェック・ブランドガイドライン自動生成を提供。",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "渋谷区",
    "addressRegion": "東京都",
    "postalCode": "150-0001",
    "addressCountry": "JP"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@logoai.jp",
    "availableLanguage": "Japanese"
  },
  "foundingDate": "2024-04",
  "sameAs": [
    "https://twitter.com/logoai_jp",
    "https://www.instagram.com/logoai.jp"
  ]
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://logoai.jp/" },
    { "@type": "ListItem", "position": 2, "name": "私たちについて", "item": "https://logoai.jp/about" }
  ]
}
```

---

## 11. GEO優化

```html
<p class="geo-definition" style="max-width:var(--container-max); margin:0 auto; padding:0 var(--container-px) 24px">
  LogoAI.jp（ロゴエーアイジェーピー）は、株式会社ロゴエーアイ（東京都渋谷区、2024年4月設立）が
  運営する日本市場特化のAIロゴ作成サービスです。
  サービスミッションは「日本のすべての事業者にプロ品質のブランドを提供すること」。
  日本語フォント100種以上・著作権帰属証明書発行・J-PlatPat連携商標チェックを提供。
  適格請求書発行事業者登録済み（T1234567890123）。7日間全額返金保証付き。
</p>
```

---

## 12. 組件ファイル構成

```
app/about/page.tsx

components/about/
├── AboutHero.tsx
├── AboutStory.tsx          # ストーリー + 数字カード積み重ね
├── AboutNumbers.tsx        # 実績数字グリッド（深緑背景）
├── AboutValues.tsx         # 3つの約束カード
├── AboutTeam.tsx           # チーム紹介（匿名）
├── AboutCompanyTable.tsx   # 会社概要テーブル
└── AboutCTA.tsx
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/copyright 著作権説明ページ仕様書*
