// components\layout\Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Award,
  FolderOpen,
  Mail,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/experiences", label: "Experiences", icon: Briefcase },
  { href: "/#contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Check if link is active
  const isLinkActive = (href: string) => {
    // Skip contact link - no active state
    if (href === "/#contact") {
      return false;
    }

    // Handle other routes
    return pathname === href;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-neutral-950/90 backdrop-blur-xl shadow-lg border-b border-neutral-200 dark:border-neutral-700"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className={`flex items-center transition-all duration-300 ${
                isOpen ? "blur-sm md:blur-none" : ""
              }`}
            >
              <span className="font-heading hidden md:block text-2xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r">
                Gabriel Nathanael
              </span>
              <div className="md:hidden w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-blue-500/10">
                <Image
                  src="/apple-icon.png"
                  alt="Gabriel Nathanael"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="relative group"
                  >
                    <span
                      className={`font-heading font-medium transition-all duration-200 ${
                        active
                          ? "bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent"
                          : "text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      }`}
                    >
                      {link.label}
                    </span>
                    {/* Underline */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 transition-all duration-200 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              <div
                className={`transition-all duration-300 ${
                  isOpen ? "blur-sm" : ""
                }`}
              >
                <ThemeToggle />
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors relative z-50"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-neutral-800 dark:text-neutral-200" />
                ) : (
                  <Menu className="w-6 h-6 text-neutral-800 dark:text-neutral-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Vertical Menu */}
      {isOpen && (
        <>
          {/* Backdrop - Subtle gradient overlay */}
          <div
            className="md:hidden fixed inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/50 backdrop-blur-md z-40 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Vertical Icon Menu - Aligned with navbar button */}
          <div className="md:hidden fixed top-20 right-0 z-50 px-4 sm:px-6">
            <div className="flex flex-col gap-3 items-end">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="relative animate-slide-down group"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Container with Icon and Label */}
                    <div className="flex items-center gap-3">
                      {/* Label - Glass morphism style */}
                      <span
                        className={`font-heading px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shadow-xl border backdrop-blur-sm transition-all duration-300 ${
                          active
                            ? "bg-blue-50/95 dark:bg-blue-950/95 border-blue-200/50 dark:border-blue-800/50 bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent"
                            : "bg-white/95 dark:bg-neutral-900/95 border-neutral-200/50 dark:border-neutral-700/50 text-neutral-800 dark:text-neutral-100 group-hover:bg-blue-50/95 dark:group-hover:bg-blue-950/95 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200/50 dark:group-hover:border-blue-800/50"
                        }`}
                      >
                        {link.label}
                      </span>

                      {/* Icon Container - Gradient matching your theme */}
                      <div
                        className={`flex items-center justify-center rounded-xl shadow-lg transition-all duration-300 ease-out w-12 h-12 group-hover:scale-110 group-hover:rotate-3 ${
                          active
                            ? "bg-linear-to-br from-blue-500 via-blue-600 to-cyan-500 dark:from-blue-600 dark:via-blue-700 dark:to-cyan-600 shadow-blue-500/50 dark:shadow-blue-900/50"
                            : "bg-linear-to-br from-blue-500 via-blue-600 to-cyan-500 dark:from-blue-600 dark:via-blue-700 dark:to-cyan-600 shadow-blue-500/30 dark:shadow-blue-900/30 group-hover:shadow-xl group-hover:shadow-blue-500/50 dark:group-hover:shadow-blue-900/50"
                        }`}
                      >
                        <Icon className="text-white w-6 h-6 drop-shadow-sm" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
