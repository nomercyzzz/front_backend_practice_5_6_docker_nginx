FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и устанавливаем зависимости
COPY package.json ./
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порты для серверов
EXPOSE 3000 8080 4040 4000

# Запускаем все серверы
CMD ["npm", "start"]