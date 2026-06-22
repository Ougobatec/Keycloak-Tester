import { useState, useEffect } from 'react';
import { formatExpiration } from '../utils/helpers';

interface ExpirationTimerProps {
  exp: number;
}

export function ExpirationTimer({ exp }: ExpirationTimerProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>{formatExpiration(exp)}</>;
}
