import { IxcOrm } from '../../src/index';


class Cliente extends IxcOrm {
  constructor() {
    super('cliente');
  }
  static newCliente() {
    return new Cliente();
  }
}


class Contrato extends IxcOrm {
  constructor() {
    super('cliente_contrato');
  }
  static newContrato() {
    return new Contrato();
  }
}


describe('Listagem de registros', () => {
  const cnpj_cpf = process.env.TEST_VALID_CPF || '123.456.789-10';


  it('deve encontrar pelo ao menos 1 cliente', async () => {
    const response = await Cliente.newCliente()
      .where('cnpj_cpf')
      .exactly(cnpj_cpf)
      .GET();

    const registros = response.records();
    expect(registros.length).toBeGreaterThan(0);
  });


  it('deve executar multiplas requisições com a mesma instância ORM', async () => {
    const contrato = new Contrato();

    const ativos = await contrato.paginate(1, 1)
      .where('status_internet')
      .exactly('A')
      .GET();

    const bloqueados = await contrato.paginate(1, 1)
      .where('status_internet')
      .exactly('CA')
      .GET();

    expect(ativos.records()).toBeDefined();
    expect(ativos.records().length).toBe(1);

    expect(bloqueados.records()).toBeDefined();
    expect(bloqueados.records().length).toBe(1);
  });

});
