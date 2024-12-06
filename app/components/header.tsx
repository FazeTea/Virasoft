import Image from "next/image";

export const Header = () => {
  return (
    <div
      className="sticky top-0 z-50 w-[100%] h-[5rem] flex justify-center  text-[18px]"
      style={{
        fontWeight: 700,
        backgroundColor: "#1C1C1C", // Slightly lighter black for the header
        color: "#FFFFFF", // White text for contrast
        boxShadow: "0 2px 4px rgba(255, 255, 255, 0.1)", // Subtle shadow
      }}
    >
      <div className="w-[75%] h-[100%] flex justify-between items-center ">
        <div>
          <Image src={"/logo.png"} alt="" width={45} height={45} />
        </div>
        <div className="flex gap-5 items-center">
          <div className="text-[#3FBB46]">Нүүр</div>
          <div>Үйлчилгээ</div>
          <div>Төслүүд</div>
          <div>Холбоо барих</div>
          <div className="border border-[#3FBB46] px-3 py-2 rounded-sm text-[#3FBB46]">Үнийн санал</div>
        </div>
      </div>
    </div>
  );
};
