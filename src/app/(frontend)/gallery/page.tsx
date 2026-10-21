import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import GalleryClient from './GalleryClient'

// export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const payload = await getPayload({ config: configPromise })
  const galleryData = await payload.find({
    collection: 'gallery',
    limit: 100,
    sort: '-createdAt',
  })

  return <GalleryClient items={galleryData.docs} />
}

