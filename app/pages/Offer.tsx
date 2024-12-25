import { Timeline } from "../components/timeline";
import { motion } from "framer-motion";
import Image from "next/image";
export const Offer = () => {
  const data = [
    {
      title: "Хөгжүүлэлт",
      content: (
        <motion.div
          initial={{ x: "100%", opacity: 0 }} // Start off-screen to the right
          whileInView={{ x: 0, opacity: 1 }} // Animate to the center
          viewport={{ once: true, amount: 0.1 }} // Trigger once when 10% is in view
          transition={{ duration: 0.6, ease: "easeOut" }} // Smooth animation
          className=" flex justify-center "
        >
          <div className="w-[50%] flex flex-col gap-10">
            <div className="">
              Танай байгууллагын имижийг зорилтот хэрэглэгчдэд хамгийн сүүлийн үеийн чиг хандлага, өнгө дүр төрхөөр
              илэрхийлэгдсэн технологийн шийдэл санал болгоно.
            </div>
            <div className="flex h-[20vh] gap-10">
              <Image className="rounded-xl" src={"/dev3.jpeg"} alt="" width={200} height={200} />
              <Image className="rounded-xl" src={"/dev2.jpeg"} alt="" width={200} height={200} />
            </div>
            <div className="flex h-[20vh] gap-10">
              <Image className="rounded-xl" src={"/dev4.jpeg"} alt="" width={200} height={200} />
              <Image className="rounded-xl" src={"/dev1.jpeg"} alt="" width={200} height={200} />
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Дизайн",
      content: (
        <motion.div
          initial={{ x: "100%", opacity: 0 }} // Start off-screen to the right
          whileInView={{ x: 0, opacity: 1 }} // Animate to the center
          viewport={{ once: true, amount: 0.1 }} // Trigger once when 10% is in view
          transition={{ duration: 0.6, ease: "easeOut" }} // Smooth animation
          className=" flex justify-center "
        >
          <div className="w-[50%] flex flex-col gap-10">
            <div className="">
              График дизайн нь зураг дүрслэл, өнгө, хэлбэр дүрс, үгээр ашиглан үзэл санаа, мэдээлэл дамжуулдаг харааны
              харилцааны урлаг юм.
            </div>
            <div className="flex h-[50vh] gap-10 w-[100%]">
              <Image className="rounded-xl" src={"/design.png"} alt="" width={550} height={200} />
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Маркетинг",
      content: (
        <motion.div
          initial={{ x: "100%", opacity: 0 }} // Start off-screen to the right
          whileInView={{ x: 0, opacity: 1 }} // Animate to the center
          viewport={{ once: true, amount: 0.1 }} // Trigger once when 10% is in view
          transition={{ duration: 0.6, ease: "easeOut" }} // Smooth animation
          className=" flex justify-center "
        >
          <div className="w-[50%] flex flex-col gap-5">
            <div>
              Та бидэнтэй хамтран өөрийн бизнест чиглэсэн урсгалыг системчилж, үе шаттайгаар хүссэн үр дүндээ хүрэхэд
              тань бид тусална.
            </div>
            <div>
              <li>✅ Үр дүн</li>
              <li>✅ Системчилэх</li>
              <li>✅ Хүссэн үр дүн</li>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Бусад үйлчилгээ",
      content: (
        <motion.div
          initial={{ x: "100%", opacity: 0 }} // Start off-screen to the right
          whileInView={{ x: 0, opacity: 1 }} // Animate to the center
          viewport={{ once: true, amount: 0.1 }} // Trigger once when 10% is in view
          transition={{ duration: 0.6, ease: "easeOut" }} // Smooth animation
          className=" flex justify-end "
        >
          <div className="w-[77%] text-[25px] font-bold ">
            Та хэрэглэгчдэд <span className="text-[#3FBB46]">мэдээлэл</span> өгөхөөс гадна тэднийг
            <span className="text-[#3FBB46]"> ойлгох</span> , цаг алдалгүй
            <span className="text-[#3FBB46]"> борлуулалт</span> хийх, үр дүнгээ нарийвчлан хянах гэх мэт маш олон
            <span className="text-[#3FBB46]"> боломжуудыг</span> ашиглалгүй
            <span className="text-red-600"> алдсаар </span> байна.
          </div>
        </motion.div>
      ),
    },
  ];
  return <Timeline data={data} />;
};
