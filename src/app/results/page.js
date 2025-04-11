"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

export default function ResultsWrapper() {
  return (
    <Suspense fallback={<Loader text="Fetching results..." />}>
      <Results />
    </Suspense>
  );
}

function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score"), 10);
  const [name, setName] = useState("");

  useEffect(() => {
    const lastScore = JSON.parse(sessionStorage.getItem("lastScore") || "{}");
    if (!lastScore?.name || !score) {
      router.push("/");
      return;
    }
    setName(lastScore.name);
  }, [score]);

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#2b5876] p-6 flex flex-col items-center justify-center text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🎉 Well done, {name}!</h2>
        <p className="text-xl mb-2">Your final score is:</p>
        <div className="text-4xl font-extrabold text-green-300 mb-6">
          {score} pts
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => router.push("/leaderboard")}
            className="bg-white/20 hover:bg-white/30 text-white w-full"
          >
            View Leaderboard
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="bg-white/20 hover:bg-white/30 text-white w-full"
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
}
