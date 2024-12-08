import { useEffect, useState } from "react";

interface CountdownProps {
  initialTime: number; // in seconds
  onEnd?: () => void; // Callback for when the timer ends
  isRunning: boolean; // Controls whether the timer is active
  onReset?: () => void; // Callback for when the timer is reset
}

const Countdown = ({
  initialTime,
  isRunning,
  onEnd,
  onReset,
}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onEnd?.();
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft, onEnd]);

  useEffect(() => {
    setTimeLeft(initialTime);
    onReset?.();
  }, [initialTime, onReset]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return <p>{formatTime(timeLeft)}</p>;
};

export default Countdown;
