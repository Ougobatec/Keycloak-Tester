import { useState, useEffect, useRef } from 'react';
import type { KeycloakConfig, TokenInfo } from '../types';
import { keycloakService } from '../services/keycloak.service';
import { storage } from '../utils/helpers';

export function useKeycloak() {
  const [config, setConfig] = useState<KeycloakConfig>({
    url: '',
    realm: '',
    clientId: '',
    disableSilentSSO: false,
  });
  const [tokens, setTokens] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isInitializing = useRef(false);

  // Load config on startup and check auth once
  useEffect(() => {
    // Prevent multiple simultaneous inits
    if (isInitializing.current) return;

    const saved = storage.load();
    if (saved) {
      setConfig(saved);

      // Check auth only if we have a complete config
      if (saved.url && saved.realm && saved.clientId) {
        isInitializing.current = true;
        (async () => {
          try {
            const authenticated = await keycloakService.init(saved);
            if (authenticated) {
              const tokensData = keycloakService.getTokens();
              setTokens(tokensData);
            }
          } catch (err) {
            console.error('Startup auth check error:', err);
          }
        })();
      }
    }
  }, []); // Empty array = runs only once on mount

  // Save config automatically
  useEffect(() => {
    if (config.url || config.realm || config.clientId) {
      storage.save(config);
    }
  }, [config]);

  const connect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const authenticated = await keycloakService.init(config);
      if (!authenticated) {
        await keycloakService.login();
        return;
      }
      const tokensData = keycloakService.getTokens();
      setTokens(tokensData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection error');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      await keycloakService.logout();
    } catch (err) {
      console.error('Disconnection error:', err);
    } finally {
      keycloakService.clear();
      setTokens(null);
    }
  };

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const refreshed = await keycloakService.refresh();
      const tokensData = keycloakService.getTokens();
      setTokens(tokensData);
      return { success: true, refreshed };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Refresh error');
      return { success: false, refreshed: false };
    } finally {
      setIsLoading(false);
    }
  };

  const clearConfig = () => {
    storage.clear();
    setConfig({
      url: '',
      realm: '',
      clientId: '',
      disableSilentSSO: false,
    });
  };

  const clearError = () => setError(null);

  return {
    config,
    setConfig,
    tokens,
    isLoading,
    error,
    connect,
    disconnect,
    refresh,
    clearConfig,
    clearError,
  };
}
