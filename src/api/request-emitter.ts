import axios from 'axios';


export default class RequestEmitter {


  declare private readonly table: string;
  declare private readonly headers: Array<{ [key: string]: string }>;
  declare private axiosInstance: axios.AxiosInstance;
  declare private query: string;
  declare private uri: string;


  protected constructor(table: string) {
    this.table = table;
  }


  setupHeaders() {
    this.headers.reduce((accumulator, current) => {

      Object.keys(current).forEach(currentKey => {
        if (!Object.keys(accumulator).includes(currentKey)) {
          accumulator[currentKey] = '';
        }
        accumulator[currentKey] = current[currentKey];
      });

      return accumulator;
    }, {});
  }
}