"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Custom Arrow Components
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

// Thumbnail Slider Settings
const ThumbPrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full flex justify-center py-1 hover:bg-gray-100 rounded"
  >
    ▲
  </button>
);

const ThumbNextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full flex justify-center py-1 hover:bg-gray-100 rounded"
  >
    ▼
  </button>
);

const thumbnailSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  arrows: true,
  prevArrow: <ThumbPrevArrow />,
  nextArrow: <ThumbNextArrow />,
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

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

    fetch(`/api/products?limit=7`)
    .then((res) => res.json())
    .then((data) => {
      if (data.products) {
        setRelatedProducts(data.products.filter((p: any) => p._id !== id));
      }
    });
  }, [id]);

  

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
  <div className="flex flex-col md:flex-row gap-10">
    
    {/* Images Column - 60% */}
    <div className="w-full md:w-[50%] flex gap-3">
      
     {/* Thumbnail Slider - left side */}
  <div style={{ width: '80px' }}>
    <Slider {...thumbnailSettings}>
      {product.images?.map((img: string, i: number) => (
        <div key={i} className="py-1">
          <div
            onClick={() => setSelectedImage(img)}
            className={`border-2 rounded cursor-pointer ${selectedImage === img ? "border-black" : "border-gray-200"}`}
          >
            <img
              src={img}
              alt={`image-${i}`}
              width={70}
              height={70}
              className="rounded object-cover w-full h-[70px]"
            />
          </div>
        </div>
      ))}
    </Slider>
  </div>

  {/* Main Image - right side */}
  <div className="overflow-hidden rounded-lg flex-1">
    <img
      src={selectedImage}
      alt={product.name}
      className="rounded-lg object-cover w-full transition-transform duration-300 hover:scale-110"
      style={{ height: '500px' }}
    />
  </div>
    </div>

    {/* Details Column - 40% */}
    <div className="w-full md:w-[50%]">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-500 mb-2">{product.category}</p>
      <p className="text-2xl font-bold text-black mb-4">₹{product.price}</p>
      <p className="text-gray-600 mb-6">{product.description}</p>
      <button className="w-full bg-black text-white py-3 rounded-lg text-lg">
        Add to Cart
      </button>
    </div>

  </div>

  {relatedProducts.length > 0 && (
  <div className="mt-16">
    <h2 className="text-2xl font-bold mb-6">Latest Products</h2>
    <Slider
      dots={false}
      infinite={true}
      speed={500}
      slidesToShow={4}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={8000}
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
      responsive={[
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ]}
    >
      {relatedProducts.map((p) => (
        <div key={p._id} className="px-2">
          <Link
            href={`/products/${p._id}`}
            className="block border rounded-xl p-3 hover:shadow-md transition"
          >
            {p.thumbnail ? (
              <img
                src={p.thumbnail}
                alt={p.name}
                className="w-full h-[150px] object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-[150px] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            <h3 className="font-bold mt-2 text-sm">{p.name}</h3>
            <p className="text-gray-500 text-xs">{p.category}</p>
            <p className="font-bold text-sm mt-1">₹{p.price}</p>
            <p className="font-bold text-sm mt-1">{(p.description).slice(0,35)}{(p.description?.length ?? 0)>100 ? "...":""}</p>
          </Link>
        </div>
      ))}
    </Slider>
  </div>
)}

</div>


  );
}