'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(frontend)/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/(frontend)/components/ui/tabs'
import {
  ArrowRight, Building2, Coffee, Dumbbell, Home, Library, Music, 
  Palette, Users, Utensils, Sparkles, Heart, Calendar, Clock, 
  Star, Wifi, Shield, Wind, CheckCircle2
} from 'lucide-react'

export default function CampusClient({ settings, gallery }: { settings: any; gallery: any[] }) {
  const [activeTab, setActiveTab] = useState(settings?.facilities?.[0]?.category || 'Academic')

  const getIcon = (type: string) => {
    const icons: any = {
      users: Users, dumbbell: Dumbbell, heart: Heart, palette: Palette,
      library: Library, building: Building2, home: Home, utensils: Utensils,
      coffee: Coffee, music: Music, wifi: Wifi, shield: Shield, wind: Wind,
      calendar: Calendar, clock: Clock, star: Star,
    }
    return icons[type] || Building2
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }
  const staggerChildren: Variants = {
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
                Experience Campus Life at Prakash
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground"
            >
              Where Life <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">
                Happens.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              Step into a dynamic ecosystem designed for more than just studying. A space built for collaboration, wellness, and lifelong memories.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION (Glassmorphism overlapping Hero) */}
      <section className="relative -mt-16 z-20 mb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {settings?.stats?.map((stat: any, i: number) => {
              const Icon = getIcon(stat.iconType)
              return (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="glass-panel border-none rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <CardContent className="p-8 text-center relative">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div className="text-4xl font-black tracking-tighter mb-1 text-foreground">{stat.count}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. BENTO PHOTO GALLERY (Plain Background) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Campus <span className="text-primary italic">Canvas</span>
              </h2>
              <p className="text-muted-foreground text-lg font-medium">
                Glances of daily life across our serene campus.
              </p>
            </div>
            <Button
              variant="outline"
              asChild
              className="rounded-full px-8 py-6 border-2 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Link href="/gallery" className="flex items-center">
                Explore All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]"
          >
            {gallery?.slice(0, 5).map((img, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`relative group overflow-hidden rounded-[2rem] ${img.span || 'md:col-span-1'}`}
              >
                <Image
                  src={img.image.url}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-bold text-lg leading-tight">
                      {img.alt}
                    </p>
                    <div className="w-8 h-1 bg-secondary mt-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. AMENITIES (Deep Navy Background) */}
      <section className="py-32 bg-primary relative overflow-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Essential <span className="text-secondary italic">Comforts</span>
          </h2>
          <p className="text-primary-foreground/70 font-medium text-lg max-w-2xl mx-auto mb-20">
            We provide a supportive environment that caters to your academic, physical, and personal well-being.
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {settings?.amenities?.map((amenity: any, i: number) => {
              const Icon = getIcon(amenity.iconType)
              return (
                <motion.div key={i} variants={fadeInUp}>
                  <div className="group p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-secondary/50 transition-all duration-300 h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-white font-bold text-sm mb-2">
                      {amenity.label}
                    </div>
                    <div className="text-primary-foreground/60 text-[11px] font-medium leading-tight">
                      {amenity.description}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. FACILITIES TABS (Plain Background) */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Spaces of <span className="text-primary italic">Excellence</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Purpose-built environments for modern learners.
            </p>
          </div>

          <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-12">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-white/50 backdrop-blur-md p-2 rounded-2xl border border-white/40 shadow-sm h-auto">
                {settings?.facilities?.map((cat: any) => (
                  <TabsTrigger
                    key={cat.category}
                    value={cat.category}
                    className="rounded-xl px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold transition-all shadow-none data-[state=active]:shadow-md"
                  >
                    {cat.category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {settings?.facilities?.map((cat: any) => (
                <TabsContent key={cat.category} value={cat.category}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {cat.items.map((item: any, i: number) => {
                      const Icon = getIcon(item.iconType)
                      return (
                        <Card
                          key={i}
                          className="bg-card border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-[2rem] overflow-hidden"
                        >
                          <CardHeader className="p-8">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                              <Icon className="h-7 w-7 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-foreground leading-tight">
                              {item.name}
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground py-2 font-medium">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="px-8 pb-8">
                            <ul className="space-y-3">
                              {item.features?.map((f: any, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3 text-sm font-medium text-foreground"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                                  {f.feature}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

    </main>
  )
}