import Image from 'next/image'
import Link from 'next/link'

export default function AsIntro() {
  return (
    <div className="w-full overflow-hidden">
      <section className="relative w-full md:w-[1680px] h-[400px] md:h-[680px] mx-auto">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/as.png"
            alt="A/S 센터 배경"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>

        {/* 중앙 컨텐츠 영역 */}
        <div className="font-pretendard absolute inset-0 flex items-center justify-center">
          <div className="w-[290px] md:w-[1200px] flex flex-col items-center text-center px-5 md:px-0">
            <h2 className="w-full text-[24px] md:text-[46px] font-bold text-white leading-[1.4] md:leading-[1.2] break-keep md:whitespace-nowrap whitespace-pre-line">
              {"HOID 제품 \n전문가와 상담하세요"}
            </h2>
            <p className="w-full mt-3 md:mt-7 text-[14px] md:text-xl text-white font-medium leading-[22px] md:leading-loose">
              HOID는 A/S 센터를 상시 운영하고 있습니다.<br className="hidden md:block" />
              제품 문제가 생겼을 경우 언제든 서비스를<br className="md:hidden" /> 받으실 수 있습니다.
            </p>
            <Link 
              href="/as-center"
              className="inline-flex justify-center items-center px-[24px] md:px-[36px] py-[12px] md:py-[18px] w-[160px] md:w-[220px] h-[40px] md:h-[55px] bg-[#51A4E4] rounded-[50px] text-white text-[13px] md:text-[16px] font-semibold tracking-[0.01em] hover:bg-[#4293d3] transition-colors mt-[32px] md:mt-10"
            >
              A/S 센터 자세히 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 