import { Router } from 'express';
import authorize, { AppName, Roles } from '../util/authorize';
import validate from '../util/validator';
import { zGetPotensiByAreaValidator } from './dto';
import getPotensiByArea from './get-potensi';

const potensi = Router();

potensi.get(
  '/area',
  authorize({ role: [Roles.tl], appname: [AppName.sms] }),
  validate(zGetPotensiByAreaValidator),
  getPotensiByArea,
);

export default potensi;
