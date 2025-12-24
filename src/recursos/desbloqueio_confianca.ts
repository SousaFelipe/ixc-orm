import RequestEmitter from '../api/RequestEmitter';
import IxcResponse from '../IxcResponse';



const src = 'desbloqueio_confianca';



export default async function desbloqueio_confianca(
  args: { id_contrato?: string | number }
): Promise<IxcResponse> {
  
  const { id_contrato } = args;
  
  if (!id_contrato || id_contrato === '0') {
    throw new Error('O parâmetro "id_contrato" não pode ser null, undefined ou 0.')
  }

  const requestEmitter = new RequestEmitter(src);

  requestEmitter.setupQuery({
    id: id_contrato
  })

  return await requestEmitter.sendRequestToResource();
}
