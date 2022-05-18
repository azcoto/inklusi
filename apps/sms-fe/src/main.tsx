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
import { QueryClient, QueryClientProvider } from 'react-query';
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

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.StrictMode>
      <AuthProvider user={getItem('user')}>
        <Router>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleScheme}
          >
            <MantineProvider
              theme={{ fontFamily: 'Open Sans', colorScheme: colorScheme }}
              withGlobalStyles
              withNormalizeCSS
            >
              <NotificationsProvider>
                <QueryClientProvider client={queryClient}>
                  <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/" element={<Shell />}>
                      <Route index element={<Home />} />
                      <Route path="simulasi" element={<Calc />} />
                      <Route path="assign-visit" element={<AssignVisit />} />
                    </Route>
                  </Routes>
                </QueryClientProvider>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
