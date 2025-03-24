import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export const Create = ({
  setProducts,
  setInitialProduct,
  products,
  initialProduct,
}: any) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [Category, setCategory] = useState("Web");
  const [Highlight, setHighlight] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");

  const projectHandler = async () => {
    const { data } = await axios.get("/api/project");
    setProducts(data?.data || []);
    setInitialProduct(data?.data || []);
  };
  const handleFileUpload = async (e: any) => {
    const file = e;

    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload-temp", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data?.imageUrl) {
        setImage(data.imageUrl);
      } else {
        setError("Failed to upload image.");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload image.");
    }
  };

  const createHandler = async () => {
    if (!title || !link || !Category || !image) {
      setError("Please fill out all fields and upload an image.");
      return;
    }
    try {
      // Move the image to the permanent folder
      if (image) {
        await axios.post("/api/move-image", { imageUrl: image });
      }

      // Create the new project
      await axios.post("/api/project", {
        body: {
          title,
          link,
          Highlight,
          Category,
          thumbnail: image.replace("temp", "projects"),
        },
      });

      setTitle("");
      setLink("");
      setCategory("");
      setHighlight(false);
      setImage(undefined);
      setError("");
      alert("Project created successfully!");
      projectHandler();
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project. Please try again.");
    }
  };

  return (
    <div className=" p-5 w-[100%] ">
      <h1 className="text-2xl font-semibold">Төсөл нэмэх:</h1>

      <div id="Үүсгэх" className="py-5  flex justify-center items-center">
        <div className="flex flex-col border p-5 rounded-md gap-5">
          <div className="flex items-center justify-between gap-4">
            <div>Title:</div>
            <div className="border-0 border-b">
              <input
                value={title}
                onChange={(e) => console.log(e.target.value)}
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
          <div className="flex justify-center">
            <label className="cursor-pointer">
              {/* <Image
                src={image || "/placeholder.png"}
                alt="Upload"
                className="cover"
                width={200}
                height={200}
              /> */}
              <img
                src={image || "/placeholder.png"}
                alt="Upload"
                className="cover"
                width={200}
                height={200}
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: any) => handleFileUpload(e.target.files[0])}
              />
            </label>
          </div>
          <div className="flex justify-center gap-2">
            {["Web", "App", "System"].map((ej) => (
              <div
                key={ej}
                style={{
                  border:
                    ej === Category ? "1px solid #3FBB46" : "1px solid white",
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
                pointerEvents:
                  title && link && Category && image ? "auto" : "none",
                border: "1px solid #3FBB46",
                color: "#3FBB46",
              }}
            >
              Хадгалах
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
