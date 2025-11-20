
export class TextUtils {
  
  /**
   * Remove caracteres "anormais" de uma string.
   * 
   * @param text Uma string contendo caracteres "anormais".
   * @returns Uma string com apenas letras de 'a' a 'z' (minúsculas ou maiúsculas), dígitos de '0'
   *          a '9' e o caractere de sublinhado _.
   */
  static normalize(text: string): string {
    return text.replace(/[^a-z0-9_]/gi, '').trim();
  }

  /**
   * Converte uma string de um formato para outro definido pelo parâmetro **format**.
   * 
   * @param text Uma string codificada (geralmente em algum formato não legível por seres humanos).
   * @param format O formato para o qual se deseja converter. (UTF-8 é o padrão)
   * @returns Uma string convertida para o formato definido pelo parâmetro **format**.
   */
  static convertTo(text: string, format: string = 'utf-8'): string {
    const chars = atob(text);
    if (!chars.length) {
      return '';
    }

    const bytes = new Uint8Array(chars.length);
    for (let i = 0; i < chars.length; i++) {
      bytes[i] = chars.charCodeAt(i);   
    }

    const decoder = new TextDecoder(format);
    return decoder.decode(bytes);
  }
}
