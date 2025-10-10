import axios, { HeadersDefaults, AxiosHeaderValue } from 'axios';
import Environment from '../config/environment';


type AxiosHeaders = HeadersDefaults & { [key: string]: AxiosHeaderValue; };


export default class RequestEmitter {

  declare private readonly table: string;
  declare private headers: Array<{ [key: string]: string }>;
  declare private defaultHeaders: AxiosHeaders; 
  declare private axiosInstance: axios.AxiosInstance;
  declare private query: { [key: string]: any };
  declare private uri: string;

  protected constructor(table: string) {
    this.table = table;
  }

  GET() : RequestEmitter {
    this.setupUri();
    this.enableIxcListingHeader();
    return this;
  }

  POST(record: any) : RequestEmitter {
    const { id } = record;
    this.setupUri(Number(id));
    this.disableIxcListingHeader();
    return this;
  }

  getTable() : string {
    return this.table;
  }

  updateQuery(query: { [key: string]: any }) : void {
    this.query = query;
  }

  private setupUri(id?: number) {
    const host = Environment.getInstance().getHost();
    const pathId = id ? `/${id}` : '';
    this.uri = `https://${host}/webservice/v1/${this.table}${pathId}`;
  }

  private setupDefaultHeaders() {
    this.defaultHeaders = this.headers.reduce((accumulator, current) => {
      Object.keys(current).forEach(currentKey => {
        if (!Object.keys(accumulator).includes(currentKey)) {
          accumulator[currentKey] = '';
        }
        accumulator[currentKey] = current[currentKey];
      });
      return accumulator;
    }, {} as AxiosHeaders)
  }

  private enableIxcListingHeader(): void {
    const headerIndex = this.headers.findIndex(h => Object.keys(h).includes('ixcsoft'));
    if (headerIndex > -1) {
      this.headers[headerIndex]['ixcsoft'] = 'listar';
    }
  }

  private disableIxcListingHeader(): void {
    const headerIndex = this.headers.findIndex(h => Object.keys(h).includes('ixcsoft'));
    if (headerIndex > -1) {
      this.headers[headerIndex]['ixcsoft'] = '';
    }
  }
}