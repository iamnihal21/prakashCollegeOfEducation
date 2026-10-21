'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone } from 'lucide-react'
import { Button } from '@/app/(frontend)/components/ui/button'

export function MapSection({ mapUrl, address }: { mapUrl?: string, address?: string }) {
  // Use the Prakash College Map URL as a fallback
  const defaultMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.020426054587!2d72.51998907633718!3d23.059712714939128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8356fed6eaa7%3A0x7cf138fb3903e441!2sAvirat%20Law%20College!5e0!3m2!1sen!2sin!4v1774524280713!5m2!1sen!2sin"
  
  const finalMapUrl = mapUrl || defaultMap
  const finalAddress = address || 'M. R. Patel Educational Campus, Near Palladium Mall, Gulab Tower Road, Thaltej, Ahmedabad - 380054.'

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Info Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <div className="glass-panel p-10 rounded-[2rem]">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              Visit Our Campus
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We welcome prospective students and visitors to experience our vibrant academic environment firsthand.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Address</p>
                  <p className="text-muted-foreground text-sm">{finalAddress}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Contact</p>
                  <p className="text-muted-foreground text-sm">+91 9376133137</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full rounded-xl h-14" asChild>
              <a href="https://maps.google.com/?q=Prakash+College+of+Education+Thaltej+Ahmedabad" target="_blank" rel="noopener noreferrer">
                Get Directions <Navigation className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Right: Map Embed */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 h-[400px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative z-10"
        >
          <iframe
            src={finalMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[20%] contrast-[1.1]"
          />
        </motion.div>

      </div>
    </section>
  )
}