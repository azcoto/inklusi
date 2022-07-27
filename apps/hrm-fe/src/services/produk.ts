import { GetProdukResponse } from '@api/produk/dto';
import api from 'libs/axios-instance';

export const getProduk = async () => {
  const response = await api.get<GetProdukResponse>('/produk');
  return response.data;
};
