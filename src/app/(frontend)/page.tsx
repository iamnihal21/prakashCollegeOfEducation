import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HomeClient from './components/HomeClient'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const homeData = await payload.findGlobal({
    slug: 'home-settings',
    depth: 2,
  })

  const galleryData = await payload.find({
    collection: 'gallery',
    depth: 2,
    limit: 6,
  })

  return <HomeClient homeData={homeData} galleryData={galleryData.docs} />
}