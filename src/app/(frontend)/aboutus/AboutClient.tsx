'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import {
  Sparkles, Eye, Target, Users, Quote, BookOpen, 
  GraduationCap, Globe, Award, Building2, CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/(frontend)/components/ui/card'

export default function AboutClient({ data }: { data: any }) {
  // Use DB data with fallbacks
  const hero = data?.hero || { year: '1961', description: 'Discover a legacy of excellence...' }
  const visionMission = data?.visionMission || {
    vision: { description: '', points: [] },
    mission: { description: '', points: [] },
  }
  const trustees = data?.trustees || []
  const faculty = data?.faculty || {}

  // Animation Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <main className="min-h-screen bg-background">
      
      {/* 1. HERO SECTION (With Mesh Gradient) */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-mesh-gradient">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                About Prakash College of Education
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground">
              Shaping Futures <br />
              Since <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">{hero.year}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
              {hero.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. VISION & MISSION SECTION (Plain Background) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Vision Card */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Card className="border-none shadow-xl shadow-primary/5 h-full rounded-[2rem] bg-gradient-to-br from-white to-primary/5">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold mb-4 text-foreground">Our Vision</CardTitle>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {visionMission.vision.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {visionMission.vision.points?.map((p: any, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="font-medium text-foreground">{p.point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission Card */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Card className="border-none shadow-xl shadow-accent/5 h-full rounded-[2rem] bg-gradient-to-br from-white to-accent/5">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-3xl font-bold mb-4 text-foreground">Our Mission</CardTitle>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {visionMission.mission.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {visionMission.mission.points?.map((p: any, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="font-medium text-foreground">{p.point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. TRUSTEES SECTION (Mesh Gradient Background) */}
      {trustees?.length > 0 && (
        <section className="py-24 bg-mesh-gradient border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                Messages from our <span className="text-primary italic">Leadership</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Guiding our institution with wisdom, vision, and a commitment to educational excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {trustees.map((trustee: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-panel p-8 md:p-12 rounded-[3rem] flex flex-col md:flex-row gap-10 shadow-2xl shadow-primary/5"
                >
                  {/* Trustee Image */}
                  <div className="relative w-full md:w-64 h-64 md:h-80 rounded-[2rem] overflow-hidden shrink-0 shadow-lg border-4 border-white">
                    {trustee?.image ? (
                      <Image
                        src={trustee.image.url || '/placeholder.jpg'}
                        alt={trustee.name || 'Trustee'}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                        No Photo Available
                      </div>
                    )}
                  </div>

                  {/* Trustee Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-3xl font-black text-foreground mb-1">{trustee.name}</h3>
                    <p className="text-secondary font-bold uppercase text-xs tracking-[0.2em] mb-6">
                      {trustee.title}
                    </p>
                    
                    {trustee.message && (
                      <div className="relative mb-8">
                        <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/10 -z-10" />
                        <p className="italic text-muted-foreground text-lg leading-relaxed relative z-10">
                          &quot;{trustee.message}&quot;
                        </p>
                      </div>
                    )}
                    
                    {trustee.qualification && (
                      <div className="inline-flex items-center gap-3 bg-white/50 px-4 py-2 rounded-xl w-fit border border-white/60">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold text-foreground">{trustee.qualification}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. FACULTY SECTION (Plain Background, Clean Typography) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
              <div className="w-8 h-[2px] bg-primary" />
              <span>Faculty and Expertise</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              The Source of <span className="text-accent italic">Insight</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Data from DB */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p>{faculty.description || 'Our faculty comprises highly qualified and experienced professionals...'}</p>
              <p className="font-medium text-foreground bg-primary/5 p-6 rounded-2xl border-l-4 border-primary">
                {faculty.additional || 'We are committed to providing personalized attention and guidance to each student.'}
              </p>
            </motion.div>

            {/* Stats/Highlights Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="bg-primary text-primary-foreground p-10 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]" />
              <Award className="w-12 h-12 text-secondary mb-8 relative z-10" />
              
              <div className="space-y-6 relative z-10">
                {faculty.stats?.map((stat: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between border-b border-white/20 pb-4 last:border-0 last:pb-0">
                    <span className="text-primary-foreground/80 font-medium">{stat.label}</span>
                    <span className="text-3xl font-black text-secondary">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. INFRASTRUCTURE SECTION (Mesh Gradient Background) */}
      <section className="py-24 bg-mesh-gradient border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Advanced Resources for <br />
              <span className="text-primary italic">a Brighter Future</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Tech Labs', icon: Globe, color: 'text-primary', bg: 'bg-primary/10' },
              { label: 'Library', icon: BookOpen, color: 'text-brand-green', bg: 'bg-brand-green/10' },
              { label: 'Campus Wi-Fi', icon: Sparkles, color: 'text-secondary', bg: 'bg-secondary/10' },
              { label: 'Activity Hub', icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-[2rem] text-center transition-all"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="font-bold text-foreground">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}