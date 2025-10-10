import Environment from './Environment';
import IxcResponse from '../IxcResponse';
import Utils from './Utils';


export default class RequestEmitter {

  declare private readonly table: string;
  declare private headers: Array<{ [key: string]: string }>;
  declare private query: BodyInit;
  declare private uri: string;

  /**
   * Método construtor da classe.
   * 
   * @param table Representa o endpoint do IXC Provedor para o qual será enviada a requisição.
   */
  protected constructor(table: string) {
    this.table = Utils.Text.normalize(table);
    this.headers = [];
    this.query = '';
    this.uri = '';
    this.loadCommonHeaders();
  }

  /**
   * Envia uma requisição HTTP para a API do IXC Provedor, para listar registros, filtrando-os pela query de busca
   * definida por **setQuery(String query)**.
   * A requisição é do tipo POST, o que define que ela irá executar uma listagem de registros é a presença do header:
   * ["ixcsoft": "listar"].
   * 
   * @returns Uma nova instância de um {@link IxcResponse}.
   */
  async GET() : Promise<IxcResponse> {
    this.setupUri();
    this.enableIxcListingHeader();
    const responseText = await this.sendRequest('POST', this.query);
    return new IxcResponse(responseText);
  }

  /**
   * Envia uma requisição HTTP para a API do IXC Provedor, para inserir um novo registro no banco de dados, na tabela
   * definida pelo prâmetro **(String table)** no construtor.
   * 
   * @returns Uma nova instância de um {@link IxcResponse}.
   */
  async POST(record: any) : Promise<IxcResponse> {
    this.setupUri();
    this.disableIxcListingHeader();
    const responseText = await this.sendRequest('POST', record);
    return new IxcResponse(responseText);
  }

  /**
   * Envia uma requisição HTTP para a API do IXC Provedor, para atualizar um ou mais campos de um registro no banco
   * de dados, na tabela definida pelo prâmetro **(String table)** no construtor.
   *
   * @param record O registro com os campos a serem atualizados no banco de dados.
   * @return Um objeto {@link IxcResponse} contento o status da requisição e uma mensagem que pode ser de sucesso ou
   *         de erro, dependendo do status.
   */
  async PUT(record: any) : Promise<IxcResponse> {
    const { id, ...rest } = record;
    this.setupUri(id);
    this.disableIxcListingHeader();
    const responseText = await this.sendRequest('PUT', rest);
    return new IxcResponse(responseText);
  }

  /**
   * Envia uma requisição HTTP para a API do IXC Provedor, para excluir um determinado registro do banco de dados.
   *
   * @param id Um {@link Integer} com o id do registro a ser removido do banco de dados do IXC Provedor.
   * @return Um objeto {@link IxcResponse}.
   */
  async DELETE(record: any) : Promise<IxcResponse> {
    const { id, ...rest } = record;
    this.setupUri(id);
    this.disableIxcListingHeader();
    const responseText = await this.sendRequest('DELETE', rest);
    return new IxcResponse(responseText);
  }

  /**
   * Obtém o valor da tabela, definida no cosntrutor.
   * 
   * @returns string
   */
  protected getTable() : string {
    return this.table;
  }

  /**
   * Define a query que será enviada no corpo de uma requisição de busca.
   * 
   * @example
   * {
   *     "qtype": "cliente",
   *     "query": "",
   *     "oper": "",
   *     "page": "1",
   *     "rg": 20,
   *     "sortname": "asc",
   *     "sortorder": "cliente.id",
   *     "grid_param": [
   *         {
   *             "TB": "cliente.razao",
   *             "OP": "L",
   *             "P": "nome do cliente (nesse caso)"
   *         }
   *     ]
   * }
   * 
   * @param query Um objeto no formato de uma query da API do IXC Provedor.
   */
  protected setupQuery(query: {[key: string]: any}) : void {
    this.query = query as BodyInit;
  }

  private loadCommonHeaders() : void {
    const encodedToken = this.getEncodedTokenFromContext();
    this.headers.push({ 'Authorization': `Basic ${encodedToken}` });
    this.headers.push({ 'Content-Type': 'application/json' });
    this.headers.push({ 'ixcsoft': '' });
  }

  private getEncodedTokenFromContext() : string {
    const token = Environment.getInstance().getToken();
    return Buffer.from(token ?? '').toString('base64')
  }

  private setupUri(id?: number) : void {
    const host = Environment.getInstance().getDomain();
    const pathId = id ? `/${id}` : '';
    this.uri = `https://${host}/webservice/v1/${this.table}${pathId}`;
  }

  private enableIxcListingHeader() : void {
    const headerIndex = this.headers.findIndex(h => Object.keys(h).includes('ixcsoft'));
    if (headerIndex > -1) {
      this.headers[headerIndex]['ixcsoft'] = 'listar';
    }
  }

  private disableIxcListingHeader() : void {
    const headerIndex = this.headers.findIndex(h => Object.keys(h).includes('ixcsoft'));
    if (headerIndex > -1) {
      this.headers[headerIndex]['ixcsoft'] = '';
    }
  }

  private async sendRequest(method: string, body?: BodyInit) : Promise<string> {
    const headers = this.createDefaultHeaders();
    try {
      const response = await fetch(this.uri, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
      });
      return await response.text();
    }
    catch (error: any) {
      return IxcResponse.createPropsWithError(error);
    }
  }

  private createDefaultHeaders() : HeadersInit {
    return this.headers.reduce((accumulator, current) => {
      Object.keys(current).forEach(currentKey => {
        if (!Object.keys(accumulator).includes(currentKey)) {
          (accumulator as any)[currentKey] = '';
        }
        (accumulator as any)[currentKey] = current[currentKey];
      });
      return accumulator;
    }, {} as HeadersInit)
  }
}
