"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) setProduct(data.product);
        if (data.product) {
            setProduct(data.product);
            setSelectedImage(data.product.thumbnail); // default thumbnail
          }
        setLoading(false);
      });
  }, [id]);

  

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex gap-3">
  
  {/* Thumbnails - left side */}
  <div className="flex flex-col gap-2">
    {product.images?.map((img: string, i: number) => (
      <div
        key={i}
        onClick={() => setSelectedImage(img)}
        className={`border-2 rounded cursor-pointer ${selectedImage === img ? "border-black" : "border-gray-200"}`}
      >
        <Image
          src={img}
          alt={`image-${i}`}
          width={70}
          height={70}
          className="rounded object-cover"
        />
      </div>
    ))}
  </div>

  {/* Main Image - right side */}
  <div className="overflow-hidden rounded-lg flex-1">
    <Image
      src={selectedImage}
      alt={product.name}
      width={500}
      height={400}
      className="rounded-lg object-cover w-full transition-transform duration-300 hover:scale-110"
    />
  </div>

</div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-2">{product.category}</p>
          <p className="text-2xl font-bold text-black mb-4">₹{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button className="w-full bg-black text-white py-3 rounded-lg text-lg">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}