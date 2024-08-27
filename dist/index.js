"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IXCSortOrder = exports.IXCRequestMethods = exports.IXCOperator = exports.IXCClient = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const IXCClient_1 = __importDefault(require("./IXCClient"));
exports.IXCClient = IXCClient_1.default;
const types_1 = require("./types");
Object.defineProperty(exports, "IXCOperator", { enumerable: true, get: function () { return types_1.IXCOperator; } });
Object.defineProperty(exports, "IXCRequestMethods", { enumerable: true, get: function () { return types_1.IXCRequestMethods; } });
Object.defineProperty(exports, "IXCSortOrder", { enumerable: true, get: function () { return types_1.IXCSortOrder; } });
const env = dotenv_1.default.config({
    path: path_1.default.join(__dirname, `../.env`)
});
if (env.error) {
    console.error(env.error);
    process.exit(-1);
}
