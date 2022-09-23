import React from 'react';
import './App.css';
import './styles/main.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home/Home';
// import Navbar from './layouts/Navbar/Navbar';
// import Footer from './layouts/Footer/Footer';

function App() {
  return (
    <Routes>
      {/* <Navbar /> */}
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />
        <Route path="" element={<Home />} />
      </Route>
      {/* <Footer /> */}
    </Routes>
  );
}

export default App;
