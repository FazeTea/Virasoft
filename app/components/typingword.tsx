"use client";

import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [characters, setCharacters] = useState<string[]>([]);
  const typingSpeed = 100; // typing speed in ms
  const deletingSpeed = 80; // deleting speed in ms
  const pauseDuration = 3000; // pause between typing and deleting

  useEffect(() => {
    const currentWord = wordsArray[currentWordIndex].text;

    if (!isDeleting && characters.length < currentWord.length) {
      const timeout = setTimeout(() => {
        setCharacters((prev) => [...prev, currentWord[prev.length]]);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && characters.length > 0) {
      const timeout = setTimeout(() => {
        setCharacters((prev) => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && characters.length === currentWord.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && characters.length === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % wordsArray.length);
    }
  }, [characters, isDeleting, currentWordIndex]);

  const renderCharacters = () => {
    return (
      <span className="inline">
        {characters.map((char, index) => (
          <motion.span
            key={`char-${index}`}
            className={cn("dark:text-white text-black", wordsArray[currentWordIndex]?.className)}
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center", className)}>
      {renderCharacters()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn("inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-[#3FBB46]", cursorClassName)}
      ></motion.span>
    </div>
  );
};
