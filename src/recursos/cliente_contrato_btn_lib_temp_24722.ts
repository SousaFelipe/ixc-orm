import { IXCResponse } from '../types';
import recurso from './recurso';



const src = 'cliente_contrato_btn_lib_temp_24722';



async function execute(id_contrato: string | number): Promise<IXCResponse> {
  return await recurso({
    src,
    data: { id_contrato }
  });
}



export default { execute } as const;
