'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function HomeGallery({ images }: { images: any[] }) {
  if (!images || images.length === 0) return null

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Life at <span className="text-primary">Prakash</span></h2>
          <p className="text-muted-foreground text-lg max-w-xl">Explore our campus, modern facilities, and vibrant student life.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative rounded-3xl overflow-hidden group cursor-pointer ${img.span || 'md:col-span-1'}`}
          >
            <Image
              src={img.image?.url || 'https://cdccpcxdjfarbhfbuwqx.supabase.co/storage/v1/object/public/prakashCollegeOfEducation/campus.webp'}
              alt={img.alt || 'Gallery Image'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white font-bold">{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}