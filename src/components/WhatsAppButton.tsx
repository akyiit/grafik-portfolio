'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const [phone, setPhone] = useState<string>('')
  const [isVisible, setIsVisible] = useState(true) // Her zaman görünür yap
  const [showTooltip, setShowTooltip] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      
      console.log('Settings data:', data) // Debug için
      
      if (data.phone) {
        // Telefon numarasını WhatsApp formatına çevir (sadece rakamlar)
        const cleanPhone = data.phone.replace(/\D/g, '')
        console.log('Clean phone:', cleanPhone) // Debug için
        setPhone(cleanPhone)
      }
    } catch (error) {
      console.error('Ayarlar yuklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsAppClick = () => {
    console.log('WhatsApp clicked, phone:', phone) // Debug için
    
    if (!phone) {
      alert('Telefon numarasi bulunamadi. Lutfen Site Ayarlari\'ndan telefon ekleyin.')
      return
    }

    const message = encodeURIComponent('Merhaba! Portfolyonuzu gordum ve iletisime gecmek istiyorum.')
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`
    
    console.log('WhatsApp URL:', whatsappUrl) // Debug için
    
    window.open(whatsappUrl, '_blank')
  }

  // Loading durumunda hiçbir şey gösterme
  if (isLoading) {
    return null
  }

  // Telefon numarası yoksa gösterme
  if (!phone) {
    console.warn('Telefon numarasi yok, WhatsApp butonu gosterilmiyor')
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
            WhatsApp ile mesaj gonder
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
          aria-label="WhatsApp ile iletisime gec"
          title="WhatsApp ile iletisime gec"
        >
          {/* Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
          
          {/* Icon */}
          <MessageCircle 
            size={32} 
            className="relative z-10 group-hover:scale-110 transition-transform" 
          />
        </button>
      </div>
    </div>
  )
}