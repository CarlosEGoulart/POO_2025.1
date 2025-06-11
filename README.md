# POO_2025.1

Este repositório contém os arquivos e exemplos das aulas de Programação Orientada a Objetos (POO) de 2025.1. O objetivo é fornecer um diretório de fácil acesso para os alunos acompanharem o conteúdo e testarem os exemplos em diferentes ambientes.

## Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias:

- **TypeScript**: Linguagem de programação principal.
- **Node.js**: Ambiente de execução para o TypeScript.
- **TypeORM**: ORM (Object-Relational Mapper) para interação com o banco de dados.
- **MySQL2/PG**: Drivers para conexão com bancos de dados MySQL e PostgreSQL.
- **Jest**: Framework de testes para garantir a qualidade do código.
- **Readline-Sync**: Para interações síncronas via linha de comando.

## Estrutura do Projeto

A estrutura do projeto segue a organização de um aplicativo TypeScript com foco em POO e persistência de dados:

```
.idx/
dist/ (arquivos compilados)
node_modules/
src/
├── Tests/ (testes unitários)
├── controller/ (camada de controle)
├── db/ (configurações de banco de dados)
├── model/ (modelos de dados e lógica de negócio)
├── view/ (camada de visualização/interface)
├── data-source.ts (configuração do TypeORM)
└── index.ts (ponto de entrada da aplicação)
.gitignore
README.md
jest.config.js
package-lock.json
package.json
tsconfig.json
```

## Como Configurar e Rodar o Projeto

Para configurar e rodar este projeto em seu ambiente local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/CarlosEGoulart/POO_2025.1.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd POO_2025.1
   ```
3. Instale as dependências:
   ```bash
   npm install
   # ou yarn install
   ```

### Configuração do Banco de Dados

O projeto utiliza TypeORM para gerenciar o banco de dados. Você precisará configurar o `data-source.ts` (localizado em `src/data-source.ts`) com suas credenciais de banco de dados (MySQL ou PostgreSQL).

Exemplo de configuração (ajuste conforme seu banco de dados):

```typescript
// src/data-source.ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql", // ou "postgres"
    host: "localhost",
    port: 3306, // ou 5432 para PostgreSQL
    username: "seu_usuario",
    password: "sua_senha",
    database: "seu_banco_de_dados",
    synchronize: true, // CUIDADO: Usar apenas em desenvolvimento
    logging: false,
    entities: [__dirname + "/model/**/*.ts"],
    migrations: [],
    subscribers: [],
});
```

### Rodando a Aplicação

Para compilar e iniciar a aplicação:

```bash
npm run build
npm start
```

### Rodando os Testes

Para executar os testes unitários:

```bash
npm test
```

