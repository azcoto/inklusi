import {
  DataPotensiKotaTL,
  DataPotensiKecamatanTL,
  DataPotensiKelurahanTL,
} from '@api/leader/dto';
import api from 'libs/axios-instance';

export const getPotensiKotaTL = async (nip: string) => {
  const response = await api.get<DataPotensiKotaTL>(`/leader/${nip}`);
  return response.data;
};

export const getPotensiKecamatanTL = async (nip: string, kota: string) => {
  const response = await api.get<DataPotensiKecamatanTL>(
    `/leader/${nip}/${encodeURIComponent(kota)}`,
  );
  return response.data;
};

export const getPotensiKelurahanTL = async (
  nip: string,
  kota: string,
  kecamatan: string,
) => {
  const response = await api.get<DataPotensiKelurahanTL>(
    `/leader/${nip}/${encodeURIComponent(kota)}/${encodeURIComponent(
      kecamatan,
    )}`,
  );
  return response.data;
};
