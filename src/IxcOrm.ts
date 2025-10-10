import Ordering from './api/Ordering';
import Pagination from './api/Pagination';
import Parameter, { Operador, ParameterObject } from './api/Parameter';
import RequestEmitter from './api/RequestEmitter';


export default abstract class IxcOrm extends RequestEmitter {

  declare private parameters: Array<ParameterObject>;
  declare private ordering: Ordering;
  declare private pagination: Pagination;
  declare private paramStub: Parameter;

  protected constructor(table: string) {
    super(table);
    this.ordering = Ordering.ascBy(table, "id");
    this.pagination = Pagination.defaults();
    this.parameters = [];
    this.paramStub = new Parameter(table);
  }

  where(column: string) : IxcOrm {
    this.paramStub.withType(column);
    return this;
  }

  like(value: string | number) : IxcOrm {
    this.paramStub.withOperator(Operador.LIKE);
    this.paramStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.updateQuery(this.getQueryObject());
    return this;
  }

  exactly(value: string | number) : IxcOrm {
    this.paramStub.withOperator(Operador.EQUALS);
    this.paramStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.updateQuery(this.getQueryObject());
    return this;
  }

  lessThan(value: string | number) : IxcOrm {
    this.paramStub.withOperator(Operador.LESS_THAN);
    this.paramStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.updateQuery(this.getQueryObject());
    return this;
  }

  lessThanEquals(value: string | number) : IxcOrm {
    this.paramStub.withOperator(Operador.LESS_THAN_EQUALS);
    this.paramStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.updateQuery(this.getQueryObject());
    return this;
  }

  greaterThan(value: string | number) : IxcOrm {
    this.paramStub.withOperator(Operador.GREATER_THAN);
    this.paramStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.updateQuery(this.getQueryObject());
    return this;
  }

  greaterThanEquals(value: string | number) : IxcOrm {
    this.paramStub.withOperator(Operador.GREATER_THAN_EQUALS);
    this.paramStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.updateQuery(this.getQueryObject());
    return this;
  }

  private getQueryObject() {
    return {
      qtype: super.getTable(),
      query: "",
      oper: "",
      page: this.pagination.getPage(),
      rp: this.pagination.getRows(),
      sortname: this.ordering.getSortName(),
      sortorder: this.ordering.getSortOrder().toString(),
      grid_param: JSON.stringify(this.parameters)
    };
  }

  private addParamToGridAndResetStub() : void {
    this.parameters.push(this.paramStub.toJsonObject());
    this.paramStub = new Parameter(super.getTable());
  }
}
