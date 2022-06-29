import { AllAsuransiResponse } from '@api/asuransi/dto';
import api from 'libs/axios-instance';

export const allAsuransi = async () => {
  const response = await api.get<AllAsuransiResponse>('/asuransi');
  return response.data;
};
