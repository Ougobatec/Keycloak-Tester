import { GlassPanel } from './GlassPanel';
import { Button } from './Button';
import { Logo } from './Logo';

interface NavBarProps {
  isConnected: boolean;
  userName?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onRefresh: () => void;
  onShowUserMenu: () => void;
}

export function NavBar({
  isConnected,
  userName,
  onConnect,
  onDisconnect,
  onRefresh,
  onShowUserMenu,
}: NavBarProps) {
  return (
    <GlassPanel
      border="border-b"
      rounded="none"
      padding="none"
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-3">
            {!isConnected ? (
              <Button color="blue" onClick={onConnect}>
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Connect
              </Button>
            ) : (
              <>
                <Button color="blue" onClick={onShowUserMenu}>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {userName || 'User'}
                </Button>

                <Button color="emerald" onClick={onRefresh}>
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </Button>

                <Button color="red" onClick={onDisconnect}>
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Disconnect
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
