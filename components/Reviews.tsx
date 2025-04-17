'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

interface IReview {
  productName: string
  modelName: string
  content: string
  image: string
  b_image: string
  href: string
}

const reviews: IReview[] = [
  {
    productName: "HOID 프리미어 공기청정기(실버)",
    modelName: "HO-AP2501-S",
    content: "HOID 제품 처음 써보는데 가격대비 너무 좋습니다. 디자인도 깔끔하고 성능은 생각했던 것보다 더 좋네요. A/S센터도 있어서 만약 문제 생겨도 걱정 없더라구요. HOID 다른 제품도 사보려구요...",
    image: "/review_1.png",
    b_image: "/review_b_1.png",
    href: "#"
  },
  {
    productName: "HOID 프리미어 공기청정기(화이트)",
    modelName: "HO-AP2501-W",
    content: "선풍기 소음이 거의 없어서 너무 좋아요. 밤에도 편하게 사용할 수 있고 바람 세기도 적당해서 아이들 방에도 놓기 좋습니다. 에너지 효율도 좋아서 전기세 걱정 없이 사용하고 있어요.",
    image: "/review_2.png",
    b_image: "/review_b_1.png",
    href: "#"
  },
  {
    productName: "HOID 가습기",
    modelName: "MH-300",
    content: "가습량 조절이 세밀하게 되어서 좋고, 물통도 크고 세척하기도 편해요. 특히 자동 습도 조절 기능이 있어서 신경 쓰지 않아도 알아서 잘 작동됩니다. 디자인도 심플해서 어디에나 잘 어울려요.",
    image: "/review_3.png",
    b_image: "/review_b_2.png",
    href: "#"
  }
]

export default function Reviews() {
  const [emblaRef] = useEmblaCarousel({ loop: true })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="w-full md:mb-[220px] mb-[100px]">
      <div className="embla overflow-hidden px-5 md:px-0" ref={emblaRef}>
        <div className="embla__container flex gap-[16px]">
          {reviews.map((review, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] md:flex-[0_0_40.3%] min-w-0 md:px-4">
              <div className="flex flex-col">
                <div
                  className="relative w-full h-[300px] md:h-[490px] bg-white cursor-pointer mx-auto overflow-hidden"
                  onMouseEnter={() => !isMobile && setIsHovered(index)}
                  onMouseLeave={() => !isMobile && setIsHovered(null)}
                  onClick={() => {
                    if (isMobile) {
                      setActiveIndex(prev => prev === index ? null : index)
                    }
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={review.image}
                      alt={review.productName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {((!isMobile && isHovered === index) || (isMobile && activeIndex === index)) && (
                    <div className="absolute inset-0 md:p-6 bg-[#F5F5F5]/95 flex flex-col justify-end">
                      <div className="flex flex-col px-[28px] py-[30px]">
                        <div className="flex items-start mb-3 md:mb-4">
                          <Image
                            src="/review_start.svg"
                            alt="Review start"
                            width={40}
                            height={24}
                            className="md:w-[40px] md:h-[24px] w-[24px] h-[14px]"
                          />
                        </div>
                        <p className="text-[#333333] text-[14px] md:text-[21px] leading-relaxed font-pretendard">
                          {review.content}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:ml-[40px] mt-4 flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="bg-[#E2ECF4] rounded-[12px]">
                      <Image
                        src={review.b_image}
                        alt="Review thumbnail"
                        width={52}
                        height={52}
                        className="md:w-[86px] md:h-[86px] w-[50px] h-[50px]"
                      />
                    </div>
                    <div className="ml-6">
                      <p className="text-[#333333] text-lg md:text-[20px] font-bold mb-1 font-pretendard">{review.productName}</p>
                      <p className="text-[#666666] text-[13px] md:text-[20px] font-pretendard">{review.modelName}</p>
                    </div>
                  </div>
                  <Link href={review.href}>
                    <Image
                      src="/review_btn.svg"
                      alt="Review Button"
                      width={32}
                      height={32}
                      className="cursor-pointer w-[32px] h-[32px] md:w-[52px] md:h-[52px] md:mr-[70px]"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 