import { useEffect, useState, useRef } from 'react';
import { copyToClipboard } from '../utils/helpers';
import { IconBox } from './IconBox';
import { Button } from './Button';
import {
  type ColorName,
  borderColors,
  backgroundColors,
} from '../styles/colors';

interface InfoRowProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: ColorName;
}

export function InfoRow({ label, value, icon, color = 'blue' }: InfoRowProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`group relative ${backgroundColors.transparent} p-4 rounded-md border ${borderColors.default}`}
    >
      <div className="flex items-center gap-3">
        <IconBox color={color} size="sm">
          {icon}
        </IconBox>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-white/50">{label}</div>
          <div className="text-white/90 font-mono text-sm truncate">
            {value}
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => {
            copyToClipboard(value);
            setCopied(true);
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(
              () => setCopied(false),
              2000
            );
          }}
          className={`shrink-0 p-1.5! ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        >
          {copied ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}
