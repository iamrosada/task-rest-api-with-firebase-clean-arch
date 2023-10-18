# Aplicação de Gerenciamento de Tarefas

Este é um repositório contendo o código para uma aplicação de gerenciamento de tarefas. O projeto é dividido em duas partes: o front-end e o back-end, cada um com suas respectivas responsabilidades e interfaces.

## Front-End (Task-Front)

O front-end desta aplicação é construído com React.js e Material UI. Ele fornece uma interface amigável para os usuários gerenciarem suas tarefas. Abaixo estão as interfaces do repositório que são relevantes para o front-end:

### AuthRepository

- `signInWithGoogle()`: Realiza login com a autenticação do Google.
- `logInWithEmailAndPassword(auth)`: Realiza login com as credenciais de e-mail e senha.
- `registerWithEmailAndPassword(auth)`: Registra um novo usuário com as credenciais de e-mail e senha.
- `sendPasswordReset(email)`: Envia um e-mail de redefinição de senha.
- `logout()`: Desconecta o usuário.

### TaskRepository

- `create(task)`: Cria uma nova tarefa.
- `delete(taskId)`: Exclui uma tarefa existente.
- `update(taskId, task)`: Atualiza os detalhes de uma tarefa.
- `list(page, itemsPerPage, startAfterDockage)`: Lista as tarefas paginadas com filtros.

### Como Executar o Front-End

Para executar o front-end da aplicação, siga estas etapas:

1. Navegue até a pasta `task-front`.
2. Instale as dependências do projeto: `npm install`.
3. Inicie o servidor de desenvolvimento: `npm start`.

O front-end estará acessível em [http://localhost:3000](http://localhost:3000).

## Back-End (Task-BackEnd)

O back-end desta aplicação é desenvolvido com Node.js, TypeScript, Banco de Dados Acebase e Express. Ele lida com o armazenamento de tarefas no banco de dados e fornece endpoints para o front-end interagir. As interfaces relevantes para o back-end são as mesmas mencionadas acima: `AuthRepository` e `TaskRepository`.

### Como Executar o Back-End

Para executar o back-end da aplicação, siga estas etapas:

1. Navegue até a pasta `task-backend`.
2. Instale as dependências do projeto: `npm install`.
3. Inicie o servidor back-end: `npm start`.

O back-end estará acessível em [http://localhost:8080](http://localhost:8080).

Certifique-se de configurar corretamente o ambiente, como as variáveis de ambiente necessárias, antes de iniciar o servidor.

## Utilização do Docker Compose

Este projeto utiliza o Docker Compose para facilitar a execução do ambiente de desenvolvimento. O Docker Compose permite que você inicie tanto o front-end quanto o back-end em contêineres isolados. Certifique-se de que você tenha o Docker e o Docker Compose instalados em seu sistema.

### Como Executar o Projeto com Docker Compose

1. Navegue até a raiz do projeto onde o arquivo `docker-compose.yml` está localizado.

2. Execute o seguinte comando para iniciar os contêineres:
docker-compose up


Isso iniciará os contêineres para o front-end e o back-end em um ambiente Docker isolado.

3. Acesse o front-end em [http://localhost:3000](http://localhost:3000) e o back-end em [http://localhost:8080](http://localhost:8080).

Lembre-se de configurar as variáveis de ambiente necessárias no arquivo `docker-compose.yml`, se aplicável.


## Utilização do Firebase

Este projeto utiliza o Firebase como plataforma de autenticação e armazenamento de dados. Certifique-se de configurar o Firebase corretamente antes de iniciar o projeto.

### Configuração do Firebase

Para configurar o Firebase, siga estas etapas:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/).

2. Obtenha as credenciais do projeto (apiKey, authDomain, etc.) e coloque-as em um arquivo de configuração (por exemplo, `firebase-config.ts`, `serviceAccountKey.json`, `firebase.ts`).

3. Configure as variáveis de ambiente necessárias no front-end e no back-end com as informações do Firebase.

### Como Executar o Projeto com Firebase

Com o Firebase configurado, você pode executar o projeto com os seguintes passos:

- Front-End: Siga as etapas mencionadas anteriormente para executar o front-end, que se comunicará com o Firebase para autenticação e armazenamento de dados.

- Back-End: O back-end também pode ser configurado para se comunicar com o Firebase para armazenamento de dados. Certifique-se de configurar as credenciais do Firebase no back-end.


## Requisitos Opcionais


...

## Contribuição

...

## Licença

Este projeto é distribuído sob a Licença MIT. Consulte o arquivo LICENSE para obter detalhes.

---

Obrigado por escolher nossa aplicação de gerenciamento de tarefas. Esperamos que este projeto seja útil e atenda às suas necessidades de gerenciamento de tarefas.
