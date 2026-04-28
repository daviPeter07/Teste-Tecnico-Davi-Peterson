# Frontend

Aplicação Vue 3 que consome a API Laravel deste teste técnico e entrega autenticação, cadastro de usuários, cadastro de produtos, listagens paginadas, busca com debounce e dialogs de detalhe/criação/edição/exclusão.

## Stack

- Vue 3 + TypeScript
- Vite
- Vue Router
- Pinia
- Axios
- Vuetify 4
- vee-validate + zod
- @vueuse/core
- Tailwind CSS para utilitários globais e ajustes visuais

## Funcionalidades

- Login e cadastro de usuário
- Logout e persistência de token no `localStorage`
- Proteção de rotas autenticadas
- Dashboard com sidebar e navegação entre módulos
- CRUD completo de usuários
- CRUD completo de produtos
- Busca paginada com debounce nas tabelas
- Ordenação de listagens
- Dialogs reutilizáveis para criação, edição, exclusão e visualização
- Formatação de CPF, datas, datas com hora e moeda
- Seleção pesquisável de usuário no formulário de produto
- Visualização de detalhes com relações carregadas do backend

## Estrutura principal

- `src/features/login` e `src/features/register` - telas públicas de autenticação
- `src/features/layout` - shell do dashboard
- `src/features/users` - página e componentes do CRUD de usuários
- `src/features/products` - página e componentes do CRUD de produtos
- `src/components/crud` - shells reutilizáveis de dialog, tabela e estados vazios/carregando
- `src/components/ui` - campos e elementos visuais compartilhados
- `src/composables` - estado compartilhado de busca, paginação, responsividade e tratamento de erro
- `src/services` - client HTTP e integrações com a API
- `src/schemas` - validação dos formulários com Zod
- `src/types` - contratos tipados da aplicação
- `src/utils` - funções reutilizáveis de data, número, string e CPF

## Configuração

No diretório `frontend`:

```bash
pnpm install
```

Se a API não estiver em `http://localhost:8000/api`, ajuste a variável:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

## Executando

```bash
pnpm dev
```

Build de produção:

```bash
pnpm build
```

Preview da build:

```bash
pnpm preview
```

Lint:

```bash
pnpm lint
```

## Fluxos principais

### Autenticação

- A tela de login envia credenciais para a API
- O token é salvo no `localStorage`
- As requisições autenticadas usam interceptor Axios com Bearer token
- O dashboard é bloqueado para usuários sem sessão válida

### Usuários

- Listagem paginada com busca por nome, e-mail e CPF
- Criação, edição, visualização e exclusão
- Dialog de detalhe mostra dados do usuário e produtos vinculados

### Produtos

- Listagem paginada com busca por nome e descrição
- Ordenação por data e nome
- Criação, edição, visualização e exclusão
- Formulário com autocomplete pesquisável de usuários
- Campo de preço com máscara para entrada monetária
- Dialog de detalhe mostra produto, usuário associado e auditoria

## Convenções de UI

- Labels acima dos campos
- Placeholder sempre visível dentro do input
- Componentes compartilhados para manter consistência visual
- Estados vazios e carregamento padronizados
- Formatação de valores apenas na camada de apresentação

## Scripts

- `pnpm dev` - sobe o ambiente de desenvolvimento
- `pnpm build` - gera a build de produção
- `pnpm preview` - pré-visualiza a build
- `pnpm lint` - executa o lint e aplica correções automáticas

## Observações

- O backend esperado para consumo está no diretório `backend`
- A API usa a base `/api` para os endpoints principais
- A aplicação foi estruturada para manter reuso entre usuários e produtos
