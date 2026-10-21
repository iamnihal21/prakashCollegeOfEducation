'use client'

import { motion } from 'framer-motion'

export function MessageSection({ 
  sanskritQuote, 
  quoteTranslation 
}: { 
  sanskritQuote?: string
  quoteTranslation?: string 
}) {
  // Fallbacks in case the DB is empty
  const quote = sanskritQuote || 'विद्या ददाति विनयं'
  const translation = quoteTranslation || 'Knowledge gives humility.'

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative Quote Mark */}
          <div className="flex justify-center mb-6">
            <span className="text-6xl text-secondary font-serif leading-none opacity-50">“</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-bold leading-tight mb-8">
            {quote}
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-8" />
          
          <p className="text-xl md:text-2xl text-muted-foreground italic font-medium max-w-2xl mx-auto">
            "{translation}"
          </p>
        </motion.div>
      </div>
    </section>
  )
}