'use client'

import { useState } from 'react'

export default function TestContactPage() {
  const [formData, setFormData] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    subject: 'Web Sitesi Projesi',
    message: 'Merhaba, yeni bir web sitesi projesi için sizinle görüşmek istiyorum. Detayları konuşabilir miyiz?'
  })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setResult('✅ Mesaj başarıyla gönderildi!')
      } else {
        setResult('❌ Hata: ' + JSON.stringify(data))
      }
    } catch (error) {
      setResult('❌ Hata oluştu: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📧 Test Mesajı Gönder
          </h1>
          <p className="text-gray-600 mb-6">
            İletişim formunu test etmek için mesaj gönderin
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İsim
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konu
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mesaj
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
            </button>
          </form>

          {result && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                result.includes('✅')
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          )}

          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold text-gray-900 mb-2">
              🎯 Hızlı Test Butonları
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: 'Mehmet Demir',
                    email: 'mehmet@example.com',
                    subject: 'Logo Tasarımı',
                    message: 'Firmamız için modern bir logo tasarımı yaptırmak istiyoruz.'
                  })
                }
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm"
              >
                Test Mesajı 1
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: 'Ayşe Kaya',
                    email: 'ayse@example.com',
                    subject: 'Sosyal Medya Tasarımları',
                    message: 'Instagram için gönderi tasarımları yaptırabilir miyiz?'
                  })
                }
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm"
              >
                Test Mesajı 2
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: 'Can Öztürk',
                    email: 'can@example.com',
                    subject: 'Fiyat Teklifi',
                    message: 'Web sitesi tasarımı için fiyat teklifi alabilir miyim?'
                  })
                }
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm"
              >
                Test Mesajı 3
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: 'Zeynep Arslan',
                    email: 'zeynep@example.com',
                    subject: 'Kurumsal Kimlik',
                    message: 'Yeni açılan firmamız için kurumsal kimlik çalışması yaptırmak istiyoruz.'
                  })
                }
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition text-sm"
              >
                Test Mesajı 4
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}
