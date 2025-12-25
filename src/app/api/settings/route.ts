import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// GET - Ayarları getir
export async function GET() {
  try {
    const settings = await prisma.settings.findFirst()
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ayarlar yuklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Ayarları güncelle
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const body = await request.json()
    
    // İlk ayarları bul
    const existingSettings = await prisma.settings.findFirst()
    
    if (existingSettings) {
      // Güncelle
      const settings = await prisma.settings.update({
        where: { id: existingSettings.id },
        data: body
      })
      return NextResponse.json(settings)
    } else {
      // Yoksa oluştur
      const settings = await prisma.settings.create({
        data: body
      })
      return NextResponse.json(settings)
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Ayarlar guncellenemedi' },
      { status: 500 }
    )
  }
}