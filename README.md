# 🧠 Express Yourself

Aplicação web criada com **Node.js + Express** que permite aos usuários se cadastrarem, fazerem login e escreverem seus próprios pensamentos ou frases motivacionais. Um projeto completo com autenticação, sessões e conexão com banco de dados MySQL.

---

## ✨ Funcionalidades

- Criar conta e fazer login
- Criar, editar e deletar pensamentos
- Visualizar pensamentos públicos de outros usuários
- Acesso a dashboard com seus próprios pensamentos
- Sessão autenticada com `express-session`

---

## 🛠️ Tecnologias

- Node.js + Express
- Sequelize + MySQL
- Express Handlebars (view engine)
- Express Session + File Store
- Flash messages
- Autenticação com Bcrypt

---

## 🚀 Como executar

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/thoughts-app.git
cd thoughts-app

## 💻 Instale as dependências:

npm install

## 💾 Configure o banco de dados:

Crie um banco MySQL chamado toughts

Edite o arquivo db/conn.js com suas credenciais

## 🔥 Rode o projeto:

npm start

## 📁 Estrutura de rotas

🔐 Rotas de autenticação (/routes/AuthRoute.js)

GET /login – Tela de login

POST /login – Autenticar usuário

GET /register – Tela de cadastro

POST /register – Criar conta

GET /logout – Encerrar sessão

✍️ Rotas de pensamentos (/routes/ToughtRoute.js)

GET /add – Formulário para novo pensamento

POST /add – Salvar novo pensamento

GET /edit/:id – Editar pensamento

POST /edit – Atualizar pensamento

POST /remove – Remover pensamento

GET /dashboard – Dashboard do usuário autenticado

GET / – Página inicial com pensamentos públicos

