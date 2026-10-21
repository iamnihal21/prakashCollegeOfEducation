'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Card } from '@/app/(frontend)/components/ui/card'
import {
  X,
  Building2,
  Trophy,
  PartyPopper,
  Maximize2,
  Calendar,
  LayoutGrid,
  Sparkles,
} from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Archives', icon: LayoutGrid },
  { id: 'infrastructure', label: 'Architecture', icon: Building2 },
  { id: 'events', label: 'Campus Life', icon: PartyPopper },
  { id: 'achievements', label: 'Milestones', icon: Trophy },
]

export default function GalleryClient({ items }: { items: any[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<any | null>(null)

  const filteredItems =
    activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory)

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-white">
      
      {/* 1. HERO SECTION (Mesh Gradient) */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-mesh-gradient">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Visual Narrative
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground"
            >
              Capture the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">
                Legacy.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              A curated collection of snapshots defining our journey, from state-of-the-art labs to vibrant campus festivities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER NAVIGATION (Sticky Glass Panel) */}
      <nav className="sticky top-[88px] z-40 bg-background/80 backdrop-blur-xl border-y border-border/50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary-foreground' : ''}`} />
                {cat.label}
              </button>
            )
          })}
        </div>
      </nav>

      {/* 3. GALLERY GRID (Masonry Style) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              variants={staggerChildren}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  onClick={() => setSelectedImage(item)}
                  className="relative break-inside-avoid group cursor-pointer"
                >
                  <Card className="overflow-hidden border-border/50 rounded-[2rem] bg-muted shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.image.url}
                        alt={item.alt}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 sm:p-8">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-[9px] font-black uppercase tracking-widest">
                              {item.category}
                            </span>
                            <div className="h-px flex-grow bg-white/20" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 leading-none">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest mt-2">
                            <Calendar className="w-3.5 h-3.5" /> {item.date}
                          </div>
                        </div>

                        <div className="absolute top-6 right-6">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. LIGHTBOX MODAL (Glassmorphism) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-5xl w-full h-full max-h-[90vh] flex flex-col justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-grow w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black/50">
                <Image
                  src={selectedImage.image.url}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-8 text-center max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="h-px w-8 bg-secondary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
                    {selectedImage.category}
                  </span>
                  <div className="h-px w-8 bg-secondary" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                  {selectedImage.title}
                </h2>
                <p className="text-white/70 text-sm sm:text-base font-medium leading-relaxed">
                  {selectedImage.description}
                </p>
                <div className="mt-4 text-white/40 text-[10px] font-black uppercase tracking-widest">
                  Archived on {selectedImage.date}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}