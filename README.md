DLSIA Monorepo

Установка и запуск

1. `npm install` — установка всех зависимостей.
2. Настройте `.env` в корне (см. описание ниже).
3. `npm run dev` — запуск клиента и сервера одновременно.

Основные команды

- `npm run contract` — обновить API-клиент (Orval) из Swagger.
- `npm run migrate` — применить миграции БД (Prisma/TypeORM).
- `npm run studio` — GUI для базы данных.
- `npm run lint` / `npm run format` — проверка и исправление кода.

Конфигурация (.env)

| Ключ                  | Описание                                    |
| --------------------- | ------------------------------------------- |
| `POSTGRES_*`          | Пользователь, пароль и имя базы PostgreSQL. |
| `DATABASE_URL`        | Строка подключения к БД для сервера.        |
| `PORT`                | Порт сервера NestJS (3000).                 |
| `JWT_SECRET`          | Ключ для подписи токенов авторизации.       |
| `CLIENT_BASE_URL`     | URL фронтенда для настроек CORS (5173).     |
| `VITE_API_BASE_URL`   | Базовый URL API для запросов с фронта.      |
| `VITE_API_SCHEMA_URL` | Ссылка на JSON-схему Swagger для Orval.     |
