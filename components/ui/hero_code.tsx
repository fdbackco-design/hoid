"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";

export default function ImagesSlider_() {
  const images = [
    "/hero_1.png",
    "/hero_2.png",
    "/hero_3.png"
  ];
  return (
    <div className="w-[1680px] mx-auto pt-[27px]">
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
            className="z-50 flex flex-col justify-center ml-[120px] max-w-[320px] md:max-w-[499px]"
          >
            <div className="flex flex-col items-start space-y-4 md:space-y-6">
              <motion.h1 
                className="text-[#111111] font-pretendard text-[24px] md:text-[48px] font-bold text-left leading-tight"
              >
                강력한 살균, 완벽한 청정<br />HOID가 답이다
              </motion.h1>
              <motion.p 
                className="text-[#333333] text-base md:text-[22px] text-left font-medium"
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
  );
} 