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
> Versão 1.10.2 `stable`

- **IXC_ACCESS_TOKEN** Um token de API gerado dentro do IXC Provedor.
- **IXC_SERVER_DOMAIN** O domínio do seu servidor IXC Provedor.

```ini
IXC_ACCESS_TOKEN=conteúdo-do-token-gerado-dentro-do-ixc
IXC_SERVER_DOMAIN=www.dominio-do-seu-servidor-ixc.com.br
```

Você também poderá configurar para que o Docker carregue as variáveis, ao invés de carregá-las diretamente do arquivo `.env`, dessa forma:

```yaml
services:
  sua-aplicacao:
    build: .
    image: sua-imagem-docker
    environment:
      - IXC_ACCESS_TOKEN=${IXC_ACCESS_TOKEN}
      - IXC_SERVER_DOMAIN=${IXC_SERVER_DOMAIN}
    # Outras configurações do seu serviço
```


As classes que representarão os diferentes tipos de registros no seu **IXC Provedor**, deverão herdar da classe `IxcOrm` (nova versão), como no exemplo a seguir:

> [!NOTE]\
> Versão 1.10.2 `stable`

```typescript
import { IxcOrm } from 'ixc-orm';

class Contrato extends IxcOrm {
  constructor() {
    super('cliente_contrato');
  }
}
```


Após instanciar um objeto com o tipo que você criou (`Contrato, como no exemplo a cima`), você poderá acessar os métodos de construção da query de busca.

> [!NOTE]\
> Versão 1.10.2 `stable`

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


## Recursos da API do IXC Provedor

Existem alguns `endpoints` que a API do IXC Provedor disponibiliza, a fim de "encurtar o caminho" para chegar até algumas informações. Como por exemplo, obter o arquivo PDF de uma fatura. Para isso, você não precisará se preocupar em criar uma classe `Boleto` que herde da classe `IxcOrm`, por exemplo, nem encadear chamadas de filtros. Basta fazer como no exemplo a seguir:

```typescript
import { Recurso } from 'ixc-orm';

const id_contrato = 45852;
const response = await Recurso.desbloqueioDeConfianca({ id_contrato });
```

> Dos recursos disponibilizados pela API do **IXC Provedor**, essa biblioteca já possui as implementações de:\
> `cliente_contrato_ativar_cliente`, `cliente_contrato_btn_lib_temp_24722`, `desbloqueio_confianca`, `get_boleto` e `radusuarios_25452`.\
> Obs: Os nomes dos recursos estão de acordo com a API do **IXC Provedor** a fim de facilitar o estudo através da sua própria documentação oficial.


# Contribuições

Contribuições são sempre bem-vindas!\
Se você conhece uma maneira melhor de fazer algo, por favor, me avise!
Caso contrário, é sempre melhor fazer um PR na branch main.

At.te,\
<b>Felipe S. Carmo</b>.
