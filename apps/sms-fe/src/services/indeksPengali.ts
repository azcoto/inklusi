import { AllIndeksPengaliResponse } from '@api/indeksPengali/dto';
import { IndeksPengaliResponse } from '@api/produk/dto';
import api from 'libs/axios-instance';

export const allIndeksPengali = async () => {
  const response = await api.get<AllIndeksPengaliResponse>(`/pengali`);
  return response.data;
};

export const getIndeksPengali = async (produkId: number, tenor: number) => {
  const response = await api.get<IndeksPengaliResponse>(
    `/produk/${produkId}/${tenor}`,
  );
  return response.data;
};
