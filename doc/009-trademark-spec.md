# 商標検索説明ページ開発規格書 `/trademark`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：继承 `homepage-spec.md` 全部设计系统。
> **页面类型**：機能説明 + 信頼構築ページ
> **战略定位**：「商標登録に本当に使えるのか」という不安を解消し、
>               J-PlatPat連携チェック機能（プレミアム限定）の価値を訴求する。
>               「ロゴ 商標登録」「商標チェック AIロゴ」等の検索流入も狙う。

---

## 1. 页面整体规范

| 項目 | 内容 |
|---|---|
| 路由 | `/trademark` |
| 主要目標 | 商標登録への不安解消 + プレミアムプランへのアップグレード訴求 |
| 法的参照 | 特許庁 J-PlatPat、商標法（第2条・第3条） |

### 1.1 页面布局顺序

```
Navbar
Section 1: Page Hero（商標登録はAIロゴでも可能）
Section 2: 商標登録の基礎知識（3ステップ）
Section 3: LogoAI.jpで商標登録できる理由
Section 4: 商標類似チェック機能（プレミアム限定）詳細
Section 5: 商標登録の流れ（ロゴ生成→申請まで）
Section 6: よくある疑問（商標専門 FAQ 5問）
Section 7: CTA（プレミアムプランへ）
Footer
```

---

## 2. Section 1：Page Hero

```html
<section class="trademark-hero">
  <div class="trademark-hero-bg" aria-hidden="true"><div class="bg-grid"></div></div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">商標登録について</li>
      </ol>
    </nav>
    <div class="trademark-hero-content">
      <span class="section-eyebrow">商標登録について</span>
      <h1>AIで作ったロゴでも、<br>商標登録できます。</h1>
      <p class="trademark-hero-desc">
        有料プランで生成したロゴは著作権がユーザーへ帰属し、
        商標登録申請に利用できます。
        プレミアムプランでは、J-PlatPatとのAI連携による
        商標類似チェック機能も搭載しています。
      </p>
      <!-- 3つのポイント -->
      <div class="trademark-hero-points">
        <div class="thp-item">
          <span class="thp-icon">✓</span>
          <span>有料プランのロゴは商標登録申請に利用可能</span>
        </div>
        <div class="thp-item">
          <span class="thp-icon">✓</span>
          <span>著作権帰属証明書が補足書類として使える</span>
        </div>
        <div class="thp-item">
          <span class="thp-icon thp-icon-premium">★</span>
          <span>プレミアム限定：J-PlatPat連携の商標類似チェック</span>
        </div>
      </div>
      <div class="trademark-hero-ctas">
        <a href="/pricing#premium" class="btn-primary">プレミアムプランを見る →</a>
        <a href="/create" class="btn-secondary">まず無料で試す</a>
      </div>
    </div>
  </div>
</section>
```

```css
.trademark-hero {
  padding: calc(64px + 60px) var(--container-px) 64px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.trademark-hero-content {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.trademark-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 16px 0 20px;
}

.trademark-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 32px;
}

.trademark-hero-points {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  max-width: 480px;
  margin: 0 auto 32px;
  padding: 24px 28px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.thp-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.thp-icon {
  color: var(--color-success);
  font-weight: 700;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.thp-icon-premium {
  color: var(--color-accent);
}

.trademark-hero-ctas {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
```

---

## 3. Section 2：商標登録の基礎知識

```html
<section class="trademark-basics-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">基礎知識</span>
      <h2>商標登録とは何か、なぜ必要か</h2>
    </div>
    <div class="basics-grid animate-on-scroll">

      <div class="basics-card">
        <div class="bc-icon">🛡️</div>
        <h3>商標登録とは</h3>
        <p>
          商標とは、自分の商品・サービスを他者のものと区別するために使用する
          マーク（ロゴ・文字・図形など）のことです。
          商標登録とは、そのマークを特許庁に登録し、
          <strong>独占的使用権（商標権）</strong>を取得することです。
        </p>
        <div class="bc-example">
          <span class="bc-eg-label">商標権を取得すると</span>
          <span class="bc-eg-text">登録した商標を他者が無断使用した場合、使用停止・損害賠償を請求できます</span>
        </div>
      </div>

      <div class="basics-card">
        <div class="bc-icon">⚠️</div>
        <h3>登録しないリスク</h3>
        <p>
          商標登録をしないでロゴを使用している場合、
          第三者が同じ・似たロゴで商標登録してしまうと、
          <strong>逆に使用禁止を求められる</strong>ことがあります。
          特に「先願主義」（先に出願した方が有利）の日本では、
          早期の商標登録が重要です。
        </p>
        <div class="bc-example bc-example-warning">
          <span class="bc-eg-label">実際にあるケース</span>
          <span class="bc-eg-text">長年使っていたロゴと同じ商標を第三者が登録し、使用停止を余儀なくされた</span>
        </div>
      </div>

      <div class="basics-card">
        <div class="bc-icon">📋</div>
        <h3>申請から登録まで</h3>
        <p>
          商標登録の出願は特許庁（またはJ-PlatPat経由）に行います。
          審査期間は通常<strong>6〜12ヶ月</strong>程度。
          登録料込みの費用は区分1つあたり
          <strong>約5〜10万円</strong>（弁理士費用含む）が目安です。
          自己出願の場合は区分1つあたり約3,400〜8,600円（特許庁印紙代のみ）。
        </p>
        <a href="https://www.j-platpat.inpit.go.jp/" target="_blank"
           rel="noopener noreferrer" class="bc-link">
          特許庁 J-PlatPat →
        </a>
      </div>

    </div>
  </div>
</section>
```

```css
.trademark-basics-section { padding: var(--section-py) var(--container-px); }

.basics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.basics-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bc-icon { font-size: 32px; }

.basics-card h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.basics-card p {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
  flex: 1;
}

.basics-card strong { color: var(--color-text-primary); }

.bc-example {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  background: rgba(45,122,79,0.05);
  border-radius: var(--radius-lg);
  border-left: 3px solid var(--color-success);
}

.bc-example-warning {
  background: rgba(201,150,58,0.06);
  border-left-color: var(--color-accent);
}

.bc-eg-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bc-eg-text {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.bc-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: underline;
}

@media (max-width: 1024px) { .basics-grid { grid-template-columns: 1fr; max-width: 560px; } }
```

---

## 4. Section 3：LogoAI.jpで商標登録できる理由

```html
<section class="trademark-why-section">
  <div class="container">
    <div class="trademark-why-grid animate-on-scroll">

      <!-- 左：説明 -->
      <div class="why-text">
        <span class="section-eyebrow">なぜ使えるか</span>
        <h2>LogoAI.jpのロゴが商標登録申請に使える3つの理由</h2>
        <div class="why-reasons">
          <div class="why-reason">
            <div class="wr-num">01</div>
            <div class="wr-content">
              <strong>著作権がユーザーへ完全帰属する</strong>
              <p>商標登録申請には、そのロゴの権利者であることが前提です。
                有料プランでは著作権がユーザーへ100%帰属するため、
                正当な権利者として申請できます。</p>
            </div>
          </div>
          <div class="why-reason">
            <div class="wr-num">02</div>
            <div class="wr-content">
              <strong>著作権帰属証明書が補足書類として使える</strong>
              <p>申請時に「このロゴの権利が自分にある」ことを示す
                補足書類として、著作権帰属証明書PDFを添付できます。
                特に弁理士経由での申請時に有効です。</p>
            </div>
          </div>
          <div class="why-reason">
            <div class="wr-num">03</div>
            <div class="wr-content">
              <strong>SVG・PDF形式で特許庁の要件を満たす</strong>
              <p>商標登録申請にはロゴデータの提出が必要です。
                有料プランではSVG・PDF・高解像度PNGでダウンロードでき、
                特許庁の願書添付図面の要件を満たします。</p>
            </div>
          </div>
        </div>
        <div class="why-disclaimer">
          ※ 商標登録の可否は特許庁の審査によるものです。
          当サービスは登録を保証するものではありません。
          重要なブランドの場合は弁理士へのご相談を推奨します。
        </div>
      </div>

      <!-- 右：申請チェックリスト -->
      <div class="why-checklist-wrap animate-on-scroll" style="--anim-delay:0.15s">
        <div class="why-checklist">
          <div class="wc-header">商標登録申請に必要なもの</div>
          <div class="wc-list">
            <div class="wc-item wc-ok">
              <span class="wci-check">✓</span>
              <div>
                <span class="wci-label">ロゴデータ（JPG/PNG）</span>
                <span class="wci-status wci-provided">LogoAI.jpで提供</span>
              </div>
            </div>
            <div class="wc-item wc-ok">
              <span class="wci-check">✓</span>
              <div>
                <span class="wci-label">申請者情報（氏名・住所）</span>
                <span class="wci-status wci-self">申請者が用意</span>
              </div>
            </div>
            <div class="wc-item wc-ok">
              <span class="wci-check">✓</span>
              <div>
                <span class="wci-label">商標の区分選択（第1〜45類）</span>
                <span class="wci-status wci-self">申請者が選択</span>
              </div>
            </div>
            <div class="wc-item wc-ok">
              <span class="wci-check">✓</span>
              <div>
                <span class="wci-label">権利帰属の証明（任意）</span>
                <span class="wci-status wci-provided">著作権証明書でカバー</span>
              </div>
            </div>
            <div class="wc-item wc-ok">
              <span class="wci-check">✓</span>
              <div>
                <span class="wci-label">類似商標の事前確認（推奨）</span>
                <span class="wci-status wci-premium">プレミアムで対応</span>
              </div>
            </div>
            <div class="wc-item">
              <span class="wci-check wci-check-gray">◦</span>
              <div>
                <span class="wci-label">印紙代（3,400円〜/区分）</span>
                <span class="wci-status wci-self">特許庁への支払い</span>
              </div>
            </div>
          </div>
          <a href="/pricing#premium" class="wc-cta">
            著作権証明書 + 商標チェックを含むプレミアムへ →
          </a>
        </div>
      </div>

    </div>
  </div>
</section>
```

```css
.trademark-why-section { padding: var(--section-py) var(--container-px); background: var(--color-bg-section); }

.trademark-why-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
  max-width: var(--container-max);
  margin: 0 auto;
}

.why-text h2 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.35;
  margin: 12px 0 28px;
}

.why-reasons { display: flex; flex-direction: column; gap: 24px; margin-bottom: 24px; }

.why-reason {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.wr-num {
  font-family: var(--font-number);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-accent);
  flex-shrink: 0;
  width: 24px;
  margin-top: 2px;
}

.wr-content strong {
  display: block;
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.wr-content p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.why-disclaimer {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding: 12px 16px;
  background: rgba(201,150,58,0.06);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-accent);
  line-height: 1.6;
}

/* チェックリスト */
.why-checklist {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.wc-header {
  padding: 18px 24px;
  background: var(--color-primary);
  color: white;
  font-size: var(--text-sm);
  font-weight: 700;
}

.wc-list { padding: 8px 0; }

.wc-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border-bottom: 1px solid var(--color-border);
}

.wc-item:last-of-type { border-bottom: none; }

.wci-check {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-success);
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.wci-check-gray { color: var(--color-text-muted); }

.wc-item > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.wci-label {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

.wci-status {
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  width: fit-content;
}

.wci-provided { background: rgba(45,122,79,0.1); color: var(--color-success); }
.wci-self { background: var(--color-bg-section); color: var(--color-text-muted); }
.wci-premium { background: rgba(201,150,58,0.12); color: var(--color-accent); }

.wc-cta {
  display: block;
  margin: 16px 20px;
  padding: 14px;
  background: var(--color-primary);
  color: white;
  text-align: center;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}

.wc-cta:hover { background: var(--color-primary-hover); }

@media (max-width: 1024px) { .trademark-why-grid { grid-template-columns: 1fr; gap: 40px; } }
```

---

## 5. Section 4：商標類似チェック機能（プレミアム限定）

```html
<section class="trademark-check-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow" style="color: var(--color-accent)">★ プレミアム限定機能</span>
      <h2>J-PlatPat連携 商標類似チェック</h2>
      <p class="section-subtext">
        生成したロゴが既存の登録商標と類似していないかを、
        特許庁のデータベース（J-PlatPat）とAIが照合してスコア評価します。
      </p>
    </div>

    <div class="check-feature-grid animate-on-scroll">

      <!-- 左：UIモックアップ -->
      <div class="check-mockup-wrap">
        <div class="check-mockup">
          <div class="mockup-browser-bar" aria-hidden="true">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="browser-url">logoai.jp/dashboard/trademark-check</div>
          </div>
          <div class="check-mockup-body">
            <!-- ロゴ表示 -->
            <div class="cm-logo-row">
              <div class="cm-logo-preview">
                <span style="font-family: serif; font-size: 20px; font-weight: 700; color: #1A3A2A;">田中製菓</span>
              </div>
              <div class="cm-check-meta">
                <div class="cm-check-class">商標区分：第30類（菓子・パン）</div>
                <div class="cm-check-status">
                  <span class="cm-status-dot"></span> J-PlatPat照合中...
                </div>
              </div>
            </div>

            <!-- スコア表示 -->
            <div class="cm-score-section">
              <div class="cm-score-label">総合リスクスコア</div>
              <div class="cm-score-bar-wrap">
                <div class="cm-score-bar">
                  <div class="cm-score-fill cm-score-low" style="width: 22%"></div>
                </div>
                <div class="cm-score-num cm-score-num-low">22 / 100</div>
              </div>
              <div class="cm-score-verdict cm-verdict-low">✓ 低リスク — 類似商標が見当たりません</div>
            </div>

            <!-- 3軸評価 -->
            <div class="cm-axes">
              <div class="cm-axis">
                <span class="cm-axis-label">視覚的類似度</span>
                <div class="cm-axis-bar-wrap">
                  <div class="cm-axis-bar">
                    <div class="cm-axis-fill" style="width: 18%"></div>
                  </div>
                  <span class="cm-axis-num">18</span>
                </div>
              </div>
              <div class="cm-axis">
                <span class="cm-axis-label">名称類似度</span>
                <div class="cm-axis-bar-wrap">
                  <div class="cm-axis-bar">
                    <div class="cm-axis-fill" style="width: 30%"></div>
                  </div>
                  <span class="cm-axis-num">30</span>
                </div>
              </div>
              <div class="cm-axis">
                <span class="cm-axis-label">業種区分リスク</span>
                <div class="cm-axis-bar-wrap">
                  <div class="cm-axis-bar">
                    <div class="cm-axis-fill" style="width: 15%"></div>
                  </div>
                  <span class="cm-axis-num">15</span>
                </div>
              </div>
            </div>

            <!-- 推奨アクション -->
            <div class="cm-action">
              <div class="cm-action-title">推奨アクション</div>
              <div class="cm-action-text">
                類似リスクが低いため、商標登録申請を進めることができます。
                念のため弁理士へのご確認をお勧めします。
              </div>
              <a href="https://www.j-platpat.inpit.go.jp/" target="_blank"
                 rel="noopener noreferrer" class="cm-jplatpat-link">
                J-PlatPatで詳細確認 →
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 右：機能説明 -->
      <div class="check-feature-text">
        <div class="check-features">
          <div class="check-feature-item">
            <div class="cfi-icon">🔍</div>
            <div class="cfi-content">
              <strong>J-PlatPat連携照合</strong>
              <p>日本特許庁の公式商標データベース「J-PlatPat」に収録された
                登録済み・出願中の商標と照合します。</p>
            </div>
          </div>
          <div class="check-feature-item">
            <div class="cfi-icon">📊</div>
            <div class="cfi-content">
              <strong>3軸スコア評価</strong>
              <p>視覚的類似度・名称類似度・業種区分リスクの3軸で
                0〜100のリスクスコアを算出。高リスク時は代替デザインを提案します。</p>
            </div>
          </div>
          <div class="check-feature-item">
            <div class="cfi-icon">⚡</div>
            <div class="cfi-content">
              <strong>ロゴ生成後すぐに確認</strong>
              <p>カスタマイズ完了後、マイページから1クリックで
                チェックを実行できます。結果は約30秒で表示。</p>
            </div>
          </div>
          <div class="check-feature-item">
            <div class="cfi-icon">⚠️</div>
            <div class="cfi-content">
              <strong>注意事項</strong>
              <p>本機能はAIによる参考情報であり、法的判断を保証するものではありません。
                重要な商標登録には必ず弁理士へのご相談を推奨します。</p>
            </div>
          </div>
        </div>
        <a href="/pricing#premium" class="btn-primary" style="margin-top: 32px; display: inline-block;">
          プレミアムプランで商標チェックを使う →
        </a>
      </div>

    </div>
  </div>
</section>
```

```css
.trademark-check-section { padding: var(--section-py) var(--container-px); background: var(--color-bg-section); }

.check-feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
  max-width: var(--container-max);
  margin: 0 auto;
}

/* チェックモックアップ */
.check-mockup {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  background: white;
}

.check-mockup-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }

.cm-logo-row {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
  background: var(--color-bg-section);
  border-radius: var(--radius-lg);
}

.cm-logo-preview {
  width: 100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.cm-check-class {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.cm-check-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.cm-status-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  animation: pulse 1.5s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* スコア */
.cm-score-section {
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.cm-score-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}

.cm-score-bar-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.cm-score-bar {
  flex: 1;
  height: 10px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.cm-score-fill {
  height: 100%;
  border-radius: var(--radius-full);
}

.cm-score-low { background: var(--color-success); }
.cm-score-mid { background: var(--color-accent); }
.cm-score-high { background: #C41E3A; }

.cm-score-num {
  font-family: var(--font-number);
  font-size: var(--text-xl);
  font-weight: 700;
  flex-shrink: 0;
}

.cm-score-num-low { color: var(--color-success); }
.cm-score-num-mid { color: var(--color-accent); }
.cm-score-num-high { color: #C41E3A; }

.cm-score-verdict {
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 6px 12px;
  border-radius: var(--radius-full);
}

.cm-verdict-low { background: rgba(45,122,79,0.08); color: var(--color-success); }
.cm-verdict-mid { background: rgba(201,150,58,0.1); color: var(--color-accent); }
.cm-verdict-high { background: rgba(196,30,58,0.08); color: #C41E3A; }

/* 3軸 */
.cm-axes { display: flex; flex-direction: column; gap: 10px; }

.cm-axis {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cm-axis-label {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  min-width: 80px;
}

.cm-axis-bar-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cm-axis-bar {
  flex: 1;
  height: 6px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.cm-axis-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-full);
}

.cm-axis-num {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-primary);
  min-width: 20px;
  text-align: right;
}

/* 推奨アクション */
.cm-action {
  padding: 14px 16px;
  background: rgba(26,58,42,0.04);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(26,58,42,0.1);
}

.cm-action-title {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cm-action-text {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 10px;
}

.cm-jplatpat-link {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: underline;
}

/* 機能説明テキスト */
.check-features { display: flex; flex-direction: column; gap: 24px; }

.check-feature-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.cfi-icon {
  width: 44px;
  height: 44px;
  background: rgba(201,150,58,0.08);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.cfi-content strong {
  display: block;
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.cfi-content p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 1024px) { .check-feature-grid { grid-template-columns: 1fr; gap: 40px; } }
```

---

## 6. Section 5：商標登録の流れ（ロゴ生成→申請）

```html
<section class="trademark-flow-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">全体の流れ</span>
      <h2>ロゴ生成から商標登録申請まで</h2>
    </div>

    <div class="trademark-flow animate-on-scroll">

      <div class="tf-step">
        <div class="tfs-num">01</div>
        <div class="tfs-content">
          <div class="tfs-tag tfs-tag-logoai">LogoAI.jp</div>
          <strong>プレミアムプランでロゴを生成</strong>
          <p>ブランド名・業種・スタイルを入力してAIがロゴを生成。
             フォント・カラーを調整して完成させます。</p>
        </div>
      </div>

      <div class="tf-arrow" aria-hidden="true">↓</div>

      <div class="tf-step">
        <div class="tfs-num">02</div>
        <div class="tfs-content">
          <div class="tfs-tag tfs-tag-logoai">LogoAI.jp</div>
          <strong>商標類似チェックを実行</strong>
          <p>マイページからJ-PlatPat連携チェックを実行。
             リスクスコアが高い場合は代替デザインを生成します。</p>
        </div>
      </div>

      <div class="tf-arrow" aria-hidden="true">↓</div>

      <div class="tf-step">
        <div class="tfs-num">03</div>
        <div class="tfs-content">
          <div class="tfs-tag tfs-tag-logoai">LogoAI.jp</div>
          <strong>ロゴをダウンロード・証明書を取得</strong>
          <p>SVG・PNG・PDF形式でダウンロード。
             著作権帰属証明書PDFを取得します。</p>
        </div>
      </div>

      <div class="tf-arrow" aria-hidden="true">↓</div>

      <div class="tf-step">
        <div class="tfs-num">04</div>
        <div class="tfs-content">
          <div class="tfs-tag tfs-tag-jplatpat">J-PlatPat / 弁理士</div>
          <strong>商標区分を選択・出願書類を準備</strong>
          <p>保護したい商品・サービスに対応する区分（第1〜45類）を選択。
             J-PlatPatで最終確認後、出願書類を作成します。</p>
        </div>
      </div>

      <div class="tf-arrow" aria-hidden="true">↓</div>

      <div class="tf-step">
        <div class="tfs-num">05</div>
        <div class="tfs-content">
          <div class="tfs-tag tfs-tag-patent">特許庁</div>
          <strong>特許庁へ出願</strong>
          <p>特許庁の特許電子図書館（J-PlatPat）から電子出願、
             または書類で郵送出願します。印紙代：区分あたり3,400〜8,600円。</p>
        </div>
      </div>

      <div class="tf-arrow" aria-hidden="true">↓</div>

      <div class="tf-step tfs-final">
        <div class="tfs-num tfs-num-final">✓</div>
        <div class="tfs-content">
          <div class="tfs-tag tfs-tag-patent">特許庁</div>
          <strong>審査・登録完了（6〜12ヶ月）</strong>
          <p>審査をクリアすると商標登録証が発行されます。
             登録後10年間、更新可能な商標権を取得します。</p>
        </div>
      </div>

    </div>
  </div>
</section>
```

```css
.trademark-flow-section { padding: var(--section-py) var(--container-px); }

.trademark-flow {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.tf-step {
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 20px 24px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.tfs-final {
  border-color: var(--color-accent);
  background: rgba(201,150,58,0.04);
}

.tf-arrow {
  font-size: var(--text-2xl);
  color: var(--color-text-muted);
  padding: 4px 0;
}

.tfs-num {
  font-family: var(--font-number);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-primary);
  min-width: 32px;
  text-align: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.tfs-num-final {
  color: var(--color-accent);
  font-size: var(--text-2xl);
}

.tfs-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tfs-tag {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  width: fit-content;
  letter-spacing: 0.04em;
}

.tfs-tag-logoai { background: rgba(26,58,42,0.1); color: var(--color-primary); }
.tfs-tag-jplatpat { background: rgba(201,150,58,0.1); color: var(--color-accent); }
.tfs-tag-patent { background: rgba(45,122,79,0.1); color: var(--color-success); }

.tfs-content strong {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
}

.tfs-content p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}
```

---

## 7. Section 6：商標専門 FAQ（5問）

| Q | A（要約） |
|---|---|
| 商標登録されると、他の人は同じロゴを使えなくなりますか？ | 登録した区分の商品・サービス領域内では他者の使用を禁止できます。全区分への保護ではなく、指定区分のみです。 |
| 海外での商標登録も対応していますか？ | 当サービスは日本国内の商標登録申請のサポートが対象です。海外商標は弁理士・国際出願（マドリッドプロトコル）をご利用ください。 |
| 商標類似チェックで低リスクでも、審査で拒絶されることはありますか？ | あります。特許庁の審査は当サービスのチェックより詳細であり、当サービスの結果は参考情報です。拒絶理由には類似性以外の要因もあります。 |
| ロゴではなく文字（ブランド名）だけでも商標登録できますか？ | はい、文字商標（標準文字商標）として登録可能です。当サービスのロゴ生成とは別に、文字のみでも申請できます。 |
| 商標登録後にロゴを変更した場合、再申請が必要ですか？ | 登録した商標と実際に使用するロゴが大きく異なる場合、新たに出願が必要になることがあります。ロゴ変更時は弁理士にご確認ください。 |

```html
<!-- アコーディオンHTMLは /faq ページと同じ構造を使用 -->
<section class="trademark-faq-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">よくある疑問</span>
      <h2>商標登録についての疑問</h2>
    </div>
    <div class="faq-accordion-list animate-on-scroll" style="max-width: 760px; margin: 0 auto">
      <!-- 上記5問をaccordion形式で実装（/faq の .faq-accordion-item スタイル流用） -->
    </div>
    <div style="text-align:center; margin-top: 32px">
      <a href="/faq#cat-trademark" class="btn-secondary">商標登録 全FAQ を見る →</a>
    </div>
  </div>
</section>
```

---

## 8. Section 7：CTA

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>商標登録まで見据えたロゴ作成を、今日から。</h2>
        <p>プレミアムプランなら商標類似チェック・ブランドガイドライン・<br>
           著作権帰属証明書が全てセットになっています。</p>
        <div class="final-cta-buttons">
          <a href="/pricing#premium" class="btn-primary btn-primary-lg">プレミアムプランを見る →</a>
          <a href="/create" class="btn-secondary-inverse">まず無料で試す</a>
        </div>
        <div class="final-trust">
          <span>✓ J-PlatPat連携商標チェック</span>
          <span>✓ 著作権帰属証明書</span>
          <span>✓ 7日間全額返金保証</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 9. SEO規範

```html
<title>AIロゴで商標登録 | J-PlatPat連携商標類似チェック機能【LogoAI.jp プレミアム】</title>
<meta name="description" content="LogoAI.jpで生成したAIロゴで商標登録申請が可能。有料プランで著作権がユーザー帰属、著作権証明書も発行。プレミアムプランではJ-PlatPat連携で商標類似チェックも可能。">
<link rel="canonical" href="https://logoai.jp/trademark">
```

---

## 10. 结构化数据

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "AIで作ったロゴで商標登録できますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、LogoAI.jpの有料プランで生成したロゴは商標登録申請に利用できます。著作権がユーザーへ100%帰属し、著作権帰属証明書を補足書類として使用できます。商標登録の可否は特許庁の審査によります。" }},
    { "@type": "Question", "name": "商標類似チェックとは何ですか？",
      "acceptedAnswer": { "@type": "Answer", "text": "商標類似チェックとは、生成したロゴが既存の登録商標と類似していないか、J-PlatPat（日本特許庁のデータベース）とAIが照合してスコア評価する機能です（プレミアムプラン限定）。視覚的類似度・名称類似度・業種区分リスクの3軸で0〜100のリスクスコアを算出します。" }},
    { "@type": "Question", "name": "商標登録申請に必要な書類はLogoAI.jpで揃いますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "ロゴデータ（SVG・PNG・PDF）と著作権帰属証明書はLogoAI.jpで提供します。申請者情報・商標区分の選択・印紙代は申請者側で準備が必要です。" }}
  ]
}
```

---

## 11. GEO優化

```html
<p class="geo-definition">
  LogoAI.jpでは有料プランで生成したAIロゴを商標登録申請に使用できます。
  商標類似チェック機能（プレミアムプラン限定）は、日本特許庁のJ-PlatPat（特許情報プラットフォーム）と
  AI照合により視覚的類似度・名称類似度・業種区分リスクの3軸でリスクスコア（0〜100）を算出します。
  著作権帰属証明書PDFが自動発行され、商標登録申請の補足書類として活用できます。
  本機能はあくまで参考情報であり、最終的な商標登録可否は特許庁の審査によります。
</p>
```

---

## 12. 組件ファイル構成

```
app/trademark/page.tsx

components/trademark/
├── TrademarkHero.tsx
├── TrademarkBasics.tsx         # 3つの基礎知識カード
├── TrademarkWhySection.tsx     # 使える理由 + チェックリスト
├── TrademarkCheckFeature.tsx   # 商標類似チェックUI + 説明
├── TrademarkFlow.tsx           # 全体フロー（6ステップ）
├── TrademarkFAQ.tsx            # 専門FAQ 5問
└── TrademarkCTA.tsx
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/guarantee 返金保証ページ仕様書*
