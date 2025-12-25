import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding başlıyor...')

  // Admin kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash('Admin123!', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@grafik-portfolio.com' },
    update: {},
    create: {
      email: 'admin@grafik-portfolio.com',
      password: hashedPassword,
      name: 'Admin User'
    }
  })

  console.log('✅ Admin kullanıcısı oluşturuldu:', {
    email: admin.email,
    name: admin.name
  })

  // Site ayarları oluştur (eğer yoksa)
  const settings = await prisma.settings.upsert({
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

  console.log('\n🎉 Seeding tamamlandı!')
  console.log('\n📋 Giriş Bilgileri:')
  console.log('Email: admin@grafik-portfolio.com')
  console.log('Şifre: Admin123!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })