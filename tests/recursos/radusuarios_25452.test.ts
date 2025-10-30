import { Recurso } from '../../src/index';


describe('Recurso: limparMAC', () => {

  it('deve retornar a mensagem "MAC removido com sucesso..."', async () => {

    const id_login = 8554;
    const response = await Recurso.limparMAC({ id_login });

    expect(response.fail()).toBeFalsy();
    expect(response.message()).toContain('MAC removido com sucesso');
  });

});
