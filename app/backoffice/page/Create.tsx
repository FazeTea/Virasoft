"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";
import { divide } from "lodash";
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
export const Create = ({ setProducts, setInitialProduct, handleClose }: any) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [Category, setCategory] = useState("Web");
  const [Highlight, setHighlight] = useState(false);
  const [image, setImage] = useState<any>(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const projectHandler = async () => {
    const { data } = await axios.get("/api/project");
    setProducts(data?.data || []);
    setInitialProduct(data?.data || []);
  };
  // const handleFileUpload = async (e: any) => {
  //   const file = e;

  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   try {
  //     const response = await fetch("/api/upload-temp", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await response.json();
  //     if (data?.imageUrl) {
  //       setImage(data.imageUrl);
  //     } else {
  //       setError("Failed to upload image.");
  //     }
  //   } catch (err) {
  //     console.error("Error uploading file:", err);
  //     setError("Failed to upload image.");
  //   }
  // };

  const createHandler = async () => {
    if (!title || !link || !Category || !image) {
      setError("Please fill out all fields and upload an image.");
      return;
    }
    try {
      // // Move the image to the permanent folder
      // if (image) {
      //   await axios.post("/api/move-image", { imageUrl: image });
      // }

      // Create the new project
      await axios.post("/api/project", {
        body: {
          title,
          link,
          Highlight,
          Category,
          thumbnail: image?.url + "#" + image?.fileId,
        },
      });

      setTitle("");
      setLink("");
      setCategory("");
      setHighlight(false);
      setImage(undefined);
      setError("");
      alert("Төсөл амжилттай үүслээ");
      handleClose();
      projectHandler();
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project. Please try again.");
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
    console.log("Error", err);
    setLoading(false);
  };

  const onSuccess = (res) => {
    setImage(res);
    setLoading(false);

    console.log("Success", res);
  };

  return (
    // <div id="Үүсгэх" className="py-5  flex justify-center items-center border">
    <div className="w-[20%] flex flex-col  p-5 rounded-md gap-5 bg-[#000] border">
      <div className="flex items-center justify-between gap-4">
        <div>Title:</div>
        <div className="border-0 border-b">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-[#3FBB46] font-semibold"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>Link:</div>
        <div className="border-0 border-b">
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-[#3FBB46]"
          />
        </div>
      </div>
      <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        <div className="flex justify-center">
          <label className="cursor-pointer">
            {/* <Image src=alt="Upload" width={200} height={200} priority /> */}

            {!loading ? (
              <Image src={image?.url || "/placeholder.png"} alt="Upload" width={200} height={200} priority />
            ) : (
              <div className="w-[200px] h-[200px] border flex justify-center items-center">Loading...</div>
            )}
            <div
              style={{
                display: "none",
              }}
            >
              <IKUpload fileName={"project"} onError={onError} onSuccess={onSuccess} />
            </div>
          </label>
        </div>
      </ImageKitProvider>

      <div className="flex justify-center gap-2">
        {["Web", "App", "System"].map((ej) => (
          <div
            key={ej}
            style={{
              border: ej === Category ? "1px solid #3FBB46" : "1px solid white",
              color: ej === Category ? "#3FBB46" : "white",
              opacity: ej === Category ? 1 : 0.5,
            }}
            className="cursor-pointer w-[30%] text-center border"
            onClick={() => setCategory(ej)}
          >
            {ej}
          </div>
        ))}
      </div>
      <div className="flex justify-center ">
        <div
          onClick={() => setHighlight(!Highlight)}
          className="cursor-pointer w-[100%] text-center"
          style={{
            border: Highlight ? "1px solid #3FBB46" : "1px solid white",
            color: Highlight ? "#3FBB46" : "white",
            opacity: Highlight ? 1 : 0.5,
          }}
        >
          Үндсэн
        </div>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="flex justify-center gap-5">
        <div
          className="w-[100%] border text-center cursor-pointer"
          onClick={createHandler}
          style={{
            opacity: title && link && Category && image ? 1 : 0.5,
            pointerEvents: title && link && Category && image ? "auto" : "none",
            border: "1px solid #3FBB46",
            color: "#3FBB46",
          }}
        >
          Хадгалах
        </div>
      </div>
    </div>
    // </div>
  );
};
