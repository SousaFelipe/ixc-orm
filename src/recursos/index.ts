import cliente_contrato_btn_lib_temp_24722 from './cliente_contrato_btn_lib_temp_24722';
import desbloqueio_confianca from './desbloqueio_confianca';
import get_boleto from './get_boleto';
import radusuarios_25452 from './radusuarios_25452';


/**
 * @deprecated Acesse os recursos através da constante {@link Recurso}
 */
const recursos = {
  cliente_contrato: cliente_contrato_btn_lib_temp_24722,
  desbloqueio_confianca,
  get_boleto
};


type Recursos = typeof recursos;


/**
 * Disponibiliza, de forma simples e direta, o acesso a todos os recursos da API do IXC\
 * **ATENÇÃO** --- Nem todos os recursos da API do IXC foram implementados por esta biblioteca
 */
export const Recurso = {

  /**
   * Solicita ao IXC que desbloqueie o contrato de um cliente bloqueado, que já solicitou
   * a liberação temporária dentro de um período de 30 dias. Este recurso só funciona, caso
   * a opção de desbloqueio de confiança esteja ativada, no contrato do cliente, dentro do IXC.
   * 
   * @description Corresponde ao recurso `desbloqueio_confianca`
   * 
   * @param id_contrato O ID do contrato do cliente que deverá ser desbloqueado
   * @returns Um objeto **IXCResponse** contendo a resposta enviada pelo IXC
   */
  desbloqueioDeConfianca: desbloqueio_confianca,

  /**
   * Obtém um arquivo PDF codificado em base64 do boleto de uma determinada fatura.
   * 
   * @description Corresponde ao recurso `get_boleto`
   * 
   * @param id_fatura O ID da fatura
   * @returns Um **IXCResponse**, caso a requisição falhe, ou um **IXCRecursoResponse**
   * contendo o conteúdo do boleto, caso a requisição seja bem-sucedida
   */
  getArquivoBoleto: get_boleto,

  /**
   * Envia uma requisição à API do IXC Provedor, para que o endereço de MAC seja removido do cadastro de um determinado PPPoE.
   * 
   * @param id_login O ID do PPPoE que se deseja remover o endereço de MAC.
   * @returns A instância de um **IxcResponse**.
   */
  limparMAC: radusuarios_25452,
  
  /**
   * Solicita ao IXC que libere, por 72 horas, o contrato de um cliente bloqueado, que não tenha
   * solicitado outra liberação temporária dentro de um período de 30 dias
   * 
   * @description Corresponde ao recurso `cliente_contrato_btn_lib_temp_24722`
   * 
   * @param id_contrato O ID do contrato do cliente que deverá ser liberado
   * @returns Um objeto **IXCResponse** contendo a resposta enviada pelo IXC
   */
  liberacaoTemporaria: cliente_contrato_btn_lib_temp_24722,

};


/**
 * *ATENÇÃO:* Esta função desá descontinuada
 * 
 * @deprecated Acesse os recursos através da constante {@link Recurso}
 */
export default async function RecursoIXC<T extends keyof Recursos>(
  recurso: T, args: Parameters<Recursos[T]>[0]
) {
  console.warn('Esta função será removida na próxima versão! Acesse os recursos através da constante "Recurso".');
  const handler = recursos[recurso];
  return await handler(args);
}
