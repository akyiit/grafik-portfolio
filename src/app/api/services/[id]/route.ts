import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// GET - Tek hizmet getir
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const service = await prisma.service.findUnique({
      where: { id }
    })
    if (!service) {
      return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 })
    }
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json(
      { error: 'Hizmet yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Hizmet güncelle
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
    const service = await prisma.service.update({
      where: { id },
      data: body
    })
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json(
      { error: 'Hizmet güncellenemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Hizmet sil
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
    await prisma.service.delete({
      where: { id }
    })
    return NextResponse.json({ message: 'Hizmet silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Hizmet silinemedi' }, { status: 500 })
  }
}