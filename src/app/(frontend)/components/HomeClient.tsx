'use client'

import { Hero } from './hero'
import { Testimonials } from './testimonials'
import { ApplyNow } from './ApplyNow'
import { MessageSection } from './message'
import { HomeGallery } from './HomeGallery'
import { MapSection } from './mapSection'
import { Stats } from './stats'
import { CourseStructure } from './subjects'
import { WhyChooseUs } from './WhyChoseUs'
import { Analytics } from "@vercel/analytics/next"  

export default function HomeClient({
  homeData,
  galleryImages,
}: {
  homeData: any
  galleryImages: any[]
}) {
  return (
    <main>
      <Hero data={homeData?.slides} />

      <Stats data={homeData?.stats} />

      <HomeGallery images={galleryImages} />

      <CourseStructure data={homeData?.courses} />

      <Testimonials data={homeData?.testimonials} />

      <WhyChooseUs data={homeData?.whyChooseUs} />

      <MapSection />

      <ApplyNow />

      <MessageSection
        sanskritQuote={homeData?.sanskritQuote}
        quoteTranslation={homeData?.quoteTranslation}
      />

      <Analytics />
    </main>
  )
}