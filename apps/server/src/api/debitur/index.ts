import { Router } from 'express';
import create from './create';
import getByCIF from './getByCIF';
import getMany from './getMany';
import update from './update';

const debitur = Router();

debitur.get('/', getMany);
debitur.get('/:cif', getByCIF);
debitur.put('/', create);
debitur.patch('/:cif', update);

export default debitur;
