"use client";
import { useEffect, useState } from "react";
import { HeroParallax } from "../components/heroparallax";
import axios from "axios";
export const Projects = () => {
  const [highlight, setHighlight] = useState([]);
  const highlighgetter = async () => {
    const result = await axios.get("/api/project/highlight");
    setHighlight(result?.data?.data);
  };
  useEffect(() => {
    highlighgetter();
  }, []);
  return <HeroParallax products={highlight} />;
};
