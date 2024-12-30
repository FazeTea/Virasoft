"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FlipWords } from "./flipword";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 4000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 0]), springConfig);
  return (
    <div
      ref={ref}
      className="pt-20 md:pt-40 overflow-hidden antialiased relative flex flex-col bg-black [perspective:1000px] [transform-style:preserve-3d] h-screen"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="space-y-10 px-4 sm:px-8 lg:px-16 flex-grow"
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 md:py-20 px-4 sm:px-8 lg:px-16">
      <h1 className="text-lg md:text-3xl lg:text-5xl text-gray-400 font-light">
        <span>&nbsp;Бид таньд</span>
        <span>
          <FlipWords
            className="text-2xl md:text-4xl lg:text-7xl font-semibold"
            words={[
              "Урт хугацааны стратеги түншлэл",
              "Үе шатчилсан системчилсэн хөтөлбөр",
              "Бүгдийг нэг дороос авах боломж",
            ]}
          />
        </span>
        <br />
        &nbsp;үйлчилгээг санал болгож байна
      </h1>
      <p className="max-w-2xl text-sm md:text-lg lg:text-xl mt-4 md:mt-8 dark:text-neutral-200">
        Дэвшилтэт технологиор дамжуулан таны бизнест тохирсон инновацийн бүтээлч шийдлийг бид бүтээж байна.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-72 sm:h-96 w-full relative flex-shrink-0"
    >
      <Link href={product.link} target="_blank" className="block group-hover/product:shadow-2xl">
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-sm md:text-lg">
        {product.title}
      </h2>
    </motion.div>
  );
};
