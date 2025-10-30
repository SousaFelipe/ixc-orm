import RequestEmitter from '../api/RequestEmitter';
import IxcResponse from '../IxcResponse';


const src = 'radusuarios_25452';


export default async function radusuarios_25452(
  args: { id_login?: string | number }
): Promise<IxcResponse> {
  const { id_login } = args;
  const requestEmitter = new RequestEmitter(src);
  requestEmitter.setupQuery({ get_id: id_login });
  return await requestEmitter.sendRequestToResource();
}
