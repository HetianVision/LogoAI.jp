'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CopyrightPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqItems = [
    {
      question: '他のAIロゴサービスと比べて、著作権の扱いがどう違うのですか？',
      answer: '多くの海外AIロゴサービスは利用規約上、著作権が曖昧なまま「商用利用可」としています。LogoAI.jpでは、日本の著作権法と文化庁ガイドラインに基づき「ユーザーの創作的寄与の記録→証明書発行」という仕組みを明示的に構築しています。証明書には法的根拠となる記録が含まれており、権利主張の根拠として使用できます。'
    },
    {
      question: '著作権帰属証明書は商標登録申請に使えますか？',
      answer: 'はい、補足書類として使用できます。商標登録申請では一般的にロゴのデータ（JPG・PNG等）の提出が必要で、著作権帰属証明書は「このロゴの権利が申請者にある」ことを補強する書類として機能します。ただし、商標登録の可否は特許庁の審査によるものであり、証明書が登録を保証するものではありません。弁理士へのご相談も推奨します。'
    },
    {
      question: '将来、日本の著作権法が変わった場合、購入済みのロゴはどうなりますか？',
      answer: '購入時点での著作権帰属証明書は、発行時の法的根拠に基づいて作成されており、発行後に法律が変わっても証明書の内容は変わりません。当社としても、法律改正があった場合はサービスの仕組みを適切に更新し、既存ユーザーへの影響を最小化する方針です。'
    },
    {
      question: '複数人で共同でロゴを作成した場合、著作権はどうなりますか？',
      answer: '現在のシステムでは、1つのアカウント・1人のユーザーが著作権者として登録されます。複数人での共同著作権が必要な場合は、購入後に法律上の手続き（著作権の共有・譲渡等）を別途行う必要があります。詳しくは弁護士・弁理士にご相談ください。'
    },
    {
      question: '生成したロゴが既存の著作物に似ていた場合はどうなりますか？',
      answer: '生成AIの性質上、偶発的に既存のロゴに似たデザインが生成される可能性があります。当サービスの著作権帰属証明書は、お客様の権利を証明するものですが、第三者の既存著作物・商標権との衝突については別途確認が必要です。プレミアムプランの商標類似チェックをご利用いただくか、弁理士にご相談ください。'
    }
  ]

  const faqSchemaData = faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer }
  }))

  return (
    <main>

      {/* Section 1: Hero */}
      <section className="relative pt-28 pb-16 px-6 bg-bg-base overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-0 right-0 h-full bg-[linear-gradient(rgba(201,150,58,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,150,58,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)]" />
        </div>

        <div className="max-w-[800px] mx-auto relative z-10">
          <nav className="mb-8" aria-label="パンくずリスト">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link href="/" className="text-text-muted hover:text-primary transition-colors">ホーム</Link></li>
              <li className="text-text-muted">/</li>
              <li aria-current="page" className="text-text-primary font-medium">著作権について</li>
            </ol>
          </nav>

          <div className="text-center">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">著作権について</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-text-primary leading-tight mt-4 mb-5">
              有料プランで生成したロゴの<br className="md:hidden" />著作権は、100%あなたのものです。
            </h1>
            <p className="text-text-secondary text-base leading-relaxed max-w-[680px] mx-auto mb-10">
              AIが生成したロゴの著作権は誰のものか——これは多くの方が疑問に思う点です。
              LogoAI.jpでは、日本の著作権法と文化庁ガイドラインに基づいて、
              有料プランのユーザーへ著作権が完全帰属する仕組みを構築しています。
            </p>

            {/* 結論サマリーボックス */}
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 border border-border rounded-2xl overflow-hidden text-left shadow-md bg-white max-w-[700px] mx-auto">
              <div className="p-6 md:p-7 bg-[rgba(45,122,79,0.04)]">
                <div className="font-bold text-text-primary text-sm pb-3 border-b border-border mb-3">有料プラン</div>
                <div className="flex flex-col gap-2 text-sm text-text-secondary">
                  <div><span className="text-[#2D7A4F] font-bold mr-2">✓</span>著作権：ユーザーへ100%帰属</div>
                  <div><span className="text-[#2D7A4F] font-bold mr-2">✓</span>商用利用：全用途OK</div>
                  <div><span className="text-[#2D7A4F] font-bold mr-2">✓</span>商標登録申請：可能</div>
                  <div><span className="text-[#2D7A4F] font-bold mr-2">✓</span>第三者譲渡・ライセンス：可能</div>
                  <div><span className="text-[#2D7A4F] font-bold mr-2">✓</span>証明書PDF：自動発行</div>
                </div>
              </div>
              <div className="w-full h-px md:w-px md:h-auto bg-border my-4 md:my-16" />
              <div className="p-6 md:p-7 bg-[rgba(196,30,58,0.03)]">
                <div className="font-bold text-text-primary text-sm pb-3 border-b border-border mb-3">無料プラン</div>
                <div className="flex flex-col gap-2 text-sm text-text-secondary">
                  <div><span className="text-[#C41E3A] font-bold mr-2">✗</span>著作権：当社に帰属</div>
                  <div><span className="text-[#C41E3A] font-bold mr-2">✗</span>商用利用：不可</div>
                  <div><span className="text-[#C41E3A] font-bold mr-2">✗</span>商標登録申請：不可</div>
                  <div className="text-xs text-text-muted pl-5 mt-1">※ SNSプロフィール・個人使用のみ可</div>
                </div>
              </div>
            </div>

            <Link href="/pricing" className="inline-block mt-8 bg-accent hover:bg-accent-hover text-text-primary font-bold text-lg px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
              有料プランで著作権を確保する →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: 日本の著作権法とAIの関係 */}
      <section className="py-16 md:py-24 px-6 bg-bg-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">法的背景</span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-text-primary mt-3">日本の著作権法とAI生成コンテンツ</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* 左：法的説明テキスト */}
            <div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">文化庁の見解（2024年3月）</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                2024年3月、文化庁は「AIと著作権に関する考え方について」を公表しました。
                このガイドラインでは、AI生成コンテンツの著作権について以下の原則が示されています：
              </p>

              <div className="flex flex-col gap-5 mb-7">
                <div className="flex gap-4 p-4 bg-white border border-border rounded-lg">
                  <div className="text-accent font-bold text-lg min-w-[24px] text-center">①</div>
                  <div>
                    <div className="font-bold text-sm text-text-primary mb-1.5">AIが完全自律で生成したものには著作権が発生しない場合がある</div>
                    <p className="text-sm text-text-secondary leading-relaxed">人間の創作的寄与がない場合、著作物として認められない可能性があります。</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white border border-border rounded-lg">
                  <div className="text-accent font-bold text-lg min-w-[24px] text-center">②</div>
                  <div>
                    <div className="font-bold text-sm text-text-primary mb-1.5">人間の創作的寄与が認められる場合は著作権が発生する</div>
                    <p className="text-sm text-text-secondary leading-relaxed">ユーザーが具体的な指示・選択・編集を行った場合、その創作的寄与に対して著作権が認められます。</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white border border-border rounded-lg">
                  <div className="text-accent font-bold text-lg min-w-[24px] text-center">③</div>
                  <div>
                    <div className="font-bold text-sm text-text-primary mb-1.5">著作権者はその創作的寄与を行った人間となる</div>
                    <p className="text-sm text-text-secondary leading-relaxed">AIツールを提供した会社ではなく、実際に創作的判断を行ったユーザーが著作権者となります。</p>
                  </div>
                </div>
              </div>

              <a
                href="https://www.bunka.go.jp/seisaku/chosakuken/pdf/93903601_01.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white border border-border rounded-lg text-text-primary text-sm font-semibold hover:border-primary hover:shadow-sm transition-all"
              >
                <span className="text-xl">📄</span>
                <span>文化庁「AIと著作権に関する考え方について」（PDF）を読む</span>
                <span className="ml-auto text-text-muted">↗</span>
              </a>
            </div>

            {/* 右：LogoAI.jpの対応 */}
            <div className="bg-white border border-border rounded-2xl p-8">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">LogoAI.jpの対応</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                私たちは文化庁ガイドラインに基づき、有料プランユーザーの「創作的寄与」を
                システムで記録・証明する仕組みを構築しています。
              </p>

              <div className="flex flex-col gap-5">
                <div className="flex gap-3.5 pb-5 border-b border-border">
                  <div className="w-10 h-10 bg-[rgba(201,150,58,0.08)] rounded-lg flex items-center justify-center text-xl flex-shrink-0">✏️</div>
                  <div>
                    <div className="font-bold text-sm text-text-primary mb-1">入力内容の記録</div>
                    <div className="text-sm text-text-secondary leading-relaxed">ブランド名・業種・イメージキーワード・カラー指定など<br />ユーザーが入力した内容を全て記録します</div>
                  </div>
                </div>
                <div className="flex gap-3.5 pb-5 border-b border-border">
                  <div className="w-10 h-10 bg-[rgba(201,150,58,0.08)] rounded-lg flex items-center justify-center text-xl flex-shrink-0">🎨</div>
                  <div>
                    <div className="font-bold text-sm text-text-primary mb-1">選択・編集操作の記録</div>
                    <div className="text-sm text-text-secondary leading-relaxed">3案から1案を選択した事実、フォント・色・字間の編集履歴を<br />タイムスタンプ付きで記録します</div>
                  </div>
                </div>
                <div className="flex gap-3.5">
                  <div className="w-10 h-10 bg-[rgba(201,150,58,0.08)] rounded-lg flex items-center justify-center text-xl flex-shrink-0">📋</div>
                  <div>
                    <div className="font-bold text-sm text-text-primary mb-1">証明書に反映</div>
                    <div className="text-sm text-text-secondary leading-relaxed">これらの記録を著作権帰属証明書（PDF）に記載し、ユーザーの創作的寄与を第三者に証明できる形で発行します</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: プラン比較 */}
      <section className="py-16 md:py-24 px-6 bg-bg-section">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">プラン比較</span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-text-primary mt-3">無料プランと有料プランの著作権の違い</h2>
          </div>

          <div className="border border-border rounded-2xl overflow-hidden bg-white shadow-md">
            {/* ヘッダー */}
            <div className="grid grid-cols-[1fr_180px_220px] bg-bg-section border-b-2 border-border text-sm font-bold text-text-secondary">
              <div className="p-4 text-left">権利の内容</div>
              <div className="p-4 text-center text-text-muted border-l-2 border-r-2 border-primary/20">無料プラン</div>
              <div className="p-4 text-center text-primary bg-[rgba(26,58,42,0.04)] border-l-2 border-r-2 border-primary">
                有料プラン
                <span className="block text-xs font-normal text-text-muted mt-0.5">スタンダード / プレミアム</span>
              </div>
            </div>

            {/* ボディ */}
            <div className="divide-y divide-border">
              <div className="grid grid-cols-[1fr_180px_220px]">
                <div className="p-3.5 text-sm text-text-secondary">著作権の帰属先</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary/20">当社（LogoAI.jp）</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary bg-[rgba(26,58,42,0.02)] font-bold text-primary">ユーザー（100%）</div>
              </div>
              <div className="grid grid-cols-[1fr_180px_220px]">
                <div className="p-3.5 text-sm text-text-secondary">商用利用</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary/20 text-[#C41E3A] font-bold">✗ 不可</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary bg-[rgba(26,58,42,0.02)] text-[#2D7A4F] font-bold">✓ 全用途OK</div>
              </div>
              <div className="grid grid-cols-[1fr_180px_220px]">
                <div className="p-3.5 text-sm text-text-secondary">商標登録申請への利用</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary/20 text-[#C41E3A] font-bold">✗ 不可</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary bg-[rgba(26,58,42,0.02)] text-[#2D7A4F] font-bold">✓ 可能</div>
              </div>
              <div className="grid grid-cols-[1fr_180px_220px]">
                <div className="p-3.5 text-sm text-text-secondary">第三者への譲渡・販売</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary/20 text-[#C41E3A] font-bold">✗ 不可</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary bg-[rgba(26,58,42,0.02)] text-[#2D7A4F] font-bold">✓ 可能</div>
              </div>
              <div className="grid grid-cols-[1fr_180px_220px]">
                <div className="p-3.5 text-sm text-text-secondary">SNSプロフィール使用</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary/20 text-[#2D7A4F] font-bold">✓ 可能</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary bg-[rgba(26,58,42,0.02)] text-[#2D7A4F] font-bold">✓ 可能</div>
              </div>
              <div className="grid grid-cols-[1fr_180px_220px]">
                <div className="p-3.5 text-sm text-text-secondary">名刺・チラシ等印刷物</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary/20 text-[#C41E3A] font-bold">✗ 不可</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary bg-[rgba(26,58,42,0.02)] text-[#2D7A4F] font-bold">✓ 可能</div>
              </div>
              <div className="grid grid-cols-[1fr_180px_220px]">
                <div className="p-3.5 text-sm text-text-secondary">ECサイト・看板・商品パッケージ</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary/20 text-[#C41E3A] font-bold">✗ 不可</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary bg-[rgba(26,58,42,0.02)] text-[#2D7A4F] font-bold">✓ 可能</div>
              </div>
              <div className="grid grid-cols-[1fr_180px_220px]">
                <div className="p-3.5 text-sm text-text-secondary">AIデータ学習への使用</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary/20">使用する場合あり</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary bg-[rgba(26,58,42,0.02)] text-[#2D7A4F] font-bold">✓ 一切使用しない</div>
              </div>
              <div className="grid grid-cols-[1fr_180px_220px]">
                <div className="p-3.5 text-sm text-text-secondary">著作権帰属証明書（PDF）</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary/20 text-[#C41E3A] font-bold">✗ 発行なし</div>
                <div className="p-3.5 text-sm text-center border-l-2 border-r-2 border-primary bg-[rgba(26,58,42,0.02)] text-[#2D7A4F] font-bold">✓ 自動発行</div>
              </div>
            </div>

            {/* フッター */}
            <div className="grid grid-cols-[1fr_180px_220px] bg-bg-section border-t-2 border-border">
              <div></div>
              <div className="p-5 border-l-2 border-r-2 border-primary/20">
                <Link href="/create" className="block py-3 border border-border rounded-full text-sm font-bold text-text-secondary text-center bg-white hover:border-primary hover:text-primary transition-all">無料で試す</Link>
              </div>
              <div className="p-5 border-l-2 border-r-2 border-primary">
                <Link href="/pricing" className="block py-3 bg-primary text-white rounded-full text-sm font-bold text-center hover:bg-primary-dark transition-all">有料プランを見る →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 著作権帰属証明書とは */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* 左：証明書モックアップ */}
            <div className="flex justify-center">
              <div className="w-full max-w-[360px] border border-border rounded-xl overflow-hidden shadow-xl bg-white">
                {/* 証明書ヘッダー */}
                <div className="bg-primary p-6 text-center">
                  <div className="font-heading text-lg font-bold text-accent mb-1">LogoAI.jp</div>
                  <div className="font-heading text-xl font-bold text-white">著作権帰属証明書</div>
                  <div className="text-xs text-white/50 mt-1 tracking-widest">Copyright Assignment Certificate</div>
                </div>
                {/* 証明書本文 */}
                <div className="p-5">
                  <div className="text-xs font-mono text-text-muted pb-4 border-b border-border mb-4">証明書番号：CERT-2025-001234</div>
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-muted">権利帰属者</span>
                      <span className="text-sm text-text-primary font-medium">田中 太郎（Taro Tanaka）</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-muted">メールアドレス</span>
                      <span className="text-sm text-text-primary font-medium">taro@example.com</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-muted">生成日時</span>
                      <span className="text-sm text-text-primary font-medium">2025年1月15日 14:32:07 JST</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-muted">ロゴID</span>
                      <span className="text-sm text-text-primary font-medium">LOGO-20250115-001234</span>
                    </div>
                  </div>
                  {/* ロゴサムネイル */}
                  <div className="bg-bg-section rounded-lg p-4 mb-4 flex justify-center items-center min-h-[60px]">
                    <span style={{ fontFamily: 'serif', fontSize: '18px', fontWeight: 700, color: '#1A3A2A', letterSpacing: '0.1em' }}>田中製菓</span>
                  </div>
                  <div className="border border-border rounded-md p-3">
                    <div className="text-[0.65rem] font-bold uppercase text-text-muted mb-2">付与される権利</div>
                    <div className="text-xs text-[#2D7A4F] font-semibold">✓ 著作権：権利帰属者へ100%帰属</div>
                    <div className="text-xs text-[#2D7A4F] font-semibold">✓ 商用利用（全用途）</div>
                    <div className="text-xs text-[#2D7A4F] font-semibold">✓ 商標登録申請への利用</div>
                    <div className="text-xs text-[#2D7A4F] font-semibold">✓ 第三者への譲渡・ライセンス付与</div>
                  </div>
                </div>
                {/* 証明書フッター */}
                <div className="p-3.5 bg-bg-section border-t border-border flex justify-between">
                  <div className="text-xs text-text-muted">発行者：株式会社ロゴエーアイ</div>
                  <div className="text-xs text-text-muted">発行日：2025年1月15日</div>
                </div>
              </div>
            </div>

            {/* 右：証明書の説明 */}
            <div>
              <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">著作権帰属証明書</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mt-3 mb-4">著作権帰属証明書とは何か</h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                著作権帰属証明書とは、生成したロゴの著作権がユーザーに帰属することを証明するPDF文書です。
                有料プラン購入完了後に自動発行されます。
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="text-accent font-bold text-sm min-w-[24px] flex-shrink-0 mt-0.5">01</div>
                  <div>
                    <div className="font-bold text-base text-text-primary mb-1.5">証明する内容</div>
                    <p className="text-sm text-text-secondary leading-relaxed">ロゴの識別情報・生成日時・ユーザーの創作的寄与の記録・付与される権利の範囲を記載します。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-accent font-bold text-sm min-w-[24px] flex-shrink-0 mt-0.5">02</div>
                  <div>
                    <div className="font-bold text-base text-text-primary mb-1.5">活用シーン</div>
                    <p className="text-sm text-text-secondary leading-relaxed">商標登録申請の補足書類、取引先への権利証明、法務部門での確認資料として使用できます。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-accent font-bold text-sm min-w-[24px] flex-shrink-0 mt-0.5">03</div>
                  <div>
                    <div className="font-bold text-base text-text-primary mb-1.5">再発行・永久保存</div>
                    <p className="text-sm text-text-secondary leading-relaxed">マイページからいつでも再ダウンロード可能。証明書の有効期限はありません。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-accent font-bold text-sm min-w-[24px] flex-shrink-0 mt-0.5">04</div>
                  <div>
                    <div className="font-bold text-base text-text-primary mb-1.5">プレミアムプランの追加証明</div>
                    <p className="text-sm text-text-secondary leading-relaxed">プレミアムプランでは「生成唯一性証明書」も発行。特定日時・特定ユーザーによる生成を記録します。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: ケーススタディ */}
      <section className="py-16 md:py-24 px-6 bg-bg-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">具体的なケース</span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-text-primary mt-3">こんな場合はどうなるか</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-[1000px] mx-auto">
            {/* OK ケース */}
            <div className="border border-border rounded-2xl overflow-hidden bg-white">
              <div className="flex items-center gap-2.5 p-4 font-bold text-base bg-[rgba(45,122,79,0.06)] text-[#2D7A4F] border-b border-[rgba(45,122,79,0.15)]">
                <span className="text-xl font-black">✓</span>
                <span>有料プランで可能なこと</span>
              </div>
              <div className="divide-y divide-border">
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">美容サロンを開業し、作成したロゴを看板・名刺・インスタグラムで使用する</div>
                  <div className="text-xs font-bold text-[#2D7A4F]">✓ 問題なし（商用利用OK・著作権はオーナーに帰属）</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">Webデザイナーがクライアントのためにロゴを作成し、著作権をクライアントへ譲渡する</div>
                  <div className="text-xs font-bold text-[#2D7A4F]">✓ 問題なし（第三者への著作権譲渡OK）</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">生成したロゴで商標登録を特許庁に申請する</div>
                  <div className="text-xs font-bold text-[#2D7A4F]">✓ 可能（著作権帰属証明書を補足書類として添付できる）</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">ECサイトで販売する商品のパッケージにロゴを印刷する</div>
                  <div className="text-xs font-bold text-[#2D7A4F]">✓ 問題なし（商業的目的の印刷物への使用OK）</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">作成したロゴをフランチャイズ店舗にライセンスする</div>
                  <div className="text-xs font-bold text-[#2D7A4F]">✓ 可能（ライセンス付与は著作権者の権利）</div>
                </div>
              </div>
            </div>

            {/* NG ケース */}
            <div className="border border-border rounded-2xl overflow-hidden bg-white">
              <div className="flex items-center gap-2.5 p-4 font-bold text-base bg-[rgba(196,30,58,0.05)] text-[#C41E3A] border-b border-[rgba(196,30,58,0.12)]">
                <span className="text-xl font-black">✗</span>
                <span>無料プランでできないこと</span>
              </div>
              <div className="divide-y divide-border">
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">無料プランで作ったロゴを名刺に印刷して使用する</div>
                  <div className="text-xs font-bold text-[#C41E3A]">✗ 不可（著作権が当社に帰属するため商用利用不可）</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">無料プランのロゴをSNSのビジネスアカウントに使用する</div>
                  <div className="text-xs font-bold text-[#C41E3A]">✗ 不可（ビジネス目的での使用は商用利用に該当）</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">無料プランのロゴで商標登録を申請する</div>
                  <div className="text-xs font-bold text-[#C41E3A]">✗ 不可（著作権が当社にあるため申請権利なし）</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">無料プランで作ったロゴを他人に売る</div>
                  <div className="text-xs font-bold text-[#C41E3A]">✗ 不可（著作権者でないため譲渡・販売は著作権侵害）</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-text-primary font-medium mb-2">無料プランのロゴを店舗の看板に使用する</div>
                  <div className="text-xs font-bold text-[#C41E3A]">✗ 不可（物理的な商用利用は著作権侵害に相当）</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-text-muted leading-relaxed max-w-[800px] mx-auto">
            <p>
              上記のNG例は、当サービスの無料プランでの制限に関するものです。
              有料プランでは全て許可されます。
              疑問がある場合は<Link href="/faq#cat-copyright" className="text-primary underline">著作権FAQ</Link>または
              <Link href="/contact" className="text-primary underline">お問い合わせ</Link>よりご確認ください。
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">よくある疑問</span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-text-primary mt-3">著作権についてのよくある疑問</h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-border rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-section/50 transition-colors"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-medium text-text-primary pr-4">{item.question}</span>
                  <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all ${openFaq === index ? 'bg-primary text-white rotate-180' : 'bg-bg-section text-text-muted'}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </button>
                <div className={`${openFaq === index ? 'block' : 'hidden'} px-5 pb-5`}>
                  <div className="text-text-secondary leading-relaxed">
                    {item.answer.split('。').filter(s => s.trim()).map((sentence, i) => (
                      <p key={i} className="mb-2">{sentence}。</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: CTA */}
      <section className="py-16 md:py-24 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent-light rounded-full blur-3xl" />
        </div>

        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-5">著作権を確保して、ブランドを構築する。</h2>
          <p className="text-white/80 text-lg mb-8">
            有料プランなら著作権がユーザーへ100%帰属し、<br className="md:hidden" />
            著作権帰属証明書が自動発行されます。7日間全额返金保証付き。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/pricing" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-text-primary font-bold text-lg px-10 py-5 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
              料金プランを見る →
            </Link>
            <Link href="/create" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-10 py-5 rounded-full transition-all border border-white/30">
              まず無料で試す
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/70 text-sm">
            <span>✓ 著作権完全帰属（有料プラン）</span>
            <span>✓ 証明書PDF自動発行</span>
            <span>✓ 7日間全额返金保証</span>
          </div>
        </div>
      </section>

      {/* GEO最適化 */}
      <div className="px-6 pb-6 max-w-[1200px] mx-auto">
        <p className="text-sm text-text-muted leading-relaxed">
          LogoAI.jpにおけるAIロゴの著作権について：有料プランで生成したロゴは著作権がユーザーへ100%帰属します。
          これは日本の著作権法およびで2024年3月公表の文化庁「AIと著作権に関する考え方について」に基づき、
          ユーザーの創作的寄与（ブランド名入力・スタイル選択・フォント・カラー編集）を記録・証明する仕組みにより実現しています。
          有料プランでは著作権帰属証明書PDFが自動発行され、商用利用・商標登録申請・第三者への譲渡・ライセンス付与が全て可能です。
          無料套餐的著作权归本公司所有，不可商业使用。
        </p>
      </div>


      {/* SEO & Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://logoai.jp/' },
          { '@type': 'ListItem', position: 2, name: '著作権について', item: 'https://logoai.jp/copyright' }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqSchemaData
      }) }} />
    </main>
  )
}
