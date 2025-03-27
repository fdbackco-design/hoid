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
    { href: "/store", label: "스토어", hasIcon: true },
  ];

  const renderMenuItem = (item: typeof menuItems[0], isPc: boolean = false) => {
    if (item.hasIcon && isPc) {
      return (
        <div className="flex items-center gap-2">
          {item.label}
          <Image
            src="/header_store.svg"
            alt="Store Icon"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </div>
      );
    }
    return item.label;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#E4E4E4] z-50">
      {/* PC Header */}
      <div className="hidden md:flex w-full max-w-[1480px] mx-auto h-[90px] items-center justify-between px-[40px]">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="HOID Logo"
            width={96}
            height={25}
            className="w-[96px] h-[25px]"
            priority
          />
        </Link>
        
        <nav>
          <ul className="flex items-center gap-[88px]">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  className="text-[#111111] text-[18px] tracking-[-0.18px] font-semibold font-pretendard hover:text-[#666666] transition-colors"
                >
                  {renderMenuItem(item, true)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="w-full md:hidden">
        <div className="flex items-center justify-between h-[72px] px-5">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="HOID Logo"
              width={70}
              height={18}
              className="w-[70px] h-[18px]"
              priority
            />
          </Link>

          <button 
            className="w-[20px] h-[18px] flex items-center justify-center p-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <Image
              src="/hamburger.svg"
              alt="Menu"
              width={20}
              height={18}
              className="w-[20px] h-[18px]"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E4E4E4]">
            <nav className="px-5">
              <ul className="py-4">
                {menuItems.map((item, index) => (
                  <li key={index} className="py-2">
                    <Link 
                      href={item.href}
                      className="block text-[14px] leading-[21px] text-[#111111] font-pretendard font-normal hover:text-[#666666] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {renderMenuItem(item)}
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