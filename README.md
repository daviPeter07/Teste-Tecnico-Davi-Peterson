# Teste Técnico Full Stack (Vue + Laravel)

Implementação do desafio proposto em `https://github.com/lucasamazonas/teste-dev-full-stack`.

## Stack

- Frontend: Vue 3 + Vite + TypeScript + Vuetify + Axios
- Backend: Laravel 11 + Sanctum
- Banco: PostgreSQL

## Estrutura do Projeto

```text
/teste-tecnico-davi-peterson
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
└── backend/
    ├── app/
    ├── database/
    ├── routes/
    ├── docker-compose.yml
    ├── composer.json
    └── artisan
```

## Requisitos

- Node.js 20+
- NPM 10+
- PHP 8.3+ (recomendado usar Herd)
- Composer
- Docker Desktop (para subir PostgreSQL)

## Como Rodar

## 1) Banco (PostgreSQL com Docker)

No diretório `backend`:

```bash
docker compose up -d
```

Obs.: o `docker-compose` usa a porta definida no `.env` (`DB_PORT`, padrão `5533`) e publica apenas no localhost.

## 2) Backend (Laravel)

No diretório `backend`:

```bash
composer install
cp .env.example .env
herd php artisan key:generate
herd php artisan migrate --seed
herd php artisan serve --no-reload
```

API base local: `http://127.0.0.1:8000/api`

Healthcheck Laravel: `GET /up`

Relatório SQL (diferencial): `GET /relatorio-sql`

## 3) Frontend (Vue)

No diretório `frontend`:

```bash
npm install
npm run dev
```

Frontend local (padrão Vite): `http://127.0.0.1:5173`

## Seeders e Factories

Ao rodar `migrate --seed`, o banco é populado com:

- usuários fake (com `name`, `cpf`, `email`, `password`)
- produtos fake vinculados aos usuários (`user_id`, `name`, `price`, `description`)

## Endpoints Principais

## Autenticação

- `POST /api/login`
- `POST /api/logout` (auth:sanctum)
- `GET /api/me` (auth:sanctum)

## Usuários

- `POST /api/users` (público - cadastro)
- `GET /api/users` (auth:sanctum)
- `GET /api/users/{id}` (auth:sanctum)
- `PATCH /api/users/{id}` (auth:sanctum + policy)
- `DELETE /api/users/{id}` (auth:sanctum + policy)

## Produtos

- `POST /api/products` (auth:sanctum)
- `GET /api/products` (auth:sanctum)
- `GET /api/products/{id}` (auth:sanctum + policy)
- `PATCH /api/products/{id}` (auth:sanctum + policy)
- `DELETE /api/products/{id}` (auth:sanctum + policy)
- `GET /api/users/{user}/products` (auth:sanctum)

## Relatório SQL (Raw Query)

- `GET /relatorio-sql`
- Controller usa SQL puro com `DB::select(...)`
- Retorna usuários com produtos relacionados, total de produtos, média e valor total
- Queries opcionais em `backend/database/consultas.sql`

## Qualidade

No diretório `backend`:

```bash
herd php artisan test
herd php vendor/bin/pint --test
```

## Observações

- Rotas sensíveis estão protegidas por Sanctum.
- Policies impedem alteração/exclusão de recursos de outros usuários.
- O endpoint `/api/users` foi mantido público para cadastro inicial.
