'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/app/(frontend)/components/ui/card'
import {
  ArrowRight, BookOpen, Heart, Globe, Cpu, 
  Microscope, Sparkles, Beaker, GraduationCap, ExternalLink
} from 'lucide-react'

// Hardcoded Research Areas tailored for Prakash College of Education
const RESEARCH_AREAS = [
  {
    id: 1,
    title: 'Educational Psychology',
    description: 'Understanding learner behavior, cognitive development, and the psychological foundations of teaching.',
    icon: Heart,
    color: 'from-[hsl(var(--accent))] to-[hsl(var(--accent)/0.7)]', // Red
  },
  {
    id: 2,
    title: 'Pedagogy & Curriculum',
    description: 'Innovative teaching methods, curriculum design, and modern assessment strategies.',
    icon: BookOpen,
    color: 'from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.7)]', // Navy
  },
  {
    id: 3,
    title: 'Inclusive Education',
    description: 'Creating equitable learning environments and catering to students with diverse needs.',
    icon: Globe,
    color: 'from-[hsl(var(--brand-green))] to-[hsl(var(--brand-green)/0.7)]', // Green
  },
  {
    id: 4,
    title: 'ICT in Education',
    description: 'Integrating technology, smart classrooms, and digital resources into modern teaching practices.',
    icon: Cpu,
    color: 'from-[hsl(var(--secondary))] to-[hsl(var(--secondary)/0.7)]', // Gold
  },
]

export default function ResearchClient({ faculty, publications }: any) {
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
              <Beaker className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Research & Innovation
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground"
            >
              Architects of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">
                Tomorrow.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              Driving evidence-based research and pedagogical innovations in teacher education to solve real-world educational challenges.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. RESEARCH AREAS (Plain Background) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Core <span className="text-primary italic">Specializations</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Focused research that defines the future of education and society.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {RESEARCH_AREAS.map((area, i) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={area.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="group h-full bg-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 rounded-[2rem] overflow-hidden flex flex-col">
                    <div className={`h-1.5 bg-gradient-to-r ${area.color}`} />
                    <CardHeader className="p-8 sm:p-10 flex-grow">
                      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-bold tracking-tight mb-4 text-foreground">
                        {area.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground font-medium text-base leading-relaxed">
                        {area.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. FACULTY SECTION (Mesh Gradient Background) */}
      {faculty?.length > 0 && (
        <section className="py-24 bg-mesh-gradient border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                Our <span className="text-accent italic">Researchers</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Meet the distinguished faculty members leading educational inquiry and innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {faculty.map((member: any, i: number) => (
                <motion.div
                  key={member.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-panel border-none rounded-[2rem] overflow-hidden text-center group">
                    <div className="relative w-full h-64 bg-muted">
                      {member.image ? (
                        <Image
                          src={member.image.url}
                          alt={member.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <User className="w-16 h-16 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="text-sm text-secondary font-medium">{member.title}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                        Specialty
                      </p>
                      <p className="text-foreground font-medium mt-1">{member.specialty}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. PUBLICATIONS SECTION (Plain Background) */}
      {publications?.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                Latest <span className="text-primary italic">Publications</span>
              </h2>
            </div>

            <div className="space-y-4">
              {publications.map((pub: any, i: number) => (
                <motion.div
                  key={pub.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="bg-card border border-border/50 rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
                    <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                          <BookOpen className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                            {pub.title}
                          </h3>
                          <p className="text-muted-foreground font-medium mt-1 text-sm">
                            {pub.journal} • {pub.publishDate}
                          </p>
                        </div>
                      </div>
                      {pub.link && (
                        <Button asChild variant="outline" className="shrink-0 rounded-full border-border hover:bg-primary hover:text-primary-foreground">
                          <a href={pub.link} target="_blank" rel="noopener noreferrer">
                            Read Paper <ExternalLink className="ml-2 w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}

// Simple fallback icon if image is missing
function User(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}