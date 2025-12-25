import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// GET - Tek mesaj getir
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const { id } = await context.params
    const contact = await prisma.contact.findUnique({
      where: { id }
    })
    if (!contact) {
      return NextResponse.json({ error: 'Mesaj bulunamadı' }, { status: 404 })
    }
    return NextResponse.json(contact)
  } catch (error) {
    return NextResponse.json(
      { error: 'Mesaj yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Mesajı okundu olarak işaretle
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()
    const contact = await prisma.contact.update({
      where: { id },
      data: { read: body.read }
    })
    return NextResponse.json(contact)
  } catch (error) {
    return NextResponse.json(
      { error: 'Mesaj güncellenemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Mesaj sil
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const { id } = await context.params
    await prisma.contact.delete({
      where: { id }
    })
    return NextResponse.json({ message: 'Mesaj silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Mesaj silinemedi' }, { status: 500 })
  }
}