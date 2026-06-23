import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import TokenStatus from './Components/TokenStatus';

import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SO from './Pages/SO';
import Admin from './Pages/Admin';
import Dashboard from './Components/Dashboard'

import PO from './pages/PO';
import Payment from './pages/payment';
import Confirmation from './pages/confirmation';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    
    axios.get('http://localhost:8080/api/status')
      .then((response) => {
        console.log("🚀 DATA TRANSMITTED SUCCESSFULLY:", response.data.message);
      })
      .catch((error) => {
        console.error("❌ Data transmission failed:", error.message);
      });
  }, []);
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Nav />
      
      <div className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PO" element={<PO />} />
          <Route path="/SO" element={<SO />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/status" element={<TokenStatus />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;