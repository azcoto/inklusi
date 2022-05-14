import { Router } from 'express';
import validate from '../util/validator';
import { zSignInDto } from './dto';
import signin from './signin';

const auth = Router();

auth.use('/signin', validate(zSignInDto), signin);

export default auth;
