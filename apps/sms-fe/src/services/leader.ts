import {
  DataPotensiKotaTL,
  DataPotensiKecamatanTL,
  DataPotensiKelurahanTL,
} from '@api/leader/dto';
import api from 'libs/axios-instance';

export const getPotensiKotaTL = async (nip: string) => {
  const response = await api.get<DataPotensiKotaTL>(`/leader/${nip}/kota`);
  return response.data;
};

export const getPotensiKecamatanTL = async (nip: string, kota: string) => {
  const response = await api.get<DataPotensiKecamatanTL>(
    `/leader/${nip}/kecamatan`,
    {
      params: {
        dati2: kota,
      },
    },
  );
  return response.data;
};

export const getPotensiKelurahanTL = async (
  nip: string,
  kota: string,
  kecamatan: string,
) => {
  const response = await api.get<DataPotensiKelurahanTL>(
    `/leader/${nip}/kelurahan`,
    {
      params: {
        dati2: kota,
        dati3: kecamatan,
      },
    },
  );
  return response.data;
};
