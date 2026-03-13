export default function Footer() {
    return (
      <footer className="bg-black text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
  
          {/* Logo / About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">InteriorStore</h2>
            <p className="text-gray-400">
              Premium interior products for modern homes.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Products</li>
              <li>Cart</li>
              <li>Login</li>
            </ul>
          </div>
  
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Furniture</li>
              <li>Lighting</li>
              <li>Wall Decor</li>
              <li>Rugs</li>
            </ul>
          </div>
  
          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">support@interiorstore.com</p>
            <p className="text-gray-400">+91 98765 43210</p>
          </div>
  
        </div>
  
        {/* Bottom */}
        <div className="border-t border-gray-800 text-center py-4 text-gray-500">
          © 2026 InteriorStore. All rights reserved.
        </div>
      </footer>
    );
  }