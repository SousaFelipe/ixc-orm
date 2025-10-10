import { JSDOM } from 'jsdom';


export default class IxcResponse {

  declare private data: {[key: string]: any};
  
  /**
   * Cria um novo objeto no formato de uma resposta padrão do IXC Provedor.
   * 
   * @param error Uma exceção capturada por um bloco try-catch.
   * @returns Um objeto de resposta do IXC Provedor.
   */
  public static createPropsWithError(error: any) {
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
    this.data = this.parseDataFromText(text);
  }

  /**
   * Obtém a quantidade total dos registros encontrados no banco de dados, além dos retornados na página atual.
   * 
   * @returns O total de registros encontrados.
   */
  total() : number {
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
  page() : number {
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
  message() : string {
    if (!this.data?.message) {
      return '';
    }
    return this.data.message;
  }

  /**
   * Obtém a lista de registros retornados por uma consulta à API do IXC Provedor.
   * 
   * @returns Uma lista de objetos.
   */
  registros() : Array<{[key: string]: any}> {
    if (!this.data?.registros) {
      return [];
    }
    return this.data.registros;
  }

  private parseDataFromText(text: string) : {[key: string]: any} {
    const isValidHTML = text?.length && text.includes('<div style=');
    if (isValidHTML) {
      return this.parseDataFromHTML(text);
    }
    return JSON.parse(text);
  }

  private parseDataFromHTML(html: string) : {[key: string]: any} {
    const dom = new JSDOM(html);
    return {
      type: 'error',
      page: 0,
      total: 0,
      message: dom.window.document.body.textContent
    };
  }
}
