// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Items from './pages/items/Items';
import Stocks from './pages/stocks/Stocks';
import Deliveries from './pages/deliveries/Deliveries';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inventaris" element={<Items />} />
        <Route path="/manajamen-stok" element={<Stocks />} />
        <Route path="/pengiriman-barang" element={<Deliveries />} />
      </Routes>
    </div>
  );
}

export default App;
