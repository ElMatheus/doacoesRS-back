
# Gerenciamento e batalha de herois ⚔

## Introdução

Este projeto é uma aplicação de servidor Node.js que permite aos usuários criar batalhas entre heróis e recuperar informações sobre essas batalhas. Ele usa um banco de dados PostgreSQL para armazenar informações sobre heróis e batalhas.

## Funcionalidades

### Batalha

Listar todas as batalhas: A rota GET /battles retorna uma lista de todas as batalhas que ocorreram, incluindo informações detalhadas sobre os heróis que lutaram e o vencedor de cada batalha.

Buscar batalhas por nome do herói: A rota GET /battles/name/:name permite aos usuários buscar todas as batalhas em que um herói com um determinado nome participou.

Iniciar uma batalha entre dois heróis: A rota GET /battles/:heroi1/:heroi2 inicia uma batalha entre dois heróis especificados pelos usuários. A batalha é simulada no servidor e o resultado é armazenado no banco de dados.

### Herois

Listar todos os heróis: A rota GET /heroes retorna uma lista de todos os heróis cadastrados no sistema.

Buscar herói por ID: A rota GET /heroes/:id retorna os detalhes de um herói específico, com base no ID fornecido.

Criar um novo herói: A rota POST /heroes permite aos usuários criar um novo herói. Os detalhes do herói (como nome, nível, poder, HP e ataque) são enviados no corpo da solicitação.

Atualizar um herói existente: A rota PUT /heroes/:id permite aos usuários atualizar os detalhes de um herói existente. Os novos detalhes do herói são enviados no corpo da solicitação.

Excluir um herói: A rota DELETE /heroes/:id permite aos usuários excluir um herói existente.

## Tecnologias Utilizadas

Node.js: Plataforma de servidor usada para construir a aplicação.

Express.js: Framework web usado para criar as rotas da aplicação.

PostgreSQL: Sistema de gerenciamento de banco de dados usado para armazenar informações sobre heróis e batalhas.

## Como Executar

1. Clone o repositório para o seu ambiente local.

2. Instale as dependências do projeto usando npm install.

3. Configure o banco de dados PostgreSQL com o nome heroes e execute o script script.sql para criar as tabelas necessárias.

4. Abra o arquivo index.js e ajuste as configurações do banco de dados conforme necessário (usuário, senha, host, porta).

5. Inicie o servidor executando npm run dev.

## Contribuições

Este projeto é voltado para fins educacionais e de aprendizado. Estamos abertos e incentivamos contribuições de todos os tipos, desde que sejam construtivas e ajudem a melhorar o projeto🌟.
