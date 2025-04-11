"use client";

export default function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/10 text-sm text-center py-2">
      <div className="max-w-4xl mx-auto px-4 py-2 text-center">
        © {new Date().getFullYear()} Quizord. Built for fun and learning. All
        rights reserved.
      </div>
    </footer>
  );
}
