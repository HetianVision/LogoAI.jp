# 利用規約ページ開発規格書 `/terms`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：`homepage-spec.md`（设计系统）
> **页面类型**：法的必須ページ・利用規約
> **重要**：法律文書のため文言は法務確認必須。本規格書はUI構造のみを規定する。

---

## 1. ページ仕様

| 項目 | 内容 |
|---|---|
| 路由 | `/terms` |
| Canonical | `https://logoai.jp/terms` |
| robots | `index, follow` |
| 最終更新日 | ページ内に表示（管理画面から更新可能にする） |

### メタデータ

```html
<title>利用規約 | LogoAI.jp</title>
<meta name="description" content="LogoAI.jpの利用規約です。サービスのご利用前に必ずお読みください。">
```

---

## 2. ページ構造

```html
<div class="legal-page">
  <!-- 共通Navbar -->
  <header class="navbar">...</header>

  <main>
    <!-- ヒーロー -->
    <section class="legal-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="パンくずリスト">
          <ol>
            <li><a href="/">ホーム</a></li>
            <li aria-current="page">利用規約</li>
          </ol>
        </nav>
        <h1>利用規約</h1>
        <p class="legal-hero-meta">
          最終更新日：<time datetime="2025-02-01">2025年2月1日</time>
        </p>
      </div>
    </section>

    <!-- 本文エリア -->
    <div class="legal-layout">
      <div class="container">
        <div class="legal-grid">

          <!-- 左：目次（PC sticky） -->
          <nav class="legal-toc" aria-label="目次">
            <div class="toc-title">目次</div>
            <ol class="toc-list">
              <li><a href="#terms-intro">第1条（適用）</a></li>
              <li><a href="#terms-definitions">第2条（定義）</a></li>
              <li><a href="#terms-registration">第3条（利用登録）</a></li>
              <li><a href="#terms-prohibited">第4条（禁止事項）</a></li>
              <li><a href="#terms-suspension">第5条（利用停止）</a></li>
              <li><a href="#terms-copyright">第6条（著作権・知的財産権）</a></li>
              <li><a href="#terms-disclaimer">第7条（免責事項）</a></li>
              <li><a href="#terms-change">第8条（規約の変更）</a></li>
              <li><a href="#terms-governing">第9条（準拠法・管轄）</a></li>
            </ol>
          </nav>

          <!-- 右：本文 -->
          <article class="legal-body" id="legal-body">

            <div class="legal-preamble">
              本利用規約（以下「本規約」）は、LogoAI.jp（以下「当サービス」）の
              利用条件を定めるものです。ユーザーの皆さまには、本規約に同意いただいた
              上でご利用いただきます。
            </div>

            <section class="legal-section" id="terms-intro">
              <h2>第1条（適用）</h2>
              <p>
                本規約は、本サービスの提供条件及び当社とユーザーの間の権利義務関係を
                定めることを目的とし、ユーザーと当社との間の本サービスの利用に関わる
                一切の関係に適用されます。
              </p>
            </section>

            <section class="legal-section" id="terms-definitions">
              <h2>第2条（定義）</h2>
              <p>本規約において使用する用語の定義は次のとおりです。</p>
              <ol class="legal-ol">
                <li>「本サービス」とは、当社が提供するAIロゴ生成サービス「LogoAI.jp」をいいます。</li>
                <li>「ユーザー」とは、本サービスを利用する全ての方をいいます。</li>
                <li>「有料プラン」とは、本サービスの有料機能を利用するためのプランをいいます。</li>
                <li>「生成ロゴ」とは、本サービスを通じて生成されたロゴデータをいいます。</li>
                <li>「著作権帰属証明書」とは、当社が発行する、生成ロゴの著作権帰属を証明する文書をいいます。</li>
              </ol>
            </section>

            <section class="legal-section" id="terms-registration">
              <h2>第3条（利用登録）</h2>
              <p>
                登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを
                承認することによって、利用登録が完了するものとします。当社は、以下の
                場合に利用登録の申請を承認しないことがあります。
              </p>
              <ol class="legal-ol">
                <li>虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他、当社が利用登録を相当でないと判断した場合</li>
              </ol>
            </section>

            <section class="legal-section" id="terms-prohibited">
              <h2>第4条（禁止事項）</h2>
              <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
              <ol class="legal-ol">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社、本サービスの他のユーザー、またはその他第三者の知的財産権、
                    肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
                <li>無料プランで生成した生成ロゴを商用利用する行為</li>
                <li>本サービスの運営を妨害するおそれのある行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>当社のネットワークまたはシステム等に過度な負荷をかける行為</li>
                <li>逆アセンブル、逆コンパイル等のリバースエンジニアリングを行う行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ol>
            </section>

            <section class="legal-section" id="terms-suspension">
              <h2>第5条（利用停止等）</h2>
              <p>
                当社は、ユーザーが以下のいずれかの事由に該当する場合には、
                事前に通知または催告することなく、当該ユーザーの利用を停止し、
                またはユーザーとしての登録を抹消することができるものとします。
              </p>
              <ol class="legal-ol">
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>登録事項に虚偽の事実があることが判明した場合</li>
                <li>料金等の支払債務の不履行があった場合</li>
                <li>その他、当社が本サービスの利用を適当でないと判断した場合</li>
              </ol>
            </section>

            <section class="legal-section" id="terms-copyright">
              <h2>第6条（著作権・知的財産権）</h2>
              <ol class="legal-ol">
                <li>
                  無料プランで生成した生成ロゴの著作権は、当社に帰属します。
                  無料プランの生成ロゴは、個人的・非商用目的の範囲でのみ使用できます。
                </li>
                <li>
                  有料プランで生成した生成ロゴの著作権は、ユーザーに帰属します。
                  当社は当該生成ロゴに関するいかなる著作権も主張しません。
                </li>
                <li>
                  本サービスのシステム・UIデザイン・ロゴ・その他コンテンツに関する
                  著作権その他の知的財産権は、当社または当社が権利使用の許諾を受けた
                  者に帰属します。
                </li>
                <li>
                  著作権帰属証明書は、有料プランでの購入完了時に発行されます。
                  証明書に記載された権利帰属は、購入時点での法令・文化庁ガイドラインに
                  基づくものです。
                </li>
              </ol>

              <div class="legal-note">
                <strong>📝 著作権に関する詳細は</strong>
                <a href="/copyright">著作権ページ</a>をご参照ください。
              </div>
            </section>

            <section class="legal-section" id="terms-disclaimer">
              <h2>第7条（免責事項）</h2>
              <ol class="legal-ol">
                <li>
                  当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、
                  正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに
                  関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを
                  明示的にも黙示的にも保証しておりません。
                </li>
                <li>
                  生成ロゴが第三者の著作権・商標権等を侵害しないことを当社は
                  保証しません。商標登録申請等を行う場合は、専門家（弁理士等）に
                  ご相談ください。
                </li>
                <li>
                  当社は、本サービスに起因してユーザーに生じたあらゆる損害について、
                  当社の故意又は重大な過失による場合を除き、一切の責任を負いません。
                </li>
              </ol>
            </section>

            <section class="legal-section" id="terms-change">
              <h2>第8条（規約の変更）</h2>
              <p>
                当社は必要と判断した場合には、ユーザーに通知することなく本規約を
                変更することができるものとします。変更後の利用規約は、当社ウェブサイトに
                掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <section class="legal-section" id="terms-governing">
              <h2>第9条（準拠法・管轄裁判所）</h2>
              <p>
                本規約の解釈にあたっては、日本法を準拠法とします。
                本サービスに関して紛争が生じた場合には、当社の本店所在地を
                管轄する裁判所を専属的合意管轄とします。
              </p>
            </section>

            <!-- 関連ページリンク -->
            <div class="legal-related">
              <a href="/privacy" class="legal-related-link">プライバシーポリシー →</a>
              <a href="/tokutei" class="legal-related-link">特定商取引法に基づく表示 →</a>
            </div>

          </article>
        </div>
      </div>
    </div>
  </main>

  <!-- 共通フッター -->
  <footer class="footer">...</footer>
</div>
```

---

## 3. CSS

```css
/* 法的ページ共通 */
.legal-hero {
  padding: calc(64px + 40px) var(--container-px) 32px;
  background: var(--color-bg-section);
  border-bottom: 1px solid var(--color-border);
}

.legal-hero h1 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 8px 0 12px;
}

.legal-hero-meta {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* レイアウト */
.legal-layout { padding: 48px var(--container-px) 80px; }

.legal-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
  max-width: var(--container-max);
  margin: 0 auto;
  align-items: start;
}

/* 目次 */
.legal-toc {
  position: sticky;
  top: 88px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 20px;
}

.toc-title {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  counter-reset: toc-counter;
}

.toc-list li a {
  display: block;
  padding: 7px 10px;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.15s;
  line-height: 1.5;
}

.toc-list li a:hover {
  background: rgba(26,58,42,0.05);
  color: var(--color-primary);
}

.toc-list li a.toc-active {
  background: rgba(26,58,42,0.08);
  color: var(--color-primary);
  font-weight: 600;
}

/* 本文 */
.legal-body { max-width: 720px; }

.legal-preamble {
  background: var(--color-bg-section);
  border-left: 3px solid var(--color-primary);
  padding: 16px 20px;
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: 36px;
}

.legal-section {
  margin-bottom: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: 96px;
}

.legal-section:last-of-type { border-bottom: none; }

.legal-section h2 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 14px;
}

.legal-section p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 12px;
}

.legal-ol {
  padding-left: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legal-ol li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

/* 注記ボックス */
.legal-note {
  margin-top: 16px;
  padding: 14px 16px;
  background: rgba(201,150,58,0.06);
  border: 1px solid rgba(201,150,58,0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.legal-note a {
  color: var(--color-primary);
  font-weight: 600;
}

/* 関連ページ */
.legal-related {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.legal-related-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  padding: 10px 18px;
  border: 1.5px solid var(--color-primary);
  border-radius: var(--radius-full);
  transition: all 0.2s;
}

.legal-related-link:hover {
  background: var(--color-primary);
  color: white;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .legal-grid { grid-template-columns: 1fr; }
  .legal-toc { position: static; }
}
```

---

## 4. JavaScript（目次ハイライト）

```typescript
// 目次のアクティブ状態をスクロール連動で更新
const sections = document.querySelectorAll<HTMLElement>('.legal-section')
const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc-list a')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => {
          link.classList.toggle(
            'toc-active',
            link.getAttribute('href') === `#${entry.target.id}`
          )
        })
      }
    })
  },
  { rootMargin: '-20% 0px -70% 0px' }
)

sections.forEach(section => observer.observe(section))
```

---

## 5. コンポーネント構成

```
app/terms/page.tsx
components/legal/
├── LegalHero.tsx       ← 全法的ページ共通ヒーロー
├── LegalToc.tsx        ← 目次（sticky）
└── LegalBody.tsx       ← 本文コンテナ
```

