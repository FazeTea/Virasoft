import Image from "next/image";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.div
      id="Холбоо барих"
      className="w-full bg-[#1C1C1C] pb-5"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full flex flex-wrap items-center justify-around py-5">
        <div className="hidden md:block border border-[#3FBB46] w-[30%]"></div>
        <div className="flex flex-col items-center text-center">
          <h1 className="font-semibold text-[#3FBB46] text-lg md:text-xl">VIRASOFT SOLUTION</h1>
          <span className="text-sm opacity-50">limited liability company</span>
        </div>
        <div className="hidden md:block border border-[#3FBB46] w-[30%]"></div>
      </div>

      <div className="w-full flex flex-wrap justify-between px-4 md:px-10">
        <div className="w-full md:w-[30%] flex flex-col items-center gap-5 py-4 md:py-0">
          <div className="text-sm md:text-[15px] font-thin">+976 76002001</div>
          <div className="text-sm md:text-[15px] font-thin">info@virasoft.mn</div>
          <div className="text-sm md:text-[15px] font-thin">VIRA SOFT LLC</div>
        </div>

        <div className="w-full md:w-[40%] flex flex-col items-center gap-5 py-4 md:py-0">
          <div className="flex gap-5 md:gap-10">
            <a target="blank" href="https://maps.app.goo.gl/8X62DwbCbjEtsHhc7?g_st=ic">
              <Image src={"/location.png"} alt="" width={25} height={30} className="cover" />
            </a>
            <a
              target="blank"
              href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZcRPPMMtZqXbmGNfxPkkWCLXwCGNCXpQhVlbsVkHpmGFHZJwMVvzBnlchGhKfDzZfmvFg"
            >
              <Image src={"/gmail.png"} alt="" width={25} height={30} className="cover" />
            </a>
            <a target="blank" href="https://www.facebook.com/profile.php?id=61556798619609">
              <Image src={"/facebook.png"} alt="" width={25} height={30} className="cover" />
            </a>
          </div>
          <div className="w-full flex h-[1px] md:h-[7vh] md:w-[1px] border border-[#3FBB46]"></div>
        </div>

        <div className="w-full md:w-[30%] flex flex-col items-center gap-5 py-4 md:py-0">
          <div className="text-sm md:text-[15px] font-thin text-center">Улаанбаатар хот, Бзд, 14-р хороо,</div>
          <div className="text-sm md:text-[15px] font-thin text-center">зүүн 4 зам 6 байр-7тоот</div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full gap-5 mt-5">
        <div className="opacity-50 text-sm text-center">БИДЭНТЭЙ НЭГДЭЭРЭЙ</div>
        <a href="#Үнийн санал">
          <div className="border flex justify-between items-center px-6 py-2 border-[#3FBB46] hover:bg-[#3FBB46] cursor-pointer hover:text-black text-sm md:text-base">
            ҮНИЙН САНАЛ АВАХ
          </div>
        </a>
      </div>

      <div className="flex justify-center text-[10px] md:text-[12px] pt-5 opacity-50 items-center">@2024 Faze Tea</div>
    </motion.div>
  );
};
