import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import PlacementsClient from './PlacementsClient'

export const dynamic = 'force-dynamic'

export default async function PlacementsPage() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'placements-settings',
    depth: 2,
  })

  return <PlacementsClient data={data} />
}