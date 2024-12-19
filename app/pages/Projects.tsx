"use client";
import { HeroParallax } from "../components/heroparallax";
export const Projects = () => {
  return (
    <HeroParallax
      products={[
        {
          title: "Ajin med",
          link: "https://www.ajinmed.mn/",
          thumbnail: "/projects/ajin_mend.png",
        },
        {
          title: "funplus",
          link: "https://www.funplus.mn/",
          thumbnail: "/projects/funplus.png",
        },
        {
          title: "z64",
          link: "https://www.z64.mn/",
          thumbnail: "/projects/z64.png",
        },

        {
          title: "Арьс арчилгаа",
          link: "https://www.skintrainer.mn/",
          thumbnail: "/projects/skintrainer.png",
        },
        {
          title: "Эгийн голын цахилгаан станц",
          link: "https://eghpp.mn/",
          thumbnail: "/projects/eghpp.png",
        },
      ]}
    />
  );
};
