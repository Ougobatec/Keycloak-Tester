import type { KeycloakConfig } from '../types';

interface ConfigFormProps {
  config: KeycloakConfig;
  onChange: (config: KeycloakConfig) => void;
  onConnect: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export function ConfigForm({
  config,
  onChange,
  onConnect,
  onClear,
  isLoading,
}: ConfigFormProps) {
  const isValid = config.url && config.realm && config.clientId;

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-3 rounded-lg shadow-lg shadow-teal-500/20">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">
            Keycloak Configuration
          </h2>
          <p className="text-sm text-white/60">Connection settings</p>
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1">Keycloak URL</label>
        <input
          type="url"
          value={config.url}
          onChange={(e) => onChange({ ...config, url: e.target.value })}
          placeholder="https://keycloak.example.com"
          className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
        />
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1">Realm</label>
        <input
          type="text"
          value={config.realm}
          onChange={(e) => onChange({ ...config, realm: e.target.value })}
          placeholder="my-realm"
          className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
        />
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1">Client ID</label>
        <input
          type="text"
          value={config.clientId}
          onChange={(e) => onChange({ ...config, clientId: e.target.value })}
          placeholder="my-client"
          className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="sso"
          checked={config.disableSilentSSO}
          onChange={(e) =>
            onChange({ ...config, disableSilentSSO: e.target.checked })
          }
          className="rounded bg-white/5 border-white/20"
        />
        <label htmlFor="sso" className="text-sm text-white/70 cursor-pointer">
          Disable silent SSO
        </label>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onConnect}
          disabled={!isValid || isLoading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Connecting...
            </>
          ) : (
            <>
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Connect
            </>
          )}
        </button>
        <button
          onClick={onClear}
          className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-lg px-4 py-2 text-white font-medium transition flex items-center gap-2 shadow-lg shadow-red-500/30"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Clear
        </button>
      </div>
    </div>
  );
}
