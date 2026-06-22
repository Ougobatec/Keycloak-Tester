import { useState, useEffect } from 'react';

export function useTimer(enabled: boolean) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled]);
}
