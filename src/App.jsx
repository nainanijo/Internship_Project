import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import TokenStatus from './Components/TokenStatus';

import { Routes, Route } from 'react-router-dom';

import PO from './pages/PO';
import Payment from './pages/payment';
import Confirmation from './pages/confirmation';

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
        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;