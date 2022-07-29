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
          p="xs"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 240 }}
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

              <Button
                sx={{ div: { justifyContent: 'start' } }}
                variant="subtle"
                onClick={() => {
                  setOpened(false);
                  navigate('/karyawan-entry');
                }}
              >
                <Text weight={'bold'}>Karyawan Entry</Text>
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
