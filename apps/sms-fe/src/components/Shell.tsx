import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import React, { useState } from 'react';
import { NotificationsProvider } from '@mantine/notifications';
import AppHeader from './AppHeader';

type Props = {
  children: React.ReactNode;
};
const Shell = ({ children }: Props) => {
  const [scheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleScheme = (value?: ColorScheme) =>
    setColorScheme(value || (scheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={scheme} toggleColorScheme={toggleScheme}>
      <MantineProvider
        theme={{ colorScheme: scheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <AppShell padding="xs" header={<AppHeader />}>
            {children}
          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default Shell;
