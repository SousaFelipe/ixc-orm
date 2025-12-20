import { IxcOrm } from '../../src/index';


class Cliente extends IxcOrm {
  private constructor() {
    super('cliente')
  }
  static newCliente() {
    return new Cliente();
  }
}


describe('IxcResponse', () => {


  it('deve retornar uma mensagem de erro', async () => {
    const response = await Cliente.newCliente()
        .where('campo_nao_existente')
        .exactly('Kurapika está se afogando em um vazio indescritível')
        .GET();

    expect(response.fail()).toBeTruthy();
    expect(response.message().length).toBeGreaterThan(0);

  });


  it('não deve retornar uma mensagem de erro', async () => {
    const response = await Cliente.newCliente()
        .where('cnpj_cpf')
        .exactly('123.456.789-10') // Inserir CPF de um cliente cadastrado no IXC Provedor.
        .GET();

    expect(response.fail()).toBeFalsy();
    expect(response.message().length).toBeLessThan(1);
  });

});
