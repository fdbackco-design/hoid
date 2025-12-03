// app/(routes)/service-center/page.tsx  (또는 해당 컴포넌트 파일)
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface IServiceOption {
  label: string;
  href: string; // public/ 아래 정적 PDF 경로(예: "/guidehoid2.pdf")
}

interface IServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  // 드롭다운 카드
  custom?: boolean;
  options?: IServiceOption[];
  // 일반 링크 카드
  link?: string;
}

const ServiceCards: IServiceCard[] = [
  {
    // ✅ 드롭다운(카탈로그 선택) 카드
    icon: (
      <div className="w-[54px] h-[54px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_1.svg"
          alt="사용 설명서 아이콘"
          width={32}
          height={32}
          className="object-contain w-[32px] h-[32px]"
        />
      </div>
    ),
    title: "사용 설명서",
    description: "제품에 대해 궁금하신가요? 사용설명서에서 확인하실 수 있습니다.",
    custom: true,
    options: [
      { label: "호이드 에어로퓨전 공기청정기 5in1", href: "/호이드 에어로퓨전 공기청정기 5 in 1.pdf" },
      { label: "호이드 오브제 무선 청소기", href: "/호이드 오브제 무선 청소기.pdf" },
      { label: "호이드 UV살균 공기청정 선풍기", href: "/guide.pdf" },
    ],
  },
  {
    icon: (
      <div className="w-[54px] h-[54px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_2.svg"
          alt="A/S 안내 아이콘"
          width={32}
          height={32}
          className="object-contain w-[32px] h-[32px]"
        />
      </div>
    ),
    title: "A/S 안내",
    description: "제품에 문제가 생기셨나요? A/S센터에서 서비스를 받아보세요.",
    link: "/as-center",
  },
  {
    icon: (
      <div className="w-[54px] h-[54px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_3.svg"
          alt="FAQ 아이콘"
          width={32}
          height={32}
          className="object-contain w-[32px] h-[32px]"
        />
      </div>
    ),
    title: "FAQ",
    description: "자주묻는 질문에서 궁금하신 사항을 바로 확인 하실 수 있습니다.",
    link: "/faq",
  },
  {
    icon: (
      <div className="w-[54px] h-[54px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_4.svg"
          alt="1:1 문의 아이콘"
          width={32}
          height={32}
          className="object-contain w-[32px] h-[32px]"
        />
      </div>
    ),
    title: "1:1 문의",
    description: "대량구매, 제품문의 등 무엇이든 문의주세요. 답변해드립니다.",
    link: "/bulk-purchase",
  },
];

export default function ServiceCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-10 md:py-24 mt-10 md:mt-0">
      {/* 헤더 */}
      <div className="text-center mb-10 md:mb-20 px-5">
        <h2 className="text-[24px] md:text-[42px] font-semibold text-black mb-3 md:mb-5">
          HOID 서비스 센터
        </h2>
        <p className="text-[#111] text-[15px] md:text-[18px] font-medium">
          제품 관련 문제사항을 해결할 수 있도록 도와드립니다.
        </p>
      </div>

      {/* 전체 레이아웃 */}
      <div className="flex flex-col xl:flex-row justify-center items-stretch gap-10 xl:gap-16 px-5 md:px-8 xl:px-0 max-w-[1280px] mx-auto">
        {/* 카드 섹션 */}
        <div className="bg-[#F5F5F5] rounded-2xl w-full xl:w-[880px] flex flex-col justify-center p-6 md:p-12">
          <div className="grid grid-cols-2 gap-8 sm:gap-x-10 sm:gap-y-12">
            {ServiceCards.map((card, i) => {
              // ✅ 드롭다운(카탈로그 선택) 카드
              if (card.custom && card.options?.length) {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center text-center group"
                    onMouseEnter={() => setOpenIndex(i)}   // 데스크톱 hover
                    onMouseLeave={() => setOpenIndex(prev => (prev === i ? null : prev))}
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(prev => (prev === i ? null : i))} // 모바일 토글
                      className="flex flex-col items-center text-center"
                    >
                      <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="p-0 flex flex-col items-center text-center">
                          <div className="mb-5 transition-transform duration-300 group-hover:scale-105">
                            {card.icon}
                          </div>
                          <h3 className="font-pretendard font-semibold text-[#333] text-base md:text-lg mb-2">
                            {card.title}
                          </h3>
                          <p className="font-pretendard text-[#666] text-sm md:text-[15px] leading-6 max-w-[220px]">
                            {card.description}
                          </p>
                        </CardContent>
                      </Card>
                    </button>

                    {/* 드롭다운 패널 */}
                    <div
                      className={`z-10 absolute top-full mt-3 w-[260px] rounded-xl border bg-white shadow-md transition-all ${
                        isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <ul className="py-2">
                        {card.options.map((opt, idx) => (
                          <li key={idx}>
                            {/* PDF는 새 탭에서 열기 — 다운로드 X */}
                            <a
                              href={opt.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                              onClick={() => setOpenIndex(null)}
                            >
                              <span className="text-[14px] text-[#333]">{opt.label}</span>
                              {/* 외부열람 아이콘 */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 text-gray-500"
                                aria-hidden
                              >
                                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
                              </svg>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }

              // ✅ 일반 링크 카드 (내부 라우트)
              return (
                <Link
                  key={i}
                  href={card.link!}
                  className="flex flex-col items-center text-center group"
                >
                  <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="p-0 flex flex-col items-center text-center">
                      <div className="mb-5 transition-transform duration-300 group-hover:scale-105">
                        {card.icon}
                      </div>
                      <h3 className="font-pretendard font-semibold text-[#333] text-base md:text-lg mb-2">
                        {card.title}
                      </h3>
                      <p className="font-pretendard text-[#666] text-sm md:text-[15px] leading-6 max-w-[220px]">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 이미지 섹션 */}
        <div className="relative w-full xl:w-[500px] aspect-[16/9] md:aspect-[4/3] xl:aspect-auto rounded-2xl overflow-hidden">
          <Image
            src="/service_5.jpg"
            alt="Service Center Visual"
            fill
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}