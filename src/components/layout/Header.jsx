"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { orbitron } from "@/app/fonts";
import Lottie from "lottie-react";
import mascotAnimation from "../../../public/mascot.json";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/10 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo with Lottie Mascot */}
        <Link
          href="/"
          className={`flex items-center space-x-3 text-4xl font-bold tracking-widest ${orbitron.className}`}
        >
          <span className="mr-0.5">Quizord</span>
          <div className="w-10 h-10">
            <Lottie
              animationData={mascotAnimation}
              loop={true}
              autoplay={true}
            />
          </div>
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
