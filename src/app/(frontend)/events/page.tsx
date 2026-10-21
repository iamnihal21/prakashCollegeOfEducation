import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import EventsClient from './EventsClient'

// export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const payload = await getPayload({ config: configPromise })

  const eventsRes = await payload.find({
    collection: 'events',
    limit: 100,
    sort: '-date',
    depth: 2,
  })

  return <EventsClient eventsData={eventsRes.docs} />
}