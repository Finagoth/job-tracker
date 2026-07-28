# Job Tracker 🎯

Gestor de candidaturas de emprego — acompanhe todas as vagas para as quais você se candidatou em um só lugar.

## 🔗 Demo

https://job-tracker-rho-roan.vercel.app/login

## 📸 Preview

<img width="1919" height="920" alt="image" src="https://github.com/user-attachments/assets/5d1ebafe-1d17-4b65-866d-f03467167d2e" />

<img width="1919" height="919" alt="image" src="https://github.com/user-attachments/assets/13a5e01e-5e1a-47cb-b782-a5048445023b" />

<img width="1919" height="917" alt="image" src="https://github.com/user-attachments/assets/754c8ed3-2b45-4a0f-9b86-41146c6f57bf" />

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
