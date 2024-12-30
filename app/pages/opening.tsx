import { ParticleContainer } from "../components/particles";
// import { FlipWords } from "../components/flipword";
import { TypewriterEffect } from "../components/typingword";
export const Openning = () => {
  return (
    <div id="Нүүр" className="w-full h-screen bg-[#000]">
      <ParticleContainer />
      <div className="w-full flex justify-center px-4 py-10">
        <div className="text-sm md:text-base font-light text-[#8c8c8c] w-full md:w-[65%] flex flex-col items-center h-[70vh] justify-center">
          <div>Бизнесийн амжилтийг</div>
          <span className="opacity-100 text-[#FFF] text-2xl md:text-4xl">
            <div className="flex items-center">
              <span>
                <span className="text-[#808080]">{"<"}</span>
                <span className="text-[#3FBB46]">div</span>
                <span className="text-[#808080]">{">"}</span>
              </span>
              <span>
                <TypewriterEffect
                  words={[{ text: "ДЭВШЛЭЭР..." }, { text: "УХААЛГААР..." }, { text: "БҮТЭЭЛЧЭЭР..." }]}
                  className={"font-light"}
                />
              </span>
              <span>
                <span className="text-[#808080]">{"</"}</span>
                <span className="text-[#3FBB46]">div</span>
                <span className="text-[#808080]">{">"}</span>
              </span>
            </div>
          </span>
          <div>хамтдаа хөгжүүцгээе</div>
        </div>
      </div>
    </div>
  );
};
