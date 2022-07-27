import { Router } from 'express';
import authorize, { AppName, Roles } from '../util/authorize';
import validate from '../util/validator';
import { zSignInValidator, zUserCabangSignInValidator } from './dto';
import { me } from './me';
import { refresh } from './refresh';
import signin from './signin';
import signinCabang from './signinCabang';

const auth = Router();

auth.post('/signin', validate(zSignInValidator), signin);
auth.post(
  '/user-cabang-signin',
  validate(zUserCabangSignInValidator),
  signinCabang,
);
auth.get('/me', authorize({ role: [Roles.tl], appname: [AppName.sms] }), me);

auth.post('/refresh', refresh);

export default auth;
