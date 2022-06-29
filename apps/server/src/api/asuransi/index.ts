import { Router } from 'express';
import allAsuransi from './allAsuransi';

const produk = Router();

produk.get('/', allAsuransi);

export default produk;
