'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

export default function BulkPurchasePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/bulk.png"
          alt="Bulk Purchase Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="md:w-[543px] inline-flex flex-col justify-start items-center gap-4 md:gap-8">
            <div className="self-stretch text-center justify-start text-white text-[26px] md:text-[46px] font-extrabold font-['Pretendard'] capitalize tracking-wide">
              대량 구매 문의
            </div>
            <div className="self-stretch text-center justify-start text-white text-[15px] md:text-[28px] font-medium font-['Pretendard'] capitalize leading-normal md:leading-10">
              양식 작성을 통해 간편하게<br/>견적을 받아보실 수 있습니다.
            </div>
          </div>
        </div>
      </div>

      {/* Service Center Info */}
      <div className="flex justify-center mt-[60px] md:mt-[140px] mb-[60px] md:mb-[200px] px-5 md:px-0">
        <div className="w-full md:w-[1280px] h-auto md:h-[240px] relative bg-[#f7f9fe] rounded-[10px]">
          <div className="block md:hidden p-[30px]">
            <div className="flex flex-col items-center gap-4">
              <Image
                src="/bulk_icon.svg"
                alt="Service Info Icon"
                width={60}
                height={60}
              />
              <div className="text-[#111111] text-[14px] font-bold text-center">
                아래의 양식을 작성해주시면<br/>담당자가 가능한 빠른 답변을 드리겠습니다.
              </div>
              <div className="text-[#366cf2] text-[14px] font-bold text-center">
                담당자 메일 : sunghyun703@gmail.com
              </div>
              <div className="text-[#333333] text-[13px] font-medium text-center">
                문의사항을 가능한 상세히 작성해주시면<br/>보다 상세한 답변이 가능합니다.
              </div>
            </div>
          </div>
          <div className="hidden md:flex">
            <div className="absolute left-[70px] top-[75px]">
              <Image
                src="/bulk_icon.svg"
                alt="Service Info Icon"
                width={90}
                height={90}
              />
            </div>
            <div className="absolute left-[200px] top-[42px]">
              <div className="w-[800px] flex flex-col gap-8">
                <div className="text-[#111111] text-[22px] font-bold text-left">
                  아래의 양식을 작성해주시면 담당자가 가능한 빠른 답변을 드리겠습니다.
                </div>
                <div className="flex flex-col gap-3.5">
                  <div className="text-[#366cf2] text-xl font-bold text-left">
                    담당자 메일 : sunghyun703@gmail.com
                  </div>
                  <div className="text-[#333333] text-[17px] font-medium text-left">
                    문의사항을 가능한 상세히 작성해주시면 보다 상세한 답변이 가능합니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information Form */}
      <div className="flex justify-center px-5 md:px-0">
        <div className="w-full md:w-[1280px]">
          <h2 className="text-[24px] font-bold mb-[20px]">01. 기본정보</h2>
          <div className="w-full md:w-[1280px] h-px bg-[#111111] mb-[20px]" />
          <div className="flex flex-col gap-[20px]">
            <div>
              <div className="flex items-center">
                <label className="w-[140px] text-[15px] font-medium">기업명</label>
                <input 
                  type="text" 
                  className="flex-1 h-[52px] bg-[#f8f8f8] rounded-[5px] px-4"
                  placeholder="기업명을 입력해주세요"
                />
              </div>
              <div className="w-full md:w-[1280px] h-px bg-[#e3e3e3] mt-[20px]" />
            </div>
            <div>
              <div className="flex items-center">
                <label className="w-[140px] text-[15px] font-medium">소속</label>
                <input 
                  type="text" 
                  className="flex-1 h-[52px] bg-[#f8f8f8] rounded-[5px] px-4"
                  placeholder="소속을 입력해주세요"
                />
              </div>
              <div className="w-full md:w-[1280px] h-px bg-[#e3e3e3] mt-[20px]" />
            </div>
            <div>
              <div className="flex items-center">
                <label className="w-[140px] text-[15px] font-medium">이름</label>
                <input 
                  type="text" 
                  className="flex-1 h-[52px] bg-[#f8f8f8] rounded-[5px] px-4"
                  placeholder="이름을 입력해주세요"
                />
              </div>
              <div className="w-full md:w-[1280px] h-px bg-[#e3e3e3] mt-[20px]" />
            </div>
            <div>
              <div className="flex items-center">
                <label className="w-[140px] text-[15px] font-medium">연락처</label>
                <input 
                  type="tel" 
                  className="flex-1 h-[52px] bg-[#f8f8f8] rounded-[5px] px-4"
                  placeholder="연락처를 입력해주세요"
                />
              </div>
              <div className="w-full md:w-[1280px] h-px bg-[#e3e3e3] mt-[20px]" />
            </div>
            <div>
              <div className="flex items-center">
                <label className="w-[140px] text-[15px] font-medium">이메일</label>
                <input 
                  type="email" 
                  className="flex-1 h-[52px] bg-[#f8f8f8] rounded-[5px] px-4"
                  placeholder="이메일을 입력해주세요"
                />
              </div>
              <div className="w-full md:w-[1280px] h-px bg-[#e3e3e3] mt-[20px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="flex justify-center px-5 md:px-0 mt-[100px]">
        <div className="w-full md:w-[1280px]">
          <h2 className="text-[24px] font-bold mb-[20px]">02. 문의사항</h2>
          <div className="w-full md:w-[1280px] h-px bg-[#111111] mb-[20px]" />
          <div className="flex flex-col gap-[20px]">
            <div>
              <div className="flex items-center">
                <label className="hidden md:block w-[140px] text-[15px] font-medium">제목</label>
                <input 
                  type="text" 
                  className="flex-1 h-[52px] bg-[#f8f8f8] rounded-[5px] px-4"
                  placeholder="제목을 입력해주세요"
                />
              </div>
              <div className="w-full md:w-[1280px] h-px bg-[#e3e3e3] mt-[20px]" />
            </div>
            <div>
              <div className="flex items-start">
                <label className="hidden md:block w-[140px] text-[15px] font-medium">내용</label>
                <div className="flex-1">
                  <textarea 
                    className="w-full h-[240px] bg-[#f8f8f8] rounded-[5px] px-4 py-4 resize-none"
                    placeholder="문의하실 내용을 입력해주세요"
                  />
                </div>
              </div>
              <div className="w-full md:w-[1280px] h-px bg-[#e3e3e3] mt-[20px]" />
            </div>
            <div>
              <div className="flex items-center">
                <label className="hidden md:block w-[140px] text-[15px] font-medium">파일첨부</label>
                <div className="flex-1 flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button 
                    onClick={handleFileClick}
                    className="w-[120px] h-[52px] bg-white rounded-[3px] border border-[#e3e3e3] text-[15px] text-[#666666] flex items-center justify-center"
                  >
                    파일선택
                  </button>
                  <div className="flex-1 h-[52px] bg-[#f7f7f7] flex items-center px-4 text-[15px] text-[#666666]">
                    {selectedFile ? selectedFile.name : '선택된 파일 없음'}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[1280px] h-px bg-[#e3e3e3] mt-[20px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="flex justify-center px-5 md:px-0 mt-[140px]">
        <div className="w-full md:w-[1280px]">
          <h2 className="text-[24px] font-bold mb-[20px]">개인정보수집 및 이용동의</h2>
          <div className="w-full md:w-[1280px] h-px bg-[#111111] mb-[20px]" />
          <div className="bg-[#f8f8f8] p-[40px]">
            <p className="text-[#666666] text-base font-medium font-['Pretendard'] capitalize leading-relaxed mb-[30px]">
              HOID는 고객님께서 제품 주문 및 여러 문의사항을 처리함에 있어, 신속하고 원활한 대응을 위해 아래와 같이 최소한의 정보를 수집하며 이에 대한 동의절차를 수행합니다.
            </p>
            <p className="text-[#666666] text-base font-normal font-['Pretendard'] capitalize leading-10">
              - 개인정보를 수집하는 자 : hOID
            </p>
            <div className="text-[#666666] text-base font-normal font-['Pretendard'] capitalize leading-relaxed">
              <p>- 개인정보 수집항목 : 기업명, 소속, 이름, 이메일, 연락처</p>
              <p>- 개인정보 수집목적 : 제품주문, 문의사항 접수등 고객서비스 제공</p>
              <p>- 개인정보 보유기간 : 이용자의 동의 하에 수집된 개인정보 처리방침에 준하여 보유 및 이용됩니다.</p>
            </div>
            <p className="text-[#666666] text-base font-normal font-['Pretendard'] capitalize leading-10 mt-[30px]">
              ※ 개인정보 수집 및 이용에 대하여 미동의 하는 경우 웹사이트를 통한 문의 접수가 불가합니다.
            </p>
            <p className="text-[#666666] text-base font-normal font-['Pretendard'] capitalize leading-relaxed">
              ※ 고객센터 1577-0000로 문의 바랍니다.
            </p>
          </div>
          <div className="flex justify-start mt-[20px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-[15px]">개인정보수집 및 이용에 동의합니다.</span>
            </label>
          </div>
          <div className="flex justify-center mt-[60px] mb-[140px]">
            <button className="px-20 py-[22px] bg-[#51a4e4] rounded-[50px] inline-flex justify-center items-center gap-2.5">
              <span className="text-center text-white text-xl font-semibold font-['Pretendard'] capitalize tracking-tight">보내기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
