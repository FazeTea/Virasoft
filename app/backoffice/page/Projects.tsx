import DataTable from "@/app/components/datatable";
import { useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Create } from "./Create";
export const Projects = ({ setProducts, products }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    projectHandler();
  }, []);
  const projectHandler = async () => {
    const { data } = await axios.get("/api/project");

    setProducts(data?.data || []);
  };

  return (
    <div className="w-[100%] p-5" id="Төсөл">
      <h1 className="text-3xl font-semibold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#3FBB46] to-[#30C0A5]">
        Төслүүд
      </h1>
      <div className="flex justify-end w-[95%]">
        <div
          className="cursor-pointer border border-[#30C0A5] bg-gradient-to-r from-[#3FBB46] to-[#30C0A5] px-3 py-1 rounded text-transparent bg-clip-text font-bold hover:opacity-50"
          onClick={handleOpen}
        >
          Төсөл нэмэх
        </div>
      </div>
      <div className="w-[100%] flex justify-center ">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Create handleClose={handleClose} setProducts={setProducts} />
        </Modal>
        <div className=" w-[90%] py-5 ">
          <DataTable rows={products} />
        </div>
      </div>
    </div>
  );
};
