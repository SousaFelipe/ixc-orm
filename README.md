# IXC-ORM

Este ORM simples, visa facilitar o consumo de dados da API oficial do IXCsoft.\
Esta biblioteca não faz parte das bibliotecas oficiais da IXCsoft e foi desenvolvida de forma independente e sem fins lucrativos.


## Instalação
```bash
npm install ixc-orm
```
ou
```bash
yarn add ixc-orm
```


## Usando a biblioteca

> As classes que representarão as tabelas dentro do banco de dados do seu servidor IXC, deverão herdar da classe `IXCClient`.

```typescript
import { IXCClient } 'ixc-orm';

class Contrato extends IXCClient {
  
  constructor() {
    super('cliente_contrato');
  }
}
```

> Após instanciar um objeto com o tipo que você criou (`Contrato, como no exemplo a cima`), você poderá acessar os métodos `where`, `orderBy`, `get`, `post` e `put`.

```typescript
const contrato = new Contrato();

const contratos = await contrato
  .where(['id_cliente', 240])
  .where(['data_ativacao', '>=', '2024-09-24 00:45:00'])
  .orderBy('data_ativacao', 'desc')
  .get();
```


## Variáveis de Ambiente

Para configurar a comunicação da biblioteca com seu servidor IXC, é necessário adicionar as seguintes variáveis de ambiente a um arquivo `.env`, que esteja localizado no diretório raiz do seu projeto.

`IXC_HOST`

`IXC_TOKEN`

> **IXC_HOST** deve conter a url do seu servidor IXC, no formato: `https://seudominio.com.br/webservice/v1`\
> **IXC_TOKEN** deve conter um token de API gerado dentro do seu sistema IXCsoft.
