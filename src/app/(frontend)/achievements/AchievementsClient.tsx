// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence, type Variants } from 'framer-motion'
// import Image from 'next/image'
// import { Button } from '@/app/(frontend)/components/ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/app/(frontend)/components/ui/card'
// import { Tabs, TabsList, TabsTrigger } from '@/app/(frontend)/components/ui/tabs'
// import {
//   Trophy,
//   Award,
//   Medal,
//   TrendingUp,
//   Users,
//   BookOpen,
//   Microscope,
//   Target,
//   Quote,
//   GraduationCap,
//   Laptop,
//   Music,
//   X,
// } from 'lucide-react'
// import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

// export default function AchievementsClient({
//   collegeData,
//   studentData,
//   alumni,
// }: {
//   collegeData: any[]
//   studentData: any[]
//   alumni: any[]
// }) {
//   const [activeTab, setActiveTab] = useState('college')
//   const [selectedStudentCategory, setSelectedStudentCategory] = useState('All')
//   const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
//   const { ref: headerRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
//   const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

//   const getIcon = (type: string) => {
//     const icons: any = {
//       trophy: Trophy,
//       award: Award,
//       ranking: TrendingUp,
//       target: Target,
//       microscope: Microscope,
//       laptop: Laptop,
//       music: Music,
//       book: BookOpen,
//     }
//     return icons[type] || Award
//   }

//   const studentCategories = ['All', 'Technical', 'Cultural', 'Sports', 'Research']
//   const filteredStudentAchievements =
//     selectedStudentCategory === 'All'
//       ? studentData
//       : studentData.filter((a) => a.category === selectedStudentCategory)

//   // Animation Variants
//   const fadeInUp: Variants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: [0.22, 1, 0.36, 1] as const,
//       },
//     },
//   }

//   const staggerChildren = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
//   }

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.92, y: 20 },
//     visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
//   }

//   return (
//     <main className="min-h-screen bg-white text-gray-950 selection:bg-primary/20">
//       {/* Hero Section */}
//       <section className="relative pt-40 pb-24 overflow-hidden hero-gradient">
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-0 left-1/2 w-[1000px] h-[600px] bg-white/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
//           <div
//             className="absolute inset-0 opacity-[0.06]"
//             style={{
//               backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
//               backgroundSize: '32px 32px',
//             }}
//           />
//         </div>
//         <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
//           <motion.div
//             ref={heroRef}
//             initial="hidden"
//             animate="visible"
//             variants={staggerChildren}
//             className="max-w-4xl"
//           >
//             <motion.div
//               variants={fadeInUp}
//               className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-8 border border-gray-200 shadow-sm"
//             >
//               <Trophy className="w-4 h-4 text-primary animate-bounce" />
//               <span className="text-[10px] font-black uppercase tracking-[0.2em]">
//                 Excellence Hub
//               </span>
//             </motion.div>

//             <motion.h1
//               variants={fadeInUp}
//               className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
//             >
//               Wall of <br />
//               <span className="text-primary italic">Champions.</span>
//             </motion.h1>

//             <motion.p
//               variants={fadeInUp}
//               className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
//             >
//               A testament to the relentless pursuit of greatness by our institution and students
//               across every domain.
//             </motion.p>
//           </motion.div>
//         </div>
//       </section>

//       <section className="relative -mt-12 z-10 mb-20">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               { icon: Award, val: '25+', label: 'College Awards', color: 'text-blue-600' },
//               { icon: Medal, val: '150+', label: 'Student Medals', color: 'text-amber-500' },
//               { icon: TrendingUp, val: '5', label: 'National Rankings', color: 'text-emerald-600' },
//               { icon: Users, val: '300+', label: 'Student Achievers', color: 'text-purple-600' },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <Card className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl overflow-hidden group">
//                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
//                     <stat.icon className="w-20 h-20" />
//                   </div>
//                   <CardContent className="p-8 text-center relative z-10">
//                     <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-4`} />
//                     <div className="text-4xl font-black tracking-tighter mb-1">{stat.val}</div>
//                     <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
//                       {stat.label}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="pb-32">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <Tabs defaultValue="college" className="w-full" onValueChange={setActiveTab}>
//             <div className="flex flex-col items-center mb-16">
//               <TabsList className="inline-flex h-16 items-center justify-center rounded-[2rem] bg-gray-100 p-2 text-gray-500">
//                 <TabsTrigger
//                   value="college"
//                   className="rounded-[1.5rem] px-8 py-3 text-sm font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl transition-all"
//                 >
//                   <Award className="w-4 h-4 mr-2" />
//                   College
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="students"
//                   className="rounded-[1.5rem] px-8 py-3 text-sm font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl transition-all"
//                 >
//                   <Users className="w-4 h-4 mr-2" />
//                   Students
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <AnimatePresence mode="wait">
//               {activeTab === 'college' ? (
//                 <motion.div
//                   key="college"
//                   variants={staggerChildren}
//                   initial="hidden"
//                   animate="visible"
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//                 >
//                   {collegeData.map((item, i) => {
//                     const Icon = getIcon(item.iconType)
//                     return (
//                       <motion.div key={i} variants={cardVariants}>
//                         <Card
//                           onClick={() => setSelectedAchievement({ ...item, type: 'college' })}
//                           className="group h-full bg-secondary rounded-[2.5rem] border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-2 hover:border-primary/20"
//                         >
//                           <div className={`h-2 bg-gradient-to-r ${item.color}`} />
//                           <CardHeader className="p-8">
//                             <div className="flex justify-between items-start mb-6">
//                               <div
//                                 className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}
//                               >
//                                 <Icon className="h-7 w-7 text-white" />
//                               </div>
//                               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
//                                 {item.date}
//                               </span>
//                             </div>
//                             <CardTitle className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight">
//                               {item.title}
//                             </CardTitle>
//                             <CardDescription className="text-base text-gray-500 line-clamp-3 font-medium">
//                               {item.description}
//                             </CardDescription>
//                           </CardHeader>
//                         </Card>
//                       </motion.div>
//                     )
//                   })}
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="students"
//                   initial="hidden"
//                   animate="visible"
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   variants={staggerChildren}
//                 >
//                   <div className="flex flex-wrap justify-center gap-3 mb-12">
//                     {studentCategories.map((cat) => (
//                       <Button
//                         key={cat}
//                         onClick={() => setSelectedStudentCategory(cat)}
//                         variant="ghost"
//                         className={`rounded-full px-6 py-2 text-xs font-black uppercase tracking-widest border-2 transition-all ${
//                           selectedStudentCategory === cat
//                             ? 'bg-primary text-white border-primary shadow-lg scale-110'
//                             : 'bg-secondary/20 text-gray-400 border-gray-100 hover:border-primary/20'
//                         }`}
//                       >
//                         {cat}
//                       </Button>
//                     ))}
//                   </div>
//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {filteredStudentAchievements.map((item, i) => {
//                       const Icon = getIcon(item.iconType)
//                       return (
//                         <motion.div key={i} variants={cardVariants}>
//                           <Card
//                             onClick={() => setSelectedAchievement({ ...item, type: 'student' })}
//                             className="group h-full bg-secondary/20 rounded-[2.5rem] border-2 border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:border-primary/20 flex flex-col"
//                           >
//                             <div className={`h-2 bg-gradient-to-r ${item.color}`} />

//                             {/* Student image */}
//                             {item.image?.url && (
//                               <div className="relative aspect-[4/3] overflow-hidden">
//                                 <Image
//                                   src={item.image.url}
//                                   alt={item.studentName || item.title}
//                                   fill
//                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                                   className="object-cover transition-transform duration-1000 group-hover:scale-110"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
//                                 <div className="absolute bottom-3 left-3">
//                                   <div
//                                     className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg backdrop-blur-sm`}
//                                   >
//                                     <Icon className="h-6 w-6 text-white" />
//                                   </div>
//                                 </div>
//                               </div>
//                             )}

//                             <CardHeader className="p-8">
//                               <div className="flex justify-between items-start mb-6">
//                                 <div
//                                   className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}
//                                 >
//                                   <Icon className="h-7 w-7 text-white" />
//                                 </div>
//                                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
//                                   {item.date}
//                                 </span>
//                               </div>
//                               <CardTitle className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors leading-tight mb-2">
//                                 {item.title}
//                               </CardTitle>
//                               <div className="flex flex-col gap-4 mt-6">
//                                 <div className="flex items-center gap-3">
//                                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
//                                     <Users className="w-4 h-4" />
//                                   </div>
//                                   <span className="text-sm font-bold text-gray-700">
//                                     {item.studentName}
//                                   </span>
//                                 </div>
//                                 <div className="flex justify-between items-center pt-4 border-t border-gray-50">
//                                   <span className="text-[10px] font-black uppercase tracking-widest text-primary">
//                                     {item.category}
//                                   </span>
//                                   <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
//                                     {item.prize}
//                                   </span>
//                                 </div>
//                               </div>
//                             </CardHeader>
//                           </Card>
//                         </motion.div>
//                       )
//                     })}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </Tabs>
//         </div>
//       </section>

//       <AnimatePresence>
//         {selectedAchievement && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedAchievement(null)}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 p-4 backdrop-blur-md"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               onClick={(e) => e.stopPropagation()}
//               className="max-w-2xl w-full"
//             >
//               <Card className="bg-white rounded-[3rem] overflow-hidden border-none shadow-2xl relative">
//                 <button
//                   onClick={() => setSelectedAchievement(null)}
//                   className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20 transition-all"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>

//                 <div
//                   className={`h-40 bg-gradient-to-br ${selectedAchievement.color} relative p-10 flex items-end`}
//                 >
//                   <div className="flex items-center gap-4 relative z-10">
//                     <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-2xl flex items-center justify-center">
//                       {(() => {
//                         const Icon = getIcon(selectedAchievement.iconType)
//                         return <Icon className="text-primary h-8 w-8" />
//                       })()}
//                     </div>
//                     <div>
//                       <span className="text-white/60 text-xs font-black uppercase tracking-[0.3em] block mb-1">
//                         Achievement Type
//                       </span>
//                       <span className="text-white font-black text-xl uppercase tracking-widest">
//                         {selectedAchievement.category}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
//                 </div>

//                 <CardContent className="p-10 space-y-8">
//                   {/* Student image inside modal */}
//                   {selectedAchievement.type === 'student' && selectedAchievement.image?.url && (
//                     <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden -mt-4">
//                       <Image
//                         src={selectedAchievement.image.url}
//                         alt={selectedAchievement.studentName || selectedAchievement.title}
//                         fill
//                         sizes="(max-width: 768px) 100vw, 640px"
//                         className="object-cover"
//                       />
//                     </div>
//                   )}

//                   <div>
//                     <CardTitle className="text-4xl font-black tracking-tighter mb-4 leading-none">
//                       {selectedAchievement.title}
//                     </CardTitle>
//                     <p className="text-xl text-gray-500 leading-relaxed font-medium">
//                       {selectedAchievement.description}
//                     </p>
//                   </div>

//                   {selectedAchievement.type === 'student' && (
//                     <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between">
//                       <div>
//                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
//                           Honoree
//                         </p>
//                         <p className="text-2xl font-black text-primary">
//                           {selectedAchievement.studentName}
//                         </p>
//                       </div>
//                       <div className="px-6 py-2 bg-white rounded-xl border-2 border-primary/10 shadow-sm">
//                         <span className="text-xs font-black text-primary uppercase tracking-widest">
//                           {selectedAchievement.prize}
//                         </span>
//                       </div>
//                     </div>
//                   )}

//                   <Button
//                     className="w-full h-16 rounded-2xl bg-gray-950 text-white font-black uppercase tracking-widest hover:bg-primary hover:shadow-xl transition-all"
//                     onClick={() => setSelectedAchievement(null)}
//                   >
//                     Close Achievement
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ================= ALUMNI SECTION ================= */}
//       {alumni?.length > 0 && (
//         <section className="relative py-32 bg-secondary/20 overflow-hidden">
//           <div className="absolute inset-0 pointer-events-none">
//             <div className="absolute top-1/2 left-1/2 w-[900px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
//           </div>

//           <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
//             {/* Header */}
//             <div className="text-center mb-16">
//               <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
//                 <div className="w-8 h-[2px] bg-primary" />
//                 <span>Where They Are Now</span>
//                 <div className="w-8 h-[2px] bg-primary" />
//               </div>
//               <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
//                 Our Alumni, <span className="text-primary italic">Our Pride.</span>
//               </h2>
//               <p className="text-gray-500 font-medium max-w-2xl mx-auto">
//                 Prakash graduates are shaping courtrooms, boardrooms, and public service across
//                 India.
//               </p>
//             </div>

//             {/* Alumni cards */}
//             <div className="grid md:grid-cols-2 gap-8">
//               {alumni.map((person: any, i: number) => (
//                 <motion.div
//                   key={person.id || i}
//                   initial={{ opacity: 0, y: 40 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: i * 0.12 }}
//                   viewport={{ once: true }}
//                 >
//                   <Card className="group h-full bg-white border-2 border-transparent hover:border-primary/20 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
//                     {/* Decorative quote mark */}
//                     <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/5 rotate-12 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />

//                     <CardContent className="p-10 relative z-10">
//                       {/* Avatar + identity */}
//                       <div className="flex items-center gap-5 mb-8">
//                         {person.image?.url ? (
//                           <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg shrink-0 group-hover:scale-105 transition-transform">
//                             <Image
//                               src={person.image.url}
//                               alt={person.name}
//                               width={80}
//                               height={80}
//                               className="object-cover w-full h-full"
//                             />
//                           </div>
//                         ) : (
//                           <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0 group-hover:scale-105 transition-transform">
//                             {person.name?.charAt(0)}
//                           </div>
//                         )}
//                         <div className="flex-1 min-w-0">
//                           <div className="font-black text-gray-900 text-lg leading-tight">
//                             {person.name}
//                           </div>
//                           <div className="text-[10px] font-black uppercase tracking-widest text-primary mt-1.5 leading-snug">
//                             {person.role}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Quote */}
//                       <p className="text-gray-600 leading-relaxed font-medium italic text-base">
//                         &ldquo;{person.quote}&rdquo;
//                       </p>

//                       {/* Bottom accent */}
//                       <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2">
//                         <GraduationCap className="w-4 h-4 text-primary" />
//                         <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
//                           Prakash COllege Of educationAlumni
//                         </span>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}
//     </main>
//   )
// }

'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/app/(frontend)/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
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
} from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export default function AchievementsClient({
  studentData,
  alumni,
}: {
  studentData: any[]
  alumni: any[]
}) {
  const [selectedStudentCategory, setSelectedStudentCategory] = useState('All')
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <main className="min-h-screen bg-white text-gray-950 selection:bg-primary/20">
      {/* ================= HERO ================= */}
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
              <Award className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Excellence Hub
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              Wall of <br />
              <span className="text-primary italic">Champions.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              A testament to the relentless pursuit of greatness by our students across every
              domain.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="relative -mt-12 z-10 mb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Medal, val: '150+', label: 'Student Medals', color: 'text-amber-500' },
              { icon: TrendingUp, val: '5', label: 'National Rankings', color: 'text-emerald-600' },
              { icon: Users, val: '300+', label: 'Student Achievers', color: 'text-purple-600' },
              { icon: Award, val: '25+', label: 'Awards Won', color: 'text-blue-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                    <stat.icon className="w-20 h-20" />
                  </div>
                  <CardContent className="p-8 text-center relative z-10">
                    <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-4`} />
                    <div className="text-4xl font-black tracking-tighter mb-1">{stat.val}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STUDENT ACHIEVEMENTS ================= */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
              <div className="w-8 h-[2px] bg-primary" />
              <span>Student Excellence</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Our Student <span className="text-primary italic">Achievers.</span>
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Celebrating the dedication, talent, and hard work of our students across every
              discipline.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {studentCategories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedStudentCategory(cat)}
                variant="ghost"
                className={`rounded-full px-6 py-2 text-xs font-black uppercase tracking-widest border-2 transition-all ${
                  selectedStudentCategory === cat
                    ? 'bg-primary text-white border-primary shadow-lg scale-110'
                    : 'bg-secondary/20 text-gray-400 border-gray-100 hover:border-primary/20'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Student cards */}
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
                  <motion.div key={i} variants={cardVariants}>
                    <Card
                      onClick={() => setSelectedAchievement({ ...item, type: 'student' })}
                      className="group h-full bg-secondary/20 rounded-[2.5rem] border-2 border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:border-primary/20 flex flex-col"
                    >
                      <div className={`h-2 bg-gradient-to-r ${item.color}`} />

                      {/* Student image */}
                      {item.image?.url && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={item.image.url}
                            alt={item.studentName || item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <div
                              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg backdrop-blur-sm`}
                            >
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                      )}

                      <CardHeader className="p-8">
                        {/* If no image, show icon + date at the top */}
                        {!item.image?.url && (
                          <div className="flex justify-between items-start mb-6">
                            <div
                              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}
                            >
                              <Icon className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                              {item.date}
                            </span>
                          </div>
                        )}

                        {/* If image, only show date badge */}
                        {item.image?.url && (
                          <div className="flex justify-end mb-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                              {item.date}
                            </span>
                          </div>
                        )}

                        <CardTitle className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors leading-tight mb-2">
                          {item.title}
                        </CardTitle>
                        <div className="flex flex-col gap-4 mt-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <Users className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold text-gray-700">
                              {item.studentName}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                              {item.category}
                            </span>
                            <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
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

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <Card className="bg-white rounded-[3rem] overflow-hidden border-none shadow-2xl relative">
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div
                  className={`h-40 bg-gradient-to-br ${selectedAchievement.color} relative p-10 flex items-end`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-2xl flex items-center justify-center">
                      {(() => {
                        const Icon = getIcon(selectedAchievement.iconType)
                        return <Icon className="text-primary h-8 w-8" />
                      })()}
                    </div>
                    <div>
                      <span className="text-white/60 text-xs font-black uppercase tracking-[0.3em] block mb-1">
                        Achievement Type
                      </span>
                      <span className="text-white font-black text-xl uppercase tracking-widest">
                        {selectedAchievement.category}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>

                <CardContent className="p-10 space-y-8">
                  {/* Student image inside modal */}
                  {selectedAchievement.image?.url && (
                    <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden -mt-4">
                      <Image
                        src={selectedAchievement.image.url}
                        alt={selectedAchievement.studentName || selectedAchievement.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <CardTitle className="text-4xl font-black tracking-tighter mb-4 leading-none">
                      {selectedAchievement.title}
                    </CardTitle>
                    <p className="text-xl text-gray-500 leading-relaxed font-medium">
                      {selectedAchievement.description}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                        Honoree
                      </p>
                      <p className="text-2xl font-black text-primary">
                        {selectedAchievement.studentName}
                      </p>
                    </div>
                    <div className="px-6 py-2 bg-white rounded-xl border-2 border-primary/10 shadow-sm">
                      <span className="text-xs font-black text-primary uppercase tracking-widest">
                        {selectedAchievement.prize}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full h-16 rounded-2xl bg-gray-950 text-white font-black uppercase tracking-widest hover:bg-primary hover:shadow-xl transition-all"
                    onClick={() => setSelectedAchievement(null)}
                  >
                    Close Achievement
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= ALUMNI SECTION ================= */}
      {alumni?.length > 0 && (
        <section className="relative py-32 bg-secondary/20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-[900px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
                <div className="w-8 h-[2px] bg-primary" />
                <span>Where They Are Now</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Our Alumni, <span className="text-primary italic">Our Pride.</span>
              </h2>
              <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                Prakash graduates are shaping courtrooms, boardrooms, and public service across
                India.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {alumni.map((person: any, i: number) => (
                <motion.div
                  key={person.id || i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  viewport={{ once: true }}
                >
                  <Card className="group h-full bg-white border-2 border-transparent hover:border-primary/20 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                    <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/5 rotate-12 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />

                    <CardContent className="p-10 relative z-10">
                      <div className="flex items-center gap-5 mb-8">
                        {person.image?.url ? (
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                            <Image
                              src={person.image.url}
                              alt={person.name}
                              width={80}
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                            {person.name?.charAt(0)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-gray-900 text-lg leading-tight">
                            {person.name}
                          </div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-primary mt-1.5 leading-snug">
                            {person.role}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed font-medium italic text-base">
                        &ldquo;{person.quote}&rdquo;
                      </p>

                      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          Prakash COllege Of educationAlumni
                        </span>
                      </div>
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