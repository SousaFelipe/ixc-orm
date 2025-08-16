import { IXCResponse } from '../types';
import recurso from './recurso';



const src = 'cliente_contrato_btn_lib_temp_24722';



export default async function cliente_contrato(
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
