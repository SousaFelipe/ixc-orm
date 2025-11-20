import RequestEmitter from '../api/RequestEmitter';



const src = 'get_boleto';



export default async function get_boleto(
  args: { id_fatura?: string | number }
): Promise<string> {

  const { id_fatura } = args;
  const requestEmitter = new RequestEmitter(src);

  requestEmitter.setupQuery({
    boletos: id_fatura,
    juro: 'S',
    multa: 'S',
    atualiza_boleto: 'S',
    tipo_boleto: 'arquivo',
    base64: 'S'
  });

  const response = await requestEmitter.sendRequestToResource();
  const content = response.content();
  return contentConvertedToPDF(content);
}


function contentConvertedToPDF(content: string): string {
  
  const bits = atob(content);
  if (!bits.length) {
    return '';
  }

  const bytes = new Uint8Array(bits.length);
  for (let i = 0; i < bits.length; i++) {
    bytes[i] = bits.charCodeAt(i);   
  }

  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}
