import { useState } from 'react'
import { Heart, User, Menu, X } from 'lucide-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              Khram
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              หน้าแรก
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              เกี่ยวกับ
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              ติดต่อ
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
              <User className="w-6 h-6" />
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                หน้าแรก
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                เกี่ยวกับ
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ติดต่อ
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}