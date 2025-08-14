import { IXCResponse } from '../types';
import recurso from './recurso';



const src = 'desbloqueio_confianca';



async function execute(id_contrato: string | number): Promise<IXCResponse> {
  return await recurso({
    src,
    data: { id_contrato }
  });
}



export default { execute } as const;
