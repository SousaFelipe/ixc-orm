# 🔄 CHANGELOG
- [v2.0.1 - 07 de fevereiro de 2026](#v201)
- [v2.0.0 - 24 de dezembro de 2025](#v200)
- [v1.10.6 - 23 de dezembro de 2025](#v1106)
- [v1.10.5 - 20 de dezembro de 2025](#v1105)
- [v1.10.4 - 20 de novembro de 2025](#v1104)
- [v1.9.0 - 09 de outubro de 2025](#v190)
- [v1.8.0 - 18 de outubro de 2025](#v180)
- [v1.7.1 - 18 de outubro de 2025](#v171)
- [v1.7.0 - 10 de outubro de 2025](#v170)
- [v1.6.0 - 16 de agosto de 2025](#v150)
- [v1.5.0 - 16 de agosto de 2025](#v150)
- [v1.4.4 - 15 de agosto de 2025](#v144)
- [v1.4.3 - 15 de agosto de 2025](#v143)
- [v1.4.1 - 14 de agosto de 2025](#v141)


## 🚀 Novidades

### v2.0.1
* **Correção:** Importação do enum *Sort* adicionanda ao `index` da api.

### v2.0.0
* **Melhoria:** Adicionada verificação de erros nas respostas dos recursos. Todas as requisiões passaram a ser realizadas pela classe <a href="https://github.com/SousaFelipe/ixcorm/blob/builders/src/api/RequestEmitter.ts">RequestEmitter</a>, que utiliza a FetchAPI, por este motivo a dependência da biblioteca Axios foi removida completamente do projeto.

### v1.10.6
* **Correção:** Removido o bug que ocorria ao tentar utilizar o recurso `liberacaoTemporaria({ id_contrato })` sem que as antigas variáveis de ambiente estivessem definidas.

### v1.10.5
* **Correção:** Removida a utilização da biblioteca nativa DOMParser, que quebrava ao tentar extrair a mensagem de erro de uma resposta do IXC Provedor.

### v1.10.4
* **Melhoria:** O recurso `Recurso.getArquivoBoleto()`, que obtém um arquivo PDF de um boleto, passou a utilizar o 'RequestEmitter' da API para executar a requisição. A resposta desse recurso será uma Promise contendo a instância de um objeto do tipo <a href="https://github.com/SousaFelipe/ixc-orm/blob/main/src/IxcResponse.ts">IxcResponse</a>.

### v1.9.0
* **Melhoria:** Novo recurso para remoção de MAC de um PPPoE, através do recurso `radusuarios_25452`, que é disponibilizado pela própria API do IXC Provedor. Para utilizar o recurso, invocar o método assícrono `Recurso.limparMAC({ id_login: number });`. O método irá retornar a instância de um <a href="https://github.com/SousaFelipe/ixc-orm/blob/main/src/IxcResponse.ts">IxcResponse</a>.

### v1.8.0
* **Melhoria:** O processo de carregamento do ambiente consegue detectar se as variáveis já foram carregas por um container Docker e interrompe o carregamento através do `.env`, evitando que a aplicação encerre o processo com erro..
* **Correção:** Corrigida incompatibilidade com o cache do `pnpm`. Ao tentar carregar as variáveis diretamente do arquivo `.env`, o ambiente buscará o arquivo de forma recursiva, para conseguir encontrá-lo mesmo quando a biblioteca interpretar a pasta `node_modules` como root. (ocorre em alguns cenários muito específicos, apenas com o `pnpm`), evitando que o processo seja encerrado com erro.

### v1.7.1
* **Melhoria:** Adicionado o método `fail()` à classe <a href="https://github.com/SousaFelipe/ixc-orm/blob/main/src/IxcResponse.ts">IxcResponse</a>, para verificar se o IXC Provedor retornou uma resposta com erro.

### v1.7.0
* **Atualização:** Novas classes adiconadas, para simplificar a manipulação dos filtros de busca e das respostas da API do **IXC Provedor**.
* A nova classe <a href="https://github.com/SousaFelipe/ixc-orm/blob/builders/src/IxcOrm.ts">IxcOrm</a> pode substituir a classe `IXCCliente` e fornece uma maneira mais dinâmica de construir a query de busca, através dos métodos `where()`, `like()`, `exactly()`, `lessThan()`, `lessThanEquals()`, `greaterThan()` e `greaterThanEquals()`.
* Toda a lógica de manipulação das requisições HTTP foi movida para a nova classe <a href="https://github.com/SousaFelipe/ixc-orm/blob/builders/src/api/RequestEmitter.ts">RequestEmitter</a>, deixando a classe <a href="https://github.com/SousaFelipe/ixc-orm/blob/builders/src/IxcOrm.ts">IxcOrm</a> apenas com a lógica de manipulação da query de busca.
* Os dados da resposta recebida da API do IXC Provedor agora estão todos concentrados na classe <a href="https://github.com/SousaFelipe/ixc-orm/blob/builders/src/IxcResponse.ts">IxcResponse</a>, quando instanciada pelos métodos `GET()`, `POST()`, `PUT()` e `DELETE()`, da classe <a href="https://github.com/SousaFelipe/ixc-orm/blob/builders/src/api/RequestEmitter.ts">RequestEmitter</a>.
* A classe <a href="https://github.com/SousaFelipe/ixc-orm/blob/builders/src/IxcOrm.ts">IxcOrm</a> é uma subclasse de <a href="https://github.com/SousaFelipe/ixcorm/blob/builders/src/api/RequestEmitter.ts">RequestEmitter</a>.

### v1.6.0
* **Melhoria**: Métodos específicos para chamadas de recursos da API do **IXC Provedor**
* `desbloqueioDeConfianca()`: Envia uma requisição para o recurso de desbloqueio de confiança de um contrato.
* `liberacaoTemporaria()`: Envia uma requisição para o recurso de liberação temporária de um contrato.
* `getArquivoBoleto()`: Recupera o arquivo de uma fatura, no formato PDF, codificado em <a href="https://en.wikipedia.org/wiki/Base64">Base64</a>.

### v1.5.0
* **Melhoria:** A chamada de recursos da API agora pode ser feita de forma mais simplificada, através da função `RecursoIXC`:
* Basta importar assim: `import { RecursoIXC } from 'ixc-orm'`;
* E chamar assim: `await RecursoIXC('get_boleto', { id_fatura: 25484 })`.

### v1.4.4
* **Melhoria:** Foi adicionado um método `find()` a classe `IXCClient`, para encontrar um registro pelo seu `id` de uma forma mais simplificada.

### v1.4.3
* **Melhoria:** Os métodos `get()`, `post()` e `put()` da classe `IXCClient`, a partir de agora sempre retornarão um objeto `IXCResponse`, indepedente da requisição falhar ou não.

### v1.4.1
* **Correção:** Resolvido o bug de leitura das variáveis de ambiente no arquivo .env da pasta raiz do projeto.
* **Melhoria:** Foram adicionados 3 dos 44 recursos da API do IXC: `get_boleto`, `liberacao_temporaria` e `desbloqueio_confianca`. (Futuramente novos recursos serão adicionados)

> Consulte todos os recursos disponíveis: [Doc. API IXCSoft](https://wikiapiprovedor.ixcsoft.com.br/)
