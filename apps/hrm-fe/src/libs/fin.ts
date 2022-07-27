import { pv, pmt } from 'financial';

type skemaBunga = 'ANUITAS' | 'FLAT';

export const xPV = (
  rate: number,
  nper: number,
  pmt: number,
  skema: skemaBunga,
) => {
  let raw: number;
  if (skema === 'ANUITAS') {
    raw = -pv(rate / 12, nper, pmt);
  } else {
    raw = (12 * pmt * nper) / (rate * nper + 12);
  }

  raw = Math.floor(raw / 100000) * 100000;

  return raw;
};

export const xPMT = (
  pv: number,
  rate: number,
  nper: number,
  skema: skemaBunga,
) => {
  let raw: number;
  if (skema === 'ANUITAS') {
    raw = -pmt(rate / 12, nper, pv);
  } else {
    raw = pv / nper + (rate / 12) * pv;
  }

  raw = Math.ceil(raw);

  return raw;
};
