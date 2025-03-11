'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import Image from 'next/image';

export default function FAQPage() {
  const [selected, setSelected] = useState<number | null>(null);
  
  const faqs = [
    { 
      id: 1, 
      question: '[HO-AP2501] 가습필터 및 수조부 관리방법은 어떻게 하나요?', 
      category: '제품/공기청정기',
      content: (
        <div className="text-[#666666] text-[15px] leading-[26px]">
          <p className="mb-6">노블 가습기 가습 필터는 세척 주기가 1주일 1회, 수조부 매입 1회, 물통청소 매일 1회입니다. 세척가 나타 있는 동안 계속 작동이 멈추가 필요합니다.</p>
          <div className="mb-4">
            <p className="font-bold mb-2">가습필터 세척방법</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>미온수(40도 미만) 외에 가습 필터를 5분 이상 담궈줍니다.</li>
              <li>가볍 필터를 깨끗이 이는수로 가볍 필터를 1회 세척합니다.</li>
              <li>1,2번과 같은 방법으로 두이 이상 반복해줍니다.</li>
            </ol>
          </div>
          <div>
            <p className="font-bold mb-2">수조부 세척방법</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>수조부 부품들을 부드러운 천이나 칫솔에 중성세제를 묻혀 꼼꼼히 세척해줍니다.</li>
              <li>세제이 묻은 수조부 부품들은 마른 천으로 닦고 자연건조시킨후 건조해줍니다.</li>
            </ol>
          </div>
        </div>
      ),
    },
    { 
      id: 2, 
      question: '[HO-AP2501] 에어매칭 필터교환은 어떻게 하나요', 
      category: '제품/공기청정기',
      content: "필터 교체 방법 내용..."
    },
    { 
      id: 3, 
      question: "[HO-AP2501] 에러 'E21' 또는 '물통없음' 알림이 발생했어요", 
      category: '제품/공기청정기',
      content: "에러 해결 방법 내용..."
    },
    { 
      id: 4, 
      question: '[HO-AP2501] 자가관리 필터 교환방법을 알고싶어요', 
      category: '제품/공기청정기',
      content: "자가관리 필터 교환 방법 내용..."
    },
    { 
      id: 5, 
      question: 'UVC 기능은 무엇인가요', 
      category: '제품/공기청정기',
      content: "UVC 기능 설명 내용..."
    },
    { 
      id: 6, 
      question: '에어매칭 필터 종류와 기능을 알고싶어요', 
      category: '제품/공기청정기',
      content: "에어매칭 필터 종류와 기능 설명..."
    },
    { 
      id: 7, 
      question: '마이펫 모드는 어떤 기능이 있는건가요', 
      category: '제품/공기청정기',
      content: "마이펫 모드 기능 설명..."
    },
    { 
      id: 8, 
      question: '필터를 집에서 청소기나 물로 청소해도 되나요', 
      category: '제품/공기청정기',
      content: "필터 청소 관련 설명..."
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/faq.svg"
          alt="FAQ Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 md:px-0">
          <h1 className="text-[32px] md:text-4xl font-bold text-white text-center">자주 묻는 질문</h1>
          <p className="text-base md:text-lg mt-4 text-white text-center whitespace-pre-line">
            {"제품에 문제가 생겼나요?\n먼저 FAQ를 확인해보세요."}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap md:inline-flex justify-center items-center gap-2 mt-20 w-full px-5 md:px-0">
        <div className="w-[calc(33.33%-8px)] md:w-auto">
          <button className="w-full md:w-auto px-[25px] py-3 bg-[#51a4e4] rounded-[30px] flex justify-center items-center gap-2.5">
            <span className="text-white text-[14px] md:text-base font-bold font-pretendard">전체</span>
          </button>
        </div>
        <div className="w-[calc(33.33%-8px)] md:w-auto">
          <button className="w-full md:w-auto px-[25px] py-3 bg-white rounded-[30px] outline outline-1 outline-[#dddddd] flex justify-center items-center gap-2.5">
            <span className="text-[#888888] text-[14px] md:text-base font-semibold font-pretendard">제품</span>
          </button>
        </div>
        <div className="w-[calc(33.33%-8px)] md:w-auto">
          <button className="w-full md:w-auto px-[25px] py-3 bg-white rounded-[30px] outline outline-1 outline-[#dddddd] flex justify-center items-center gap-2.5">
            <span className="text-[#888888] text-[14px] md:text-base font-semibold font-pretendard">주문/결제</span>
          </button>
        </div>
        <div className="w-[calc(33.33%-8px)] md:w-auto mt-2 md:mt-0">
          <button className="w-full md:w-auto px-[25px] py-3 bg-white rounded-[30px] outline outline-1 outline-[#dddddd] flex justify-center items-center gap-2.5">
            <span className="text-[#888888] text-[14px] md:text-base font-semibold font-pretendard">취소/환불</span>
          </button>
        </div>
        <div className="w-[calc(33.33%-8px)] md:w-auto mt-2 md:mt-0">
          <button className="w-full md:w-auto px-[25px] py-3 bg-white rounded-[30px] outline outline-1 outline-[#dddddd] flex justify-center items-center gap-2.5">
            <span className="text-[#888888] text-[14px] md:text-base font-semibold font-pretendard">배송</span>
          </button>
        </div>
        <div className="w-[calc(33.33%-8px)] md:w-auto mt-2 md:mt-0">
          <button className="w-full md:w-auto px-[25px] py-3 bg-white rounded-[30px] outline outline-1 outline-[#dddddd] flex justify-center items-center gap-2.5">
            <span className="text-[#888888] text-[14px] md:text-base font-semibold font-pretendard">A/S</span>
          </button>
        </div>
      </div>

      {/* FAQ List */}
      <div className="mt-10 max-w-[1280px] mx-auto">
        {faqs.map((faq) => (
          <Card key={faq.id} className="cursor-pointer overflow-hidden border-0 border-b border-[#e3e3e3] rounded-none shadow-none">
            <div 
              className="py-[41px] px-[30px]" 
              onClick={() => setSelected(selected === faq.id ? null : faq.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <h2 className="text-[#111111] text-lg font-semibold font-pretendard">{faq.question}</h2>
                  <p className="text-[#51a4e4] text-sm font-semibold font-pretendard">{faq.category}</p>
                </div>
                <img 
                  src="/down_arrow.svg" 
                  alt="Toggle FAQ" 
                  className="w-[18px] h-[18px]"
                />
              </div>
            </div>
            {selected === faq.id && (
              <div className="px-[30px] pb-[41px] pt-4 bg-[#fbfbfb]">
                {faq.content}
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-center my-[30px]">
        <div className="w-44 h-[52px] relative">
          <div className="w-44 h-[52px] absolute bg-white rounded border border-[#dddddd]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex justify-start items-center gap-2">
            <div className="text-black text-sm font-semibold font-pretendard">view more</div>
            <img 
              src="/plus.svg" 
              alt="View More" 
              className="w-3 h-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
