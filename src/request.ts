import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IXCOptions, IXCQuery, IXCRequest, IXCRequestMethods } from './types';


/**
 * 
 * @param method GET | POST | PUT | DELETE
 * @returns A instância de um objeto do tipo AxiosInstance, pré-configurado com os cabeçalhos necessários
 */
export function createAxiosInstance(method: keyof typeof IXCRequestMethods = 'GET') : AxiosInstance {

  const host = process.env.IXC_HOST;
  const token = process.env.IXC_TOKEN;

  return axios.create({
    method: method,
    baseURL: host ?? 'http://127.0.0.1/webservice/v1',
    headers: {
      'ixcsoft': (method === 'GET') ? 'listar' : '',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${ Buffer.from(token ?? '').toString('base64') }`
    }
  });
}


/**
 * 
 * @param table Nome da tabela do IXC onde será feita a busca, atualização, inserção ou remoção
 * @param params Parâmetros da busca (desconsiderados quando a ação for a de inserir novos registros)
 * @param options Parâmetros de formatação dos dados da responsta (página, ítens por página e ordenação)
 * @returns 
 */
export function createRequestPayload(
  table: string,
  params: IXCQuery | IXCQuery[],
  options?: IXCOptions
) : AxiosRequestConfig<IXCRequest> {

  const page = options?.page ?? 1;
  const rowsPerPage = options?.rowsPerPage ?? 20;
  const sortName = options?.sortName ?? 'id';
  const sortOrder = options?.sortOrder ?? 'asc';

  if (Array.isArray(params)) {
    let grid_param: object[] = [];

    params.forEach(p => {
      grid_param.push({
        TB: `${table}.${p.TB}`,
        OP: p.OP || '=',
        P: p.P
      });
    });

    return { data: {
      qtype: table,
      query: '',
      oper: '',
      page: page,
      rp: rowsPerPage,
      sortname: `${table}.${sortName}`,
      sortorder: sortOrder,
      grid_param: JSON.stringify(grid_param)
    }};
  }

  return { data: {
    qtype: `${table}.${params.TB}`,
    query: params.P,
    oper: params.OP || '=',
    page: page,
    rp: rowsPerPage,
    sortname: `${table}.${sortName}`,
    sortorder: sortOrder
  }};
}
