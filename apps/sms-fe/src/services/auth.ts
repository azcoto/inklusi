import { SignInForm, SignInResponse } from '@api/auth/dto';
import api from 'libs/axios-instance';
import { MutateOptions, useMutation } from 'react-query';

const signIn = async (values: SignInForm) => {
  const response = await api.post<SignInResponse>('/auth/signin', values);
  return response.data;
};

export const useSignIn = (
  options?: MutateOptions<SignInResponse, unknown, SignInForm>,
) => {
  return useMutation('signIn', signIn, options);
};
