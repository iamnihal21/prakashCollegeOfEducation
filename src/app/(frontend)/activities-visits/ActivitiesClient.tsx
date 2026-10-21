'use client'

import { motion, type Variants } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(frontend)/components/ui/card'
import {
  Mic,
  Users,
  Calendar,
  MapPin,
  Sparkles,
  GraduationCap,
  Building2,
  Microscope,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  School,
  Palette,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/app/(frontend)/components/ui/button'
import ImageCarousel from '../components/ImageCarousel'

// Modern Activity Styles mapped to Brand Colors
const ACTIVITY_STYLES: Record<string, { icon: any; color: string }> = {
  'Guest Lecture': { icon: Mic,        color: 'from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.7)]' }, // Navy
  Seminar:         { icon: BookOpen,   color: 'from-[hsl(var(--accent))] to-[hsl(var(--accent)/0.7)]' },     // Red
  Workshop:        { icon: Sparkles,   color: 'from-[hsl(var(--secondary))] to-[hsl(var(--secondary)/0.7)]' },// Gold
  Conference:      { icon: Users,      color: 'from-[hsl(var(--brand-green))] to-[hsl(var(--brand-green)/0.7)]' }, // Green
  Cultural:        { icon: Palette,    color: 'from-[hsl(var(--accent))] to-[hsl(var(--secondary))]' },
  Sports:          { icon: Users,      color: 'from-[hsl(var(--primary))] to-[hsl(var(--brand-green))]' },
}

// Modern Visit Styles mapped to Education
const VISIT_STYLES: Record<string, { icon: any; color: string }> = {
  'Primary School':   { icon: School,     color: 'from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.7)]' },
  'Special Education':{ icon: Users,      color: 'from-[hsl(var(--accent))] to-[hsl(var(--accent)/0.7)]' },
  'ICT Lab':          { icon: Microscope, color: 'from-[hsl(var(--secondary))] to-[hsl(var(--secondary)/0.7)]' },
  'Default':          { icon: Building2,  color: 'from-[hsl(var(--brand-green))] to-[hsl(var(--brand-green)/0.7)]' },
}

function collectImages(item: any): { url: string; alt: string }[] {
  const out: { url: string; alt: string }[] = []
  if (item?.image?.url) {
    out.push({ url: item.image.url, alt: item.image.alt || item.title })
  }
  if (Array.isArray(item?.images)) {
    item.images.forEach((row: any) => {
      const img = row?.image
      if (img?.url && !out.find((o) => o.url === img.url)) {
        out.push({ url: img.url, alt: img.alt || item.title })
      }
    })
  }
  return out
}

export default function ActivitiesClient({
  activities,
  visits,
}: {
  activities: any[]
  visits: any[]
}) {
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
      
      {/* ================= 1. HERO (Mesh Gradient) ================= */}
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
                Beyond the Classroom
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground"
            >
              Learning <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">
                By Doing.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              From interactive seminars with distinguished educators to immersive field visits at modern schools — our student-teachers learn where education actually happens.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. ACTIVITIES (Plain Background) ================= */}
      {activities?.length > 0 && (
        <section className="py-24 bg-white" id="activities">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-primary" />
                <span>Section 01 — Activities</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Seminars, Talks &amp; <span className="text-primary italic">Workshops</span>
              </h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid md:grid-cols-2 gap-8"
            >
              {activities.map((item: any) => {
                const style = ACTIVITY_STYLES[item.type] || ACTIVITY_STYLES['Seminar']
                const Icon = style.icon
                const images = collectImages(item)

                return (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Card className="group h-full bg-card rounded-[2rem] border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col">
                      
                      {/* Image */}
                      <div className="p-4 pb-0">
                        <div className="relative rounded-2xl overflow-hidden">
                          <ImageCarousel
                            images={images}
                            title={item.title}
                            className="aspect-[16/9] max-h-[380px]"
                          />
                          {/* Badge */}
                          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center shadow-lg`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <CardHeader className="p-6 sm:p-8 pt-6 flex-1 flex flex-col">
                        <CardTitle className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors leading-tight text-foreground">
                          {item.title}
                        </CardTitle>

                        {item.speaker && (
                          <div className="mb-4 bg-muted/50 p-3 rounded-xl inline-block">
                            <div className="text-[10px] font-black uppercase tracking-widest text-accent">
                              Speaker
                            </div>
                            <div className="font-bold text-foreground">{item.speaker}</div>
                            {item.speakerTitle && (
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {item.speakerTitle}
                              </div>
                            )}
                          </div>
                        )}

                        <CardDescription className="text-base text-muted-foreground font-medium leading-relaxed mb-6">
                          {item.description}
                        </CardDescription>

                        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50 text-sm mt-auto">
                          <span className="flex items-center gap-1.5 text-foreground font-medium">
                            <Calendar className="h-4 w-4 text-primary" />
                            {item.date}
                          </span>
                          {item.venue && (
                            <span className="flex items-center gap-1.5 text-foreground font-medium">
                              <MapPin className="h-4 w-4 text-primary" />
                              {item.venue}
                            </span>
                          )}
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= 3. VISITS (Deep Navy Background) ================= */}
      {visits?.length > 0 && (
        <section className="py-32 bg-primary relative overflow-hidden" id="visits">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 text-secondary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-secondary" />
                <span>Section 02 — Educational Visits</span>
                <div className="w-8 h-[2px] bg-secondary" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                Where Learning <span className="text-secondary italic">Comes Alive</span>
              </h2>
              <p className="text-primary-foreground/70 font-medium mt-4 max-w-2xl mx-auto text-lg">
                First-hand exposure to modern classrooms, special education centers, and educational technology hubs.
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid md:grid-cols-2 gap-8"
            >
              {visits.map((item: any) => {
                // Fallback to Default if the specific string doesn't match
                const style = VISIT_STYLES[item.destination] || VISIT_STYLES['Default']
                const Icon = style.icon
                const images = collectImages(item)

                return (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden group hover:bg-white/10 hover:border-secondary/50 transition-all duration-500 h-full flex flex-col">
                      
                      {/* Image */}
                      <div className="p-4 pb-0">
                        <div className="relative rounded-2xl overflow-hidden">
                          <ImageCarousel
                            images={images}
                            title={item.title}
                            className="aspect-[16/9] max-h-[380px]"
                          />
                          {/* Badge */}
                          <div className="absolute top-4 left-4 flex items-center gap-3 pointer-events-none z-10">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center shadow-lg`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary drop-shadow">
                                {item.destination}
                              </div>
                              <div className="text-white font-bold text-sm drop-shadow">
                                {item.location || 'Field Visit'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 sm:p-8 pt-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-primary-foreground/70 font-medium leading-relaxed mb-6">
                          {item.description}
                        </p>

                        {item.learnings?.length > 0 && (
                          <div className="pt-6 border-t border-white/10 mb-6">
                            <div className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3">
                              Key Learnings
                            </div>
                            <ul className="space-y-3">
                              {item.learnings.map((l: any, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                                  <span className="font-medium leading-tight pt-0.5">{l.point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 text-sm mt-auto pt-4">
                          <span className="flex items-center gap-2 text-primary-foreground/60">
                            <Calendar className="h-4 w-4 text-secondary" />
                            <span className="font-bold text-white">{item.date}</span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= 4. CTA (Mesh Gradient Background) ================= */}
      <section className="py-24 bg-mesh-gradient border-t border-border/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="glass-panel border-none rounded-[3rem] overflow-hidden shadow-2xl">
              <CardContent className="p-12 md:p-20 text-center">
                <div className="w-20 h-20 rounded-3xl bg-secondary/20 flex items-center justify-center mx-auto mb-10 border border-secondary/30">
                  <GraduationCap className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter mb-6 leading-none">
                  Be Part of It.
                </h3>
                <p className="text-muted-foreground font-medium text-lg mb-10 max-w-xl mx-auto">
                  Every Prakash student-teacher experiences these activities and visits. Join us to begin your journey.
                </p>
                <Button
                  asChild
                  className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                  <Link href="/admissions">
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

    </main>
  )
}