"use client";

import Image from "next/image";
import Link from "next/link";
export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      
     {/* About Us Banner */}
<div className="relative bg-black text-white py-16 px-8 rounded-2xl mb-12 overflow-hidden">

{/* Background Pattern */}
<div className="absolute inset-0 opacity-10">
  <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/3 -translate-y-1/3"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
  <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
</div>

{/* Content */}
<div className="relative z-10 text-center max-w-2xl mx-auto">
  <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">Our Story</p>
  <h1 className="text-4xl md:text-5xl font-bold mb-4">
    About <span className="text-yellow-400">InteriorStore</span>
  </h1>
  <p className="text-gray-300 text-lg mb-8">
    Hum har ghar ko sundar banana chahte hain. Premium quality, affordable prices.
  </p>
  <div className="flex justify-center gap-8 flex-wrap">
    <div className="text-center">
      <p className="text-3xl font-bold text-yellow-400">5000+</p>
      <p className="text-gray-400 text-sm">Happy Customers</p>
    </div>
    <div className="text-center">
      <p className="text-3xl font-bold text-yellow-400">200+</p>
      <p className="text-gray-400 text-sm">Products</p>
    </div>
    <div className="text-center">
      <p className="text-3xl font-bold text-yellow-400">4.8★</p>
      <p className="text-gray-400 text-sm">Average Rating</p>
    </div>
  </div>
</div>

</div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2020, InteriorStore started with a simple idea — make beautiful
            home decor accessible to everyone. What began as a small showroom has grown
            into a trusted brand loved by thousands of customers across the country.
          </p>
          <p className="text-gray-600">
            From handcrafted furniture to elegant lighting and wall decor, every product
            in our collection is carefully curated to bring warmth and style to your
            living spaces.
          </p>
        </div>
        <div className="bg-gray-100 rounded-xl h-72 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Store Image</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 text-center">
        {[
          { number: "5000+", label: "Happy Customers" },
          { number: "200+", label: "Products" },
          { number: "50+", label: "Brands" },
          { number: "4.8★", label: "Average Rating" },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-6 border">
            <p className="text-3xl font-bold mb-1">{stat.number}</p>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Premium Quality",
              desc: "Every product is handpicked and quality checked before reaching your home.",
              icon: "🏆",
            },
            {
              title: "Affordable Prices",
              desc: "We work directly with manufacturers to offer the best prices without compromising quality.",
              icon: "💰",
            },
            {
              title: "Fast Delivery",
              desc: "We deliver across the country with care and speed so you can enjoy your purchase sooner.",
              icon: "🚚",
            },
          ].map((item, i) => (
            <div key={i} className="border rounded-xl p-6 text-center hover:shadow-md transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Rahul Sharma", role: "Founder & CEO" },
            { name: "Priya Patel", role: "Head of Design" },
            { name: "Amit Verma", role: "Operations Manager" },
          ].map((member, i) => (
            <div key={i} className="text-center border rounded-xl p-6 hover:shadow-md transition">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Home?</h2>
        <p className="text-gray-400 mb-6">Explore our collection and find the perfect pieces for your space.</p>
        
        <Link
  href="/products"
  className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
>
  Shop Now
</Link>
      </div>

    </div>
  );
}