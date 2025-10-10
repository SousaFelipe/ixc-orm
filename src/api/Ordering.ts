import utils from "./Utils";

export enum Sort {
  ASC = 'asc',
  DESC = 'desc'
};


export default class Ordering {

  public static ascBy(table: string, column: string) : Ordering {
    const normalizedTable = utils.Text.normalize(table);
    const normalizedColumn = utils.Text.normalize(column);
    return new Ordering(`${normalizedTable}.${normalizedColumn}`, Sort.ASC);
  }

  public static descBy(table: string, column: string) : Ordering {
    const normalizedTable = utils.Text.normalize(table);
    const normalizedColumn = utils.Text.normalize(column);
    return new Ordering(`${normalizedTable}.${normalizedColumn}`, Sort.DESC);
  }

  constructor(
    private sortName: string,
    private sortOrder: Sort
  ) {
    this.sortName = sortName;
    this.sortOrder = sortOrder;
  }

  getSortName() : string {
    return this.sortName ?? 'id';
  }

  getSortOrder() : Sort {
    return this.sortOrder ?? Sort.ASC;
  }
}
