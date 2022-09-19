import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
