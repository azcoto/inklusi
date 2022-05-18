import { Router } from 'express';
import areaPotensiKecamatanTL from './areaPotensiKecamatanTL';
import areaPotensiKelurahanTL from './areaPotensiKelurahanTL';
import areaPotensiKotaTL from './areaPotensiKotaTL';

const areaPotensiTL = Router();

areaPotensiTL.get('/:tlNIP', areaPotensiKotaTL);
areaPotensiTL.get('/:tlNIP/:dati2', areaPotensiKecamatanTL);
areaPotensiTL.get('/:tlNIP/:dati2/:dati3', areaPotensiKelurahanTL);

export default areaPotensiTL;
