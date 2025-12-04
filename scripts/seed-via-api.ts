// Load environment variables
import { config } from 'dotenv'
config({ path: '.env.local' })

async function seedViaAPI() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  console.log('🌱 Calling seed API...')
  console.log(`📍 URL: ${baseUrl}/api/seed`)

  try {
    const response = await fetch(`${baseUrl}/api/seed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (response.ok) {
      console.log('✅ Seeding completed successfully!')
      console.log('\n📧 Admin credentials:')
      console.log(`   Email: ${data.credentials.email}`)
      console.log(`   Password: ${data.credentials.password}`)
      console.log('\n⚠️  Make sure to change the password after first login!\n')
    } else {
      console.error('❌ Seeding failed:', data.error)
      if (data.details) {
        console.error('Details:', data.details)
      }
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error calling seed API:', error)
    process.exit(1)
  }
}

seedViaAPI()
