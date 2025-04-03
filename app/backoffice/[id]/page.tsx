"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
type ProductType = {
  _id: string;
  title: string;
  link: string;
  thumbnail: string;
  Category: "Web" | "App" | "System";
  Highlight: boolean;
};
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

import { useRouter } from "next/navigation";
export default function Detail({ params }: any) {
  const resolvedParams: any = React.use(params); // Unwrap the Promise
  const { id } = resolvedParams;
  const [project, setProject] = useState<any>();
  const [initialProject, setInitialProject] = useState<any>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const checkStatus = async (url: any) => {
    try {
      const response = await fetch(`/api/status-check?url=${encodeURIComponent(url)}`);
      const result = await response.json();

      if (result.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const projectHandler = async () => {
    const { data } = await axios.get(`/api/project/${id}`);
    setProject(data?.data);
    const a = await checkStatus(data?.data?.link);
    setStatus(a);
    setInitialProject(data?.data);
  };
  useEffect(() => {
    projectHandler();
  }, []);

  const handleInputChange = (field: keyof ProductType, value: string | boolean) => {
    setProject({
      ...project,
      [field]: value,
    });
  };
  const isProductChanged = () => {
    const current = project;
    const initial = initialProject;
    return JSON.stringify(current) !== JSON.stringify(initial);
  };
  const updateHandler = async () => {
    try {
      const result = await axios.put("/api/project", { body: project });
      await deleteImage(initialProject?.thumbnail);
      const updatedProduct = result.data.data;

      setProject(updatedProduct);
      setInitialProject(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const deleteHandler = async (id: string) => {
    const isConfirmed = window.confirm("Энэхүү төслийг устгахдаа итгэлтэй байна уу?");
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`/api/project?id=${id}`);
      await deleteImage(project?.thumbnail);
      // if (imageUrl) {
      //   await axios.post("/api/delete-image", { imageUrl });
      // }
      router.back();
      alert("Төсөл амжилттай устлаа");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("There was an error deleting the item.");
    }
  };
  const deleteImage = async (fileId) => {
    try {
      const response = await axios.delete("/api/image", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          fileId,
        },
      });
      const data = await response.data;
      console.log("Response:", data);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  //---------------------------------------------------
  const authenticator = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/image");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      setLoading(false);
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  const onError = (err) => {
    setLoading(false);
  };

  const onSuccess = (res) => {
    handleInputChange("thumbnail", res?.url + "#" + res?.fileId);
    setLoading(false);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center py-20 bg-[#000]">
      <div className="w-[80%] flex flex-col gap-10   ">
        <div onClick={() => router.back()} className="text-[2rem] font-bold flex items-center cursor-pointer ">
          <svg
            style={{
              transform: "rotate(180deg)",
            }}
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 7L15 12L10 17"
              stroke="#d3d3d3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {project?.title}
        </div>
        {project && (
          <div className="bg-[#0a0a0a] w-[100%] rounded-lg border-[0.5px] border-[#3d3d3d]  ">
            <div className="flex gap-10 p-8">
              <a
                className=" shadow transition-shadow duration-300 ease-in-out 
         hover:shadow-[0px_6px_20px_rgba(63,187,70,1)]"
                href={project?.link}
              >
                {loading ? (
                  <div className="w-[500px] h-[400px] border flex  justify-center items-center">Loading...</div>
                ) : (
                  <Image
                    className=" rounded-md border-[0.5px] border-[#3d3d3d]"
                    width={500}
                    height={100}
                    src={project?.thumbnail}
                    alt="Upload"
                  />
                )}
              </a>
              <div className="flex justify-between  w-[50%]">
                <div className="flex gap-4  flex-col">
                  <div>
                    <p className="text-[#A1A1A1] text-sm">Төслийн id</p>
                    <p className="text-sm ">{project?._id}</p>
                  </div>
                  <div>
                    <p className="text-[#A1A1A1] text-sm">Төслийн төрөл</p>
                    <p className="text-sm ">{project?.Category}</p>
                  </div>
                  <div>
                    <p className="text-[#A1A1A1] text-sm">Төслийн нэр</p>
                    <p className="text-sm ">{project?.title}</p>
                  </div>
                  <div>
                    <p className="text-[#A1A1A1] text-sm ">Холбоос</p>
                    <a href={project?.link} target="_blank" className="hover:underline text-sm ">
                      {project?.link}
                    </a>
                  </div>
                  <div className="gap-10 flex ">
                    <div>
                      <p className="text-[#A1A1A1] text-sm ">Идэвх</p>
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            backgroundColor: status != null ? (status ? "#4fe3c2" : "#ED4337") : "#ffcc00",
                          }}
                          className={`w-[10px] h-[10px] rounded-full`}
                        ></div>
                        <p className="text-sm ">{status != null ? (status ? "Ready" : "Унасан") : "Waiting..."}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#A1A1A1] text-sm ">Нэмэгдсэн </p>
                      <p className="text-sm ">{project?.createdAt?.split("T")[0]}</p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: project?.Highlight ? "#53BD90" : "#3A88C0",
                  }}
                  className={`rounded-full w-[60px] h-[35px] flex justify-center items-center text-xs  `}
                >
                  {project?.Highlight ? "Онцлох" : "Энгийн"}
                </div>
              </div>
            </div>
            <div
              style={{
                borderTop: "0.5px solid #3d3d3d ",
              }}
              className=" px-8 py-4 flex items-center justify-between"
            >
              <div onClick={toggleExpand} className="flex items-center cursor-pointer">
                <svg
                  style={{
                    transform: `rotate(${isExpanded ? 90 : 0}deg)`,
                  }}
                  className="transition-all duration-500"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 7L15 12L10 17"
                    stroke="#d3d3d3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>Төслийн дэлгэрэнгүй</div>
              </div>
              <div
                onClick={() => deleteHandler(project?._id)}
                className="border rounded-sm py-1 px-3 text-sm  cursor-pointer flex items-center gap-1 text-[#ED4337] border-[#ED4337]"
              >
                <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12V17" stroke="#ED4337" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 12V17" stroke="#ED4337" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 7H20" stroke="#ED4337" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                    stroke="#ED4337"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#ED4337"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Устгах
              </div>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden flex flex-col px-8 gap-5  ${
                isExpanded ? "h-[100px]" : "h-[0px]" // Apply dynamic height based on state
              }`}
            >
              <div className="w-[100%] ">
                <div className="flex gap-10 justify-between">
                  <div className="flex gap-2 w-[20%] ">
                    <div>Нэр:</div>
                    <input
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      value={project?.title}
                      type="text"
                      className="bg-transparent border-0 border-b outline-none text-[#3FBB46] font-semibold"
                    />
                  </div>
                  <div className="flex gap-2 w-[30%]">
                    <div>Холбоос:</div>
                    <input
                      onChange={(e) => handleInputChange("link", e.target.value)}
                      value={project?.link}
                      type="text"
                      className="bg-transparent border-0 border-b outline-none text-[#3FBB46] font-semibold w-[70%]"
                    />
                  </div>
                  <div className="flex justify-center gap-2 w-[40%]">
                    {["Web", "App", "System"].map((ej) => (
                      <div
                        key={ej}
                        style={{
                          border: ej === project?.Category ? "1px solid #3FBB46" : "1px solid white",
                          color: ej === project?.Category ? "#3FBB46" : "white",
                          opacity: ej === project?.Category ? 1 : 0.5,
                        }}
                        className="cursor-pointer w-[30%] text-center border"
                        onClick={() => handleInputChange("Category", ej)}
                      >
                        {ej}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-[100%]  flex justify-end py-5 gap-5">
                  <div
                    onClick={() => {
                      handleInputChange("Highlight", !project?.Highlight);
                    }}
                    className="cursor-pointer w-[100%] text-center flex justify-center items-center"
                    style={{
                      border: project?.Highlight ? "1px solid #3FBB46" : "1px solid white",
                      color: project?.Highlight ? "#3FBB46" : "white",
                      opacity: project?.Highlight ? 1 : 0.5,
                    }}
                  >
                    Онцлох
                  </div>
                  <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
                    <div style={{}}>
                      <IKUpload fileName={"project"} onError={onError} onSuccess={onSuccess} />
                    </div>
                  </ImageKitProvider>
                  <div
                    onClick={() => {
                      if (isProductChanged()) {
                        setProject(initialProject);
                      }
                    }}
                    style={{ opacity: isProductChanged() ? 1 : 0.5, cursor: isProductChanged() ? "pointer" : "auto" }}
                    className="border rounded-md py-2 px-5 text-sm "
                  >
                    Буцах
                  </div>
                  <div
                    onClick={() => {
                      if (isProductChanged()) {
                        updateHandler();
                      }
                    }}
                    style={{ opacity: isProductChanged() ? 1 : 0.5, cursor: isProductChanged() ? "pointer" : "auto" }}
                    className="border rounded-md py-2 px-5 text-sm bg-[#fff] text-[#000]"
                  >
                    Хадгалах
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
