interface IAsCenterProps {
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function AsCenter({}: IAsCenterProps) {
  return (
    <div className="w-full min-h-[479px] relative md:w-[1920px] md:h-[702px]">
      <div 
        className="w-full h-full absolute inset-0 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: 'url("/mo_as.png")'
        }}
      />
      <div 
        className="w-full h-full absolute inset-0 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: 'url("/ascenter_background.png")',
          backgroundBlendMode: 'multiply'
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-5 md:px-0">
        <div className="flex flex-col items-center gap-[24px] mb-4">
          <h1 className="text-white text-[30px] md:text-[46px] font-bold font-['Pretendard'] -tracking-normal text-center">HOID A/S 센터</h1>
          <p className="text-white text-[14px] md:text-[22px] font-medium font-['Pretendard'] text-center">HOID는 A/S 센터를 상시 운영하고 있습니다.</p>
        </div>

        <div className="flex flex-col items-center gap-1 w-full md:w-auto">
          <div className="flex items-center gap-3 flex-col md:flex-row">
            <img 
              src="/phone.svg" 
              alt="phone icon" 
              className="w-[32px] h-[32px] md:w-[38px] md:h-[39px]"
            />
            <span className="text-white text-[40px] md:text-[56px] font-bold font-['Pretendard'] text-center">031-429-8570</span>
          </div>
          
          <div className="w-full md:w-[448px] h-px bg-zinc-300" />
          
          <p className="text-white text-[18px] md:text-[24px] font-medium font-['Pretendard'] pt-3 text-center">운영시간 : AM 10:00 ~ PM 18:00</p>
          
          <button className="w-full md:w-auto mt-10 px-9 py-5 bg-[#4BA1F1] rounded-[50px]">
            <span className="text-white text-[16px] md:text-[18px] font-medium font-['Pretendard']">A/S 센터 자세히 보기</span>
          </button>
        </div>
      </div>
    </div>
  )
}
