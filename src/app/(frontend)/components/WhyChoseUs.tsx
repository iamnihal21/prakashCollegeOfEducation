'use client'

import { motion } from 'framer-motion'
import { Building2, Sparkles, Briefcase, ShieldCheck, Users, Cpu, MapPin, Wind } from 'lucide-react'

const iconMap: Record<string, any> = {
  Building: Building2, Sparkles: Sparkles, Briefcase: Briefcase, ShieldCheck: ShieldCheck,
  Users: Users, Cpu: Cpu, MapPin: MapPin, Wind: Wind,
}

export function WhyChooseUs({ data }: { data?: any[] }) {
  if (!data || data.length === 0) return null

  return (
    <section className="py-24 relative max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Why Choose <span className="text-primary">Prakash?</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          We provide an environment that nurtures not just academic excellence, but the holistic development of every future educator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, idx) => {
          const Icon = iconMap[item.icon_type] || Sparkles
          const isLarge = idx === 0 || idx === 3
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`
                group relative overflow-hidden rounded-3xl p-8 bg-card border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300
                ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}