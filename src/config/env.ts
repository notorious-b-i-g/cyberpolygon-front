/**
 * Environment configuration for the application
 */

/** API configuration */
export const API = {
  /** Base API URL */
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  
  /** API path */
  PATH: process.env.REACT_APP_API_PATH || '',
  
  /** API version */
  VERSION: process.env.REACT_APP_API_VERSION || '',
  
  /** Complete API URL */
  get URL() {
    return `${this.BASE_URL}${this.PATH}`;
  },
  
  /** WebSocket base URL */
  get WS_URL() {
    return this.BASE_URL.replace('http://', 'ws://').replace('https://', 'wss://');
  }
};

/** Feature flags */
export const FEATURES = {
  /** Whether to use mock data instead of real API calls */
  USE_MOCKS: true,
  
  /** Development mode flag */
  IS_DEV: process.env.NODE_ENV === 'development',
  
  /** Debug mode for testing features */
  DEBUG_MODE: true
};

/** OAuth configuration */
export const OAUTH = {
  /** List of supported OAuth providers */
  PROVIDERS: ['google', 'github', 'yandex'],
  
  /** OAuth client IDs */
  CLIENT_IDS: {
    GOOGLE: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    GITHUB: process.env.REACT_APP_GITHUB_CLIENT_ID || '',
    YANDEX: process.env.REACT_APP_YANDEX_CLIENT_ID || '',
  },
  
  /** Redirect URI for OAuth callbacks */
  REDIRECT_URI: process.env.REACT_APP_OAUTH_REDIRECT_URI || 'http://localhost:3000/auth/callback',
};

export default {
  API,
  FEATURES,
  OAUTH,
};
