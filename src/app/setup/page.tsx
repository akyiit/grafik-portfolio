'use client'

import { useState } from 'react'

export default function SetupPage() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const createAdmin = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/seed', {
        method: 'POST'
      })
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult('Hata oluştu: ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Kurulum</h1>
        <p className="mb-6 text-gray-600">
          İlk admin kullanıcısını oluşturmak için butona tıklayın.
        </p>

        <button
          onClick={createAdmin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Oluşturuluyor...' : 'Admin Kullanıcısı Oluştur'}
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <pre className="text-sm overflow-auto">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
