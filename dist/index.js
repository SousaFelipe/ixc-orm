"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const IXCClient_1 = __importDefault(require("./IXCClient"));
const env = dotenv_1.default.config({
    path: path_1.default.join(__dirname, `../.env`)
});
if (env.error) {
    console.error(env.error);
    process.exit(-1);
}
exports.default = {
    IXCClient: IXCClient_1.default
};
