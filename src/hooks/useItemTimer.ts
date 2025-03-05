import { useState, useEffect, useRef } from "react";

export const useItemTimer = () => {
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const timeoutsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const newTimers = { ...prev };
        Object.keys(newTimers).forEach((key) => {
          if (newTimers[key] > 0) newTimers[key] -= 1;
        });
        return newTimers;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startTimer = (item: string) => {
    setTimers((prev) => ({ ...prev, [item]: 5 }));
    return setTimeout(() => {
      delete timeoutsRef.current[item];
    }, 5000);
  };

  const clearTimer = (item: string) => {
    if (timeoutsRef.current[item]) {
      clearTimeout(timeoutsRef.current[item]);
      delete timeoutsRef.current[item];
    }
  };

  return { timers, startTimer, clearTimer, timeoutsRef };
};
