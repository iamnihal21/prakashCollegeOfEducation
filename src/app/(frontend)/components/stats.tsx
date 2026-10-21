'use client'

import { motion } from 'framer-motion'

export function Stats({ data }: { data?: any[] }) {
  if (!data || data.length === 0) return null

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 mt-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="text-3xl md:text-4xl font-black text-primary mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-bold text-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}