import Image from "next/image";
import { useState } from "react";

export const Header = () => {
  const [selected, setSelected] = useState("Төсөл");
  const comps = ["Үүсгэх", "Төсөл", "Санал"];
  return (
    <div
      className="sticky top-0 z-[9999] w-[100%] h-[5rem] flex justify-center text-[18px] font-light"
      style={{
        backgroundColor: "#1C1C1C",
        color: "#FFFFFF",
        boxShadow: "0 2px 4px rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="w-[75%] h-[100%] flex justify-between items-center">
        <a href="#Нүүр">
          <Image src={"/logo.png"} alt="" width={45} height={45} />
        </a>
        <div className="flex gap-5 items-center">
          {comps?.map((el) => {
            return (
              <a
                style={{
                  color: selected == el ? "#3FBB46" : "white",
                }}
                key={el}
                href={`#${el}`}
                className=" hover:text-white cursor-pointer"
                onClick={() => setSelected(el)}
              >
                {el}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};