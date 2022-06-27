import { AlltipeDebiturResponse } from '@api/tipeDebitur/dto';
import api from 'libs/axios-instance';

export const getAlltipeDebitur = async () => {
  const response = await api.get<AlltipeDebiturResponse>('/tipe-debitur');
  return response.data;
};
