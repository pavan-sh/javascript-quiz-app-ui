"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import questionsData from "@/data/questions.json";
import Loader from "@/components/ui/loader";
import clsx from "clsx";

const difficultyColorMap = {
  easy: "blue-500",
  medium: "orange-500",
  hard: "red-500",
};

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
  const name = searchParams.get("name") || "User";
  const difficulty = searchParams.get("difficulty") || "easy";

  const questions = questionsData.filter((q) => q.difficulty === difficulty);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selected, setSelected] = useState(null);
  const [animatePoints, setAnimatePoints] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const audioRef = useRef(null);

  const question = questions[current];
  const colorClass = difficultyColorMap[difficulty] || "gray-500";
  const initials = name[0].toUpperCase();

  useEffect(() => {
    if (timer === 0 || selected !== null) {
      setTimeout(() => nextQuestion(), 1000);
    } else {
      const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
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
        const updated = [...prevLeaderboard, { name, score }];
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

      {/* Timer */}
      <div className="mb-4">
        <div
          className={clsx(
            "w-16 h-16 flex items-center justify-center rounded-full border-4 text-lg font-bold transition-all duration-300",
            {
              "border-green-400 text-green-200": timer > 10,
              "border-yellow-400 text-yellow-200": timer > 5 && timer <= 10,
              "border-red-500 text-red-300 animate-pulse": timer <= 5,
            }
          )}
        >
          {timer}s
        </div>
      </div>

      {/* Quiz Box */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-xl shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 text-white font-bold w-9 h-9 rounded-full flex items-center justify-center">
              {initials}
            </div>
            <div className="text-sm capitalize text-white/80">
              {difficulty} mode
            </div>
          </div>

          <div
            className={clsx(
              `text-white text-xs px-3 py-1 rounded-full font-bold transition-transform duration-300`,
              `bg-${colorClass}`,
              {
                "animate-pulse scale-110": animatePoints,
              }
            )}
          >
            Score: {score}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-4">
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-500"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-right text-xs text-white/60 mt-1">
            Q{current + 1}/{questions.length}
          </div>
        </div>

        {/* Question */}
        <h2
          className={clsx(
            `text-xl font-semibold mb-5 p-4 rounded-xl`,
            `bg-${colorClass}/20`
          )}
        >
          {question.question}
        </h2>

        {/* Answer Options */}
        <div className="flex flex-col space-y-4">
          {question.options.map((opt, i) => {
            const isCorrect = selected && opt === question.answer;
            const isSelected = selected === opt;

            return (
              <button
                key={i}
                onClick={() => setSelected(opt)}
                disabled={selected !== null}
                className={clsx(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-200 text-base font-medium",
                  {
                    "bg-green-500 text-white": isCorrect,
                    "bg-red-500 text-white": isSelected && !isCorrect,
                    "bg-white/10 text-white/80":
                      selected && !isSelected && !isCorrect,
                    "bg-white/10 hover:bg-white/20": !selected,
                  }
                )}
              >
                <span
                  className={clsx(
                    "w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center",
                    {
                      "border-white bg-white text-green-600": isCorrect,
                      "border-red-200 bg-red-400": isSelected && !isCorrect,
                      "border-white": !isSelected,
                    }
                  )}
                >
                  {isCorrect && (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
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
