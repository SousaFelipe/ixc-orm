import { Environment } from '../../src/index';


describe('Configurações - Variáveis de ambiente', () => {

  it('Domínio', async () => {
    const domain = Environment.getInstance().getDomain();
    expect(domain).toEqual('www.agilitytelecomquixeramobim.com.br');
  });

  it('Token', async () => {
    const token = Environment.getInstance().getToken();
    expect(token).toEqual('67:c097c924190efd6a22a736c14a5cd005abc2f6441ba1e51846d66ed4849f5507');
  });

});