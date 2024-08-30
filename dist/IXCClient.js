"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const request_1 = require("./request");
const types_1 = require("./types");
class IXCClient {
    /**
     *
     * @param table O nome da tabela correspondente ao banco de dados do seu servidor IXC
     * @see {@link https://wikiapiprovedor.ixcsoft.com.br/index.php}
     */
    constructor(table) {
        this.table = table;
        this.params = [];
        this.options = {
            page: 1,
            rowsPerPage: 20,
            sortName: 'id',
            sortOrder: 'asc'
        };
    }
    /**
     *
     * @param whereClauses Um array de strings, no formato [coluna, operador, valor]
     * Obs: se você passar um array no formato [coluna, valor] o operador será considerado como '='
     * Operadores válidos: =, !=, >, <, >=, <=, LIKE
     * @returns A própria instância
     */
    where(whereClauses) {
        if (whereClauses.length > 3) {
            throw new Error(`> O array de cláusulas não pode conter mais de 3 elementos!`);
        }
        const [alwaysColumn, operatorOrValue, valueOrUndefined] = whereClauses;
        const availableOperators = Object.keys(types_1.IXCOperator);
        if (whereClauses.length > 2 && !availableOperators.includes(operatorOrValue)) {
            throw new Error(`> O operador ${operatorOrValue}, não faz parte dos operadores válidos: ${availableOperators}`);
        }
        this.params.push({
            TB: alwaysColumn,
            OP: valueOrUndefined ? operatorOrValue : '=',
            P: valueOrUndefined ? valueOrUndefined : operatorOrValue
        });
        return this;
    }
    /**
     *
     * @param column A coluna que será usada para ordenar a busca
     * @param order A ordem da busca ('asc'ou 'desc')
     * @returns A própria instância
     */
    orderBy(column, order) {
        this.options.sortName = column;
        this.options.sortOrder = order;
        return this;
    }
    /**
     *
     * @param pg O número da página que será solicitada ao IXC
     * @param rows A quantidade de linhas (registros) por página
     * @returns Promise<null | IXCResponse | AxiosError>
     */
    get(pg, rows) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = this.options, { page, rowsPerPage } = _a, rest = __rest(_a, ["page", "rowsPerPage"]);
            const opts = Object.assign({ page: pg !== null && pg !== void 0 ? pg : page, rowsPerPage: rows !== null && rows !== void 0 ? rows : rowsPerPage }, rest);
            const axios = (0, request_1.createAxiosInstance)('GET');
            const payload = (0, request_1.createRequestPayload)(this.table, this.params, opts);
            try {
                const response = yield axios.get(this.table, { data: payload });
                return response.data;
            }
            catch (error) {
                console.error(error);
                if (error instanceof axios_1.AxiosError) {
                    return error;
                }
                return null;
            }
            finally {
                this.params = [];
                this.options = {
                    page: 1,
                    rowsPerPage: 20,
                    sortName: 'id',
                    sortOrder: 'asc'
                };
            }
        });
    }
    /**
     *
     * @param body Um objeto no formado "chave: valor" contendo as informações do novo registro
     * a ser inserido no banco de dados do seu servidor IXC
     * @returns Promise<null | IXCResponse | AxiosError>
     */
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const axios = (0, request_1.createAxiosInstance)('POST');
            try {
                const response = yield axios.post(this.table, { data: body });
                return response.data;
            }
            catch (error) {
                console.error(error);
                if (error instanceof axios_1.AxiosError) {
                    return error;
                }
                return null;
            }
            finally {
                this.params = [];
            }
        });
    }
    /**
     *
     * @param id O id do registro que será alterado
     * @param body Um objeto no formado "chave : valor" contendo as colunas que serão alteradas
     * @returns Promise<null | IXCResponse | AxiosError>
     */
    put(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const axios = (0, request_1.createAxiosInstance)('PUT');
            try {
                const response = yield axios.put(`${this.table}/${id}`, { data: body });
                return response.data;
            }
            catch (error) {
                console.error(error);
                if (error instanceof axios_1.AxiosError) {
                    return error;
                }
                return null;
            }
            finally {
                this.params = [];
            }
        });
    }
}
exports.default = IXCClient;
