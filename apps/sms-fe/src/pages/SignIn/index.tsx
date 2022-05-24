import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Group,
  AppShell,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { zSignInDTO, SignInDTO } from '@api/auth/dto';
import React from 'react';
import { useSignIn } from 'services/auth';
import { setItem } from 'services/localStorage';

const SignIn = () => {
  const form = useForm<SignInDTO>({
    schema: zodResolver(zSignInDTO),
    initialValues: {
      phone: '',
      password: '',
    },
  });

  const { mutate } = useSignIn({
    onSuccess: (data) => {
      setItem('user', data.user);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const signIn = (values: SignInDTO, event: React.FormEvent) => {
    event.preventDefault();
    mutate(values);
  };

  return (
    <AppShell sx={{ height: '100vh' }} padding="xs" fixed>
      <Box sx={{ maxWidth: 200 }} mx="auto">
        <form onSubmit={form.onSubmit(signIn)}>
          <TextInput
            label="Phone Number"
            required
            {...form.getInputProps('phone')}
          />
          <PasswordInput
            label="Password"
            required
            {...form.getInputProps('password')}
          />
          <Group position="right" mt="md">
            <Button type="submit">Sign In</Button>
          </Group>
        </form>
      </Box>
    </AppShell>
  );
};

export default SignIn;
