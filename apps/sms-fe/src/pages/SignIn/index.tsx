import logo from 'assets/logo.svg';
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Group,
  AppShell,
  Container,
  LoadingOverlay,
  Image,
  Text,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { zSignInDTO, SignInDTO } from '@api/auth/dto';
import React, { useEffect, useRef, useState } from 'react';
import services from 'services';
import { removeItem, setItem } from 'services/localStorage';
import { Navigate, useNavigate } from 'react-router-dom';
import { handleError } from 'libs/handleError';
import { showNotification } from '@mantine/notifications';
import { useAuth } from 'context/auth';
import { setToken } from 'libs/axios-instance';

const SignIn = () => {
  const signInRef = useRef(false);
  const { setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (signInRef.current) {
      return;
    }
    removeItem('user');
    removeItem('token');
    signInRef.current = true;
  }, []);
  let navigate = useNavigate();
  const form = useForm<SignInDTO>({
    schema: zodResolver(zSignInDTO),
    initialValues: {
      phone: '',
      password: '',
      app: 'sms-fe',
    },
  });

  const doSignIn = async (values: SignInDTO, event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const data = await services.auth.signIn(values);
      setItem('user', data.user);
      setCurrentUser(data.user);
      setItem('token', data.token);
      setToken(data.token);
      navigate('/', { replace: true });
    } catch (error) {
      setIsLoading(false);
      handleError(error, showNotification);
    }
  };

  return (
    <Container
      sx={{ height: '100vh', position: 'relative', backgroundColor: '#F1F3F5' }}
      p={4}
    >
      <LoadingOverlay visible={isLoading} />
      <Box
        sx={{
          maxWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        mx="auto"
        mt={100}
        mb={30}
      >
        <Image src={logo} width="150px" />
        <Text align="center" size="xl" weight="bold" mt={30}>
          Sales Management System
        </Text>
      </Box>

      <Box sx={{ maxWidth: 200 }} mx="auto">
        <form onSubmit={form.onSubmit(doSignIn)}>
          <TextInput
            label="Nomor Telepon"
            required
            {...form.getInputProps('phone')}
          />
          <PasswordInput
            label="Password"
            required
            {...form.getInputProps('password')}
          />
          <Group position="right" mt="md">
            <Button type="submit">LOGIN</Button>
          </Group>
        </form>
      </Box>
      <Box
        sx={{
          width: '100%',
          left: '0',
          bottom: '0',
          textAlign: 'right',
          paddingRight: '20px',
        }}
      >
        <Text size="xs" weight="lighter">
          Copyright Jaringan Inklusi Keuangan 2022
        </Text>
      </Box>
    </Container>
  );
};

export default SignIn;
