'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'

interface Settings {
  siteName: string
  about: string
  profileImage: string
  email: string
  phone: string
  address: string
  linkedin: string
  instagram: string
  behance: string
  dribbble: string
}

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export default function AboutPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [settingsRes, servicesRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/services'),
      ])

      const settingsData = await settingsRes.json()
      const servicesData = await servicesRes.json()

      setSettings(settingsData)
      setServices(servicesData)
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Hakkimda</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profil Bölümü */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            {/* Profil Fotoğrafı */}
            <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-blue-600 p-8 flex items-center justify-center">
              {settings?.profileImage ? (
                <img
                  src={settings.profileImage}
                  alt={settings.siteName}
                  className="w-64 h-64 rounded-full object-cover border-8 border-white shadow-xl"
                />
              ) : (
                <div className="w-64 h-64 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-6xl text-white">👤</span>
                </div>
              )}
            </div>

            {/* Hakkımda Metni */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Merhaba! Ben {settings?.siteName}
              </h2>

              <div className="prose prose-lg text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">
                {settings?.about}
              </div>

              {/* İletişim Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
                {settings?.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Mail className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-gray-900 font-medium hover:text-purple-600 transition"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <a
                        href={`tel:${settings.phone}`}
                        className="text-gray-900 font-medium hover:text-green-600 transition"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.address && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Konum</p>
                      <p className="text-gray-900 font-medium">
                        {settings.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sosyal Medya */}
              <div className="flex gap-3 mt-6">
                {settings?.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition"
                  >
                    in
                  </a>
                )}

                {settings?.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white hover:opacity-90 transition"
                  >
                    IG
                  </a>
                )}

                {settings?.behance && (
                  <a
                    href={settings.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition"
                  >
                    Be
                  </a>
                )}

                {settings?.dribbble && (
                  <a
                    href={settings.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white hover:bg-pink-600 transition"
                  >
                    Dr
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hizmetler */}
        {services.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Sunduğum Hizmetler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Birlikte Calisalim!</h2>
          <p className="text-xl mb-6 text-blue-100">
            Projeniz icin benimle iletisime gecin
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            <Mail size={20} />
            Iletisime Gec
          </Link>
        </div>
      </div>
    </div>
  )
}
