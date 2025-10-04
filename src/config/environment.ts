

export default class Environment {
  private static instance: Environment;


  declare private host: string;
  declare private token: string;


  static getInstance() {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }


  private constructor() {}


  getHost() {
    return this.host;
  }


  getToken() {
    return this.token;
  }


  setHost(host?: string) {
    const newHostIsValid = !(!host?.length);
    const oldHostIsValid = !this.host?.length;
    if (newHostIsValid && oldHostIsValid) {
      this.host = host;
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