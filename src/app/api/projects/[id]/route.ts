import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// GET - Tek proje getir
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const project = await prisma.project.findUnique({
      where: { id }
    })
    if (!project) {
      return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json(
      { error: 'Proje yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Proje güncelle
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
    const project = await prisma.project.update({
      where: { id },
      data: body
    })
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json(
      { error: 'Proje güncellenemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Proje sil
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
    await prisma.project.delete({
      where: { id }
    })
    return NextResponse.json({ message: 'Proje silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Proje silinemedi' }, { status: 500 })
  }
}