import type { KeycloakConfig, TokenInfo } from '../types';

interface KeycloakInstance {
  init: (config: unknown) => Promise<boolean>;
  login: (options?: unknown) => Promise<void>;
  logout: (options?: unknown) => Promise<void>;
  updateToken: (minValidity: number) => Promise<boolean>;
  authenticated?: boolean;
  token?: string;
  refreshToken?: string;
  idToken?: string;
  tokenParsed?: unknown;
  idTokenParsed?: unknown;
  refreshTokenParsed?: unknown;
  clearToken: () => void;
}

class KeycloakService {
  private keycloak: KeycloakInstance | null = null;

  async init(config: KeycloakConfig): Promise<boolean> {
    try {
      const Keycloak = (await import('keycloak-js')).default;

      this.keycloak = new Keycloak({
        url: config.url,
        realm: config.realm,
        clientId: config.clientId,
      }) as unknown as KeycloakInstance;

      const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: config.disableSilentSSO
          ? undefined
          : window.location.origin + '/silent-check-sso.html',
      });

      // Nettoyer l'URL après redirection
      if (
        window.location.search.includes('state=') ||
        window.location.hash.includes('state=')
      ) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

      return authenticated;
    } catch (error) {
      console.error('Erreur initialisation Keycloak:', error);
      throw error;
    }
  }

  async login(): Promise<void> {
    if (!this.keycloak) throw new Error('Keycloak non initialisé');
    await this.keycloak.login({ redirectUri: window.location.origin });
  }

  async logout(): Promise<void> {
    if (!this.keycloak) throw new Error('Keycloak non initialisé');
    await this.keycloak.logout({ redirectUri: window.location.origin });
  }

  async refresh(): Promise<boolean> {
    if (!this.keycloak) throw new Error('Keycloak non initialisé');
    return await this.keycloak.updateToken(5);
  }

  isAuthenticated(): boolean {
    return this.keycloak?.authenticated || false;
  }

  getTokens(): TokenInfo | null {
    if (!this.keycloak || !this.keycloak.authenticated) return null;

    return {
      accessToken: this.keycloak.token || '',
      refreshToken: this.keycloak.refreshToken,
      idToken: this.keycloak.idToken,
      tokenParsed: this.keycloak.tokenParsed || {},
      idTokenParsed: this.keycloak.idTokenParsed,
      refreshTokenParsed: this.keycloak.refreshTokenParsed,
    } as TokenInfo;
  }

  clear(): void {
    if (this.keycloak) {
      this.keycloak.clearToken();
      this.keycloak = null;
    }
  }
}

export const keycloakService = new KeycloakService();
