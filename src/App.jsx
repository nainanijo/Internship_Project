import './App.css'
import Nav from './Components/Nav'
import {BrowserRouter,Routes,Route,NavLink,useNavigate} from 'react-router-dom'
import Footer from './Components/Footer'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Admin from './Pages/Admin'

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        <Nav />
        <Routes>
          <Route path='/admin' element={<Admin />} />
           <Route path='/Dashboard' element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App