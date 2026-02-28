'use client'

import Link from 'next/link'

export default function HowItWorksPage() {
  const steps = [
    { num: '01', icon: '✏️', title: '入力', desc: 'ブランド名・業種・<br />イメージを入力' },
    { num: '02', icon: '✨', title: 'AI生成', desc: '3案のロゴを<br />約2分で生成' },
    { num: '03', icon: '🎨', title: 'カスタマイズ', desc: 'フォント・色・字間を<br />自由に調整' },
    { num: '04', icon: '📥', title: '完成・取得', desc: '全形式DL＋<br />著作権証明書', isFinal: true },
  ]

  const stepDetails = [
    {
      num: 1, title: 'ブランド情報を入力する', time: '2分',
      description: 'ブランド名・業種・イメージキーワードを入力するだけ。複雑な設定は一切不要です。',
      points: [
        { title: 'ブランド名（日本語・英語OK）', desc: '読み方のヒントも入力すると、フォント提案の精度が上がります。' },
        { title: '業種を選択（47業種）', desc: '業種に応じて、AIが最適なフォントスタイルとカラー案を絞り込みます。' },
        { title: 'イメージキーワード（任意）', desc: '「信頼感」「温もり」「スタイリッシュ」など、3つまで選択できます。' },
        { title: 'カラーの方向性（任意）', desc: '希望のカラーパレット系統を選択。指定しない場合はAIが自動提案します。' },
      ],
      mockup: 'form'
    },
    {
      num: 2, title: 'AIが3案を自動生成する', time: '2分', even: true,
      description: '入力内容をもとに、スタイルの異なる3案を同時に生成します。待ち時間は平均2分。完了するとメールで通知します。',
      points: [
        { title: '3案は意図的に異なるスタイル', desc: '「モダン」「エラーガント」「温もり」など審美的方向性を分けて提案します。' },
        { title: '日本語フォント100種以上から最適選択', desc: '業種・業態・イメージキーワードに最も合うフォントをAIが自動判断します。' },
        { title: '気に入らなければ再生成（有料プランは無制限）', desc: '3案全て気に入らない場合、「再生成」ボタンで別の3案を生成できます。' },
      ],
      mockup: 'generating'
    },
    {
      num: 3, title: 'フォント・色・レイアウトを調整する', time: '5分',
      description: '3案の中から気に入ったデザインを選び、細部を自分好みに調整します。すべてブラウザ上でリアルタイムにプレビューできます。',
      points: [
        { title: 'フォント変更（100種以上）', desc: 'クリックするだけで即切り替え。プレビューがリアルタイムに更新されます。' },
        { title: 'カラー調整（HEX・カラーピッカー対応）', desc: 'メインカラー・サブカラー・背景色を自由に変更できます。' },
        { title: '字間・行間・サイズ調整', desc: 'スライダーで直感的に微調整。印刷・Web両方の最適値を確認できます。' },
        { title: '背景色切り替えプレビュー', desc: '白・黒・グレー・カラー背景でのロゴ見え方を確認できます。' },
      ],
      mockup: 'customize'
    },
    {
      num: 4, title: 'ダウンロードして、著作権証明書を取得する', time: '1分', even: true, final: true,
      description: 'ロゴが完成したら、必要な形式を全てダウンロード。著作権帰属証明書は自動発行されます。',
      points: [
        { title: '全形式を一括ダウンロード', desc: 'プレミアムではAI・EPS形式も追加。印刷会社への入稿に即対応できます。' },
        { title: '著作権帰属証明書がPDFで自動発行', desc: '購入完了と同時に証明書が発行されます。マイページからいつでも再取得可能です。' },
        { title: 'データは永久保存・再ダウンロード無制限', desc: 'マイページからいつでもロゴの編集・再ダウンロードができます。' },
        { title: '名刺レイアウトも同時に生成（有料プラン）', desc: 'ロゴ完成後、ボタン1つで名刺デザインも生成できます。' },
      ],
      mockup: 'complete'
    },
  ]

  const faqs = [
    { q: 'デザインの知識がなくても使えますか？', a: 'はい、完全に使えます。入力するのはブランド名と業種だけです。後はAIが全て提案します。フォントや色の知識は不要です。' },
    { q: 'スマートフォンでも使えますか？', a: 'はい、ブラウザからそのまま利用できます。ただし、カスタマイズ操作はPCの方が快適です。スマートフォン専用アプリは開発中です。' },
    { q: '気に入らなかった場合はどうなりますか？', a: '購入から7日以内であれば全額返金します。また、有料プランでは再生成が無制限なので、納得いくまで調整できます。' },
    { q: '途中で保存して続きから作業できますか？', a: 'はい。アカウント登録後は自動保存されます。ブラウザを閉じても、マイページからいつでも続きの作業ができます。' },
  ]

  return (
    <main>

      {/* Section 1: Hero */}
      <section className="relative pt-28 pb-12 px-6 bg-bg-base overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <nav className="mb-8" aria-label="パンくずリスト">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link href="/" className="text-text-muted hover:text-primary transition-colors">ホーム</Link></li>
              <li className="text-text-muted">/</li>
              <li aria-current="page" className="text-text-primary font-medium">使い方・生成フロー</li>
            </ol>
          </nav>
          <div className="max-w-[880px] mx-auto text-center">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase">使い方・生成フロー</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mt-4 mb-5">最短10分で、<br />プロ品質のロゴと著作権証明書。</h1>
            <p className="text-text-secondary text-base leading-relaxed mb-10">ブランド名と業種を入力するだけ。AIが最適なデザインを提案し、気に入ったものを選んでダウンロード년까지、難しい操作は一切ありません。</p>

            <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
              <div className="flex flex-col items-center gap-1 bg-white border border-border rounded-xl px-5 py-3 min-w-[72px]">
                <span className="font-number text-xl font-semibold text-primary">2分</span>
                <span className="text-[10px] text-text-muted font-medium">入力</span>
              </div>
              <span className="text-xl text-text-muted">→</span>
              <div className="flex flex-col items-center gap-1 bg-white border border-border rounded-xl px-5 py-3 min-w-[72px]">
                <span className="font-number text-xl font-semibold text-primary">2分</span>
                <span className="text-[10px] text-text-muted font-medium">AI生成</span>
              </div>
              <span className="text-xl text-text-muted">→</span>
              <div className="flex flex-col items-center gap-1 bg-white border border-border rounded-xl px-5 py-3 min-w-[72px]">
                <span className="font-number text-xl font-semibold text-primary">5分</span>
                <span className="text-[10px] text-text-muted font-medium">調整</span>
              </div>
              <span className="text-xl text-text-muted">→</span>
              <div className="flex flex-col items-center gap-1 bg-[rgba(201,150,58,0.06)] border border-accent rounded-xl px-5 py-3 min-w-[72px]">
                <span className="font-number text-xl font-semibold text-accent">1分</span>
                <span className="text-[10px] text-text-muted font-medium">完成・証明書</span>
              </div>
            </div>
            <div className="text-sm text-text-muted mb-8">合計 <strong className="text-accent font-bold">約10分</strong></div>
            <div className="flex flex-col items-center gap-2.5">
              <Link href="/create" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-primary font-bold text-lg px-10 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">今すぐ無料で始める</Link>
              <span className="text-xs text-text-muted">クレジットカード不要・アカウント登録30秒</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Overview */}
      <section className="py-12 px-6 bg-bg-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-start justify-center gap-2 md:gap-0">
            {steps.map((step, index) => (
              <div key={step.num} className={`flex flex-col items-center text-center gap-2.5 flex-1 relative ${step.isFinal ? '' : 'hidden md:block'}`}>
                <span className="font-number text-[10px] font-bold text-text-muted tracking-[0.1em]">{step.num}</span>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm relative z-10 ${step.isFinal ? 'bg-primary border-2 border-primary shadow-md' : 'bg-white border-2 border-border'}`}>
                  {step.icon}
                </div>
                <span className={`font-bold text-base ${step.isFinal ? 'text-primary' : 'text-text-primary'}`}>{step.title}</span>
                <span className="text-xs text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
                {index < steps.length - 1 && (
                  <div className="absolute top-[calc(10px+28px)] left-[calc(50%+28px)] right-[calc(-50%+28px)] h-0.5 hidden md:block" style={{ background: 'repeating-linear-gradient(to right, #C9963A 0, #C9963A 4px, transparent 4px, transparent 10px)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Step Details */}
      {stepDetails.map((step, stepIndex) => (
        <section key={step.num} id={`step-${step.num}`} data-step={step.num} className={`py-16 md:py-20 ${step.even || step.final ? 'bg-bg-section' : 'bg-bg-base'}`}>
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`grid md:grid-cols-2 gap-16 items-center ${step.even ? 'direction-rtl' : ''}`}>
              <div className={step.even ? 'md:order-2' : ''}>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 ${step.final ? 'bg-accent text-text-primary' : 'bg-primary text-white'}`}>Step {String(step.num).padStart(2, '0')}</span>
                  <span className="text-xs text-text-muted">約{step.time}</span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">{step.title}</h2>
                <p className="text-text-secondary leading-relaxed mb-6">{step.description}</p>
                <ul className="space-y-4">
                  {step.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${step.final ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary'}`}>✓</span>
                      <div>
                        <strong className="text-text-primary block mb-1">{point.title}</strong>
                        <p className="text-sm text-text-muted leading-relaxed">{point.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={step.even ? 'md:order-1' : ''}>
                {step.mockup === 'form' && (
                  <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
                    <div className="bg-bg-section px-4 py-2 flex items-center gap-2 border-b border-border">
                      <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-green-400" /></div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-text-muted text-center">logoai.jp/create</div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm font-bold text-text-primary mb-4">ブランド情報を入力してください</div>
                      <div className="mb-4"><label className="block text-xs text-text-muted mb-1">ブランド名 <span className="text-red-500">必須</span></label><div className="border border-border rounded-lg px-3 py-2 bg-bg-section flex items-center"><span className="font-heading text-lg text-primary">田中製果子</span><span className="w-0.5 h-5 bg-primary ml-1 animate-pulse" /></div></div>
                      <div className="mb-4"><label className="block text-xs text-text-muted mb-1">よみがな（任意）</label><div className="border border-border rounded-lg px-3 py-2 bg-white text-sm text-text-secondary">たなかせいが</div></div>
                      <div className="mb-4"><label className="block text-xs text-text-muted mb-1">業種 <span className="text-red-500">必須</span></label><div className="border border-border rounded-lg px-3 py-2 bg-white flex justify-between items-center"><span className="text-sm text-text-primary">食品・果子製造</span><span className="text-text-muted text-xs">▾</span></div></div>
                      <div className="mb-4"><label className="block text-xs text-text-muted mb-1">イメージキーワード（最大3つ）</label><div className="flex flex-wrap gap-2"><span className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">伝統・老舗</span><span className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">温もり</span><span className="text-xs px-2 py-1 bg-bg-section text-text-muted border border-border rounded-full">和モダン</span></div></div>
                      <button className="w-full bg-accent hover:bg-accent-hover text-text-primary font-bold py-3 rounded-lg transition-colors">✨ AIでデザインを生成する</button>
                    </div>
                  </div>
                )}
                {step.mockup === 'generating' && (
                  <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
                    <div className="bg-bg-section px-4 py-2 flex items-center gap-2 border-b border-border">
                      <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-green-400" /></div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-text-muted text-center">logoai.jp/create</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <div className="flex-1"><div className="text-sm font-medium text-primary mb-1">日本語フォントを選択中...</div><div className="h-2 bg-bg-section rounded-full overflow-hidden"><div className="h-full bg-accent w-[65%] rounded-full" /></div></div>
                        <span className="text-sm font-bold text-accent">65%</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm flex items-center gap-2 text-green-600"><span>✓</span> 業種・業界データを分析</div>
                        <div className="text-sm flex items-center gap-2 text-green-600"><span>✓</span> イメージキーワードをベクター化</div>
                        <div className="text-sm flex items-center gap-2 text-primary font-medium"><span>▸</span> 日本語フォントを最適化中</div>
                        <div className="text-sm flex items-center gap-2 text-text-muted"><span>◦</span> カラーパレットを生成</div>
                        <div className="text-sm flex items-center gap-2 text-text-muted"><span>◦</span> 3案のデザインを仕上げ</div>
                      </div>
                    </div>
                  </div>
                )}
                {step.mockup === 'customize' && (
                  <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
                    <div className="bg-bg-section px-4 py-2 flex items-center gap-2 border-b border-border">
                      <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-green-400" /></div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-text-muted text-center">logoai.jp/create/customize</div>
                    </div>
                    <div className="p-6">
                      <div className="bg-white border border-border rounded-lg p-8 mb-4 flex flex-col items-center justify-center min-h-[160px]">
                        <span className="font-heading text-3xl font-bold text-primary tracking-wide">田中製果子</span>
                        <span className="text-xs text-gray-500 mt-1 tracking-widest">TANAKA SEIKA</span>
                        <div className="flex gap-2 mt-4"><button className="w-6 h-6 rounded-full border border-border bg-white ring-2 ring-primary" /><button className="w-6 h-6 rounded-full border border-border bg-gray-900" /><button className="w-6 h-6 rounded-full border border-border bg-[#F0EDE6]" /></div>
                      </div>
                      <div className="mb-3"><div className="text-xs text-text-muted mb-2">フォント</div><div className="flex gap-2 flex-wrap"><span className="text-xs px-3 py-1.5 bg-primary text-white rounded">游明朝体</span><span className="text-xs px-3 py-1.5 bg-bg-section text-text-muted border border-border rounded">ヒラギノ角ゴ</span></div></div>
                      <div><div className="text-xs text-text-muted mb-2">カラー</div><div className="flex gap-2"><button className="w-8 h-8 rounded-full bg-[#1A3A2A] ring-2 ring-offset-2 ring-primary" /><button className="w-8 h-8 rounded-full bg-[#C41E3A]" /><button className="w-8 h-8 rounded-full bg-[#D4AF37]" /><button className="w-8 h-8 rounded-full bg-[#2E8B57]" /></div></div>
                    </div>
                  </div>
                )}
                {step.mockup === 'complete' && (
                  <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
                    <div className="bg-bg-section px-4 py-2 flex items-center gap-2 border-b border-border">
                      <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-green-400" /></div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-text-muted text-center">logoai.jp/dashboard/logo-001</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div><div className="font-bold text-text-primary">ロゴが完了しました！</div></div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-3 p-2 border border-border rounded"><span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded">SVG</span><span className="flex-1 text-xs text-text-secondary">logo-tanaka.svg</span><span className="text-xs text-text-muted">48KB</span><button className="text-primary">↓</button></div>
                        <div className="flex items-center gap-3 p-2 border border-border rounded"><span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">PNG</span><span className="flex-1 text-xs text-text-secondary">logo-tanaka-300dpi.png</span><span className="text-xs text-text-muted">1.2MB</span><button className="text-primary">↓</button></div>
                        <div className="flex items-center gap-3 p-2 border border-border rounded"><span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-700 rounded">PDF</span><span className="flex-1 text-xs text-text-secondary">logo-tanaka-cmyk.pdf</span><span className="text-xs text-text-muted">280KB</span><button className="text-primary">↓</button></div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <span className="text-xl">📋</span>
                        <div className="flex-1"><div className="text-xs font-bold text-text-primary">著作権帰属証明書</div><div className="text-[10px] text-text-muted">cert-tanaka-2025-001.pdf</div></div>
                        <button className="text-xs bg-accent text-text-primary px-3 py-1.5 rounded font-medium">取得する</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Section 4: Mini FAQ */}
      <section className="py-16 md:py-20 px-6 bg-bg-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-accent font-medium text-sm tracking-[0.1em] uppercase block mb-3">よくある疑問</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">使い始める前の疑問を解消</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-[1000px] mx-auto mb-10">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-border rounded-xl p-6">
                <div className="font-bold text-text-primary mb-3 pl-5 relative"><span className="absolute left-0 text-accent font-number font-black">Q</span>{faq.q}</div>
                <div className="text-sm text-text-secondary leading-relaxed pl-5 relative"><span className="absolute left-0 text-primary font-number font-black">A</span>{faq.a}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/faq" className="inline-block border border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-full transition-all">全てのよくある質問を見る →</Link>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-16 md:py-20 px-6 bg-bg-base">
        <div className="max-w-[800px] mx-auto">
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/[0.05] rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">まず、ためしてみてください。</h2>
              <p className="text-text-secondary mb-8">入力から最初の3案生成まで無料・約4分。<br />気に入ったものが見つかれば、その時点で有料プランへ移行できます。</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/create" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">無料でロゴを作る →</Link>
                <Link href="/works" className="inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white font-medium px-8 py-4 rounded-full transition-all">生成事例を見る</Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-xs text-text-muted">
                <span className="flex items-center gap-1"><svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>クレジットカード不要</span>
                <span className="flex items-center gap-1"><svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>7日間全额返金保証</span>
                <span className="flex items-center gap-1"><svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>著作権完全帰属（有料プラン）</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
