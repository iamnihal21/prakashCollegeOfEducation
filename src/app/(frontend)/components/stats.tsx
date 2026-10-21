'use client'

import { motion } from 'framer-motion'

export function Stats({ data }: { data?: any[] }) {
  if (!data || data.length === 0) return null

  // Dynamically adjust the grid layout based on the number of items
  // This ensures 3 items center perfectly, 4 items fill the row, etc.
  const gridCols =
    data.length === 3
      ? 'md:grid-cols-3'
      : data.length === 2
        ? 'md:grid-cols-2'
        : 'md:grid-cols-4'

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 mt-12">
      {/* Added max-w-5xl mx-auto to keep the cards grouped beautifully in the center */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6 max-w-5xl mx-auto`}>
        {data.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="text-4xl md:text-5xl font-black text-primary mb-3 drop-shadow-sm">
              {stat.value}
            </div>
            <div className="text-sm md:text-base font-bold text-foreground uppercase tracking-wide">
              {stat.label}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
              {stat.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}