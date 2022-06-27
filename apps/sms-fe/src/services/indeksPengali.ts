import { IndeksPengaliResponse } from '@api/produk/dto';
import api from 'libs/axios-instance';

export const getIndeksPengali = async (produkId: number, tenor: number) => {
  const response = await api.get<IndeksPengaliResponse>(
    `/produk/${produkId}/${tenor}`,
  );
  return response.data;
};
