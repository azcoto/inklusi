import { Router } from 'express';
import authorize, { AppName, Roles } from '../util/authorize';
import areaPotensiKecamatanTL from './areaPotensiKecamatanTL';
import areaPotensiKelurahanTL from './areaPotensiKelurahanTL';
import areaPotensiKotaTL from './areaPotensiKotaTL';

const areaPotensiTL = Router();

areaPotensiTL.get(
  '/:nip',
  authorize({ role: [Roles.tl], appname: [AppName.sms] }),
  areaPotensiKotaTL,
);
areaPotensiTL.get(
  '/:tlNIP/:dati2(.*)',
  authorize({ role: [Roles.tl], appname: [AppName.sms] }),
  areaPotensiKecamatanTL,
);
areaPotensiTL.get(
  '/:tlNIP/:dati2(.*)/:dati3(.*)',
  authorize({ role: [Roles.tl], appname: [AppName.sms] }),
  areaPotensiKelurahanTL,
);

export default areaPotensiTL;
