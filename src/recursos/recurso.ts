import { createAxiosInstance } from '../request';
import { createResponse } from '../response';
import { IXCResponse } from '../types';



export default async function recurso({
  src,
  data
} : {
  src: string,
  data: {
    [key: string]: any
  }
}) : Promise<IXCResponse> {

  const axios = createAxiosInstance('PUT');

  try {
    const response = await axios.get(src, { data });

    if (response.status === 200) {
      const { data } = response;
      const { message, mensagem, ...rest } = data;
      
      if (rest.type === 'success' || rest.tipo === 'sucesso') {
        return createResponse({
          ...rest,
          message: message || mensagem,
        });
      }

      return createResponse({
        error: true,
        message: message || mensagem
      });
    }
  }
  catch (error: any) {
    console.error(`Erro ao executar recurso: ${src}\n`, error);
  }

  return createResponse({ error: true });  
}