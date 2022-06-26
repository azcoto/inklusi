import { Router } from 'express';
import authorize, { AppName, Roles } from '../util/authorize';
import getBunga from './get-bunga';

const bunga = Router();

bunga.get(
  '/',
  authorize({ role: [Roles.tl, Roles.so], appname: [AppName.sms] }),
  getBunga,
);

export default bunga;
