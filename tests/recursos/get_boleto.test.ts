import { Recurso } from '../../src/index';
import { TextUtils } from '../../src/utils/TextUtils';


describe('Recurso: getArquivoBoleto', () => {

  it('deve retornar o conteúdo de um arquivo PDF de um boleto...', async () => {
    const id_fatura = 344003;
    const response = await Recurso.getArquivoBoleto({ id_fatura });

    const utf8Content = TextUtils.convertTo(response.content());
    
    expect(utf8Content).toContain('PDF-1.')
  });

});