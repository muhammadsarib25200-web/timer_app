"use client";

import { Clock, Timer as TimerIcon } from "lucide-react";

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-container">
      <button
        onClick={() => setActiveTab("timer")}
        className={`tab-button ${activeTab === "timer" ? "active" : ""}`}
      >
        <Clock size={18} />
        Timer
      </button>

      <button
        onClick={() => setActiveTab("stopwatch")}
        className={`tab-button ${activeTab === "stopwatch" ? "active" : ""}`}
      >
        <TimerIcon size={18} />
        Stopwatch
      </button>
    </div>
  );
}