import {
  Text,
  AppShell,
  Drawer,
  Stack,
  UnstyledButton,
  Box,
  Footer,
} from '@mantine/core';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';

const Shell = () => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  const toggleDrawer = () => {
    setOpened(!opened);
  };
  return (
    <AppShell
      padding="xs"
      fixed
      header={<AppHeader toggleDrawer={toggleDrawer} />}
      footer={
        <Footer height={20} px={4}>
          <Text size="xs" weight="bold" align="right" color="dimmed">
            Copyright Jaringan Inklusi Keuangan 2022
          </Text>{' '}
        </Footer>
      }
    >
      <Drawer
        opened={opened}
        withCloseButton={false}
        onClose={() => setOpened(false)}
        padding="xs"
        size="xs"
      >
        <Box
          sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          pl={8}
        >
          <Stack>
            <UnstyledButton
              onClick={() => {
                setOpened(false);
                navigate('/');
              }}
            >
              <Text weight={'bold'}>Home</Text>
            </UnstyledButton>
            <UnstyledButton
              onClick={() => {
                setOpened(false);
                navigate('/assign-visit');
              }}
            >
              <Text weight={'bold'}>Assign Visit</Text>
            </UnstyledButton>
            <UnstyledButton
              onClick={() => {
                setOpened(false);
                navigate('/visit');
              }}
            >
              <Text weight={'bold'}>Visit</Text>
            </UnstyledButton>
            <UnstyledButton
              onClick={() => {
                setOpened(false);
                navigate('/simulasi');
              }}
            >
              <Text weight={'bold'}>Simulasi</Text>
            </UnstyledButton>
          </Stack>
          <UnstyledButton
            onClick={() => {
              setOpened(false);
              navigate('/signin');
            }}
          >
            <Text weight={'bold'}>Logout</Text>
          </UnstyledButton>
        </Box>
      </Drawer>
      <Outlet />
    </AppShell>
  );
};

export default Shell;
