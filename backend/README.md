# Backend - Teste Técnico Full Stack (Laravel 11)

API REST em Laravel 11 para gerenciamento de usuários e produtos, com autenticação via Sanctum e relatório em SQL puro.

## Stack

- PHP 8.3+
- Laravel 11
- Laravel Sanctum
- PostgreSQL
- PHPUnit + Laravel Pint

## Pré-requisitos

- PHP 8.3+ (recomendado Herd)
- Composer
- Docker Desktop (para subir o PostgreSQL)

## Configuração

No diretório `backend`:

```bash
composer install
cp .env.example .env
herd php artisan key:generate
```

## Banco de dados

Suba o PostgreSQL com Docker:

```bash
docker compose up -d
```

Depois rode migrations e seeders:

```bash
herd php artisan migrate --seed
```

## Rodando a API

```bash
composer run dev
```

Base URL local (padrão): `http://127.0.0.1:8000`

Healthcheck do Laravel: `GET /up`

## Endpoints

## Autenticação

- `POST /api/login`
- `POST /api/logout` (auth:sanctum)
- `GET /api/me` (auth:sanctum)

## Usuários

- `POST /api/users` (cadastro público)
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

## Relatório SQL

- `GET /relatorio-sql`
- Implementado com SQL puro via `DB::select(...)`
- Queries opcionais documentadas em `database/consultas.sql`

## Seeders e Factories

Ao rodar `migrate --seed`, são criados:

- usuários fake com `name`, `cpf`, `email`, `password`
- produtos fake vinculados aos usuários (`user_id`, `name`, `price`, `description`)

Gerar dados fake sob demanda:

```bash
# popular com dados fake usando o seeder principal
herd php artisan db:seed

# recriar banco e popular novamente do zero
herd php artisan migrate:fresh --seed
```

# Comandos

Executar testes:

```bash
composer run test
```

Verificar padrão de código:

```bash
composer run lint
```

Aplicar formatação automática:

```bash
composer run format
```
