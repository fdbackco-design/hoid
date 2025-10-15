"use client";

import React, { useMemo, useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const MotionDiv = dynamic(() => import("framer-motion").then(m => m.motion.div), { ssr: false });
const MotionH1  = dynamic(() => import("framer-motion").then(m => m.motion.h1),  { ssr: false });
const MotionP   = dynamic(() => import("framer-motion").then(m => m.motion.p),   { ssr: false });
const MotionButton = dynamic(() => import("framer-motion").then(m => m.motion.button), { ssr: false });

const ImagesSlider = dynamic(
  () => import("@/components/ui/images-slider").then(m => m.ImagesSlider),
  { ssr: false }
);

const VIDEO_INDEX = 2;
const VIDEO_PLACEHOLDER = "/hero_3.png";

export default function ImagesSlider_() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 화면 표시용: 비디오 레이어 숨김/표시
  const [forceHideVideo, _setForceHideVideo] = useState(true);
  const forceHideVideoRef = useRef(true); // 경합 방지용 ref
  const setForceHideVideo = (v: boolean) => {
    forceHideVideoRef.current = v;
    _setForceHideVideo(v);
    console.log(`[STATE] forceHideVideo -> ${v}`);
  };

  const [showTailOverlay, setShowTailOverlay] = useState(false);

  const pcSlides = useMemo(
    () => ["/hero_1.png", "/hero_2.png", VIDEO_PLACEHOLDER, "/hero_3.png"],
    []
  );

  const moImages = useMemo(
    () => ["/mo_hero_1.svg", "/mo_hero_2.svg", "/mo_hero_3.svg", "/mo_hero_4.svg"],
    []
  );

  const [slideIntervals, setSlideIntervals] = useState<number[]>([3000, 3000, 8000, 3000]);
  const [sliderKey, setSliderKey] = useState<string>("init");
  const slideIntervalsMo = useMemo(() => [5000, 5000, 5000, 5000], []);

  const slideLinks = useMemo(
    () => [
      "https://www.coupang.com/vp/products/8987740925",
      "https://www.coupang.com/vp/products/8987740925",
      "https://www.coupang.com/vp/products/8675880265",
      "https://www.coupang.com/vp/products/8721779893",
    ],
    []
  );

  // 슬라이드 변경: 같은 인덱스로 중복 호출되면 무시
  const handleSlideChange = useCallback((index: number) => {
    if (index === currentSlide) {
      console.log(`[SLIDE] (dup) keep index=${index}`);
      return;
    }
    console.log("[SLIDE] → index:", index);
    setCurrentSlide(index);
    if (index === 3) setShowTailOverlay(false);
  }, [currentSlide]);

  // 비디오 show/hide 제어 — currentSlide만 의존
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    console.log(`[VIDEO CONTROL] currentSlide=${currentSlide}, forceHide=${forceHideVideoRef.current}`);

    if (currentSlide === VIDEO_INDEX) {
      // 즉시 표시 + 재생
      setForceHideVideo(false);
      el.currentTime = 0;
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(err => console.log("[VIDEO] play() error:", err?.message));
      }
      console.log("[VIDEO] ▶ play() & show");
    } else {
      // 즉시 숨김 + 정지 (지연 제거!)
      if (!el.paused) el.pause();
      el.currentTime = 0;
      setForceHideVideo(true);
      setShowTailOverlay(false);
      console.log("[VIDEO] ⏸ pause() & HIDE (immediate)");
    }
  }, [currentSlide]);

  // 비디오 메타데이터 로드 → duration 동기화
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handleLoadedMeta = () => {
      const dur = el.duration;
      console.log("[VIDEO META] duration:", dur);
      if (Number.isFinite(dur) && dur > 0) {
        setSlideIntervals(prev => {
          const next = [...prev];
          next[VIDEO_INDEX] = Math.max(1000, Math.round(dur * 1000) - 150);
          return next;
        });
        setSliderKey(`v-${Math.round(dur * 1000)}`);
      }
    };
    el.addEventListener("loadedmetadata", handleLoadedMeta);
    return () => el.removeEventListener("loadedmetadata", handleLoadedMeta);
  }, []);

  // 영상 끝 직전 → 오버레이 ON + 레이어 숨김
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onTimeUpdate = () => {
      if (currentSlide !== VIDEO_INDEX) return;
      const dur = el.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;

      if (el.currentTime >= dur - 0.05) {
        if (!forceHideVideoRef.current) {
          console.log("[VIDEO] nearing end → hide & overlay");
          setForceHideVideo(true);       // 즉시 숨김
        }
        if (!showTailOverlay) setShowTailOverlay(true); // 다음 이미지 오버레이
      }
    };
    const onEnded = () => {
      console.log("[VIDEO] ended → hide & overlay");
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
  }, [currentSlide, showTailOverlay]);

  const handleButtonClick = useCallback(() => {
    window.open(slideLinks[currentSlide], "_blank");
  }, [slideLinks, currentSlide]);

  return (
    <>
      {/* PC */}
      <div className="hidden md:block max-w-[1920px] mx-auto">
        <div className="relative h-[780px] w-full">
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

          {/* 비디오 레이어 (즉시 전환: duration-0) */}
          <div
            className={`absolute inset-0 z-40 transition-opacity duration-0 ${
              currentSlide === VIDEO_INDEX && !forceHideVideo
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
            style={{
              backgroundColor: "#000",
              pointerEvents: currentSlide === VIDEO_INDEX && !forceHideVideo ? "auto" : "none",
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/hoid-hero.mp4"
              muted
              playsInline
              preload="auto"
              poster="/hero_3.png"
            />
          </div>

          {/* 4번 이미지 오버레이 */}
          {showTailOverlay && currentSlide === VIDEO_INDEX && (
            <div className="absolute inset-0 z-45 pointer-events-none">
              <Image
                src="/hero_3.png"
                alt="Slide 4"
                fill
                sizes="100vw"
                className="object-cover select-none"
              />
            </div>
          )}

          {/* 텍스트/버튼 */}
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
          </CardContent>
        </Card>
      </div>
    </>
  );
}