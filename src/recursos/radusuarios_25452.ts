import RequestEmitter from '../api/RequestEmitter';
import IxcResponse from '../IxcResponse';



const src = 'radusuarios_25452';



export default async function radusuarios_25452(
  args: { id_login?: string | number }
): Promise<IxcResponse> {
  
  const { id_login } = args;

  if (!id_login || id_login === '0') {
    throw new Error('IXC-ORM::ERR > O parâmetro "id_login" não pode ser null, undefined ou 0.')
  }
  
  const requestEmitter = new RequestEmitter(src);
  
  requestEmitter.setupQuery({ get_id: id_login });

  return await requestEmitter.sendRequestToResource();
}
