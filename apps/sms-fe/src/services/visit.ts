import { GetSoByTlResponse } from '@api/tlso/dto';
import {
  BySFResponse,
  PatchVisitBody,
  VisitDetailResponse,
  AllVisitByTLResponse,
  SummaryByTLResponse,
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

export const allVisitByTL = async (nipTl: string) => {
  const response = await api.get<AllVisitByTLResponse[]>(`/visit/tl/${nipTl}`);
  return response;
};

export const sumVisitByTL = async (nipTl: string) => {
  const response = await api.get<SummaryByTLResponse[]>(
    `/visit/sum/tl/${nipTl}`,
  );
  return response;
};
