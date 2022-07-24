import {
  Text,
  AppShell,
  Drawer,
  Stack,
  Box,
  Footer,
  Navbar,
  MediaQuery,
  Aside,
  Divider,
  Button,
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
              <Button
                sx={{ div: { justifyContent: 'start' } }}
                variant="subtle"
                onClick={() => {
                  setOpened(false);
                  navigate('/');
                }}
              >
                <Text weight={'bold'}>Home</Text>
              </Button>
              <Divider label="Debitur" />
              <Button
                sx={{ div: { justifyContent: 'start' } }}
                variant="subtle"
                onClick={() => {
                  setOpened(false);
                  navigate('/debitur-entry');
                }}
              >
                <Text weight={'bold'}>Entry Debitur</Text>
              </Button>

              <Button
                sx={{ div: { justifyContent: 'start' } }}
                variant="subtle"
                onClick={() => {
                  setOpened(false);
                  navigate('/debitur-data');
                }}
              >
                <Text weight={'bold'}>Data Debitur</Text>
              </Button>
              <Divider label="Pengajuan Kredit" />
              <Button
                sx={{ div: { justifyContent: 'start' } }}
                variant="subtle"
                onClick={() => {
                  setOpened(false);
                  navigate('/loan-entry');
                }}
              >
                <Text weight={'bold'}>Entry Pengajuan Kredit</Text>
              </Button>

              <Button
                sx={{ div: { justifyContent: 'start' } }}
                variant="subtle"
                onClick={() => {
                  setOpened(false);
                  navigate('/loan-data');
                }}
              >
                <Text weight={'bold'}>Data Pengajuan</Text>
              </Button>
            </Stack>
            <Button
              sx={{ div: { justifyContent: 'start' } }}
              variant="subtle"
              onClick={() => {
                setOpened(false);
                navigate('/signin');
              }}
            >
              <Text weight={'bold'}>Logout</Text>
            </Button>
          </Box>
        </Navbar>
      }
      // footer={
      //   <Footer height={20} px={4}>
      //     <Text size="xs" weight="bold" align="right" color="dimmed">
      //       Copyright Jaringan Inklusi Keuangan 2022
      //     </Text>{' '}
      //   </Footer>
      // }
    >
      <Outlet />
    </AppShell>
  );
};

export default Shell;
