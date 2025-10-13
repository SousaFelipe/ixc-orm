import { IxcOrm } from '../../src/index';


class Cliente extends IxcOrm {
  private constructor() {
    super('cliente')
  }
  static newCliente() {
    return new Cliente();
  }
}


describe('Listagem de registros', () => {

  it('deve encontrar pelo ao menos 1 cliente', async () => {

    const response = await Cliente.newCliente()
        .where('cnpj_cpf')
        .exactly('123.456.789-10')
        .GET();

    const registros = response.registros();
    expect(registros.length).toBeGreaterThan(0);
  });

});
