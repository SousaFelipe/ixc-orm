import RequestEmitter from '../api/RequestEmitter';
import IxcResponse from '../IxcResponse';



const src = 'get_boleto';



export default async function get_boleto(
  args: { id_fatura?: string | number }
): Promise<IxcResponse> {

  const { id_fatura } = args;

  if (!id_fatura || id_fatura === '0') {
    throw new Error('IXC-ORM::ERR > O parâmetro "id_fatura" não pode ser null, undefined ou 0.')
  }

  const requestEmitter = new RequestEmitter(src);

  requestEmitter.setupQuery({
    boletos: id_fatura,
    juro: 'S',
    multa: 'S',
    atualiza_boleto: 'S',
    tipo_boleto: 'arquivo',
    base64: 'S'
  });

  return await requestEmitter.sendRequestToResource();
}
