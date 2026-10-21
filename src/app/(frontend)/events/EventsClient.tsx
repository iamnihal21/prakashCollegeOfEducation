'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import ImageCarousel from '../components/ImageCarousel'
import Image from 'next/image'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/app/(frontend)/components/ui/card'
import {
  Calendar, MapPin, Clock, Music, Microscope, Trophy, 
  Laptop, Palette, Sparkles, X
} from 'lucide-react'

export default function EventsClient({ eventsData }: { eventsData: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)

  const getIcon = (type: string) => {
    const icons: any = {
      laptop: Laptop,
      music: Music,
      microscope: Microscope,
      trophy: Trophy,
      palette: Palette,
    }
    return icons[type] || Calendar
  }

  const categories = ['All', 'Academic', 'Cultural', 'Sports']
  const filteredEvents =
    selectedCategory === 'All'
      ? eventsData
      : eventsData.filter((event) => event.category === selectedCategory)

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
                Events at Prakash
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground"
            >
              Upcoming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">
                Events.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              Join us for academic conferences, cultural festivals, sports meets, and more.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER NAVIGATION */}
      <section className="relative -mt-10 z-20 mb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              variant="ghost"
              className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md scale-105'
                  : 'bg-white/80 backdrop-blur-md text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border/50'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* 3. EVENTS GRID (Plain Background) */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              variants={staggerChildren}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEvents.map((event) => {
                const Icon = getIcon(event.iconType)
                return (
                  <motion.div
                    key={event.id}
                    variants={fadeInUp}
                    onClick={() => setSelectedEvent(event)}
                    className="cursor-pointer group"
                  >
                    <Card className="bg-card border-border/50 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full flex flex-col rounded-[2rem]">
                      
                      {/* Cover Image */}
                      {event.image?.url ? (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={event.image.url}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                            {event.category}
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                              <Icon className="h-6 w-6 text-primary-foreground" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`h-40 bg-gradient-to-br ${event.color} relative`}>
                          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                            {event.category}
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                      )}

                      <CardHeader className="p-6 sm:p-8 flex-grow">
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-2">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-muted-foreground font-medium">
                          {event.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="px-6 sm:px-8 pb-8 space-y-3 mt-auto">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary" /> {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary" /> {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" /> {event.location}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. EVENT DETAILS MODAL (Glassmorphism) */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <Card className="bg-background border-none shadow-2xl overflow-hidden rounded-[2.5rem] relative">
                
                {/* Modal Header Gradient */}
                <div className={`h-32 bg-gradient-to-br ${selectedEvent.color || 'from-primary to-accent'} relative p-6`}>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-all z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute -bottom-6 left-8">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                      {(() => {
                        const Icon = getIcon(selectedEvent.iconType)
                        return <Icon className="h-8 w-8 text-primary" />
                      })()}
                    </div>
                  </div>
                </div>

                <CardHeader className="px-8 pt-10 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {selectedEvent.category}
                    </span>
                  </div>
                  <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
                    {selectedEvent.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-8 pb-8 space-y-6">
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {selectedEvent.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 bg-muted/50 p-5 rounded-2xl">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Date</p>
                      <p className="font-bold text-foreground">{selectedEvent.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                      <p className="font-bold text-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>

                  {selectedEvent.registrationDeadline && (
                    <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-secondary-foreground mb-1">Registration Deadline</p>
                        <p className="text-lg font-black text-secondary-foreground">{selectedEvent.registrationDeadline}</p>
                      </div>
                      <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl font-bold">
                        Register Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}