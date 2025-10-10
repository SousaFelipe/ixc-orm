import { IxcOrm } from '../../src/index';


class Cliente extends IxcOrm {
  private constructor() {
    super('cliente')
  }
  static newCliente() {
    return new Cliente();
  }
}


describe('IxcOrm', () => {

  it('createSimpleQuery', () => {
    const cpf = '123.456.789-10';
    const simpleQuery = Cliente.newCliente().where('cnpj_cpf').exactly(cpf).createQueryObject();

    expect({
      grid_param: '[{\"TB\":\"cliente.cnpj_cpf\",\"OP\":\"=\",\"P\":\"123.456.789-10\"}]',
      oper: '',
      page: 1,
      qtype: 'cliente',
      query: '',
      rp: 20,
      sortname: 'cliente.id',
      sortorder: 'asc',
    })
    .toStrictEqual(
      simpleQuery
    );

  });

});
