import utils from './utils';


export enum Operador {
  EQUALS = '=',
  LIKE = 'L',
  LESS_THAN = '<',
  LESS_THAN_EQUALS = '<=',
  GREATER_THAN = '>',
  GREATER_THAN_EQUALS = '>='
};


export default class Parameter {


  declare private readonly table: string;
  declare private operator: string;
  declare private type: string;
  declare private value: string | number;


  constructor(table: string) {
    this.table = utils.Text.normalize(table);
    this.operator = Operador.EQUALS;
    this.type = this.table;
    this.value = '';
  }


  withType(type: string) {
    const normalizedType = utils.Text.normalize(type);
    this.type = `${this.table}.${normalizedType}`;
    return this;
  }


  withOperator(operador: Operador) {
    this.operator = !(!operador) ? operador : Operador.EQUALS;
    return this;
  }


  withValue(value: string | number) {
    if (value) {
      this.value = value;
    }
    return this;
  }


  toJsonObject() {
    return {
      TB: this.type,
      OP: this.operator,
      P: this.value
    };
  }


  toJsonString() {
    return JSON.stringify(this.toJsonObject());
  }
}