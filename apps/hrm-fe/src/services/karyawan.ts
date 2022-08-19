import {
  CreateKaryawanIn,
  CreateKaryawanOut,
  GetKaryawanIn,
  GetKaryawanOut,
  GetManyKaryawanIn,
  GetManykaryawanOut,
} from '@api/karyawan/dto';
import api from 'libs/axios-instance';
import { AxiosResponse } from 'axios';
import { CreateDebiturIn } from '@/../../server/src/api/debitur/dto';

export const createKaryawan = async (body: CreateKaryawanIn) => {
  const response = await api.put<
    CreateKaryawanIn,
    AxiosResponse<CreateKaryawanOut>
  >('/karyawan', body);
  return response.data;
};

export const getManyKaryawan = async (page: number, filter: string | null) => {
  const response = await api.get<
    GetManyKaryawanIn,
    AxiosResponse<GetManykaryawanOut>
  >(`/karyawan?page=${page}` + `${filter ? `&filter=${filter}` : ``}`);
  return response.data;
};

export const getKaryawan = async (nip: string) => {
  const response = await api.get<GetKaryawanIn, AxiosResponse<GetKaryawanOut>>(
    `/karyawan/${nip}`,
  );
  return response.data;
};
