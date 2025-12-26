'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Mail,
  Settings,
  LogOut,
  Users
} from 'lucide-react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
    unreadMessages: 0
  })

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats()
    }
  }, [status])

  const fetchStats = async () => {
    try {
      const [projectsRes, servicesRes, contactsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/services'),
        fetch('/api/contact')
      ])

      const projects = await projectsRes.json()
      const services = await servicesRes.json()
      const contacts = await contactsRes.json()

      setStats({
        projects: projects.length || 0,
        services: services.length || 0,
        messages: contacts.length || 0,
        unreadMessages: contacts.filter((c: any) => !c.read).length || 0
      })
    } catch (error) {
      console.error('İstatistikler yüklenemedi:', error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Hoş geldin, {session?.user?.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <LogOut size={18} />
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FolderKanban className="text-blue-600" size={32} />}
            title="Toplam Proje"
            value={stats.projects}
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<Briefcase className="text-green-600" size={32} />}
            title="Hizmetler"
            value={stats.services}
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<Mail className="text-purple-600" size={32} />}
            title="Toplam Mesaj"
            value={stats.messages}
            bgColor="bg-purple-50"
          />
          <StatCard
            icon={<Mail className="text-red-600" size={32} />}
            title="Okunmamış"
            value={stats.unreadMessages}
            bgColor="bg-red-50"
          />
        </div>

        {/* Menü Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MenuCard
            icon={<FolderKanban size={40} />}
            title="Projeler"
            description="Portfolyo projelerini yönet"
            onClick={() => router.push('/admin/projects')}
            color="blue"
          />
          <MenuCard
            icon={<Briefcase size={40} />}
            title="Hizmetler"
            description="Sunduğun hizmetleri düzenle"
            onClick={() => router.push('/admin/services')}
            color="green"
          />
          <MenuCard
            icon={<Mail size={40} />}
            title="Mesajlar"
            description="İletişim formundan gelen mesajlar"
            onClick={() => router.push('/admin/messages')}
            color="purple"
          />
          <MenuCard
            icon={<Settings size={40} />}
            title="Site Ayarları"
            description="Genel site ayarlarını düzenle"
            onClick={() => router.push('/admin/settings')}
            color="gray"
          />
          <MenuCard
            icon={<Users size={40} />}
            title="Profil"
            description="Hesap bilgilerini güncelle"
            onClick={() => router.push('/admin/profile')}
            color="indigo"
          />
          <MenuCard
            icon={<LayoutDashboard size={40} />}
            title="Siteyi Görüntüle"
            description="Ana siteyi ziyaret et"
            onClick={() => window.open('/', '_blank')}
            color="orange"
          />
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({
  icon,
  title,
  value,
  bgColor
}: {
  icon: React.ReactNode
  title: string
  value: number
  bgColor: string
}) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  )
}

// Menu Card Component
function MenuCard({
  icon,
  title,
  description,
  onClick,
  color
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  color: string
}) {
  const colors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    gray: 'bg-gray-600 hover:bg-gray-700',
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    orange: 'bg-orange-600 hover:bg-orange-700'
  }

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-left group"
    >
      <div
        className={`${colors[color as keyof typeof colors]} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </button>
  )
}