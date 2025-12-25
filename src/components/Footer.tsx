'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Settings {
  siteName: string
  email: string
  phone: string
  linkedin: string
  instagram: string
  behance: string
  dribbble: string
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    void fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Ayarlar yuklenemedi:', error)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo ve Açıklama */}
          <div>
            <h3 className="text-2xl font-bold text-purple-400 mb-4">
              {settings?.siteName || 'Portfolio'}
            </h3>
            <p className="text-gray-400">
              Yaratici ve etkili tasarim cozumleri
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hizli Linkler</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/portfolio"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Hakkimda
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Iletisim
              </Link>
            </div>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Iletisim</h4>

            <div className="flex flex-col gap-2 text-gray-400">
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-purple-400 transition"
                >
                  {settings.email}
                </a>
              )}

              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="hover:text-purple-400 transition"
                >
                  {settings.phone}
                </a>
              )}
            </div>

            {/* Sosyal Medya */}
            <div className="flex gap-3 mt-4">
              {settings?.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition"
                >
                  in
                </a>
              )}

              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition"
                >
                  IG
                </a>
              )}

              {settings?.behance && (
                <a
                  href={settings.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition"
                >
                  Be
                </a>
              )}

              {settings?.dribbble && (
                <a
                  href={settings.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition"
                >
                  Dr
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} {settings?.siteName || 'Portfolio'}. Tum
            haklari saklidir.
          </p>
        </div>
      </div>
    </footer>
  )
}
