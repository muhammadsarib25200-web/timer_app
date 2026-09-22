"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && totalSeconds === 0) {
      setIsRunning(false);
      setIsPaused(false);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  const handleStart = () => {
    if (!isPaused) {
      const calculatedSeconds = hours * 3600 + minutes * 60 + seconds;
      if (calculatedSeconds <= 0) return;
      setTotalSeconds(calculatedSeconds);
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTotalSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (totalSecs) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="component-wrapper">
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        preload="auto"
      />

      {/* Inputs Mode */}
      {!isRunning && !isPaused ? (
        <div className="timer-inputs-wrapper">
          <div className="input-box">
            <input
              type="number"
              min="0"
              max="99"
              value={hours}
              onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
            />
            <label>Hours</label>
          </div>
          <span className="colon-separator">:</span>
          <div className="input-box">
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            />
            <label>Mins</label>
          </div>
          <span className="colon-separator">:</span>
          <div className="input-box">
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            />
            <label>Secs</label>
          </div>
        </div>
      ) : (
        /* Display Countdown */
        <div className="time-display">{formatTime(totalSeconds)}</div>
      )}

      {/* Action Buttons */}
      <div className="controls-group">
        {!isRunning ? (
          <button onClick={handleStart} className="btn btn-start">
            <Play size={18} /> Start
          </button>
        ) : (
          <button onClick={handlePause} className="btn btn-pause">
            <Pause size={18} /> Pause
          </button>
        )}

        <button onClick={handleReset} className="btn btn-reset">
          <RotateCcw size={18} /> Reset
        </button>
      </div>
    </div>
  );
}