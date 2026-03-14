"use client";
import HomeProductComponent from "./components/homeproduct/homeProductComponent";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/banner1.jpg",
    heading: "Modern Interior Collection",
    desc: "Discover premium furniture and home decor",
    highlight: [0, 7, 15], // M, I, C ka index
  },
  {
    image: "/banner2.jpg",
    heading: "Transform Your Living Space",
    desc: "Premium quality products for modern homes",
    highlight: [0, 10, 15], // T, Y, L ka index
  },
  {
    image: "/banner3.jpg",
    heading: "Luxury At Affordable Prices",
    desc: "Handpicked designs for every home",
    highlight: [0, 7, 10], // L, A, P ka index
  },
];

export default function Home() {
  const PrevArrow = ({ onClick }: any) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border rounded-full p-2 shadow-md hover:bg-black hover:text-white transition"
    >
      <FiChevronLeft size={20} />
    </button>
  );
  
  const NextArrow = ({ onClick }: any) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border rounded-full p-2 shadow-md hover:bg-black hover:text-white transition"
    >
      <FiChevronRight size={20} />
    </button>
  );
  // Auto slide
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <main>
      <section className="h-[70vh] relative overflow-hidden">

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: current === i ? 1 : 0,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white transition-all duration-500">
          {slides[current].heading.split("").map((char, i) => 
            slides[current].highlight.includes(i) ? (
              <span key={i} className="">{char}</span>
            ) : char
          )}
          </h1>
          <p className="text-lg text-white/80 mb-6 transition-all duration-500">
            {slides[current].desc}
          </p>
          <Link
            href="/products"
            className="bg-yellow-300 text-black px-6 py-3 rounded hover:bg-yellow-400 transition font-semibold"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              current === i ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Prev/Next Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
      >
        ❮
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
      >
        ❯
      </button>

    </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {[
    { title: "Furniture", image: "/5.jpg" },
    { title: "Lighting", image: "/4.jpg" },
    { title: "Wall Decor", image: "/6.jpg" },
    { title: "Rugs", image: "/11.jpg" },
  ].map((item, i) => (
    <div
      key={i}
      className="relative text-white font-bold text-3xl flex items-center justify-center text-center rounded-lg hover:shadow-lg cursor-pointer overflow-hidden h-40"
      style={{
        backgroundImage: `url('${item.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition"></div>
      {/* Text */}
      <span className="relative z-10">{item.title}</span>
    </div>
  ))}
</div>
      </section>

      {/* Interior Inspiration Section */}
<section className="max-w-7xl mx-auto px-4 py-16">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Left - Text */}
    <div>
      <p className="text-yellow-500 uppercase tracking-widest text-sm mb-3">Interior Inspiration</p>
      <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
        Design Your Dream <br />
        <span className="text-yellow-400">Living Space</span>
      </h2>
      <p className="text-gray-500 text-lg mb-6">
        Har ghar ki apni kahani hoti hai. Hum aapki kahani ko sundar banana chahte hain — 
        premium quality products ke saath jo aapke ghar ko heaven bana dein.
      </p>
      <div className="flex flex-col gap-4 mb-8">
        {[
          { icon: "✨", text: "Handpicked premium products" },
          { icon: "🎨", text: "Modern & classic designs" },
          { icon: "💎", text: "Luxury at affordable prices" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-2xl">{item.icon}</span>
            <p className="text-gray-600 font-medium">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <a href="/products" className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition">
          Explore Now
        </a>
        <a href="/aboutus" className="border border-black text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition">
          Our Story
        </a>
      </div>
    </div>

    {/* Right - Image Grid */}
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-3">
        <div className="bg-gray-200 rounded-2xl h-48 overflow-hidden">
          <img src="/banner1.jpg" alt="interior" className="w-full h-full object-cover hover:scale-110 transition duration-300" 
             />
        </div>
        <div className="bg-yellow-100 rounded-2xl h-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">200+</p>
            <p className="text-sm text-yellow-700">Products</p>
          </div>
        </div>
      </div>
      <div className="space-y-3 mt-6">
        <div className="bg-gray-100 rounded-2xl h-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold">5K+</p>
            <p className="text-sm text-gray-500">Happy Customers</p>
          </div>
        </div>
        <div className="bg-gray-200 rounded-2xl h-48 overflow-hidden">
          <img src="/banner3.jpg" alt="interior" className="w-full h-full object-cover hover:scale-110 transition duration-300"
             />
        </div>
      </div>
    </div>

  </div>
</section>

{/* Our Services Section */}
<section className="bg-black text-white py-16 px-4">
  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-12">
      <p className="text-red-500 uppercase tracking-widest text-sm mb-3">Our Services</p>
      <h2 className="text-4xl md:text-5xl font-bold">Our Interior Services</h2>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        {
          icon: "🛋️",
          number: "01",
          title: "Furniture Design",
          desc: "Through a unique combination of modern and classic design expertise, we deliver world class furniture solutions.",
        },
        {
          icon: "💡",
          number: "02",
          title: "Lighting Design",
          desc: "Through a unique combination of modern and classic design expertise, we deliver world class lighting solutions.",
        },
        {
          icon: "🎨",
          number: "03",
          title: "Wall Decor",
          desc: "Through a unique combination of modern and classic design expertise, we deliver world class decor solutions.",
        },
        {
          icon: "🏠",
          number: "04",
          title: "Interior Design",
          desc: "Through a unique combination of modern and classic design expertise, we deliver world class interior solutions.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="border border-gray-800 rounded-lg p-18 relative overflow-hidden hover:border-gray-500 transition group"
        >
          <p className="absolute bottom-4 right-6 text-7xl font-bold text-gray-700 select-none">
            {item.number}
          </p>
          <div className="text-5xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
          <p className="text-gray-400 mb-6 relative z-10">{item.desc}</p>
            <a href="/products"
            className="text-sm font-bold uppercase tracking-widest text-white hover:text-red-500 transition flex items-center gap-2"
          >
            Explore Service <span>→</span>
          </a>
        </div>
      ))}
    </div>

  </div>
</section>

      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Products
        </h2>
        <HomeProductComponent/>
      </section>
{/* About Section */}
<section className="bg-[#1a1a1a] text-white py-16 px-4 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <p className="absolute -top-6 left-0 text-[120px] font-bold text-white/5 select-none leading-none">
          CLIENT
        </p>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          <p className="text-sm uppercase tracking-widest text-gray-300">Started In 2026</p>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Where Spaces <br />
          Inspire, And{" "}
          <span className="text-yellow-500">Design</span> <br />
          <span className="text-yellow-500">Comes Alive</span>
          <span className="text-yellow-500 text-5xl">.</span>
        </h2>

        {/* Checkpoints */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            "Latest Technologies",
            "High-Quality Designs",
            "5 Years Warranty",
            "Residential Design",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span>
              <p className="text-sm font-semibold text-gray-200">{item}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-8 max-w-md leading-relaxed">
          Whether it's your home, office, or a commercial project, we
          are always dedicated to bringing your vision to life. Our
          numbers speak better than words.
        </p>

        {/* Button */}
        
         <a href="/aboutus"
          className="inline-flex items-center gap-3 border border-white text-white px-6 py-3 rounded-full hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition font-semibold"
        >
          More About Us
          <span className="bg-yellow-500 text-black w-7 h-7 rounded-full flex items-center justify-center text-sm">
            →
          </span>
        </a>
      </div>

      {/* Right - Image */}
      <div className="relative">
        {/* Background shape */}
        <div className="absolute inset-0 bg-yellow-500/10 rounded-3xl transform rotate-3"></div>
        <img
          src="/banner3.jpg"
          alt="Interior Design"
          className="relative z-10 w-full h-[500px] object-cover rounded-3xl shadow-2xl"
        />
      </div>

    </div>
  </div>
</section>

{/* Why Choose Us Section */}
<section className="max-w-7xl mx-auto px-4 py-16">
  
  {/* Heading */}
  <div className="text-center mb-12">
    <p className="text-yellow-500 uppercase tracking-widest text-sm mb-2">Our Benefits</p>
    <h2 className="text-4xl font-bold">Why Choose Us</h2>
    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
      We are committed to providing the best interior products with exceptional service.
    </p>
  </div>

  {/* Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { icon: "🏆", title: "Premium Quality", desc: "Har product quality checked hai before delivery." },
      { icon: "🚚", title: "Fast Delivery", desc: "Pan India delivery with care and speed." },
      { icon: "💰", title: "Best Prices", desc: "Direct manufacturers se best prices guaranteed." },
      { icon: "🔄", title: "Easy Returns", desc: "7 days hassle free return policy." },
    ].map((item, i) => (
      <div key={i} className="text-center border rounded-2xl p-6 hover:shadow-lg transition hover:-translate-y-1">
        <div className="text-5xl mb-4">{item.icon}</div>
        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
        <p className="text-gray-500 text-sm">{item.desc}</p>
      </div>
    ))}
  </div>

</section>

{/* Testimonials Section */}
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-4">

    <div className="text-center mb-12">
      <p className="text-yellow-500 uppercase tracking-widest text-sm mb-2">Testimonials</p>
      <h2 className="text-4xl font-bold">What Our Customers Say</h2>
    </div>

    <div className="relative px-8">
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={3000}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 640, settings: { slidesToShow: 1 } },
        ]}
      >
        {[
          { name: "Rahul Sharma", city: "Delhi", review: "Bahut achhe products hain! Quality ekdum top notch hai. Main zaroor dobara order karunga.", rating: 5 },
          { name: "Priya Patel", city: "Mumbai", review: "Delivery bahut fast thi aur packaging bhi bahut achhi thi. Highly recommended!", rating: 5 },
          { name: "Amit Verma", city: "Bangalore", review: "Price ke hisaab se quality bahut achhi hai. Ghar bilkul badal gaya!", rating: 4 },
          { name: "Sneha Gupta", city: "Pune", review: "Superb quality aur amazing customer service. Bahut khush hoon is purchase se!", rating: 5 },
          { name: "Vikram Singh", city: "Jaipur", review: "Ekdum sahi products hain. Ghar ka interior bilkul change ho gaya. Thanks!", rating: 5 },
        ].map((item, i) => (
          <div key={i} className="px-3">
            <div className="bg-white border rounded-2xl p-6 hover:shadow-lg transition h-full">
              <div className="flex mb-3">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{item.review}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                  {item.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.city}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>

  </div>
</section>

{/* CTA Section */}
<section className="bg-black text-white py-16">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Home?</h2>
    <p className="text-gray-400 text-lg mb-8">
      Explore our latest collection and find perfect pieces for your space.
    </p>
    <div className="flex justify-center gap-4 flex-wrap">
      <a href="/products" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
        Shop Now
      </a>
      <a href="/contactus" className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
        Contact Us
      </a>
    </div>
  </div>
</section>
      </main>
    </>
  );
}
