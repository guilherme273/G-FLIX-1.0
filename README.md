G‑FLIX‑1.0

A Netflix‑inspired study project built with React, NestJS, MySQL & Docker.

🚀 Visão Geral
G‑FLIX‑1.0 é um app para estudo e prática, inspirado na Netflix, que permite:

Listar e assistir filmes gratuitos do YouTube

Reagir aos vídeos (like, dislike, heart, smile, angry)

Adicionar e gerenciar favoritos

Pesquisar vídeos por nome

Dashboard administrativo com CRUD de categorias, filmes e usuários

Estatísticas: gráficos de linha, pizza e rankings de vídeos mais clicados/assistidos

O projeto foi desenvolvido para aprimorar conhecimentos em full‑stack, usando modernas boas práticas de código limpo, teste de rotas protegidas e deploy containerizado.

🛠️ Tecnologias
Frontend: React + TypeScript, React Hook Form, React Router Dom, Lucide React, Jwt Decode, Framer Motion, Tailwindcss, Recharts, React Context, React‑Toastify

Backend: NestJS, TypeORM, MySQL, JWT Auth, Guards, Bcrypt,

Banco de Dados: MySQL 8 + volumes Docker para persistência

Containerização: Docker, Docker Compose

Outros:

.env para variáveis sensíveis

NGINX para servir SPA e proxy de API

📂 Estrutura de Pastas
css
Copiar
Editar
G‑FLIX‑1.0
├── Cliente/ ← React frontend
│ ├── Dockerfile
│ ├── nginx.conf
│ ├── .env ← VITE\_… vars
│ └── src/
│ └── …  
├── App/ ← NestJS backend
│ ├── Dockerfile
│ ├── .env.development.local
│ └── src/
│ └── …  
├── docker-compose.yml ← Orquestra frontend, backend e DB
└── README.md
⚙️ Instalação & Setup
Clone o repositório

bash
Copiar
Editar
git clone https://github.com/seu-usuario/G-FLIX-1.0.git
cd G-FLIX-1.0
Ajuste as variáveis

Frontend (Cliente/.env):

env
Copiar
Editar
VITE_API_URL=http://localhost:3001
Backend (App/.env.development.local):

env
Copiar
Editar
DB_HOST=db
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=Senha123!
DB_NAME=my_back_end

JWT_TOKEN=...
ADMIN_NAME=SuperAdmin
ADMIN_EMAIL=admin-gflix@gmail.com
ADMIN_PASSWORD=SuperAdmin123!
Build & Up (requer Docker + Docker Compose)

bash
Copiar
Editar
docker-compose up --build
Acesse

Frontend: http://localhost:3000

Backend API: http://localhost:3001

MySQL: localhost:3307 (usuário/root:root)

🐳 Docker Compose
yaml
Copiar
Editar
version: "3.8"
services:
frontend:
build: ./G‑FLIX‑TS
ports: ["3000:80"]
depends_on: [backend]

backend:
build: ./G‑FLIX‑TS‑NEST
ports: ["3001:3000"]
env_file: ["./App/.env.development.local"]
depends_on: [db]

db:
image: mysql:8
restart: always
environment:
MYSQL_ROOT_PASSWORD: root
MYSQL_DATABASE: my_back_end
ports: ["3307:3306"]
volumes: [db_data:/var/lib/mysql]

volumes:
db_data:
Comandos úteis
bash
Copiar
Editar

# Buildar e subir

docker-compose up --build

# Derrubar containers

docker-compose down

# Derrubar containers + volumes (reset DB)

docker-compose down -v
🔐 Autenticação & Guards
Frontend: componentes LoggedIn e IsAdmin protegem rotas via React Router

Backend: JWT + Guards NestJS validam perfis de usuário e admin

📊 Funcionalidades Principais
Usuário

Cadastro / Login

Visualização de catálogo e player de vídeo

Reações e favoritos

Admin

CRUD de categorias e filmes

Dashboard com gráficos (linha, pizza) e rankings

Gerenciamento de usuários e permissões

ENTRE COM AS SEGUINTES CREDENCIAIS PARA TER ACESSO AO DASHBOARD ADMINSTRATIVO:
EMAIL: admin-gflix@gmail.com
SENHA: SuperAdmin123!

🤝 Contribuição
Fork este repositório

Crie uma branch (git checkout -b feature/nome-da-sua-feature)

Commit suas mudanças (git commit -m 'feat: sua feature')

Push na branch (git push origin feature/nome-da-sua-feature)

Abra um Pull Request

📄 Licença
Este projeto está licenciado sob a MIT License.

Desenvolvido por Guilherme Feitosa 🚀
