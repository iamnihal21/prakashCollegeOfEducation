'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Users,
  Trophy,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Calendar,
} from 'lucide-react'
import { Button } from '@/app/(frontend)/components/ui/button'
import AdmissionInquiry from '@/app/(frontend)/admissionInquiry/page'

const iconMap: Record<string, any> = {
  graduation: GraduationCap,
  users: Users,
  trophy: Trophy,
  clock: Clock,
}

export default function AdmissionsClient({ data }: { data: any }) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)

  const highlights = data?.highlights || []
  const timeline = data?.timeline || []
  const deadlines = data?.deadlines || {}

  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-white">
      {/* 1. HERO SECTION (Mesh Gradient) */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-mesh-gradient">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Admissions 2026-27 Open
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground">
              Begin Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">
                Teaching Journey.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
              Join the B.Ed. programme at Prakash College of Education. A legacy of excellence in
              teacher education since 1961.
            </p>

            <Button
              size="lg"
              onClick={() => setIsInquiryOpen(true)}
              className="rounded-full h-14 px-8 text-base shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              Start Application <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. HIGHLIGHTS SECTION (Glassmorphism overlapping Hero) */}
      <section className="relative -mt-16 z-20 mb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item: any, i: number) => {
              const Icon = iconMap[item.iconType] || GraduationCap
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-black text-foreground mb-1">{item.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. ADMISSION TIMELINE (Modern Vertical Timeline) */}
      {/* 3. ADMISSION TIMELINE (Modern Vertical Timeline) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Your Path to <span className="text-primary italic">Prakash</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A simple, transparent step-by-step admission process.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-3xl mx-auto">
            {/* The Center Line (Absolute) */}
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 md:-translate-x-1/2" />

            {timeline.map((step: any, i: number) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative mb-12 md:w-1/2 pl-16 md:pl-0 ${
                    isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'
                  }`}
                >
                  {/* The Dot */}
                  <div
                    className={`absolute top-6 w-6 h-6 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10
                      left-[13px] md:left-auto
                      ${isLeft ? 'md:-right-[12px]' : 'md:-left-[12px]'}
                    `}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>

                  {/* The Card */}
                  <div
                    className={`glass-panel p-6 sm:p-8 rounded-[2rem] inline-block w-full ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}
                  >
                    <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      {/* 4. DEADLINES & FAQ (Mesh Gradient) */}
      <section className="py-24 bg-mesh-gradient border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Deadlines */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Important Deadlines</h2>
              <div className="space-y-4">
                {deadlines.undergraduate?.map((d: any, i: number) => (
                  <div
                    key={i}
                    className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div>
                      <p className="font-bold text-foreground text-lg">{d.type}</p>
                      <p className="text-sm text-muted-foreground">Deadline: {d.deadline}</p>
                    </div>
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold">
                      {d.notification}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Box */}
            <div className="bg-primary text-primary-foreground p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]" />
              <h2 className="text-3xl font-bold mb-6 relative z-10">Eligibility Criteria</h2>
              <ul className="space-y-4 relative z-10 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                  <span className="text-primary-foreground/90 font-medium">
                    Bachelor&quot;s Degree in any discipline from a recognized university.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                  <span className="text-primary-foreground/90 font-medium">
                    Minimum 50% aggregate marks in the qualifying examination.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                  <span className="text-primary-foreground/90 font-medium">
                    Valid score in the Gujarat University PGCET (as applicable).
                  </span>
                </li>
              </ul>
              <Button
                onClick={() => setIsInquiryOpen(true)}
                className="w-full h-14 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg relative z-10"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isInquiryOpen && (
          <AdmissionInquiry isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  )
}
