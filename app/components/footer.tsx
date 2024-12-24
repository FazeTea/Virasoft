import Image from "next/image";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.div
      id="Холбоо барих"
      className="w-[100%] bg-[#1C1C1C] pb-5"
      initial={{ opacity: 0, y: 100 }} // Start off-screen and hidden
      whileInView={{ opacity: 1, y: 0 }} // Slide into view
      transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the component is in view
    >
      <div className="w-[100%] h-[20vh] flex items-center justify-around">
        <div className="border border-[#3FBB46] w-[30%]"></div>
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-[#3FBB46]">VIRASOFT SOLUTION</h1>
          <span className="text-sm opacity-50">limited liability company</span>
        </div>
        <div className="border border-[#3FBB46] w-[30%]"></div>
      </div>
      <div className="w-[100%] flex justify-between">
        <div className="w-[30%] flex flex-col items-center gap-5">
          <div className="text-[15px] font-thin">+976 76002001</div>
          <div className="text-[15px] font-thin">info@virasoft.mn</div>
          <div className="text-[15px] font-thin">VIRA SOFT LLC</div>
        </div>
        <div className="w-[40%] flex flex-col items-center gap-5">
          <div className="flex gap-10">
            <a target="blank" href="https://maps.app.goo.gl/8X62DwbCbjEtsHhc7?g_st=ic">
              <Image src={"/location.png"} alt="" width={25} height={30} />
            </a>
            <a
              target="blank"
              href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZcRPPMMtZqXbmGNfxPkkWCLXwCGNCXpQhVlbsVkHpmGFHZJwMVvzBnlchGhKfDzZfmvFg"
            >
              <Image src={"/gmail.png"} alt="" width={25} height={30} />
            </a>
            <a target="blank" href="https://www.facebook.com/profile.php?id=61556798619609">
              <Image src={"/facebook.png"} alt="" width={25} height={30} />
            </a>
          </div>
          <div className="flex h-[7vh] border border-[#3FBB46]"></div>
        </div>
        <div className="w-[30%] flex flex-col items-center gap-5">
          <div className="text-[15px] font-thin"> Улаанбаатар хот, Бзд, 14-р хороо, </div>
          <div className="text-[15px] font-thin">зүүн 4 зам 6 байр-7тоот</div>
        </div>
      </div>
      <div className="flex flex-col items-center w-[100%] gap-5 mt-5">
        <div className="opacity-50 flex justify-center w-[100%] text-[15px]">БИДЭНТЭЙ НЭГДЭЭРЭЙ</div>
        <div className="border flex justify-between items-center px-10 py-2 border-[#3FBB46] hover:bg-[#3FBB46] cursor-pointer hover:text-black">
          ҮНИЙН САНАЛ АВАХ
        </div>
      </div>
      <div className="flex justify-center text-[12px] pt-5 opacity-50 items-center">@2024 Faze Tea</div>
    </motion.div>
  );
};
