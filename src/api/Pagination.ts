

export default class Pagination {

  public static defaults() : Pagination {
    return new Pagination(1, 20);
  }

  constructor (
    private page: number,
    private rows: number
  ) {
    this.page = page;
    this.rows = rows;
  }

  getPage() : number {
    return this.page ?? 1;
  }

  getRows() : number {
    return this.rows ?? 20;
  }

}