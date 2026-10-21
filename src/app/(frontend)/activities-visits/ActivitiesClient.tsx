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
  Scale,
  Building2,
  Landmark,
  Microscope,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Shield,
} from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'
import Link from 'next/link'
import { Button } from '@/app/(frontend)/components/ui/button'
import ImageCarousel from '../components/ImageCarousel'

const ACTIVITY_STYLES: Record<string, { icon: any; color: string }> = {
  'Guest Lecture': { icon: Mic,        color: 'from-blue-500 to-cyan-500' },
  Seminar:         { icon: BookOpen,   color: 'from-purple-500 to-pink-500' },
  Workshop:        { icon: Sparkles,   color: 'from-amber-500 to-orange-500' },
  Conference:      { icon: Users,      color: 'from-green-500 to-emerald-500' },
  Cultural:        { icon: Sparkles,   color: 'from-pink-500 to-rose-500' },
  Sports:          { icon: Users,      color: 'from-orange-500 to-red-500' },
  'Legal Aid':     { icon: Scale,      color: 'from-emerald-500 to-teal-500' },
}

const VISIT_STYLES: Record<string, { icon: any; color: string }> = {
  'Vidhan Sabha':      { icon: Landmark,     color: 'from-blue-500 to-cyan-500' },
  'Central Jail':      { icon: Building2,    color: 'from-gray-600 to-slate-700' },
  'Forensic Lab':      { icon: Microscope,   color: 'from-purple-500 to-indigo-500' },
  'High Court':        { icon: Scale,        color: 'from-amber-500 to-orange-500' },
  'Human Rights':      { icon: Users,        color: 'from-red-500 to-rose-500' },
  'Anti Corruption':   { icon: CheckCircle2, color: 'from-green-500 to-emerald-500' },
  'Crime Branch':      { icon: Shield,       color: 'from-slate-700 to-gray-900' },
  'Legal Service Aid': { icon: Scale,        color: 'from-emerald-500 to-teal-500' },
}

// Helper — flatten `image` + `images[]` into one deduped list
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
  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: actRef, isInView: actInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { ref: visitRef, isInView: visitInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  }
  const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  return (
    <main className="min-h-screen bg-white text-gray-950">
      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-gradient-to-b from-secondary via-orange-300 to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[1000px] h-[600px] bg-white/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-8 border border-gray-200 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Beyond the Classroom
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              Learning <br />
              <span className="text-primary italic">By Doing.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-700 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              From seminars with distinguished jurists to immersive visits at India&rsquo;s legal
              institutions — our students learn law where it actually happens.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= ACTIVITIES ================= */}
      {activities?.length > 0 && (
        <section className="py-24 bg-white" id="activities">
          <div ref={actRef} className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={actInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-primary" />
                <span>Section 01 — Activities</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Seminars, Talks &amp; <span className="text-primary italic">Workshops.</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={actInView ? 'visible' : 'hidden'}
              variants={staggerChildren}
              className="grid md:grid-cols-2 gap-10"
            >
              {activities.map((item: any) => {
                const style = ACTIVITY_STYLES[item.type] || ACTIVITY_STYLES['Seminar']
                const Icon = style.icon
                const images = collectImages(item)

                return (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Card className="group h-full bg-white rounded-[2.5rem] border-2 border-gray-100 hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                      {/* ===== Single image carousel ===== */}
                      <div className="p-6 pb-0">
                        <div className="relative">
                          <ImageCarousel
                            images={images}
                            title={item.title}
                            className="aspect-[16/9] max-h-[380px]"
                          />
                          {/* Type badge floating over the image */}
                          <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                            <div
                              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center shadow-lg`}
                            >
                              <Icon className="h-4.5 w-4.5 text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white bg-gray-950/50 backdrop-blur-md px-3 py-1 rounded-full">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ===== Text block ===== */}
                      <CardHeader className="p-8 pt-6">
                        <CardTitle className="text-2xl font-black mb-3 tracking-tight group-hover:text-primary transition-colors leading-tight">
                          {item.title}
                        </CardTitle>

                        {item.speaker && (
                          <div className="mb-4">
                            <div className="text-[10px] font-black uppercase tracking-widest text-primary">
                              Speaker
                            </div>
                            <div className="font-bold text-gray-900">{item.speaker}</div>
                            {item.speakerTitle && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                {item.speakerTitle}
                              </div>
                            )}
                          </div>
                        )}

                        <CardDescription className="text-base text-gray-500 font-medium leading-relaxed">
                          {item.description}
                        </CardDescription>

                        <div className="flex flex-wrap items-center gap-3 pt-4 text-xs mt-auto">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            <span className="font-bold">{item.date}</span>
                          </span>
                          {item.venue && (
                            <span className="flex items-center gap-1.5 text-gray-600">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              <span className="font-medium">{item.venue}</span>
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

      {/* ================= VISITS ================= */}
      {visits?.length > 0 && (
        <section className="py-32 bg-gray-950 relative overflow-hidden" id="visits">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <div ref={visitRef} className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visitInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 text-secondary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-secondary" />
                <span>Section 02 — Educational Visits</span>
                <div className="w-8 h-[2px] bg-secondary" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Where Law <span className="text-secondary italic">Comes Alive.</span>
              </h2>
              <p className="text-gray-400 font-medium mt-4 max-w-2xl mx-auto">
                First-hand exposure to India&rsquo;s legal and civic institutions — from the
                legislative floor to the forensic lab.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={visitInView ? 'visible' : 'hidden'}
              variants={staggerChildren}
              className="grid md:grid-cols-2 gap-10"
            >
              {visits.map((item: any) => {
                const style = VISIT_STYLES[item.destination] || VISIT_STYLES['Vidhan Sabha']
                const Icon = style.icon
                const images = collectImages(item)

                return (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Card className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group hover:bg-white/10 hover:border-secondary/50 transition-all duration-500 h-full flex flex-col">
                      {/* ===== Single image carousel ===== */}
                      <div className="p-6 pb-0">
                        <div className="relative">
                          <ImageCarousel
                            images={images}
                            title={item.title}
                            className="aspect-[16/9] max-h-[380px]"
                          />

                          {/* Destination badge floating over image */}
                          <div className="absolute top-3 left-3 flex items-center gap-3 pointer-events-none">
                            <div
                              className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${style.color} flex items-center justify-center shadow-lg`}
                            >
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary drop-shadow">
                                {item.destination}
                              </div>
                              <div className="text-white font-black text-sm drop-shadow">
                                {item.location || 'Visit'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ===== Text block ===== */}
                      <CardContent className="p-8 pt-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-black text-white mb-3 group-hover:text-secondary transition-colors leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-gray-400 font-medium leading-relaxed mb-6">
                          {item.description}
                        </p>

                        {item.learnings?.length > 0 && (
                          <div className="pt-6 border-t border-white/10 mb-6">
                            <div className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3">
                              Key Learnings
                            </div>
                            <ul className="space-y-2">
                              {item.learnings.map((l: any, i: number) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-white/80"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                                  <span>{l.point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 text-xs mt-auto">
                          <span className="flex items-center gap-1.5 text-gray-400">
                            <Calendar className="h-3.5 w-3.5 text-secondary" />
                            <span className="font-bold text-white/90">{item.date}</span>
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

      {/* ================= CTA ================= */}
      <section className="py-32 bg-gradient-to-b from-white to-secondary/20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-950 border border-white/10 rounded-[4rem] overflow-hidden">
              <CardContent className="p-12 md:p-24 text-center">
                <div className="w-20 h-20 rounded-3xl bg-secondary/20 flex items-center justify-center mx-auto mb-10 border border-secondary/30">
                  <GraduationCap className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-none">
                  Be Part of It.
                </h3>
                <p className="text-gray-400 font-medium text-lg mb-12 max-w-xl mx-auto">
                  Every Prakash student experiences these activities and visits.
                </p>
                <Button
                  asChild
                  className="h-16 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-primary/40"
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