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

const App = () => {
  const [scheme, setColorScheme] = useState<ColorScheme>(
    import.meta.env.DEV ? 'dark' : 'light',
  );
  const toggleScheme = (value?: ColorScheme) =>
    setColorScheme(value || (scheme === 'dark' ? 'light' : 'dark'));

  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.StrictMode>
      <Router>
        <ColorSchemeProvider
          colorScheme={scheme}
          toggleColorScheme={toggleScheme}
        >
          <MantineProvider
            theme={{ fontFamily: 'Open Sans', colorScheme: scheme }}
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
                  </Route>
                </Routes>
              </QueryClientProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
