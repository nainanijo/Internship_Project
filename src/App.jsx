import './App.css'
import Home from './Pages/Home'
import PO from './Pages/PO'
import SO from './Pages/SO'
import admin from './Pages/Admin'


import { BrowserRouter,Routes,Route,NavLink} from 'react-router-dom'



function App(){

  return(
    <div>
      <h1> Hii there!</h1>
      <main>
        
          <BrowserRouter>
            <nav className='bg-yellow-800 shadow-lg text-white' >
            <div className='max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 max=wl=7' >
              <ul className='flex justify-around gap-3 py-4'>
                <li>
                  <NavLink to= '/'>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/PO">Place Order</NavLink>
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
              <Route path= '/admin' element={<admin/>}  />;
            </Routes>
              
        
    
          </BrowserRouter>
        
    
    
    
       </main>
    </div>
  )

}

export default App