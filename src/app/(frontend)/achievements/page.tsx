// import { getPayload } from 'payload'
// import configPromise from '@/payload.config'
// import AchievementsClient from './AchievementsClient'

// export const revalidate = 60

// export default async function AchievementsPage() {
//   const payload = await getPayload({ config: configPromise })

//   const collegeRes = await payload.find({ collection: 'college-achievements', limit: 100 })
//   const studentRes = await payload.find({ collection: 'student-achievements', limit: 100 })

//   return <AchievementsClient collegeData={collegeRes.docs} studentData={studentRes.docs} />
// }

// export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import AchievementsClient from './AchievementsClient'

export const dynamic = 'force-dynamic'

export default async function AchievementsPage() {
  const payload = await getPayload({ config: configPromise })

  const [collegeRes, studentRes, home] = await Promise.all([
    payload.find({ collection: 'college-achievements', limit: 100, sort: 'id' }),
    payload.find({ collection: 'student-achievements', limit: 100, sort: 'id', depth: 2 }),
    payload.findGlobal({ slug: 'home-settings', depth: 2 }),
  ])

  return (
    <AchievementsClient
      collegeData={collegeRes.docs}
      studentData={studentRes.docs}
      alumni={home?.testimonials || []}
    />
  )
}