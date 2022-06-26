import {
  Text,
  AppShell,
  Drawer,
  Stack,
  UnstyledButton,
  Box,
  Footer,
  Navbar,
  MediaQuery,
  Aside,
} from '@mantine/core';
import { useAuthed } from 'context/auth';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';

const Shell = () => {
  const shellRef = useRef(false);
  const location = useLocation();
  const { currentUser } = useAuthed();
  const navigate = useNavigate();
  useEffect(() => {
    if (shellRef.current) {
      return;
    }
    if (!currentUser && location.pathname !== '/signin') {
      navigate('/signin', { replace: true });
    }
    shellRef.current = true;
  }, []);

  const [opened, setOpened] = useState(false);

  const toggleDrawer = () => {
    setOpened(!opened);
  };
  return (
    <AppShell
      header={<AppHeader toggleDrawer={toggleDrawer} />}
      navbar={
        <Navbar
          p="sm"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 250, lg: 250 }}
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
                navigate('/disburse-entry');
              }}
            >
              <Text weight={'bold'}>Disburse Entry</Text>
            </UnstyledButton>

            <UnstyledButton
              onClick={() => {
                setOpened(false);
                navigate('/disburse-summary');
              }}
            >
              <Text weight={'bold'}>Disburse Summary</Text>
            </UnstyledButton>
          </Stack>
        </Navbar>
      }
      footer={
        <Footer height={20} px={4}>
          <Text size="xs" weight="bold" align="right" color="dimmed">
            Copyright Jaringan Inklusi Keuangan 2022
          </Text>{' '}
        </Footer>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default Shell;
