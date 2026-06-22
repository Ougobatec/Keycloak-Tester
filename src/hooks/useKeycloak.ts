import { useState, useEffect } from 'react';
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

  // Charger la config au démarrage
  useEffect(() => {
    const saved = storage.load();
    if (saved) {
      setConfig(saved);
    }
  }, []);

  // Vérifier l'auth au démarrage ou changement de config
  useEffect(() => {
    const checkAuth = async () => {
      if (!config.url || !config.realm || !config.clientId) return;

      try {
        const authenticated = await keycloakService.init(config);
        if (authenticated) {
          const tokensData = keycloakService.getTokens();
          setTokens(tokensData);
        }
      } catch (err) {
        console.error('Erreur vérification auth:', err);
      }
    };

    checkAuth();
  }, [config]);

  // Sauvegarder la config automatiquement
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
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      await keycloakService.logout();
    } catch (err) {
      console.error('Erreur déconnexion:', err);
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
      setError(
        err instanceof Error ? err.message : 'Erreur de rafraîchissement'
      );
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
  };
}
