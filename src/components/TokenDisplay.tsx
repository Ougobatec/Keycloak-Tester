import { useState } from 'react';
import { copyToClipboard, decodeJWT } from '../utils/helpers';

interface TokenDisplayProps {
  title: string;
  token: string;
  expiration?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'purple' | 'teal';
}

export function TokenDisplay({
  title,
  token,
  expiration,
  icon,
  color = 'blue',
}: TokenDisplayProps) {
  const [showDecoded, setShowDecoded] = useState(false);
  const decoded = decodeJWT(token);

  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20',
    purple:
      'bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/20',
    teal: 'bg-gradient-to-br from-teal-600 to-cyan-600 shadow-lg shadow-teal-500/20',
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={`${colorClasses[color]} p-2 rounded-lg`}>
              {icon}
            </div>
          )}
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
            <button
              onClick={() => setShowDecoded(!showDecoded)}
              className="px-3 py-2 rounded-lg font-medium text-sm transition bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 hover:text-white"
            >
              {showDecoded ? 'Raw Token' : 'Decoded'}
            </button>
          )}
          <button
            onClick={() =>
              copyToClipboard(
                showDecoded && decoded
                  ? JSON.stringify(decoded, null, 2)
                  : token
              )
            }
            className="bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 hover:text-white transition p-2 rounded-lg"
            title="Copy"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>
      </div>

      {/* Token Content */}
      <div className="bg-slate-900/80 rounded-lg p-4 border border-white/10 h-[208px]">
        {showDecoded && decoded ? (
          <pre className="text-xs text-white/90 font-mono overflow-auto h-full scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {JSON.stringify(decoded, null, 2)}
          </pre>
        ) : (
          <textarea
            readOnly
            value={token}
            aria-label={`Token ${title}`}
            className="w-full h-full bg-transparent text-white/80 text-xs font-mono resize-none focus:outline-none scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          />
        )}
      </div>
    </div>
  );
}
