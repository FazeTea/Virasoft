import Image from "next/image";
import { ProjectCard } from "../components/projectcard";
import { motion } from "framer-motion";

export const ProjectsMain = () => {
  const products = [
    {
      title: "Ajin med",
      link: "https://www.ajinmed.mn/",
      thumbnail: "/projects/ajin_mend.png",
    },
    {
      title: "funplus",
      link: "https://www.funplus.mn/",
      thumbnail: "/projects/funplus.png",
    },
    {
      title: "z64",
      link: "https://www.z64.mn/",
      thumbnail: "/projects/z64.png",
    },
    {
      title: "Арьс арчилгаа",
      link: "https://www.skintrainer.mn/",
      thumbnail: "/projects/skintrainer.png",
    },
    {
      title: "Эгийн голын цахилгаан станц",
      link: "https://eghpp.mn/",
      thumbnail: "/projects/eghpp.png",
    },
  ];

  return (
    <div id="Төслүүд">
      <div className="flex justify-center text-[3rem] font-bold">Төслүүд</div>
      <div className="flex flex-wrap justify-center">
        {products.map((el, i) => {
          const isEvenRow = i % 2 === 0; // Determine animation direction
          return (
            <motion.div
              key={i}
              className="flex p-10"
              initial={{ opacity: 0, x: isEvenRow ? -100 : 100 }} // Alternate directions
              whileInView={{ opacity: 1, x: 0 }} // Move to normal position
              transition={{ duration: 0.6, ease: "easeOut" }} // Smooth transition
              viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
            >
              <ProjectCard containerClassName={""} className="" title={el?.title} href={el?.link}>
                <div className="flex flex-col w-[21.5rem] gap-3">
                  <div className="font-bold text-[20px]">{el.title}</div>
                  <div className="rounded overflow-hidden">
                    <Image src={el?.thumbnail} height={600} width={600} alt={el.title} layout="responsive" />
                  </div>
                </div>
              </ProjectCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
