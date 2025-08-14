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
      
      if (data?.type === 'success' || data?.tipo === 'sucesso') {
        return createResponse({
          message: data.message || data.mensagem,
        });
      }

      return createResponse({
        error: true,
        message: data.message || data.mensagem
      });
    }
  }
  catch (error: any) {
    console.error(`Erro ao executar recurso: ${src}\n`, error);
  }

  return createResponse({ error: true });  
}