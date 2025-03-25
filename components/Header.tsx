"use client";

import Link from 'next/link'
import Image from 'next/image'
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
      {/* PC Header */}
      <div className="hidden md:flex container mx-auto px-4 h-[90px] items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="HOID Logo"
            width={96}
            height={25}
            className="w-[100px] h-[40px]"
            priority
          />
        </Link>
        
        <nav className="block">
          <ul className="flex items-center space-x-[88px] pt-[35px] pb-[35px]">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  className="justify-start text-black text-lg font-semibold font-['Pretendard'] capitalize"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="w-[360px] mx-auto">
        <div className="md:hidden flex items-center justify-between h-[72px] w-[320px] mx-5">
          <Link href="/" className="h-[18px]">
            <Image
              src="/logo.svg"
              alt="HOID Logo"
              width={70}
              height={18}
              priority
            />
          </Link>

          <button 
            className="w-5 h-[18px] flex items-center justify-center p-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <Image
              src="/hamburger.svg"
              alt="Menu"
              width={20}
              height={18}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="w-[320px] mx-5">
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
      </div>
    </header>
  )
} 