import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import ResearchClient from './ResearchClient'

export const dynamic = 'force-dynamic'

export default async function ResearchPage() {
  const payload = await getPayload({ config: configPromise })

  const [faculty, pubs] = await Promise.all([
    payload.find({ collection: 'faculty', limit: 3, depth: 2 }),
    payload.find({ collection: 'publications', limit: 4, sort: '-createdAt' }),
  ])

  return <ResearchClient faculty={faculty.docs} publications={pubs.docs} />
}