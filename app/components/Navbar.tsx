"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      fetch("/api/showusername")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUserName(data.user.name);
        });
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };


  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          InteriorStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/aboutus">About Us</Link>
          
          <div className="relative group">
  <button className="cursor-pointer">
    Products
  </button>
  <div className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-md rounded w-40">
    <Link
      href="/products/"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Decore Items
    </Link>

    <Link
      href="/products/lighting"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Lighting
    </Link>

    <Link
      href="/products/decor"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Decor
    </Link>

  </div>
           </div>
          <div className="relative group">
  <button className="cursor-pointer">
  <FiShoppingCart />
  </button>
  <div className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-md rounded w-40">
   
      <div className="p-3">Cart is empty</div>
    
  </div>
           </div>

         
           {isLoggedIn ? (
  <div className="flex items-center gap-3">
    <span className="font-medium rounded-lg p-2 bg-green-300">Hi, {userName}!</span>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
) : (
  <Link href="/login" className="bg-black text-white px-4 py-2 rounded">
    Login
  </Link>
)}
          <Link
            href="/signup"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Sign Up
          </Link>
          
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu size={24} />
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link href="/" className="block">
            Home
          </Link>

          <div>
      <button
        onClick={() => setProductOpen(!productOpen)}
        className="block w-full text-left"
      >
        Products
      </button>

      {productOpen && (
        <div className="pl-4 mt-2 space-y-2">
          <Link href="/products/furniture" className="block">
            Furniture
          </Link>

          <Link href="/products/lighting" className="block">
            Lighting
          </Link>

          <Link href="/products/decor" className="block">
            Decor
          </Link>
        </div>
      )}
    </div>

         
          <div className="relative group">
  <button className="cursor-pointer">
    Products
  </button>
  <div className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-md rounded w-40">
    <Link
      href="/products/furniture"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Cart
    </Link>
  </div>
           </div>

          <Link href="/login" className="block">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}