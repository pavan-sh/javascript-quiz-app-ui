"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // for icons
import { orbitron } from "@/app/fonts";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/10 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link
          href="/"
          className={`text-4xl font-bold tracking-widest ${orbitron.className}`}
        >
          Quizord
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/leaderboard" className="hover:underline">
            Leaderboard
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          aria-label="mobile navigation menu"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
          <Link
            href="/"
            className="block hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/leaderboard"
            className="block hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Leaderboard
          </Link>
        </div>
      )}
    </header>
  );
}
