import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

interface IServiceCard {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

const ServiceCards: IServiceCard[] = [
  {
    icon: (
      <div className="w-[54px] h-[54px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_1.svg"
          alt="사용 설명서 아이콘"
          width={32}
          height={32}
          className="w-[54px] h-[54px] md:w-[62px] md:h-[62px] object-contain"
        />
      </div>
    ),
    title: "사용 설명서",
    description: "제품에 대해 궁금하신가요? 사용설명서에서 확인하실 수 있습니다.",
    link: "/manual"
  },
  {
    icon: (
      <div className="w-[54px] h-[54px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_2.svg"
          alt="A/S 안내 아이콘"
          width={32}
          height={32}
          className="w-[54px] h-[54px] md:w-[62px] md:h-[62px] object-contain"
        />
      </div>
    ),
    title: "A/S 안내",
    description: "제품에 문제가 생기셨나요? A/S센터에서 서비스를 받아보세요.",
    link: "/as-guide"
  },
  {
    icon: (
      <div className="w-[54px] h-[54px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_3.svg"
          alt="FAQ 아이콘"
          width={32}
          height={32}
          className="w-[54px] h-[54px] md:w-[62px] md:h-[62px] object-contain"
        />
      </div>
    ),
    title: "FAQ",
    description: "자주묻는 질문에서 궁금하신 사항을 바로 확인 하실 수 있습니다.",
    link: "/faq"
  },
  {
    icon: (
      <div className="w-[54px] h-[54px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_4.svg"
          alt="1:1 문의 아이콘"
          width={32}
          height={32}
          className="w-[54px] h-[54px] md:w-[62px] md:h-[62px] object-contain"
        />
      </div>
    ),
    title: "1:1 문의",
    description: "대량구매, 제품문의 등 무엇이든 문의주세요. 답변해드립니다.",
    link: "/inquiry"
  }
]

export default function ServiceCenter() {
  return (
    <section className="w-full py-[40px] md:py-[183px] mt-[40px] md:mt-0">
      <div className="font-pretendard text-center mb-[40px] md:mb-[90px] px-5 md:px-0">
        <h2 className="text-[24px] md:text-[48px] font-semibold text-black mb-[12px] md:mb-5">HOID 서비스 센터</h2>
        <p className="text-[#111111] text-[15px] md:text-[18px] font-medium">
          <span className="md:hidden">제품 관련 문제사항을<br /></span>
          <span className="hidden md:inline">제품 관련 문제사항을 </span>
          해결할 수 있도록 도와드립니다.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center">
        {/* 이미지 섹션 - 모바일 */}
        <div className="relative w-full h-[440px] md:hidden">
          <Image
            src="/service_5.svg"
            alt="Service Center Visual"
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-[880px] h-[520px] md:h-[640px] bg-[#F5F5F5] relative">
          {/* 모바일 그리드 */}
          <div className="md:hidden absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-x-14 gap-y-[50px] px-4 relative">
              {/* 수직 구분선 - 상단 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[-22px] h-[207px] w-[1px] bg-[#E4E4E4]" />
              {/* 수직 구분선 - 하단 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[204px] h-[207px] w-[1px] bg-[#E4E4E4]" />
              {/* 수평 구분선 - 좌측 */}
              <div className="absolute top-[196px] -translate-y-1/2 w-[140px] h-[1px] left-[10px] bg-[#E4E4E4]" />
              
              <div className="absolute top-[196px] -translate-y-1/2 w-[140px] h-[1px] left-[178px] bg-[#E4E4E4]" />

              {ServiceCards.map((card, index) => (
                <Link 
                  href={card.link} 
                  key={index}
                  className="flex flex-col items-center"
                >
                  <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="flex flex-col items-center w-[120px] relative bg-transparent p-0">
                      {card.icon}
                      <div className="flex flex-col items-center mt-5">
                        <h3 className="w-fit font-pretendard font-semibold text-[#333333] text-lg tracking-[-0.18px] leading-[normal] whitespace-nowrap text-center mb-3">
                          {card.title}
                        </h3>
                        <p className="w-[120px] font-pretendard font-medium text-[#666666] text-sm tracking-[-0.14px] leading-[22px] text-center whitespace-pre-line">
                          {card.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* PC 레이아웃 */}
          <div className="hidden md:block">
            {ServiceCards.map((card, index) => {
              const positions = [
                { left: '274px', top: '150px' },     // 1x1
                { left: '600px', top: '150px' },     // 1x2
                { left: '274px', top: '460px' },     // 2x1
                { left: '600px', top: '460px' }      // 2x2
              ];
              
              return (
                <Link 
                  href={card.link} 
                  key={index} 
                  className="absolute"
                  style={{
                    left: positions[index].left,
                    top: positions[index].top
                  }}
                >
                  <div className="w-[172px] flex flex-col items-center relative">
                    <div className="absolute -top-[86px]">
                      {card.icon}
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <h3 className="text-[#333333] text-[22px] font-bold mb-3">{card.title}</h3>
                      <p className="text-[#666666] text-[16px] leading-[24px] whitespace-pre-line">{card.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
            {/* PC 수직 구분선 */}
            <div className="absolute left-[520px] top-[60px] w-[1px] h-[240px] bg-[#E4E4E4]" />
            <div className="absolute left-[520px] top-[340px] w-[1px] h-[240px] bg-[#E4E4E4]" />
            
            {/* PC 수평 구분선 */}
            <div className="absolute left-[220px] top-[320px] w-[280px] h-[1px] bg-[#E4E4E4]" />
            <div className="absolute left-[540px] top-[320px] w-[280px] h-[1px] bg-[#E4E4E4]" />
          </div>
        </div>

        {/* 이미지 섹션 - PC */}
        <div className="hidden md:block relative w-[1040px] h-[640px]">
          <Image
            src="/service_5.svg"
            alt="Service Center Visual"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
} 