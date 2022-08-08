import { Router } from 'express';
import validate from '../util/validator';
import create from './create';
import { zCreateLoanValidator, zUpdateStatusValidator } from './dto';
import getByNo from './getByNo';
import getMany from './getMany';
import update from './update';
import updateStatus from './updateStatus';

const loan = Router();

loan.get('/', getMany);
loan.get('/:noPengajuan', getByNo);
loan.put('/', validate(zCreateLoanValidator), create);
loan.patch('/:noPengajuan', update);
loan.patch(
  '/:noPengajuan/status',
  validate(zUpdateStatusValidator),
  updateStatus,
);

export default loan;
