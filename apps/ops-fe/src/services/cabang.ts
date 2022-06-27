import { GetAllTlResponse, GetSoByTlResponse } from '@api/tlso/dto';
import api from 'libs/axios-instance';

export const getCabang = async () => {
  const response = await api.get<GetAllTlResponse>(`/cabang`);
  return response.data;
};
