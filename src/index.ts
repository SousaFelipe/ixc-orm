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



const root = (__dirname.includes('\\node_modules\\'))
  ? path.join(__dirname, '../../../.env')
  : path.join(__dirname, '../../.env');

const env = dotenv.config({ path: root });

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
  IXCSortOrder,
  Recurso,
  /**
   * @property RecursoIXC
   * @deprecated Acesse os recursos através da constante {@link Recurso}
   */
  RecursoIXC,
};
