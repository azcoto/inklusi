import api from '@libs/axios-instance';
import { useMutation } from 'react-query';
const signIn = async (values) => {
    const response = await api.post('/auth/signin', values);
    return response.data;
};
export const useSignIn = (options) => {
    return useMutation('signIn', signIn, options);
};
