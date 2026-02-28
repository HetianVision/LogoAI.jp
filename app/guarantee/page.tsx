'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BottomCTA from '@/components/BottomCTA'

// Section 1: Page Hero
function PageHero() {
  return (
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
            <li className="text-text-secondary" aria-current="page">返金保証</li>
          </ol>
        </nav>

        <div className="max-w-[600px] mx-auto text-center">
          <div className="flex justify-center mb-4">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M40 8L10 22v24c0 18 10.67 34.8 30 40 19.33-5.2 30-22 30-40V22L40 8z"
                    fill="rgba(26,58,42,0.08)" stroke="#1A3A2A" strokeWidth="2"/>
              <path d="M28 40l9 9 18-20" stroke="#C9963A" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">返金保証</span>
          <h1 className="font-heading text-4xl font-bold text-text-primary leading-tight mt-3 mb-5">
            7日間全额返金保証。<br />理由は問いません。
          </h1>
          <p className="text-text-secondary leading-relaxed mb-9">
            ロゴの 퀄리티に満足できなかった場合、
            購入から7日以内であれば、理由を問わず全额返金します。
            返金申請はメール1通だけ。複雑な手続きは一切ありません。
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex flex-col items-center gap-1 bg-white border border-border rounded-xl px-6 py-4 min-w-[100px]">
              <span className="font-number text-2xl font-bold text-primary">7日間</span>
              <span className="text-xs text-text-muted">保証期間</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-accent/5 border border-accent rounded-xl px-6 py-4 min-w-[100px]">
              <span className="font-number text-2xl font-bold text-accent">100%</span>
              <span className="text-xs text-text-muted">全额返金</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-white border border-border rounded-xl px-6 py-4 min-w-[100px]">
              <span className="font-number text-2xl font-bold text-primary">理由不問</span>
              <span className="text-xs text-text-muted">申請条件</span>
            </div>
          </div>

          <Link href="/pricing" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
            安心して購入する →
          </Link>
        </div>
      </div>
    </section>
  )
}

// Section 2: 返金保証の3原則
function GuaranteePrinciples() {
  return (
    <section className="py-16 md:py-20 bg-primary relative overflow-hidden">
      <div className="absolute right-[-60px] bottom-[-60px] w-[400px] h-[400px] pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(201,150,58,0.1), transparent 65%)'
      }} />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-0 max-w-[1000px] mx-auto">
          <div className="flex-1 text-center px-10 py-6">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="font-heading text-xl font-bold text-white mb-3">購入から7日以内</h3>
            <p className="text-white/65 text-sm leading-relaxed">
              購入完了メールを受信した日を1日目として、
              7日以内であれば返金申請が可能です。
              土日祝日も期間に含まれます。
            </p>
          </div>

          <div className="w-px h-[120px] bg-white/15 hidden md:block" />

          <div className="flex-1 text-center px-10 py-6">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-heading text-xl font-bold text-white mb-3">理由は問いません</h3>
            <p className="text-white/65 text-sm leading-relaxed">
              「イメージと違った」「別のサービスを使うことにした」など、
              どんな理由でも申請を受け付けます。
              理由の説明は不要です。
            </p>
          </div>

          <div className="w-px h-[120px] bg-white/15 hidden md:block" />

          <div className="flex-1 text-center px-10 py-6">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="font-heading text-xl font-bold text-white mb-3">3〜5営業日以内に返金</h3>
            <p className="text-white/65 text-sm leading-relaxed">
              申請受理後、3〜5営業日以内に
              ご購入時の決済方法（クレジットカード等）へ返金処理します。
              返金手数料は一切かかりません。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Section 3: 返金申請の手順
function RefundSteps() {
  return (
    <section className="py-16 md:py-20 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">申請方法</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary mt-3">返金申請はメール1通で完了</h2>
          <p className="text-text-secondary mt-3">複雑な手続きは一切ありません。3ステップで完了します。</p>
        </div>

        <div className="max-w-[680px] mx-auto mb-12 flex flex-col gap-0">
          <div className="flex gap-6 p-7 bg-white border border-border rounded-xl">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-number text-lg font-bold flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2.5">お問い合わせページからメールを送る</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                <Link href="/contact" className="text-primary underline">お問い合わせページ</Link>から
                「返金希望」と記載してメールを送信します。
                件名・本文の形式は自由です。
                購入時のメールアドレスから送信してください。
              </p>
              <div className="text-xs text-text-secondary bg-bg-section rounded-md p-2.5 leading-relaxed">
                <strong className="text-text-primary">記載する情報（任意）：</strong>
                注文番号、購入日時、返金希望の理由（不要ですが記載いただけると参考になります）
              </div>
            </div>
          </div>

          <div className="w-0.5 h-6 bg-border mx-auto" style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, #C9963A 0, #C9963A 4px, transparent 4px, transparent 10px)'
          }} />

          <div className="flex gap-6 p-7 bg-white border border-border rounded-xl">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-number text-lg font-bold flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2.5">当社から受理確認メールが届く</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                申請受領から<strong className="text-text-primary">24時間以内</strong>に
                返金受理確認メールをお送りします。
                土日祝日は翌営業日対応となります。
                確認メールが届かない場合は迷惑メールフォルダをご確認ください。
              </p>
            </div>
          </div>

          <div className="w-0.5 h-6 bg-border mx-auto" style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, #C9963A 0, #C9963A 4px, transparent 4px, transparent 10px)'
          }} />

          <div className="flex gap-6 p-7 border rounded-xl border-accent bg-accent/5">
            <div className="w-10 h-10 bg-accent text-text-primary rounded-full flex items-center justify-center font-bold flex-shrink-0">
              ✓
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2.5">3〜5営業日以内に返金</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                受理後3〜5営業日以内に、ご購入時の決済方法へ返金処理を行います。
                クレジットカードへの返金はカード会社の処理日程により
                明細への反映に追加で数日かかる場合があります。
              </p>
              <div className="text-xs bg-accent/10 border-l-3 border-accent p-3 rounded leading-relaxed">
                <strong className="text-text-primary">返金後の注意：</strong>
                返金後はロゴデータのダウンロード・著作権行使ができなくなります。
                ダウンロード済みのロゴデータは削除してください。
              </div>
            </div>
          </div>
        </div>

        <div className="text-center flex flex-col items-center gap-3">
          <Link href="/contact" className="inline-block border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-3 rounded-full transition-all">
            返金を申請する →
          </Link>
          <p className="text-xs text-text-muted">
            ※ 返金申請は購入から7日以内のみ受け付けています。
            詳細は<Link href="/terms#refund" className="text-primary">利用規約 返金ポリシー</Link>をご確認ください。
          </p>
        </div>
      </div>
    </section>
  )
}

// Section 4: 返金FAQ
function GuaranteeFAQ() {
  const faqs = [
    {
      q: 'ダウンロードした後でも返金できますか？',
      a: 'はい。ただし返金後はロゴデータの利用・著作権行使ができなくなります。ダウンロード済みデータは削除してください。',
    },
    {
      q: '返金の申請期限は購入日から7日ですか、それとも受取日から？',
      a: '購入完了メールを受信した日（購入日）から7日以内です。',
    },
    {
      q: '銀行振込で購入した場合も返金できますか？',
      a: 'はい。ご指定の銀行口座へ振り込みます。申請時に口座情報をお知らせください。',
    },
    {
      q: '複数ロゴを購入した場合、一部だけ返金できますか？',
      a: 'はい。1ロゴずつ個別に返金申請できます。申請時に返金対象のロゴIDをお知らせください。',
    },
    {
      q: '返金後に同じプランを再購入できますか？',
      a: 'はい。返金後も再購入可能です。ただし同一ロゴの再ダウンロードは返金後はできません。',
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">よくある疑問</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary mt-3">返金保証についての疑問</h2>
        </div>

        <div className="max-w-[760px] mx-auto mb-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-border mb-3 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 cursor-pointer font-medium text-text-primary flex justify-between items-center text-left"
              >
                <span>{faq.q}</span>
                <svg className={`w-5 h-5 text-text-muted transition-transform flex-shrink-0 ml-2 ${openIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8l5 5 5-5" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-text-secondary leading-relaxed">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/terms#refund" className="inline-block border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium px-6 py-3 rounded-full transition-all">
            返金ポリシー全文を読む →
          </Link>
        </div>
      </div>
    </section>
  )
}

// Section 5: 返金が必要ない理由
function GuaranteeConfidence() {
  return (
    <section className="py-16 md:py-20 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">品質への自信</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary mt-3">98%のユーザーが返金申請をしない理由</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto mb-12">
          <div className="bg-white border border-border rounded-2xl p-9 text-center">
            <div className="font-number text-[48px] font-semibold text-primary leading-none mb-2.5">98%</div>
            <div className="font-bold text-text-primary mb-3">返金申請なし率</div>
            <p className="text-text-secondary text-sm leading-relaxed">
              購入した有料プランユーザーのうち98%が
              7日間の保証期間中に返金申請をしていません。
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-9 text-center">
            <div className="font-number text-[48px] font-semibold text-primary leading-none mb-2.5">4.9</div>
            <div className="font-bold text-text-primary mb-3">平均満足度スコア</div>
            <p className="text-text-secondary text-sm leading-relaxed">
              500件以上のユーザーレビューの平均スコア。
              5段階評価でほぼ満点を維持しています。
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-9 text-center">
            <div className="font-number text-[48px] font-semibold text-primary leading-none mb-2.5">無制限</div>
            <div className="font-bold text-text-primary mb-3">再生成・カスタマイズ</div>
            <p className="text-text-secondary text-sm leading-relaxed">
              有料プランでは気に入るまで何度でも再生成・編集可能。
              納得してからダウンロードできます。
            </p>
          </div>
        </div>

        <div className="max-w-[680px] mx-auto">
          <blockquote className="bg-white border border-border border-l-4 border-l-accent rounded-r-xl p-7">
            <p className="font-heading text-lg text-text-primary leading-relaxed mb-3">
              「返金することも考えましたが、生成したロゴが想像以上の 퀄리티で驚きました。
              デザイン会社に頼むより断然良いものができました」
            </p>
            <footer className="text-sm text-text-muted">
              — スタートアップ代表・東京 / スタンダードプラン
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

// Section 6: Final CTA
function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-primary rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute right-[-100px] top-[-100px] w-[300px] h-[300px] rounded-full opacity-10 bg-accent" />
          <div className="relative z-10">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              リスクゼロで、まず試してみてください。
            </h2>
            <p className="text-white/80 mb-8 max-w-[500px] mx-auto">
              7日間全额返金保証があるので、「気に入らなかったら返金」という<br />
              安心感を持ちながらロゴを作り始められます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
                料金プランを見る →
              </Link>
              <Link href="/create" className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 py-4 rounded-full transition-all">
                まず無料で試す
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span>・理由不問・全额返金✓ 7日間</span>
              <span>✓ 返金手数料ゼロ</span>
              <span>✓ 申請はメール1通だけ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Page
export default function GuaranteePage() {
  return (
    <main>
      <Navbar />
      <PageHero />
      <GuaranteePrinciples />
      <RefundSteps />
      <GuaranteeFAQ />
      <GuaranteeConfidence />
      <FinalCTA />
      <BottomCTA
        title="まずは無料で试してみてください。"
        description="気に入ったロゴが見つかれば、その時点で有料プランへの移行ができます。クレジットカード不要・登録は30秒・7日間全额返金保証付き。"
      />
      <Footer />
    </main>
  )
}
