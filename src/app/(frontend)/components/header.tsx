'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronRight, Globe } from 'lucide-react'
import { Button } from '@/app/(frontend)/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import AdmissionInquiry from '@/app/(frontend)/admissionInquiry/page'

const navigation = [
  { name: 'About Us', href: '/aboutus', desc: 'Our legacy and vision' },
  { name: 'Admissions', href: '/admissions', desc: 'Join our community' },
  { name: 'Campus', href: '/campus', desc: "Shaping Tomorrow's Educators" },
  { name: 'Research', href: '/research', desc: 'Academic inquiry and innovation' },
  { name: 'Placements', href: '/placements', desc: 'UDISHA career support' },
  { name: 'Activities & Visits', href: '/activities-visits', desc: 'Beyond the classroom' },
  { name: 'Events', href: '/events', desc: 'Happenings and campus events' },
  { name: 'Gallery', href: '/gallery', desc: 'A visual journey of our campus' },
  { name: 'Achievements', href: '/achievements', desc: 'Our milestones and awards' },
  { name: 'Contact Us', href: '/contact', desc: 'Get in touch with us' },
]

export function Header() {
  const [fullMenuOpen, setFullMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)

  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = fullMenuOpen ? 'hidden' : 'unset'
  }, [fullMenuOpen])

  return (
    <>
      {/* --- Top Awareness Banner --- */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-primary h-10 flex items-center justify-center border-b border-white/10 shadow-sm px-4 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 w-full truncate">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(var(--secondary),0.5)] shrink-0"
          />
          <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-primary-foreground/90 truncate">
            We possess <span className="text-secondary font-black">GCAS Registration</span>{' '}
            Admission process
          </span>
        </div>
      </div>

      {/* --- Main Header --- */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'top-10 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm'
            : 'top-10 bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Group */}
            <Link href="/" className="group flex items-center gap-3 outline-none">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.avif"
                  alt="Prakash College of Education"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none text-primary">
                  PRAKASH
                </span>
                <span className="text-[9px] font-black tracking-[0.3em] text-accent">
                  B.Ed. College
                </span>
              </div>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setIsInquiryOpen(true)}
                  className={`rounded-full px-6 text-xs font-bold uppercase tracking-widest transition-all ${
                    scrolled || !isHome
                      ? 'hover:text-gray-700 hover:bg-black/5'
                      : 'hover:text-blue-700 hover:bg-gray-200'
                  }`}
                >
                  Inquiry
                </Button>

                <button
                  onClick={() => setFullMenuOpen(true)}
                  className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground pl-6 pr-2 py-2 rounded-full transition-all duration-300 group shadow-md hover:shadow-lg"
                >
                  <span className="text-xs font-black uppercase tracking-widest">Menu</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
                    <Menu className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setFullMenuOpen(true)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                scrolled || !isHome ? 'text-gray-900 bg-gray-50' : 'text-foreground bg-black/5'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* --- Fullscreen Menu Overlay --- */}
      <AnimatePresence>
        {fullMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary animate-spin-slow" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                  Navigation
                </span>
              </div>
              <button
                onClick={() => setFullMenuOpen(false)}
                className="group flex items-center gap-3 bg-gray-50 hover:bg-primary p-2 pr-6 rounded-full transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:rotate-180 transition-transform shadow-sm">
                  <X className="h-5 w-5 text-gray-900" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest group-hover:text-white text-gray-900 transition-colors">
                  Close
                </span>
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setFullMenuOpen(false)}
                      className="group block p-6 rounded-[2rem] bg-white border border-gray-100 hover:bg-primary transition-all duration-500 h-full shadow-sm hover:shadow-xl"
                    >
                      <div className="mb-6 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shadow-sm group-hover:bg-white/20 transition-colors">
                        <ChevronRight className="w-5 h-5 text-primary group-hover:text-white group-hover:rotate-[-45deg] transition-all" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-white mb-2 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">
                        {item.desc}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Menu Footer (FIXED FOR RESPONSIVENESS) */}
            <div className="bg-white border-t border-gray-100 px-6 py-8 md:py-12">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Changed from flex gap-12 to flex-col sm:flex-row */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12 text-center sm:text-left">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                      Admissions
                    </p>
                    <p className="text-sm font-bold text-gray-900">+91 9376133137</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                      Email Us
                    </p>
                    {/* Added break-all so the long email doesn't overflow tiny screens */}
                    <p className="text-sm font-bold text-gray-900 break-all sm:break-normal">
                      prakashcollegeofeducation@yahoo.in
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isInquiryOpen && (
          <AdmissionInquiry isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}
