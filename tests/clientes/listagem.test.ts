import { IxcOrm } from '../../src/index';


class Cliente extends IxcOrm {
  private constructor() {
    super('cliente')
  }
  static newCliente() {
    return new Cliente();
  }
}


describe('Clientes', () => {

  it('Listagem', async () => {

    const response = await Cliente.newCliente()
        .where('cnpj_cpf')
        .exactly('025.076.083-58')
        .GET();

    expect(1).toEqual(response.registros().length);
  });

});