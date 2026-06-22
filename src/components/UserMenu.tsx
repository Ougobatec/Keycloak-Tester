import { useEffect } from 'react';
import type { ParsedToken } from '../types';
import { GlassPanel } from './GlassPanel';
import { IconBox } from './IconBox';
import { Backdrop } from './Backdrop';
import { InfoRow } from './InfoRow';

interface UserMenuProps {
  user: ParsedToken;
  accessToken: ParsedToken;
  isOpen: boolean;
  onClose: () => void;
}

export function UserMenu({
  user,
  accessToken,
  isOpen,
  onClose,
}: UserMenuProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <GlassPanel className="max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <IconBox color="purple" size="lg">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </IconBox>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  User Profile
                </h2>
                <p className="text-sm text-white/50">Account information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white/80 transition cursor-pointer"
              title="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <InfoRow
              label="Full name"
              value={user.name || 'N/A'}
              color="blue"
              icon={
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />

            <InfoRow
              label="Email"
              value={user.email || 'N/A'}
              color="purple"
              icon={
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
            />

            <InfoRow
              label="Username"
              value={user.preferred_username || 'N/A'}
              color="teal"
              icon={
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
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />

            <InfoRow
              label="User ID"
              value={user.sub || 'N/A'}
              color="emerald"
              icon={
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
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
              }
            />

            {/* Rôles */}
            {accessToken.realm_access?.roles &&
              accessToken.realm_access.roles.length > 0 && (
                <GlassPanel padding="sm" className="mt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <IconBox color="purple" size="sm">
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </IconBox>
                    <span className="text-sm text-white/90 font-medium">
                      Assigned roles
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {accessToken.realm_access.roles.map((role) => (
                      <span
                        key={role}
                        className="bg-linear-to-r from-indigo-600/20 to-violet-600/20 border border-indigo-500/30 rounded-full px-3 py-1 text-xs text-indigo-200 font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              )}
          </div>
        </GlassPanel>
      </div>
    </Backdrop>
  );
}
