# Anime List

## Descrição

Projeto que consiste em um CRUD com autenticação via JWT e testes JEST, permitindo que o usuário crie e gerencie sua lista de animes favoritos.

## Tecnologias Utilizadas
- NestJS (latest)
- Prisma ORM (latest)
- JWT (JSON Web Token)
- JEST (Testing)
- Postman (para testes de requisição)
- Visual Studio Code

## Requisitos do Projeto
- Node.js (latest)
- NestJS CLI
- PostgreSQL ou imagem Docker

## Como Rodar o Projeto

1. **Instalar o Node.js**
   Faça o download e instale o Node.js do [site oficial](https://nodejs.org/).

2. **Instalar o NestJS CLI**
   Instale o NestJS CLI globalmente utilizando o npm:
   ```sh
   npm install -g @nestjs/cli
3. **Cloner o Repositório**
   Clone o repositório do projeto:
   ```sh
   git clone https://github.com/Klleriston/NEST-KEKZROLL.git
   cd NEST-KEKZROLL
   ```
4. **Intalar as dependências**
   ```sh
    npm install
    ```
5. **Configure o database**
    Certifique-se de que o PostgreSQL está em execução. Crie um banco de dados e atualize o arquivo .env com as configurações do banco de dados:
   ```sh
    DATABASE_URL="postgresql://username:password@localhost:5432/nome-do-banco"
   ```
6. **Inicie a aplicaçao**
   ```sh
   npm start
   ```

   
