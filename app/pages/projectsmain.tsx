import Image from "next/image";
import { ProjectCard } from "../components/projectcard";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

export const ProjectsMain = () => {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [filter, setfilter] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);

  const getCardsPerRow = () => {
    const screenWidth = window.innerWidth;
    const cardWidth = 25 * 16;
    const availableWidth = screenWidth;
    const cardsPerRow = Math.floor(availableWidth / cardWidth);
    return cardsPerRow;
  };
  const itemsToShow = getCardsPerRow();

  useEffect(() => {
    projecthandler();
  }, []);

  const projecthandler = async () => {
    const { data } = await axios.get("/api/project");
    setProducts(data?.data);
    setFilteredProduct(data?.data);
  };

  type ProductType = {
    title: string;
    link: string;
    thumbnail: string;
    Category: string;
  };

  useEffect(() => {
    if (filter) {
      const filtered = products.filter((product: ProductType) => (product.Category == filter ? product : null));
      setFilteredProduct(filtered);
    } else {
      setFilteredProduct(products);
    }
  }, [filter, products]);

  const handleSeeMore = () => {
    setShowAll(!showAll);
  };

  return (
    <div id="Төслүүд">
      <div className="flex justify-center text-[3rem] font-bold  my-20">Төслүүд</div>
      <div className="flex gap-5 px-16 items-center ">
        {filter == null ? (
          <button
            onClick={() => setfilter(null)}
            className="py-2 px-6 text-lg font-semibold text-white bg-gradient-to-r from-[#3FBB46] to-[#30C0A5] hover:from-[#30C0A5] hover:to-[#3FBB46] rounded"
          >
            Бүгд
          </button>
        ) : (
          <button
            onClick={() => setfilter(null)}
            className="py-1 px-6 text-lg font-semibold border-2 bg-clip-text text-transparent bg-gradient-to-r from-[#3FBB46] to-[#30C0A5] hover:bg-gradient-to-l hover:from-[#30C0A5] hover:to-[#3FBB46] rounded border-[#3FBB46]"
          >
            Бүгд
          </button>
        )}
        {["Web", "App", "System"].map((el, i) => {
          return el == filter ? (
            <button
              key={i}
              onClick={() => setfilter(null)}
              className="py-2 px-6 text-lg font-semibold text-white bg-gradient-to-r from-[#3FBB46] to-[#30C0A5] hover:from-[#30C0A5] hover:to-[#3FBB46] rounded"
            >
              {el}
            </button>
          ) : (
            <button
              onClick={() => {
                setfilter(el);
              }}
              key={i}
              className="py-1 px-6 text-lg font-semibold border-2 bg-clip-text text-transparent bg-gradient-to-r from-[#3FBB46] to-[#30C0A5] hover:bg-gradient-to-l hover:from-[#30C0A5] hover:to-[#3FBB46] rounded border-[#3FBB46]"
            >
              {el}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center  ">
        <button
          onClick={handleSeeMore}
          style={{
            position: "absolute",
          }}
          className="right-20 text-[#3FBB46]"
        >
          {showAll ? "Төслүүдийг хураах ←" : "Бүх төслүүдийг харах →"}
        </button>
        {filteredProduct.slice(0, showAll ? filteredProduct.length : itemsToShow).map((el: ProductType, i) => {
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
                    <Image
                      className="object-cover"
                      src={el?.thumbnail}
                      height={600}
                      width={600}
                      alt={el.title}
                      layout="responsive"
                    />
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
