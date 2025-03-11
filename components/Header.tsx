"use client";

import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/as-center", label: "A/S 센터" },
    { href: "/faq", label: "자주 묻는 질문" },
    { href: "/bulk-purchase", label: "대량 구매 문의" },
    { href: "/store", label: "스토어" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="HOID Logo"
            width={80}
            height={21}
            className="w-[80px] h-[21px] md:w-[100px] md:h-[40px]"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-[88px]">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  className="text-[14px] leading-[21px] text-black hover:text-gray-600 transition-colors font-normal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4">
            <ul className="py-4 space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href}
                    className="block text-[14px] leading-[21px] text-black hover:text-gray-600 transition-colors font-normal py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
} 