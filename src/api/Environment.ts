import path from 'path';
import dotenv from 'dotenv';
import Utils from '../utils';


export default class Environment {
  private static instance: Environment;


  declare private domain: string;
  declare private token: string;


  static loadInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }


  private constructor() {
    this.shouldToLoadDotEnvFile();
    this.setToken(process.env.IXC_ACCESS_TOKEN);
    this.setDomain(process.env.IXC_SERVER_DOMAIN);
  }


  private shouldToLoadDotEnvFile(): void {
    if (this.envHasBeenLoaded()) {
      return;
    }
    this.loadEnvFromEnvFile();
  }


  private envHasBeenLoaded(): boolean {
    const allEnvVars = Object.keys(process.env);
    return allEnvVars.some(envVar => envVar.startsWith('IXC_'));
  }


  private loadEnvFromEnvFile(): void {
    const fileUtil = new Utils.File();
    const envfile = fileUtil.findFile('.env');
    const env = dotenv.config({
      quiet: true,
      path: path.resolve(envfile)
    });
    if (env.error) {
      console.error(env.error);
      process.exit(1);
    }
  }


  private setDomain(domain?: string): void {
    const newDomainIsValid = !(!domain?.length);
    const oldDomainIsValid = !this.domain?.length;
    if (newDomainIsValid && oldDomainIsValid) {
      this.domain = domain;
    }
  }


  private setToken(token?: string): void {
    const newTokenIsValid = !(!token?.length);
    const oldTokenisValid = !this.token?.length;
    if (newTokenIsValid && oldTokenisValid) {
      this.token = token;
    }
  }


  getDomain(): string {
    return this.domain;
  }


  getToken(): string {
    return this.token;
  }
}