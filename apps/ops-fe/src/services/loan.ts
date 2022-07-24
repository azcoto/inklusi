import {
  CreateLoanIn,
  CreateLoanOut,
  GetLoanIn,
  GetLoanOut,
  GetManyLoanIn,
  GetManyLoanOut,
} from '@api/loan/dto';
import api from 'libs/axios-instance';
import { AxiosResponse } from 'axios';

export const createLoan = async (body: CreateLoanIn) => {
  const response = await api.put<CreateLoanIn, AxiosResponse<CreateLoanOut>>(
    '/loan',
    body,
  );
  return response.data;
};

export const getManyLoan = async (page: number, filter: string | null) => {
  const response = await api.get<GetManyLoanIn, AxiosResponse<GetManyLoanOut>>(
    `/loan?page=${page}` + `${filter ? `&filter=${filter}` : ``}`,
  );
  return response.data;
};

export const getLoan = async (noPengajuan: string) => {
  const response = await api.get<GetLoanIn, AxiosResponse<GetLoanOut>>(
    `/loan/${noPengajuan}`,
  );
  return response.data;
};
