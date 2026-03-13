"use client";

import { useState } from "react";

export default function AddProducts() {
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("");
   const [message, setMessage] = useState("");
   const [description,setDescription] = useState("");
   const [type, setType] = useState("");

   const [images, setImages] = useState<File[]>([]);
   const [thumbnailIndex, setThumbnailIndex] = useState<number>(0);


   const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    if (!name || !category || !price || !description || images.length === 0) {
      setMessage("All fields are mandatory");
      return;
    }
  
    setMessage("Uploading images...");
  
    const uploadedUrls: string[] = [];
  
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("file", images[i]);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET as string);
  
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
  
      const data = await res.json();
      uploadedUrls.push(data.secure_url);
    }
  
    const thumbnailUrl = uploadedUrls[thumbnailIndex];
  
    const productRes = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        category,
        description,
        images: uploadedUrls,
        thumbnail: thumbnailUrl,
      }),
    });
  
    const productData = await productRes.json();
    
    if (productData.error) {
        setType("error");
        setMessage(productData.error);
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      if (productData.message) {
        setType("success");
        setMessage(productData.message);
        setTimeout(() => setMessage(""), 5000);
      }
  
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImages([]);
    setThumbnailIndex(0);
  };

   



     return(
        <>
        <div className="max-w-md mx-auto mt-10">

<h1 className="text-2xl font-bold mb-4">
  Add Product
</h1>
{message && (
        <div
            className={`mb-4 p-2 rounded ${
            type === "success"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
        >
            {message}
        </div>
        )}
<form onSubmit={handleSubmit} className="flex flex-col gap-3">

  <input
    type="text"
    placeholder="Product Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    className="border p-2"
    
  />

  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e)=>setPrice(e.target.value)}
    className="border p-2"
    
  />

  <input
    type="text"
    placeholder="Category"
    value={category}
    onChange={(e)=>setCategory(e.target.value)}
    className="border p-2"
    
  />
  <textarea placeholder="Description" value={description}
          onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded" rows={3} />
          
 <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  }}
  className="border p-2"
/>
{images.length > 0 && (
  <div className="flex gap-2 mt-2">
    {images.map((img, index) => (
      <img
        key={index}
        src={URL.createObjectURL(img)}
        width={50}
        height={50}
        className={`border ${thumbnailIndex === index ? "border-blue-500" : ""}`}
        onClick={() => setThumbnailIndex(index)}
      />
    ))}
  </div>
)}

  <button className="bg-black text-white p-2">
    Add Product
  </button>

</form>

</div>
        </>
     )
}