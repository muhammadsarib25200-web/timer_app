"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([formatTime(time), ...laps]);
    }
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return {
      main: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      ms: String(milliseconds).padStart(2, "0"),
    };
  };

  const formattedTime = formatTime(time);

  return (
    <div className="component-wrapper">
      {/* Stopwatch Time Display */}
      <div className="time-display">
        {formattedTime.main}
        <span className="ms">.{formattedTime.ms}</span>
      </div>

      {/* Buttons */}
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

        <button onClick={handleLap} disabled={!isRunning} className="btn btn-lap">
          <Flag size={18} /> Lap
        </button>

        <button onClick={handleReset} className="btn btn-reset">
          <RotateCcw size={18} /> Reset
        </button>
      </div>

      {/* Laps Record */}
      {laps.length > 0 && (
        <div className="laps-container">
          {laps.map((lap, index) => (
            <div key={index} className="lap-item">
              <span className="lap-no">Lap {laps.length - index}</span>
              <span className="lap-time">
                {lap.main}.{lap.ms}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}