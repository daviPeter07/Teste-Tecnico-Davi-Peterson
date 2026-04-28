# Teste Técnico Full Stack

Projeto full stack dividido em duas aplicações:

- `backend` - API em Laravel 11 com autenticação, CRUD e relatório SQL
- `frontend` - SPA em Vue 3 que consome a API e apresenta a interface do sistema

## Visão geral

O sistema cobre autenticação, gestão de usuários, gestão de produtos e um relatório SQL dedicado. O frontend foi construído com foco em reuso de componentes, formulários consistentes e experiência de uso uniforme entre as duas entidades principais.

## Tecnologias

### Backend

- PHP 8.3+
- Laravel 11
- Laravel Sanctum
- PostgreSQL
- PHPUnit
- Laravel Pint

### Frontend

- Vue 3 + TypeScript
- Vite
- Vue Router
- Pinia
- Axios
- Vuetify 4
- vee-validate + zod
- @vueuse/core

## Funcionalidades

- Autenticação com login, cadastro, logout e sessão persistida
- CRUD de usuários com busca e paginação
- CRUD de produtos com busca, ordenação e seleção de usuário
- Visualização de detalhes com dados relacionados carregados da API
- Campo de preço com máscara monetária no frontend
- Busca com debounce nas tabelas
- Relatório SQL em endpoint próprio

## Estrutura

```text
backend/   API Laravel, migrations, seeders, regras e serviços
frontend/  SPA Vue 3 com páginas, componentes, composables e serviços HTTP
```

## Como executar

### Backend

Siga as instruções em [backend/README.md](backend/README.md).

### Frontend

Siga as instruções em [frontend/README.md](frontend/README.md).

## Endpoints principais

- `POST /api/login`
- `POST /api/logout`
- `GET /api/me`
- `POST /api/users`
- `GET /api/users`
- `GET /api/users/{id}`
- `POST /api/products`
- `GET /api/products`
- `GET /api/products/{id}`
- `GET /relatorio-sql`

## Observações

- O frontend espera a API em `http://localhost:8000/api` por padrão
- O projeto foi pensado para rodar com backend e frontend separados
- As instruções detalhadas de cada parte estão nos READMEs específicos de cada pasta
