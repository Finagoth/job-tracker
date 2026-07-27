# Job Tracker 🎯

Gestor de candidaturas de emprego — acompanhe todas as vagas para as quais você se candidatou em um só lugar.

## 🔗 Demo

[job-tracker-seu-usuario.vercel.app](https://job-tracker.vercel.app) ← (atualizar após o deploy)

## ✨ Funcionalidades

- **Autenticação** — cadastro, login e logout com persistência em localStorage
- **CRUD de vagas** — adicionar, editar, excluir e alterar status das candidaturas
- **Dashboard** — métricas em tempo real (total, entrevistas, aprovações, reprovações)
- **Filtros e busca** — filtre por empresa, tecnologia, status e data
- **Dark/Light mode** — tema persistente entre sessões
- **Feedback visual** — toasts de confirmação e modal de exclusão

## 🛠️ Tecnologias

| Tecnologia      | Uso                            |
| --------------- | ------------------------------ |
| React 18        | Biblioteca de UI               |
| TypeScript      | Tipagem estática               |
| Vite            | Build tool                     |
| React Router v6 | Roteamento SPA                 |
| Zustand         | Gerenciamento de estado global |
| Context API     | Autenticação e tema            |
| React Hook Form | Gerenciamento de formulários   |
| Zod             | Validação de dados             |
| Tailwind CSS    | Estilização                    |
| localStorage    | Persistência de dados          |

## 🚀 Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/Finagoth/job-tracker.git

# Entre na pasta
cd job-tracker

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse `http://localhost:5173`

## 📁 Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Context API (auth e tema)
├── hooks/          # Custom hooks
├── layouts/        # Layouts de página
├── pages/          # Páginas da aplicação
├── routes/         # Configuração de rotas
├── schemas/        # Schemas de validação (Zod)
├── services/       # Acesso ao localStorage
├── stores/         # Store Zustand
├── types/          # Tipos TypeScript
└── utils/          # Funções utilitárias
```

## 👨‍💻 Autor

**Lucas Caliope**
[LinkedIn](https://linkedin.com/in/lucas-caliope09) · [GitHub](https://github.com/Finagoth)
