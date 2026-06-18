import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import TokenStatus from './Components/TokenStatus';

import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import PO from './Pages/PO';
import SO from './Pages/SO';
import Admin from './Pages/Admin';
import Payment from './Pages/payment';
import Confirmation from './Pages/confirmation';
import Dashboard from './Components/dashboard';

function App() {
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
          <Route path="/status" element={<TokenStatus />} />
          <Route path="/Dashboard" element={<Dashboard />} />

        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;