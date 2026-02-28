# 返金保証ページ開発規格書 `/guarantee`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：继承 `homepage-spec.md` 全部设計系统。
> **页面类型**：信頼・安心訴求ページ（Trust & Conversion Page）
> **战略定位**：購入直前の最後の不安（「気に入らなかったら？」）を完全に取り除く。
>               返金ポリシーを透明・明確に示すことで購入ボタンを押しやすくする。
>               `/pricing` から「7日間全額返金保証付き」リンク先として機能。

---

## 1. 页面整体规范

| 項目 | 内容 |
|---|---|
| 路由 | `/guarantee` |
| 主要目標 | 返金保証の内容を完全透明化し、購入への心理的障壁をゼロにする |
| 内部リンク元 | `/pricing`・全CTAの「7日間全額返金保証」テキスト |

### 1.1 页面布局顺序

```
Navbar
Section 1: Page Hero（7日間・理由不問・全額）
Section 2: 返金保証の3原則
Section 3: 返金申請の手順（3ステップ）
Section 4: 返金FAQ（5問）
Section 5: 返金が必要ない理由（品質への自信）
Section 6: CTA
Footer
```

---

## 2. Section 1：Page Hero

```html
<section class="guarantee-hero">
  <div class="guarantee-hero-bg" aria-hidden="true">
    <div class="bg-grid"></div>
    <div class="gh-radial" aria-hidden="true"></div>
  </div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">返金保証</li>
      </ol>
    </nav>
    <div class="guarantee-hero-content">
      <!-- 大きなシールドアイコン -->
      <div class="gh-shield" aria-hidden="true">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M40 8L10 22v24c0 18 10.67 34.8 30 40 19.33-5.2 30-22 30-40V22L40 8z"
                fill="rgba(26,58,42,0.08)" stroke="var(--color-primary)" stroke-width="2"/>
          <path d="M28 40l9 9 18-20" stroke="var(--color-accent)" stroke-width="3"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="section-eyebrow">返金保証</span>
      <h1>7日間全額返金保証。<br>理由は問いません。</h1>
      <p class="guarantee-hero-desc">
        ロゴのクオリティに満足できなかった場合、
        購入から7日以内であれば、理由を問わず全額返金します。
        返金申請はメール1通だけ。複雑な手続きは一切ありません。
      </p>
      <!-- 保証の3要素 -->
      <div class="gh-badges">
        <div class="gh-badge">
          <span class="ghb-num">7日間</span>
          <span class="ghb-label">保証期間</span>
        </div>
        <div class="gh-badge gh-badge-accent">
          <span class="ghb-num">100%</span>
          <span class="ghb-label">全額返金</span>
        </div>
        <div class="gh-badge">
          <span class="ghb-num">理由不問</span>
          <span class="ghb-label">申請条件</span>
        </div>
      </div>
      <a href="/pricing" class="btn-primary btn-primary-lg" style="margin-top: 8px;">
        安心して購入する →
      </a>
    </div>
  </div>
</section>
```

```css
.guarantee-hero {
  padding: calc(64px + 60px) var(--container-px) 64px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.gh-radial {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(26,58,42,0.04), transparent 60%);
  pointer-events: none;
}

.guarantee-hero-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.gh-shield {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.guarantee-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 12px 0 20px;
}

.guarantee-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 36px;
}

.gh-badges {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.gh-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 16px 24px;
  min-width: 100px;
}

.gh-badge-accent {
  border-color: var(--color-accent);
  background: rgba(201,150,58,0.04);
}

.ghb-num {
  font-family: var(--font-number);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.gh-badge-accent .ghb-num { color: var(--color-accent); }

.ghb-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 500;
}
```

---

## 3. Section 2：返金保証の3原則

```html
<section class="guarantee-principles-section" style="background: var(--color-primary)">
  <div class="container">
    <div class="gp-grid animate-on-scroll">

      <div class="gp-item">
        <div class="gp-icon" aria-hidden="true">📅</div>
        <h3>購入から7日以内</h3>
        <p>
          購入完了メールを受信した日を1日目として、
          7日以内であれば返金申請が可能です。
          土日祝日も期間に含まれます。
        </p>
      </div>

      <div class="gp-divider" aria-hidden="true"></div>

      <div class="gp-item">
        <div class="gp-icon" aria-hidden="true">💬</div>
        <h3>理由は問いません</h3>
        <p>
          「イメージと違った」「別のサービスを使うことにした」など、
          どんな理由でも申請を受け付けます。
          理由の説明は不要です。
        </p>
      </div>

      <div class="gp-divider" aria-hidden="true"></div>

      <div class="gp-item">
        <div class="gp-icon" aria-hidden="true">💳</div>
        <h3>3〜5営業日以内に返金</h3>
        <p>
          申請受理後、3〜5営業日以内に
          ご購入時の決済方法（クレジットカード等）へ返金処理します。
          返金手数料は一切かかりません。
        </p>
      </div>

    </div>
  </div>
</section>
```

```css
.guarantee-principles-section {
  padding: var(--section-py) var(--container-px);
  position: relative;
  overflow: hidden;
}

.guarantee-principles-section::before {
  content: '';
  position: absolute;
  right: -60px;
  bottom: -60px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(201,150,58,0.1), transparent 65%);
  pointer-events: none;
}

.gp-grid {
  display: flex;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
  gap: 0;
}

.gp-item {
  flex: 1;
  text-align: center;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.gp-divider {
  width: 1px;
  height: 120px;
  background: rgba(250,250,247,0.15);
  flex-shrink: 0;
}

.gp-icon { font-size: 40px; }

.gp-item h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
  margin: 0;
}

.gp-item p {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: rgba(250,250,247,0.65);
  margin: 0;
}

@media (max-width: 768px) {
  .gp-grid { flex-direction: column; gap: 32px; }
  .gp-item { padding: 0; }
  .gp-divider { width: 120px; height: 1px; }
}
```

---

## 4. Section 3：返金申請の手順（3ステップ）

```html
<section class="guarantee-steps-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">申請方法</span>
      <h2>返金申請はメール1通で完了</h2>
      <p class="section-subtext">複雑な手続きは一切ありません。3ステップで完了します。</p>
    </div>

    <div class="refund-steps animate-on-scroll">

      <div class="refund-step">
        <div class="rs-num">1</div>
        <div class="rs-content">
          <h3>お問い合わせページからメールを送る</h3>
          <p>
            <a href="/contact">お問い合わせページ</a>から
            「返金希望」と記載してメールを送信します。
            件名・本文の形式は自由です。
            購入時のメールアドレスから送信してください。
          </p>
          <div class="rs-note">
            <strong>記載する情報（任意）：</strong>
            注文番号、購入日時、返金希望の理由（不要ですが記載いただけると参考になります）
          </div>
        </div>
      </div>

      <div class="rs-connector" aria-hidden="true"></div>

      <div class="refund-step">
        <div class="rs-num">2</div>
        <div class="rs-content">
          <h3>当社から受理確認メールが届く</h3>
          <p>
            申請受領から<strong>24時間以内</strong>に
            返金受理確認メールをお送りします。
            土日祝日は翌営業日対応となります。
            確認メールが届かない場合は迷惑メールフォルダをご確認ください。
          </p>
        </div>
      </div>

      <div class="rs-connector" aria-hidden="true"></div>

      <div class="refund-step refund-step-final">
        <div class="rs-num rs-num-final">✓</div>
        <div class="rs-content">
          <h3>3〜5営業日以内に返金</h3>
          <p>
            受理後3〜5営業日以内に、ご購入時の決済方法へ返金処理を行います。
            クレジットカードへの返金はカード会社の処理日程により
            明細への反映に追加で数日かかる場合があります。
          </p>
          <div class="rs-note rs-note-important">
            <strong>返金後の注意：</strong>
            返金後はロゴデータのダウンロード・著作権行使ができなくなります。
            ダウンロード済みのロゴデータは削除してください。
          </div>
        </div>
      </div>

    </div>

    <div class="refund-cta-row animate-on-scroll">
      <a href="/contact" class="btn-secondary">返金を申請する →</a>
      <p class="refund-cta-note">
        ※ 返金申請は購入から7日以内のみ受け付けています。
        詳細は<a href="/terms#refund">利用規約 返金ポリシー</a>をご確認ください。
      </p>
    </div>

  </div>
</section>
```

```css
.guarantee-steps-section { padding: var(--section-py) var(--container-px); background: var(--color-bg-section); }

.refund-steps {
  max-width: 680px;
  margin: 0 auto 48px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.refund-step {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 28px 32px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.refund-step-final {
  border-color: var(--color-accent);
  background: rgba(201,150,58,0.03);
}

.rs-connector {
  width: 2px;
  height: 24px;
  background: var(--color-border);
  background-image: repeating-linear-gradient(
    to bottom,
    var(--color-accent) 0, var(--color-accent) 4px,
    transparent 4px, transparent 10px
  );
  margin: 0 auto;
  margin-left: 56px;
}

.rs-num {
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-number);
  font-size: var(--text-lg);
  font-weight: 700;
  flex-shrink: 0;
}

.rs-num-final {
  background: var(--color-accent);
  color: var(--color-text-primary);
}

.rs-content h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 10px;
  font-family: var(--font-heading);
}

.rs-content p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 12px;
}

.rs-content a { color: var(--color-primary); text-decoration: underline; }

.rs-note {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  background: var(--color-bg-section);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  line-height: 1.6;
}

.rs-note-important {
  background: rgba(201,150,58,0.06);
  border-left: 3px solid var(--color-accent);
}

.rs-note strong { color: var(--color-text-primary); }

.refund-cta-row {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.refund-cta-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.refund-cta-note a { color: var(--color-primary); }
```

---

## 5. Section 4：返金FAQ（5問）

| Q | A（要約） |
|---|---|
| ダウンロードした後でも返金できますか？ | はい。ただし返金後はロゴデータの利用・著作権行使ができなくなります。ダウンロード済みデータは削除してください。 |
| 返金の申請期限は購入日から7日ですか、それとも受取日から？ | 購入完了メールを受信した日（購入日）から7日以内です。 |
| 銀行振込で購入した場合も返金できますか？ | はい。ご指定の銀行口座へ振り込みます。申請時に口座情報をお知らせください。 |
| 複数ロゴを購入した場合、一部だけ返金できますか？ | はい。1ロゴずつ個別に返金申請できます。申請時に返金対象のロゴIDをお知らせください。 |
| 返金後に同じプランを再購入できますか？ | はい。返金後も再購入可能です。ただし同一ロゴの再ダウンロードは返金後はできません。 |

```html
<section class="guarantee-faq-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">よくある疑問</span>
      <h2>返金保証についての疑問</h2>
    </div>
    <div class="faq-accordion-list animate-on-scroll" style="max-width: 760px; margin: 0 auto 32px">
      <!-- 上記5問 accordion形式、/faq ページのスタイル流用 -->
    </div>
    <div style="text-align: center">
      <a href="/terms#refund" class="btn-secondary">返金ポリシー全文を読む →</a>
    </div>
  </div>
</section>
```

---

## 6. Section 5：返金が必要ない理由（品質への自信）

```html
<section class="guarantee-confidence-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">品質への自信</span>
      <h2>98%のユーザーが返金申請をしない理由</h2>
    </div>

    <div class="confidence-grid animate-on-scroll">

      <div class="confidence-stat">
        <div class="cs-num">98%</div>
        <div class="cs-label">返金申請なし率</div>
        <div class="cs-desc">
          購入した有料プランユーザーのうち98%が
          7日間の保証期間中に返金申請をしていません。
        </div>
      </div>

      <div class="confidence-stat">
        <div class="cs-num">4.9</div>
        <div class="cs-label">平均満足度スコア</div>
        <div class="cs-desc">
          500件以上のユーザーレビューの平均スコア。
          5段階評価でほぼ満点を維持しています。
        </div>
      </div>

      <div class="confidence-stat">
        <div class="cs-num">無制限</div>
        <div class="cs-label">再生成・カスタマイズ</div>
        <div class="cs-desc">
          有料プランでは気に入るまで何度でも再生成・編集可能。
          納得してからダウンロードできます。
        </div>
      </div>

    </div>

    <!-- ユーザーコメント -->
    <div class="confidence-quote animate-on-scroll">
      <blockquote>
        <p>「返金することも考えましたが、生成したロゴが想像以上のクオリティで驚きました。
           デザイン会社に頼むより断然良いものができました」</p>
        <footer>— スタートアップ代表・東京 / スタンダードプラン</footer>
      </blockquote>
    </div>

  </div>
</section>
```

```css
.guarantee-confidence-section { padding: var(--section-py) var(--container-px); }

.confidence-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: var(--container-max);
  margin: 0 auto 48px;
}

.confidence-stat {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 36px 28px;
  text-align: center;
}

.cs-num {
  font-family: var(--font-number);
  font-size: 3rem;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

.cs-label {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 12px;
}

.cs-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.confidence-quote {
  max-width: 680px;
  margin: 0 auto;
}

.confidence-quote blockquote {
  background: white;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
  padding: 28px 32px;
  margin: 0;
}

.confidence-quote p {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  color: var(--color-text-primary);
  line-height: 1.6;
  margin: 0 0 12px;
}

.confidence-quote footer {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

@media (max-width: 768px) { .confidence-grid { grid-template-columns: 1fr; } }
```

---

## 7. Section 6：CTA

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>リスクゼロで、まず試してみてください。</h2>
        <p>7日間全額返金保証があるので、「気に入らなかったら返金」という<br>
           安心感を持ちながらロゴを作り始められます。</p>
        <div class="final-cta-buttons">
          <a href="/pricing" class="btn-primary btn-primary-lg">料金プランを見る →</a>
          <a href="/create" class="btn-secondary-inverse">まず無料で試す</a>
        </div>
        <div class="final-trust">
          <span>✓ 7日間・理由不問・全額返金</span>
          <span>✓ 返金手数料ゼロ</span>
          <span>✓ 申請はメール1通だけ</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 8. SEO規範

```html
<title>7日間全額返金保証 | 理由不問・手続き簡単【LogoAI.jp】</title>
<meta name="description" content="LogoAI.jpの返金保証は購入から7日以内・理由不問・全額返金。申請はメール1通だけで完了。3〜5営業日以内に返金処理します。安心してAIロゴをお試しください。">
<link rel="canonical" href="https://logoai.jp/guarantee">
```

---

## 9. 结构化数据

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "返金申請の期限はいつですか？",
      "acceptedAnswer": { "@type": "Answer", "text": "購入完了メールを受信した日から7日以内です。土日祝日も期間に含まれます。" }},
    { "@type": "Question", "name": "返金の手続きはどうすればよいですか？",
      "acceptedAnswer": { "@type": "Answer", "text": "お問い合わせページから「返金希望」と記載してメールを送るだけです。24時間以内に受理確認メールが届き、3〜5営業日以内に返金処理します。" }},
    { "@type": "Question", "name": "ダウンロードした後でも返金できますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい。7日以内であればダウンロード後でも返金申請できます。ただし返金後はロゴデータの利用・著作権行使ができなくなります。" }}
  ]
}
```

---

## 10. GEO優化

```html
<p class="geo-definition">
  LogoAI.jpの返金保証：購入から7日以内であれば理由を問わず全額返金します。
  申請方法はお問い合わせページから「返金希望」とメールするだけ。
  受理から3〜5営業日以内にご購入時の決済方法へ返金処理します。
  返金手数料は一切かかりません。ダウンロード後の申請も可能ですが、
  返金後はロゴデータの商業的利用・著作権行使は不可となります。
</p>
```

---

## 11. 組件ファイル構成

```
app/guarantee/page.tsx

components/guarantee/
├── GuaranteeHero.tsx         # 大きなシールド + 3つのバッジ
├── GuaranteePrinciples.tsx   # 3原則（深緑背景）
├── RefundSteps.tsx           # 3ステップ申請手順
├── GuaranteeFAQ.tsx          # 返金専門FAQ 5問
├── GuaranteeConfidence.tsx   # 98%・品質への自信
└── GuaranteeCTA.tsx
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/faq FAQ総合ページ仕様書*
