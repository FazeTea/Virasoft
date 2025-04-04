// backoffice/project/page.js or page.tsx
"use client";
import { Header } from "@/app/components/back/header";
import { Projects } from "./page/Projects";
import { Offer } from "./page/Offer";
import { Create } from "./page/Create";
import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Project } from "./page/Project";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useRef } from "react";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const BackOffice = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  type ProductType = {
    title: string;
    link: string;
    thumbnail: string;
    Category: "Web" | "App" | "System";
    Highlight: boolean;
  };
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginData.email === "vira@12" && loginData.password === "85770066") {
      Swal.fire({
        icon: "success",
        title: "Амжилттай",
        text: "Та амжилттай нэвтэрлээ!",
        confirmButtonColor: "#3FBB46",
        background: "#1c1c1e",
        color: "white",
      });
      setTimeout(() => {
        setIsLoggedIn(true);
        window !== undefined && window.localStorage.setItem("isLoggedIn", "true");
      }, 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Алдаа",
        text: "Нэвтрэх нэр эсвэл нууц үг буруу байна!",
        confirmButtonColor: "#3FBB46",
        background: "#1c1c1e",
        color: "white",
      });
      setIsLoggedIn(false);
    }
    setLoginData({
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    const isLoggedIn = window !== undefined && window.localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  console.log(isloggedIn);

  return isloggedIn == true ? (
    <div className="w-[100vw] overflow-hidden ">
      <Header setIsLoggedIn={setIsLoggedIn} />
      <ThemeProvider theme={darkTheme}>
        <Projects setProducts={setProducts} products={products} />
        <Offer />
      </ThemeProvider>
    </div>
  ) : (
    <div
      id="Login"
      className="min-h-screen flex items-center justify-center bg-[#141414] text-white py-10 px-4 md:py-20 md:px-0"
    >
      <motion.div
        ref={containerRef}
        className="w-full max-w-lg p-5 md:p-10 bg-[#1c1c1e] rounded-lg shadow-xl"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-lg md:text-2xl font-semibold mb-6 md:mb-12 text-center bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #3FBB46, #30C0A5, #3FBB46)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Нэвтрэх
        </motion.h1>

        <motion.form
          className="space-y-6 md:space-y-8"
          onSubmit={handleSubmit}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {[
            { label: "Нэвтрэх нэр", name: "email", placeholder: "Нэвтрэх нэр оруулна уу", type: "text" },
            { label: "Нууц үг", name: "password", placeholder: "Нууц үгээ оруулна уу", type: "password" },
          ].map((field, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <label className="block text-sm text-gray-400 mb-2">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={loginData[field.name as keyof typeof loginData]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#242424] text-white rounded-sm border border-[#2c2c2e] placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className={`w-full py-2 md:py-3 ${
              loginData.email && loginData.password
                ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                : "bg-gray-600 cursor-not-allowed"
            } text-white rounded-sm transition duration-300`}
            whileHover={{
              scale: loginData.email && loginData.password ? 1.05 : 1,
            }}
            whileTap={{
              scale: loginData.email && loginData.password ? 0.95 : 1,
            }}
            disabled={!loginData.email || !loginData.password}
          >
            Нэвтрэх →
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default BackOffice;
