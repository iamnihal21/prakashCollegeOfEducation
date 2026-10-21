'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/app/(frontend)/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/(frontend)/components/ui/tabs'
import { BookOpen, Clock, GraduationCap } from 'lucide-react'

export function CourseStructure({ data }: { data?: any[] }) {
  const [activeSemester, setActiveSemester] = useState('0')
  const course = Array.isArray(data) && data.length > 0 ? data[0] : null

  if (!course || !course.semesters || course.semesters.length === 0) return null
  const semesters = course.semesters

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          {course.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {course.description}
        </p>
      </div>

      <Tabs value={activeSemester} className="w-full" onValueChange={setActiveSemester}>
        <div className="flex justify-center mb-12">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-white/50 backdrop-blur-md p-2 rounded-2xl border border-white/40 shadow-sm">
            {semesters.map((sem: any, idx: number) => (
              <TabsTrigger
                key={sem.id || idx}
                value={idx.toString()}
                className="rounded-xl px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold transition-all shadow-none data-[state=active]:shadow-md"
              >
                Semester {idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {semesters.map((sem: any, idx: number) => (
          <TabsContent key={sem.id || idx} value={idx.toString()} className="mt-0 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sem.subjects && sem.subjects.length > 0 ? (
                sem.subjects.map((subject: any, sidx: number) => (
                  <motion.div
                    key={subject.id || sidx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sidx * 0.05 }}
                  >
                    <Card className="h-full border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                            {subject.type}
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">{subject.code}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-4 leading-tight">{subject.name}</h3>
                        <div className="flex items-center gap-4 pt-4 border-t border-border/50 text-muted-foreground text-sm font-medium">
                          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {subject.credits} Credits</div>
                          <div className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Theory</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-muted-foreground border-2 border-dashed border-border/50 rounded-3xl">
                  No subjects listed for Semester {idx + 1} yet.
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Careers */}
      {course.careers?.length > 0 && (
        <div className="mt-20">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full" />
            <h3 className="text-2xl font-bold text-foreground mb-8 relative z-10">Career Opportunities</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {course.careers.map((career: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <GraduationCap className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-bold text-foreground">{career.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}