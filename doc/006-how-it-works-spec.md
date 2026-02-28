# 生成フローページ開発規格書 `/how-it-works`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：继承 `homepage-spec.md` 全部设计系统。
> **页面类型**：プロセス説明ページ（Process Explanation Page）
> **战略定位**：「使い方がわからない」「本当に簡単か」という不安を解消し、
>               初めてのユーザーが自信を持って生成フローを開始できるようにする。

---

## 1. 页面整体规范

| 项目 | 内容 |
|---|---|
| 路由 | `/how-it-works` |
| 主要目標 | 生成プロセスを透明化し「自分でもできる」という自信を与える |
| 次要目標 | 著作権取得までの完全フローを示して不安を先回りして解消 |
| 所要時間アピール | 「最短10分でロゴ完成・著作権証明書取得まで」 |

### 1.1 页面布局顺序

```
Navbar
Section 1: Page Hero（所要時間アピール）
Section 2: ステップ全体俯瞰（4ステップ横ライン）
Section 3: ステップ詳細（各ステップ縦展開・左右交互）
  Step 1: ブランド情報を入力（2分）
  Step 2: AIがデザイン生成（2分）
  Step 3: カスタマイズ（5分）
  Step 4: ダウンロード・著作権証明書取得（1分）
Section 4: よくある疑問（Mini FAQ 4問）
Section 5: 無料体験CTA
Footer
```

---

## 2. Section 1：Page Hero

```html
<section class="hiw-hero">
  <div class="hiw-hero-bg" aria-hidden="true"><div class="bg-grid"></div></div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">使い方・生成フロー</li>
      </ol>
    </nav>
    <div class="hiw-hero-content">
      <span class="section-eyebrow">使い方・生成フロー</span>
      <h1>最短10分で、<br>プロ品質のロゴと著作権証明書。</h1>
      <p class="hiw-hero-desc">
        ブランド名と業種を入力するだけ。AIが最適なデザインを提案し、
        気に入ったものを選んでダウンロードするまで、難しい操作は一切ありません。
      </p>
      <!-- 所要時間バッジ群 -->
      <div class="hiw-time-badges">
        <div class="time-badge">
          <span class="tb-time">2分</span>
          <span class="tb-label">入力</span>
        </div>
        <div class="tb-arrow" aria-hidden="true">→</div>
        <div class="time-badge">
          <span class="tb-time">2分</span>
          <span class="tb-label">AI生成</span>
        </div>
        <div class="tb-arrow" aria-hidden="true">→</div>
        <div class="time-badge">
          <span class="tb-time">5分</span>
          <span class="tb-label">調整</span>
        </div>
        <div class="tb-arrow" aria-hidden="true">→</div>
        <div class="time-badge time-badge-highlight">
          <span class="tb-time">1分</span>
          <span class="tb-label">完成・証明書</span>
        </div>
        <div class="time-total">
          合計 <strong>約10分</strong>
        </div>
      </div>
      <div class="hiw-hero-cta">
        <a href="/create" class="btn-primary btn-primary-lg">今すぐ無料で始める</a>
        <p class="hiw-hero-note">クレジットカード不要・アカウント登録30秒</p>
      </div>
    </div>
  </div>
</section>
```

```css
.hiw-hero {
  padding: calc(64px + 60px) var(--container-px) 48px;
  position: relative;
  background: var(--color-bg-base);
  overflow: hidden;
}

.hiw-hero-content {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hiw-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 16px 0 20px;
}

.hiw-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 40px;
}

/* 所要時間バッジ */
.hiw-time-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.time-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 14px 20px;
  min-width: 72px;
}

.time-badge-highlight {
  border-color: var(--color-accent);
  background: rgba(201,150,58,0.06);
}

.tb-time {
  font-family: var(--font-number);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
}

.time-badge-highlight .tb-time { color: var(--color-accent); }

.tb-label {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.tb-arrow {
  font-size: var(--text-xl);
  color: var(--color-text-muted);
}

.time-total {
  width: 100%;
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: 4px;
}

.time-total strong { color: var(--color-accent); font-weight: 700; }

.hiw-hero-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.hiw-hero-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
```

---

## 3. Section 2：ステップ全体俯瞰（横ライン）

```html
<section class="hiw-overview" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="hiw-steps-line" role="list" aria-label="生成フローの4ステップ">

      <div class="hsl-step" role="listitem">
        <div class="hsl-step-num" aria-hidden="true">01</div>
        <div class="hsl-step-icon" aria-hidden="true">✏️</div>
        <div class="hsl-step-title">入力</div>
        <div class="hsl-step-desc">ブランド名・業種・<br>イメージを入力</div>
        <div class="hsl-connector" aria-hidden="true"></div>
      </div>

      <div class="hsl-step" role="listitem">
        <div class="hsl-step-num" aria-hidden="true">02</div>
        <div class="hsl-step-icon" aria-hidden="true">✨</div>
        <div class="hsl-step-title">AI生成</div>
        <div class="hsl-step-desc">3案のロゴを<br>約2分で生成</div>
        <div class="hsl-connector" aria-hidden="true"></div>
      </div>

      <div class="hsl-step" role="listitem">
        <div class="hsl-step-num" aria-hidden="true">03</div>
        <div class="hsl-step-icon" aria-hidden="true">🎨</div>
        <div class="hsl-step-title">カスタマイズ</div>
        <div class="hsl-step-desc">フォント・色・字間を<br>自由に調整</div>
        <div class="hsl-connector" aria-hidden="true"></div>
      </div>

      <div class="hsl-step hsl-step-final" role="listitem">
        <div class="hsl-step-num" aria-hidden="true">04</div>
        <div class="hsl-step-icon" aria-hidden="true">📥</div>
        <div class="hsl-step-title">完成・取得</div>
        <div class="hsl-step-desc">全形式DL＋<br>著作権証明書</div>
      </div>

    </div>
  </div>
</section>
```

```css
.hiw-overview {
  padding: 48px var(--container-px);
}

.hiw-steps-line {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  max-width: var(--container-max);
  margin: 0 auto;
}

.hsl-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  flex: 1;
  position: relative;
}

/* ステップ番号 */
.hsl-step-num {
  font-family: var(--font-number);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.1em;
}

/* アイコン円 */
.hsl-step-icon {
  width: 56px;
  height: 56px;
  background: white;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: var(--shadow-sm);
  position: relative;
  z-index: 1;
}

.hsl-step-final .hsl-step-icon {
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 4px 20px rgba(26,58,42,0.25);
}

.hsl-step-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
}

.hsl-step-final .hsl-step-title { color: var(--color-primary); }

.hsl-step-desc {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ステップ間のコネクターライン */
.hsl-connector {
  position: absolute;
  top: calc(14px + 28px); /* num高さ + icon半径 */
  left: calc(50% + 28px);
  right: calc(-50% + 28px);
  height: 2px;
  background: var(--color-border);
  background-image: repeating-linear-gradient(
    to right,
    var(--color-accent) 0, var(--color-accent) 4px,
    transparent 4px, transparent 10px
  );
  z-index: 0;
}

@media (max-width: 640px) {
  .hiw-steps-line { flex-direction: column; gap: 24px; align-items: flex-start; padding: 0 16px; }
  .hsl-step { flex-direction: row; text-align: left; gap: 16px; }
  .hsl-connector { display: none; }
}
```

---

## 4. Section 3：ステップ詳細（左右交互レイアウト）

各ステップは「左：説明文 + 右：UI/画面モックアップ」の2カラム。
偶数ステップは左右反転（even section）。

### Step 1：ブランド情報を入力

```html
<section class="hiw-step-detail" id="step-1" data-step="1">
  <div class="container">
    <div class="step-detail-grid">

      <!-- 左：説明 -->
      <div class="step-content animate-on-scroll">
        <div class="step-meta">
          <span class="step-number-badge">Step 01</span>
          <span class="step-time-badge">約2分</span>
        </div>
        <h2>ブランド情報を入力する</h2>
        <p class="step-lead">
          ブランド名・業種・イメージキーワードを入力するだけ。
          複雑な設定は一切不要です。
        </p>
        <ul class="step-points">
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>ブランド名（日本語・英語OK）</strong>
              <p>読み方のヒントも入力すると、フォント提案の精度が上がります。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>業種を選択（47業種）</strong>
              <p>業種に応じて、AIが最適なフォントスタイルとカラー案を絞り込みます。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>イメージキーワード（任意）</strong>
              <p>「信頼感」「温もり」「スタイリッシュ」など、3つまで選択できます。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>カラーの方向性（任意）</strong>
              <p>希望のカラーパレット系統を選択。指定しない場合はAIが自動提案します。</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- 右：入力フォームモックアップ -->
      <div class="step-visual animate-on-scroll" style="--anim-delay: 0.15s">
        <div class="step-mockup step-mockup-form">
          <!-- ブラウザ風フレーム -->
          <div class="mockup-browser-bar" aria-hidden="true">
            <div class="browser-dots">
              <span></span><span></span><span></span>
            </div>
            <div class="browser-url">logoai.jp/create</div>
          </div>
          <!-- フォーム内容 -->
          <div class="mockup-form-body">
            <div class="mf-section-title">ブランド情報を入力してください</div>

            <div class="mf-field">
              <label class="mf-label">ブランド名 <span class="mf-required">必須</span></label>
              <div class="mf-input mf-input-filled">
                田中製菓
                <span class="mf-cursor" aria-hidden="true"></span>
              </div>
            </div>

            <div class="mf-field">
              <label class="mf-label">よみがな（任意）</label>
              <div class="mf-input">たなかせいか</div>
            </div>

            <div class="mf-field">
              <label class="mf-label">業種 <span class="mf-required">必須</span></label>
              <div class="mf-select">
                <span>食品・菓子製造</span>
                <span class="mf-select-arrow">▾</span>
              </div>
            </div>

            <div class="mf-field">
              <label class="mf-label">イメージキーワード（最大3つ）</label>
              <div class="mf-tags">
                <span class="mf-tag mf-tag-selected">伝統・老舗</span>
                <span class="mf-tag mf-tag-selected">温もり</span>
                <span class="mf-tag">和モダン</span>
                <span class="mf-tag">上品</span>
                <span class="mf-tag">親しみやすい</span>
              </div>
            </div>

            <button class="mf-submit-btn" aria-label="デザイン生成ボタン（モックアップ）">
              ✨ AIでデザインを生成する
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

### Step 2：AIがデザイン生成

```html
<section class="hiw-step-detail hiw-step-even" id="step-2" data-step="2"
         style="background: var(--color-bg-section)">
  <div class="container">
    <div class="step-detail-grid">

      <!-- 左：生成画面モックアップ（偶数は先に） -->
      <div class="step-visual animate-on-scroll">
        <div class="step-mockup step-mockup-generating">
          <div class="mockup-browser-bar" aria-hidden="true">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="browser-url">logoai.jp/create</div>
          </div>
          <div class="mockup-gen-body">
            <!-- 生成中ステータス -->
            <div class="gen-status">
              <div class="gen-spinner" aria-hidden="true"></div>
              <div class="gen-status-text">
                <div class="gen-step-current">日本語フォントを選択中...</div>
                <div class="gen-progress-bar">
                  <div class="gen-progress-fill" style="width:65%"></div>
                </div>
                <div class="gen-progress-num">65%</div>
              </div>
            </div>
            <!-- 生成ステップリスト -->
            <div class="gen-steps-list">
              <div class="gen-step-item gen-done">✓ 業種・業界データを分析</div>
              <div class="gen-step-item gen-done">✓ イメージキーワードをベクター化</div>
              <div class="gen-step-item gen-active">▸ 日本語フォントを最適化中</div>
              <div class="gen-step-item gen-pending">◦ カラーパレットを生成</div>
              <div class="gen-step-item gen-pending">◦ 3案のデザインを仕上げ</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右：説明 -->
      <div class="step-content animate-on-scroll" style="--anim-delay: 0.15s">
        <div class="step-meta">
          <span class="step-number-badge">Step 02</span>
          <span class="step-time-badge">約2分</span>
        </div>
        <h2>AIが3案を自動生成する</h2>
        <p class="step-lead">
          入力内容をもとに、スタイルの異なる3案を同時に生成します。
          待ち時間は平均2分。完了するとメールで通知します。
        </p>
        <ul class="step-points">
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>3案は意図的に異なるスタイル</strong>
              <p>「モダン」「エレガント」「温もり」など審美的方向性を分けて提案します。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>日本語フォント100種以上から最適選択</strong>
              <p>業種・業態・イメージキーワードに最も合うフォントをAIが自動判断します。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>気に入らなければ再生成（有料プランは無制限）</strong>
              <p>3案全て気に入らない場合、「再生成」ボタンで別の3案を生成できます。</p>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>
```

### Step 3：カスタマイズ

```html
<section class="hiw-step-detail" id="step-3" data-step="3">
  <div class="container">
    <div class="step-detail-grid">

      <!-- 左：説明 -->
      <div class="step-content animate-on-scroll">
        <div class="step-meta">
          <span class="step-number-badge">Step 03</span>
          <span class="step-time-badge">約5分</span>
        </div>
        <h2>フォント・色・レイアウトを調整する</h2>
        <p class="step-lead">
          3案の中から気に入ったデザインを選び、細部を自分好みに調整します。
          すべてブラウザ上でリアルタイムにプレビューできます。
        </p>
        <ul class="step-points">
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>フォント変更（100種以上）</strong>
              <p>クリックするだけで即切り替え。プレビューがリアルタイムに更新されます。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>カラー調整（HEX・カラーピッカー対応）</strong>
              <p>メインカラー・サブカラー・背景色を自由に変更できます。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>字間・行間・サイズ調整</strong>
              <p>スライダーで直感的に微調整。印刷・Web両方の最適値を確認できます。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon">✓</span>
            <div>
              <strong>背景色切り替えプレビュー</strong>
              <p>白・黒・グレー・カラー背景でのロゴ見え方を確認できます。</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- 右：カスタマイズUIモックアップ -->
      <div class="step-visual animate-on-scroll" style="--anim-delay: 0.15s">
        <div class="step-mockup step-mockup-customize">
          <div class="mockup-browser-bar" aria-hidden="true">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="browser-url">logoai.jp/create/customize</div>
          </div>
          <div class="mockup-customize-body">
            <!-- プレビューエリア -->
            <div class="mc-preview-area">
              <div class="mc-logo-display">
                <span class="mc-logo-text" style="font-family: serif; font-weight: 700; font-size: 28px; color: #1A3A2A; letter-spacing: 0.08em;">田中製菓</span>
                <span class="mc-logo-sub" style="font-size: 10px; color: #666; letter-spacing: 0.2em;">TANAKA SEIKA</span>
              </div>
              <!-- 背景切り替えボタン -->
              <div class="mc-bg-switcher">
                <button class="mc-bg-btn mc-bg-active" style="background:white" title="白背景"></button>
                <button class="mc-bg-btn" style="background:#1A1A1A" title="黒背景"></button>
                <button class="mc-bg-btn" style="background:#F0EDE6" title="ベージュ背景"></button>
              </div>
            </div>
            <!-- コントロールパネル -->
            <div class="mc-controls">
              <div class="mc-control-row">
                <span class="mc-ctrl-label">フォント</span>
                <div class="mc-font-selector">
                  <span>游明朝</span>
                  <span class="mc-ctrl-arrow">▾</span>
                </div>
              </div>
              <div class="mc-control-row">
                <span class="mc-ctrl-label">メインカラー</span>
                <div class="mc-color-pick">
                  <span class="mc-color-swatch" style="background:#1A3A2A"></span>
                  <span class="mc-color-hex">#1A3A2A</span>
                </div>
              </div>
              <div class="mc-control-row">
                <span class="mc-ctrl-label">字間</span>
                <div class="mc-slider-wrap">
                  <input type="range" class="mc-slider" value="60" min="0" max="100" aria-label="字間スライダー（モックアップ）">
                  <span class="mc-slider-val">0.08em</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

### Step 4：ダウンロード・著作権証明書取得

```html
<section class="hiw-step-detail hiw-step-even hiw-step-final-detail" id="step-4" data-step="4"
         style="background: var(--color-bg-section)">
  <div class="container">
    <div class="step-detail-grid">

      <!-- 左：完了画面モックアップ -->
      <div class="step-visual animate-on-scroll">
        <div class="step-mockup step-mockup-complete">
          <div class="mockup-browser-bar" aria-hidden="true">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="browser-url">logoai.jp/dashboard/logo-001</div>
          </div>
          <div class="mockup-complete-body">
            <!-- 完了メッセージ -->
            <div class="mc-complete-header">
              <div class="mc-complete-check" aria-hidden="true">✓</div>
              <div class="mc-complete-title">ロゴが完成しました！</div>
            </div>
            <!-- ダウンロードリスト -->
            <div class="mc-dl-list">
              <div class="mc-dl-item">
                <span class="mc-dl-format mc-dl-svg">SVG</span>
                <span class="mc-dl-name">logo-tanaka.svg</span>
                <span class="mc-dl-size">48KB</span>
                <button class="mc-dl-btn">↓</button>
              </div>
              <div class="mc-dl-item">
                <span class="mc-dl-format mc-dl-png">PNG</span>
                <span class="mc-dl-name">logo-tanaka-300dpi.png</span>
                <span class="mc-dl-size">1.2MB</span>
                <button class="mc-dl-btn">↓</button>
              </div>
              <div class="mc-dl-item">
                <span class="mc-dl-format mc-dl-pdf">PDF</span>
                <span class="mc-dl-name">logo-tanaka-cmyk.pdf</span>
                <span class="mc-dl-size">280KB</span>
                <button class="mc-dl-btn">↓</button>
              </div>
            </div>
            <!-- 著作権証明書 -->
            <div class="mc-cert-row">
              <div class="mc-cert-icon" aria-hidden="true">📋</div>
              <div class="mc-cert-info">
                <div class="mc-cert-title">著作権帰属証明書</div>
                <div class="mc-cert-sub">cert-tanaka-2025-001.pdf</div>
              </div>
              <button class="mc-cert-btn">取得する</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右：説明 -->
      <div class="step-content animate-on-scroll" style="--anim-delay: 0.15s">
        <div class="step-meta">
          <span class="step-number-badge step-number-final">Step 04</span>
          <span class="step-time-badge">約1分</span>
        </div>
        <h2>ダウンロードして、著作権証明書を取得する</h2>
        <p class="step-lead">
          ロゴが完成したら、必要な形式を全てダウンロード。
          著作権帰属証明書は自動発行されます。
        </p>
        <ul class="step-points">
          <li class="sp-item">
            <span class="sp-icon sp-icon-accent">✓</span>
            <div>
              <strong>全形式を一括ダウンロード（スタンダード：SVG/PNG/PDF/JPG）</strong>
              <p>プレミアムではAI・EPS形式も追加。印刷会社への入稿に即対応できます。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon sp-icon-accent">✓</span>
            <div>
              <strong>著作権帰属証明書がPDFで自動発行</strong>
              <p>購入完了と同時に証明書が発行されます。マイページからいつでも再取得可能です。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon sp-icon-accent">✓</span>
            <div>
              <strong>データは永久保存・再ダウンロード無制限</strong>
              <p>マイページからいつでもロゴの編集・再ダウンロードができます。</p>
            </div>
          </li>
          <li class="sp-item">
            <span class="sp-icon sp-icon-accent">✓</span>
            <div>
              <strong>名刺レイアウトも同時に生成（有料プラン）</strong>
              <p>ロゴ完成後、ボタン1つで名刺デザインも生成できます。</p>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>
```

---

## 5. ステップ詳細の共通CSS

```css
/* ─────────────────────────────────
   ステップ詳細セクション（共通）
───────────────────────────────── */
.hiw-step-detail {
  padding: var(--section-py) var(--container-px);
}

.step-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
}

/* 偶数ステップは左右入れ替え */
.hiw-step-even .step-detail-grid {
  direction: rtl;
}
.hiw-step-even .step-detail-grid > * {
  direction: ltr;
}

/* ─────────────────────────────────
   ステップメタ情報
───────────────────────────────── */
.step-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.step-number-badge {
  font-size: var(--text-xs);
  font-weight: 700;
  background: var(--color-primary);
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  letter-spacing: 0.06em;
}

.step-number-final {
  background: var(--color-accent);
  color: var(--color-text-primary);
}

.step-time-badge {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

/* ─────────────────────────────────
   ステップ見出し・リスト
───────────────────────────────── */
.step-content h2 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0 0 16px;
}

.step-lead {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 28px;
}

.step-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sp-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.sp-icon {
  width: 22px;
  height: 22px;
  background: rgba(45,122,79,0.1);
  color: var(--color-success);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

.sp-icon-accent {
  background: rgba(201,150,58,0.1);
  color: var(--color-accent);
}

.sp-item strong {
  display: block;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.sp-item p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* ─────────────────────────────────
   モックアップ共通フレーム
───────────────────────────────── */
.step-mockup {
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-xl);
  background: white;
}

.mockup-browser-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--color-bg-section);
  border-bottom: 1px solid var(--color-border);
}

.browser-dots {
  display: flex;
  gap: 5px;
}

.browser-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
}

.browser-dots span:nth-child(1) { background: #FF5F57; }
.browser-dots span:nth-child(2) { background: #FEBC2E; }
.browser-dots span:nth-child(3) { background: #28C840; }

.browser-url {
  flex: 1;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 4px 12px;
  font-size: 0.65rem;
  color: var(--color-text-muted);
  font-family: monospace;
  text-align: center;
}

/* ─────────────────────────────────
   Step 1 入力フォームモックアップ
───────────────────────────────── */
.mockup-form-body {
  padding: 24px;
}

.mf-section-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 20px;
  text-align: center;
}

.mf-field {
  margin-bottom: 16px;
}

.mf-label {
  display: block;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.mf-required {
  font-size: 0.55rem;
  background: rgba(196,30,58,0.1);
  color: #C41E3A;
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 700;
  margin-left: 4px;
}

.mf-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background: var(--color-bg-section);
  display: flex;
  align-items: center;
  gap: 2px;
  box-sizing: border-box;
}

.mf-input-filled {
  border-color: var(--color-primary);
  background: white;
  color: var(--color-text-primary);
  font-weight: 500;
}

.mf-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: var(--color-primary);
  animation: blink 1s ease infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.mf-select {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-primary);
  font-weight: 500;
}

.mf-select-arrow { color: var(--color-text-muted); }

.mf-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.mf-tag {
  padding: 5px 12px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: white;
  cursor: default;
}

.mf-tag-selected {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.mf-submit-btn {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 700;
  cursor: default;
  font-family: var(--font-body);
}

/* ─────────────────────────────────
   Step 2 生成中モックアップ
───────────────────────────────── */
.mockup-gen-body { padding: 28px; }

.gen-status {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.gen-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.gen-status-text { flex: 1; }

.gen-step-current {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.gen-progress-bar {
  height: 6px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 4px;
}

.gen-progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

.gen-progress-num {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: right;
}

.gen-steps-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gen-step-item {
  font-size: var(--text-xs);
  padding: 8px 12px;
  border-radius: var(--radius-md);
  font-weight: 500;
}

.gen-done { color: var(--color-success); background: rgba(45,122,79,0.06); }
.gen-active { color: var(--color-primary); background: rgba(26,58,42,0.06); font-weight: 700; }
.gen-pending { color: var(--color-text-muted); background: var(--color-bg-section); }

/* ─────────────────────────────────
   Step 3 カスタマイズモックアップ
───────────────────────────────── */
.mockup-customize-body { padding: 0; }

.mc-preview-area {
  background: white;
  border-bottom: 1px solid var(--color-border);
  padding: 32px 24px 20px;
  text-align: center;
  position: relative;
}

.mc-logo-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
}

.mc-bg-switcher {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.mc-bg-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  cursor: default;
}

.mc-bg-active { border-color: var(--color-accent); }

.mc-controls {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.mc-control-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mc-ctrl-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  min-width: 70px;
}

.mc-font-selector {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 7px 12px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  background: white;
}

.mc-ctrl-arrow { color: var(--color-text-muted); }

.mc-color-pick {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
}

.mc-color-swatch {
  width: 18px;
  height: 18px;
  border-radius: var(--radius-sm);
  display: block;
  border: 1px solid rgba(0,0,0,0.1);
}

.mc-color-hex { font-family: monospace; color: var(--color-text-secondary); }

.mc-slider-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mc-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  background: var(--color-border);
  border-radius: var(--radius-full);
  cursor: default;
}

.mc-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-primary);
}

.mc-slider-val {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: monospace;
  min-width: 40px;
}

/* ─────────────────────────────────
   Step 4 完了モックアップ
───────────────────────────────── */
.mockup-complete-body { padding: 20px 24px; }

.mc-complete-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.mc-complete-check {
  width: 36px;
  height: 36px;
  background: var(--color-success);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.mc-complete-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
}

.mc-dl-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.mc-dl-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--color-bg-section);
  border-radius: var(--radius-md);
}

.mc-dl-format {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.mc-dl-svg { background: rgba(26,58,42,0.1); color: var(--color-primary); }
.mc-dl-png { background: rgba(45,122,79,0.1); color: var(--color-success); }
.mc-dl-pdf { background: rgba(196,30,58,0.1); color: #C41E3A; }

.mc-dl-name {
  flex: 1;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mc-dl-size {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.mc-dl-btn {
  width: 28px;
  height: 28px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  cursor: default;
  flex-shrink: 0;
}

.mc-cert-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: rgba(201,150,58,0.06);
  border: 1.5px solid rgba(201,150,58,0.3);
  border-radius: var(--radius-lg);
}

.mc-cert-icon { font-size: 24px; flex-shrink: 0; }

.mc-cert-info { flex: 1; }

.mc-cert-title {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-primary);
}

.mc-cert-sub {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  font-family: monospace;
}

.mc-cert-btn {
  padding: 7px 14px;
  background: var(--color-accent);
  color: var(--color-text-primary);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 700;
  cursor: default;
  flex-shrink: 0;
  font-family: var(--font-body);
}

/* ─────────────────────────────────
   レスポンシブ（ステップ詳細全般）
───────────────────────────────── */
@media (max-width: 1024px) {
  .step-detail-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hiw-step-even .step-detail-grid {
    direction: ltr;
  }
  /* モバイルでは説明→モックアップの順 */
  .hiw-step-even .step-visual { order: 1; }
  .hiw-step-even .step-content { order: 0; }
}
```

---

## 6. Section 4：Mini FAQ（4問）

```html
<section class="hiw-mini-faq" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">よくある疑問</span>
      <h2>使い始める前の疑問を解消</h2>
    </div>
    <div class="mini-faq-grid animate-on-scroll">
      <div class="mini-faq-item">
        <div class="mfi-q">デザインの知識がなくても使えますか？</div>
        <div class="mfi-a">はい、完全に使えます。入力するのはブランド名と業種だけ。
          あとはAIが全て提案します。フォントや色の知識は不要です。</div>
      </div>
      <div class="mini-faq-item">
        <div class="mfi-q">スマートフォンでも使えますか？</div>
        <div class="mfi-a">はい、ブラウザからそのまま利用できます。
          ただし、カスタマイズ操作はPCの方が快適です。スマートフォン専用アプリは開発中です。</div>
      </div>
      <div class="mini-faq-item">
        <div class="mfi-q">気に入らなかった場合はどうなりますか？</div>
        <div class="mfi-a">購入から7日以内であれば全額返金します。
          また、有料プランでは再生成が無制限なので、納得いくまで調整できます。</div>
      </div>
      <div class="mini-faq-item">
        <div class="mfi-q">途中で保存して続きから作業できますか？</div>
        <div class="mfi-a">はい。アカウント登録後は自動保存されます。
          ブラウザを閉じても、マイページからいつでも続きの作業ができます。</div>
      </div>
    </div>
    <div class="mini-faq-more">
      <a href="/faq" class="btn-secondary">全てのよくある質問を見る →</a>
    </div>
  </div>
</section>
```

```css
.hiw-mini-faq { padding: var(--section-py) var(--container-px); }

.mini-faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: var(--container-max);
  margin: 0 auto 40px;
}

.mini-faq-item {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 24px;
}

.mfi-q {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 12px;
  padding-left: 20px;
  position: relative;
}

.mfi-q::before {
  content: 'Q';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 900;
  font-family: var(--font-number);
}

.mfi-a {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  padding-left: 20px;
  position: relative;
}

.mfi-a::before {
  content: 'A';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: 900;
  font-family: var(--font-number);
}

.mini-faq-more {
  text-align: center;
}

@media (max-width: 768px) { .mini-faq-grid { grid-template-columns: 1fr; } }
```

---

## 7. Section 5：CTA

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>まず、試してみてください。</h2>
        <p>入力から最初の3案生成まで無料・約4分。<br>
           気に入ったものが見つかれば、その時点で有料プランへ移行できます。</p>
        <div class="final-cta-buttons">
          <a href="/create" class="btn-primary btn-primary-lg">無料でロゴを作る →</a>
          <a href="/works" class="btn-secondary-inverse">生成事例を見る</a>
        </div>
        <div class="final-trust">
          <span>✓ クレジットカード不要</span>
          <span>✓ 7日間全額返金保証</span>
          <span>✓ 著作権完全帰属（有料プラン）</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 8. SEO規範

```html
<title>使い方・生成フロー | 最短10分でロゴ完成・著作権証明書取得【LogoAI.jp】</title>
<meta name="description" content="LogoAI.jpの使い方を4ステップで解説。ブランド名入力→AI生成→カスタマイズ→ダウンロードまで最短10分。著作権証明書も自動発行。デザイン知識不要。">
<link rel="canonical" href="https://logoai.jp/how-it-works">
```

### キーワード布局

| 位置 | キーワード |
|---|---|
| H1 | 最短10分 + ロゴ + 著作権証明書 |
| Step H2（×4） | 「入力する」「AI生成」「カスタマイズ」「ダウンロード・著作権証明書」 |
| Mini FAQ | 「デザイン知識不要」「スマートフォン」「返金」「保存」 |

---

## 9. 结构化数据

### HowTo Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "AIロゴを作成して著作権証明書を取得する方法",
  "description": "LogoAI.jpでAIロゴを生成し著作権証明書を取得するまでの4ステップ。最短10分。",
  "totalTime": "PT10M",
  "tool": [
    { "@type": "HowToTool", "name": "LogoAI.jp（ブラウザ）" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "ブランド情報を入力する",
      "text": "ブランド名・業種・イメージキーワード・カラーの方向性を入力します。所要時間は約2分です。",
      "url": "https://logoai.jp/how-it-works#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "AIがデザインを生成する",
      "text": "入力内容をもとに、スタイルの異なる3案のロゴを約2分で自動生成します。",
      "url": "https://logoai.jp/how-it-works#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "フォント・色・レイアウトを調整する",
      "text": "3案から気に入ったデザインを選び、フォント・カラー・字間などを約5分で調整します。",
      "url": "https://logoai.jp/how-it-works#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "ダウンロードして著作権証明書を取得する",
      "text": "SVG/PNG/PDF等の形式でダウンロードし、著作権帰属証明書PDFを取得します。所要時間は約1分です。",
      "url": "https://logoai.jp/how-it-works#step-4"
    }
  ]
}
```

### FAQPage Schema（Mini FAQ 4問）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "デザインの知識がなくても使えますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、完全に使えます。入力するのはブランド名と業種だけ。あとはAIが全て提案します。フォントや色の知識は不要です。" }
    },
    {
      "@type": "Question",
      "name": "スマートフォンでも使えますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、ブラウザからそのまま利用できます。ただし、カスタマイズ操作はPCの方が快適です。" }
    },
    {
      "@type": "Question",
      "name": "気に入らなかった場合はどうなりますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "購入から7日以内であれば全額返金します。また有料プランでは再生成が無制限なので、納得いくまで調整できます。" }
    },
    {
      "@type": "Question",
      "name": "途中で保存して続きから作業できますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、アカウント登録後は自動保存されます。マイページからいつでも続きの作業ができます。" }
    }
  ]
}
```

---

## 10. GEO優化

```html
<p class="geo-definition" style="max-width:var(--container-max); margin:0 auto; padding:0 var(--container-px) 24px">
  LogoAI.jpのロゴ生成フローは4ステップ：①ブランド名・業種・イメージキーワードの入力（約2分）、
  ②AIによる3案の自動生成（約2分）、③フォント・色・字間のカスタマイズ（約5分）、
  ④SVG/PNG/PDF等のダウンロードと著作権帰属証明書の取得（約1分）。
  合計最短10分でプロ品質のロゴと著作権証明書を取得できます。
  デザイン知識不要、クレジットカード不要で無料体験可能。7日間全額返金保証付き。
</p>
```

---

## 11. 性能要求

| 指標 | 目標値 | 対策 |
|---|---|---|
| LCP | ≤ 2.0秒 | 全セクションCSS/HTMLのみ、外部画像なし |
| INP | ≤ 100ms | モックアップは静的HTML（JSアニメーション最小限） |
| CLS | ≤ 0.05 | 固定高さのモックアップコンテナ |

モックアップ内の動くアニメーション（スピナー・カーソル点滅・プログレスバー）はCSS animationのみで実装し、JavaScriptは使わない。

---

## 12. 組件ファイル構成

```
app/how-it-works/page.tsx

components/how-it-works/
├── HIWHero.tsx               # Hero + 所要時間バッジ
├── HIWOverview.tsx           # 4ステップ横ライン
├── HIWStepDetail.tsx         # ステップ詳細ラッパー（左右交互）
│   ├── HIWStepContent.tsx    # 説明テキスト側
│   └── HIWStepMockup.tsx     # UIモックアップ側
├── HIWMockupForm.tsx         # Step1 入力フォームモックアップ
├── HIWMockupGenerating.tsx   # Step2 生成中モックアップ
├── HIWMockupCustomize.tsx    # Step3 カスタマイズモックアップ
├── HIWMockupComplete.tsx     # Step4 完了・DLモックアップ
├── HIWMiniFAQ.tsx            # 4問のミニFAQ
└── HIWFinalCTA.tsx           # 底部CTA
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/about 会社情報ページ仕様書*
