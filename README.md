# Киберполигон — фронтенд

Веб-интерфейс образовательной платформы по кибербезопасности: курсы, статьи, тесты и практический терминал прямо в браузере.

> Скриншоты: добавить

## О проекте

Киберполигон — это SPA-приложение на React 18 для обучения кибербезопасности. Пользователи проходят курсы и тесты, читают статьи по тематическим рубрикам и выполняют практические задания. Ключевая особенность — встроенный терминал, работающий через WebSocket (xterm.js + socket.io), который позволяет взаимодействовать с учебным окружением в реальном времени. Авторизация реализована через OAuth-провайдеров, а для разработки без бэкенда предусмотрен режим моков.

## Стек

- **React 18** + **React Router 6**
- **Material UI 5** (`@mui/material`, `@emotion`) и **Tailwind CSS** / PostCSS
- **Redux Toolkit** + **React Redux** — управление состоянием
- **React Query** (`@tanstack/react-query`) — работа с серверными данными и кеширование
- **Axios** — HTTP-клиент
- **socket.io-client** + **xterm.js** (`xterm`, `xterm-addon-fit`) — WebSocket-терминал
- **notistack** — уведомления
- **react-markdown** — рендеринг контента курсов и статей
- **i18next** / **react-i18next** — локализация
- **framer-motion** — анимации
- **Storybook 7** — каталог компонентов
- **Jest** / Testing Library — тесты
- **CRACO**, ESLint, Prettier, TypeScript — инструменты сборки и качества кода
- **Docker** + **nginx** — деплой

## Возможности

- OAuth-авторизация через Google, GitHub, Yandex и Telegram с обработкой callback и защищёнными маршрутами
- Каталог курсов и страницы отдельных курсов с markdown-контентом
- Тематические рубрики и статьи по направлениям кибербезопасности
- Тесты знаний с вопросами и отображением результатов
- Практические задания
- Встроенный терминал на xterm.js с подключением к серверу по WebSocket
- Глобальная система уведомлений (notistack) с автоматическим показом ошибок API
- Переключение темы оформления и локализация интерфейса
- Режим моков (`REACT_APP_USE_MOCKS`) для работы без бэкенда

## Запуск

Требуется Node.js 18+.

```bash
# установка зависимостей
npm install

# запуск в режиме разработки (http://localhost:3000)
npm start

# сборка production-версии
npm run build

# тесты
npm test

# Storybook (http://localhost:6006)
npm run storybook
```

### Переменные окружения

Скопируйте `.env.example` в `.env` и при необходимости отредактируйте значения:

```bash
cp .env.example .env
```

Основные параметры (полный список см. в `.env.example`):

- `REACT_APP_API_URL` — адрес API (по умолчанию `http://localhost:8000`)
- `REACT_APP_USE_MOCKS` — `true`/`false`, включение режима моков
- `REACT_APP_GOOGLE_CLIENT_ID`, `REACT_APP_GITHUB_CLIENT_ID`, `REACT_APP_YANDEX_CLIENT_ID`, `REACT_APP_TELEGRAM_CLIENT_ID` — идентификаторы OAuth-приложений
- `REACT_APP_OAUTH_REDIRECT_URI` — URI редиректа после авторизации

> Значения OAuth-клиентов в репозиторий не коммитятся — заполните их собственными.

### Docker

В проекте есть `Dockerfile` (многоэтапная сборка с nginx) и `docker-compose.yml`:

```bash
docker compose up --build
```

После сборки приложение раздаётся через nginx на порту `80`.

## Структура

```
src/
  api/          # API-клиенты
  components/   # переиспользуемые компоненты (в т.ч. layout, ui)
  config/       # конфигурация и переменные окружения
  contexts/     # React-контексты (уведомления и др.)
  features/     # функциональные модули
  hooks/        # пользовательские хуки
  pages/        # страницы (роуты)
  redux/, store/# Redux-хранилище
  services/     # сервисы (queryClient, WebSocket и т.д.)
  theme/        # тема Material UI и оформление
  types/, utils/# типы и утилиты
  App.jsx       # корневой компонент с маршрутизацией
  index.js      # точка входа
```

Деплой-файлы (`Dockerfile`, `docker-compose.yml`, `nginx.conf`) находятся в корне репозитория.
