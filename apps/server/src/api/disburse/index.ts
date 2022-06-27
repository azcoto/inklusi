import { Router } from 'express';
import allDisburse from './allDisburse';
import putDisburse from './putDisburse';

const disburse = Router();

disburse.get('/', allDisburse);
disburse.put('/', putDisburse);

export default disburse;
