# FlowDesk - CRM Dashboard

FlowDesk é um sistema Front-end desenvolvido como uma Single Page Application (SPA) para gestão de relacionamento com clientes e acompanhamento de oportunidades de vendas. O projeto foi construído focando em uma interface moderna, corporativa, totalmente responsiva e sem a necessidade de um backend ativo, utilizando armazenamento em memória.

## 🚀 Funcionalidades

- **Dashboard Analítico:** Visão geral em tempo real com cálculo dinâmico do valor potencial do pipeline de vendas e listagem das oportunidades mais recentes.
- **Gestão de Clientes:** CRUD completo (Criação, Leitura, Atualização e Exclusão) com barra de busca em tempo real.
- **Gestão de Oportunidades:** Pipeline de vendas com filtro por status, cruzamento de dados com a base de clientes e formatação de valores monetários e datas.
- **Persistência de Dados:** Toda a manipulação de dados é salva no navegador do usuário utilizando `localStorage`, garantindo que nenhuma informação seja perdida ao atualizar a página.
- **Seed Inicial:** O sistema já inicializa com dados fictícios carregados automaticamente para fins de demonstração (mock data).

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando o ecossistema moderno do JavaScript:

- **[React 18](https://react.dev/):** Biblioteca para construção da interface de usuário.
- **[Vite](https://vitejs.dev/):** Ferramenta de build de altíssima performance.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Framework CSS utility-first para estilização rápida e responsiva.
- **[Lucide React](https://lucide.dev/):** Biblioteca de iconografia moderna.
- **JavaScript (ES6+):** Lógica e controle de estado nativo (`useState`, `useEffect`).

## 💻 Instruções de Instalação e Execução

Para rodar este projeto em sua máquina local, certifique-se de ter o **[Node.js](https://nodejs.org/)** instalado.

### 1. Clonar o repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO_NO_GITHUB>
cd flowdesk

2. Instalar as dependências
Execute o comando abaixo na raiz do projeto para baixar todos os pacotes necessários:

Bash
npm install
3. Executar o projeto localmente
Para iniciar o servidor de desenvolvimento do Vite:

Bash
npm run dev
O terminal exibirá uma URL (geralmente http://localhost:5173). Abra este link no seu navegador.

📦 Estrutura do Projeto
A arquitetura do código foi dividida focando na separação de responsabilidades e componentização:

src/
 ├── components/       # Componentes reutilizáveis (Sidebar, ModalCliente, ModalOportunidade)
 ├── pages/            # Telas principais da aplicação (Dashboard, Clientes, Oportunidades)
 ├── data/             # Arquivo inicialData.js contendo o seed fictício do sistema
 ├── index.css         # Configurações globais e diretrizes do Tailwind CSS
 └── App.jsx           # Componente raiz que gerencia as rotas condicionalmente
🌐 Deploy Público
O sistema encontra-se em produção e pode ser acessado publicamente através da plataforma Vercel:

🔗 Acessar o FlowDesk: [O LINK DA VERCEL ENTRARÁ AQUI]