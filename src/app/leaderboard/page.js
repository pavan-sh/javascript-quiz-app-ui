"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Crown } from "lucide-react";

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const scores = JSON.parse(sessionStorage.getItem("leaderboard") || "[]");
    const sorted = scores.sort((a, b) => b.score - a.score);
    setEntries(sorted);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#2b5876] p-6 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Crown className="text-yellow-300 w-6 h-6" /> Leaderboard
        </h1>

        {entries.length === 0 ? (
          <p className="text-center text-sm text-gray-300">
            No entries yet. Play a quiz to get started!
          </p>
        ) : (
          <ul className="space-y-4">
            {entries.map((entry, index) => {
              const isTopScorer = index === 0;
              return (
                <li
                  key={index}
                  className={`p-4 rounded-xl flex items-center justify-between transition-all duration-300 ${
                    isTopScorer
                      ? "bg-yellow-100 border border-yellow-300 shadow-md shadow-yellow-200 text-yellow-800"
                      : "bg-white/20 border border-white/10 text-white"
                  }`}
                >
                  <span className="font-semibold flex items-center gap-2">
                    {index + 1}. {entry.name}
                    {isTopScorer && (
                      <Crown className="w-5 h-5 text-yellow-600 animate-pulse" />
                    )}
                  </span>
                  <span
                    className={`font-bold ${
                      isTopScorer ? "text-yellow-800" : "text-green-200"
                    }`}
                  >
                    {entry.score} pts
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-6 text-center">
          <Button
            onClick={() => router.push("/")}
            className="w-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
