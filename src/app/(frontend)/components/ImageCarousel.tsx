'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Award } from 'lucide-react'

interface ImageCarouselProps {
  images: any[]             // array of { url, alt } media objects
  title: string
  className?: string        // outer aspect ratio wrapper override
  autoPlay?: boolean        // auto-advance every 4s
}

export default function ImageCarousel({
  images,
  title,
  className = 'aspect-[16/9]',
  autoPlay = false,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = images?.length || 0

  const next = useCallback(() => {
    if (total < 2) return
    setIndex((i) => (i + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    if (total < 2) return
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  // Reset index if images change
  useEffect(() => {
    setIndex(0)
  }, [total])

  // Auto-play
  useEffect(() => {
    if (!autoPlay || total < 2) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [autoPlay, next, total])

  if (!total) {
    return (
      <div className={`relative w-full ${className} rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
        <Award className="w-16 h-16 text-primary/30" />
      </div>
    )
  }

  const current = images[index]

  return (
    <div className="w-full">
      {/* Image container */}
      <div className={`relative w-full ${className} rounded-xl overflow-hidden bg-gray-100 group/slider`}>
        <Image
          key={index}
          src={current?.url || current?.image?.url || ''}
          alt={current?.alt || current?.image?.alt || title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-500"
        />

        {/* Prev / Next — only if more than 1 image */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary text-white shadow-lg backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary text-white shadow-lg backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Counter badge */}
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gray-950/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest">
              {index + 1} / {total}
            </div>
          </>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === i
                  ? 'w-6 bg-gradient-to-r from-primary to-secondary'
                  : 'w-1.5 bg-gray-300 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}