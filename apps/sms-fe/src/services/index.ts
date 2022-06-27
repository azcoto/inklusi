import { signIn } from './auth';
import { setItem, getItem } from './localStorage';
import { getPotensiByArea, testConcurrent } from './potensi';
import {
  getPotensiKecamatanTL,
  getPotensiKelurahanTL,
  getPotensiKotaTL,
} from './leader';
import { getAlltipeDebitur } from './tipeDebitur';
import { getProduk } from './produk';
import { getIndeksPengali } from './indeksPengali';
import { postAssignVisit, bySFVisit, visitDetail, patchVisit } from './visit';

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
  tipeDebitur: {
    getAlltipeDebitur,
  },
  produk: {
    getProduk,
  },
  indeksPengali: {
    getIndeksPengali,
  },
  visit: {
    postAssignVisit,
    bySFVisit,
    visitDetail,
    patchVisit,
  },
};

export default services;
