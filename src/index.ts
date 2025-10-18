import IXCClient from './IXCClient';
import RecursoIXC, { Recurso } from './recursos';

import Environment from './api/Environment';
import IxcOrm from './IxcOrm';
import IxcResponse from './IxcResponse';
import Operators from './api/Operators';
import Ordering from './api/Ordering';
import Utils from './utils';

import {
  IXCOperator,
  IXCOptions,
  IXCQuery,
  IXCRequest,
  IXCRequestMethods,
  IXCResponse,
  IXCSortOrder
} from './types';


Environment.getInstance();


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
  Utils,

  /**
   * @property RecursoIXC
   * @deprecated Acesse os recursos através da constante {@link Recurso}
   */
  RecursoIXC,
};
