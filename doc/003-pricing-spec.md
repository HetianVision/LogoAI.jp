# 料金ページ開発規格書 `/pricing`

> **文档用途**：交付AI开发者直接实现。所有内容、交互、SEO、样式规范均在本文档完整定义。
> **依赖文档**：继承 `homepage-spec.md` 的全部设计系统（CSS变量、字体、按钮规范）。
> **页面类型**：定价转化页（Pricing & Conversion Page）

---

## 1. 页面整体规范

| 项目 | 内容 |
|---|---|
| 路由 | `/pricing` |
| 页面类型 | 定价转化页 |
| 主要目标 | 推动购买スタンダード（¥4,980）或プレミアム（¥9,800）|
| 推奨プラン | スタンダード（最高转化率目标）|
| 次要目标 | 消除著作権/返金/データ安全的购买焦虑 |

### 1.1 页面布局顺序

```
Navbar
Section 1: Page Hero         ← 简洁，3个核心承诺
Section 2: Toggle            ← 一次払い vs 月額換算
Section 3: 3列価格カード     ← 核心转化区块
Section 4: 著作権説明ボックス ← 最重要信任模块
Section 5: 返金保証          ← 深色背景，安心感最大化
Section 6: 全機能比較表      ← 全功能横向对比
Section 7: 支払い方法        ← 支付方式说明
Section 8: FAQ（購入関連6問）
Section 9: ユーザーレビュー（3条）
Section 10: 底部CTA
Footer
```

---

## 2. 设计原则（日本用户购买心理）

日本用户购买前必须消除的5个焦虑（按优先级）：
1. 著作権は本当に私のものになるのか？
2. 気に入らなかったらどうする？（返金保証）
3. 他のユーザーと同じロゴにならないか？
4. データは安全か？
5. 商標登録に本当に使えるのか？

**价格表示原则：**
- 显示顺序：無料 → スタンダード → プレミアム
- スタンダードカード：scale(1.04)、shadow-xl、背景 `var(--color-primary)`
- CTA按钮禁用「購入する」→ 改用「このプランで始める」
- 所有CTA下方必须显示「7日間全額返金保証」

---

## 3. Section 1：Page Hero

```html
<section class="pricing-hero">
  <div class="pricing-hero-bg" aria-hidden="true"><div class="bg-grid"></div></div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">料金プラン</li>
      </ol>
    </nav>
    <div class="pricing-hero-content">
      <span class="section-eyebrow">料金プラン</span>
      <h1>シンプルで透明な料金体系。<br>隠れた費用は一切ありません。</h1>
      <p class="pricing-hero-desc">
        著作権の範囲・使用可能な機能・返金条件を全てこのページに明記しています。
        不明な点はページ下部のよくある質問でご確認ください。
      </p>
      <div class="pricing-promises">
        <div class="promise-item">
          <div class="promise-icon">★</div>
          <div>
            <strong>著作権100%帰属</strong>
            <span>有料プランのロゴは完全にあなたのもの</span>
          </div>
        </div>
        <div class="promise-item">
          <div class="promise-icon">✓</div>
          <div>
            <strong>7日間全額返金保証</strong>
            <span>メール1通で返金申請完了</span>
          </div>
        </div>
        <div class="promise-item">
          <div class="promise-icon">🔒</div>
          <div>
            <strong>データは学習に使用しない</strong>
            <span>ブランド名・ロゴデータの外部提供なし</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.pricing-hero {
  padding: calc(64px + 60px) var(--container-px) 48px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.pricing-hero-content {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.pricing-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 16px 0 20px;
}

.pricing-hero-desc {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 40px;
}

.pricing-promises {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.promise-item {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
}

.promise-icon {
  width: 40px;
  height: 40px;
  background: rgba(201,150,58,0.1);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  flex-shrink: 0;
  font-size: 18px;
}

.promise-item strong {
  display: block;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.promise-item span {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.4;
}
```


---

## 4. Section 2：計画Toggle

```html
<div class="pricing-toggle-wrap">
  <div class="pricing-toggle" role="group" aria-label="支払い方法の切り替え">
    <button class="toggle-btn active" data-mode="onetime" aria-pressed="true">
      1回払い
    </button>
    <button class="toggle-btn" data-mode="monthly" aria-pressed="false">
      月額換算
      <span class="toggle-badge">参考</span>
    </button>
  </div>
  <p class="toggle-note" id="toggle-monthly-note" style="display:none">
    ※ 月額換算は年間利用の目安です。実際のお支払いは1回払いとなります。
  </p>
</div>
```

```css
.pricing-toggle-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px var(--container-px) 0;
}

.pricing-toggle {
  display: flex;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 4px;
  gap: 4px;
}

.toggle-btn {
  padding: 10px 28px;
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  background: transparent;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-btn.active {
  background: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.toggle-badge {
  background: var(--color-accent);
  color: white;
  font-size: 0.6rem;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  font-weight: 700;
}

.toggle-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: center;
}
```

**Toggle JavaScript：**
```javascript
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode
    document.querySelectorAll('.toggle-btn').forEach(b => {
      b.classList.remove('active')
      b.setAttribute('aria-pressed', 'false')
    })
    btn.classList.add('active')
    btn.setAttribute('aria-pressed', 'true')

    document.querySelectorAll('[data-price-onetime]').forEach(el => {
      const unit = el.nextElementSibling
      if (mode === 'monthly') {
        animatePriceChange(el, `¥${el.dataset.priceMonthly}`)
        if (unit) unit.textContent = '/ 月（年額換算）'
      } else {
        animatePriceChange(el, `¥${el.dataset.priceOnetime}`)
        if (unit) unit.textContent = el.dataset.unit || '/ 1ロゴ'
      }
    })
    document.getElementById('toggle-monthly-note').style.display =
      mode === 'monthly' ? 'block' : 'none'
  })
})

function animatePriceChange(el, newValue) {
  el.style.transition = 'all 0.2s ease'
  el.style.opacity = '0'
  el.style.transform = 'translateY(-8px)'
  setTimeout(() => {
    el.textContent = newValue
    el.style.transform = 'translateY(8px)'
    el.style.opacity = '0'
    setTimeout(() => {
      el.style.transform = 'translateY(0)'
      el.style.opacity = '1'
    }, 10)
  }, 200)
}
```

---

## 5. Section 3：3列価格カード（核心）

### 5.1 全体グリッド

```css
.pricing-cards-section { padding: 40px var(--container-px) var(--section-py); }

.pricing-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1.08fr 1fr;
  gap: 20px;
  align-items: start;
  max-width: var(--container-max);
  margin: 0 auto 32px;
}

@media (max-width: 1024px) {
  .pricing-cards-grid {
    grid-template-columns: 1fr;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
  }
  .pricing-card-featured { order: -1; }
}
```

### 5.2 共通カードスタイル

```css
.pricing-card {
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 36px 28px;
  position: relative;
  transition: box-shadow 0.3s ease;
}

.pricing-card:hover { box-shadow: var(--shadow-md); }

/* スタンダード（Featured） */
.pricing-card-featured {
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-xl);
  margin-top: -8px;
  padding-top: 44px;
  transition: all 0.3s ease;
}

.pricing-card-featured:hover {
  box-shadow: 0 24px 80px rgba(26,58,42,0.25), 0 8px 28px rgba(26,58,42,0.12);
  transform: translateY(-2px) scale(1.01);
}

/* 人気バナー */
.plan-popular-badge {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 6px 20px;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  letter-spacing: 0.03em;
}

/* 価格 */
.plan-price-amount {
  font-family: var(--font-number);
  font-size: 2.75rem;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  line-height: 1;
  transition: all 0.3s ease;
}

.pricing-card-featured .plan-price-amount { color: var(--color-accent); }

.plan-price-unit {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  padding-bottom: 4px;
}

.pricing-card-featured .plan-price-unit { color: rgba(250,250,247,0.5); }

/* 価格アンカー */
.plan-anchor-price {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(201,150,58,0.08);
  border: 1px solid rgba(201,150,58,0.2);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.anchor-original {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.anchor-save {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(201,150,58,0.15);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

/* 区切り線 */
.plan-divider {
  height: 1px;
  background: var(--color-border);
  margin: 20px 0;
}
.pricing-card-featured .plan-divider { background: rgba(250,250,247,0.1); }

/* 機能リスト */
.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.pricing-card-featured .feature-row { color: rgba(250,250,247,0.8); }
.pricing-card-featured .feature-row strong { color: white; }

.fr-icon {
  font-size: 0.7rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.fr-ok { background: rgba(45,122,79,0.12); color: var(--color-success); }
.pricing-card-featured .fr-ok { background: rgba(201,150,58,0.2); color: var(--color-accent); }
.fr-no { background: rgba(26,26,26,0.06); color: var(--color-text-muted); font-size: 0.6rem; }

.feature-row-no { opacity: 0.5; }

.feature-premium-tag {
  font-size: 0.55rem;
  background: rgba(201,150,58,0.15);
  color: var(--color-accent);
  padding: 2px 6px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(201,150,58,0.3);
  font-weight: 700;
  margin-left: auto;
  flex-shrink: 0;
}

/* CTAボタン */
.plan-cta-btn {
  display: block;
  width: 100%;
  padding: 15px 24px;
  border-radius: var(--radius-full);
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.plan-cta-free {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.plan-cta-free:hover { background: var(--color-primary); color: white; }

.plan-cta-featured {
  background: var(--color-accent);
  color: var(--color-text-primary);
  box-shadow: 0 4px 16px rgba(201,150,58,0.4);
}
.plan-cta-featured:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(201,150,58,0.5);
}

.plan-cta-premium {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
.plan-cta-premium:hover { background: var(--color-primary-hover); transform: translateY(-1px); }

/* 返金保証テキスト（CTA直下） */
.plan-cta-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: center;
  margin: 8px 0 0;
}
.pricing-card-featured .plan-cta-note { color: rgba(250,250,247,0.45); }

/* CLS防止：Toggle切り替え時のレイアウトシフト防止 */
.plan-price-row { min-height: 60px; }
.plan-price-amount { display: inline-block; min-width: 80px; }
```

### 5.3 无料プラン HTML

```html
<div class="pricing-card" data-plan="free">
  <div class="plan-header">
    <div class="plan-name-row">
      <span class="plan-name">無料プラン</span>
    </div>
    <div class="plan-price-row">
      <span class="plan-price-amount" data-price-onetime="0" data-price-monthly="0" data-unit="">¥0</span>
      <span class="plan-price-unit"></span>
    </div>
    <p class="plan-tagline">まずは試してみたい方へ</p>
  </div>
  <div class="plan-divider"></div>
  <ul class="plan-features">
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>ロゴ生成 <strong>3案まで</strong></span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>PNG形式（透かし入り）</span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>日本語フォント <strong>10種</strong></span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>修正回数 3回まで</span></li>
    <li class="feature-row feature-row-no"><span class="fr-icon fr-no">✗</span><span>商用利用</span></li>
    <li class="feature-row feature-row-no"><span class="fr-icon fr-no">✗</span><span>著作権帰属・証明書</span></li>
    <li class="feature-row feature-row-no"><span class="fr-icon fr-no">✗</span><span>SVG/AIデータ</span></li>
    <li class="feature-row feature-row-no"><span class="fr-icon fr-no">✗</span><span>名刺レイアウト生成</span></li>
    <li class="feature-row feature-row-no"><span class="fr-icon fr-no">✗</span><span>データ永久保存</span></li>
  </ul>
  <div class="plan-cta-area">
    <a href="/create" class="plan-cta-btn plan-cta-free">無料で試す</a>
    <p class="plan-cta-note" style="visibility:hidden">―</p>
  </div>
</div>
```

### 5.4 スタンダードプラン HTML（推荐）

```html
<div class="pricing-card pricing-card-featured" data-plan="standard">
  <div class="plan-popular-badge">
    ★ 人気No.1
  </div>
  <div class="plan-header">
    <div class="plan-name-row">
      <span class="plan-name">スタンダード</span>
    </div>
    <div class="plan-price-row">
      <span class="plan-price-amount"
            data-price-onetime="4,980"
            data-price-monthly="415"
            data-unit="/ 1ロゴ">¥4,980</span>
      <span class="plan-price-unit">/ 1ロゴ</span>
    </div>
    <p class="plan-tagline">個人事業主・スタートアップに最適</p>
    <div class="plan-anchor-price">
      <span>デザイン会社に依頼した場合：</span>
      <span class="anchor-original">¥30,000〜</span>
      <span class="anchor-save">約85%オフ</span>
    </div>
  </div>
  <div class="plan-divider"></div>
  <ul class="plan-features">
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>ロゴ生成 <strong>無制限</strong></span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>全形式ダウンロード（<strong>SVG/PNG/PDF</strong>）</span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>日本語フォント <strong>100種以上</strong></span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>修正回数 <strong>無制限</strong></span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span><strong>商用利用OK</strong>（全用途）</span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span><strong>著作権 完全帰属・証明書PDF発行</strong></span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>商標登録申請に利用可能</span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>名刺レイアウト生成 <strong>1枚</strong></span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>データ <strong>永久保存</strong></span></li>
    <li class="feature-row feature-row-no"><span class="fr-icon fr-no">✗</span><span>商標類似チェック</span></li>
    <li class="feature-row feature-row-no"><span class="fr-icon fr-no">✗</span><span>ブランドガイドラインPDF</span></li>
  </ul>
  <div class="plan-cta-area">
    <a href="/create?plan=standard" class="plan-cta-btn plan-cta-featured">このプランで始める</a>
    <p class="plan-cta-note">✓ 7日間全額返金保証付き</p>
  </div>
</div>
```

### 5.5 プレミアムプラン HTML

```html
<div class="pricing-card" data-plan="premium">
  <div class="plan-header">
    <div class="plan-name-row">
      <span class="plan-name">プレミアム</span>
      <span class="plan-for-badge">法人・本格ブランド向け</span>
    </div>
    <div class="plan-price-row">
      <span class="plan-price-amount"
            data-price-onetime="9,800"
            data-price-monthly="817"
            data-unit="/ 1ロゴ">¥9,800</span>
      <span class="plan-price-unit">/ 1ロゴ</span>
    </div>
    <p class="plan-tagline">商標登録・ブランド確立を本気で目指す方へ</p>
    <div class="plan-anchor-price">
      <span>ガイドライン作成だけで：</span>
      <span class="anchor-original">¥100,000〜</span>
      <span class="anchor-save">約90%オフ</span>
    </div>
  </div>
  <div class="plan-divider"></div>
  <ul class="plan-features">
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span><strong>スタンダードの全機能を含む</strong></span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>全形式（<strong>+AI/EPS</strong>）</span></li>
    <li class="feature-row">
      <span class="fr-icon fr-ok">✓</span>
      <span><strong>商標類似チェック</strong>（J-PlatPat連携）</span>
      <span class="feature-premium-tag">限定</span>
    </li>
    <li class="feature-row">
      <span class="fr-icon fr-ok">✓</span>
      <span><strong>ブランドガイドラインPDF</strong>自動生成</span>
      <span class="feature-premium-tag">限定</span>
    </li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>名刺レイアウト生成 <strong>5枚</strong></span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>カラーバリエーション（ダーク/ライト/モノクロ）</span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>優先メールサポート（<strong>24時間以内</strong>）</span></li>
    <li class="feature-row"><span class="fr-icon fr-ok">✓</span><span>生成唯一性証明書（追加PDF）</span></li>
  </ul>
  <div class="plan-cta-area">
    <a href="/create?plan=premium" class="plan-cta-btn plan-cta-premium">このプランで始める</a>
    <p class="plan-cta-note">✓ 7日間全額返金保証付き</p>
  </div>
</div>
```

### 5.6 税表示・インボイス注記

```html
<div class="pricing-tax-note">
  <p>表示価格は全て税込（消費税10%込）です。</p>
  <p>インボイス対応の領収書・請求書を発行できます。法人のお客様の請求書払い・銀行振込については
     <a href="/contact">お問い合わせ</a>ください。</p>
</div>
```

```css
.plan-for-badge {
  font-size: 0.65rem;
  background: rgba(201,150,58,0.1);
  color: var(--color-accent);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(201,150,58,0.2);
  font-weight: 500;
  white-space: nowrap;
}

.pricing-tax-note {
  max-width: var(--container-max);
  margin: 0 auto;
  text-align: center;
}
.pricing-tax-note p {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 4px;
}
.pricing-tax-note a { color: var(--color-primary); }
```


---

## 6. Section 4：著作権説明ボックス

```html
<section class="copyright-info-section" aria-labelledby="copyright-section-title">
  <div class="container">
    <div class="copyright-info-box">
      <div class="ci-header">
        <div class="ci-header-icon" aria-hidden="true">📋</div>
        <h2 id="copyright-section-title">著作権について、正直にお伝えします</h2>
      </div>
      <div class="ci-body">
        <p class="ci-lead">
          日本の文化庁は「AIが完全に自律的に生成したコンテンツには、著作権が発生しない場合がある」という見解を示しています。
          このためAIツールで作成したロゴの著作権は、サービスによって扱いが異なります。
        </p>
        <div class="ci-comparison">
          <div class="ci-col ci-col-free">
            <div class="ci-col-header">
              <span class="ci-col-badge ci-badge-free">無料プラン</span>
              <h3>著作権：当社に帰属</h3>
            </div>
            <ul class="ci-list">
              <li class="ci-no">商用利用不可</li>
              <li class="ci-no">商標登録申請不可</li>
              <li class="ci-no">SNSプロフィール以外の使用不可</li>
            </ul>
            <p class="ci-note">無料プランはロゴのデザインイメージを確認するための試用目的です。</p>
          </div>
          <div class="ci-col ci-col-paid">
            <div class="ci-col-header">
              <span class="ci-col-badge ci-badge-paid">有料プラン</span>
              <h3>著作権：お客様に100%帰属</h3>
            </div>
            <ul class="ci-list">
              <li class="ci-yes">商用利用（全用途）</li>
              <li class="ci-yes">商標登録申請</li>
              <li class="ci-yes">第三者への譲渡・ライセンス</li>
              <li class="ci-yes">著作権帰属証明書PDF発行</li>
            </ul>
            <p class="ci-note">
              ユーザーがデザインの選択・指示・編集に参加するプロセスを設計し、
              「ユーザーの創作的寄与」の記録を証明書に明記しています。
            </p>
          </div>
        </div>
        <div class="ci-authority">
          ℹ️ 参考：
          <a href="https://www.bunka.go.jp/seisaku/chosakuken/pdf/93903601_01.pdf"
             target="_blank" rel="noopener noreferrer">
            文化庁「AIと著作権に関する考え方について」
          </a>
          ・<a href="/copyright">当サービスの著作権詳細ページ →</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.copyright-info-section {
  padding: var(--section-py) var(--container-px);
  background: var(--color-bg-section);
}

.copyright-info-box {
  max-width: var(--container-max);
  margin: 0 auto;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
}

.ci-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 28px 36px;
  background: var(--color-primary);
}

.ci-header-icon {
  width: 52px;
  height: 52px;
  background: rgba(250,250,247,0.1);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.ci-header h2 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: white;
  line-height: 1.3;
  margin: 0;
}

.ci-body { padding: 36px; }

.ci-lead {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--color-border);
}

.ci-comparison {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 24px;
  margin-bottom: 24px;
}

.ci-col {
  border-radius: var(--radius-xl);
  padding: 24px;
}

.ci-col-free { background: var(--color-bg-section); border: 1px solid var(--color-border); }
.ci-col-paid { background: rgba(26,58,42,0.04); border: 1.5px solid rgba(26,58,42,0.2); }

.ci-col-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.ci-col-badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.ci-badge-free { background: var(--color-bg-base); color: var(--color-text-muted); border: 1px solid var(--color-border); }
.ci-badge-paid { background: var(--color-primary); color: white; }

.ci-col-header h3 {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.ci-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ci-list li {
  font-size: var(--text-sm);
  padding-left: 22px;
  position: relative;
  line-height: 1.5;
}

.ci-yes::before { content: '✓'; position: absolute; left: 0; color: var(--color-success); font-weight: 700; }
.ci-no::before { content: '✗'; position: absolute; left: 0; color: var(--color-text-muted); }
.ci-no { color: var(--color-text-muted); }

.ci-note { font-size: var(--text-xs); line-height: var(--leading-relaxed); color: var(--color-text-muted); margin: 0; }

.ci-authority {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding: 14px 16px;
  background: var(--color-bg-section);
  border-radius: var(--radius-md);
  flex-wrap: wrap;
}

.ci-authority a { color: var(--color-primary); text-decoration: underline; }

@media (max-width: 768px) {
  .ci-comparison { grid-template-columns: 1fr; }
  .ci-body { padding: 24px; }
}
```

---

## 7. Section 5：返金保証セクション

```html
<section class="guarantee-section" aria-labelledby="guarantee-title">
  <div class="container">
    <div class="guarantee-box animate-on-scroll">
      <div class="guarantee-box-deco1" aria-hidden="true"></div>
      <div class="guarantee-header">
        <div class="guarantee-shield" aria-hidden="true">🛡️</div>
        <div>
          <h2 id="guarantee-title">7日間全額返金保証</h2>
          <p>気に入らなければ、理由を問わず全額返金します。</p>
        </div>
      </div>
      <div class="guarantee-points">
        <div class="gp-item">
          <div class="gp-icon">📅</div>
          <h3>購入から7日以内</h3>
          <p>ご購入日から7日以内であれば、いかなる理由であっても全額返金いたします。
             ロゴが気に入らなかった、使わないことになった、など理由は問いません。</p>
        </div>
        <div class="gp-item">
          <div class="gp-icon">✉️</div>
          <h3>メール1通で申請完了</h3>
          <p>お問い合わせページから「返金希望」と送信するだけ。複雑な手続きは一切不要。
             申請受理後3〜5営業日以内に返金処理します。</p>
        </div>
        <div class="gp-item">
          <div class="gp-icon">⏱️</div>
          <h3>3〜5営業日以内に返金</h3>
          <p>クレジットカードへの返金は3〜5営業日以内に処理します。
             銀行振込の場合は別途ご案内します。</p>
        </div>
      </div>
      <div class="guarantee-cta">
        <p>返金保証の詳細な条件については
           <a href="/terms#refund">利用規約の返金ポリシーセクション</a>をご確認ください。</p>
      </div>
    </div>
  </div>
</section>
```

```css
.guarantee-section { padding: var(--section-py) var(--container-px); }

.guarantee-box {
  max-width: var(--container-max);
  margin: 0 auto;
  background: var(--color-primary);
  border-radius: var(--radius-2xl);
  padding: 48px 56px;
  position: relative;
  overflow: hidden;
}

.guarantee-box-deco1 {
  position: absolute;
  right: -80px;
  top: -80px;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(201,150,58,0.12), transparent 65%);
  pointer-events: none;
}

.guarantee-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.guarantee-shield { font-size: 48px; flex-shrink: 0; }

.guarantee-header h2 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: white;
  margin: 0 0 8px;
}

.guarantee-header p {
  font-size: var(--text-base);
  color: rgba(250,250,247,0.6);
  margin: 0;
}

.guarantee-points {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
  z-index: 1;
  margin-bottom: 32px;
}

.gp-item { display: flex; flex-direction: column; gap: 12px; }

.gp-icon {
  width: 48px;
  height: 48px;
  background: rgba(250,250,247,0.08);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.gp-item h3 {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  color: white;
  margin: 0;
}

.gp-item p {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: rgba(250,250,247,0.6);
  margin: 0;
}

.guarantee-cta {
  position: relative;
  z-index: 1;
  padding-top: 24px;
  border-top: 1px solid rgba(250,250,247,0.1);
}

.guarantee-cta p {
  font-size: var(--text-xs);
  color: rgba(250,250,247,0.4);
  margin: 0;
  text-align: center;
}

.guarantee-cta a { color: var(--color-accent); text-decoration: underline; }

@media (max-width: 1024px) {
  .guarantee-box { padding: 36px 28px; }
  .guarantee-points { grid-template-columns: 1fr; gap: 24px; }
}
```


---

## 8. Section 6：全機能比較表（詳細版）

```html
<section class="full-comparison-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">機能比較</span>
      <h2>プランの機能を全て比べる</h2>
    </div>
    <div class="full-comparison-wrap animate-on-scroll">
      <table class="full-comparison-table" role="table">
        <thead>
          <tr>
            <th scope="col" class="fc-feature-col">機能</th>
            <th scope="col" class="fc-free-col">
              <span class="fc-plan-name">無料</span>
              <span class="fc-plan-price">¥0</span>
            </th>
            <th scope="col" class="fc-standard-col">
              <span class="fc-plan-badge">人気No.1</span>
              <span class="fc-plan-name">スタンダード</span>
              <span class="fc-plan-price">¥4,980</span>
            </th>
            <th scope="col" class="fc-premium-col">
              <span class="fc-plan-name">プレミアム</span>
              <span class="fc-plan-price">¥9,800</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- ロゴ生成カテゴリ -->
          <tr class="fc-category-row"><td colspan="4">ロゴ生成</td></tr>
          <tr>
            <td class="fc-feature-col">ロゴ生成数</td>
            <td class="fc-free-col">3案まで</td>
            <td class="fc-standard-col"><strong>無制限</strong></td>
            <td class="fc-premium-col"><strong>無制限</strong></td>
          </tr>
          <tr>
            <td class="fc-feature-col">日本語フォント数</td>
            <td class="fc-free-col">10種</td>
            <td class="fc-standard-col"><strong>100種以上</strong></td>
            <td class="fc-premium-col"><strong>100種以上</strong></td>
          </tr>
          <tr>
            <td class="fc-feature-col">修正回数</td>
            <td class="fc-free-col">3回</td>
            <td class="fc-standard-col"><strong>無制限</strong></td>
            <td class="fc-premium-col"><strong>無制限</strong></td>
          </tr>
          <tr>
            <td class="fc-feature-col">業種別スタイル推薦</td>
            <td class="fc-free-col"><span class="fc-yes">✓</span></td>
            <td class="fc-standard-col"><span class="fc-yes">✓</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓</span></td>
          </tr>

          <!-- ダウンロード形式カテゴリ -->
          <tr class="fc-category-row"><td colspan="4">ダウンロード形式</td></tr>
          <tr>
            <td class="fc-feature-col">PNG（透過・300dpi）</td>
            <td class="fc-free-col">透かし入りのみ</td>
            <td class="fc-standard-col"><span class="fc-yes">✓</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">SVG（ベクター）</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-yes">✓</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">PDF（印刷用CMYK）</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-yes">✓</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">AI（Adobe Illustrator）</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-no">—</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">EPS</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-no">—</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓</span></td>
          </tr>

          <!-- 著作権カテゴリ -->
          <tr class="fc-category-row"><td colspan="4">著作権・法的権利</td></tr>
          <tr>
            <td class="fc-feature-col">商用利用</td>
            <td class="fc-free-col"><span class="fc-no">✗</span></td>
            <td class="fc-standard-col"><span class="fc-yes">✓ 全用途</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓ 全用途</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">著作権帰属先</td>
            <td class="fc-free-col">当社</td>
            <td class="fc-standard-col"><strong>ユーザー100%</strong></td>
            <td class="fc-premium-col"><strong>ユーザー100%</strong></td>
          </tr>
          <tr>
            <td class="fc-feature-col">著作権帰属証明書PDF</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-yes">✓ 自動発行</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓ 自動発行</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">商標登録申請に使用可</td>
            <td class="fc-free-col"><span class="fc-no">✗</span></td>
            <td class="fc-standard-col"><span class="fc-yes">✓</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">商標類似チェック</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-no">—</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓ J-PlatPat連携</span></td>
          </tr>

          <!-- ブランドツールカテゴリ -->
          <tr class="fc-category-row"><td colspan="4">ブランドツール</td></tr>
          <tr>
            <td class="fc-feature-col">名刺レイアウト生成</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col">1枚</td>
            <td class="fc-premium-col">5枚</td>
          </tr>
          <tr>
            <td class="fc-feature-col">ブランドガイドラインPDF</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-no">—</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓ 自動生成</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">カラーバリエーション</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-no">—</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓ 4バリエーション</span></td>
          </tr>

          <!-- データ・サポートカテゴリ -->
          <tr class="fc-category-row"><td colspan="4">データ・サポート</td></tr>
          <tr>
            <td class="fc-feature-col">データ保存期間</td>
            <td class="fc-free-col">7日間</td>
            <td class="fc-standard-col">永久保存</td>
            <td class="fc-premium-col">永久保存</td>
          </tr>
          <tr>
            <td class="fc-feature-col">AIの学習に使用</td>
            <td class="fc-free-col">あり</td>
            <td class="fc-standard-col"><strong>一切なし</strong></td>
            <td class="fc-premium-col"><strong>一切なし</strong></td>
          </tr>
          <tr>
            <td class="fc-feature-col">メールサポート</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-yes">✓ 72時間以内</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓ 24時間以内（優先）</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">インボイス対応領収書</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col"><span class="fc-yes">✓</span></td>
            <td class="fc-premium-col"><span class="fc-yes">✓</span></td>
          </tr>
          <tr>
            <td class="fc-feature-col">返金保証</td>
            <td class="fc-free-col"><span class="fc-no">—</span></td>
            <td class="fc-standard-col">7日間全額返金</td>
            <td class="fc-premium-col">7日間全額返金</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="fc-feature-col"></td>
            <td class="fc-free-col">
              <a href="/create" class="fc-cta-btn fc-cta-free">無料で試す</a>
            </td>
            <td class="fc-standard-col">
              <a href="/create?plan=standard" class="fc-cta-btn fc-cta-standard">このプランで始める</a>
            </td>
            <td class="fc-premium-col">
              <a href="/create?plan=premium" class="fc-cta-btn fc-cta-premium">このプランで始める</a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</section>
```

```css
.full-comparison-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: relative;
}

/* 横スクロール可能時のグラデーション */
.full-comparison-wrap.can-scroll-right::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(to right, transparent, rgba(242,240,235,0.95));
  pointer-events: none;
}

.full-comparison-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  background: white;
}

.full-comparison-table th,
.full-comparison-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-sm);
  vertical-align: middle;
}

.full-comparison-table tr:last-child td { border-bottom: none; }

.full-comparison-table thead th {
  background: var(--color-bg-section);
  text-align: center;
  padding: 20px 16px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.fc-feature-col { text-align: left !important; font-weight: 500; color: var(--color-text-secondary); min-width: 180px; }
.fc-free-col { text-align: center; min-width: 100px; }
.fc-standard-col { text-align: center; min-width: 130px; }
.fc-premium-col { text-align: center; min-width: 130px; }

.fc-standard-col {
  background: rgba(201,150,58,0.03);
  border-left: 2px solid rgba(201,150,58,0.3);
  border-right: 2px solid rgba(201,150,58,0.3);
  font-weight: 600;
  color: var(--color-primary);
}

thead .fc-standard-col {
  background: rgba(26,58,42,0.06);
  border-top: 2px solid rgba(201,150,58,0.4);
}

.fc-plan-badge {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 700;
  background: var(--color-accent);
  color: white;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  margin-bottom: 4px;
}

.fc-plan-name { display: block; font-size: var(--text-sm); font-weight: 700; color: var(--color-text-primary); }
.fc-plan-price { display: block; font-family: var(--font-number); font-size: var(--text-xl); font-weight: 600; color: var(--color-primary); margin-top: 4px; }

thead .fc-standard-col .fc-plan-name { color: var(--color-primary); }
thead .fc-standard-col .fc-plan-price { color: var(--color-accent); }

.fc-category-row td {
  background: var(--color-bg-section);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 16px;
}
.fc-category-row .fc-standard-col { background: rgba(201,150,58,0.06); }

.fc-yes { color: var(--color-success); font-weight: 600; }
.fc-no  { color: var(--color-text-muted); }

.full-comparison-table tfoot td {
  padding: 20px 16px;
  background: var(--color-bg-section);
  border-top: 1px solid var(--color-border);
}
.full-comparison-table tfoot .fc-standard-col { background: rgba(201,150,58,0.06); }

.fc-cta-btn {
  display: block;
  padding: 10px 16px;
  border-radius: var(--radius-full);
  text-align: center;
  font-size: var(--text-xs);
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  font-family: var(--font-body);
}

.fc-cta-free { border: 1.5px solid var(--color-primary); color: var(--color-primary); background: transparent; }
.fc-cta-free:hover { background: var(--color-primary); color: white; }
.fc-cta-standard { background: var(--color-accent); color: var(--color-text-primary); }
.fc-cta-standard:hover { background: var(--color-accent-hover); }
.fc-cta-premium { background: var(--color-primary); color: white; }
.fc-cta-premium:hover { background: var(--color-primary-hover); }
```


---

## 9. Section 7：支払い方法

```html
<section class="payment-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="payment-box animate-on-scroll">
      <h2 class="payment-title">支払い方法</h2>
      <div class="payment-methods">
        <div class="payment-method">
          <div class="pm-icon">💳</div>
          <div class="pm-info">
            <strong>クレジットカード</strong>
            <p>VISA・Mastercard・JCB・American Express・Discover対応</p>
          </div>
        </div>
        <div class="payment-method">
          <div class="pm-icon">📱</div>
          <div class="pm-info">
            <strong>PayPay</strong>
            <p>PayPayアプリからの直接決済</p>
          </div>
        </div>
        <div class="payment-method">
          <div class="pm-icon">🏦</div>
          <div class="pm-info">
            <strong>銀行振込</strong>
            <p>法人のお客様向け。請求書払いに対応。<a href="/contact">お問い合わせ</a>ください。</p>
          </div>
        </div>
      </div>
      <div class="payment-security">
        🔒 全ての決済はSSL暗号化通信で保護されています。カード情報は当社サーバーに保存しません。
      </div>
    </div>
  </div>
</section>
```

```css
.payment-box {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 40px;
}

.payment-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 28px;
  text-align: center;
}

.payment-methods {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 20px;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
  transition: background 0.2s ease;
}
.payment-method:last-child { border-bottom: none; }
.payment-method:hover { background: var(--color-bg-base); }

.pm-icon {
  width: 56px;
  height: 40px;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.pm-info strong { display: block; font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); margin-bottom: 4px; }
.pm-info p { font-size: var(--text-sm); color: var(--color-text-secondary); margin: 0; }
.pm-info a { color: var(--color-primary); }

.payment-security {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding: 14px 16px;
  background: rgba(45,122,79,0.04);
  border: 1px solid rgba(45,122,79,0.15);
  border-radius: var(--radius-lg);
}
```

---

## 10. Section 8：FAQ（購入関連6問）

各质问第一文は直接的な答えで始める。不安を解消する補足説明を続ける。

```html
<section class="pricing-faq-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">よくある質問</span>
      <h2>購入前のご疑問にお答えします</h2>
    </div>
    <div class="pricing-faq-grid animate-on-scroll">
      <div class="faq-column">

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false" aria-controls="pfaq-1">
            <span>支払い後、すぐにロゴをダウンロードできますか？</span>
            <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div id="pfaq-1" class="faq-answer" role="region">
            <p>はい、支払い完了直後にダウンロードいただけます。
               SVG・PNG・PDF等の形式で即座にダウンロード可能です。
               著作権証明書PDFも同時に発行されます。</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false" aria-controls="pfaq-2">
            <span>領収書・インボイス（適格請求書）はもらえますか？</span>
            <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div id="pfaq-2" class="faq-answer" role="region">
            <p>はい、対応しています。支払い完了後にマイページからインボイス対応の
               適格請求書（PDF）を即時発行できます。法人名義の発行も可能です。</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false" aria-controls="pfaq-3">
            <span>1回払いで購入したロゴを後から修正できますか？</span>
            <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div id="pfaq-3" class="faq-answer" role="region">
            <p>はい、有料プランでダウンロード後もマイページからロゴの編集・再ダウンロードが
               無制限で行えます。データは永久保存されますので、追加費用なしで後日修正できます。</p>
          </div>
        </div>

      </div>
      <div class="faq-column">

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false" aria-controls="pfaq-4">
            <span>プランのアップグレード・ダウングレードはできますか？</span>
            <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div id="pfaq-4" class="faq-answer" role="region">
            <p>各プランは1ロゴあたりの1回払いのため、プラン変更という概念がありません。
               次のロゴを作成する際に、別のプランを選択するだけです。</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false" aria-controls="pfaq-5">
            <span>複数のロゴを作りたい場合の料金は？</span>
            <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div id="pfaq-5" class="faq-answer" role="region">
            <p>料金はロゴ1点あたりの一回払いです。2点目以降も同じ料金が適用されます。
               複数ブランドのロゴをまとめて作成される法人向けにはボリュームディスカウントを検討中です。
               <a href="/contact">お問い合わせ</a>ください。</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" aria-expanded="false" aria-controls="pfaq-6">
            <span>無料プランで作ったロゴを後で有料版に変換できますか？</span>
            <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div id="pfaq-6" class="faq-answer" role="region">
            <p>はい、できます。無料プランで気に入ったデザインを見つけたら、
               マイページから「有料プランで取得する」ボタンをクリックするだけで購入できます。
               最初から有料プランで始める必要はありません。</p>
          </div>
        </div>

      </div>
    </div>
    <div class="faq-more">
      <a href="/faq" class="btn-secondary">その他のよくある質問はこちら →</a>
    </div>
  </div>
</section>
```

```css
.pricing-faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 48px;
  max-width: var(--container-max);
  margin: 0 auto 48px;
}

/* faq-item, faq-question, faq-answer スタイルは homepage-spec.md を流用 */
/* chevronアイコンのアニメーション */
.faq-question .faq-icon { transition: transform 0.3s ease; flex-shrink: 0; }
.faq-question[aria-expanded="true"] .faq-icon { transform: rotate(180deg); }

@media (max-width: 768px) {
  .pricing-faq-grid { grid-template-columns: 1fr; }
}
```

---

## 11. Section 9：ユーザーレビュー（購買決定型3条）

このセクションのレビューは「価格に見合う価値があった」「著作権が明確」「使い方が簡単」の3軸で選定。

```html
<section class="pricing-reviews-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">購入者の声</span>
      <h2>実際に使った方のリアルな感想</h2>
    </div>
    <div class="pricing-reviews-grid animate-on-scroll">

      <div class="pricing-review-card">
        <div class="pr-stars">★★★★★</div>
        <blockquote class="pr-quote">
          「デザイン会社に頼もうとしたら30万と言われ断念。こちらで試したら¥4,980でプロ品質のロゴが作れました。著作権証明書も付いてくるので商標申請にも使えました。」
        </blockquote>
        <div class="pr-author">
          <div class="pr-avatar" style="background:#2D7A4F">田</div>
          <div>
            <div class="pr-name">田中さん</div>
            <div class="pr-role">ITスタートアップ代表・東京</div>
          </div>
          <div class="pr-plan-tag">スタンダード購入</div>
        </div>
      </div>

      <div class="pricing-review-card">
        <div class="pr-stars">★★★★★</div>
        <blockquote class="pr-quote">
          「他のAIツールは著作権が曖昧で怖かった。このサービスは無料・有料の権利の違いが明確で、証明書も発行してもらえるので安心して商標申請できました。」
        </blockquote>
        <div class="pr-author">
          <div class="pr-avatar" style="background:#1F5C9A">鈴</div>
          <div>
            <div class="pr-name">鈴木さん</div>
            <div class="pr-role">行政書士・大阪</div>
          </div>
          <div class="pr-plan-tag">プレミアム購入</div>
        </div>
      </div>

      <div class="pricing-review-card">
        <div class="pr-stars">★★★★★</div>
        <blockquote class="pr-quote">
          「最初は半信半疑で無料から試したら想像以上に良いデザインが出てきました。気に入ったものが見つかったのでスタンダードに変換。操作も簡単で5分もかかりませんでした。」
        </blockquote>
        <div class="pr-author">
          <div class="pr-avatar" style="background:#8B4513">山</div>
          <div>
            <div class="pr-name">山口さん</div>
            <div class="pr-role">ハンドメイド作家（副業）・福岡</div>
          </div>
          <div class="pr-plan-tag">スタンダード購入</div>
        </div>
      </div>

    </div>

    <!-- 総合評価バー -->
    <div class="pricing-rating animate-on-scroll">
      <div class="rating-score">
        <span class="rating-number">4.9</span>
        <span class="rating-stars">★★★★★</span>
      </div>
      <div class="rating-breakdown">
        <div class="rb-row"><span>5★</span><div class="rb-bar"><div class="rb-fill" style="width:87%"></div></div><span>87%</span></div>
        <div class="rb-row"><span>4★</span><div class="rb-bar"><div class="rb-fill" style="width:10%"></div></div><span>10%</span></div>
        <div class="rb-row"><span>3★以下</span><div class="rb-bar"><div class="rb-fill" style="width:3%"></div></div><span>3%</span></div>
      </div>
      <div class="rating-total">500件以上の評価</div>
    </div>
  </div>
</section>
```

```css
.pricing-reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: var(--container-max);
  margin: 0 auto 48px;
}

.pricing-review-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pr-stars { color: var(--color-accent); font-size: var(--text-sm); letter-spacing: 2px; }

.pr-quote {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
  font-style: normal;
  flex: 1;
}

.pr-quote::before {
  content: '「';
  color: var(--color-accent);
  font-size: var(--text-xl);
  font-family: var(--font-heading);
  line-height: 0;
  vertical-align: -0.4em;
  margin-right: 2px;
}

.pr-author {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.pr-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: var(--text-base);
  flex-shrink: 0;
}

.pr-name { font-weight: 700; font-size: var(--text-sm); color: var(--color-text-primary); }
.pr-role { font-size: var(--text-xs); color: var(--color-text-muted); }

.pr-plan-tag {
  margin-left: auto;
  font-size: 0.6rem;
  background: rgba(26,58,42,0.06);
  color: var(--color-primary);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(26,58,42,0.12);
}

.pricing-rating {
  max-width: 500px;
  margin: 0 auto;
  background: var(--color-bg-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px 36px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.rating-score { display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; }
.rating-number { font-family: var(--font-number); font-size: 3rem; font-weight: 600; color: var(--color-text-primary); line-height: 1; }
.rating-stars { color: var(--color-accent); font-size: var(--text-base); }
.rating-breakdown { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.rb-row { display: grid; grid-template-columns: 40px 1fr 32px; align-items: center; gap: 8px; font-size: var(--text-xs); color: var(--color-text-muted); }
.rb-bar { height: 8px; background: var(--color-border); border-radius: var(--radius-full); overflow: hidden; }
.rb-fill { height: 100%; background: var(--color-accent); border-radius: var(--radius-full); }
.rating-total { font-size: var(--text-xs); color: var(--color-text-muted); text-align: center; }

@media (max-width: 768px) {
  .pricing-reviews-grid { grid-template-columns: 1fr; }
  .pricing-rating { flex-direction: column; gap: 20px; }
}
```

---

## 12. Section 10：底部CTA

```html
<!-- homepage-spec.md の final-cta-section スタイルを流用 -->
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>まずは無料で試してみてください。</h2>
        <p>気に入ったロゴが見つかれば、その時点で有料プランへの移行ができます。<br>
           クレジットカード不要・登録は30秒・7日間全額返金保証付き。</p>
        <div class="final-cta-buttons">
          <a href="/create" class="btn-primary btn-primary-lg">無料でロゴを作る →</a>
          <a href="/faq" class="btn-secondary-inverse">よくある質問を読む</a>
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

## 13. SEO規範

### 13.1 HTML head 設定

```html
<title>料金プラン | AIロゴ作成サービス【LogoAI.jp】¥0〜¥9,800・著作権帰属・返金保証</title>
<meta name="description" content="LogoAI.jpの料金プラン。無料・スタンダード(¥4,980)・プレミアム(¥9,800)の3プラン。著作権帰属明確。商標登録対応。7日間全額返金保証。インボイス対応。">
<link rel="canonical" href="https://logoai.jp/pricing">
<meta property="og:title" content="料金プラン | ¥0〜¥9,800・著作権帰属・返金保証【LogoAI.jp】">
<meta property="og:description" content="無料〜¥9,800の3プラン。著作権完全帰属・商標登録対応・7日間返金保証付き。">
<meta property="og:url" content="https://logoai.jp/pricing">
```

### 13.2 キーワード布局

| 位置 | キーワード |
|---|---|
| H1 | 料金 + 透明 |
| H2（著作権） | 著作権 + AIロゴ + 帰属 |
| H2（返金） | 返金保証 + 7日間 |
| 価格カードテキスト | 商用利用・商標登録・SVG・証明書 |
| FAQテキスト | 領収書・インボイス・複数ロゴ |

### 13.3 内部リンク

| リンク元 | リンク先 | アンカーテキスト |
|---|---|---|
| 著作権説明ボックス | `/copyright` | 著作権の詳細ページ |
| 返金ポリシー | `/terms#refund` | 返金ポリシー |
| FAQ「その他」 | `/faq` | よくある質問 |
| お問い合わせ | `/contact` | お問い合わせ |

---

## 14. 结构化数据 JSON-LD

### 14.1 BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://logoai.jp/" },
    { "@type": "ListItem", "position": 2, "name": "料金プラン", "item": "https://logoai.jp/pricing" }
  ]
}
```

### 14.2 Product Schema（スタンダードプラン代表）

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "LogoAI.jp スタンダードプラン",
  "description": "AIロゴ作成サービスの標準プラン。日本語フォント100種以上、SVG/PNG/PDFダウンロード、著作権完全帰属・証明書PDF発行、商用利用OK、商標登録申請対応、名刺レイアウト1枚生成。",
  "brand": { "@type": "Brand", "name": "LogoAI.jp" },
  "offers": {
    "@type": "Offer",
    "url": "https://logoai.jp/pricing",
    "priceCurrency": "JPY",
    "price": "4980",
    "availability": "https://schema.org/InStock",
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 7
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "500",
    "bestRating": "5"
  }
}
```

### 14.3 FAQPage Schema（6問）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "支払い後、すぐにロゴをダウンロードできますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、支払い完了直後にダウンロードいただけます。SVG・PNG・PDF等の形式で即座にダウンロード可能です。著作権証明書PDFも同時に発行されます。" }
    },
    {
      "@type": "Question",
      "name": "領収書・インボイス（適格請求書）はもらえますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、対応しています。支払い完了後にマイページからインボイス対応の適格請求書（PDF）を即時発行できます。法人名義の発行も可能です。" }
    },
    {
      "@type": "Question",
      "name": "1回払いで購入したロゴを後から修正できますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、有料プランでダウンロード後もマイページからロゴの編集・再ダウンロードが無制限で行えます。データは永久保存されますので、追加費用なしで後日修正できます。" }
    },
    {
      "@type": "Question",
      "name": "プランのアップグレード・ダウングレードはできますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "各プランは1ロゴあたりの1回払いのため、プラン変更という概念がありません。次のロゴを作成する際に、別のプランを選択するだけです。" }
    },
    {
      "@type": "Question",
      "name": "複数のロゴを作りたい場合の料金は？",
      "acceptedAnswer": { "@type": "Answer", "text": "料金はロゴ1点あたりの一回払いです。2点目以降も同じ料金が適用されます。法人のボリュームディスカウントについてはお問い合わせください。" }
    },
    {
      "@type": "Question",
      "name": "無料プランで作ったロゴを後で有料版に変換できますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、できます。無料プランで気に入ったデザインを見つけたら、マイページから「有料プランで取得する」ボタンをクリックするだけで購入できます。" }
    }
  ]
}
```

---

## 15. GEO优化

### 15.1 GEO向けサマリーテキスト（フッター直上）

```html
<p class="geo-definition" style="max-width:var(--container-max); margin: 0 auto; padding: 0 var(--container-px) 24px">
  LogoAI.jpの料金プランは無料・スタンダード（¥4,980/ロゴ）・プレミアム（¥9,800/ロゴ）の3種類。
  有料プランでは著作権がユーザーへ完全帰属し著作権帰属証明書PDFを発行。
  スタンダードはSVG/PNG/PDFダウンロード・名刺1枚生成・永久データ保存を含む。
  プレミアムはJ-PlatPat連携商標チェック・ブランドガイドラインPDF・AI/EPS形式・名刺5枚を追加。
  全プラン7日間全額返金保証・インボイス対応領収書発行可能。消費税10%込み表示。
</p>
```

### 15.2 価格のmicrodata（Schema.org JSON-LDと併用）

```html
<span itemprop="price" content="4980"
      data-price-onetime="4,980"
      data-price-monthly="415"
      data-unit="/ 1ロゴ">¥4,980</span>
<meta itemprop="priceCurrency" content="JPY">
```

---

## 16. 性能要求

### 16.1 Core Web Vitals 目標

| 指標 | 目標値 | 重要ポイント |
|---|---|---|
| LCP | ≤ 2.0秒 | Heroはテキストのみ、画像なし |
| INP | ≤ 150ms | Toggle・FAQ操作全て |
| CLS | ≤ 0.05 | Toggle切り替え時のシフト防止 |

### 16.2 CLS防止：Toggle切り替え時対策

```css
.plan-price-row { min-height: 60px; }
.plan-price-amount { display: inline-block; min-width: 80px; }
```

---

## 17. 組件ファイル構成

```
app/pricing/page.tsx

components/pricing/
├── PricingHero.tsx
├── PricingToggle.tsx
├── PricingCards.tsx
│   ├── PlanCard.tsx
│   └── PlanFeatureRow.tsx
├── CopyrightInfoBox.tsx
├── GuaranteeSection.tsx
├── FullComparisonTable.tsx
├── PaymentMethods.tsx
├── PricingFAQ.tsx
└── PricingReviews.tsx

hooks/
├── usePricingToggle.ts
└── usePriceAnimation.ts

lib/pricing-data.ts     # プランデータ定数
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/faq よくある質問ページ仕様書*
