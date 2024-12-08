import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import Countdown from "../Countdown";
import Music from "../Music";

const PomodoroTimer = () => {
  const { timer, shortBreak, longBreak } = useSelector(
    (state: RootState) => state.pomodoro.settings
  );

  const [currentState, setCurrentState] = useState<
    "Work Time" | "Short Break" | "Long Break"
  >("Work Time");
  const [totalCycles, setTotalCycles] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeKey, setTimeKey] = useState(0);

  const getTimeForState = () => {
    switch (currentState) {
      case "Work Time":
        return timer * 60;
      case "Short Break":
        return shortBreak * 60;
      case "Long Break":
        return longBreak * 60;
      default:
        return timer * 60;
    }
  };

  const handleTimerEnd = () => {
    if (currentState === "Work Time") {
      if (totalCycles === 3) {
        setCurrentState("Long Break");
        setTotalCycles(0);
      } else {
        setCurrentState("Short Break");
        setTotalCycles((prev) => prev + 1);
      }
    } else if (currentState === "Short Break") {
      setCurrentState("Work Time");
    } else if (currentState === "Long Break") {
      setIsRunning(false);
      setCurrentState("Work Time");
      setTimeKey((prev) => prev + 1);
      return;
    }
    setTimeKey((prev) => prev + 1);
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeKey((prev) => prev + 1);
    setCurrentState("Work Time");
    setTotalCycles(0);
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <h2>{currentState}</h2>
      <Countdown
        key={timeKey}
        initialTime={getTimeForState()}
        isRunning={isRunning}
        onEnd={handleTimerEnd}
      />
      <Music
        currentState={currentState}
        isRunning={isRunning}
        onReset={timeKey > 0}
      />
      <div>
        <button onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
