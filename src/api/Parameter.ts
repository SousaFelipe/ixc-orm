import Operators from './Operators';
import Utils from '../utils';


export type ParameterProps = {
  TB: string,
  OP: string,
  P: string | number
};


export default class Parameter {


  declare private readonly table: string;
  declare private operator: string;
  declare private type: string;
  declare private value: string | number;


  constructor(table: string) {
    this.table = Utils.Text.normalize(table);
    this.operator = Operators.EQUALS;
    this.type = this.table;
    this.value = '';
  }


  withType(type: string) {
    const normalizedType = Utils.Text.normalize(type);
    this.type = `${this.table}.${normalizedType}`;
    return this;
  }


  withOperator(operator: Operators) {
    this.operator = !(!operator) ? operator : Operators.EQUALS;
    return this;
  }


  withValue(value: string | number) {
    if (value) {
      this.value = value;
    }
    return this;
  }


  toJsonObject() : ParameterProps {
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