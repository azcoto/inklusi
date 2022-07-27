import { Router } from 'express';
import validate from '../util/validator';
import create from './create';
import { zCreateLoanValidator, zUpdateStatusValidator } from './dto';
import getByNo from './getByNo';
import getMany from './getMany';
import updateStatus from './updateStatus';

const loan = Router();

loan.get('/', getMany);
loan.get('/:noPengajuan', getByNo);
loan.put('/', validate(zCreateLoanValidator), create);
loan.patch('/:noPengajuan', validate(zUpdateStatusValidator), updateStatus);

export default loan;
