# 著作権説明ページ開発規格書 `/copyright`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：继承 `homepage-spec.md` 全部设计系统。
> **页面类型**：信頼・法的説明ページ（Trust & Legal Explanation Page）
> **战略定位**：日本のユーザーが最も不安に感じる「AIロゴの著作権は本当に自分のものになるのか」
>               という疑問に、法的根拠・文化庁ガイドライン・具体的ケースを示して完全に解消する。
>               このページへの内部リンクは全ページに設置し、SEO的にもトラストシグナルとして機能させる。

---

## 1. 页面整体规范

| 項目 | 内容 |
|---|---|
| 路由 | `/copyright` |
| 主要目標 | AIロゴの著作権に関する不安を完全解消し、購入への信頼を確立する |
| 法的参照 | 文化庁「AIと著作権に関する考え方について」（2024年3月） |
| 次要目標 | 「aiロゴ 著作権」「ロゴ 著作権 商用利用」等の検索クエリで上位表示 |

### 1.1 页面布局顺序

```
Navbar
Section 1: Page Hero（結論を先に：有料プランは著作権100%帰属）
Section 2: 日本の著作権法とAIの関係（法的背景）
Section 3: LogoAI.jpの著作権帰属の仕組み（有料 vs 無料）
Section 4: 著作権帰属証明書とは
Section 5: ケーススタディ（使用OK・NG例）
Section 6: よくある疑問（著作権専門 FAQ 5問）
Section 7: CTA（有料プランで著作権を確保する）
Footer
```

---

## 2. Section 1：Page Hero

```html
<section class="copyright-hero">
  <div class="copyright-hero-bg" aria-hidden="true">
    <div class="bg-grid"></div>
  </div>
  <div class="container">
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <ol>
        <li><a href="/">ホーム</a></li>
        <li aria-current="page">著作権について</li>
      </ol>
    </nav>
    <div class="copyright-hero-content">
      <span class="section-eyebrow">著作権について</span>
      <h1>有料プランで生成したロゴの<br>著作権は、100%あなたのものです。</h1>
      <p class="copyright-hero-desc">
        AIが生成したロゴの著作権は誰のものか——これは多くの方が疑問に思う点です。
        LogoAI.jpでは、日本の著作権法と文化庁ガイドラインに基づいて、
        有料プランのユーザーへ著作権が完全帰属する仕組みを構築しています。
      </p>

      <!-- 結論サマリーボックス -->
      <div class="copyright-summary-box">
        <div class="csb-row csb-row-ok">
          <div class="csb-plan">有料プラン</div>
          <div class="csb-rights">
            <span class="csb-check">✓</span> 著作権：ユーザーへ100%帰属
            <span class="csb-check">✓</span> 商用利用：全用途OK
            <span class="csb-check">✓</span> 商標登録申請：可能
            <span class="csb-check">✓</span> 第三者譲渡・ライセンス：可能
            <span class="csb-check">✓</span> 証明書PDF：自動発行
          </div>
        </div>
        <div class="csb-divider" aria-hidden="true"></div>
        <div class="csb-row csb-row-ng">
          <div class="csb-plan">無料プラン</div>
          <div class="csb-rights">
            <span class="csb-cross">✗</span> 著作権：当社に帰属
            <span class="csb-cross">✗</span> 商用利用：不可
            <span class="csb-cross">✗</span> 商標登録申請：不可
            <span class="csb-note">※ SNSプロフィール・個人使用のみ可</span>
          </div>
        </div>
      </div>

      <a href="/pricing" class="btn-primary" style="margin-top: 32px; display: inline-block;">
        有料プランで著作権を確保する →
      </a>
    </div>
  </div>
</section>
```

```css
.copyright-hero {
  padding: calc(64px + 60px) var(--container-px) 64px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-base);
}

.copyright-hero-content {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.copyright-hero-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 16px 0 20px;
}

.copyright-hero-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 36px;
}

/* 結論サマリーボックス */
.copyright-summary-box {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  text-align: left;
}

.csb-row {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.csb-row-ok { background: rgba(45,122,79,0.04); }
.csb-row-ng { background: rgba(196,30,58,0.03); }

.csb-divider {
  width: 1px;
  background: var(--color-border);
  margin: 16px 0;
}

.csb-plan {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 4px;
}

.csb-rights {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.csb-check {
  color: var(--color-success);
  font-weight: 700;
  margin-right: 6px;
}

.csb-cross {
  color: #C41E3A;
  font-weight: 700;
  margin-right: 6px;
}

.csb-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding-left: 18px;
}

@media (max-width: 768px) {
  .copyright-hero-content h1 { font-size: var(--text-3xl); }
  .copyright-summary-box { grid-template-columns: 1fr; }
  .csb-divider { width: 100%; height: 1px; margin: 0; }
}
```

---

## 3. Section 2：日本の著作権法とAIの関係

```html
<section class="copyright-law-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="copyright-law-inner">

      <div class="section-header animate-on-scroll">
        <span class="section-eyebrow">法的背景</span>
        <h2>日本の著作権法とAI生成コンテンツ</h2>
      </div>

      <div class="law-content-grid animate-on-scroll">

        <!-- 左：法的説明テキスト -->
        <div class="law-text">
          <h3>文化庁の見解（2024年3月）</h3>
          <p>
            2024年3月、文化庁は「AIと著作権に関する考え方について」を公表しました。
            このガイドラインでは、AI生成コンテンツの著作権について以下の原則が示されています：
          </p>
          <div class="law-points">
            <div class="law-point">
              <div class="lp-num">①</div>
              <div class="lp-text">
                <strong>AIが完全自律で生成したものには著作権が発生しない場合がある</strong>
                <p>人間の創作的寄与がない場合、著作物として認められない可能性があります。</p>
              </div>
            </div>
            <div class="law-point">
              <div class="lp-num">②</div>
              <div class="lp-text">
                <strong>人間の創作的寄与が認められる場合は著作権が発生する</strong>
                <p>ユーザーが具体的な指示・選択・編集を行った場合、その創作的寄与に対して著作権が認められます。</p>
              </div>
            </div>
            <div class="law-point">
              <div class="lp-num">③</div>
              <div class="lp-text">
                <strong>著作権者はその創作的寄与を行った人間となる</strong>
                <p>AIツールを提供した会社ではなく、実際に創作的判断を行ったユーザーが著作権者となります。</p>
              </div>
            </div>
          </div>
          <div class="law-authority-link">
            <a href="https://www.bunka.go.jp/seisaku/chosakuken/pdf/93903601_01.pdf"
               target="_blank" rel="noopener noreferrer"
               class="authority-link">
              <span class="al-icon">📄</span>
              <span>文化庁「AIと著作権に関する考え方について」（PDF）を読む</span>
              <span class="al-external">↗</span>
            </a>
          </div>
        </div>

        <!-- 右：LogoAI.jpの対応 -->
        <div class="law-our-approach">
          <h3>LogoAI.jpの対応</h3>
          <p class="approach-lead">
            私たちは文化庁ガイドラインに基づき、
            有料プランユーザーの「創作的寄与」を
            システムで記録・証明する仕組みを構築しています。
          </p>
          <div class="approach-items">
            <div class="approach-item">
              <div class="ai-icon">✏️</div>
              <div class="ai-text">
                <strong>入力内容の記録</strong>
                ブランド名・業種・イメージキーワード・カラー指定など
                ユーザーが入力した内容を全て記録します
              </div>
            </div>
            <div class="approach-item">
              <div class="ai-icon">🎨</div>
              <div class="ai-text">
                <strong>選択・編集操作の記録</strong>
                3案から1案を選択した事実、フォント・色・字間の編集履歴を
                タイムスタンプ付きで記録します
              </div>
            </div>
            <div class="approach-item">
              <div class="ai-icon">📋</div>
              <div class="ai-text">
                <strong>証明書に反映</strong>
                これらの記録を著作権帰属証明書（PDF）に記載し、
                ユーザーの創作的寄与を第三者に証明できる形で発行します
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
```

```css
.copyright-law-section { padding: var(--section-py) var(--container-px); }

.copyright-law-inner { max-width: var(--container-max); margin: 0 auto; }

.law-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

.law-text h3, .law-our-approach h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 16px;
}

.law-text p, .approach-lead {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

/* 法律ポイント */
.law-points {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.law-point {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 20px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.lp-num {
  font-family: var(--font-number);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-accent);
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.lp-text strong {
  display: block;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.lp-text p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* 権威リンク */
.authority-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all 0.2s ease;
}

.authority-link:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.al-icon { font-size: 20px; }
.al-external { margin-left: auto; color: var(--color-text-muted); }

/* アプローチアイテム */
.law-our-approach {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 32px;
}

.approach-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.approach-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.approach-item:last-child { border-bottom: none; padding-bottom: 0; }

.ai-icon {
  width: 40px;
  height: 40px;
  background: rgba(201,150,58,0.08);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.ai-text strong {
  display: block;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.ai-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .law-content-grid { grid-template-columns: 1fr; gap: 40px; }
}
```

---

## 4. Section 3：著作権帰属の仕組み（有料 vs 無料 比較）

```html
<section class="copyright-compare-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">プラン比較</span>
      <h2>無料プランと有料プランの著作権の違い</h2>
    </div>

    <div class="copyright-compare-table animate-on-scroll">
      <div class="cct-header">
        <div class="cct-feature-col">権利の内容</div>
        <div class="cct-plan-col cct-plan-free">無料プラン</div>
        <div class="cct-plan-col cct-plan-paid">有料プラン<br><span class="cct-plan-note">スタンダード / プレミアム</span></div>
      </div>

      <div class="cct-body">
        <div class="cct-row">
          <div class="cct-feature">著作権の帰属先</div>
          <div class="cct-val cct-val-free">当社（LogoAI.jp）</div>
          <div class="cct-val cct-val-paid cct-highlight">ユーザー（100%）</div>
        </div>
        <div class="cct-row">
          <div class="cct-feature">商用利用</div>
          <div class="cct-val cct-val-free cct-ng">✗ 不可</div>
          <div class="cct-val cct-val-paid cct-ok">✓ 全用途OK</div>
        </div>
        <div class="cct-row">
          <div class="cct-feature">商標登録申請への利用</div>
          <div class="cct-val cct-val-free cct-ng">✗ 不可</div>
          <div class="cct-val cct-val-paid cct-ok">✓ 可能</div>
        </div>
        <div class="cct-row">
          <div class="cct-feature">第三者への譲渡・販売</div>
          <div class="cct-val cct-val-free cct-ng">✗ 不可</div>
          <div class="cct-val cct-val-paid cct-ok">✓ 可能</div>
        </div>
        <div class="cct-row">
          <div class="cct-feature">SNSプロフィール使用</div>
          <div class="cct-val cct-val-free cct-ok">✓ 可能</div>
          <div class="cct-val cct-val-paid cct-ok">✓ 可能</div>
        </div>
        <div class="cct-row">
          <div class="cct-feature">名刺・チラシ等印刷物</div>
          <div class="cct-val cct-val-free cct-ng">✗ 不可</div>
          <div class="cct-val cct-val-paid cct-ok">✓ 可能</div>
        </div>
        <div class="cct-row">
          <div class="cct-feature">ECサイト・看板・商品パッケージ</div>
          <div class="cct-val cct-val-free cct-ng">✗ 不可</div>
          <div class="cct-val cct-val-paid cct-ok">✓ 可能</div>
        </div>
        <div class="cct-row">
          <div class="cct-feature">AIデータ学習への使用</div>
          <div class="cct-val cct-val-free">使用する場合あり</div>
          <div class="cct-val cct-val-paid cct-ok">✓ 一切使用しない</div>
        </div>
        <div class="cct-row">
          <div class="cct-feature">著作権帰属証明書（PDF）</div>
          <div class="cct-val cct-val-free cct-ng">✗ 発行なし</div>
          <div class="cct-val cct-val-paid cct-ok">✓ 自動発行</div>
        </div>
      </div>

      <div class="cct-footer">
        <div class="cct-feature-col"></div>
        <div class="cct-plan-col">
          <a href="/create" class="cct-cta cct-cta-free">無料で試す</a>
        </div>
        <div class="cct-plan-col">
          <a href="/pricing" class="cct-cta cct-cta-paid">有料プランを見る →</a>
        </div>
      </div>
    </div>

  </div>
</section>
```

```css
.copyright-compare-section { padding: var(--section-py) var(--container-px); background: var(--color-bg-section); }

.copyright-compare-table {
  max-width: 840px;
  margin: 0 auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  background: white;
  box-shadow: var(--shadow-md);
}

.cct-header, .cct-row, .cct-footer {
  display: grid;
  grid-template-columns: 1fr 180px 220px;
}

.cct-header {
  background: var(--color-bg-section);
  border-bottom: 2px solid var(--color-border);
}

.cct-feature-col, .cct-plan-col {
  padding: 16px 20px;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
  text-align: center;
}

.cct-feature-col { text-align: left; }

.cct-plan-free { color: var(--color-text-muted); }
.cct-plan-paid {
  background: rgba(26,58,42,0.04);
  color: var(--color-primary);
  border-left: 2px solid var(--color-primary);
  border-right: 2px solid var(--color-primary);
  font-size: 0.8rem;
  line-height: 1.4;
}

.cct-plan-note {
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--color-text-muted);
  display: block;
  margin-top: 2px;
}

.cct-row {
  border-bottom: 1px solid var(--color-border);
  align-items: center;
}

.cct-row:last-of-type { border-bottom: none; }

.cct-feature {
  padding: 14px 20px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.cct-val {
  padding: 14px 16px;
  font-size: var(--text-sm);
  text-align: center;
  font-weight: 500;
}

.cct-val-paid {
  background: rgba(26,58,42,0.02);
  border-left: 2px solid var(--color-primary);
  border-right: 2px solid var(--color-primary);
}

.cct-highlight {
  font-weight: 700;
  color: var(--color-primary);
}

.cct-ok { color: var(--color-success); font-weight: 700; }
.cct-ng { color: #C41E3A; }

.cct-footer {
  border-top: 2px solid var(--color-border);
  background: var(--color-bg-section);
}

.cct-footer .cct-plan-col { padding: 20px 16px; }

.cct-cta {
  display: block;
  padding: 12px;
  border-radius: var(--radius-full);
  text-align: center;
  font-size: var(--text-sm);
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  font-family: var(--font-body);
}

.cct-cta-free {
  border: 1.5px solid var(--color-border);
  color: var(--color-text-secondary);
  background: white;
}

.cct-cta-free:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.cct-cta-paid {
  background: var(--color-primary);
  color: white;
}

.cct-cta-paid:hover { background: var(--color-primary-hover); }

@media (max-width: 640px) {
  .cct-header, .cct-row, .cct-footer { grid-template-columns: 1fr 100px 140px; }
  .cct-feature, .cct-feature-col, .cct-val { padding: 12px; font-size: var(--text-xs); }
}
```

---

## 5. Section 4：著作権帰属証明書とは

```html
<section class="cert-explain-section">
  <div class="container">
    <div class="cert-explain-grid animate-on-scroll">

      <!-- 左：証明書モックアップ -->
      <div class="cert-mockup-wrap">
        <div class="cert-mockup" role="img" aria-label="著作権帰属証明書のサンプル">
          <!-- 証明書ヘッダー -->
          <div class="cm-header">
            <div class="cm-logo">LogoAI.jp</div>
            <div class="cm-title">著作権帰属証明書</div>
            <div class="cm-subtitle">Copyright Assignment Certificate</div>
          </div>
          <!-- 証明書本文 -->
          <div class="cm-body">
            <div class="cm-cert-num">証明書番号：CERT-2025-001234</div>
            <div class="cm-field">
              <span class="cm-field-label">権利帰属者</span>
              <span class="cm-field-val">田中 太郎（Taro Tanaka）</span>
            </div>
            <div class="cm-field">
              <span class="cm-field-label">メールアドレス</span>
              <span class="cm-field-val">taro@example.com</span>
            </div>
            <div class="cm-field">
              <span class="cm-field-label">生成日時</span>
              <span class="cm-field-val">2025年1月15日 14:32:07 JST</span>
            </div>
            <div class="cm-field">
              <span class="cm-field-label">ロゴID</span>
              <span class="cm-field-val">LOGO-20250115-001234</span>
            </div>
            <!-- ロゴサムネイル -->
            <div class="cm-logo-thumb" aria-label="対象ロゴのサムネイル">
              <div class="cm-thumb-inner">
                <span style="font-family: serif; font-size: 18px; font-weight: 700; color: #1A3A2A; letter-spacing: 0.1em;">田中製菓</span>
              </div>
            </div>
            <div class="cm-rights-summary">
              <div class="cm-rights-title">付与される権利</div>
              <div class="cm-right-item">✓ 著作権：権利帰属者へ100%帰属</div>
              <div class="cm-right-item">✓ 商用利用（全用途）</div>
              <div class="cm-right-item">✓ 商標登録申請への利用</div>
              <div class="cm-right-item">✓ 第三者への譲渡・ライセンス付与</div>
            </div>
          </div>
          <!-- 証明書フッター -->
          <div class="cm-footer">
            <div class="cm-issuer">発行者：株式会社ロゴエーアイ</div>
            <div class="cm-issued-date">発行日：2025年1月15日</div>
          </div>
        </div>
      </div>

      <!-- 右：証明書の説明 -->
      <div class="cert-explain-text">
        <span class="section-eyebrow">著作権帰属証明書</span>
        <h2>著作権帰属証明書とは何か</h2>
        <p class="cert-lead">
          著作権帰属証明書とは、生成したロゴの著作権が
          ユーザーに帰属することを証明するPDF文書です。
          有料プラン購入完了後に自動発行されます。
        </p>
        <div class="cert-features">
          <div class="cert-feature">
            <div class="cf-num">01</div>
            <div class="cf-content">
              <strong>証明する内容</strong>
              <p>ロゴの識別情報・生成日時・ユーザーの創作的寄与の記録・付与される権利の範囲を記載します。</p>
            </div>
          </div>
          <div class="cert-feature">
            <div class="cf-num">02</div>
            <div class="cf-content">
              <strong>活用シーン</strong>
              <p>商標登録申請の補足書類、取引先への権利証明、法務部門での確認資料として使用できます。</p>
            </div>
          </div>
          <div class="cert-feature">
            <div class="cf-num">03</div>
            <div class="cf-content">
              <strong>再発行・永久保存</strong>
              <p>マイページからいつでも再ダウンロード可能。証明書の有効期限はありません。</p>
            </div>
          </div>
          <div class="cert-feature">
            <div class="cf-num">04</div>
            <div class="cf-content">
              <strong>プレミアムプランの追加証明</strong>
              <p>プレミアムプランでは「生成唯一性証明書」も発行。特定日時・特定ユーザーによる生成を記録します。</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

```css
.cert-explain-section { padding: var(--section-py) var(--container-px); }

.cert-explain-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
}

/* 証明書モックアップ */
.cert-mockup-wrap {
  display: flex;
  justify-content: center;
}

.cert-mockup {
  width: 100%;
  max-width: 360px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  background: white;
}

.cm-header {
  background: var(--color-primary);
  padding: 24px 28px;
  text-align: center;
}

.cm-logo {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 4px;
}

.cm-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
  margin-bottom: 2px;
}

.cm-subtitle {
  font-size: var(--text-xs);
  color: rgba(250,250,247,0.5);
  letter-spacing: 0.06em;
}

.cm-body { padding: 20px 24px; }

.cm-cert-num {
  font-size: var(--text-xs);
  font-family: monospace;
  color: var(--color-text-muted);
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.cm-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 12px;
}

.cm-field-label {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.cm-field-val {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

.cm-logo-thumb {
  background: var(--color-bg-section);
  border-radius: var(--radius-lg);
  padding: 16px;
  margin: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
}

.cm-rights-summary {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px;
}

.cm-rights-title {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.cm-right-item {
  font-size: var(--text-xs);
  color: var(--color-success);
  font-weight: 600;
  padding: 3px 0;
}

.cm-footer {
  padding: 14px 24px;
  background: var(--color-bg-section);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
}

.cm-issuer, .cm-issued-date {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* 証明書説明テキスト */
.cert-lead {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

.cert-features {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cert-feature {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.cf-num {
  font-family: var(--font-number);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-accent);
  min-width: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.cf-content strong {
  display: block;
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.cf-content p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 1024px) {
  .cert-explain-grid { grid-template-columns: 1fr; gap: 48px; }
}
```

---

## 6. Section 5：ケーススタディ（使用OK・NG例）

```html
<section class="copyright-cases-section" style="background: var(--color-bg-section)">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">具体的なケース</span>
      <h2>こんな場合はどうなるか</h2>
    </div>

    <div class="cases-grid animate-on-scroll">

      <!-- OK ケース -->
      <div class="cases-col">
        <div class="cases-col-header cases-ok-header">
          <span class="cases-col-icon">✓</span>
          <span class="cases-col-title">有料プランで可能なこと</span>
        </div>
        <div class="case-list">
          <div class="case-item case-ok">
            <div class="case-situation">美容サロンを開業し、作成したロゴを看板・名刺・インスタグラムで使用する</div>
            <div class="case-verdict">✓ 問題なし（商用利用OK・著作権はオーナーに帰属）</div>
          </div>
          <div class="case-item case-ok">
            <div class="case-situation">Webデザイナーがクライアントのためにロゴを作成し、著作権をクライアントへ譲渡する</div>
            <div class="case-verdict">✓ 問題なし（第三者への著作権譲渡OK）</div>
          </div>
          <div class="case-item case-ok">
            <div class="case-situation">生成したロゴで商標登録を特許庁に申請する</div>
            <div class="case-verdict">✓ 可能（著作権帰属証明書を補足書類として添付できる）</div>
          </div>
          <div class="case-item case-ok">
            <div class="case-situation">ECサイトで販売する商品のパッケージにロゴを印刷する</div>
            <div class="case-verdict">✓ 問題なし（商業的目的の印刷物への使用OK）</div>
          </div>
          <div class="case-item case-ok">
            <div class="case-situation">作成したロゴをフランチャイズ店舗にライセンスする</div>
            <div class="case-verdict">✓ 可能（ライセンス付与は著作権者の権利）</div>
          </div>
        </div>
      </div>

      <!-- NG ケース -->
      <div class="cases-col">
        <div class="cases-col-header cases-ng-header">
          <span class="cases-col-icon">✗</span>
          <span class="cases-col-title">無料プランでできないこと</span>
        </div>
        <div class="case-list">
          <div class="case-item case-ng">
            <div class="case-situation">無料プランで作ったロゴを名刺に印刷して使用する</div>
            <div class="case-verdict">✗ 不可（著作権が当社に帰属するため商用利用不可）</div>
          </div>
          <div class="case-item case-ng">
            <div class="case-situation">無料プランのロゴをSNSのビジネスアカウントに使用する</div>
            <div class="case-verdict">✗ 不可（ビジネス目的での使用は商用利用に該当）</div>
          </div>
          <div class="case-item case-ng">
            <div class="case-situation">無料プランのロゴで商標登録を申請する</div>
            <div class="case-verdict">✗ 不可（著作権が当社にあるため申請権利なし）</div>
          </div>
          <div class="case-item case-ng">
            <div class="case-situation">無料プランで作ったロゴを他人に売る</div>
            <div class="case-verdict">✗ 不可（著作権者でないため譲渡・販売は著作権侵害）</div>
          </div>
          <div class="case-item case-ng">
            <div class="case-situation">無料プランのロゴを店舗の看板に使用する</div>
            <div class="case-verdict">✗ 不可（物理的な商用利用は著作権侵害に相当）</div>
          </div>
        </div>
      </div>

    </div>

    <div class="cases-note animate-on-scroll">
      <p>
        上記のNG例は、当サービスの無料プランでの制限に関するものです。
        有料プランでは全て許可されます。
        疑問がある場合は<a href="/faq#cat-copyright">著作権FAQ</a>または
        <a href="/contact">お問い合わせ</a>よりご確認ください。
      </p>
    </div>

  </div>
</section>
```

```css
.copyright-cases-section { padding: var(--section-py) var(--container-px); }

.cases-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: var(--container-max);
  margin: 0 auto 32px;
}

.cases-col {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  background: white;
}

.cases-col-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  font-weight: 700;
  font-size: var(--text-base);
}

.cases-ok-header {
  background: rgba(45,122,79,0.06);
  color: var(--color-success);
  border-bottom: 1px solid rgba(45,122,79,0.15);
}

.cases-ng-header {
  background: rgba(196,30,58,0.05);
  color: #C41E3A;
  border-bottom: 1px solid rgba(196,30,58,0.12);
}

.cases-col-icon { font-size: var(--text-xl); font-weight: 900; }

.case-list {
  display: flex;
  flex-direction: column;
}

.case-item {
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
}

.case-item:last-child { border-bottom: none; }

.case-situation {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  line-height: 1.5;
  margin-bottom: 8px;
  font-weight: 500;
}

.case-verdict {
  font-size: var(--text-xs);
  font-weight: 700;
  line-height: 1.4;
}

.case-ok .case-verdict { color: var(--color-success); }
.case-ng .case-verdict { color: #C41E3A; }

.cases-note {
  max-width: var(--container-max);
  margin: 0 auto;
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.7;
}

.cases-note a { color: var(--color-primary); }

@media (max-width: 768px) { .cases-grid { grid-template-columns: 1fr; } }
```

---

## 7. Section 6：著作権専門 FAQ（5問）

```html
<section class="copyright-faq-section">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <span class="section-eyebrow">よくある疑問</span>
      <h2>著作権についてのよくある疑問</h2>
    </div>

    <div class="copyright-faq-list animate-on-scroll">

      <!-- 各アコーディオンは /faq ページのAccordionスタイルを流用 -->
      <!-- Q&Aは以下5問 -->

    </div>
  </div>
</section>
```

**Q1: 他のAIロゴサービスと比べて、著作権の扱いがどう違うのですか？**
```
A: 多くの海外AIロゴサービスは利用規約上、著作権が曖昧なまま「商用利用可」としています。
   LogoAI.jpでは、日本の著作権法と文化庁ガイドラインに基づき
   「ユーザーの創作的寄与の記録→証明書発行」という仕組みを明示的に構築しています。
   証明書には法的根拠となる記録が含まれており、権利主張の根拠として使用できます。
```

**Q2: 著作権帰属証明書は商標登録申請に使えますか？**
```
A: はい、補足書類として使用できます。
   商標登録申請では一般的にロゴのデータ（JPG・PNG等）の提出が必要で、
   著作権帰属証明書は「このロゴの権利が申請者にある」ことを補強する書類として
   機能します。ただし、商標登録の可否は特許庁の審査によるものであり、
   証明書が登録を保証するものではありません。弁理士へのご相談も推奨します。
```

**Q3: 将来、日本の著作権法が変わった場合、購入済みのロゴはどうなりますか？**
```
A: 購入時点での著作権帰属証明書は、発行時の法的根拠に基づいて作成されており、
   発行後に法律が変わっても証明書の内容は変わりません。
   当社としても、法律改正があった場合はサービスの仕組みを適切に更新し、
   既存ユーザーへの影響を最小化する方針です。
```

**Q4: 複数人で共同でロゴを作成した場合、著作権はどうなりますか？**
```
A: 現在のシステムでは、1つのアカウント・1人のユーザーが著作権者として登録されます。
   複数人での共同著作権が必要な場合は、購入後に法律上の手続き（著作権の共有・譲渡等）を
   別途行う必要があります。詳しくは弁護士・弁理士にご相談ください。
```

**Q5: 生成したロゴが既存の著作物に似ていた場合はどうなりますか？**
```
A: 生成AIの性質上、偶発的に既存のロゴに似たデザインが生成される可能性があります。
   当サービスの著作権帰属証明書は、お客様の権利を証明するものですが、
   第三者の既存著作物・商標権との衝突については別途確認が必要です。
   プレミアムプランの商標類似チェックをご利用いただくか、弁理士にご相談ください。
```

---

## 8. Section 7：CTA

```html
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-card animate-on-scroll">
      <div class="final-cta-decoration" aria-hidden="true"></div>
      <div class="final-cta-content">
        <h2>著作権を確保して、安心してブランドを構築する。</h2>
        <p>有料プランなら著作権がユーザーへ100%帰属し、<br>
           著作権帰属証明書が自動発行されます。7日間全額返金保証付き。</p>
        <div class="final-cta-buttons">
          <a href="/pricing" class="btn-primary btn-primary-lg">料金プランを見る →</a>
          <a href="/create" class="btn-secondary-inverse">まず無料で試す</a>
        </div>
        <div class="final-trust">
          <span>✓ 著作権完全帰属（有料プラン）</span>
          <span>✓ 証明書PDF自動発行</span>
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
<title>AIロゴの著作権について | 有料プランで著作権100%帰属・証明書発行【LogoAI.jp】</title>
<meta name="description" content="LogoAI.jpのAIロゴ著作権についての完全ガイド。有料プランでは著作権がユーザーへ100%帰属し、著作権帰属証明書を自動発行。文化庁ガイドライン準拠。商用利用・商標登録・第三者譲渡も可能。">
<link rel="canonical" href="https://logoai.jp/copyright">
```

### キーワード布局

| 位置 | キーワード |
|---|---|
| H1 | AIロゴ + 著作権 + 100%帰属 |
| Section H2 | 「著作権法とAI」「著作権帰属の仕組み」「著作権帰属証明書」「ケーススタディ」 |
| 法的参照 | 文化庁・著作権法・知的財産 |
| FAQ | 「商標登録申請」「他のAIサービスとの違い」「法改正」 |

---

## 10. 结构化数据

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://logoai.jp/" },
    { "@type": "ListItem", "position": 2, "name": "著作権について", "item": "https://logoai.jp/copyright" }
  ]
}
```

### FAQPage Schema（5問）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "他のAIロゴサービスと比べて著作権の扱いがどう違うのですか？",
      "acceptedAnswer": { "@type": "Answer", "text": "LogoAI.jpでは日本の著作権法と文化庁ガイドラインに基づき、ユーザーの創作的寄与を記録・証明書発行する仕組みを構築しています。証明書には法的根拠となる記録が含まれており、権利主張の根拠として使用できます。" }
    },
    {
      "@type": "Question",
      "name": "著作権帰属証明書は商標登録申請に使えますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、補足書類として使用できます。著作権帰属証明書はロゴの権利が申請者にあることを補強する書類として機能します。ただし商標登録の可否は特許庁の審査によるものであり、証明書が登録を保証するものではありません。" }
    },
    {
      "@type": "Question",
      "name": "有料プランで生成したロゴは商用利用できますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "はい、名刺・ウェブサイト・看板・商品パッケージ・広告など全ての商用利用が可能です。著作権はユーザーへ100%帰属し、当社への使用料・ロイヤリティの支払いも不要です。" }
    },
    {
      "@type": "Question",
      "name": "無料プランと有料プランの著作権の違いは何ですか？",
      "acceptedAnswer": { "@type": "Answer", "text": "無料プランでは著作権が当社に帰属し、商用利用・商標登録・第三者譲渡は不可です。有料プランではユーザーへ著作権が100%帰属し、商用利用・商標登録・第三者譲渡・ライセンス付与が全て可能になります。" }
    },
    {
      "@type": "Question",
      "name": "生成したロゴが既存の著作物に似ていた場合はどうなりますか？",
      "acceptedAnswer": { "@type": "Answer", "text": "生成AIの性質上、偶発的に既存ロゴに似たデザインが生成される可能性があります。プレミアムプランの商標類似チェックをご利用いただくか、弁理士にご相談ください。" }
    }
  ]
}
```

---

## 11. GEO優化

```html
<p class="geo-definition" style="max-width:var(--container-max); margin:0 auto; padding:0 var(--container-px) 24px">
  LogoAI.jpにおけるAIロゴの著作権について：有料プランで生成したロゴは著作権がユーザーへ100%帰属します。
  これは日本の著作権法およびで2024年3月公表の文化庁「AIと著作権に関する考え方について」に基づき、
  ユーザーの創作的寄与（ブランド名入力・スタイル選択・フォント・カラー編集）を記録・証明する仕組みにより実現しています。
  有料プランでは著作権帰属証明書PDFが自動発行され、商用利用・商標登録申請・第三者への譲渡・ライセンス付与が全て可能です。
  無料プランの著作権は当社帰属となり商用利用不可です。
</p>
```

---

## 12. 組件ファイル構成

```
app/copyright/page.tsx

components/copyright/
├── CopyrightHero.tsx          # Hero + 結論サマリーボックス
├── CopyrightLaw.tsx           # 法的背景 + 文化庁リンク
├── CopyrightCompareTable.tsx  # 有料 vs 無料 比較テーブル
├── CertificateExplain.tsx     # 証明書モックアップ + 説明
├── CopyrightCases.tsx         # OK・NGケーススタディ
├── CopyrightFAQ.tsx           # 著作権専門FAQ 5問
└── CopyrightCTA.tsx
```

---

*文档版本：v1.0 | 最終更新：2025年2月 | 次ページ：/trademark 商標検索説明ページ仕様書*
