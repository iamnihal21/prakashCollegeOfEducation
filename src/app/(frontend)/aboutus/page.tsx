import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import AboutClient from './AboutClient'

// export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'about',
  })

  return <AboutClient data={data} />
}

