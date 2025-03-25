import DataTable from "@/app/components/datatable";
import { useEffect } from "react";
import axios from "axios";
export const Projects = ({ setProducts, setInitialProduct, products }) => {
  useEffect(() => {
    projectHandler();
  }, []);
  const projectHandler = async () => {
    const { data } = await axios.get("/api/project");

    setProducts(data?.data || []);
    setInitialProduct(data?.data || []);
  };

  return (
    <div className="w-[100%] p-5" id="Төсөл">
      <h1 className="text-3xl font-semibold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#3FBB46] to-[#30C0A5]">
        Төслүүд
      </h1>
      <div className="w-[100%] flex justify-center ">
        <div className=" w-[90%] py-5 ">
          <DataTable rows={products} />
        </div>
      </div>
    </div>
  );
};
