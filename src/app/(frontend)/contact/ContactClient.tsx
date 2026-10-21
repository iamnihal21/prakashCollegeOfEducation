'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import { Card, CardContent } from '@/app/(frontend)/components/ui/card'
import { Input } from '@/app/(frontend)/components/ui/input'
import { Textarea } from '@/app/(frontend)/components/ui/textarea'
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle2,
  ChevronRight, HelpCircle, Sparkles, ShieldAlert,
} from 'lucide-react'

export default function ContactClient({ data }: { data: any }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const getIcon = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('visit')) return MapPin
    if (t.includes('call')) return Phone
    if (t.includes('email')) return Mail
    return Clock
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('success')
    setTimeout(() => setFormStatus('idle'), 5000)
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
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Always Connected
              </span>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground"
            >
              We&quot;re Here to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">
                Help.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              Whether you’re a prospective student, a parent, or an industry partner, our specialized teams are ready to provide the clarity you need.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. INFO & FORM SECTION (Overlapping Hero) */}
      <section className="py-24 relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Contact Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="lg:col-span-5 space-y-4"
            >
              {data?.contactInfo?.map((info: any, idx: number) => {
                const Icon = getIcon(info.title)
                return (
                  <motion.div key={idx} variants={fadeInUp}>
                    <Card className="group bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 rounded-[2rem] overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex gap-6 items-start">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">{info.title}</h3>
                            <div className="space-y-1 mb-4">
                              {info.details?.map((d: any, i: number) => (
                                <p key={i} className="text-sm font-medium text-muted-foreground leading-relaxed">
                                  {d.line}
                                </p>
                              ))}
                            </div>
                            {info.action && (
                              <Link
                                href={info.link || '#'}
                                className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-1 group/link"
                              >
                                {info.action}
                                <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <Card className="glass-panel border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="mb-8">
                    <h2 className="text-3xl font-black tracking-tight mb-2 text-foreground">Drop us a line</h2>
                    <p className="text-muted-foreground font-medium italic">
                      We typically respond within 2 business hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">
                          First Name
                        </label>
                        <Input required className="h-14 rounded-xl bg-muted/50 border-border focus:bg-white focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">
                          Last Name
                        </label>
                        <Input required className="h-14 rounded-xl bg-muted/50 border-border focus:bg-white focus:border-primary transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">
                        Email Address
                      </label>
                      <Input type="email" required className="h-14 rounded-xl bg-muted/50 border-border focus:bg-white focus:border-primary transition-all" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">
                        Your Message
                      </label>
                      <Textarea required className="min-h-[140px] rounded-xl bg-muted/50 border-border focus:bg-white focus:border-primary transition-all p-4" />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-16 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                      disabled={formStatus === 'success'}
                    >
                      {formStatus === 'success' ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> Message Sent
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION (Plain Background) */}
      <section className="py-24 bg-white border-y border-border/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Common <span className="text-primary italic">Inquiries</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Find quick answers to the most frequently asked questions.
            </p>
          </div>

          <div className="grid gap-4">
            {data?.faqs?.map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-card border border-border/50 rounded-2xl hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <HelpCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight mb-2 text-foreground">{faq.question}</h3>
                        <p className="text-muted-foreground font-medium leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EMERGENCY SECTION (Deep Navy Background) */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] overflow-hidden">
              <CardContent className="p-12 md:p-20 text-center">
                <div className="w-20 h-20 rounded-3xl bg-secondary/20 flex items-center justify-center mx-auto mb-10 border border-secondary/30">
                  <ShieldAlert className="h-10 w-10 text-secondary" />
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                  Critical Assistance
                </h3>
                <p className="text-primary-foreground/70 font-medium text-lg mb-12 max-w-xl mx-auto">
                  Available during office hours for urgent matters requiring immediate institutional attention.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    asChild
                    className="h-16 px-8 rounded-xl border-white/20 bg-transparent text-white font-bold tracking-wide hover:bg-white hover:text-primary transition-all min-w-[260px]"
                  >
                    <a href="tel:+919376133137">
                      <Phone className="mr-3 h-5 w-5" />
                      +91 9376133137
                    </a>
                  </Button>
                  <Button 
                    asChild
                    className="h-16 px-8 rounded-xl bg-secondary text-secondary-foreground font-bold tracking-wide hover:bg-secondary/90 transition-all min-w-[260px] shadow-xl shadow-black/20"
                  >
                    <a href="mailto:prakashcollegeofeducation@yahoo.in">
                      <Mail className="mr-3 h-5 w-5" />
                      Email Administration
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

    </main>
  )
}