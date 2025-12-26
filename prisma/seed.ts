import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding başlıyor...')

  // Environment variable'lardan admin bilgilerini al
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@grafik-portfolio.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123!'
  const adminName = process.env.ADMIN_NAME || 'Admin'

  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD environment variable gerekli!')
  }

  // Admin kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName
    }
  })

  console.log('✅ Admin kullanıcısı oluşturuldu:', admin.email)

  // Site ayarları oluştur (eğer yoksa)
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Grafik Portfolio',
      siteTitle: 'Grafik Tasarım Portfolio',
      description: 'Profesyonel grafik tasarım hizmetleri',
      about: 'Kreatif tasarım çözümleri sunuyoruz.',
      email: 'info@grafik-portfolio.com',
      heroTitle: 'Kreatif Tasarım',
      heroSubtitle: 'Markanıza değer katan tasarımlar'
    }
  })

  console.log('✅ Site ayarları oluşturuldu')
  console.log('🎉 Seeding tamamlandı!')

}

main()
  .catch((e) => {
    console.error('❌ Seeding hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })