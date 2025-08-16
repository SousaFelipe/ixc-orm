import cliente_contrato from './cliente_contrato_btn_lib_temp_24722';
import desbloqueio_confianca from './desbloqueio_confianca';
import get_boleto from './get_boleto';


const recursos = {
  cliente_contrato,
  desbloqueio_confianca,
  get_boleto
};


type Recursos = typeof recursos;


/**
 * Uma função que simplifica a execução de recursos específicos da API do IXC\
 * Para encontrar todos os recursos, acesse: {@link https://wikiapiprovedor.ixcsoft.com.br/}
 * 
 * @param recurso O nome do recurso a ser executado
 * @param args Os argumentos que devem ser passado para o manipulador do recurso
 * @returns Promise<IXCResponse | IXCRecursoResponse>
 */
export default async function RecursoIXC<T extends keyof Recursos>(
  recurso: T, args: Parameters<Recursos[T]>[0]
) {
  const handler = recursos[recurso];
  return await handler(args);
}
