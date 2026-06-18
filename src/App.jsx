import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import PO from './Pages/PO';
import SO from './Pages/SO';
import Admin from './Pages/Admin';
import Payment from './Pages/payment';
import Confirmation from './Pages/confirmation';

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