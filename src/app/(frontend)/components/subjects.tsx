'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card, CardContent } from '@/app/(frontend)/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/(frontend)/components/ui/tabs'
import { BookOpen, Clock, GraduationCap } from 'lucide-react'

const typeColors: Record<string, string> = {
  Core: 'text-blue-600 bg-blue-50 border-blue-100',
  Elective: 'text-purple-600 bg-purple-50 border-purple-100',
  Foundation: 'text-green-600 bg-green-50 border-green-100',
  'Soft Skill': 'text-orange-600 bg-orange-50 border-orange-100',
  AECC: 'text-green-600 bg-green-50 border-green-100',
  Lab: 'text-orange-600 bg-orange-50 border-orange-100',
  Project: 'text-pink-600 bg-pink-50 border-pink-100',
}

// 🔥 3D Card Component
function SubjectCard({ subject, idx }: { subject: any; idx: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX, rotateY }} className="h-full">
        <Card className="group relative border-none rounded-[2rem] h-full overflow-hidden bg-white shadow-md hover:shadow-2xl transition-shadow duration-500">
          <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 blur-xl" />
          </div>

          <CardContent className="relative p-8 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                  typeColors[subject.type] || 'text-gray-500 bg-gray-50 border-gray-100'
                }`}
              >
                {subject.type}
              </div>
              <span className="text-xs font-mono text-gray-300 font-bold">#{subject.code}</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
              {subject.name}
            </h3>

            <div className="mt-auto">
              <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold">{subject.credits} Credits</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-bold">Theory + Practical</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export function CourseStructure({ data }: { data?: any[] }) {
  const [activeSemester, setActiveSemester] = useState('0')

  const course = Array.isArray(data) && data.length > 0 ? data[0] : null

  if (!course || !course.semesters || course.semesters.length === 0) {
    return null
  }

  const semesters = course.semesters

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              Curriculum 2026
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {course.title}
            </span>
          </h2>

          <p className="text-gray-500 max-w-2xl text-lg">
            A comprehensive {course.duration} programme.
          </p>
        </div>

        {/* Semester Tabs */}
        <Tabs value={activeSemester} className="w-full" onValueChange={setActiveSemester}>
          <div className="flex justify-center mb-12">
            <TabsList className="flex flex-wrap justify-center gap-1 bg-white/50 backdrop-blur-md p-1 rounded-2xl border border-gray-100">
              {semesters.map((sem: any, idx: number) => (
                <TabsTrigger
                  key={sem.id || idx}
                  value={idx.toString()}
                  className="rounded-xl px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white font-bold transition-all"
                >
                  Sem {idx + 1}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* ✅ One TabsContent PER semester — standard Radix pattern */}
          {semesters.map((sem: any, idx: number) => (
            <TabsContent
              key={sem.id || `sem-panel-${idx}`}
              value={idx.toString()}
              className="mt-0 outline-none min-h-[400px]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sem.subjects && sem.subjects.length > 0 ? (
                  sem.subjects.map((subject: any, sidx: number) => (
                    <SubjectCard
                      key={subject.id || `subject-${idx}-${sidx}`}
                      subject={subject}
                      idx={sidx}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-[2rem]">
                    No subjects listed for Semester {idx + 1} yet.
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Careers Section */}
        {course.careers?.length > 0 && (
          <div className="mt-16">
            <div className="bg-gray-900 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Career Paths</h3>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Opportunities after {course.shortTitle || course.title}.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {course.careers.map((career: any, index: number) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-xl flex flex-col items-center text-center transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                        <GraduationCap className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-green-200 text-sm font-bold">{career.role}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
