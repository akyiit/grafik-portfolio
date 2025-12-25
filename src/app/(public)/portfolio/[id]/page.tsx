'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, ExternalLink } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  images: string
  client: string | null
  date: string
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [allImages, setAllImages] = useState<string[]>([])

  useEffect(() => {
    if (id) {
      fetchProject()
    }
  }, [id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`)
      const data = await response.json()
      setProject(data)

      // Tüm görselleri birleştir
      const images = [data.imageUrl]
      if (data.images) {
        try {
          const additionalImages = JSON.parse(data.images)
          images.push(...additionalImages)
        } catch (e) {
          console.error('Gorseller parse edilemedi')
        }
      }
      setAllImages(images)
    } catch (error) {
      console.error('Proje yuklenemedi:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold">Yukleniyor...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Proje bulunamadi
          </h2>
          <Link
            href="/portfolio"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Portfolyoya don
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/portfolio"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                {project.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Taraf - Görseller */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {allImages.map((image, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Taraf - Detaylar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Proje Detaylari
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-purple-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Tarih</p>
                    <p className="text-gray-600">
                      {new Date(project.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {project.client && (
                  <div className="flex items-start gap-3">
                    <User className="text-purple-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Musteri
                      </p>
                      <p className="text-gray-600">{project.client}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Aciklama
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="block w-full mt-6 px-6 py-3 bg-purple-600 text-white text-center rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Benimle Iletisime Gec
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Diğer Projeler */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Diger Projeler</h2>
          </div>
          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition"
            >
              Tum Projeleri Gor
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}