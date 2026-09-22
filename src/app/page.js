"use client";

import { useState } from "react";
import TabNavigation from "../../components/tabNavigation";
import Timer from "../../components/timer";
import Stopwatch from "../../components/stopWatch";

export default function Home() {
  const [activeTab, setActiveTab] = useState("timer");

  return (
    <main className="app-card">
      <h1 className="app-title">Timer & Stopwatch</h1>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "timer" ? <Timer /> : <Stopwatch />}
    </main>
  );
}