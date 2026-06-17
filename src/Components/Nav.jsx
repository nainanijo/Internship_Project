import React from 'react'
import Home from '../Pages/Home'
import PO from '../Pages/PO'
import SO from '../Pages/SO'
import Admin from '../Pages/Admin'
import Login from './Login'
import {Routes,Route,NavLink} from 'react-router-dom'

const Nav = () => {
  return (
   <div>
      <h1></h1>
      <main>
        
            <nav className='bg-transparent shadow-lg text-amber-900' >
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

       </main>
        

    </div>
  )

}
  

export default Nav