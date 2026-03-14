"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
interface Products{
  _id:string,
  name:string,
  price:number,
  category:string,
  description:string,
  thumbnail:string
}
export default function ProductsComponent(){
    const [products, setProducts] = useState<Products[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const res = await fetch("/api/products");
          const data = await res.json();
          if (Array.isArray(data)) {
            setProducts(data);
          } else if (data.products && Array.isArray(data.products)) {
            setProducts(data.products);
          } else {
            setProducts([]);
          }
        } catch (err) {
          console.error("Failed to fetch products:", err);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
    return(
        <>
        <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="relative bg-black text-white py-16 px-8 rounded-2xl mb-12 overflow-hidden">
  
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-2xl">
    <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">New Collection 2026</p>
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Transform Your <br />
      <span className="text-yellow-400">Living Space</span>
    </h1>
    <p className="text-gray-300 text-lg mb-8">
      Premium interior products curated for modern homes. Explore our latest collection.
    </p>
    <div className="flex gap-4">
      <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
        Shop Now
      </button>
      <button className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
        View Collection
      </button>
    </div>
  </div>

</div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {loading? (<p>Loading</p>):(<>

    {products?.map((pro)=>(
    <ProductCard 
     key={pro._id}
     _id={pro._id}
     title={pro.name}
     price={pro.price}
     category={pro.category}
     thumbnail={pro.thumbnail}
     pro_description={pro.description}
    />
  ))}
  </>)}
  </div>
  </div>
        </>
    )
}