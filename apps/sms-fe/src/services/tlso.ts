import { GetSoByTlResponse } from '@api/tlso/dto';
import api from 'libs/axios-instance';

export const getSoByTl = async (nipTl: string) => {
  const response = await api.get<GetSoByTlResponse>(`/tlso/${nipTl}`);
  return response.data;
};

export const getAllTl = async (nipTl: string) => {
  const response = await api.get<GetSoByTlResponse>(`/tlso/${nipTl}`);
  return response.data;
};
