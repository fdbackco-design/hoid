"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ImagesSlider_() {
  const images = [
    "/hero_1.png",
    "/hero_2.png",
    "/hero_3.png"
  ];

  const mo_images = [
    "/mo_hero_1.svg",
    "/mo_hero_2.svg",
    "/mo_hero_3.svg"
  ];

  return (
    <>
      {/* PC 버전 */}
      <div className="hidden md:block w-[1680px] mx-auto pt-[27px]">
        <ImagesSlider 
          className="h-[780px]" 
          images={images} 
          overlay={false}
          indicatorClassName="w-2 h-2 rounded-full [&.active]:bg-blue-400"
          indicatorContainerClassName="space-x-[20px] -translate-y-[40px]"
        >
          <div className="absolute inset-0 flex items-center">
            <motion.div
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
                <motion.h1 
                  className="text-[#111111] font-pretendard text-[48px] font-bold text-left leading-tight"
                >
                  강력한 살균, 완벽한 청정<br />HOID가 답이다
                </motion.h1>
                <motion.p 
                  className="text-[#333333] text-[22px] text-left font-medium"
                >
                  강력한 UV 살균과 공기청정 기술이 하나로!
                </motion.p>
                <motion.button 
                  className="px-9 py-4 bg-blue-400 rounded-[50px] inline-flex justify-center items-center gap-2.5 text-white text-center font-semibold font-['Pretendard'] capitalize tracking-tight"
                >
                  제품 자세히 보기
                </motion.button>
              </div>
            </motion.div>
          </div>
        </ImagesSlider>
      </div>

      {/* 모바일 버전 */}
      <div className="md:hidden px-5">
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