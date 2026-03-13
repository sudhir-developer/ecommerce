"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.product) return;
        const p = data.product;
        setName(p.name || "");
        setPrice(p.price || "");
        setCategory(p.category || "");
        setDescription(p.description || "");
        setExistingImages(p.images || []);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("Updating...");

    let uploadedUrls: string[] = existingImages;

    if (images.length > 0) {
      uploadedUrls = [];
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
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, price, category, description,
        images: uploadedUrls,
        thumbnail: uploadedUrls[0],
      }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    if (data.message) setTimeout(() => router.push("/dashboard"), 1500);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {message && <p className="mb-4 p-2 bg-blue-100 rounded">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Product Name" value={name}
          onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />
        <input type="number" placeholder="Price" value={price}
          onChange={(e) => setPrice(e.target.value)} className="border p-2 rounded" />
        <input type="text" placeholder="Category" value={category}
          onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded" />
        <textarea placeholder="Description" value={description}
          onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded" rows={3} />

        {existingImages.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Images:</p>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img, i) => (
                <img key={i} src={img} width={60} height={60} className="border rounded object-cover" />
              ))}
            </div>
          </div>
        )}

        <input type="file" multiple accept="image/*"
          onChange={(e) => { if (e.target.files) setImages(Array.from(e.target.files)); }}
          className="border p-2 rounded" />
        <p className="text-xs text-gray-400">New images select karo tabhi replace hongi</p>

        <button className="bg-black text-white p-2 rounded">Update Product</button>
      </form>
    </div>
  );
}