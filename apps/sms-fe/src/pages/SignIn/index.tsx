import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Box,
  Group,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { zSignInForm, SignInForm } from '@api/auth/dto';
import React from 'react';
import { useSignIn } from 'services/auth';
import { setItem } from 'services/localStorage';

const SignIn = () => {
  const form = useForm<SignInForm>({
    schema: zodResolver(zSignInForm),
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

  const signIn = (values: SignInForm, event: React.FormEvent) => {
    event.preventDefault();
    mutate(values);
  };

  return (
    <Container size="xs" px="xs">
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
    </Container>
  );
};

export default SignIn;
