import { AlltipeDebiturResponse } from '@api/tipeDebitur/dto';
import api from 'libs/axios-instance';
import { AxiosResponse } from 'axios';

export const getAlltipeDebitur = async () => {
  const response = await api.get<any, AxiosResponse<AlltipeDebiturResponse>>(
    '/tipe-debitur',
  );
  return response.data;
};
