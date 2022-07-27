import logo from 'assets/inklusi.png';
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
  useMantineColorScheme,
  Switch,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { zSignInDTO, SignInDTO } from '@api/auth/dto';
import React, { useEffect, useRef, useState } from 'react';
import services from 'services';
import { removeItem, setItem } from 'services/localStorage';
import { createPath, Navigate, useNavigate } from 'react-router-dom';
import { handleError } from 'libs/handleError';
import { showNotification } from '@mantine/notifications';
import { useAuth } from 'context/auth';
import { setToken } from 'libs/axios-instance';

export const SignIn = () => {
  const signInRef = useRef(false);
  const { setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colorScheme } = useMantineColorScheme();
  const [checked, setChecked] = useState(false);

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
    validate: zodResolver(zSignInDTO),
    initialValues: {
      phone: '',
      password: '',
      app: 'ops-fe',
    },
  });

  const doSignIn = async (values: SignInDTO, event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      let data;
      console.log(checked);
      if (checked) {
        data = await services.auth.userCabangSignIn({
          nip: values.phone,
          pass: values.password,
        });
      } else {
        data = await services.auth.signIn(values);
      }
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
      sx={{
        maxWidth: '100%',
        height: '100vh',
        position: 'relative',
        backgroundColor: colorScheme === 'light' ? '#F1F3F5' : '#141517',
      }}
      p={4}
    >
      <LoadingOverlay visible={isLoading} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        mx="auto"
        mt={100}
        mb={30}
      >
        <Image src={logo} width="320px" />
        <Text align="center" size="xl" weight="bold" mt={30}>
          Loan Operation System
        </Text>
      </Box>

      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(doSignIn)}>
          <TextInput label="NIP" required {...form.getInputProps('phone')} />
          <PasswordInput
            label="Password"
            required
            {...form.getInputProps('password')}
          />
          <Group mt="md" position="apart">
            <Switch
              label={checked ? 'User Cabang' : 'User JIKU'}
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
            <Button type="submit">LOGIN</Button>
          </Group>
        </form>
      </Box>
      <Box
        sx={{
          width: '100%',
          left: '0',
          bottom: '0',
          position: 'fixed',
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
