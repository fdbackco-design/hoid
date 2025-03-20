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
  href: string
}

const reviews: IReview[] = [
  {
    productName: "HOID 공기청정기",
    modelName: "TP-850",
    content: "공기청정기를 켜놓으면 실내 공기가 확실히 깨끗해지는 게 느껴져요. 특히 미세먼지가 심한 날에는 정말 효과를 실감할 수 있어요. 디자인도 너무 예쁘고 인테리어 효과도 있어서 더욱 만족스럽습니다.",
    image: "/review_1.png",
    href: "#"
  },
  {
    productName: "HOID 선풍기",
    modelName: "HF-720",
    content: "선풍기 소음이 거의 없어서 너무 좋아요. 밤에도 편하게 사용할 수 있고 바람 세기도 적당해서 아이들 방에도 놓기 좋습니다. 에너지 효율도 좋아서 전기세 걱정 없이 사용하고 있어요.",
    image: "/review_2.png",
    href: "#"
  },
  {
    productName: "HOID 가습기",
    modelName: "MH-300",
    content: "가습량 조절이 세밀하게 되어서 좋고, 물통도 크고 세척하기도 편해요. 특히 자동 습도 조절 기능이 있어서 신경 쓰지 않아도 알아서 잘 작동됩니다. 디자인도 심플해서 어디에나 잘 어울려요.",
    image: "/review_1.png",
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
    <section className="w-full py-[40px] md:py-[60px]">
      <div className="embla overflow-hidden px-5 md:px-0" ref={emblaRef}>
        <div className="embla__container flex gap-[10px]">
          {reviews.map((review, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] md:flex-[0_0_33.33%] min-w-0 md:px-4">
              <div className="flex flex-col">
                <div
                  className="relative w-full h-[320px] md:h-[400px] bg-white shadow-md cursor-pointer mx-auto overflow-hidden"
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
                    <div className="absolute inset-0 p-5 md:p-6 bg-[#F5F5F5]/95 flex flex-col justify-end">
                      <div className="flex flex-col ml-[40px] mb-[43px]">
                        <div className="flex items-start mb-3 md:mb-4">
                          <Image
                            src="/review_start.svg"
                            alt="Review start"
                            width={40}
                            height={24}
                          />
                        </div>
                        <p className="text-[#333333] text-[14px] md:text-base leading-relaxed">
                          {review.content}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="ml-3 mt-4 flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="bg-[#E2ECF4] rounded-[12px]">
                      <Image
                        src="/review_b.svg"
                        alt="Review start"
                        width={86}
                        height={86}
                      />
                    </div>
                    <div className="ml-6">
                      <p className="text-[#333333] text-lg font-bold mb-1">{review.productName}</p>
                      <p className="text-[#666666] text-[13px]">{review.modelName}</p>
                    </div>
                  </div>
                  <Link href={review.href}>
                    <Image
                      src="/review_btn.svg"
                      alt="Review Button"
                      width={52}
                      height={52}
                      className="cursor-pointer mr-[30px]"
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