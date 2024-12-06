import { ParticleContainer } from "../components/particles";
// import { FlipWords } from "../components/flipword";
import { TypewriterEffect } from "../components/typingword";
export const Openning = () => {
  return (
    <div className="w-[100%] h-[100vh] bg-[#000]">
      <ParticleContainer />
      <div className=" w-[100%] flex justify-center p-10 pt-32">
        <div className="text-[1.2rem] font-light text-[#8c8c8c]  w-[65%] flex flex-col items-center  h-[65vh] justify-center ">
          <div>Бизнесийн амжилтийг</div>
          <span className="opacity-100 text-[#FFF] text-[2.5rem]">
            <div className="flex items-center">
              <span>
                <span className="text-[#808080]">{"<"}</span>
                <span className="text-[#3FBB46]">div</span>
                <span className="text-[#808080]">{">"}</span>
              </span>
              <span>
                <TypewriterEffect
                  words={[
                    {
                      text: "ДЭВШЛЭЭР...",
                    },
                    {
                      text: "УХААЛГААР...",
                    },
                    {
                      text: "БҮТЭЭЛЧЭЭР...",
                    },
                  ]}
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
