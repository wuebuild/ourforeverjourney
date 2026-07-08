import Link from "next/link";
// import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-gray-900">Our Forever Journey</h3>
          <p className="mt-3 text-gray-600 max-w-sm">
            Design stunning digital wedding invitations and share them effortlessly with your loved ones.
          </p>
          {/* Socials */}
          {/* <div className="flex gap-4 mt-6">
            <Link href="https://facebook.com" className="text-gray-500 hover:text-pink-600 transition">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="https://instagram.com" className="text-gray-500 hover:text-pink-600 transition">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com" className="text-gray-500 hover:text-pink-600 transition">
              <Twitter className="w-5 h-5" />
            </Link>
          </div> */}
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gray-900 font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><Link href="#features" className="hover:text-pink-600 transition">Features</Link></li>
            <li><Link href="#templates" className="hover:text-pink-600 transition">Templates</Link></li>
            <li><Link href="#pricing" className="hover:text-pink-600 transition">Pricing</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-gray-900 font-semibold">Company</h4>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><Link href="/about" className="hover:text-pink-600 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-pink-600 transition">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-pink-600 transition">Terms & Privacy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Our Forever Journey. All rights reserved.
      </div>
    </footer>
  );
}