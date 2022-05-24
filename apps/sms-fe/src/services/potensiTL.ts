import {
  DataPotensiKotaTL,
  DataPotensiKecamatanTL,
  DataPotensiKelurahanTL,
} from '@api/area-potensi-tl/dto';
import api from 'libs/axios-instance';
import { useQuery, UseQueryOptions } from 'react-query';

export const getPotensiKotaTL = async (tlNIP: string) => {
  // if (!tlNIP) return;
  const response = await api.get<DataPotensiKotaTL>(
    `/area-potensi-tl/${tlNIP}`,
  );
  return response.data;
};

export const usePotensiKotaTL = (
  tlNIP: string | null,
  options?: Omit<UseQueryOptions<DataPotensiKotaTL>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery(
    ['getPotensiKotaTL', { tlNIP }],
    async () => {
      // if (!tlNIP) throw new Error('User is not logged in');
      const response = await api.get<DataPotensiKotaTL>(
        `area-potensi-tl/${tlNIP}`,
      );
      return response.data;
    },
    options,
  );
};

export const usePotensiKecamatanTL = (
  tlNIP: string,
  kota: string,
  options?: Omit<
    UseQueryOptions<DataPotensiKecamatanTL>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery(
    ['getPotensiKecamatanTl', { tlNIP, kota }],
    async () => {
      if (!tlNIP) throw new Error('User is not logged in');
      const response = await api.get<DataPotensiKecamatanTL>(
        `area-potensi-tl/${tlNIP}/${kota}`,
      );
      return response.data;
    },
    options,
  );
};

export const usePotensiKelurahanTL = (
  tlNIP: string,
  kota: string,
  kecamatan: string,
  options?: Omit<
    UseQueryOptions<DataPotensiKelurahanTL>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery(
    ['getPotensiKelurahanTl', { tlNIP, kota, kecamatan }],
    async () => {
      if (!tlNIP) throw new Error('User is not logged in');
      const response = await api.get<DataPotensiKelurahanTL>(
        `area-potensi-tl/${tlNIP}/${kota}/${kecamatan}`,
      );
      return response.data;
    },
    options,
  );
};
