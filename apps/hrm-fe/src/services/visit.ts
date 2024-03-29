import { GetSoByTlResponse } from '@api/tlso/dto';
import {
  BySFResponse,
  PatchVisitBody,
  VisitDetailResponse,
} from '@api/visit/dto';
import api from 'libs/axios-instance';

export const postAssignVisit = async (
  nipTl: string,
  nipSf: string,
  nopen: string[],
) => {
  const response = await api.post(`/visit/${nipTl}/${nipSf}`, { nopen });
  return response;
};

export const bySFVisit = async (nipSf: string) => {
  const response = await api.get<BySFResponse[]>(`/visit/sf/${nipSf}`);
  return response;
};

export const visitDetail = async (nipSf: string, notas: string) => {
  const response = await api.get<VisitDetailResponse>(
    `/visit/sf/${nipSf}/${notas}`,
  );
  return response;
};

export const patchVisit = async (body: PatchVisitBody) => {
  const response = await api.patch(`/visit`, body);
  return response;
};
