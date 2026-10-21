'use client'

import { motion, type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/app/(frontend)/components/ui/card'
import {
  GraduationCap, Building2, Award, Users, Briefcase, ShieldCheck,
  Quote, CheckCircle2, ArrowRight, Sparkles
} from 'lucide-react'
import Link from 'next/link'

const statIcons: Record<string, any> = {
  graduation: GraduationCap,
  building: Building2,
  award: Award,
  users: Users,
}

const highlightIcons: Record<string, any> = {
  briefcase: Briefcase,
  award: Award,
  shield: ShieldCheck,
  users: Users,
}

export default function PlacementsClient({ data }: { data: any }) {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
          <motion.div initial="hidden" animate="visible" variants={staggerChildren} className="max-w-4xl">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                {data?.hero?.highlight || 'UDISHA Placement Cell'}
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground">
              {data?.hero?.title || 'Launching'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">
                Careers.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
              {data?.hero?.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION (Overlapping Hero) */}
      <section className="relative -mt-16 z-20 mb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerChildren} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data?.stats?.map((stat: any, i: number) => {
              const Icon = statIcons[stat.iconType] || Award
              return (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="glass-panel border-none rounded-3xl p-6 text-center group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. UDISHA HIGHLIGHTS (Bento Box) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              How UDISHA <span className="text-accent italic">Prepares You</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide comprehensive training and placement support to ensure you step into the education sector with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.highlights?.map((item: any, i: number) => {
              const Icon = highlightIcons[item.iconType] || Briefcase
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Card className="h-full bg-card border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 rounded-[2rem] p-8 group">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-secondary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. RECRUITERS MARQUEE (Deep Navy Background) */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Our Top <span className="text-secondary italic">Recruiters</span>
          </h2>
          <p className="text-primary-foreground/70 font-medium mt-2">Where our student-teachers are shaping the future.</p>
        </div>

        {/* Custom Marquee Effect */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-4 py-4">
            {data?.recruiters?.map((rec: any, i: number) => (
              <div key={i} className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-4 hover:bg-white/10 transition-colors">
                <Building2 className="w-6 h-6 text-secondary" />
                <div>
                  <p className="text-white font-bold text-lg">{rec.name}</p>
                  {rec.type && <p className="text-primary-foreground/50 text-xs">{rec.type}</p>}
                </div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {data?.recruiters?.map((rec: any, i: number) => (
              <div key={`dup-${i}`} className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-4 hover:bg-white/10 transition-colors">
                <Building2 className="w-6 h-6 text-secondary" />
                <div>
                  <p className="text-white font-bold text-lg">{rec.name}</p>
                  {rec.type && <p className="text-primary-foreground/50 text-xs">{rec.type}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 bg-mesh-gradient border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Success <span className="text-primary italic">Stories</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data?.testimonials?.map((t: any, i: number) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Card className="glass-panel border-none rounded-[2rem] p-8 sm:p-10 relative overflow-hidden h-full">
                  <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/10 rotate-12" />
                  <p className="text-lg font-medium leading-relaxed text-foreground italic mb-6 relative z-10">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{t.name}</p>
                      <p className="text-xs text-accent font-bold uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Start Teaching?</h2>
          <p className="text-muted-foreground text-lg mb-8">Join Prakash College of Education and let UDISHA launch your career.</p>
          <Button size="lg" className="rounded-full h-14 px-10 text-base shadow-xl shadow-primary/20" asChild>
            <Link href="/admissions">Apply for B.Ed <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Marquee Keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </main>
  )
}