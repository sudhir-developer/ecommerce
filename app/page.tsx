import HomeProductComponent from "./components/homeproduct/homeProductComponent";

export default function Home() {
 
  return (
    <>
      <main>
      <section className="h-[70vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            Modern Interior Collection
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover premium furniture and home decor
          </p>
          <button className="bg-black text-white px-6 py-3 rounded">
            Shop Now
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Shop by Category
      </h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div className="bg-gray-100 p-10 text-center rounded-lg hover:shadow-lg cursor-pointer">
      Furniture
    </div>

    <div className="bg-gray-100 p-10 text-center rounded-lg hover:shadow-lg cursor-pointer">
      Lighting
    </div>

    <div className="bg-gray-100 p-10 text-center rounded-lg hover:shadow-lg cursor-pointer">
      Wall Decor
    </div>

    <div className="bg-gray-100 p-10 text-center rounded-lg hover:shadow-lg cursor-pointer">
      Rugs
    </div>

  </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Products
        </h2>
        <HomeProductComponent/>
      </section>

      </main>
    </>
  );
}
