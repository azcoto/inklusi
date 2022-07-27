import {
  CreateLoanIn,
  CreateLoanOut,
  GetLoanIn,
  GetLoanOut,
  GetManyLoanIn,
  GetManyLoanOut,
  UpdateStatusBodyIn,
  UpdateStatusOut,
  UpdateStatusParamsIn,
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

export const getManyLoan = async (body: GetManyLoanIn) => {
  const { page, filter, cabangId } = body;
  const response = await api.get<GetManyLoanIn, AxiosResponse<GetManyLoanOut>>(
    `/loan?page=${page}` +
      (filter ? `&filter=${filter}` : '') +
      (cabangId ? `&cabangId=${cabangId}` : ''),
  );
  return response.data;
};

export const getLoan = async (noPengajuan: string) => {
  const response = await api.get<GetLoanIn, AxiosResponse<GetLoanOut>>(
    `/loan/${noPengajuan}`,
  );
  return response.data;
};

export const updateStatusLoan = async ({
  params,
  body,
}: {
  params: UpdateStatusParamsIn;
  body: UpdateStatusBodyIn;
}) => {
  const { noPengajuan } = params;
  const response = await api.patch<any, AxiosResponse<UpdateStatusOut>>(
    `/loan/${noPengajuan}`,
    body,
  );
  return response.data;
};
