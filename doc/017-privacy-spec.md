# プライバシーポリシーページ開発規格書 `/privacy`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：`homepage-spec.md`（设计系统）、`terms-spec.md`（LegalHero/LegalToc/LegalBody 共通コンポーネント）
> **ページ類型**：法的必須ページ・プライバシーポリシー

---

## 1. ページ仕様

| 項目 | 内容 |
|---|---|
| 路由 | `/privacy` |
| Canonical | `https://logoai.jp/privacy` |
| robots | `index, follow` |

### メタデータ

```html
<title>プライバシーポリシー | LogoAI.jp</title>
<meta name="description" content="LogoAI.jpのプライバシーポリシーです。個人情報の取り扱いについて説明しています。">
```

---

## 2. ページ構造

```html
<div class="legal-page">
  <header class="navbar">...</header>
  <main>

    <!-- LegalHero コンポーネント流用 -->
    <section class="legal-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="パンくずリスト">
          <ol>
            <li><a href="/">ホーム</a></li>
            <li aria-current="page">プライバシーポリシー</li>
          </ol>
        </nav>
        <h1>プライバシーポリシー</h1>
        <p class="legal-hero-meta">
          最終更新日：<time datetime="2025-02-01">2025年2月1日</time>
        </p>
      </div>
    </section>

    <div class="legal-layout">
      <div class="container">
        <div class="legal-grid">

          <!-- 目次 -->
          <nav class="legal-toc" aria-label="目次">
            <div class="toc-title">目次</div>
            <ol class="toc-list">
              <li><a href="#pp-collection">第1条（個人情報の収集）</a></li>
              <li><a href="#pp-purpose">第2条（利用目的）</a></li>
              <li><a href="#pp-third-party">第3条（第三者提供）</a></li>
              <li><a href="#pp-outsourcing">第4条（委託）</a></li>
              <li><a href="#pp-cookies">第5条（Cookieの使用）</a></li>
              <li><a href="#pp-analytics">第6条（アクセス解析）</a></li>
              <li><a href="#pp-security">第7条（安全管理）</a></li>
              <li><a href="#pp-disclosure">第8条（開示・訂正・削除）</a></li>
              <li><a href="#pp-change">第9条（ポリシーの変更）</a></li>
              <li><a href="#pp-contact">第10条（お問い合わせ）</a></li>
            </ol>
          </nav>

          <!-- 本文 -->
          <article class="legal-body">

            <div class="legal-preamble">
              LogoAI.jp（以下「当サービス」）は、ユーザーの個人情報の保護を
              重要な責務と考えています。本プライバシーポリシーは、当サービスにおける
              個人情報の取り扱いについて説明します。
            </div>

            <section class="legal-section" id="pp-collection">
              <h2>第1条（収集する個人情報）</h2>
              <p>当サービスは、以下の個人情報を収集することがあります。</p>
              <ol class="legal-ol">
                <li>氏名・会社名</li>
                <li>メールアドレス</li>
                <li>決済情報（クレジットカード情報はStripe社が管理し、当社は保持しません）</li>
                <li>IPアドレス・ブラウザ情報・利用端末情報</li>
                <li>サービス利用履歴（生成したロゴデータ、設定情報等）</li>
              </ol>
            </section>

            <section class="legal-section" id="pp-purpose">
              <h2>第2条（利用目的）</h2>
              <p>収集した個人情報は、以下の目的のために利用します。</p>
              <ol class="legal-ol">
                <li>本サービスの提供・運営</li>
                <li>購入・決済処理および著作権帰属証明書の発行</li>
                <li>ユーザーへのお問い合わせ対応</li>
                <li>サービス改善のための統計データ分析</li>
                <li>利用規約違反への対応</li>
                <li>サービスに関する重要なお知らせの送付</li>
              </ol>
            </section>

            <section class="legal-section" id="pp-third-party">
              <h2>第3条（第三者への提供）</h2>
              <p>
                当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。
              </p>
              <ol class="legal-ol">
                <li>ユーザーの同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命・身体・財産の保護のために必要な場合</li>
                <li>公衆衛生の向上・児童の健全育成のために必要な場合</li>
              </ol>
            </section>

            <section class="legal-section" id="pp-outsourcing">
              <h2>第4条（業務委託）</h2>
              <p>
                当社は、利用目的の達成に必要な範囲内において、個人情報の取り扱いを
                外部の事業者に委託することがあります。委託先には適切な監督を行います。
              </p>
              <div class="legal-note">
                <strong>主な委託先・利用サービス：</strong>
                Stripe, Inc.（決済処理）、
                Vercel Inc.（ホスティング）、
                Google LLC（アクセス解析）
              </div>
            </section>

            <section class="legal-section" id="pp-cookies">
              <h2>第5条（Cookieの使用）</h2>
              <p>
                当サービスは、サービス品質向上のためCookieを使用しています。
                ブラウザの設定でCookieを無効にすることもできますが、
                一部機能がご利用いただけなくなる場合があります。
              </p>
              <p>使用するCookieの種類：</p>
              <ol class="legal-ol">
                <li>必須Cookie：ログイン状態の維持、セッション管理</li>
                <li>機能Cookie：ユーザー設定の保存</li>
                <li>分析Cookie：アクセス状況の分析（Google Analytics）</li>
              </ol>
            </section>

            <section class="legal-section" id="pp-analytics">
              <h2>第6条（アクセス解析ツール）</h2>
              <p>
                当サービスは、Googleが提供するアクセス解析ツール
                「Google Analytics」を利用しています。Google Analyticsはトラフィックデータの
                収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、
                個人を特定するものではありません。
              </p>
              <p>
                Google Analyticsの利用規約については、
                <a href="https://policies.google.com/terms" target="_blank"
                   rel="noopener noreferrer">Googleの利用規約</a>をご確認ください。
              </p>
            </section>

            <section class="legal-section" id="pp-security">
              <h2>第7条（個人情報の安全管理）</h2>
              <p>
                当社は、個人情報の紛失、破壊、改ざん及び漏洩などのリスクに対して、
                適切なセキュリティ対策を実施し、個人情報の安全管理に努めます。
                決済情報はStripe社のセキュリティ基準（PCI DSS）に準拠した形で管理され、
                当社のサーバーには保存されません。
              </p>
            </section>

            <section class="legal-section" id="pp-disclosure">
              <h2>第8条（個人情報の開示・訂正・削除）</h2>
              <p>
                ユーザーは当社に対して、個人情報の開示、訂正、削除を請求することができます。
                請求はお問い合わせフォームより受け付けます。ご本人確認の上、
                法令に従い対応いたします。
              </p>
            </section>

            <section class="legal-section" id="pp-change">
              <h2>第9条（プライバシーポリシーの変更）</h2>
              <p>
                本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、
                ユーザーへの通知なく変更することができるものとします。
                変更後のプライバシーポリシーは、当サービスに掲載した時点より効力を生じます。
              </p>
            </section>

            <section class="legal-section" id="pp-contact">
              <h2>第10条（お問い合わせ窓口）</h2>
              <p>
                個人情報の取り扱いに関するお問い合わせは、
                <a href="/contact">お問い合わせフォーム</a>よりご連絡ください。
              </p>
            </section>

            <div class="legal-related">
              <a href="/terms" class="legal-related-link">利用規約 →</a>
              <a href="/tokutei" class="legal-related-link">特定商取引法に基づく表示 →</a>
            </div>

          </article>
        </div>
      </div>
    </div>
  </main>
  <footer class="footer">...</footer>
</div>
```

---

## 3. CSS・JS・コンポーネント

`terms-spec.md` の CSS・JavaScript・コンポーネントを全て共通使用。
追加CSSなし。

---

## 4. コンポーネント構成

```
app/privacy/page.tsx
← components/legal/ の LegalHero / LegalToc / LegalBody を流用
```

