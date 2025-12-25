'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Briefcase, Mail } from 'lucide-react'

interface Settings {
  heroTitle: string
  heroSubtitle: string
  siteName: string
  about: string
}

interface Project {
  id: string
  title: string
  category: string
  imageUrl: string
  featured: boolean
}

export default function HomePage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [settingsRes, projectsRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/projects')
      ])

      const settingsData = await settingsRes.json()
      const projectsData = await projectsRes.json()

      setSettings(settingsData)
      setProjects(projectsData.filter((p: Project) => p.featured).slice(0, 6))
    } catch (error) {
      console.error('Veri yuklenemedi:', error)
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            {settings?.heroTitle || 'Yaraticilik ve Tasarim'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-up animation-delay-200">
            {settings?.heroSubtitle || 'Markanizi hayata geciriyoruz'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              <Briefcase size={20} />
              Portfolyomu Incele
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition transform hover:scale-105"
            >
              <Mail size={20} />
              Iletisime Gec
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                One Cikan Projeler
              </h2>
              <p className="text-xl text-gray-600">
                En son tamamladigim calismalara goz atin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-64 bg-gray-200 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-purple-600 transition">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition transform hover:scale-105"
              >
                Tum Projeleri Gor
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Preview */}
      {settings?.about && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Hakkimda</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {settings.about.slice(0, 200)}...
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition"
            >
              Devamini Oku
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Projeniz Icin Hazirim!</h2>
          <p className="text-xl mb-8 text-blue-100">
            Birlikte harika bir proje olusturalim. Benimle iletisime gecin!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            <Mail size={20} />
            Iletisime Gec
          </Link>
        </div>
      </section>
    </div>
  )
}