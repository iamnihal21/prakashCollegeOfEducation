'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(frontend)/components/ui/card'
import {
  Trophy,
  Award,
  Scale,
  Gavel,
  Users,
  Target,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  BookOpen,
  Mic,
  Briefcase,
  Star,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'
import Link from 'next/link'

export default function MootCourtClient({ data }: { data: any }) {
  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: aboutRef, isInView: aboutInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { ref: eventsRef, isInView: eventsInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { ref: achRef, isInView: achInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { ref: facRef, isInView: facInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getIcon = (type: string) => {
    const icons: any = {
      trophy: Trophy,
      award: Award,
      scale: Scale,
      gavel: Gavel,
      users: Users,
      target: Target,
      book: BookOpen,
      mic: Mic,
      briefcase: Briefcase,
      star: Star,
      check: CheckCircle2,
    }
    return icons[type] || Gavel
  }

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
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }

  return (
    <main className="min-h-screen bg-white text-gray-950">
      {/* ---------------- HERO ---------------- */}
      <section className="relative pt-40 pb-24 overflow-hidden hero-gradient">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[1000px] h-[600px] bg-white/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
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
              <Gavel className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {data?.heroBadge || 'Moot Court Society'}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              {data?.heroTitle || 'Master the Art of'} <br />
              <span className="text-primary italic">{data?.heroHighlight || 'Advocacy.'}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              {data?.heroDescription ||
                'Moot court is where legal theory meets courtroom practice. Our students argue, rebut, and persuade — preparing to lead in real courtrooms across the nation.'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      {data?.stats?.length > 0 && (
        <section className="relative -mt-12 z-10 mb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {data.stats.map((stat: any, i: number) => {
                const Icon = getIcon(stat.iconType)
                return (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="bg-white/80 backdrop-blur-xl border-none shadow-2xl rounded-[2.5rem] group hover:bg-white transition-all duration-500">
                      <CardContent className="p-8 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="text-4xl font-black tracking-tighter mb-1">
                          {stat.value}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
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
      )}
      {/* ================= GALLERY ================= */}
      {data?.galleryImages?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-primary" />
                <span>From the Courtroom</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Moments of <span className="text-primary italic">Advocacy.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {data.galleryImages.map((row: any, i: number) => {
                const img = row.image
                if (!img?.url) return null
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group"
                  >
                    <Image
                      src={img.url}
                      alt={row.caption || `Moot Court photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {row.caption && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-4 left-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <p className="text-white font-black text-sm uppercase tracking-widest">
                            {row.caption}
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}
      {/* ---------------- ABOUT ---------------- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={aboutRef} className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-primary" />
                <span>About the Society</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {data?.aboutTitle || 'More Than a Competition'}
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium mb-8">
                {data?.aboutDescription ||
                  'Moot court at Prakash COllege Of educationis a rigorous simulation of appellate advocacy. Students research, draft memorials, and present oral arguments before panels of judges — honing skills that no classroom alone can teach.'}
              </p>
            </motion.div>

            {/* RIGHT: Points panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              {/* Accent blob */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent rounded-[3rem] blur-2xl" />

              <div className="relative bg-gradient-to-br from-gray-950 to-primary rounded-[3rem] p-10 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <Gavel className="w-6 h-6 text-secondary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary">
                    What You Gain
                  </span>
                </div>

                <ul className="space-y-5">
                  {data?.aboutPoints?.map((p: any, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-secondary group-hover:border-secondary transition-all">
                        <CheckCircle2 className="w-3.5 h-3.5 text-secondary group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-white/90 font-medium leading-snug pt-0.5">
                        {p.point}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- UPCOMING COMPETITIONS ---------------- */}
      {data?.upcomingCompetitions?.length > 0 && (
        <section className="py-24 bg-secondary/20">
          <div ref={eventsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={eventsInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-primary" />
                <span>Upcoming</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Competitions <span className="text-primary italic">Ahead.</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={eventsInView ? 'visible' : 'hidden'}
              variants={staggerChildren}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {data.upcomingCompetitions.map((ev: any, i: number) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="group h-full bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:border-primary/20">
                    <div
                      className={`h-2 bg-gradient-to-r ${ev.color || 'from-blue-500 to-cyan-500'}`}
                    />
                    <CardHeader className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ev.color || 'from-blue-500 to-cyan-500'} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}
                        >
                          <Gavel className="h-7 w-7 text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                          {ev.category}
                        </span>
                      </div>
                      <CardTitle className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight">
                        {ev.title}
                      </CardTitle>
                      <CardDescription className="text-base text-gray-500 line-clamp-3 font-medium mb-6">
                        {ev.description}
                      </CardDescription>

                      <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-bold">{ev.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">{ev.venue}</span>
                        </div>
                        {ev.deadline && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">Register by {ev.deadline}</span>
                          </div>
                        )}
                        {ev.prize && (
                          <div className="flex items-center gap-2 text-sm">
                            <Trophy className="h-4 w-4 text-accent" />
                            <span className="font-bold text-primary">{ev.prize}</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ---------------- ACHIEVEMENTS / HALL OF FAME ---------------- */}
      {data?.achievements?.length > 0 && (
        <section className="py-32 bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div ref={achRef} className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={achInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Hall of <span className="text-secondary italic">Fame.</span>
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            </motion.div>

            <motion.div
              initial="hidden"
              animate={achInView ? 'visible' : 'hidden'}
              variants={staggerChildren}
              className="grid md:grid-cols-2 gap-6"
            >
              {data.achievements.map((ach: any, i: number) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group hover:bg-white/10 hover:border-secondary/50 transition-all duration-500 h-full">
                    <CardContent className="p-8 flex items-start gap-6">
                      <div className="w-20 h-20 rounded-3xl bg-secondary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Trophy className="h-10 w-10 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-secondary">
                            {ach.year}
                          </span>
                          <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2 group-hover:text-secondary transition-colors leading-tight">
                          {ach.competition}
                        </h3>
                        <p className="text-secondary font-black text-sm uppercase tracking-wider mb-3">
                          {ach.position}
                        </p>
                        {ach.participants && (
                          <p className="text-white/60 text-sm font-medium mb-2">
                            {ach.participants}
                          </p>
                        )}
                        {ach.description && (
                          <p className="text-gray-400 text-sm font-medium leading-relaxed">
                            {ach.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ---------------- FACILITIES ---------------- */}
      {data?.facilities?.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div ref={facRef} className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={facInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-primary" />
                <span>Infrastructure</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Built for <span className="text-primary italic">Advocacy.</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={facInView ? 'visible' : 'hidden'}
              variants={staggerChildren}
              className="grid md:grid-cols-3 gap-8"
            >
              {data.facilities.map((fac: any, i: number) => {
                const Icon = getIcon(fac.iconType)
                return (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="bg-white border-2 border-transparent hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[3rem] overflow-hidden h-full">
                      <CardHeader className="p-8">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-black tracking-tight leading-tight mb-2">
                          {fac.name}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-500 font-medium">
                          {fac.description}
                        </CardDescription>
                      </CardHeader>
                      {fac.features?.length > 0 && (
                        <CardContent className="px-8 pb-8">
                          <ul className="space-y-3">
                            {fac.features.map((f: any, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-center gap-3 text-xs font-bold text-gray-700"
                              >
                                <div className="w-2 h-2 rounded-full bg-primary/20 border-2 border-primary" />
                                {f.feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ---------------- CTA ---------------- */}
      <section className="py-32 bg-gradient-to-b to-background from-secondary/20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-950 border border-white/10 rounded-[4rem] overflow-hidden">
              <CardContent className="p-12 md:p-24 text-center">
                <div className="w-20 h-20 rounded-3xl bg-secondary/20 flex items-center justify-center mx-auto mb-10 border border-secondary/30">
                  <Sparkles className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-none">
                  Ready to Argue?
                </h3>
                <p className="text-gray-400 font-medium text-lg mb-12 max-w-xl mx-auto">
                  Join the Moot Court Society and represent Prakash COllege Of educationon the national
                  stage.
                </p>
                <Button
                  asChild
                  className="h-16 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-primary/40"
                >
                  <Link href="/contact">
                    Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
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
