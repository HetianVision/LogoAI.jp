import Link from 'next/link'
import { motion } from 'framer-motion'

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
        <motion.h2
          className="font-heading text-4xl md:text-5xl font-bold text-text-inverse mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}  
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <motion.p 
          className="text-text-inverse/80 text-lg mb-8 max-w-[500px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {description}
        </motion.p>
        
        <motion.a
          href="/create"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-text-primary font-bold text-lg px-10 py-5 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          無料でロゴを作る
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </div>
    </section>
  )
}
