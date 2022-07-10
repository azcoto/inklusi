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
import { allIndeksPengali, getIndeksPengali } from './indeksPengali';
import {
  postAssignVisit,
  bySFVisit,
  visitDetail,
  patchVisit,
  allVisitByTL,
  sumVisitByTL,
} from './visit';
import { allAsuransi } from './asuransi';

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
  asuransi: {
    allAsuransi,
  },
  indeksPengali: {
    getIndeksPengali,
    allIndeksPengali,
  },
  visit: {
    postAssignVisit,
    bySFVisit,
    visitDetail,
    patchVisit,
    allVisitByTL,
    sumVisitByTL,
  },
};

export default services;
