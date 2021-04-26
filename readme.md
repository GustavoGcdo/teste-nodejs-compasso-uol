# Teste vaga Node.js - Compasso + UOL

Api REST feita em Node.js utilizando conceitos de SOLID, Clean Code, Clean Architechure e Validações de Dominio.

## Intalação

Utilize o gerenciador de dependencias **npm** ou **yarn** para instalar as dependencias.

`npm install ` ou `yarn install`

## Utilização

1. Antes de rodar a aplicação certifique as variáveis de ambiente ( crie um arquivo `.env` na raiz do projeto ou configure no ambiente) com as seguintes variáveis: `PORT` ou `MONGODB_URL`

Exemplo em  `.env.example` 
<br/>

2. Para rodar a aplicação em desenvolvimento utilize:

```bash
yarn dev
```

## Testes

Para rodar os testes de unidade:
```bash
yarn test:unit
```

## Rotas
[GET] `/cities` - Busca as cidades cadastradas (filtro via **queryParams**: `name, state`)

[GET] `/clients` - Busca os clientes cadastrados (filtro via **queryParams**: `name, id`)

[POST] `/cities` - Cadastro de Cidade ( name, state )

[POST] `/clients` - Cadastro de Clientes (completeName, birthdate, cityId, gender )

[PATH] `/clients/{id}` - Atualização de um Cliente 

[DELETE] `/clients/{id}` - Remoção de um Cliente 


#
Author: Gustavo C. Oliveira

