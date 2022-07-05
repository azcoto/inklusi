import 'dayjs/locale/id';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import '@fontsource/open-sans';
import Shell from './components/Shell';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import React from 'react';
import Calc from './pages/Calc';
import { useLocalStorage } from '@mantine/hooks';
import AssignVisit from 'pages/AssignVisit';
import { AuthProvider } from 'context/auth';
import { getItem } from 'services/localStorage';
import VisitPortal from 'pages/VisitPortal';
import Visit from 'pages/Visit';
import { ReportVisit } from 'pages/ReportVisit';

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <React.StrictMode>
      <Router>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleScheme}
        >
          <MantineProvider
            theme={{
              fontFamily: 'Open Sans',
              colorScheme: colorScheme,
              primaryShade: 7,
            }}
            styles={{
              AppShell: (theme) => ({
                root: {
                  background:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[8]
                      : theme.colors.gray[1],
                },
              }),
              Footer: (theme) => ({
                root: {
                  background:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[8]
                      : theme.colors.gray[1],
                },
              }),
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider position="top-center" zIndex={2077}>
              <AuthProvider user={getItem('user')}>
                <Routes>
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/" element={<Shell />}>
                    <Route index element={<Home />} />
                    <Route path="simulasi" element={<Calc />} />
                    <Route path="assign-visit" element={<AssignVisit />} />
                    <Route path="report-visit" element={<ReportVisit />} />
                    <Route path="visit" element={<VisitPortal />} />
                    <Route path="visit/:notas" element={<Visit />} />
                  </Route>
                </Routes>
              </AuthProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
