import { Environment } from '../../src/index';


describe('Variáveis de ambiente', () => {

  
  it('deve encontrar a variável IXC_ACCESS_TOKEN', async () => {
    const token = Environment.loadInstance().getToken();
    
    expect(token).toBeDefined();
    expect(token.split(':').length).toBe(2);
  });


  it('deve encontrar a variável IXC_SERVER_DOMAIN', async () => {
    const domain = Environment.loadInstance().getDomain();

    expect(domain).toBeDefined();
    expect(domain).toMatch(/^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63})*$/);
  });

});