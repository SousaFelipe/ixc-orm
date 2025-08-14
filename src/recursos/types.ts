
export interface Boleto {
  /**
   * @property id da fatura
   */
  boletos: string | number,
  /**
   * @property // 'S'->SIM e 'N'->NÃO para cálculo de júro
   */
  juro: 'S' | 'N',
  /**
   * @property // 'S'->SIM e 'N'->NÃO para cálculo de multa
   */
  multa: 'S' | 'N',
  /**
   * @property // 'S'->SIM e 'N'->NÃO para atualizar o boleto
   */
  atualiza_boleto: 'S' | 'N',
  /**
   * @property // tipo de método que será executado
   */
  tipo_boleto: 'arquivo',
  /**
   * @property // 'S'->SIM e 'N'->NÃO para retornar o boleto em base64
   */
  base64: 'S' | 'N'
}
