import { signIn } from './auth';
import { setItem, getItem } from './localStorage';
import { getPotensiByArea, testConcurrent } from './potensi';
import {
  getPotensiKecamatanTL,
  getPotensiKelurahanTL,
  getPotensiKotaTL,
} from './leader';
import { getProduk } from './produk';
import { postAssignVisit, bySFVisit, visitDetail, patchVisit } from './visit';
import { getAlltipeDebitur } from './tipeDebitur';
import { getAllCabang } from './cabang';
import { getAllTl, getSoByTl } from './tlso';
import { allDisburse, putDisburse } from './disburse';

const services = {
  auth: {
    signIn,
  },
  storage: {
    setItem,
    getItem,
  },
  potensi: {
    getPotensiByArea,
    testConcurrent,
  },
  potensiTL: {
    getPotensiKotaTL,
    getPotensiKecamatanTL,
    getPotensiKelurahanTL,
  },
  produk: {
    getProduk,
  },
  tipeDebitur: {
    getAlltipeDebitur,
  },
  cabang: {
    getAllCabang,
  },
  visit: {
    postAssignVisit,
    bySFVisit,
    visitDetail,
    patchVisit,
  },
  disburse: {
    putDisburse,
    allDisburse,
  },
  tlso: {
    getAllTl,
    getSoByTl,
  },
};

export default services;
