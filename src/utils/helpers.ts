import type { KeycloakConfig } from '../types';

const STORAGE_KEY = 'keycloak-config';

export const storage = {
  save: (config: KeycloakConfig): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  },

  load: (): KeycloakConfig | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text);
};

export const formatExpiration = (exp: number): string => {
  const now = Date.now();
  const expirationTime = exp * 1000;
  const remaining = expirationTime - now;

  if (remaining <= 0) return 'Expired';

  const seconds = Math.floor(remaining / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

export const decodeJWT = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;

    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    const padded = base64 + (pad === 2 ? '==' : pad === 3 ? '=' : '');

    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(json);
  } catch (error) {
    console.error('JWT decoding error:', error);
    return null;
  }
};
