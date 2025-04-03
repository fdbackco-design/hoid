import Image from 'next/image'
import Link from 'next/link'

export default function Bulk() {
  return (
    <div className="w-full overflow-hidden">
      <section className="relative w-full md:w-[1920px] h-[400px] md:h-[680px] mx-auto">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/bulk.svg"
            alt="bulk section image"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>

        {/* 중앙 컨텐츠 영역 */}
        <div className="font-pretendard absolute inset-0 flex items-center justify-center">
          <div className="w-[290px] md:w-[1200px] flex flex-col items-center text-center px-5 md:px-0">
            <h2 className="w-full text-[24px] md:text-[46px] font-bold text-white leading-[1.4] md:leading-[1.2] break-keep md:whitespace-nowrap whitespace-pre-line">
              {"대량 구매 문의"}
            </h2>
            <p className="w-full mt-3 md:mt-7 text-[14px] md:text-xl text-white font-medium leading-[22px] md:leading-[34px]">
                대량 구매를 원하시나요?<br className="hidden md:block" />
                대표 번호로 전화 또는 문의 작성을 해주시면<br /> 빠르게 도와드리겠습니다.
            </p>
            <Link 
              href="/as-center"
              className="inline-flex justify-center items-center px-[24px] md:px-[36px] py-[12px] md:py-[18px] w-[160px] md:w-[220px] h-[40px] md:h-[55px] bg-[#51A4E4] rounded-[50px] text-white text-[13px] md:text-[16px] font-semibold tracking-[0.01em] hover:bg-[#4293d3] transition-colors mt-[32px] md:mt-10"
            >
              대량 구매 문의 하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 