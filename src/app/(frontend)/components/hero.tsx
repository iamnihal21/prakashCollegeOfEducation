'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero({ data }: { data?: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Fallback data if DB is empty
  const slides = data && data.length > 0 ? data : [
    {
      title: 'Welcome to',
      highlight: 'Prakash College',
      subtitle: 'Shaping Future Educators Since 1961',
      description: 'A professional teacher-education institution committed to preparing competent, responsible and value-oriented teachers.',
      image: { url: 'https://cdccpcxdjfarbhfbuwqx.supabase.co/storage/v1/object/public/prakashCollegeOfEducation/campus.webp' }
    }
  ]

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 6000) // 6 seconds per slide
    return () => clearInterval(timer)
  }, [slides.length])

  const active = slides[currentSlide]

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Animated Text */}
          <div className="max-w-2xl min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {active.subtitle}
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                  {active.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                    {active.highlight}
                  </span>
                </h1>
                
                <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 text-base h-14 px-8" asChild>
                <Link href="/admissions">
                  Apply for B.Ed 2026 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-2 bg-white/50 backdrop-blur" asChild>
                <Link href="/aboutus">Discover Our Legacy</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right: Moving Images */}
          <div className="relative lg:ml-auto w-full max-w-lg mx-auto lg:max-w-none aspect-[4/5] lg:aspect-square">
            {/* Decorative Frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2.5rem] rotate-3 scale-105 opacity-20 blur-sm" />
            
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10 bg-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image?.url || 'https://cdccpcxdjfarbhfbuwqx.supabase.co/storage/v1/object/public/prakashCollegeOfEducation/campus.webp'}
                    alt="Campus"
                    fill
                    className="object-cover ken-burns" // Adds the slow moving zoom effect
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Glass Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl flex items-center justify-between z-20">
                <div>
                  <p className="text-sm font-bold text-foreground">NCTE Recognized</p>
                  <p className="text-xs text-muted-foreground">Sanctioned Intake: 50</p>
                </div>
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-brand-green/30">
                  ✓
                </div>
              </div>
            </div>
            
            {/* Slider Dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-primary' : 'bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}