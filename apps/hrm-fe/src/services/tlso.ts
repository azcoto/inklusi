import { AxiosResponse } from 'axios';
import { GetAllTlResponse, GetSoByTlResponse } from '@api/tlso/dto';
import api from 'libs/axios-instance';

export const getAllTl = async () => {
  const response = await api.get<unknown, AxiosResponse<GetAllTlResponse>>(
    `/tlso`,
  );
  return response.data;
};

export const getSoByTl = async (nipTl: string) => {
  const response = await api.get<unknown, AxiosResponse<GetSoByTlResponse>>(
    `/tlso/${nipTl}`,
  );
  return response.data;
};
