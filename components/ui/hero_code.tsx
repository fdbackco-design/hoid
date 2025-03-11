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
    <div className="w-full md:w-[calc(100%-240px)] mx-auto">
      <ImagesSlider className="h-[540px] md:h-[40rem]" images={images} overlay={false}>
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
          className="z-50 flex flex-col justify-center items-center max-w-[320px] md:max-w-[499px] px-5 md:px-0"
        >
          <div className="flex flex-col items-stretch space-y-4 md:space-y-6">
            <motion.h1 
              className="text-[#111111] font-pretendard text-[24px] md:text-[46px] font-bold text-center leading-tight"
            >
              순환 청정 & 집중 청정으로<br />더 멀리, 더 효율적으로 청정
            </motion.h1>
            <motion.p 
              className="text-[#333333] text-base md:text-xl text-center"
            >
              호이드 UV살균 공기청정기 AP-2501
            </motion.p>
          </div>
          <motion.button 
            className="mt-6 md:mt-10 px-6 md:px-9 py-[14px] md:py-[18px] bg-[#51A4E4] rounded-[50px] text-white text-sm md:text-base hover:bg-[#4593d3] transition-colors"
          >
            제품 자세히 보기
          </motion.button>
        </motion.div>
      </ImagesSlider>
    </div>
  );
} 