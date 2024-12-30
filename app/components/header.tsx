import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [selected, setSelected] = useState("Нүүр");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const comps = ["Нүүр", "Үйлчилгээ", "Төслүүд", "Холбоо барих"];

  return (
    <div
      className="sticky top-0 z-[9999] w-full h-[4rem] sm:h-[5rem] flex justify-between items-center px-4 text-sm sm:text-base font-light md:px-5"
      style={{ backgroundColor: "#1C1C1C", color: "#FFFFFF", boxShadow: "0 2px 4px rgba(255, 255, 255, 0.1)" }}
    >
      {/* Logo */}
      <a href="#Нүүр">
        <Image src={"/logo.png"} alt="Logo" width={40} height={40} className="cover" />
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-3 sm:gap-5 items-center">
        {comps.map((el) => (
          <a
            key={el}
            href={`#${el}`}
            className={`cursor-pointer transition hover:text-white ${
              selected === el ? "text-[#3FBB46]" : "text-white"
            }`}
            onClick={() => setSelected(el)}
          >
            {el}
          </a>
        ))}
        <a
          href="#Үнийн санал"
          onClick={() => setSelected("Үнийн санал")}
          className="border border-[#3FBB46] px-2 sm:px-3 py-1 sm:py-2 rounded-sm text-[#3FBB46] hover:bg-[#3FBB46] hover:text-white transition"
        >
          Үнийн санал
        </a>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button className="text-white focus:outline-none" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* Sidebar with Animation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 z-[9999] w-[70%] h-full bg-[#1C1C1C] text-white shadow-lg flex flex-col p-6"
          >
            <button className="self-end text-white focus:outline-none mb-6" onClick={() => setIsSidebarOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {comps.map((el) => (
              <motion.a
                key={el}
                href={`#${el}`}
                className="py-3 px-4 text-lg border-b border-gray-700 cursor-pointer transition hover:text-[#3FBB46]"
                onClick={() => {
                  setSelected(el);
                  setIsSidebarOpen(false);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {el}
              </motion.a>
            ))}
            <motion.a
              href="#Үнийн санал"
              className="mt-6 py-3 px-4 border border-[#3FBB46] text-[#3FBB46] rounded-sm text-center hover:bg-[#3FBB46] hover:text-white transition"
              onClick={() => setIsSidebarOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Үнийн санал
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
