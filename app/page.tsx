"use client";
// import { FoggyCursor } from "./components/foggycursor";
import { Openning } from "./pages/opening";
import { Projects } from "./pages/Projects";
import { Header } from "./components/header";
import { Offer } from "./pages/Offer";
import { ProjectsMain } from "./pages/projectsmain";
import { MacbookScroll } from "./components/macbook";
import { Footer } from "./components/footer";
import Image from "next/image";
import Head from "next/head";
export default function Home() {
  return (
    <div className=" ">
      <Header />
      <div className=" overflow-hidden ">
        <Openning />
        <Projects />
        <Offer />
        <ProjectsMain />
        <div className="overflow-hidden">
          <MacbookScroll
            src="/zippy.png"
            title="ZIPPY Delivery - Хүргэлтийн цогц шийдэл "
            badge={<Image className="rounded-xl" src={"/logo2.png"} alt="" width={50} height={50} />}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
