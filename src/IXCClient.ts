import { AxiosError } from 'axios';
import { createAxiosInstance, createRequestPayload } from './request';
import { IXCOptions, IXCQuery, IXCResponse, IXCSortOrder } from './types';



export default abstract class IXCClient {


  protected table: string;
  protected params: IXCQuery[];
  protected options: IXCOptions;


  /**
   * 
   * @param table O nome da tabela dentro do banco de dados do seu servidor IXC
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
   * 
   * @param whereClauses Um array de strings, no formato [coluna, operador, valor]
   * Obs: se você passar um array no formato [coluna, valor] o operador será considerado como '='
   * 
   * Operadores: =, !=, >, <, >=, <=, LIKE
   * 
   * @returns 
   */
  where(whereClauses: string[]) : IXCClient {
    
    const [
      column,
      operatorOrValue,
      valueOrUndefined
    ] = whereClauses;

    this.params.push({
      TB: column,
      OP: valueOrUndefined ? operatorOrValue : '=',
      P: valueOrUndefined ? valueOrUndefined : operatorOrValue
    });

    return this
  }


  /**
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
   * 
   * @param pg O número da página que será solicitada ao IXC
   * @param rows A quantidade de linhas (registros) por página
   * @returns Promise<null | IXCResponse | AxiosError>
   */
  async get(pg?: number, rows?: number) : Promise<null | IXCResponse | AxiosError> {

    const { page, rowsPerPage, ...rest } = this.options;

    const opts = {
      page: pg ?? page,
      rowsPerPage: rows ?? rowsPerPage,
      ...rest
    };

    const axios = createAxiosInstance('GET');
    const payload = createRequestPayload(this.table, this.params, opts);
    
    try {
      const response = await axios.get<IXCResponse>(this.table, { data: payload });
      return response.data;
    }
    catch (error: any) {
      console.error(error);

      if (error instanceof AxiosError) {
        return error;
      }

      return null;
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
   * 
   * @param body Um objeto no formado "chave/valor" contendo as informações do novo registro
   * a ser inserido no banco de dados do seu servidor IXC
   * @returns Promise<null | IXCResponse | AxiosError> 
   */
  async post(body?: { [key: string]: any }) : Promise<null | IXCResponse | AxiosError> {
    const axios = createAxiosInstance('POST');
    
    try {
      const response = await axios.post<IXCResponse>(this.table, { data: body });
      return response.data;
    }
    catch (error: any) {
      console.error(error);

      if (error instanceof AxiosError) {
        return error;
      }

      return null;
    }
    finally {
      this.params = [];
    }
  }


  /**
   * 
   * @param id O id do registro que será alterado
   * @param body Um objeto no formado "chave/valor" contendo as colunas que serão alteradas
   * @returns Promise<null | IXCResponse | AxiosError>
   */
  async put(id: number, body?: { [key: string]: any }) : Promise<null | IXCResponse | AxiosError> {
    const axios = createAxiosInstance('PUT');

    try {
      const response = await axios.put<IXCResponse>(`${ this.table }/${ id }`, { data: body });
      return response.data;
    }
    catch (error: any) {
      console.error(error);

      if (error instanceof AxiosError) {
        return error;
      }

      return null;
    }
    finally {
      this.params = [];
    }
  }
}
