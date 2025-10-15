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

// 비디오 자리 플레이스홀더 = 다음(4번째) 이미지로 고정 → 전환 시 흰 화면 방지
const VIDEO_PLACEHOLDER = "/hero_3.png";

export default function ImagesSlider_() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 비디오가 끝나기 직전에 강제로 숨기기 위한 안전 플래그
  const [forceHideVideo, setForceHideVideo] = useState(false);
  // 4번 이미지를 비디오 끝 직전에 오버레이로 깔아 플리커 제거
  const [showTailOverlay, setShowTailOverlay] = useState(false);

  // PC: 총 4장 (비디오 자리는 4번 이미지로 채움)
  // 순서: 1번 이미지, 2번 이미지, (비디오), 4번 이미지
  const pcSlides = useMemo(
    () => ["/hero_1.png", "/hero_2.png", VIDEO_PLACEHOLDER, "/hero_3.png"],
    []
  );

  // 모바일은 영상 없이 4장
  const moImages = useMemo(
    () => ["/mo_hero_1.svg", "/mo_hero_2.svg", "/mo_hero_3.svg", "/mo_hero_4.svg"],
    []
  );

  // 체류시간: 이미지(3s), 비디오(메타데이터로 동기화), 이미지(3s)
  const [slideIntervals, setSlideIntervals] = useState<number[]>([3000, 3000, 8000, 3000]);
  const [sliderKey, setSliderKey] = useState<string>("init"); // 내부 타이머 리셋용
  const slideIntervalsMo = useMemo(() => [5000, 5000, 5000, 5000], []);

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
    if (index === 3) setShowTailOverlay(false); // 실제 4번(인덱스 3) 진입 시 오버레이 해제
  }, []);

  // 비디오 play/pause 제어
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (currentSlide === VIDEO_INDEX) {
      el.play().catch(() => {});
      setForceHideVideo(false);
    } else {
      el.pause();
      el.currentTime = 0;
      setForceHideVideo(false);
      setShowTailOverlay(false);
    }
  }, [currentSlide]);

  // 비디오 duration으로 슬라이드 간격 동기화
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handleLoadedMeta = () => {
      const dur = el.duration; // seconds
      if (Number.isFinite(dur) && dur > 0) {
        setSlideIntervals(prev => {
          const next = [...prev];
          // 약간의 마진(150ms)을 빼 영상 종료 직전에 자연스럽게 전환
          next[VIDEO_INDEX] = Math.max(1000, Math.round(dur * 1000) - 150);
          return next;
        });
        setSliderKey(`v-${Math.round(dur * 1000)}`); // 타이머 리셋
      }
    };

    el.addEventListener("loadedmetadata", handleLoadedMeta);
    return () => el.removeEventListener("loadedmetadata", handleLoadedMeta);
  }, []);

  // 비디오가 끝나기 직전에 강제 숨김 + 4번 이미지 오버레이
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onTimeUpdate = () => {
      if (currentSlide !== VIDEO_INDEX) return;
      const dur = el.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      if (el.currentTime >= dur - 0.05) { // 남은 50ms
        if (!forceHideVideo) setForceHideVideo(true);
        if (!showTailOverlay) setShowTailOverlay(true);
      }
    };
    const onEnded = () => {
      setForceHideVideo(true);
      setShowTailOverlay(true);
      el.pause();
      el.currentTime = 0;
    };

    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onEnded);
    };
  }, [currentSlide, forceHideVideo, showTailOverlay]);

  // 4번째 이미지 미리 불러와 전환 시 깜빡임 방지
  useEffect(() => {
    const img = new Image();
    img.src = "/hero_3.png";
  }, []);

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
            key={sliderKey}
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

          {/* 비디오 레이어: 항상 렌더하고 가시성만 토글 */}
          <div
            className={`absolute inset-0 z-40 transition-opacity duration-0 ${
              (currentSlide === VIDEO_INDEX && !forceHideVideo)
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
            // 배경을 검정으로 고정해 로딩 순간 흰 화면 방지
            style={{
              backgroundColor: "#000",
              pointerEvents: currentSlide === VIDEO_INDEX && !forceHideVideo ? "auto" : "none",
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/hoid-hero.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"      // 적극 로드
              poster="/hero_3.png" // 로딩 전/버퍼링 시 화면 채움
            />
          </div>

          {/* 4번 이미지 오버레이(비디오 끝 직전부터 다음 슬라이드 진입까지 표시) */}
          <div
            className={`absolute inset-0 z-45 transition-opacity duration-0 ${
              currentSlide === VIDEO_INDEX && showTailOverlay
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
            style={{ pointerEvents: "none" }}
          >
            <img
              src="/hero_3.png"
              alt="Slide 4"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* 텍스트/버튼 오버레이 */}
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