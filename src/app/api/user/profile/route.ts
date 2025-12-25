import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// PUT - Profil güncelle
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, currentPassword, newPassword } = body

    // Mevcut kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Kullanici bulunamadi' }, { status: 404 })
    }

    // Şifre değişikliği kontrolü
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Mevcut sifreyi girmelisiniz' },
          { status: 400 }
        )
      }

      // Mevcut şifreyi kontrol et
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Mevcut sifre hatali' },
          { status: 400 }
        )
      }

      // Yeni şifreyi hashle
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // Kullanıcıyı güncelle (şifre ile)
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          email,
          password: hashedPassword
        }
      })

      return NextResponse.json({
        message: 'Profil ve sifre guncellendi',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email
        }
      })
    } else {
      // Sadece bilgileri güncelle (şifre yok)
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          email
        }
      })

      return NextResponse.json({
        message: 'Profil guncellendi',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email
        }
      })
    }
  } catch (error) {
    console.error('Profil guncelleme hatasi:', error)
    return NextResponse.json(
      { error: 'Profil guncellenemedi' },
      { status: 500 }
    )
  }
}