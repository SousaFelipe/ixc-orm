<div align="center">
  
# IXC-ORM

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
[![npm](https://img.shields.io/npm/dt/ixc-orm.svg?style=for-the-badge)](https://www.npmjs.com/package/ixc-orm)
![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=for-the-badge)
![NPM Version](https://img.shields.io/npm/v/ixc-orm?style=for-the-badge)

Esse ORM foi criado com o intuito de facilitar o consumo de dados da API oficial do [IXC Provedor](https://ixcsoft.com/ixc-provedor).\
Essa biblioteca não faz parte das bibliotecas oficiais da [IXCsoft](https://ixcsoft.com/) e foi desenvolvida de forma independente e sem fins lucrativos.

</div>


## Download

```bash
npm install ixc-orm
```

```bash
pnpm add ixc-orm
```

```bash
yarn add ixc-orm
```


## Como utilizar

Para configurar a comunicação da biblioteca com seu servidor IXC Provedor, é necessário adicionar as seguintes variáveis de ambiente a um arquivo `.env`, que esteja localizado no diretório raiz do seu projeto.

> [!NOTE]\
> Versão 1.7.1 `stable`

- **IXC_ACCESS_TOKEN** Um token de API gerado dentro do IXC Provedor.
- **IXC_SERVER_DOMAIN** O domínio do seu servidor IXC Provedor.

```ini
IXC_ACCESS_TOKEN=conteúdo-do-token-gerado-dentro-do-ixc
IXC_SERVER_DOMAIN=www.dominio-do-seu-servidor-ixc.com.br
```


> Versão 1.6.0 ou anterior:

- **IXC_HOST** A url do seu servidor IXC Provedor.
- **IXC_TOKEN** Um token de API gerado dentro do IXC Provedor.

```ini
IXC_HOST="https://dominiodoservidorixc.com.br/webservice/v1"
IXC_TOKEN="8:k4n8wk1946j7mimthei869cq1zz2u940f2gqobqg081y2oefl80mzhtq2wud3gqp"
```

As classes que representarão os diferentes tipos de registros no seu **IXC Provedor**, deverão herdar da classe `IxcOrm` (nova versão), como no exemplo a seguir:

> [!NOTE]\
> Versão 1.7.1 `stable`

```typescript
import { IxcOrm } from 'ixc-orm';

class Contrato extends IxcOrm {
  constructor() {
    super('cliente_contrato');
  }
}
```

> Versão 1.6.0 ou anterior

```typescript
import { IXCClient } 'ixc-orm';

class Contrato extends IXCClient {
  constructor() {
    super('cliente_contrato');
  }
}
```

Após instanciar um objeto com o tipo que você criou (`Contrato, como no exemplo a cima`), você poderá acessar os métodos de construção da query de busca.

> [!NOTE]\
> Versão 1.7.1 `stable`

```typescript
import { IxcResponse, Sort } from 'ixc-orm';

const contrato = new Contrato();

IxcResponse response = await contrato
  .where('data_ativacao')
  .greaterThanEquals('2024-09-24')
  .orderBy('data_ativacao', Sort.DESC)
  .GET();

const contratos = response.registros(); 
```

> Versão 1.6.0 ou anterior

```typescript
const contrato = new Contrato();

const contratos = await contrato
  .where(['id_cliente', 240])
  .where(['data_ativacao', '>=', '2024-09-24 00:45:00'])
  .orderBy('data_ativacao', 'desc')
  .get()
```

Ou quando você já possui o ID do registro que procura, a opção mais simples será utilizar o método `find()`. Este método também está implementado na classe `IXCClient`

> [!NOTE]
> Método disponível apenas para as subclasses de `IXCClient`.

```typescript
const contrato = new Contrato();

const id_contrato = 4574;

const contratos = await contrato.find(id_contrato)
```


## Recursos da API do IXC Provedor

Existem alguns `endpoints` que a API do IXC disponibiliza, a fim de "encurtar o caminho" para chegar até algumas informações. Como por exemplo, obter o arquivo PDF de uma fatura.\
Para isso, você não precisará se preocupar em criar uma classe `Boleto` que herde da classe `IxcOrm`, por exemplo,\
nem encadear chamadas de filtros. Basta fazer como no exemplo a seguir:

```typescript
import { Recurso } from 'ixc-orm';

const id_contrato = 45852;

const response = await Recurso.desbloqueioDeConfianca(id_contrato);
```

> Dos recursos disponibilizados pela API do **IXC Provedor**, essa biblioteca já implementou:\
> `get_boleto`, `desbloqueio_confianca` e `cliente_contrato_btn_lib_temp_24722`.\
> Obs: Os nomes dos recursos estão de acordo com a API do **IXC Provedor** a fim de facilitar o estudo através da sua documentação oficial.


# Contribuições

Contribuições são sempre bem-vindas!\
Se você conhece uma maneira melhor de fazer algo, por favor, me avise!
Caso contrário, é sempre melhor fazer um PR na branch main.

At.te,\
<b>Felipe S. Carmo</b>.
