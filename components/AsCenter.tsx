import Image from 'next/image'

interface IAsCenterProps {
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function AsCenter({}: IAsCenterProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full min-h-[680px] relative md:w-[1920px] md:min-h-[702px]">
        <div 
          className="w-full h-full absolute inset-0 bg-cover bg-center md:hidden"
          style={{
            backgroundImage: 'url("/mo_as.png")'
          }}
        />
        <div 
          className="w-full h-full absolute inset-0 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: 'url("/ascenter_background.png")',
            backgroundBlendMode: 'multiply'
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-5 md:px-0 py-10 md:py-0">
          <div className="flex flex-col items-center gap-[24px] mb-2 md:mb-4">
            <h1 className="text-white text-[30px] md:text-[46px] font-bold font-['Pretendard'] -tracking-normal text-center">HOID A/S 센터</h1>
            <p className="text-white text-[14px] md:text-[22px] font-medium font-['Pretendard'] text-center">제품 고장 및 불량 문의는 고객센터로 연락 부탁드립니다.</p>
          </div>

          <div className="flex flex-col items-center gap-1 w-full md:w-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center w-full md:w-[920px]">
              {/* 공기청정기 · 청소기 · 제습기 */}
              <div className="flex flex-col items-center justify-center gap-2 w-full py-3 md:py-0 md:px-6">
                <p className="text-white text-[14px] md:text-[18px] font-semibold font-['Pretendard'] text-center whitespace-nowrap">
                  공기청정기 · 청소기 · 제습기
                </p>
                <div className="flex items-center justify-center gap-3 flex-nowrap">
                  <Image
                    src="/phone.svg"
                    alt="phone icon"
                    width={38}
                    height={39}
                    className="w-[32px] h-[32px] md:w-[38px] md:h-[39px] shrink-0"
                  />
                  <span className="text-white text-[32px] md:text-[48px] font-bold font-['Pretendard'] text-center whitespace-nowrap">1544-9537</span>
                </div>
              </div>

              <div className="w-full md:w-px h-px md:h-[100px] bg-zinc-300 shrink-0 mx-auto" />

              {/* 무빙 스마트TV */}
              <div className="flex flex-col items-center justify-center gap-2 w-full py-3 md:py-0 md:px-6">
                <p className="text-white text-[14px] md:text-[18px] font-semibold font-['Pretendard'] text-center whitespace-nowrap">
                  무빙 스마트TV
                </p>
                <div className="flex items-center justify-center gap-3 flex-nowrap">
                  <Image
                    src="/phone.svg"
                    alt="phone icon"
                    width={38}
                    height={39}
                    className="w-[32px] h-[32px] md:w-[38px] md:h-[39px] shrink-0"
                  />
                  <span className="text-white text-[28px] md:text-[42px] font-bold font-['Pretendard'] text-center whitespace-nowrap tracking-tight">070-8648-1288</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[448px] h-px bg-zinc-300 mt-4" />

            <p className="text-white text-[18px] md:text-[24px] font-medium font-['Pretendard'] pt-3 text-center">
              운영시간 : AM 10:00 ~ PM 17:00
            </p>
            <span className="text-white text-[14px] md:text-[18px] font-medium font-['Pretendard'] text-center">
              점심시간 PM 13:00 ~ PM 14:00
            </span>
            <span className="text-white text-[13px] md:text-[16px] font-medium font-['Pretendard'] text-center opacity-90">
              (토·일·공휴일 휴무)
            </span>
          </div>

          <button className="w-full md:w-auto mt-4 md:mt-6 px-9 py-5 bg-[#4BA1F1] rounded-[50px]">
            <span className="text-white text-[16px] md:text-[18px] font-medium font-['Pretendard']">
              <a href="/as-center">A/S 센터 자세히 보기</a>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
