'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export function Testimonials({ data }: { data?: any[] }) {
  if (!data || data.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Voices of <span className="text-primary">Prakash</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-8 rounded-3xl relative"
          >
            <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
            <p className="text-foreground leading-relaxed italic mb-6">&quot;{item.quote}&quot;</p>
            <div>
              <p className="font-bold text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}