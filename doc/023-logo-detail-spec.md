# Logo詳細ページ開発規格書 `/logo/[logoId]`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：`homepage-spec.md`（设计系统）、`create-result-spec.md`（WizardState・安心条）、`auth-spec.md`（AuthModal）、`checkout-spec.md`（決済フロー）
> **页面类型**：Logo詳細・コンバージョン核心ページ
> **核心设计原则**：
>   1. 先安心 → 再视觉 → 再付费，不要一上来就卖钱
>   2. 小尺寸验证・単色切换・真实应用场景，是拉开与海外AI差距的3个核心点
>   3. 操作区给用户控制感，不喜欢"无法调整"的感觉
>   4. 付费区放在视觉确认之后，不是第一屏

---

## 1. ページ仕様

| 項目 | 内容 |
|---|---|
| 路由 | `/logo/[logoId]` |
| 数据来源 | URL の `logoId` から API で取得・sessionStorage の WizardState を補完利用 |
| robots | `noindex, nofollow`（ユーザー固有ページ） |
| レイアウト | Navbar非表示・フッター非表示（生成フロー集中モード） |
| 遷移元 | `/create/result` のロゴカード「詳細を見る →」ボタン |

### 1.1 ページ全体構造

```
① 顶部安心条（固定）
② 生成完了ヘッダー
③ Logo主展示区（左：大図 / 右：小尺寸验证）
④ 使用场景Mockup横滑区
⑤ 操作・調整区
⑥ ダウンロード/付費区
⑦ 底部再生成引导区
```

```html
<div class="logo-detail-page">

  <!-- ① 安心条（固定・result-specと共通） -->
  <div class="trust-bar" role="note">...</div>

  <!-- ② 生成完了ヘッダー -->
  <header class="ld-header">...</header>

  <main class="ld-main">

    <!-- ③ Logo主展示区 -->
    <section class="ld-showcase" aria-labelledby="showcase-title">...</section>

    <!-- ④ 使用场景Mockup区 -->
    <section class="ld-mockups" aria-labelledby="mockup-title">...</section>

    <!-- ⑤ 操作・調整区 -->
    <section class="ld-controls" aria-labelledby="controls-title">...</section>

    <!-- ⑥ ダウンロード/付費区 -->
    <section class="ld-purchase" aria-labelledby="purchase-title">...</section>

    <!-- ⑦ 底部再生成引导区 -->
    <section class="ld-regen" aria-labelledby="regen-title">...</section>

  </main>
</div>
```

---

## 2. ① 顶部安心条

`create-result-spec.md` の `.trust-bar` コンポーネントをそのまま流用。

```html
<div class="trust-bar" role="note" aria-label="サービス品質保証">
  <div class="tb-inner">
    <span class="tb-item"><span class="tb-check">✔</span>商用利用可能</span>
    <span class="tb-divider">|</span>
    <span class="tb-item"><span class="tb-check">✔</span>著作権はお客様に帰属</span>
    <span class="tb-divider">|</span>
    <span class="tb-item"><span class="tb-check">✔</span>追加費用なし</span>
    <span class="tb-divider">|</span>
    <span class="tb-item"><span class="tb-check">✔</span>日本語最適化済み</span>
  </div>
</div>
```

CSS は `create-result-spec.md` の `.trust-bar` を流用。追加CSSなし。

---

## 3. ② 生成完了ヘッダー

```html
<header class="ld-header">
  <div class="ld-header-inner">

    <!-- 戻るボタン -->
    <a href="/create/result" class="ldh-back"
       aria-label="生成結果一覧に戻る">
      ← 他のロゴを見る
    </a>

    <!-- 生成完了メッセージ -->
    <div class="ldh-status">
      <div class="ldh-title">ロゴが生成されました</div>
      <div class="ldh-conditions">
        <span class="ldh-cond-item">
          <span class="ldh-cond-label">印象</span>
          <span id="ldh-impression"></span>
        </span>
        <span class="ldh-cond-sep" aria-hidden="true">・</span>
        <span class="ldh-cond-item">
          <span class="ldh-cond-label">用途</span>
          <span id="ldh-usage"></span>
        </span>
      </div>
    </div>

    <!-- 購入ボタン（ヘッダー固定・スクロール後に存在感を出す） -->
    <a href="/checkout" class="ldh-purchase-btn" id="ldh-purchase-btn">
      購入してダウンロード ¥4,980 →
    </a>

  </div>
</header>
```

```css
.ld-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid var(--color-border);
  padding: 0 var(--container-px);
}

.ld-header-inner {
  max-width: 1080px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.ldh-back {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s;
  flex-shrink: 0;
}

.ldh-back:hover { color: var(--color-primary); }

.ldh-status { flex: 1; }

.ldh-title {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.ldh-conditions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.ldh-cond-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.ldh-cond-label {
  font-weight: 700;
  color: var(--color-text-muted);
}

.ldh-cond-sep { color: var(--color-border); }

.ldh-purchase-btn {
  padding: 10px 20px;
  background: var(--color-primary);
  color: white;
  font-size: var(--text-sm);
  font-weight: 700;
  border-radius: var(--radius-full);
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(26,58,42,0.2);
}

.ldh-purchase-btn:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .ldh-status { display: none; }
  .ldh-purchase-btn {
    font-size: var(--text-xs);
    padding: 8px 14px;
  }
}
```

---

## 4. ③ Logo主展示区

左：大図+切替ボタン / 右：小尺寸验证（日本ユーザーが最も気にする「潰れないか」確認）

```html
<section class="ld-showcase" aria-labelledby="showcase-title">
  <h2 id="showcase-title" class="sr-only">ロゴプレビュー</h2>

  <div class="showcase-grid">

    <!-- 左：Logo大図エリア -->
    <div class="showcase-main">

      <!-- 背景切替タブ -->
      <div class="bg-switcher" role="group" aria-label="背景・カラー切替">
        <button class="bgs-btn bgs-active" type="button"
                data-mode="color-white"
                aria-pressed="true">カラー</button>
        <button class="bgs-btn" type="button"
                data-mode="mono-white"
                aria-pressed="false">単色</button>
        <button class="bgs-btn" type="button"
                data-mode="color-white"
                aria-pressed="false">白背景</button>
        <button class="bgs-btn" type="button"
                data-mode="color-dark"
                aria-pressed="false">黒背景</button>
        <button class="bgs-btn" type="button"
                data-mode="reverse-dark"
                aria-pressed="false">反白</button>
      </div>

      <!-- Logo表示エリア -->
      <div class="logo-display" id="logo-display"
           aria-label="ロゴプレビュー">

        <!-- カラー・白背景（デフォルト） -->
        <div class="ld-bg ld-bg-white ld-bg-active" data-bg="white">
          <img src="" alt="" id="ld-img-color"
               class="ld-img" width="500" height="400">
        </div>

        <!-- 黒背景 -->
        <div class="ld-bg ld-bg-dark" data-bg="dark">
          <img src="" alt="" id="ld-img-color-dark"
               class="ld-img" width="500" height="400">
        </div>

        <!-- 単色（黒ロゴ・白背景） -->
        <div class="ld-bg ld-bg-mono" data-bg="mono">
          <img src="" alt="" id="ld-img-mono"
               class="ld-img" width="500" height="400">
        </div>

        <!-- 反白（白ロゴ・黒背景） -->
        <div class="ld-bg ld-bg-reverse" data-bg="reverse">
          <img src="" alt="" id="ld-img-reverse"
               class="ld-img" width="500" height="400">
        </div>

      </div>

      <!-- ブランド名・スタイル情報 -->
      <div class="logo-meta">
        <div class="lm-brand" id="lm-brand-name"></div>
        <div class="lm-style">
          <div class="lm-colors" id="lm-colors" aria-label="使用カラー">
            <!-- 動的生成 -->
          </div>
          <span class="lm-font" id="lm-font"></span>
        </div>
      </div>

    </div>

    <!-- 右：小尺寸验证エリア -->
    <div class="showcase-sub">
      <h3 class="sub-title">
        小サイズ確認
        <span class="sub-hint">潰れないか確認できます</span>
      </h3>

      <div class="size-checks">

        <!-- SNS丸形アイコン -->
        <div class="size-check-item">
          <div class="sci-preview sci-circle">
            <img src="" alt="" id="sci-sns" loading="lazy">
          </div>
          <div class="sci-info">
            <div class="sci-label">SNSアイコン</div>
            <div class="sci-size">400 × 400px</div>
          </div>
        </div>

        <!-- 小サイズ（24px相当） -->
        <div class="size-check-item">
          <div class="sci-preview sci-tiny">
            <img src="" alt="" id="sci-tiny" loading="lazy">
          </div>
          <div class="sci-info">
            <div class="sci-label">小サイズ表示</div>
            <div class="sci-size">24px 相当</div>
          </div>
        </div>

        <!-- 名刺サイズ -->
        <div class="size-check-item">
          <div class="sci-preview sci-card">
            <div class="sci-card-inner">
              <img src="" alt="" id="sci-card" loading="lazy">
            </div>
          </div>
          <div class="sci-info">
            <div class="sci-label">名刺サイズ</div>
            <div class="sci-size">91 × 55mm</div>
          </div>
        </div>

        <!-- ファビコン -->
        <div class="size-check-item">
          <div class="sci-preview sci-favicon">
            <img src="" alt="" id="sci-favicon" loading="lazy">
          </div>
          <div class="sci-info">
            <div class="sci-label">ファビコン</div>
            <div class="sci-size">32 × 32px</div>
          </div>
        </div>

      </div>

      <!-- 小尺寸评价コメント -->
      <div class="size-verdict" id="size-verdict" aria-live="polite">
        <span class="sv-icon" aria-hidden="true">✓</span>
        <span class="sv-text">小サイズでも視認性良好です</span>
      </div>

    </div>

  </div>
</section>
```

```css
.ld-main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px var(--container-px) 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* 主展示グリッド */
.showcase-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 32px;
  align-items: start;
}

/* 背景切替タブ */
.bg-switcher {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.bgs-btn {
  padding: 6px 14px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.bgs-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.bgs-active,
.bgs-btn[aria-pressed="true"] {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* Logo表示エリア */
.logo-display {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.ld-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.ld-bg-active { opacity: 1; pointer-events: auto; }

.ld-bg-white  { background: white; }
.ld-bg-dark   { background: #1A1A1A; }
.ld-bg-mono   { background: white; }
.ld-bg-reverse { background: #1A1A1A; }

.ld-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* ブランド情報 */
.logo-meta {
  margin-top: 16px;
  padding: 14px 16px;
  background: var(--color-bg-section);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.lm-brand {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
}

.lm-style {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lm-colors { display: flex; gap: 4px; }

.lm-color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
}

.lm-font {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 600;
}

/* 右：小尺寸验证 */
.showcase-sub {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 20px;
}

.sub-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sub-hint {
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--color-text-muted);
}

.size-checks {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 16px 0;
}

.size-check-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sci-preview {
  flex-shrink: 0;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* SNS丸形 */
.sci-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.sci-circle img { width: 100%; height: 100%; object-fit: contain; padding: 6px; box-sizing: border-box; }

/* 小サイズ（24px相当を拡大表示） */
.sci-tiny {
  width: 56px;
  height: 40px;
  border-radius: var(--radius-md);
}

.sci-tiny img { width: 24px; height: auto; object-fit: contain; }

/* 名刺 */
.sci-card {
  width: 72px;
  height: 44px;
  border-radius: 3px;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}

.sci-card-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 6px;
  box-sizing: border-box;
}

.sci-card img { max-height: 20px; max-width: 100%; object-fit: contain; }

/* ファビコン */
.sci-favicon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
}

.sci-favicon img { width: 32px; height: 32px; object-fit: contain; }

.sci-info { flex: 1; }

.sci-label {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.sci-size {
  font-size: 0.6rem;
  color: var(--color-text-muted);
}

/* 小尺寸评価 */
.size-verdict {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  background: rgba(45,122,79,0.06);
  border: 1px solid rgba(45,122,79,0.15);
  border-radius: var(--radius-lg);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-success);
}

.sv-icon { font-size: var(--text-sm); }

/* レスポンシブ */
@media (max-width: 768px) {
  .showcase-grid {
    grid-template-columns: 1fr;
  }
  .showcase-sub {
    /* SPでは小尺寸区を横並びに */
    order: -1;
  }
  .size-checks {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .size-check-item { flex-direction: column; align-items: flex-start; }
}
```

---

## 5. ④ 使用场景Mockup区

横スクロールで5種類のMockupを展示。平面PNGではなく、リアルな使用環境を見せることが日本ユーザーへの「専門感」の核心。

```html
<section class="ld-mockups" aria-labelledby="mockup-title">
  <div class="section-header">
    <h2 id="mockup-title" class="section-title">使用イメージ</h2>
    <p class="section-desc">
      実際の使用シーンでのイメージを確認できます
    </p>
  </div>

  <!-- 横スクロールコンテナ -->
  <div class="mockup-scroll-wrap">
    <div class="mockup-scroll" role="list"
         aria-label="使用シーンMockup">

      <!-- 名刺 -->
      <div class="mockup-card" role="listitem">
        <div class="mc-preview mc-business-card">
          <div class="mcbc-surface">
            <img src="" alt="" class="mcbc-logo" id="mc-logo-card">
            <div class="mcbc-info">
              <div class="mcbc-brand" id="mcbc-brand"></div>
              <div class="mcbc-dummy">代表取締役　山田 太郎</div>
              <div class="mcbc-dummy">TEL: 03-XXXX-XXXX</div>
              <div class="mcbc-dummy">info@example.jp</div>
            </div>
          </div>
        </div>
        <div class="mc-label">名刺</div>
        <div class="mc-size">91 × 55mm</div>
      </div>

      <!-- 店舗看板 -->
      <div class="mockup-card" role="listitem">
        <div class="mc-preview mc-signage">
          <div class="mcs-sky"></div>
          <div class="mcs-board">
            <img src="" alt="" class="mcs-logo" id="mc-logo-signage">
          </div>
          <div class="mcs-door"></div>
        </div>
        <div class="mc-label">店舗看板</div>
        <div class="mc-size">屋外サイン想定</div>
      </div>

      <!-- Instagram画面 -->
      <div class="mockup-card" role="listitem">
        <div class="mc-preview mc-instagram">
          <div class="mci-phone">
            <div class="mci-screen">
              <div class="mci-header">
                <div class="mci-avatar">
                  <img src="" alt="" id="mc-logo-sns">
                </div>
                <div class="mci-account-info">
                  <div class="mci-username" id="mci-username"></div>
                  <div class="mci-followers">フォロワー 1,234</div>
                </div>
              </div>
              <div class="mci-posts-grid">
                <div class="mci-post"></div>
                <div class="mci-post"></div>
                <div class="mci-post"></div>
                <div class="mci-post"></div>
                <div class="mci-post"></div>
                <div class="mci-post"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mc-label">Instagramプロフィール</div>
        <div class="mc-size">SNSアカウント想定</div>
      </div>

      <!-- Webサイトヘッダー -->
      <div class="mockup-card" role="listitem">
        <div class="mc-preview mc-website">
          <div class="mcw-browser">
            <div class="mcw-bar">
              <div class="mcw-dots">
                <span></span><span></span><span></span>
              </div>
              <div class="mcw-url">https://example.jp</div>
            </div>
            <div class="mcw-nav">
              <img src="" alt="" class="mcw-logo" id="mc-logo-web">
              <div class="mcw-links">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div class="mcw-hero">
              <div class="mcw-hero-text"></div>
              <div class="mcw-hero-sub"></div>
            </div>
          </div>
        </div>
        <div class="mc-label">Webサイトヘッダー</div>
        <div class="mc-size">PC・スマホ対応想定</div>
      </div>

      <!-- パッケージ・袋 -->
      <div class="mockup-card" role="listitem">
        <div class="mc-preview mc-package">
          <div class="mcp-bag">
            <img src="" alt="" class="mcp-logo" id="mc-logo-package">
          </div>
        </div>
        <div class="mc-label">パッケージ・ショッパー</div>
        <div class="mc-size">商品包装・紙袋想定</div>
      </div>

    </div>
  </div>

  <!-- スクロールヒント（SP用） -->
  <div class="scroll-hint" aria-hidden="true">
    ← スワイプして確認 →
  </div>

</section>
```

```css
/* セクション共通 */
.section-header { margin-bottom: 20px; }

.section-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 6px;
}

.section-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* 横スクロール */
.mockup-scroll-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 12px;
  margin: 0 calc(-1 * var(--container-px));
  padding-left: var(--container-px);
}

.mockup-scroll {
  display: flex;
  gap: 16px;
  width: max-content;
  padding-right: var(--container-px);
}

/* Mockupカード共通 */
.mockup-card {
  flex-shrink: 0;
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mc-preview {
  width: 240px;
  height: 180px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  position: relative;
  border: 1px solid var(--color-border);
}

.mc-label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.mc-size {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* 名刺Mockup */
.mc-business-card {
  background: #e8e4dd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mcbc-surface {
  background: white;
  width: 160px;
  height: 96px;
  border-radius: 3px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  padding: 12px 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mcbc-logo { max-height: 28px; max-width: 100px; object-fit: contain; }

.mcbc-info { display: flex; flex-direction: column; gap: 2px; }

.mcbc-brand {
  font-size: 0.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.mcbc-dummy {
  font-size: 0.4rem;
  color: var(--color-text-muted);
}

/* 看板Mockup */
.mc-signage {
  display: flex;
  flex-direction: column;
  overflow: visible;
}

.mcs-sky {
  flex: 1;
  background: linear-gradient(180deg, #87CEEB 0%, #B0D4E8 100%);
}

.mcs-board {
  height: 56px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-shadow: 0 -3px 10px rgba(0,0,0,0.15);
}

.mcs-logo { max-height: 36px; max-width: 160px; object-fit: contain; }

.mcs-door {
  height: 40px;
  background: #c8a882;
  border: 2px solid #8B7355;
  border-top: none;
  width: 56px;
  margin: 0 auto;
  border-radius: 0 0 3px 3px;
}

/* Instagramモック */
.mc-instagram { background: white; padding: 0; }

.mci-phone {
  width: 100%;
  height: 100%;
  background: white;
}

.mci-screen { padding: 10px; }

.mci-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.mci-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888) border-box;
  overflow: hidden;
  flex-shrink: 0;
}

.mci-avatar img {
  width: 100%; height: 100%;
  object-fit: contain;
  padding: 3px;
  box-sizing: border-box;
}

.mci-username {
  font-size: 0.55rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.mci-followers { font-size: 0.45rem; color: var(--color-text-muted); }

.mci-posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.mci-post {
  aspect-ratio: 1;
  background: var(--color-bg-section);
  border-radius: 1px;
}

/* WebサイトMockup */
.mc-website { background: white; padding: 0; }

.mcw-browser { width: 100%; height: 100%; display: flex; flex-direction: column; }

.mcw-bar {
  height: 20px;
  background: #f5f5f5;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 6px;
}

.mcw-dots { display: flex; gap: 3px; }
.mcw-dots span {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--color-border);
}

.mcw-url {
  flex: 1;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  padding: 1px 6px;
  font-size: 0.4rem;
  color: var(--color-text-muted);
}

.mcw-nav {
  height: 28px;
  background: white;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 12px;
}

.mcw-logo { max-height: 16px; max-width: 60px; object-fit: contain; }

.mcw-links { display: flex; gap: 8px; margin-left: auto; }
.mcw-links span {
  width: 20px; height: 4px;
  background: var(--color-border);
  border-radius: 2px;
}

.mcw-hero {
  flex: 1;
  background: linear-gradient(135deg, var(--color-bg-section), #e8e4dd);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.mcw-hero-text {
  width: 100px; height: 8px;
  background: rgba(0,0,0,0.15);
  border-radius: 4px;
}

.mcw-hero-sub {
  width: 70px; height: 5px;
  background: rgba(0,0,0,0.08);
  border-radius: 3px;
}

/* パッケージMockup */
.mc-package {
  background: #f0ede8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mcp-bag {
  width: 90px;
  height: 110px;
  background: white;
  border: 1.5px solid #d0c8be;
  border-radius: 3px 3px 6px 6px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 16px rgba(0,0,0,0.1);
}

.mcp-bag::before {
  content: '';
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 14px;
  border: 2px solid #a09080;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.mcp-logo { max-width: 64px; max-height: 44px; object-fit: contain; }

/* スクロールヒント */
.scroll-hint {
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 10px;
}

@media (min-width: 768px) { .scroll-hint { display: none; } }
```

---

## 6. ⑤ 操作・調整区

ユーザーに「自分でコントロールできる」感を与える。各ボタンは現在の調整パネル（サイドバー）に連動。

```html
<section class="ld-controls" aria-labelledby="controls-title">
  <h2 id="controls-title" class="section-title">調整・変更</h2>
  <p class="section-desc">気になる点を調整して、より理想に近づけましょう</p>

  <div class="controls-grid">

    <button class="control-card" type="button"
            id="btn-ctrl-impression"
            aria-describedby="ctrl-impression-desc">
      <span class="cc-icon" aria-hidden="true">🔄</span>
      <div class="cc-body">
        <div class="cc-title">印象を変更</div>
        <div class="cc-desc" id="ctrl-impression-desc">
          信頼感・シンプル・高級感など12種類から選択
        </div>
      </div>
      <span class="cc-arrow" aria-hidden="true">›</span>
    </button>

    <button class="control-card" type="button"
            id="btn-ctrl-color"
            aria-describedby="ctrl-color-desc">
      <span class="cc-icon" aria-hidden="true">🎨</span>
      <div class="cc-body">
        <div class="cc-title">カラー変更</div>
        <div class="cc-desc" id="ctrl-color-desc">
          異なる配色イメージで再生成します
        </div>
      </div>
      <span class="cc-arrow" aria-hidden="true">›</span>
    </button>

    <button class="control-card" type="button"
            id="btn-ctrl-font"
            aria-describedby="ctrl-font-desc">
      <span class="cc-icon" aria-hidden="true">✏️</span>
      <div class="cc-body">
        <div class="cc-title">フォント変更</div>
        <div class="cc-desc" id="ctrl-font-desc">
          書体の雰囲気を変えて再生成します
        </div>
      </div>
      <span class="cc-arrow" aria-hidden="true">›</span>
    </button>

    <button class="control-card" type="button"
            id="btn-ctrl-regen"
            aria-describedby="ctrl-regen-desc">
      <span class="cc-icon" aria-hidden="true">↩️</span>
      <div class="cc-body">
        <div class="cc-title">再生成</div>
        <div class="cc-desc" id="ctrl-regen-desc">
          同じ条件で新しい案を生成します
          （残り <span id="ctrl-regen-left"></span> 回）
        </div>
      </div>
      <span class="cc-arrow" aria-hidden="true">›</span>
    </button>

  </div>
</section>
```

```css
.controls-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
}

.control-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  cursor: pointer;
  font-family: var(--font-body);
  text-align: left;
  transition: all 0.2s;
  width: 100%;
}

.control-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.cc-icon { font-size: 1.4rem; flex-shrink: 0; }

.cc-body { flex: 1; }

.cc-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 3px;
}

.cc-desc {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.cc-arrow {
  font-size: var(--text-xl);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .controls-grid { grid-template-columns: 1fr; }
}
```

### 6.1 操作区ボタンの動作（A方案：既存調整パネルに連動）

```typescript
// 印象変更 → /create/result の調整パネルにパラメーターを付けて戻る
document.getElementById('btn-ctrl-impression')?.addEventListener('click', () => {
  window.location.href = `/create/result?focus=impression`
})

// カラー変更 → 調整パネルの「避けたい印象」に色系のパラメーターを付けて戻る
document.getElementById('btn-ctrl-color')?.addEventListener('click', () => {
  window.location.href = `/create/result?focus=color`
})

// フォント変更 → 調整パネルにフォーカスして戻る
document.getElementById('btn-ctrl-font')?.addEventListener('click', () => {
  window.location.href = `/create/result?focus=font`
})

// 再生成 → 同じ条件でAPIコール → /create/result に戻って新しい結果を表示
document.getElementById('btn-ctrl-regen')?.addEventListener('click', () => {
  const regenLeft = parseInt(sessionStorage.getItem('logoai_regen_left') || '0')
  if (regenLeft <= 0) {
    // 上限に達した場合 → 付費へ誘導
    document.getElementById('purchase-section')?.scrollIntoView({ behavior: 'smooth' })
    return
  }
  window.location.href = `/create/result?regen=1`
})
```

---

## 7. ⑥ ダウンロード/付費区

**順序を守る**：先に無料プレビューを提示、次に有料プランを案内。価格は一番下に。

```html
<section class="ld-purchase" id="purchase-section"
         aria-labelledby="purchase-title">
  <h2 id="purchase-title" class="section-title">ダウンロード</h2>

  <div class="purchase-grid">

    <!-- 無料プレビュー -->
    <div class="purchase-card purchase-card-free">
      <div class="pc-header">
        <div class="pc-plan-name">無料プレビュー</div>
        <div class="pc-price-free">¥0</div>
      </div>
      <ul class="pc-features">
        <li class="pcf-item pcf-yes">低解像度PNG（600 × 600px）</li>
        <li class="pcf-item pcf-yes">個人利用・非商用</li>
        <li class="pcf-item pcf-no">商用利用</li>
        <li class="pcf-item pcf-no">SVG・PDF形式</li>
        <li class="pcf-item pcf-no">著作権帰属証明書</li>
        <li class="pcf-item pcf-no">SNSサイズ一式</li>
      </ul>
      <button class="btn-free-dl" type="button"
              id="btn-free-download"
              data-logo-id="{{ logo.id }}">
        ↓ 無料でダウンロード
      </button>
      <p class="pc-note">
        著作権はLogoAI.jpに帰属します
      </p>
    </div>

    <!-- スタンダードプラン（メイン推奨） -->
    <div class="purchase-card purchase-card-standard purchase-card-featured">
      <div class="pc-badge">おすすめ</div>
      <div class="pc-header">
        <div class="pc-plan-name">スタンダードプラン</div>
        <div class="pc-price">
          <span class="pc-price-num">¥4,980</span>
          <span class="pc-price-unit">税込・買い切り</span>
        </div>
      </div>
      <ul class="pc-features">
        <li class="pcf-item pcf-yes">高解像度PNG（無制限）</li>
        <li class="pcf-item pcf-yes">SVG・PDF形式</li>
        <li class="pcf-item pcf-yes">単色データ</li>
        <li class="pcf-item pcf-yes">SNSサイズ一式</li>
        <li class="pcf-item pcf-yes">印刷対応データ</li>
        <li class="pcf-item pcf-yes">商用利用フル解禁</li>
        <li class="pcf-item pcf-yes">著作権帰属証明書</li>
        <li class="pcf-item pcf-yes">再ダウンロード無制限</li>
      </ul>
      <a href="/checkout" class="btn-purchase-main"
         id="btn-purchase-standard">
        🔒 購入してダウンロード →
      </a>
      <div class="pc-trust">
        <span>↩️ 7日間全額返金保証</span>
      </div>
    </div>

    <!-- プレミアムプラン -->
    <div class="purchase-card purchase-card-premium">
      <div class="pc-header">
        <div class="pc-plan-name">プレミアムプラン</div>
        <div class="pc-price">
          <span class="pc-price-num">¥9,800</span>
          <span class="pc-price-unit">税込・買い切り</span>
        </div>
      </div>
      <ul class="pc-features">
        <li class="pcf-item pcf-yes">スタンダードの全て</li>
        <li class="pcf-item pcf-yes">ブランドガイドライン（PDF）</li>
        <li class="pcf-item pcf-yes">J-PlatPat商標類似チェック</li>
      </ul>
      <a href="/checkout?plan=premium" class="btn-purchase-sub"
         id="btn-purchase-premium">
        プレミアムで購入する →
      </a>
      <div class="pc-trust">
        <span>↩️ 7日間全額返金保証</span>
      </div>
    </div>

  </div>
</section>
```

```css
.purchase-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 16px;
  margin-top: 20px;
  align-items: start;
}

.purchase-card {
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* おすすめカード */
.purchase-card-featured {
  border-color: var(--color-primary);
  box-shadow: 0 4px 24px rgba(26,58,42,0.12);
  transform: translateY(-4px);
}

.pc-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-accent);
  color: var(--color-text-primary);
  font-size: 0.6rem;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.pc-header { display: flex; flex-direction: column; gap: 6px; }

.pc-plan-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
}

.pc-price-free {
  font-family: var(--font-number);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-muted);
}

.pc-price { display: flex; flex-direction: column; gap: 2px; }

.pc-price-num {
  font-family: var(--font-number);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.pc-price-unit {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.pc-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
  flex: 1;
}

.pcf-item {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  padding-left: 18px;
  position: relative;
  line-height: 1.5;
}

.pcf-item::before {
  position: absolute;
  left: 0;
  font-weight: 700;
}

.pcf-yes::before { content: '✓'; color: var(--color-success); }
.pcf-no::before  { content: '✗'; color: var(--color-border); }
.pcf-no { opacity: 0.5; }

/* ダウンロードボタン */
.btn-free-dl {
  width: 100%;
  padding: 12px;
  background: var(--color-bg-section);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-free-dl:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.pc-note {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  text-align: center;
  margin: 0;
}

.btn-purchase-main {
  display: block;
  width: 100%;
  padding: 14px;
  background: var(--color-primary);
  color: white;
  font-size: var(--text-sm);
  font-weight: 700;
  border-radius: var(--radius-full);
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(26,58,42,0.2);
}

.btn-purchase-main:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

.btn-purchase-sub {
  display: block;
  width: 100%;
  padding: 12px;
  background: none;
  border: 1.5px solid var(--color-primary);
  border-radius: var(--radius-full);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
}

.btn-purchase-sub:hover {
  background: var(--color-primary);
  color: white;
}

.pc-trust {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: center;
}

@media (max-width: 768px) {
  .purchase-grid { grid-template-columns: 1fr; }
  .purchase-card-featured { transform: none; }
}
```

---

## 8. ⑦ 底部再生成引导区

`create-result-spec.md` の `.regen-guide` をそのまま流用。追加CSSなし。

```html
<section class="ld-regen regen-guide"
         aria-labelledby="regen-title">
  <div class="rg-inner">
    <div class="rg-text">
      <div class="rg-title" id="regen-title">
        次のロゴも試してみますか？
      </div>
      <div class="rg-desc">
        条件を変えてもう一度生成できます。
        日本語最適化済みのデザインを何度でもお試しください。
      </div>
    </div>
    <div class="rg-actions">
      <a href="/create/result" class="rg-btn rg-btn-primary">
        🔄 条件を変更して再生成する
      </a>
      <a href="/create/result" class="rg-btn rg-btn-secondary">
        ← 他のロゴ案を見る
      </a>
    </div>
  </div>
</section>
```

---

## 9. 無料ダウンロード確認モーダル

「無料でダウンロード」クリック時に表示。著作権の制限を明確に伝える。

```html
<div class="free-dl-modal" id="free-dl-modal"
     role="dialog" aria-modal="true"
     aria-labelledby="free-dl-title" hidden>
  <div class="fdm-overlay" id="fdm-overlay"></div>
  <div class="fdm-content">
    <h2 id="free-dl-title" class="fdm-title">
      無料ダウンロードについて
    </h2>
    <ul class="fdm-list">
      <li>
        <span class="fdm-icon">📐</span>
        <span>解像度：600 × 600px（PNG形式）</span>
      </li>
      <li>
        <span class="fdm-icon">©️</span>
        <span>著作権：LogoAI.jpに帰属します</span>
      </li>
      <li>
        <span class="fdm-icon">🚫</span>
        <span>商用利用：不可（個人・非商用のみ）</span>
      </li>
    </ul>
    <div class="fdm-upgrade-note">
      <strong>商用利用・高解像度・著作権証明書が必要な場合は</strong><br>
      スタンダードプラン（¥4,980）をご利用ください。
    </div>
    <div class="fdm-actions">
      <button type="button" class="fdm-btn-cancel"
              id="fdm-cancel">キャンセル</button>
      <button type="button" class="fdm-btn-download"
              id="fdm-confirm">無料DLを続ける</button>
    </div>
  </div>
</div>
```

```css
.free-dl-modal {
  position: fixed;
  inset: 0;
  z-index: 500;
}

.free-dl-modal[hidden] { display: none; }

.fdm-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
}

.fdm-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: var(--radius-2xl);
  width: min(92vw, 420px);
  padding: 32px;
  animation: modalIn 0.25s ease;
}

.fdm-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 20px;
}

.fdm-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fdm-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.fdm-icon { flex-shrink: 0; font-size: var(--text-base); }

.fdm-upgrade-note {
  padding: 14px 16px;
  background: rgba(201,150,58,0.06);
  border: 1px solid rgba(201,150,58,0.25);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 20px;
}

.fdm-actions {
  display: flex;
  gap: 10px;
}

.fdm-btn-cancel {
  flex: 1;
  padding: 12px;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.fdm-btn-download {
  flex: 1;
  padding: 12px;
  background: var(--color-primary);
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.fdm-btn-download:hover { background: var(--color-primary-hover); }
```

---

## 10. JavaScript（ページ状態管理）

```typescript
// logo-detail.ts

// --- 初期化 ---
async function initLogoDetail() {
  const logoId = getLogoIdFromUrl()   // /logo/[logoId] からIDを取得
  const state  = loadWizardState()    // sessionStorage から条件を復元

  // API からロゴデータを取得
  const logo = await fetchLogoData(logoId)
  if (!logo) {
    window.location.href = '/create/result'
    return
  }

  // 各エリアを描画
  renderHeader(state, logo)
  renderShowcase(logo)
  renderSizeChecks(logo)
  renderMockups(logo, state)
  renderControls(state)
  renderPurchaseSection(logoId)
}

// --- ヘッダー描画 ---
function renderHeader(state: WizardState, logo: Logo) {
  const IMP_LABELS: Record<string, string> = {
    trustworthy: '信頼感', simple: 'シンプル', luxury: '高級感',
    friendly: '親しみやすい', modern: 'モダン', natural: 'ナチュラル',
    stylish: 'スタイリッシュ', japanese: '和風', powerful: '力強い',
    cute: '可愛い', pop: 'ポップ', cool: 'クール',
  }
  const USAGE_LABELS: Record<string, string> = {
    card: '名刺', signage: '看板', sns: 'SNS',
    package: 'パッケージ', web: 'Webサイト',
  }

  document.getElementById('ldh-impression')!.textContent =
    state.impression.map(i => IMP_LABELS[i] || i).join(' × ')
  document.getElementById('ldh-usage')!.textContent =
    state.usage.map(u => USAGE_LABELS[u] || u).join('・')

  // 購入リンクにlogoIdを付与
  const purchaseBtn = document.getElementById('ldh-purchase-btn') as HTMLAnchorElement
  purchaseBtn.href = `/checkout?logoId=${logo.id}`
}

// --- 背景切替タブ ---
function setupBgSwitcher(logo: Logo) {
  const MODES: Record<string, { bg: string; imgKey: keyof Logo }> = {
    'color-white':  { bg: 'white',   imgKey: 'previewUrl' },
    'color-dark':   { bg: 'dark',    imgKey: 'previewDarkUrl' },
    'mono-white':   { bg: 'mono',    imgKey: 'previewMonoUrl' },
    'reverse-dark': { bg: 'reverse', imgKey: 'previewReverseUrl' },
  }

  document.querySelectorAll<HTMLButtonElement>('.bgs-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode!
      const conf = MODES[mode]
      if (!conf) return

      // タブのactive更新
      document.querySelectorAll('.bgs-btn').forEach(b => {
        b.classList.remove('bgs-active')
        b.setAttribute('aria-pressed', 'false')
      })
      btn.classList.add('bgs-active')
      btn.setAttribute('aria-pressed', 'true')

      // 背景切替
      document.querySelectorAll('.ld-bg').forEach(bg => {
        bg.classList.toggle('ld-bg-active',
          (bg as HTMLElement).dataset.bg === conf.bg)
      })
    })
  })
}

// --- 小尺寸画像をセット ---
function renderSizeChecks(logo: Logo) {
  const setImg = (id: string, src: string) => {
    const el = document.getElementById(id) as HTMLImageElement
    if (el) el.src = src
  }

  setImg('sci-sns',     logo.previewSquareUrl)
  setImg('sci-tiny',    logo.previewUrl)
  setImg('sci-card',    logo.previewUrl)
  setImg('sci-favicon', logo.previewSquareUrl)
}

// --- Mockup画像をセット ---
function renderMockups(logo: Logo, state: WizardState) {
  const setImg = (id: string, src: string) => {
    const el = document.getElementById(id) as HTMLImageElement
    if (el) el.src = src
  }

  setImg('mc-logo-card',     logo.previewUrl)
  setImg('mc-logo-signage',  logo.previewUrl)
  setImg('mc-logo-sns',      logo.previewSquareUrl)
  setImg('mc-logo-web',      logo.previewUrl)
  setImg('mc-logo-package',  logo.previewUrl)

  // Instagram用のアカウント名（ブランド名から生成）
  const username = state.brandName.toLowerCase().replace(/\s+/g, '_')
  document.getElementById('mci-username')!.textContent = `@${username}`
  document.getElementById('mcbc-brand')!.textContent = state.brandName
}

// --- 再生成残り回数 ---
function renderControls(state: WizardState) {
  const regenLeft = parseInt(sessionStorage.getItem('logoai_regen_left') || '3')
  document.getElementById('ctrl-regen-left')!.textContent = String(regenLeft)
}

// --- 無料DLモーダル ---
document.getElementById('btn-free-download')?.addEventListener('click', () => {
  document.getElementById('free-dl-modal')!.hidden = false
})

document.getElementById('fdm-cancel')?.addEventListener('click', () => {
  document.getElementById('free-dl-modal')!.hidden = true
})

document.getElementById('fdm-overlay')?.addEventListener('click', () => {
  document.getElementById('free-dl-modal')!.hidden = true
})

document.getElementById('fdm-confirm')?.addEventListener('click', async () => {
  const modal = document.getElementById('free-dl-modal')!
  modal.hidden = true

  const logoId = getLogoIdFromUrl()
  const res = await fetch(`/api/download/${logoId}/free-png`)
  const blob = await res.blob()
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url
  a.download = `${logoId}-logo-free.png`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  // ダウンロード後トースト表示
  showToast('ダウンロード完了。商用利用には有料プランをご検討ください。')
})

// --- トースト通知 ---
function showToast(message: string) {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = message
  toast.setAttribute('role', 'status')
  toast.setAttribute('aria-live', 'polite')
  document.body.appendChild(toast)
  setTimeout(() => toast.classList.add('toast-visible'), 50)
  setTimeout(() => {
    toast.classList.remove('toast-visible')
    setTimeout(() => toast.remove(), 300)
  }, 4000)
}

// --- ESCキー ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('free-dl-modal')!.hidden = true
  }
})

// ヘルパー
function getLogoIdFromUrl(): string {
  return location.pathname.split('/').pop() || ''
}

initLogoDetail()
```

---

## 11. APIエンドポイント仕様

```
GET /api/logo/:logoId
Response: {
  id, brandName, industryLabel, plan
  previewUrl,        ← カラー・白背景
  previewDarkUrl,    ← カラー・黒背景
  previewMonoUrl,    ← 単色・白背景
  previewReverseUrl, ← 反白・黒背景
  previewSquareUrl,  ← 正方形（SNS・ファビコン用）
  colors: string[]   ← 使用カラーコード
  fontFamily: string
  impressionTags: string[]
}

GET /api/download/:logoId/free-png
Response: PNG binary（600×600px）
認証不要・ロゴID有効であればダウンロード可
```

---

## 12. アクセシビリティ要件

| 要件 | 実装 |
|---|---|
| 背景切替 | `aria-pressed` で現在の状態を通知 |
| 横スクロールMockup | `role="list"` + `aria-label` |
| 無料DLモーダル | `role="dialog"` + `aria-modal` + ESCで閉じる |
| 小尺寸评価 | `aria-live="polite"` |
| 購入ボタン | 価格をテキストに含める（スクリーンリーダー対応） |

---

## 13. レスポンシブ断点

| 断点 | 変更内容 |
|---|---|
| 768px以下 | 主展示グリッド→縦積み、小尺寸区を上部に移動 |
| 768px以下 | 付費グリッド3列→1列 |
| 640px以下 | 操作区2列→1列、Mockup横スクロール継続 |

---

## 14. コンポーネント構成

```
app/logo/[logoId]/page.tsx

components/logo-detail/
├── TrustBar.tsx              ← create-result-spec と共通流用
├── LogoDetailHeader.tsx      ← 戻るボタン・生成完了表示・ヘッダー購入ボタン
├── LogoShowcase.tsx          ← 大図 + 背景切替タブ
├── SizeCheck.tsx             ← 小尺寸验证（SNS・24px・名刺・ファビコン）
├── MockupScroll.tsx          ← 横スクロールMockup5種
├── LogoControls.tsx          ← 調整・変更ボタン4種
├── PurchaseSection.tsx       ← 無料/スタンダード/プレミアム 3カラム
├── RegenGuide.tsx            ← create-result-spec と共通流用
├── FreeDlModal.tsx           ← 無料DL確認モーダル
└── logo-detail.ts            ← 状態管理・API通信・インタラクション

app/api/logo/
└── [logoId]/route.ts

app/api/download/
└── [logoId]/free-png/route.ts
```

---

*文档版本：v1.0 | 最終更新：2025年3月*
