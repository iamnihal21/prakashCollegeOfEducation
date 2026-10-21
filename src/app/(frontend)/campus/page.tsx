import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import CampusClient from './CampusClient'

// export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function CampusPage() {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({ slug: 'campus-settings' })
  const galleryRes = await payload.find({ collection: 'gallery', limit: 10 })

  return <CampusClient settings={settings} gallery={galleryRes.docs} />
}

