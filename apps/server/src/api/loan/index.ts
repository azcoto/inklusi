import { Router } from 'express';
import validate from '../util/validator';
import create from './create';
import { zCreateLoanValidator } from './dto';
import getByNo from './getByNo';
import getMany from './getMany';

const loan = Router();

loan.get('/', getMany);
loan.get('/:noPengajuan', getByNo);
loan.put('/', validate(zCreateLoanValidator), create);

export default loan;
