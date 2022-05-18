import { Router } from 'express';
import getBunga from './get-bunga';

const bunga = Router();

bunga.get('/', getBunga);

export default bunga;
