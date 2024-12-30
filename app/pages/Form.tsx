import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

export const Form = () => {
  const formcreator = async () => {
    await axios.post("/api/form", {
      body: formData,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organizationType: "",
    serviceTypes: "",
  });

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false });

  const organizationTypes = [
    "Бизнесийн байгууллага / ХХК",
    "Төрийн байгууллага",
    "Төрийн бус байгууллага / ТББ",
    "Бизнесийн байгууллага (Олон нийтийн) / ХК",
    "Хувь хүн",
    "Гарааны бизнес",
    "Бусад",
  ];

  const serviceTypes = ["Mobile application", "Web site", "Controlling system"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await formcreator();

    Swal.fire({
      icon: "success",
      title: "Амжилттай",
      text: "Таны үнийн санал амжилттай илгээгдлээ!",
      confirmButtonColor: "#3FBB46",
      background: "#1c1c1e",
      color: "white",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      organizationType: "",
      serviceTypes: "",
    });
  };

  return (
    <div
      id="Үнийн санал"
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
          Үнийн санал авах
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
            { label: "Нэр", name: "name", placeholder: "Нэрээ оруулна уу", type: "text" },
            { label: "И-майл", name: "email", placeholder: "И-майл оруулна уу", type: "email" },
            { label: "Утасны дугаар", name: "phone", placeholder: "Утасны дугаараа оруулна уу", type: "tel" },
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
                value={formData[field.name as keyof typeof formData]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#242424] text-white rounded-sm border border-[#2c2c2e] placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </motion.div>
          ))}

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <label className="block text-sm text-gray-400 mb-2">Байгууллагын төрөл</label>
            <select
              name="organizationType"
              value={formData.organizationType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#242424] text-white rounded-sm border border-[#2c2c2e] placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none appearance-none"
            >
              <option value="">Байгууллагын төрлөө сонгоно уу</option>
              {organizationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <label className="block text-sm text-gray-400 mb-2">Үйлчилгээний төрөл</label>
            <select
              name="serviceTypes"
              value={formData.serviceTypes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#242424] text-white rounded-sm border border-[#2c2c2e] placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none appearance-none"
            >
              <option value="">Үйлчилгээний төрлөө сонгоно уу</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.button
            type="submit"
            className={`w-full py-2 md:py-3 ${
              formData.name && formData.email && formData.phone && formData.organizationType && formData.serviceTypes
                ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                : "bg-gray-600 cursor-not-allowed"
            } text-white rounded-sm transition duration-300`}
            whileHover={{
              scale:
                formData.name && formData.email && formData.phone && formData.organizationType && formData.serviceTypes
                  ? 1.05
                  : 1,
            }}
            whileTap={{
              scale:
                formData.name && formData.email && formData.phone && formData.organizationType && formData.serviceTypes
                  ? 0.95
                  : 1,
            }}
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.phone ||
              !formData.organizationType ||
              !formData.serviceTypes
            }
          >
            Үнийн санал илгээх →
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};
