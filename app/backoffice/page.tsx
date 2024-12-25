// backoffice/project/page.js or page.tsx
"use client";
import { Header } from "@/app/components/back/header";
import { Project } from "./page/Project";
import { Offer } from "./page/Offer";
import { Create } from "./page/Create";
import { useState } from "react";
const BackOffice = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [initialProduct, setInitialProduct] = useState<ProductType[]>([]);
  type ProductType = {
    title: string;
    link: string;
    thumbnail: string;
    Category: "Web" | "App" | "System";
    Highlight: boolean;
  };
  return (
    <div className="w-[100vw] overflow-hidden ">
      <Header />
      <Create
        setProducts={setProducts}
        products={products}
        initialProduct={initialProduct}
        setInitialProduct={setInitialProduct}
      />
      <Project
        setProducts={setProducts}
        products={products}
        initialProduct={initialProduct}
        setInitialProduct={setInitialProduct}
      />
      <Offer />
      {/* {products?.map((el: ProductType, i) => {
        return <div key={i}></div>;
      })} */}
    </div>
  );
};

export default BackOffice;
