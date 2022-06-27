import {
  PutDisburseResponse,
  PutDisburseBody,
  AllDisburseResponse,
} from '@api/disburse/dto';
import api from 'libs/axios-instance';

export const putDisburse = async (body: PutDisburseBody) => {
  const response = await api.put<PutDisburseResponse>('/disburse', { ...body });
  return response.data;
};

export const allDisburse = async () => {
  const response = await api.get<AllDisburseResponse>('/disburse');
  return response.data;
};
