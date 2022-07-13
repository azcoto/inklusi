import { Router } from 'express';
import authorize, { AppName, Roles } from '../util/authorize';
import validate from '../util/validator';
import allTl from './allTl';
import { zSoOfTlValidator } from './dto';
import soOfTl from './tlOffSo';

const tlSo = Router();

tlSo.get('/', allTl);

tlSo.get('/:nipTl', validate(zSoOfTlValidator), soOfTl);

export default tlSo;
