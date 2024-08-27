import path from 'path';
import dotenv from 'dotenv';

import IXCClient from './IXCClient';

import {
  IXCOperator,
  IXCOptions,
  IXCQuery,
  IXCRequest,
  IXCRequestMethods,
  IXCResponse,
  IXCSortOrder
} from './types';



const env = dotenv.config({
  path: path.join(__dirname, `../.env`)
});

if (env.error) {
  console.error(env.error);
  process.exit(-1);
}


export {
  IXCClient,
  IXCOperator,
  IXCOptions,
  IXCQuery,
  IXCRequest,
  IXCRequestMethods,
  IXCResponse,
  IXCSortOrder
};
