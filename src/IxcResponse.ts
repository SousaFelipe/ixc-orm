

export default class IxcResponse {

  declare private data: {[key: string]: any};
  declare private text: string;
  
  /**
   * Cria um novo objeto no formato de uma resposta padrão do IXC Provedor.
   * 
   * @param error Uma exceção capturada por um bloco try-catch.
   * @returns Um objeto de resposta do IXC Provedor.
   */
  public static createResponseTextWithError(error: any) {
    const response = {
      type: 'error',
      page: 0,
      total: 0,
      registros: [],
      message: error.response?.statusText || error.message || 'Erro desconhecido'
    };
    return JSON.stringify(response);
  }

  /**
   * Método construtor da classe.
   * 
   * @param text O conteúdo da resposta do IXc Provedor, no formato de texto.
   */
  constructor(text: string) {
    this.text = text;
    this.data = this.createDataFromText();
  }

  /**
   * Verifica se o IXC Provedor retornou uma mensagem de erro.
   * 
   * @returns **true** se o corpo da mensagem estiver dentro de tags HTML e se a mensagem dentro das tags
   * contiver a palavra "erro". Ou se o objeto da resposta possuir a propriedade { "type": "error", ... }.
   */
  fail(): boolean {
    const hasHtml = this.responseTextHasHtml();
    const hasError = this.message().includes('erro');
    if (hasHtml && hasError) {
      return true;
    }
    if (this.data && Object.keys(this.data).includes('type')) {
      return this.data.type === 'error';
    }
    return false;
  }

  /**
   * Obtém a quantidade total dos registros encontrados no banco de dados, além dos retornados na página atual.
   * 
   * @returns O total de registros encontrados.
   */
  total(): number {
    if (!this.data?.total) {
      return 0;
    }
    return this.data.total;
  }

  /**
   * Obtém o número da página atual dos registros retornados.
   * 
   * @returns O valor numérico da página.
   */
  page(): number {
    if (!this.data?.page) {
      return 0;
    }
    return this.data.page;
  }

  /**
   * Obtém uma mensagem retornada pelo IXC quando a requisição falha.
   * 
   * @returns Uma mensagem de falha.
   */
  message(): string {
    if (!this.data?.message) {
      return '';
    }
    return this.data.message.replaceAll('<br />', '. ');
  }

  /**
   * Obtém a lista de registros retornados por uma consulta à API do IXC Provedor.
   * 
   * @returns Uma lista de objetos.
   */
  registros(): Array<{[key: string]: any}> {
    if (!this.data?.registros) {
      return [];
    }
    return this.data.registros;
  }

  private responseTextHasHtml(): boolean {
    return !(!this.text?.length) && this.text.startsWith('<div style=');
  }

  private createDataFromText(): {[key: string]: any} {
    if (this.responseTextHasHtml()) {
      return this.createDataFromHtml();
    }
    return JSON.parse(this.text);
  }

  private createDataFromHtml(): {[key: string]: any} {
    const parser = new DOMParser();
    const document = parser.parseFromString(this.text, 'text/html');
    return {
      type: 'error',
      page: 0,
      total: 0,
      message: document.body.textContent
    };
  }
}
