import { Router } from 'express';
import authorize, { AppName, Roles } from '../util/authorize';
import validate from '../util/validator';
import { zSoOfTlValidator } from './dto';
import soOfTl from './tlOffSo';

const tlSo = Router();

tlSo.get(
  '/:nipTl',
  validate(zSoOfTlValidator),
  authorize({ role: [Roles.tl], appname: [AppName.sms] }),
  soOfTl,
);

export default tlSo;
