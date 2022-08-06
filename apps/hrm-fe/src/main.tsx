import 'dayjs/locale/id';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import '@fontsource/open-sans';
import '@fontsource/lato';
import Shell from './components/Shell';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { AuthProvider } from 'context/auth';
import { getItem } from 'services/localStorage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DataDebitur,
  DetailDebitur,
  EntryDebitur,
  EntryLoan,
  Home,
  SignIn,
} from './pages';
import { EditDebitur } from './pages/EditDebitur';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
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
        <ReactQueryDevtools initialIsOpen={false} />
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
                components: {
                  AppShell: {
                    styles: (theme) => ({
                      root: {
                        background:
                          theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[1],
                      },
                    }),
                  },
                  Footer: {
                    styles: (theme) => ({
                      root: {
                        background:
                          theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[1],
                      },
                    }),
                  },
                },
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <NotificationsProvider position="top-center" zIndex={2077}>
                <AuthProvider user={getItem('user')}>
                  <NotificationsProvider position="top-center" zIndex={2077}>
                    <Routes>
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/" element={<Shell />}>
                        <Route index element={<Home />} />
                        <Route
                          path="karyawab-entry"
                          element={<EntryDebitur />}
                        />
                        <Route path="karyawan-data" element={<DataDebitur />} />

                        <Route
                          path="karyawan/:nip"
                          element={<DetailDebitur />}
                        />
                        <Route
                          path="karyawan-edit/:cif"
                          element={<EditDebitur />}
                        />
                        <Route path="*" element={<Home />} />
                      </Route>
                    </Routes>
                  </NotificationsProvider>
                </AuthProvider>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
