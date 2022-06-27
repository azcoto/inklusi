import { Router } from 'express';
import getIndeksPengali from './get-pengali';
import getProduk from './get-produk';

const produk = Router();

produk.get('/', getProduk);
produk.get('/:produkId/:tenor', getIndeksPengali);

export default produk;
