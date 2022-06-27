import { Router } from 'express';
import authorize, { AppName, Roles } from '../util/authorize';
import validate from '../util/validator';
import allTl from './allTl';
import { zSoOfTlValidator } from './dto';
import soOfTl from './tlOffSo';

const tlSo = Router();

tlSo.get('/', authorize({ role: [Roles.adm], appname: [AppName.ops] }), allTl);

tlSo.get(
  '/:nipTl',
  validate(zSoOfTlValidator),
  authorize({
    role: [Roles.tl, Roles.adm],
    appname: [AppName.sms, AppName.ops],
  }),
  soOfTl,
);

export default tlSo;
