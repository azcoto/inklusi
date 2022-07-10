import 'dayjs/locale/id';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import '@fontsource/open-sans';
import Shell from './components/Shell';
import SignIn from './pages/SignIn';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { AuthProvider } from 'context/auth';
import { getItem } from 'services/localStorage';
import Home from 'pages/Home';
import DisburseEntry from 'pages/DisburseEntry';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DisburseSummary } from 'pages/DisburseSummary';
import { DisburseEdit } from 'pages/DisburseEdit';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
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
                      <Route
                        path="disburse-entry"
                        element={<DisburseEntry />}
                      />
                      <Route
                        path="disburse-summary"
                        element={<DisburseSummary />}
                      />
                      <Route path="disburse">
                        <Route path=":id" element={<DisburseEdit />} />
                      </Route>
                    </Route>
                  </Routes>
                </AuthProvider>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
