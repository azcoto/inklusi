import { Router } from 'express';
import create from './create';
import getByCIF from './getByCIF';
import getMany from './getMany';

const debitur = Router();

debitur.get('/', getMany);
debitur.get('/:cif', getByCIF);
debitur.put('/', create);

export default debitur;
