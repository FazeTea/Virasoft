import { Timeline } from "../components/timeline";
import { motion } from "framer-motion";
import Image from "next/image";
export const Offer = () => {
  const data = [
    {
      title: "Хөгжүүлэлт",
      content: (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="w-full md:w-[60%] flex flex-col gap-10 px-4 ">
            <div>
              Танай байгууллагын имижийг зорилтот хэрэглэгчдэд хамгийн сүүлийн үеийн чиг хандлага, өнгө дүр төрхөөр
              илэрхийлэгдсэн технологийн шийдэл санал болгоно.
            </div>
            {/* <div className="flex flex-wrap gap-4 ">
              <Image className="rounded-xl object-cover" src={"/dev3.jpeg"} alt="" width={200} height={200} />
              <Image className="rounded-xl object-cover" src={"/dev2.jpeg"} alt="" width={200} height={200} />
              <Image className="rounded-xl object-cover" src={"/dev4.jpeg"} alt="" width={200} height={200} />
              <Image className="rounded-xl object-cover" src={"/dev1.jpeg"} alt="" width={200} height={200} />
            </div> */}
          </div>
        </motion.div>
      ),
    },
    {
      title: "Дизайн",
      content: (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="w-full md:w-[60%] flex flex-col gap-10 px-4">
            <div>
              График дизайн нь зураг дүрслэл, өнгө, хэлбэр дүрс, үгээр ашиглан үзэл санаа, мэдээлэл дамжуулдаг харааны
              харилцааны урлаг юм.
            </div>
            <div className="flex">
              <Image className="rounded-xl object-cover" src={"/design-fixed.png"} alt="" width={550} height={200} />
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Маркетинг",
      content: (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="w-full md:w-[60%] flex flex-col gap-5 px-4">
            <div>
              Та бидэнтэй хамтран өөрийн бизнест чиглэсэн урсгалыг системчилж, үе шаттайгаар хүссэн үр дүндээ хүрэхэд
              тань бид тусална.
            </div>
            <ul>
              <li>✅ Үр дүн</li>
              <li>✅ Системчилэх</li>
              <li>✅ Хүссэн үр дүн</li>
            </ul>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Бусад үйлчилгээ",
      content: (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-end px-4"
        >
          <div className="w-full md:w-[77%] text-lg md:text-[25px] font-bold">
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
