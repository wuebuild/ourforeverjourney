"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Menu, X } from "lucide-react";
import WILabel from "./ui/WILabel";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Templates", href: "/#templates" },
  { label: "Portofolio", href: "/portofolio" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean | null>(null); // null until mounted
  const { t } = useTranslation("common");

  useEffect(() => {
    // runs only in the browser
    const token = window.localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600">
          <WILabel font="heading" className="text-xl md:text-xl font-heading">OurForeverJourney</WILabel>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              <WILabel>{item.label}</WILabel>
            </Link>
          ))}
          {
            !isLogin &&
            <div className="flex gap-3 ml-6">
              <Link
                href="/register"
                className="px-4 py-2 text-sm rounded-lg hover:bg-pink-50 transition"
              >
                <WILabel>{"Register"}</WILabel>
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 text-sm rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                <WILabel color="white">{"Login"}</WILabel>
              </Link>
            </div>
          }
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-pink-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {
              !isLogin && <hr className="border-gray-200 my-2" />
            }

            {/* Mobile Auth Buttons */}
            {
              !isLogin &&
              <Link
                href="/register"
                className="px-4 py-2 text-center rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-50 transition"
                onClick={() => setIsOpen(false)}
              >
                  Register
              </Link>
            }
            {
              !isLogin &&
              <Link
                href="/login"
                className="px-4 py-2 text-center rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            }
          </div>
        </div>
      )}
    </nav>
  );
}