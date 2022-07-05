import { Router } from 'express';
import authorize, { AppName, Roles } from '../util/authorize';
import validate from '../util/validator';
import {
  zAssignVisitValidator,
  zBySFValidator,
  zPatchVisitValidator,
  zVisitDetailValidator,
} from './dto';
import assignVisit from './assignVisit';
import bySF from './bySF';
import visitDetail from './visitDetail';
import patchVisit from './patchVisit';
import allVisitByTl from './allVisit';
import summaryByTL from './summaryByTL';

const visit = Router();

visit.post(
  '/:nipTl/:nipSo',
  validate(zAssignVisitValidator),
  authorize({ role: [Roles.tl], appname: [AppName.sms] }),
  assignVisit,
);

visit.get(
  '/sf/:nipSo/:notas',
  validate(zVisitDetailValidator),
  authorize({ role: [Roles.so], appname: [AppName.sms] }),
  visitDetail,
);

visit.get('/tl/:nipTl', allVisitByTl);
visit.get('/report/tl/:nipTl', summaryByTL);

visit.get(
  '/sf/:nipSo',
  validate(zBySFValidator),
  authorize({ role: [Roles.so], appname: [AppName.sms] }),
  bySF,
);

visit.patch(
  '/',
  validate(zPatchVisitValidator),
  authorize({ role: [Roles.so], appname: [AppName.sms] }),
  patchVisit,
);

export default visit;
