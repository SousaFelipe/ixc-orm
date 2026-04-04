import { IxcOrm } from '../../src/index';


class Cliente extends IxcOrm {
  private constructor() {
    super('cliente');
  }
  static newCliente() {
    return new Cliente();
  }
}


describe('IxcResponse', () => {
  const cnpj_cpf = process.env.TEST_VALID_CPF || '123.456.789-10';


  it('deve retornar uma mensagem de erro', async () => {
    const response = await Cliente.newCliente()
        .where('campo_nao_existente')
        .exactly('Kurapika está se afogando em um vazio indescritível')
        .GET();

    expect(response.fail()).toBeTruthy();
    expect(response.message()).toBe('Ocorreu um erro ao processar. Contate o suporte IXC Soft.');

  });


  it('não deve retornar uma mensagem de erro', async () => {
    const response = await Cliente.newCliente()
        .where('cnpj_cpf')
        .exactly(cnpj_cpf)
        .GET();

    expect(response.fail()).toBeFalsy();
    expect(response.message().length).toBeLessThan(1);
  });

});
