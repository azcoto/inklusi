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
import {
  allDisburse,
  getDisburse,
  patchDisburse,
  putDisburse,
} from './disburse';
import { createDebitur, getDebitur, getManyDebitur } from './debitur';

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
  debitur: {
    createDebitur,
    getManyDebitur,
    getDebitur,
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
    getDisburse,
    putDisburse,
    patchDisburse,
    allDisburse,
  },
  tlso: {
    getAllTl,
    getSoByTl,
  },
};

export default services;
