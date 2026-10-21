import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import MootCourtClient from './MootCourtClient'

// export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function MootCourtPage() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'moot-court',
    depth: 1,
  })

  return <MootCourtClient data={data} />
}

