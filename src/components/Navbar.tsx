'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-purple-600">
            BHCC DESİGN
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Hakkimda
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition font-medium"
            >
              Iletisim
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-purple-600 transition font-medium"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-purple-600 transition font-medium"
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-purple-600 transition font-medium"
              >
                Hakkimda
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition font-medium text-center"
              >
                Iletisim
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}