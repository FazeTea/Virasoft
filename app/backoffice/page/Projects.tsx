import DataTable from "@/app/components/datatable";
import { useEffect } from "react";
import axios from "axios";
export const Projects = ({ setProducts, setInitialProduct, products, initialProduct }) => {
  useEffect(() => {
    projectHandler();
    console.log("psda");
  }, []);
  const projectHandler = async () => {
    const { data } = await axios.get("/api/project");
    console.log(data);

    setProducts(data?.data || []);
    setInitialProduct(data?.data || []);
  };
  console.log(products);

  return (
    <div className="w-[100%] p-5" id="Төсөл">
      <h1 className="text-2xl font-semibold">Төсөл нэмэх:</h1>

      <div className="w-[100%] flex justify-center ">
        <div className=" w-[90%] py-5 ">
          <DataTable rows={products} />
        </div>
      </div>
    </div>
  );
};
