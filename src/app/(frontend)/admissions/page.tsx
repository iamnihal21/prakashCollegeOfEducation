import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import AdmissionsClient from './AdmissionsClient'

export const dynamic = 'force-dynamic'

export default async function AdmissionsPage() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'admissions',
    depth: 2,
  })

  return <AdmissionsClient data={data} />
}