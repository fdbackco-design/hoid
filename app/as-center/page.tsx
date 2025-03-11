import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function SubAS() {
    // Navigation menu items
    const navItems = [
        { label: "A/s 센터", href: "#" },
        { label: "자주 묻는 질문", href: "#" },
        { label: "대량 구매 문의", href: "#" },
        { label: "스토어", href: "#", hasDropdown: true },
    ];

    // Service center features
    const serviceFeatures = [
        {
            title: "A/S 발생 시 지역에 상관없이 어디에서나 동일한 서비스를 빠르고 신속하게 제공",
            highlight: "어디에서나 동일한 서비스",
            image: "/as_1.svg",
        },
        {
            title: "단일 서비스 시스템을 구축하여 가장 안전한 시스템으로 최고의 서비스를 약속",
            highlight: "가장 안전한 시스템",
            image: "/as_2.svg",
        },
        {
            title: "서비스 전문가를 통해 불편하거나 궁금하신 부분을 편안하게 상담 가능",
            highlight: "불편하거나 궁금하신 부분",
            image: "/as_3.svg",
        },
    ];

    // Repair guidelines
    const repairGuidelines = {
        free: [
            "품질 보증기간 이내에 정상적인 사용상태에서 발생되는 성능, 기능상의 고장인 경우",
            "당사 서비스센터를 통한 수리 후 2개월 이내에 동일부위에서 재고장이 발생한 경우",
        ],
        paid: [
            "품질 보증기간이 경과된 제품 수리 시",
            "고객부주의(이동,낙하,충격,파손,사용설명서 내의 주의사항을 지키지 않아 고장발생 시, 무리한 작동 등)로 수리 시",
            "당사 서비스센터 외에 다른 곳에서 부당한 수리, 개조로 인한 고장 시",
            "오랜 사용으로 마모된 소모성 부품 교환을 원하는 경우",
            "사용전원의 이상 및 접속기기의 불량으로 인한 고장 시",
        ],
    };

    return (
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-full max-w-[1920px] relative">

                {/* Hero Section */}
                <div className="w-full h-[400px] md:h-[600px] relative bg-cover bg-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/service_hero.svg"
                            alt="HOID Service Background"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="w-[320px] md:w-[543px] flex flex-col items-center gap-8">
                            <div className="w-full text-center text-white text-[32px] md:text-[46px] font-extrabold tracking-wide">
                                HOID SERVICE
                            </div>
                            <div className="w-full text-center text-white text-[14px] md:text-[28px] font-medium leading-relaxed md:leading-10">
                                HOID의 서비스는 자체 전문가팀을 통해<br/>
                                전국 어디에서나 동일한 서비스를 제공해드립니다.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Center Info */}
                <div className="flex justify-center mt-[60px] md:mt-[140px] px-5 md:px-0">
                    <div className="w-full md:w-[1280px] h-[320px] md:h-[240px] relative bg-[#f7f9fe] rounded-[10px]">
                        <div className="flex flex-col items-center md:items-start md:absolute md:left-[70px] md:top-[75px] pt-10 md:pt-0">
                            <img
                                src="/service_info_icon.svg"
                                alt="Service Info Icon"
                                className="w-[60px] h-[60px] md:w-[90px] md:h-[90px]"
                            />
                        </div>
                        <div className="flex flex-col items-center md:items-start md:absolute md:left-[200px] md:top-[42px] mt-8 md:mt-0 px-5 md:px-0">
                            <div className="w-full md:w-[518px] flex flex-col gap-8">
                                <div className="text-[#111111] text-[14px] md:text-[22px] font-bold text-center md:text-left">
                                    제품 관련 문제사항을 빠르게 <br /> 해결할 수 있도록 도와드립니다.
                                </div>
                                <div className="flex flex-col gap-3.5">
                                    <div className="text-[#366cf2] text-lg md:text-xl font-bold text-center md:text-left">
                                        서비스센터 운영시간
                                    </div>
                                    <div className="text-[#333333] text-[15px] md:text-[17px] font-medium text-center md:text-left">
                                        평일 : 09:00~18:00 / 토요일 09:00~13:00<br className="md:hidden"/> (일요일/공휴일 휴무)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Repair Guidelines Section */}
                <section className="flex flex-col items-center mt-[60px] md:mt-[100px] px-5 md:px-0">
                    <div className="w-full md:w-[1280px]">
                        <h2 className="font-bold text-black text-[24px] md:text-[28px] tracking-[-0.28px] mb-[40px] text-left">
                            유무상 수리기준 안내
                        </h2>

                        <div className="w-full">
                            <Separator className="w-full bg-[#e3e3e3]" />

                            {/* Free Repair */}
                            <div className="flex flex-col md:flex-row py-[40px] md:py-[62px] items-center md:items-start">
                                <div className="w-[80px] md:w-[100px] h-[78px] md:h-[98px] mb-6 md:mb-0 md:mr-[70px]">
                                    <div className="relative h-full">
                                        <img
                                            src="/free_repair.svg"
                                            alt="Free Repair Icon"
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col w-full md:w-[589px] gap-6">
                                    <h3 className="font-bold text-black text-[20px] md:text-[22px] text-left">무상수리</h3>
                                    <div className="flex flex-col gap-3 px-5 md:px-0">
                                        {repairGuidelines.free.map((item, index) => (
                                            <div key={index} className="flex items-start md:items-center gap-2.5">
                                                <div className="w-[5px] h-[5px] mt-2 md:mt-0 bg-[#356aeb] rounded-[2.5px] flex-shrink-0" />
                                                <p className="font-medium text-[#333333] text-[14px] md:text-lg">
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Separator className="w-full bg-[#e3e3e3]" />

                            {/* Paid Repair */}
                            <div className="flex flex-col md:flex-row py-[40px] md:py-[62px] items-center md:items-start">
                                <div className="w-[80px] md:w-[100px] h-[71px] md:h-[91px] mb-6 md:mb-0 md:mr-[70px]">
                                    <div className="relative h-full">
                                        <img
                                            src="/paid_repair.svg"
                                            alt="Paid Repair Icon"
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col w-full md:w-[589px] gap-6">
                                    <h3 className="font-bold text-black text-[20px] md:text-[22px] text-left">유상수리</h3>
                                    <div className="flex flex-col gap-3 px-5 md:px-0">
                                        {repairGuidelines.paid.map((item, index) => (
                                            <div key={index} className="flex items-start md:items-center gap-2.5">
                                                <div className="w-[5px] h-[5px] mt-2 md:mt-0 bg-[#356aeb] rounded-[2.5px] flex-shrink-0" />
                                                <p className="font-medium text-[#333333] text-[14px] md:text-lg">
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Separator className="w-full bg-[#e3e3e3]" />
                        </div>
                    </div>
                </section>

                {/* Service Features Section */}
                <section className="flex flex-col items-center mt-[60px] md:mt-[100px] mb-[90px] px-5 md:px-0">
                    <div className="w-full md:w-[1280px]">
                        <h2 className="font-bold text-black text-[24px] md:text-[28px] tracking-[-0.28px] mb-[40px] text-left">
                            Hoid 서비스 센터
                        </h2>

                        <div className="flex flex-col md:flex-row gap-5 md:gap-[31px]">
                            {serviceFeatures.map((feature, index) => (
                                <Card
                                    key={index}
                                    className="w-full md:w-[406px] h-[420px] bg-[#fcfcff] border-[#efeff8] rounded-[10px]"
                                >
                                    <CardContent className="flex flex-col items-center justify-center h-full p-6">
                                        <div className="w-[100px] md:w-[132px] h-[104px] md:h-[136px] mb-[26px]">
                                            <img
                                                src={feature.image}
                                                alt="Service Feature"
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <p className="font-semibold text-[#333333] text-lg md:text-xl text-center leading-8 whitespace-pre-line">
                                            {feature.title.split(feature.highlight).map((part, i, arr) => 
                                                i === arr.length - 1 ? part : (
                                                    <React.Fragment key={i}>
                                                        {part}
                                                        <span className="font-bold text-[#366cf2]">{feature.highlight}</span>
                                                    </React.Fragment>
                                                )
                                            )}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
