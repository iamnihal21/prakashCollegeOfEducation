import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { StudentAchievements } from './collections/StudentAchievements'
import { CollegeAchievements } from './collections/CollegeAchievements'
import { Gallery } from './collections/Gallery'
import { Events } from './collections/Events'
import { Publications } from './collections/Publications'
import { Faculty } from './collections/Faculty'
import { ResearchAreas } from './collections/ResearchAreas'
import { Inquiries } from './collections/Inquires'
import { Activities } from './collections/Activities'
import { Visits } from './collections/Visits'

import { About } from './globals/About'
import { Contact } from './globals/Contact'
import { Admissions } from './globals/Admissions'
import { Campus } from './globals/Campus'
import { HomeSettings } from './globals/HomeSettings'
import { PlacementsSettings } from './globals/PlacementsSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProduction = process.env.NODE_ENV === 'production'
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://prakash-college-of-education.vercel.app',
  process.env.NEXT_PUBLIC_SERVER_URL,
  process.env.PAYLOAD_PUBLIC_SERVER_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
].filter(Boolean) as string[]

const poolConfig = isBuildPhase
  ? {
      max: 5,
      min: 0,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 30_000,
      allowExitOnIdle: false,
    }
  : isProduction
    ? {
        max: 1,
        min: 0,
        idleTimeoutMillis: 10_000,
        connectionTimeoutMillis: 30_000,
        allowExitOnIdle: true,
      }
    : {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 30_000,
        allowExitOnIdle: false,
      }

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },

  collections: [
    Users,
    Media,
    CollegeAchievements,
    StudentAchievements,
    Gallery,
    Events,
    ResearchAreas,
    Faculty,
    Publications,
    Inquiries,
    Activities,
    Visits,
  ],

  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  csrf: allowedOrigins,
  cors: allowedOrigins,

  cookiePrefix: 'prakash-college',

  globals: [About, Contact, Admissions, Campus, HomeSettings, PlacementsSettings],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'dev-secret-key',

  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      ssl: { rejectUnauthorized: false },
      max: isProduction ? 5 : 10,
      min: 0,
      idleTimeoutMillis: isProduction ? 10_000 : 30_000,
      connectionTimeoutMillis: 60_000,
      allowExitOnIdle: isProduction,
    },
  }),

  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            return `https://${process.env.SUPABASE_HOSTNAME}.supabase.co/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${encodeURIComponent(filename)}`
          },
        },
      },
      bucket: process.env.SUPABASE_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.SUPABASE_REGION || 'ap-south-1',
        endpoint: process.env.SUPABASE_S3_ENDPOINT!,
        forcePathStyle: true,
      },
    }),
  ],
})
