import './App.css'
import Nav from './Components/Nav'
import {BrowserRouter,Routes,Route,NavLink,useNavigate} from 'react-router-dom'
import Footer from './Components/Footer'


function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        <Nav />
      </div>
      <Footer />
    </div>
  )
}

export default App