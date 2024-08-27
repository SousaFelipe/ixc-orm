"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAxiosInstance = createAxiosInstance;
exports.createRequestPayload = createRequestPayload;
const axios_1 = __importDefault(require("axios"));
/**
 *
 * @param method GET | POST | PUT
 * @returns A instânxia de um objeto do tipo AxiosInstance, pre-confugurado com os cabeçalhos necessários
 */
function createAxiosInstance(method = 'GET') {
    const host = process.env.IXC_HOST;
    const token = process.env.IXC_TOKEN;
    return axios_1.default.create({
        method: method,
        baseURL: host !== null && host !== void 0 ? host : 'http://127.0.0.1:3000/webservice/v1',
        headers: {
            'ixcsoft': (method === 'GET') ? 'listar' : '',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(token !== null && token !== void 0 ? token : '').toString('base64')}`
        }
    });
}
/**
 *
 * @param table Nome da tabelado IXC onde será feita a busca, atualização, inserção ou remoção
 * @param params Parâmetros da busca (desconciderado em cadastros de novos registros)
 * @param options Parâmetros de formatação dos dados da responsta (página, ítens por página e ordenação)
 * @returns
 */
function createRequestPayload(table, params, options) {
    var _a, _b, _c, _d;
    const page = (_a = options === null || options === void 0 ? void 0 : options.page) !== null && _a !== void 0 ? _a : 1;
    const rowsPerPage = (_b = options === null || options === void 0 ? void 0 : options.rowsPerPage) !== null && _b !== void 0 ? _b : 20;
    const sortName = (_c = options === null || options === void 0 ? void 0 : options.sortName) !== null && _c !== void 0 ? _c : 'id';
    const sortOrder = (_d = options === null || options === void 0 ? void 0 : options.sortOrder) !== null && _d !== void 0 ? _d : 'asc';
    if (Array.isArray(params)) {
        let grid_param = [];
        params.forEach(p => {
            grid_param.push({
                TB: `${table}.${p.TB}`,
                OP: p.OP || '=',
                P: p.P
            });
        });
        return { data: {
                qtype: table,
                query: '',
                oper: '',
                page: page,
                rp: rowsPerPage,
                sortname: `${table}.${sortName}`,
                sortorder: sortOrder,
                grid_param: JSON.stringify(grid_param)
            } };
    }
    return { data: {
            qtype: `${table}.${params.TB}`,
            query: params.P,
            oper: params.OP || '=',
            page: page,
            rp: rowsPerPage,
            sortname: `${table}.${sortName}`,
            sortorder: sortOrder
        } };
}
