import path from 'path';
import dotenv from 'dotenv';
import IXCClient from './IXCClient';
import RecursoIXC, { Recurso } from './recursos';

import {
  IXCOperator,
  IXCOptions,
  IXCQuery,
  IXCRequest,
  IXCRequestMethods,
  IXCResponse,
  IXCSortOrder
} from './types';
import Environment from './config/environment';


const root = (__dirname.includes('\\node_modules\\'))
  ? path.join(__dirname, '../../../.env')
  : path.join(__dirname, '../../.env');

const env = dotenv.config({ path: root });

if (env.error) {
  console.error(env.error);
  process.exit(-1);
}
else {
  Environment.getInstance().setHost(process.env.IXC_HOST);
  Environment.getInstance().setToken(process.env.IXC_TOKEN);
}


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
  /**
   * @property RecursoIXC
   * @deprecated Acesse os recursos através da constante {@link Recurso}
   */
  RecursoIXC,
};
