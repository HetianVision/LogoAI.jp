# 特定商取引法に基づく表示ページ開発規格書 `/tokutei`

> **文档用途**：交付AI开发者直接实现。
> **依赖文档**：`homepage-spec.md`（设计系统）、`terms-spec.md`（共通コンポーネント）
> **ページ類型**：法的必須ページ・特定商取引法表示
> **重要**：日本のEC事業者に法的義務あり。記載内容は必ず実際の事業者情報に差し替えること。

---

## 1. ページ仕様

| 項目 | 内容 |
|---|---|
| 路由 | `/tokutei` |
| Canonical | `https://logoai.jp/tokutei` |
| robots | `index, follow` |

### メタデータ

```html
<title>特定商取引法に基づく表示 | LogoAI.jp</title>
<meta name="description" content="LogoAI.jpの特定商取引法に基づく表示です。">
```

---

## 2. ページ構造

```html
<div class="legal-page">
  <header class="navbar">...</header>
  <main>

    <section class="legal-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="パンくずリスト">
          <ol>
            <li><a href="/">ホーム</a></li>
            <li aria-current="page">特定商取引法に基づく表示</li>
          </ol>
        </nav>
        <h1>特定商取引法に基づく表示</h1>
        <p class="legal-hero-meta">
          最終更新日：<time datetime="2025-02-01">2025年2月1日</time>
        </p>
      </div>
    </section>

    <div class="legal-layout">
      <div class="container">
        <div class="tokutei-wrap">

          <!-- 法定記載事項テーブル -->
          <div class="tokutei-note">
            特定商取引法に基づき、以下の事項を表示します。
          </div>

          <table class="tokutei-table">
            <tbody>

              <tr>
                <th scope="row">販売業者</th>
                <td>株式会社○○○○（法人名を記載）</td>
              </tr>

              <tr>
                <th scope="row">代表責任者</th>
                <td>代表取締役　○○ ○○</td>
              </tr>

              <tr>
                <th scope="row">所在地</th>
                <td>
                  〒XXX-XXXX<br>
                  東京都○○区○○X-X-X<br>
                  <span class="tt-note">
                    ※ 請求があった場合は遅滞なく開示します
                  </span>
                </td>
              </tr>

              <tr>
                <th scope="row">電話番号</th>
                <td>
                  お問い合わせは<a href="/contact">お問い合わせフォーム</a>をご利用ください。<br>
                  <span class="tt-note">
                    ※ 電話番号は請求があった場合に遅滞なく開示します
                  </span>
                </td>
              </tr>

              <tr>
                <th scope="row">メールアドレス</th>
                <td>support@logoai.jp</td>
              </tr>

              <tr>
                <th scope="row">サービス名</th>
                <td>LogoAI.jp（AIロゴ作成サービス）</td>
              </tr>

              <tr>
                <th scope="row">販売価格</th>
                <td>
                  各プランの価格は<a href="/pricing">料金ページ</a>をご確認ください。<br>
                  表示価格は全て税込みです。<br>
                  <span class="tt-plan-list">
                    <span class="tt-plan">スタンダードプラン：¥4,980（税込）</span>
                    <span class="tt-plan">プレミアムプラン：¥9,800（税込）</span>
                  </span>
                </td>
              </tr>

              <tr>
                <th scope="row">代金以外の必要料金</th>
                <td>なし（インターネット接続料金等はお客様負担となります）</td>
              </tr>

              <tr>
                <th scope="row">支払方法</th>
                <td>
                  クレジットカード決済（Visa・Mastercard・American Express・JCB）<br>
                  ※ 決済処理はStripe社が行います
                </td>
              </tr>

              <tr>
                <th scope="row">支払時期</th>
                <td>お申し込み時に即時決済</td>
              </tr>

              <tr>
                <th scope="row">サービス提供時期</th>
                <td>決済完了後、即時（ロゴデータのダウンロード・著作権証明書の発行）</td>
              </tr>

              <tr>
                <th scope="row">返品・キャンセル</th>
                <td>
                  <div class="tt-refund">
                    <div class="tt-refund-highlight">
                      購入日から7日以内であれば、理由を問わず全額返金いたします。
                    </div>
                    <ul class="tt-refund-conditions">
                      <li>返金申請は<a href="/contact">お問い合わせフォーム</a>よりメールにてお申し込みください</li>
                      <li>返金処理は3〜5営業日以内に完了します</li>
                      <li>返金後はロゴデータの使用および著作権の行使ができません</li>
                      <li>ダウンロード済みのデータは削除してください</li>
                    </ul>
                    <p class="tt-refund-note">
                      詳細は<a href="/guarantee">返金保証ページ</a>をご確認ください。
                    </p>
                  </div>
                </td>
              </tr>

              <tr>
                <th scope="row">動作環境</th>
                <td>
                  推奨ブラウザ：Chrome・Firefox・Safari・Edge（各最新版）<br>
                  インターネット接続環境が必要です
                </td>
              </tr>

            </tbody>
          </table>

          <div class="legal-related">
            <a href="/terms" class="legal-related-link">利用規約 →</a>
            <a href="/privacy" class="legal-related-link">プライバシーポリシー →</a>
            <a href="/guarantee" class="legal-related-link">返金保証 →</a>
          </div>

        </div>
      </div>
    </div>
  </main>
  <footer class="footer">...</footer>
</div>
```

---

## 3. CSS（特定商取引法テーブル専用）

```css
.tokutei-wrap {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 0 80px;
}

.tokutei-note {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}

/* テーブル */
.tokutei-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: white;
  margin-bottom: 32px;
}

.tokutei-table th,
.tokutei-table td {
  padding: 18px 24px;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
  line-height: var(--leading-relaxed);
}

.tokutei-table tr:last-child th,
.tokutei-table tr:last-child td {
  border-bottom: none;
}

.tokutei-table th {
  width: 180px;
  background: var(--color-bg-section);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.tokutei-table td {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
}

.tokutei-table td a {
  color: var(--color-primary);
  font-weight: 600;
}

.tt-note {
  display: block;
  margin-top: 6px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.tt-plan-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}

.tt-plan {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
}

/* 返品セクション */
.tt-refund { display: flex; flex-direction: column; gap: 10px; }

.tt-refund-highlight {
  padding: 12px 16px;
  background: rgba(45,122,79,0.06);
  border: 1px solid rgba(45,122,79,0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-success);
}

.tt-refund-conditions {
  padding-left: 18px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tt-refund-conditions li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.tt-refund-note {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0;
}

/* レスポンシブ */
@media (max-width: 640px) {
  .tokutei-table { display: block; overflow-x: auto; }
  .tokutei-table th { width: 120px; }
  .tokutei-table th,
  .tokutei-table td { padding: 14px 16px; }
}
```

---

## 4. コンポーネント構成

```
app/tokutei/page.tsx
← components/legal/ の LegalHero を流用
← TokuteiTable.tsx（専用コンポーネント）
```

