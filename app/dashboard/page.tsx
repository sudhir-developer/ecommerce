"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description:string;
  thumbnail: string;
  images: string[];
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch("/api/showusername")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setRole(data.user.role);
      });
  }, []);

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


  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    
    if (res.status === 403) {
      alert("Access denied! Admin only.");
      return;
    }
    
    if (data.message) {
      alert(data.message);
      setProducts(products.filter((p) => p._id !== id));
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <>
      <div className="container max-w-7xl mx-auto p-4 mb-20">
        <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>

        {loading && <p>Loading products...</p>}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

       
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((pro) => (
              <div key={pro._id} className="p-6 border border-gray-300 rounded shadow">
                {pro.thumbnail? (<>
                    <Image
                  src={pro.thumbnail}
                  height={200}
                  width={200}
                  alt={pro.name}
                  className="object-cover w-full"
                />
                </>):(
                    <><p>No Image</p></>
                    )}
               
                <p className="font-bold mt-2">{pro.name}</p>
                <p><b>Price:</b> ${pro.price}</p>
                <p><b>Category:</b> {pro.category}</p>
                <p><b>Description:</b> {pro.description.slice(0,50)}{(pro.description.length ?? 0 ) > 100 ? "...": ""}</p>
                
                 {role === "admin" && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link
                    href={`/dashboard/edit-product/${pro._id}`}
                    className="bg-sky-500 text-white px-3 py-1 rounded text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pro._id)}
                    className="bg-zinc-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  </div>
                 )}
                  


                
              </div>
            ))}
          </div>
      
      </div>
    </>
  );
}