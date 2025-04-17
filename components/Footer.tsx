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
    representative: "정성현",
    address: "인천 연수구 송도과학로80 101-1301, 1302호",
    businessNumber: "884-81-03587 [사업자정보확인]",
    salesRegistration: "제 2025-인천연수구-0287 호",
    privacyOfficer: "정성현",
    email: "hoidcscs@gmail.com",
    copyright: "Copyright © 2025 HOID. All rights reserved.",
};

export default function Footer() {
    return (
        <footer className="w-full">
            <div className="w-full bg-[#272727] py-[70px] px-5 md:px-[220px]">
                <div className="w-full md:w-[600px]">
                    <Image
                        src="/footer_logo.png"
                        alt="Footer Logo"
                        width={96}
                        height={25}
                        className="mb-[40px] md:mb-[40px]"
                    />
                    
                    <div className="flex flex-col gap-y-1.5 text-[#888] text-[13px] font-[500] font-pretendard tracking-[-0.13px]">
                        <div className="flex items-center">
                            <span>{companyInfo.name}</span>
                            <span className="mx-2">|</span>
                            <span>대표 : {companyInfo.representative}</span>
                        </div>
                        <div>
                            <span>주소 : {companyInfo.address}</span>
                        </div>
                        <div className="flex flex-wrap items-center w-full md:w-auto">
                            <span className="w-full md:w-auto">사업자등록번호 : <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2968703628" target="_blank" rel="noopener noreferrer">{companyInfo.businessNumber}</a></span>
                            <span className="mx-2 hidden md:inline">|</span>
                            <span className="w-full md:w-auto">통신판매업신고 : {companyInfo.salesRegistration}</span>
                        </div>
                        <div className="flex flex-wrap items-center w-full md:w-auto">
                            <span className="w-full md:w-auto">개인정보보호책임자 : {companyInfo.privacyOfficer}</span>
                            <span className="mx-2 hidden md:inline">|</span>
                            <span className="w-full md:w-auto">E-mail : {companyInfo.email}</span>
                        </div>
                    </div>
                    <div className="mt-[24px] text-[#888] text-xs font-[500] font-pretendard tracking-[-0.13px]">
                        {companyInfo.copyright}
                    </div>
                </div>
            </div>
        </footer>
    );
} 