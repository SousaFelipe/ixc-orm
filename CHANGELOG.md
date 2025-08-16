# 🔄 CHANGELOG
- [v1.5.0 - 16 de agosto de 2025](#v150)
- [v1.4.4 - 15 de agosto de 2025](#v144)
- [v1.4.3 - 15 de agosto de 2025](#v143)
- [v1.4.1 - 14 de agosto de 2025](#v141)

## 🚀 Novidades

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