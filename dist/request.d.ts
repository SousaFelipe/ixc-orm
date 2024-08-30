import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IXCOptions, IXCQuery, IXCRequest, IXCRequestMethods } from './types';
/**
 *
 * @param method GET | POST | PUT
 * @returns A instância de um objeto do tipo AxiosInstance, pré-configurado com os cabeçalhos necessários
 */
export declare function createAxiosInstance(method?: keyof typeof IXCRequestMethods): AxiosInstance;
/**
 *
 * @param table Nome da tabela do IXC onde será feita a busca, atualização, inserção ou remoção
 * @param params Parâmetros da busca (desconciderado quando a ação é a de inserir novos registros)
 * @param options Parâmetros de formatação dos dados da responsta (página, ítens por página e ordenação)
 * @returns
 */
export declare function createRequestPayload(table: string, params: IXCQuery | IXCQuery[], options?: IXCOptions): AxiosRequestConfig<IXCRequest>;
