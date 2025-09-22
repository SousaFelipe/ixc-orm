# IXC-ORM [![npm](https://img.shields.io/npm/dt/ixc-orm.svg)](https://www.npmjs.com/package/ixc-orm)

Este ORM visa facilitar o consumo de dados da API oficial do [IXC Provedor](https://ixcsoft.com/ixc-provedor).\
Esta biblioteca não faz parte das bibliotecas oficiais da [IXCsoft](https://ixcsoft.com/) e foi desenvolvida de forma independente e sem fins lucrativos.



## Instalação

```bash
npm install ixc-orm
```
ou
```bash
yarn add ixc-orm
```



## Usando a biblioteca

> As classes que representarão as tabelas dentro do banco de dados do seu servidor IXC, deverão herdar da classe `IXCClient`, como no exemplo a seguir:

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
  .get()
```

Ou quando você já possui o ID do registro que procura, a opção mais simples será utilizar o método `find()`. Este método também está implementado na classe `IXCClient`

```typescript
const contrato = new Contrato();

const id_contrato = 4574;

const contratos = await contrato.find(id_contrato)
```



## Recursos da API do IXC Provedor

Existem alguns `endpoints` que a API do IXC disponibiliza, a fim de "encurtar o caminho" para chegar até algumas informações. Como por exemplo, obter o arquivo PDF de uma fatura.\
Você não precisará se preocupar em criar uma classe `Boleto` que herde da classe `IXCClient`, por exemplo,\
nem encadear chamadas `where`. Basta seguir o exemplo abaixo:

```typescript
import { Recurso } from 'ixc-orm';

const id_contrato = 45852;

const response = await Recurso.desbloqueioDeConfianca(id_contrato);
```

> Dos recursos disponibilizados pela API do **IXC Provedor**, esta biblioteca já implementou os seguintes recursos:\
> `get_boleto`, `desbloqueio_confianca` e `cliente_contrato_btn_lib_temp_24722`.\
> Obs: Os nomes dos recursos estão de acordo com a API do **IXC Provedor** a fim de facilitar o estudo de sua documentação oficial.



## Variáveis de Ambiente

Para configurar a comunicação da biblioteca com seu servidor IXC, é necessário adicionar as seguintes variáveis de ambiente a um arquivo `.env`, que esteja localizado no diretório raiz do seu projeto.

> **IXC_HOST** A url do seu servidor IXC\
> **IXC_TOKEN** Um token de API gerado dentro do próprio **IXC Provedor**

```ini
IXC_HOST="https://dominiodoservidorixc.com.br/webservice/v1"
IXC_TOKEN="8:k4n8wk1946j7mimthei869cq1zz2u940f2gqobqg081y2oefl80mzhtq2wud3gqp"
```
