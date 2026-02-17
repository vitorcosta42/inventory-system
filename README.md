# Inventory System

![Java](https://img.shields.io/badge/Java-17-blue)
![Quarkus](https://img.shields.io/badge/Quarkus-3.30.2-purple)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

Sistema de inventário completo com **backend em Quarkus + PostgreSQL** e **frontend em Vite + Vue.js**, pronto para rodar via **Docker Compose**.

---

## Tecnologias utilizadas

- **Backend:** Quarkus, Java 17, Hibernate ORM
- **Frontend:** Vue.js, Vite, Tailwind CSS
- **Banco de dados:** PostgreSQL 15
- **Docker & Docker Compose** para orquestração de containers
- **Scripts auxiliares:** `wait-for-it.sh` para sincronizar backend com DB

---

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Estrutura do projeto

inventory-system/
├── backend/ # Backend Quarkus
│ ├── src/
│ ├── Dockerfile
│ ├── pom.xml
│ ├── wait-for-it.sh
│ └── application.properties
├── frontend/ # Frontend Vue.js
│ ├── src/
│ ├── Dockerfile
│ └── package.json
└── docker-compose.yml # Orquestração de containers

---

## Build e execução

### Build

Para construir os containers e o backend:

```bash
docker-compose down -v
docker-compose build
```

Start

Para subir todos os containers:

docker-compose up

O backend espera o PostgreSQL subir usando wait-for-it.sh.

Stop

Para parar os containers:

docker-compose down

Builds separados

Se quiser apenas rodar o backend localmente:

cd backend
mvn clean package -DskipTests -Dquarkus.package.type=uber-jar
java -jar target/\*-runner.jar

Se quiser apenas rodar o frontend localmente:

cd frontend
npm install
npm run dev

Acessando a aplicação

Frontend: http://localhost:5173

Backend (API): http://localhost:8080

Configurações importantes

As variáveis de ambiente do backend estão definidas no docker-compose.yml:

QUARKUS_DATASOURCE_URL: jdbc:postgresql://db:5432/inventory
QUARKUS_DATASOURCE_USERNAME: user
QUARKUS_DATASOURCE_PASSWORD: password

O db aqui é o nome do serviço do PostgreSQL no Docker Compose.

Scripts úteis

O backend utiliza o script wait-for-it.sh para garantir que o PostgreSQL esteja pronto antes de iniciar:

./wait-for-it.sh db:5432 -- java -jar app.jar

Observações

O banco é configurado para drop-and-create (apaga e cria tabelas a cada start).

CORS está habilitado para permitir requisições do frontend (http://localhost:5173).

Comandos Docker úteis

Listar containers ativos:

docker ps

Listar todos os containers:

docker ps -a

Remover containers parados:

docker rm $(docker ps -a -q)

Remover imagens antigas:

docker rmi <image_id>

Endpoints da API (Exemplo)

Ajuste de acordo com as rotas do seu backend

GET /products – Lista todos os produtos

POST /products – Cria um novo produto

PUT /products/{id} – Atualiza um produto

DELETE /products/{id} – Remove um produto

Exemplo de payload JSON para criar um produto:

{
"name": "Produto A",
"price": 50.0,
"quantity": 10
}

Autor

Vitor Costa
