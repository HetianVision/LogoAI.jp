import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表示 | LogoAI.jp',
  description: 'LogoAI.jpの特定商取引法に基づく表示です。',
}

export default function TokuteiPage() {
  return (
    <main>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-bg-base">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(26,58,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,58,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(26,58,42,0.04), transparent 60%)'
        }} />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <nav className="mb-8" aria-label="パンくずリスト">
            <ol className="flex gap-2 text-sm text-text-muted list-none p-0">
              <li><Link href="/" className="hover:text-primary transition-colors">ホーム</Link></li>
              <li><span className="mx-2 opacity-40">/</span></li>
              <li className="text-text-secondary" aria-current="page">特定商取引法に基づく表示</li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            特定商取引法に基づく表示
          </h1>

          <p className="text-text-secondary mt-4">
            最終更新日：<time dateTime="2025-02-01">2025年2月1日</time>
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-16 md:py-20 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[800px] mx-auto pb-20">

            {/* Note */}
            <p className="text-sm text-text-secondary mb-5">
              特定商取引法に基づき、以下の事項を表示します。
            </p>

            {/* Table */}
            <table className="w-full border-collapse border border-border rounded-2xl overflow-hidden bg-white mb-8">
              <tbody>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    販売業者
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    株式会社○○○○（法人名を記載）
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    代表責任者
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    代表取締役　○○ ○○
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    所在地
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    〒XXX-XXXX<br />
                    東京都○○区○○X-X-X<br />
                    <span className="text-xs text-text-muted mt-1.5 block">
                      ※ 請求があった場合は遅滞なく開示します
                    </span>
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    電話番号
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    お問い合わせは<Link href="/contact" className="text-primary font-semibold">お問い合わせフォーム</Link>をご利用ください。<br />
                    <span className="text-xs text-text-muted mt-1.5 block">
                      ※ 電話番号は請求があった場合に遅滞なく開示します
                    </span>
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    メールアドレス
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    support@logoai.jp
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    サービス名
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    LogoAI.jp（AIロゴ作成サービス）
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    販売価格
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    各プランの価格は<Link href="/pricing" className="text-primary font-semibold">料金ページ</Link>をご確認ください。<br />
                    表示価格は全て税込みです。<br />
                    <span className="flex flex-col gap-1 mt-2">
                      <span className="text-sm font-semibold text-primary">スタンダードプラン：¥4,980（税込み）</span>
                      <span className="text-sm font-semibold text-primary">プレミアムプラン：¥9,800（税込み）</span>
                    </span>
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    代金以外の必要料金
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    なし（インターネット接続料金等はお客様負担となります）
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    支払方法
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    クレジットカード決済（Visa・Mastercard・American Express・JCB）<br />
                    ※ 決済処理はStripe社が行います
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    支払時期
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    お申し込み時に即時決済
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    サービス提供時期
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    決済完了後、即時（ロゴデータのダウンロード・著作権証明書の発行）
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] border-b border-border align-top whitespace-nowrap">
                    返品・キャンセル
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] border-b border-border leading-relaxed">
                    <div className="flex flex-col gap-2.5">
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm font-semibold text-primary">
                        購入日から7日以内であれば、理由を問わず全額返金いたします。
                      </div>
                      <ul className="pl-4.5 flex flex-col gap-1.5 list-disc">
                        <li className="text-text-secondary">返金申請は<Link href="/contact" className="text-primary font-semibold">お問い合わせフォーム</Link>よりメールにてお申し込みください</li>
                        <li className="text-text-secondary">返金処理は3〜5営業日以内に完了します</li>
                        <li className="text-text-secondary">返金後はロゴデータの使用および著作権の行使ができません</li>
                        <li className="text-text-secondary">ダウンロード済みのデータは削除してください</li>
                      </ul>
                      <p className="text-xs text-text-muted">
                        詳細は<Link href="/guarantee" className="text-primary">返金保証ページ</Link>をご確認ください。
                      </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="w-[180px] bg-bg-section text-sm font-bold text-text-secondary px-6 py-[18px] align-top whitespace-nowrap">
                    動作環境
                  </th>
                  <td className="text-sm text-text-primary px-6 py-[18px] leading-relaxed">
                    推奨ブラウザ：Chrome・Firefox・Safari・Edge（各最新版）<br />
                    インターネット接続環境が必要です
                  </td>
                </tr>

              </tbody>
            </table>

            {/* Related Links */}
            <div className="flex flex-wrap gap-6">
              <Link href="/terms" className="text-primary font-semibold hover:underline">
                利用規約 →
              </Link>
              <Link href="/privacy" className="text-primary font-semibold hover:underline">
                プライバシーポリシー →
              </Link>
              <Link href="/guarantee" className="text-primary font-semibold hover:underline">
                返金保証 →
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
