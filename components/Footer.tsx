"use client";

import Image from 'next/image';

interface ICompanyInfo {
    name: string;
    representative: string;
    address: string;
    businessNumber: string;
    salesRegistration: string;
    privacyOfficer: string;
    email: string;
    copyright: string;
}

const companyInfo: ICompanyInfo = {
    name: "HOID",
    representative: "홍길동",
    address: "서울 강남구 테헤란로 105 모아빌딩 10-12F",
    businessNumber: "639-02-03342",
    salesRegistration: "1234-서울한국-1234 [사업자정보확인]",
    privacyOfficer: "홍길동",
    email: "contact@medifeed.com",
    copyright: "Copyright © 2025 HOID. All rights reserved.",
};

export default function Footer() {
    return (
        <footer className="w-full">
            <div className="w-full bg-[#272727] py-[50px] px-5 md:px-[220px]">
                <div className="w-full md:w-[600px] text-[#FFFFFF] text-[13px] md:text-sm leading-[22px] md:leading-[24px]">
                    <Image
                        src="/footer_logo.png"
                        alt="Footer Logo"
                        width={96}
                        height={25}
                        className="mb-[40px]"
                    />
                    
                    <div className="flex flex-wrap gap-y-1">
                        <div className="flex items-center w-full md:w-auto">
                            <span>{companyInfo.name}</span>
                            <span className="mx-2">|</span>
                            <span>대표 : {companyInfo.representative}</span>
                        </div>
                        <div className="w-full md:w-auto">
                            <span>주소 : {companyInfo.address}</span>
                        </div>
                        <div className="flex flex-wrap items-center w-full md:w-auto">
                            <span className="w-full md:w-auto">사업자등록번호 : {companyInfo.businessNumber}</span>
                            <span className="mx-2 hidden md:inline">|</span>
                            <span className="w-full md:w-auto">통신판매업신고 : {companyInfo.salesRegistration}</span>
                        </div>
                        <div className="flex flex-wrap items-center w-full md:w-auto">
                            <span className="w-full md:w-auto">개인정보보호책임자 : {companyInfo.privacyOfficer}</span>
                            <span className="mx-2 hidden md:inline">|</span>
                            <span className="w-full md:w-auto">E-mail : {companyInfo.email}</span>
                        </div>
                    </div>
                    <div className="mt-[30px] text-[#888888] text-xs font-medium">
                        {companyInfo.copyright}
                    </div>
                </div>
            </div>
        </footer>
    );
} 