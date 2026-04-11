import { useEffect, useState } from "react";

const TIMER = 3000;

export default function ProgressBar({ onRemovePlace }) {
  const [modalTimer, setModalTimer] = useState(TIMER);

  let secondsLeft = Math.ceil(modalTimer / 1000);

  useEffect(() => {
      const intervalId = setInterval(() => {
        setModalTimer((prevTimer) => prevTimer - 30);
      }, 30);
      const timerId = setTimeout(() => {
        onRemovePlace();
      }, TIMER);

      return () => {
        setModalTimer(TIMER);
        clearTimeout(timerId);
        clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="text-left">
      <label htmlFor="progress" className="block text-sm">
        Place will be deleted in {secondsLeft} seconds...
      </label>
      <progress
        id="progress"
        className="h-1.5 w-[13em] appearance-none
            [&::-webkit-progress-bar]:bg-slate-300
            [&::-webkit-progress-bar]:rounded-md
            [&::-webkit-progress-value]:bg-orange-300
            [&::-webkit-progress-value]:rounded-md
          "
        max={100}
        value={(modalTimer / TIMER) * 100}
      ></progress>
    </div>
  );
}
