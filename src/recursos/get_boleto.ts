import { createAxiosInstance } from '../request';
import { createResponse } from '../response';
import { IXCRecursoResponse, IXCResponse } from '../types';



const SRC = 'get_boleto';



async function execute(id_fatura: string | number): Promise<IXCResponse | IXCRecursoResponse> {
  const axios = createAxiosInstance('PUT');

  try {
    const response = await axios.get(SRC, {
      data: {
        boletos: id_fatura,
        juro: 'S',
        multa: 'S',
        atualiza_boleto: 'S',
        tipo_boleto: 'arquivo',
        base64: 'S'
      }
    });

    if (response.status === 200) {
      return {
        data: response.data
      };
    }
  }
  catch (error: any) {
    console.error(`Erro ao executar recurso: ${SRC}\n`, error);
  }

  return createResponse({ error: true });
}



export default { execute } as const;
