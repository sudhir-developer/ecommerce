"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">InteriorStore</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/aboutus">About Us</Link>

          {/* Products Dropdown */}
          <div className="relative group">
            <button className="cursor-pointer">Products</button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-md rounded w-40 z-50">
              <Link href="/products/" className="block px-4 py-2 hover:bg-gray-100">Decore Items</Link>
              <Link href="/products/lighting" className="block px-4 py-2 hover:bg-gray-100">Lighting</Link>
              <Link href="/products/decor" className="block px-4 py-2 hover:bg-gray-100">Decor</Link>
            </div>
          </div>
          <Link href="/contactus">Contact Us</Link>
          {/* Cart */}
          <div className="relative group">
            <button className="cursor-pointer"><FiShoppingCart /></button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-md rounded w-40 z-50">
              <div className="p-3">Cart is empty</div>
            </div>
          </div>

          {/* User Dropdown */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="font-medium rounded-lg p-2 bg-green-200"
              >
                Hi, {userName}! ▾
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border rounded-lg shadow-lg z-50">
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { setDropdownOpen(false); handleLogout(); }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="bg-black text-white px-4 py-2 rounded">Login</Link>
          )}

          {!isLoggedIn && (
            <Link href="/signup" className="bg-black text-white px-4 py-2 rounded">Sign Up</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link href="/" className="block">Home</Link>
          <Link href="/aboutus" className="block">About Us</Link>

          {/* Mobile Products */}
          <div>
            <button
              onClick={() => setProductOpen(!productOpen)}
              className="block w-full text-left"
            >
              Products ▾
            </button>
            {productOpen && (
              <div className="pl-4 mt-2 space-y-2">
                <Link href="/products" className="block">Decore Items</Link>
                <Link href="/products/lighting" className="block">Lighting</Link>
                <Link href="/products/decor" className="block">Decor</Link>
              </div>
            )}
          </div>

          {/* Mobile User */}
          {isLoggedIn ? (
            <>
              <p className="font-medium" style={{color: '#16a34a'}}>Hi, {userName}!</p>
              <Link href="/dashboard" className="block">Dashboard</Link>
              <button onClick={handleLogout} className="block text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block">Login</Link>
              <Link href="/signup" className="block">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}