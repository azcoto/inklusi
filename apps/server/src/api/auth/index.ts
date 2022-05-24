import { Router } from 'express';
import validate from '../util/validator';
import { zSignInValidator } from './dto';
import signin from './signin';

const auth = Router();

auth.post('/signin', validate(zSignInValidator), signin);

export default auth;
