import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
type ProductType = {
  title: string;
  link: string;
  thumbnail: string;
  Category: "Web" | "App" | "System";
  Highlight: boolean;
};
export const Project = ({ setProducts, setInitialProduct, products, initialProduct }: any) => {
  const [uploadedImages, setUploadedImages] = useState<{ [key: number]: string }>({}); // Temporary image URLs

  useEffect(() => {
    projectHandler();
  }, []);

  const projectHandler = async () => {
    const { data } = await axios.get("/api/project");
    setProducts(data?.data || []);
    setInitialProduct(data?.data || []);
  };
  const handleInputChange = (index: number, field: keyof ProductType, value: string | boolean) => {
    setProducts((prevProducts: any) =>
      prevProducts.map((product: any, i: any) =>
        i === index
          ? {
              ...product,
              [field]: value,
            }
          : product
      )
    );
  };

  const resetChanges = async (index: number) => {
    setProducts((prevProducts: any) =>
      prevProducts.map((product: any, i: any) => (i === index ? initialProduct[i] : product))
    );
    setUploadedImages((prev) => {
      const newImages = { ...prev };
      delete newImages[index];
      return newImages;
    });

    // Clear temp folder on "Буцах"
    await fetch("/api/clear-temp", {
      method: "POST",
    });
  };

  const isProductChanged = (index: number) => {
    const current = products[index];
    const initial = initialProduct[index];
    return JSON.stringify(current) !== JSON.stringify(initial);
  };

  const handleFileUpload = async (e: any, index: number) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload-temp", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data?.imageUrl) {
      setUploadedImages((prev) => ({ ...prev, [index]: data.imageUrl })); // Temporary storage
      handleInputChange(index, "thumbnail", data.imageUrl);
    }
  };

  const updateHandler = async (body: ProductType, i: number) => {
    try {
      const previousImageUrl = initialProduct[i]?.thumbnail; // Store the previous image URL
      let finalImageUrl = body.thumbnail;

      // Finalize image storage if needed
      if (uploadedImages[i]) {
        const response = await axios.post("/api/move-image", { imageUrl: uploadedImages[i] }); // Move from temp to permanent folder
        finalImageUrl = response.data.imageUrl; // Get the final URL
      }

      // Update the product in the database with the permanent image URL
      const updatedBody = { ...body, thumbnail: finalImageUrl };
      const result = await axios.put("/api/project", { body: updatedBody });
      const updatedProduct = result.data.data;

      // Update the state
      setProducts((prevProducts: any) =>
        prevProducts.map((product: any, index: any) => (index === i ? updatedProduct : product))
      );
      setInitialProduct((prevProducts: any) =>
        prevProducts.map((product: any, index: any) => (index === i ? updatedProduct : product))
      );

      // Clear temporary image reference
      setUploadedImages((prev) => {
        const newImages = { ...prev };
        delete newImages[i];
        return newImages;
      });

      // Delete the previous image from the projects folder
      if (previousImageUrl && !previousImageUrl.startsWith("/temp/")) {
        await axios.post("/api/delete-image", { imageUrl: previousImageUrl });
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div id="Төсөл" className="w-[100vw] p-5">
      <h1 className="text-2xl font-semibold">Төслүүд:</h1>

      <div className="py-10 flex flex-wrap gap-10 justify-center">
        {products?.map((el: ProductType, i: number) => {
          return (
            <div key={i} className="flex flex-col border p-5 rounded-md gap-5">
              <div className="flex items-center justify-between gap-4">
                <div className="">Title:</div>
                <div className="border-0 border-b">
                  <input
                    onChange={(e) => handleInputChange(i, "title", e.target.value)}
                    value={el.title}
                    type="text"
                    className="bg-transparent border-none outline-none text-[#3FBB46] font-semibold"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="">Link:</div>
                <div className="border-0 border-b">
                  <input
                    onChange={(e) => handleInputChange(i, "link", e.target.value)}
                    value={el.link}
                    type="text"
                    className="bg-transparent border-none outline-none text-[#3FBB46]"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <label className="cursor-pointer">
                  <Image
                    src={uploadedImages[i] || el.thumbnail || "/placeholder.png"}
                    alt="Upload"
                    className="cover"
                    width={200}
                    height={200}
                  />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, i)} />
                </label>
              </div>
              <div className="flex justify-center gap-2">
                {["Web", "App", "System"].map((ej) => (
                  <div
                    key={ej}
                    style={{
                      border: ej === el?.Category ? "1px solid #3FBB46" : "1px solid white",
                      color: ej === el?.Category ? "#3FBB46" : "white",
                      opacity: ej === el?.Category ? 1 : 0.5,
                    }}
                    className="cursor-pointer w-[30%] text-center border"
                    onClick={() => handleInputChange(i, "Category", ej)}
                  >
                    {ej}
                  </div>
                ))}
              </div>
              <div className="flex justify-center ">
                <div
                  onClick={() => {
                    handleInputChange(i, "Highlight", !el?.Highlight);
                  }}
                  className="cursor-pointer w-[100%] text-center"
                  style={{
                    border: el?.Highlight ? "1px solid #3FBB46" : "1px solid white",
                    color: el?.Highlight ? "#3FBB46" : "white",
                    opacity: el?.Highlight ? 1 : 0.5,
                  }}
                >
                  Үндсэн
                </div>
              </div>
              <div className="flex justify-center gap-5">
                <div
                  className={`w-[50%] border text-center cursor-pointer ${
                    isProductChanged(i) ? "bg-gray-500 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                  onClick={() => {
                    if (isProductChanged(i)) {
                      resetChanges(i);
                    }
                  }}
                  style={{
                    pointerEvents: isProductChanged(i) ? "auto" : "none",
                    opacity: isProductChanged(i) ? 1 : 0.5,
                  }}
                >
                  Буцах
                </div>

                <div
                  className={`w-[50%] border  text-center cursor-pointer`}
                  onClick={() => updateHandler(el, i)}
                  style={{
                    pointerEvents: isProductChanged(i) ? "auto" : "none",
                    opacity: isProductChanged(i) ? 1 : 0.5,
                    border: isProductChanged(i) ? "1px solid #3FBB46" : "1px solid white",
                    color: isProductChanged(i) ? "#3FBB46" : "white",
                  }}
                >
                  Хадгалах
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
