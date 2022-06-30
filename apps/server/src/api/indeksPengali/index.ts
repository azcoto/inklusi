import { Router } from 'express';
import allIndeksPengali from './allIndeksPengali';

const indeksPengali = Router();

indeksPengali.get('/', allIndeksPengali);

export default indeksPengali;
