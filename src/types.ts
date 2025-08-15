


export const IXCOperator = {
  '=':    '=',
  '>':    '>',
  '<':    '<',
  '>=':   '>=',
  '<=':   '<=',
  '!=':   '!=',
  'LIKE': 'L'
}

export const IXCSortOrder = {
  asc: 'asc',
  desc: 'desc'
}

export const IXCRequestMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}


export interface IXCOptions {
  page: number,
  rowsPerPage?: number,
  sortName?: string,
  sortOrder?: keyof typeof IXCSortOrder
}


export interface IXCQuery {
  TB: string,
  OP?: string,
  P: string
}


export interface IXCRequest {
  qtype: string,
  query: string,
  oper: string,
  page: number,
  rp: number,
  sortname: string,
  sortorder: string,
  grid_param?: string
}


export interface IXCResponse {
  error?: boolean | object,
  message?: string,
  id?: string | number,
  page: number | string,
  total: number,
  registros: Array<{ [key: string]: any }>
}


export interface IXCRecursoResponse {
  error?: boolean | object,
  data: any
}
