// test-db.js
require('dotenv').config()
const { Client } = require('pg')

const url = process.env.DATABASE_URL
console.log('Trying:', url.replace(/:[^:@]+@/, ':****@')) // hide password

const client = new Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
})

client.connect()
  .then(() => client.query('SELECT NOW()'))
  .then(res => {
    console.log('✅ Connected!', res.rows[0])
    process.exit(0)
  })
  .catch(err => {
    console.error('❌ Failed:', err.message)
    process.exit(1)
  })






  nihal-dave@nihal-dave-Inspiron-16-5620:~/Projects/Avirat/avirat-law-college$ cat .env | grep -v "^#" | grep -v "^$"
DATABASE_URL=
PAYLOAD_SECRET=
SUPABASE_S3_ACCESS_KEY_ID=
SUPABASE_S3_SECRET_ACCESS_KEY=
SUPABASE_BUCKET=
SUPABASE_REGION=
SUPABASE_S3_ENDPOINT=
SUPABASE_HOSTNAME=
nihal-dave@nihal-dave-Inspiron-16-5620:~/Projects/Avirat/avirat-law-college$ ls -la | grep -E "\.env"
-rw-rw-r--   1 nihal-dave nihal-dave   1059 Oct  6 11:06 .env
-rw-rw-r--   1 nihal-dave nihal-dave     84 Sep 28 18:55 .env.example
-rw-rw-r--   1 nihal-dave nihal-dave     62 Sep 28 18:55 test.env
nihal-dave@nihal-dave-Inspiron-16-5620:~/Projects/Avirat/avirat-law-college$ nc -zv aws-1-ap-south-1.pooler.supabase.com 5432
echo "---"
nc -zv aws-1-ap-south-1.pooler.supabase.com 6543
echo "---"
nc -zv db.fxdojzbgcnkunashsmor.supabase.co 5432
Connection to aws-1-ap-south-1.pooler.supabase.com (13.200.110.68) 5432 port [tcp/postgresql] succeeded!
---
Connection to aws-1-ap-south-1.pooler.supabase.com (3.109.171.244) 6543 port [tcp/*] succeeded!
---
Connection to db.fxdojzbgcnkunashsmor.supabase.co (2406:da1a:b00:1301:4081:f7a8:2e72:7315) 5432 port [tcp/postgresql] succeeded!
nihal-dave@nihal-dave-Inspiron-16-5620:~/Projects/Avirat/avirat-law-college$ psql "postgresql://postgres.qutylhbebwbmqjpwdovd:<YOUR_PASSWORD>@aws-1-ap-south-1.pooler.supabase.com:5432/postgres" -c "SELECT version();"
psql: error: connection to server at "aws-1-ap-south-1.pooler.supabase.com" (3.111.225.200), port 5432 failed: FATAL:  password authentication failed for user "postgres"
connection to server at "aws-1-ap-south-1.pooler.supabase.com" (3.111.225.200), port 5432 failed: FATAL:  password authentication failed for user "postgres"
nihal-dave@nihal-dave-Inspiron-16-5620:~/Projects/Avirat/avirat-law-college$ psql "postgresql://postgres.qutylhbebwbmqjpwdovd:AviratLaw@6338@aws-1-ap-south-1.pooler.supabase.com:5432/postgres" -c "SELECT version();"
psql: error: could not translate host name "6338@aws-1-ap-south-1.pooler.supabase.com" to address: Name or service not known
nihal-dave@nihal-dave-Inspiron-16-5620:~/Projects/Avirat/avirat-law-college$ which psql || echo "psql not installed"
/usr/bin/psql
nihal-dave@nihal-dave-Inspiron-16-5620:~/Projects/Avirat/avirat-law-college$ node test-db.js
node:internal/modules/cjs/loader:1520
  throw err;
  ^

Error: Cannot find module '/home/nihal-dave/Projects/Avirat/avirat-law-college/test-db.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1517:15)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1071:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1095:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1122:12)
    at Module._load (node:internal/modules/cjs/loader:1294:5)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.19.0