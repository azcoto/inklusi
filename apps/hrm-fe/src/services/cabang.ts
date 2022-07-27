import { AllCabangResponse } from '@api/cabang/dto';
import api from 'libs/axios-instance';

export const getAllCabang = async () => {
  const response = await api.get<AllCabangResponse>(`/cabang`);
  return response.data;
};
