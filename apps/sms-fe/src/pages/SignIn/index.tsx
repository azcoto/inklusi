import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Box,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { z } from 'zod';

const SignIn = () => {
  const FormValues = z.object({
    phone: z.string(),
    password: z.string(),
  });

  type FormValues = z.infer<typeof FormValues>;

  const form = useForm<FormValues>({
    initialValues: {
      phone: '',
      password: '',
    },
  });

  const signIn = async (values: FormValues) => {
    const data = await fetch('api/auth/signin', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        values,
      }),
    });
    if (data.status != 200) {
      showNotification({
        title: 'Sign In Error',
        message: 'Check Network Connectivity',
        color: 'red',
      });
      return;
    }
    console.log(data);
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
