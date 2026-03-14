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
export default function HomeProductComponent(){
    const [products, setProducts] = useState<Products[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const res = await fetch("/api/products");
          const data = await res.json();
          // console.log("API response:", data); 
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {loading? (<p>Loading</p>):(<>

    {products?.slice(0,8).map((pro)=>(
    <ProductCard 
     key={pro._id}
     _id={pro._id}
     title={pro.name}
     price={pro.price}
     category={pro.category}
     thumbnail={pro.thumbnail}
     pro_description={pro.description? pro.description?.slice(0,40) + (pro.description?.length > 40 ? "...":""):""}
    />
  ))}
  </>)}
  </div>
        </>
    )
}