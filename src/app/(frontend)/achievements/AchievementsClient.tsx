'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/app/(frontend)/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/(frontend)/components/ui/card'
import {
  Award,
  Medal,
  TrendingUp,
  Users,
  BookOpen,
  Microscope,
  Target,
  Quote,
  GraduationCap,
  Laptop,
  Music,
  X,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

export default function AchievementsClient({
  studentData,
  alumni,
}: {
  studentData: any[]
  alumni: any[]
}) {
  const [selectedStudentCategory, setSelectedStudentCategory] = useState('All')
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)

  const getIcon = (type: string) => {
    const icons: any = {
      trophy: Award,
      award: Award,
      ranking: TrendingUp,
      target: Target,
      microscope: Microscope,
      laptop: Laptop,
      music: Music,
      book: BookOpen,
    }
    return icons[type] || Award
  }

  const studentCategories = ['All', 'Technical', 'Cultural', 'Sports', 'Research']
  const filteredStudentAchievements =
    selectedStudentCategory === 'All'
      ? studentData
      : studentData.filter((a) => a.category === selectedStudentCategory)

  // Animation Variants
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
      
      {/* 1. HERO SECTION (With Mesh Gradient) */}
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
              <Award className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Excellence Hub
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground"
            >
              Wall of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">
                Champions.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              A testament to the relentless pursuit of greatness by our students across every
              domain of education.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION (Glassmorphism overlapping Hero) */}
      <section className="relative -mt-16 z-20 mb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Medal, val: '150+', label: 'Student Medals' },
              { icon: TrendingUp, val: '5', label: 'National Rankings' },
              { icon: Users, val: '300+', label: 'Achievers' },
              { icon: Award, val: '25+', label: 'Awards Won' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel p-6 rounded-3xl text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-black text-foreground mb-1">{stat.val}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STUDENT ACHIEVEMENTS (Plain Background) */}
      <section className="pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Our Student <span className="text-accent italic">Achievers</span>
            </h2>
            <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
              Celebrating the dedication, talent, and hard work of our students across every discipline.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {studentCategories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedStudentCategory(cat)}
                variant="ghost"
                className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  selectedStudentCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStudentCategory}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              variants={staggerChildren}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredStudentAchievements.map((item, i) => {
                const Icon = getIcon(item.iconType)
                return (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card
                      onClick={() => setSelectedAchievement(item)}
                      className="group h-full bg-card rounded-[2rem] border border-border/50 shadow-sm hover:shadow-2xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
                    >
                      {/* Dynamic Top Color Bar from DB */}
                      <div className={`h-2 bg-gradient-to-r ${item.color || 'from-primary to-accent'}`} />

                      {item.image?.url ? (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={item.image.url}
                            alt={item.studentName || item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                              {item.date}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 pb-0 flex justify-between items-start">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {item.date}
                          </span>
                        </div>
                      )}

                      <CardHeader className="p-8 flex-1 flex flex-col">
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-4">
                          {item.title}
                        </CardTitle>
                        
                        <div className="mt-auto space-y-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                              <Users className="w-3.5 h-3.5" />
                            </div>
                            {item.studentName}
                          </div>
                          
                          <div className="flex justify-between items-center pt-4 border-t border-border/50">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full">
                              {item.category}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                              {item.prize}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. MODAL (Glassmorphism Overlay & Modern Card) */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <Card className="bg-background rounded-[2.5rem] overflow-hidden border-none shadow-2xl relative">
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className={`h-32 bg-gradient-to-br ${selectedAchievement.color || 'from-primary to-accent'} relative p-8 flex items-end`}>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                      {(() => {
                        const Icon = getIcon(selectedAchievement.iconType)
                        return <Icon className="text-primary h-8 w-8" />
                      })()}
                    </div>
                    <div>
                      <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] block mb-1">
                        Achievement
                      </span>
                      <span className="text-white font-black text-xl uppercase tracking-widest">
                        {selectedAchievement.category}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8 md:p-10 space-y-8">
                  {selectedAchievement.image?.url && (
                    <div className="relative aspect-video rounded-2xl overflow-hidden -mt-12 border-4 border-background shadow-lg">
                      <Image
                        src={selectedAchievement.image.url}
                        alt={selectedAchievement.studentName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <CardTitle className="text-3xl font-black tracking-tight mb-4 text-foreground leading-tight">
                      {selectedAchievement.title}
                    </CardTitle>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {selectedAchievement.description}
                    </p>
                  </div>

                  <div className="bg-muted p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                        Honoree
                      </p>
                      <p className="text-xl font-black text-primary">
                        {selectedAchievement.studentName}
                      </p>
                    </div>
                    <div className="px-5 py-2 bg-background rounded-xl border border-border/50 shadow-sm">
                      <span className="text-xs font-black text-accent uppercase tracking-widest">
                        {selectedAchievement.prize}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-sm"
                    onClick={() => setSelectedAchievement(null)}
                  >
                    Close Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. ALUMNI SECTION (Mesh Gradient Background) */}
      {alumni?.length > 0 && (
        <section className="relative py-32 bg-mesh-gradient border-t border-border/50 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-primary" />
                <span>Where They Are Now</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Our Alumni, <span className="text-accent italic">Our Pride</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Prakash graduates are shaping classrooms, schools, and educational policies across the nation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {alumni.map((person: any, i: number) => (
                <motion.div
                  key={person.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="group h-full glass-panel border-none rounded-[2rem] p-8 relative overflow-hidden">
                    <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/10 rotate-12 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />

                    <div className="flex items-center gap-5 mb-6 relative z-10">
                      {person.image?.url ? (
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
                          <Image
                            src={person.image.url}
                            alt={person.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-black shadow-md shrink-0">
                          {person.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-foreground text-lg leading-tight">
                          {person.name}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-secondary mt-1">
                          {person.role}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed font-medium italic relative z-10">
                      &quot;{person.quote}&quot;
                    </p>

                    <div className="mt-6 pt-6 border-t border-black/5 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Prakash College of Education Alumni
                      </span>
                    </div>
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