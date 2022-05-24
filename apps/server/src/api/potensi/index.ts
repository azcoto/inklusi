import { Router } from 'express';
import validate from '../util/validator';
import { zGetPotensiByAreaValidator } from './dto';
import getPotensiByArea from './get-potensi';

const potensi = Router();

potensi.get('/area', validate(zGetPotensiByAreaValidator), getPotensiByArea);

export default potensi;
