"use client";

import Lottie from "lottie-react";
import mascot from "../../../public/mascot.json"; // update with your path

export default function LottieLogo() {
  return (
    <Lottie
      autoplay
      loop
      animationData={mascot}
      style={{ height: "60px", width: "60px" }}
    />
  );
}
