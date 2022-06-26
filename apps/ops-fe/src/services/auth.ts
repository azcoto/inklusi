import { SignInDTO, SignInResponse } from '@api/auth/dto';
import api from 'libs/axios-instance';
import { setItem } from './localStorage';

export const signIn = async (values: SignInDTO) => {
  const response = await api.post<SignInResponse>('/auth/signin', values);
  setItem('token', response.data.token);
  return response.data;
};
