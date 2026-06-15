import './App.css'
import Home from './Pages/Home'
import PO from './Pages/PO'
import SO from './Pages/SO'
import Admin from './Pages/Admin'
import Login from './Components/Login'


import {Routes,Route,NavLink,useNavigate} from 'react-router-dom'



function App(){

  const navigate = useNavigate();
  const handleNavigate = () => {
  navigate('/PO'); // Moves user to the place order page
  };

  return(
    <div>
      <h1></h1>
      <main>
        
            <nav className='bg-lime-900 shadow-lg text-white' >
            <div className='max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 max=wl=7' >
              <ul className='flex justify-around gap-3 py-4'>
                <li>
                  <NavLink to= '/'>Home</NavLink>
                </li>
    
                <li>
                  <NavLink to="/SO"> Order Status</NavLink>
                </li>
    
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
    
    
              </ul>
            </div>
    
            </nav>
            <Routes>
              <Route path= '/' element={<Home/>}  />
              <Route path= '/PO' element={<PO/>}  />
              <Route path= '/SO' element={<SO/>}  />;
              <Route path= '/Admin' element={<Admin/>}  />;
            </Routes>
            
        

      
        <button type="button" onClick={handleNavigate} className="group relative flex w-full justify-center rounded-md border border-transparent bg-amber-900 py-2 px-4 text-sm font-medium text-white hover:bg-amber-800 "
> PLACE ORDER
        </button>

    
       </main>
    </div>
  )

}

export default App