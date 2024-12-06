"use client";
// import { FoggyCursor } from "./components/foggycursor";
import { Openning } from "./pages/opening";
import { Projects } from "./pages/Projects";
import { Header } from "./components/header";
export default function Home() {
  return (
    <div>
      <Header />
      <Openning />
      <Projects />

      <div className="w-[100vw] h-[100vh]  border"></div>
    </div>
  );
}
