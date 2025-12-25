'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  ArrowLeft,
  Mail,
  MailOpen,
  Trash2,
  Eye,
  Calendar,
  User
} from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function MessagesPage() {
  const router = useRouter()
  const { status } = useSession()
  const [messages, setMessages] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchMessages()
    }
  }, [status, router])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact')
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Mesajlar yüklenemedi:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read })
      })

      if (response.ok) {
        setMessages(
          messages.map((m) => (m.id === id ? { ...m, read } : m))
        )
      }
    } catch (error) {
      console.error('Hata:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessages(messages.filter((m) => m.id !== id))
        alert('Mesaj silindi!')
      } else {
        alert('Mesaj silinemedi!')
      }
    } catch (error) {
      console.error('Hata:', error)
      alert('Bir hata oluştu!')
    }
  }

  const filteredMessages = messages.filter((m) => {
    if (filter === 'unread') return !m.read
    if (filter === 'read') return m.read
    return true
  })

  const unreadCount = messages.filter((m) => !m.read).length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mesajlar</h1>
                <p className="text-sm text-gray-600">
                  {unreadCount} okunmamış mesaj
                </p>
              </div>
            </div>

            {/* Filtre Butonları */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Tümü ({messages.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'unread'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Okunmamış ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'read'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Okundu ({messages.length - unreadCount})
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredMessages.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Mail size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all'
                ? 'Henüz mesaj yok'
                : filter === 'unread'
                ? 'Okunmamış mesaj yok'
                : 'Okunmuş mesaj yok'}
            </h3>
            <p className="text-gray-600">
              İletişim formundan gelen mesajlar burada görünecek
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition ${
                  !message.read ? 'border-l-4 border-purple-600' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {message.read ? (
                      <MailOpen className="text-gray-400" size={24} />
                    ) : (
                      <Mail className="text-purple-600" size={24} />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {message.subject}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {message.name}
                        </span>
                        <span>{message.email}</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(message.createdAt).toLocaleDateString(
                            'tr-TR'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkAsRead(message.id, !message.read)}
                      className={`p-2 rounded-lg transition ${
                        message.read
                          ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          : 'bg-purple-100 hover:bg-purple-200 text-purple-600'
                      }`}
                      title={
                        message.read
                          ? 'Okunmadı olarak işaretle'
                          : 'Okundu olarak işaretle'
                      }
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
                      title="Sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}