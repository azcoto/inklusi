import { Router } from 'express';
import authorize, { AppName, Roles } from '../util/authorize';
import areaPotensiKecamatanTL from './areaPotensiKecamatanTL';
import areaPotensiKelurahanTL from './areaPotensiKelurahanTL';
import areaPotensiKotaTL from './areaPotensiKotaTL';

const areaPotensiTL = Router();

areaPotensiTL.get(
  '/:tlNIP/kota',
  authorize({ role: [Roles.tl], appname: [AppName.sms] }),
  areaPotensiKotaTL,
);
areaPotensiTL.get(
  '/:tlNIP/kecamatan',
  authorize({ role: [Roles.tl], appname: [AppName.sms] }),
  areaPotensiKecamatanTL,
);
areaPotensiTL.get(
  '/:tlNIP/kelurahan',
  authorize({ role: [Roles.tl], appname: [AppName.sms] }),
  areaPotensiKelurahanTL,
);

export default areaPotensiTL;
