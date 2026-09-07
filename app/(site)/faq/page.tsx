'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

export default function FAQPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = [
    '전체',
    '제품',
    '주문/결제',
    '취소/환불',
    '배송',
    'A/S'
  ];

  const faqs = [
    {
      id: 1,
      question: '배송은 얼마나 걸리나요?',
      category: '배송',
      content: (
        <div className="text-[#111111] text-[13px] leading-[26px] w-[280px] md:w-[847px]">
          <div className="mb-4">
            <p className="font-bold mb-2">오후 1시 이전 결제 완료된 주문은 당일 출고됩니다.</p>
            <ol className="list-decimal space-y-1 ml-4">
              <li className="pl-0">이후 주문은 익일 발송되며, 평균 1~2일 내 수령 가능합니다.</li>
              <li className="pl-0">(도서산간 지역은 1~2일 추가 소요될 수 있습니다.)</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      question: '필터는 얼마나 자주 교체해야 하나요?→ 잘 관리해주시면 최대 1년까지 사용 가능합니다.',
      category: '제품',
      content: (
        <div className="text-[#111111] text-[13px] leading-[26px] w-[280px] md:w-[847px]">
          <div className="mb-4">
          <p className="mb-2">사용 환경에 따라 다를 수 있으며, 사용설명서 참고*</p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      question: "필터는 어디서 구매할 수 있나요?",
      category: '제품',
      content: (
        <div className="text-[#111111] text-[13px] leading-[26px] w-[280px] md:w-[847px]">
          <div className="mb-4">
            <p className="font-bold mb-2">hoid.co.kr 자사몰에서 간편하게 구매하실 수 있습니다.</p>
            <ol className="list-decimal space-y-1 ml-4">
              <li className="pl-0">상품 상세 페이지에 [필터 구매 바로가기] 버튼이 함께 제공됩니다.</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      question: '설치는 복잡하지 않나요?',
      category: '제품',
      content: (
        <div className="text-[#111111] text-[13px] leading-[26px] w-[280px] md:w-[847px]">
          <div className="mb-4">
            <p className="font-bold mb-2">아주 간단한 설치 방식으로, 제품 수령 후 코드만 연결하시면 바로 사용 가능합니다.</p>
            <ol className="list-decimal space-y-1 ml-4">
              <li className="pl-0">사용설명서가 동봉되어 있어 누구나 손쉽게 설치할 수 있습니다.</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      question: 'A/S는 어떻게 되나요?',
      category: 'A/S',
      content: (
        <div className="text-[#111111] text-[13px] leading-[26px] w-[280px] md:w-[847px]">
          <div className="mb-4">
            <p className="font-bold mb-2">HOID 제품은 구매일로부터 1년간 무상 A/S를 제공합니다.</p>
            <ol className="list-decimal space-y-1 ml-4">
              <li className="pl-0">사용 중 문제가 발생하면 고객센터 또는 카카오톡 채널로 문의해 주세요.</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      question: 'UV 살균 기능은 어떻게 작동되나요?',
      category: '제품',
      content: (
        <div className="text-[#111111] text-[13px] leading-[26px] w-[280px] md:w-[847px]">
          <div className="mb-4">
            <p className="font-bold mb-2">제품에 탑재된 UV 기능은 **최대 반경 2.8m까지 살균 효과**를 제공합니다.</p>
            <ol className="list-decimal space-y-1 ml-4">
              <li className="pl-0">버튼으로 간편하게 ON/OFF 가능하며, **수면 중 자동 OFF 기능**도 탑재되어 있습니다.</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      question: '전기요금은 얼마나 나오나요?',
      category: '제품',
      content: (
        <div className="text-[#111111] text-[13px] leading-[26px] w-[280px] md:w-[847px]">
          <div className="mb-4">
            <p className="font-bold mb-2">한 달에 약 3천 원 수준의 전기요금으로 사용 가능합니다.</p>
            <ol className="list-decimal space-y-1 ml-4">
              <li className="pl-0">(사용 환경에 따라 다소 차이가 있을 수 있습니다.)</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      question: '아이 있는 집에서도 안전한가요?',
      category: '제품',
      content: (
        <div className="text-[#111111] text-[13px] leading-[26px] w-[280px] md:w-[847px]">
          <div className="mb-4">
            <p className="font-bold mb-2">네, HOID는 아이 눈높이에 맞춘 흡입구 설계와 모서리 마감 처리로<br />어린 자녀가 있는 가정에서도 안심하고 사용할 수 있도록 제작되었습니다.</p>
            <ol className="list-decimal space-y-1 ml-4">
              <li className="pl-0">(사용 환경에 따라 다소 차이가 있을 수 있습니다.)</li>
            </ol>
          </div>
        </div>
      ),
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.slice(0, 3).map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.content === 'string' ? faq.content : "상세 내용은 홈페이지에서 확인해 주세요."
      }
    }))
  };

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="font-pretendard bg-white flex flex-row justify-center w-full">
        <div className="bg-white w-full max-w-[1920px] relative">
          {/* Hero Section */}
          <div className="w-full h-[320px] md:h-[600px] relative bg-cover bg-center">
            <div className="absolute inset-0">
              <Image
                src="/faq.svg"
                alt="FAQ Background"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <div className="w-[320px] md:w-[700px] flex flex-col items-center gap-4">
                <div className="w-full text-center text-white text-[26px] md:text-[46px] font-extrabold tracking-wide">
                  자주 묻는 질문
                </div>
                <div className="w-full text-center text-white text-[15px] md:text-[28px] font-medium leading-relaxed">
                  제품에 문제가 생겼나요?<br />
                  자주 묻는 질문을 먼저 살펴보세요.
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mt-[60px] md:mt-[160px] w-full px-5 md:px-0">
            <div className="flex flex-wrap gap-2 justify-center max-w-[600px]">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`h-[39px] md:h-[43px] px-5 rounded-[30px] flex justify-center items-center whitespace-nowrap transition-colors ${
                    category === selectedCategory
                      ? 'bg-[#51a4e4] text-white'
                      : 'bg-white text-[#888888] outline outline-1 outline-[#dddddd] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-[14px] md:text-[16px] font-semibold font-pretendard">
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="mt-[49px] max-w-[1280px] mx-auto border-0 border-b border-[#e3e3e3]">
            {faqs
              .filter(faq => selectedCategory === '전체' || faq.category.includes(selectedCategory))
              .map((faq) => (
                <Card key={faq.id} className="cursor-pointer overflow-hidden border-0 border-t border-[#e3e3e3] rounded-none shadow-none">
                  <div
                    className="py-[40px] px-[20px]"
                    onClick={() => setSelected(selected === faq.id ? null : faq.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-3 w-[268px] md:w-full">
                        <h2 className="text-[#111111] text-sm font-semibold font-pretendard">{faq.question}</h2>
                        <p className="text-[#51a4e4] text-sm font-semibold font-pretendard">{faq.category}</p>
                      </div>
                      <Image
                        src="/down_arrow.svg"
                        alt="Toggle FAQ"
                        width={18}
                        height={18}
                      />
                    </div>
                  </div>
                  {selected === faq.id && (
                    <div className="px-[30px] pb-[41px] bg-[#fbfbfb] md:py-[40px]">
                      {faq.content}
                    </div>
                  )}
                </Card>
              ))}
          </div>

          <div className="flex justify-center mt-[60px] mb-[200px]">
            <div className="w-44 h-[52px] relative">
              <div className="w-44 h-[52px] absolute bg-white rounded border border-[#dddddd]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex justify-start items-center gap-2">
                <div className="text-black text-sm font-semibold font-pretendard">view more</div>
                <Image
                  src="/plus.svg"
                  alt="View More"
                  width={12}
                  height={12}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
