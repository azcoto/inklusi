import { signIn, userCabangSignIn } from './auth';
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
import {
  createDebitur,
  getDebitur,
  getManyDebitur,
  updateDebitur,
} from './debitur';
import { createLoan, getLoan, getManyLoan, updateStatusLoan } from './loan';
import { createKaryawan, getKaryawan, getManyKaryawan } from './karyawan';

const services = {
  auth: {
    signIn,
    userCabangSignIn,
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
    updateDebitur,
    getManyDebitur,
    getDebitur,
  },
  loan: {
    createLoan,
    getManyLoan,
    getLoan,
    updateStatusLoan,
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
  karyawan: {
    createKaryawan,
    getManyKaryawan,
    getKaryawan,
  },
};

export default services;
