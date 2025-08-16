import { IXCResponse } from '../types';
import recurso from './recurso';



const src = 'desbloqueio_confianca';



export default async function desbloqueio_confianca(
  args: { id_contrato?: string | number }
): Promise<IXCResponse> {
  
  const { id_contrato } = args;

  return await recurso({
    src,
    data: {
      id_contrato
    }
  });
}
