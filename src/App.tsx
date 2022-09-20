import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import WalletHistory from './pages/WalletHistory';
import WalletTrxDetails from './pages/WalletTrxDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />
        <Route path="" element={<Home />} />
        <Route path="/wallet/history" element={<WalletHistory />} />
        <Route path="/wallet/history/:id" element={<WalletTrxDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
