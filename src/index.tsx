import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import moment from 'moment-timezone';
import { store } from './app/store';
import App from './App';
import { AuthProvider } from './context/AuthContext';

moment.tz.setDefault(process.env.REACT_APP_TZ);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <HashRouter>
    <AuthProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </AuthProvider>
  </HashRouter>,
);
