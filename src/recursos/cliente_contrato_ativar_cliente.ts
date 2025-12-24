import RequestEmitter from '../api/RequestEmitter';
import IxcResponse from '../IxcResponse';



const src = 'cliente_contrato_ativar_cliente';



export default async function cliente_contrato_ativar_cliente(
  args: { id_contrato?: string | number }
): Promise<IxcResponse> {
  
  const { id_contrato } = args;

  if (!id_contrato || id_contrato === '0') {
    throw new Error('O parâmetro "id_contrato" não pode ser null, undefined ou 0.')
  }
  
  const requestEmitter = new RequestEmitter(src);

  requestEmitter.setupQuery({
    qtype: 'cliente_contrato_ativar_cliente.id',
    id_contrato
  });

  return await requestEmitter.sendRequestToResource();
}
