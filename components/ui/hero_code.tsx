"use client";

import React, { useMemo, useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// motion (클라이언트 전용)
const MotionDiv = dynamic(() => import("framer-motion").then(m => m.motion.div), { ssr: false });
const MotionH1  = dynamic(() => import("framer-motion").then(m => m.motion.h1),  { ssr: false });
const MotionP   = dynamic(() => import("framer-motion").then(m => m.motion.p),   { ssr: false });
const MotionButton = dynamic(() => import("framer-motion").then(m => m.motion.button), { ssr: false });

// 기존 ImagesSlider 사용
const ImagesSlider = dynamic(
  () => import("@/components/ui/images-slider").then(m => m.ImagesSlider),
  { ssr: false }
);

// 비디오가 들어갈 인덱스(0-based): hero_1(0), hero_2(1), 비디오(2), hero_3(3)
const VIDEO_INDEX = 2;

// 1x1 투명 PNG (비디오 자리 더미)
const BLANK =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

export default function ImagesSlider_() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const vimeoRef = useRef<HTMLIFrameElement | null>(null);

  // PC: 총 4장(비디오 자리 = 투명 더미)
  // 순서: hero_1, hero_2, (비디오), hero_3
  const pcSlides = useMemo(
    () => ["/hero_1.png", "/hero_2.png", BLANK, "/hero_3.png"],
    []
  );

  // 모바일은 영상 없이 3장
  const moImages = useMemo(
    () => ["/mo_hero_1.svg", "/mo_hero_2.svg", "/mo_hero_3.svg", "/mo_hero_4.svg"],
    []
  );

  // 체류시간: 이미지(3s), 비디오(17s), 이미지(3s)
  const slideIntervals = useMemo(() => [3000, 3000, 8000, 3000], []);
  const slideIntervalsMo = useMemo(() => [5000, 5000, 5000], []);

  // 슬라이드별 링크(비디오 포함 4개)
  const slideLinks = useMemo(
    () => [
      "https://www.coupang.com/vp/products/8987740925?itemId=26323251903&vendorItemId=93300600462&q=%ED%98%B8%EC%9D%B4%EB%93%9C&searchId=e4ac8d462628730&sourceType=search&itemsCount=35&searchRank=0&rank=0",
      "https://www.coupang.com/vp/products/8987740925?itemId=26323251903&vendorItemId=93300600462&q=%ED%98%B8%EC%9D%B4%EB%93%9C&searchId=e4ac8d462628730&sourceType=search&itemsCount=35&searchRank=0&rank=0",
      "https://www.coupang.com/vp/products/8675880265?itemId=25186009043&vendorItemId=92905846568&q=%ED%98%B8%EC%9D%B4%EB%93%9C&searchId=e4ac8d462628730&sourceType=search&itemsCount=35&searchRank=2&rank=2", // 비디오 슬라이드
      "https://www.coupang.com/vp/products/8721779893?itemId=25334927905&vendorItemId=92329683038&q=%ED%98%B8%EC%9D%B4%EB%93%9C&searchId=e4ac8d462628730&sourceType=search&itemsCount=35&searchRank=3&rank=3",
    ],
    []
  );

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // 비디오 play/pause 제어 (deps 길이 고정)
  useEffect(() => {
    const msg = { method: currentSlide === VIDEO_INDEX ? "play" : "pause" };
    vimeoRef.current?.contentWindow?.postMessage(JSON.stringify(msg), "*");
  }, [currentSlide]);

  const handleButtonClick = useCallback(() => {
    window.open(slideLinks[currentSlide], "_blank");
  }, [slideLinks, currentSlide]);

  return (
    <>
      {/* PC */}
      <div className="hidden md:block max-w-[1920px] mx-auto">
        <div className="relative h-[780px] w-full">
          {/* 이미지 4장 → 인디케이터 4개 */}
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

          {/* 비디오 레이어: 항상 렌더하고 가시성만 토글(깜빡임 방지) */}
          <div
            className={`absolute inset-0 z-40 transition-opacity duration-0 ${
              currentSlide === VIDEO_INDEX ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            style={{ pointerEvents: currentSlide === VIDEO_INDEX ? "auto" : "none" }}
          >
            <iframe
              ref={vimeoRef}
              className="w-full h-full"
              src="https://player.vimeo.com/video/1074153050?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&dnt=1&controls=0&background=1&playsinline=1&loop=0"
              title="HOID Video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* 텍스트/버튼 오버레이 (비디오보다 위) */}
          <div className="absolute inset-0 flex items-center z-50">
            <MotionDiv
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center ml-[120px] max-w-[499px]"
            >
              <div className="flex flex-col items-start space-y-6">
                <MotionH1 className="text-[#111111] font-pretendard text-[48px] font-bold text-left leading-tight">
                  강력한 살균, 완벽한 청정<br />HOID가 답이다
                </MotionH1>
                <MotionP className="text-[#333333] text-[22px] text-left font-medium">
                  강력한 UV 살균과 공기청정 기술이 하나로!
                </MotionP>
                <MotionButton
                  className="px-9 py-4 bg-blue-400 rounded-[50px] inline-flex justify-center items-center gap-2.5 text-white text-center font-semibold"
                  onClick={handleButtonClick}
                >
                  제품 자세히 보기
                </MotionButton>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>

      {/* 모바일(영상 없음) */}
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
              onSlideChange={handleSlideChange}
            >
              {null}
            </ImagesSlider>

            <div className="flex flex-col w-[280px] items-start gap-4 absolute top-[179px] left-5 z-30">
              <h2 className="self-stretch font-pretendard font-bold text-[#111111] text-3xl leading-[42px]">
                강력한 살균,<br />완벽한 청정<br />HOID가 답이다
              </h2>
              <Button
                className="px-5 py-[13px] bg-[#51a4e4] rounded-[50px] hover:bg-[#4090d0]"
                onClick={handleButtonClick}
              >
                <span className="font-pretendard font-semibold text-white text-xs">
                  제품 자세히 보기
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
