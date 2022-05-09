import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shell from './components/Shell';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            <Shell>
              <Home />
            </Shell>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
