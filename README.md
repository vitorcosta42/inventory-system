<<<<<<< HEAD

#  📦 StockFlow
=======
# 📦 StockFlow
>>>>>>> 7f4d3fb (fix: production post fix)

![Java](https://img.shields.io/badge/Java-17-blue)
![Quarkus](https://img.shields.io/badge/Quarkus-3.30.2-purple)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

Sistema de inventário completo com **backend em Quarkus + PostgreSQL** e **frontend em React + Redux**, pronto para rodar via **Docker Compose**.

---

## Tecnologias utilizadas

- **Backend:** Quarkus, Java 17
<<<<<<< HEAD
- **Frontend:** React, Redux, Tailwind CSS  
- **Banco de dados:** PostgreSQL 15
- **Docker & Docker Compose** para orquestração de containers  
- **Scripts auxiliares:** `wait-for-it.sh` para sincronizar backend com o banco de dados  
=======
- **Frontend:** React, Redux, Tailwind CSS
- **Banco de dados:** PostgreSQL 15
- **Docker & Docker Compose** para orquestração de containers
- **Scripts auxiliares:** `wait-for-it.sh` para sincronizar backend com o banco de dados
>>>>>>> 7f4d3fb (fix: production post fix)

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

<<<<<<< HEAD
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)  
- [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (para rodar localmente sem Docker)  
- [Node.js & npm](https://nodejs.org/) (para rodar o frontend localmente)  
=======
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (para rodar localmente sem Docker)
- [Node.js & npm](https://nodejs.org/) (para rodar o frontend localmente)
>>>>>>> 7f4d3fb (fix: production post fix)

---

## Estrutura do projeto

```

inventory-system/
├── backend/          # Backend Quarkus
│   ├── src/
│   ├── Dockerfile
│   ├── pom.xml
│   ├── wait-for-it.sh
├── frontend/         # Frontend React.js
│   ├── src/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml # Orquestração de containers

<<<<<<< HEAD
````
=======
```
>>>>>>> 7f4d3fb (fix: production post fix)

---

## Como rodar

### 1. Com Docker Compose

**Build dos containers:**

```bash
docker-compose down -v
docker-compose build
````

**Subir os containers:**

```bash
docker-compose up
```

<<<<<<< HEAD
=======
**Subir os containers:**

```bash
docker-compose up
```

>>>>>>> 7f4d3fb (fix: production post fix)
> O backend espera o PostgreSQL subir usando `wait-for-it.sh`.

**Parar os containers:**

```bash
docker-compose down
```

---

### 2. Rodando separadamente

**Backend local:**

```bash
cd backend
mvn clean package -DskipTests -Dquarkus.package.type=uber-jar
java -jar target/*-runner.jar
```

**Frontend local:**

```bash
cd frontend
npm install
npm run dev
```

---

## Acessando a aplicação

<<<<<<< HEAD
* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend (API):** [http://localhost:8080](http://localhost:8080)
=======
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend (API):** [http://localhost:8080](http://localhost:8080)
>>>>>>> 7f4d3fb (fix: production post fix)

---

## Configurações importantes

No `docker-compose.yml`, as variáveis do backend estão definidas assim:

```env
QUARKUS_DATASOURCE_URL=jdbc:postgresql://db:5432/inventory
QUARKUS_DATASOURCE_USERNAME=user
QUARKUS_DATASOURCE_PASSWORD=password
```

> `db` é o nome do serviço do PostgreSQL no Docker Compose.

O backend utiliza o script `wait-for-it.sh` para garantir que o PostgreSQL esteja pronto antes de iniciar:

```bash
./wait-for-it.sh db:5432 -- java -jar app.jar
```

---

## Banco de dados

<<<<<<< HEAD
* O banco está configurado para **drop-and-create**, apagando e criando tabelas a cada start.
* CORS habilitado para permitir requisições do frontend ([http://localhost:5173](http://localhost:5173)).
=======
- O banco está configurado para **drop-and-create**, apagando e criando tabelas a cada start.
- CORS habilitado para permitir requisições do frontend ([http://localhost:5173](http://localhost:5173)).
>>>>>>> 7f4d3fb (fix: production post fix)

---

## Comandos Docker úteis

<<<<<<< HEAD
* **Listar containers ativos:**
=======
- **Listar containers ativos:**
>>>>>>> 7f4d3fb (fix: production post fix)

```bash
docker ps
```

<<<<<<< HEAD
* **Listar todos os containers:**
=======
- **Listar todos os containers:**
>>>>>>> 7f4d3fb (fix: production post fix)

```bash
docker ps -a
```

<<<<<<< HEAD
* **Remover containers parados:**
=======
- **Remover containers parados:**
>>>>>>> 7f4d3fb (fix: production post fix)

```bash
docker rm $(docker ps -a -q)
```

<<<<<<< HEAD
* **Remover imagens antigas:**
=======
- **Remover imagens antigas:**
>>>>>>> 7f4d3fb (fix: production post fix)

```bash
docker rmi <image_id>
```

---

## Endpoints da API (exemplos)

| Método | Endpoint       | Descrição               |
| ------ | -------------- | ----------------------- |
| GET    | /products      | Lista todos os produtos |
| POST   | /products      | Cria um novo produto    |
| PUT    | /products/{id} | Atualiza um produto     |
| DELETE | /products/{id} | Remove um produto       |

**Exemplo de payload JSON para criar um produto:**

```json
{
  "name": "Produto A",
  "price": 50.0,
  "quantity": 10
}
```
<<<<<<< HEAD

## 🧪 Testes

### Backend (Quarkus)

O backend possui testes unitários e de integração que podem ser executados com Maven.

**Rodar todos os testes:**

```bash
cd backend
mvn test
````

> Observação: Certifique-se de que o banco de dados de teste esteja configurado corretamente no `application.properties`.

---

### Frontend (React)

O frontend utiliza **Vitest** para testes unitários e **Cypress** para testes end-to-end (E2E).

**Rodar testes unitários com Vitest:**

```bash
cd frontend
npm install
npm run test
```

> Isso executará todos os testes unitários e exibirá o resultado no terminal.

**Rodar testes E2E com Cypress:**

```bash
cd frontend
npm run cypress:open
```

> Isso abrirá a interface interativa do Cypress, onde você pode executar testes manualmente ou todos de forma automatizada.


## Observações

* Frontend e backend podem ser rodados **simultaneamente via Docker** ou **separadamente para desenvolvimento local**.
* Ajuste os endpoints conforme suas necessidades.
* Projeto feito para um teste técnico.



=======

## 🧪 Testes

### Backend (Quarkus)

O backend possui testes unitários e de integração que podem ser executados com Maven.

**Rodar todos os testes:**

```bash
cd backend
mvn test
```

> Observação: Certifique-se de que o banco de dados de teste esteja configurado corretamente no `application.properties`.

---

### Frontend (React)

O frontend utiliza **Vitest** para testes unitários e **Cypress** para testes end-to-end (E2E).

**Rodar testes unitários com Vitest:**

```bash
cd frontend
npm install
npm run test
```

> Isso executará todos os testes unitários e exibirá o resultado no terminal.

**Rodar testes E2E com Cypress:**

```bash
cd frontend
npm run cypress:open
```

> Isso abrirá a interface interativa do Cypress, onde você pode executar testes manualmente ou todos de forma automatizada.

## Observações

- Frontend e backend podem ser rodados **simultaneamente via Docker** ou **separadamente para desenvolvimento local**.
- Ajuste os endpoints conforme suas necessidades.
- Projeto feito para um teste técnico.
>>>>>>> 7f4d3fb (fix: production post fix)
