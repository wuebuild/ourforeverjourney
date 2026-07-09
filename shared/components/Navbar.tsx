"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buttonVariants, cn } from "@heroui/react";

const navItems = [
  { label: "Templates", href: "/#templates" },
  { label: "App", href: "/#app" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Portofolio", href: "/portofolio" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean | null>(null); // null until mounted
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || isOpen
          ? "border-b border-border/60 bg-ivory/85 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6"
        aria-label="Main"
      >
        <Link href="/" className="flex items-baseline gap-1" onClick={() => setIsOpen(false)}>
          <span className="font-script text-2xl text-rose-900">Our Forever</span>
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Journey
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          {isLogin ? (
            <Link
              href="/myinvitation"
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              My Invitations
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="text-foreground md:hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border/60 bg-ivory/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-foreground/80 transition-colors hover:bg-blush/50 hover:text-accent"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-4">
                {isLogin ? (
                  <Link
                    href="/myinvitation"
                    className={buttonVariants({ variant: "primary", fullWidth: true })}
                    onClick={() => setIsOpen(false)}
                  >
                    My Invitations
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: "outline", fullWidth: true })}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={buttonVariants({ variant: "primary", fullWidth: true })}
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
