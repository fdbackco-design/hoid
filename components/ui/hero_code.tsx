"use client";

import React, { useMemo, useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
// 'Image' 컴포넌트는 비디오 오버레이(poster)나 다른 부분에서 사용될 수 있으므로,
// 만약 실제로 사용하지 않는다면 이 줄을 삭제해야 합니다. 
// 현재 코드에서는 <video>의 poster 속성으로 대체되어 직접 사용되지 않으므로 삭제해도 무방합니다.
// import Image from "next/image"; 
import { Card, CardContent } from "@/components/ui/card";

// Framer Motion 컴포넌트 동적 로딩
const MotionDiv = dynamic(() => import("framer-motion").then(m => m.motion.div), { ssr: false });
const MotionH1  = dynamic(() => import("framer-motion").then(m => m.motion.h1),  { ssr: false });
const MotionP   = dynamic(() => import("framer-motion").then(m => m.motion.p),   { ssr: false });
const MotionButton = dynamic(() => import("framer-motion").then(m => m.motion.button), { ssr: false });

// ImagesSlider 컴포넌트 동적 로딩
const ImagesSlider = dynamic(
  () => import("@/components/ui/images-slider").then(m => m.ImagesSlider),
  { ssr: false }
);

// 슬라이드 순서에서 비디오가 위치하는 인덱스 (0부터 시작, 4번째는 3)
const VIDEO_INDEX = 3;

export default function ImagesSlider_() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // PC 버전 슬라이드 이미지 경로 (비디오 위치는 포스터 이미지로 대체)
  const pcSlides = useMemo(
    () => ["/hero_all.png", "/hero_tv.png", "/hero_2.png", "/hero_3.png", "/hero_3.png"],
    []
  );

  // 모바일 버전 슬라이드 이미지 경로
  const moImages = useMemo(
    () => ["/mo_hero_all.png", "/mo_hero_tv.png",  "/mo_hero_2.svg", "/mo_hero_3.jpg", "/mo_hero_4.svg"],
    []
  );

  // 모든 슬라이드가 동일한 시간(5초)으로 유지되도록 통일
  const slideIntervals = useMemo(() => [5000, 5000, 5000, 5000, 5000], []);
  const slideIntervalsMo = useMemo(() => [5000, 5000, 5000, 5000, 5000], []);

  // 슬라이드별 이동 링크
  const slideLinks = useMemo(
    () => [
      "https://www.coupang.com/vp/products/9091729489?itemId=26719292707&vendorItemId=93690857612&q=hoid%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0&searchId=1654918e10724546&sourceType=search&itemsCount=5&searchRank=0&rank=0&traceId=mqhglp5j",
      "https://www.coupang.com/vp/products/8987740925",
      "https://www.coupang.com/vp/products/8675880265",
      "https://www.coupang.com/vp/products/8721779893",
      "https://www.coupang.com/vp/products/8721779893",
    ],
    []
  );

  // 슬라이드별 문구
  const slideTexts = useMemo(
    () => [
      {
        title: "우리 집 생활 솔루션\nHOID가 답이다",
        description: "한 번에 완성하는 스마트 라이프!",
      },
      {
        title: "바로 켜는 스마트 스크린\nHOID가 답이다",
        description: "언제, 어디에서나 이동식 스마트TV",
      },
      {
        title: "강력한 살균, 완벽한 청정\nHOID가 답이다",
        description: "강력한 UV 살균과 공기청정 기술이 하나로!",
      },
      {
        title: "강력한 살균, 완벽한 청정\nHOID가 답이다",
        description: "강력한 UV 살균과 공기청정 기술이 하나로!",
      },
      {
        title: "강력한 살균, 완벽한 청정\nHOID가 답이다",
        description: "강력한 UV 살균과 공기청정 기술이 하나로!",
      },
    ],
    []
  );
  
  // 슬라이드 변경 시 현재 인덱스 업데이트
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // 현재 슬라이드 인덱스에 따라 비디오 재생/정지 제어
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (currentSlide === VIDEO_INDEX) {
      // 4번 슬라이드일 때: 비디오를 처음부터 재생
      videoElement.currentTime = 0;
      videoElement.play().catch(error => {
        // 자동 재생 정책 등으로 인한 오류를 콘솔에 기록
        console.error("Video play failed:", error);
      });
    } else {
      // 다른 슬라이드일 때: 비디오를 정지하고 시간을 리셋
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }, [currentSlide]);

  // '자세히 보기' 버튼 클릭 핸들러
  const handleButtonClick = useCallback(() => {
    window.open(slideLinks[currentSlide], "_blank");
  }, [slideLinks, currentSlide]);

  return (
    <>
      {/* PC 버전 슬라이더 */}
      <div className="hidden md:block max-w-[1920px] mx-auto">
        <div className="relative h-[780px] w-full">
          <ImagesSlider
            className="h-[780px]"
            images={pcSlides}
            overlay={false}
            indicatorClassName="w-2 h-2 rounded-full [&.active]:bg-blue-400"
            indicatorContainerClassName="space-x-[20px] -translate-y-[40px]"
            slideIntervals={slideIntervals}
            onSlideChange={handleSlideChange}
          >
            {null}
          </ImagesSlider>

          {/* 비디오 레이어: 4번 슬라이드일 때만 보이도록 처리 */}
          <div
            className={`absolute inset-0 z-40 transition-opacity duration-300 ${
              currentSlide === VIDEO_INDEX
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
            style={{
              backgroundColor: "#000",
              pointerEvents: currentSlide === VIDEO_INDEX ? "auto" : "none",
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/hoid-hero.mp4"
              muted
              playsInline
              preload="auto"
              poster="/hero_3.png" // 비디오 로딩 중 보일 이미지
            />
          </div>

          {/* 텍스트 및 버튼 UI (상호작용을 위해 최상단에 위치) */}
          <div className="absolute inset-0 flex items-center z-50 pointer-events-none">
            <MotionDiv
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center ml-[120px] max-w-[499px]"
            >
              <div className="flex flex-col items-start space-y-6">
                <MotionH1
                  key={`title-${currentSlide}`}
                  className="text-[#111111] font-pretendard text-[48px] font-bold text-left leading-tight whitespace-pre-line"
                >
                  {slideTexts[currentSlide].title}
                </MotionH1>
                <MotionP
                  key={`desc-${currentSlide}`}
                  className="text-[#333333] text-[22px] text-left font-medium"
                >
                  {slideTexts[currentSlide].description}
                </MotionP>
                <MotionButton
                  className="px-9 py-4 bg-blue-400 rounded-[50px] inline-flex justify-center items-center gap-2.5 text-white text-center font-semibold pointer-events-auto"
                  onClick={handleButtonClick}
                >
                  제품 자세히 보기
                </MotionButton>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>

      {/* 모바일 버전 슬라이더 */}
      <div className="md:hidden">
        <Card className="w-full h-[540px] relative overflow-hidden border-0 shadow-none rounded-none">
          <CardContent className="w-full h-full p-0 border-0 rounded-none">
            <ImagesSlider
              className="h-[540px]"
              images={moImages}
              overlay={false}
              indicatorClassName="w-2 h-2 rounded-full [&.active]:bg-[#51a4e4]"
              indicatorContainerClassName="gap-3.5 absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
              slideIntervals={slideIntervalsMo}
            >
              {null}
            </ImagesSlider>
          </CardContent>
        </Card>
      </div>
    </>
  );
}