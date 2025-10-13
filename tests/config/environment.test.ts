import { Environment } from '../../src/index';


describe('Variáveis de ambiente', () => {

  it('deve encontrar a variável IXC_ACCESS_TOKEN', async () => {
    const token = Environment.getInstance().getToken();
    expect(token).toEqual('mesmo token que está configurado no arquivo .env');
  });

  it('deve encontrar a variável IXC_SERVER_DOMAIN', async () => {
    const domain = Environment.getInstance().getDomain();
    expect(domain).toEqual('mesmo domínio que está configurado no arquivo .env');
  });

});