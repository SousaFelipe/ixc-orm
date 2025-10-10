import { Environment } from '../../src/index';


describe('Configurações - Variáveis de ambiente', () => {

  it('Domínio', async () => {
    const domain = Environment.getInstance().getDomain();
    expect(domain).toEqual('mesmo domínio que está configurado no arquivo .env');
  });

  it('Token', async () => {
    const token = Environment.getInstance().getToken();
    expect(token).toEqual('mesmo token que está configurado no arquivo .env');
  });

});