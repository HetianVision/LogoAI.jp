'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [isRefund, setIsRefund] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('⚠️ 入力内容をご確認ください')

  useEffect(() => {
    // お問い合わせ種別の変更監視
    const typeSelect = document.getElementById('contact-type') as HTMLSelectElement
    const orderField = document.getElementById('order-id-field')
    const refundNotice = document.getElementById('refund-notice')

    if (typeSelect && orderField && refundNotice) {
      typeSelect.addEventListener('change', () => {
        const isRefundSelected = typeSelect.value === 'refund'
        setIsRefund(isRefundSelected)
        orderField.hidden = !isRefundSelected
        refundNotice.hidden = !isRefundSelected
      })
    }

    // テキストエリア文字カウント
    const textarea = document.getElementById('contact-message') as HTMLTextAreaElement
    const countEl = document.getElementById('message-count')

    if (textarea && countEl) {
      textarea.addEventListener('input', () => {
        const len = textarea.value.length
        setCharCount(len)
        countEl.textContent = `${len} / 2000`
        if (len >= 1800) {
          (countEl as HTMLElement).style.color = '#C41E3A'
        } else {
          (countEl as HTMLElement).style.color = ''
        }
      })
    }

    // フォーム送信
    const form = document.getElementById('contact-form') as HTMLFormElement
    const errorEl = document.getElementById('contact-error')
    const submitBtn = document.getElementById('btn-contact-submit')
    const successEl = document.getElementById('contact-success')

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault()

        // バリデーション
        if (!form.checkValidity()) {
          setShowError(true)
          form.querySelector<HTMLElement>(':invalid')?.focus()
          return
        }
        setShowError(false)

        // 送信中状態
        setIsSubmitting(true)
        if (submitBtn) {
          submitBtn.textContent = '送信中...'
          submitBtn.setAttribute('disabled', 'true')
        }

        try {
          const data = new FormData(form)
          const res = await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(data)),
            headers: { 'Content-Type': 'application/json' },
          })

          if (!res.ok) throw new Error('送信失敗')

          // 成功表示
          const email = (document.getElementById('contact-email') as HTMLInputElement).value
          const successEmailEl = document.getElementById('success-email')
          if (successEmailEl) successEmailEl.textContent = email
          form.hidden = true
          setIsSuccess(true)
          if (successEl) successEl.hidden = false
          if (successEl) successEl.focus()

        } catch {
          setShowError(true)
          setErrorMessage('⚠️ 送信に失敗しました。しばらく経ってから再度お試しください。')
          if (submitBtn) {
            submitBtn.removeAttribute('disabled')
            submitBtn.textContent = '送信する →'
          }
        } finally {
          setIsSubmitting(false)
        }
      })
    }
  }, [])

  return (
    <main>

      {/* ヒーロー */}
      <section className="pt-28 pb-9 px-6 bg-bg-base border-b border-border">
        <div className="max-w-[1200px] mx-auto">
          <nav className="mb-8" aria-label="パンくずリスト">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link href="/" className="text-text-muted hover:text-primary transition-colors">ホーム</Link></li>
              <li className="text-text-muted">/</li>
              <li aria-current="page" className="text-text-primary font-medium">お問い合わせ</li>
            </ol>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mt-2 mb-3">お問い合わせ</h1>
          <p className="text-text-secondary text-base leading-relaxed">
            ご質問・ご要望・返金申請など、お気軽にお問い合わせください。<br />
            通常、<strong>1〜2営業日以内</strong>にメールにてご回答します。
          </p>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="py-12 px-6 bg-bg-base">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-[320px_1fr] gap-12 max-lg:grid-cols-1">

            {/* 左：よくある問い合わせへのショートカット */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-heading text-xl font-bold text-text-primary mb-2">よくあるお問い合わせ</h2>
              <p className="text-sm text-text-secondary mb-5">
                以下の場合は、対応ページで解決できることがあります。
              </p>
              <div className="flex flex-col gap-2 mb-7">
                <Link href="/faq" className="flex items-center gap-3 p-3.5 bg-white border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all">
                  <span className="text-xl flex-shrink-0" aria-hidden="true">?</span>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-text-primary">よくある質問（FAQ）</span>
                    <span className="text-xs text-text-muted">使い方・著作権・料金など</span>
                  </div>
                  <span className="text-xl text-text-muted" aria-hidden="true">&rsaquo;</span>
                </Link>
                <Link href="/guarantee" className="flex items-center gap-3 p-3.5 bg-white border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all">
                  <span className="text-xl flex-shrink-0" aria-hidden="true">&#x21bb;</span>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-text-primary">返金保証・返金申請について</span>
                    <span className="text-xs text-text-muted">7日間全额返金の手順</span>
                  </div>
                  <span className="text-xl text-text-muted" aria-hidden="true">&rsaquo;</span>
                </Link>
                <Link href="/copyright" className="flex items-center gap-3 p-3.5 bg-white border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all">
                  <span className="text-xl flex-shrink-0" aria-hidden="true">&copy;</span>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-text-primary">著作権・証明書について</span>
                    <span className="text-xs text-text-muted">著作権の帰属・証明書の使い方</span>
                  </div>
                  <span className="text-xl text-text-muted" aria-hidden="true">&rsaquo;</span>
                </Link>
                <Link href="/trademark" className="flex items-center gap-3 p-3.5 bg-white border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all">
                  <span className="text-xl flex-shrink-0" aria-hidden="true">&reg;</span>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-text-primary">商標登録について</span>
                    <span className="text-xs text-text-muted">ロゴの商標登録申請手順</span>
                  </div>
                  <span className="text-xl text-text-muted" aria-hidden="true">&rsaquo;</span>
                </Link>
              </div>

              {/* 対応時間 */}
              <div className="bg-bg-section border border-border rounded-xl p-4">
                <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">サポート対応時間</div>
                <div className="text-sm font-bold text-text-primary mb-1.5">平日 10:00〜18:00（土日祝休）</div>
                <div className="text-xs text-text-muted leading-relaxed">
                  土日祝日にいただいたお問い合わせは、
                  翌営業日以降に対応いたします。
                </div>
              </div>
            </div>

            {/* 右：お問い合わせフォーム */}
            <div className="max-w-[580px]">
              <h2 className="font-heading text-xl font-bold text-text-primary mb-6">お問い合わせフォーム</h2>

              {/* 送信前フォーム */}
              <form className="flex flex-col gap-6" id="contact-form" noValidate>

                {/* お問い合わせ種別 */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-type" className="text-sm font-bold text-text-primary">
                    お問い合わせ種別
                    <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded" aria-label="必須">必須</span>
                  </label>
                  <select
                    id="contact-type"
                    name="contactType"
                    className="w-full px-4 py-3.5 text-base font-body text-text-primary bg-white border-1.5 border-border rounded-lg outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2716%27%20height%3D%2716%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20stroke%3D%27%23999%27%20stroke-width%3D%272%27%3E%3Cpath%20d%3D%27M6%209l6%206%206-6%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_14px_center] pr-10 focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,58,42,0.1)] transition-all"
                    required
                    aria-describedby="contact-type-hint"
                  >
                    <option value="" disabled>選択してください</option>
                    <option value="refund">返金申請</option>
                    <option value="certificate">著作権証明書の再発行</option>
                    <option value="download">ダウンロード・技術的な問題</option>
                    <option value="billing">請求・決済に関するご質問</option>
                    <option value="copyright">著作権・商標に関するご質問</option>
                    <option value="other">その他</option>
                  </select>
                  <span id="contact-type-hint" className="text-xs text-text-muted">
                    返金申請の場合は「返金申請」を選択してください
                  </span>
                </div>

                {/* 注文番号（返金申請時に表示） */}
                <div className="flex flex-col gap-1.5" id="order-id-field" hidden>
                  <label htmlFor="order-id" className="text-sm font-bold text-text-primary">
                    注文番号
                    <span className="ml-2 text-xs bg-bg-section text-text-muted px-2 py-0.5 rounded">任意</span>
                  </label>
                  <input
                    type="text"
                    id="order-id"
                    name="orderId"
                    className="w-full px-4 py-3.5 text-base font-body text-text-primary bg-white border-1.5 border-border rounded-lg outline-none font-mono focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,58,42,0.1)] transition-all"
                    placeholder="例）order_XXXXXXXXXXXXXXXX"
                    autoComplete="off"
                    aria-describedby="order-id-hint"
                  />
                  <span id="order-id-hint" className="text-xs text-text-muted">
                    購入完了メールに記載されています
                  </span>
                </div>

                {/* メールアドレス */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-sm font-bold text-text-primary">
                    メールアドレス
                    <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded" aria-label="必須">必須</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="w-full px-4 py-3.5 text-base font-body text-text-primary bg-white border-1.5 border-border rounded-lg outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,58,42,0.1)] transition-all"
                    placeholder="例）yamamoto@example.com"
                    required
                    autoComplete="email"
                    aria-describedby="contact-email-hint"
                  />
                  <span id="contact-email-hint" className="text-xs text-text-muted">
                    ご回答をお送りするメールアドレスです
                  </span>
                </div>

                {/* お名前 */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-sm font-bold text-text-primary">
                    お名前
                    <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded" aria-label="必須">必須</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className="w-full px-4 py-3.5 text-base font-body text-text-primary bg-white border-1.5 border-border rounded-lg outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,58,42,0.1)] transition-all"
                    placeholder="例）山本 太郎"
                    required
                    autoComplete="name"
                    maxLength={50}
                  />
                </div>

                {/* お問い合わせ内容 */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-bold text-text-primary">
                    お問い合わせ内容
                    <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded" aria-label="必須">必須</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="w-full px-4 py-3.5 text-base font-body text-text-primary bg-white border-1.5 border-border rounded-lg outline-none resize-y min-h-[140px] leading-relaxed focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,58,42,0.1)] transition-all box-border"
                    placeholder="ご質問・ご要望の内容をできるだけ詳しくご記入ください"
                    required
                    rows={6}
                    maxLength={2000}
                    aria-describedby="message-count"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-muted"></span>
                    <span id="message-count" className="text-xs text-text-muted" aria-live="polite">{charCount} / 2000</span>
                  </div>
                </div>

                {/* 返金申請時の注意 */}
                <div className="flex gap-3.5 p-4 bg-[rgba(201,150,58,0.06)] border border-[rgba(201,150,58,0.25)] rounded-xl" id="refund-notice" hidden>
                  <div className="text-2xl flex-shrink-0" aria-hidden="true">&#x1F4CB;</div>
                  <div>
                    <div className="text-sm font-bold text-text-primary mb-2">返金申請について</div>
                    <ul className="pl-4 m-0 flex flex-col gap-1">
                      <li className="text-sm text-text-secondary">購入日から7日以内のお申し込みが対象です</li>
                      <li className="text-sm text-text-secondary">返金後はロゴデータの使用・著作権の行使ができなくなります</li>
                      <li className="text-sm text-text-secondary">ダウンロード済みデータは削除してください</li>
                      <li className="text-sm text-text-secondary">返金処理は3〜5営業日以内に完了します</li>
                    </ul>
                  </div>
                </div>

                {/* バリデーションエラー */}
                <div className="flex items-center gap-2 text-sm text-red-600 p-3 bg-red-50 border border-red-200 rounded-lg" id="contact-error" role="alert" hidden>
                  <span>{errorMessage}</span>
                </div>

                {/* 送信ボタン */}
                <div className="flex flex-col gap-2.5">
                  <button
                    type="submit"
                    className="self-start px-10 py-4 bg-primary text-white font-body text-base font-bold border-none rounded-full cursor-pointer transition-all hover:bg-primary-dark disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed"
                    id="btn-contact-submit"
                  >
                    送信する &rarr;
                  </button>
                  <p className="text-xs text-text-muted m-0">
                    送信することで
                    <Link href="/privacy" target="_blank" rel="noopener" className="text-primary">プライバシーポリシー</Link>
                    に同意したものとみなします
                  </p>
                </div>

              </form>

              {/* 送信完了メッセージ */}
              <div className="text-center p-12 bg-white border border-border rounded-2xl max-w-[480px]" id="contact-success" hidden role="status" aria-live="polite">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full text-2xl font-bold flex items-center justify-center mx-auto mb-5">&#x2713;</div>
                <h3 className="font-heading text-xl font-bold text-text-primary mb-3">お問い合わせを受け付けました</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  <strong id="success-email"></strong> 宛に確認メールをお送りしました。<br />
                  通常1〜2営業日以内にご回答いたします。
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Link href="/" className="px-5 py-2.5 bg-white border border-border text-text-primary rounded-full text-sm hover:border-primary transition-colors">ホームへ戻る</Link>
                  <Link href="/faq" className="px-5 py-2.5 bg-white border border-border text-text-primary rounded-full text-sm hover:border-primary transition-colors">FAQを見る</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


      {/* SEO構造化データ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "お問い合わせ | LogoAI.jp",
        "url": "https://logoai.jp/contact",
        "description": "LogoAI.jpへのお問い合わせ",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "availableLanguage": "Japanese",
          "email": "support@logoai.jp"
        }
      }) }} />
    </main>
  )
}
