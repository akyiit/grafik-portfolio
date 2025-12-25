import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { sendContactNotification } from '@/lib/email'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Mesajlar yuklenemedi' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Veritabanına kaydet
    const contact = await prisma.contact.create({
      data: { name, email, subject, message }
    })

    // Email gönder
    const emailResult = await sendContactNotification({
      name,
      email,
      subject,
      message
    })

    if (!emailResult.success) {
      console.error('Email gonderilemedi:', emailResult.error)
      // Email gönderilmese bile mesaj kaydedildi, başarılı dön
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Mesaj kaydetme hatasi:', error)
    return NextResponse.json(
      { error: 'Mesaj gonderilemedi' },
      { status: 500 }
    )
  }
}