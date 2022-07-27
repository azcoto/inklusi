import {
  CreateDebiturIn,
  CreateDebiturOut,
  GetDebiturIn,
  GetDebiturOut,
  GetManyDebiturIn,
  GetManyDebiturOut,
  UpdateDebiturIn,
  UpdateDebiturOut,
} from '@api/debitur/dto';
import api from 'libs/axios-instance';
import { AxiosResponse } from 'axios';

export const createDebitur = async (body: CreateDebiturIn) => {
  const response = await api.put<
    CreateDebiturIn,
    AxiosResponse<CreateDebiturOut>
  >('/debitur', body);
  return response.data;
};

export const updateDebitur = async ({
  cif,
  body,
}: {
  cif: string;
  body: UpdateDebiturIn;
}) => {
  const response = await api.patch<
    UpdateDebiturIn,
    AxiosResponse<UpdateDebiturOut>
  >(`/debitur/${cif}`, body);
  return response.data;
};

export const getManyDebitur = async (page: number, filter: string | null) => {
  const response = await api.get<
    GetManyDebiturIn,
    AxiosResponse<GetManyDebiturOut>
  >(`/debitur?page=${page}` + `${filter ? `&filter=${filter}` : ``}`);
  return response.data;
};

export const getDebitur = async (cif: string) => {
  const response = await api.get<GetDebiturIn, AxiosResponse<GetDebiturOut>>(
    `/debitur/${cif}`,
  );
  return response.data;
};
