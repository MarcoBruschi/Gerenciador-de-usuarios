# 🚀 Gerenciador de Usuários - Full Stack JS

## 📝 Descrição do Projeto

Um projeto de demonstração **Full Stack** que implementa um **Sistema CRUD de Usuários** completo. O Backend é uma API RESTful robusta desenvolvida com **Node.js** e **Express**, utilizando o pacote `mysql2` para persistência de dados. O Frontend é básico construído com **HTML, CSS e JavaScript Puro **, mostrando a comunicação assíncrona com a API.

## 🌟 Recursos Principais

* **CRUD Completo:** Listagem, visualização, criação, edição e exclusão de usuários.
* **Autenticação Simples:** Funcionalidades de Cadastro (`POST /usuarios`) e Login (`POST /usuarios/login`).
* **Backend Robustos:** Utilização de `express` e tratamento de erros (status 400, 404, 500) para todas as rotas.
* **Conexão Segura com DB:** Uso de `dotenv` e variáveis de ambiente para gerenciar as credenciais do MySQL.

## 🛠️ Tecnologias Utilizadas

| Componente | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express.js, `cors`, `dotenv` | Servidor API RESTful. |
| **Banco de Dados** | MySQL (`mysql2` package) | Conexão gerenciada por `db.js`. |
| **Frontend** | HTML, CSS, JavaScript (Vanilla) | Lógica de interface e requisições (`fetch`). |

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### 1. Pré-requisitos

* [Node.js](https://nodejs.org/en/download/)
* Um servidor MySQL (ex: XAMPP, WAMP, MySQL Workbench)

### 2. Estrutura e Instalação do Backend

O backend reside na pasta `/backend` (recomendado).

1.  **Instale as dependências:**
    ```bash
    cd backend
    npm install express mysql2 cors dotenv
    ```

2.  **Configuração do Banco de Dados:**
    * Crie um banco de dados MySQL chamado exatamente **`bancoteste`**.
    * Execute o seguinte código SQL para criar a tabela `usuarios`:

        ```sql
        CREATE TABLE usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            senha VARCHAR(255) NOT NULL
        );
        ```
    > **Nota:** Os campos da tabela são baseados nas operações `SELECT`, `INSERT`, `UPDATE` do seu `app.js`.

3.  **Crie o arquivo `.env`:**
    * Crie um arquivo chamado **`.env`** no diretório `/backend` e preencha com suas credenciais:

        ```dotenv
        HOST=localhost
        USER=root
        PASSWORD=sua_senha_do_mysql
        DATABASE=bancoteste
        PORT=3000
        ```
    > **Atenção:** Certifique-se de que o arquivo `.env` está listado no seu `.gitignore` para não expor suas credenciais. Seus arquivos de backend usam as variáveis `HOST`, `USER`, `PASSWORD`, `DATABASE` e `PORT`.

4.  **Inicie o Servidor:**
    ```bash
    node app.js
    ```
    O servidor será iniciado na porta **3000**.

### 3. Executando o Frontend

O Frontend é o cliente que se conecta à API.

1.  Com o Backend rodando na porta `3000`, abra o arquivo `frontend/index.html` diretamente no seu navegador.
2.  Utilize a tela de **Criar Conta** para cadastrar um novo usuário.
3.  Utilize a tela de **Fazer Login** para acessar a página de gerenciamento (`home.html`).

## 🔑 Rotas da API (Backend - `app.js`)

A API roda em `http://localhost:3000`.

| Método | Rota | Descrição | Implementação (Arquivo) |
| :--- | :--- | :--- | :--- |
| `GET` | `/usuarios` | Retorna todos os usuários. | `app.js` |
| `GET` | `/usuarios/:id` | Retorna um usuário específico por ID. | `app.js` |
| `POST` | `/usuarios` | Cria um novo usuário no banco de dados. | `app.js` |
| `POST` | `/usuarios/login` | Usado para verificação de login. | `app.js` |
| `PUT` | `/usuarios/:id` | Atualiza os campos (nome, email, senha) de um usuário. | `app.js` |
| `DELETE` | `/usuarios/:id` | Exclui um usuário do banco de dados. | `app.js` |
