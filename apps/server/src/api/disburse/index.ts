import { Router } from 'express';
import allDisburse from './allDisburse';
import getDisburse from './getDisburse';
import patchDisburse from './patchDisburse';
import putDisburse from './putDisburse';

const disburse = Router();

disburse.get('/', allDisburse);
disburse.get('/:id', getDisburse);
disburse.put('/', putDisburse);
disburse.patch('/', patchDisburse);

export default disburse;
