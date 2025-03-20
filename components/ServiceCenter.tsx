import Image from 'next/image'
import Link from 'next/link'

interface IServiceCard {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

const ServiceCards: IServiceCard[] = [
  {
    icon: (
      <div className="w-[50px] md:w-[62px] h-[50px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_1.svg"
          alt="사용 설명서 아이콘"
          width={62}
          height={62}
          className="object-contain md:w-[62px] md:h-[62px]"
        />
      </div>
    ),
    title: "사용 설명서",
    description: "제품에 대해 궁금하신가요?\n사용설명서에서 확인하실 수 있습니다.",
    link: "/manual"
  },
  {
    icon: (
      <div className="w-[50px] md:w-[62px] h-[50px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_2.svg"
          alt="A/S 안내 아이콘"
          width={62}
          height={62}
          className="object-contain md:w-[62px] md:h-[62px]"
        />
      </div>
    ),
    title: "A/S 안내",
    description: "제품에 문제가 생기셨나요?\nA/S센터에서 서비스를\n받아보세요.",
    link: "/as-guide"
  },
  {
    icon: (
      <div className="w-[50px] md:w-[62px] h-[50px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_3.svg"
          alt="FAQ 아이콘"
          width={62}
          height={62}
          className="object-contain md:w-[62px] md:h-[62px]"
        />
      </div>
    ),
    title: "FAQ",
    description: "자주묻는 질문에서\n궁금하신 사항을 바로 확인\n하실 수 있습니다.",
    link: "/faq"
  },
  {
    icon: (
      <div className="w-[50px] md:w-[62px] h-[50px] md:h-[62px] bg-white rounded-full flex items-center justify-center">
        <Image
          src="/service_4.svg"
          alt="1:1 문의 아이콘"
          width={62}
          height={62}
          className="object-contain md:w-[62px] md:h-[62px]"
        />
      </div>
    ),
    title: "1:1 문의",
    description: "대량구매, 제품문의 등\n무엇이든 문의주세요.\n답변해드립니다.",
    link: "/inquiry"
  }
]

export default function ServiceCenter() {
  return (
    <section className="w-full py-[40px] md:py-[90px] mt-[60px] md:mt-0">
      <div className="text-center mb-[40px] md:mb-[50px] px-5 md:px-0">
        <h2 className="font-pretendard text-[24px] md:text-[48px] font-bold text-black mb-3 md:mb-5">HOID 서비스 센터</h2>
        <p className="text-[#111111] text-[14px] md:text-[18px] font-medium">
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
            <div className="grid grid-cols-2 gap-x-7 gap-y-[100px] px-5">
              {ServiceCards.map((card, index) => (
                <Link 
                  href={card.link} 
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div className="w-full flex flex-col items-center relative">
                    <div className="absolute -top-[40px]">
                      {card.icon}
                    </div>
                    <div className="flex flex-col items-center text-center mt-[25px]">
                      <h3 className="text-[#333333] text-[15px] font-semibold mb-2">{card.title}</h3>
                      <p className="text-[#666666] text-[13px] leading-[1.6] whitespace-pre-line">{card.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* PC 레이아웃 */}
          <div className="hidden md:block">
            {ServiceCards.map((card, index) => {
              const positions = [
                { left: '240px', top: '150px' },     // 1x1
                { left: '600px', top: '150px' },     // 1x2
                { left: '240px', top: '460px' },     // 2x1
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
                      <h3 className="text-[#333333] text-lg font-bold mb-3">{card.title}</h3>
                      <p className="text-[#666666] text-sm leading-[24px] whitespace-pre-line">{card.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
            <div className="absolute left-[520px] top-0 w-[1px] h-full bg-[#E4E4E4]" />
            <div className="absolute left-0 top-[320px] w-full h-[1px] bg-[#E4E4E4]" />
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