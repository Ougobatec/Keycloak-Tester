// Configuration Keycloak
export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
  disableSilentSSO: boolean;
}

// Token JWT décodé
export interface ParsedToken {
  exp?: number;
  iat?: number;
  sub?: string;
  name?: string;
  email?: string;
  preferred_username?: string;
  realm_access?: {
    roles: string[];
  };
  [key: string]: unknown;
}

// Informations des tokens
export interface TokenInfo {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  tokenParsed: ParsedToken;
  idTokenParsed?: ParsedToken;
  refreshTokenParsed?: ParsedToken;
}
