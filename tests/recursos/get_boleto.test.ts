import { Recurso } from '../../src/index';


describe('Recurso: getArquivoBoleto', () => {

  it('deve retornar um arquivo PDF de um boleto...', async () => {
    const id_fatura = 344003;
    const pdf = await Recurso.getArquivoBoleto({ id_fatura });
  
    expect(pdf).toContain('PDF-1.7')
  });

});