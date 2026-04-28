# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Features

Plano de implementação (sem executar ainda)
Fase 1 — Base de app + arquitetura

1. Configurar vue-router com rotas:
   - /login
   - /register
   - /dashboard/users
   - /dashboard/products
2. Configurar pinia + store de autenticação (authStore)
3. Configurar axios com:
   - baseURL da API
   - interceptor para token Bearer
4. Criar layout base com sidebar (AppShell)
   Saída esperada: navegação e layout prontos, sem CRUD ainda.

---

Fase 2 — Tipos, constantes e composables

1. Criar types/:
   - api.ts (PaginatedMeta, ApiMessageResponse)
   - auth.ts (LoginPayload, AuthUser, etc.)
   - user.ts e product.ts
2. Criar constants/:
   - itens de menu/sidebar
   - opções fixas de paginação/filtros
3. Criar composables/:
   - useBreakpoints (responsividade com @vueuse/core)
   - usePaginatedTable (estado comum de paginação/busca/filtro)
     Saída esperada: base tipada e reuso pronto.

---

Fase 3 — Auth (login, cadastro, logout, /me)

1. features/auth/:
   - LoginForm.vue
   - RegisterForm.vue
2. Validação com vee-validate + zod
3. Fluxo:
   - Login chama /api/login com device_name
   - Guarda token no store/localStorage
   - Busca /api/me
   - Logout chama /api/logout
4. Guard de rota:
   - bloqueia dashboard sem token
     Saída esperada: autenticação funcional de ponta a ponta.

---

Fase 4 — Componentes reutilizáveis de CRUD

1. components/:
   - DataTableShell.vue (toolbar + search + filtro + paginação)
   - ConfirmDialog.vue
   - AppFormDialog.vue (modal base de create/edit)
   - EmptyState.vue / LoadingState.vue
2. padronizar UX para users e products
   Saída esperada: mesmo padrão visual/comportamental para as duas entidades.

---

Fase 5 — CRUD Users

1. features/users/:
   - UsersTable.vue
   - UserForm.vue
2. Operações:
   - listagem paginada
   - busca (name/email/cpf)
   - create/update/delete
3. Integrar com backend existente (/api/users)
   Saída esperada: CRUD completo de usuários.

---

Fase 6 — CRUD Products

1. features/products/:
   - ProductsTable.vue
   - ProductForm.vue
2. Operações:
   - listagem paginada
   - busca (name/description)
   - filtro por usuário (user_id)
   - create/update/delete
3. Integrar com /api/products e /api/users/{user}/products quando útil
   Saída esperada: CRUD completo de produtos com mesmo padrão de users.

---

Fase 7 — Pages finais

1. pages/:
   - LoginPage.vue
   - RegisterPage.vue
   - UsersPage.vue
   - ProductsPage.vue
2. Cada page só orquestra layout + feature (como você pediu)

---

Fase 8 — Verificação final

1. Build e type-check:
   - npm run build
2. Ajustes de responsividade e UX
3. Revisar consistência de tipos e mensagens de erro

---

Estratégia de commits (seguindo seu padrão)

- feat(frontend): setup app shell, router, pinia and axios api client
- feat(auth): implement login register me and logout flow
- feat(users): implement users CRUD with search filters and pagination
- feat(products): implement products CRUD with search filters and pagination
- chore(frontend): finalize shared components and responsive behavior
