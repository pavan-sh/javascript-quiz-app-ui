"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import questionsData from "@/data/questions.json";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

export default function QuizWrapper() {
  return (
    <Suspense fallback={<Loader text="Loading quiz..." />}>
      <Quiz />
    </Suspense>
  );
}

function Quiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const difficulty = searchParams.get("difficulty");

  const questions = questionsData.filter((q) => q.difficulty === difficulty);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selected, setSelected] = useState(null);
  const [animatePoints, setAnimatePoints] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const audioRef = useRef(null);

  const question = questions[current];

  useEffect(() => {
    if (!name || !difficulty) return;

    if (timer === 0 || selected !== null) {
      setTimeout(() => nextQuestion(), 1000);
    } else {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer, selected]);

  const nextQuestion = () => {
    if (selected === question.answer) {
      const pointsEarned = 10 + timer;
      setScore((prev) => prev + pointsEarned);
      setAnimatePoints(true);
      audioRef.current?.play();
      setTimeout(() => setAnimatePoints(false), 800);
    }

    setSelected(null);
    setTimer(15);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      if (!isEnded) {
        const prevLeaderboard = JSON.parse(
          sessionStorage.getItem("leaderboard") || "[]"
        );
        const updated = [...prevLeaderboard, { name, score: score }];
        sessionStorage.setItem("leaderboard", JSON.stringify(updated));
        sessionStorage.setItem("lastScore", JSON.stringify({ name, score }));
        setIsEnded(true);
        router.push(`/results?score=${score}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#2b5876] p-4 flex flex-col justify-center items-center text-white">
      <audio ref={audioRef} src="/correct.mp3" preload="auto" />
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-xl shadow-lg relative">
        {/* Progress + Score Section */}
        <div className="w-full mb-4">
          <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
            <div className="text-white/90 font-medium">
              Q{current + 1}/{questions.length}
            </div>
            <div
              className={`bg-orange-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-bold transition-transform duration-300 ${
                animatePoints ? "animate-pulse scale-110" : ""
              }`}
            >
              {score}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400 transition-all duration-500"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Centered Timer */}
        <div className="text-center text-white text-sm mb-4">
          <span
            className={`inline-block font-bold px-3 py-1 rounded-full ${
              timer <= 5 ? "bg-red-500 animate-pulse" : "bg-white/20"
            }`}
          >
            {timer}s
          </span>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold mb-6 text-center">
          {question.question}
        </h2>

        {/* Answer Options */}
        <div className="flex flex-col space-y-3">
          {question.options.map((opt, i) => (
            <Button
              key={i}
              onClick={() => setSelected(opt)}
              disabled={selected !== null}
              className={`w-full rounded-xl py-2 px-4 text-base transition-all ${
                selected
                  ? opt === question.answer
                    ? "bg-green-500 text-white"
                    : selected === opt
                    ? "bg-red-500 text-white"
                    : "bg-white/20"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {opt}
            </Button>
          ))}
        </div>

        {/* Points Animation */}
        {animatePoints && (
          <div className="absolute top-3 right-4 text-green-300 text-lg font-bold animate-bounce">
            +{10 + timer}
          </div>
        )}
      </div>
    </div>
  );
}
