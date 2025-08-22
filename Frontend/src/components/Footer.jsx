import { FaInstagram, FaFacebookF, FaTwitter, FaLeaf } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#215732] text-white mt-10 font-sans">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-5 sm:grid-cols-2 gap-10 border-b border-green-900">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <img
            src="/logo.png"
            alt="Willow & Vine Logo"
            className="mb-4 w-36 h-auto"
          />
          <p className="text-green-100 text-sm">
            Growing greener together. Your trusted source for plants and garden inspiration.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-bold text-xl mb-4 tracking-wide text-[#b6e2b3]">Shop</h3>
          <ul className="space-y-3 text-base text-green-100">
            <li><a href="/plants" className="hover:text-[#b6e2b3] transition">Plants</a></li>
            <li><a href="/seeds" className="hover:text-[#b6e2b3] transition">Seeds & Bulbs</a></li>
            <li><a href="/pots" className="hover:text-[#b6e2b3] transition">Pots & Planters</a></li>
            <li><a href="/tools" className="hover:text-[#b6e2b3] transition">Gardening Tools</a></li>
            <li><a href="/accessories" className="hover:text-[#b6e2b3] transition">Accessories</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-bold text-xl mb-4 tracking-wide text-[#b6e2b3]">Help</h3>
          <ul className="space-y-3 text-base text-green-100">
            <li><a href="/help" className="hover:text-[#b6e2b3] transition">Help Center</a></li>
            <li><a href="/order-tracking" className="hover:text-[#b6e2b3] transition">Order Tracking</a></li>
            <li><a href="/shipping" className="hover:text-[#b6e2b3] transition">Shipping Info</a></li>
            <li><a href="/returns" className="hover:text-[#b6e2b3] transition">Returns</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-bold text-xl mb-4 tracking-wide text-[#b6e2b3]">About Us</h3>
          <ul className="space-y-3 text-base text-green-100">
            <li><a href="/about" className="hover:text-[#b6e2b3] transition">Our Story</a></li>
            <li><a href="/sustainability" className="hover:text-[#b6e2b3] transition">Sustainability</a></li>
            <li><a href="/blog" className="hover:text-[#b6e2b3] transition">Blog</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-xl mb-4 tracking-wide text-[#b6e2b3]">Contact</h3>
          <ul className="space-y-3 text-base text-green-100">
            <li>Email: hello@willowvine.com</li>
            <li>Phone: +91 8401147048</li>
            <li>Address: Green Street, Ahmedabad</li>
          </ul>
          <div className="flex space-x-5 mt-6">
            <a href="#" aria-label="Instagram" className="hover:text-[#b6e2b3] transition text-2xl"><FaInstagram /></a>
            <a href="#" aria-label="Facebook" className="hover:text-[#b6e2b3] transition text-2xl"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-[#b6e2b3] transition text-2xl"><FaTwitter /></a>
            <a href="#" aria-label="Leaf" className="hover:text-[#b6e2b3] transition text-2xl"><FaLeaf /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#13351d] text-center py-4 text-sm text-green-200 tracking-wide">
        © 2025 <span className="font-bold text-[#b6e2b3]">Willow & Vine</span>. All rights reserved.
      </div>
    </footer>
  );
}