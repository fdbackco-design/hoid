"use client";

import React, { useEffect, useState } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// motion 컴포넌트를 동적으로 임포트
const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), {
  ssr: false
});

const MotionH1 = dynamic(() => import("framer-motion").then(mod => mod.motion.h1), {
  ssr: false
});

const MotionP = dynamic(() => import("framer-motion").then(mod => mod.motion.p), {
  ssr: false
});

const MotionButton = dynamic(() => import("framer-motion").then(mod => mod.motion.button), {
  ssr: false
});

export default function ImagesSlider_() {
  const images = [
    "/hero_2.png",
    "/hero_3.png"
  ];

  const mo_images = [
    "/mo_hero_1.svg",
    "/mo_hero_2.svg",
    "/mo_hero_3.svg"
  ];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* PC 버전 */}
      <div className="hidden md:block max-w-[1920px] mx-auto">
        <div className="relative h-[780px] w-full">
          <ImagesSlider 
            className="h-[780px]" 
            images={images} 
            overlay={false}
            indicatorClassName="w-2 h-2 rounded-full [&.active]:bg-blue-400"
            indicatorContainerClassName="space-x-[20px] -translate-y-[40px]"
            videoUrl="https://player.vimeo.com/video/1074153050?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&dnt=1&controls=0"
            slideIntervals={[17000, 3000, 3000]}
          >
            <div className="absolute inset-0 flex items-center">
              <MotionDiv
                initial={{
                  opacity: 0,
                  y: -80,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="z-50 flex flex-col justify-center ml-[120px] max-w-[499px]"
              >
                <div className="flex flex-col items-start space-y-6">
                  <MotionH1 
                    className="text-[#111111] font-pretendard text-[48px] font-bold text-left leading-tight"
                  >
                    강력한 살균, 완벽한 청정<br />HOID가 답이다
                  </MotionH1>
                  <MotionP 
                    className="text-[#333333] text-[22px] text-left font-medium"
                  >
                    강력한 UV 살균과 공기청정 기술이 하나로!
                  </MotionP>
                  <MotionButton 
                    className="px-9 py-4 bg-blue-400 rounded-[50px] inline-flex justify-center items-center gap-2.5 text-white text-center font-semibold font-['Pretendard'] capitalize tracking-tight"
                  >
                    제품 자세히 보기
                  </MotionButton>
                </div>
              </MotionDiv>
            </div>
          </ImagesSlider>
        </div>
      </div>

      {/* 모바일 버전 */}
      <div className="md:hidden">
        <Card className="w-full h-[540px] relative overflow-hidden border-0 shadow-none rounded-none">
          <CardContent className="w-full h-full p-0 border-0 rounded-none">
            <ImagesSlider 
              className="h-[540px]" 
              images={mo_images} 
              overlay={false}
              indicatorClassName="w-2 h-2 rounded-full [&.active]:bg-[#51a4e4]"
              indicatorContainerClassName="gap-3.5 absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div className="flex flex-col w-[280px] items-start gap-4 absolute top-[179px] left-5 z-30">
                <h2 className="self-stretch mt-[-1.00px] font-pretendard font-bold text-[#111111] text-3xl tracking-[-0.90px] leading-[42px]">
                  강력한 살균,<br />
                  완벽한 청정<br />
                  HOID가 답이다
                </h2>

                <Button className="px-5 py-[13px] bg-[#51a4e4] rounded-[50px] hover:bg-[#4090d0]">
                  <span className="font-pretendard font-semibold text-white text-xs tracking-[0.12px]">
                    제품 자세히 보기
                  </span>
                </Button>
              </div>
            </ImagesSlider>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 