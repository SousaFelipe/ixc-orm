import { AxiosError } from 'axios';
import { IXCOptions, IXCQuery, IXCResponse, IXCSortOrder } from './types';
export default abstract class IXCClient {
    protected table: string;
    protected params: IXCQuery[];
    protected options: IXCOptions;
    /**
     *
     * @param table O nome da tabela correspondente ao banco de dados do seu servidor IXC
     * @see {@link https://wikiapiprovedor.ixcsoft.com.br/index.php}
     */
    constructor(table: string);
    /**
     *
     * @param whereClauses Um array de strings, no formato [coluna, operador, valor]
     * Obs: se você passar um array no formato [coluna, valor] o operador será considerado como '='
     * Operadores válidos: =, !=, >, <, >=, <=, LIKE
     * @returns A própria instância
     */
    where(whereClauses: string[]): IXCClient;
    /**
     *
     * @param column A coluna que será usada para ordenar a busca
     * @param order A ordem da busca ('asc'ou 'desc')
     * @returns A própria instância
     */
    orderBy(column: string, order: keyof typeof IXCSortOrder): IXCClient;
    /**
     *
     * @param pg O número da página que será solicitada ao IXC
     * @param rows A quantidade de linhas (registros) por página
     * @returns Promise<null | IXCResponse | AxiosError>
     */
    get(pg?: number, rows?: number): Promise<null | IXCResponse | AxiosError>;
    /**
     *
     * @param body Um objeto no formado "chave: valor" contendo as informações do novo registro
     * a ser inserido no banco de dados do seu servidor IXC
     * @returns Promise<null | IXCResponse | AxiosError>
     */
    post(body?: {
        [key: string]: any;
    }): Promise<null | IXCResponse | AxiosError>;
    /**
     *
     * @param id O id do registro que será alterado
     * @param body Um objeto no formado "chave : valor" contendo as colunas que serão alteradas
     * @returns Promise<null | IXCResponse | AxiosError>
     */
    put(id: number, body?: {
        [key: string]: any;
    }): Promise<null | IXCResponse | AxiosError>;
}
