

export default class Environment {
  private static instance: Environment;


  declare private domain: string;
  declare private token: string;


  static getInstance() {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }


  private constructor() {}


  getDomain() {
    return this.domain;
  }


  getToken() {
    return this.token;
  }


  setDomain(domain?: string) {
    const newDomainIsValid = !(!domain?.length);
    const oldDomainIsValid = !this.domain?.length;
    if (newDomainIsValid && oldDomainIsValid) {
      this.domain = domain;
    }
  }

  setToken(token?: string) {
    const newTokenIsValid = !(!token?.length);
    const oldTokenisValid = !this.token?.length;
    if (newTokenIsValid && oldTokenisValid) {
      this.token = token;
    }
  }
}