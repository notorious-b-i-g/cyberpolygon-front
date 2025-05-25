// Конфигурация API
const API_CONFIG = {
  // URL для разработки (используется, если не задана переменная окружения)
  DEV_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  
  // Базовые пути
  API_PATH: process.env.REACT_APP_API_PATH || '/cyberpolygon/api',
  API_VERSION: process.env.REACT_APP_API_VERSION || '/v1',
  WS_PATH: process.env.REACT_APP_WS_PATH || '/ws',
  
  // Полный URL API (автоматически выбирает DEV или PROD в зависимости от окружения)
  getBaseUrl: () => {
    return API_CONFIG.DEV_URL;
  },
  
  // Полный URL API для запросов
  getApiUrl: () => {
    // Формируем API URL с учетом базового пути и версии
    return API_CONFIG.getBaseUrl() + API_CONFIG.API_PATH;
  },
  
  // URL для WebSocket соединений
  getWsUrl: () => {
    const baseUrl = API_CONFIG.getBaseUrl();
    // Заменяем http на ws и https на wss
    const wsBaseUrl = baseUrl.replace('http://', 'ws://').replace('https://', 'wss://');
    return `${wsBaseUrl}${API_CONFIG.WS_PATH}`;
  }
};

export default API_CONFIG; 