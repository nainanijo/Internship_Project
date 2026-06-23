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
  const [backendMessage, setBackendMessage] = useState("Connecting to backend...");
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then((response) => {
        console.log("🚀 BACKEND LINK WORKING:", response.data);
      })
      .catch((error) => {
        console.log("❌ Frontend can't find backend at port 5000 yet.");
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