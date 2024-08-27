import path from 'path';
import dotenv from 'dotenv';

import IXCClient from './IXCClient';



const env = dotenv.config({
  path: path.join(__dirname, `../.env`)
});

if (env.error) {
  console.error(env.error);
  process.exit(-1);
}



export default {

  IXCClient

} as const;
