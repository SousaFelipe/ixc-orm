import path from 'path';
import dotenv from 'dotenv';
import IXCClient from './IXCClient';
import RecursoIXC, { Recurso } from './recursos';

import Environment from './api/Environment';
import IxcOrm from './IxcOrm';
import IxcResponse from './IxcResponse';
import Operators from './api/Operators';
import Ordering from './api/Ordering';

import {
  IXCOperator,
  IXCOptions,
  IXCQuery,
  IXCRequest,
  IXCRequestMethods,
  IXCResponse,
  IXCSortOrder
} from './types';


const root = (__dirname.includes('\\node_modules\\'))
    ? path.join(__dirname, '../../../.env')
    : path.join(__dirname, '../.env');

const env = dotenv.config({
  quiet: true,
  path: path.resolve(root)
});

if (env.error) {
  console.error(env.error);
  process.exit(1);
}

Environment.getInstance().setToken(process.env.IXC_ACCESS_TOKEN);
Environment.getInstance().setDomain(process.env.IXC_SERVER_DOMAIN);


export {

  IXCClient,
  IXCOperator,
  IXCOptions,
  IXCQuery,
  IXCRequest,
  IXCRequestMethods,
  IXCResponse,
  IXCSortOrder,
  Recurso,
  
  Environment,
  IxcOrm,
  IxcResponse,
  Operators,
  Ordering,

  /**
   * @property RecursoIXC
   * @deprecated Acesse os recursos através da constante {@link Recurso}
   */
  RecursoIXC,
};
