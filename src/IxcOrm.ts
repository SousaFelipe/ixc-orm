import Operators from './api/Operators';
import Ordering, { Sort } from './api/Ordering';
import Pagination from './api/Pagination';
import Parameter, { ParameterProps } from './api/Parameter';
import RequestEmitter from './api/RequestEmitter';


export default abstract class IxcOrm extends RequestEmitter {

  declare private ordering: Ordering;
  declare private pagination: Pagination;
  declare private parameters: Array<ParameterProps>;
  declare private parameterStub: Parameter;

  /**
   * Método construtor da classe.
   * 
   * @param table Representa o o nome da tabela que será manipulada, no IXC Provedor.
   */
  protected constructor(table: string) {
    super(table);
    this.ordering = Ordering.ascBy(table, "id");
    this.pagination = Pagination.defaults();
    this.parameters = [];
    this.parameterStub = new Parameter(table);
  }

  /**
   * Inicia um novo objeto de parâmetro de busca do filtro da grid.
   * 
   * @param column O nome da coluna onde o filtro de busca será executado.
   * @returns A própria instância.
   */
  where(column: string) : IxcOrm {
    this.parameterStub.withType(column);
    return this;
  }

  /**
   * Adiciona, ao último objeto de parâmetro iniciado, um valor a ser filtrado com o operador (**L**) = LIKE.
   * 
   * @param value O valor a ser filtrado.
   * @returns A própria instância.
   */
  like(value: string | number) : IxcOrm {
    this.parameterStub.withOperator(Operators.LIKE);
    this.parameterStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.setupQuery(this.createQueryObject());
    return this;
  }

  /**
   * Adiciona, ao último objeto de parâmetro iniciado, um valor a ser filtrado com o operador (**=**) = EQUALS.
   * 
   * @param value O valor a ser filtrado.
   * @returns A própria instância.
   */
  exactly(value: string | number) : IxcOrm {
    this.parameterStub.withOperator(Operators.EQUALS);
    this.parameterStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.setupQuery(this.createQueryObject());
    return this;
  }

  /**
   * Adiciona, ao último objeto de parâmetro iniciado, um valor a ser filtrado com o operador (**<**) = LESS_THAN.
   * 
   * @param value O valor a ser filtrado.
   * @returns A própria instância.
   */
  lessThan(value: string | number) : IxcOrm {
    this.parameterStub.withOperator(Operators.LESS_THAN);
    this.parameterStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.setupQuery(this.createQueryObject());
    return this;
  }

  /**
   * Adiciona, ao último objeto de parâmetro iniciado, um valor a ser filtrado com o operador (**<=**) = LESS_THAN_EQUALS.
   * 
   * @param value O valor a ser filtrado.
   * @returns A própria instância.
   */
  lessThanEquals(value: string | number) : IxcOrm {
    this.parameterStub.withOperator(Operators.LESS_THAN_EQUALS);
    this.parameterStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.setupQuery(this.createQueryObject());
    return this;
  }

  /**
   * Adiciona, ao último objeto de parâmetro iniciado, um valor a ser filtrado com o operador (**>**) = GREATER_THAN.
   * 
   * @param value O valor a ser filtrado.
   * @returns A própria instância.
   */
  greaterThan(value: string | number) : IxcOrm {
    this.parameterStub.withOperator(Operators.GREATER_THAN);
    this.parameterStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.setupQuery(this.createQueryObject());
    return this;
  }

  /**
   * Adiciona, ao último objeto de parâmetro iniciado, um valor a ser filtrado com o operador (**>=**) = GREATER_THAN_EQUALS.
   * 
   * @param value O valor a ser filtrado.
   * @returns A própria instância.
   */
  greaterThanEquals(value: string | number) : IxcOrm {
    this.parameterStub.withOperator(Operators.GREATER_THAN_EQUALS);
    this.parameterStub.withValue(value);
    this.addParamToGridAndResetStub();
    super.setupQuery(this.createQueryObject());
    return this;
  }

  /**
   * Define o número da página e a quantidade de registros por página que serão retornados pelo IXc Provedor.
   * 
   * @param page A página a ser buscada.
   * @param rows A quantidade de registros por página.
   * @returns A própria instância.
   */
  paginate(page: number, rows: number) {
    this.pagination = new Pagination(page, rows);
    return this;
  }

  /**
   * Define o tipo de ordenação dos registros retornados pela API do IXC Provedor.
   * 
   * @param sort **ASC** ou **DESC**.
   * @param column A coluna que será utilizada para ordenar os registros.
   * @returns A própria instância.
   */
  orderBy(column: string, sort: Sort) {
    this.ordering = (sort === Sort.ASC)
        ? Ordering.ascBy(super.getTable(), column)
        : Ordering.descBy(super.getTable(), column);
    return this;
  }


  private createQueryObject() {
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
    this.parameters.push(this.parameterStub.toJsonObject());
    this.parameterStub = new Parameter(super.getTable());
  }
}
