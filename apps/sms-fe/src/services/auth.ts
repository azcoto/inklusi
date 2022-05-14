import { SignInForm } from '@api/auth/dto';
import api from '@libs/axios-instance';
import { MutateOptions, useMutation } from 'react-query';

interface Data {
  token: string;
}

const signIn = async (values: SignInForm) => {
  const response = await api.post<Data>('/auth/signin', values);
  return response.data;
};

export const useSignIn = (
  options?: MutateOptions<Data, unknown, SignInForm>,
) => {
  return useMutation('signIn', signIn, options);
};
