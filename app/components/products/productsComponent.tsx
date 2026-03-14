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