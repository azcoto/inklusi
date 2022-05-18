import { Router } from 'express';
import getProduk from './get-produk';

const produk = Router();

produk.get('/', getProduk);

export default produk;
