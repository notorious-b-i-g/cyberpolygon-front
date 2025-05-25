FROM node:18-alpine

WORKDIR /app

# Копируем только package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости
RUN npm install --legacy-peer-deps --force

# Устанавливаем serve глобально
RUN npm install -g serve

# Копируем остальные файлы проекта
COPY . .

# Исправляем проблемы с правами доступа
RUN chmod -R 777 /app/node_modules/.bin
RUN mkdir -p /app/node_modules/.cache && chmod -R 777 /app/node_modules/.cache

# Добавляем Babel plugin (из-за предупреждения)
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Переменные окружения
ENV BROWSER=none
ENV NODE_ENV=development
ENV PORT=3000
ENV CI=true

# Порт для сервера
EXPOSE 3000

# Запуск
CMD ["npm", "start"] 