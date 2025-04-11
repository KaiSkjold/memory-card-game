import GameBoard from "@/components/GameBoard";
import GameRulesBanner from "@/components/GameRulesBanner";
import ScoringBanner from "@/components/ScoringBanner";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] items-center justify-center">
        <GameRulesBanner />
        <ScoringBanner />
      </div>
      <main>
        <GameBoard />
      </main>
    </div>
  );
}
