// Keycloak Configuration
export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
  disableSilentSSO: boolean;
}

// Decoded JWT Token
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

// Token Information
export interface TokenInfo {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  tokenParsed: ParsedToken;
  idTokenParsed?: ParsedToken;
  refreshTokenParsed?: ParsedToken;
}
