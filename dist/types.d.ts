export declare const IXCOperator: {
    '=': string;
    '>': string;
    '<': string;
    '>=': string;
    '<=': string;
    '!=': string;
    LIKE: string;
};
export declare const IXCSortOrder: {
    asc: string;
    desc: string;
};
export declare const IXCRequestMethods: {
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
};
export interface IXCOptions {
    page: number;
    rowsPerPage?: number;
    sortName?: string;
    sortOrder?: keyof typeof IXCSortOrder;
}
export interface IXCQuery {
    TB: string;
    OP?: string;
    P: string;
}
export interface IXCRequest {
    qtype: string;
    query: string;
    oper: string;
    page: number;
    rp: number;
    sortname: string;
    sortorder: string;
    grid_param?: string;
}
export interface IXCResponse {
    error?: boolean | object;
    message?: string | null;
    id?: string | number;
    page: number | string;
    total: number;
    registros: Array<{
        [key: string]: any;
    }>;
}
