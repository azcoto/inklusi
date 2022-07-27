import { GetPotensiByAreaDTO, PotensiDTO } from '@api/potensi/dto';
import api from 'libs/axios-instance';

export const getPotensiByArea = async (body: GetPotensiByAreaDTO) => {
  const response = await api.get<PotensiDTO[]>(`/potensi/area`, {
    params: body,
  });
  return response.data;
};

export const testConcurrent = async () => {
  const response = await api.get(`/auth/me`);
  return response.data;
};
