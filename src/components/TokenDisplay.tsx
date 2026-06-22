import { useState, useRef, useEffect } from 'react';
import { copyToClipboard, decodeJWT } from '../utils/helpers';
import { GlassPanel } from './GlassPanel';
import { IconBox } from './IconBox';
import { Button } from './Button';
import { TextInput } from './TextInput';
import type { ColorName } from '../styles/colors';

interface TokenDisplayProps {
  title: string;
  token: string;
  expiration?: string | React.ReactNode;
  icon?: React.ReactNode;
  color?: ColorName;
}

export function TokenDisplay({
  title,
  token,
  expiration,
  icon,
  color = 'blue',
}: TokenDisplayProps) {
  const [showDecoded, setShowDecoded] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);
  const decoded = decodeJWT(token);

  return (
    <GlassPanel>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <IconBox color={color}>{icon}</IconBox>}
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {expiration && (
              <p className="text-xs text-white/60 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {expiration}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {decoded && (
            <Button size="sm" onClick={() => setShowDecoded(!showDecoded)}>
              {showDecoded ? 'Raw Token' : 'Decoded'}
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => {
              copyToClipboard(
                showDecoded && decoded
                  ? JSON.stringify(decoded, null, 2)
                  : token
              );
              setCopied(true);
              if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
              timeoutRef.current = window.setTimeout(
                () => setCopied(false),
                2000
              );
            }}
            className="p-2!"
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

      {/* Token Content */}
      <TextInput
        multiline
        readOnly
        value={
          showDecoded && decoded ? JSON.stringify(decoded, null, 2) : token
        }
        aria-label={`Token ${title}`}
        rows={10}
        className="h-52 text-xs font-mono"
      />
    </GlassPanel>
  );
}
