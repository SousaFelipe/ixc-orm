# 🔄 CHANGELOG
- [v1.7.0 - 10 de outubro de 2025](#v170)
- [v1.6.0 - 16 de agosto de 2025](#v150)
- [v1.5.0 - 16 de agosto de 2025](#v150)
- [v1.4.4 - 15 de agosto de 2025](#v144)
- [v1.4.3 - 15 de agosto de 2025](#v143)
- [v1.4.1 - 14 de agosto de 2025](#v141)

## 🚀 Novidades

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
