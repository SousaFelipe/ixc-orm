import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IXCOptions, IXCQuery, IXCRequest, IXCRequestMethods } from './types';
/**
 *
 * @param method GET | POST | PUT
 * @returns A instânxia de um objeto do tipo AxiosInstance, pre-confugurado com os cabeçalhos necessários
 */
export declare function createAxiosInstance(method?: keyof typeof IXCRequestMethods): AxiosInstance;
/**
 *
 * @param table Nome da tabelado IXC onde será feita a busca, atualização, inserção ou remoção
 * @param params Parâmetros da busca (desconciderado em cadastros de novos registros)
 * @param options Parâmetros de formatação dos dados da responsta (página, ítens por página e ordenação)
 * @returns
 */
export declare function createRequestPayload(table: string, params: IXCQuery | IXCQuery[], options?: IXCOptions): AxiosRequestConfig<IXCRequest>;
