import { copyToClipboard } from '../utils/helpers';
import type { ParsedToken } from '../types';

interface UserMenuProps {
  user: ParsedToken;
  isOpen: boolean;
  onClose: () => void;
}

export function UserMenu({ user, isOpen, onClose }: UserMenuProps) {
  if (!isOpen) return null;

  const InfoRow = ({
    label,
    value,
    icon,
    color = 'blue',
  }: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color?: 'blue' | 'purple' | 'teal' | 'emerald';
  }) => {
    const iconColorClasses = {
      blue: 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20',
      purple:
        'bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/20',
      teal: 'bg-gradient-to-br from-teal-600 to-cyan-600 shadow-lg shadow-teal-500/20',
      emerald:
        'bg-gradient-to-br from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/20',
    };

    return (
      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg group relative border border-white/10">
        <div className={`${iconColorClasses[color]} p-2 rounded-lg text-white`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-white/50">{label}</div>
          <div className="text-white/90 font-mono text-sm truncate">
            {value}
          </div>
        </div>
        <button
          onClick={() => copyToClipboard(value)}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 hover:text-white transition-opacity duration-150 p-1.5 rounded"
          title="Copier"
        >
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
        </button>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-slate-800/30 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-lg shadow-lg shadow-blue-500/20">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Profil Utilisateur
              </h2>
              <p className="text-sm text-white/50">Informations du compte</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/80 transition"
            title="Fermer"
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
            label="Nom complet"
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
            label="Nom d'utilisateur"
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
            label="ID Utilisateur"
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
          {user.realm_access?.roles && user.realm_access.roles.length > 0 && (
            <div className="pt-2">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                  <span className="text-sm text-white/90 font-medium">
                    Rôles attribués
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.realm_access.roles.map((role) => (
                    <span
                      key={role}
                      className="bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border border-indigo-500/30 rounded-full px-3 py-1 text-xs text-indigo-200 font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
