import { createAxiosInstance, createRequestPayload } from './request';
import { IXCOperator, IXCOptions, IXCQuery, IXCResponse, IXCSortOrder } from './types';
import { createResponse } from './response';



export default abstract class IXCClient {


  protected table: string;
  protected params: IXCQuery[];
  protected options: IXCOptions;


  /**
   * @param table O nome da tabela correspondente ao banco de dados do seu servidor IXC
   * @see {@link https://wikiapiprovedor.ixcsoft.com.br/index.php}
   */
  constructor(table: string) {

    this.table = table;
    this.params = [];

    this.options = {
      page: 1,
      rowsPerPage: 20,
      sortName: 'id',
      sortOrder: 'asc'
    };
  }


  /**
   * Incrementa o array de parâmetros que serão trasformados no corpo de uma requisição
   * e passados como filtro grid da API do IXC
   * 
   * @param whereClauses Um array de strings, no formato [coluna, operador, valor]\
   * `Obs`: se você passar um array no formato [coluna, valor] o operador será considerado como '='\
   * Os operadores válidos são: =, !=, >, <, >=, <=, LIKE
   * @returns A própria instância
   */
  where(whereClauses: string[]) : IXCClient {

    if (whereClauses.length > 3) {
      throw new Error(
        `> As cláusulas não podem conter mais de 3 elementos.`
      );
    }
    
    const [
      alwaysColumn,
      operatorOrValue,
      valueOrUndefined
    ] = whereClauses;

    const availableOperators = Object.keys(IXCOperator);

    if (whereClauses.length > 2 && !availableOperators.includes(operatorOrValue)) {
      throw new Error(
        `> O operador ${ operatorOrValue }, não faz parte dos operadores válidos: ${ availableOperators }.`
      );
    }

    this.params.push({
      TB: alwaysColumn,
      OP: valueOrUndefined ? operatorOrValue : '=',
      P: valueOrUndefined ? valueOrUndefined : operatorOrValue
    });

    return this;
  }


  /**
   * Define como a API do IXC ordenará os dados retornados
   * 
   * @param column A coluna que será usada para ordenar a busca
   * @param order A ordem da busca ('asc'ou 'desc')
   * @returns A própria instância
   */
  orderBy(column: string, order: keyof typeof IXCSortOrder) : IXCClient {
    this.options.sortName = column;
    this.options.sortOrder = order;
    return this;
  }


  /**
   * Envia uma requisição GET para a API do IXC, com o header `ixcsoft` definico como `listar`\
   * A `query` dessa requisição não será enviada para o IXC com o parâmetro `grid_param`\
   * Ou seja, esta requisição executa uma busca simples, em vez do filtro de grid
   * 
   * @param id O identificador numérico do registro que será buscado no IXC
   * @returns Promise<IXCResponse> 
   */
  async find(id: any) {

    const params = {
      TB: 'id',
      OP: '=',
      P: id
    };

    const opts = {
      page: 1,
      rowsPerPage: 1,
    };

    const axios = createAxiosInstance('GET');
    const data = createRequestPayload(this.table, params, opts);
    
    try {
      const response = await axios.get<IXCResponse>(this.table, { data });

      if (response.status === 200) {
        return response.data;
      }

      return createResponse({
        error: true,
        message: response.data?.message
      });
    }
    catch (error: any) {
      console.error(error);
      return createResponse({
        error: true,
        message: error.response?.statusText || error.message || 'Erro desconhecido'
      });
    }
    finally {
      this.params = [];
      this.options = {
        page: 1,
        rowsPerPage: 20,
        sortName: 'id',
        sortOrder: 'asc'
      };
    }
  }


  /**
   * Envia uma requisição GET para a API do IXC, com o header `ixcsoft` definico como `listar`
   * Preenche o corpo da requisição com os dados passados pela função `where` no formado JSON
   * 
   * @param pg O número da página que será solicitada ao IXC `padão = 1`
   * @param rows A quantidade de linhas (registros) por página `padrão = 20`
   * @returns Promise<IXCResponse>
   */
  async get(pg?: number, rows?: number) : Promise<IXCResponse> {
    const { page, rowsPerPage, ...rest } = this.options;

    const opts = {
      page: pg ?? page,
      rowsPerPage: rows ?? rowsPerPage,
      ...rest
    };

    const axios = createAxiosInstance('GET');
    const data = createRequestPayload(this.table, this.params, opts);
    
    try {
      const response = await axios.get<IXCResponse>(this.table, { data });

      if (response.status === 200) {
        return response.data;
      }

      return createResponse({
        error: true,
        message: response.data?.message
      });
    }
    catch (error: any) {
      console.error(error);
      return createResponse({
        error: true,
        message: error.response?.statusText || error.message || 'Erro desconhecido'
      });
    }
    finally {
      this.params = [];
      this.options = {
        page: 1,
        rowsPerPage: 20,
        sortName: 'id',
        sortOrder: 'asc'
      };
    }
  }


  /**
   * Envia uma requisição do tipo `POST` para a API do IXC, com o header `ixcsoft` vazio
   * 
   * @param body Um objeto no formado "chave: valor" contendo as informações do novo registro
   * a ser inserido no banco de dados do seu servidor IXC
   * @returns Promise<IXCResponse> 
   */
  async post(body?: { [key: string]: any }) : Promise<IXCResponse> {
    const axios = createAxiosInstance('POST');
    
    try {
      const response = await axios.post<IXCResponse>(this.table, { data: body });
      
      if (response.status === 200) {
        return response.data;
      }

      return createResponse({
        error: true,
        message: response.data?.message
      });
    }
    catch (error: any) {
      console.error(error);
      return createResponse({
        error: true,
        message: error.response?.statusText || error.message || 'Erro desconhecido'
      });
    }
    finally {
      this.params = [];
    }
  }


  /**
   * Envia uma requisição do tipo `PUT` para a API do IXC, com o header `ixcsoft` vazio
   * 
   * @param id O id do registro que será alterado
   * @param body Um objeto no formado "chave : valor" contendo as colunas que serão alteradas
   * @returns Promise<IXCResponse>
   */
  async put(id: number, body?: { [key: string]: any }) : Promise<IXCResponse> {
    const axios = createAxiosInstance('PUT');

    try {
      const response = await axios.put<IXCResponse>(`${ this.table }/${ id }`, { data: body });
      
      if (response.status === 200) {
        return response.data;
      }

      return createResponse({
        error: true,
        message: response.data?.message
      });
    }
    catch (error: any) {
      console.error(error);
      return createResponse({
        error: true,
        message: error.response?.statusText || error.message || 'Erro desconhecido'
      });
    }
    finally {
      this.params = [];
    }
  }
}
