import Link from 'next/link'

interface BottomCTAProps {
  title: string
  description: string
}

export default function BottomCTA({ title, description }: BottomCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent-light rounded-full blur-3xl" />
      </div>

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <h2
          className="font-heading text-4xl md:text-5xl font-bold text-text-inverse mb-6"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="text-text-inverse/80 text-lg mb-8 max-w-[500px] mx-auto">
          {description}
        </p>
        <Link href="/create" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-text-primary font-bold text-lg px-10 py-5 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg">
          無料でロゴを作る
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
