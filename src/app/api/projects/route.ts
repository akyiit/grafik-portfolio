import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// GET - Tüm projeleri getir
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      { error: 'Projeler yüklenemedi' },
      { status: 500 }
    )
  }
}

// POST - Yeni proje ekle
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const body = await request.json()
    const project = await prisma.project.create({
      data: body
    })
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json(
      { error: 'Proje oluşturulamadı' },
      { status: 500 }
    )
  }
}