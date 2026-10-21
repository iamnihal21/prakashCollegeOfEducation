import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import ActivitiesClient from './ActivitiesClient'

// export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function ActivitiesPage() {
  const payload = await getPayload({ config: configPromise })
  
  const [activitiesRes, visitsRes] = await Promise.all([
    payload.find({
      collection: 'activities',
      sort: 'displayOrder',
      limit: 100,
      depth: 2,
    }),
    payload.find({
      collection: 'visits',
      sort: 'displayOrder',
      limit: 100,
      depth: 2,
    }),
  ])

  return <ActivitiesClient activities={activitiesRes.docs} visits={visitsRes.docs} />
}
