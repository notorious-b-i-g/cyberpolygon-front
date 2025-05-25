import authApi, { isAuthenticated } from './auth';
import { getTaskById, getTaskHint, getTaskProgress, getTasks, submitFlag } from './tasks';
import { getTestById, getTestResults, getTests, startTest, submitTest } from './tests';
import articlesApi from './articles';
import rubricsApi from './rubrics';
import resourcesApi from './resources';
import { TerminalWebSocket, getTerminalUrl } from './terminal';

// Группируем все API-модули для удобного импорта
const api = {
  auth: authApi,
  tasks: {
    getTaskById,
    getTaskHint,
    getTaskProgress,
    getTasks,
    submitFlag
  },
  tests: {
    getTestById,
    getTestResults,
    getTests,
    startTest,
    submitTest
  },
  articles: articlesApi,
  rubrics: rubricsApi,
  resources: resourcesApi,
  TerminalWebSocket,
  getTerminalUrl
};

// Экспортируем для обратной совместимости
export {
  authApi,
  isAuthenticated,
  articlesApi,
  rubricsApi,
  resourcesApi,
  TerminalWebSocket,
  getTerminalUrl
};

export default api; 