import { useState } from 'react';
import { ConfigForm } from './components/ConfigForm';
import { NavBar } from './components/NavBar';
import { UserMenu } from './components/UserMenu';
import { TokenDisplay } from './components/TokenDisplay';
import { Toast } from './components/Toast';
import { ExpirationTimer } from './components/ExpirationTimer';
import { Loader } from './components/Loader';
import { useKeycloak } from './hooks/useKeycloak';

function App() {
  const {
    config,
    setConfig,
    tokens,
    isLoading,
    isInitializing,
    error,
    connect,
    disconnect,
    refresh,
    clearConfig,
    clearError,
  } = useKeycloak();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  const isConnected = !!tokens;

  const handleConnect = async () => {
    await connect();
  };

  const handleRefresh = async () => {
    const result = await refresh();
    if (result.success) {
      if (result.refreshed) {
        setRefreshMessage('Tokens refreshed successfully!');
      } else {
        setRefreshMessage('Tokens are still valid, no need to refresh.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Navigation Bar */}
      <NavBar
        isConnected={isConnected}
        userName={tokens?.tokenParsed.name}
        onConnect={handleConnect}
        onDisconnect={disconnect}
        onRefresh={handleRefresh}
        onShowUserMenu={() => setShowUserMenu(true)}
      />

      {/* User Menu Modal */}
      {isConnected && tokens && (
        <UserMenu
          user={tokens.idTokenParsed || tokens.tokenParsed}
          accessToken={tokens.tokenParsed}
          isOpen={showUserMenu}
          onClose={() => setShowUserMenu(false)}
        />
      )}

      {/* Toast notifications */}
      <Toast
        message={refreshMessage}
        color="emerald"
        onClose={() => setRefreshMessage(null)}
      />
      <Toast message={error} color="red" onClose={clearError} />

      {/* Initialization loader */}
      {isInitializing && <Loader message="Vérification de la connexion..." />}

      {/* Main Content - padding-top to compensate for fixed navbar */}
      <div className="max-w-7xl mx-auto px-6 py-8 pt-28 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-white">
            {isConnected ? 'Authentication Tokens' : 'Ready to test Keycloak?'}
          </h2>
          <p className="text-white/60">
            {isConnected
              ? 'View and copy your JWT tokens'
              : 'Configure your Keycloak settings to start exploring your authentication tokens and user information.'}
          </p>
        </div>

        {/* Content Section */}
        {!isConnected ? (
          // Not Connected - Configuration Form
          <div className="max-w-2xl mx-auto">
            <ConfigForm
              config={config}
              onChange={setConfig}
              onConnect={handleConnect}
              onClear={clearConfig}
              isLoading={isLoading}
            />
          </div>
        ) : (
          // Connected - Tokens Display
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Access Token */}
            <TokenDisplay
              title="Access Token"
              token={tokens.accessToken}
              expiration={
                tokens.tokenParsed.exp ? (
                  <ExpirationTimer exp={tokens.tokenParsed.exp} />
                ) : undefined
              }
              color="blue"
              icon={
                <svg
                  className="w-5 h-5"
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
                  tokens.idTokenParsed?.exp ? (
                    <ExpirationTimer exp={tokens.idTokenParsed.exp} />
                  ) : undefined
                }
                color="purple"
                icon={
                  <svg
                    className="w-5 h-5"
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
                  tokens.refreshTokenParsed?.exp ? (
                    <ExpirationTimer exp={tokens.refreshTokenParsed.exp} />
                  ) : undefined
                }
                color="teal"
                icon={
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
