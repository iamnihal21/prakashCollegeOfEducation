'use client'

import Link from 'next/link'
import { Button } from '@/app/(frontend)/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function ApplyNow() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Begin Your Journey as an Educator</h2>
        <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
          Join a legacy of excellence. Admissions for the B.Ed. programme are now open for the upcoming academic year.
        </p>
        <Button size="lg" className="rounded-full h-14 px-10 text-base bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-black/20" asChild>
          <Link href="/admissions">
            Apply Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}