"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";

export default function Home() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const startQuiz = () => {
    if (!name.trim()) {
      toast.warning("Please enter your name");
      return;
    }

    sessionStorage.setItem("lastName", name);
    router.push(
      `/quiz?name=${encodeURIComponent(name)}&difficulty=${encodeURIComponent(
        difficulty
      )}`
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-8rem)] px-6 py-10 max-w-7xl mx-auto gap-10 transition-all duration-700">
      {/* Left Side: Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <Image
          src="/test.svg"
          alt="Choose your difficulty"
          width={300}
          height={300}
          className="w-full max-w-sm md:max-w-md mx-auto"
        />
      </div>

      {/* Right Side: Content OR Form */}
      <div className="md:w-1/2 flex flex-col items-start text-left space-y-6 text-white transition-all duration-700 relative">
        {/* Text Content Block */}
        <div
          className={`transition-all duration-700 ease-in-out space-y-4 ${
            showForm
              ? "opacity-0 -translate-y-4 h-0 overflow-hidden absolute"
              : "opacity-100 translate-y-0"
          }`}
        >
          <h1 className="text-3xl font-bold drop-shadow-lg">
            Master JavaScript with{" "}
            <span className="text-yellow-400">Quizord</span>
          </h1>
          <p className="text-white/80 text-lg">
            Challenge your brain with fast-paced JS questions!
          </p>
          <ul className="pl-0 mt-2 text-white/70 text-sm space-y-1 list-none">
            <li>⏱️ Beat the clock</li>
            <li>🔥 Climb the leaderboard</li>
            <li>🎯 Beginner to Advanced levels</li>
          </ul>
          <Button
            onClick={() => setShowForm(true)}
            className="mt-6 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold text-base px-6 py-3 transition-transform hover:scale-105 cursor-pointer"
          >
            Try Now
          </Button>
        </div>

        {/* Form Block */}
        <div
          className={`w-full max-w-md space-y-4 bg-white/10 p-6 rounded-xl backdrop-blur-sm shadow-md transition-all duration-700 ${
            showForm
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-6 pointer-events-none absolute"
          }`}
        >
          <h2 className="text-2xl font-semibold text-white">
            JavaScript Quiz Challenge
          </h2>
          <Input
            className="placeholder:text-white text-white placeholder:text-base text-base"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-full text-base text-white">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent className="text-base bg-white text-black">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={startQuiz}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold transition-transform hover:scale-105"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
