import { Router } from 'express';
import allCabang from './allCabang';

const cabang = Router();

cabang.get('/', allCabang);

export default cabang;
