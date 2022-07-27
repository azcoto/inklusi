import {
  PutDisburseResponse,
  PutDisburseBody,
  AllDisburseResponse,
  GetDisburseResponse,
  PatchDisburseBody,
  PatchtDisburseResponse,
} from '@api/disburse/dto';
import api from 'libs/axios-instance';

export const putDisburse = async (body: PutDisburseBody) => {
  const response = await api.put<PutDisburseResponse>('/disburse', { ...body });
  return response.data;
};

export const patchDisburse = async (body: PatchDisburseBody) => {
  const response = await api.patch<PatchtDisburseResponse>('/disburse', {
    ...body,
  });
  return response.data;
};

export const allDisburse = async () => {
  const response = await api.get<AllDisburseResponse>('/disburse');
  return response.data;
};

export const getDisburse = async (id: string) => {
  const response = await api.get<GetDisburseResponse>(`/disburse/${id}`);
  return response.data;
};
