import { GetPotensiByAreaDTO, PotensiDTO } from '@api/potensi/dto';
import api from 'libs/axios-instance';
import { useQuery, UseQueryOptions } from 'react-query';

export const UseGetPotensiByArea = (
  body: Omit<GetPotensiByAreaDTO, 'page'> & { page: number },
  options?: Omit<UseQueryOptions<PotensiDTO[]>, 'queryKey' | 'queryFn'>,
) => {
  useQuery(
    ['getPotensiByArea', body],
    async () => {
      const response = await api.get<PotensiDTO[]>(`/potensi/area`, {
        params: body,
      });
      return response.data;
    },
    options,
  );
};
