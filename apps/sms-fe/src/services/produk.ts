import { GetProdukResponse } from '@api/produk/dto';
import api from 'libs/axios-instance';
import { useQuery, UseQueryOptions } from 'react-query';

const getProduk = async () => {
  const response = await api.get<GetProdukResponse>('/produk');
  return response.data;
};

export const useGetProduk = (
  options?: Omit<UseQueryOptions<GetProdukResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery('getProduk', getProduk, options);
};
