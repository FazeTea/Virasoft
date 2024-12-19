import Image from "next/image";
export const Footer = () => {
  return (
    <div id="Холбоо барих" className="w-[100%]   bg-[#1C1C1C] pb-5">
      <div className=" w-[100%] h-[20vh] flex items-center justify-around">
        <div className="border border-[#3FBB46] w-[30%]"></div>
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-[#3FBB46]">VIRASOFT</h1>
          <span className="text-sm opacity-50">limited liability company</span>
        </div>
        <div className="border border-[#3FBB46] w-[30%]"></div>
      </div>
      <div className="w-[100%] flex  justify-between ">
        <div className="w-[30%] flex flex-col items-center gap-5">
          <div className="text-[15px] font-thin">PRIVACY POLICY</div>
          <div className="text-[15px] font-thin">TERMS & CONDITIONS</div>
          <div className="text-[15px] font-thin">ABOUT</div>
        </div>
        <div className="w-[40%] flex flex-col items-center gap-5">
          <div className="flex gap-20">
            <Image src={"/logo.png"} alt="" width={30} height={30} />
            <Image src={"/logo.png"} alt="" width={30} height={30} />
            <Image src={"/logo.png"} alt="" width={30} height={30} />
          </div>
          <div className="flex h-[7vh] border border-[#3FBB46] "></div>
        </div>
        <div className="w-[30%] flex flex-col items-center gap-5">
          <div className="text-[15px] font-thin">PRIVACY POLICY</div>
          <div className="text-[15px] font-thin">TERMS & CONDITIONS</div>
          <div className="text-[15px] font-thin">ABOUT</div>
        </div>
      </div>
      <div className="flex flex-col items-center w-[100%] gap-5 mt-5 ">
        <div className="opacity-50 flex justify-center w-[100%] text-[15px]">БИДЭНТЭЙ НЭГДЭЭРЭЙ</div>
        <div className="border   flex justify-between items-center px-10 py-2 border-[#3FBB46] hover:bg-[#3FBB46] cursor-pointer hover:text-black">
          ҮНИЙН САНАЛ АВАХ
        </div>
      </div>
      <div className="flex justify-center text-[12px] pt-5 opacity-50  items-center">@2024 Faze Tea</div>
    </div>
  );
};
