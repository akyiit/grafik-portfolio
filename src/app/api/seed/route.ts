import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    // Zaten kullanıcı var mı kontrol et
    const existingUser = await prisma.user.findFirst()
    if (existingUser) {
      return NextResponse.json(
        { message: 'Kullanıcı zaten mevcut' },
        { status: 400 }
      )
    }

    // İlk admin kullanıcısını oluştur
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const user = await prisma.user.create({
      data: {
        email: 'admin@grafik.com',
        password: hashedPassword,
        name: 'Admin'
      }
    })

    // Varsayılan ayarları oluştur
    await prisma.settings.create({
      data: {
        siteName: 'Grafik Portfolio',
        siteTitle: 'Profesyonel Grafik Tasarım',
        description: 'Yaratıcı ve etkileyici tasarımlar',
        about: 'Hakkımda metni buraya gelecek...',
        email: 'info@grafik.com',
        heroTitle: 'Yaratıcılık ve Tasarım',
        heroSubtitle: 'Markanızı hayata geçiriyoruz'
      }
    })

    return NextResponse.json({
      message: 'Admin kullanıcısı oluşturuldu',
      email: user.email,
      password: 'admin123'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Kullanıcı oluşturulamadı' },
      { status: 500 }
    )
  }
}
