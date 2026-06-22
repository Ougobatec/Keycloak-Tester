import { useState } from 'react';
import { ConfigForm } from './components/ConfigForm';
import { NavBar } from './components/NavBar';
import { UserMenu } from './components/UserMenu';
import { TokenDisplay } from './components/TokenDisplay';
import { useKeycloak } from './hooks/useKeycloak';
import { useTimer } from './hooks/useTimer';
import { formatExpiration } from './utils/helpers';

function App() {
  const {
    config,
    setConfig,
    tokens,
    isLoading,
    error,
    connect,
    disconnect,
    refresh,
    clearConfig,
  } = useKeycloak();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  // Timer to update expirations
  useTimer(!!tokens);

  const isConnected = !!tokens;

  const handleRefresh = async () => {
    const result = await refresh();
    if (result.success) {
      if (result.refreshed) {
        setRefreshMessage('Tokens refreshed successfully!');
      } else {
        setRefreshMessage('Tokens are still valid, no need to refresh.');
      }
      setTimeout(() => setRefreshMessage(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Navigation Bar */}
      <NavBar
        isConnected={isConnected}
        userName={tokens?.tokenParsed.name}
        onConnect={connect}
        onDisconnect={disconnect}
        onRefresh={handleRefresh}
        onShowUserMenu={() => setShowUserMenu(true)}
      />

      {/* User Menu Modal */}
      {isConnected && tokens && (
        <UserMenu
          user={tokens.tokenParsed}
          isOpen={showUserMenu}
          onClose={() => setShowUserMenu(false)}
        />
      )}

      {/* Refresh success popup */}
      {refreshMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-slate-800/30 backdrop-blur-md border border-green-500/40 rounded-lg p-4 shadow-2xl max-w-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-white font-medium">{refreshMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Error messages */}
        {error && (
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/40 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-500/20 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-red-200 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Welcome message when not connected */}
        {!isConnected && !error && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Ready to test Keycloak?
              </h2>
              <p className="text-white/60">
                Configure your Keycloak settings above to start exploring your
                authentication tokens and user information.
              </p>
            </div>
          </div>
        )}

        {/* Configuration Form (only when not connected) */}
        {!isConnected && (
          <div className="max-w-2xl mx-auto">
            <ConfigForm
              config={config}
              onChange={setConfig}
              onConnect={connect}
              onClear={clearConfig}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Tokens Display */}
        {isConnected && tokens && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Authentication Tokens
              </h2>
              <p className="text-white/60">View and copy your JWT tokens</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Access Token */}
              <TokenDisplay
                title="Access Token"
                token={tokens.accessToken}
                expiration={
                  tokens.tokenParsed.exp
                    ? formatExpiration(tokens.tokenParsed.exp)
                    : undefined
                }
                color="blue"
                icon={
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />

              {/* ID Token */}
              {tokens.idToken && (
                <TokenDisplay
                  title="ID Token"
                  token={tokens.idToken}
                  expiration={
                    tokens.idTokenParsed?.exp
                      ? formatExpiration(tokens.idTokenParsed.exp)
                      : undefined
                  }
                  color="purple"
                  icon={
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              )}

              {/* Refresh Token */}
              {tokens.refreshToken && (
                <TokenDisplay
                  title="Refresh Token"
                  token={tokens.refreshToken}
                  expiration={
                    tokens.refreshTokenParsed?.exp
                      ? formatExpiration(tokens.refreshTokenParsed.exp)
                      : undefined
                  }
                  color="teal"
                  icon={
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
