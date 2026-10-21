'use client'

import { Hero } from './hero'
import { Stats } from './stats'
import { WhyChooseUs } from './WhyChoseUs'
import { CourseStructure } from './subjects'
import { HomeGallery } from './HomeGallery'
import { Testimonials } from './testimonials'
import { ApplyNow } from './ApplyNow'
import { MapSection } from './mapSection'
import { MessageSection } from './message'

export default function HomeClient({ homeData, galleryData }: { homeData: any, galleryData: any[] }) {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      
      {/* 1. HERO SECTION (With Gradient) */}
      <div className="bg-mesh-gradient pb-20">
        <Hero data={homeData?.slides} />
        <Stats data={homeData?.stats} />
      </div>

      {/* 2. WHY CHOOSE US (Plain Background) */}
      <WhyChooseUs data={homeData?.whyChooseUs} />

      {/* 3. COURSES (With Gradient) */}
      <div className="bg-mesh-gradient py-24 border-y border-border/50">
        <CourseStructure data={homeData?.courses} />
      </div>

      {/* 4. GALLERY (Plain Background) */}
      <HomeGallery images={galleryData} />

      {/* 5. TESTIMONIALS (With Gradient) */}
      <div className="bg-mesh-gradient py-24 border-t border-border/50">
        <Testimonials data={homeData?.testimonials} />
      </div>

      {/* 6. MAP SECTION (Plain Background) */}
      <MapSection mapUrl={homeData?.mapUrl} address={homeData?.address} />

      {/* 7. MESSAGE / SANSKRIT QUOTE (With Gradient) */}
      <div className="bg-mesh-gradient py-24 border-t border-border/50">
        <MessageSection 
          sanskritQuote={homeData?.sanskritQuote} 
          quoteTranslation={homeData?.quoteTranslation} 
        />
      </div>

      {/* 8. APPLY NOW (Solid Primary Background) */}
      <ApplyNow />
      
    </main>
  )
}