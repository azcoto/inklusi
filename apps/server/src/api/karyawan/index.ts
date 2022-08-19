import { Router } from 'express';
import create from './create';
import getByNIP from './getByNIP';
import getMany from './getMany';

const karyawan = Router();

karyawan.get('/', getMany);
karyawan.get('/:nip', getByNIP);
karyawan.put('/', create);

export default karyawan;
