import { IXCResponse } from './types'



export function createResponse(data: { [key: string]: any }) : IXCResponse {
  return {
    error: data.error || false,
    message: data.message || '',
    id: data.id ?? 0,
    page: data.page ?? 0,
    total: data.total ?? 0,
    registros: data.registros ?? []
  }
}
